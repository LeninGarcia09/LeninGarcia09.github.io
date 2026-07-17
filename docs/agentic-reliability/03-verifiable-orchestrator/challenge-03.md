---
id: challenge-03
title: "Challenge 03 — The Verifiable Orchestrator"
sidebar_label: Challenge 03 — Verifiable Orchestrator
---

# Challenge 03 — The Verifiable Orchestrator

## 🏛️ Enterprise Scenario

> **Company:** Vantage Analytics — a financial data services firm selling AI-generated market intelligence reports to institutional investors  
> **Situation:** FINRA has opened a review of your AI reporting system. The inquiry: "For each figure in your Q1 2026 AI-generated report, can you demonstrate it came directly from a data source, was computed deterministically, and was not altered by the AI model?"  
> **Current architecture:** Simple Agentic — LLM fetches data, performs calculations in-context, and formats output.  
> **Current answer to FINRA:** No. You cannot trace any number back to its source.

You have 30 days to re-architect before the formal audit.

---

## The Core Problem: The Black Box

In the "Simple Agentic" pattern, the LLM is simultaneously the planner, the calculator, and the formatter. The same model that decides to call a tool also performs arithmetic on the result and writes the final report. There is **no deterministic layer between source data and output**.

```
SIMPLE AGENTIC — The Black Box
──────────────────────────────
Database → [raw rows] → LLM context → [invisible transformation] → Report
                                       ↑
                         Did the LLM:
                         (a) copy the value correctly?
                         (b) round it differently?
                         (c) confuse it with a different ticker's data?
                         (d) hallucinate it entirely?
                         → YOU CANNOT TELL FROM THE OUTPUT
```

The "Verifiable Orchestrator" pattern solves this by giving the LLM **exactly one job**: parse user intent into structured query parameters. All computation, calculation, and output generation happens in deterministic Python code — outside the LLM's probabilistic reasoning.

```
VERIFIABLE ORCHESTRATOR
───────────────────────
User query
  → LLM [ONLY: extract intent → structured parameters]
  → Parameters [ticker=NFLX, start=2024-03-15, end=2025-03-14, metric=close]
  → Deterministic Python [fetch + calculate + format]
  → Output + source_ref [every number traceable to DB row + calculation]
  → User + Audit Log
```

---

## Architecture Decision Table

| Component | Simple Agentic | Verifiable Orchestrator |
|-----------|---------------|------------------------|
| Intent parsing | LLM | LLM |
| Data fetching | LLM decides tool params probabilistically | LLM outputs structured params → deterministic fetch |
| Calculation | LLM arithmetic (token prediction) | Python math (deterministic) |
| Formatting | LLM natural language | Template-based rendering |
| Audit trail | None | Every value has `source_ref` |
| Accuracy guarantee | None | 100% for fetched values, &lt;0.001% rounding only |
| Regulatory defensibility | None | Full — queryable audit log |

---

## 🧰 Before You Start — Environment Setup

This challenge is about **provable determinism**, so your setup must let you re-run the exact same computation and get byte-identical results. The LLM only parses intent; a deterministic engine does all the math.

### Prerequisites

