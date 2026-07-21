---
sidebar_position: 7
title: "Marco de Competencias del AI Solution Architect + Benchmark Externo"
---

# Marco de Competencias del AI Solution Architect + Benchmark Externo

:::info Para qué sirve esta página
Contrasta este plan de 26 semanas contra los **marcos de referencia más reputados** para el rol (Azure Well-Architected for AI, ruta oficial de Solution Architect de Microsoft, AWS Generative AI, Google Cloud ML Engineer, el libro *AI Engineering* de Chip Huyen, DeepLearning.AI y roadmap.sh). Sirve para: (1) confirmar que el plan cubre lo que el mercado espera, (2) hacer **transparentes los gaps** y cómo cerrarlos, y (3) auto-evaluar tu nivel por competencia. Todos los enlaces externos están verificados.
:::

Un **AI Solution Architect** no es "alguien que sabe de IA": es quien traduce una necesidad de negocio en un **sistema de IA diseñado, evaluado, seguro, operado en producción y con costo controlado**. Esta página define esas competencias y las ancla a fuentes externas confiables.

---

## 🧭 Modelo de competencias (10 competencias del rol)

Cada competencia indica **dónde la construye este plan** y **qué fuente reputada la valida**. La columna *Estado* marca si el plan la desarrolla a fondo (🟢) o la introduce y conviene **profundizar con un recurso externo** (🟡).

