---
id: overview
title: Claude Certified Architect – Foundations
sidebar_label: Exam Overview
slug: /claude-architect/overview
---

# Claude Certified Architect – Foundations

> **Vendor:** Anthropic · **Level:** Foundations · **Format:** Multiple choice (scenario-based)  
> **Study Plan:** 12 weeks · ~1 hour/day · 84 hours total · 13 practice tests

This certification validates your ability to **design, build, and operate production-grade agentic AI systems** using Claude. Unlike generic AI certs, it tests architectural reasoning — *why* certain patterns beat others, not just *what* they are.

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
| Official Exam Page | [claudecertifications.com](https://claudecertifications.com/claude-certified-architect/) |
| Study Guide (12-week) | [Study Plan](https://claudecertifications.com/claude-certified-architect/study-guide) |
| Anthropic Academy (Skilljar) | [academy.anthropic.com](https://academy.anthropic.com) |
| Claude Docs — Agent SDK | [docs.anthropic.com/agents](https://docs.anthropic.com/en/docs/agents-and-tools/agents-overview) |
| Claude Docs — MCP | [docs.anthropic.com/mcp](https://docs.anthropic.com/en/docs/agents-and-tools/mcp) |
| Claude Docs — Tool Use | [docs.anthropic.com/tool-use](https://docs.anthropic.com/en/docs/tool-use/overview) |
| Anthropic GitHub | [github.com/anthropics](https://github.com/anthropics) |

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
