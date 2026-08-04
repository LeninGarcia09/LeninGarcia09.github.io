---
sidebar_position: 5
title: "Challenge 4 — PII Detection (DLP) with Presidio"
---

# Challenge 4: PII detection and anonymization pipeline with Presidio

> **Tool:** [Presidio](https://github.com/data-privacy-stack/presidio) (open source, MIT) · **Frameworks:** GDPR / LFPDPPP · **Time:** 3–4 h

:::tip[What you will build]
A **data classification pipeline**: detects personal data (PII) in text — names, emails, phones, cards, CURP/RFC — and **anonymizes** it automatically. This is the heart of a DLP and data classification program.
:::

**Where to run this:** on your machine, inside the [Step 0](./overview#️-step-0--isolated-environment-one-time-5-min) environment. Presidio is no longer a Microsoft project and is now maintained by the community ([data-privacy-stack](https://data-privacy-stack.github.io/presidio/)) — 100% open.

## Why it matters for employment

The BBVA JD asks for *"identification and classification of sensitive data (PII) with automated tools (DLP, BigID, Varonis)"* and *"safeguarding confidential information according to regulation."* MAPFRE asks for *"compliance in data protection."* This challenge gives you a functional DLP you **can demonstrate live** in an interview, without expensive licenses.

## Steps

```bash
# 1. Instala Presidio (analyzer + anonymizer) y el modelo de lenguaje de spaCy
python -m pip install presidio-analyzer presidio-anonymizer
python -m spacy download en_core_web_lg
# Para español: python -m spacy download es_core_news_lg
```

<details>
<summary>Minimal script: detect + anonymize PII</summary>

```python
# dlp.py — detecta y anonimiza PII en un texto
from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine

analyzer = AnalyzerEngine()
anonymizer = AnonymizerEngine()

texto = "Contacta a Ana Pérez en ana.perez@example.com o al +52 55 1234 5678."

# 1. Detectar
resultados = analyzer.analyze(text=texto, language="en")
for r in resultados:
    print(r.entity_type, texto[r.start:r.end], round(r.score, 2))

# 2. Anonimizar
anonimizado = anonymizer.anonymize(text=texto, analyzer_results=resultados)
print(anonimizado.text)   # -> Contacta a <PERSON> en <EMAIL_ADDRESS> o al <PHONE_NUMBER>.
```

> The official API and custom recognizers are in the [Presidio documentation](https://data-privacy-stack.github.io/presidio/).
</details>

<details>
<summary>Extend: custom recognizer for RFC/CURP (Mexico)</summary>

Presidio lets you add **regex** recognizers for local identifiers it does not include by default (e.g., RFC, CURP, CLABE). Create a `PatternRecognizer` with the corresponding pattern and register it in the `AnalyzerEngine`. Documenting this step demonstrates that you understand **local regulatory context** (LFPDPPP) — a major differentiator for LATAM roles.

</details>

## 📦 Deliverable

A `pii-dlp-pipeline/` repository with:

1. `README.md` — which PII types it detects and for which regulation (GDPR/LFPDPPP).
2. `dlp.py` — the detection + anonymization pipeline.
3. `samples/` — input texts (fictional) and their anonymized output.
4. At least **one custom recognizer** (RFC, CURP, or similar) with its justification.
5. A brief map: *PII type → regulatory risk → handling action*.

## ✅ Success criteria

- [ ] Detect at least **4 distinct PII types**.
- [ ] Anonymize correctly (redaction or token replacement).
- [ ] Added **1 local custom recognizer** (RFC/CURP/CLABE).
- [ ] Explained the link with **GDPR or LFPDPPP** in the README.

:::warning[Use fictional data]
Never process real people's PII without legal basis and consent. For this challenge use **synthetic/fictional data** that you generate.
:::

---

**Previous:** [← Challenge 3](./challenge-03) · **Back to** [track home](./overview)

## 🎓 You finished the track — now what?

1. Publish the **4 repos** on your GitHub and pin them on your profile.
2. Write **1 LinkedIn post per challenge** explaining what you learned (this creates recruiter visibility).
3. Add the [resume line](./overview#-resume-value) to your CV.
4. Prepare a **5-minute demo** of your favorite for interviews.
