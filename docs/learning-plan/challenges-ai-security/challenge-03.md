---
sidebar_position: 4
title: "Challenge 3 — Governance: NIST AI RMF + ISO 42001"
---

# Challenge 3: AI governance gap assessment (NIST AI RMF + ISO/IEC 42001)

> **Tool:** none — it is a **documentation artifact** · **Frameworks:** [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) + [ISO/IEC 42001](https://www.iso.org/standard/81230.html) · **Time:** 4–6 h

:::tip[What you will build]
An **executive gap assessment**: you take an organization (real or fictional), evaluate its AI governance maturity against NIST AI RMF and ISO/IEC 42001, and deliver a report with findings, risks, and a roadmap. This is exactly what an AI security consultant or AI Security Specialist does in their first quarter.
:::

**Where to run this:** in your text editor / document processor. **No code or tools required.** This challenge demonstrates your *advisory* and executive side — key for senior and consulting roles (Mandiant, MAPFRE, BBVA).

## Why it matters for employment

Several JDs literally ask for *"regulatory compliance (GDPR, LFPDPPP, EU AI Act, NIST AI RMF),"* *"AI governance and ethics,"* and *"maturity assessments with leadership recommendations."* This artifact is your direct proof. It also feeds the **[IAPP AIGP](../sources-and-verification#vendor-neutral-certifications-verified)** certification recommended by the plan.

## Steps

1. **Choose a subject.** A fictional company (e.g., "an insurer deploying a claims chatbot") or a real one with public information.
2. **Evaluate against the 4 NIST AI RMF functions:** *Govern, Map, Measure, Manage*. For each one, rate maturity (Nonexistent / Initial / Defined / Managed).
3. **Cross-check with key ISO/IEC 42001 controls** (AI policy, roles and responsibilities, AI risk management, lifecycle management, data management).
4. **Document gaps** — where it fails and why it is a risk (regulatory, reputational, operational).
5. **Prioritize a roadmap** (Now / 90 days / 12 months) with a suggested owner for each action.

<details>
<summary>Assessment table template (copy it)</summary>

| NIST AI RMF Function | Control / question | Maturity (0–3) | Gap / risk | Recommended action | Timeline |
|---------------------|--------------------|:-------------:|--------------|--------------------|-------|
| **Govern** | Is there an AI policy approved by leadership? | 1 | No executive ownership | Name AI owner + policy | Now |
| **Map** | Are AI systems and uses inventoried? | 0 | No inventory | Create AI system register | 90 days |
| **Measure** | Are bias and robustness tested before production? | 1 | Ad-hoc testing | Define evaluation suite | 90 days |
| **Manage** | Is there AI-specific incident response? | 0 | Does not exist | Extend IR playbook to AI | 12 months |

> The score is your documented professional judgment — the **justification** matters more than the number.
</details>

<details>
<summary>Quick map: regulation → NIST function it covers</summary>

| Regulation / framework | Where it impacts |
|--------------------|---------------|
| **EU AI Act** (risk classification) | Govern + Map |
| **GDPR / LFPDPPP** (personal data) | Map + Manage (see also [Challenge 4](./challenge-04)) |
| **NIST AI RMF** | all 4 functions |
| **ISO/IEC 42001** (AIMS) | Govern (management system) |

</details>

## 📦 Deliverable

A document `ai-governance-assessment.pdf` (or repo with `.md`) with:

1. **Executive summary** (1 page) — overall maturity level + top 3 risks.
2. Full assessment table (template above).
3. **Prioritized roadmap** with timelines and owners.
4. One paragraph explaining "which regulations apply and why."

## ✅ Success criteria

- [ ] Evaluated the **4 functions** of the NIST AI RMF.
- [ ] Referenced at least **3 ISO/IEC 42001 controls**.
- [ ] Every gap has **risk + action + timeline + owner**.
- [ ] The executive summary is understandable by a board (no technical jargon).

:::info[No cost]
NIST AI RMF is **free and downloadable**. ISO/IEC 42001 is paid, but for this challenge the public structure of the standard and official summaries are enough — you do not need to buy it to practice.
:::

---

**Previous:** [← Challenge 2](./challenge-02) · **Next:** [Challenge 4 — PII Detection with Presidio →](./challenge-04)
