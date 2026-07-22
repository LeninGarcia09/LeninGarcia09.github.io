---
id: anti-patterns
title: Anti-Patrones Clave (Español)
sidebar_label: ⚠️ Anti-Patrones Clave
sidebar_position: 5
---

# ⚠️ Anti-Patrones Clave (Contenido de Alto Rendimiento)

> 🌐 **Idioma:** Español · [English version](../anti-patterns)

Aparecen como distractores en ~60% de las preguntas. Si los reconoces, eliminas 2–3 opciones de inmediato.

| Anti-Patrón | Por qué está mal | Enfoque Correcto |
|-------------|------------------|------------------|
| Parsear NL para terminar el loop | Frágil, no determinista | Verificar el valor de `stop_reason` |
| Límites de iteración arbitrarios | Ignora la señal de finalización | Terminación basada en condiciones |
| Arquitectura multi-agente plana | Sin coordinador = sin control | Patrón hub-and-spoke |
| Enforcement basado en prompts | Probabilístico, evadible | Hooks `PostToolUse` |
| Auto-revisión en la misma sesión | Retiene el razonamiento original | Sesión/subagente separado |
| Mensaje de reintento genérico | Sin contexto para corregir | Anexar errores específicos |
| CLAUDE.md monolítico | Difícil de mantener a escala | Estructura jerárquica `@import` |
| Todas las tools en un agente | Parálisis de decisión | Máx. 4–5 tools acotadas |

---

## Consejos de Estudio

:::tip Enfócate en el PORQUÉ
El examen evalúa **razonamiento arquitectónico**, no memorización. Entiende por qué hub-and-spoke supera a multi-agente plano. Por qué los hooks superan a los prompts para enforcement. Por qué la revisión multi-pass requiere aislamiento de sesión.
:::

:::warning Los Anti-Patrones Son Trampas
Los distractores del examen suelen ser anti-patrones plausibles. Si una respuesta suena como "solo usa un prompt para eso" — probablemente está mal.
:::

:::info Construye Proyectos Reales
La experiencia hands-on con el Agent SDK, servidores MCP y Claude Code consolida la comprensión conceptual más rápido que releer notas.
:::

---

➡️ Siguiente: **[🔗 Recursos y Fuentes](./resources)**.
