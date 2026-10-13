---
sidebar_position: 4
title: "C: Machine Learning + Data Engineering"
---

# C: experienced software engineer to ML and data systems

**For:** engineers who already build tested APIs, use Git/CI, query SQL, and deploy services. **Planning budget:** 32 weeks at 15 hours/week = **480 hours**. Allocate approximately 6 hours learning, 7 hours implementation/evaluation, and 2 hours career and technical communication.

This path deliberately adds **more Machine Learning and Data** than A. Training and data pipelines are first-class work, not an optional notebook beside an LLM application.

## Entry gate

Show a production-style service you can explain, a SQL query using joins and window functions, a reproducible container, and a CI failure you diagnosed. If software foundations are missing, take A first. Existing software experience does not establish ML experience.

## Separate phase roadmap

| Phase | Weeks / hours | Learn and implement | Exit evidence |
| --- | --- | --- | --- |
| Statistics + ML foundations | 1-6 / 90 | [ML Specialization](https://www.coursera.org/specializations/machine-learning-introduction); probability, linear algebra, optimization, sampling, leakage, uncertainty | Regression/classification baselines; split strategy; confidence intervals and slice errors |
| Data engineering | 7-12 / 90 | Advanced SQL, relational modeling, batch ingestion, incremental updates, schema evolution, data contracts, quality tests, lineage | Idempotent pipeline + backfill + malformed-data quarantine + tested transformations |
| Deep learning + NLP | 13-18 / 90 | Selected [fast.ai](https://course.fast.ai/) training/deployment lessons, then [Hugging Face](https://huggingface.co/learn/llm-course/en/chapter1/1) datasets, tokenization, training/fine-tuning | Reproducible training job, versioned dataset, baseline vs fine-tuned model report |
| MLOps + serving | 19-24 / 90 | Tracking, model registry concepts, feature consistency, batch/online inference, CI evaluation, rollout/rollback, drift | Training-to-serving pipeline; rollback rehearsal; latency and quality alerts |
| Applied GenAI + data retrieval | 25-28 / 60 | Hybrid retrieval, reranking, data access filters, evaluation, prompt/model versioning; compare retrieval and fine-tuning | Held-out RAG experiment; documented choice and cost/quality tradeoff |
| Specialization + career | 29-32 / 60 | One cloud's official exam preparation, system-design practice, case studies, applications | Exam-gap map and three defensible portfolio outcomes |

These are selected course modules except where the full ML specialization is named. Completing this roadmap does not imply completion of fast.ai, the full Hugging Face course, or a professional certification. Extend any phase when assignments or gates need more time.

## Three connected projects

| Project | Minimum implementation | What makes it different from A |
| --- | --- | --- |
| Data product | Public/synthetic event ingestion into a relational/analytical store; quality contracts, incremental processing, backfill, documented lineage | Recoverability, data semantics, freshness, duplicates, and reproducibility |
| Trained ML service | Compare heuristic, linear/tree, and a small neural model; train on versioned data; deploy batch and API inference | Model selection, tuning without test leakage, experiment tracking, training-serving consistency |
| Retrieval/model adaptation benchmark | Same task and held-out queries; compare prompt-only, RAG, and a justified small fine-tune | Data provenance, model/dataset versions, slice analysis, cost, operational complexity |

A fine-tune is **not mandatory if it is unjustified**. Explain the decision and run a small controlled training experiment instead. Use local CPU/small-model exercises first; GPU spend needs a written cap and cleanup plan.

## Required data and ML depth

Be able to defend splits for temporal/grouped data, missing-value handling, class imbalance, calibration, threshold selection, feature leakage, drift vs data bugs, and reproducibility. For data engineering, demonstrate keys/constraints, schema migrations, idempotency, retries, failed-record handling, lineage, and deletion.

Distributed processing, Kubernetes, feature stores, forecasting, recommendation, and computer vision are **role-driven electives**. Add Spark or another engine only when the dataset or target jobs justify it; do not spend the core plan rebuilding infrastructure.

## Delivery enhancement for senior targets

The [EPAM audit](./epam-reality-check) identifies application/agent requirements not established by ML/data study. Keep this path's ML depth, but use explicit tools in the artifacts: uv/Ruff/pytest and FastAPI/Pydantic/Uvicorn for packaging/serving; PostgreSQL/pgvector for relational/vector data; NumPy, pandas or Polars, scikit-learn, PyTorch, HF datasets/tokenizers and sentence-transformers where applicable; MLflow for recorded experiments. Explain the conceptual mapping to TensorFlow/Keras rather than claiming untested proficiency.

Use selected [MLOps Zoomcamp modules](https://github.com/DataTalksClub/mlops-zoomcamp) during weeks 19-24, not an additional full nine-week course inside the same budget. At weeks 29-32, prioritize delivery/design/English gaps over an exam for the four EPAM targets. Extend the phase when required.

For those roles, add the [Senior Delivery Bridge](./senior-delivery-bridge) after the admission gates. Kubernetes and Redis/Kafka become concrete E3 exercises, while AgentCore/Strands or diffusion/video belong to separate branches. This **adds up to 360 proposed hours** if taken in full; it is not hidden inside C's 480-hour estimate and does not create the required professional tenure.

## Credentials and target roles

For ML production on AWS, consider **AWS Certified Machine Learning Engineer - Associate**, but the official page currently lists an **MLA-C02 English beta transition**. Do not plan the retired English MLA-C01 sitting. Prefer waiting for a stable syllabus if you do not need a beta.

For Google-oriented ML/data roles, evaluate **Professional Machine Learning Engineer** after substantial hands-on practice. It is not proof of coding proficiency. AI-103 fits Azure **application** roles but does not replace the ML/data evidence above.

Target ML engineer, data engineer supporting AI, AI platform/MLOps engineer, or applied AI engineer according to prior experience and postings. Research-scientist and senior roles may require qualifications this path does not provide.

**Continue:** [official courses and exams](./credentials), [evidence rubric](./portfolio-career), and [source mapping](./source-review).
