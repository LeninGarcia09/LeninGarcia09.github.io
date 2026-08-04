---
id: challenge-02
title: "Challenge 02 — Permission & Blast Radius"
sidebar_label: Challenge 02 — Permission & Blast Radius
description: "Treat the agent like a digital employee: design least-privilege identity, cut standing permissions to Just-in-Time, and shrink the blast radius with a before/after diagram."
tags:
  - challenge
  - tutorial
  - agentic-security
  - identity
  - least-privilege
  - intermediate
---

# Challenge 02 — Permission & Blast Radius

> **Root-cause layer:** Permission · **Frameworks:** Microsoft Entra ID · Zero Trust · [MITRE ATLAS](https://atlas.mitre.org/) · **⏱ Time:** 3–4 h · **Level:** 🟡 Intermediate · **Type:** 🧪 Hands-on lab

:::tip[🎯 What you'll build & be able to do]
A **least-privilege identity design** and a **blast-radius diagram** for an agent that already has too much access — the single highest-leverage control after an incident.

By the end you'll be able to:
- **Inventory** an agent's real capabilities (data, tools, identity, connected systems) and its reachability.
- **Redesign** standing privileges into scoped, Just-in-Time access with an approver.
- **Remove** the exfiltration path and prove the blast radius shrank with a before/after diagram.

Core principle: **every AI agent is a digital employee** — it needs an identity, scoped permissions, and an offboarding plan.
:::

:::note[📌 TL;DR]
- An agent's real power = data access + tool access + identity + connected systems. If it misbehaves, **whatever it can reach is your blast radius.**
- You'll take an over-permissioned agent, cut each capability to the minimum, convert standing privilege to Just-in-Time, and delete the exfiltration path.
- Deliverable: a least-privilege identity design + a before/after blast-radius diagram.
:::

---

## 🏢 Enterprise Scenario

> **Company:** Ceiba Logistics — a cross-border freight operator.  
> **Situation:** The "Support Copilot" was shipped with a **single service account** that had broad read/write across the CRM, the ticketing system, the shared finance drive, *and* outbound email — because "it was easier during the pilot." A prompt-injection in a customer email caused the agent to email an internal pricing sheet to an external address. The agent did exactly what it was told; the problem was **what it could reach.**

You are brought in to answer: *"If this agent behaved unexpectedly, what could it touch — and how do we shrink that to the minimum?"*

---

## The Core Problem: Capability = Identity × Access × Tools × Connected Systems

An agent's real power is not its model — it's the **union of everything its identity can reach.** The 2026 HF incident is a permission and **reachability** story: once the agent defeated the egress **proxy**, its sandbox could reach the open internet and then a third party's production clusters. Governed, identity‑aware egress (deny‑by‑default, ZTNA) would have meant the "unintended path" had **nowhere to go**. Remove the reachability and the exploit chain simply doesn't exist.

```
BLAST RADIUS = everything the agent's identity can reach
──────────────────────────────────────────────────────
        ┌───────── over-privileged agent (Ceiba today) ─────────┐
Agent → CRM (rw) · Tickets (rw) · Finance drive (rw) · Email (send) · Admin APIs
        └───────────────────────── huge blast radius ───────────┘

        ┌──── least-privilege agent (target) ────┐
Agent → CRM (read, own-region) · Tickets (create only) · [no finance] · [no outbound email]
        └──────────── small blast radius ────────┘
```

<details>
<summary>🏗️ <strong>Architecture decision table</strong> — shrinking blast radius</summary>

| Control | What it limits | Microsoft example | Vendor-neutral equivalent |
|---------|----------------|-------------------|---------------------------|
| **Dedicated agent identity** | "Who is the agent?" | Entra **workload identity / managed identity** | IAM role per agent (AWS IAM Role, GCP service account) |
| **RBAC + scoped APIs** | "What can it call?" | Entra **RBAC**, app roles, scoped Graph permissions | Least-privilege IAM policies, scoped API keys |
| **Just-Enough / Just-in-Time access** | "For how long / how much?" | **PIM** (Privileged Identity Management) | Time-bound tokens, STS session credentials |
| **Conditional Access** | "Under what conditions?" | Entra **Conditional Access** policies | Context-aware access, policy-as-code |
| **Resource segmentation** | "What's even reachable?" | Network isolation, private endpoints, per-env boundaries | VPC/subnet isolation, no ambient egress |
| **Identity‑governed egress** | "Where may it connect *out*?" | **Entra Global Secure Access** (identity‑based SWG, ZTNA, Universal Conditional Access) | Identity‑aware egress proxy / ZTNA, deny‑by‑default outbound |

**Decision:** One **dedicated identity per agent**, **scoped RBAC**, **JIT elevation via PIM** for anything privileged, **Conditional Access** conditions, **deny-by-default network egress**, and **identity‑governed egress** so a sandbox breakout has nowhere to reach.
</details>

---

## 🧰 Before You Start

You can complete the **design** deliverables with no cloud tenant. If you *have* an Entra tenant (a [free Microsoft 365 Developer](https://developer.microsoft.com/microsoft-365/dev-program) or Azure trial works), do the optional hands-on steps to make it real.

:::warning[Ethics & legality]
Only configure identities and permissions in a tenant **you own or are authorized to administer.** Never test access controls against an employer's or customer's production tenant without written authorization.
:::

---

## Tasks

### Task 1 — Inventory the blast radius (the "what could it reach?" audit)

List every system the Ceiba agent can touch today and classify each: **read / write / send / admin**, and **data sensitivity** (public / internal / confidential / regulated). Produce a single **blast-radius table** — this is the artifact a CISO actually wants.

### Task 2 — Apply least privilege (the digital-employee model)

For each capability, decide the **minimum** the agent needs to do its *actual* job (create support tickets, read own-region CRM). Cut everything else. Document the before → after for each system, and the one-sentence justification.

| System | Before | After (least privilege) | Why |
|--------|--------|-------------------------|-----|
| CRM | read/write, all regions | read, own region | Agent only summarizes; never edits |
| Finance drive | read/write | **removed** | Out of job scope entirely |
| Outbound email | send | **removed / draft-only** | Exfil path; humans send |
| Ticketing | read/write/admin | create only | No need to close or reconfigure |

### Task 3 — Design JIT + Conditional Access

Pick the **one** capability that legitimately needs occasional elevation (e.g., a quarterly bulk export). Design it as **Just-in-Time** (PIM-style, time-boxed, approver required) instead of standing access. Write the Conditional Access conditions (device, network, risk) under which the agent identity may operate at all.

### Task 4 — Map to MITRE ATLAS

Identify which adversary techniques your least-privilege design **neutralizes** (e.g., discovery, lateral movement, exfiltration via the agent). Reference [MITRE ATLAS](https://atlas.mitre.org/) tactic names. One line per technique: *"Removing outbound email closes the exfiltration path used in the incident."*

<details>
<summary>🔧 Optional hands-on (own tenant): create a scoped agent identity</summary>

```bash
# Azure CLI — create a dedicated identity and grant ONE narrow role at a scoped resource.
az login
# Create a user-assigned managed identity for the agent
az identity create --name agent-support-copilot --resource-group rg-agent-lab
# Grant a single least-privilege role, scoped to ONE resource (not the subscription)
az role assignment create \
  --assignee <identity-clientId> \
  --role "Reader" \
  --scope /subscriptions/<sub>/resourceGroups/rg-agent-lab/providers/<one-resource>
# Verify: the identity has exactly one narrowly-scoped assignment
az role assignment list --assignee <identity-clientId> -o table
```

> The teaching point isn't the CLI — it's that the assignment is **one role, one resource, no subscription-wide grants.**
</details>

---

:::note[🧪 Knowledge check]
Before moving on, make sure you can answer:
1. Why is "treat every agent like a digital employee" more than a slogan — what does it change operationally?
2. What is the difference between **standing** privilege and **Just-in-Time** access, and why does it shrink blast radius?
3. In the 2026 HF incident, which single control would have most limited *reachability* — and why?
:::

## 📦 Deliverable

A folder `permission-blast-radius/` with:
1. `blast-radius-before.md` — the full inventory table (Task 1).
2. `least-privilege-design.md` — before → after per system with justifications (Task 2).
3. `jit-and-conditional-access.md` — the JIT elevation + Conditional Access design (Task 3).
4. `atlas-mapping.md` — techniques neutralized (Task 4).
5. A **blast-radius diagram** (before vs after) — the visual a board remembers.

---

## ✅ Success Criteria

- [ ] Every system the agent can reach is inventoried with access level **and** data sensitivity.
- [ ] Each capability is cut to the **minimum** for the agent's real job, with a one-line justification.
- [ ] At least one standing privilege is redesigned as **Just-in-Time** with an approver.
- [ ] The design **removes the exfiltration path** that caused the incident (outbound email / broad drive).
- [ ] Your before/after diagram visibly shrinks the blast radius.

---

## 🎓 Teaching Points

- **Treat every agent like a digital employee:** unique identity, least privilege, and an offboarding (revocation) plan on day one.
- **Limit blast radius *before* an incident** — it is the cheapest control and the one you'll wish you had after.
- **Reachability is the vulnerability.** The HF sandbox egress breakout and Ceiba's outbound email are the same lesson: if it can't reach it, it can't misuse it.

---

## ➡️ Recommended next

| Next | Why | Time |
|------|-----|------|
| [**Challenge 03 — Data Protection & Runtime Monitoring**](../03-data-and-monitoring/challenge-03.md) | You shrank *what it can reach*; now protect the data and *watch what it does*. | 3–4 h · 🟡 Intermediate |
| [Challenge 01 — Objective & Autonomy](../01-objective-autonomy/challenge-01.md) | Revisit how the objective itself creates the incentive to over-reach. | 3–4 h |