| Requirement | Why you need it | How to check |
|-------------|-----------------|--------------|
| Python 3.10+ | Orchestrator + deterministic engine | `python --version` |
| **Azure OpenAI** via [Azure AI Foundry](https://ai.azure.com) with **Structured Outputs** | Force the LLM to emit a schema-validated `QuerySpec` and nothing else | Deploy `gpt-4o` + [structured outputs](https://learn.microsoft.com/azure/ai-services/openai/how-to/structured-outputs) |
| A deterministic SQL engine — **Azure SQL Database** or **Microsoft Fabric** (prod); DuckDB local | The same query must always return the same number — this is your audit backbone | Azure portal / `pip show duckdb` |
| An append-only audit store — **Azure SQL** or **Cosmos DB** (prod); local file here | Immutable chain of custody for every figure | Azure portal / `mkdir .audit` |
| **Azure AI Foundry — Tracing** | Record LLM spans vs deterministic-tool spans separately | [Docs](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-setup) |

### Step 0 — Create an isolated workspace (5 min)

```bash
mkdir verifiable-orchestrator && cd verifiable-orchestrator
python -m venv .venv
# Windows (PowerShell):  .venv\Scripts\Activate.ps1    |    macOS/Linux:  source .venv/bin/activate
pip install azure-ai-projects azure-identity openai pydantic duckdb python-dotenv
mkdir .audit   # local stand-in for the Azure SQL / Cosmos DB audit log
```

✅ **Done when** your prompt shows `(.venv)` and `pip list` includes `azure-ai-projects`.

### Step 1 — Provision your model & sign in (10 min)

This challenge forces the LLM to emit a schema-validated `QuerySpec` via **Structured Outputs**, so you need a deployed `gpt-4o`. If you have **not** deployed one yet, do **Steps 1–2 of [Challenge 01 — The Hallucination Audit](../01-hallucination-audit/challenge-01.md)** for the exact portal walkthrough and the two values below, then create a `.env`:

```bash
# .env  — from Azure AI Foundry (never commit this file)
# PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<name>
# MODEL_DEPLOYMENT_NAME=gpt-4o
az login   # keyless auth via DefaultAzureCredential
```

Confirm your model supports Structured Outputs and smoke-test the connection ([structured outputs reference](https://learn.microsoft.com/azure/ai-services/openai/how-to/structured-outputs)):

```python
# smoke_test.py — prints "setup works" when endpoint + deployment + az login are all correct
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

> **Common fixes:** `DefaultAzureCredential failed` → `az login` again. `DeploymentNotFound` → deployment name mismatch. `401` → add the **Azure AI User** role on the project.

### Step 2 — Seed a KNOWN dataset (10 min)

Load a small table of prices with values you already know (these are **sample values, not real market data**). Because you know the true numbers, you can prove your engine returns them exactly.

```python
# seed.py — sample values only, NOT real market data
ROWS = [
    ("NFLX", "2026-03-14", 605.88),
    ("NFLX", "2026-03-15", 611.20),
]
# In production this is an Azure SQL table or a Fabric Lakehouse table.
```

> 🟦 **Microsoft-first note:** DuckDB and the `.audit` folder are local stand-ins so you can run offline. In production the deterministic engine is **Azure SQL Database** or a **Microsoft Fabric** warehouse (SQL is deterministic by definition), and the append-only audit log lives in **Azure SQL** or **Azure Cosmos DB**. The orchestration pattern is identical.

### The path through this challenge

1. **Task 1** — write the intent-only LLM contract (structured outputs).
2. **Task 2** — build the deterministic computation layer.
3. **Task 3** — build the auditable output generator (`source_ref`).
4. **Task 4** — demonstrate regulatory defensibility (`prove_value()`).
5. **Success Criteria** — every number traces to a row + formula.
6. **Adapt to Your Business** — apply this to *your* regulated numbers.

> ⏱️ **Time budget:** ~3–4 hours. The deterministic engine (Task 2) is where the audit guarantee is won — invest there.

---

## Tasks

### Task 1 — Design the Intent-Only LLM Contract

The LLM's entire job is to convert natural language into a structured query specification. It never sees raw data.

```python
# intent_parser.py
from pydantic import BaseModel
from typing import Optional, List
from enum import Enum

class MetricType(str, Enum):
    CLOSE = "close"
    OPEN = "open"
    HIGH = "high"
    LOW = "low"
    VOLUME = "volume"
    ADJ_CLOSE = "adj_close"

class AggregationType(str, Enum):
    NONE = "none"           # return raw rows
    PERCENT_RETURN = "pct_return"
    MAX = "max"
    MIN = "min"
    AVERAGE = "avg"
    SUM = "sum"

class FinancialQuerySpec(BaseModel):
    """
    Structured query specification output by LLM.
    All fields are deterministic primitives — no prose, no calculations.
    """
    tickers: List[str]              # ["NFLX", "AMZN"]
    start_date: str                 # "2024-03-15" (YYYY-MM-DD)
    end_date: str                   # "2025-03-14"
    metric: MetricType              # what column to retrieve
    aggregation: AggregationType    # what computation to perform
    comparison: bool = False        # compare across tickers?
    intent_summary: str             # human-readable summary for audit log

INTENT_SYSTEM_PROMPT = """
You are a financial query parser. Convert user questions into structured query specifications.

CRITICAL RULES:
1. Output ONLY valid JSON matching the FinancialQuerySpec schema
2. Do NOT perform any calculations
3. Do NOT include any data values in your output
4. Do NOT add commentary or explanation
5. If the query is ambiguous, choose the most conservative interpretation

Today's date: {current_date}

Respond with JSON only.
"""

def parse_intent(user_query: str, current_date: str) -> FinancialQuerySpec:
    """
    Single LLM call with constrained output schema.
    LLM sees: user query + today's date.
    LLM outputs: structured parameters only.
    LLM never sees: raw data, calculation results, or previous tool outputs.
    """
    from azure.ai.projects import AIProjectClient
    from azure.ai.projects.models import ResponseFormatJsonSchema
    
    client = AIProjectClient.from_connection_string(
        conn_str=os.environ["AZURE_AI_PROJECTS_CONNECTION_STRING"],
        credential=DefaultAzureCredential()
    )
    
    response = client.agents.create_and_process_run(
        agent_id=INTENT_PARSER_AGENT_ID,
        thread_messages=[
            {"role": "system", "content": INTENT_SYSTEM_PROMPT.format(current_date=current_date)},
            {"role": "user", "content": user_query}
        ],
        response_format=ResponseFormatJsonSchema(
            name="FinancialQuerySpec",
            schema=FinancialQuerySpec.model_json_schema()
        )
    )
    
    return FinancialQuerySpec.model_validate_json(response.content)
```

**Key insight:** The LLM call uses `ResponseFormatJsonSchema` — the response is **schema-validated before it reaches your code**. The LLM cannot output prose, cannot include data values, and cannot add hallucinated context.

---

### Task 2 — Build the Deterministic Computation Layer

All math happens here, in Python, with full source traceability.

```python
# deterministic_engine.py
import duckdb
import hashlib
import json
from datetime import datetime
from typing import Optional

class ComputationResult:
    def __init__(self, value, source_ref: str, computation_log: list):
        self.value = value
        self.source_ref = source_ref      # e.g., "stock_prices:NFLX:2024-03-15:close"
        self.computation_log = computation_log  # step-by-step audit trail

class DeterministicEngine:
    
    def __init__(self, db_path: str):
        self.conn = duckdb.connect(db_path, read_only=True)
    
    def execute(self, spec: FinancialQuerySpec) -> dict:
        """
        Fetches data and performs computation entirely in Python.
        Returns results with full audit trail.
        """
        audit_log = []
        results = {}
        
        for ticker in spec.tickers:
            # Step 1: Fetch raw rows
            rows = self._fetch_rows(ticker, spec.start_date, spec.end_date, spec.metric)
            audit_log.append({
                "step": "fetch",
                "ticker": ticker,
                "query": f"SELECT {spec.metric} FROM stock_prices WHERE ticker='{ticker}' AND date BETWEEN '{spec.start_date}' AND '{spec.end_date}'",
                "row_count": len(rows),
                "query_hash": self._hash_query(ticker, spec)
            })
            
            # Step 2: Apply aggregation in Python (never in LLM)
            computed = self._aggregate(rows, spec.aggregation, spec.metric)
            audit_log.append({
                "step": "compute",
                "ticker": ticker,
                "aggregation": spec.aggregation,
                "input_values": [r[spec.metric] for r in rows[:5]],  # sample for audit
                "result": computed.value,
                "formula": self._describe_formula(spec.aggregation)
            })
            
            results[ticker] = ComputationResult(
                value=computed.value,
                source_ref=f"stock_prices:{ticker}:{spec.start_date}:{spec.end_date}:{spec.metric}:{spec.aggregation}",
                computation_log=audit_log.copy()
            )
        
        return results
    
    def _fetch_rows(self, ticker, start_date, end_date, metric):
        return self.conn.execute(
            f"SELECT date, {metric} FROM stock_prices "
            f"WHERE ticker=? AND date BETWEEN ? AND ? ORDER BY date",
            [ticker, start_date, end_date]
        ).fetchdf().to_dict(orient="records")
    
    def _aggregate(self, rows: list, aggregation: AggregationType, metric: str) -> ComputationResult:
        values = [row[metric] for row in rows if row[metric] is not None]
        
        if aggregation == AggregationType.NONE:
            return ComputationResult(values, "raw", [])
        elif aggregation == AggregationType.PERCENT_RETURN:
            # Formula: (last - first) / first * 100
            pct = ((values[-1] - values[0]) / values[0]) * 100
            return ComputationResult(
                round(pct, 4),
                f"pct_return:({values[-1]}-{values[0]})/{values[0]}*100",
                [{"first": values[0], "last": values[-1]}]
            )
        elif aggregation == AggregationType.MAX:
            max_val = max(values)
            max_date = rows[[r[metric] for r in rows].index(max_val)]["date"]
            return ComputationResult(max_val, f"max_of_{len(values)}_values:date={max_date}", [])
        # ... other aggregations
    
    def _hash_query(self, ticker, spec) -> str:
        """Content-addressable hash of the exact query — for immutable audit log."""
        query_str = f"{ticker}:{spec.start_date}:{spec.end_date}:{spec.metric}:{spec.aggregation}"
        return hashlib.sha256(query_str.encode()).hexdigest()[:16]
    
    def _describe_formula(self, aggregation: AggregationType) -> str:
        formulas = {
            AggregationType.PERCENT_RETURN: "(last_close - first_close) / first_close * 100",
            AggregationType.MAX: "max(values)",
            AggregationType.MIN: "min(values)",
            AggregationType.AVERAGE: "sum(values) / count(values)",
        }
        return formulas.get(aggregation, "raw")
```

---

### Task 3 — Build the Auditable Output Generator

Format output from computation results — never from LLM-generated prose.

```python
# output_generator.py
import json
from datetime import datetime

class AuditableReport:
    """
    Generates output from deterministic computation results.
    Every value in the output has a traceable source_ref.
    """
    
    def __init__(self, query_spec: FinancialQuerySpec, results: dict):
        self.spec = query_spec
        self.results = results
        self.generated_at = datetime.utcnow().isoformat()
    
    def to_markdown(self) -> str:
        """Generate human-readable report with inline source references."""
        lines = [
            f"## {self.spec.intent_summary}",
            f"*Generated: {self.generated_at} | Query: {self.spec.start_date} → {self.spec.end_date}*",
            "",
            "| Ticker | Value | Source Reference |",
            "|--------|-------|-----------------|"
        ]
        
        for ticker, result in self.results.items():
            formatted_value = self._format_value(result.value, self.spec.metric, self.spec.aggregation)
            lines.append(f"| {ticker} | {formatted_value} | `{result.source_ref}` |")
        
        return "\n".join(lines)
    
    def to_audit_record(self) -> dict:
        """
        Machine-readable audit record for regulatory submission.
        Contains complete provenance for every value.
        """
        return {
            "report_id": self._generate_report_id(),
            "generated_at": self.generated_at,
            "query_spec": self.spec.model_dump(),
            "values": {
                ticker: {
                    "value": result.value,
                    "source_ref": result.source_ref,
                    "computation_steps": result.computation_log,
                    "formula": result.computation_log[-1].get("formula") if result.computation_log else None
                }
                for ticker, result in self.results.items()
            }
        }
    
    def _format_value(self, value, metric, aggregation) -> str:
        if aggregation == AggregationType.PERCENT_RETURN:
            return f"{value:+.2f}%"
        elif metric in ["close", "open", "high", "low", "adj_close"]:
            return f"${value:,.2f}"
        elif metric == "volume":
            return f"{value:,}"
        return str(value)
    
    def _generate_report_id(self) -> str:
        import hashlib
        content = json.dumps(self.spec.model_dump(), sort_keys=True)
        return hashlib.sha256(content.encode()).hexdigest()[:12]

# Usage
def answer_query(user_question: str) -> tuple[str, dict]:
    """
    Full Verifiable Orchestrator pipeline.
    Returns (human_readable_answer, audit_record).
    """
    from datetime import date
    
    # 1. LLM parses intent ONLY
    spec = parse_intent(user_question, current_date=date.today().isoformat())
    
    # 2. Deterministic engine fetches + computes
    engine = DeterministicEngine(db_path="market_data.duckdb")
    results = engine.execute(spec)
    
    # 3. Template-based output (no LLM involvement)
    report = AuditableReport(spec, results)
    
    # 4. Persist audit record
    audit_record = report.to_audit_record()
    persist_to_audit_log(audit_record)
    
    return report.to_markdown(), audit_record
```

---

### Task 4 — Demonstrate Regulatory Defensibility

Simulate the FINRA audit inquiry. Given a report, prove every number.

```python
# audit_query.py
def prove_value(report_id: str, ticker: str, value: float) -> dict:
    """
    Given a report ID, ticker, and value — reconstruct the exact
    data retrieval and calculation that produced it.
    FINRA answer: "Here is the SQL, the raw rows, the formula, and the result."
    """
    # Load audit record
    audit_record = load_audit_log(report_id)
    value_record = audit_record["values"].get(ticker)
    
    if not value_record:
        return {"found": False, "report_id": report_id, "ticker": ticker}
    
    # Reconstruct the query
    spec = FinancialQuerySpec(**audit_record["query_spec"])
    engine = DeterministicEngine(db_path="market_data.duckdb")
    
    # Re-execute deterministically — result must match
    re_computed = engine.execute(spec)
    re_computed_value = re_computed[ticker].value
    
    match = abs(float(value) - float(re_computed_value)) < 0.01
    
    return {
        "found": True,
        "original_value": value,
        "recomputed_value": re_computed_value,
        "values_match": match,
        "source_ref": value_record["source_ref"],
        "sql_query": value_record["computation_steps"][0]["query"],
        "formula_applied": value_record["formula"],
        "computation_steps": value_record["computation_steps"],
        "defensible": match
    }
```

---

## Success Criteria

- [ ] LLM never sees raw data — only outputs structured `FinancialQuerySpec`
- [ ] All arithmetic performed in Python — verifiable by re-running the same function
- [ ] Every value in output has a `source_ref` pointing to exact DB rows and formula
- [ ] `prove_value()` returns `defensible: true` for every number in a test report
- [ ] System handles LLM schema-validation failures gracefully (prompt the user, don't hallucinate)
- [ ] Audit log is append-only and query-able by report ID, ticker, and date range

---

## 🔁 Adapt This to Your Own Business

The scenario is a **financial report under FINRA audit**, but the pattern applies to *any* business where a number must be **provably correct and traceable** — where "the AI probably got it right" is not good enough.

### Step 1 — Find your "every number must be defensible" moment

| Industry | The high-stakes numbers | Who audits them |
|----------|-------------------------|-----------------|
| **Financial services** | Returns, risk metrics, portfolio values | FINRA / SEC / auditors |
| **Healthcare billing** | Claim amounts, coding, reimbursements | CMS / payers |
| **Insurance** | Premiums, reserves, payout calculations | State regulators / actuaries |
| **Energy / commodities** | Settlement prices, volume calculations | FERC / exchanges |
| **Supply chain** | Landed cost, tariff, inventory valuation | Customs / finance |
| **Tax & accounting** | Taxable amounts, depreciation, credits | IRS / external auditors |

If a wrong number triggers a fine, a restatement, or a lawsuit → you need the Verifiable Orchestrator.

### Step 2 — Map the building blocks to your stack (Microsoft-first)

| In this challenge | In your project — replace with |
|-------------------|--------------------------------|
| Intent parser (LLM) | **Azure OpenAI Structured Outputs** — schema-validated params only |
| DuckDB engine | **Azure SQL Database** or **Microsoft Fabric** warehouse (deterministic SQL) |
| `source_ref` on each value | A row/formula pointer stored with each output field |
| Append-only audit log | **Azure SQL** (temporal tables) or **Azure Cosmos DB** |
| `prove_value()` | A stored procedure / API that replays the exact query |
| LLM-vs-tool span separation | **Azure AI Foundry Tracing** + **Application Insights** |

### Step 3 — The 5-question implementation checklist

1. **Does your LLM ever do arithmetic?** If yes → move all math into deterministic code/SQL. The LLM parses intent only.
2. **Can you re-run any output and get the identical number?** If no → your engine isn't deterministic yet.
3. **Does every displayed number carry a pointer to its source row + formula?** If no → add `source_ref`.
4. **Is your audit log append-only and immutable?** If it can be edited → it is not defensible.
5. **Can you answer "prove this number" in under a minute?** If not → build the `prove_value()` path.

### Step 4 — A 1-week rollout plan

| Day | Action | Owner |
|-----|--------|-------|
| **Day 1** | Inventory every AI-produced number and its blast radius | Compliance + eng |
| **Day 2** | Move intent parsing to Azure OpenAI Structured Outputs | Backend dev |
| **Day 3** | Move all computation into Azure SQL / Fabric (deterministic) | Data eng |
| **Day 4** | Add `source_ref` + append-only audit log (Azure SQL / Cosmos) | Backend dev |
| **Day 5** | Build `prove_value()` and run a mock audit | Eng + compliance |

### Step 5 — Prove the ROI

- **Traceability coverage** — % of output numbers with a valid `source_ref` *(target: 100%)*.
- **Reproducibility** — % of outputs that re-compute to the identical value *(target: 100%)*.
- **Audit response time** — minutes to prove any single number *(target: under 1 min)*.

> 💡 **Rule of thumb:** the LLM should decide *what* to compute, never *compute it*. If a regulator can't re-run your number and get the same answer, it isn't defensible — no matter how good the model is.

### Doing this solo (no team, portfolio-first)

No team, no budget? "Every number is provable and reproducible" is exactly the discipline regulated employers hire for. Run the week solo:

- **Mon–Tue** — move *all* arithmetic out of the LLM into SQL (local SQLite/DuckDB now); the LLM parses intent only via Structured Outputs.
- **Wed–Thu** — add a `source_ref` on each value + an append-only audit log + a `prove_value()` replay path.
- **Fri** — run a mock audit: pick 5 output numbers and prove each in under a minute.

📦 **Ship this artifact:** a public repo where any output number re-computes to the identical value, plus a short `prove_value()` demo. Resume bullet: *"Built a verifiable analytics agent — 100% of output numbers reproducible and source-traceable, any figure provable to an auditor in under a minute."*

> 🆓 **Free-tier path:** SQLite/DuckDB + the Azure OpenAI consumption tier — deterministic compute costs nothing to prove.

---

## Regulatory Mapping

| Regulation | Requirement | How This Challenge Addresses It |
|-----------|-------------|--------------------------------|
| **FINRA Rule 4511** | Books and records — retain data with traceability | `source_ref` + audit log per report |
| **SEC Rule 17a-4** | Immutable records for broker-dealers | Append-only audit log with query hash |
| **EU AI Act Art. 13** | Transparency — logging of AI system operation | Full computation log for every output |
| **SOX Section 302/906** | CEO/CFO certification of financial accuracy | `prove_value()` provides certification evidence |
| **MiFID II** | Audit trail for investment advice | Report ID + defensibility check |

---

## Break & Fix

```python
# broken_orchestrator.py

def answer_query(question):
    spec = parse_intent(question)
    engine = DeterministicEngine("data.duckdb")
    results = engine.execute(spec)
    
    # "Fix" 1: Let LLM format the final output for better readability
    llm_response = llm.generate(
        f"Format this data nicely: {results}"   # ← what breaks here?
    )
    return llm_response

def prove_value(report_id, ticker, value):
    record = load_audit_log(report_id)
    # "Fix" 2: Check if value is in the audit log
    return value in str(record)   # ← why is this inadequate for FINRA?

def parse_intent(question):
    # "Fix" 3: Use free-form LLM output for flexibility
    raw = llm.generate(f"Extract: ticker, dates, metric from: {question}")
    return parse_free_form(raw)   # ← what's the reliability risk?
```

:::details Click to reveal answers
1. **LLM formatting reintroduces the black box**: Even if computation is deterministic, letting LLM format the output means it could rephrase, round differently, or merge numbers incorrectly. The output is no longer fully traceable. Use template-based rendering only.
2. **String search is not proof**: `value in str(record)` returns `True` if `174.4` appears anywhere in the record, including as a partial match for `174.42`. This doesn't prove the value came from a specific DB row via a specific formula. FINRA requires a complete chain of custody.
3. **Free-form LLM parsing is non-deterministic**: The same question phrased two ways could produce different parameters. Using `ResponseFormatJsonSchema` with schema validation guarantees the LLM output is always parseable and matches expected types.
:::

---

## Knowledge Check

1. In the Verifiable Orchestrator, the LLM is still involved. Why is this acceptable for regulatory purposes when the Simple Agentic LLM involvement is not?
2. A user asks: "Compare Netflix Q1 2024 vs Q1 2025 returns." The intent parser produces `start_date: 2024-01-01, end_date: 2024-03-31` for the first period. How does the system handle the second period, and where is fiscal calendar definition handled?
3. Your deterministic engine calculates NFLX percent return as `51.5234%`. The report shows `51.52%`. Is this value defensible to a regulator? Why or why not?
4. A competitor says: "Just use Claude's extended thinking — it's more accurate at math than GPT-4." Why does this not solve the verifiability problem?

---

## 📚 Tools & References

### Key Tools for This Challenge

> **Microsoft-first:** lead with Azure-native tooling. Third-party tools are listed only where they add reliable, best-in-class capability not yet covered natively.

| Tool | Role in This Challenge | Link |
|------|----------------------|------|
| **Azure SQL Database / Microsoft Fabric** | The deterministic computation engine — SQL returns the same result every time, giving you a provable audit trail | [Azure SQL](https://learn.microsoft.com/azure/azure-sql/) · [Fabric](https://learn.microsoft.com/fabric/) |
| **Azure OpenAI — Structured Outputs** | Force the LLM to emit a schema-validated `QuerySpec` and nothing else — type-safe, non-negotiable intent parsing | [Docs](https://learn.microsoft.com/azure/ai-services/openai/how-to/structured-outputs) |
| **Azure Cosmos DB** | Append-only, immutable audit log — chain of custody for every figure | [Docs](https://learn.microsoft.com/azure/cosmos-db/introduction) |
| **Azure AI Foundry Tracing** | Capture LLM calls and deterministic tool calls as distinct span types — visible in Application Insights | [Docs](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-setup) |
| **Azure Monitor / Application Insights** | Query and alert on the computation log; retain audit evidence | [Docs](https://learn.microsoft.com/azure/azure-monitor/fundamentals/overview) |
| DuckDB *(third-party)* | Local, offline stand-in for the deterministic engine while you build — SQL queries return identical results every run | [duckdb.org](https://duckdb.org) |
| Pydantic v2 *(third-party)* | Local schema validation of parsed intent when not using Structured Outputs | [docs.pydantic.dev](https://docs.pydantic.dev) |
| Great Expectations *(third-party)* | Data-contract validation — assert datasets meet expected schemas before execution | [greatexpectations.io](https://greatexpectations.io) |

### Required Reading

| Resource | Why It Matters |
|----------|---------------|
| [The Verifiable Orchestrator (Part 2)](https://appliedingenuity.substack.com/p/the-verifiable-orchestrator) | The source article for this challenge — the TRACE architecture explained with full code patterns |
| [Azure OpenAI Structured Outputs](https://learn.microsoft.com/azure/ai-services/openai/how-to/structured-outputs) | How to guarantee the LLM only ever emits schema-valid query parameters |
| [Azure AI Foundry Tracing Setup](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-setup) | How to separate deterministic tool spans from LLM reasoning spans in production |
| [FINRA Rule 4511 — Books and Records](https://www.finra.org/rules-guidance/rulebooks/finra-rules/4511) | The actual regulation governing broker-dealer recordkeeping — what "defensible to a regulator" really means |
