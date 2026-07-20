---
sidebar_position: 4
title: "Reto 3 — Gobernanza: NIST AI RMF + ISO 42001"
---

# Reto 3: Gap assessment de gobernanza de IA (NIST AI RMF + ISO/IEC 42001)

> **Herramienta:** ninguna — es un **artefacto documental** · **Frameworks:** [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) + [ISO/IEC 42001](https://www.iso.org/standard/81230.html) · **Tiempo:** 4–6 h

:::tip Qué vas a construir
Un **gap assessment ejecutivo**: tomas una organización (real o ficticia), evalúas su madurez de gobernanza de IA contra NIST AI RMF e ISO/IEC 42001, y entregas un reporte con hallazgos, riesgos y un roadmap. Es exactamente lo que hace un consultor de seguridad de IA o un Especialista en Seguridad de IA en su primer trimestre.
:::

**Dónde ejecutas esto:** en tu editor de texto / procesador de documentos. **No requiere código ni herramientas.** Es el reto que demuestra tu lado *advisory* y ejecutivo — clave para roles senior y de consultoría (Mandiant, MAPFRE, BBVA).

## Por qué importa para el empleo

Varias JDs piden literalmente *"cumplimiento normativo (GDPR, LFPDPPP, EU AI Act, NIST AI RMF)"*, *"gobernanza y ética de IA"* y *"assessments de madurez con recomendaciones para liderazgo"*. Este artefacto es tu prueba directa. Además, alimenta la certificación **[IAPP AIGP](../sources-and-verification#certificaciones-vendor-neutral-verificadas)** que recomienda el plan.

## Pasos

1. **Elige un sujeto.** Una empresa ficticia (p. ej. "una aseguradora que despliega un chatbot de reclamaciones") o una real con info pública.
2. **Evalúa contra las 4 funciones del NIST AI RMF:** *Govern, Map, Measure, Manage*. Para cada una, califica madurez (Inexistente / Inicial / Definido / Gestionado).
3. **Cruza con controles clave de ISO/IEC 42001** (política de IA, roles y responsabilidades, gestión de riesgos de IA, gestión del ciclo de vida, gestión de datos).
4. **Documenta gaps** — dónde falla y por qué es un riesgo (regulatorio, reputacional, operacional).
5. **Prioriza un roadmap** (Ahora / 90 días / 12 meses) con owner sugerido por acción.

<details>
<summary>Plantilla de tabla de assessment (cópiala)</summary>

| Función NIST AI RMF | Control / pregunta | Madurez (0–3) | Gap / riesgo | Acción recomendada | Plazo |
|---------------------|--------------------|:-------------:|--------------|--------------------|-------|
| **Govern** | ¿Existe una política de IA aprobada por dirección? | 1 | Sin ownership ejecutivo | Nombrar responsable de IA + política | Ahora |
| **Map** | ¿Se inventarían los sistemas de IA y sus usos? | 0 | No hay inventario | Crear registro de sistemas de IA | 90 días |
| **Measure** | ¿Se prueban sesgos y robustez antes de producción? | 1 | Pruebas ad-hoc | Definir suite de evaluación | 90 días |
| **Manage** | ¿Hay respuesta a incidentes específica de IA? | 0 | No existe | Extender IR playbook a IA | 12 meses |

> El puntaje es tu juicio profesional documentado — lo importante es la **justificación**, no el número.
</details>

<details>
<summary>Mapa rápido: regulación → función NIST que la cubre</summary>

| Regulación / marco | Dónde impacta |
|--------------------|---------------|
| **EU AI Act** (clasificación por riesgo) | Govern + Map |
| **GDPR / LFPDPPP** (datos personales) | Map + Manage (ver también [Reto 4](./challenge-04)) |
| **NIST AI RMF** | las 4 funciones |
| **ISO/IEC 42001** (AIMS) | Govern (sistema de gestión) |

</details>

## 📦 Entregable

Un documento `ai-governance-assessment.pdf` (o repo con `.md`) con:

1. **Resumen ejecutivo** (1 página) — nivel de madurez general + top 3 riesgos.
2. Tabla de assessment completa (plantilla de arriba).
3. **Roadmap priorizado** con plazos y owners.
4. Un párrafo de "qué regulaciones aplican y por qué".

## ✅ Criterios de éxito

- [ ] Evaluaste las **4 funciones** del NIST AI RMF.
- [ ] Referenciaste al menos **3 controles de ISO/IEC 42001**.
- [ ] Cada gap tiene **riesgo + acción + plazo + owner**.
- [ ] El resumen ejecutivo es entendible por un board (sin jerga técnica).

:::info Sin costo
NIST AI RMF es **gratuito y descargable**. ISO/IEC 42001 es de pago, pero para este reto basta con la estructura pública de la norma y resúmenes oficiales — no necesitas comprarla para practicar.
:::

---

**Anterior:** [← Reto 2](./challenge-02) · **Siguiente:** [Reto 4 — Detección de PII con Presidio →](./challenge-04)
