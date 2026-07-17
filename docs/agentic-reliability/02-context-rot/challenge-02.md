---
id: challenge-02
title: "Challenge 02 — Context Rot at Scale"
sidebar_label: Challenge 02 — Context Rot at Scale
---

# Challenge 02 — Context Rot at Scale

## 🏥 Enterprise Scenario

> **Company:** Northbrook Health System — a 12-hospital regional health network  
> **Situation:** Your team deployed a clinical decision support agent that helps care coordinators query patient risk scores, medication histories, and lab trends. In demos and QA, it performed flawlessly. Two weeks after launch, the clinical informatics team files a bug: **the agent gives correct answers for the first 2–3 questions in a session, then begins making subtle errors** — wrong lab reference ranges, misattributed medication names, incorrect trend directions.  
> **Nobody noticed for 11 days because the answers still look authoritative.**

You are the AI Solution Architect. The system is in production. You need to diagnose, quantify, and fix the degradation without a full rebuild.

---

## The Core Problem: Intelligence Degradation

LLM accuracy is **not linear with context size**. Research published in 2026 (arXiv:2601.15300) identified a critical threshold: once a conversation crosses **40–50% of the maximum context window**, accuracy drops catastrophically — in some models, F1 scores fall by **45.5% within a narrow 10% context range**.

The mechanism is "attention dilution": the model must distribute its attention across all tokens in the context. As the context grows, important data from early in the conversation receives proportionally less attention. The model starts predicting based on statistical patterns rather than retrieving the specific values in context.

```
Context Size vs. Accuracy (illustrative — from arXiv:2601.15300 pattern)

100% ─────────────────────────────────────────
                    ↑ Safe zone
 55% ───────────────┼──────── CLIFF EDGE (~40-50% fill)
                    │         ↓ Catastrophic collapse begins
 10% ───────────────┼─────────────────────────────────────
      0%          40%       50%            100%
                  Context Window Fill
```

In the "Simple Agentic" pattern, every tool call appends raw data to the thread. A query returning a month of patient vitals (5,000+ tokens) bloats the context — and that data stays in the thread for every subsequent LLM call.

```
Turn 1: Query + System Prompt                         = 1,000 tokens
Turn 2: + Lab results (30 days × 5 metrics)           = 6,000 tokens  ← 15% fill
Turn 3: + Medication history (2 years)                = 14,000 tokens ← 35% fill
Turn 4: + Risk score history                          = 18,000 tokens ← 45% fill ← CLIFF
Turn 5: Care coordinator asks a simple question...    ← Model is now unreliable
```

---

## Architecture Decision Table

| Strategy | Context Growth | Accuracy Preserved | Cost |
|----------|---------------|-------------------|------|
| ❌ Simple Agentic (no pruning) | Quadratic | Degrades past 40% fill | High + grows per turn |
| ⚠️ Summarize all tool results | Controlled | Partial — summaries lose precision | Medium |
| ✅ Context window budgeting | Bounded | Yes — keeps fill below threshold | Medium |
| ✅ Scratchpad files + selective loading | Minimal | Yes — only load what current turn needs | Low |
| ✅ Subagent delegation with fresh context | Minimal | Yes — each subagent starts clean | Low + parallelizable |

**Decision for healthcare:** Combine **context window budgeting** (never exceed 35% fill) with **scratchpad files** (persist data outside the context window, load selectively per turn).

---

## 🧰 Before You Start — Environment Setup

Context rot only reveals itself across **many turns**, so your setup must let you run a repeatable multi-turn session and measure context fill at each step.

### Prerequisites

