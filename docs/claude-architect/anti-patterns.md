---
id: anti-patterns
title: Key Anti-Patterns
sidebar_label: ⚠️ Key Anti-Patterns
sidebar_position: 5
---

# ⚠️ Key Anti-Patterns (High-Yield Exam Content)

> 🌐 **Language:** English · [Versión en Español](./es/anti-patterns)

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

---

➡️ Next: **[🔗 Resources & Sources](./resources)**.
