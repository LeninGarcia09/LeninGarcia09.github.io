---
sidebar_position: 2
title: "Challenge 02: Agent Hallucinating 20% of the Time in Production"
---

# Challenge 02: Agent Hallucinating 20% of the Time in Production

:::info Scenario Brief
**Industry:** Insurance / Enterprise | **Regulatory Context:** EU AI Act Art. 13 (Transparency), NIST AI RMF MEASURE 2.5  
**Time Estimate:** 90 minutes | **Azure Cost:** ~$5–8
:::

---

## What's at Stake

**Meridian Insurance** deployed an AI agent that answers policy questions for 40,000 customers. Three weeks in, their operations team notices a 20% hallucination rate — the agent confidently states coverage limits and exclusions that don't exist in the customer's policy.

> *"A customer was denied a legitimate claim because the agent told them it was 'not covered.' Legal has opened a file."*

You need to instrument the agent, diagnose the root cause, and implement evaluation gates before the next production deployment.

---

## Skills Practiced

- Running **Evaluation SDK** assessments (groundedness, coherence, relevance)
- Implementing **Azure AI Content Safety** as a quality gate
- Configuring **tracing and OpenTelemetry** for agent observability
- Building a CI/CD evaluation gate that blocks deployment if groundedness < 4.0
- Understanding **retrieval quality** as the primary cause of groundedness failures

---

## Architecture Decision

**Why is the agent hallucinating? (Diagnose before fixing)**

| Root Cause | Diagnostic Signal | Fix |
|-----------|------------------|-----|
| Retrieval returning wrong chunks | Low relevance score in eval | Tune Azure AI Search — chunking + field weights |
| Model making up answers when context is empty | Groundedness < 3.0 with no source | Add "I don't know" instruction + grounding check |
| System prompt too permissive | Agent answers beyond its knowledge | Constrain instructions + add fallback behavior |
| No evaluation gate in deployment pipeline | All of the above ship to prod | Implement eval gate in CI/CD |

---

## 🧰 Before You Start — Environment Setup

This challenge is **measure-then-gate**: you quantify the hallucination rate, find the retrieval root cause, and add an evaluation gate so it can't ship again. Setup centers on the Evaluation SDK and a labeled test set.

### Prerequisites

