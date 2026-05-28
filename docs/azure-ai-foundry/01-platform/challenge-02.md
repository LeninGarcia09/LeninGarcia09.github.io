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
