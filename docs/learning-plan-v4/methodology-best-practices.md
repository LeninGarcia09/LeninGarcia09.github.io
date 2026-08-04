---
sidebar_position: 3
title: "Methodology and Best Practices v4"
---

# Methodology and Best Practices (v4)

:::info[What this page is for]
Explains **why** the v4 plan is designed the way it is: why "proof over study," why every certification is coupled to a project, and how progress is measured. It is built on public frameworks and evidence (WEF 2025, CCL 70-20-10, learning science, and Google/AWS/IBM reference programs). Verify every source in [Sources and Verification](./sources-and-verification).
:::

The v4 plan does not form "someone who knows AI": it forms **an engineer who can take AI systems to production and prove it**. That difference defines the entire methodology.

---

## Guiding principle: proof-over-study

For junior profiles, a certificate is enough of a signal. In AI architecture/engineering, the market no longer buys "I took the course": it buys **"I built, evaluated, and operated this in production."** That is why v4 inverts the traditional hierarchy:

| Traditional approach | v4 approach |
|---------------------|-----------|
| Study → exam → certificate | Problem → working system → evidence → certificate as validation |
| The certificate is the goal | The **evaluable portfolio** is the goal; the certificate supports it |
| "I know the theory" | "Here is the repo, the eval, and the metrics" |

This aligns with the reason Microsoft created **Applied Skills** (scenario-based real-world assessment) alongside certifications: the market values demonstration, not only memorization.

---

## 70-20-10 framework applied to AI engineering

The [70-20-10](https://www.ccl.org/articles/leading-effectively-articles/70-20-10-rule/) model (CCL) holds that effective professional development comes ~70% from practical experience, ~20% from social learning, and ~10% from structured training. In v4 it translates like this:

- **70% — Building (experience).** Every phase produces a production artifact: RAG pipeline with evaluation, multi-tool agent, deployed architecture, security controls. This is the core of the plan, not an extra.
- **20% — Community and review (social).** This is the highest leverage and most neglected area: code/architecture review with peers, participation in technical communities (Microsoft Tech Community, GitHub, AI Discords), requesting *design review* of your architectures, and writing public *post-mortems*. **This 20% turns a portfolio into reputation.**
- **10% — Formal training.** Certifications (AI-103, AZ-305, SC-500, GH-300, AI-200) and courses. Necessary for signaling and structure, but **not sufficient** on their own.

:::tip[The most common mistake in technical profiles]
Over-investing in the 10% (accumulating courses and certificates) and neglecting the 20% (community, peer review, visibility). An engineer with 3 certificates and zero public technical presence competes worse than one with 1 certificate, an excellent repo, and a network that knows their work. **Deliberately protect the 20%.**
:::

---

## Alignment with market demand (WEF Future of Jobs 2025)

The World Economic Forum's [Future of Jobs Report 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/) reports that **86% of employers expect AI to transform their business by 2030** and that **~39% of core skills will change**. For an AI architecture/engineering role, this translates into four skill clusters that v4 explicitly develops:

| Skill cluster (WEF 2025) | How v4 builds it |
|---------------------------------|----------------------|
| Analytical thinking and complex problem solving | Design of RAG/agentic systems with explicit trade-offs |
| Technology literacy / AI and big data | AI-103, Azure AI Foundry, SDK-based evaluation |
| Resilience, adaptability, and continuous learning | Continuous update rule for the plan; certification re-verification |
| Design and user experience / systems thinking | Well-Architected architecture + security (SC-500, NIST, OWASP LLM) |

The differentiating skill in 2025+ is not "using an LLM" — that is becoming commoditized — but **designing, evaluating, and operating reliable and secure AI systems**. That is exactly the axis of v4.

---

## Learning science: how to study so it sticks

Formal training (the 10%) yields much more if studied with validated techniques. The review by [Dunlosky et al. (2013)](https://journals.sagepub.com/doi/10.1177/1529100612453266) identifies two **high-efficacy** techniques:

1. **Retrieval practice (active recall).** Do not reread the documentation: close it and reconstruct from memory how a RAG pipeline or agent flow works. The difficulty of retrieval is what consolidates learning.
2. **Spaced practice.** Distribute review over time instead of cramming. Review AI-103 *skills measured* in sessions separated by days, not in a marathon.

Concrete application in v4:
- Use the **free official practice assessments** from Microsoft Learn as retrieval, not as a final exam only.
- **Teach what you learn** (write a technical post, explain your architecture in a README): the *protégé effect* is one of the most powerful forms of retrieval.
- Turn every project into a **reproducible eval**: measuring is retrieval under real conditions.

---

## DNA of best-in-class training programs

Market reference programs — [Google Career Certificates](https://grow.google/certificates/), [AWS re/Start](https://aws.amazon.com/training/restart/), [IBM SkillsBuild](https://skillsbuild.org/) — share five traits. v4 incorporates them:

| Best-in-class trait | Implementation in v4 |
|---------------------|----------------------|
| Project-based learning | Every phase delivers a production artifact, not a quiz |
| Capstone / portfolio | Integrated final system + versioned evidence in a repo |
| Stackable credentials | GH-300 → AI-103 → AZ-305 → SC-500, in deliberate sequence |
| Employer / real-world connection | Production scenarios, not toy exercises; public visibility |
| Mentorship and cohort | The social 20%: peer review and technical community |

---

## Measurement layer: OKRs by phase

Without metrics, a learning plan is a wish list. Define OKRs by phase:

- **Objective (qualitative):** e.g., "Be able to design and evaluate a production-level RAG system."
- **Key Results (measurable):**
  - KR1: RAG pipeline deployed with automated eval and ≥ X on the defined quality metric.
  - KR2: AI-103 passed (or *practice assessment* ≥ 80% if the exam is still in beta).
  - KR3: 1 *design review* received from a peer and improvements incorporated.

Review OKRs at every *checkpoint* in the plan. If a KR did not move, the issue is execution or plan design — both actionable.

---

## Capstone rubric: "hiring-ready," not "course-complete"

The final artifact must pass the technical recruiter test. A v4 capstone is **ready** when:

- [ ] **Public repository** with clear README: problem, architecture (diagram), decisions, and trade-offs.
- [ ] **Reproducible evaluation** — not "works on my machine," but metrics and an eval script another person can run.
- [ ] Explicit **security and governance considerations** (aligned to NIST AI RMF / OWASP LLM Top 10 / EU AI Act as applicable).
- [ ] **Cost and operations** documented: what it costs to run and how it is monitored.
- [ ] **Business narrative** — what problem it solves and for whom, not only what technology it uses.
- [ ] **Supporting credential** (AI-103 / AZ-305 / SC-500 / GH-300 depending on the phase).

:::tip[The definitive test]
If a senior engineer can clone your repo, run your eval, and understand your decisions in 15 minutes, you have a portfolio. If you only have a certificate and a slide, you have a promise. **v4 optimizes for the first.**
:::

---

## How to keep this plan reliable over time

1. **Re-verify certifications every quarter** — the Microsoft AI portfolio rotates quickly in 2026 (see [Sources and Verification](./sources-and-verification)).
2. **Prioritize GA content over beta** for critical items; use beta only with the guardrail of "confirm availability."
3. **Update product links** when Microsoft renames services (e.g., Azure AI Studio → Azure AI Foundry).
4. **Treat market data as directional** and re-check it at the source before making decisions.
