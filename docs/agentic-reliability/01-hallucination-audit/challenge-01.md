---
id: challenge-01
title: "Challenge 01 — The Hallucination Audit"
sidebar_label: Challenge 01 — Hallucination Audit
---

# Challenge 01 — The Hallucination Audit

## 🏦 Enterprise Scenario

> **Company:** Meridian Capital Partners — a mid-size asset management firm  
> **Situation:** Your team built an AI financial analyst agent in a weekend hackathon. It impressed everyone in the demo. Six weeks later, the CFO used it to prepare a board presentation. The slide deck contained **three incorrect figures** — a stock return was off by 12%, a volume stat belonged to a different ticker, and one number was entirely fabricated because the database was momentarily locked during the query.  
> **No one caught it before the board meeting.**

You are brought in as the AI Solution Architect to diagnose and fix the system before it causes a regulatory or reputational incident.

---

## The Core Problem: The Helpfulness Paradox

The "Simple Agentic" pattern has a fatal flaw: **LLMs are trained to be helpful, not correct**. When a tool fails — database locked, network timeout, permission error — a well-meaning agent does not stop. It hallucinates plausible data from its training weights and presents it with the same polished formatting as real data.

```
# What the tool returned (INTERNAL ERROR):
{"ticker": "META", "error": "IO Error: Could not set lock on file..."}

# What the agent told the user 8 turns later:
"Meta Platforms (META) delivered the strongest upside in 2024.
| Stock | Approx. 2024 % Gain |
|-------|---------------------|
| META  | ≈ 30%               |  ← FABRICATED from training data
| AMZN  | ≈ 10%               |  ← FABRICATED
| NFLX  | ≈ -5%               |  ← FABRICATED"
```

The model generated rounded "approximate" figures that looked professional — entirely disconnected from actual database records.

---

## Architecture Decision Table

| Approach | Accuracy Guarantee | Auditability | Complexity |
|----------|-------------------|--------------|------------|
| ❌ Simple Agentic (no guardrails) | None — silent hallucination | None | Low |
| ⚠️ Prompt-only restriction ("only use real data") | Probabilistic — bypassable | None | Low |
| ✅ PostToolUse hook + hard stop on error | Deterministic | Full | Medium |
| ✅ Structured error response + validation layer | Deterministic | Full + traceable | Medium |

**Decision:** Use `PostToolUse` hooks combined with structured error contracts on every tool. Never allow the LLM to "work around" a tool failure.

---

## 🧰 Before You Start — Environment Setup

This challenge is hands-on. The tasks below assume you already have a model to call and a database to query. **If you have never built an agent before, do the five steps in order** — by the end you'll have a running agent that you can watch hallucinate, which is the whole point of Task 1. Budget ~30 minutes for setup.

### Prerequisites

