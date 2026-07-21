---
sidebar_position: 2
title: "Fase 2 — Portafolio Técnico: RAG, Agentes y Evaluación"
---

# Fase 2: Portafolio Técnico — RAG, Agentes y Evaluación (Semanas 5–12)

> **Objetivo:** Construir la evidencia técnica central del perfil de AI Solution Architect. En 8 semanas produces **3 artefactos fuertes y reproducibles** (un pipeline de datos con valor de negocio, un sistema RAG evaluado y una comparativa de agentes) que sostienen la narrativa de arquitectura en entrevistas.

## 🎯 Resultados Esperados

Al completar esta fase:
- Pipeline de datos que alimenta un caso de AI, con métrica de impacto documentada
- Sistema **RAG** implementado **con evaluación reproducible** (groundedness, relevance)
- Comparativa de **agentes** con trazas y criterios de selección
- 3 repos con README profesional listos para el **Gate CP2 (Semana 12)**

:::tip Regla de la fase
"Proof over study": cada semana cierra con evidencia publicada (repo, benchmark o write-up). Ver [Metodología](../methodology-best-practices).
:::

---

## Bloque A — Datos que alimentan AI (Semanas 5–8)

### Semana 5 — Proyecto de datos #1: ingesta y limpieza

**Objetivo:** construir un pipeline reproducible que transforme datos crudos en un dataset listo para AI (base de un RAG o de un dashboard).

| Recurso | Idioma | Tipo |
|---------|--------|------|
| [Python: pandas](https://pandas.pydata.org/docs/getting_started/index.html) | 🇬🇧 | Docs |
| [Microsoft Learn: Power Query](https://learn.microsoft.com/es-es/training/modules/automate-data-cleaning-power-query/) | 🇪🇸 | Learning Path |
| [SQL — SQLBolt](https://sqlbolt.com/) | 🇬🇧 | Interactivo |

**Entregable:** repo `data-pipeline/` — script de ingesta + limpieza, dataset de salida versionado, README con diagrama de flujo y **una métrica** (registros procesados, % de errores corregidos).

### Semana 6 — Proyecto de datos #2: métrica de impacto

**Objetivo:** enriquecer el pipeline con una segunda fuente y calcular una métrica de negocio (ahorro de tiempo, cobertura, calidad).

**Entregable:** notebook o script que produce la métrica antes/después + write-up corto de "por qué importa al negocio".

### Semana 7 — Dashboard ejecutivo + write-up

**Objetivo:** comunicar el resultado a una audiencia ejecutiva.

| Recurso | Idioma | Tipo |
|---------|--------|------|
| [Microsoft Learn: Power BI](https://learn.microsoft.com/es-es/training/paths/create-use-analytics-reports-power-bi/) | 🇪🇸 | Learning Path |
| [DAX Guide (SQLBI)](https://dax.guide/) | 🇬🇧 | Referencia |

**Entregable:** dashboard (Power BI o similar) con 3–5 KPIs + write-up de 1 página con la historia del dato.

### Semana 8 — Automatización del workflow + README

**Objetivo:** eliminar los pasos manuales del pipeline.

| Recurso | Idioma | Tipo |
|---------|--------|------|
| [Power Automate](https://learn.microsoft.com/es-es/training/paths/automate-process-power-automate/) | 🇪🇸 | Learning Path |
| [Python: scheduling / cron básico](https://docs.python.org/3/library/sched.html) | 🇬🇧 | Docs |

**Entregable:** flujo automatizado documentado + README que cualquiera pueda ejecutar. **Cierre del Bloque A: artefacto #1 publicable.**

---

## Bloque B — RAG y Agentes (Semanas 9–12)

### Semana 9 — RAG lab prerequisito + benchmark base

**Objetivo:** entender la arquitectura RAG y establecer una línea base de calidad medible.

| Recurso | Idioma | Tipo |
|---------|--------|------|
| [Microsoft Learn: RAG con Azure AI](https://learn.microsoft.com/es-es/azure/ai-foundry/concepts/retrieval-augmented-generation) | 🇪🇸 | Docs |
| [LangChain: RAG Tutorial](https://python.langchain.com/docs/tutorials/rag/) | 🇬🇧 | Tutorial |
| [Azure AI Search](https://learn.microsoft.com/es-es/azure/search/) | 🇪🇸 | Docs |

**Entregable:** diagrama de arquitectura RAG + un set de 15–20 preguntas de evaluación (tu "benchmark base").

### Semana 10 — Implementación RAG + evaluación

**Objetivo:** construir el RAG y **medir su calidad** (no solo que "funcione").

| Recurso | Idioma | Tipo |
|---------|--------|------|
| [Azure AI Evaluation SDK](https://learn.microsoft.com/es-es/azure/ai-foundry/how-to/develop/evaluate-sdk) | 🇪🇸 | Tutorial |
| [Chunking strategies](https://learn.microsoft.com/es-es/azure/search/vector-search-how-to-chunk-documents) | 🇪🇸 | Docs |

**Arquitectura de referencia:** ingesta → chunking → embeddings → vector store (Azure AI Search / Chroma) → retrieval (híbrido + reranking) → generación con **citas de fuente** → evaluación (groundedness, relevance).

**Entregable:** repo `rag-evaluado/` — RAG funcional + reporte de evaluación con métricas por pregunta. **Artefacto #2 publicable.**

### Semana 11 — Agentes comparativos + trazas

**Objetivo:** comparar 2–3 enfoques de agentes sobre una misma tarea y justificar la selección.

| Recurso | Idioma | Tipo |
|---------|--------|------|
| [Azure AI Agent Service](https://learn.microsoft.com/es-es/azure/ai-services/agents/) | 🇪🇸 | Docs |
| [Agent Framework: Your First Agent](https://learn.microsoft.com/en-us/agent-framework/get-started/your-first-agent) | 🇬🇧 | Lab |
| [LangGraph (open, portable)](https://langchain-ai.github.io/langgraph/) | 🇬🇧 | Docs |

**Entregable:** repo con la misma tarea resuelta por 2–3 agentes, **trazas de ejecución** capturadas, y una tabla de trade-offs (latencia, costo, fiabilidad).

### Semana 12 — Cierre CP2: 3 artefactos fuertes

**Objetivo:** dejar los tres artefactos hiring-ready y pasar el gate.

**Checklist del [Gate CP2](../checkpoints#gate-cp2-semana-12):**
- [ ] 3 repos con README profesional
- [ ] Al menos 1 benchmark reproducible (el RAG evaluado)
- [ ] Al menos 1 write-up técnico publicado
- [ ] Narrativa lista para whiteboard de arquitectura

---

## 📋 Checklist de Fase 2

- [ ] Pipeline de datos con métrica de impacto (artefacto #1)
- [ ] Sistema RAG con evaluación reproducible (artefacto #2)
- [ ] Comparativa de agentes con trazas (artefacto #3)
- [ ] Dashboard ejecutivo + write-up publicados
- [ ] 3 repos con README profesional
- [ ] Gate CP2 aprobado

## Operacion v4

- [Checkpoint Gates](../checkpoints)
- [Template de Evidencia](../evidence-template)
- [Weekly Tracker](../weekly-tracker)

## 🔗 Valor para el CV

> "Construí un sistema RAG empresarial con evaluación reproducible (groundedness/relevance), una comparativa de agentes con trazas y criterios de selección, y un pipeline de datos con impacto de negocio medible — todo publicado en GitHub."

## ⏭️ Siguiente Fase

[Fase 3: Arquitectura + Seguridad Empresarial →](../cybersecurity/overview)
