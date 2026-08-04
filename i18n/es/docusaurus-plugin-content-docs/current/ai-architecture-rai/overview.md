---
id: overview
title: Arquitectura de IA + IA Responsable
sidebar_label: Resumen de la ruta
slug: /ai-architecture-rai/overview
---

# 🏗️ Arquitectura de IA + IA Responsable

**Tipo de ruta:** Ruta intensiva de 4 semanas  
**Público objetivo:** Arquitectos de nivel intermedio que ya han diseñado sistemas de IA y quieren incorporar RAI como una disciplina estructural  
**Prerrequisitos:** Familiaridad con servicios de Azure AI, patrones RAG o sistemas con agentes  
**Dedicación estimada:** 8–10 horas por semana

---

:::tip[Lo que vas a crear]
Cuatro artefactos reutilizables: una tarjeta Lens de arquitectura RAI, una plantilla de modelo de amenazas para arquitecturas de IA, una plantilla de Architecture Decision Record (ADR) de RAI y un portafolio de tres diagramas de arquitectura anotados con análisis completo de cumplimiento.
:::

---

## Por qué RAI debe ser una restricción arquitectónica

La mayoría de los equipos tratan Responsible AI como una compuerta de revisión al final de la construcción. Esto falla por tres razones:

1. **Costo del cambio** — corregir una brecha de equidad en el despliegue es 10 veces más difícil que diseñarla correctamente desde el inicio
2. **Integración invisible** — los controles de seguridad agregados como ocurrencias tardías crean brechas que los atacantes pueden explotar
3. **Vacío de rendición de cuentas** — si ningún documento de arquitectura asigna responsables para cada dimensión de RAI, nadie se hace cargo

Esta ruta trata los principios de RAI como restricciones arquitectónicas de primera clase, de la misma forma en que tratas la latencia, la disponibilidad o la seguridad.

---

## La pila de arquitectura RAI

```
┌─────────────────────────────────────────────────────────────────┐
│                    REGULATORY LAYER                            │
│   EU AI Act (2024) | NIST AI RMF 1.0 | ISO 42001 | GDPR       │
├─────────────────────────────────────────────────────────────────┤
│                    POLICY LAYER                                │
│   Microsoft RAI Standard v2 | OWASP LLM Top 10                │
│   MITRE ATLAS (AI Threat Matrix)                               │
├─────────────────────────────────────────────────────────────────┤
│                    ARCHITECTURE LAYER                          │
│   RAG Design | Agentic Systems | MCP Servers | AI Gateway      │
│   Grounding | Guardrails | Content Filtering | Tool Governance │
├─────────────────────────────────────────────────────────────────┤
│                    PLATFORM LAYER                              │
│   Azure AI Content Safety | Azure AI Foundry Evaluations       │
│   Azure Monitor | Semantic Kernel | PyRIT Red Teaming          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Cuatro semanas — cuatro artefactos

| Semana | Enfoque | Entregable |
|------|-------|-------------|
| [Semana 1: Fundamentos de RAI](./week-01.md) | RAI como restricciones de diseño; NIST AI RMF; niveles del EU AI Act | Tarjeta Lens de arquitectura RAI |
| [Semana 2: Patrones de arquitectura](./week-02.md) | RAG, sistemas con agentes, uso de herramientas; OWASP LLM Top 10; modelo de amenazas STRIDE-AI | Plantilla de modelo de amenazas RAI |
| [Semana 3: Stack de Microsoft](./week-03.md) | Azure AI Content Safety; evaluaciones de Foundry; gobernanza MCP; extensibilidad de Copilot | Plantilla de Architecture Decision Record de RAI |
| [Semana 4: Diseño aplicado](./week-04.md) | Diseño de extremo a extremo; red teaming; documentación para envío de RA | Portafolio de arquitectura RAI (3 diagramas) |

---

## Conceptos clave

| Concepto | Por qué importa para los arquitectos |
|---------|-------------------------------|
| RAI como restricción, no como revisión | Diseña la salvaguarda desde el inicio; no la agregues al momento del despliegue |
| Modelado de límites de confianza | Cada límite entre componentes de IA es un vector potencial de ataque |
| Riesgo a nivel de herramienta vs. a nivel de sistema | Cada herramienta MCP necesita una evaluación de riesgo individual |
| Disparadores de escalación | Los sistemas sin IA pueden requerir GenAI RA si los agentes pueden abusar de ellos a escala |
| Prompt injection como riesgo de arquitectura | No es un problema de contenido; es un problema de diseño del sistema |
| Compuerta de cumplimiento de 5 niveles | Security → Privacy → Non-GenAI RA → GenAI RA → Restricted Use |

---

## Recursos clave

- [Principios de RAI de Microsoft](https://www.microsoft.com/en-us/ai/responsible-ai)
- [Microsoft RAI Standard v2](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE5cmFl)
- [NIST AI RMF 1.0](https://airc.nist.gov/Home)
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [MITRE ATLAS — AI Threat Matrix](https://atlas.mitre.org/)
- [Azure Well-Architected Framework — AI Workloads](https://learn.microsoft.com/en-us/azure/well-architected/ai/)
- [Azure AI Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/)
- [MCP Specification](https://spec.modelcontextprotocol.io/)
