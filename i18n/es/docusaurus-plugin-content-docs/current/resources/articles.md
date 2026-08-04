---
id: articles
title: Artículos y lecturas
sidebar_label: 📰 Artículos
slug: /resources/articles
---

# Artículos y lecturas

Lecturas curadas para AI Solution Architects: profundidad técnica, criterio arquitectónico y aplicabilidad real. Calidad antes que cantidad.

---

## Agentes de IA y arquitectura agéntica

| Artículo | Autor / Fuente | Por qué leerlo |
|---------|----------------|----------------|
| [Building effective agents](https://www.anthropic.com/research/building-effective-agents) | Anthropic | La referencia canónica sobre patrones de diseño agéntico: augmented LLMs, routing, parallelization y orchestration |
| [Agents](https://docs.anthropic.com/en/docs/agents-and-tools/agents-overview) | Anthropic Docs | Arquitectura oficial del Agent SDK: agentic loops, uso de herramientas y coordinación multiagente |
| [Azure AI Foundry Agent Service Overview](https://learn.microsoft.com/azure/ai-services/agents/overview) | Microsoft Learn | Arquitectura hospedada de agentes de Microsoft, SDK, herramientas y capacidades empresariales |
| [What are AI Agents?](https://learn.microsoft.com/azure/ai-services/agents/concepts/agents) | Microsoft Learn | Conceptos de agentes específicos de Azure: thread, run y ciclo de vida de tool calls |
| [Multi-agent systems with Azure AI Foundry](https://learn.microsoft.com/azure/ai-foundry/agents/concepts/multi-agent) | Microsoft Learn | Patrón de Connected Agents y tool calls entre agentes |

---

## Prompt Engineering

| Artículo | Autor / Fuente | Por qué leerlo |
|---------|----------------|----------------|
| [Prompt engineering overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) | Anthropic Docs | La guía de prompt engineering de Anthropic; la fuente de verdad para Claude |
| [Prompt engineering techniques](https://learn.microsoft.com/azure/ai-services/openai/concepts/prompt-engineering) | Microsoft Learn | Perspectiva de Azure OpenAI: system prompts, few-shot y chain-of-thought |
| [Introduction to Prompt Engineering](https://www.promptingguide.ai/) | PromptingGuide.ai | Referencia comunitaria amplia que cubre CoT, ReAct, PAL y Tree-of-Thoughts |
| [Claude's extended thinking](https://www.anthropic.com/research/claude-think-before-answering) | Anthropic | Análisis profundo de extended thinking y del razonamiento chain-of-thought |

---

## IA responsable y gobernanza

| Artículo | Autor / Fuente | Por qué leerlo |
|---------|----------------|----------------|
| [Microsoft Responsible AI Standard v2](https://blogs.microsoft.com/wp-content/uploads/prod/sites/5/2022/06/Microsoft-Responsible-AI-Standard-v2-General-Requirements-3.pdf) | Microsoft | El marco de 6 principios que gobierna todos los productos de IA de Microsoft |
| [EU AI Act — Full Text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689) | EUR-Lex | Regulación principal: en vigor desde el 1 de agosto de 2024; cumplimiento de alto riesgo desde el 2 de agosto de 2026 |
| [NIST AI Risk Management Framework](https://www.nist.gov/artificial-intelligence/ai-risk-management-framework) | NIST | El marco estadounidense de gestión de riesgos de IA: Govern, Map, Measure y Manage |
| [Azure AI Content Safety overview](https://learn.microsoft.com/azure/ai-services/content-safety/overview) | Microsoft Learn | Categorías de daño, niveles de severidad y filtros; esencial para IA en producción |
| [Microsoft Purview AI Hub](https://learn.microsoft.com/purview/ai-microsoft-purview) | Microsoft Learn | Gobernar el uso de IA, descubrir shadow AI y clasificar interacciones con IA |
| [PyRIT — Python Risk Identification Toolkit](https://github.com/Azure/PyRIT) | Microsoft / GitHub | Red teaming automatizado para sistemas de IA; la herramienta detrás de las propias pruebas de seguridad de IA de Microsoft |

---

## Arquitectura de Azure AI

| Artículo | Autor / Fuente | Por qué leerlo |
|---------|----------------|----------------|
| [Azure AI Foundry architecture](https://learn.microsoft.com/azure/ai-foundry/concepts/architecture) | Microsoft Learn | Modelo hub-project, aislamiento de red, managed identity y diseño de recursos |
| [Private networking in Azure AI Foundry](https://learn.microsoft.com/azure/ai-foundry/how-to/configure-private-link) | Microsoft Learn | BYO VNet, private endpoints y configuración DNS para aislamiento empresarial |
| [Azure AI Foundry — Basic vs Standard](https://learn.microsoft.com/azure/ai-foundry/concepts/connections) | Microsoft Learn | Cuándo usar cada modo; clave para decisiones empresariales de residencia de datos |
| [Foundry Hosted Agents: Micro-VM isolation](https://learn.microsoft.com/azure/ai-services/agents/concepts/hosted-agents) | Microsoft Learn | Cómo los agentes hospedados en Foundry logran aislamiento de cómputo, BYO VNet y Entra Agent ID |
| [AI workloads on Azure — Well-Architected](https://learn.microsoft.com/azure/well-architected/ai/) | Microsoft Learn | Guía de Azure WAF para IA: confiabilidad, seguridad, rendimiento y costo |

---

## Seguridad e identidad

| Artículo | Autor / Fuente | Por qué leerlo |
|---------|----------------|----------------|
| [Microsoft Entra Agent ID](https://techcommunity.microsoft.com/blog/microsoft-entra-blog/entra-agent-id-identity-for-your-ai-agents/4391706) | Microsoft Tech Community | Identidad por agente en Entra ID; la base del RBAC para agentes |
| [Zero Trust for AI workloads](https://learn.microsoft.com/security/zero-trust/azure-ai) | Microsoft Learn | Cómo aplicar Zero Trust a sistemas de IA: verify, least privilege y assume breach |
| [Securing Azure AI Foundry](https://learn.microsoft.com/azure/ai-foundry/how-to/rbac-azure-ai-foundry) | Microsoft Learn | Roles RBAC: AI Developer, AI Inference Deployment Operator y roles personalizados |

---

## Confiabilidad agéntica y patrones de producción

Lectura crítica para arquitectos que construyen agentes de IA que deben ser **correctos, auditables y confiables** en entornos empresariales y regulados.

| Artículo | Autor / Fuente | Por qué leerlo |
|---------|----------------|----------------|
| [The LLM-as-Analyst Trap — Part 1](https://appliedingenuity.substack.com/p/the-llm-as-analyst-trap-a-technical) | Applied Ingenuity | El texto canónico sobre por qué los LLM fallan como analistas de datos: 5 modos de fallo con reproducción en código |
| [The LLM-as-Analyst Trap — Part 2: The Verifiable Orchestrator](https://appliedingenuity.substack.com/p/the-verifiable-orchestrator) | Applied Ingenuity | La solución: arquitectura TRACE (Tool-Routed Architecture for Controlled Execution); el LLM como orquestador, no como analista |
| [You Can't Debug What You Can't See: AI Observability with OpenTelemetry & Azure AI Foundry](https://itnext.io/you-cant-debug-what-you-can-t-see-ai-observability-with-opentelemetry-microsoft-foundry-f90407b90e17) | ITNEXT / Community | Cómo instrumentar agentes de IA con OpenTelemetry + Application Insights para depuración de nivel producción |
| [How Tracing Works in Azure AI Foundry Agents](https://willvelida.com/posts/azure-ai-agents-tracing/) | Will Velida | Configuración paso a paso del tracing para agentes de Foundry: spans, tool calls, retries y latencia |
| [AI Agent Observability — Evolving Standards and Best Practices](https://opentelemetry.io/blog/2025/ai-agent-observability/) | OpenTelemetry | Nuevas convenciones semánticas para observabilidad multiagente con trazabilidad unificada entre frameworks |
| [Best Hallucination Detection Tools (2026)](https://www.braintrust.dev/articles/best-hallucination-detection-tools-2026) | Braintrust | Revisión del panorama: evaluación previa al release, monitoreo en producción y guardrails en runtime, con comparación de herramientas |
| [8 Best AI Agent Reliability Solutions 2026](https://galileo.ai/blog/best-ai-agent-reliability-solutions) | Galileo | Comparativa de plataformas: context drift, mal uso de herramientas y detección de fallos de razonamiento |
| [Agent Evaluation Guide: Testing AI Agents 2026](https://www.openlayer.com/blog/post/agent-evaluation-complete-guide-testing-ai-agents) | Openlayer | Evaluación integral del ciclo de vida de agentes, desde smoke tests hasta validaciones regulatorias |
| [Azure Well-Architected Framework — AI Reliability Principles](https://learn.microsoft.com/azure/well-architected/ai/design-principles) | Microsoft Learn | Confiabilidad específica para IA: análisis de modos de fallo, alineación de SLA entre capas LLM/retrieval/datos y patrón bulkhead |
| [Azure Well-Architected — Responsible AI for Agents](https://learn.microsoft.com/azure/well-architected/ai/responsible-ai) | Microsoft Learn | Tres fundamentos: control de ingreso/egreso de datos, aseguramiento de integridad de datos y guardrails independientes; respalda el audit logging estilo TRACE |
| [Azure AI Foundry Agent Evaluators (9 built-in)](https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-evaluators/agent-evaluators) | Microsoft Learn | Task Completion, Tool Call Accuracy, Tool Input Accuracy y Task Navigation Efficiency; una suite de evaluación de producción para agentes |
| [Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) | Anthropic | Patrones canónicos de diseño agéntico: Evaluator-Optimizer, Parallelization/Voting y documentación de herramientas como superficie de confiabilidad |

---

## Industria e investigación

| Artículo | Autor / Fuente | Por qué leerlo |
|---------|----------------|----------------|
| [Anthropic Model Card — Claude 3.5+](https://www.anthropic.com/claude/model-card) | Anthropic | Capacidades, limitaciones, evaluaciones de seguridad y resultados de benchmarks |
| [Scaling laws for neural language models](https://arxiv.org/abs/2001.08361) | Kaplan et al. | El paper fundacional sobre cómo las capacidades del modelo escalan con el cómputo |
| [Constitutional AI](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback) | Anthropic Research | Cómo se entrenan los valores de Claude; esencial para entender la arquitectura de seguridad de IA |
| [Llama 3 paper](https://arxiv.org/abs/2407.21783) | Meta AI | LLM open-source de última generación; referencia arquitectónica para comparación |

---

## Papers académicos — sistemas agénticos

Papers esenciales que todo AI Solution Architect debería conocer al diseñar sistemas agénticos confiables.

| Paper | Autores | Hallazgo clave |
|-------|---------|----------------|
| [Lost in the Middle (arXiv:2601.15300)](https://arxiv.org/abs/2601.15300) | Liu et al. | **Degradación de inteligencia**: los modelos que usan solo 40-50% de su ventana de contexto muestran una caída de 45.5% en F1. La posición de los datos en la ventana de contexto importa tanto como el contenido |
| [Same Task, More Tokens (arXiv:2510.05381)](https://arxiv.org/abs/2510.05381) | Various | **Paradoja de longitud de contexto**: agregar más contexto perjudica el rendimiento incluso cuando el retrieval es perfecto; la sobrecarga de información es real en agentes de producción |
| [ReWOO (arXiv:2305.18323)](https://arxiv.org/abs/2305.18323) | Xu et al. | Razonamiento y observación desacoplados: reduce el uso de tokens al separar planificación de ejecución, pero sin garantías de determinismo |
| [CodeAct (arXiv:2402.01030)](https://arxiv.org/abs/2402.01030) | Wang et al. | Agentes que actúan ejecutando código: reduce la complejidad del espacio de acciones, pero introduce riesgos de seguridad por ejecución de código |
| [AgentHallu (arXiv:2601.06818)](https://arxiv.org/abs/2601.06818) | Various | Benchmark de alucinación en agentes multi-step: identifica con precisión qué pasos de razonamiento causan divergencia; incluso los modelos líderes fallan de forma significativa |

---

:::tip[Sugiere un artículo]
¿Leíste algo que vale la pena compartir? [Abre un issue](https://github.com/LeninGarcia09/LeninGarcia09.github.io/issues) con el enlace y una frase explicando por qué debería estar aquí.
:::
