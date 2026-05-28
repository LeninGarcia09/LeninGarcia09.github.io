---
id: overview
title: Agentic Reliability — From Prototype to Production
sidebar_label: Track Overview
slug: /agentic-reliability/overview
---

# Agentic Reliability: From Prototype to Production

> **Inspired by:** [The LLM as Analyst Trap](https://appliedingenuity.substack.com/p/the-llm-as-analyst-trap-a-technical) — a deep technical investigation into why the "Simple Agentic" pattern is a liability in production.

The "Simple Agentic" pattern — give an LLM tools to fetch data, let it analyze and report — is **remarkably easy to demo and catastrophically risky to ship**. This track takes you through the exact failure modes that appear in real enterprise deployments, and teaches you to engineer around them.

---

## The 5 Failure Modes This Track Covers

| Failure Mode | What Happens | Business Consequence |
|-------------|-------------|---------------------|
| **Helpfulness Paradox** | LLM bypasses tool errors and fabricates plausible data | System fails silently — "fails by lying" |
| **Scope Bypass** | LLM ignores system prompt guardrails when queries are rephrased | Unsanctioned financial/strategic advice |
| **Math & Transcription Gap** | Correct DB data → wrong number in final output | Board-level report contains silent errors |
| **Intelligence Degradation** | 45.5% accuracy drop past 40–50% context fill | Answers degrade invisibly as conversation grows |
| **Temporal & Semantic Drift** | Wrong dates, stale group definitions (FB vs META) | Business rules delegated to outdated model weights |

---

## Architecture Pattern: Simple Agentic vs Verifiable Orchestrator

```
SIMPLE AGENTIC (The Trap)
─────────────────────────
User → LLM [planner + processor + UI]
         ↓ decides tool calls
         ↓ receives raw data
         ↓ performs calculations
         ↓ formats output
         → User sees polished answer ← NO AUDIT TRAIL

VERIFIABLE ORCHESTRATOR (The Fix)
──────────────────────────────────
User → LLM [intent only: "what does the user want?"]
         ↓ structured parameters only (no raw data)
         → Deterministic code [computation, calculation, formatting]
         → Audit log [source_ref for every output value]
         → User sees verified answer ← FULLY TRACEABLE
```

---

## Challenges in This Track

| # | Challenge | Scenario | Key Skill |
|---|-----------|----------|-----------|
| [01](./01-hallucination-audit/challenge-01) | The Hallucination Audit | Financial analyst agent gives wrong board report numbers | Error guardrails, PostToolUse hooks, deterministic validation |
| [02](./02-context-rot/challenge-02) | Context Rot at Scale | Clinical decision agent degrades after 3–4 turns | Context budgeting, summarization, scratchpad patterns |
| [03](./03-verifiable-orchestrator/challenge-03) | The Verifiable Orchestrator | Regulator demands audit trail for every AI-generated figure | Orchestrator pattern, source tracing, deterministic output |
| [04](./04-semantic-control/challenge-04) | Semantic Control & Business Rules | Agent uses stale "Magnificent Seven" from 2023 training data | Temporal grounding, externalized business rules, scope hooks |

---

## Who This Is For

- **AI Solution Architects** moving a prototype to production
- **Engineering leads** evaluating agentic frameworks for enterprise use
- **Anyone** who has seen an AI agent demo perfectly and fail in production

---

## Reference

All challenges reference the original research:
- 📄 [The LLM as Analyst Trap — Applied Ingenuity](https://appliedingenuity.substack.com/p/the-llm-as-analyst-trap-a-technical)
- 📄 [The Verifiable Orchestrator — Applied Ingenuity](https://appliedingenuity.substack.com/p/the-verifiable-orchestrator-a-new)
- 📄 [Intelligence Degradation in Long-Context LLMs — arXiv:2601.15300](https://arxiv.org/abs/2601.15300)
- 📄 [Context Length Alone Hurts LLM Performance — arXiv:2510.05381](https://arxiv.org/abs/2510.05381)
