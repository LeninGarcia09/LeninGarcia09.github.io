---
sidebar_position: 7
title: "AI Solution Architect Competency Framework + External Benchmark"
---

# AI Solution Architect Competency Framework + External Benchmark

:::info[What this page is for]
Compares this 26-week plan against the **most reputable reference frameworks** for the role (Azure Well-Architected for AI, Microsoft's official Solution Architect path, AWS Generative AI, Google Cloud ML Engineer, Chip Huyen's *AI Engineering*, DeepLearning.AI, and roadmap.sh). It is used to: (1) confirm that the plan covers what the market expects, (2) make **gaps transparent** and show how to close them, and (3) self-assess your level by competency. All external links are verified.
:::

An **AI Solution Architect** is not "someone who knows AI": it is the person who translates a business need into an **AI system that is designed, evaluated, secured, operated in production, and cost-controlled**. This page defines those competencies and anchors them to trusted external sources.

---

## 🧭 Competency model (10 role competencies)

Each competency shows **where this plan builds it** and **which reputable source validates it**. The *Status* column marks whether the plan develops it deeply (🟢) or introduces it and recommends **deeper work with an external resource** (🟡).

| # | Competency | Where in the plan | External reference source | Status |
|---|-------------|------------------|------------------------------|--------|
| 1 | **Business framing and requirements** (translate problem → use case, KPIs) | Phase 4 (value realization, KPI tree) | [MS Cloud Adoption Framework — AI](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/ai/) | 🟢 |
| 2 | **Data and grounding** (ingestion, quality, chunking, data governance) | Phase 2 (W5-8, W9) | [AWS Generative AI](https://aws.amazon.com/training/learn-about/generative-ai/) | 🟢 |
| 3 | **Model / LLM selection** (model vs. RAG vs. fine-tuning, cost/latency) | Phase 2 (W9-11) | [Chip Huyen — *AI Engineering*](https://github.com/chiphuyen/aie-book) | 🟢 |
| 4 | **RAG design** (embeddings, vector store, hybrid retrieval, reranking, citations) | Phase 2 (W9-10) | [DeepLearning.AI — courses](https://www.deeplearning.ai/courses/) | 🟢 |
| 5 | **Agent orchestration** (tool calling, memory, multi-agent, traces) | Phase 2 (W11) | [roadmap.sh — AI Engineer](https://roadmap.sh/ai-engineer) | 🟢 |
| 6 | **Evaluation and quality** (groundedness, relevance, LLM-as-judge, regression) | Phase 2 (W10, W12) | [Chip Huyen — *AI Engineering*](https://github.com/chiphuyen/aie-book) | 🟢 |
| 7 | **Security and Responsible AI** (threat model, guardrails, governance) | Phase 3 (W13-16) · SC-500 | [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/) · [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) | 🟢 |
| 8 | **Well-Architected architecture** (5 pillars applied to AI) | Phase 3 (W14, AZ-305, ADR) | [Azure Well-Architected for AI](https://learn.microsoft.com/es-es/azure/well-architected/ai/get-started) | 🟢 |
| 9 | **LLMOps / production operations** (CI/CD, serving, monitoring, drift) | Phase 3 (introduced) · capstone rubric | [Google Cloud ML Engineer](https://cloud.google.com/learn/certification/machine-learning-engineer) | 🟡 |
| 10 | **AI cost / FinOps** (token economics, inference right-sizing) | Phase 3-4 (cross-cutting) | [Azure Well-Architected for AI — cost](https://learn.microsoft.com/es-es/azure/well-architected/ai/get-started) | 🟡 |

:::tip[How to read 🟡 statuses]
The 🟡 statuses (competencies 9 and 10) are **deliberate deepening areas**: the plan introduces them in context, but senior roles benefit from reinforcement with the indicated external resource. They are not omissions — they are the next maturity level.
:::

---

## 🏛️ Azure Well-Architected for AI: the 5 applied pillars

The most authoritative architecture framework for AI workloads in Azure is the [Well-Architected Framework for AI](https://learn.microsoft.com/es-es/azure/well-architected/ai/get-started). An AI Solution Architect must be able to reason through each pillar for their own system:

| WAF pillar | Key question for an AI system | Where the plan works it |
|-----------|--------------------------------------|--------------------------|
| **Reliability** | What happens when the model hallucinates, degrades, or the provider fails? Fallbacks, retries, continuous evaluation. | Phase 2 (eval) + Phase 3 |
| **Security** | Prompt injection, data leakage, access control to the model and grounding data. | Phase 3 (threat model, SC-500) |
| **Cost optimization** | Token economics, caching, model choice by task, inference right-sizing. | Competency 10 (deepen) |
| **Operational excellence** | LLMOps: deployment, prompt/model versioning, quality and drift monitoring. | Competency 9 (deepen) |
| **Performance efficiency** | Retrieval and generation latency, throughput, scaling under load. | Phase 2 (agents/traces) + Phase 3 |

**Suggested reinforcement deliverable:** for your capstone, write a **one-page WAF review** answering the 5 questions for your system. It is exactly the artifact a senior architect produces and what differentiates your portfolio.

---

## 🔁 Multi-platform cross-walk (skill portability)

This plan is **Microsoft-first by design** (AI-103, AZ-305, SC-500 provide structure and credential). But the competencies are **transferable**: if a job asks for AWS or GCP, your knowledge translates directly. Use this table to speak any employer's language.

| Concept | Microsoft (Azure) | AWS | Google Cloud |
|----------|-------------------|-----|--------------|
| Model / agent platform | Azure AI Foundry + Agent Service | Amazon Bedrock + Bedrock Agents | Vertex AI + Agent Builder |
| Vector search / RAG | Azure AI Search | Amazon Kendra / OpenSearch | Vertex AI Search |
| Model evaluation | Azure AI Evaluation SDK | Bedrock Evaluations | Vertex AI Evaluation |
| Content safety | Azure AI Content Safety | Bedrock Guardrails | Vertex AI Safety filters |
| Architecture credential | AZ-305 | AWS Solutions Architect | Professional Cloud Architect |
| AI/ML credential | AI-103 | AWS ML / GenAI | [Professional ML Engineer](https://cloud.google.com/learn/certification/machine-learning-engineer) |

**Official external paths (verified):** [AWS Skill Builder](https://explore.skillbuilder.aws/learn) · [Google Cloud ML Engineer](https://www.skills.google/paths/17) · [MS Solution Architect career path](https://learn.microsoft.com/en-us/training/career-paths/solution-architect).

---

## 📊 Self-assessment (baseline and tracking)

Best-in-class programs begin with a **baseline**. Score each competency from 1 to 5 **today**, and repeat at each checkpoint close (CP1-CP5). The goal is not a 5 everywhere, but to **move the number** with evidence.

| Level | Meaning |
|-------|-------------|
| 1 | I have not touched it |
| 2 | I understand the theory, have not built it |
| 3 | I built it once with guidance (tutorial) |
| 4 | I built it independently, with evidence (repo + eval) |
| 5 | I can design it, defend trade-offs, and teach it to someone else |

**Portfolio rule:** a competency only counts as "hiring-ready" starting at **level 4** (reproducible evidence). Level 3 is a tutorial; the market buys 4-5. Align this with the [capstone rubric](./methodology-best-practices#capstone-rubric-hiring-ready-not-course-complete).

---

## 📚 External reference sources (reputable and verified)

| Source | Type | Reinforces in this plan |
|--------|------|------------------------|
| [Azure Well-Architected for AI](https://learn.microsoft.com/es-es/azure/well-architected/ai/get-started) | Framework (Microsoft) | Competencies 8, 9, 10 |
| [MS — Solution Architect Path](https://learn.microsoft.com/en-us/training/career-paths/solution-architect) | Official career path | Overall role structure |
| [MS Cloud Adoption Framework — AI](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/ai/) | Framework (Microsoft) | Competency 1 |
| [AWS — Generative AI](https://aws.amazon.com/training/learn-about/generative-ai/) | Official path (AWS) | Competencies 2-6 (multi-platform) |
| [Google Cloud — ML Engineer](https://cloud.google.com/learn/certification/machine-learning-engineer) | Official certification (Google) | Competency 9, cross-walk |
| [Chip Huyen — *AI Engineering* (O'Reilly, 2025)](https://github.com/chiphuyen/aie-book) | Reference book | Competencies 3, 6, 9 |
| [DeepLearning.AI — Courses](https://www.deeplearning.ai/courses/) | Courses (Andrew Ng) | Competencies 4, 5 |
| [roadmap.sh — AI Engineer](https://roadmap.sh/ai-engineer) | Community roadmap | General skills view |

---

## 🔗 How to use this page

1. **Before you start:** complete the self-assessment as a baseline and note your 3 weakest competencies.
2. **During the plan:** at every checkpoint, re-score and verify that you raised at least one competency to level 4.
3. **For the 🟡 areas (LLMOps, cost):** dedicate a Phase 3 or 4 session to the indicated external resource and add the artifact (WAF review, cost dashboard) to your portfolio.
4. **In interviews:** use the cross-walk to answer "do you have AWS/GCP experience?" with "my architecture is transferable; here is the equivalent."

---

## v4 Operations

- [Plan Overview](./overview)
- [Methodology and Best Practices](./methodology-best-practices)
- [Sources and Verification](./sources-and-verification)
- [Checkpoint Gates](./checkpoints)