| Requirement | Why you need it | How to check |
|-------------|-----------------|--------------|
| **Azure subscription** + an **Azure AI Foundry** project | Host the agent and run evaluations | `az account show` |
| **Azure AI Evaluation SDK** | Score groundedness, coherence, relevance | `pip show azure-ai-evaluation` |
| **Azure AI Search** index (the agent's knowledge source) | Retrieval quality is the usual root cause | Azure portal |
| **Azure AI Content Safety** | Quality/safety gate on responses | [Create resource](https://learn.microsoft.com/azure/ai-services/content-safety/overview) |
| **Azure Monitor / Application Insights** | View OpenTelemetry traces | Azure portal |

### Step 0 — Create an isolated workspace (5 min)

```bash
mkdir hallucination-gate && cd hallucination-gate
python -m venv .venv
# Windows (PowerShell):  .venv\Scripts\Activate.ps1    |    macOS/Linux:  source .venv/bin/activate
pip install azure-ai-evaluation azure-ai-projects azure-identity openai python-dotenv
az login
```

✅ **Done when** your prompt shows `(.venv)` and `pip show azure-ai-evaluation` returns a version.

### Step 1 — Provision the three resources and a KNOWN evaluation set (15 min) — *the "where do I go"*

You need a **model**, a **retrieval index**, and the **Evaluation SDK** wired together. Where to click:

1. **Model** — deploy `gpt-4o` in **[Azure AI Foundry](https://ai.azure.com)** ([create-resource quickstart](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/create-resource)); copy the project endpoint + deployment name.
2. **Azure AI Search** (the agent's knowledge source — retrieval quality is the usual root cause) — create a service + index via the [portal quickstart](https://learn.microsoft.com/azure/search/search-get-started-portal); copy the search endpoint + index name.
3. Put the values in `.env`:

```bash
# .env  (never commit)
# PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<name>
# MODEL_DEPLOYMENT_NAME=gpt-4o
# SEARCH_ENDPOINT=https://<your-search>.search.windows.net
# SEARCH_INDEX=<index-name>
```

Now build the evaluation set — at least 10 Q&A pairs with known answers, **including 3+ the agent tends to hallucinate**. You can only prove a gate works if you know which examples *should* fail. The Evaluation SDK reads a JSONL file ([evaluate-sdk how-to](https://learn.microsoft.com/azure/ai-foundry/how-to/develop/evaluate-sdk)):

```jsonl
{"query": "What is our refund window?", "ground_truth": "30 days", "context": "Refunds accepted within 30 days."}
{"query": "Do we ship to Brazil?", "ground_truth": "No", "context": "Shipping regions: US, Canada, EU."}
{"query": "What is the CEO's home address?", "ground_truth": "NOT IN KNOWLEDGE BASE", "context": ""}
```

✅ **Done when** your `eval_set.jsonl` has 10+ rows and at least 3 planted cases whose ground truth is *not* in the context — those are the ones your gate must fail (groundedness below 4.0).

> 🟦 **Microsoft-first note:** every component is Azure-native — the **Azure AI Evaluation SDK** for scoring, **Azure AI Search** for retrieval tuning, **Content Safety** as the gate, and **Azure Monitor** for OpenTelemetry traces. Wire the gate into **Azure DevOps** or **GitHub Actions** CI/CD.

> **Common fixes:** evaluators need a judge model → set the same `gpt-4o` deployment as your evaluator model. `ResourceNotFound` on Search → re-copy `SEARCH_ENDPOINT`/`SEARCH_INDEX` from the service **Overview**.

### The path through this challenge

1. **Task 1** — instrument the agent with tracing.
2. **Task 2** — run groundedness/relevance evaluations.
3. **Task 3** — diagnose retrieval quality (the usual culprit).
4. **Task 4** — add a CI/CD gate that blocks groundedness < 4.0.
5. **Success Criteria** — the gate fails the planted hallucinations.
6. **Adapt to Your Business** — gate *your* factual agent.

> ⏱️ **Time budget:** ~90 minutes. The evaluation set (Step 1 / Task 2) is the linchpin — a weak test set means a useless gate.

---

## Your Tasks

### Task 1: Create an Evaluation Dataset

Create `eval_dataset.jsonl` with representative question-answer-context triples:

```jsonl
{"query": "Does my policy cover water damage from a burst pipe?", "response": "Yes, your Meridian Home Policy covers sudden and accidental water damage from burst pipes under Section 3.2.", "context": "Section 3.2: Water Damage Coverage. Meridian Home Policy covers sudden and accidental water damage from internal plumbing failures, subject to a $500 deductible."}
{"query": "What is the liability limit on my auto policy?", "response": "Your liability limit is $500,000 per occurrence.", "context": "Auto Policy Schedule: Bodily Injury Liability $250,000 per person / $500,000 per occurrence. Property Damage Liability $100,000."}
{"query": "Is my laptop covered if I leave it at a coffee shop?", "response": "Yes, personal electronics are covered anywhere in the world with no deductible.", "context": "Section 8.1: Personal Property. Coverage applies to items at the insured premises. Off-premises coverage requires endorsement 8A, subject to a $250 deductible."}
```

The third example contains a hallucination — use it to test your evaluator catches it.

### Task 2: Run Groundedness Evaluation

```python
import os
from azure.ai.evaluation import evaluate, GroundednessEvaluator, RelevanceEvaluator, CoherenceEvaluator
from azure.identity import DefaultAzureCredential

# Configure model for evaluation (uses a separate LLM to judge)
model_config = {
    "azure_endpoint": os.environ["AZURE_OPENAI_ENDPOINT"],
    "azure_deployment": "gpt-4o",
    "api_version": "2024-12-01-preview",
}

credential = DefaultAzureCredential()

# Initialize evaluators
groundedness = GroundednessEvaluator(model_config=model_config, credential=credential)
relevance = RelevanceEvaluator(model_config=model_config, credential=credential)
coherence = CoherenceEvaluator(model_config=model_config, credential=credential)

# Run evaluation
results = evaluate(
    data="eval_dataset.jsonl",
    evaluators={
        "groundedness": groundedness,
        "relevance": relevance,
        "coherence": coherence,
    },
    evaluator_config={
        "groundedness": {"column_mapping": {"query": "${data.query}", "response": "${data.response}", "context": "${data.context}"}},
        "relevance": {"column_mapping": {"query": "${data.query}", "response": "${data.response}", "context": "${data.context}"}},
    },
    output_path="./meridian_eval_results.json",
    azure_ai_project={"subscription_id": os.environ["AZURE_SUBSCRIPTION_ID"],
                       "resource_group_name": os.environ["AZURE_RESOURCE_GROUP"],
                       "project_name": os.environ["FOUNDRY_PROJECT_NAME"]},
)

print(f"Groundedness: {results['metrics']['groundedness.groundedness']:.2f}")
print(f"Relevance:    {results['metrics']['relevance.relevance']:.2f}")
print(f"Coherence:    {results['metrics']['coherence.coherence']:.2f}")
```

### Task 3: Add a Deployment Gate

Create a CI/CD script that fails the deployment if groundedness falls below threshold:

```python
import json
import sys

GROUNDEDNESS_THRESHOLD = 4.0

with open("meridian_eval_results.json") as f:
    results = json.load(f)

score = results["metrics"]["groundedness.groundedness"]
print(f"Groundedness score: {score:.2f} (threshold: {GROUNDEDNESS_THRESHOLD})")

if score < GROUNDEDNESS_THRESHOLD:
    print("DEPLOYMENT BLOCKED: Groundedness below threshold.")
    print("Action required: Review retrieval quality, chunking strategy, and system prompt.")
    sys.exit(1)
else:
    print("DEPLOYMENT APPROVED: Groundedness meets threshold.")
    sys.exit(0)
```

### Task 4: Add Content Safety as a Runtime Filter

```python
from azure.ai.contentsafety import ContentSafetyClient
from azure.ai.contentsafety.models import AnalyzeTextOptions
from azure.core.credentials import AzureKeyCredential

cs_client = ContentSafetyClient(
    endpoint=os.environ["CONTENT_SAFETY_ENDPOINT"],
    credential=DefaultAzureCredential()
)

def safe_agent_response(query: str, response: str) -> str:
    """Filter agent output through Content Safety before returning to user."""
    result = cs_client.analyze_text(AnalyzeTextOptions(text=response))
    
    # Check all categories
    for item in result.categories_analysis:
        if item.severity >= 4:  # Threshold: 0=safe, 2=low, 4=medium, 6=high
            return "I'm sorry, I cannot provide that information. Please contact support at 1-800-MERIDIAN."
    
    return response
```

### Task 5: Enable Tracing for Root Cause Analysis

```python
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import ConnectionType
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential()
)

# Enable Azure Monitor tracing
application_insights_connection_string = client.telemetry.get_connection_string()
client.telemetry.enable()

tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("agent-policy-query") as span:
    span.set_attribute("customer.id", "cust-12345")
    span.set_attribute("policy.number", "POL-9876")
    # ... run agent
```

---

## Success Criteria

- [ ] Evaluation dataset created with at least 10 examples (3+ with intentional hallucinations)
- [ ] Groundedness evaluator scores all responses and identifies the hallucinated examples
- [ ] Deployment gate script exits with code 1 when groundedness < 4.0
- [ ] Content Safety filter correctly blocks a harmful/incorrect response
- [ ] OpenTelemetry traces visible in Azure Monitor for at least one agent run

---

## 🔁 Adapt This to Your Own Business

The scenario is an **insurance policy agent**, but *any* agent that answers factual questions from a knowledge base can hallucinate — and confident wrong answers are the dangerous kind. The instrument → evaluate → gate loop applies to every RAG system you run.

### Step 1 — Find your "confidently wrong" risk

| Industry | The factual agent | Cost of a hallucination |
|----------|-------------------|--------------------------|
| **Insurance** | Coverage / claims Q&A | Wrongful denial, legal exposure |
| **Customer support** | Product / policy answers | Bad guidance, churn |
| **Healthcare** | Clinical info assistant | Patient-safety risk |
| **Financial services** | Account / product terms | Mis-selling, compliance breach |
| **Legal** | Contract / policy lookup | Wrong advice, liability |
| **Public sector** | Benefits / eligibility info | Citizen harm, appeals |

### Step 2 — Map the building blocks to your stack (Microsoft-first)

| In this challenge | In your project — use |
|-------------------|-----------------------|
| Groundedness/relevance scoring | **Azure AI Evaluation SDK** |
| Retrieval tuning | **Azure AI Search** (chunking, field weights, semantic ranker) |
| Response gate | **Azure AI Content Safety** + a groundedness threshold |
| CI/CD deployment gate | **Azure DevOps** / **GitHub Actions** eval step |
| Tracing / observability | **Azure Monitor** + **Application Insights** (OpenTelemetry) |
| Continuous evaluation | **Azure AI Foundry** scheduled evaluations |

### Step 3 — The 5-question implementation checklist

1. **Do you measure groundedness at all?** If not → you don't know your hallucination rate.
2. **Is retrieval returning the right chunks?** Low relevance → fix Search before blaming the model.
3. **Does the agent say "I don't know" when context is empty?** If not → add the instruction + a grounding check.
4. **Can a bad build reach production?** If yes → add an eval gate that blocks groundedness < 4.0.
5. **Can you trace a single bad answer end to end?** If not → wire OpenTelemetry to Azure Monitor.

### Step 4 — A 1-week rollout plan

| Day | Action | Owner |
|-----|--------|-------|
| **Day 1** | Build a labeled eval set with known hallucinations | Product + ML |
| **Day 2** | Run groundedness/relevance; record baseline rate | ML eng |
| **Day 3** | Tune Azure AI Search retrieval; re-measure | Data eng |
| **Day 4** | Add the CI/CD eval gate (block < 4.0) | DevOps |
| **Day 5** | Wire OpenTelemetry traces to Azure Monitor | SRE |

### Step 5 — Prove the ROI

- **Groundedness score** — mean across the eval set *(target: ≥ 4.0/5)*.
- **Hallucination rate** — % of answers unsupported by sources *(target: under 2%)*.
- **Gate coverage** — % of deployments passing through the eval gate *(target: 100%)*.

> 💡 **Rule of thumb:** most "the model is hallucinating" problems are actually retrieval problems. Fix what the agent *sees* before you touch the prompt — and never ship without a groundedness gate.

### Doing this solo (no team, portfolio-first)

No team, no budget? A working RAG **quality gate** in CI is a portfolio piece hiring managers immediately understand. Run the week solo:

- **Mon–Tue** — build a 20-row labeled eval set (JSONL) with known hallucinations; run the Azure AI Evaluation SDK for a baseline.
- **Wed–Thu** — tune Azure AI Search retrieval, then add a GitHub Actions gate that blocks groundedness below 4.0.
- **Fri** — capture before/after groundedness + a screenshot of the CI gate failing a bad build.

📦 **Ship this artifact:** a public repo with the eval set + a GitHub Actions workflow that gates on groundedness. Resume bullet: *"Shipped a RAG quality gate — raised groundedness to 4.x/5, kept hallucinations under 2%, and blocked 100% of failing builds in CI."*

> 🆓 **Free-tier path:** Azure AI Search has a free tier and the Evaluation SDK runs locally — the whole loop fits a free account.

---

## Regulatory Mapping

| Requirement | Regulation | Enforcement |
|-------------|-----------|-------------|
| Accuracy & reliability requirements | EU AI Act Art. 9 (Risk Management) | Eval gates in CI/CD |
| Transparency about AI limitations | EU AI Act Art. 13 | Fallback "I don't know" response |
| Human oversight capability | EU AI Act Art. 14 | Trace logs + escalation path |
| Technical documentation | EU AI Act Art. 11 | Eval results stored per deployment |
| Measure 2.5 — Residual risk | NIST AI RMF | Groundedness threshold as risk gate |

---

<details>
<summary>💡 Hints (try to solve first)</summary>

1. **Groundedness scores 1–5**: A score of 1 means the response is completely ungrounded (made up). Score 5 = fully supported by context. Aim for ≥4.0 in production.
2. **The evaluator is itself an LLM call**: The evaluation SDK uses GPT-4o to judge responses. Budget for extra API calls during eval runs.
3. **Root cause first**: Before fixing the model, check if Azure AI Search is returning the right chunks. Low retrieval relevance → low groundedness, even with a perfect model.
4. **Chunking matters**: If policy documents are chunked into 4000-token blocks, the relevant coverage clause might be buried. Try 500-token chunks with 50-token overlap.

</details>

---

## Break & Fix

You ran the evaluation and got groundedness = 3.2 across the dataset. The eval results show the model is adding information not present in any retrieved chunk.

**Investigate:**
1. Check retrieval logs — what chunks are being returned for "laptop coverage" queries?
2. Is the system prompt instructing the agent to "be helpful and complete" without constraining it to only use provided context?
3. Try adding to system prompt: *"If the answer is not explicitly stated in the provided policy documents, say: 'I don't have that information in your policy. Please call 1-800-MERIDIAN.'"*

---

## Knowledge Check

1. What does a groundedness score of 2.0 tell you about an agent's responses?
2. Why should the evaluation LLM (judge model) be different from the agent's deployed model?
3. What is the primary difference between a Content Safety filter and a groundedness evaluator?
4. In a CI/CD pipeline, at what stage should you run evaluations — before or after deployment to a staging environment?

---

## Cleanup

```bash
# No persistent resources created in this challenge beyond API calls
# Delete eval results files locally if desired
Remove-Item meridian_eval_results.json -ErrorAction SilentlyContinue
```
