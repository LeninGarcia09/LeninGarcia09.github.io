---
id: domains
title: Los 5 Dominios del Examen (Español)
sidebar_label: 📚 Los 5 Dominios
sidebar_position: 2
---

# 📚 Los 5 Dominios del Examen

> 🌐 **Idioma:** Español · [English version](../domains)
>
> Desglose por dominio: conceptos clave, anti-patrones y recursos oficiales de Anthropic. Los pesos (%) están en la [Vista General](./overview#los-5-dominios-del-examen).

## Dominio 1 — Agentic Architecture & Orchestration (~25%)

Diseñar e implementar sistemas agénticos con el Agent SDK de Claude.

**Conceptos clave:**
- Ciclo de vida del agentic loop: `stop_reason` (`tool_use` vs `end_turn`)
- Arquitectura multi-agente hub-and-spoke — rol de coordinador, aislamiento de contexto de subagentes
- Herramienta `Task` para lanzar subagentes (`allowedTools` debe incluir `'Task'`)
- Ejecución paralela de subagentes con `fork_session` para exploración ramificada
- Hooks `PostToolUse` para enforcement determinista (supera la guía basada en prompts)
- Gestión de sesiones: `--resume`, `fork_session`, sesiones nombradas, manejo de contexto obsoleto
- Descomposición de tareas: prompt chaining vs descomposición adaptativa dinámica

**Anti-patrones a conocer:**
- Parsear lenguaje natural para terminar el loop (usar `stop_reason` en su lugar)
- Límites de iteración arbitrarios sin condiciones
- Multi-agente plano vs hub-and-spoke (plano = sin coordinador = caos a escala)
- Descomposición demasiado estrecha → huecos de cobertura

**📚 Recursos oficiales (Anthropic):**
- [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)
- [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop) — ciclo de mensajes y `stop_reason`
- [Subagents in the SDK](https://code.claude.com/docs/en/agent-sdk/subagents) — aislamiento de contexto y paralelismo
- [Work with sessions](https://code.claude.com/docs/en/agent-sdk/sessions) — `continue`, `resume`, `fork`
- [Intercept and control agent behavior with hooks](https://code.claude.com/docs/en/agent-sdk/hooks)
- [Run agents in parallel](https://code.claude.com/docs/en/agents) — subagentes vs equipos de agentes
- [Stop reasons and fallback](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons)
- 🎓 [Anthropic Academy — *Introduction to Subagents* (curso gratuito)](https://anthropic.skilljar.com/introduction-to-subagents) — aislamiento de contexto, `/agents`, output estructurado, límites de tools, anti-patrones

---

## Dominio 2 — Tool Design & MCP Integration (~20%)

Diseñar herramientas efectivas e integrar servidores del Model Context Protocol.

**Conceptos clave:**
- Buenas prácticas de descripción de tools: formatos de entrada, ejemplos, casos borde en la descripción
- Respuestas de error estructuradas: `isError`, `errorCategory`, `isRetryable`
- Distribución de tools: máx. 4–5 tools por agente, acceso a tools acotado por subagente
- Config de servidor MCP: `.mcp.json` (nivel proyecto) vs `~/.claude.json` (nivel usuario)
- Tools integradas: `Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob` — cuándo usar cada una

**Anti-patrones a conocer:**
- Mensajes de error genéricos (sin `isRetryable` → el agente reintenta indefinidamente)
- Demasiadas tools por agente → parálisis de decisión
- MCP a nivel usuario para servidores específicos del proyecto (deberían ser nivel proyecto)

**📚 Recursos oficiales (Anthropic):**
- [Tool use with Claude — overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- [How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works)
- [Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools) — descripciones, schemas, ejemplos
- [Give Claude custom tools (SDK in-process MCP)](https://code.claude.com/docs/en/agent-sdk/custom-tools)
- [Connect to external tools with MCP](https://code.claude.com/docs/en/agent-sdk/mcp) — transports, auth, manejo de errores
- [MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector) & [Remote MCP servers](https://platform.claude.com/docs/en/agents-and-tools/remote-mcp-servers)
- [Scale to many tools with tool search](https://code.claude.com/docs/en/agent-sdk/tool-search)
- 🎓 [Anthropic Academy — *Introduction to Model Context Protocol* (curso gratuito)](https://anthropic.skilljar.com/introduction-to-model-context-protocol) — fundamentos de MCP: servidores, tools, transports
- 🎓 [Anthropic Academy — *Model Context Protocol: Advanced Topics* (curso gratuito)](https://anthropic.skilljar.com/model-context-protocol-advanced-topics) — auth, remote servers, manejo de errores, escala

---

## Dominio 3 — Claude Code Configuration & Workflows (~20%)

Configurar Claude Code para flujos de trabajo de equipos de desarrollo.

**Conceptos clave:**
- Jerarquía de `CLAUDE.md`: niveles usuario → proyecto → directorio
- Sintaxis `@import`, `.claude/rules/` para reglas por tema
- Slash commands personalizados (`.claude/commands/`) vs skills (`.claude/skills/`)
- Frontmatter de `SKILL.md`: `context: fork`, `allowed-tools`, `argument-hint`
- Reglas por ruta: frontmatter YAML con patrones glob `paths`
- Criterios para elegir plan mode vs ejecución directa
- CI/CD: flag `-p`, `--output-format json`, `--json-schema`
- Aislamiento de contexto de sesión en CI (roles generador vs revisor)
- Message Batches API: 50% de ahorro, ventana de procesamiento de 24 horas

**Anti-patrones a conocer:**
- Un `CLAUDE.md` monolítico vs imports jerárquicos
- Usar ejecución directa para refactors complejos multi-archivo
- Misma sesión para generador + revisor (pierde perspectiva independiente)

**📚 Recursos oficiales (Anthropic):**
- [Extend Claude Code](https://code.claude.com/docs/en/features-overview) — cuándo usar CLAUDE.md, Skills, subagentes, hooks, MCP
- [Explore the .claude directory](https://code.claude.com/docs/en/claude-directory) — CLAUDE.md, settings, hooks, skills, commands
- [Commands](https://code.claude.com/docs/en/commands) — slash commands integrados y personalizados
- [Agent Skills — overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) & [authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide)
- [Run Claude Code programmatically (headless / CI)](https://code.claude.com/docs/en/headless) & [GitHub Actions](https://code.claude.com/docs/en/github-actions)
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices)

---

## Dominio 4 — Prompt Engineering & Structured Output (~20%)

Dominar el prompt engineering para sistemas a escala de producción.

**Conceptos clave:**
- Criterios explícitos sobre instrucciones vagas (impacto de falsos positivos en la precisión)
- Few-shot prompting: 2–4 ejemplos para casos de clasificación ambiguos
- `tool_use` con JSON schemas: cumplimiento garantizado de schema vs errores semánticos
- `tool_choice`: `'auto'` vs `'any'` vs forzar una tool específica
- Diseño de schema: `required` vs opcional, enums con `'other'` + campo de detalle
- Loops de validación-reintento: agregar errores específicos al prompt (no un genérico "try again")
- Campos `detected_pattern` para rastrear escalamiento de patrones de descarte
- Revisión multi-pass: análisis local por archivo + pase de integración cross-file

**Anti-patrones a conocer:**
- Instrucciones vagas → salidas inconsistentes
- Auto-revisión en la misma sesión (retiene el contexto de razonamiento, anula el propósito)
- Prompts de reintento genéricos sin contexto de error específico

**📚 Recursos oficiales (Anthropic):**
- [Prompt engineering — overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
- [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) — cumplimiento garantizado de JSON schema
- [Get structured output from agents (SDK)](https://code.claude.com/docs/en/agent-sdk/structured-outputs) — JSON Schema / Zod / Pydantic
- [Strict tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use) & [Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls) — `tool_choice`
- [Tutorial: build a tool-using agent](https://platform.claude.com/docs/en/agents-and-tools/tool-use/build-a-tool-using-agent)
- [Anthropic Academy / Learn](https://www.anthropic.com/learn) — cursos guiados de prompt engineering
- 🎓 [Anthropic Academy — *Claude with the Anthropic API* (curso gratuito)](https://anthropic.skilljar.com/claude-with-the-anthropic-api) — auth, prompt engineering, output estructurado, RAG y agentes

---

## Dominio 5 — Context Management & Reliability (~15%)

Gestionar el contexto de forma efectiva en sistemas de producción de larga duración.

**Conceptos clave:**
- Riesgos de la summarización progresiva, efecto 'lost in the middle'
- Bloques `case facts`, recorte de outputs verbosos de tools, orden de contexto consciente de posición
- Patrones de escalamiento: demandas del cliente, huecos de política, sentimiento ≠ complejidad
- Propagación de errores: contexto estructurado vs mensajes de error genéricos
- Recuperación local antes de escalar al coordinador, reporte de resultados parciales
- Degradación de contexto en sesiones extendidas → archivos scratchpad
- `/compact`, delegación a subagentes, manifiestos de recuperación ante fallos
- Revisión humana: muestreo estratificado, scoring de confianza a nivel de campo
- Procedencia de la información: mapeos claim-fuente, frescura temporal de datos

**Anti-patrones a conocer:**
- Agregar todo el contexto cronológicamente (sin conciencia de posición)
- Escalar por sentimiento en vez de por complejidad/hueco de política real
- Sin manifiesto de recuperación → progreso perdido ante un fallo

**📚 Recursos oficiales (Anthropic):**
- [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) — el efecto 'lost in the middle'
- [Context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing) & [Compaction](https://platform.claude.com/docs/en/build-with-claude/compaction)
- [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) — reutilizar contexto estable de forma eficiente
- [Explore the context window (Claude Code)](https://code.claude.com/docs/en/context-window)
- [Checkpointing](https://code.claude.com/docs/en/checkpointing) — rebobinar y recuperar estado de sesión
- [Memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool) & [Track cost and usage (SDK)](https://code.claude.com/docs/en/agent-sdk/cost-tracking)

---

➡️ Siguiente: **[🎓 Cursos + Mock Exam](./courses)** — pon en práctica cada dominio con los cursos gratuitos oficiales.
