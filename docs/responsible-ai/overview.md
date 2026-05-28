---
sidebar_position: 1
title: Responsible AI & Governance
---

# ⚖️ Responsible AI & Governance

**Track Type:** Skill Track — Deep Technical + Regulatory  
**Target Audience:** AI Solution Architects, AI Governance Officers, Security Architects  
**Prerequisites:** Azure AI Foundry basics; familiarity with GDPR concepts helpful

---

:::tip What You'll Build
Governance frameworks grounded in real regulatory situations. Every challenge is based on an actual scenario customers face — an EU regulator demanding an AI inventory, a red team finding a data leakage vulnerability, a bias complaint requiring a technical response.
:::

---

## Why This Track Exists

The EU AI Act entered into force on **August 1, 2024**. The first compliance deadline — banning unacceptable-risk AI systems — was **February 2, 2025**. High-risk AI system operators must comply by **August 2, 2026**.

Every enterprise customer building AI with Microsoft Azure now needs:
- An AI system inventory
- A risk classification for each AI system  
- Technical documentation proving compliance
- Human oversight mechanisms
- Ongoing monitoring and incident reporting

This track builds the skills to design and implement all of this on Azure.

---

## The Microsoft Responsible AI Standard v2

Microsoft's internal framework for building AI responsibly — now publicly available. Every architect working with Microsoft AI must understand these six principles:

| Principle | What It Means for Architecture |
|-----------|-------------------------------|
| **Fairness** | Evaluate models for disparate impact across demographic groups |
| **Reliability & Safety** | Evaluate, red-team, and gate deployments |
| **Privacy & Security** | Data minimization, encryption, access controls |
| **Inclusiveness** | Design for accessibility; don't exclude edge cases |
| **Transparency** | Explain model decisions; disclose AI to users |
| **Accountability** | Human oversight; audit trails; incident response |

---

## The Governance Stack

```
┌──────────────────────────────────────────────────────────────┐
│                   Regulatory Layer                           │
│  EU AI Act (2024) | NIST AI RMF | ISO 42001 | GDPR Art. 22  │
├──────────────────────────────────────────────────────────────┤
│                   Policy Layer                               │
│     Microsoft RAI Standard v2 | Azure AI Policy             │
├──────────────────────────────────────────────────────────────┤
│                   Platform Layer                             │
│  Microsoft Purview AI Hub | Azure AI Content Safety          │
│  Azure AI Evaluation SDK | Azure Monitor                     │
├──────────────────────────────────────────────────────────────┤
│                   Practice Layer                             │
│  PyRIT Red Teaming | Fairness Dashboard | Impact Assessment  │
└──────────────────────────────────────────────────────────────┘
```

---

## Challenges

| Challenge | Scenario | Focus |
|-----------|---------|-------|
| [1 — EU AI Inventory in 30 Days](./01-rai-standard/challenge-01.md) | EU regulator wants your AI system list | Purview AI Hub + EU AI Act classification |
| [2 — Red Team Found Data Leakage](./02-purview-ai-hub/challenge-02.md) | Agent leaking competitor pricing | PyRIT + Content Safety + Prompt Shields |
| [3 — Hiring Tool Flagged for Bias](./03-content-safety/challenge-03.md) | 3 departments flag disparate impact | Fairness eval + RAI dashboard + mitigation |

---

## Key Tools

| Tool | Purpose | When to Use |
|------|---------|------------|
| **Microsoft Purview AI Hub** | Discover and govern all AI activity in your tenant | Initial inventory, ongoing compliance monitoring |
| **Azure AI Content Safety** | Runtime content filtering (text + image) | All customer-facing AI interactions |
| **PyRIT** | Red teaming and adversarial testing toolkit | Before every major deployment |
| **Azure AI Evaluation SDK** | Evaluate quality: groundedness, fairness, safety | CI/CD gates |
| **NIST AI RMF** | Risk management framework | Governance documentation |
| **EU AI Act** | Legal regulation | Risk classification + compliance planning |

---

## Key Resources

- [Microsoft Responsible AI Principles](https://www.microsoft.com/en-us/ai/responsible-ai)
- [RAI Standard v2 (public)](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE5cmFl)
- [Microsoft Purview AI Hub](https://learn.microsoft.com/en-us/purview/ai-microsoft-purview)
- [Azure AI Content Safety](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/)
- [PyRIT on GitHub](https://github.com/Azure/PyRIT)
- [EU AI Act Full Text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689)
- [NIST AI RMF](https://www.nist.gov/artificial-intelligence/ai-risk-management-framework)
