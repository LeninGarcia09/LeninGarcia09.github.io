---
sidebar_position: 3
title: "Phase 3 — Enterprise Architecture + Security (AZ-305 + SC-500)"
---

# Phase 3: Enterprise Architecture + Security (Weeks 13–16)

> **Objective:** Raise the Phase 2 artifacts to the **enterprise** level: defensible architecture design (leading toward **AZ-305**) and AI security (leading toward **SC-500**) with threat modeling, guardrails, and a reusable enterprise checklist.

## 🎯 Expected Outcomes

By completing this phase:
- **Threat model** for the RAG/agent system with prioritized mitigations
- Solid progress in **AZ-305** with one documented architecture decision (ADR)
- **Red-team / guardrails** exercise against your own AI system
- Reusable **enterprise** security and architecture checklist
- Ready for **Gate CP3 (Week 16)**

:::info[This plan is Microsoft-first]
The anchor certifications are **AZ-305** (architecture) and **SC-500** (cloud & AI security). Open frameworks (OWASP LLM, MITRE ATLAS, NIST AI RMF) are used as a common risk language.
:::

---

## Week 13 — Threat model + mitigations

**Objective:** model threats specific to AI systems (not only the traditional app).

| Resource | Language | Type |
|---------|--------|------|
| [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) | 🇬🇧 | Framework |
| [MITRE ATLAS](https://atlas.mitre.org/) | 🇬🇧 | Threat matrix |
| [Microsoft: Threat Modeling AI/ML](https://learn.microsoft.com/es-es/security/engineering/threat-modeling-aiml) | 🇪🇸 | Guide |

**Deliverable:** threat model document for the Phase 2 system — prompt injection, data leakage, poisoning, model DoS — with mitigations prioritized by risk.

## Week 14 — AZ-305: progress + security decision

**Objective:** advance the architecture certification and ground one design decision.

| Resource | Language | Type |
|---------|--------|------|
| [AZ-305 Study Guide](https://learn.microsoft.com/es-es/credentials/certifications/resources/study-guides/az-305) | 🇪🇸 | Official guide |
| [Azure Well-Architected Framework](https://learn.microsoft.com/es-es/azure/well-architected/) | 🇪🇸 | Framework |
| [Architecture Decision Records (ADR)](https://learn.microsoft.com/es-es/azure/well-architected/architect-role/architecture-decision-record) | 🇪🇸 | Practice |

**Deliverable:** **ADR** documenting a key architecture decision (identity, network, sensitive data storage, or model hosting) with alternatives and trade-offs.

## Week 15 — Red-team / guardrails + enterprise checklist

**Objective:** attack your own system and add defenses.

| Resource | Language | Type |
|---------|--------|------|
| [SC-500 Study Guide](https://learn.microsoft.com/es-es/credentials/certifications/resources/study-guides/sc-500) | 🇪🇸 | Official guide |
| [Azure AI Content Safety](https://learn.microsoft.com/es-es/azure/ai-services/content-safety/) | 🇪🇸 | Service |
| [PyRIT — Python Risk Identification Toolkit](https://github.com/Azure/PyRIT) | 🇬🇧 | Open tool |

**Deliverable:** red-team report (adversarial prompts + results) + implemented guardrails (content filter, output validation) + **enterprise checklist** for AI security.

## Week 16 — CP3 close: architecture + security

**Objective:** consolidate architecture and security into a presentable package.

| Resource | Language | Type |
|---------|--------|------|
| [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) | 🇬🇧 | Framework |
| [ISO/IEC 42001](https://www.iso.org/standard/81230.html) | 🇬🇧 | Standard |

**Checklist for [Gate CP3](../checkpoints#gate-cp3-week-16):**
- [ ] Threat model with prioritized mitigations
- [ ] Architecture ADR published
- [ ] Red-team + guardrails demonstrated
- [ ] Reusable enterprise security checklist
- [ ] Verifiable progress in AZ-305 and SC-500

---

## 📋 Phase 3 Checklist

- [ ] Threat model for the RAG/agent system (OWASP LLM + MITRE ATLAS)
- [ ] ADR with architecture decision and trade-offs
- [ ] Red-team exercise with applied guardrails
- [ ] Enterprise security and architecture checklist
- [ ] Exam plan for AZ-305 and SC-500
- [ ] Gate CP3 approved

## v4 Operations

- [Checkpoint Gates](../checkpoints)
- [Evidence Template](../evidence-template)
- [Weekly Tracker](../weekly-tracker)

## 🔗 Resume Value

> "I designed and secured an enterprise-level AI system: threat model mapped to OWASP LLM Top 10 and MITRE ATLAS, architecture decisions documented (ADR) and aligned to the Well-Architected Framework, and guardrails validated with red-teaming — backed by AZ-305 and SC-500 certification work."

## ⏭️ Next Phase

[Phase 4: Value Realization + Content + Networking →](../ai-business/overview)
