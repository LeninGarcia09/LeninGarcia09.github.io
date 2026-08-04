---
sidebar_position: 2
title: "Challenge 1 — LLM Audit (OWASP Top 10)"
---

# Challenge 1: Security audit of an LLM with garak

> **Tool:** [garak](https://github.com/NVIDIA/garak) (open source, Apache-2.0) · **Framework:** [OWASP Top 10 for LLM Apps](https://genai.owasp.org/llm-top-10/) · **Time:** 3–4 h

:::tip[What you will build]
A **vulnerability report** for an LLM: you launch automated probes (prompt injection, data leakage, toxicity, jailbreaks) and document findings mapped to the OWASP LLM Top 10. It is the equivalent of a "pentest report," but for AI.
:::

**Where to run this:** on your machine, inside the [Step 0](./overview#️-step-0--isolated-environment-one-time-5-min) environment. The test target is a **local model with Ollama** (free) or your own key with a spending limit.

## Why it matters for employment

AI Security Engineer and detection platform support roles (e.g., Falcon, Sentinel) ask for *"interpreting AI-generated alerts"* and *"reducing false positives while maintaining detection effectiveness."* This challenge gives you vocabulary and concrete evidence for both.

## Steps

```bash
# 1. Instala garak en tu entorno virtual
python -m pip install -U garak

# 2. (Opción gratis) Levanta un modelo local con Ollama en otra terminal
#    https://ollama.com  →  ollama run llama3.2

# 3. Explora las sondas disponibles
garak --list_probes

# 4. Corre una auditoría enfocada (ejemplo: prompt injection)
garak --model_type ollama --model_name llama3.2 --probes promptinject

# 5. Corre una segunda familia (ejemplo: fuga de datos / toxicidad)
garak --model_type ollama --model_name llama3.2 --probes leakreplay,realtoxicityprompts

# 6. garak genera un reporte .jsonl y un resumen en consola → guárdalo en reports/
```

<details>
<summary>Mapping: garak probes → OWASP LLM Top 10</summary>

| garak probe (example) | OWASP LLM risk (v2025) |
|-----------------------|--------------------------|
| `promptinject`, `dan` (jailbreaks) | **LLM01: Prompt Injection** |
| `leakreplay` | **LLM02: Sensitive Information Disclosure** |
| `realtoxicityprompts`, `lmrc` | **LLM05: Improper Output Handling** (harmful content) |
| `malwaregen`, `xss` | **LLM05 / LLM02** (unsafe output) |
| `glitch`, `encoding` | **LLM01** (obfuscated injection) |

> Check the current official risk list at [genai.owasp.org/llm-top-10](https://genai.owasp.org/llm-top-10/) and probes with `garak --list_probes`.
</details>

## 📦 Deliverable

A `llm-security-audit/` repository with:

1. `README.md` — what model you audited, which probes, and **3–5 findings** in business language.
2. `reports/` — garak `.jsonl` output (raw evidence).
3. `findings.md` — table: finding → OWASP risk → severity → proposed mitigation.
4. A simple diagram of the audit flow.

## ✅ Success criteria

- [ ] Ran at least **2 distinct probe families**.
- [ ] Each finding is mapped to an **OWASP LLM Top 10** ID.
- [ ] Proposed one **mitigation** per finding (not just a description).
- [ ] The README is understandable by a non-technical hiring manager in 2 minutes.

:::warning[Ethics and legality]
Audit **only** your own models or models where you have explicit permission. Never run garak against a third-party production system without written authorization.
:::

---

**Next:** [Challenge 2 — AI red-teaming with PyRIT →](./challenge-02)
