---
sidebar_position: 3
title: "Week 2: Architecture Patterns + RAI by Design"
---

# Week 2: Architecture Patterns + RAI by Design

:::info Week Overview
**Objective:** Learn the core AI architecture patterns (RAG, agentic, tool-use) and understand where RAI controls must be embedded structurally in each.  
**Time Estimate:** 8–10 hours  
**Deliverable:** RAI Threat Model Template — a reusable diagram with annotated risk layers for RAG, agentic, and tool-use patterns
:::

---

## RAG Architecture — RAI Failure Modes at Each Layer

```
INPUT LAYER
├─ User query arrives
├─ ⚠️ Risk: Adversarial input / prompt injection
└─ 🛡️ Control: Input validation, content safety classifier (Prompt Shield)

RETRIEVAL LAYER
├─ Query → Embedding → Vector search → Document chunks
├─ ⚠️ Risk: Biased retrieval (some populations' content under-represented)
├─ ⚠️ Risk: Stale or poisoned documents in the index
└─ 🛡️ Control: Data freshness policy, source provenance tracking, access control

AUGMENTATION LAYER
├─ Retrieved chunks added to prompt context
├─ ⚠️ Risk: Indirect prompt injection (malicious content in retrieved docs hijacks LLM)
└─ 🛡️ Control: Content scan on retrieved chunks before LLM injection

GENERATION LAYER
├─ LLM generates response grounded in retrieved context
├─ ⚠️ Risk: Hallucination (claims not supported by retrieved content)
├─ ⚠️ Risk: Harmful content despite grounding
└─ 🛡️ Control: Groundedness evaluator, output content safety filter

OUTPUT LAYER
├─ Response returned to user
├─ ⚠️ Risk: No disclosure that content is AI-generated
└─ 🛡️ Control: AI disclosure, source citations, human review gate for high-stakes domains
```

---

## Agentic Architecture — Trust Boundaries and Autonomous Risk

```
AGENT LOOP ARCHITECTURE
─────────────────────────────────────────────────────────
User Intent → [Planner LLM]
                    ↓ Decides tool calls
              [Tool Execution] ──→ External Systems (DB, API, email, code)
                    ↓ Results returned
              [Reasoning LLM] ──→ Next decision
                    ↓
              [Output] → User / Next Agent

RAI RISK HOTSPOTS:
├─ Planner LLM: Can be manipulated via prompt injection in tool results
├─ Tool Execution: No human oversight between decision and action
├─ Multi-turn loop: Accumulated context may degrade decision quality
└─ Multi-agent: Downstream agents inherit the trust of calling agents
```

**The 3 non-negotiable architectural RAI controls for agents:**

1. **Confirmation gates** — for any irreversible action (send email, delete record, deploy code), require explicit human confirmation
2. **Audit log per tool invocation** — caller identity, parameters, timestamp, result; stored outside the agent's context
3. **Blast radius limitation** — scope each agent's tool permissions to the minimum required

---

## OWASP LLM Top 10 — The Architect's View

These are **architectural failures**, not application bugs:

| Risk | Root Architectural Cause | Design Fix |
|------|--------------------------|------------|
| **LLM01: Prompt Injection** | User data and system instructions share the same input channel | Separate channels; scan retrieved content before injection |
| **LLM02: Insecure Output Handling** | LLM output rendered without sanitization | Treat all LLM output as untrusted; sanitize before passing to downstream systems |
| **LLM03: Training Data Poisoning** | No data governance on fine-tuning or RAG sources | Source provenance required; freshness policy; adversarial input testing |
| **LLM06: Excessive Agency** | Agent has more permissions than its task requires | Principle of least privilege for every tool; scoped OAuth tokens |
| **LLM08: Excessive Data Exposure** | System prompt includes sensitive data unnecessarily | Data minimization in context construction |
| **LLM09: Overreliance** | No human in the loop for high-stakes decisions | Mandatory review gates; confidence thresholds routing low-confidence outputs to humans |

---

## STRIDE-AI Threat Modeling Extension

| STRIDE Category | AI-Specific Attack | Architecture Mitigation |
|----------------|-------------------|------------------------|
| **Spoofing** | Prompt injection impersonates the system | System/user prompt separation; instruction hierarchy |
| **Tampering** | Data poisoning corrupts RAG index | Source validation; signed document provenance |
| **Repudiation** | Agent takes action with no audit trail | Immutable audit log per tool invocation |
| **Information Disclosure** | System prompt extraction; PII leakage via model | No secrets in prompts; PII detection on output |
| **Denial of Service** | Adversarial prompts causing infinite loops or max token consumption | Input length limits; loop detection in agent runtime |
| **Elevation of Privilege** | Confused deputy — tricked agent uses legitimate credentials for attacker | Token scoping; per-agent managed identity |

---

## This Week's Resources

| Resource | Type | Estimated Time |
|----------|------|---------------|
| [Azure OpenAI RAG Architecture Guide](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/architecture/baseline-openai-e2e-chat) | Architecture deep-dive | 2 hours |
| [Azure AI Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/) | Reference | 1.5 hours |
| [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) | Full read | 1.5 hours |
| [MITRE ATLAS — AI Threat Matrix](https://atlas.mitre.org/) | Reference | 1 hour |
| [Semantic Kernel Agent Framework](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/) | Technical | 1.5 hours |

---

## Hands-On Exercise

:::tip Exercise — Annotate a RAG Architecture
Draw a RAG architecture diagram. For each component (data ingestion, embedding, retrieval, generation, output):

1. Label the **RAI risk** at that layer (use OWASP LLM Top 10 as reference)
2. Label the **mitigation control** you would add
3. Label the **owner** of that control (data team / AI team / security / product)

Then answer: Which layer has the weakest RAI coverage in most RAG implementations you've seen — and why?
:::

---

## Week 2 Deliverable: RAI Threat Model Template

Build a reusable threat model template with:
- RAG layer diagram with risk annotations (one threat + one control per layer)
- Agentic loop diagram with trust boundary markings
- STRIDE-AI extension table (6 rows, AI-specific attack + mitigation for each)

---

## Knowledge Check

1. In a RAG system, what is the risk of indirect prompt injection and at which layer does it occur?
2. Why is "Excessive Agency" (OWASP LLM06) an architectural problem, not a code bug?
3. A developer says: "Our agent only calls read-only APIs, so we don't need a confirmation gate." What RAI risk does this reasoning miss?
4. In STRIDE-AI, which category covers the "confused deputy" attack pattern?