| # | Competencia | Dónde en el plan | Fuente externa de referencia | Estado |
|---|-------------|------------------|------------------------------|--------|
| 1 | **Encuadre de negocio y requisitos** (traducir problema → caso de uso, KPIs) | Fase 4 (value realization, KPI tree) | [MS Cloud Adoption Framework — AI](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/ai/) | 🟢 |
| 2 | **Datos y grounding** (ingesta, calidad, chunking, gobierno del dato) | Fase 2 (W5-8, W9) | [AWS Generative AI](https://aws.amazon.com/training/learn-about/generative-ai/) | 🟢 |
| 3 | **Selección de modelo / LLM** (modelo vs. RAG vs. fine-tuning, costo/latencia) | Fase 2 (W9-11) | [Chip Huyen — *AI Engineering*](https://github.com/chiphuyen/aie-book) | 🟢 |
| 4 | **Diseño RAG** (embeddings, vector store, retrieval híbrido, reranking, citas) | Fase 2 (W9-10) | [DeepLearning.AI — cursos](https://www.deeplearning.ai/courses/) | 🟢 |
| 5 | **Orquestación de agentes** (tool calling, memoria, multi-agente, trazas) | Fase 2 (W11) | [roadmap.sh — AI Engineer](https://roadmap.sh/ai-engineer) | 🟢 |
| 6 | **Evaluación y calidad** (groundedness, relevance, LLM-as-judge, regresión) | Fase 2 (W10, W12) | [Chip Huyen — *AI Engineering*](https://github.com/chiphuyen/aie-book) | 🟢 |
| 7 | **Seguridad y Responsible AI** (threat model, guardrails, gobernanza) | Fase 3 (W13-16) · SC-500 | [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/) · [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) | 🟢 |
| 8 | **Arquitectura Well-Architected** (5 pilares aplicados a IA) | Fase 3 (W14, AZ-305, ADR) | [Azure Well-Architected for AI](https://learn.microsoft.com/es-es/azure/well-architected/ai/get-started) | 🟢 |
| 9 | **LLMOps / operación en producción** (CI/CD, serving, monitoreo, drift) | Fase 3 (introducido) · rúbrica capstone | [Google Cloud ML Engineer](https://cloud.google.com/learn/certification/machine-learning-engineer) | 🟡 |
| 10 | **Costo / FinOps de IA** (economía de tokens, right-sizing de inferencia) | Fase 3-4 (transversal) | [Azure Well-Architected for AI — costo](https://learn.microsoft.com/es-es/azure/well-architected/ai/get-started) | 🟡 |

:::tip Cómo leer los estados 🟡
Los estados 🟡 (competencias 9 y 10) son **áreas de profundización deliberada**: el plan las introduce en contexto, pero para roles senior conviene reforzarlas con el recurso externo indicado. No son omisiones — son el siguiente nivel de madurez.
:::

---

## 🏛️ Azure Well-Architected for AI: los 5 pilares aplicados

El marco de arquitectura más autoritativo para cargas de IA en Azure es el [Well-Architected Framework for AI](https://learn.microsoft.com/es-es/azure/well-architected/ai/get-started). Un AI Solution Architect debe poder razonar cada pilar sobre su propio sistema:

| Pilar WAF | Pregunta clave para un sistema de IA | Dónde lo trabaja el plan |
|-----------|--------------------------------------|--------------------------|
| **Fiabilidad** | ¿Qué pasa cuando el modelo alucina, se degrada o el proveedor falla? Fallbacks, reintentos, evaluación continua. | Fase 2 (eval) + Fase 3 |
| **Seguridad** | Prompt injection, fuga de datos, control de acceso al modelo y a los datos de grounding. | Fase 3 (threat model, SC-500) |
| **Optimización de costos** | Economía de tokens, caching, elección de modelo por tarea, right-sizing de inferencia. | Competencia 10 (profundizar) |
| **Excelencia operativa** | LLMOps: despliegue, versionado de prompts/modelos, monitoreo de calidad y drift. | Competencia 9 (profundizar) |
| **Eficiencia del rendimiento** | Latencia de retrieval y generación, throughput, escalado bajo carga. | Fase 2 (agentes/trazas) + Fase 3 |

**Entregable sugerido (refuerzo):** para tu capstone, escribe una **revisión WAF de una página** que responda las 5 preguntas sobre tu sistema. Es exactamente el artefacto que un arquitecto senior produce y que distingue tu portafolio.

---

## 🔁 Cross-walk multiplataforma (portabilidad del skill)

Este plan es **Microsoft-first por diseño** (AI-103, AZ-305, SC-500 dan estructura y credencial). Pero las competencias son **transferibles**: si una vacante pide AWS o GCP, tu conocimiento se traduce directamente. Usa esta tabla para hablar el idioma de cualquier empleador.

| Concepto | Microsoft (Azure) | AWS | Google Cloud |
|----------|-------------------|-----|--------------|
| Plataforma de modelos / agentes | Azure AI Foundry + Agent Service | Amazon Bedrock + Bedrock Agents | Vertex AI + Agent Builder |
| Búsqueda vectorial / RAG | Azure AI Search | Amazon Kendra / OpenSearch | Vertex AI Search |
| Evaluación de modelos | Azure AI Evaluation SDK | Bedrock Evaluations | Vertex AI Evaluation |
| Seguridad de contenido | Azure AI Content Safety | Bedrock Guardrails | Vertex AI Safety filters |
| Credencial de arquitectura | AZ-305 | AWS Solutions Architect | Professional Cloud Architect |
| Credencial de IA/ML | AI-103 | AWS ML / GenAI | [Professional ML Engineer](https://cloud.google.com/learn/certification/machine-learning-engineer) |

**Rutas oficiales externas (verificadas):** [AWS Skill Builder](https://explore.skillbuilder.aws/learn) · [Google Cloud ML Engineer](https://www.skills.google/paths/17) · [MS Solution Architect career path](https://learn.microsoft.com/en-us/training/career-paths/solution-architect).

---

## 📊 Autoevaluación (baseline y seguimiento)

Los programas best-in-class empiezan con una **línea base**. Puntúa cada competencia del 1 al 5 **hoy**, y repite al cerrar cada checkpoint (CP1-CP5). El objetivo no es el 5 en todo, sino **mover el número** con evidencia.

| Nivel | Significado |
|-------|-------------|
| 1 | No lo he tocado |
| 2 | Entiendo la teoría, no lo he construido |
| 3 | Lo construí una vez guiado (tutorial) |
| 4 | Lo construí de forma independiente, con evidencia (repo + eval) |
| 5 | Puedo diseñarlo, defender trade-offs y enseñarlo a otro |

**Regla de portafolio:** una competencia solo cuenta como "lista para contratación" a partir de **nivel 4** (evidencia reproducible). El nivel 3 es un tutorial; el mercado compra el 4-5. Alinea esto con la [rúbrica del capstone](./methodology-best-practices#rúbrica-del-capstone-hiring-ready-no-course-complete).

---

## 📚 Fuentes externas de referencia (reputadas y verificadas)

| Fuente | Tipo | Refuerza en este plan |
|--------|------|------------------------|
| [Azure Well-Architected for AI](https://learn.microsoft.com/es-es/azure/well-architected/ai/get-started) | Framework (Microsoft) | Competencias 8, 9, 10 |
| [MS — Ruta de Solution Architect](https://learn.microsoft.com/en-us/training/career-paths/solution-architect) | Ruta de carrera oficial | Estructura general del rol |
| [MS Cloud Adoption Framework — AI](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/ai/) | Framework (Microsoft) | Competencia 1 |
| [AWS — Generative AI](https://aws.amazon.com/training/learn-about/generative-ai/) | Ruta oficial (AWS) | Competencias 2-6 (multiplataforma) |
| [Google Cloud — ML Engineer](https://cloud.google.com/learn/certification/machine-learning-engineer) | Certificación oficial (Google) | Competencias 9, cross-walk |
| [Chip Huyen — *AI Engineering* (O'Reilly, 2025)](https://github.com/chiphuyen/aie-book) | Libro de referencia | Competencias 3, 6, 9 |
| [DeepLearning.AI — Cursos](https://www.deeplearning.ai/courses/) | Cursos (Andrew Ng) | Competencias 4, 5 |
| [roadmap.sh — AI Engineer](https://roadmap.sh/ai-engineer) | Roadmap comunitario | Visión general de skills |

---

## 🔗 Cómo usar esta página

1. **Antes de empezar:** haz la autoevaluación como baseline y anota tus 3 competencias más débiles.
2. **Durante el plan:** en cada checkpoint, re-puntúa y verifica que subiste al menos una competencia a nivel 4.
3. **Para las 🟡 (LLMOps, costo):** dedica una sesión de la Fase 3 o 4 al recurso externo indicado y añade el artefacto (revisión WAF, dashboard de costo) a tu portafolio.
4. **En entrevistas:** usa el cross-walk para responder "¿tienes experiencia en AWS/GCP?" con "mi arquitectura es transferible; aquí está el equivalente".

---

## Operacion v4

- [Overview del Plan](./overview)
- [Metodología y Mejores Prácticas](./methodology-best-practices)
- [Fuentes y Verificación](./sources-and-verification)
- [Checkpoint Gates](./checkpoints)
