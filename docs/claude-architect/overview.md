---
id: overview
title: Claude Certified Architect – Foundations
sidebar_label: Exam Overview
slug: /claude-architect/overview
---

# Claude Certified Architect – Foundations

> **Vendor:** Anthropic · **Level:** Foundations · **Format:** 60 preguntas (multiple choice + multiple response), basadas en escenarios  
> **Examen:** 120 min · escala 100–1000, **720 para aprobar** · **$125 USD** · válida 12 meses · online proctored o Pearson test center  
> **Study Plan (guía de estudio):** 12 semanas · ~1 hora/día · 84 horas · 13 practice tests

This certification validates your ability to **design, build, and operate production-grade agentic AI systems** using Claude. Unlike generic AI certs, it tests architectural reasoning — *why* certain patterns beat others, not just *what* they are.

:::warning Verified facts & official sources (last checked 2026-07-22)
The **Claude Certification Program is an official Anthropic program** (launched March 12, 2026), delivered with **Pearson VUE**, with preparation via **Anthropic Academy** (cursos gratuitos self-paced) y la **Anthropic Partner Academy**, y badges digitales vía **Credly**. It offers three roles — **Practitioner, Architect, and Developer** — and counts toward Claude Partner Network standing.

- Program overview: [Claude Certification Program (Pearson VUE)](https://www.pearsonvue.com/us/en/anthropic.html)
- Official cert page: [Claude Certified Architect – Foundations (Anthropic Academy)](https://anthropic.skilljar.com/claude-certified-architect-foundations-certification/444989)
- Free self-paced training: [Anthropic Academy](https://anthropic.skilljar.com/)
- Prep & scheduling: [Anthropic Partner Academy](https://anthropic-partners.skilljar.com/)
- **Exam format (Exam Guide v0.2, 30 jun 2026):** 60 preguntas (multiple choice + multiple response) · 120 min · escala 100–1000, **720 para aprobar** · **$125 USD** · válida 12 meses · online proctored o Pearson test center.
- **Retake policy:** 14 days after attempt 1, 30 after attempt 2, 90 after attempt 3; up to 4 attempts per rolling 12 months.
- **Register only through the official channels above.** Existen varios sitios de terceros con nombres similares (p. ej. `claudecertifications.com`, `claudearchitectcertification.com`) que **no** son el portal oficial de Anthropic. Un recurso comunitario **independiente (no afiliado a Anthropic)** — [claudecertificationguide.com](https://claudecertificationguide.com/) — ofrece un diagnóstico gratuito + mock exam útil para practicar; aun así, **confirma todos los datos del examen en la página oficial de Anthropic Academy antes de agendar.**
:::

---

## 5 Exam Domains

| Domain | Topic | Weight |
|--------|-------|--------|
| **1** | Agentic Architecture & Orchestration | ~25% |
| **2** | Tool Design & MCP Integration | ~20% |
| **3** | Claude Code Configuration & Workflows | ~20% |
| **4** | Prompt Engineering & Structured Output | ~20% |
| **5** | Context Management & Reliability | ~15% |

---

## Domain Breakdowns

### Domain 1 — Agentic Architecture & Orchestration (~25%)

Design and implement agentic systems using Claude's Agent SDK.

**Key Concepts:**
- Agentic loop lifecycle: `stop_reason` (`tool_use` vs `end_turn`)
- Hub-and-spoke multi-agent architecture — coordinator role, subagent context isolation
- `Task` tool for subagent spawning (`allowedTools` must include `'Task'`)
- Parallel subagent execution with `fork_session` for branched exploration
- `PostToolUse` hooks for deterministic enforcement (beats prompt-based guidance)
- Session management: `--resume`, `fork_session`, named sessions, stale context handling
- Task decomposition: prompt chaining vs dynamic adaptive decomposition

**Anti-Patterns to Know:**
- Parsing natural language for loop termination (use `stop_reason` instead)
- Arbitrary iteration caps without conditions
- Flat multi-agent vs hub-and-spoke (flat = no coordinator = chaos at scale)
- Overly narrow task decomposition → coverage gaps

**📚 Official resources (Anthropic):**
- [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)
- [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop) — message lifecycle & `stop_reason`
- [Subagents in the SDK](https://code.claude.com/docs/en/agent-sdk/subagents) — context isolation & parallelism
- [Work with sessions](https://code.claude.com/docs/en/agent-sdk/sessions) — `continue`, `resume`, `fork`
- [Intercept and control agent behavior with hooks](https://code.claude.com/docs/en/agent-sdk/hooks)
- [Run agents in parallel](https://code.claude.com/docs/en/agents) — subagents vs agent teams
- [Stop reasons and fallback](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons)
- 🎓 [Anthropic Academy — *Introduction to Subagents* (curso gratuito)](https://anthropic.skilljar.com/introduction-to-subagents) — aislamiento de contexto, `/agents`, output estructurado, límites de tools, anti-patrones

---

### Domain 2 — Tool Design & MCP Integration (~20%)

Design effective tools and integrate with Model Context Protocol servers.

**Key Concepts:**
- Tool description best practices: input formats, examples, edge cases in description
- Structured error responses: `isError`, `errorCategory`, `isRetryable`
- Tool distribution: 4–5 tools per agent max, scoped tool access per subagent
- MCP server config: `.mcp.json` (project-level) vs `~/.claude.json` (user-level)
- Built-in tools: `Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob` — when to use each

**Anti-Patterns to Know:**
- Generic error messages (no `isRetryable` → agent retries indefinitely)
- Too many tools per agent → decision paralysis
- User-level MCP for project-specific servers (should be project-level)

**📚 Official resources (Anthropic):**
- [Tool use with Claude — overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- [How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works)
- [Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools) — descriptions, schemas, examples
- [Give Claude custom tools (SDK in-process MCP)](https://code.claude.com/docs/en/agent-sdk/custom-tools)
- [Connect to external tools with MCP](https://code.claude.com/docs/en/agent-sdk/mcp) — transports, auth, error handling
- [MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector) & [Remote MCP servers](https://platform.claude.com/docs/en/agents-and-tools/remote-mcp-servers)
- [Scale to many tools with tool search](https://code.claude.com/docs/en/agent-sdk/tool-search)
- 🎓 [Anthropic Academy — *Introduction to Model Context Protocol* (curso gratuito)](https://anthropic.skilljar.com/introduction-to-model-context-protocol) — fundamentos de MCP: servidores, tools, transports
- 🎓 [Anthropic Academy — *Model Context Protocol: Advanced Topics* (curso gratuito)](https://anthropic.skilljar.com/model-context-protocol-advanced-topics) — auth, remote servers, manejo de errores, escala

---

### Domain 3 — Claude Code Configuration & Workflows (~20%)

Configure Claude Code for team development workflows.

**Key Concepts:**
- `CLAUDE.md` hierarchy: user → project → directory levels
- `@import` syntax, `.claude/rules/` for topic-specific rules
- Custom slash commands (`.claude/commands/`) vs skills (`.claude/skills/`)
- `SKILL.md` frontmatter: `context: fork`, `allowed-tools`, `argument-hint`
- Path-specific rules: YAML frontmatter with `paths` glob patterns
- Plan mode vs direct execution decision criteria
- CI/CD: `-p` flag, `--output-format json`, `--json-schema`
- Session context isolation in CI (generator vs reviewer roles)
- Message Batches API: 50% cost savings, 24-hour processing window

**Anti-Patterns to Know:**
- Single monolithic `CLAUDE.md` vs hierarchical imports
- Using direct execution mode for complex multi-file refactors
- Same session for generator + reviewer (loses independent perspective)

**📚 Official resources (Anthropic):**
- [Extend Claude Code](https://code.claude.com/docs/en/features-overview) — when to use CLAUDE.md, Skills, subagents, hooks, MCP
- [Explore the .claude directory](https://code.claude.com/docs/en/claude-directory) — CLAUDE.md, settings, hooks, skills, commands
- [Commands](https://code.claude.com/docs/en/commands) — built-in & custom slash commands
- [Agent Skills — overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) & [authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide)
- [Run Claude Code programmatically (headless / CI)](https://code.claude.com/docs/en/headless) & [GitHub Actions](https://code.claude.com/docs/en/github-actions)
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices)

---

### Domain 4 — Prompt Engineering & Structured Output (~20%)

Master prompt engineering for production-scale systems.

**Key Concepts:**
- Explicit criteria over vague instructions (false positive impact on precision)
- Few-shot prompting: 2–4 examples for ambiguous classification cases
- `tool_use` with JSON schemas: guaranteed schema compliance vs semantic errors
- `tool_choice`: `'auto'` vs `'any'` vs forced specific tool
- Schema design: `required` vs optional, enums with `'other'` + detail field
- Validation-retry loops: append specific errors to prompt (not generic "try again")
- `detected_pattern` fields for tracking dismissal pattern escalation
- Multi-pass review: per-file local analysis + cross-file integration pass

**Anti-Patterns to Know:**
- Vague instructions → inconsistent outputs
- Self-review in same session (retains reasoning context, defeats the purpose)
- Generic retry prompts without specific error context

**📚 Official resources (Anthropic):**
- [Prompt engineering — overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
- [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) — guaranteed JSON schema compliance
- [Get structured output from agents (SDK)](https://code.claude.com/docs/en/agent-sdk/structured-outputs) — JSON Schema / Zod / Pydantic
- [Strict tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use) & [Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls) — `tool_choice`
- [Tutorial: build a tool-using agent](https://platform.claude.com/docs/en/agents-and-tools/tool-use/build-a-tool-using-agent)
- [Anthropic Academy / Learn](https://www.anthropic.com/learn) — guided prompt-engineering courses
- 🎓 [Anthropic Academy — *Claude with the Anthropic API* (curso gratuito)](https://anthropic.skilljar.com/claude-with-the-anthropic-api) — auth, prompt engineering, output estructurado, RAG y agentes

---

### Domain 5 — Context Management & Reliability (~15%)

Manage context effectively in long-running production systems.

**Key Concepts:**
- Progressive summarization risks, 'lost in the middle' effect
- `case facts` blocks, trimming verbose tool outputs, position-aware context ordering
- Escalation patterns: customer demands, policy gaps, sentiment ≠ complexity
- Error propagation: structured context vs generic error messages
- Local recovery before coordinator escalation, partial results reporting
- Context degradation in extended sessions → scratchpad files
- `/compact`, subagent delegation, crash recovery manifests
- Human review: stratified sampling, field-level confidence scoring
- Information provenance: claim-source mappings, temporal data freshness

**Anti-Patterns to Know:**
- Appending all context chronologically (no position-awareness)
- Escalating on sentiment rather than actual complexity/policy gap
- No crash recovery manifest → lost progress on failure

**📚 Official resources (Anthropic):**
- [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) — the 'lost in the middle' effect
- [Context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing) & [Compaction](https://platform.claude.com/docs/en/build-with-claude/compaction)
- [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) — reuse stable context efficiently
- [Explore the context window (Claude Code)](https://code.claude.com/docs/en/context-window)
- [Checkpointing](https://code.claude.com/docs/en/checkpointing) — rewind & recover session state
- [Memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool) & [Track cost and usage (SDK)](https://code.claude.com/docs/en/agent-sdk/cost-tracking)

---

## 🎓 Cursos Oficiales de Anthropic Academy (gratuitos, self-paced)

Cursos **oficiales de Anthropic** (sin costo, sin registro obligatorio en `anthropic.skilljar.com`). Mapeados a los dominios del examen — úsalos como el núcleo práctico del plan de estudio:

| Curso | Cubre | Dominio(s) |
|-------|-------|-----------|
| [Claude with the Anthropic API](https://anthropic.skilljar.com/claude-with-the-anthropic-api) | Auth, prompt engineering, output estructurado, RAG, agentes | 1 · 4 |
| [Introduction to Model Context Protocol](https://anthropic.skilljar.com/introduction-to-model-context-protocol) | Fundamentos de MCP: servidores, tools, transports | 2 |
| [Model Context Protocol: Advanced Topics](https://anthropic.skilljar.com/model-context-protocol-advanced-topics) | Auth, remote servers, manejo de errores, escala | 2 |
| [Introduction to Subagents](https://anthropic.skilljar.com/introduction-to-subagents) | Aislamiento de contexto, `/agents`, output estructurado, tool scoping, anti-patrones | 1 |

:::tip Práctica de examen (recurso comunitario, no oficial)
[claudecertificationguide.com](https://claudecertificationguide.com/) es un recurso **independiente y gratuito** (no afiliado a Anthropic) con diagnóstico, 30 lecciones, 240+ preguntas de práctica y un **mock exam completo**. Excelente para simular el examen — pero valida siempre los datos oficiales en Anthropic Academy antes de agendar.
:::

---

## 12-Week Study Plan

### Phase 1: Foundations (Weeks 1–4)

| Week | Focus | Practice Test |
|------|-------|--------------|
| W1 | Agentic Loops & Core API | Test 1 — Agentic Loops (10q) |
| W2 | Multi-Agent Orchestration | Test 2 — Multi-Agent Systems (10q) |
| W3 | Hooks, Workflows & Sessions | Test 3 — Hooks & Sessions (10q) |
| W4 | Tool Design & MCP | Test 4 — Tool Design & MCP (10q) |

### Phase 2: Applied Knowledge (Weeks 5–8)

| Week | Focus | Practice Test |
|------|-------|--------------|
| W5 | Claude Code Configuration | Test 5 — Claude Code Config (10q) |
| W6 | Plan Mode, Iteration & CI/CD | Test 6 — Plan Mode & CI/CD (10q) |
| W7 | Prompt Engineering & Structured Output | Test 7 — Prompt Engineering (10q) |
| W8 | Validation, Batch & Multi-Pass | Test 8 — Validation & Multi-Pass (10q) |

### Phase 3: Exam Prep (Weeks 9–12)

| Week | Focus | Practice Test |
|------|-------|--------------|
| W9 | Context Management | Test 9 — Context & Reliability (10q) |
| W10 | Advanced Context & Provenance | Test 10 — Advanced Context (10q) |
| W11 | Integration & Hands-On Exercises | Practice Exam 1 — Full (50q) |
| W12 | Final Exam Prep | Practice Exams 2 & 3 — Full (50q each) |

**Week 11 Hands-On Exercises:**
1. Multi-Tool Agent with Escalation Logic
2. Claude Code Team Workflow Configuration
3. Structured Data Extraction Pipeline
4. Multi-Agent Research Pipeline

---

## Key Anti-Patterns (High-Yield Exam Content)

These appear as distractors in ~60% of questions. If you can spot them, you eliminate 2–3 options immediately.

| Anti-Pattern | Why It's Wrong | Correct Approach |
|--------------|---------------|-----------------|
| Parse NL for loop termination | Brittle, non-deterministic | Check `stop_reason` value |
| Arbitrary iteration caps | Misses completion signal | Condition-based termination |
| Flat multi-agent architecture | No coordinator = no control | Hub-and-spoke pattern |
| Prompt-based enforcement | Probabilistic, bypassable | `PostToolUse` hooks |
| Self-review same session | Retains original reasoning | Separate session/subagent |
| Generic retry message | No context for correction | Append specific errors |
| Monolithic CLAUDE.md | Hard to maintain at scale | Hierarchical `@import` structure |
| All tools in one agent | Decision paralysis | 4–5 scoped tools max |

---

## Resources

| Resource | Link |
|----------|------|
| Official program (Pearson VUE) | [pearsonvue.com/anthropic](https://www.pearsonvue.com/us/en/anthropic.html) |
| Official cert page (CCA-F) | [Anthropic Academy — Claude Certified Architect – Foundations](https://anthropic.skilljar.com/claude-certified-architect-foundations-certification/444989) |
| Anthropic Academy — free courses | [anthropic.skilljar.com](https://anthropic.skilljar.com/) |
| Mock exam & study guide (community, unaffiliated) | [claudecertificationguide.com](https://claudecertificationguide.com/) |
| Prep & scheduling — Anthropic Partner Academy | [anthropic-partners.skilljar.com](https://anthropic-partners.skilljar.com/) |
| Anthropic Academy (learning) | [anthropic.com/learn](https://www.anthropic.com/learn) |
| Digital badges (Credly) | [credly.com](https://www.credly.com/) |
| Claude Docs — Agent SDK | [docs.anthropic.com/agents](https://docs.anthropic.com/en/docs/agents-and-tools/agents-overview) |
| Claude Docs — MCP | [docs.anthropic.com/mcp](https://docs.anthropic.com/en/docs/agents-and-tools/mcp) |
| Claude Docs — Tool Use | [docs.anthropic.com/tool-use](https://docs.anthropic.com/en/docs/tool-use/overview) |
| Anthropic GitHub | [github.com/anthropics](https://github.com/anthropics) |

:::note Source & currency
Program facts above are verified against Anthropic's official Pearson VUE program page, the Anthropic Academy cert page (Claude Certified Architect – Foundations) and Anthropic's Exam Guide v0.2 (30 jun 2026), checked 2026-07-22. Exam details can change — always confirm on the official pages before scheduling. The 12-week plan and practice-test counts on this page are a **study aid**, not official exam specifications.
:::

---

## Study Tips

:::tip Focus on the WHY
The exam tests **architectural reasoning**, not memorization. Know why hub-and-spoke beats flat multi-agent. Know why hooks beat prompts for enforcement. Know why multi-pass review requires session isolation.
:::

:::warning Anti-Patterns Are Traps
Exam distractors are often plausible anti-patterns. If an answer sounds like "just use a prompt for that" — it's probably wrong.
:::

:::info Build Real Projects
Hands-on experience with the Agent SDK, MCP servers, and Claude Code solidifies conceptual understanding faster than re-reading notes.
:::
