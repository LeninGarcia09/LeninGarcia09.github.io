---
sidebar_position: 10
title: "Investigación: recursos de ingeniería IA sénior"
---

# Investigación para mejorar preparación sénior

**Fuentes primarias consultadas el 13 de octubre de 2026.** Selección por brechas de la [auditoría EPAM](./epam-reality-check), no ranking de prestigio. Documentación oficial suele aportar más que otro certificado general cuando cambian APIs.

## Cursos: fundamentos académicos y profundidad de entrega

| Recurso | Aporte | Prerrequisitos/acceso y límite |
| --- | --- | --- |
| [Generative AI with LLMs, DeepLearning.AI](https://www.coursera.org/learn/generative-ai-with-llms) | Lifecycle, entrenamiento/tuning, evaluación/despliegue; complemento por brechas de C | Python intermedio y ML/divisiones; verificar precio/certificado; no curso de agentes de producción |
| [Hugging Face Diffusion Models Course](https://huggingface.co/learn/diffusion-course/en/unit0/1) | E1: teoría, generación de imágenes, guidance y pipelines | Gratis; buen Python, deep learning/PyTorch; página dice sin certificación actual; video requiere práctica aparte |
| [MLOps Zoomcamp, DataTalks.Club](https://github.com/DataTalksClub/mlops-zoomcamp) | C/puente: tracking, despliegue, monitoreo, tests, CI/Terraform | Gratis autodirigido; Python/Docker/ML/CLI y experiencia de programación recomendados; sin cohorte 2026 y **sin certificado autodirigido** |

Usa módulos seleccionados, no reinicies fundamentos dominados. Las 360 horas no incluyen terminar tres cursos completos; certificados no satisfacen antigüedad.

## Referencias oficiales

| Brecha/etapa | Fuente | Práctica |
| --- | --- | --- |
| Backend async, 1-4 | [FastAPI concurrency](https://fastapi.tiangolo.com/async/) | I/O concurrente vs paralelismo CPU; bloqueo, timeout/cancelación |
| Dependencias/calidad, 1 | [uv](https://docs.astral.sh/uv/guides/projects/), [Ruff](https://docs.astral.sh/ruff/) | Metadata, entorno/lock, lint/format CI; no reemplazan tests |
| Vectorial, 5 | [pgvector](https://github.com/pgvector/pgvector) | Búsqueda exacta/aproximada, SQL, persistencia y tradeoffs |
| Embeddings/reranking, 5 y E3 | [SentenceTransformers](https://sbert.net/) | Embeddings/cross-encoder; medir relevancia/latencia en vez de asumir mejor modelo |
| Agentes durables, 7-9 | [LangGraph persistence](https://docs.langchain.com/oss/python/langgraph/persistence), [interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts) | Checkpoint vs store, restart/resume y revisión; interrupt no autoriza |
| MCP, 8 | [Arquitectura oficial](https://modelcontextprotocol.io/docs/learn/architecture) | Host/client/server, herramientas/transporte y versiones |
| Evaluación, 6+ | [MLflow GenAI](https://mlflow.org/docs/latest/genai/eval-monitor/) | Inputs versionados, scorers y comparación; validar jueces con etiquetas humanas |
| Despliegue, 12-14 | [Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/), Zoomcamp arriba | Desplegar/escalar/actualizar/debug; IaC revisado, rollback y limpieza |
| E2 | [AgentCore](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html), [Strands](https://github.com/strands-agents/harness-sdk) | Cinco primitivas, loop acotado, MCP, trazas/evaluación |
| E3 | [Kafka](https://kafka.apache.org/quickstart/), [Redis](https://redis.io/docs/latest/develop/) | Producer/consumer, duplicados/replay, cache/invalidation; quickstart no es operación experta |
| E4 | [A2A](https://a2a-protocol.org/latest/) | Agente-agente vs herramientas MCP; no agregar agentes sin necesidad |

## Actualidad y límites

Strands `sdk-python` redirigió a `harness-sdk`; rutas antiguas de docs devolvieron 404. Usamos el repositorio accesible. LangGraph durable-execution redirigió a persistence. Verifica releases/APIs antes de implementar, no copies imports viejos.

AgentCore no es simplemente el antiguo "Agents for Amazon Bedrock". Su guía enumera servicios modulares de E2. Verifica región, disponibilidad, identidad, precio y estado por capacidad; aparecer en una tabla no prueba disponibilidad de cada feature.

Páginas de tutorial HashiCorp respondieron pero el extractor mostró títulos; no afirmamos verificar instrucciones detalladas. Terraform está respaldado como tema por el currículo Zoomcamp inspeccionado.

No añadimos examen profesional obligatorio. Mantén [credenciales existentes](./credentials) para otros objetivos; en estas vacantes primero entrega y preparación técnica/inglés.

**Desconocido:** nivel individual, rúbrica de entrevistas EPAM, flexibilidad de experiencia, significado de ACP, conversión laboral y certificados preferidos. Confirma con evaluación/empleador.
