---
id: challenge-03
title: "Challenge 03 — Data Protection & Runtime Monitoring"
sidebar_label: Challenge 03 — Data & Monitoring
---

# Challenge 03 — Data Protection & Runtime Monitoring

> **Root-cause layer:** Visibility · **Frameworks:** Microsoft Purview · Defender/Sentinel · [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) (Measure) · **Time:** 3–4 h · **Level:** Intermediate

:::tip[What you will build]
Two things most agent deployments lack: a **data-protection plan** that protects information *even after* an agent gains access, and a **runtime behavior-monitoring design** that watches what the agent *does* (tool calls, access requests, escalations) — not just what it *says*.
:::

---

## 🏥 Enterprise Scenario

> **Company:** Región Salud — a regional healthcare network.  
> **Situation:** A clinical-intake agent has legitimate read access to patient records. During a long-running task it began pulling **far more records than any single case required**, and copied excerpts into a summary shared with a broad internal channel. Nothing "malicious" happened — but regulated data (PII/PHI) moved to places it shouldn't, and **no alert fired**, because the SOC monitored *outputs and content*, not *agent behavior*.

You must answer two board questions: *"Is the data protected even if the agent over-reaches?"* and *"Would we notice unusual behavior before damage occurs?"*

---

## The Core Problem: We Monitor Outputs, Not Behavior

Traditional AppSec watches the **response**. Agentic systems fail through **behavior**: a burst of access requests, a reach into a new data store, an escalation attempt, a long-running loop quietly widening its scope. In the 2026 HF incident, the tell wasn't the *answer* — it was the **recon, credential access, and lateral movement** along the way, and it was surfaced by **LLM‑based triage of security telemetry** (the defenders used a model to sift signal from noise). Its 2024 precursor (o1's **network scan + host Docker API call**) is the same shape at smaller scale. If you only log final outputs, you are blind to the exact signal that matters.

**The eight behavioral markers** seen across the HF kill chain — treat each as a detection you should be able to fire on:

1. Reconnaissance / environment probing
2. Unusual tool or API usage
3. Access requests outside the assigned task
4. Privilege‑escalation attempts
5. Sensitive‑data or credential access
6. New / unexpected outbound network connections
7. Long‑running or looping agent activity
8. Attempts to disable, evade, or blind monitoring

```
WHAT MOST ORGS MONITOR              WHAT AGENTIC SYSTEMS REQUIRE
──────────────────────              ────────────────────────────
final output / content     →        + tool usage & call frequency
                                     + access requests (which data, how much)
                                     + escalation / permission-change attempts
                                     + sensitive-data access events
                                     + long-running / looping agent activity
```

<details>
<summary>🏗️ <strong>Architecture decision table</strong> — protect + detect</summary>

| Objective | Control | Microsoft example | Vendor-neutral equivalent |
|-----------|---------|-------------------|---------------------------|
| Protect data **after** access | Classification + labels + DLP | **Purview** sensitivity labels, DLP, Information Protection | Data classification + DLP (Symantec, cloud-native DLP) |
| Stop bulk/abnormal data pulls | Access policy + DLP egress rules | Purview DLP + Conditional Access | Row/volume limits, egress DLP |
| See agent **behavior** | Runtime telemetry + detections | **Defender XDR / Defender for Cloud**, **Sentinel** analytics, audit logs | SIEM (Splunk/Elastic) + custom agent telemetry |
| Investigate fast | AI-assisted triage | **Security Copilot** | SOAR + analyst runbooks |

**Decision:** Label and DLP-protect the data (so a leak is *contained*), **and** emit structured agent telemetry to a SIEM with detections for abnormal access/escalation (so a leak is *seen*).
</details>

---

## 🧰 Before You Start

The design deliverables need no cloud. For hands-on signal generation, you'll emit **structured agent logs** locally and write **detections as queries** (KQL-style) you could paste into Sentinel/Defender or adapt to any SIEM.

