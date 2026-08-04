---
id: tools
title: Herramientas
sidebar_label: 🛠️ Herramientas
slug: /resources/tools
---

# Herramientas

Organizadas por caso de uso. Todas las herramientas son gratuitas o tienen un plan gratuito, salvo las marcadas con 💰.

---

## Desarrollo con Azure AI

| Herramienta | Descripción | Enlace |
|------|-------------|------|
| **Azure AI Foundry Portal** | Centro principal para crear proyectos de IA, explorar el catálogo de modelos, ejecutar evaluaciones y desplegar agentes | [ai.azure.com](https://ai.azure.com) |
| **Azure AI CLI** (`az ai`)| Aprovisiona hubs, proyectos y conexiones de IA desde la línea de comandos | [Docs](https://learn.microsoft.com/azure/ai-studio/how-to/cli-install) |
| **azure-ai-projects SDK** | SDK unificado de Python para AI Foundry: agentes, evaluaciones y conexiones | [PyPI](https://pypi.org/project/azure-ai-projects/) |
| **Azure AI Evaluation SDK** | Ejecuta evaluaciones de calidad y seguridad sobre salidas de IA de forma programática | [PyPI](https://pypi.org/project/azure-ai-evaluation/) |
| **Prompt flow** | Orquestación de aplicaciones con LLM: construir, probar, evaluar y desplegar | [GitHub](https://github.com/microsoft/promptflow) |
| **Semantic Kernel** | SDK open-source para orquestar modelos de IA, plugins y memoria (Python / C# / Java) | [GitHub](https://github.com/microsoft/semantic-kernel) |
| **AutoGen** | Framework de conversaciones multiagente de Microsoft Research | [GitHub](https://github.com/microsoft/autogen) |
| **Azure OpenAI Structured Outputs** | `response_format: {strict: true}` garantiza JSON ajustado al esquema desde el LLM; úsalo con Pydantic para un parsing de intención determinista | [Docs](https://learn.microsoft.com/azure/ai-services/openai/how-to/structured-outputs) |
| **Azure AI Foundry Agent Evaluators** | 9 evaluadores integrados para agentes de producción: Task Completion, Task Adherence, Tool Call Accuracy, Tool Input Accuracy, Tool Selection, Tool Output Utilization, Task Navigation Efficiency, Intent Resolution y Tool Call Success | [Docs](https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-evaluators/agent-evaluators) |
| **Azure Content Safety — Prompt Shields** | Bloqueo en tiempo real de ataques de jailbreak del usuario y de prompt injection indirecto (XPIA) procedente de documentos antes de que el LLM los vea | [Docs](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) |
| **Azure Content Safety — Groundedness Pro** | Más estricto que groundedness estándar: usa los modelos de seguridad hospedados de Microsoft, devuelve True/False y no requiere un despliegue de LLM. Ideal para finanzas y salud | [Docs](https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-evaluators/rag-evaluators) |
| **Azure APIM Semantic Caching** | Cachea consultas semánticamente similares al LLM en el gateway para reducir costo y latencia. ⚠️ No es una herramienta de confiabilidad: la documentación advierte que puede devolver respuestas desactualizadas. Usa `score-threshold="0.05"` y TTLs | [Docs](https://learn.microsoft.com/azure/api-management/azure-openai-semantic-cache-lookup-policy) |
| **Microsoft Defender for Cloud — AI Workloads** | Alertas y recomendaciones de seguridad específicas para cargas de IA: detecta prompt injection, exfiltración de datos y uso indebido en producción | [Docs](https://learn.microsoft.com/azure/defender-for-cloud/alerts-ai-workloads) |
| **VS Code AI Foundry Toolkit** | Tracing local con OpenTelemetry para agentes de Azure AI Foundry, ideal para depurar sin depender de viajes al cloud | [Docs](https://code.visualstudio.com/docs/intelligentapps/tracing) |

---

## Herramientas de Claude y Anthropic

| Herramienta | Descripción | Enlace |
|------|-------------|------|
| **Claude API** | API principal para messages, uso de herramientas, visión y streaming | [Docs](https://docs.anthropic.com/en/api) |
| **Anthropic Agent SDK** | Crea agentic loops, sistemas multiagente y hooks | [Docs](https://docs.anthropic.com/en/docs/agents-and-tools/agents-overview) |
| **Claude Code** | Agente de programación impulsado por IA con configuración CLAUDE.md, comandos personalizados e integración CI/CD | [Docs](https://docs.anthropic.com/en/docs/claude-code) |
| **Claude Code Hooks** | Más de 25 hooks de ciclo de vida para sesiones de agentes: `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PostToolBatch`, `UserPromptSubmit`, `PreCompact` y `Stop`. ⚠️ Son hooks de Claude Code (CLI), no de la Anthropic Messages API | [Docs](https://docs.anthropic.com/en/docs/claude-code/hooks) |
| **Extended Thinking** | `budget_tokens` controla la profundidad del razonamiento antes de responder; el modo `adaptive` (Opus 4.8+) decide por sí mismo cuándo hace falta razonamiento profundo. Úsalo en decisiones de alto impacto para detectar contradicciones antes de las tool calls | [Docs](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking) |
| **MCP SDK** | Crea servidores de Model Context Protocol para ampliar Claude con fuentes de datos en vivo; la arquitectura adecuada para externalizar registros de conceptos de negocio, alias de entidades y resolvedores temporales | [GitHub](https://github.com/modelcontextprotocol/typescript-sdk) |
| **Anthropic Academy** | Cursos oficiales sobre agentes, prompt engineering y uso de herramientas | [academy.anthropic.com](https://academy.anthropic.com) |

---

## Infraestructura y routing para LLM

| Herramienta | Descripción | Enlace |
|------|-------------|------|
| **LiteLLM** | AI Gateway open-source con soporte para 100+ LLMs: centraliza routing, aplica guardrails, retry/fallback logic, virtual keys, spend tracking y load balancing. Soporta A2A Protocol para llamadas entre agentes | [GitHub](https://github.com/BerriAI/litellm) |
| **Azure API Management** | Gateway empresarial para Azure OpenAI: rate limiting, load balancing entre múltiples endpoints, medición de tokens y semantic caching | [Docs](https://learn.microsoft.com/azure/api-management/) |

---

## Red teaming y seguridad

| Herramienta | Descripción | Enlace |
|------|-------------|------|
| **PyRIT** | Python Risk Identification Toolkit de Microsoft para IA; automatiza el red teaming | [GitHub](https://github.com/Azure/PyRIT) |
| **Garak** | Escáner de vulnerabilidades para LLM: prueba jailbreaks, alucinaciones y fuga de datos | [GitHub](https://github.com/leondz/garak) |
| **PromptBench** | Benchmark de robustez adversarial para LLMs | [GitHub](https://github.com/microsoft/promptbench) |
| **Azure AI Content Safety** | API para detectar contenido dañino: violencia, odio, autolesiones y contenido sexual | [Portal](https://contentsafety.cognitive.azure.com) |
| **Purview AI Hub** | Descubre, clasifica y gobierna el uso de IA en M365 y Azure | [Docs](https://learn.microsoft.com/purview/ai-microsoft-purview) |
| **Counterfit** | Herramienta de pruebas de seguridad para modelos de AI/ML | [GitHub](https://github.com/Azure/counterfit) |

---

## Evaluación y observabilidad

| Herramienta | Descripción | Enlace |
|------|-------------|------|
| **Azure AI Foundry Evaluations** | Evaluadores integrados: groundedness, coherence, fluency, relevance y safety | [Docs](https://learn.microsoft.com/azure/ai-studio/how-to/evaluate-generative-ai-app) |
| **Azure AI Foundry Tracing** | Tracing nativo con OpenTelemetry para agentes: spans paso a paso, tool calls, retries y costos. Exporta a Application Insights | [Docs](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-setup) |
| **RAGAS** | Retrieval-Augmented Generation Assessment: faithfulness, relevancia de respuesta y context recall | [GitHub](https://github.com/explodinggradients/ragas) |
| **Promptfoo** | Herramienta CLI para evaluación de LLM, red teaming y pruebas de regresión | [GitHub](https://github.com/promptfoo/promptfoo) |
| **LangSmith** 💰 | Observabilidad de LLM, tracing y gestión de datasets | [smith.langchain.com](https://smith.langchain.com) |
| **Langfuse** | Observabilidad open-source para LLM: seguimiento completo de sesiones, workflows de contexto y opción self-hosted | [langfuse.com](https://langfuse.com) |
| **Arize Phoenix** | Observabilidad open-source para ML y LLM: métricas de alucinación, trazabilidad de retrieval en RAG y compatibilidad nativa con OpenTelemetry | [GitHub](https://github.com/Arize-ai/phoenix) |
| **Braintrust** 💰 | Pipeline trace-to-eval con scorers LLM personalizados y revisión human-in-the-loop | [braintrust.dev](https://www.braintrust.dev) |
| **Galileo** 💰 | Guardrails de alucinación para producción: bloqueo inline con Luna-2 y escalabilidad al 100% del tráfico | [galileo.ai](https://galileo.ai) |
| **DeepEval** | Framework open-source de evaluación con más de 50 métricas: RAG, agentes, safety y multi-turn | [GitHub](https://github.com/confident-ai/deepeval) |
| **Confident AI** 💰 | Evaluación integral de agentes: task completion, calidad de razonamiento y eficiencia de costos | [confident-ai.com](https://www.confident-ai.com) |
| **Patronus AI** | Evaluación para dominios regulados: finanzas, copyright y toolkit de detección open-source | [patronus.ai](https://www.patronus.ai) |
| **Maxim AI** 💰 | Observabilidad full-stack para agentes: simulación, depuración en tiempo real, eval loop y seguimiento de contexto | [getmaxim.ai](https://www.getmaxim.ai) |
| **AgentOps** | Monitoreo ligero de agentes: 400+ frameworks, métricas de confiabilidad y replay de sesiones | [agentops.ai](https://www.agentops.ai) |
| **Azure Monitor** | Integración de Application Insights para telemetría de cargas de IA y exportación con OpenTelemetry | [Docs](https://learn.microsoft.com/azure/azure-monitor/overview) |

---

## Confiabilidad agéntica y cómputo determinista

Herramientas para construir **agentes de producción** que sean auditables, deterministas y resistentes a la alucinación y a la degradación del contexto.

| Herramienta | Descripción | Enlace |
|------|-------------|------|
| **tiktoken** | Librería de conteo de tokens de OpenAI para medir el uso exacto de la ventana de contexto por modelo (GPT-4, GPT-4o, etc.) antes de enviar al LLM | [GitHub](https://github.com/openai/tiktoken) |
| **DuckDB** | Base de datos OLAP embebida: ejecuta SQL sobre DataFrames, Parquet y CSVs con latencia de subsegundo. Ideal para cómputo financiero determinista en pipelines de IA | [duckdb.org](https://duckdb.org) |
| **Pydantic v2** | Cumplimiento de esquemas para salidas de LLM: define `BaseModel` para el JSON esperado, valida tras cada tool call y repara automáticamente salidas inválidas | [docs.pydantic.dev](https://docs.pydantic.dev) |
| **Guardrails.ai** | Framework de validación de salida con rails para type checking, enforcement de formato, detección de PII y lógica de retry en salidas de LLM | [guardrailsai.com](https://www.guardrailsai.com) |
| **Instructor** | Salidas estructuradas de LLM con Pydantic; fuerza a modelos de OpenAI / Anthropic a devolver objetos tipados válidos | [GitHub](https://github.com/jxnl/instructor) |
| **LangChain ConversationTokenBufferMemory** | Recorte de memoria consciente de tokens: poda automáticamente el historial de conversación para mantenerse dentro del presupuesto de contexto | [Docs](https://python.langchain.com/docs/modules/memory/) |
| **MLflow** | Seguimiento de experimentos, versionado de modelos y pipelines de evaluación; registra ejecuciones deterministas de agentes con linaje completo de parámetros | [mlflow.org](https://mlflow.org) |
| **Opik (Comet)** | Plataforma open-source de evaluación de LLM con guardrails en tiempo real para pruebas de regresión y detección de prompt injection | [comet.com/opik](https://www.comet.com/opik) |
| **Prefect** | Orquestación de workflows para pipelines deterministas de IA: run IDs, políticas de retry y logs completos de ejecución | [prefect.io](https://www.prefect.io) |
| **Great Expectations** | Framework de validación de datos para afirmar contratos de datos antes de alimentar un LLM con datos financieros | [greatexpectations.io](https://greatexpectations.io) |

---

## Infraestructura y despliegue

| Herramienta | Descripción | Enlace |
|------|-------------|------|
| **Azure Bicep** | IaC para hubs de AI Foundry, proyectos y private endpoints | [Docs](https://learn.microsoft.com/azure/azure-resource-manager/bicep/) |
| **Terraform Azure Provider** | Aprovisiona infraestructura de IA con HCL | [Registry](https://registry.terraform.io/providers/hashicorp/azurerm/latest) |
| **Azure Developer CLI (azd)** | Flujo de trabajo end-to-end para desarrolladores: aprovisionar y desplegar apps de IA | [Docs](https://learn.microsoft.com/azure/developer/azure-developer-cli/) |
| **GitHub Actions** | CI/CD para evaluación de modelos de IA, pipelines de fine-tuning y despliegue de aplicaciones | [Docs](https://docs.github.com/actions) |
| **Azure Container Apps** | Hosting serverless de contenedores para microservicios y agentes de IA | [Docs](https://learn.microsoft.com/azure/container-apps/) |

---

## Productividad y desarrollo

| Herramienta | Descripción | Enlace |
|------|-------------|------|
| **VS Code + AI Toolkit** | Playground de modelos de Azure AI, fine-tuning y despliegue desde VS Code | [Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-windows-ai-studio.windows-ai-studio) |
| **GitHub Copilot** | Programador en pareja impulsado por IA para código, documentación y generación de pruebas | [github.com/features/copilot](https://github.com/features/copilot) |
| **REST Client (VS Code)** | Prueba llamadas API inline en archivos `.http` | [Marketplace](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) |
| **Bruno** | Cliente API open-source (alternativa a Postman, amigable con git) | [usebruno.com](https://www.usebruno.com) |
| **draw.io** | Diagramación gratuita para diseños de arquitectura | [app.diagrams.net](https://app.diagrams.net) |

---

:::tip[Sugiere una herramienta]
¿Falta algo útil? [Abre un issue](https://github.com/LeninGarcia09/LeninGarcia09.github.io/issues) o escribe a [lesalgad@microsoft.com](mailto:lesalgad@microsoft.com).
:::
