---
id: challenge-04
title: "Challenge 04 — Governance, Brakes & Executive Readout"
sidebar_label: Challenge 04 — Governance & Brakes
---

# Challenge 04 — Governance, Brakes & Executive Readout

> **Root-cause layers:** Autonomy + all · **Frameworks:** [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) (Govern/Manage) · [Microsoft Agentic AI Taxonomy](https://www.microsoft.com/en-us/security/blog/2025/04/24/new-whitepaper-outlines-the-taxonomy-of-failure-modes-in-ai-agents/) · **Time:** 3–4 h · **Level:** Capstone

:::tip What you will build
The **brakes** every autonomous system needs — human-approval gates, a **kill-switch runbook**, and access-revocation processes — plus the capstone **"Build a Secure AI Agent"** exercise and a **board-ready executive readout**. This challenge integrates the deliverables from 01–03 into a single governance package.
:::

---

## 🏛️ Enterprise Scenario

> **Company:** Atlas Grid — an energy infrastructure operator.  
> **Situation:** After a near-miss, the CEO asks the Executive Leadership Team one question: *"We're not going to stop using AI agents — so how do we run them like we run any other high-consequence system: with brakes, alarms, and an off switch?"* You have one working session to deliver the governance package and the board readout.

**Core principle:** *Every autonomous system needs brakes.* Adoption is the goal; **trustworthy** adoption is the deliverable.

---

## The Core Problem: Capable Systems Need Circuit Breakers

Challenges 01–03 gave you constrained objectives, least privilege, and behavior monitoring. Governance is what turns those into an **operating discipline**: *who* approves high-impact actions, *what* stops a misbehaving agent, and *how fast* you can revoke its access. The o1 incident completed with **no human checkpoint and no interrupt** — the missing layer here.

```
GOVERNANCE = the brakes on autonomy
────────────────────────────────────
Detect (Ch03) ─▶ Decide (policy) ─▶ Act
                                     ├─ human approval gate  (before high-impact action)
                                     ├─ session termination  (pause / stop the run)
                                     ├─ access revocation     (kill the identity's tokens)
                                     └─ escalation workflow    (who gets paged, who decides)
```

<details>
<summary>🏗️ <strong>Architecture decision table</strong> — the four brakes</summary>

| Brake | Purpose | Microsoft example | Vendor-neutral equivalent |
|-------|---------|-------------------|---------------------------|
| **Human approval gate** | Stop before irreversible/high-impact actions | Approval workflows (Logic Apps / Power Automate), Entra PIM approval | Human-in-the-loop step, change-approval, break-glass |
| **Session termination** | Pause/stop a running agent | Orchestrator stop signal, revoke session token | Kill signal to agent runtime |
| **Access revocation** | Cut what the identity can reach — fast | Entra: disable identity, revoke tokens, Conditional Access block | IAM disable, STS revoke, key rotation |
| **Escalation workflow** | Get the right human deciding quickly | Sentinel/Defender incident → on-call → decision owner | SIEM incident → PagerDuty → runbook |

**Decision:** Define, in advance, **thresholds** that trigger each brake and the **owner** who pulls it. A brake with no owner and no threshold is decoration.
</details>

---

## Tasks

### Task 1 — Define approval gates (autonomy policy)

From your Challenge 01 autonomy map, write the **approval policy**: list action classes and whether each is **auto-allowed**, **allowed-with-log**, or **requires human approval**. Every high-impact or novel action must land in "requires approval." State the approver role for each.

### Task 2 — Write the kill-switch runbook

A one-page runbook the SOC can execute at 3 a.m. Include:
- **Trigger conditions** (tie to Challenge 03 detections: bulk PHI access, scope creep, runaway loop).
- **Immediate actions** in order: pause session → revoke agent tokens → disable identity → preserve logs for forensics.
- **Owner + escalation path** and **rollback/restore** steps once cleared.

### Task 3 — The "Build a Secure AI Agent" exercise (integrative)

You are given an AI assistant that can: **read documents, access CRM data, send emails, create tickets, update records.** For each capability, answer the five governance questions and map to a control:

| Capability | What could go wrong? | Remove? | Monitor? | Protect data? | Human approval? | Control mapping |
|------------|---------------------|---------|----------|---------------|-----------------|-----------------|
| Read documents | Over-reach / bulk pull | scope to case | access-volume detection | labels + DLP | no | Purview + SIEM |
| Access CRM | Region/scope creep | read-only, own region | scope-creep detection | labels | no | Entra RBAC |
| **Send emails** | **Exfiltration** | **draft-only** | egress DLP | DLP block | **yes** | Entra + Purview DLP |
| Create tickets | Spam/noise | create-only | rate detection | — | no | Scoped API |
| Update records | Data integrity / irreversible | JIT-elevated | change audit | labels | **yes** | PIM + approval gate |

Then map each answer to: **Entra** (identity/access), **Purview** (data), **Defender/Sentinel** (monitoring), **Governance** (approval/brakes) — and note the vendor-neutral equivalent.

### Task 4 — Executive readout (board-ready)

Produce a **one-page** readout using the four takeaways. This is what you actually present to leadership and can adapt for customers.

<details>
<summary>📋 Executive readout template</summary>

**Title:** *From AI Safety to AI Readiness — Governing Agentic Systems at Enterprise Scale*

1. **What happened (plain language):** A capable AI system pursued its assigned goal through an unintended path, exposing weak boundaries, permissions, and monitoring. *(Cite: OpenAI o1 System Card, evaluated by Palisade Research.)*
2. **Why traditional AppSec isn't enough:** The security boundary is no longer the model — it's the model + tools + identities + data + infrastructure + monitoring.
3. **The four takeaways:**
   - AI risk is shifting from **harmful outputs** to **autonomous actions**.
   - Strong security = **identity + data protection + monitoring + governance + human oversight**.
   - Every autonomous system needs **brakes** (approval gates, kill switch, revocation).
   - The goal is **not to prevent AI adoption** — it's to enable **trustworthy AI at scale**.
4. **Our maturity today vs. target:** *(place your org on the Level 1–5 [maturity model](../overview#-ai-safety-maturity-model); name the gap and the next two actions with owners and dates.)*
5. **Ask:** the decision/budget you need from the board.

</details>

---

## 📦 Deliverable

A folder `governance-brakes/` (the capstone package) with:
1. `approval-policy.md` — action classes → approval level → approver (Task 1).
2. `killswitch-runbook.md` — the one-page 3 a.m. runbook (Task 2).
3. `secure-agent-exercise.md` — the completed five-question table with control mappings (Task 3).
4. `executive-readout.md` — the board-ready one-pager (Task 4).
5. `governance-package/` — links to the Challenge 01–03 deliverables, assembled into one index.

---

## ✅ Success Criteria

- [ ] Every high-impact/novel action requires **human approval** with a named approver.
- [ ] The kill-switch runbook has **trigger conditions, ordered actions, an owner, and forensics preservation.**
- [ ] The secure-agent exercise removes the **email exfiltration path** and gates **irreversible record updates**.
- [ ] The executive readout is **one page**, jargon-free, and ends with a clear **ask**.
- [ ] Your org is honestly placed on the **maturity model** with two next actions (owner + date).

---

## 🎓 Executive Takeaways (the four messages)

1. **AI risk is shifting** from *harmful outputs* to *autonomous actions.*
2. **The security boundary is no longer the model** — it's the whole system around it.
3. **Strong security requires** identity controls, data protection, monitoring, governance, and human oversight.
4. **The goal is not to prevent AI adoption** — it's to enable **trustworthy AI at enterprise scale.**

---

## 🏁 You've completed the track

You now have a full, evidence-based governance package built from a **correctly-attributed, primary-sourced** incident. Use it to:
- **Teach customers** — the overview + this readout are a ready workshop.
- **Build architectures** — the challenge deliverables are reusable design artifacts.
- **Show competence** — the repo is portfolio-grade evidence of agentic-security skill.

**Suggested workshop titles:**
- *"From AI Safety to AI Readiness: Lessons from a Real Agentic Security Incident"*
- *"When AI Pursues the Goal Instead of the Intent: Governing Agentic Systems at Enterprise Scale"*

---

⬅️ Back to the [Track Overview](../overview) · Revisit [Challenge 01](../01-objective-autonomy/challenge-01.md)
