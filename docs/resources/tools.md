---
id: tools
title: Tools
sidebar_label: 🛠️ Tools
slug: /resources/tools
---

# Tools

Organized by use case. All tools are free or have free tiers unless noted with 💰.

---

## Azure AI Development

| Tool | Description | Link |
|------|-------------|------|
| **Azure AI Foundry Portal** | Central hub for AI project creation, model catalog, evaluations, and agent deployment | [ai.azure.com](https://ai.azure.com) |
| **Azure AI CLI** (`az ai`)| Provision AI hubs, projects, and connections from the command line | [Docs](https://learn.microsoft.com/azure/ai-studio/how-to/cli-install) |
| **azure-ai-projects SDK** | Unified Python SDK for AI Foundry — agents, evaluations, connections | [PyPI](https://pypi.org/project/azure-ai-projects/) |
| **Azure AI Evaluation SDK** | Run quality + safety evaluations on AI outputs programmatically | [PyPI](https://pypi.org/project/azure-ai-evaluation/) |
| **Prompt flow** | LLM application orchestration: build, test, evaluate, deploy | [GitHub](https://github.com/microsoft/promptflow) |
| **Semantic Kernel** | Open-source SDK: orchestrate AI models, plugins, and memory (Python / C# / Java) | [GitHub](https://github.com/microsoft/semantic-kernel) |
| **AutoGen** | Multi-agent conversation framework from Microsoft Research | [GitHub](https://github.com/microsoft/autogen) |
| **Azure OpenAI Structured Outputs** | `response_format: {strict: true}` guarantees schema-adherent JSON from LLM — use with Pydantic for deterministic intent parsing | [Docs](https://learn.microsoft.com/azure/ai-services/openai/how-to/structured-outputs) |
| **Azure AI Foundry Agent Evaluators** | 9 built-in evaluators for production agents: Task Completion, Task Adherence, Tool Call Accuracy, Tool Input Accuracy, Tool Selection, Tool Output Utilization, Task Navigation Efficiency, Intent Resolution, Tool Call Success | [Docs](https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-evaluators/agent-evaluators) |
| **Azure Content Safety — Prompt Shields** | Real-time blocking of user jailbreak attacks AND indirect prompt injection (XPIA) from documents before the LLM sees them | [Docs](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) |
| **Azure Content Safety — Groundedness Pro** | Stricter than standard groundedness — uses Microsoft's hosted safety models, returns boolean True/False, no LLM deployment required. Best for financial/healthcare | [Docs](https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-evaluators/rag-evaluators) |
| **Azure APIM Semantic Caching** | Cache semantically similar LLM queries at the gateway — reduces cost/latency. ⚠️ Not a reliability tool: docs warn it can return outdated responses. Use `score-threshold="0.05"` and TTLs | [Docs](https://learn.microsoft.com/azure/api-management/azure-openai-semantic-cache-lookup-policy) |
| **Microsoft Defender for Cloud — AI Workloads** | Security alerts and recommendations specific to AI workloads — detect prompt injection attacks, data exfiltration, misuse in production | [Docs](https://learn.microsoft.com/azure/defender-for-cloud/alerts-ai-workloads) |
| **VS Code AI Foundry Toolkit** | Local OpenTelemetry tracing for Azure AI Foundry agents — debug without cloud round-trips | [Docs](https://code.visualstudio.com/docs/intelligentapps/tracing) |

---

## Claude & Anthropic Tools

| Tool | Description | Link |
|------|-------------|------|
| **Claude API** | Core API for messages, tool use, vision, and streaming | [Docs](https://docs.anthropic.com/en/api) |
| **Anthropic Agent SDK** | Build agentic loops, multi-agent systems, hooks | [Docs](https://docs.anthropic.com/en/docs/agents-and-tools/agents-overview) |
| **Claude Code** | AI-powered coding agent with CLAUDE.md config, custom commands, CI/CD integration | [Docs](https://docs.anthropic.com/en/docs/claude-code) |
| **Claude Code Hooks** | 25+ lifecycle event hooks for agent sessions: `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PostToolBatch`, `UserPromptSubmit`, `PreCompact`, `Stop`. ⚠️ These are Claude Code (CLI) hooks, not the Anthropic Messages API | [Docs](https://docs.anthropic.com/en/docs/claude-code/hooks) |
| **Extended Thinking** | `budget_tokens` controls reasoning depth before response; `adaptive` mode (Opus 4.8+) self-determines when deep reasoning is needed. Use for high-stakes decisions to catch self-contradictions before tool calls | [Docs](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking) |
| **MCP SDK** | Build Model Context Protocol servers to extend Claude with live data sources — the right architecture for externalizing business concept registries, entity aliases, and temporal resolvers | [GitHub](https://github.com/modelcontextprotocol/typescript-sdk) |
| **Anthropic Academy** | Official courses on agents, prompt engineering, tool use | [academy.anthropic.com](https://academy.anthropic.com) |

---

## LLM Infrastructure & Routing

| Tool | Description | Link |
|------|-------------|------|
| **LiteLLM** | Open-source AI Gateway supporting 100+ LLMs — centralize routing, enforce guardrails, retry/fallback logic, virtual keys, spend tracking, load balancing. Supports A2A Protocol for agent-to-agent calls | [GitHub](https://github.com/BerriAI/litellm) |
| **Azure API Management** | Enterprise gateway for Azure OpenAI — rate limiting, load balancing across multiple endpoints, token metering, semantic caching | [Docs](https://learn.microsoft.com/azure/api-management/) |

---

## Red Teaming & Security

| Tool | Description | Link |
|------|-------------|------|
| **PyRIT** | Microsoft's Python Risk Identification Toolkit for AI — automated red teaming | [GitHub](https://github.com/Azure/PyRIT) |
| **Garak** | LLM vulnerability scanner: probes for jailbreaks, hallucinations, data leakage | [GitHub](https://github.com/leondz/garak) |
| **PromptBench** | Adversarial robustness benchmark for LLMs | [GitHub](https://github.com/microsoft/promptbench) |
| **Azure AI Content Safety** | API for detecting harmful content: violence, hate, self-harm, sexual | [Portal](https://contentsafety.cognitive.azure.com) |
| **Purview AI Hub** | Discover, classify, and govern AI usage across M365 and Azure | [Docs](https://learn.microsoft.com/purview/ai-microsoft-purview) |
| **Counterfit** | Security testing tool for AI/ML models | [GitHub](https://github.com/Azure/counterfit) |

---

## Evaluation & Observability

| Tool | Description | Link |
|------|-------------|------|
| **Azure AI Foundry Evaluations** | Built-in evaluators: groundedness, coherence, fluency, relevance, safety | [Docs](https://learn.microsoft.com/azure/ai-studio/how-to/evaluate-generative-ai-app) |
| **Azure AI Foundry Tracing** | Native OpenTelemetry tracing for agents — step-by-step spans, tool calls, retries, costs. Exports to Application Insights | [Docs](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-setup) |
| **RAGAS** | Retrieval-Augmented Generation Assessment: faithfulness, answer relevance, context recall | [GitHub](https://github.com/explodinggradients/ragas) |
| **Promptfoo** | CLI tool for LLM evaluation, red teaming, and regression testing | [GitHub](https://github.com/promptfoo/promptfoo) |
| **LangSmith** 💰 | LLM observability, tracing, and dataset management | [smith.langchain.com](https://smith.langchain.com) |
| **Langfuse** | Open-source LLM observability — full session tracking, context workflows, self-hostable | [langfuse.com](https://langfuse.com) |
| **Arize Phoenix** | Open-source ML & LLM observability — hallucination metrics, RAG retrieval traceability, OpenTelemetry native | [GitHub](https://github.com/Arize-ai/phoenix) |
| **Braintrust** 💰 | Trace-to-eval pipeline with custom LLM scorers and human-in-the-loop review | [braintrust.dev](https://www.braintrust.dev) |
| **Galileo** 💰 | Production hallucination guardrails — Luna-2 inline blocking, scalable to 100% traffic | [galileo.ai](https://galileo.ai) |
| **DeepEval** | Open-source evaluation framework with 50+ metrics — RAG, agents, safety, multi-turn | [GitHub](https://github.com/confident-ai/deepeval) |
| **Confident AI** 💰 | Comprehensive agent evaluation — task completion, reasoning quality, cost efficiency | [confident-ai.com](https://www.confident-ai.com) |
| **Patronus AI** | Regulated domain evaluation — finance, copyright, open-source detection toolkit | [patronus.ai](https://www.patronus.ai) |
| **Maxim AI** 💰 | Full-stack agent observability — simulation, real-time debugging, eval loop, context tracking | [getmaxim.ai](https://www.getmaxim.ai) |
| **AgentOps** | Lightweight agent monitoring — 400+ frameworks, reliability metrics, session replay | [agentops.ai](https://www.agentops.ai) |
| **Azure Monitor** | Application Insights integration for AI workload telemetry and OpenTelemetry export | [Docs](https://learn.microsoft.com/azure/azure-monitor/overview) |

---

## Agentic Reliability & Deterministic Computation

Tools for building **production-grade agents** that are auditable, deterministic, and resistant to hallucination and context degradation.

| Tool | Description | Link |
|------|-------------|------|
| **tiktoken** | OpenAI's token counter library — measure exact context window usage per model (GPT-4, GPT-4o, etc.) before sending to LLM | [GitHub](https://github.com/openai/tiktoken) |
| **DuckDB** | In-process OLAP database — run SQL on DataFrames, Parquet, and CSVs with sub-second latency. Ideal for deterministic financial computation in AI pipelines | [duckdb.org](https://duckdb.org) |
| **Pydantic v2** | Schema enforcement for LLM outputs — define `BaseModel` for expected JSON, validate after every tool call, auto-repair invalid outputs | [docs.pydantic.dev](https://docs.pydantic.dev) |
| **Guardrails.ai** | Output validation framework — rails for type checking, format enforcement, PII detection, and retry logic on LLM outputs | [guardrailsai.com](https://www.guardrailsai.com) |
| **Instructor** | Structured LLM outputs using Pydantic — forces OpenAI / Anthropic models to return valid typed objects | [GitHub](https://github.com/jxnl/instructor) |
| **LangChain ConversationTokenBufferMemory** | Token-aware memory trimming — auto-prune conversation history to stay within context budget | [Docs](https://python.langchain.com/docs/modules/memory/) |
| **MLflow** | Experiment tracking, model versioning, and evaluation pipelines — log deterministic agent runs with full parameter lineage | [mlflow.org](https://mlflow.org) |
| **Opik (Comet)** | Open-source LLM evaluation platform with real-time guardrails for regression testing and prompt injection detection | [comet.com/opik](https://www.comet.com/opik) |
| **Prefect** | Workflow orchestration for deterministic AI pipelines — run IDs, retry policies, full execution logs | [prefect.io](https://www.prefect.io) |
| **Great Expectations** | Data validation framework — assert data contracts before feeding financial data to an LLM | [greatexpectations.io](https://greatexpectations.io) |

---

## Infrastructure & Deployment

| Tool | Description | Link |
|------|-------------|------|
| **Azure Bicep** | IaC for AI Foundry hubs, projects, private endpoints | [Docs](https://learn.microsoft.com/azure/azure-resource-manager/bicep/) |
| **Terraform Azure Provider** | Provision AI infrastructure with HCL | [Registry](https://registry.terraform.io/providers/hashicorp/azurerm/latest) |
| **Azure Developer CLI (azd)** | End-to-end developer workflow: provision + deploy AI apps | [Docs](https://learn.microsoft.com/azure/developer/azure-developer-cli/) |
| **GitHub Actions** | CI/CD for AI model evaluation, fine-tuning pipelines, app deployments | [Docs](https://docs.github.com/actions) |
| **Azure Container Apps** | Serverless container hosting for AI microservices and agents | [Docs](https://learn.microsoft.com/azure/container-apps/) |

---

## Productivity & Development

| Tool | Description | Link |
|------|-------------|------|
| **VS Code + AI Toolkit** | Azure AI model playground, fine-tuning, and deployment from VS Code | [Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-windows-ai-studio.windows-ai-studio) |
| **GitHub Copilot** | AI pair programmer — coding, docs, test generation | [github.com/features/copilot](https://github.com/features/copilot) |
| **REST Client (VS Code)** | Test API calls inline in `.http` files | [Marketplace](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) |
| **Bruno** | Open-source API client (Postman alternative, git-friendly) | [usebruno.com](https://www.usebruno.com) |
| **draw.io** | Free diagramming for architecture designs | [app.diagrams.net](https://app.diagrams.net) |

---

:::tip Suggest a Tool
Missing something useful? [Open an issue](https://github.com/LeninGarcia09/LeninGarcia09.github.io/issues) or email [lesalgad@microsoft.com](mailto:lesalgad@microsoft.com).
:::
