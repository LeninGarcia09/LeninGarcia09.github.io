---
sidebar_position: 2
title: "Sources and Verification v4"
---

# Sources and Verification (v4)

:::info[Why this page exists]
An architecture/engineering-level plan is only credible if its certifications and resources are **real, current, and independently verifiable**. This page documents every credential, framework, and key resource in the v4 plan with links to **primary sources** (Microsoft Learn, GitHub, standards bodies) so anyone — or a technical recruiter — can confirm them directly.
:::

## Verification method

1. **Primary sources only** — official provider pages, not blogs or aggregators.
2. **Record the "verified on" date** — the Microsoft AI certification portfolio is rotating heavily in 2026.
3. **Separate fact from recommendation** — the existence and scope of an exam is a *verifiable fact*; sequence and timing are *judgment*.
4. **Re-verify before every exam** — with exams in beta/GA rolling status during 2026, status changes month to month.

**Last verified:** 2026-07-17

:::warning[The Microsoft AI portfolio is changing in 2026]
Microsoft announced a renewal of Azure and Data/AI credentials. Several exams in this plan are **new or transitioning from beta → GA during 2026**. Confirm status (beta/GA), *skills measured*, and *practice assessment* availability on the official page **before scheduling**. Official announcement: [Updates to several Azure and Data/AI certifications](https://learn.microsoft.com/en-us/credentials/certifications/posts/updates-to-several-azure-and-data-ai-certifications-are-coming-soon).
:::

---

## v4 plan certifications (verified)

| Certification | Code | Status (2026) | Primary source |
|---------------|--------|---------------|-----------------|
| Azure AI Apps and Agents Developer Associate | **AI-103** | Replaces AI-102 (which retires **Jun 30, 2026**); validates Python + Microsoft Foundry | [Credential page](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/) · [Study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103) |
| Azure Solutions Architect Expert | **AZ-305** | Current (Expert level) | [Credential page](https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/) |
| Cloud and AI Security Engineer Associate | **SC-500** | New/updated 2026 — **verify beta/GA before scheduling** | [Credential page](https://learn.microsoft.com/en-us/credentials/certifications/cloud-and-ai-security-engineer-associate/) |
| GitHub Copilot | **GH-300** | Current · $99 USD · 700/1000 · valid 24 months · available in Spanish | [Credential page](https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/) · [Study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300) |
| Azure AI Cloud Developer Associate | **AI-200** | New 2026 (beta → GA transition) — **verify availability** | [Official credential announcement](https://learn.microsoft.com/en-us/credentials/certifications/posts/updates-to-several-azure-and-data-ai-certifications-are-coming-soon) |

:::note[Context for the AI-102 → AI-103 transition]
The official page confirms that **AI-102 retires on June 30, 2026** and that **AI-103 (Azure AI Apps and Agents Developer Associate)** is its successor, focused on building generative AI apps and **multi-agent solutions with Microsoft Foundry** using Python. There is no automatic migration: the new credential requires taking the new exam. Other relevant 2026 portfolio moves: **AI-901** (replaces AI-900), **AI-300** (MLOps Engineer). Always confirm at the source.
:::

---

## Architecture, governance, and security frameworks (verified)

| Framework | Issuer | Official identifier | Primary source |
|-----------|--------|-----------------------|-----------------|
| Azure Well-Architected Framework | Microsoft | WAF | [learn.microsoft.com](https://learn.microsoft.com/es-es/azure/well-architected/) |
| Cloud Adoption Framework | Microsoft | CAF | [learn.microsoft.com](https://learn.microsoft.com/es-es/azure/cloud-adoption-framework/) |
| AI Risk Management Framework | NIST (U.S.) | AI RMF 1.0 (NIST AI 100-1) | [nist.gov](https://www.nist.gov/itl/ai-risk-management-framework) |
| AI management system | ISO/IEC | ISO/IEC 42001:2023 | [iso.org](https://www.iso.org/standard/81230.html) |
| EU AI Act | European Union | Regulation (EU) 2024/1689 | [eur-lex.europa.eu](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) |
| Zero Trust Architecture | NIST | SP 800-207 | [csrc.nist.gov](https://csrc.nist.gov/pubs/sp/800/207/final) |
| Top 10 for LLMs | OWASP | OWASP Top 10 for LLM Apps | [owasp.org](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Threats to AI systems | MITRE | MITRE ATLAS | [atlas.mitre.org](https://atlas.mitre.org/) |

---

## Free and low-cost technical resources (trusted sources)

Verified stack for building the plan's technical evidence (RAG, agents, evaluation) at no cost or low cost.

| Resource | Provider | Cost | Primary source |
|---------|-----------|-------|-----------------|
| Azure AI Foundry Documentation | Microsoft | **Free** | [learn.microsoft.com](https://learn.microsoft.com/es-es/azure/ai-foundry/) |
| Microsoft Learn (Azure AI / Foundry paths) | Microsoft | **Free** (badges/Applied Skills) | [learn.microsoft.com](https://learn.microsoft.com/es-es/training/browse/?products=azure-ai-foundry) |
| Official Practice Assessments | Microsoft Learn | **Free** | [learn.microsoft.com](https://learn.microsoft.com/es-es/credentials/browse/) |
| DeepLearning.AI — short GenAI/RAG/agent courses | DeepLearning.AI | **Free** | [deeplearning.ai/short-courses](https://www.deeplearning.ai/short-courses/) |
| Azure Samples (RAG, agents) | Microsoft (GitHub) | **Free** | [github.com/Azure-Samples](https://github.com/Azure-Samples) |
| GitHub Skills | GitHub | **Free** | [skills.github.com](https://skills.github.com/) |
| Anthropic / OpenAI cookbooks | Anthropic / OpenAI | **Free** | [anthropic.com/learn](https://www.anthropic.com/learn) · [cookbook.openai.com](https://cookbook.openai.com/) |

:::tip[For someone between jobs]
The **free stack** (Microsoft Learn + Azure AI Foundry docs + Azure Samples + DeepLearning.AI + official practice assessments) covers almost all evidence-building. The mandatory expense is the **certification exams**; Microsoft periodically offers **free vouchers** through *Virtual Training Days*. Check the [Microsoft Learn events page](https://learn.microsoft.com/es-es/training/) before paying.
:::

---

## Product changes already reflected

| Before | Now | Note |
|-------|-------|------|
| Azure AI Studio (`/azure/ai-studio/`) | **Azure AI Foundry** (`/azure/ai-foundry/`) | Renamed by Microsoft; URLs updated in Phase 5 |
| Power BI "Guided Learning" | Modular Power BI paths | The linear path was retired (Phase 2) |
| AI-102 (Azure AI Engineer) | **AI-103** (Azure AI Apps and Agents Developer) | AI-102 retires Jun 30, 2026 |

---

## Learning design frameworks and market data

[Methodology and Best Practices v4](./methodology-best-practices) is based on these primary sources:

| Source | What it contributes | Type | Primary source |
|--------|-----------|------|-----------------|
| WEF *Future of Jobs Report 2025* | In-demand skills and AI transformation data (86%, 39%, ~63%) | Research report | [weforum.org](https://www.weforum.org/publications/the-future-of-jobs-report-2025/) |
| 70-20-10 model | Experience/social/formal balance in professional development | Framework (CCL) | [ccl.org](https://www.ccl.org/articles/leading-effectively-articles/70-20-10-rule/) |
| Dunlosky et al. (2013) | Effectiveness of active recall and spaced/retrieval practice | Peer-reviewed study | [journals.sagepub.com](https://journals.sagepub.com/doi/10.1177/1529100612453266) |
| Google Career Certificates / AWS re/Start / IBM SkillsBuild | Design with projects + capstone + employer connection | Reference programs | [grow.google/certificates](https://grow.google/certificates/) · [aws.amazon.com](https://aws.amazon.com/training/restart/) · [skillsbuild.org](https://skillsbuild.org/) |

:::note[About statistics and proportions]
The WEF figures (86% / 39% / ~63%) are **employer survey data**, not guaranteed projections. The **70-20-10** proportions are a **guiding philosophy** (CCL, 1988), not a statistically validated formula. Employment outcome percentages from Google/AWS/IBM are **reported by each provider**.
:::

---

## Note about salary ranges

Any salary range associated with roles in this plan (AI Solution Architect, AI Success Engineer, AI Platform Engineer) is **directional**, not a guarantee. It varies strongly by country, industry, company size, and seniority. For live figures:

- [Levels.fyi](https://www.levels.fyi/) — tech compensation by level and company
- [Glassdoor](https://www.glassdoor.com/) — ranges by role and location
- Robert Half / Michael Page reports (verify the year)

---

## Honesty log

- **Verified facts:** existence and scope of AI-103, AZ-305, SC-500, GH-300, and AI-200; retirement of AI-102 (Jun 30, 2026); framework identifiers (WAF, CAF, NIST AI RMF 1.0, ISO/IEC 42001:2023, EU AI Act = Regulation (EU) 2024/1689, NIST SP 800-207).
- **Judgment (not fact):** the phase sequence, weekly timing, and project selection are *recommendations*.
- **Moving status:** AI-103, AI-200, and SC-500 are transitioning beta → GA during 2026; confirm availability before scheduling.
- **Directional pending verification:** salary ranges and any market statistics.
