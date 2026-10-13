---
sidebar_position: 2
title: "A: Building AI Applications"
---

# A: from basic Python to an explainable AI application

**Aim:** build, evaluate, deliver and explain one useful application through three connected outcomes: a data/ML service, a grounded assistant and a bounded workflow.

**Budget:** 28 weeks × 12 hours = **336 planned hours**. Allow about 6 hours learning, 5 building/testing and 1 explaining/reviewing weekly. At 6 hours/week, plan approximately 56 weeks. Course assignments, debugging and peer review can require more time; do not compress the gates to meet a date.

## Entry check {/* #entry-check */}

Without generated solutions, write a Python program that reads JSON/CSV, calls an HTTP API with a timeout, handles a failed response and saves a result. Add two tests and version it with Git. Explain environments, exceptions and dependencies. If this is difficult, start [B](./path-b).

## How to use the plan

Follow the **selected topic**, not the entire documentation site. Each output below is an original project assignment; it is not necessarily a provider's assessed exercise. For the ML specialization, complete the provider's required assignments if pursuing its completion certificate. Use one public/synthetic learning-support workbench throughout.

For a concrete example, use Python, pytest, FastAPI and a relational database. SQLite is enough to start; PostgreSQL is useful when adding persistent vector search. Keep a reproducible environment. Equivalent familiar tools are acceptable if they produce the same evidence. A framework or cloud name is not a learning outcome.

## Phase 1 — Make ordinary software dependable {/* #phase-software */}

