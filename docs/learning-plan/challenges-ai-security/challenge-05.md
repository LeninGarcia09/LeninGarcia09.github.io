---
sidebar_position: 6
title: "Challenge 5 — Secure Code Review for AI-Generated Code"
---

# Challenge 5: Secure code review of AI-generated code and agents

> **Tools:** [Semgrep OSS](https://github.com/semgrep/semgrep) (open source, LGPL 2.1) + [Gitleaks](https://github.com/gitleaks/gitleaks) (open source, MIT) · **Frameworks:** [OWASP Top 10:2025](https://owasp.org/Top10/2025/) + [CWE Top 25](https://cwe.mitre.org/top25/) · **Time:** 3–4 h

:::tip[What you will build]
A **secure code review pipeline**: you generate code with an AI assistant (Copilot, ChatGPT, Claude), deliberately reproduce the **6 most common vulnerability classes in AI-generated code**, then detect and fix each one with free static-analysis tools. This is the artifact that proves you can be the human control gate for AI-written code — the fastest-growing requirement in AI Security job postings.
:::

**Where to run this:** on your machine, inside the [Step 0](./overview#️-step-0--isolated-environment-one-time-5-min) environment. No cloud account required.

## Why it matters for employment

AI coding assistants generate code faster than teams can review it, and studies from **Snyk, Veracode, and Georgetown CSET** consistently find that a meaningful share of AI-generated code samples contain at least one of the classic OWASP/CWE vulnerability classes — because the model was trained on code that also contained them. AI Security Engineer, AppSec Engineer, and "Secure AI-assisted development" job postings now explicitly ask for the ability to **review, triage, and fix AI-generated code**, not just prompt an LLM. This challenge gives you a repeatable, tool-backed process for exactly that.

## 🎯 The 6 vulnerability classes you will detect

Every AI coding assistant can reproduce these — they are old, well-documented weaknesses, not novel "AI" risks. Knowing them cold, and knowing how to find them automatically, is a core AppSec skill that transfers directly to reviewing AI output.

| # | Vulnerability | CWE | OWASP Top 10:2025 category | Typical AI-generated mistake |
|---|----------------|-----|------------------------------|-------------------------------|
| 1 | **SQL Injection** | [CWE-89](https://cwe.mitre.org/data/definitions/89.html) | A05:2025 – Injection | String-concatenated query instead of parameterized query/ORM |
| 2 | **Cross-Site Scripting (XSS)** | [CWE-79](https://cwe.mitre.org/data/definitions/79.html) | A05:2025 – Injection | Rendering user input into HTML/JS without escaping |
| 3 | **Path Traversal** | [CWE-22](https://cwe.mitre.org/data/definitions/22.html) | A01:2025 – Broken Access Control | Building a file path from user input without validating `../` |
| 4 | **Auth Bypass** | [CWE-287](https://cwe.mitre.org/data/definitions/287.html) / [CWE-306](https://cwe.mitre.org/data/definitions/306.html) | A07:2025 – Authentication Failures | Missing auth check on a new endpoint the model scaffolded |
| 5 | **Secrets in Code** | [CWE-798](https://cwe.mitre.org/data/definitions/798.html) | A02:2025 – Security Misconfiguration | Hardcoded API key/password the model used as a "working example" |
| 6 | **SSRF** | [CWE-918](https://cwe.mitre.org/data/definitions/918.html) | A01:2025 – Broken Access Control | Server fetches a URL supplied by the user with no allow-list |

> Category numbers verified against the current [OWASP Top 10:2025](https://owasp.org/Top10/2025/) release — re-check before citing in an interview, as OWASP periodically renumbers categories.

## Steps

```bash
# 1. Instala Semgrep (SAST) y Gitleaks (secret scanning) en tu entorno virtual
python -m pip install semgrep
# Gitleaks: descarga el binario para tu OS desde
# https://github.com/gitleaks/gitleaks/releases (o `brew install gitleaks` en macOS)

# 2. Crea un repo de práctica y pide a un asistente de IA (Copilot/ChatGPT/Claude)
#    que genere 6 pequeños fragmentos de código, uno por vulnerabilidad:
#    "Write a Flask endpoint that looks up a user by ID in SQLite"  → probable SQLi
#    "Write a Flask route that renders a comment submitted by a user" → probable XSS
#    "Write a function that serves a file given a filename from the query string" → Path Traversal
#    "Write an admin endpoint that deletes a user by ID" → probable Auth Bypass
#    "Write a script that calls the OpenAI API" → probable secreto hardcodeado
#    "Write a function that fetches and returns the content of a URL provided by the user" → SSRF

# 3. Corre Semgrep con el ruleset de OWASP Top 10 sobre el repo completo
semgrep --config p/owasp-top-ten .

# 4. Corre un segundo ruleset más amplio de seguridad general
semgrep --config p/security-audit .

# 5. Corre Gitleaks para detectar secretos
gitleaks detect --source . --report-path reports/gitleaks-report.json

# 6. Guarda ambos reportes en reports/ — son tu evidencia
```

<details>
<summary>Mapping: Semgrep/Gitleaks finding → vulnerability class → CWE</summary>

| Tool | Rule/finding pattern (example) | Vulnerability class | CWE |
|------|----------------------------------|----------------------|-----|
| Semgrep `p/owasp-top-ten` | `python.lang.security.audit.formatted-sql-query` | SQL Injection | CWE-89 |
| Semgrep `p/owasp-top-ten` | `python.flask.security.audit.xss.debug` / unescaped template render | XSS | CWE-79 |
| Semgrep `p/security-audit` | `path-traversal-open` / `os.path.join` with unvalidated input | Path Traversal | CWE-22 |
| Semgrep `p/security-audit` | Missing `@login_required` / `@require_auth` decorator on sensitive route | Auth Bypass | CWE-287 / CWE-306 |
| Gitleaks | `generic-api-key`, `openai-api-key`, `aws-access-key` | Secrets in Code | CWE-798 |
| Semgrep `p/security-audit` | `requests.get(user_supplied_url)` without allow-list | SSRF | CWE-918 |

> Rule IDs evolve with Semgrep's rule registry — run `semgrep --config p/owasp-top-ten --json .` and inspect `check_id` to see the exact IDs your version reports.
</details>

<details>
<summary>Alternative / complementary free tools</summary>

- **[CodeQL](https://codeql.github.com/)** (free for public repositories and open source) — GitHub's SAST engine; strong on all 6 classes and integrates with GitHub code scanning + **Copilot Autofix**.
- **[Bandit](https://github.com/PyCQA/bandit)** (free, Python-specific) — good complement to Semgrep for Python-only projects, especially for hardcoded secrets and `subprocess`/`eval` misuse.
- **[TruffleHog](https://github.com/trufflesecurity/trufflehog)** (free, open source) — alternative secret scanner with live credential verification.
- **[OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)** — a free checklist to verify authentication/access-control requirements beyond what a scanner alone can catch (e.g., business-logic auth bypass).
</details>

## 📦 Deliverable

An `ai-code-security-review/` repository with:

1. `README.md` — which AI assistant generated the code, the prompts you used, and a summary table: vulnerability → CWE → OWASP category → severity.
2. `vulnerable/` — the original AI-generated snippets, unmodified (6 files, one per vulnerability class).
3. `fixed/` — your remediated version of each snippet, with a one-line comment explaining the fix.
4. `reports/` — raw Semgrep and Gitleaks output (JSON) as evidence.
5. A short **"lessons for prompting"** section: what instruction you'd add to your prompt next time to reduce the chance the assistant reproduces each vulnerability (e.g., "always use parameterized queries," "never hardcode credentials, use environment variables").

## ✅ Success criteria

- [ ] Reproduced and detected **all 6 vulnerability classes** (SQLi, XSS, Path Traversal, Auth Bypass, Secrets in Code, SSRF).
- [ ] Each finding is mapped to its **CWE ID** and **OWASP Top 10:2025 category**.
- [ ] Each vulnerability has a corresponding **fixed version** with an explanation.
- [ ] Ran **both** Semgrep and Gitleaks and kept the raw reports as evidence.
- [ ] The README is understandable by a non-technical hiring manager in 2 minutes.

:::warning[Use disposable, synthetic examples only]
Generate and test only in a local, throwaway repository. Never point these scanners at production code you do not own, and never commit real secrets (even fake-looking ones tied to real accounts) to a public repository.
:::

---

**Previous:** [← Challenge 4](./challenge-04) · **Back to** [track home](./overview)

## 🎓 You finished the track — now what?

1. Publish the **5 repos** on your GitHub and pin them on your profile.
2. Write **1 LinkedIn post per challenge** explaining what you learned (this creates recruiter visibility).
3. Add the [resume line](./overview#-resume-value) to your CV.
4. Prepare a **5-minute demo** of your favorite for interviews.
