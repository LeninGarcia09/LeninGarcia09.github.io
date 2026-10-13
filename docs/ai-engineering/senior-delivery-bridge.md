---
sidebar_position: 9
title: "Senior Delivery Bridge: Production AI"
---

# Senior Delivery Bridge: from technical coverage to delivery evidence

**Audience:** experienced software/AI engineers targeting the [four audited EPAM roles](./epam-reality-check). **Proposed budget:** 24 weeks x 15 hours = **360 hours**: 16 shared weeks (240 hours) and **one** 8-week specialization (120 hours). This is additional to any foundations needed, not a promise of seniority. Allocate about 4 hours reading, 9 implementation/debugging, and 2 review/communication weekly.

Run the experience/region gate first. E1/E3 require 3+ professional software years and production AI; E2 explicitly requires 3+ production-software years including 1+ shipping LLM agents; E4 asks for 5+ AI/ML years. The bridge cannot award that experience.

## Admission and scope

Independently demonstrate a tested Python API, SQL joins/window functions, a containerized release, basic ML evaluation, a held-out RAG experiment, and one diagnosed CI/runtime failure. Reproduce missing foundations from A/C before admission.

Use one project: a **synthetic customer-support workbench** with document retrieval, ticket API integration, and a human-reviewed draft. The media branch can use the same API/job infrastructure for a licensed creative-asset workflow. No real customer integrations, writes, or security testing without explicit authorization.

Suggested common stack: a supported Python 3.12+ version compatible with dependencies, uv, Ruff, pytest, FastAPI/Pydantic/Uvicorn, PostgreSQL/pgvector, LangGraph, Docker, one cloud, IaC, and an evaluation/tracing tool. Choose compatible pinned versions; the posting's minimum Python version is not advice to freeze an unsupported interpreter.

Frameworks named as examples are not all mandatory. Implement one deeply and explain how its concepts map to another. Tool familiarity is not expertise.

## Shared weekly plan

| Week | Main work | Evidence and requirement mapping |
| --- | --- | --- |
| 1 | Baseline audit; type-safe package, uv lock, Ruff and pytest CI | Clean-clone commands, dependency/runtime versions; E3 |
| 2 | FastAPI async I/O, Pydantic contracts, Uvicorn lifecycle, error handling | Demonstrate blocked vs nonblocked I/O, cancellation, request timeout and graceful shutdown; E1/E3 |
| 3 | Request authentication, authorization, SQL migrations and tenant boundary | Negative-access tests and migration/rollback exercise; E3/E4 |
| 4 | Async request limits, bounded worker execution, idempotency and retries | Duplicate requests, upstream throttling and cancellation; evidence of no unbounded queue; E1/E3 |
| 5 | PostgreSQL/pgvector retrieval with lexical baseline and reranking | Persist/rebuild index, document update/delete tests, per-query quality deltas; E3/E4 |
| 6 | Experiment tracking and versioned Python evaluation harness | Prompt/model/data IDs; deterministic checks + manually calibrated model judges; E1/E3/E4 |
| 7 | LangGraph state, checkpointer and long-term store | Resume after process restart; session/tenant isolation; retention/delete checks; E2/E4 |
| 8 | MCP client/server, tool schemas, transport and authorization boundary | Contract tests for malformed/unauthorized tools; recorded protocol/SDK versions; E2/E4 |
| 9 | Bounded agent execution and human-reviewed draft workflow | Approval bound to payload/identity; altered/replayed approval denied; model cannot grant permissions; E2/E4 |
| 10 | Traces, cost attribution, errors and latency diagnostics | Explain a failing span, token-count method and slow path; redacted logs; E1-E4 |
| 11 | Load/soak experiment, retry storms, provider outage and fallbacks | Predeclared load/budgets, p95/p99, error rate, cost/task and user-visible degraded behavior; E1-E4 |
| 12 | Deploy/recreate via IaC in one sandbox cloud; secret handling | Reviewed plan, deployment and targeted teardown, least-privilege service boundary; E1/E3 |
| 13 | Container delivery and Kubernetes fundamentals | Local deployment, readiness/liveness, scaling and failed-update recovery; E3 requirement, transferable ops skill elsewhere |
| 14 | Release gate, incident and rollback rehearsal | CI blocks a seeded critical regression; incident timeline, recovery evidence and runbook; E1-E4 |
| 15 | Mock enterprise ticket/CRM API integration, backlog triage and client review | API/data contracts, failed integration recovery, ADR with alternatives/costs, actual feedback if received; E1/E3/E4 |
| 16 | Independent reproduction, system-design interview, English review | Reviewer recreates one failure/result; English demo and written incident brief; E2/E3 language, E3/E4 communication |

These are **selected readings and focused labs**, not full completion of every linked course. Extend the schedule when gates fail. Kubernetes practice is local first; a local cluster does not establish cloud-cluster production experience.

## Choose exactly one specialization

