---
sidebar_position: 6
title: "Portfolio, Gates, and Career Execution"
---

# Show the work, not just the certificates

Use one domain and three connected outcomes. Separate repositories are optional; one well-organized repository with independent commands and reports is sufficient.

| Outcome | A/B example | Minimum evidence |
| --- | --- | --- |
| Data/ML service | Public/synthetic support-ticket classifier | Dataset provenance, baseline, split manifest, training script, API tests, model card |
| Grounded assistant | Answers from public product documentation | Versioned corpus/index, source citations, abstention, retrieval and answer evaluation |
| Bounded workflow | Read-only ticket lookup and suggested draft response | Validated tool inputs, permissions outside the model, step/time budgets, failure traces, approval boundary |

C substitutes the deeper [data/ML projects](./path-c#three-connected-projects). Do not represent synthetic workflows as customer deployments.

## Concrete learning gates

These are **proposed teaching thresholds**, not industry benchmarks, proof of compliance, or a sufficient safety assessment for real deployment. Adapt performance budgets to the task before testing and document changes.

| Gate | Acceptance check |
| --- | --- |
| Software | A reviewer can clone and run documented commands; CI passes; tests cover invalid inputs and API/database failures; no secrets in source |
| ML | Train/validation/test separation is recorded; preprocessing fits only on training data; compare a simple baseline; report selected metrics and failures on held-out data even if performance is poor |
| Retrieval | At least 50 labeled development queries plus 30 untouched final-test queries, covering answerable, unanswerable, stale/conflicting, and malformed inputs; no tuning on final-test queries |
| Answers | On the final-test set, manually score correctness, citation support, and abstention separately; target at least 90% citation support among factual claims and at least 80% correct abstention on unanswerable cases |
| Tools | Every protected-write attempt in the defined test set is denied without valid approval; include changed/replayed approval and injection cases; zero successes in this finite set is not proof of general security |
| Operations | Record latency percentiles, cost per request, error rate, model/config versions, load, and date; set budgets before measurement; demonstrate one upstream failure and a working rollback |
| Communication | Explain a failure and tradeoff without the tutorial; a second person can reproduce one result and identify the known limitations |

Define denominators and sample counts. Citation support is supported factual claims divided by scored factual claims; report it as not applicable, not 100%, if there are none. Correct abstention is correctly declined unanswerable questions divided by unanswerable questions. Retrieval metrics alone do not establish answer correctness. Keep per-query results, not only averages.

Do not send protected-write tests to real systems. Use isolated fixtures, synthetic identities, and a mock tool target. The model may propose a write; authorization and approval remain outside it.

## A reusable evidence record

For each milestone, record these fields in your project README or issue:

```text
Task and intended user:
Dataset/source, license, and allowed use:
Baseline and alternatives:
Commit, dependency lock, model/configuration, and run command:
Evaluation split, rubric, sample counts, and results:
Latency, cost, and failure observations:
Known limitations and next improvement:
Independent reviewer feedback (only if actually received):
```

Keep raw benchmark inputs and output reports, but remove secrets and personal data. If using hosted APIs, document that outputs may vary and record run timestamps.

## Career work begins before the final phase

| When | Action | Useful evidence |
| --- | --- | --- |
| Week 1 and monthly | Review 10 current employer postings in your region/level; distinguish must-have from nice-to-have | Dated skill matrix and reasons for selecting one cloud |
| Weekly | One technical explanation, code review, or professional conversation | Feedback or a learning note; not an invented endorsement |
| After ML gate | Publish the project and ask for a practical review | Reproduction issues and changes made |
| After deployment gate | Apply when role requirements match; practice Python, SQL, ML errors, and AI system design | Tailored applications, mock-interview gaps |
| Every two weeks while applying | Compare applications, screens, and feedback | Revise portfolio/CV or role targeting based on evidence |

Do not optimize for application volume alone. Use a private tracker with role URL, date, requirements, match/gaps, stage, feedback, and next action. Record real feedback, not inferred rejection reasons.

## Credible CV language

Prefer: "Built an evaluated documentation assistant using a public corpus; measured citation support on 30 held-out queries; documented timeout and rollback behavior." Insert actual results only after measuring them.

Avoid: "Production AI engineer," "reduced company costs by 40%," or "Stanford certified ML engineer" when you have only a course and a synthetic project. Use the exact issuer and credential name and label project experience honestly.

**Employment remains uncertain.** Region, prior experience, communication, degree requirements, work authorization, and employer demand can affect outcomes. The plan creates inspectable skills and evidence, not a placement promise.

## Senior roles need a separate evidence bar

The [EPAM audit](./epam-reality-check) adds professional tenure, production AI delivery, role-specific integrations, and client ownership to the teaching gates above. Use the [bridge exit assessment](./senior-delivery-bridge#evidence-based-exit-assessment) for experienced candidates; do not treat the small A/B test set as proof of senior operational capability.

Maintain a private experience ledger and separate **demonstrated skills, simulated exercises, not assessed skills, and unmet external requirements**. Practice design reviews and incident explanations in English; get a separate language assessment where B2+ is required. Preserve customer confidentiality and obtain permission before sharing professional evidence.
