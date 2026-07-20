---
sidebar_position: 2
title: "Reto 1 — Auditoría de LLM (OWASP Top 10)"
---

# Reto 1: Auditoría de seguridad de un LLM con garak

> **Herramienta:** [garak](https://github.com/NVIDIA/garak) (open source, Apache-2.0) · **Framework:** [OWASP Top 10 for LLM Apps](https://genai.owasp.org/llm-top-10/) · **Tiempo:** 3–4 h

:::tip Qué vas a construir
Un **reporte de vulnerabilidades** de un LLM: le lanzas sondas automáticas (prompt injection, fuga de datos, toxicidad, jailbreaks) y documentas los hallazgos mapeados al OWASP LLM Top 10. Es el equivalente a un "pentest report", pero para IA.
:::

**Dónde ejecutas esto:** en tu máquina, dentro del entorno del [Paso 0](./overview#️-paso-0--entorno-aislado-una-sola-vez-5-min). El objetivo de prueba es un **modelo local con Ollama** (gratis) o una clave propia con límite de gasto.

## Por qué importa para el empleo

Las ofertas de AI Security Engineer y de soporte de plataformas de detección (p. ej. Falcon, Sentinel) piden *"interpretar alertas generadas por IA"* y *"reducir falsos positivos manteniendo eficacia de detección"*. Este reto te da vocabulario y evidencia concreta de ambos.

## Pasos

```bash
# 1. Instala garak en tu entorno virtual
python -m pip install -U garak

# 2. (Opción gratis) Levanta un modelo local con Ollama en otra terminal
#    https://ollama.com  →  ollama run llama3.2

# 3. Explora las sondas disponibles
garak --list_probes

# 4. Corre una auditoría enfocada (ejemplo: prompt injection)
garak --model_type ollama --model_name llama3.2 --probes promptinject

# 5. Corre una segunda familia (ejemplo: fuga de datos / toxicidad)
garak --model_type ollama --model_name llama3.2 --probes leakreplay,realtoxicityprompts

# 6. garak genera un reporte .jsonl y un resumen en consola → guárdalo en reports/
```

<details>
<summary>Mapeo: sondas de garak → OWASP LLM Top 10</summary>

| Sonda garak (ejemplo) | Riesgo OWASP LLM (v2025) |
|-----------------------|--------------------------|
| `promptinject`, `dan` (jailbreaks) | **LLM01: Prompt Injection** |
| `leakreplay` | **LLM02: Sensitive Information Disclosure** |
| `realtoxicityprompts`, `lmrc` | **LLM05: Improper Output Handling** (contenido dañino) |
| `malwaregen`, `xss` | **LLM05 / LLM02** (salida insegura) |
| `glitch`, `encoding` | **LLM01** (inyección por ofuscación) |

> Consulta la lista oficial actualizada de riesgos en [genai.owasp.org/llm-top-10](https://genai.owasp.org/llm-top-10/) y de sondas con `garak --list_probes`.
</details>

## 📦 Entregable

Un repositorio `llm-security-audit/` con:

1. `README.md` — qué modelo auditaste, qué sondas, y **3–5 hallazgos** en lenguaje de negocio.
2. `reports/` — la salida `.jsonl` de garak (evidencia cruda).
3. `findings.md` — tabla: hallazgo → riesgo OWASP → severidad → mitigación propuesta.
4. Un diagrama simple del flujo de auditoría.

## ✅ Criterios de éxito

- [ ] Corriste al menos **2 familias de sondas** distintas.
- [ ] Cada hallazgo está mapeado a un ID de **OWASP LLM Top 10**.
- [ ] Propusiste una **mitigación** por hallazgo (no solo lo describiste).
- [ ] El README lo entiende un hiring manager no técnico en 2 minutos.

:::warning Ética y legalidad
Audita **solo** modelos propios o con permiso explícito. Nunca ejecutes garak contra un sistema de producción de un tercero sin autorización por escrito.
:::

---

**Siguiente:** [Reto 2 — Red-teaming de IA con PyRIT →](./challenge-02)
