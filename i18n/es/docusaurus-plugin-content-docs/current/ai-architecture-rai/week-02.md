---
sidebar_position: 3
title: "Semana 2: Patrones de arquitectura + RAI por diseño"
---

# Semana 2: Patrones de arquitectura + RAI por diseño

:::info[Resumen de la semana]
**Objetivo:** Aprender los patrones fundamentales de arquitectura de IA (RAG, sistemas con agentes, uso de herramientas) y entender dónde deben integrarse estructuralmente los controles de RAI en cada uno.  
**Tiempo estimado:** 8–10 horas  
**Entregable:** Plantilla de modelo de amenazas RAI — un diagrama reutilizable con capas de riesgo anotadas para patrones RAG, con agentes y de uso de herramientas
:::

---

## Arquitectura RAG — Modos de falla de RAI en cada capa

```
INPUT LAYER
├─ User query arrives
├─ ⚠️ Risk: Adversarial input / prompt injection
└─ 🛡️ Control: Input validation, content safety classifier (Prompt Shield)

RETRIEVAL LAYER
├─ Query → Embedding → Vector search → Document chunks
├─ ⚠️ Risk: Biased retrieval (some populations' content under-represented)
├─ ⚠️ Risk: Stale or poisoned documents in the index
└─ 🛡️ Control: Data freshness policy, source provenance tracking, access control

AUGMENTATION LAYER
├─ Retrieved chunks added to prompt context
├─ ⚠️ Risk: Indirect prompt injection (malicious content in retrieved docs hijacks LLM)
└─ 🛡️ Control: Content scan on retrieved chunks before LLM injection

GENERATION LAYER
├─ LLM generates response grounded in retrieved context
├─ ⚠️ Risk: Hallucination (claims not supported by retrieved content)
├─ ⚠️ Risk: Harmful content despite grounding
└─ 🛡️ Control: Groundedness evaluator, output content safety filter

OUTPUT LAYER
├─ Response returned to user
├─ ⚠️ Risk: No disclosure that content is AI-generated
└─ 🛡️ Control: AI disclosure, source citations, human review gate for high-stakes domains
```

---

## Arquitectura con agentes — Límites de confianza y riesgo autónomo

```
AGENT LOOP ARCHITECTURE
─────────────────────────────────────────────────────────
User Intent → [Planner LLM]
                    ↓ Decides tool calls
              [Tool Execution] ──→ External Systems (DB, API, email, code)
                    ↓ Results returned
              [Reasoning LLM] ──→ Next decision
                    ↓
              [Output] → User / Next Agent

RAI RISK HOTSPOTS:
├─ Planner LLM: Can be manipulated via prompt injection in tool results
├─ Tool Execution: No human oversight between decision and action
├─ Multi-turn loop: Accumulated context may degrade decision quality
└─ Multi-agent: Downstream agents inherit the trust of calling agents
```

**Los 3 controles arquitectónicos de RAI no negociables para agentes:**

1. **Compuertas de confirmación** — para cualquier acción irreversible (send email, delete record, deploy code), exige confirmación humana explícita
2. **Log de auditoría por invocación de herramienta** — identidad del solicitante, parámetros, marca de tiempo y resultado; almacenado fuera del contexto del agente
3. **Limitación del radio de impacto** — delimita los permisos de herramientas de cada agente al mínimo necesario

---

## OWASP LLM Top 10 — La visión del arquitecto

Estos son **fallos arquitectónicos**, no bugs de aplicación:

