---
sidebar_position: 1
title: "Track de Retos — Seguridad de IA Aplicada"
---

# 🧪 Track de Retos: Seguridad de IA Aplicada

> **Vendor-neutral. Gratis. Práctico.** Cuatro laboratorios que convierten tu experiencia en ciberseguridad en **evidencia de portafolio** para roles de Seguridad y Gobernanza de IA — sin depender de ningún proveedor.

:::info Por qué existe este track
Las ofertas de trabajo en seguridad de IA (AI Security Engineer, Detection Engineer, Especialista en Seguridad de IA, Consultor de Seguridad) piden una cosa por encima de todo: **haberlo hecho, no solo estudiado**. Cada reto aquí produce un **artefacto verificable** (un reporte, un mapeo de amenazas, un assessment) que puedes publicar en GitHub y explicar en una entrevista. Todas las herramientas son **de código abierto y gratuitas**.
:::

## 🎯 Para quién es

Profesionales de IT / ciberseguridad / forense en reposicionamiento hacia IA. No necesitas ser desarrollador senior: necesitas Python básico y disciplina. Complementa la **[Fase 3: Ciberseguridad](../cybersecurity/overview)** y la **[Fase 5: Cloud + AI](../cloud-ai/overview)** del plan.

## 🧰 Los 4 retos

| # | Reto | Herramienta abierta | Frameworks | Artefacto de portafolio |
|---|------|---------------------|-----------|-------------------------|
| [1](./challenge-01) | Auditoría de LLM (OWASP Top 10) | **garak** | OWASP LLM Top 10 | Reporte de vulnerabilidades de un LLM |
| [2](./challenge-02) | Red-teaming de IA + mapeo de amenazas | **PyRIT** | MITRE ATLAS | Informe de red-team con TTPs mapeadas |
| [3](./challenge-03) | Assessment de gobernanza | *(ninguna — documento)* | NIST AI RMF + ISO/IEC 42001 | Gap assessment ejecutivo |
| [4](./challenge-04) | Detección/anonimización de PII (DLP) | **Presidio** | GDPR / LFPDPPP | Pipeline de clasificación de datos |

## 🧭 Cómo estos retos te consiguen empleo

Cada reto está anclado a responsabilidades reales de ofertas actuales de seguridad de IA:

| Responsabilidad típica en JDs | Reto que la evidencia |
|-------------------------------|------------------------|
| "Interpretar alertas de IA, reducir falsos positivos, tuning de detección" | Reto 1 + Reto 2 |
| "Red-teaming / threat hunting con IA; inteligencia de amenazas adversariales" | Reto 2 |
| "Requisitos de seguridad de IA, cumplimiento (EU AI Act, NIST AI RMF), gobernanza y ética" | Reto 3 |
| "Identificación y clasificación de datos sensibles (DLP, PII), protección de datos" | Reto 4 |

:::tip Regla de oro del portafolio
Un reto no está "terminado" hasta que cumple la [rúbrica de capstone](../methodology-best-practices#rúbrica-de-capstone-calidad-hiring-ready): README profesional, reproducible, diagrama, decisiones/trade-offs, y una demo de 5 minutos que puedas explicar sin notas.
:::

---

## ⚙️ Paso 0 — Entorno aislado (una sola vez, ~5 min)

Los Retos 1, 2 y 4 usan Python. Crea **un** entorno reutilizable para los tres.

**Dónde ejecutas esto:** en tu propia máquina (Windows, macOS o Linux). No necesitas cloud ni tarjeta de crédito.

```bash
# Crea y entra en la carpeta del track
mkdir ai-security-labs && cd ai-security-labs

# Entorno virtual de Python (requiere Python 3.10–3.12)
python -m venv .venv
# Windows (PowerShell): .venv\Scripts\Activate.ps1
# macOS/Linux:          source .venv/bin/activate

# Carpeta local para tus reportes (tu "evidencia")
mkdir reports
```

<details>
<summary>¿Qué modelo/LLM uso para probar? (opciones gratis)</summary>

No necesitas pagar por un modelo para practicar. Opciones:

- **Modelo local con [Ollama](https://ollama.com/)** (gratis, corre en tu máquina): `ollama run llama3.2` y apunta las herramientas al endpoint local. **Recomendado** para practicar sin costo ni riesgo.
- **Tier gratuito de un proveedor** (OpenAI, Google, Anthropic, Azure) si ya tienes acceso — usa una clave con límite de gasto.
- **Modelo de Hugging Face** descargado localmente.

> ⚠️ **Solo prueba modelos que te pertenezcan o para los que tengas permiso explícito.** Hacer red-teaming a un sistema de terceros sin autorización es ilegal.
</details>

---

## ✅ Checklist del track

- [ ] Entorno aislado creado (Paso 0)
- [ ] Reto 1: reporte de garak publicado en GitHub
- [ ] Reto 2: informe de red-team con mapeo a MITRE ATLAS
- [ ] Reto 3: gap assessment NIST AI RMF + ISO 42001
- [ ] Reto 4: pipeline de detección de PII con Presidio
- [ ] Los 4 artefactos cumplen la rúbrica de capstone
- [ ] LinkedIn y CV actualizados con estos proyectos

## 🔗 Valor para el CV

> "Ejecuté auditorías de seguridad de LLMs (OWASP LLM Top 10) con garak, red-teaming de IA mapeado a MITRE ATLAS con PyRIT, un gap assessment de gobernanza alineado a NIST AI RMF e ISO/IEC 42001, y un pipeline de detección de PII con Presidio — todo publicado como evidencia reproducible en GitHub."

---

*Todas las herramientas y frameworks de este track están verificados en [Fuentes y Verificación](../sources-and-verification#seguridad-de-ia--herramientas-abiertas-y-gratuitas-vendor-neutral).*