The four branches align to different jobs; do not combine them into an unrealistic eight-week checklist.

| Branch | Weeks 17-18 | Weeks 19-20 | Weeks 21-22 | Weeks 23-24 |
| --- | --- | --- | --- | --- |
| **Agentic / E2** | Port a bounded workflow to Strands; map AgentCore Runtime, Memory, Identity, Gateway, Observability | Deploy authorized sandbox runtime/tool integration; context budgets, short/long memory, deletion/isolation | Compare agent traces/evals under failed tools, lost state, timeout and unauthorized requests | Recreate deployment and explain all five primitives, cost/latency tradeoff and ramp-up evidence |
| **Python solution / E3** | Redis cache with tenant-scoped keys/TTL/invalidation; Kafka ingestion with duplicate/replay handling | PostgreSQL schema/data contracts and vector refresh; containerized integrations on local Kubernetes | Implement one LlamaIndex or PydanticAI slice and compare to the existing stack; HF datasets/tokenizers, sentence-transformers and ML library exercise | Client-style tradeoff review, integration failure rehearsal and delivery case study |
| **Media / E1** | HF diffusion theory/PyTorch prerequisites, licensed image generation and artifact provenance | Async generation job pipeline; one small image-to-video/video-generation API experiment with explicit budget | Versioned Python harness for prompt alignment, output format, quality and human review; compare model versions | AWS/GCP IaC deployment, throughput/cost test and rollback; explain media pipeline limitations |
| **Senior/Lead / E4** | Mock CRM/ERP contracts, independent-agent boundary; explain MCP vs A2A; clarify what employer means by ACP | Hypothesis, success/guardrail metrics and offline experiment; write controlled A/B plan | Lead a design review, scoped implementation tickets, review a peer change and handle a simulated incident | Technical/nontechnical client readout, migration/cost plan and verifiable leadership stories |

For the media branch, a diffusion image exercise does not prove video-model expertise; record the video experiment's actual model/API, limitations, licensing, and measured costs. Firefly/OpenCV/FFmpeg are optional posting-specific extensions. Training large diffusion/video models is not required.

For E3, study the conceptual mapping to the other named frameworks, dependency managers, vector databases and PyTorch/TensorFlow even when only one is implemented deeply. Record remaining breadth gaps rather than asserting proficiency across the entire catalog. TRL/DSPy/LiteLLM/UI work stays optional.

For E2's security-oriented responsibilities, use **mock scanners and synthetic tool outputs in an isolated lab**. Building exploit tooling or testing external systems is not part of this path. Security/pentesting background is a separate preference, not experience awarded by a lab.

For E4, an offline split or a simulated experiment is **not live A/B testing**. A real test needs authorized users, randomization, exposure/telemetry, sample-size reasoning, guardrails and an agreed stop rule. ACP is ambiguous without employer clarification; do not assume which specification or version applies.

## Evidence-based exit assessment

All thresholds here are proposed learning gates, not EPAM hiring criteria or proof of general security.

| Gate | Minimum defensible evidence |
| --- | --- |
| API/data | Type/contract tests; tenant-isolation failures denied; schema migration; duplicates/replay handled; no blocking I/O hidden in async handlers |
| Agent state/tools | Restart/resume, failed tool, budget exhaustion, memory isolation/delete, approval mutation/replay, malformed MCP inputs; enumerate test cases/results |
| Evaluation | Versioned baseline/candidate, development vs untouched test split; task success, tool correctness, citation support, failure cases and judge calibration; critical seeded regression fails CI |
| Performance | Declare concurrency, duration, workload, p95/p99, error and cost budgets before test; publish results and explain any missed budget rather than changing it after the run |
| Deployment/recovery | Reviewer recreates the sandbox from documented IaC/config; rehearsed failure and rollback; cleanup confirmed |
| Specialization | Demonstrate the chosen branch artifact; list unevaluated technologies and missing experience |
| Communication | 15-minute English design/troubleshooting discussion and a written brief with peer feedback; a practice exercise **does not certify B2** |
| Professional eligibility | Verifiable experience ledger, geography and actual role contributions; disclose any unmet requirement |

Do not call the learner "ready" because a checklist is checked. Use **demonstrated / needs practice / not assessed / external requirement unmet** per posting. Seek an independent code/design review and a separate language assessment if B2 level is unknown.

## Gaining real delivery evidence

Where authorized, own a bounded AI feature in current professional work: requirements, reviewed code, release, monitoring, support, incidents and a subsequent improvement. Work under the established human review and approval process. Record what actually happened and obtain permission before sharing any artifact.

If that opportunity is unavailable, target a suitable backend/AI integration role or clearly labeled project work. Do not count study time, a hosted demo, or lab uptime as years of professional production delivery. There is no fixed conversion from 360 learning hours to the posting's experience requirement.

**Resources and course purchasing decisions:** [verified research](./senior-resources). Certifications remain optional; skip exam weeks when technical or professional gaps are more consequential.