| Requirement | Why you need it | How to get / check it |
|-------------|-----------------|-----------------------|
| Python 3.10+ | Async agent loop + dataclasses | `python --version` → if missing, install from [python.org/downloads](https://www.python.org/downloads/) |
| An **Azure subscription** | To create the Azure OpenAI model in Step 1 | [azure.microsoft.com/free](https://azure.microsoft.com/free/) — free tier is enough |
| **Azure CLI** | Lets your code sign in without pasting API keys | `az version` → if missing, [install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) |
| **Azure OpenAI** model via [Azure AI Foundry](https://ai.azure.com) | The model that powers the agent — **Microsoft-first primary path** | You'll deploy `gpt-4o` in **Step 1** below |
| System of record — **Azure SQL Database** / **Microsoft Fabric (OneLake)** in production; DuckDB as a zero-cost *local* stand-in here | Deterministic data layer (same query → same result) | Installed via `pip` in Step 0 |
| VS Code + a terminal | You must read the raw message thread | [code.visualstudio.com](https://code.visualstudio.com) |

### Step 0 — Create an isolated workspace (5 min)

A virtual environment (`venv`) keeps this challenge's packages separate from the rest of your machine, so nothing you install here can break another project.

```bash
mkdir hallucination-audit && cd hallucination-audit
python -m venv .venv

# Activate it (your prompt should then start with "(.venv)"):
# Windows (PowerShell):  .venv\Scripts\Activate.ps1
# Windows (cmd):         .venv\Scripts\activate.bat
# macOS/Linux:           source .venv/bin/activate

# Microsoft-first stack. duckdb is only the local, offline stand-in for the system of record.
pip install azure-ai-projects azure-identity openai pydantic tiktoken duckdb python-dotenv
```

✅ **You're done with this step when** your terminal prompt shows `(.venv)` and `pip list` includes `azure-ai-projects`.

### Step 1 — Deploy a model in Azure AI Foundry — *this is the "where do I go"* (10 min)

The tasks call a real model. Here is exactly where to click to create one and the **two values you must copy**. Follow the official quickstart if you get stuck: [Create and deploy an Azure OpenAI resource](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/create-resource).

1. Go to **[ai.azure.com](https://ai.azure.com)** and sign in with your Azure account.
2. Click **+ Create project** (accept the default new resource/hub it offers). Wait ~1 min for it to provision.
3. In the left pane under **My assets**, click **Models + endpoints**.
4. Click **+ Deploy model → Deploy base model**, search **`gpt-4o`**, select it, click **Confirm → Deploy**.
5. Open the deployment you just created and **copy two things**:
   - the **Deployment name** (e.g. `gpt-4o`) → you'll set it as `MODEL_DEPLOYMENT_NAME`
   - your **project's endpoint** — from the project **Overview** page, the **Azure AI Foundry project endpoint** (looks like `https://<your-project>.services.ai.azure.com/api/projects/<name>`) → you'll set it as `PROJECT_ENDPOINT`

> 💡 **New to Foundry?** The [get-started overview](https://learn.microsoft.com/azure/ai-foundry/openai/overview#get-started-with-azure-openai) walks through the portal with screenshots.

### Step 2 — Wire up authentication (5 min)

The task code uses `DefaultAzureCredential`, which means **no API keys in your code** — it signs in as *you* via the Azure CLI. This is the Microsoft-recommended, keyless pattern.

```bash
# 1. Sign in once (opens a browser). Your code reuses this session.
az login

# 2. Save the two values from Step 1 into a .env file (never commit this file).
#    Windows PowerShell:
#      "PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<name>" | Out-File .env -Encoding utf8
#      "MODEL_DEPLOYMENT_NAME=gpt-4o" | Out-File .env -Append -Encoding utf8
#    macOS/Linux:
#      echo 'PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<name>' >> .env
#      echo 'MODEL_DEPLOYMENT_NAME=gpt-4o' >> .env
```

Your task scripts load these two lines at the top:

```python
import os
from dotenv import load_dotenv
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

load_dotenv()
project = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential(),
)
DEPLOYMENT = os.environ["MODEL_DEPLOYMENT_NAME"]
```

### Step 3 — Seed a small, KNOWN dataset (5 min)

You cannot *detect* a hallucination unless you know the ground truth. Create a tiny table where you know every value — then any "extra" number the agent produces is **provably fabricated**.

```python
# seed.py — sample values you control (not real market data).
# The point: YOU know these 5 numbers, so anything else the agent shows is fabricated.
import duckdb
con = duckdb.connect("stock_prices.duckdb")
con.execute("CREATE TABLE stock_prices (ticker VARCHAR, date DATE, close DOUBLE)")
con.executemany(
    "INSERT INTO stock_prices VALUES (?, ?, ?)",
    [("META", "2024-12-31", 500.00), ("AMZN", "2024-12-31", 200.00),
     ("NFLX", "2024-12-31", 800.00), ("META", "2024-01-02", 350.00),
     ("AMZN", "2024-01-02", 150.00)],
)
print(con.execute("SELECT * FROM stock_prices").fetchall())
```

Run it: `python seed.py`. You should see the 5 rows printed back.

> 🟦 **Microsoft-first note:** DuckDB is used here only as a zero-setup, deterministic *local* stand-in so you can focus on the guardrail pattern. In production — at Microsoft or on a customer engagement — the system of record is **Azure SQL Database**, **Microsoft Fabric / OneLake**, **Azure Cosmos DB**, or **Dataverse**. The guardrail architecture in Tasks 2–4 is identical regardless of the backing store.

### Step 4 — Smoke-test the connection (2 min)

Before Task 1, confirm the model actually answers. If this prints a reply, your endpoint, deployment name, and `az login` are all correct — so any failure later is *your agent logic*, not setup.

```python
# smoke_test.py — proves Steps 1–2 work end to end.
import os
from dotenv import load_dotenv
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

load_dotenv()
project = AIProjectClient(endpoint=os.environ["PROJECT_ENDPOINT"], credential=DefaultAzureCredential())
client = project.inference.get_azure_openai_client(api_version="2024-10-21")
resp = client.chat.completions.create(
    model=os.environ["MODEL_DEPLOYMENT_NAME"],
    messages=[{"role": "user", "content": "Reply with exactly: setup works"}],
)
print(resp.choices[0].message.content)
```

✅ **You're ready for the tasks when** `python smoke_test.py` prints `setup works`.

> **Common fixes:** `DefaultAzureCredential failed` → run `az login` again. `DeploymentNotFound` → `MODEL_DEPLOYMENT_NAME` must match the name from Step 1.5 exactly. `401 / PermissionDenied` → in the portal, give your account the **Azure AI User** role on the project (Access control → Add role assignment).

### The path through this challenge

1. **Task 1** — reproduce the failure (watch the agent lie).
2. **Task 2** — give tools a structured error contract (make failures legible).
3. **Task 3** — add a `PostToolUse` hook (make correct behavior *enforced*, not suggested).
4. **Task 4** — add a validator (cross-check even successful runs).
5. **Success Criteria** — prove each guardrail works.
6. **Adapt to Your Business** — replace "stocks" with *your* domain.

> ⏱️ **Time budget:** ~30 min setup, then ~2–3 hours for the tasks. Do Tasks 1–3 in one sitting — they build on each other.

---

## Tasks

### Task 1 — Reproduce the Failure

Build the "Simple Agentic" baseline. Simulate a database lock and observe the agent's behavior.

```python
# simple_agent.py — the broken baseline
import json
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

# Tool that can silently fail
def query_financial_data(ticker: str, start_date: str, end_date: str) -> dict:
    try:
        # Simulate DB lock
        raise IOError("Could not set lock on file: stock_prices.duckdb")
        # return db.query(ticker, start_date, end_date)
    except Exception as e:
        # BAD: returns a vague error — LLM will try to "help anyway"
        return {"error": str(e)}

# Run query — watch agent hallucinate past the error
result = run_agent(
    query="Which FANG stock had the highest percent gain in 2024?",
    tools=[query_financial_data]
)
print(result)
# Expected: ERROR or refusal
# Actual:   Polished table of fabricated data
```

**Observe:** Run this and inspect the full message thread. Count how many turns the agent spent "trying" before it hallucinated a final answer. Note the formatting — it looks identical to a real result.

---

### Task 2 — Implement Structured Error Contracts

Replace vague error returns with structured error objects that signal the agent to stop.

```python
# tool_contracts.py — structured error responses
from dataclasses import dataclass
from typing import Optional

@dataclass
class ToolResult:
    success: bool
    data: Optional[dict] = None
    error: Optional[str] = None
    error_category: Optional[str] = None   # "transient" | "permanent" | "scope"
    is_retryable: bool = False
    source_ref: Optional[str] = None        # audit trail: DB table + query hash

def query_financial_data(ticker: str, start_date: str, end_date: str) -> ToolResult:
    try:
        rows = db.execute(
            "SELECT * FROM stock_prices WHERE ticker=? AND date BETWEEN ? AND ?",
            [ticker, start_date, end_date]
        ).fetchall()
        
        return ToolResult(
            success=True,
            data={"ticker": ticker, "rows": rows},
            source_ref=f"stock_prices:ticker={ticker}:{start_date}:{end_date}"
        )
    except IOError as e:
        return ToolResult(
            success=False,
            error=str(e),
            error_category="transient",
            is_retryable=True   # tell agent: retry once, then stop
        )
    except Exception as e:
        return ToolResult(
            success=False,
            error=str(e),
            error_category="permanent",
            is_retryable=False  # tell agent: STOP, do not hallucinate
        )
```

**Test:** Trigger the same lock error. Verify the agent now returns a clear error message instead of fabricated data.

---

### Task 3 — Add PostToolUse Hook (Hard Stop)

The structured error contract tells the agent what happened. The `PostToolUse` hook **enforces** the correct behavior deterministically — no prompt needed.

```python
# hooks.py — deterministic guardrails
import json

def post_tool_use_hook(tool_name: str, tool_result: dict) -> dict:
    """
    Intercepts every tool result BEFORE the LLM sees it.
    Hard-stops on permanent errors — removes the 'opportunity' to hallucinate.
    """
    result = ToolResult(**json.loads(tool_result))
    
    if not result.success and not result.is_retryable:
        # Inject a STOP signal — agent cannot continue
        return {
            "action": "TERMINATE",
            "message": (
                f"Tool '{tool_name}' returned a permanent error: {result.error}. "
                "Cannot generate an answer without verified data. "
                "Please try again when the data source is available."
            ),
            "source_error": result.error_category
        }
    
    if not result.success and result.is_retryable:
        # Allow one retry, then stop
        return {
            "action": "RETRY_ONCE",
            "message": f"Transient error on '{tool_name}'. Retrying..."
        }
    
    # Success: pass through with source reference intact
    return {
        "action": "CONTINUE",
        "data": result.data,
        "source_ref": result.source_ref   # audit trail preserved
    }
```

**Why this beats prompt-based guardrails:** A prompt saying "only use real data" is probabilistic — the model can reason around it ("I'll note these are estimates"). The `PostToolUse` hook fires in Python code, before the LLM's reasoning loop. It is **deterministic by construction**.

---

### Task 4 — Build the Validation Layer

Even when tools succeed, verify the LLM reported the data it received — not something else.

```python
# validator.py — verify LLM output matches source data
import re

def validate_financial_output(
    llm_response: str,
    source_data: dict,
    tolerance: float = 0.01
) -> dict:
    """
    Extracts all numbers from LLM response and cross-references
    against the source data returned by tools.
    Returns a verification report.
    """
    # Extract all dollar amounts and percentages from response
    numbers_in_response = re.findall(r'\$?([\d,]+\.?\d*)\s*%?', llm_response)
    
    verification_results = []
    for num_str in numbers_in_response:
        num = float(num_str.replace(',', ''))
        # Check if this number appears in source data within tolerance
        found = any(
            abs(num - float(str(val).replace(',', ''))) <= tolerance
            for val in flatten_values(source_data)
        )
        verification_results.append({
            "value": num,
            "verified": found,
            "source_ref": find_source(num, source_data) if found else None
        })
    
    unverified = [r for r in verification_results if not r["verified"]]
    return {
        "all_verified": len(unverified) == 0,
        "unverified_values": unverified,
        "verification_rate": (len(verification_results) - len(unverified)) / max(len(verification_results), 1)
    }

def flatten_values(data: dict) -> list:
    """Recursively extract all numeric values from tool result."""
    values = []
    for v in data.values():
        if isinstance(v, (int, float)):
            values.append(v)
        elif isinstance(v, dict):
            values.extend(flatten_values(v))
        elif isinstance(v, list):
            for item in v:
                if isinstance(item, dict):
                    values.extend(flatten_values(item))
                elif isinstance(item, (int, float)):
                    values.append(item)
    return values
```

---

## Success Criteria

- [ ] Baseline agent reproduces hallucination when DB is locked
- [ ] Structured error contract returns `is_retryable: false` for permanent failures
- [ ] `PostToolUse` hook hard-stops the agent on permanent errors — zero hallucinated responses
- [ ] Validation layer flags any number in the response not traceable to source data
- [ ] System returns a **clear, honest error message** to the user rather than fabricated data
- [ ] All tool results include `source_ref` for audit trail

---

## 🔁 Adapt This to Your Own Business

The scenario uses a **financial analyst agent**, but the failure mode is universal: *any agent that calls a tool which can fail will fabricate an answer rather than admit failure.* Here is how to port this challenge to your own domain, step by step.

### Step 1 — Find your "board report moment"

Identify the one AI output in your organization where **a silent wrong answer causes real damage**. That is your equivalent of the CFO's board deck. Write it down as one sentence: *"When our agent is wrong about ___, we lose ___."*

| Industry | The tool that can fail | The fabrication that hurts |
|----------|------------------------|----------------------------|
| **Healthcare** | EHR / lab-results lookup | Agent invents a dosage or lab value |
| **Legal** | Case-law / contract database | Agent cites a case or clause that doesn't exist |
| **Insurance** | Claims / policy system | Agent quotes coverage that isn't in the policy |
| **Manufacturing** | ERP / inventory API | Agent reports stock or lead-time that isn't real |
| **Retail / e-commerce** | Pricing / catalog service | Agent confirms a price or SKU that's wrong |
| **Any SaaS** | Internal REST API | Agent returns a metric from training data, not your DB |

### Step 2 — Map the four building blocks to your stack

Nothing in the solution is finance-specific. Swap the labels, keep the architecture:

| In this challenge | In your project — replace with |
|-------------------|--------------------------------|
| `query_financial_data()` tool | Your real data tool — an **Azure SQL / Fabric** query, an **Azure Functions** REST tool, or an **Azure AI Search** RAG retriever; any REST/GraphQL API |
| `stock_prices.duckdb` | Your system of record — **Azure SQL Database, Microsoft Fabric / OneLake, Azure Cosmos DB, Dataverse** first; third-party (Snowflake, Postgres, SAP, Salesforce, ServiceNow) only if that's where the data already lives |
| `ToolResult` contract | The **same** contract — it's domain-agnostic; keep `success / error_category / is_retryable / source_ref` |
| `validate_financial_output()` | Your validator — swap the number check for your critical fields (codes, IDs, amounts, dates, names) |

### Step 3 — The 5-question implementation checklist

Run this against **any** agent you own, today. Each "no" is a task from this challenge:

1. **What does each tool return when it fails?** If it's a vague string, you have the bug → add a structured error contract (Task 2).
2. **Can the model "continue" after a failed tool call?** If yes → add a `PostToolUse` hard stop (Task 3).
3. **Is every fact in the output traceable to a source?** If not → add `source_ref` + a validator (Task 4).
4. **What's the honest failure message the user should see?** Write it now, before you need it in production.
5. **Could you prove a value's origin to an auditor, regulator, or customer?** If you can't in one click → you have no audit trail yet.

### Step 4 — A 1-week rollout plan for a real team

| Day | Action | Owner |
|-----|--------|-------|
| **Day 1** | Inventory every tool your agent can call; list each one's failure modes | Eng lead |
| **Day 2** | Add the `ToolResult` contract to the 1–2 highest-risk tools | Backend dev |
| **Day 3** | Add `PostToolUse` hard-stop + honest error message | Backend dev |
| **Day 4** | Add a validator on the output's critical fields | Backend dev |
| **Day 5** | Run the "Break & Fix" tests below against *your* system; log the results | QA / eng lead |

### Step 5 — Prove the ROI to leadership

Measure two numbers before and after. This is the slide that justifies the work:

- **Silent-failure rate** — % of failed tool calls that still produced a confident answer *(target: → 0%)*.
- **Traceability rate** — % of output values that carry a valid `source_ref` *(target: → 100%)*.

> 💡 **Rule of thumb:** if you cannot answer *"where did this number come from?"* in one click, the system is not production-ready — no matter how good the demo looked.

### Doing this solo (no team, portfolio-first)

No team, no budget? This is one of the most hireable things you can show — it proves you build **trustworthy** agents, not just demos. Run the same week as one person:

- **Mon–Tue** — build one tool that can fail + the `ToolResult` contract on a free public dataset (or the DuckDB stand-in from setup).
- **Wed–Thu** — add the `PostToolUse` hard-stop, the honest error message, and the `source_ref` validator.
- **Fri** — record the **before/after** on the two ROI numbers above (silent-failure rate → 0%, traceability → 100%) in the README.

📦 **Ship this artifact:** a small public GitHub repo with a 3-line "problem → fix → measured result" summary and a screenshot of the agent *refusing* to answer when the tool fails instead of fabricating. Resume bullet: *"Cut agent silent-failure rate to 0% and made 100% of outputs source-traceable with a tool-result contract + validation gate."*

> 🆓 **Free-tier path:** the Azure OpenAI consumption tier plus the local DuckDB stand-in run this for cents — cost is never the blocker.

---

## Regulatory Mapping

| Regulation | Requirement | How This Challenge Addresses It |
|-----------|-------------|--------------------------------|
| **EU AI Act Art. 13** | Transparency — users must know AI limitations | Hard stop + honest error message instead of hallucination |
| **EU AI Act Art. 14** | Human oversight — humans can intervene | Validation layer flags unverified values for review |
| **SOX Section 302** | Executives certify financial report accuracy | Source refs + validation report provide audit evidence |
| **FINRA Rule 4511** | Books and records — traceable data | `source_ref` on every output value |

---

## Break & Fix

Your colleague made these "improvements." Find and explain each bug:

```python
# broken_agent.py
def post_tool_use_hook(tool_name, tool_result):
    result = json.loads(tool_result)
    
    # "Fix" 1: Be more helpful by allowing retries
    if result.get("error"):
        return {"action": "RETRY", "attempts": 999}  # ← what's wrong here?
    
    # "Fix" 2: Pass through all data to context
    return {"action": "CONTINUE", "data": result}    # ← what's missing?

def validate_output(response, source):
    numbers = re.findall(r'\d+\.?\d*', response)
    # "Fix" 3: Use exact match only, no tolerance
    return all(float(n) in [float(v) for v in flatten_values(source)]
               for n in numbers)                     # ← why does this fail?
```

:::details Click to reveal answers
1. **Infinite retry loop**: `attempts: 999` means the agent will attempt 999 tool calls, burning massive tokens and eventually hallucinating anyway when it "gives up." Should be `RETRY_ONCE` then `TERMINATE`.
2. **Missing `source_ref`**: Passing raw data without a source reference breaks the audit trail. Every value must be traceable.
3. **Exact match breaks on rounding**: DB stores `174.4199981689453`, LLM outputs `174.42`. Exact match fails, flagging a correct answer as unverified. Use tolerance-based matching (e.g., `abs(a-b) < 0.01`).
:::

---

## Knowledge Check

1. Why is a `PostToolUse` hook more reliable than a system prompt instruction like "never make up data"?
2. What is the difference between `is_retryable: true` and `is_retryable: false` in the error contract? Give a real example of each.
3. An agent correctly fetches `$174.4199` from the DB but displays `$174.42`. The validation layer flags this as unverified. How do you fix the validator without losing accuracy guarantees?
4. A regulator asks: "Can you prove the $91.80 in this report came from your database?" What does your system need to provide?

---

## 📚 Tools & References

### Key Tools for This Challenge

> **Microsoft-first:** lead with Azure-native tooling. Third-party tools are listed only where they add reliable, best-in-class capability not yet covered natively.

| Tool | Role in This Challenge | Link |
|------|----------------------|------|
| **Azure AI Foundry Evaluations** | Run the groundedness evaluator to score whether every LLM claim is supported by retrieved tool data | [Docs](https://learn.microsoft.com/azure/foundry/how-to/evaluate-generative-ai-app) |
| **Azure AI Foundry Tracing** | Capture per-turn spans including tool call inputs/outputs — reconstruct the exact path to every number | [Docs](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-setup) |
| **Azure SQL Database / Microsoft Fabric** | Recommended deterministic system of record — same SQL = same result = auditable | [Azure SQL](https://learn.microsoft.com/azure/azure-sql/) · [Fabric](https://learn.microsoft.com/fabric/) |
| **Azure Monitor / Application Insights** | Persist the audit trail (`source_ref`, validation results) as queryable telemetry | [Docs](https://learn.microsoft.com/azure/azure-monitor/fundamentals/overview) |
| DuckDB *(third-party)* | Zero-cost in-process OLAP database — local, offline stand-in for the system of record while you learn the pattern | [duckdb.org](https://duckdb.org) |
| Pydantic v2 *(third-party)* | Enforce structured error contracts on every tool response — validate schema before the LLM sees any data | [docs.pydantic.dev](https://docs.pydantic.dev) |
| tiktoken *(third-party)* | Count tokens consumed by tool results — essential for production cost monitoring and context budget tracking | [GitHub](https://github.com/openai/tiktoken) |
| RAGAS *(third-party)* | Faithfulness evaluator — measures if LLM claims are entailed by source tool data | [GitHub](https://github.com/explodinggradients/ragas) |
| Patronus AI *(third-party)* | Finance-specific hallucination detection with domain-aware scorers for regulated financial language | [patronus.ai](https://www.patronus.ai) |
| Braintrust *(third-party)* | Trace-to-eval pipeline — connect every production agent run to an evaluation score for continuous monitoring | [braintrust.dev](https://www.braintrust.dev) |

### Required Reading

| Resource | Why It Matters |
|----------|---------------|
| [The LLM-as-Analyst Trap, Part 1](https://appliedingenuity.substack.com/p/the-llm-as-analyst-trap-a-technical) | The original article describing the 5 failure modes this challenge is built from |
| [AgentHallu Benchmark (arXiv:2601.06818)](https://arxiv.org/abs/2601.06818) | Rigorous benchmarking showing that even frontier models fail in multi-step tool-use hallucination scenarios |
| [Azure AI Foundry — Groundedness Evaluator](https://learn.microsoft.com/azure/foundry/concepts/evaluation-evaluators/rag-evaluators) | How to run production groundedness scoring on agent outputs at scale |

---

## Cleanup

```bash
# Remove simulated lock files
rm -f *.lock stock_prices.duckdb.lock

# Reset agent conversation threads
az ai agent thread delete --thread-id $THREAD_ID

# Review audit logs
cat audit_trail.jsonl | jq '.[] | select(.verified == false)'
```
