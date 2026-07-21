---
sidebar_position: 3
title: "Fase 3 — Arquitectura + Seguridad Empresarial (AZ-305 + SC-500)"
---

# Fase 3: Arquitectura + Seguridad Empresarial (Semanas 13–16)

> **Objetivo:** Elevar los artefactos de la Fase 2 al nivel **empresarial**: diseño de arquitectura defendible (encaminado a **AZ-305**) y seguridad de AI (encaminado a **SC-500**) con threat modeling, guardrails y un checklist enterprise reutilizable.

## 🎯 Resultados Esperados

Al completar esta fase:
- **Threat model** del sistema RAG/agente con mitigaciones priorizadas
- Avance sólido en **AZ-305** con una decisión de arquitectura documentada (ADR)
- Ejercicio de **red-team / guardrails** sobre tu propio sistema de AI
- Checklist de seguridad y arquitectura **enterprise** reutilizable
- Listo para el **Gate CP3 (Semana 16)**

:::info Este plan es Microsoft-first
Las certificaciones ancla son **AZ-305** (arquitectura) y **SC-500** (seguridad cloud & AI). Los frameworks abiertos (OWASP LLM, MITRE ATLAS, NIST AI RMF) se usan como lenguaje común de riesgo.
:::

---

## Semana 13 — Threat model + mitigaciones

**Objetivo:** modelar amenazas específicas de sistemas de AI (no solo de la app tradicional).

| Recurso | Idioma | Tipo |
|---------|--------|------|
| [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) | 🇬🇧 | Framework |
| [MITRE ATLAS](https://atlas.mitre.org/) | 🇬🇧 | Matriz de amenazas |
| [Microsoft: Threat Modeling AI/ML](https://learn.microsoft.com/es-es/security/engineering/threat-modeling-aiml) | 🇪🇸 | Guía |

**Entregable:** documento de threat model del sistema de la Fase 2 — prompt injection, data leakage, poisoning, model DoS — con mitigaciones priorizadas por riesgo.

## Semana 14 — AZ-305: avance + decisión de seguridad

**Objetivo:** progresar en la certificación de arquitectura y aterrizar una decisión de diseño.

| Recurso | Idioma | Tipo |
|---------|--------|------|
| [AZ-305 Study Guide](https://learn.microsoft.com/es-es/credentials/certifications/resources/study-guides/az-305) | 🇪🇸 | Guía oficial |
| [Azure Well-Architected Framework](https://learn.microsoft.com/es-es/azure/well-architected/) | 🇪🇸 | Framework |
| [Architecture Decision Records (ADR)](https://learn.microsoft.com/es-es/azure/well-architected/architect-role/architecture-decision-record) | 🇪🇸 | Práctica |

**Entregable:** **ADR** documentando una decisión clave de tu arquitectura (identidad, red, almacenamiento de datos sensibles, o hosting del modelo) con alternativas y trade-offs.

## Semana 15 — Red-team / guardrails + checklist enterprise

**Objetivo:** atacar tu propio sistema y añadir defensas.

| Recurso | Idioma | Tipo |
|---------|--------|------|
| [SC-500 Study Guide](https://learn.microsoft.com/es-es/credentials/certifications/resources/study-guides/sc-500) | 🇪🇸 | Guía oficial |
| [Azure AI Content Safety](https://learn.microsoft.com/es-es/azure/ai-services/content-safety/) | 🇪🇸 | Servicio |
| [PyRIT — Python Risk Identification Toolkit](https://github.com/Azure/PyRIT) | 🇬🇧 | Herramienta open |

**Entregable:** reporte de red-team (prompts adversariales + resultados) + guardrails implementados (content filter, validación de salida) + **checklist enterprise** de seguridad de AI.

## Semana 16 — Cierre CP3: arquitectura + seguridad

**Objetivo:** consolidar arquitectura y seguridad en un paquete presentable.

| Recurso | Idioma | Tipo |
|---------|--------|------|
| [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) | 🇬🇧 | Framework |
| [ISO/IEC 42001](https://www.iso.org/standard/81230.html) | 🇬🇧 | Estándar |

**Checklist del [Gate CP3](../checkpoints#gate-cp3-semana-16):**
- [ ] Threat model con mitigaciones priorizadas
- [ ] ADR de arquitectura publicado
- [ ] Red-team + guardrails demostrados
- [ ] Checklist enterprise de seguridad reutilizable
- [ ] Progreso verificable en AZ-305 y SC-500

---

## 📋 Checklist de Fase 3

- [ ] Threat model del sistema RAG/agente (OWASP LLM + MITRE ATLAS)
- [ ] ADR con decisión de arquitectura y trade-offs
- [ ] Ejercicio de red-team con guardrails aplicados
- [ ] Checklist de seguridad y arquitectura enterprise
- [ ] Plan de examen para AZ-305 y SC-500
- [ ] Gate CP3 aprobado

## Operacion v4

- [Checkpoint Gates](../checkpoints)
- [Template de Evidencia](../evidence-template)
- [Weekly Tracker](../weekly-tracker)

## 🔗 Valor para el CV

> "Diseñé y aseguré un sistema de AI a nivel empresarial: threat model mapeado a OWASP LLM Top 10 y MITRE ATLAS, decisiones de arquitectura documentadas (ADR) alineadas al Well-Architected Framework, y guardrails validados con red-teaming — respaldado por certificación AZ-305 y SC-500."

## ⏭️ Siguiente Fase

[Fase 4: Value Realization + Contenido + Networking →](../ai-business/overview)
