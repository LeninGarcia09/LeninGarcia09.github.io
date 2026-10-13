---
sidebar_position: 10
title: "Focused Learning Resources"
---

# A reference shelf for a specific question

The weekly assignments in A/B/C and delivery practice already tell you what to open. Use this shelf **only to revisit a concept or select optional depth**, not as another checklist.

**Selected content accessed October 13, 2026.** Sources are educational/provider documentation and a supplementary open curriculum; availability does not imply endorsement, mastery or a ranking.

| Question | Selected resource | Small useful exercise |
| --- | --- | --- |
| Can I explain and test a Python function? | [CS50P Unit Tests](https://cs50.harvard.edu/python/weeks/5/), [pytest Get Started](https://docs.pytest.org/en/stable/getting-started.html) | Write a failing test, fix the function and explain the assertion. |
| Why did my SQL join duplicate rows? | [CS50 SQL Relating](https://cs50.harvard.edu/sql/weeks/1/), [Designing](https://cs50.harvard.edu/sql/weeks/2/) | Inspect keys/cardinality; test a constraint and rewrite the query. |
| Is validation leaking information? | [scikit-learn common pitfalls](https://scikit-learn.org/stable/common_pitfalls.html), [cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html) | Split before fitting preprocessing; compare leaked and clean validation results. |
| How does text become model input? | [HF Tokenizers](https://huggingface.co/learn/llm-course/en/chapter2/4) | Compare tokenization for two languages and a long input. |
| How do I train on my own data? | [HF Datasets](https://huggingface.co/learn/llm-course/en/chapter5/1), [fine-tuning introduction](https://huggingface.co/learn/llm-course/en/chapter3/1) | Run a small classification exercise after the Python/deep-learning prerequisites. |
| Why did retrieval get worse for one query? | [Retrieval Evaluation Lab](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/projects/retrieval-evaluation-lab) | Validate labels/rankings and inspect the per-query delta; generation needs separate evaluation. |
| Does async make CPU work faster? | [FastAPI concurrency](https://fastapi.tiangolo.com/async/) | Demonstrate I/O waiting vs CPU work; measure rather than assuming. |
| How do I keep vectors with relational data? | [pgvector](https://github.com/pgvector/pgvector) | Insert, search, update and delete; compare exact/approximate search before adding an index. |
| How do I reproduce an experiment? | [MLflow tracking](https://mlflow.org/docs/latest/ml/tracking/), [MLOps experiment module](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/02-experiment-tracking) | Log data/code/model IDs, metrics and artifacts; rerun from recorded commands. |
| What should survive a workflow restart? | [LangGraph persistence](https://docs.langchain.com/oss/python/langgraph/persistence), [interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts) | Test durable checkpoints, session isolation and external review; review alone does not authorize actions. |
| What does a tool protocol provide? | [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) | Explain host/client/server and validate one local read-only tool; pin the SDK/protocol version. |
| What happens after release? | [MLOps deployment](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/04-deployment), [monitoring](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/05-monitoring), [best practices](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/06-best-practices) | Monitor a small sandbox, seed a failure and rehearse rollback/teardown. |

## Optional depth

After C's training gate, selected [fast.ai](https://course.fast.ai/) lessons can deepen practical modeling; the [HF LLM course](https://huggingface.co/learn/llm-course/en/chapter1/1) points to more advanced training chapters. Follow their prerequisites and budget additional time. Large-model training, multiple orchestration frameworks, distributed infrastructure and media generation are outside the core.

## Read tutorials critically

The upstream RAG lesson includes broad cost, privacy and superiority claims. We use its pipeline explanation, **not those claims as universal facts**: compare cost/quality on your data, and remember hosted prompts can transmit retrieved passages. Upstream lesson prerequisites are broader than this route; selected conceptual reading does not mean completion of the upstream phase.

MLOps recordings/examples and fast.ai material may use older dependencies. Pair them with current official APIs, pin compatible versions and do not expose demo services publicly by default. The upstream retrieval runner has POSIX-dependent functionality; use an appropriate environment and record actual checks.

Public-page verification does not validate every code block, linked video, exercise runner, dependency or paid/sign-in experience. See [verification scope](./source-review#verification-limits) and [credential checks](./credentials).
