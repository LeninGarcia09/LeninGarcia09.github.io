---
sidebar_position: 1
title: "Challenge Track — Applied AI Security"
---

# 🧪 Challenge Track: Applied AI Security

> **Vendor-neutral. Free. Practical.** Four labs that turn your cybersecurity experience into **portfolio evidence** for AI Security and Governance roles — without depending on any vendor.

:::info[Why this track exists]
AI security job postings (AI Security Engineer, Detection Engineer, AI Security Specialist, Security Consultant) ask for one thing above all: **having done it, not only studied it**. Each challenge here produces a **verifiable artifact** (a report, a threat mapping, an assessment) that you can publish on GitHub and explain in an interview. All tools are **open source and free**.
:::

## 🎯 Who it is for

IT / cybersecurity / forensics professionals repositioning toward AI. You do not need to be a senior developer: you need basic Python and discipline. It complements **[Phase 3: Cybersecurity](../cybersecurity/overview)** and **[Phase 5: Cloud + AI](../cloud-ai/overview)** of the plan.

## 🧰 The 4 challenges

| # | Challenge | Open tool | Frameworks | Portfolio artifact |
|---|------|---------------------|-----------|-------------------------|
| [1](./challenge-01) | LLM audit (OWASP Top 10) | **garak** | OWASP LLM Top 10 | Vulnerability report for an LLM |
| [2](./challenge-02) | AI red-teaming + threat mapping | **PyRIT** | MITRE ATLAS | Red-team report with mapped TTPs |
| [3](./challenge-03) | Governance assessment | *(none — document)* | NIST AI RMF + ISO/IEC 42001 | Executive gap assessment |
| [4](./challenge-04) | PII detection/anonymization (DLP) | **Presidio** | GDPR / LFPDPPP | Data classification pipeline |

## 🧭 How these challenges help you get hired

Each challenge is anchored to real responsibilities in current AI security job descriptions:

| Typical responsibility in JDs | Challenge that evidences it |
|-------------------------------|------------------------|
| "Interpret AI alerts, reduce false positives, tune detection" | Challenge 1 + Challenge 2 |
| "AI red-teaming / threat hunting; adversarial threat intelligence" | Challenge 2 |
| "AI security requirements, compliance (EU AI Act, NIST AI RMF), governance and ethics" | Challenge 3 |
| "Identification and classification of sensitive data (DLP, PII), data protection" | Challenge 4 |

:::tip[Golden portfolio rule]
A challenge is not "finished" until it meets the [capstone rubric](../methodology-best-practices#capstone-rubric-hiring-ready-quality): professional README, reproducible steps, diagram, decisions/trade-offs, and a 5-minute demo you can explain without notes.
:::

---

## ⚙️ Step 0 — Isolated environment (one time, ~5 min)

Challenges 1, 2, and 4 use Python. Create **one** reusable environment for all three.

**Where to run this:** on your own machine (Windows, macOS, or Linux). You do not need cloud or a credit card.

```bash
# Crea y entra en la carpeta del track
mkdir ai-security-labs && cd ai-security-labs

# Entorno virtual de Python (requiere Python 3.10–3.12)
python -m venv .venv
# Windows (PowerShell): .venv\Scripts\Activate.ps1
# macOS/Linux:          source .venv/bin/activate

# Carpeta local para tus reportes (tu "evidencia")
mkdir reports
```

<details>
<summary>Which model/LLM should I use for testing? (free options)</summary>

You do not need to pay for a model to practice. Options:

- **Local model with [Ollama](https://ollama.com/)** (free, runs on your machine): `ollama run llama3.2` and point the tools to the local endpoint. **Recommended** for practicing at no cost and with low risk.
- **Free tier from a provider** (OpenAI, Google, Anthropic, Azure) if you already have access — use a key with a spending limit.
- **Hugging Face model** downloaded locally.

> ⚠️ **Only test models you own or have explicit permission to test.** Red-teaming a third-party system without authorization is illegal.
</details>

---

## ✅ Track checklist

- [ ] Isolated environment created (Step 0)
- [ ] Challenge 1: garak report published on GitHub
- [ ] Challenge 2: red-team report mapped to MITRE ATLAS
- [ ] Challenge 3: NIST AI RMF + ISO 42001 gap assessment
- [ ] Challenge 4: PII detection pipeline with Presidio
- [ ] All 4 artifacts meet the capstone rubric
- [ ] LinkedIn and CV updated with these projects

## 🔗 Resume Value

> "I executed LLM security audits (OWASP LLM Top 10) with garak, AI red-teaming mapped to MITRE ATLAS with PyRIT, a governance gap assessment aligned to NIST AI RMF and ISO/IEC 42001, and a PII detection pipeline with Presidio — all published as reproducible evidence on GitHub."

---

*All tools and frameworks in this track are verified in [Sources and Verification](../sources-and-verification#ai-security--open-and-free-tools-vendor-neutral).*
