---
sidebar_position: 9
title: "Optional Delivery Practice"
---

# Extend the same project into operational practice

**For:** learners who already demonstrate software, ML evaluation and retrieval foundations. **Additional proposed budget:** 24 weeks × 15 hours = **360 hours**: 16 shared weeks (**240 hours**) plus **one** eight-week focus (**120 hours**). Allocate about 4 hours reading, 9 implementation/debugging and 2 review/communication weekly.

This is optional depth, not a prerequisite for A/B/C completion. Select it after [capability review](./capability-guide), or choose individual exercises with an explicit additional budget. It does not award professional experience.

## Before you start

Independently show a tested API, SQL joins/window functions, a containerized release, a clean ML split, a held-out retrieval experiment and one diagnosed CI/runtime failure. Repair missing foundations in A/C first.

Keep the same public/synthetic learning-support workbench. Add a mock external question API and human-reviewed draft—not real integrations or writes. Use the existing stack; LangGraph and MCP illustrate state and protocol concepts, not a requirement to collect frameworks. Pin compatible versions and record them.

## Shared practice, one assignment per week

| Week | Selected reading | Build and show |
| --- | --- | --- |
| 1 | [uv projects](https://docs.astral.sh/uv/guides/projects/) and [pytest](https://docs.pytest.org/en/stable/getting-started.html) | A typed package, locked environment, tests and clean-clone commands. |
| 2 | [FastAPI concurrency](https://fastapi.tiangolo.com/async/) | Compare blocking and nonblocking I/O; test timeout and cancellation without claiming CPU parallelism. |
| 3 | FastAPI [request validation](https://fastapi.tiangolo.com/tutorial/body/) and [security overview](https://fastapi.tiangolo.com/tutorial/security/); [PostgreSQL transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html) | Add application-level access checks, synthetic identity-isolation tests and a failed migration/rollback exercise. |
| 4 | [MLOps orchestration](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/03-orchestration): repeatable parameterized work | Make repeated requests idempotent; cap worker/queue/retry use and test throttling. |
| 5 | [pgvector](https://github.com/pgvector/pgvector): search, filters and index tradeoffs | Rebuild a persistent index; compare lexical/vector search and test update/delete/access filtering. |
| 6 | [MLflow tracking](https://mlflow.org/docs/latest/ml/tracking/) | Version prompts/models/data and run baseline/candidate evaluation. Calibrate any model judge against human labels. |
| 7 | [LangGraph persistence](https://docs.langchain.com/oss/python/langgraph/persistence): checkpointers vs stores | Resume after process restart with durable storage. Test session isolation, retention and deletion; in-memory examples alone do not show durability. |
| 8 | [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture): host/client/server and data layer | Connect one local read-only tool. Pin protocol/SDK versions and test malformed and unauthorized calls. |
| 9 | [LangGraph interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts) | Pause a draft for external review; bind application approval to identity and payload. Deny changed/replayed approval. An interrupt is not authorization. |
| 10 | [Agent failure modes](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/26-failure-modes-agentic/docs/en.md) | Trace a failed tool and budget exhaustion. Redact logs; explain latency and token/cost counting without double counting. |
| 11 | [MLOps monitoring](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/05-monitoring) | Predeclare load/duration and cost/latency/error budgets; run a load experiment and simulate an outage. |
| 12 | [MLOps best practices](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/06-best-practices): versioned infrastructure and delivery | Recreate one sandbox from reviewed configuration; if using IaC/cloud, review the plan and verify targeted teardown. |
| 13 | [Docker application tutorial](https://docs.docker.com/get-started/tutorials/run-an-app/): multi-container application | Recreate API/data/worker processes locally; test restart behavior and readiness. No cluster is required. |
| 14 | [Python CI](https://docs.github.com/en/actions/tutorials/build-and-test-code/python) and [MLOps best practices](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/06-best-practices) | Make CI block a critical seeded regression; rehearse rollback and record an incident timeline. |
| 15 | [Upstream Career Practice](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md): feedback and ownership | Integrate the mock API; recover a broken contract, explain alternatives and improve one issue from actual review feedback. |
| 16 | [Shared review rubric](./portfolio-practice#review-and-explain) and [capability guide](./capability-guide) | Have someone reproduce one failure/result. Present a design walkthrough and short recovery brief; mark review unavailable if needed. |

These are focused readings/labs, not completion of every course or documentation site. Some source examples use different frameworks/clouds; transfer the concept to your project, do not adopt all their infrastructure.

## Choose one eight-week focus

Each row covers two weeks: read/experiment first, implement/review second. Do not combine all focuses within the same 120 hours.

### Stateful workflows

| Weeks | Selected resource | Assignment |
| --- | --- | --- |
| 17–18 | [LangGraph persistence](https://docs.langchain.com/oss/python/langgraph/persistence) | Separate conversation checkpoints from long-lived data; test restart and isolation. |
| 19–20 | [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) | Add one tool contract; document compatibility and denied/malformed requests. |
| 21–22 | [LangGraph interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts), [failure modes](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/26-failure-modes-agentic/docs/en.md) | Test lost state, stale approval, timeout and deletion. Keep permissions outside model output. |
| 23–24 | [Project evidence rubric](./portfolio-practice#completion-gates) | Compare direct vs framework flow on the same tasks; show quality, latency, cost and recovery differences. |

### Data and model operations

| Weeks | Selected resource | Assignment |
| --- | --- | --- |
| 17–18 | [MLOps orchestration](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/03-orchestration) | Backfill a missing period; prove duplicate handling and dataset lineage. |
| 19–20 | [Experiment tracking](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/02-experiment-tracking) | Compare two versioned models with unchanged splits; explain promotion criteria. |
| 21–22 | [Deployment](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/04-deployment) and [monitoring](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/05-monitoring) | Add batch scoring, test feature consistency and simulate drift vs corrupted data. |
| 23–24 | [MLOps best practices](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/06-best-practices) | Reproduce training-to-serving and rollback; show what the operational test does not establish. |

### Evaluation and design communication

| Weeks | Selected resource | Assignment |
| --- | --- | --- |
| 17–18 | [Retrieval Evaluation Lab](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/projects/retrieval-evaluation-lab) | Diagnose per-query regressions hidden by an aggregate improvement. |
| 19–20 | [Cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html), [answer rubric](./portfolio-practice#completion-gates) | Write a controlled offline experiment with untouched data, slice results and stop criteria. |
| 21–22 | [Upstream Career Practice](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md) | Run a peer design review and simulated incident; record actual feedback and an implemented improvement. |
| 23–24 | [Evidence record](./portfolio-practice#evidence-record) | Present the same decision to technical and nontechnical audiences; distinguish measured results from assumptions. |

## Exit assessment

Use **demonstrated / needs practice / not assessed / outside current scope** for API/data contracts, state/tools, evaluation, load budgets, recovery and communication. Attach run commands and actual test results. A reviewer should recreate the sandbox and one failed/recovered operation.

An offline experiment is not live A/B testing; a local container is not production operations; a practice discussion does not certify a language level. Keep customer information private and obtain authorization before sharing professional artifacts or operating outside the synthetic lab.

**Next:** [focused resources and verification limits](./learning-resources).
