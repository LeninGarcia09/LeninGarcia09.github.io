---
sidebar_position: 4
title: "Fase 4 — AI para Negocios e IT"
---

# Fase 4: AI para Negocios e IT (Semanas 17–21)

> **Objetivo:** Convertir la base tecnica en narrativa de valor de negocio: proyectos publicables, adopcion enterprise y evidencia para entrevistas de AI Success Engineering.

## 🎯 Resultados Esperados

Al completar esta fase:
- Comprensión profunda de Generative AI y sus aplicaciones
- Prompt engineering avanzado para escenarios empresariales
- Conocimiento de AI Governance (NIST AI RMF, ISO 42001)
- Responsible AI principles aplicados
- Microsoft Copilot y agentes dominados
- 2 proyectos AI completos en portfolio
- Sitio web portfolio publicado

---

## Semana 13: Fundamentos de Generative AI

### Objetivo
Entender cómo funcionan los LLMs, sus capacidades y limitaciones.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [DeepLearning.AI: Generative AI for Everyone](https://www.deeplearning.ai/courses/generative-ai-for-everyone/) | 🇬🇧 Inglés (subs ES) | Curso | 5 hrs |
| [Microsoft Learn: Generative AI](https://learn.microsoft.com/es-es/training/paths/introduction-generative-ai/) | 🇪🇸 Español | Learning Path | 4 hrs |
| [Google: Introduction to Generative AI](https://www.cloudskillsboost.google/paths/118) | 🇬🇧 Inglés | Course | 3 hrs |
| [Coursera: Generative AI Concepts](https://www.coursera.org/learn/introduction-to-generative-ai) | 🇬🇧 Inglés (subs ES) | Course | 4 hrs |
| [IBM: Generative AI Fundamentals](https://www.ibm.com/training/collection/generative-ai) | 🇬🇧 Inglés | Course | 3 hrs |

### Plan Diario

| Día | Tema | Recurso |
|-----|------|---------|
| Lunes | ¿Qué son los LLMs? Transformers, tokens | DeepLearning.AI |
| Martes | Capacidades: text generation, summarization, code | Microsoft Learn |
| Miércoles | Limitaciones: hallucinations, bias, knowledge cutoff | DeepLearning.AI |
| Jueves | Casos de uso empresariales | Google course |
| Viernes | Evaluación: ¿cuándo usar AI vs. no? | Reflexión + journal |

### Conceptos Clave

```
LLM Architecture:
├── Pre-training (massive data)
├── Fine-tuning (specialized tasks)
├── RLHF (human feedback alignment)
├── Inference (generating responses)
└── Limitations
    ├── Hallucinations
    ├── Knowledge cutoff
    ├── Context window limits
    └── Bias amplification
```

---

## Semana 14: Prompt Engineering

### Objetivo
Dominar el arte de comunicarse efectivamente con modelos de AI para obtener resultados profesionales.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [DeepLearning.AI: ChatGPT Prompt Engineering](https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/) | 🇬🇧 Inglés | Course | 2 hrs |
| [Microsoft: Prompt Engineering Techniques](https://learn.microsoft.com/es-es/azure/ai-services/openai/concepts/prompt-engineering) | 🇪🇸 Español | Docs | 3 hrs |
| [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering) | 🇬🇧 Inglés | Guide | 2 hrs |
| [Anthropic Prompt Engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) | 🇬🇧 Inglés | Guide | 2 hrs |
| [Google: Prompt Design](https://ai.google.dev/gemini-api/docs/prompting-strategies) | 🇬🇧 Inglés | Guide | 2 hrs |

### Plan Diario

| Día | Técnica | Práctica |
|-----|---------|----------|
| Lunes | Zero-shot, few-shot prompting | 10 prompts de práctica |
| Martes | Chain of Thought (CoT) | Análisis paso a paso |
| Miércoles | Role prompting + system prompts | Crear personas especializadas |
| Jueves | Output formatting (JSON, tables, reports) | Templates empresariales |
| Viernes | Prompt chains y workflows | Multi-step analysis |

### 🔨 Proyecto: Biblioteca de Prompts Profesionales

Crear una colección documentada de prompts para:

**Seguridad:**
- Análisis de incidentes de seguridad
- Generación de IOCs a partir de logs
- Resumen ejecutivo de vulnerabilidades

**Compliance:**
- Revisión de políticas contra frameworks
- Gap analysis automatizado
- Checklist de compliance

**Management:**
- Resúmenes ejecutivos de proyectos
- Análisis de riesgos
- Planes de acción

**Entregable:** Repositorio en GitHub con prompts documentados, categorizados, y con ejemplos de input/output.

---

## Semana 15: AI Governance

### Objetivo
Entender los frameworks de gobernanza de AI que las organizaciones están adoptando.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) | 🇬🇧 Inglés | Framework | 6 hrs |
| [ISO/IEC 42001:2023 Overview](https://www.iso.org/standard/81230.html) | 🇬🇧 Inglés | Standard | 3 hrs |
| [EU AI Act Summary](https://artificialintelligenceact.eu/) | 🇬🇧 Inglés | Regulation | 4 hrs |
| [OECD AI Principles](https://oecd.ai/en/ai-principles) | 🇪🇸 Español disponible | Principles | 2 hrs |
| [Microsoft AI Governance Framework](https://blogs.microsoft.com/on-the-issues/2024/05/21/microsoft-ai-governance-blueprint/) | 🇬🇧 Inglés | Blueprint | 2 hrs |

### Plan Diario

| Día | Framework | Foco |
|-----|-----------|------|
| Lunes | NIST AI RMF: Govern function | Políticas y roles |
| Martes | NIST AI RMF: Map function | Identificar riesgos AI |
| Miércoles | NIST AI RMF: Measure function | Métricas y evaluación |
| Jueves | NIST AI RMF: Manage function | Respuesta y monitoreo |
| Viernes | ISO 42001 + EU AI Act overview | Contexto regulatorio global |

### Conceptos Clave: NIST AI RMF

```
NIST AI Risk Management Framework:
├── GOVERN
│   ├── Policies & procedures
│   ├── Roles & responsibilities
│   └── Organizational culture
├── MAP
│   ├── Context & use cases
│   ├── Risk identification
│   └── Stakeholder engagement
├── MEASURE
│   ├── Metrics & benchmarks
│   ├── Testing & evaluation
│   └── Bias assessment
└── MANAGE
    ├── Risk prioritization
    ├── Response strategies
    └── Continuous monitoring
```

---

## Semana 16: Responsible AI

### Objetivo
Aplicar principios de AI responsable en diseño y deployment de sistemas.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [Microsoft Responsible AI Resources](https://www.microsoft.com/ai/responsible-ai) | 🇪🇸 Español | Framework | 4 hrs |
| [Microsoft Learn: Responsible AI](https://learn.microsoft.com/es-es/training/paths/responsible-ai-business-principles/) | 🇪🇸 Español | Learning Path | 4 hrs |
| [Google: Responsible AI Practices](https://ai.google/responsibility/responsible-ai-practices/) | 🇬🇧 Inglés | Guide | 3 hrs |
| [IBM AI Ethics](https://www.ibm.com/artificial-intelligence/ethics) | 🇬🇧 Inglés | Framework | 2 hrs |
| [Partnership on AI](https://partnershiponai.org/) | 🇬🇧 Inglés | Resources | Referencia |

### Plan Diario

| Día | Principio | Práctica |
|-----|-----------|----------|
| Lunes | Fairness & inclusión | Evaluar bias en modelo |
| Martes | Reliability & safety | Testing de edge cases |
| Miércoles | Privacy & security | Data handling assessment |
| Jueves | Transparency & explainability | Model cards, documentation |
| Viernes | Accountability | Governance workflow design |

### 🔨 Proyecto: Responsible AI Impact Assessment

Crear un assessment completo para un sistema AI ficticio:

1. **System Description:** Propósito, datos, stakeholders
2. **Fairness Analysis:** Grupos impactados, bias potencial
3. **Risk Evaluation:** Severidad × probabilidad
4. **Mitigation Plan:** Controles técnicos y de proceso
5. **Monitoring Plan:** Métricas continuas
6. **Transparency:** Documentación para usuarios

**Entregable:** Documento completo en GitHub con template reutilizable.

---

## Semana 17: Microsoft Copilot y Agentes

### Objetivo
Dominar las herramientas AI de Microsoft que están transformando la productividad empresarial.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [Microsoft Copilot Documentation](https://learn.microsoft.com/es-es/copilot/) | 🇪🇸 Español | Docs | 4 hrs |
| [Microsoft Learn: Copilot](https://learn.microsoft.com/es-es/training/paths/prepare-your-organization-microsoft-365-copilot/) | 🇪🇸 Español | Learning Path | 6 hrs |
| [Copilot Studio](https://learn.microsoft.com/es-es/microsoft-copilot-studio/) | 🇪🇸 Español | Platform | 4 hrs |
| [Microsoft 365 Copilot Adoption](https://adoption.microsoft.com/en-us/copilot/) | 🇬🇧 Inglés | Guide | 3 hrs |

### Plan Diario

| Día | Tema | Práctica |
|-----|------|----------|
| Lunes | M365 Copilot: Word, Excel, PowerPoint | Crear documentos con AI |
| Martes | Copilot en Teams: reuniones, resúmenes | Simular workflows |
| Miércoles | Copilot Studio: crear agentes | Bot de help desk |
| Jueves | Copilot + Power Automate | Flujos inteligentes |
| Viernes | Adoption strategy y governance | Plan de rollout |

---

## Semana 18: Proyecto AI #1 — Security Incident Assistant

### Objetivo
Construir un asistente AI funcional que demuestre skills de programación, AI, y seguridad.

### Especificación del Proyecto

**Security Incident Assistant:**
- Recibe descripción de un incidente de seguridad
- Clasifica severidad automáticamente
- Sugiere pasos de respuesta basados en el tipo
- Genera resumen ejecutivo para management
- Recomienda IOCs a buscar

### Stack Técnico

```
Security Incident Assistant
├── Python (FastAPI o Streamlit)
├── OpenAI API / Azure OpenAI
├── Prompt engineering
│   ├── System prompt (security expert persona)
│   ├── Few-shot examples (incidentes clasificados)
│   └── Output format (JSON structured)
├── Knowledge base (playbooks de respuesta)
└── Documentation (README, architecture, usage)
```

### Plan Semanal

| Día | Tarea |
|-----|-------|
| Lunes | Diseñar architecture, definir prompts |
| Martes | Setup proyecto, API calls básicas |
| Miércoles | Implementar clasificación + respuesta |
| Jueves | UI básica (Streamlit) + testing |
| Viernes | Documentación + deploy a GitHub |
| Sábado | Polish + README profesional |

### Entregable
Repositorio completo en GitHub con:
- Código funcional
- README profesional con screenshots
- Arquitectura documentada
- Instrucciones de instalación
- Ejemplo de uso

---

## Semana 19: Proyecto AI #2 — Risk Assessment Assistant

### Objetivo
Construir un segundo proyecto AI enfocado en análisis de riesgo empresarial.

### Especificación del Proyecto

**Risk Assessment Assistant:**
- Recibe información sobre un sistema o proyecto
- Evalúa riesgos contra framework (NIST, ISO)
- Genera matriz de riesgos priorizada
- Propone controles de mitigación
- Exporta reporte profesional

### Stack Técnico

```
Risk Assessment Assistant
├── Python
├── Azure OpenAI / OpenAI API
├── Prompt engineering
│   ├── Framework knowledge (NIST, ISO 27001, ISO 42001)
│   ├── Risk categorization
│   └── Control recommendations
├── Output formatting (Markdown report)
└── Export capability (PDF or HTML)
```

### Entregable
Repositorio profesional con mismo estándar que Proyecto #1.

---

## Semana 20: Portfolio Website

### Objetivo
Crear sitio web profesional que muestre todo el trabajo realizado.

### Recursos

| Recurso | Tipo | Uso |
|---------|------|-----|
| [GitHub Pages](https://pages.github.com/) | Hosting gratuito | Deploy |
| [Hugo](https://gohugo.io/) o [Docusaurus](https://docusaurus.io/) | Static site generator | Framework |
| [Tailwind CSS](https://tailwindcss.com/) | Styling | Design |

### Contenido del Portfolio

1. **About Me** — Bio profesional, experiencia, visión
2. **Skills** — Competencias técnicas con evidencia
3. **Certifications** — AI-103, AZ-305, SC-500/SC-900 (segun ruta)
4. **Projects** — Cada proyecto con descripción, tech stack, link
5. **Blog/Notes** — Aprendizajes clave (opcional)
6. **Contact** — LinkedIn, GitHub, email

---

## 📋 Checklist de Fase 4

- [ ] Generative AI: Conceptos y limitaciones dominados
- [ ] Prompt Engineering: Biblioteca de prompts creada
- [ ] NIST AI RMF: Framework completo estudiado
- [ ] ISO 42001: Overview completado
- [ ] Responsible AI: Impact assessment realizado
- [ ] Microsoft Copilot: Funcionalidades dominadas
- [ ] **Proyecto 1: Security Incident Assistant** completado
- [ ] **Proyecto 2: Risk Assessment Assistant** completado
- [ ] **Portfolio website** publicado
- [ ] GitHub portfolio con 7+ proyectos

## Operacion v4

- [Checkpoint Gates v4](../checkpoints)
- [Template de Evidencia v4](../evidence-template)
- [Weekly Tracker v4](../weekly-tracker)

## 🔗 Valor para el CV

Después de esta fase:
> "Desarrollé asistentes AI para análisis de incidentes de seguridad y evaluación de riesgos usando Python y Azure OpenAI. Implementé frameworks de AI Governance (NIST AI RMF, ISO 42001) y diseñé procesos de Responsible AI que aseguran fairness, transparency y accountability en deployments de AI empresarial."

## ⏭️ Siguiente Fase

[Fase 5: Cloud + AI Integración →](../cloud-ai/overview)
