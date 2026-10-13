---
sidebar_position: 6
title: "Project and Review Practice"
---

# Make your understanding visible

Use one learning-support workbench and three connected outcomes. One repository with clear commands and reports is enough.

| Outcome | Example | Minimum evidence |
| --- | --- | --- |
| Data/ML service | Organize synthetic questions by topic | Dataset provenance, baseline, split manifest, training script, API tests and model card |
| Grounded assistant | Answer questions using licensed reference documents | Versioned corpus/index, citations, abstention and separate retrieval/answer evaluation |
| Bounded workflow | Read-only question lookup and a draft for human review | Validated tool inputs, permissions outside the model, step/time budgets and failure traces |

C deepens these into a recoverable data product, reproducible training and an adaptation/retrieval comparison. Do not describe a synthetic project as a customer deployment.

## Completion gates {/* #completion-gates */}

These are **proposed teaching checks**, not universal benchmarks, compliance findings or a sufficient assessment for real deployment. Define workload and budgets before testing. Record missed thresholds honestly and improve before advancing.

| Gate | Acceptance check |
| --- | --- |
| Software | A reviewer can clone/run documented commands; CI passes; tests cover invalid inputs and API/database failures; no secrets in source. |
| ML | Recorded train/validation/test separation; preprocessing fits on training data only; baseline comparison, chosen metrics and failures on untouched data. |
| Retrieval | At least 50 labeled development queries and 30 untouched final-test queries, including answerable, unanswerable, stale/conflicting and malformed inputs. No final-test tuning. |
| Answers | Score correctness, citation support and abstention separately. Proposed targets: at least 90% supported factual claims and 80% correct abstention on unanswerable cases; publish counts and errors. |
| Tools | All protected-write attempts in the defined isolated test set are denied without valid approval. Include malformed arguments, hostile retrieved text, changed/replayed approval and exhausted budgets. |
| Operations | Record load, latency percentiles, cost/request, errors, model/config versions and date; demonstrate an upstream failure and working rollback. |
| Communication | Explain one failure and tradeoff without the tutorial; another person can reproduce one result and identify its limitations. |

Citation support = supported factual claims / scored factual claims; report **not applicable**, not 100%, when there are none. Correct abstention = correctly declined unanswerable questions / unanswerable questions. Report denominators and sample counts. Small test sets are noisy; retrieval metrics do not establish answer correctness.

Keep per-query results, not just averages. A finite test with zero denied-action escapes does not prove general security. Use isolated fixtures, synthetic identities and mock targets—never run protected-write tests on real systems without authorization.

## Evidence record {/* #evidence-record */}

Save this in your project README or milestone issue:

```text
Task and intended user:
Dataset/source, license and allowed use:
Baseline and alternatives:
Commit, dependency lock, model/configuration and run command:
Evaluation split, rubric, sample counts and results:
Latency, cost and failure observations:
Known limitations and next improvement:
Reviewer feedback (only if actually received):
```

Retain benchmark inputs/reports without secrets or personal data. Hosted-model outputs can vary; record timestamps and model identifiers. If no reviewer is available, mark independent reproduction **not assessed** rather than inventing a review.

## Review and explain {/* #review-and-explain */}

| Rhythm | Practice |
| --- | --- |
| Every week | Give a two-minute explanation of a concept, one failure and its fix. Save the example. |
| At each phase gate | Rebuild from documented commands, inspect test results and list unexplained behavior. |
| After a useful outcome | Ask someone to follow the quickstart; record actual friction and improve it. |
| At the end | Walk through the three outcomes; compare the first baseline with the final result and choose one next experiment. |

A case study can be short: **problem → baseline → experiment → result → limit → next step**. For example: “Built a documentation assistant over a licensed corpus; scored citation support on 30 held-out queries; documented timeout and rollback behavior.” Insert measured results only after measurement.

Label course completion, simulated exercises and real-world experience separately. Do not claim business savings, adoption or professional experience from a demo alone. The [capability guide](./capability-guide) helps identify what is demonstrated, still needs practice or has not been assessed.