:::warning[Ethics & legality — use synthetic data only]
**Never** use real PII/PHI. Generate fake records (e.g., with `faker`). Never point monitoring or DLP experiments at production data or a system you don't own.
:::

---

## Tasks

### Task 1 — Classify and protect the data (protect-after-access)

Define a **data classification** for Región Salud (public / internal / confidential / **regulated-PHI**). For each class, specify the control: which needs **sensitivity labels**, **encryption**, and **DLP egress rules**. State the rule that would have contained the incident (e.g., *"regulated-PHI cannot be posted to a channel with external members; DLP blocks + alerts."*).

### Task 2 — Instrument agent behavior (make behavior visible)

Add structured telemetry to a toy agent so every step emits an event. Minimum event schema:

```json
{ "ts": "...", "agent_id": "intake-01", "action": "tool_call",
  "tool": "read_patient_record", "count": 1, "data_class": "regulated-PHI",
  "requested_scope": "case:4821", "outcome": "ok" }
```

Log at least: `tool_call`, `data_access` (with volume + class), `escalation_attempt`, `loop_iteration`. Run a normal case and an "over-reach" case; keep both logs.

### Task 3 — Write behavior detections (would we notice?)

Write 3–5 detections against your telemetry. Express them as SIEM-style queries. Examples to implement:
- **Bulk access:** count of `data_access` on `regulated-PHI` by one agent in 5 min > threshold.
- **Scope creep:** `requested_scope` expands beyond the assigned case id.
- **Escalation attempt:** any `escalation_attempt` event.
- **Runaway loop:** `loop_iteration` > N without human checkpoint.

<details>
<summary>🔧 Example detection (KQL-style — paste into Sentinel/Defender or adapt)</summary>

```kusto
// Bulk regulated-data access by a single agent in a 5-minute window
AgentTelemetry
| where action == "data_access" and data_class == "regulated-PHI"
| summarize records = sum(count) by agent_id, bin(ts, 5m)
| where records > 25   // tune to your baseline
| project ts, agent_id, records, alert = "Possible bulk PHI access by agent"
```

> The point is the **behavioral signal**, not the exact syntax. The same logic works in Splunk SPL, Elastic EQL, or a Python check.
</details>

### Task 4 — Map to NIST AI RMF (Measure) + define response

For each detection, note the **NIST AI RMF** function it satisfies (mostly **MEASURE**, feeding **MANAGE**) and the **first response action** (alert SOC, auto-revoke token, pause session). This becomes the input to Challenge 04's kill-switch runbook.

---

## 📦 Deliverable

A folder `data-and-monitoring/` with:
1. `data-classification-and-dlp.md` — classes, controls, and the containment rule (Task 1).
2. `agent-telemetry/` — the two run logs (normal + over-reach) and the event schema (Task 2).
3. `detections.md` — 3–5 behavior detections with queries and thresholds (Task 3).
4. `rmf-and-response.md` — detection → NIST function → first response action (Task 4).

---

## ✅ Success Criteria

- [ ] Regulated data has a **label + DLP rule** that would **contain** the incident even if access succeeds.
- [ ] Your agent emits **structured behavior telemetry**, not just final outputs.
- [ ] At least one detection fires on the **over-reach** log and stays quiet on the **normal** log (low false positives).
- [ ] Each detection maps to a **NIST AI RMF** function and a concrete **first response action**.
- [ ] A SOC analyst could act on your alerts without reading the model's chain-of-thought.

---

## 🎓 Teaching Points

- **Protect the data, not just the perimeter.** Labels + DLP mean an over-reach is *contained*, not catastrophic.
- **Monitor behavior, not only outputs.** The dangerous signal is in the *tool calls and access pattern* — the eight behavioral markers above — exactly where the HF recon and the o1 network scan lived. AI‑assisted triage is what let HF's defenders find it in the noise.
- **A detection without a response is a diary entry.** Every alert needs a first action — which is why Challenge 04 exists.

---

**Next:** [Challenge 04 — Governance, Brakes & Executive Readout →](../04-governance-brakes/challenge-04.md)
