---
sidebar_position: 2
title: "Fuentes y Verificación v4"
---

# Fuentes y Verificación (v4)

:::info Por qué existe esta página
Un plan de nivel arquitectura/ingeniería solo es creíble si sus certificaciones y recursos son **reales, vigentes y verificables de forma independiente**. Esta página documenta cada credencial, framework y recurso clave del plan v4 con enlaces a **fuentes primarias** (Microsoft Learn, GitHub, organismos de estándares) para que cualquier persona —o un reclutador técnico— lo confirme directamente.
:::

## Método de verificación

1. **Solo fuentes primarias** — páginas oficiales del proveedor, no blogs ni agregadores.
2. **Registrar la fecha "verificado el"** — el portafolio de certificaciones AI de Microsoft está en plena rotación 2026.
3. **Separar hecho de recomendación** — la existencia y el alcance de un examen es *hecho verificable*; la secuencia y el timing son *criterio*.
4. **Re-verificar antes de cada examen** — con exámenes en beta/GA rolling durante 2026, el estado cambia mes a mes.

**Última verificación:** 2026-07-17

:::warning El portafolio AI de Microsoft está cambiando en 2026
Microsoft anunció una renovación de credenciales Azure y Data/AI. Varios exámenes de este plan son **nuevos o en transición beta → GA durante 2026**. Confirma el estado (beta/GA), *skills measured* y disponibilidad de *practice assessment* en la página oficial **antes de calendarizar**. Anuncio oficial: [Updates to several Azure and Data/AI certifications](https://learn.microsoft.com/en-us/credentials/certifications/posts/updates-to-several-azure-and-data-ai-certifications-are-coming-soon).
:::

---

## Certificaciones del plan v4 (verificadas)

| Certificación | Código | Estado (2026) | Fuente primaria |
|---------------|--------|---------------|-----------------|
| Azure AI Apps and Agents Developer Associate | **AI-103** | Reemplaza a AI-102 (que se retira **30-jun-2026**); valida Python + Microsoft Foundry | [Página de la credencial](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/) · [Study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103) |
| Azure Solutions Architect Expert | **AZ-305** | Vigente (nivel Expert) | [Página de la credencial](https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/) |
| Cloud and AI Security Engineer Associate | **SC-500** | Nuevo/actualizado 2026 — **verifica beta/GA antes de calendarizar** | [Página de la credencial](https://learn.microsoft.com/en-us/credentials/certifications/cloud-and-ai-security-engineer-associate/) |
| GitHub Copilot | **GH-300** | Vigente · $99 USD · 700/1000 · válida 24 meses · disponible en español | [Página de la credencial](https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/) · [Study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300) |
| Azure AI Cloud Developer Associate | **AI-200** | Nuevo 2026 (transición beta → GA) — **verifica disponibilidad** | [Anuncio oficial de credenciales](https://learn.microsoft.com/en-us/credentials/certifications/posts/updates-to-several-azure-and-data-ai-certifications-are-coming-soon) |

:::note Contexto de la transición AI-102 → AI-103
La página oficial confirma que **AI-102 se retira el 30 de junio de 2026** y que **AI-103 (Azure AI Apps and Agents Developer Associate)** es su sucesora, orientada a construir apps de IA generativa y soluciones **multi-agente con Microsoft Foundry** usando Python. No hay migración automática: para la credencial nueva hay que presentar el examen nuevo. Otros movimientos del portafolio 2026 relevantes: **AI-901** (reemplaza a AI-900), **AI-300** (MLOps Engineer). Confirma siempre en la fuente.
:::

---

## Frameworks de arquitectura, gobernanza y seguridad (verificados)

| Framework | Emisor | Identificador oficial | Fuente primaria |
|-----------|--------|-----------------------|-----------------|
| Azure Well-Architected Framework | Microsoft | WAF | [learn.microsoft.com](https://learn.microsoft.com/es-es/azure/well-architected/) |
| Cloud Adoption Framework | Microsoft | CAF | [learn.microsoft.com](https://learn.microsoft.com/es-es/azure/cloud-adoption-framework/) |
| AI Risk Management Framework | NIST (EE. UU.) | AI RMF 1.0 (NIST AI 100-1) | [nist.gov](https://www.nist.gov/itl/ai-risk-management-framework) |
| Sistema de gestión de IA | ISO/IEC | ISO/IEC 42001:2023 | [iso.org](https://www.iso.org/standard/81230.html) |
| Ley de IA de la UE | Unión Europea | Reglamento (UE) 2024/1689 | [eur-lex.europa.eu](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) |
| Zero Trust Architecture | NIST | SP 800-207 | [csrc.nist.gov](https://csrc.nist.gov/pubs/sp/800/207/final) |
| Top 10 para LLMs | OWASP | OWASP Top 10 for LLM Apps | [owasp.org](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Amenazas a sistemas de IA | MITRE | MITRE ATLAS | [atlas.mitre.org](https://atlas.mitre.org/) |

---

## Recursos técnicos gratuitos y de bajo costo (fuentes confiables)

Stack verificado para construir la evidencia técnica del plan (RAG, agentes, evaluación) sin costo o a bajo costo.

| Recurso | Proveedor | Costo | Fuente primaria |
|---------|-----------|-------|-----------------|
| Azure AI Foundry Documentation | Microsoft | **Gratis** | [learn.microsoft.com](https://learn.microsoft.com/es-es/azure/ai-foundry/) |
| Microsoft Learn (rutas Azure AI / Foundry) | Microsoft | **Gratis** (badges/Applied Skills) | [learn.microsoft.com](https://learn.microsoft.com/es-es/training/browse/?products=azure-ai-foundry) |
| Practice Assessments oficiales | Microsoft Learn | **Gratis** | [learn.microsoft.com](https://learn.microsoft.com/es-es/credentials/browse/) |
| DeepLearning.AI — cursos cortos GenAI/RAG/agentes | DeepLearning.AI | **Gratis** | [deeplearning.ai/short-courses](https://www.deeplearning.ai/short-courses/) |
| Azure Samples (RAG, agentes) | Microsoft (GitHub) | **Gratis** | [github.com/Azure-Samples](https://github.com/Azure-Samples) |
| GitHub Skills | GitHub | **Gratis** | [skills.github.com](https://skills.github.com/) |
| Anthropic / OpenAI cookbooks | Anthropic / OpenAI | **Gratis** | [anthropic.com/learn](https://www.anthropic.com/learn) · [cookbook.openai.com](https://cookbook.openai.com/) |

:::tip Para quien está entre trabajos
El **stack gratuito** (Microsoft Learn + Azure AI Foundry docs + Azure Samples + DeepLearning.AI + practice assessments oficiales) cubre casi toda la construcción de evidencia. El gasto obligatorio son los **exámenes de certificación**; Microsoft ofrece **vouchers gratuitos** periódicamente en sus *Virtual Training Days*. Verifica en la [página de eventos de Microsoft Learn](https://learn.microsoft.com/es-es/training/) antes de pagar.
:::

---

## Cambios de producto que ya reflejamos

| Antes | Ahora | Nota |
|-------|-------|------|
| Azure AI Studio (`/azure/ai-studio/`) | **Azure AI Foundry** (`/azure/ai-foundry/`) | Renombrado por Microsoft; URLs actualizadas en Fase 5 |
| Power BI "Guided Learning" | Rutas modulares de Power BI | La ruta lineal fue retirada (Fase 2) |
| AI-102 (Azure AI Engineer) | **AI-103** (Azure AI Apps and Agents Developer) | AI-102 se retira 30-jun-2026 |

---

## Marcos de diseño de aprendizaje y datos de mercado

La [Metodología y Mejores Prácticas v4](./methodology-best-practices) se apoya en estas fuentes primarias:

| Fuente | Qué aporta | Tipo | Fuente primaria |
|--------|-----------|------|-----------------|
| WEF *Future of Jobs Report 2025* | Habilidades en demanda y datos de transformación por IA (86%, 39%, ~63%) | Reporte de investigación | [weforum.org](https://www.weforum.org/publications/the-future-of-jobs-report-2025/) |
| Modelo 70-20-10 | Balance experiencia/social/formal en desarrollo profesional | Marco (CCL) | [ccl.org](https://www.ccl.org/articles/leading-effectively-articles/70-20-10-rule/) |
| Dunlosky et al. (2013) | Eficacia de active recall y spaced/retrieval practice | Estudio revisado por pares | [journals.sagepub.com](https://journals.sagepub.com/doi/10.1177/1529100612453266) |
| Google Career Certificates / AWS re/Start / IBM SkillsBuild | Diseño con proyectos + capstone + conexión con empleadores | Programas de referencia | [grow.google/certificates](https://grow.google/certificates/) · [aws.amazon.com](https://aws.amazon.com/training/restart/) · [skillsbuild.org](https://skillsbuild.org/) |

:::note Sobre las estadísticas y proporciones
Las cifras del WEF (86% / 39% / ~63%) son **datos de encuesta a empleadores**, no proyecciones garantizadas. Las proporciones **70-20-10** son una **filosofía orientadora** (CCL, 1988), no una fórmula validada estadísticamente. Los porcentajes de resultados de empleo de Google/AWS/IBM son **reportados por cada proveedor**.
:::

---

## Nota sobre rangos salariales

Cualquier rango salarial asociado a roles de este plan (AI Solution Architect, AI Success Engineer, AI Platform Engineer) es **orientativo**, no una garantía. Varía fuertemente por país, industria, tamaño de empresa y seniority. Para cifras en vivo:

- [Levels.fyi](https://www.levels.fyi/) — compensación tech por nivel y empresa
- [Glassdoor](https://www.glassdoor.com/) — rangos por rol y ubicación
- Reportes de Robert Half / Michael Page (verificar el año)

---

## Registro de honestidad

- **Hechos verificados:** existencia y alcance de AI-103, AZ-305, SC-500, GH-300 y AI-200; retiro de AI-102 (30-jun-2026); identificadores de frameworks (WAF, CAF, NIST AI RMF 1.0, ISO/IEC 42001:2023, EU AI Act = Reglamento (UE) 2024/1689, NIST SP 800-207).
- **Criterio (no hecho):** la secuencia de fases, el timing semanal y la selección de proyectos son *recomendaciones*.
- **Estado en movimiento:** AI-103, AI-200 y SC-500 están en transición beta → GA durante 2026; confirma disponibilidad antes de calendarizar.
- **Orientativo pendiente de verificación:** rangos salariales y cualquier estadística de mercado.
