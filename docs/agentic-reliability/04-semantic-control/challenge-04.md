---
id: challenge-04
title: "Challenge 04 — Semantic Control & Business Rules"
sidebar_label: Challenge 04 — Semantic Control
---

# Challenge 04 — Semantic Control & Business Rules

## 📈 Enterprise Scenario

> **Company:** Apex Quantitative Research — a quant fund running systematic strategies  
> **Situation:** Your AI research assistant is used by portfolio managers to analyze sector performance and factor exposures. Three incidents occurred in the same week:  
> 1. A PM asked for "Magnificent Seven" returns. The agent included **Tesla**, which was removed from the original cohort. The strategy was backtested with wrong constituents.  
> 2. A PM asked for "Q1 returns." The agent calculated from **open of Jan 1st** — your firm's standard is **close of Dec 31st of the prior year to close of Mar 31st**. The figures were off by one day.  
> 3. A PM asked about performance "last week." The agent used its **training-data date** (September 2023) as "now" — it refused to query for 2026 data, claiming it was in the future.

All three failures share a root cause: **business semantics delegated to LLM training data instead of owned by your system**.

---

## The Core Problem: Semantic Delegation

The "Simple Agentic" pattern treats the LLM as an authority on business concepts. This creates a hidden dependency on the model's **static, probabilistic training data** for decisions that should be owned by your code.

| Concept | LLM's "knowledge" | Your business reality |
|---------|------------------|----------------------|
| "Magnificent Seven" | Tesla (pre-2024 training) | AAPL, MSFT, NVDA, AMZN, GOOGL, META, TSLA (varies by source/date) |
| "Q1 start" | Probably Jan 1 open | Your firm: Dec 31 prior year close |
| "Last week" | Based on training cutoff | Needs `date.today()` injection |
| "FANG stocks" | Meta = Facebook? | META ticker since Nov 2021 |
| "Technology sector" | Model's classification | GICS sector mapping (updates quarterly) |

The fix is **Semantic Control**: externalize all business concept definitions into code/config, inject temporal grounding on every request, and use `PostToolUse` hooks to enforce scope boundaries.

---

## Architecture Decision Table

| Approach | Accuracy | Updateable | Auditability |
|----------|----------|------------|--------------|
| ❌ LLM resolves all concepts | Probabilistic (training data) | No — requires model retrain | None |
| ⚠️ Prompt injection ("Magnificent 7 is: AAPL, MSFT...") | Better | Requires prompt updates | Partial |
| ✅ Externalized concept registry (config/DB) | Deterministic | Yes — update config, not code | Full — version history |
| ✅ Temporal grounding injection (always inject current date) | Deterministic | Automatic | Full |
| ✅ Scope enforcement hooks (block out-of-scope tool calls) | Deterministic | Yes | Full |

---

## 🧰 Before You Start — Environment Setup

This challenge is about **owning your business semantics** instead of borrowing them from the model's training data. Your setup needs a place to store concept definitions (a registry) and a way to inject "now" on every request.

### Prerequisites

