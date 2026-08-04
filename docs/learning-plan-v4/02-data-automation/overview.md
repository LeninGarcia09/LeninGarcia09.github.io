---
sidebar_position: 2
title: "Phase 2 — Technical Portfolio: RAG, Agents, and Evaluation"
---

# Phase 2: Technical Portfolio — RAG, Agents, and Evaluation (Weeks 5–12)

> **Objective:** Build the core technical evidence for the AI Solution Architect profile. In 8 weeks you produce **3 strong, reproducible artifacts** (a data pipeline with business value, an evaluated RAG system, and an agent comparison) that support the architecture narrative in interviews.

## 🎯 Expected Outcomes

By completing this phase:
- Data pipeline feeding an AI use case, with documented impact metric
- **RAG** system implemented **with reproducible evaluation** (groundedness, relevance)
- **Agent** comparison with traces and selection criteria
- 3 repos with professional README files ready for **Gate CP2 (Week 12)**

:::tip[Phase rule]
"Proof over study": every week closes with published evidence (repo, benchmark, or write-up). See [Methodology](../methodology-best-practices).
:::

---

## Block A — Data that feeds AI (Weeks 5–8)

### Week 5 — Data project #1: ingestion and cleaning

**Objective:** build a reproducible pipeline that transforms raw data into an AI-ready dataset (the foundation for a RAG or dashboard).

| Resource | Language | Type |
|---------|--------|------|
| [Python: pandas](https://pandas.pydata.org/docs/getting_started/index.html) | 🇬🇧 | Docs |
| [Microsoft Learn: Power Query](https://learn.microsoft.com/es-es/training/modules/automate-data-cleaning-power-query/) | 🇪🇸 | Learning Path |
| [SQL — SQLBolt](https://sqlbolt.com/) | 🇬🇧 | Interactive |

**Deliverable:** repo `data-pipeline/` — ingestion + cleaning script, versioned output dataset, README with flow diagram and **one metric** (records processed, % errors corrected).

### Week 6 — Data project #2: impact metric

**Objective:** enrich the pipeline with a second source and calculate a business metric (time savings, coverage, quality).

**Deliverable:** notebook or script that produces the before/after metric + short write-up explaining "why this matters to the business."

### Week 7 — Executive dashboard + write-up

**Objective:** communicate the result to an executive audience.

| Resource | Language | Type |
|---------|--------|------|
| [Microsoft Learn: Power BI](https://learn.microsoft.com/es-es/training/paths/create-use-analytics-reports-power-bi/) | 🇪🇸 | Learning Path |
| [DAX Guide (SQLBI)](https://dax.guide/) | 🇬🇧 | Reference |

**Deliverable:** dashboard (Power BI or similar) with 3–5 KPIs + 1-page write-up with the data story.

### Week 8 — Workflow automation + README

**Objective:** remove manual steps from the pipeline.

| Resource | Language | Type |
|---------|--------|------|
| [Power Automate](https://learn.microsoft.com/es-es/training/paths/automate-process-power-automate/) | 🇪🇸 | Learning Path |
| [Python: scheduling / basic cron](https://docs.python.org/3/library/sched.html) | 🇬🇧 | Docs |

**Deliverable:** documented automated flow + README anyone can run. **Block A close: publishable artifact #1.**

---

## Block B — RAG and Agents (Weeks 9–12)

### Week 9 — RAG prerequisite lab + baseline benchmark

**Objective:** understand RAG architecture and establish a measurable quality baseline.

| Resource | Language | Type |
|---------|--------|------|
| [Microsoft Learn: RAG with Azure AI](https://learn.microsoft.com/es-es/azure/ai-foundry/concepts/retrieval-augmented-generation) | 🇪🇸 | Docs |
| [LangChain: RAG Tutorial](https://python.langchain.com/docs/tutorials/rag/) | 🇬🇧 | Tutorial |
| [Azure AI Search](https://learn.microsoft.com/es-es/azure/search/) | 🇪🇸 | Docs |

**Deliverable:** RAG architecture diagram + a set of 15–20 evaluation questions (your "baseline benchmark").

### Week 10 — RAG implementation + evaluation

**Objective:** build the RAG and **measure its quality** (not just that it "works").

| Resource | Language | Type |
|---------|--------|------|
| [Azure AI Evaluation SDK](https://learn.microsoft.com/es-es/azure/ai-foundry/how-to/develop/evaluate-sdk) | 🇪🇸 | Tutorial |
| [Chunking strategies](https://learn.microsoft.com/es-es/azure/search/vector-search-how-to-chunk-documents) | 🇪🇸 | Docs |

**Reference architecture:** ingestion → chunking → embeddings → vector store (Azure AI Search / Chroma) → retrieval (hybrid + reranking) → generation with **source citations** → evaluation (groundedness, relevance).

**Deliverable:** repo `rag-evaluado/` — functional RAG + evaluation report with metrics per question. **Publishable artifact #2.**

### Week 11 — Comparative agents + traces

**Objective:** compare 2–3 agent approaches on the same task and justify the selection.

| Resource | Language | Type |
|---------|--------|------|
| [Azure AI Agent Service](https://learn.microsoft.com/es-es/azure/ai-services/agents/) | 🇪🇸 | Docs |
| [Agent Framework: Your First Agent](https://learn.microsoft.com/en-us/agent-framework/get-started/your-first-agent) | 🇬🇧 | Lab |
| [LangGraph (open, portable)](https://langchain-ai.github.io/langgraph/) | 🇬🇧 | Docs |

**Deliverable:** repo with the same task solved by 2–3 agents, captured **execution traces**, and a trade-off table (latency, cost, reliability).

### Week 12 — CP2 close: 3 strong artifacts

**Objective:** make the three artifacts hiring-ready and pass the gate.

**Checklist for [Gate CP2](../checkpoints#gate-cp2-week-12):**
- [ ] 3 repos with professional README files
- [ ] At least 1 reproducible benchmark (the evaluated RAG)
- [ ] At least 1 published technical write-up
- [ ] Architecture whiteboard narrative ready

---

## 📋 Phase 2 Checklist

- [ ] Data pipeline with impact metric (artifact #1)
- [ ] RAG system with reproducible evaluation (artifact #2)
- [ ] Agent comparison with traces (artifact #3)
- [ ] Executive dashboard + write-up published
- [ ] 3 repos with professional README files
- [ ] Gate CP2 approved

## v4 Operations

- [Checkpoint Gates](../checkpoints)
- [Evidence Template](../evidence-template)
- [Weekly Tracker](../weekly-tracker)

## 🔗 Resume Value

> "I built an enterprise RAG system with reproducible evaluation (groundedness/relevance), an agent comparison with traces and selection criteria, and a data pipeline with measurable business impact — all published on GitHub."

## ⏭️ Next Phase

[Phase 3: Enterprise Architecture + Security →](../cybersecurity/overview)
