---
sidebar_position: 2
title: "Week 1: RAI Foundations for Architects"
---

# Week 1: RAI Foundations for Architects

:::info Week Overview
**Objective:** Build the mental model for RAI as an architectural discipline — not a compliance checkbox applied at the end.  
**Time Estimate:** 8–10 hours  
**Deliverable:** RAI Architecture Lens — a 1-page reference card mapping each RAI principle to design-time questions
:::

---

## The Core Shift

Traditional software architecture asks: *What should this system do, and how fast?*

RAI-aware architecture adds: *Who could this system harm, how, and what design decision prevents that?*

---

## Framework 1: Microsoft RAI Standard v2 — The 6 Principles as Design Constraints

| Principle | What It Eliminates | Design-Time Question |
|-----------|-------------------|---------------------|
| **Fairness** | Systems that produce disparate outcomes across demographic groups | What populations does this system serve? How is disparate impact measured? |
| **Reliability & Safety** | Systems that fail unpredictably or cause harm when they fail | What happens when the model returns a wrong answer? Is there a fallback? |
| **Privacy & Security** | Systems that expose personal data beyond its intended use | What data does this system access? What is the minimum necessary scope? |
| **Inclusiveness** | Systems that exclude users or produce lower quality for edge groups | Which user populations are underrepresented in training data? |
| **Transparency** | Systems where users cannot understand what is AI-generated | Is it clear to users when they are interacting with AI? |
| **Accountability** | Systems where no human owns the outcome of an AI decision | Who reviews high-stakes outputs? Who owns the audit trail? |

---

## Framework 2: NIST AI RMF 1.0 — Govern, Map, Measure, Manage

```
GOVERN → Establish policies, roles, culture
   ↓
MAP → Identify context, stakeholders, and risks for a specific AI system
   ↓ ← YOU DESIGN FOR THIS
MEASURE → Analyze and assess identified risks (metrics, evaluations, red teaming)
   ↓ ← AND THIS
MANAGE → Prioritize, respond, and monitor risks continuously
```

**What "designing for MEASURE" means:**
- Build in evaluation hooks — the system must be independently testable
- Choose architectures where component outputs are observable
- Design for A/B testing of safety mitigations

**What "designing for MANAGE" means:**
- Every AI component needs a monitoring owner in the architecture diagram
- Alerting thresholds must be defined at design time, not after launch
- Audit logs must be in the architecture — incident response requires them

---

## Framework 3: EU AI Act Risk Tiers — Architecture Decisions Change by Tier

```
UNACCEPTABLE RISK — BANNED (Feb 2025)
├─ Social scoring | Real-time biometric surveillance | Subliminal manipulation
│  → Architecture decision: Do not build.

HIGH RISK — Strict obligations (Aug 2026 deadline for deployed systems)
├─ HR/hiring | Credit scoring | Medical devices | Critical infrastructure
│  → Required: human oversight mechanism, audit logging, accuracy testing,
│     data governance documentation, EU AI database registration

LIMITED RISK — Transparency only
├─ Chatbots | Deepfakes
│  → Required: AI disclosure to users

MINIMAL RISK — No obligations
└─ Spam filters | Recommendation engines
   → Best practice: document anyway for future re-classification
```

---

## This Week's Resources

| Resource | Type | Estimated Time |
|----------|------|---------------|
| [Microsoft RAI Principles](https://www.microsoft.com/en-us/ai/responsible-ai) | Reading | 1 hour |
| [NIST AI RMF 1.0 — Govern + Map sections](https://airc.nist.gov/Home) | Reading | 2 hours |
| [Azure Well-Architected Framework — AI Workloads](https://learn.microsoft.com/en-us/azure/well-architected/ai/) | Reading | 1.5 hours |
| Microsoft Learn: [Responsible AI principles in practice](https://learn.microsoft.com/en-us/training/paths/responsible-ai-business-principles/) | Course | 2 hours |
| [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) | Reference scan | 1 hour |

---

## Hands-On Exercise

:::tip Exercise — Gap Analysis Against NIST AI RMF
Take an AI system you have previously designed or reviewed. Map it against the four NIST AI RMF functions:

1. **Govern**: Is there a documented policy for this system? Who owns it?
2. **Map**: Are all stakeholders identified — including adversarial actors and autonomous agents?
3. **Measure**: Can the system's fairness, safety, and accuracy be measured independently? Are evaluation hooks built in?
4. **Manage**: Are alerting thresholds defined? Is there an incident response plan?

For each function, score: **Strong / Partial / Missing**. Write a 1-paragraph explanation for any **Missing** score.
:::

---

## Week 1 Deliverable: RAI Architecture Lens

Build a 1-page reference card you will use for every architecture review going forward:

| RAI Principle | Design-Time Question | Architecture Smell (what absence looks like) |
|---------------|---------------------|---------------------------------------------|
| Fairness | What populations does this serve? How is disparate impact measured? | No evaluation dataset; no bias testing |
| Reliability & Safety | What happens when the model is wrong? Is there a fallback? | No fallback; no monitoring owner |
| Privacy & Security | What is the minimum data scope? Is consent modeled? | Overly broad data access; no consent flow |
| Inclusiveness | Who is underrepresented? How is accessibility handled? | No accessibility review; monoculture test data |
| Transparency | Is AI disclosed to users? Can decisions be explained? | No AI disclosure; no explainability hook |
| Accountability | Who owns each AI decision? What is the escalation path? | No human review gate; no audit log |

---

## Knowledge Check

1. What is the difference between RAI as a compliance checklist and RAI as an architectural constraint?
2. Which NIST AI RMF function is most directly influenced by architecture decisions — and why?
3. Under the EU AI Act, what architecture components are legally required for a High-Risk AI system?
4. An architect says: "We'll add the safety filters after the MVP ships." Which RAI principle is most at risk?
