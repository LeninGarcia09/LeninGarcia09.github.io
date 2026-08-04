---
sidebar_position: 2
title: "Semana 1: Fundamentos de RAI para arquitectos"
---

# Semana 1: Fundamentos de RAI para arquitectos

:::info[Resumen de la semana]
**Objetivo:** Construir el modelo mental de RAI como una disciplina arquitectónica, no como una casilla de cumplimiento que se aplica al final.  
**Tiempo estimado:** 8–10 horas  
**Entregable:** Lens de arquitectura RAI — tarjeta de referencia de 1 página que relaciona cada principio de RAI con preguntas de diseño
:::

---

## El cambio fundamental

La arquitectura de software tradicional pregunta: *¿Qué debe hacer este sistema y con qué rapidez?*

La arquitectura con enfoque RAI añade: *¿A quién podría perjudicar este sistema, de qué manera y qué decisión de diseño evita ese daño?*

---

## Framework 1: Microsoft RAI Standard v2 — Los 6 principios como restricciones de diseño

| Principio | Qué elimina | Pregunta de diseño |
|-----------|-------------------|---------------------|
| **Equidad** | Sistemas que producen resultados dispares entre grupos demográficos | ¿A qué poblaciones sirve este sistema? ¿Cómo se mide el impacto dispar? |
| **Confiabilidad y seguridad** | Sistemas que fallan de forma impredecible o causan daño cuando fallan | ¿Qué ocurre cuando el modelo devuelve una respuesta incorrecta? ¿Existe un plan de respaldo? |
| **Privacidad y seguridad** | Sistemas que exponen datos personales más allá de su uso previsto | ¿A qué datos accede este sistema? ¿Cuál es el alcance mínimo necesario? |
| **Inclusión** | Sistemas que excluyen a ciertos usuarios o producen menor calidad para grupos de borde | ¿Qué poblaciones de usuarios están subrepresentadas en los datos de entrenamiento? |
| **Transparencia** | Sistemas en los que los usuarios no pueden entender qué fue generado por IA | ¿Queda claro para los usuarios cuándo están interactuando con IA? |
| **Rendición de cuentas** | Sistemas en los que ninguna persona asume el resultado de una decisión de IA | ¿Quién revisa las salidas de alto impacto? ¿Quién es dueño de la pista de auditoría? |

---

## Framework 2: NIST AI RMF 1.0 — Govern, Map, Measure, Manage

```
GOVERN → Establish policies, roles, culture
   ↓
MAP → Identify context, stakeholders, and risks for a specific AI system
   ↓ ← YOU DESIGN FOR THIS
MEASURE → Analyze and assess identified risks (metrics, evaluations, red teaming)
   ↓ ← AND THIS
MANAGE → Prioritize, respond, and monitor risks continuously
```

**Qué significa "diseñar para MEASURE":**
- Incorporar puntos de evaluación: el sistema debe poder probarse de forma independiente
- Elegir arquitecturas donde las salidas de los componentes sean observables
- Diseñar para pruebas A/B de mitigaciones de seguridad

**Qué significa "diseñar para MANAGE":**
- Cada componente de IA necesita un responsable de monitoreo en el diagrama de arquitectura
- Los umbrales de alertamiento deben definirse en tiempo de diseño, no después del lanzamiento
- Los logs de auditoría deben formar parte de la arquitectura; la respuesta a incidentes los necesita

---

## Framework 3: Niveles de riesgo del EU AI Act — Las decisiones de arquitectura cambian según el nivel

```
UNACCEPTABLE RISK — BANNED (Feb 2025)
├─ Social scoring | Real-time biometric surveillance | Subliminal manipulation
│  → Architecture decision: Do not build.

HIGH RISK — Strict obligations (Aug 2026 deadline for deployed systems)
├─ HR/hiring | Credit scoring | Medical devices | Critical infrastructure
│  → Required: human oversight mechanism, audit logging, accuracy testing,
│     data governance documentation, EU AI database registration

LIMITED RISK — Transparency only
├─ Chatbots | Deepfakes
│  → Required: AI disclosure to users

MINIMAL RISK — No obligations
└─ Spam filters | Recommendation engines
   → Best practice: document anyway for future re-classification
```

