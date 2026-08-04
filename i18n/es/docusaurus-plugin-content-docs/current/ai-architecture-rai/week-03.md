---
sidebar_position: 4
title: "Semana 3: Profundización en el stack de Microsoft"
---

# Semana 3: Profundización en el stack de Microsoft

:::info[Resumen de la semana]
**Objetivo:** Dominar la arquitectura RAI dentro del ecosistema Azure AI / Copilot / MCP y comprender cómo la gobernanza se integra estructuralmente en tiempo de diseño.  
**Tiempo estimado:** 8–10 horas  
**Entregable:** Plantilla de Architecture Decision Record (ADR) de RAI — formato estandarizado para documentar decisiones de RAI en tiempo de diseño
:::

---

## Azure AI Content Safety — Patrones de integración estructural

Azure AI Content Safety es una **capa de aplicación de políticas de contenido** que debe ubicarse en los puntos arquitectónicos correctos:

```
PATTERN 1: Input Gate (always recommended)
User Input → [Content Safety: Prompt Shield] → LLM
                       ↓ Block | Flag | Pass-through

PATTERN 2: Output Gate (always recommended for customer-facing)
LLM Output → [Content Safety: Text Moderation] → User
                       ↓ Block | Rewrite | Pass-through

PATTERN 3: Retrieved Content Gate (critical for RAG)
Retrieved Chunk → [Content Safety scan] → Prompt Context
                           ↓ Block poisoned content before LLM sees it

PATTERN 4: Grounding Verification (for factual systems)
LLM Response → [Groundedness Detection] → Output
                       ↓ Flag ungrounded claims for human review
```

**Decisión de arquitectura:** Cada llamada a content safety añade latencia y costo. Define en tiempo de diseño qué compuertas son obligatorias (input + output) y cuáles son configurables.

---

## Azure AI Foundry — Evaluations como compuertas de CI/CD

Integra las evaluaciones en el pipeline de despliegue; no las ejecutes manualmente:

| Tipo de evaluación | Qué mide | Recomendación de umbral |
|----------------|-----------------|--------------------------|
| **Groundedness** | ¿Las afirmaciones están respaldadas por el contexto recuperado? | ≥ 0.85 |
| **Relevance** | ¿La respuesta es relevante para la consulta? | ≥ 0.80 |
| **Safety** | ¿La respuesta contiene contenido dañino? | ≥ 0.95 (bloquear el despliegue si queda por debajo) |
| **Fairness** | ¿La calidad difiere entre grupos de usuarios? | Ejecutar en actualizaciones importantes del modelo |

```yaml
# AI Evaluation in CI/CD pipeline
- name: Run RAI Evaluations
  with:
    dataset: ./eval/golden_dataset.jsonl
    evaluators: groundedness,safety,relevance
    threshold_safety: 0.95
    fail_on_threshold_breach: true  # Block deployment if safety < 0.95
```

---

## Gobernanza de servidores MCP — Cuándo aplica RAI Release Assessment

### La compuerta de cumplimiento de 5 niveles

| Compuerta | Aplica cuando | Revisiones requeridas |
|------|-------------|-----------------|
| **1: Security Only** | Herramientas de solo lectura, sin IA, datos no sensibles, uso interno | Security |
| **2: + Privacy** | Las herramientas acceden a PII o datos personales | Security + Privacy |
| **3: + Non-GenAI RA** | Hay ML/embeddings dentro de cualquier handler de herramienta | Security + Privacy + Non-GenAI RA |
| **4: + GenAI RA** | Hay un LLM dentro de cualquier handler, O genera contenido, O expone herramientas con disparadores de escalación | Security + Privacy + GenAI RA |
| **5: + Restricted Use** | Ejecución de código, salud/legal, autónomo orientado al cliente, cross-tenant | Todo lo anterior + Restricted Use |

:::warning[La fila que los equipos siempre interpretan mal]
Un servidor MCP **sin IA interna** sigue requiriendo GenAI RA si expone herramientas con disparadores de escalación:
- `send_email()` / `send_teams_message()` — comunicaciones masivas a velocidad de agente de IA
- `execute_sql()` con acceso de escritura — modificación masiva de datos
- `create_pull_request()` / `deploy_to_production()` — control del pipeline de código

**M365 Mail MCP, SQL MCP y Azure DevOps MCP entran todos aquí.**  
La pregunta no es: *¿este servidor usa IA?*  
La pregunta es: *¿un agente de IA puede usar este servidor para causar daño a escala?*
:::

### 12 dimensiones de riesgo para puntuar MCP

