---
sidebar_position: 7
title: "Sources and Verification"
---

# How the learning sequence uses its sources

**Review date: October 13, 2026.** Yes, [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) informs this plan. Its [README](https://github.com/rohitg00/ai-engineering-from-scratch), [ROADMAP](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/ROADMAP.md) and [Career Practice](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md) were reviewed, together with the selected lesson/project content linked below.

This is a **curriculum/content review, not a whole-repository code audit**. No upstream lessons are copied into these pages. The weekly assignments are our own small-project sequence with attribution links.

## What was retained and adapted?

The reference emphasizes implementation, tests, failure inspection and one coherent project. We retain those practices and the retrieval lab's query-by-query comparisons. We narrow its broad curriculum into three starting-level routes, put selected resources beside assignments, include independent project/review time and separate optional depth.

The reference's phase timings are not used as completion guarantees. Its ROADMAP headline is roughly 332 hours; this plan uses its own 336/480-hour budgets and gates. Completing a source lesson or project does not establish professional experience.

## Selected upstream content actually inspected

| Content | Selected use | Boundary |
| --- | --- | --- |
| [Git and Collaboration](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/00-setup-and-tooling/02-git-and-collaboration/docs/en.md) | B11: local versioning, branching and ignored files | Not verification of every setup lesson |
| [Model evaluation](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/02-ml-fundamentals/09-model-evaluation/docs/en.md) | Supporting reference for splits, metrics and leakage | Primary scikit-learn/course readings lead the ML assignments |
| [RAG](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/11-llm-engineering/06-rag/docs/en.md) | A15/A17 and C25–26: loading, chunking, embedding, storage, retrieval and generation | Broad cost/privacy/superiority claims are not adopted; task-specific comparison remains necessary |
| [Retrieval Evaluation Lab](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/projects/retrieval-evaluation-lab) | A16/A18: ranking validation, precision/recall, rank-sensitive metrics and per-query comparison | Project description/stage map inspected; runner and solution code not executed or audited |
| [Tool schema design](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/13-tools-and-protocols/05-tool-schema-design/docs/en.md) | A14/A19: descriptions and parameter constraints | Not independent verification of its benchmark claims |
| [Agent loop](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/01-the-agent-loop/docs/en.md) | A19: registry, observations and stop/budget conditions | Selected concepts, not completion of its full prerequisite chain |
| [Failure modes](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/26-failure-modes-agentic/docs/en.md) | A20/delivery: cascading errors, context loss and tool misuse | Paper/industry claims and all linked references not independently verified |
| [Secrets and audit lesson](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/17-infrastructure-and-production/25-security-secrets-audit/docs/en.md) | Background review only; not required weekly reading | Its incidents, universal patterns and policy thresholds are not adopted as verified standards |
| [Career Practice](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md) | One project, prerequisite checks, reproduction and actual feedback | Its career-specific overlays are not required or an employment promise |

The links follow a moving `main` branch. Record the source revision/date you actually use for an exercise.

## Primary education and documentation checked

| Source | Content accessed and relevance |
| --- | --- |
| [CS50P](https://cs50.harvard.edu/python/) | Course overview, weeks 0–9 pages and final-project requirements; direct selections in B |
| [CS50 SQL](https://cs50.harvard.edu/sql/) | Overview and Querying/Relating/Designing pages; selected data foundations |
| [ML specialization](https://www.coursera.org/specializations/machine-learning-introduction) | Three-course description and supervised/unsupervised subject coverage; not protected assignments |
| [fast.ai](https://course.fast.ai/) | Course overview and lessons 1–2 pages: coding prerequisites, model training/deployment and 2022 Part 1 recordings |
| [HF LLM course](https://huggingface.co/learn/llm-course/en/chapter1/1) | Introduction/prerequisites, Tokenizers, fine-tuning introduction and Datasets introduction |
| [scikit-learn](https://scikit-learn.org/stable/common_pitfalls.html) | Leakage/common pitfalls, cross-validation and [probability calibration](https://scikit-learn.org/stable/modules/calibration.html) explanations/examples |
| [SciPy bootstrap](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html) | Synthetic resampling example, variability and confidence intervals for C's statistical practice |
| [PostgreSQL](https://www.postgresql.org/docs/current/tutorial.html) | Tutorial, transactions and window-function content |
| [pytest](https://docs.pytest.org/en/stable/getting-started.html), [uv](https://docs.astral.sh/uv/guides/projects/), [FastAPI](https://fastapi.tiangolo.com/tutorial/) | Testing example, project/environment management, API first steps/request bodies/response models/errors/security and concurrency pages |
| [Docker](https://docs.docker.com/get-started/tutorials/run-an-app/), [Python CI](https://docs.github.com/en/actions/tutorials/build-and-test-code/python) | Application/container/Compose tutorial and build/test workflow guide |
| [pgvector](https://github.com/pgvector/pgvector), [MLflow](https://mlflow.org/docs/latest/ml/tracking/) | Vector search/persistence/update/delete and experiment/run/artifact tracking |
| [MLOps Zoomcamp](https://github.com/DataTalksClub/mlops-zoomcamp) | README/access conditions and modules 2–6 descriptions: tracking, orchestration, deployment, monitoring and best practices |
| [LangGraph](https://docs.langchain.com/oss/python/langgraph/persistence), [MCP](https://modelcontextprotocol.io/docs/learn/architecture) | Persistence/interrupt content and protocol architecture; optional delivery concepts |
| [Credential register](./credentials) | Official Microsoft AI-103/study-guide, retired AI-102, AWS ML Associate and Google ML pages rechecked; public scope/status only |

## Verification limits {/* #verification-limits */}

- Public pages and selected content were fetched; this is not proof that every nested link, video, code sample or course exercise works.
- Initial bare CS50 `/python/0/` and `/sql/0/`-style URLs returned 404. The provider's weeks index exposed the correct **`/weeks/…/`** paths; the selections in this plan were fetched at those corrected URLs. The index's simplified extraction omitted its lesson list, so its HTML was inspected.
- Docker's old workshop URL redirected; the plan uses the fetched application tutorial. MCP's architecture URL redirected to a versioned documentation page. Pin protocol/SDK versions before implementation.
- No enrollment, checkout, cloud deployment or exam booking was performed. Paid/sign-in assignments, local price/appointments, assessment access and credential outcomes remain unverified.
- Source availability and subject coverage are not a “best-in-class” ranking or evidence of employment outcomes. Individual readiness needs actual artifacts and review.

Most linked resources are in English; the Spanish route explains the same assignments but does not promise translated provider material or Spanish exam availability.

Recheck broken links when encountered, version-sensitive APIs before implementation and official credentials before payment. Record a source/date change rather than silently assuming older exam codes remain current.