| Riesgo | Causa raíz arquitectónica | Corrección de diseño |
|------|--------------------------|------------|
| **LLM01: Prompt Injection** | Los datos del usuario y las instrucciones del sistema comparten el mismo canal de entrada | Separar canales; escanear el contenido recuperado antes de inyectarlo |
| **LLM02: Insecure Output Handling** | La salida del LLM se renderiza sin sanitización | Tratar toda salida del LLM como no confiable; sanitizar antes de enviarla a sistemas posteriores |
| **LLM03: Training Data Poisoning** | No existe gobernanza de datos en el ajuste fino o en las fuentes RAG | Exigir procedencia de la fuente; política de vigencia; pruebas con entradas adversarias |
| **LLM06: Excessive Agency** | El agente tiene más permisos de los que su tarea requiere | Principio de mínimo privilegio para cada herramienta; tokens OAuth con alcance acotado |
| **LLM08: Excessive Data Exposure** | El system prompt incluye datos sensibles innecesariamente | Minimización de datos en la construcción del contexto |
| **LLM09: Overreliance** | No hay un humano en el circuito para decisiones de alto impacto | Compuertas de revisión obligatorias; umbrales de confianza que dirijan salidas de baja confianza a personas |

---

## Extensión de modelado de amenazas STRIDE-AI

| Categoría STRIDE | Ataque específico de IA | Mitigación arquitectónica |
|----------------|-------------------|------------------------|
| **Spoofing** | La prompt injection suplanta al sistema | Separación entre prompts del sistema y del usuario; jerarquía de instrucciones |
| **Tampering** | El envenenamiento de datos corrompe el índice RAG | Validación de fuentes; procedencia firmada de documentos |
| **Repudiation** | El agente realiza una acción sin pista de auditoría | Log de auditoría inmutable por invocación de herramienta |
| **Information Disclosure** | Extracción del system prompt; fuga de PII a través del modelo | No incluir secretos en los prompts; detección de PII en la salida |
| **Denial of Service** | Prompts adversarios que causan bucles infinitos o consumo máximo de tokens | Límites de longitud de entrada; detección de bucles en el runtime del agente |
| **Elevation of Privilege** | Confused deputy: un atacante engaña al agente para que use credenciales legítimas | Delimitación de tokens; managed identity por agente |

---

## Recursos de esta semana

| Recurso | Tipo | Tiempo estimado |
|----------|------|---------------|
| [Guía de arquitectura RAG de Azure OpenAI](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/architecture/baseline-openai-e2e-chat) | Profundización arquitectónica | 2 horas |
| [Azure AI Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/) | Referencia | 1.5 horas |
| [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) | Lectura completa | 1.5 horas |
| [MITRE ATLAS — AI Threat Matrix](https://atlas.mitre.org/) | Referencia | 1 hora |
| [Semantic Kernel Agent Framework](https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/) | Técnico | 1.5 horas |

---

## Ejercicio práctico

:::tip[Ejercicio — Anota una arquitectura RAG]
Dibuja un diagrama de arquitectura RAG. Para cada componente (ingesta de datos, embedding, retrieval, generation, output):

1. Etiqueta el **riesgo RAI** en esa capa (usa OWASP LLM Top 10 como referencia)
2. Etiqueta el **control de mitigación** que agregarías
3. Etiqueta el **responsable** de ese control (equipo de datos / equipo de IA / seguridad / producto)

Después responde: ¿Qué capa tiene la cobertura de RAI más débil en la mayoría de las implementaciones RAG que has visto y por qué?
:::

---

## Entregable de la semana 2: Plantilla de modelo de amenazas RAI

Construye una plantilla reutilizable de modelo de amenazas con:
- Diagrama por capas de RAG con anotaciones de riesgo (una amenaza + un control por capa)
- Diagrama del bucle con agentes con marcas de límites de confianza
- Tabla de extensión STRIDE-AI (6 filas, ataque específico de IA + mitigación para cada una)

---

## Verificación de conocimientos

1. En un sistema RAG, ¿cuál es el riesgo de la prompt injection indirecta y en qué capa ocurre?
2. ¿Por qué "Excessive Agency" (OWASP LLM06) es un problema arquitectónico y no un bug de código?
3. Un desarrollador dice: "Nuestro agente solo llama APIs de solo lectura, así que no necesitamos una compuerta de confirmación". ¿Qué riesgo de RAI pasa por alto ese razonamiento?
4. En STRIDE-AI, ¿qué categoría cubre el patrón de ataque "confused deputy"?
