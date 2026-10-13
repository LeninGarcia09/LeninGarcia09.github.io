---
sidebar_position: 2
title: "A: AI Application Engineer"
---

# A: career switcher to AI application engineer

**Goal:** demonstrate that you can build, evaluate, ship, and explain a small AI application. Target junior AI application developer, Python/backend developer with AI features, or AI integration roles where the experience requirements match your background.

**Budget:** 28 weeks x 12 hours = **336 planned hours**. Each week: approximately 6 hours learning, 5 hours building/testing, and 1 hour career research or communication. Estimates include independent project work but exclude exam fees, failed-exam retakes, and additional remediation. At 6 hours/week, budget roughly 56 weeks rather than compressing the gates.

## Entry check

Without asking an AI assistant to produce the solution, write a Python program that reads JSON/CSV, calls an HTTP API with a timeout, handles a failed response, and saves a result. Add two tests and commit it to Git. Explain environments, exceptions, and each dependency.

If you cannot do this, use [B](./path-b). AI assistance is allowed during subsequent work, but you must review generated code and reproduce the behavior independently.

## The seven phases

| Phase | Weeks / hours | Primary learning | Evidence before advancing |
| --- | --- | --- | --- |
| 1. Software + SQL | 1-4 / 48 | Selected [CS50P](https://cs50.harvard.edu/python/) and [CS50 SQL](https://cs50.harvard.edu/sql/) lessons; upstream Phase 0 | Tested API over a relational dataset |
| 2. Applied ML | 5-12 / 96 | [Machine Learning Specialization](https://www.coursera.org/specializations/machine-learning-introduction) | Baseline comparison, held-out evaluation, error analysis |
| 3. LLM foundations | 13-14 / 24 | Selected [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/en/chapter1/1) concepts; upstream LLM lessons | Structured-output feature with failure tests |
| 4. Retrieval + evaluation | 15-18 / 48 | Upstream retrieval/evaluation lessons and Retrieval Evaluation Lab | RAG benchmark against lexical search and no-retrieval baselines |
| 5. Bounded workflows | 19-20 / 24 | Upstream agent loop, tool schema, and failure-mode lessons | Read-only workflow, validated inputs, approval boundary |
| 6. Deployment + one credential | 21-26 / 72 | Official preparation for the selected cloud credential | Reproducible deployment, monitoring, rollback, exam-gap checklist |
| 7. Career packaging | 27-28 / 24 | Portfolio reviews and mock interviews | Three explainable outcomes, role-matched CV, application evidence |

Course access, credentials, and optional extensions: [courses and certifications](./credentials). Exact source lesson links: [reference mapping](./source-review#selected-reference-lessons).

## Weekly checklist

Each row is one week's main task. Save the output in your project repository. An unfinished gate carries forward; do not add another framework to disguise a missing foundation.

| Week | Main task | Output |
| --- | --- | --- |
| 1 | Fix entry-check gaps; use Python 3.12+ compatible dependencies, uv, Git, Ruff, pytest | Locked environment, lint/test CI and malformed-data tests |
| 2 | Query SQL: joins, aggregation, nulls; inspect licensing and duplicates | Dataset card, schema, and five useful queries |
| 3 | Expose ingestion/query with FastAPI, Pydantic and Uvicorn; use PostgreSQL | Validated contracts, failure tests and one async I/O vs blocking example |
| 4 | Add a container and CI; have someone reproduce setup | **Gate 1:** clean-clone API + database + passing CI |
| 5 | ML course: regression, loss, features; define a non-ML baseline | Problem statement and majority/heuristic baseline |
| 6 | Classification and train/validation/test splits | Leakage checks and a frozen split manifest |
| 7 | Regularization, decision thresholds, appropriate metrics | Precision/recall tradeoff with error examples |
| 8 | Neural-network concepts and practical training | Small trained model; explain overfitting and loss |
| 9 | Trees and model selection | Compare a simple linear model and a tree model |
| 10 | Unsupervised learning and recommendation concepts | One relevant experiment; explain when not to use it |
| 11 | Finish specialization assignments; reproduce the chosen model | Versioned preprocessing/training script and seed |
| 12 | Evaluate untouched test data; expose prediction through the API | **Gate 2:** ML service + model card + honest baseline comparison |
| 13 | Tokenization, context, embeddings, model/API contracts | Input/output limits and a small comparison notebook |
| 14 | Structured output, timeout, retry budget, invalid output | Tested extraction/classification feature; explicit errors |
| 15 | Build ingestion with source IDs, chunking, updates/deletion; persist vectors in pgvector | Versioned PostgreSQL index, rebuild command and public/synthetic corpus |
| 16 | Compare lexical and embedding retrieval | Frozen query set with relevance labels and recall@k |
| 17 | Ground answers in passages; include citations and abstention | Answer scoring rubric and unanswerable cases |
| 18 | Run the retrieval lab and end-to-end evaluation | **Gate 3:** per-query deltas + quality/latency/cost report |
| 19 | Implement one tool workflow before adding orchestration | Typed tool schema, allowlisted read-only operations |
| 20 | Port the bounded flow to LangGraph; one MCP tool contract; test failure, step limits and approval | **Gate 4:** direct vs framework comparison, tool-contract and denial/approval examples |
| 21 | Select one cloud from target postings; deploy a small service | Recorded configuration, secrets outside source, cost cap |
| 22 | Add CI release checks, dependency pins, health/readiness checks | Deploy/redeploy instructions and reproducible release |
| 23 | Measure latency, token cost, errors, and evaluation drift | Operational report; no unsupported production claims |
| 24 | Rehearse upstream failure and rollback; try user feedback | Runbook and one improvement with before/after evidence |
| 25 | Map the official exam syllabus to implemented skills | Gap list; short labs for missing domains |
| 26 | Run official practice assessment if available; fix gaps | **Gate 5:** another person can run, evaluate, and recover the app |
| 27 | Write CV bullets and two project case studies; practice code/SQL and a technical English explanation | Evidence-linked CV and recorded explanation with feedback |
| 28 | Practice system design; submit role-matched applications | **Gate 6:** review-ready portfolio and application tracker |

## Keeping the scope realistic

The ML phase aims to complete all three specialization courses, **not only watch videos**. If assignments exceed the 96-hour budget, extend this phase; claim a completion certificate only after meeting the provider's requirements.

The two-week LLM phase is an **orientation**, not completion of the entire Hugging Face course. That course recommends good Python and introductory deep learning. Use the ML neural-network material first; if it is insufficient, add selected [fast.ai](https://course.fast.ai/) lessons before attempting Hugging Face training exercises. Advanced fine-tuning and reasoning-model chapters are optional extensions or C material.

Use Python, SQL, one API framework, one database, one model provider, and one deployment target. Learn one orchestration framework only after the direct implementation works. Defer Rust/Julia, custom CUDA, distributed training, complex multi-agent systems, and multimodal projects unless target roles require them.

### Enhancement from real postings

The [EPAM audit](./epam-reality-check) makes the foundation stack explicit: uv/Ruff/pytest, FastAPI/Pydantic/Uvicorn, PostgreSQL/pgvector and a first LangGraph/MCP exercise. These are introductions, not enterprise-stack mastery. Use the [official resource references](./senior-resources) and extend a phase if needed; the same 336-hour budget is still only an estimate.

For E2/E3, practice technical English weekly and obtain a separate assessment if B2 is unknown; a demo does not certify a language level. For these EPAM targets, replace weeks 25-26 exam preparation with failed delivery gates and role-gap assessment if an exam has no current value. Do not substitute a two-week agent exercise for E2's one-year production-agent requirement.

## Certification is a separate gate

For Azure-oriented application jobs, **AI-103** is the first-choice recommendation, not a universal requirement. It also covers vision, text analysis, and information extraction: the RAG project alone is **not sufficient exam preparation**. Use weeks 25-26 for gaps and extend preparation if needed.

Do not schedule an exam solely because week 26 arrived. Use the [credential decision rules](./credentials#when-to-pay-for-an-exam). For AWS/Google ML-oriented jobs, consider C and the relevant exam after enough hands-on practice.

Begin market research in week 1 and portfolio conversations at Gate 2. You may apply earlier when you meet a posting's requirements; neither course completion nor an exam is permission to claim professional experience.

**Next:** use the [portfolio rubric](./portfolio-career) to assess each gate.