| Requirement | Why you need it | How to check |
|-------------|-----------------|--------------|
| Python 3.10+ | Registry, parser, and enforcement hooks | `python --version` |
| **Azure OpenAI** via [Azure AI Foundry](https://ai.azure.com) | The intent parser — it resolves *phrasing*, never *definitions* | Deploy `gpt-4o` in Foundry |
| A concept registry store — **Azure SQL / Dataverse / Cosmos DB / App Configuration** (prod); local JSON here | The authoritative, version-controlled source of what "Magnificent Seven" means today | Azure portal / `mkdir .registry` |
| **Azure AI Foundry — Evaluations** | Grade concept-resolution accuracy against your registry | [Docs](https://learn.microsoft.com/azure/foundry/how-to/evaluate-generative-ai-app) |

### Step 0 — Create an isolated workspace (5 min)

```bash
mkdir semantic-control && cd semantic-control
python -m venv .venv
# Windows (PowerShell):  .venv\Scripts\Activate.ps1    |    macOS/Linux:  source .venv/bin/activate
pip install azure-ai-projects azure-identity openai pydantic python-dotenv
mkdir .registry   # local stand-in for Azure SQL / Dataverse / App Configuration
```

✅ **Done when** your prompt shows `(.venv)` and `pip list` includes `azure-ai-projects`.

### Step 1 — Provision your model & sign in (10 min)

The intent parser is a real `gpt-4o` deployment. If you have **not** deployed one, do **Steps 1–2 of [Challenge 01 — The Hallucination Audit](../01-hallucination-audit/challenge-01.md)** for the exact portal walkthrough and the two values below, then create a `.env`:

```bash
# .env  — from Azure AI Foundry (never commit this file)
# PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<name>
# MODEL_DEPLOYMENT_NAME=gpt-4o
az login   # keyless auth via DefaultAzureCredential
```

Smoke-test before Task 1 — if it prints `setup works`, any later failure is your logic, not setup:

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

> **Common fixes:** `DefaultAzureCredential failed` → `az login` again. `DeploymentNotFound` → deployment name mismatch. `401` → add the **Azure AI User** role on the project.

### Step 2 — Seed a versioned concept registry (10 min)

Store each business concept **with an effective date** so historical queries resolve correctly. These are **sample definitions** — replace with your firm's real ones.

```python
# registry.json — the authoritative definitions your code owns
{
  "magnificent_seven": [
    {"effective": "2023-01-01", "members": ["AAPL","MSFT","NVDA","AMZN","GOOGL","META","TSLA"]},
    {"effective": "2025-01-01", "members": ["AAPL","MSFT","NVDA","AMZN","GOOGL","META","AVGO"]}
  ],
  "fiscal_q1": {"start_rule": "prior_year_dec_31_close", "end_rule": "mar_31_close"}
}
```

> 🟦 **Microsoft-first note:** the `.registry` folder / JSON is a local stand-in. In production the registry belongs in **Azure SQL** (temporal tables give you free version history), **Microsoft Dataverse** (business-user editable), **Azure Cosmos DB**, or **Azure App Configuration** for feature-flag-style rollout. The temporal grounding (`date.today()` injected per-request) and scope-enforcement hooks stay in deterministic Python either way.

### The path through this challenge

1. **Task 1** — build the externalized concept registry.
2. **Task 2** — inject temporal grounding on every request.
3. **Task 3** — build a concept-aware intent parser.
4. **Task 4** — add a scope-enforcement hook (pre-LLM).
5. **Success Criteria** — definitions come from *your* registry, not training data.
6. **Adapt to Your Business** — externalize *your* concepts.

> ⏱️ **Time budget:** ~3 hours. Task 1 (the registry) is the linchpin — every other task depends on it.

---

## Tasks

### Task 1 — Build the Concept Registry

Externalize all business-defined groupings into a versioned registry. The LLM never "knows" these — it always receives them as injected context.

```python
# concept_registry.py
import json
from datetime import date
from typing import Optional
from pathlib import Path

class ConceptRegistry:
    """
    Versioned registry of business-defined groupings and rules.
    All definitions are date-ranged — correct answer depends on when the query runs.
    
    This replaces LLM training data as the authority on business concepts.
    """
    
    def __init__(self, registry_path: str = "config/concepts.json"):
        with open(registry_path) as f:
            self._registry = json.load(f)
    
    def resolve(self, concept: str, as_of_date: Optional[str] = None) -> dict:
        """
        Resolve a concept name to its current definition.
        Respects effective_date ranges — correct even for historical queries.
        """
        as_of = date.fromisoformat(as_of_date) if as_of_date else date.today()
        
        concept_key = concept.lower().replace(" ", "_").replace("-", "_")
        entries = self._registry.get("concepts", {}).get(concept_key, [])
        
        # Find the entry effective on the query date
        active = [
            e for e in entries
            if date.fromisoformat(e["effective_from"]) <= as_of
            and (e.get("effective_to") is None or date.fromisoformat(e["effective_to"]) >= as_of)
        ]
        
        if not active:
            return {"found": False, "concept": concept, "as_of": str(as_of)}
        
        return {
            "found": True,
            "concept": concept,
            "definition": active[-1],  # most recent effective entry
            "as_of": str(as_of),
            "source": "concept_registry"  # not LLM training data
        }
    
    def list_concepts(self) -> list:
        return list(self._registry.get("concepts", {}).keys())
```

```json
// config/concepts.json — the source of truth your code owns
{
  "concepts": {
    "magnificent_seven": [
      {
        "effective_from": "2023-01-01",
        "effective_to": "2024-12-31",
        "tickers": ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "TSLA", "META"],
        "description": "Magnificent Seven (2023 composition)",
        "source": "internal-research-team"
      },
      {
        "effective_from": "2025-01-01",
        "effective_to": null,
        "tickers": ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "AVGO"],
        "description": "Magnificent Seven (2025 composition — Broadcom replaces Tesla)",
        "source": "internal-research-team"
      }
    ],
    "fang": [
      {
        "effective_from": "2021-11-01",
        "effective_to": null,
        "tickers": ["META", "AMZN", "NFLX", "GOOGL"],
        "description": "FANG stocks (post FB→META rename)",
        "note": "Facebook became META on 2021-10-28"
      }
    ],
    "fiscal_quarter_q1": [
      {
        "effective_from": "2000-01-01",
        "effective_to": null,
        "start_convention": "prior_year_dec31_close",
        "end_convention": "mar31_close",
        "description": "Apex QR Q1 definition: Dec 31 close → Mar 31 close"
      }
    ]
  }
}
```

---

### Task 2 — Inject Temporal Grounding

Every request must include an explicit `current_date`. No LLM should ever infer "today" from training weights.

```python
# temporal_grounding.py
from datetime import date, timedelta
import re

class TemporalGrounding:
    """
    Resolves relative time expressions to absolute dates
    using the actual current date — never LLM training data.
    """
    
    def __init__(self, current_date: Optional[date] = None):
        self.today = current_date or date.today()
    
    def resolve_time_expression(self, expression: str) -> dict:
        """
        Convert relative time expressions to concrete date ranges.
        Returns absolute dates for deterministic downstream use.
        """
        expr = expression.lower().strip()
        
        if "last week" in expr:
            # Previous Monday through Sunday
            days_since_monday = self.today.weekday()
            last_monday = self.today - timedelta(days=days_since_monday + 7)
            last_sunday = last_monday + timedelta(days=6)
            return {
                "start_date": str(last_monday),
                "end_date": str(last_sunday),
                "resolved_from": expression,
                "resolution_date": str(self.today)
            }
        
        elif "ytd" in expr or "year to date" in expr:
            return {
                "start_date": str(date(self.today.year, 1, 1)),
                "end_date": str(self.today),
                "resolved_from": expression,
                "resolution_date": str(self.today)
            }
        
        elif re.match(r"q[1-4]\s+\d{4}", expr):
            # e.g., "Q1 2025"
            quarter = int(expr[1])
            year = int(re.search(r'\d{4}', expr).group())
            return self._resolve_fiscal_quarter(quarter, year)
        
        # Default: pass through if already absolute dates
        return {"start_date": None, "end_date": None, "resolved_from": expression}
    
    def _resolve_fiscal_quarter(self, quarter: int, year: int) -> dict:
        """
        Resolve fiscal quarters using YOUR firm's definition.
        Not the LLM's interpretation.
        """
        registry = ConceptRegistry()
        q_def = registry.resolve(f"fiscal_quarter_q{quarter}")
        
        if not q_def["found"]:
            raise ValueError(f"Q{quarter} definition not found in concept registry")
        
        convention = q_def["definition"]
        
        if convention["start_convention"] == "prior_year_dec31_close":
            start = date(year - 1, 12, 31)
        else:
            # default: first trading day of quarter
            quarter_starts = {1: (1,1), 2: (4,1), 3: (7,1), 4: (10,1)}
            m, d = quarter_starts[quarter]
            start = date(year, m, d)
        
        quarter_ends = {1: (3,31), 2: (6,30), 3: (9,30), 4: (12,31)}
        m, d = quarter_ends[quarter]
        end = date(year, m, d)
        
        return {
            "start_date": str(start),
            "end_date": str(end),
            "resolved_from": f"Q{quarter} {year}",
            "convention_used": convention["description"],
            "resolution_date": str(self.today)
        }
    
    def build_grounded_system_prompt(self, base_prompt: str) -> str:
        """
        Prepend authoritative temporal context to any system prompt.
        LLM always knows today's date from code — never from training data.
        """
        return f"""
TEMPORAL CONTEXT (authoritative — use these values, not your training data):
- Today: {self.today.isoformat()}
- Current Year: {self.today.year}
- Current Quarter: Q{(self.today.month - 1) // 3 + 1} {self.today.year}

{base_prompt}
"""
```

---

### Task 3 — Concept-Aware Intent Parser

Intercept concept references before they reach the LLM. Replace them with concrete definitions.

```python
# concept_aware_parser.py

class ConceptAwareIntentParser:
    """
    Pre-processes user queries to replace concept references with
    concrete, registry-sourced definitions before the LLM sees them.
    
    LLM receives: "Compare AAPL, MSFT, GOOGL, AMZN, NVDA, META, AVGO returns"
    Not:          "Compare Magnificent Seven returns"
    """
    
    KNOWN_CONCEPTS = [
        "magnificent seven", "magnificent 7", "mag 7", "mag seven",
        "fang", "fang stocks", "faang",
        "dow 30", "dow jones", "s&p 500",
        "q1", "q2", "q3", "q4",
        "ytd", "year to date", "last week", "last month", "last year"
    ]
    
    def __init__(self):
        self.registry = ConceptRegistry()
        self.temporal = TemporalGrounding()
    
    def expand(self, user_query: str) -> tuple[str, dict]:
        """
        Expand concepts in user query to concrete definitions.
        Returns (expanded_query, expansion_log).
        
        Expansion log is part of the audit trail.
        """
        expanded = user_query
        expansion_log = {}
        
        # Resolve stock groupings
        for concept in self.KNOWN_CONCEPTS:
            if concept.lower() in user_query.lower():
                resolution = self.registry.resolve(concept)
                if resolution["found"]:
                    definition = resolution["definition"]
                    if "tickers" in definition:
                        tickers_str = ", ".join(definition["tickers"])
                        expanded = expanded.replace(concept, tickers_str)
                        expanded = expanded.replace(concept.title(), tickers_str)
                        expansion_log[concept] = {
                            "replaced_with": tickers_str,
                            "source": "concept_registry",
                            "definition_version": definition.get("effective_from")
                        }
        
        # Resolve temporal expressions
        time_expressions = self.temporal.find_relative_expressions(user_query)
        for expr in time_expressions:
            resolved = self.temporal.resolve_time_expression(expr)
            if resolved["start_date"]:
                expanded = expanded.replace(
                    expr,
                    f"from {resolved['start_date']} to {resolved['end_date']}"
                )
                expansion_log[expr] = resolved
        
        return expanded, expansion_log
    
    def parse(self, user_query: str) -> tuple[FinancialQuerySpec, dict]:
        """Full pipeline: expand concepts → parse intent → return spec + audit."""
        expanded_query, expansion_log = self.expand(user_query)
        
        # LLM now receives concrete, unambiguous query
        spec = parse_intent(
            expanded_query,
            current_date=str(self.temporal.today)
        )
        
        # Attach expansion log for audit trail
        audit = {
            "original_query": user_query,
            "expanded_query": expanded_query,
            "concept_expansions": expansion_log
        }
        
        return spec, audit
```

---

### Task 4 — Scope Enforcement Hook

Use a `PostToolUse`-style hook to block out-of-scope tool calls at the code level.

```python
# scope_enforcement.py

ALLOWED_SCOPE = {
    "tools": ["query_financial_data", "calculate_returns"],
    "data_sources": ["stock_prices"],
    "query_types": ["historical_price", "return_calculation", "volume"],
    "forbidden": ["strategic_analysis", "earnings_forecast", "recommendation"]
}

def pre_llm_scope_check(user_query: str) -> dict:
    """
    Classify query scope BEFORE sending to LLM.
    Hard-block out-of-scope requests at the gateway.
    """
    # Fast, cheap classification call
    scope_classification = fast_classify(user_query, categories=[
        "historical_price_query",    # in scope
        "return_calculation",        # in scope
        "strategic_analysis",        # OUT OF SCOPE
        "earnings_forecast",         # OUT OF SCOPE
        "general_recommendation"     # OUT OF SCOPE
    ])
    
    if scope_classification in ALLOWED_SCOPE["forbidden"]:
        return {
            "allowed": False,
            "reason": f"Query classified as '{scope_classification}' — outside system scope",
            "message": (
                "This system is designed for historical price and return queries only. "
                "For strategic analysis or forecasts, please use [link to appropriate tool]."
            )
        }
    
    return {"allowed": True, "classification": scope_classification}
```

---

## Success Criteria

- [ ] "Magnificent Seven" query uses registry definition for correct date — not LLM training data
- [ ] Historical query for "Magnificent Seven" in 2023 uses 2023 composition (Tesla included), 2025 uses 2025 composition (Broadcom, not Tesla)
- [ ] "Q1 returns" uses firm's fiscal calendar convention — not LLM's interpretation of Q1
- [ ] "Last week" resolves to correct absolute dates based on `date.today()` — never training data
- [ ] LLM correctly refuses to "know" the current date from training — always uses injected value
- [ ] Out-of-scope queries blocked at gateway — not by prompt instruction
- [ ] All concept expansions logged in audit trail with `source: "concept_registry"`

---

## 🔁 Adapt This to Your Own Business

The scenario is a **quant fund**, but *every* company has business terms whose meaning the model gets subtly — and confidently — wrong. The fix is always the same: **your system owns the definition, not the LLM.**

### Step 1 — Find your "the model thinks it knows, but it's wrong" terms

| Industry | Ambiguous term the LLM guesses | What it should mean (owned by you) |
|----------|--------------------------------|-------------------------------------|
| **Retail** | "Top sellers" | Your current merchandising list, not last year's |
| **Healthcare** | "High-risk patient" | Your clinical protocol's exact criteria |
| **Insurance** | "Preferred customer" | Your current tier rules, effective this quarter |
| **SaaS / RevOps** | "Enterprise account" | Your segmentation thresholds, not a generic guess |
| **Manufacturing** | "Critical part" | Your current BOM criticality flags |
| **Public sector** | "Current fiscal year" | Your jurisdiction's calendar, not Jan–Dec |

### Step 2 — Map the building blocks to your stack (Microsoft-first)

| In this challenge | In your project — replace with |
|-------------------|--------------------------------|
| `registry.json` | **Azure SQL** (temporal tables), **Dataverse**, **Cosmos DB**, or **App Configuration** |
| Effective-dated concept versions | SQL temporal tables / Dataverse audit history |
| Temporal grounding injection | Middleware that injects `date.today()` per request |
| Concept-aware intent parser | **Azure OpenAI** for phrasing only — resolution stays in code |
| Scope-enforcement hook | Deterministic pre-LLM gateway (Azure Functions / API Management) |
| Resolution accuracy grading | **Azure AI Foundry Evaluations** custom evaluator |

### Step 3 — The 5-question implementation checklist

1. **Which business terms would embarrass you if the model defined them?** Those go in the registry first.
2. **Do any of your definitions change over time?** If yes → store them effective-dated, and resolve by query date.
3. **Does your agent ever assume today's date?** If yes → inject `date.today()` per request, never at startup.
4. **Can a clever rephrasing bypass your "only answer about X" rule?** If yes → move scope enforcement into pre-LLM code.
5. **Can you prove where a definition came from?** If not → log `source: "concept_registry"` on every expansion.

### Step 4 — A 1-week rollout plan

| Day | Action | Owner |
|-----|--------|-------|
| **Day 1** | Inventory the top 10 ambiguous business terms your agent handles | Domain expert + eng |
| **Day 2** | Build the effective-dated registry in Azure SQL / Dataverse | Data eng |
| **Day 3** | Add per-request temporal grounding middleware | Backend dev |
| **Day 4** | Move scope enforcement to a pre-LLM gateway | Backend dev |
| **Day 5** | Add a Foundry Evaluations grader for concept accuracy | ML eng |

### Step 5 — Prove the ROI

- **Definition accuracy** — % of concept resolutions matching the registry *(target: 100%)*.
- **Temporal correctness** — % of "now/last week/this quarter" queries resolved to correct absolute dates *(target: 100%)*.
- **Scope-bypass rate** — % of adversarial rephrasings that slip past enforcement *(target: 0%)*.

> 💡 **Rule of thumb:** if the answer to "what does this term mean?" lives only in the model's head, it *will* drift when the model updates. Put the definition in your system, date-stamp it, and log where it came from.

---

## Regulatory Mapping

| Regulation | Requirement | How This Challenge Addresses It |
|-----------|-------------|--------------------------------|
| **FINRA Rule 2010** | Standards of commercial honor — accurate representations | Registry-sourced definitions prevent mis-stated index compositions |
| **EU AI Act Art. 10** | Data governance for high-risk AI | Version-controlled concept registry as authoritative data source |
| **MiFID II Art. 25** | Suitability and scope — advice within authorized scope | Scope enforcement hook prevents unsanctioned recommendations |
| **GDPR / CCPA** | Data accuracy principle | Temporal grounding prevents stale training-data substitution |

---

## Break & Fix

```python
# broken_semantic_control.py

def resolve_concept(concept_name, query_date):
    # "Fix" 1: Ask the LLM what the Magnificent Seven is
    return llm.generate(
        f"What stocks are in the {concept_name} as of {query_date}?"
    )   # ← why is this not a fix at all?

def inject_date(system_prompt):
    # "Fix" 2: Add the date once at system startup
    startup_date = date.today()
    return system_prompt.replace("{DATE}", str(startup_date))  # ← what's wrong for long-running processes?

def enforce_scope(query, allowed_topics):
    # "Fix" 3: Add "only answer about these topics" to system prompt
    return system_prompt + f"\nOnly answer about: {allowed_topics}"  # ← why is this insufficient?
```

:::details Click to reveal answers
1. **Asking LLM = delegating back to training data**: This is exactly the problem being solved. Even with a date injected, the LLM's "knowledge" of index composition comes from its training corpus, which may be wrong or stale. The only reliable source is your own registry.
2. **Startup date goes stale**: If the service runs continuously (days, weeks), the injected date is from startup, not "now." The date must be injected per-request, not per-process-start.
3. **Prompt-based scope = probabilistic**: A clever rephrasing like "When examining NFLX price on March 14, hypothesize reasons for performance" bypasses the restriction. The author of the original article demonstrated this exact bypass. Scope enforcement must happen in pre-LLM code, not in the system prompt.
:::

---

## Knowledge Check

1. Your firm adds a new "Magnificent Seven" composition effective January 2026. What is the minimum change needed to the system to correctly answer both "What were Magnificent Seven returns in Q4 2024?" and "What are Magnificent Seven returns in Q1 2026?"
2. A PM asks: "Compare this year's Q1 to last year's Q1." How many concept resolutions does `ConceptAwareIntentParser` need to perform before the LLM sees the query?
3. Why is temporal grounding injected per-request rather than in the system prompt at agent creation time?
4. Your scope enforcement hook misclassifies "What was META's PE ratio in 2024?" as "strategic_analysis" and blocks it. It's actually a factual data query. How do you improve classification accuracy without relaxing the security boundary?

---

## 📚 Tools & References

### Key Tools for This Challenge

> **Microsoft-first:** lead with Azure-native tooling. Third-party tools are listed only where they add reliable, best-in-class capability not yet covered natively.

| Tool | Role in This Challenge | Link |
|------|----------------------|------|
| **Azure SQL Database (temporal tables)** | Store the concept registry with built-in, queryable version history — resolve "Magnificent Seven" as of any date | [Docs](https://learn.microsoft.com/azure/azure-sql/) |
| **Microsoft Dataverse** | Business-user-editable concept registry with audit history — update definitions without a code deploy | [Docs](https://learn.microsoft.com/power-apps/maker/data-platform/) |
| **Azure App Configuration** | Feature-flag-style rollout of definition changes (effective dates, gradual cutover) | [Docs](https://learn.microsoft.com/azure/azure-app-configuration/overview) |
| **Azure OpenAI — Structured Outputs** | Force the intent parser to return a typed `IntentQuery` object, not free-form text | [Docs](https://learn.microsoft.com/azure/ai-services/openai/how-to/structured-outputs) |
| **Azure AI Foundry Evaluations** | Custom evaluators — grade concept-resolution accuracy against your registry | [Docs](https://learn.microsoft.com/azure/foundry/how-to/evaluate-generative-ai-app) |
| **Azure API Management / Azure Functions** | Deterministic pre-LLM scope-enforcement gateway — block out-of-scope queries before the model sees them | [APIM](https://learn.microsoft.com/azure/api-management/) · [Functions](https://learn.microsoft.com/azure/azure-functions/) |
| Pydantic v2 *(third-party)* | Local schema for registry models when not using Structured Outputs | [docs.pydantic.dev](https://docs.pydantic.dev) |
| DeepEval / RAGAS *(third-party)* | Semantic-similarity metrics for concept-resolution regression tests | [DeepEval](https://github.com/confident-ai/deepeval) · [RAGAS](https://github.com/explodinggradients/ragas) |

### Required Reading

| Resource | Why It Matters |
|----------|---------------|
| [The LLM-as-Analyst Trap, Part 1 — Semantic Drift section](https://appliedingenuity.substack.com/p/the-llm-as-analyst-trap-a-technical) | The original failure mode this challenge addresses — LLMs use training-data definitions, not current enterprise ones |
| [Azure OpenAI Structured Outputs](https://learn.microsoft.com/azure/ai-services/openai/how-to/structured-outputs) | How to force the LLM to return typed objects — the foundation of deterministic intent parsing |
| [Azure SQL temporal tables](https://learn.microsoft.com/azure/azure-sql/temporal-tables) | How to store effective-dated concept definitions with automatic version history |
| [Data governance for high-risk AI (Azure)](https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns) | Microsoft guidance on authoritative data sources for agent decisions |
