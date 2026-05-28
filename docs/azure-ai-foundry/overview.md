---
sidebar_position: 1
title: Azure AI Foundry + Hosted Agents
---

# 🤖 Azure AI Foundry + Hosted Agents

**Track Type:** Skill Track — Deep Technical  
**Target Audience:** AI Solution Architects, Cloud Architects, Principal Engineers  
**Prerequisites:** AZ-900 or equivalent Azure exposure; Python or PowerShell comfort

---

:::tip What You'll Build
Production-grade AI architectures grounded in real enterprise constraints. Every challenge starts from a customer scenario — the kind you'll encounter in actual customer engagements.
:::

---

## Platform Context (2025)

Microsoft rebranded Azure AI Studio → **Azure AI Foundry** → **Microsoft Foundry** (2025). The platform unifies:

| Component | Role |
|-----------|------|
| **Foundry Portal** (`ai.azure.com`) | Unified project hub |
| **Foundry Resource** | Single account + projects (replaces Hub + AOAI + AI Services) |
| **Agent Service** | Three agent types: Prompt, Workflow, Hosted |
| **Model Catalog** | 1,900+ models from Microsoft, OpenAI, Meta, Mistral, Hugging Face |
| **Tool Ecosystem** | 1,400+ MCP connectors, Azure Search, Logic Apps, Functions |
| **Evaluation SDK** | Groundedness, coherence, fluency, safety scoring |
| **Observability** | OpenTelemetry traces, dashboards, Azure Monitor integration |

---

## The Three Agent Types

```
┌─────────────────────────────────────────────────────────────┐
│                    Azure AI Agent Service                   │
├──────────────┬──────────────────┬───────────────────────────┤
│ Prompt Agent │ Workflow Agent   │ Hosted Agent              │
│ (No-code)    │ (YAML/Visual)    │ (Container/Code)          │
│              │ [Preview]        │ [Preview]                 │
├──────────────┼──────────────────┼───────────────────────────┤
│ Chat UI      │ Multi-step flows │ Full code control         │
│ Simple Q&A   │ Conditional DAGs │ BYO framework (LangGraph) │
│ 5-min deploy │ Visual designer  │ Micro-VM isolation        │
│              │                  │ <1s cold start            │
│              │                  │ $0 idle cost              │
└──────────────┴──────────────────┴───────────────────────────┘
```

### Hosted Agents — Architecture Deep Dive

Hosted Agents are the **enterprise-grade, code-first** option. Key facts every architect must know:

- **Isolation:** Each agent runs in a **Micro-VM** (gVisor-based) — process-level isolation, not shared container
- **Lifecycle:** Cold start < 1 second; $0 idle cost; scales to zero automatically  
- **Frameworks:** LangGraph, Azure Agent Framework, Semantic Kernel — bring any Python agent
- **Network:** Supports **BYO VNet** (Standard mode) — private endpoints, NSG integration
- **Identity:** Every agent gets an **Entra Agent ID** (managed identity) — no passwords, full RBAC
- **API Version:** Build on **Responses API (v2)** — the classic Assistants API (v1) retires March 2027
- **SDK:** `azure-ai-projects` 2.x — unified client, single project endpoint

---

## Deployment Modes: Critical Enterprise Decision

| Mode | Storage | Networking | Use Case |
|------|---------|-----------|----------|
| **Basic** | Microsoft manages | Public | Dev/test only |
| **Standard** | Customer BYO (Storage + Key Vault + Search) | Private endpoints available | **All enterprise workloads** |

:::danger Always Use Standard Mode for Enterprise
Basic mode gives Microsoft access to your conversation data and artifacts. Any customer with data residency, HIPAA, PCI, or EU AI Act requirements **must** use Standard mode.
:::

---

## Learning Path (14 Modules)

| # | Module | Type | Time |
|---|--------|------|------|
| 1 | Platform Architecture & Resource Model | Concept | 45 min |
| 2 | Agent Service Fundamentals | Lab | 60 min |
| 3 | First Hosted Agent (LangGraph) | Lab | 90 min |
| 4 | VNet Isolation & Private Endpoints | Lab | 90 min |
| 5 | Entra Agent ID & RBAC | Lab | 60 min |
| 6 | Evaluation SDK & Groundedness | Lab | 90 min |
| 7 | Content Safety Integration | Lab | 60 min |
| 8 | Multi-Agent Orchestration | Lab | 120 min |
| 9 | MCP Tools & External Connectors | Lab | 90 min |
| 10 | OpenTelemetry & Observability | Lab | 90 min |
| 11 | Standard Mode Enterprise Setup | Lab | 120 min |
| 12 | Production Troubleshooting | Lab | 90 min |
| 13 | Agent Publishing (Copilot Studio / Teams) | Lab | 60 min |
| 14 | Cost Optimization & Scaling | Concept | 45 min |

---

## Challenges (Scenario-Based Labs)

All labs are based on **real enterprise scenarios**:

| Challenge | Scenario | Domain |
|-----------|---------|--------|
| [1 — BYO VNet Healthcare](./01-platform/challenge-01.md) | Patient data can't leave hospital VNet | Healthcare / Data Residency |
| [2 — Hallucination in Production](./01-platform/challenge-02.md) | Agent returns wrong answers 20% of the time | Evaluation / Quality |
| [3 — Entra Agent ID Setup](./01-platform/challenge-03.md) | Standard mode with managed identity + RBAC | Security / Identity |
| [4 — Multi-Agent Claims System](./02-agent-service/challenge-04.md) | Bank security team reviewing AI architecture | Financial / Multi-Agent |
| [5 — Hosted Agent at Scale](./02-agent-service/challenge-05.md) | Works locally, fails at 500 concurrent users | Production / Troubleshooting |

---

## Key Resources

- [Microsoft Foundry Portal](https://ai.azure.com)
- [Agent Service Documentation](https://learn.microsoft.com/en-us/azure/ai-services/agents/)
- [Hosted Agents Overview](https://learn.microsoft.com/en-us/azure/ai-services/agents/concepts/hosted-agents)
- [`azure-ai-projects` SDK](https://pypi.org/project/azure-ai-projects/)
- [Evaluation SDK](https://learn.microsoft.com/en-us/azure/ai-studio/how-to/develop/evaluate-sdk)
