---
sidebar_position: 7
title: "Fuentes y Verificación"
---

# Fuentes y Verificación

:::info Por qué existe esta página
Un plan de aprendizaje solo es confiable si sus recomendaciones son **reales, vigentes y verificables de forma independiente**. Esta página documenta cada certificación, framework y recurso clave referenciado en el plan, con enlaces a **fuentes primarias** (universidades, Microsoft, organismos de estándares) para que cualquier persona —o un reclutador— pueda confirmarlos directamente.
:::

## Método de verificación

1. **Solo fuentes primarias** — páginas oficiales del proveedor, no blogs ni agregadores.
2. **Registrar la fecha "verificado el"** — las certificaciones y URLs cambian; anotamos cuándo se confirmó cada una.
3. **Separar hecho de recomendación** — la existencia y el alcance de un examen es *hecho verificable*; la secuencia y el timing son *criterio*.
4. **Re-verificar antes de cada examen** — Microsoft renueva, renombra o retira credenciales con regularidad.

**Última verificación:** 2026-07-17

---

## Certificaciones (vigentes, verificadas)

| Certificación | Código | Precio (USD) | Idioma examen | Fuente primaria |
|---------------|--------|--------------|---------------|-----------------|
| Azure Fundamentals | AZ-900 | $99 (+ impuestos) | Español disponible | [learn.microsoft.com](https://learn.microsoft.com/es-es/credentials/certifications/azure-fundamentals/) |
| Security, Compliance & Identity Fundamentals | SC-900 | $99 (+ impuestos) | Español disponible | [learn.microsoft.com](https://learn.microsoft.com/es-es/credentials/certifications/security-compliance-and-identity-fundamentals/) |
| Azure AI Fundamentals | AI-900 | $99 (+ impuestos) | Español disponible | [learn.microsoft.com](https://learn.microsoft.com/es-es/credentials/certifications/azure-ai-fundamentals/) |
| GitHub Foundations | GH-900 | $99 (prep gratis) | Inglés | [learn.microsoft.com](https://learn.microsoft.com/es-es/credentials/certifications/github-foundations/) |
| Azure AI Engineer Associate | AI-102 | $165 (+ impuestos) | Español disponible | [learn.microsoft.com](https://learn.microsoft.com/es-es/credentials/certifications/azure-ai-engineer/) |

:::warning Sobre AI-102 (nivel Associate)
La página oficial de *skills measured* confirma que **AI-102 está orientada a desarrolladores** que usan **Python o C#** con los SDKs de Azure AI. Para este perfil (IT Manager con algo de programación que apunta a **AI Program Manager / AI Governance / TPM**) es **opcional y avanzada**: solo vale la pena si el objetivo incluye construir soluciones AI con código. Para roles de gobernanza/programa, priorizar AI-900 + portafolio de proyectos + frameworks (NIST/ISO) rinde más.
:::

:::note Guardarraíl de vigencia
Microsoft actualiza *skills measured*, precios y disponibilidad de *practice assessments* con frecuencia. **Antes de calendarizar cualquier examen**, confirma en la página oficial de la credencial: estado del examen, temario vigente y si hay *practice assessment* gratuito.
:::

---

## Frameworks de gobernanza y seguridad (verificados)

| Framework | Emisor | Identificador oficial | Fuente primaria |
|-----------|--------|-----------------------|-----------------|
| AI Risk Management Framework | NIST (EE. UU.) | AI RMF 1.0 (NIST AI 100-1) | [nist.gov](https://www.nist.gov/itl/ai-risk-management-framework) |
| Sistema de gestión de IA | ISO/IEC | ISO/IEC 42001:2023 | [iso.org](https://www.iso.org/standard/81230.html) |
| Ley de IA de la UE | Unión Europea | Reglamento (UE) 2024/1689 | [eur-lex.europa.eu](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) |
| Zero Trust Architecture | NIST | SP 800-207 | [csrc.nist.gov](https://csrc.nist.gov/pubs/sp/800/207/final) |
| Top 10 para LLMs | OWASP | OWASP Top 10 for LLM Apps | [owasp.org](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Amenazas a sistemas de IA | MITRE | MITRE ATLAS | [atlas.mitre.org](https://atlas.mitre.org/) |

---

## Recursos gratuitos y de bajo costo (fuentes confiables)

Opciones verificadas para construir las mismas competencias sin costo o a bajo costo — clave para quien está en transición o reposicionamiento laboral.

| Recurso | Proveedor | Costo | Certificado | Fuente primaria |
|---------|-----------|-------|-------------|-----------------|
| Elements of AI | Universidad de Helsinki + Reaktor | **Gratis** | Gratis | [elementsofai.com](https://www.elementsofai.com/) |
| Google AI Essentials | Google | Bajo costo (audit gratis en Coursera) | De pago | [grow.google/ai-essentials](https://grow.google/ai-essentials/) |
| AI for Everyone (Andrew Ng) | DeepLearning.AI (Coursera) | **Audit gratis** | De pago | [coursera.org](https://www.coursera.org/learn/ai-for-everyone) |
| Generative AI for Everyone | DeepLearning.AI (Coursera) | **Audit gratis** | De pago | [deeplearning.ai](https://www.deeplearning.ai/courses/generative-ai-for-everyone/) |
| Rutas de aprendizaje AI | Microsoft Learn | **Gratis** | Gratis (badges/Applied Skills) | [learn.microsoft.com](https://learn.microsoft.com/es-es/training/) |
| Prep + Practice Assessments oficiales | Microsoft Learn | **Gratis** | N/A | [learn.microsoft.com](https://learn.microsoft.com/es-es/credentials/browse/) |
| Python para Todos (Py4E) | Univ. de Michigan (Dr. Chuck) | **Gratis** | Opcional | [py4e.com](https://www.py4e.com/) |
| GitHub Skills | GitHub | **Gratis** | N/A | [skills.github.com](https://skills.github.com/) |
| Anthropic Academy | Anthropic | **Gratis** | Varía | [anthropic.com/learn](https://www.anthropic.com/learn) |

:::tip Para quien está entre trabajos
El **stack gratuito** (Elements of AI + Microsoft Learn + Py4E + GitHub Skills + practice assessments oficiales) cubre casi todo el plan sin costo. El único gasto obligatorio son los **exámenes de certificación (~$99 c/u)** — y Microsoft ofrece **vouchers gratuitos** periódicamente en sus *Virtual Training Days*. Verifica en la [página de eventos de Microsoft Learn](https://learn.microsoft.com/es-es/training/) antes de pagar.
:::

---

## Cambios de producto que ya reflejamos

Los planes de aprendizaje se desactualizan cuando los proveedores renombran productos. Estos ya están corregidos en el plan:

| Antes | Ahora | Nota |
|-------|-------|------|
| Azure AI Studio (`/azure/ai-studio/`) | **Azure AI Foundry** (`/azure/ai-foundry/`) | Renombrado por Microsoft; URLs actualizadas |
| Power BI "Guided Learning" | Rutas modulares de Power BI | La ruta lineal fue retirada |
| Google AI Essentials (URL antigua) | `grow.google/ai-essentials/` | URL oficial vigente |
| MeasureUp (practice tests de pago) | **Practice Assessments oficiales de Microsoft (gratis)** | Alternativa oficial y sin costo |

---

## Nota sobre rangos salariales

Los rangos salariales del [Plan Overview](./overview) son **orientativos (mercado de EE. UU., 2025-2026)**, no garantías. Varían fuertemente por país, industria, tamaño de empresa y seniority. Para cifras específicas por región/rol, consulta fuentes de datos en vivo como:

- [Levels.fyi](https://www.levels.fyi/) — compensación tech por nivel y empresa
- [Glassdoor](https://www.glassdoor.com/) — rangos por rol y ubicación
- Reportes de mercado de Robert Half / Michael Page (verificar el año)

---

## Registro de honestidad

- **Hechos verificados:** existencia, código, precio (~$99 fundamentals / $165 AI-102) e idioma de las certificaciones Microsoft; identificadores de frameworks (NIST AI RMF 1.0, ISO/IEC 42001:2023, EU AI Act = Reglamento (UE) 2024/1689, NIST SP 800-207).
- **Criterio (no hecho):** la secuencia de fases, el timing semanal y la selección de roles objetivo son *recomendaciones*.
- **Orientativo pendiente de verificación:** rangos salariales y cualquier estadística de mercado.
- **Precios e URLs cambian:** confirma siempre en la fuente antes de inscribirte o calendarizar un examen.
