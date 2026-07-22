---
id: domains
title: The 5 Exam Domains
sidebar_label: 📚 The 5 Domains
sidebar_position: 2
---

# 📚 The 5 Exam Domains

> 🌐 **Language:** English · [Versión en Español](./es/domains)
>
> Per-domain breakdown: key concepts, anti-patterns, and official Anthropic resources. Weights (%) are on the [Exam Overview](./overview#the-5-exam-domains).

## Domain 1 — Agentic Architecture & Orchestration (~25%)

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
- 🎓 [Anthropic Academy — *Introduction to Subagents* (free course)](https://anthropic.skilljar.com/introduction-to-subagents) — context isolation, `/agents`, structured output, tool limits, anti-patterns

---

## Domain 2 — Tool Design & MCP Integration (~20%)

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
- 🎓 [Anthropic Academy — *Introduction to Model Context Protocol* (free course)](https://anthropic.skilljar.com/introduction-to-model-context-protocol) — MCP fundamentals: servers, tools, transports
- 🎓 [Anthropic Academy — *Model Context Protocol: Advanced Topics* (free course)](https://anthropic.skilljar.com/model-context-protocol-advanced-topics) — auth, remote servers, error handling, scale

---

## Domain 3 — Claude Code Configuration & Workflows (~20%)

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

## Domain 4 — Prompt Engineering & Structured Output (~20%)

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
- 🎓 [Anthropic Academy — *Claude with the Anthropic API* (free course)](https://anthropic.skilljar.com/claude-with-the-anthropic-api) — auth, prompt engineering, structured output, RAG & agents

---

## Domain 5 — Context Management & Reliability (~15%)

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

➡️ Next: **[🎓 Courses + Mock Exam](./courses)** — put each domain into practice with the free official courses.
