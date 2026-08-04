---
id: overview
title: Confiabilidad agéntica — del prototipo a producción
sidebar_label: Resumen del track
slug: /agentic-reliability/overview
---

# Confiabilidad agéntica: del prototipo a producción

> **Inspirado en:** [The LLM as Analyst Trap](https://appliedingenuity.substack.com/p/the-llm-as-analyst-trap-a-technical) — una investigación técnica profunda sobre por qué el patrón "Simple Agentic" es un pasivo en producción.

El patrón "Simple Agentic" —darle a un LLM herramientas para obtener datos, dejar que los analice y entregue una respuesta— es **sorprendentemente fácil de demostrar y catastróficamente riesgoso de poner en producción**. Este track te guía por los modos de falla exactos que aparecen en despliegues empresariales reales y te enseña cómo diseñar el sistema para evitarlos.

---

## Los 5 modos de falla que cubre este track

| Modo de falla | Qué ocurre | Consecuencia de negocio |
|-------------|-------------|---------------------|
| **Helpfulness Paradox** | El LLM omite errores de herramientas y fabrica datos plausibles | El sistema falla en silencio: "falla mintiendo" |
| **Scope Bypass** | El LLM ignora las barreras del prompt del sistema cuando la consulta se reformula | Asesoría financiera o estratégica no autorizada |
| **Math & Transcription Gap** | Datos correctos en la DB → número incorrecto en la salida final | Un informe para la junta contiene errores silenciosos |
| **Intelligence Degradation** | La exactitud cae 45.5% al superar 40–50% de llenado del contexto | Las respuestas se degradan sin que nadie lo note a medida que crece la conversación |
| **Temporal & Semantic Drift** | Fechas incorrectas, definiciones desactualizadas de grupos (FB vs META) | Las reglas de negocio quedan delegadas a pesos de modelo obsoletos |

---

## Patrón de arquitectura: Simple Agentic vs Verifiable Orchestrator

```
SIMPLE AGENTIC (The Trap)
─────────────────────────
User → LLM [planner + processor + UI]
         ↓ decides tool calls
         ↓ receives raw data
         ↓ performs calculations
         ↓ formats output
         → User sees polished answer ← NO AUDIT TRAIL

VERIFIABLE ORCHESTRATOR (The Fix)
──────────────────────────────────
User → LLM [intent only: "what does the user want?"]
         ↓ structured parameters only (no raw data)
         → Deterministic code [computation, calculation, formatting]
         → Audit log [source_ref for every output value]
         → User sees verified answer ← FULLY TRACEABLE
```

---

## Desafíos de este track

| # | Desafío | Escenario | Habilidad clave |
|---|-----------|----------|-----------|
| [01](./01-hallucination-audit/challenge-01.md) | Auditoría de alucinaciones | Un agente analista financiero entrega cifras incorrectas en un informe para la junta | Barreras ante errores, hooks PostToolUse, validación determinista |
| [02](./02-context-rot/challenge-02.md) | Deterioro del contexto a escala | Un agente de decisión clínica se degrada después de 3–4 turnos | Presupuesto de contexto, resumido, patrones de scratchpad |
| [03](./03-verifiable-orchestrator/challenge-03.md) | Orquestador verificable | Un regulador exige trazabilidad para cada cifra generada por IA | Patrón de orquestador, trazabilidad de fuentes, salida determinista |
| [04](./04-semantic-control/challenge-04.md) | Control semántico y reglas de negocio | El agente usa una versión obsoleta de "Magnificent Seven" tomada de datos de entrenamiento de 2023 | Anclaje temporal, reglas de negocio externalizadas, hooks de alcance |

---

## Para quién es

- **AI Solution Architects** que están llevando un prototipo a producción
- **Líderes de ingeniería** que evalúan frameworks agénticos para uso empresarial
- **Cualquier persona** que haya visto a un agente de IA brillar en un demo y fallar en producción

---

## Referencias

Todos los desafíos remiten a la investigación original:
- 📄 [The LLM as Analyst Trap — Applied Ingenuity](https://appliedingenuity.substack.com/p/the-llm-as-analyst-trap-a-technical)
- 📄 [The Verifiable Orchestrator — Applied Ingenuity](https://appliedingenuity.substack.com/p/the-verifiable-orchestrator-a-new)
- 📄 [Intelligence Degradation in Long-Context LLMs — arXiv:2601.15300](https://arxiv.org/abs/2601.15300)
- 📄 [Context Length Alone Hurts LLM Performance — arXiv:2510.05381](https://arxiv.org/abs/2510.05381)
