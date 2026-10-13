---
sidebar_position: 8
title: "Capability and Readiness Guide"
---

# Choose the next step from evidence, not labels

This guide assesses learning progress across transferable capabilities. It is not an employer audit, hiring rubric or declaration of professional readiness.

Use four states: **demonstrated**, **needs practice**, **not assessed** and **outside current scope**. “Demonstrated” means you can run and explain the artifact—not merely recognize the vocabulary.

## A practical capability map

| Capability | A/B evidence | C adds | Optional delivery practice |
| --- | --- | --- | --- |
| Software foundations | Tested file/API workflow, SQL, reproducible environment and CI | Training/serving contracts and feature consistency | Async failure handling, isolation and recoverable requests |
| Data | Provenance, schema, duplicates and document updates | Incremental ingestion, backfill, schema evolution, quality and lineage | Integration contracts and access-filter tests |
| ML judgment | Baselines, clean splits, metrics and error analysis | Training, uncertainty, model selection, artifacts and experiment tracking | Release evaluation gates and failure diagnosis |
| Grounded answers | Retrieval labels, citations, abstention and held-out scoring | Same-task retrieval/adaptation comparisons | State isolation and evaluation during recovery |
| Bounded workflows | Read-only tools, validated arguments and budgets | Add only when useful to the project | Persistence, restart/resume, protocol contract and approval tests |
| Operations | Sandbox release, monitoring and rollback | Training-to-serving recovery and drift vs data-bug diagnosis | Load experiments, reproducible configuration and incident rehearsal |
| Explanation | Reproducible case studies and honest limitations | Connected data/training/serving decisions | Design review, recovery brief and feedback-driven improvement |

## A 30-minute self-check

1. Run the project from its documented commands.
2. Change one input to cause a failure; predict and explain the behavior.
3. Reproduce one held-out evaluation result without retuning.
4. Identify the data/permission boundary and one important limitation.
5. Ask a reviewer to repeat one step, if available. Record only feedback actually received.

For each capability, note **artifact → command/test → result → gap → next exercise**. Pick one gap, not a new framework list.

## Which route fits now?

- Missing programming fundamentals? Use [B](./path-b).
- Comfortable with basic Python but new to complete AI applications? Use [A](./path-a).
- Already delivering software and want deeper ML/data/training? Use [C](./path-c).
- Foundations and evaluation already demonstrated, but recovery/state/integration are weak? Select [delivery practice](./delivery-practice).
- Practical gates passed and a credential has a clear purpose? Use [current official credential checks](./credentials#when-to-pay-for-an-exam).

A local sandbox or simulated incident does not establish real production experience. Independent review, relevant operational history and task-specific authorization remain separate from study completion. No fixed number of learning hours implies seniority, expertise or employment.