---

## Recursos de esta semana

| Recurso | Tipo | Tiempo estimado |
|----------|------|---------------|
| [Principios de RAI de Microsoft](https://www.microsoft.com/en-us/ai/responsible-ai) | Lectura | 1 hora |
| [NIST AI RMF 1.0 — secciones Govern + Map](https://airc.nist.gov/Home) | Lectura | 2 horas |
| [Azure Well-Architected Framework — AI Workloads](https://learn.microsoft.com/en-us/azure/well-architected/ai/) | Lectura | 1.5 horas |
| Microsoft Learn: [Principios de Responsible AI en la práctica](https://learn.microsoft.com/en-us/training/paths/responsible-ai-business-principles/) | Curso | 2 horas |
| [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) | Consulta rápida | 1 hora |

---

## Ejercicio práctico

:::tip[Ejercicio — Análisis de brechas frente a NIST AI RMF]
Toma un sistema de IA que hayas diseñado o revisado anteriormente. Compáralo con las cuatro funciones de NIST AI RMF:

1. **Govern**: ¿Existe una política documentada para este sistema? ¿Quién es responsable?
2. **Map**: ¿Están identificados todos los stakeholders, incluidos actores adversarios y agentes autónomos?
3. **Measure**: ¿Se pueden medir de forma independiente la equidad, la seguridad y la precisión del sistema? ¿Se incorporaron puntos de evaluación?
4. **Manage**: ¿Están definidos los umbrales de alertamiento? ¿Existe un plan de respuesta a incidentes?

Para cada función, asigna una calificación: **Strong / Partial / Missing**. Escribe una explicación de 1 párrafo para cualquier calificación **Missing**.
:::

---

## Entregable de la semana 1: Lens de arquitectura RAI

Construye una tarjeta de referencia de 1 página que usarás en cada revisión de arquitectura a partir de ahora:

| Principio de RAI | Pregunta de diseño | Olor de arquitectura (cómo se ve la ausencia) |
|---------------|---------------------|---------------------------------------------|
| Equidad | ¿A qué poblaciones sirve esto? ¿Cómo se mide el impacto dispar? | No hay conjunto de evaluación; no hay pruebas de sesgo |
| Confiabilidad y seguridad | ¿Qué ocurre cuando el modelo se equivoca? ¿Existe un plan de respaldo? | No hay mecanismo de respaldo; no hay responsable de monitoreo |
| Privacidad y seguridad | ¿Cuál es el alcance mínimo de datos? ¿Está modelado el consentimiento? | Acceso a datos demasiado amplio; no hay flujo de consentimiento |
| Inclusión | ¿Quién está subrepresentado? ¿Cómo se aborda la accesibilidad? | No hay revisión de accesibilidad; datos de prueba monoculturales |
| Transparencia | ¿Se informa a los usuarios que hay IA? ¿Pueden explicarse las decisiones? | No hay divulgación de IA; no hay mecanismo de explicabilidad |
| Rendición de cuentas | ¿Quién es responsable de cada decisión de IA? ¿Cuál es la ruta de escalación? | No hay compuerta de revisión humana; no hay log de auditoría |

---

## Verificación de conocimientos

1. ¿Cuál es la diferencia entre RAI como checklist de cumplimiento y RAI como restricción arquitectónica?
2. ¿Qué función de NIST AI RMF está más influida directamente por las decisiones de arquitectura y por qué?
3. Según el EU AI Act, ¿qué componentes arquitectónicos son legalmente obligatorios para un sistema de IA de alto riesgo?
4. Un arquitecto dice: "Agregaremos los filtros de seguridad después de lanzar el MVP". ¿Qué principio de RAI queda más en riesgo?
