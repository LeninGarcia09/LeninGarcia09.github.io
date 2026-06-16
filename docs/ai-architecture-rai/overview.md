---
id: overview
title: AI Architecture + Responsible AI
sidebar_label: Track Overview
slug: /ai-architecture-rai/overview
---

# 🏗️ AI Architecture + Responsible AI

**Track Type:** Intensive 4-Week Skill Track  
**Target Audience:** Intermediate architects who have designed AI systems and want to embed RAI as a structural discipline  
**Prerequisites:** Familiarity with Azure AI services, RAG patterns, or agentic systems  
**Time Commitment:** 8–10 hours/week

---

:::tip What You'll Build
Four reusable artifacts: a RAI Architecture Lens card, a threat model template for AI architectures, a RAI Architecture Decision Record (ADR) template, and a portfolio of three annotated architecture diagrams with full compliance analysis.
:::

---

## Why RAI Must Be an Architectural Constraint

Most teams treat Responsible AI as a review gate at the end of the build. This fails for three reasons:

1. **Cost of change** — fixing a fairness gap at deployment is 10x harder than designing for it upfront
2. **Invisible integration** — safety controls bolted on as afterthoughts create gaps attackers exploit
3. **Accountability vacuum** — if no architecture document assigns ownership for each RAI dimension, nobody owns it

This track treats RAI principles as first-class architectural constraints — the same way you treat latency, availability, or security.

---

## The RAI Architecture Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                    REGULATORY LAYER                            │
│   EU AI Act (2024) | NIST AI RMF 1.0 | ISO 42001 | GDPR       │
├─────────────────────────────────────────────────────────────────┤
│                    POLICY LAYER                                │
│   Microsoft RAI Standard v2 | OWASP LLM Top 10                │
│   MITRE ATLAS (AI Threat Matrix)                               │
├─────────────────────────────────────────────────────────────────┤
│                    ARCHITECTURE LAYER                          │
│   RAG Design | Agentic Systems | MCP Servers | AI Gateway      │
│   Grounding | Guardrails | Content Filtering | Tool Governance │
├─────────────────────────────────────────────────────────────────┤
│                    PLATFORM LAYER                              │
│   Azure AI Content Safety | Azure AI Foundry Evaluations       │
│   Azure Monitor | Semantic Kernel | PyRIT Red Teaming          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Four Weeks — Four Artifacts

| Week | Focus | Deliverable |
|------|-------|-------------|
| [Week 1: RAI Foundations](./week-01.md) | RAI as design constraints; NIST AI RMF; EU AI Act tiers | RAI Architecture Lens card |
| [Week 2: Architecture Patterns](./week-02.md) | RAG, agentic, tool-use; OWASP LLM Top 10; STRIDE-AI threat model | RAI Threat Model Template |
| [Week 3: Microsoft Stack](./week-03.md) | Azure AI Content Safety; Foundry evaluations; MCP governance; Copilot extensibility | RAI Architecture Decision Record template |
| [Week 4: Applied Design](./week-04.md) | End-to-end design; red teaming; RA submission documentation | RAI Architecture Portfolio (3 diagrams) |

---

## Key Concepts

| Concept | Why It Matters for Architects |
|---------|-------------------------------|
| RAI as constraint, not review | Design the safeguard in; don't bolt it on at deployment |
| Trust boundary modeling | Every AI component boundary is a potential attack vector |
| Tool-level vs. system-level risk | Each MCP tool needs individual risk assessment |
| Escalation triggers | Non-AI systems may require GenAI RA if agents can misuse them at scale |
| Prompt injection as architecture risk | Not a content problem — a system design problem |
| 5-tier compliance gate | Security → Privacy → Non-GenAI RA → GenAI RA → Restricted Use |

---

## Key Resources

- [Microsoft RAI Principles](https://www.microsoft.com/en-us/ai/responsible-ai)
- [Microsoft RAI Standard v2](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE5cmFl)
- [NIST AI RMF 1.0](https://airc.nist.gov/Home)
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [MITRE ATLAS — AI Threat Matrix](https://atlas.mitre.org/)
- [Azure Well-Architected Framework — AI Workloads](https://learn.microsoft.com/en-us/azure/well-architected/ai/)
- [Azure AI Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/)
- [MCP Specification](https://spec.modelcontextprotocol.io/)
