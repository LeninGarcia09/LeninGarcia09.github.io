---
sidebar_position: 4
title: "C: ML and Data Systems"
---

# C: deepen the data, training and operational foundations

**Start here if:** you already build tested APIs, use Git/CI, query SQL and deploy services. **Budget:** 32 weeks × 15 hours = **480 hours**: roughly 6 hours learning, 7 implementation/evaluation and 2 reviewing each week.

This journey deliberately goes deeper into **machine learning and data** than A. Training, data quality and repeatable pipelines are central—not an optional notebook beside a language-model feature.

## Entry gate

Show a service you can explain, a SQL join/window query, a reproducible container and a CI failure you diagnosed. Fill software gaps with [A](./path-a) first. Software experience does not establish ML understanding.

Use the same learning-support workbench: version question/topic events, train a classifier and compare documentation-answer approaches. These are three outcomes of **one system**, not three unrelated projects.

## Phase 1 — ML foundations and statistical judgment

**Weeks 1–6 / 90 hours.** Complete the ML specialization's required work if seeking its certificate; extend the phase if it exceeds this allocation. Supplement a mathematical gap rather than assuming coding familiarity replaces it.

| Weeks | Selected resource and focus | Assignment and evidence |
| --- | --- | --- |
| 1–2 | [ML specialization](https://www.coursera.org/specializations/machine-learning-introduction): regression, classification, loss and optimization | Explain features, vector/matrix shapes and gradients in a small model. Compare heuristic and linear baselines. |
| 3–4 | [ML specialization](https://www.coursera.org/specializations/machine-learning-introduction): neural networks, trees and model selection; [cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html) | Choose random, grouped or temporal splits appropriately. Tune on development data only; compare model errors by slice. |
| 5–6 | [ML specialization](https://www.coursera.org/specializations/machine-learning-introduction): unsupervised/recommendation material and remaining assignments; [common pitfalls](https://scikit-learn.org/stable/common_pitfalls.html); [SciPy bootstrap example](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html): resampling and intervals | Explain leakage, imbalance, missing values and thresholds. Estimate variability by repeatedly sampling synthetic independent observations; document the interval and assumptions. **Gate C1:** baseline report, split manifest and justified limitations. |

## Phase 2 — Turn data into a recoverable product

**Weeks 7–12 / 90 hours.** Start with a local batch pipeline. Scheduling tools are optional until the command-line pipeline works.

| Weeks | Selected resource and focus | Assignment and evidence |
| --- | --- | --- |
| 7–8 | [CS50 SQL: Designing](https://cs50.harvard.edu/sql/weeks/2/), [PostgreSQL transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html) and [window functions](https://www.postgresql.org/docs/current/tutorial-window.html) | Define keys, constraints and event history. Test failed transactions and calculate rolling topic counts. |
| 9–10 | [MLOps orchestration module](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/03-orchestration): parameterized scripts, dependencies and backfills | Build incremental ingestion; rerunning the same batch must not duplicate records. Quarantine malformed records and recover a failed run. |
| 11–12 | [HF Datasets introduction](https://huggingface.co/learn/llm-course/en/chapter5/1): loading, slicing and processing | Version dataset snapshots, transformations and schema changes. **Gate C2:** backfill, deletion, quality checks and lineage reproduce from source to training set. |

## Phase 3 — Train and adapt a small model

**Weeks 13–18 / 90 hours.** The fast.ai page identifies Part 1 recordings as 2022; use current library documentation and compatible pinned versions. Selected lessons are not full-course completion.

| Weeks | Selected resource and focus | Assignment and evidence |
| --- | --- | --- |
| 13–14 | fast.ai [lesson 1](https://course.fast.ai/Lessons/lesson1.html): training/using a model; [lesson 2](https://course.fast.ai/Lessons/lesson2.html): your dataset and deployment | Train a small model, save weights and compare training/validation behavior. Explain overfitting and the compute budget. |
| 15–16 | [HF Tokenizers](https://huggingface.co/learn/llm-course/en/chapter2/4) and [fine-tuning chapter introduction](https://huggingface.co/learn/llm-course/en/chapter3/1), then its preprocessing/training sections | Run a small text-classification training exercise on versioned data. Record tokenizer, model, seed, metrics and resource use. |
| 17–18 | [MLflow tracking](https://mlflow.org/docs/latest/ml/tracking/): runs, experiments and artifacts; [probability calibration](https://scikit-learn.org/stable/modules/calibration.html): calibration curves; revisit [leakage pitfalls](https://scikit-learn.org/stable/common_pitfalls.html) | Compare heuristic, linear/tree and adapted-model results on the same untouched split. Check whether predicted confidence matches observed frequencies; fit any calibration on development data only. **Gate C3:** reproducible training and honest baseline comparison. |

Use CPU-sized or small models first. Fine-tuning the application is not mandatory if it is unjustified; the controlled training exercise still provides learning evidence. GPU or API spend needs a cap and cleanup plan.

## Phase 4 — Connect training to serving

**Weeks 19–24 / 90 hours.** Select the indicated MLOps Zoomcamp topics—not the complete additional nine-week course. Translate its examples to your existing project rather than adopting every demonstrated service.

| Weeks | Selected resource and focus | Assignment and evidence |
| --- | --- | --- |
| 19–20 | [Experiment tracking module](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/02-experiment-tracking): artifacts, lineage and model versions | Track training runs and register/version a candidate. Test feature consistency between training and serving. |
| 21–22 | [Deployment module](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/04-deployment): batch and online serving; [best practices](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/06-best-practices): tests and CI | Serve one model by API and batch job. Block a seeded regression in CI; rehearse a failed release and rollback. |
| 23–24 | [Monitoring module](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/05-monitoring): health, quality and drift | Simulate missing/shifted data; distinguish drift from a pipeline bug. **Gate C4:** training-to-serving pipeline, alerts/report and recovery evidence. |

## Phase 5 — Compare retrieval and model adaptation

**Weeks 25–28 / 60 hours.**

| Weeks | Selected resource and focus | Assignment and evidence |
| --- | --- | --- |
| 25–26 | [Upstream RAG lesson](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/11-llm-engineering/06-rag/docs/en.md) and [pgvector](https://github.com/pgvector/pgvector): search and persistence | Build lexical/embedding retrieval; enforce document access filters outside the model. Test updates, deletion and denied access with synthetic identities. |
| 27–28 | [Retrieval Evaluation Lab](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/projects/retrieval-evaluation-lab): query comparisons; [shared answer rubric](./portfolio-practice#completion-gates) | **Gate C5:** compare prompt-only and RAG on one frozen answer task. Compare adaptation only if trained for that same task; classifier scores are not answer-quality scores. Report slice errors, cost and complexity. |

The upstream lab has POSIX-dependent runner features; use WSL where needed or implement the metric exercises independently. Record which checks actually ran.

## Phase 6 — Consolidate and explain

**Weeks 29–32 / 60 hours.**

| Weeks | Selected resource and focus | Assignment and evidence |
| --- | --- | --- |
| 29–30 | [Capability guide](./capability-guide), [MLflow tracking](https://mlflow.org/docs/latest/ml/tracking/) and [optional credentials](./credentials) | Repair the weakest gate. Optionally map one relevant exam syllabus to gaps; exam preparation is not automatically included in 60 hours. |
| 31–32 | [Upstream Career Practice](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md): feedback and reproduction; [review practice](./portfolio-practice#review-and-explain) | **Gate C6:** a reviewer recreates one data failure, one training result and one serving recovery. Write three connected case studies with actual results and limitations. |

## Optional depth, kept separate

Distributed processing, streaming, feature stores, Kubernetes, recommendation, forecasting and vision are electives. Add one when a clear dataset/workload or learning question justifies it; record additional time and cost. Do not rebuild infrastructure to hide weak data or evaluation.

For stateful workflows or more operational practice, the [delivery extension](./delivery-practice) adds **360 proposed hours** if taken in full. It is not hidden inside C's 480 hours. Certificates and project uptime do not award professional experience.
