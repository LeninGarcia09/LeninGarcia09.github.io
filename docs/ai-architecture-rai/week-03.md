---
sidebar_position: 4
title: "Week 3: Microsoft Stack Deep Dive"
---

# Week 3: Microsoft Stack Deep Dive

:::info Week Overview
**Objective:** Master RAI architecture in the Azure AI / Copilot / MCP ecosystem and understand how governance integrates structurally at design time.  
**Time Estimate:** 8–10 hours  
**Deliverable:** RAI Architecture Decision Record (ADR) Template — standardized format for documenting RAI decisions at design time
:::

---

## Azure AI Content Safety — Structural Integration Patterns

Azure AI Content Safety is a **content policy enforcement layer** that must be placed at the right architectural points:

```
PATTERN 1: Input Gate (always recommended)
User Input → [Content Safety: Prompt Shield] → LLM
                       ↓ Block | Flag | Pass-through

PATTERN 2: Output Gate (always recommended for customer-facing)
LLM Output → [Content Safety: Text Moderation] → User
                       ↓ Block | Rewrite | Pass-through

PATTERN 3: Retrieved Content Gate (critical for RAG)
Retrieved Chunk → [Content Safety scan] → Prompt Context
                           ↓ Block poisoned content before LLM sees it

PATTERN 4: Grounding Verification (for factual systems)
LLM Response → [Groundedness Detection] → Output
                       ↓ Flag ungrounded claims for human review
```

**Architecture decision:** Every content safety call adds latency and cost. Define at design time which gates are mandatory (input + output) vs. configurable.

---

## Azure AI Foundry — Evaluations as CI/CD Gates

Build evaluations into the deployment pipeline — not run manually:

| Evaluation Type | What It Measures | Threshold Recommendation |
|----------------|-----------------|--------------------------|
| **Groundedness** | Are claims supported by retrieved context? | ≥ 0.85 |
| **Relevance** | Is the response relevant to the query? | ≥ 0.80 |
| **Safety** | Does the response contain harmful content? | ≥ 0.95 (block deployment if below) |
| **Fairness** | Does quality differ across user groups? | Run on major model updates |

```yaml
# AI Evaluation in CI/CD pipeline
- name: Run RAI Evaluations
  with:
    dataset: ./eval/golden_dataset.jsonl
    evaluators: groundedness,safety,relevance
    threshold_safety: 0.95
    fail_on_threshold_breach: true  # Block deployment if safety < 0.95
```

---

## MCP Server Governance — When RAI Release Assessment Applies

### The 5-Tier Compliance Gate

| Gate | Applies When | Reviews Required |
|------|-------------|-----------------|
| **1: Security Only** | Read-only tools, no AI, non-sensitive data, internal | Security |
| **2: + Privacy** | Tools access PII or personal data | Security + Privacy |
| **3: + Non-GenAI RA** | ML/embeddings inside any tool handler | Security + Privacy + Non-GenAI RA |
| **4: + GenAI RA** | LLM inside any handler, OR generates content, OR escalation-trigger tools | Security + Privacy + GenAI RA |
| **5: + Restricted Use** | Code execution, healthcare/legal, customer-facing autonomous, cross-tenant | All above + Restricted Use |

:::warning The Row Teams Get Wrong Every Time
An MCP server with **no AI inside** still requires a GenAI RA if it exposes escalation-trigger tools:
- `send_email()` / `send_teams_message()` — mass communications at AI agent speed
- `execute_sql()` with write access — bulk data modification
- `create_pull_request()` / `deploy_to_production()` — code pipeline control

**M365 Mail MCP, SQL MCP, and Azure DevOps MCP all fall here.**  
The question is not: *does this server use AI?*  
The question is: *can an AI agent use this server to cause harm at scale?*
:::

### 12 Risk Dimensions for MCP Scoring

| # | Dimension | High Risk Signal |
|---|-----------|-----------------|
| 1 | AI/ML Usage | Any LLM/SLM/embeddings inside |
| 2 | Content Generation | Produces novel text, code, or summaries |
| 3 | Data Sensitivity | PII, health, financial, or confidential data |
| 4 | Action Consequence | Irreversible or high-impact actions |
| 5 | Reversibility | Actions that cannot be undone |
| 6 | User Scope | Affects many users simultaneously |
| 7 | Autonomy Level | Minimal human oversight in the flow |
| 8 | Trust Chain Position | Called by other AI agents (trust inheritance) |
| 9 | Third-Party AI | Calls external AI APIs |
| 10 | Sensitive Use Category | Healthcare, legal, financial, HR |
| 11 | Consent & Transparency | Users unaware AI is acting on their behalf |
| 12 | Deployment Environment | Customer-facing, cross-tenant |

---

## Copilot Extensibility — Inherited vs. Owned RAI

| Copilot Component | RAI Inherited from Microsoft | RAI You Must Own |
|-------------------|------------------------------|-----------------|
| Microsoft Copilot base | Content filtering, grounding, safety eval | Your data scope, your tool permissions |
| Declarative Agent | Copilot's system-level safety | System prompt, data connector access |
| Custom Engine Agent (own LLM) | Nothing | Everything: safety, grounding, fairness, monitoring |
| MCP Server (tools) | Nothing | All 12 dimensions, all 5 compliance gates |

---

## This Week's Resources

| Resource | Type | Estimated Time |
|----------|------|---------------|
| [Azure AI Content Safety docs](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/) | Technical | 1.5 hours |
| [Azure AI Foundry evaluation concepts](https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-approach-gen-ai) | Technical | 1 hour |
| [Copilot extensibility overview](https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/) | Reading | 1 hour |
| [MCP Specification](https://spec.modelcontextprotocol.io/) | Technical | 1.5 hours |
| [Microsoft RAI Standard v2](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE5cmFl) | Reading | 1 hour |

---

## Hands-On Exercise

:::tip Exercise — Compliance Gate Analysis
Design a Copilot-connected AI assistant with three MCP tools:
1. `search_documents()` — reads SharePoint documents (read-only, internal)
2. `send_email()` — sends email via M365 Mail (write, external communication)
3. `run_report_query()` — executes read-only SQL queries on a BI database

For each MCP server:
- Apply the 5-tier compliance gate — which gate does it reach?
- Score the 12 risk dimensions — how many are High?
- Identify which reviews are required
- Draw the trust boundary diagram showing which agents are authorized to call each server
:::

---

## Week 3 Deliverable: RAI Architecture Decision Record Template

```markdown
## ADR-[number]: [Decision Title]

**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Superseded
**Context:** What situation prompted this decision? What RAI risk is being addressed?
**Decision:** What did we decide to do?
**RAI Principles Addressed:** Fairness | Reliability | Privacy | Inclusiveness | Transparency | Accountability
**Compliance Gate Impact:** Does this decision affect which compliance gate applies?
**Trade-offs:** What did we give up (performance, UX, cost)?
**Alternatives Considered:** What else did we evaluate?
**Consequences:** What becomes easier? What becomes harder?
**Review Trigger:** When should this decision be revisited?
```

---

## Knowledge Check

1. Where in a RAG pipeline should Prompt Shield be placed — and why?
2. An AI Foundry evaluation shows groundedness 0.91 and safety 0.88 (threshold: 0.95). What happens in CI/CD?
3. A team says: "We don't use AI inside our MCP server, so we don't need a RAI RA." What do you ask them first?
4. What is the difference between a Declarative Agent and a Custom Engine Agent in terms of RAI ownership?
