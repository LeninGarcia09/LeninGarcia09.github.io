---
sidebar_position: 6
title: "Reto 5 — Revisión Segura de Código Generado por IA"
---

# Reto 5: Revisión segura de código generado por IA y agentes

> **Herramientas:** [Semgrep OSS](https://github.com/semgrep/semgrep) (open source, LGPL 2.1) + [Gitleaks](https://github.com/gitleaks/gitleaks) (open source, MIT) · **Frameworks:** [OWASP Top 10:2025](https://owasp.org/Top10/2025/) + [CWE Top 25](https://cwe.mitre.org/top25/) · **Tiempo:** 3–4 h

:::tip[Qué vas a construir]
Un **pipeline de revisión segura de código**: generas código con un asistente de IA (Copilot, ChatGPT, Claude), reproduces deliberadamente las **6 clases de vulnerabilidad más comunes en código generado por IA**, y luego las detectas y corriges con herramientas gratuitas de análisis estático. Este es el artefacto que demuestra que puedes ser el control humano para código escrito por IA — el requisito de mayor crecimiento en ofertas de Seguridad de IA.
:::

**Dónde ejecutas esto:** en tu máquina, dentro del entorno del [Paso 0](./overview#️-paso-0--entorno-aislado-una-sola-vez-5-min). No necesitas cuenta de cloud.

## Por qué importa para el empleo

Los asistentes de codificación con IA generan código más rápido de lo que los equipos pueden revisarlo, y estudios de **Snyk, Veracode y Georgetown CSET** encuentran consistentemente que una proporción relevante de muestras de código generado por IA contiene al menos una de las clases clásicas de vulnerabilidad OWASP/CWE — porque el modelo fue entrenado con código que también las contenía. Las ofertas de AI Security Engineer, AppSec Engineer y "desarrollo seguro asistido por IA" ahora piden explícitamente la capacidad de **revisar, priorizar y corregir código generado por IA**, no solo prompt-earlo. Este reto te da un proceso repetible y respaldado por herramientas para exactamente eso.

## 🎯 Las 6 clases de vulnerabilidad que vas a detectar

Cualquier asistente de codificación con IA puede reproducirlas — son debilidades antiguas y bien documentadas, no riesgos nuevos de "IA". Conocerlas a fondo, y saber encontrarlas automáticamente, es una habilidad central de AppSec que se transfiere directamente a la revisión de salidas de IA.

| # | Vulnerabilidad | CWE | Categoría OWASP Top 10:2025 | Error típico del código generado por IA |
|---|----------------|-----|------------------------------|-------------------------------|
| 1 | **SQL Injection** | [CWE-89](https://cwe.mitre.org/data/definitions/89.html) | A05:2025 – Injection | Consulta concatenada como string en vez de consulta parametrizada/ORM |
| 2 | **Cross-Site Scripting (XSS)** | [CWE-79](https://cwe.mitre.org/data/definitions/79.html) | A05:2025 – Injection | Renderizar entrada del usuario en HTML/JS sin escapar |
| 3 | **Path Traversal** | [CWE-22](https://cwe.mitre.org/data/definitions/22.html) | A01:2025 – Broken Access Control | Construir una ruta de archivo desde entrada del usuario sin validar `../` |
| 4 | **Auth Bypass** | [CWE-287](https://cwe.mitre.org/data/definitions/287.html) / [CWE-306](https://cwe.mitre.org/data/definitions/306.html) | A07:2025 – Authentication Failures | Falta el chequeo de autenticación en un endpoint nuevo que el modelo generó |
| 5 | **Secretos en Código** | [CWE-798](https://cwe.mitre.org/data/definitions/798.html) | A02:2025 – Security Misconfiguration | API key/contraseña hardcodeada que el modelo usó como "ejemplo funcional" |
| 6 | **SSRF** | [CWE-918](https://cwe.mitre.org/data/definitions/918.html) | A01:2025 – Broken Access Control | El servidor obtiene una URL proporcionada por el usuario sin lista de permitidos |

> Números de categoría verificados contra la edición vigente [OWASP Top 10:2025](https://owasp.org/Top10/2025/) — vuelve a verificarlos antes de citarlos en una entrevista, ya que OWASP renumera categorías periódicamente.

## Pasos

```bash
# 1. Instala Semgrep (SAST) y Gitleaks (escaneo de secretos) en tu entorno virtual
python -m pip install semgrep
# Gitleaks: descarga el binario para tu OS desde
# https://github.com/gitleaks/gitleaks/releases (o `brew install gitleaks` en macOS)

# 2. Crea un repo de práctica y pide a un asistente de IA (Copilot/ChatGPT/Claude)
#    que genere 6 fragmentos pequeños de código, uno por vulnerabilidad:
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
<summary>Mapeo: hallazgo de Semgrep/Gitleaks → clase de vulnerabilidad → CWE</summary>

| Herramienta | Patrón de regla/hallazgo (ejemplo) | Clase de vulnerabilidad | CWE |
|------|----------------------------------|----------------------|-----|
| Semgrep `p/owasp-top-ten` | `python.lang.security.audit.formatted-sql-query` | SQL Injection | CWE-89 |
| Semgrep `p/owasp-top-ten` | `python.flask.security.audit.xss.debug` / render sin escapar | XSS | CWE-79 |
| Semgrep `p/security-audit` | `path-traversal-open` / `os.path.join` con entrada sin validar | Path Traversal | CWE-22 |
| Semgrep `p/security-audit` | Decorador `@login_required` / `@require_auth` faltante en ruta sensible | Auth Bypass | CWE-287 / CWE-306 |
| Gitleaks | `generic-api-key`, `openai-api-key`, `aws-access-key` | Secretos en Código | CWE-798 |
| Semgrep `p/security-audit` | `requests.get(url_del_usuario)` sin lista de permitidos | SSRF | CWE-918 |

> Los IDs de reglas evolucionan con el registro de reglas de Semgrep — corre `semgrep --config p/owasp-top-ten --json .` e inspecciona `check_id` para ver los IDs exactos que reporta tu versión.
</details>

<details>
<summary>Herramientas gratuitas alternativas/complementarias</summary>

- **[CodeQL](https://codeql.github.com/)** (gratis para repos públicos y open source) — motor SAST de GitHub; fuerte en las 6 clases y se integra con GitHub code scanning + **Copilot Autofix**.
- **[Bandit](https://github.com/PyCQA/bandit)** (gratis, específico de Python) — buen complemento a Semgrep para proyectos solo-Python, especialmente para secretos hardcodeados y mal uso de `subprocess`/`eval`.
- **[TruffleHog](https://github.com/trufflesecurity/trufflehog)** (gratis, open source) — escáner de secretos alternativo con verificación en vivo de credenciales.
- **[OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)** — checklist gratuito para verificar requisitos de autenticación/control de acceso más allá de lo que un escáner solo puede detectar (ej. auth bypass de lógica de negocio).
</details>

## 📦 Entregable

Un repositorio `ai-code-security-review/` con:

1. `README.md` — qué asistente de IA generó el código, los prompts que usaste, y una tabla resumen: vulnerabilidad → CWE → categoría OWASP → severidad.
2. `vulnerable/` — los fragmentos originales generados por IA, sin modificar (6 archivos, uno por clase de vulnerabilidad).
3. `fixed/` — tu versión corregida de cada fragmento, con un comentario de una línea explicando la corrección.
4. `reports/` — salida cruda de Semgrep y Gitleaks (JSON) como evidencia.
5. Una breve sección **"lecciones para hacer prompts"**: qué instrucción añadirías a tu prompt la próxima vez para reducir la probabilidad de que el asistente reproduzca cada vulnerabilidad (ej. "usa siempre consultas parametrizadas", "nunca hardcodees credenciales, usa variables de entorno").

## ✅ Criterios de éxito

- [ ] Reprodujiste y detectaste **las 6 clases de vulnerabilidad** (SQLi, XSS, Path Traversal, Auth Bypass, Secretos en Código, SSRF).
- [ ] Cada hallazgo está mapeado a su **ID de CWE** y **categoría OWASP Top 10:2025**.
- [ ] Cada vulnerabilidad tiene una **versión corregida** correspondiente con explicación.
- [ ] Corriste **ambas** herramientas, Semgrep y Gitleaks, y guardaste los reportes crudos como evidencia.
- [ ] El README es entendible por un hiring manager no técnico en 2 minutos.

:::warning[Usa solo ejemplos sintéticos y descartables]
Genera y prueba únicamente en un repositorio local y desechable. Nunca apuntes estos escáneres a código de producción que no te pertenece, y nunca hagas commit de secretos reales (incluso los que parecen falsos pero están ligados a cuentas reales) en un repositorio público.
:::

---

**Anterior:** [← Reto 4](./challenge-04) · **Volver al** [inicio del track](./overview)

## 🎓 Terminaste el track — ¿ahora qué?

1. Publica los **5 repos** en tu GitHub y fíjalos (pin) en tu perfil.
2. Escribe **1 post de LinkedIn por reto** explicando qué aprendiste (esto genera visibilidad con reclutadores).
3. Añade la [línea de CV](./overview#-valor-para-el-cv) a tu currículum.
4. Prepara una **demo de 5 minutos** de tu favorito para entrevistas.
