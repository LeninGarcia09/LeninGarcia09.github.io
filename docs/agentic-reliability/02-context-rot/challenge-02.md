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

## ?? Tools & References

### Key Tools for This Challenge

| Tool | Role in This Challenge | Link |
|------|----------------------|------|
| **tiktoken** | The most important tool for this challenge � measure **exact token counts** per turn, per tool result, per context snapshot before each LLM call | [GitHub](https://github.com/openai/tiktoken) |
| **Azure AI Foundry Tracing** | Capture context window fill percentage as a custom span attribute on every agent turn � surface context degradation in dashboards | [Docs](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-setup) |
| **Langfuse** | Open-source session tracing � visualize context growth across turns to find the exact turn where degradation began | [langfuse.com](https://langfuse.com) |
| **Arize Phoenix** | Detect context drift in production � alerts when agent accuracy correlates with rising context fill percentage | [GitHub](https://github.com/Arize-ai/phoenix) |
| **LangChain ConversationTokenBufferMemory** | Drop-in token-aware memory trimming � automatically prunes conversation history to stay under a configurable token budget | [Docs](https://python.langchain.com/docs/modules/memory/) |
| **Confident AI** | Multi-turn agent evaluation � measures whether accuracy holds across long sessions, not just single-turn tests | [confident-ai.com](https://www.confident-ai.com) |

### Required Reading

| Resource | Why It Matters |
|----------|---------------|
| [Lost in the Middle (arXiv:2601.15300)](https://arxiv.org/abs/2601.15300) | The research paper proving the 40�50% context cliff � **read this before building any long-session agent** |
| [Same Task, More Tokens (arXiv:2510.05381)](https://arxiv.org/abs/2510.05381) | Proves that adding more context hurts performance even when retrieval is perfect � the context length paradox |
| [The LLM-as-Analyst Trap, Part 1](https://appliedingenuity.substack.com/p/the-llm-as-analyst-trap-a-technical) | Section on "Multi-Turn Context Accumulation" � the healthcare scenario this challenge is based on |