| Requirement | Why you need it | How to check |
|-------------|-----------------|--------------|
| Python 3.10+ | Async agent loop + test harness | `python --version` |
| **Azure OpenAI** via [Azure AI Foundry](https://ai.azure.com) | The model under test — you must know its exact context-window size | Deploy `gpt-4o` (128K) in Foundry |
| **Azure AI Foundry — Tracing** | Record context-fill % as a span on every turn — this is how you *see* the cliff | [Docs](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-setup) |
| tiktoken *(third-party)* | Count exact tokens per turn / per tool result | `pip show tiktoken` |
| Scratchpad store — **Azure Blob / OneLake / Cosmos DB** (prod); local folder here | Hold full tool results *outside* the context window | Azure portal / `mkdir .scratchpad` |

### Step 0 — Create an isolated workspace (5 min)

```bash
mkdir context-rot && cd context-rot
python -m venv .venv
# Windows (PowerShell):  .venv\Scripts\Activate.ps1    |    macOS/Linux:  source .venv/bin/activate
pip install azure-ai-projects azure-identity openai tiktoken python-dotenv
mkdir .scratchpad   # local stand-in for Azure Blob / OneLake
```

✅ **Done when** your prompt shows `(.venv)` and `pip list` includes `azure-ai-projects`.

### Step 1 — Provision your model & sign in (10 min)

This challenge calls a real `gpt-4o` model. If you have **not** already deployed one, do **Steps 1–2 of [Challenge 01 — The Hallucination Audit](../01-hallucination-audit/challenge-01.md)** now — they walk through the exact portal clicks and give you the two values below. Then create a `.env` here:

```bash
# .env  — the two values you copied from Azure AI Foundry (never commit this file)
# PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<name>
# MODEL_DEPLOYMENT_NAME=gpt-4o
az login   # keyless auth — your code signs in as you, no API keys
```

**Smoke-test it** before you go further — if this prints `setup works`, the rest is your agent logic, not setup:

```python
# smoke_test.py
import os
from dotenv import load_dotenv
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
load_dotenv()
project = AIProjectClient(endpoint=os.environ["PROJECT_ENDPOINT"], credential=DefaultAzureCredential())
client = project.inference.get_azure_openai_client(api_version="2024-10-21")
print(client.chat.completions.create(model=os.environ["MODEL_DEPLOYMENT_NAME"],
      messages=[{"role":"user","content":"Reply with exactly: setup works"}]).choices[0].message.content)
```

> **Common fixes:** `DefaultAzureCredential failed` → run `az login` again. `DeploymentNotFound` → `MODEL_DEPLOYMENT_NAME` must match your Foundry deployment name exactly. `401` → give your account the **Azure AI User** role on the project.

### Step 2 — Pin your context limit and a repeatable test (10 min)

You cannot measure "40% fill" without knowing the denominator. Record your model's context window, then build a fixed list of multi-turn questions with KNOWN answers (like `CLINICAL_TEST_CASES` in Task 1) so every run is comparable.

```python
# config.py — know your denominator
MODEL = "gpt-4o"
CONTEXT_LIMIT = 128_000     # confirm on your model card in Azure AI Foundry (Models + endpoints → your deployment)
SAFETY_THRESHOLD = 0.35     # stay below the ~40% cliff
```

> 🟦 **Microsoft-first note:** the `.scratchpad` folder is a local stand-in. In production, offload full tool results to **Azure Blob Storage**, **OneLake**, or **Azure Cosmos DB**, and delegate data-heavy turns to fresh-context agents via the **Azure AI Foundry Agent Service**. The budgeting logic is identical.

### The path through this challenge

1. **Task 1** — measure your baseline degradation (find *your* cliff turn).
2. **Task 2** — enforce a per-turn context budget (cap the fill).
3. **Task 3** — load context selectively (only what the turn needs).
4. **Task 4** — delegate heavy turns to fresh-context subagents.
5. **Success Criteria** — prove fill stays below 35% and accuracy holds.
6. **Adapt to Your Business** — apply budgeting to *your* long sessions.

> ⏱️ **Time budget:** ~2–3 hours. Task 1 (measure) is the highest-value step — do not skip it.

---

## Tasks

### Task 1 — Measure Your Baseline Degradation

Before fixing, quantify the problem. Build a degradation test harness.

```python
# degradation_test.py
import json
from typing import List, Tuple

def measure_context_degradation(
    agent_client,
    test_questions: List[Tuple[str, str]],  # (question, expected_answer)
    verbose_tool_responses: bool = True
) -> dict:
    """
    Runs a multi-turn session and scores accuracy at each turn.
    Tracks context fill percentage to identify the degradation threshold.
    """
    thread = agent_client.create_thread()
    results = []
    
    for i, (question, expected) in enumerate(test_questions):
        # Ask question
        response = agent_client.ask(thread_id=thread.id, message=question)
        
        # Measure context fill
        total_tokens = count_thread_tokens(thread)
        max_tokens = agent_client.model_context_limit
        fill_pct = (total_tokens / max_tokens) * 100
        
        # Score accuracy
        accuracy = score_answer(response.content, expected)
        
        results.append({
            "turn": i + 1,
            "question": question,
            "context_fill_pct": round(fill_pct, 1),
            "accuracy_score": accuracy,
            "response_snippet": response.content[:200]
        })
        
        print(f"Turn {i+1}: Context={fill_pct:.1f}%  Accuracy={accuracy:.2f}")
    
    # Find degradation threshold
    cliff = next(
        (r for r in results if r["accuracy_score"] < 0.7),
        None
    )
    return {
        "results": results,
        "degradation_cliff_turn": cliff["turn"] if cliff else None,
        "degradation_cliff_context_fill": cliff["context_fill_pct"] if cliff else None
    }

# Sample test cases for clinical agent
CLINICAL_TEST_CASES = [
    ("What is patient 1042's most recent HbA1c result?", "7.2"),
    ("What medications is patient 1042 currently on?", "metformin, lisinopril"),
    ("Show the last 30 days of blood pressure readings for patient 1042", "..."),
    ("What was the HbA1c result from 6 months ago?", "7.8"),  # ← likely fails
    ("Has the blood pressure trend improved or worsened?", "improved"), # ← likely fails
]
```

**Expected finding:** Accuracy drops significantly between turns 3–5, correlating with context fill crossing 40%.

---

### Task 2 — Implement Context Window Budgeting

Cap context growth by enforcing a token budget per tool response.

```python
# context_budget.py
from typing import Optional
import tiktoken

CONTEXT_LIMIT = 32_000          # model max tokens
SAFETY_THRESHOLD = 0.35         # never exceed 35% fill (below 40% cliff)
MAX_TOOL_RESPONSE_TOKENS = 2_000  # hard cap on any single tool result

def enforce_context_budget(
    tool_result: dict,
    current_thread_tokens: int,
    tool_name: str
) -> dict:
    """
    Trims tool results to stay within context budget.
    Returns summary + pointer to scratchpad file for full data.
    """
    result_tokens = count_tokens(json.dumps(tool_result))
    budget_remaining = int(CONTEXT_LIMIT * SAFETY_THRESHOLD) - current_thread_tokens
    
    if result_tokens <= budget_remaining and result_tokens <= MAX_TOOL_RESPONSE_TOKENS:
        # Fits within budget — pass through
        return tool_result
    
    # Exceeds budget — summarize and offload to scratchpad
    scratchpad_path = write_scratchpad(tool_name, tool_result)
    summary = summarize_tool_result(tool_result, max_tokens=500)
    
    return {
        "summary": summary,
        "full_data_available": True,
        "scratchpad_ref": scratchpad_path,
        "row_count": count_rows(tool_result),
        "note": (
            f"Full dataset ({result_tokens} tokens) written to scratchpad. "
            f"Summary shown here to preserve context budget. "
            f"Request specific values for precise lookup."
        )
    }

def count_tokens(text: str, model: str = "gpt-4o") -> int:
    enc = tiktoken.encoding_for_model(model)
    return len(enc.encode(text))

def write_scratchpad(tool_name: str, data: dict) -> str:
    """Write full tool result to a file outside the context window."""
    import uuid, json
    path = f".scratchpad/{tool_name}_{uuid.uuid4().hex[:8]}.json"
    with open(path, 'w') as f:
        json.dump(data, f)
    return path
```

---

### Task 3 — Implement Selective Context Loading

Replace "append everything" with "load only what this turn needs."

```python
# selective_loader.py

class ContextAwareAgent:
    """
    Agent that loads tool data selectively based on current question intent,
    rather than accumulating all tool results in the thread.
    """
    
    def __init__(self, agent_client, scratchpad_dir=".scratchpad"):
        self.client = agent_client
        self.scratchpad_dir = scratchpad_dir
        self.scratchpad_index = {}   # tool_name → file path
    
    def ask(self, question: str, thread_id: str) -> str:
        # 1. Classify what data this question actually needs
        data_needs = self.classify_data_needs(question)
        
        # 2. Load only relevant scratchpad sections (not full history)
        relevant_context = self.load_relevant_context(data_needs)
        
        # 3. Build minimal prompt: question + only necessary context
        augmented_question = self.build_minimal_prompt(question, relevant_context)
        
        # 4. Run with bounded context
        return self.client.ask(thread_id=thread_id, message=augmented_question)
    
    def classify_data_needs(self, question: str) -> list:
        """
        Use a fast, cheap LLM call to classify what data categories
        the question needs. Avoids loading all historical data.
        """
        classification_prompt = f"""
        Classify what data is needed to answer: "{question}"
        
        Categories: labs, medications, vitals, risk_scores, demographics
        Return: JSON array of needed categories only.
        Example: ["labs", "vitals"]
        """
        # Use a fast model for classification (not the main reasoning model)
        result = self.client.classify(classification_prompt)
        return json.loads(result)
    
    def load_relevant_context(self, data_needs: list) -> dict:
        """Load only the scratchpad files relevant to this turn's data needs."""
        context = {}
        for need in data_needs:
            if need in self.scratchpad_index:
                with open(self.scratchpad_index[need]) as f:
                    context[need] = json.load(f)
        return context
    
    def build_minimal_prompt(self, question: str, context: dict) -> str:
        """Build a prompt with only the data needed for this specific question."""
        context_str = "\n".join(
            f"[{k.upper()}]\n{json.dumps(v, indent=2)}"
            for k, v in context.items()
        )
        return f"{question}\n\nRelevant data:\n{context_str}"
```

---

### Task 4 — Implement Subagent Delegation for Long Sessions

For sessions that must span many turns, delegate to fresh-context subagents.

```python
# subagent_delegation.py
# Pattern: Coordinator holds session state; subagents start with fresh context

class ClinicalCoordinator:
    """
    Coordinator that manages long clinical sessions.
    Delegates complex, data-heavy queries to subagents with fresh context.
    This ensures subagents never exceed 40% context fill.
    """
    
    SUBAGENT_CONTEXT_LIMIT = 0.30  # 30% max — safe margin below 40% cliff
    
    def route_query(self, question: str, session_state: dict) -> str:
        token_estimate = self.estimate_query_tokens(question, session_state)
        
        if token_estimate > self.SUBAGENT_CONTEXT_LIMIT * self.model_context_limit:
            # Delegate to fresh subagent
            return self.delegate_to_subagent(question, session_state)
        else:
            # Handle in main thread
            return self.handle_in_thread(question)
    
    def delegate_to_subagent(self, question: str, session_state: dict) -> str:
        """
        Spawn a subagent with ONLY the context it needs.
        No full conversation history — starts fresh.
        """
        minimal_context = self.extract_minimal_context(question, session_state)
        
        subagent_prompt = f"""
        You are a clinical data specialist. Answer this specific question:
        
        QUESTION: {question}
        
        PATIENT CONTEXT (only what you need):
        {json.dumps(minimal_context, indent=2)}
        
        Return a structured JSON answer with source_ref for each value.
        """
        
        # Subagent starts with fresh, minimal context
        return self.client.run_subagent(
            prompt=subagent_prompt,
            tools=["query_labs", "query_medications"],  # scoped tools only
            max_turns=3
        )
```

---

## Success Criteria

- [ ] Baseline degradation test shows accuracy cliff between turns 3–5 (approximately 40% fill)
- [ ] Context budgeting prevents fill from exceeding 35% — degradation cliff never reached
- [ ] Scratchpad files successfully store full tool results outside context window
- [ ] Selective loader reduces per-turn context by at least 60% compared to baseline
- [ ] Subagent delegation produces correct answers on turn 6+ that baseline agent gets wrong
- [ ] Token cost per session reduced by at least 40% (measure with `count_tokens()`)

---

## 🔁 Adapt This to Your Own Business

The scenario is a **clinical decision agent**, but context rot hits *any* agent whose conversations grow long: the accuracy cliff at ~40–50% context fill is model behavior, not a healthcare quirk.

### Step 1 — Find your "long session"

Identify where your users have **multi-turn, data-heavy conversations** — that's where rot silently sets in.

| Industry | The long session | What degrades after a few turns |
|----------|------------------|---------------------------------|
| **Customer support** | Multi-issue troubleshooting thread | Agent forgets the earlier ticket detail |
| **Financial services** | Portfolio review across many holdings | Mixes up figures between accounts |
| **Legal** | Long contract / discovery review | Misattributes a clause to the wrong document |
| **Field service** | Multi-step diagnostic session | Recommends a part from an earlier, unrelated case |
| **Sales / RevOps** | Deal-desk Q&A across accounts | Quotes terms from a different opportunity |
| **IT / SRE** | Long incident-response chat | Loses the original error while chasing new logs |

### Step 2 — Map the building blocks to your stack (Microsoft-first)

| In this challenge | In your project — replace with |
|-------------------|--------------------------------|
| `tiktoken` counting | Same — tiktoken is the correct tokenizer for Azure OpenAI GPT-4o/4.1 |
| `.scratchpad/*.json` | **Azure Blob Storage**, **OneLake**, or **Azure Cosmos DB** — durable store outside the context window |
| `classify_data_needs()` | A cheap **Azure OpenAI** model (e.g. `gpt-4o-mini`) as a router |
| `ClinicalCoordinator` subagents | **Azure AI Foundry Agent Service** connected/hosted agents with fresh context |
| Context-fill logging | **Azure AI Foundry Tracing** span attribute + **Azure Monitor** alerts |

### Step 3 — The 5-question implementation checklist

1. **What is your context limit, and what % is one typical tool result?** If one result exceeds 10% of the window → you will hit the cliff fast.
2. **Do raw tool results stay in the thread forever?** If yes → offload to a scratchpad store and pass a summary + pointer.
3. **Does every turn reload the entire history?** If yes → add selective loading (classify, then load only what's needed).
4. **At what fill % do you delegate to a fresh agent?** If the answer is "over 50%" or "never" → move it to ~30%.
5. **Can you see context-fill % per turn in a dashboard?** If not → add the trace span before you tune anything.

### Step 4 — A 1-week rollout plan

| Day | Action | Owner |
|-----|--------|-------|
| **Day 1** | Instrument context-fill % per turn (Foundry Tracing) on one real agent | Eng lead |
| **Day 2** | Run the degradation harness; find *your* cliff turn | QA / eng |
| **Day 3** | Add per-turn token budget + scratchpad offload (Blob/OneLake/Cosmos) | Backend dev |
| **Day 4** | Add selective loading + a `gpt-4o-mini` router | Backend dev |
| **Day 5** | Delegate heavy turns to Foundry Agent Service; re-run harness | Backend dev |

### Step 5 — Prove the ROI

- **Accuracy retention** — accuracy at turn 8 ÷ accuracy at turn 1 *(target: ≥ 0.95)*.
- **Peak context fill** — max fill % across a real session *(target: ≤ 35%)*.
- **Cost per session** — tokens × price; budgeting typically cuts this **40%+**.

> 💡 **Rule of thumb:** if your agent "gets dumber the longer you talk to it," you have a context-budget problem, not a model problem. Cap the fill before you change the model.

### Doing this solo (no team, portfolio-first)

No team, no budget? A clean "accuracy vs. conversation length" chart is a standout portfolio piece — it proves you understand *why* agents degrade. Run the week solo:

- **Mon–Tue** — run the degradation harness on gpt-4o and find *your* accuracy cliff; log context-fill % per turn.
- **Wed–Thu** — add a per-turn token budget + scratchpad offload (local JSON now; Blob/Cosmos later) + selective loading with a cheap `gpt-4o-mini` router.
- **Fri** — re-run the harness and chart accuracy-vs-turn before/after.

📦 **Ship this artifact:** a notebook/repo with the accuracy-vs-turn chart showing retention rising to ≥ 0.95 and peak fill capped at ≤ 35%. Resume bullet: *"Eliminated multi-turn context rot — held agent accuracy at 95% of turn-1 through turn 8 while cutting per-session token cost 40%."*

> 🆓 **Free-tier path:** a `gpt-4o-mini` router + a local JSON scratchpad make this a pennies-per-run experiment.

---

## Regulatory Mapping

| Regulation | Requirement | How This Challenge Addresses It |
|-----------|-------------|--------------------------------|
| **HIPAA §164.312** | Information accuracy and integrity for PHI | Accuracy preserved below degradation threshold |
| **EU AI Act Art. 9** | Risk management for high-risk AI (medical) | Degradation monitoring as continuous risk control |
| **FDA AI/ML SaMD Guidance** | Performance monitoring post-deployment | Degradation test harness as ongoing accuracy audit |
| **Joint Commission Standards** | Clinical decision support accuracy | Context budgeting as architecture safeguard |

---

## Break & Fix

```python
# broken_context_manager.py
class BrokenContextManager:
    
    def trim_context(self, thread_messages):
        # "Fix" 1: Remove oldest messages when context is full
        while count_tokens(thread_messages) > MAX_TOKENS:
            thread_messages.pop(0)   # ← what critical problem does this cause?
        return thread_messages
    
    def summarize(self, tool_result):
        # "Fix" 2: Summarize every tool result to 100 tokens
        return llm.summarize(tool_result, max_tokens=100)  # ← when does this fail?
    
    def should_delegate(self, context_fill):
        # "Fix" 3: Delegate when context is 80% full
        return context_fill > 0.80   # ← why is this threshold wrong?
```

:::details Click to reveal answers
1. **Removing oldest messages corrupts the system prompt**: The system prompt is always the first message. Popping from index 0 removes it, destroying all behavioral guardrails. Always keep the system prompt; trim middle tool results instead.
2. **100-token summary loses clinical precision**: Lab values, medication doses, and vital signs must be exact. A summary like "blood pressure was elevated" is useless compared to "BP 145/92 on 2026-03-14." Clinical data needs numeric precision, not prose summaries.
3. **80% threshold is past the cliff**: The degradation cliff occurs at 40–50%. By the time you delegate at 80%, the model has already been operating in "collapsed accuracy" mode for 30–40% of the context window — potentially dozens of turns of degraded clinical answers.
:::

---

## Knowledge Check

1. A clinical coordinator session fills 35% of context after turn 4 (each turn adds ~3,000 tokens). How many turns until the 40% cliff? What is your mitigation strategy?
2. Why does selective context loading require a classification step? What happens if you skip it and always load all scratchpad data?
3. A subagent is delegated a question but its minimal context is still 38% of the context window. What options do you have?
4. A care coordinator reports: "The agent gave me the right answer on turn 1, wrong answer on turn 5, right answer again on turn 6." What explains this pattern?

---

## 📚 Tools & References

### Key Tools for This Challenge

> **Microsoft-first:** lead with Azure-native tooling. Third-party tools are listed only where they add reliable, best-in-class capability not yet covered natively.

| Tool | Role in This Challenge | Link |
|------|----------------------|------|
| **Azure AI Foundry Tracing** | Capture context-window fill % as a custom span attribute on every agent turn — surface degradation in dashboards | [Docs](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-setup) |
| **Azure AI Foundry Agent Service** | Delegate data-heavy turns to connected/hosted agents that start with fresh context — the production form of Task 4 | [Docs](https://learn.microsoft.com/azure/foundry/agents/overview) |
| **Azure Blob / OneLake / Cosmos DB** | Durable scratchpad — hold full tool results outside the context window | [Blob](https://learn.microsoft.com/azure/storage/blobs/) · [OneLake](https://learn.microsoft.com/fabric/onelake/onelake-overview) · [Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/introduction) |
| **Azure AI Foundry Evaluations** | Multi-turn evaluation — verify accuracy holds across long sessions, not just single turns | [Docs](https://learn.microsoft.com/azure/foundry/observability/how-to/evaluate-agent) |
| tiktoken *(third-party)* | Measure **exact token counts** per turn, per tool result, per context snapshot before each LLM call | [GitHub](https://github.com/openai/tiktoken) |
| Langfuse *(third-party)* | Open-source session tracing — visualize context growth across turns to find the exact turn where degradation began | [langfuse.com](https://langfuse.com) |
| Arize Phoenix *(third-party)* | Detect context drift in production — alerts when accuracy correlates with rising context fill | [GitHub](https://github.com/Arize-ai/phoenix) |
| Confident AI *(third-party)* | Multi-turn agent evaluation — measures whether accuracy holds across long sessions | [confident-ai.com](https://www.confident-ai.com) |

### Required Reading

| Resource | Why It Matters |
|----------|---------------|
| [Lost in the Middle (arXiv:2601.15300)](https://arxiv.org/abs/2601.15300) | The research proving the 40–50% context cliff — **read this before building any long-session agent** |
| [Same Task, More Tokens (arXiv:2510.05381)](https://arxiv.org/abs/2510.05381) | Proves that adding more context hurts performance even when retrieval is perfect — the context-length paradox |
| [Context engineering for AI agents (Azure Architecture Center)](https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns) | Microsoft guidance on managing agent context and memory in production |
| [The LLM-as-Analyst Trap, Part 1](https://appliedingenuity.substack.com/p/the-llm-as-analyst-trap-a-technical) | Section on "Multi-Turn Context Accumulation" — the healthcare scenario this challenge is based on |