| Week | Open and study | Apply it to your project |
| --- | --- | --- |
| 1 | [CS50P: Unit Tests](https://cs50.harvard.edu/python/weeks/5/), then [pytest: Get Started](https://docs.pytest.org/en/stable/getting-started.html); use [uv projects](https://docs.astral.sh/uv/guides/projects/) for the environment example | Package the question reader. Test invalid records and missing files; save dependency versions and run commands. |
| 2 | [CS50 SQL: Querying](https://cs50.harvard.edu/sql/weeks/0/) and [Relating](https://cs50.harvard.edu/sql/weeks/1/) | Store questions and topics in two tables; write five queries using joins, aggregation and null handling. Record provenance and duplicates. |
| 3 | FastAPI [first steps](https://fastapi.tiangolo.com/tutorial/first-steps/), [request bodies](https://fastapi.tiangolo.com/tutorial/body/) and [errors](https://fastapi.tiangolo.com/tutorial/handling-errors/) | Expose one question/query endpoint. Test valid and malformed requests and a database failure. |
| 4 | [Docker: build and share an application](https://docs.docker.com/get-started/tutorials/run-an-app/) and [Python CI](https://docs.github.com/en/actions/tutorials/build-and-test-code/python): build/test workflow | Containerize the API; run tests in CI. **Gate 1:** another person can reproduce the API/database setup from a clean clone. |

## Phase 2 — Learn what makes a model useful {/* #phase-ml */}

Follow the [Machine Learning Specialization](https://www.coursera.org/specializations/machine-learning-introduction) in its provider order. The links below deliberately reuse the program page; the topics tell you what to select, not an invented week numbering inside the course.

| Week | Open and study | Apply it to your project |
| --- | --- | --- |
| 5 | [ML specialization](https://www.coursera.org/specializations/machine-learning-introduction): supervised learning, regression and loss | Define the prediction task. Create a majority/heuristic baseline before training a model. |
| 6 | [ML specialization](https://www.coursera.org/specializations/machine-learning-introduction): classification; [scikit-learn cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html): test vs validation data | Freeze a train/validation/test split; explain why the split fits your data. |
| 7 | [ML specialization](https://www.coursera.org/specializations/machine-learning-introduction): regularization and model evaluation; [common pitfalls](https://scikit-learn.org/stable/common_pitfalls.html): leakage | Fit preprocessing only on training data. Compare decision thresholds using precision/recall and five errors. |
| 8 | [ML specialization](https://www.coursera.org/specializations/machine-learning-introduction): neural networks and training | Train a small course model; plot loss and explain overfitting. Transfer only relevant ideas to your classifier. |
| 9 | [ML specialization](https://www.coursera.org/specializations/machine-learning-introduction): decision trees and ensembles | Compare a simple linear model and a tree on the same validation split. |
| 10 | [ML specialization](https://www.coursera.org/specializations/machine-learning-introduction): clustering, anomaly detection and recommendations | Run one small course experiment; explain whether it helps your project. Do not force it into the app. |
| 11 | [ML specialization](https://www.coursera.org/specializations/machine-learning-introduction): remaining required assignments | Close course gaps; turn the chosen model's preprocessing/training into a versioned script with a seed. |
| 12 | [scikit-learn cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html): final hold-out evaluation | **Gate 2:** evaluate untouched test data, expose prediction through the API and write a model card with baseline comparison and limitations. |

The **96-hour ML allocation is an estimate**, including project practice. Completing all three courses and their assignments may take longer. Extend this phase rather than treating watched videos as completion.

## Phase 3 — Add a language-model feature carefully {/* #phase-language-models */}

| Week | Open and study | Apply it to your project |
| --- | --- | --- |
| 13 | [Hugging Face introduction](https://huggingface.co/learn/llm-course/en/chapter1/1) and [Tokenizers](https://huggingface.co/learn/llm-course/en/chapter2/4) | Compare token counts for short/long inputs. Record model, input limits, allowed data and approximate request cost. |
| 14 | FastAPI [response models](https://fastapi.tiangolo.com/tutorial/response-model/) and [errors](https://fastapi.tiangolo.com/tutorial/handling-errors/); [tool schema lesson](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/13-tools-and-protocols/05-tool-schema-design/docs/en.md): descriptions and parameter constraints | Add a structured topic suggestion. Validate outputs; test timeout, malformed output and a bounded retry. Start with a mock response before using a model. |

This is an orientation, not completion of the Hugging Face course. It recommends good Python and introductory deep learning. If the neural-network material is still unclear, add selected [fast.ai](https://course.fast.ai/) model-training practice **outside this budget** before attempting HF training exercises.

## Phase 4 — Retrieve evidence, then evaluate answers {/* #phase-retrieval */}

RAG means **retrieval-augmented generation**: retrieve relevant passages and use them as context for an answer. It does not guarantee correctness.

| Week | Open and study | Apply it to your project |
| --- | --- | --- |
| 15 | [Upstream RAG lesson](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/11-llm-engineering/06-rag/docs/en.md): loading, chunking, embeddings and storage; [pgvector](https://github.com/pgvector/pgvector): getting started, update/delete | Give documents stable IDs; build a small persistent index with a rebuild command. Test changed and deleted documents. |
| 16 | [Retrieval Evaluation Lab](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/projects/retrieval-evaluation-lab): stages 1–2, ranking validation and precision/recall | Create labeled development queries. Compare lexical and embedding retrieval using recall@k; retain labels and per-query results. |
| 17 | [Upstream RAG lesson](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/11-llm-engineering/06-rag/docs/en.md): retrieval and generation | Return passage citations or “not enough evidence.” Manually score answer correctness, citation support and abstention separately. |
| 18 | [Retrieval Evaluation Lab](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/projects/retrieval-evaluation-lab): stages 3–4, rank-sensitive metrics and comparisons | **Gate 3:** compare retrieval and no-retrieval answers on untouched queries; report per-query regressions, latency and cost using the [shared rubric](./portfolio-practice#completion-gates). |

The upstream lab notes that some runner functionality requires POSIX. On Windows, use WSL for that runner or implement the ranking exercises in your own project; do not claim its grader passed unless you ran it.

## Phase 5 — Keep workflows bounded {/* #phase-workflows */}

| Week | Open and study | Apply it to your project |
| --- | --- | --- |
| 19 | [Agent loop](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/01-the-agent-loop/docs/en.md): tool registry, observations and stop conditions; revisit [tool schemas](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/13-tools-and-protocols/05-tool-schema-design/docs/en.md) | Implement one direct read-only lookup flow. Validate arguments and cap steps/time; no arbitrary code execution or real writes. |
| 20 | [Failure modes](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/26-failure-modes-agentic/docs/en.md): cascading errors, context loss and tool misuse | **Gate 4:** test missing tools, bad arguments, hostile retrieved text and exhausted budgets. Produce a draft for human review; permissions remain outside the model. |

Framework persistence and protocol integration are [optional delivery extensions](./delivery-practice), not extra requirements hidden in two weeks.

## Phase 6 — Deliver, observe and recover {/* #phase-delivery */}

| Week | Open and study | Apply it to your project |
| --- | --- | --- |
| 21 | [Docker application tutorial](https://docs.docker.com/get-started/tutorials/run-an-app/): images, Compose and sharing; [MLOps deployment module](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/04-deployment): batch vs online | Release a small sandbox service. Use local hosting first or one familiar cloud; record configuration and teardown. |
| 22 | [Python CI](https://docs.github.com/en/actions/tutorials/build-and-test-code/python): test/build checks; revisit [pytest](https://docs.pytest.org/en/stable/getting-started.html) | Pin dependencies, add health checks and make a seeded regression fail the release checks. Keep secrets outside source. |
| 23 | [MLOps monitoring module](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/05-monitoring): health, quality and drift indicators | Measure latency, errors, cost and quality on a declared workload. A simple report is enough; the full dashboard stack is not required. |
| 24 | [MLOps best-practices module](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/06-best-practices): integration tests and delivery | Simulate an upstream outage, rehearse rollback and write a short recovery guide. |
| 25 | [Capability guide](./capability-guide) and [credential choices](./credentials) | Fix one failed capability. **Optional substitution:** map one current exam's objectives to evidence and gaps; do not add all exam domains to this week's budget. |
| 26 | [Project review rubric](./portfolio-practice#completion-gates) | **Gate 5:** another person can run, evaluate and recover the app. If pursuing an exam, extend preparation until its separate requirements are met. |

Hosted APIs, cloud use, course access, exams and retakes have separate costs. Declare a spending limit and cleanup procedure before use; an alert is not a hard cap.

## Phase 7 — Make your learning easy to understand {/* #phase-review */}

| Week | Open and study | Apply it to your project |
| --- | --- | --- |
| 27 | [Upstream Career Practice](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md): one project, feedback and reproducibility; [evidence template](./portfolio-practice#evidence-record) | Write two short case studies explaining a baseline, failure, improvement and known limit. Record a five-minute walkthrough. |
| 28 | [Capability guide](./capability-guide) and [review practice](./portfolio-practice#review-and-explain) | **Gate 6:** demonstrate the three connected outcomes; ask for a reproduction/design review, record actual feedback and choose one next improvement. |

**Optional depth:** advanced fine-tuning, distributed training, multi-agent systems and additional platforms come after the gates, when a clear learning question justifies them. For deeper data and model training, continue with [C](./path-c).
