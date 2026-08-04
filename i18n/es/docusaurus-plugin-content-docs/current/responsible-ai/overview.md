---
sidebar_position: 1
title: IA responsable y gobernanza
---

# ⚖️ IA responsable y gobernanza

**Tipo de track:** Skill Track — Deep Technical + Regulatory  
**Audiencia objetivo:** AI Solution Architects, responsables de gobernanza de IA y arquitectos de seguridad  
**Prerrequisitos:** Fundamentos de Azure AI Foundry; se recomienda familiaridad con conceptos de GDPR

---

:::tip[Lo que vas a construir]
Frameworks de gobernanza basados en situaciones regulatorias reales. Cada desafío parte de un escenario que los clientes enfrentan de verdad: un regulador de la UE exigiendo un inventario de IA, un red team detectando una vulnerabilidad de fuga de datos o una queja por sesgo que requiere una respuesta técnica.
:::

---

## Por qué existe este track

El EU AI Act entró en vigor el **1 de agosto de 2024**. El primer plazo de cumplimiento —la prohibición de sistemas de IA de riesgo inaceptable— fue el **2 de febrero de 2025**. Los operadores de sistemas de IA de alto riesgo deben cumplir antes del **2 de agosto de 2026**.

Toda empresa que construya IA con Microsoft Azure necesita ahora:
- Un inventario de sistemas de IA
- Una clasificación de riesgo para cada sistema de IA  
- Documentación técnica que demuestre cumplimiento
- Mecanismos de supervisión humana
- Monitoreo continuo y reporte de incidentes

Este track desarrolla las habilidades para diseñar e implementar todo esto sobre Azure.

---

## Microsoft Responsible AI Standard v2

El marco interno de Microsoft para desarrollar IA de forma responsable, ahora disponible públicamente. Todo arquitecto que trabaje con IA de Microsoft debe comprender estos seis principios:

| Principio | Lo que significa para la arquitectura |
|-----------|---------------------------------------|
| **Fairness** | Evaluar modelos para detectar impacto dispar entre grupos demográficos |
| **Reliability & Safety** | Evaluar, hacer red teaming y establecer gates de despliegue |
| **Privacy & Security** | Minimización de datos, cifrado y controles de acceso |
| **Inclusiveness** | Diseñar para accesibilidad; no excluir casos límite |
| **Transparency** | Explicar decisiones del modelo; revelar a los usuarios que interactúan con IA |
| **Accountability** | Supervisión humana, audit trails y respuesta a incidentes |

---

## El stack de gobernanza

```
┌──────────────────────────────────────────────────────────────┐
│                   Regulatory Layer                           │
│  EU AI Act (2024) | NIST AI RMF | ISO 42001 | GDPR Art. 22  │
├──────────────────────────────────────────────────────────────┤
│                   Policy Layer                               │
│     Microsoft RAI Standard v2 | Azure AI Policy             │
├──────────────────────────────────────────────────────────────┤
│                   Platform Layer                             │
│  Microsoft Purview AI Hub | Azure AI Content Safety          │
│  Azure AI Evaluation SDK | Azure Monitor                     │
├──────────────────────────────────────────────────────────────┤
│                   Practice Layer                             │
│  PyRIT Red Teaming | Fairness Dashboard | Impact Assessment  │
└──────────────────────────────────────────────────────────────┘
```

---

## Desafíos

| Desafío | Escenario | Enfoque |
|-----------|---------|-------|
| [1 — Inventario de IA de la UE en 30 días](./01-rai-standard/challenge-01.md) | Un regulador de la UE quiere la lista de tus sistemas de IA | Purview AI Hub + clasificación del EU AI Act |
| [2 — El red team encontró una fuga de datos](./02-purview-ai-hub/challenge-02.md) | Un agente está filtrando precios de la competencia | PyRIT + Content Safety + Prompt Shields |
| [3 — Herramienta de reclutamiento señalada por sesgo](./03-content-safety/challenge-03.md) | 3 departamentos detectan impacto dispar | Fairness eval + RAI dashboard + mitigación |

---

## Herramientas clave

| Herramienta | Propósito | Cuándo usarla |
|------|---------|------------|
| **Microsoft Purview AI Hub** | Descubrir y gobernar toda la actividad de IA del tenant | Inventario inicial y monitoreo continuo de cumplimiento |
| **Azure AI Content Safety** | Filtrado de contenido en runtime (texto + imagen) | Todas las interacciones de IA orientadas a clientes |
| **PyRIT** | Toolkit de red teaming y pruebas adversariales | Antes de cada despliegue importante |
| **Azure AI Evaluation SDK** | Evaluar calidad: groundedness, fairness y safety | Gates de CI/CD |
| **NIST AI RMF** | Marco de gestión de riesgos | Documentación de gobernanza |
| **EU AI Act** | Regulación legal | Clasificación de riesgo + planeación de cumplimiento |

---

## Recursos clave

- [Principles of Responsible AI de Microsoft](https://www.microsoft.com/en-us/ai/responsible-ai)
- [RAI Standard v2 (public)](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE5cmFl)
- [Microsoft Purview AI Hub](https://learn.microsoft.com/en-us/purview/ai-microsoft-purview)
- [Azure AI Content Safety](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/)
- [PyRIT on GitHub](https://github.com/Azure/PyRIT)
- [EU AI Act Full Text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689)
- [NIST AI RMF](https://www.nist.gov/artificial-intelligence/ai-risk-management-framework)
