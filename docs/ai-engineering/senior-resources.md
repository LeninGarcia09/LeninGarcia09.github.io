---
sidebar_position: 10
title: "Research: Senior AI Engineering Resources"
---

# Research supporting the senior-role enhancements

**Primary resources accessed October 13, 2026.** These selections address gaps in the [EPAM audit](./epam-reality-check), not a new prestige ranking. Official documentation is often more useful than another broad certificate for changing runtime/framework APIs.

## Courses: keep the academic foundation, add delivery depth

| Resource | Why it belongs | Prerequisites/access and limit |
| --- | --- | --- |
| [Generative AI with LLMs, DeepLearning.AI course](https://www.coursera.org/learn/generative-ai-with-llms) | Lifecycle, training/tuning, evaluation, deployment; useful gap-based extension to C | Intermediate Python and basic ML/splits; verify current paid access/certificate terms; not a production-agent course |
| [Hugging Face Diffusion Models Course](https://huggingface.co/learn/diffusion-course/en/unit0/1) | E1: diffusion theory, image generation, guidance, custom pipelines | Free; good Python, deep learning and PyTorch required; page says no current course certification; video deployment needs a separate exercise |
| [DataTalks.Club MLOps Zoomcamp](https://github.com/DataTalksClub/mlops-zoomcamp) | C/bridge: experiment tracking, deployments, monitoring, tests, CI and Terraform | Free self-paced; Python, Docker, ML, CLI and programming experience recommended; page says no 2026 live cohort and **no self-paced certificate** |

Use selected modules for a failed gate rather than restarting familiar foundations. The bridge's 360 hours do not include full completion of all three courses. Course certificates do not satisfy the postings' professional tenure.

## Official implementation references

| Skill gap / bridge stage | Source accessed | What to practice |
| --- | --- | --- |
| Async backend, weeks 1-4 | [FastAPI concurrency](https://fastapi.tiangolo.com/async/) | Distinguish I/O concurrency from CPU parallelism; demonstrate blocking, timeout and cancellation behavior |
| Dependency/code quality, week 1 | [uv projects](https://docs.astral.sh/uv/guides/projects/), [Ruff](https://docs.astral.sh/ruff/) | Project metadata, environment/lockfile, lint/format CI; neither tool replaces tests |
| Vector infrastructure, week 5 | [pgvector](https://github.com/pgvector/pgvector) | Exact/approximate search, SQL integration, persistence, index/query tradeoffs |
| Embeddings/reranking, week 5 and E3 | [SentenceTransformers](https://sbert.net/) | Embedding and cross-encoder model use; measure relevance/latency instead of assuming a model is better |
| Durable agents, weeks 7-9 | [LangGraph persistence](https://docs.langchain.com/oss/python/langgraph/persistence), [interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts) | Persistent checkpoints vs long-term stores, restart/resume, external review; interrupt alone is not authorization |
| Protocol integration, week 8 | [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) | Host/client/server, tools and transport boundaries; pin SDK/protocol version |
| Evaluation, week 6 onward | [MLflow GenAI evaluation](https://mlflow.org/docs/latest/genai/eval-monitor/) | Versioned evaluation inputs, scorers and baseline/candidate reports; validate model judges against human labels |
| Deployment, weeks 12-14 | [Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/), MLOps Zoomcamp above | Deploy, scale, update and debug containers; reviewed IaC plan and rollback/teardown |
| E2 runtime/framework | [AgentCore overview](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html), [Strands repository](https://github.com/strands-agents/harness-sdk) | Runtime/Memory/Identity/Gateway/Observability; bounded SDK loop, MCP, trace and evaluation integration |
| E3 streaming/cache | [Kafka quickstart](https://kafka.apache.org/quickstart/), [Redis development](https://redis.io/docs/latest/develop/) | Producer/consumer lifecycle, duplicate/replay behavior; cache lifecycle and invalidation; quickstart alone is not operational mastery |
| E4 protocols | [A2A overview](https://a2a-protocol.org/latest/) | Agent-to-agent communication vs MCP tool integration; do not build multiple agents without a need |

## Source currency and verification limits

The Strands `sdk-python` repository redirected to `harness-sdk`; old documentation paths returned 404. The accessible repository is the source used here. LangGraph's durable-execution link redirected to persistence documentation. Verify current release/API semantics before implementing; do not copy outdated import paths from a tutorial.

AgentCore is not simply the older "Agents for Amazon Bedrock" feature. The inspected AgentCore developer guide lists the modular services named in E2. Availability, supported regions, identity integration, pricing and release status must be checked for each capability before a deployment; presence in a documentation table does not establish every feature's availability.

HashiCorp tutorial landing pages were reachable but exposed only titles through the page extractor; no detailed instructions from those pages are claimed as verified. Terraform is supported as a learning topic by the inspected MLOps Zoomcamp curriculum.

No extra professional exam is added as a requirement. Retain [existing credential choices](./credentials) when a different target job values them; for these four vacancies, prioritize delivery evidence and technical/English readiness first.

**Unknown:** the learner's actual skill level, EPAM's interview rubric, flexibility on years of experience, interpretation of ACP, hiring conversion rates and preferred certificates. Confirm those with assessment or the employer, not a course provider.