| # | Dimensión | Señal de alto riesgo |
|---|-----------|-----------------|
| 1 | Uso de AI/ML | Cualquier LLM/SLM/embeddings en el interior |
| 2 | Generación de contenido | Produce texto, código o resúmenes originales |
| 3 | Sensibilidad de los datos | PII, datos de salud, financieros o confidenciales |
| 4 | Consecuencia de la acción | Acciones irreversibles o de alto impacto |
| 5 | Reversibilidad | Acciones que no pueden deshacerse |
| 6 | Alcance sobre usuarios | Afecta a muchos usuarios simultáneamente |
| 7 | Nivel de autonomía | Supervisión humana mínima dentro del flujo |
| 8 | Posición en la cadena de confianza | Lo invocan otros agentes de IA (herencia de confianza) |
| 9 | IA de terceros | Llama APIs de IA externas |
| 10 | Categoría de uso sensible | Salud, legal, finanzas, RR. HH. |
| 11 | Consentimiento y transparencia | Los usuarios no saben que la IA actúa en su nombre |
| 12 | Entorno de despliegue | De cara al cliente, cross-tenant |

---

## Extensibilidad de Copilot — RAI heredado vs. RAI propio

| Componente de Copilot | RAI heredado de Microsoft | RAI que debes asumir |
|-------------------|------------------------------|-----------------|
| Base de Microsoft Copilot | Filtrado de contenido, grounding, evaluación de seguridad | El alcance de tus datos, los permisos de tus herramientas |
| Declarative Agent | La seguridad a nivel de sistema de Copilot | System prompt, acceso a conectores de datos |
| Custom Engine Agent (own LLM) | Nada | Todo: seguridad, grounding, equidad, monitoreo |
| MCP Server (tools) | Nada | Las 12 dimensiones completas y las 5 compuertas de cumplimiento |

---

## Recursos de esta semana

| Recurso | Tipo | Tiempo estimado |
|----------|------|---------------|
| [Documentación de Azure AI Content Safety](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/) | Técnico | 1.5 horas |
| [Conceptos de evaluación de Azure AI Foundry](https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-approach-gen-ai) | Técnico | 1 hora |
| [Resumen de extensibilidad de Copilot](https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/) | Lectura | 1 hora |
| [MCP Specification](https://spec.modelcontextprotocol.io/) | Técnico | 1.5 horas |
| [Microsoft RAI Standard v2](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE5cmFl) | Lectura | 1 hora |

---

## Ejercicio práctico

:::tip[Ejercicio — Análisis de la compuerta de cumplimiento]
Diseña un asistente de IA conectado a Copilot con tres herramientas MCP:
1. `search_documents()` — lee documentos de SharePoint (solo lectura, interno)
2. `send_email()` — envía correo por M365 Mail (escritura, comunicación externa)
3. `run_report_query()` — ejecuta consultas SQL de solo lectura sobre una base de datos de BI

Para cada servidor MCP:
- Aplica la compuerta de cumplimiento de 5 niveles: ¿a qué nivel llega?
- Puntúa las 12 dimensiones de riesgo: ¿cuántas son High?
- Identifica qué revisiones se requieren
- Dibuja el diagrama de límites de confianza que muestre qué agentes están autorizados para llamar a cada servidor
:::

---

## Entregable de la semana 3: Plantilla de Architecture Decision Record de RAI

```markdown
## ADR-[number]: [Decision Title]

**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Superseded
**Context:** What situation prompted this decision? What RAI risk is being addressed?
**Decision:** What did we decide to do?
**RAI Principles Addressed:** Fairness | Reliability | Privacy | Inclusiveness | Transparency | Accountability
**Compliance Gate Impact:** Does this decision affect which compliance gate applies?
**Trade-offs:** What did we give up (performance, UX, cost)?
**Alternatives Considered:** What else did we evaluate?
**Consequences:** What becomes easier? What becomes harder?
**Review Trigger:** When should this decision be revisited?
```

---

## Verificación de conocimientos

1. ¿En qué punto de un pipeline RAG debe ubicarse Prompt Shield y por qué?
2. Una evaluación de AI Foundry muestra groundedness 0.91 y safety 0.88 (umbral: 0.95). ¿Qué ocurre en CI/CD?
3. Un equipo dice: "No usamos IA dentro de nuestro servidor MCP, así que no necesitamos un RAI RA". ¿Qué es lo primero que les preguntas?
4. ¿Cuál es la diferencia entre un Declarative Agent y un Custom Engine Agent en términos de propiedad de RAI?
