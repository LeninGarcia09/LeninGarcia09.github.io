---
id: articles
title: Articles & Reads
sidebar_label: 📰 Articles
slug: /resources/articles
---

# Articles & Reads

Curated reads for AI Solution Architects — technical depth, architectural insight, and real-world applicability. Quality over quantity.

---

## AI Agents & Agentic Architecture

| Article | Author / Source | Why Read It |
|---------|----------------|-------------|
| [Building effective agents](https://www.anthropic.com/research/building-effective-agents) | Anthropic | The canonical reference on agentic design patterns: augmented LLMs, routing, parallelization, orchestration |
| [Agents](https://docs.anthropic.com/en/docs/agents-and-tools/agents-overview) | Anthropic Docs | Official Agent SDK architecture — agentic loops, tool use, multi-agent coordination |
| [Azure AI Foundry Agent Service Overview](https://learn.microsoft.com/azure/ai-services/agents/overview) | Microsoft Learn | Microsoft's hosted agent architecture, SDK, tools, and enterprise features |
| [What are AI Agents?](https://learn.microsoft.com/azure/ai-services/agents/concepts/agents) | Microsoft Learn | Azure-specific agent concepts: thread, run, tool call lifecycle |
| [Multi-agent systems with Azure AI Foundry](https://learn.microsoft.com/azure/ai-foundry/agents/concepts/multi-agent) | Microsoft Learn | Connected Agents pattern, agent-to-agent tool calls |

---

## Prompt Engineering

| Article | Author / Source | Why Read It |
|---------|----------------|-------------|
| [Prompt engineering overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) | Anthropic Docs | Anthropic's own prompt engineering guide — the source of truth for Claude |
| [Prompt engineering techniques](https://learn.microsoft.com/azure/ai-services/openai/concepts/prompt-engineering) | Microsoft Learn | Azure OpenAI perspective: system prompts, few-shot, chain-of-thought |
| [Introduction to Prompt Engineering](https://www.promptingguide.ai/) | PromptingGuide.ai | Comprehensive community reference covering CoT, ReAct, PAL, Tree-of-Thoughts |
| [Claude's extended thinking](https://www.anthropic.com/research/claude-think-before-answering) | Anthropic | Deep dive into extended thinking / chain-of-thought reasoning |

---

## Responsible AI & Governance

| Article | Author / Source | Why Read It |
|---------|----------------|-------------|
| [Microsoft Responsible AI Standard v2](https://blogs.microsoft.com/wp-content/uploads/prod/sites/5/2022/06/Microsoft-Responsible-AI-Standard-v2-General-Requirements-3.pdf) | Microsoft | The 6-principle framework that governs all Microsoft AI products |
| [EU AI Act — Full Text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689) | EUR-Lex | Primary regulation — in force Aug 1 2024, high-risk compliance by Aug 2 2026 |
| [NIST AI Risk Management Framework](https://www.nist.gov/artificial-intelligence/ai-risk-management-framework) | NIST | The US framework for AI risk: Govern, Map, Measure, Manage |
| [Azure AI Content Safety overview](https://learn.microsoft.com/azure/ai-services/content-safety/overview) | Microsoft Learn | Harm categories, severity levels, filters — critical for production AI |
| [Microsoft Purview AI Hub](https://learn.microsoft.com/purview/ai-microsoft-purview) | Microsoft Learn | Govern AI usage, discover shadow AI, classify AI interactions |
| [PyRIT — Python Risk Identification Toolkit](https://github.com/Azure/PyRIT) | Microsoft / GitHub | Automated red teaming for AI systems — the tool behind Microsoft's own AI safety testing |

---

## Azure AI Architecture

| Article | Author / Source | Why Read It |
|---------|----------------|-------------|
| [Azure AI Foundry architecture](https://learn.microsoft.com/azure/ai-foundry/concepts/architecture) | Microsoft Learn | Hub-project model, network isolation, managed identity, resource layout |
| [Private networking in Azure AI Foundry](https://learn.microsoft.com/azure/ai-foundry/how-to/configure-private-link) | Microsoft Learn | BYO VNet, private endpoints, DNS configuration for enterprise isolation |
| [Azure AI Foundry — Basic vs Standard](https://learn.microsoft.com/azure/ai-foundry/concepts/connections) | Microsoft Learn | When to use each mode — critical for enterprise data residency decisions |
| [Foundry Hosted Agents: Micro-VM isolation](https://learn.microsoft.com/azure/ai-services/agents/concepts/hosted-agents) | Microsoft Learn | How Foundry-hosted agents achieve compute isolation, BYO VNet, Entra Agent ID |
| [AI workloads on Azure — Well-Architected](https://learn.microsoft.com/azure/well-architected/ai/) | Microsoft Learn | Azure WAF guidance for AI: reliability, security, performance, cost |

---

## Security & Identity

| Article | Author / Source | Why Read It |
|---------|----------------|-------------|
| [Microsoft Entra Agent ID](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/entra-agent-id-identity-for-your-ai-agents/4391706) | Microsoft Tech Community | Per-agent identity in Entra ID — the foundation of agent RBAC |
| [Zero Trust for AI workloads](https://learn.microsoft.com/security/zero-trust/azure-ai) | Microsoft Learn | Applying Zero Trust principles to AI systems: verify, least privilege, assume breach |
| [Securing Azure AI Foundry](https://learn.microsoft.com/azure/ai-foundry/how-to/rbac-azure-ai-foundry) | Microsoft Learn | RBAC roles: AI Developer, AI Inference Deployment Operator, and custom roles |

---

## Agentic Reliability & Production Patterns

Critical reading for architects building AI agents that must be **correct, auditable, and reliable** in enterprise and regulated environments.

| Article | Author / Source | Why Read It |
|---------|----------------|-------------|
| [The LLM-as-Analyst Trap — Part 1](https://appliedingenuity.substack.com/p/the-llm-as-analyst-trap-a-technical) | Applied Ingenuity | The canonical post on why LLMs fail as data analysts — 5 failure modes with code reproduction |
| [The LLM-as-Analyst Trap — Part 2: The Verifiable Orchestrator](https://appliedingenuity.substack.com/p/the-verifiable-orchestrator) | Applied Ingenuity | The fix: TRACE architecture (Tool-Routed Architecture for Controlled Execution) — the LLM as orchestrator, not analyst |
| [You Can't Debug What You Can't See: AI Observability with OpenTelemetry & Azure AI Foundry](https://itnext.io/you-cant-debug-what-you-can-t-see-ai-observability-with-opentelemetry-microsoft-foundry-f90407b90e17) | ITNEXT / Community | How to instrument AI agents with OpenTelemetry + Application Insights for production-grade debugging |
| [How Tracing Works in Azure AI Foundry Agents](https://willvelida.com/posts/azure-ai-agents-tracing/) | Will Velida | Step-by-step tracing setup for Foundry agents — spans, tool calls, retries, latency |
| [AI Agent Observability — Evolving Standards and Best Practices](https://opentelemetry.io/blog/2025/ai-agent-observability/) | OpenTelemetry | New semantic conventions for multi-agent observability — cross-framework unified tracing |
| [Best Hallucination Detection Tools (2026)](https://www.braintrust.dev/articles/best-hallucination-detection-tools-2026) | Braintrust | Landscape review: pre-release eval, production monitoring, runtime guardrails — with tool comparison |
| [8 Best AI Agent Reliability Solutions 2026](https://galileo.ai/blog/best-ai-agent-reliability-solutions) | Galileo | Platform comparison: context drift, tool misuse, reasoning failure detection |
| [Agent Evaluation Guide: Testing AI Agents 2026](https://www.openlayer.com/blog/post/agent-evaluation-complete-guide-testing-ai-agents) | Openlayer | Full lifecycle agent evaluation — from smoke tests to regulatory compliance checking |
| [Azure Well-Architected Framework — AI Reliability Principles](https://learn.microsoft.com/azure/well-architected/ai/design-principles) | Microsoft Learn | AI-specific reliability: failure mode analysis, SLA matching across LLM/retrieval/data layers, bulkhead pattern |
| [Azure Well-Architected — Responsible AI for Agents](https://learn.microsoft.com/azure/well-architected/ai/responsible-ai) | Microsoft Learn | Three foundational aspects: data ingress/egress control, data integrity assurance, independent guardrails. Endorsed TRACE-style audit logging |
| [Azure AI Foundry Agent Evaluators (9 built-in)](https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-evaluators/agent-evaluators) | Microsoft Learn | Task Completion, Tool Call Accuracy, Tool Input Accuracy, Task Navigation Efficiency — production evaluation suite for agents |
| [Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) | Anthropic | Canonical agentic design patterns — Evaluator-Optimizer, Parallelization/Voting, tool documentation as reliability surface |

---

## Industry & Research

| Article | Author / Source | Why Read It |
|---------|----------------|-------------|
| [Anthropic Model Card — Claude 3.5+](https://www.anthropic.com/claude/model-card) | Anthropic | Capabilities, limitations, safety evaluations, and benchmark results |
| [Scaling laws for neural language models](https://arxiv.org/abs/2001.08361) | Kaplan et al. | The foundational paper on how model capability scales with compute |
| [Constitutional AI](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback) | Anthropic Research | How Claude's values are trained — essential for understanding AI safety architecture |
| [Llama 3 paper](https://arxiv.org/abs/2407.21783) | Meta AI | State-of-the-art open-source LLM — architecture reference for comparison |

---

## Academic Papers — Agentic Systems

Essential research papers every AI Solution Architect should know when designing reliable agentic systems.

| Paper | Authors | Key Finding |
|-------|---------|-------------|
| [Lost in the Middle (arXiv:2601.15300)](https://arxiv.org/abs/2601.15300) | Liu et al. | **Intelligence degradation**: Models using only 40-50% of their context window show 45.5% drop in F1 score. Position of data in context window matters as much as content |
| [Same Task, More Tokens (arXiv:2510.05381)](https://arxiv.org/abs/2510.05381) | Various | **Context length paradox**: Adding more context hurts performance even when retrieval is perfect — information overload is real in production agents |
| [ReWOO (arXiv:2305.18323)](https://arxiv.org/abs/2305.18323) | Xu et al. | Decoupled reasoning and observation — reduces token usage by separating planning from execution, but without determinism guarantees |
| [CodeAct (arXiv:2402.01030)](https://arxiv.org/abs/2402.01030) | Wang et al. | Agents that act by executing code — reduces action space complexity but introduces code execution security risks |
| [AgentHallu (arXiv:2601.06818)](https://arxiv.org/abs/2601.06818) | Various | Benchmarking hallucination in multi-step agents — identifies exactly which reasoning steps cause divergence; even leading models fail significantly |

---

:::tip Suggest an Article
Read something worth sharing? [Open an issue](https://github.com/LeninGarcia09/LeninGarcia09.github.io/issues) with the link and a sentence on why it belongs here.
:::
