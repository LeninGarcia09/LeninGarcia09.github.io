---
sidebar_position: 7
title: "Reference Review and Source Verification"
---

# Reviewing AI Engineering from Scratch

**Reviewed October 13, 2026:** the public [README](https://github.com/rohitg00/ai-engineering-from-scratch), [ROADMAP](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/ROADMAP.md), and [Career Practice guide](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md). This is a curriculum review, **not a code audit or verification of every lesson**. The links track a moving main branch.

## Keep the strongest parts

The README emphasizes implement/test/inspect work and offers concrete projects: Retrieval Evaluation Lab, Agent Trace Debugger, and Tool Call Firewall. The Career Practice guide already recommends **one coherent project, prerequisite checks, product judgment, feedback, and evidence rather than a job guarantee**.

Our path retains those ideas. We are not claiming the original lacks projects, career routes, or production practices.

## What changes, and why?

| Observed source characteristic | Proposed adaptation |
| --- | --- |
| Twenty phases span math, ML, vision, speech, transformers, agents, infrastructure, and alignment | Route by starting level and role; most application learners do not need every specialty before shipping |
| Python, TypeScript, Rust, and Julia appear in the repository | A uses Python + SQL first; add another language only for a target role |
| The ROADMAP gives both a roughly 332-hour headline and a roughly 1,081-hour footer, including a roughly 620-hour capstone phase | Treat source durations as internally inconsistent; publish separate learner budgets including project/review time |
| README advertises 528 lessons; ROADMAP footer lists 523 | Do not use lesson counts as a completion metric; counts were inconsistent at review time |
| Career Practice says guided lesson minutes exclude independent project and review time | Include those activities explicitly in the weekly budget; advance on gates |
| The assessed source pages focus on implementation and specialist routes, not an official-exam selection sequence | Add current provider verification, course/exam distinctions, one-cloud selection, and dated rechecks |

**Inference:** narrowing the prerequisite chain should reduce unnecessary work for an application-focused learner. We have not measured completion time or employment outcomes against the original.

## Selected reference lessons

Use these as a reference shelf, **not an additional course to finish in full**. Start with the linked README/ROADMAP for adjacent lessons and prerequisites.

| Stage | Source | Use |
| --- | --- | --- |
| Setup | [Phase 0](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/00-setup-and-tooling) | Git, environments, APIs, Docker, debugging |
| ML evaluation | [Model evaluation](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/02-ml-fundamentals/09-model-evaluation/docs/en.md) | Splits, metrics, baselines |
| Retrieval | [RAG](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/11-llm-engineering/06-rag/docs/en.md) and [Retrieval Evaluation Lab](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/projects/retrieval-evaluation-lab) | Implement retrieval and inspect per-query regressions |
| Agents | [Agent loop](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/01-the-agent-loop/docs/en.md) and [failure modes](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/26-failure-modes-agentic/docs/en.md) | Bounded runtime before multi-agent orchestration |
| Tool contracts | [Tool schema design](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/13-tools-and-protocols/05-tool-schema-design/docs/en.md) | Validate requests; explain trust boundaries |
| Operations | [Security, secrets, audit](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/17-infrastructure-and-production/25-security-secrets-audit/docs/en.md) | Secret handling, data minimization, audit evidence |
| Career | [Career Practice](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md) | One project, independent reproduction, feedback, ownership |

The Rust firewall and TypeScript trace-debugger projects are useful electives, not A prerequisites. Their README explicitly limits what their demonstrations establish; do not present them as a complete authorization system or sandbox.

## Primary-source verification register

| Source accessed | Supported fact | Limit |
| --- | --- | --- |
| [Harvard CS50P](https://cs50.harvard.edu/python/) and [CS50 SQL](https://cs50.harvard.edu/sql/) | Free OpenCourseWare; programming/testing and relational-data curricula | Certificate terms need separate confirmation |
| [Coursera ML Specialization](https://www.coursera.org/specializations/machine-learning-introduction) | Three-course program in collaboration with Stanford Online/DeepLearning.AI; supervised/unsupervised ML | No independent employment outcome established; checkout terms vary |
| [fast.ai](https://course.fast.ai/) | Free practical deep-learning course for coders; Part 1 page identifies 2022 recordings | Stable concepts may need current package/API documentation |
| [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/en/chapter1/1) | Free course; recommends good Python and introductory deep learning | Selected reading is not full completion |
| [AI-103](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/) and [study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103) | Python/Foundry application role and current exam domains | Scheduling, local price, language, and assessment availability must be rechecked |
| [Retired Azure AI Engineer credential](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/) | Certification and renewal assessment marked retired | Old learning material is not the current exam syllabus |
| [AWS ML Engineer Associate](https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/) | English C01 end date and C02 beta transition | Do not silently label the beta GA or assume result timing |
| [Google Professional ML Engineer](https://cloud.google.com/learn/certification/machine-learning-engineer) | ML/data platforms/pipelines/MLOps scope; coding not directly assessed | Region-specific demand and individual readiness not established |

All rows were accessed on **2026-10-13**. Source facts support subject coverage, **not a statistical ranking of credentials by employer value**.

## Market evidence and honest uncertainty

Microsoft and Google role descriptions support the skills selected, but provider descriptions are **not representative labor-market research**. No verified regional employer sample or causal credential-to-employment data was available for this learner. **Insufficient evidence available** to claim a salary premium, hiring probability, or universally best certification.

Use the [posting-sample method](./portfolio-career#career-work-begins-before-the-final-phase) to validate the path locally. Track role level, geography, posting date, required Python/SQL/ML/data/cloud skills, and required vs preferred credentials. Revise priorities monthly; do not infer senior-role eligibility from a certificate.

Recheck all official credentials before purchase and every quarter. Record changes, date, and source rather than silently replacing an exam code. This is an original study sequence referencing upstream work; it does not copy their lessons or claim provider endorsement.

## Subsequent employer evidence

The [EPAM reality check](./epam-reality-check), also dated October 13, 2026, adds four verified employer postings. This resolves the absence of a concrete employer sample for those roles, **not** the absence of representative regional market data or causal credential/employment evidence. The resulting [senior bridge](./senior-delivery-bridge) addresses explicit delivery gaps; individual readiness still requires assessment.
