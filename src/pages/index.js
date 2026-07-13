import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

const skillTracks = [
  {
    emoji: "🤖",
    title: "Azure AI Foundry + Hosted Agents",
    type: "Skill Track",
    desc: "Production-grade labs: data residency, agent hallucinations, multi-agent security, and enterprise-scale AI orchestration.",
    link: "/docs/azure-ai-foundry/overview",
    challenges: 5,
    tags: ["Foundry", "Agents", "Enterprise", "Multi-Agent"],
    accent: "linear-gradient(90deg, #003087, #0078d4)",
  },
  {
    emoji: "⚖️",
    title: "Responsible AI & Governance",
    type: "Skill Track",
    desc: "RAI Standard v2, Purview AI Hub, Azure AI Content Safety, PyRIT red teaming, EU AI Act & NIST RMF compliance.",
    link: "/docs/responsible-ai/overview",
    challenges: 3,
    tags: ["Governance", "Compliance", "EU AI Act", "Red Teaming"],
    accent: "linear-gradient(90deg, #0f4c0f, #107c10)",
  },
  {
    emoji: "🔬",
    title: "Agentic Reliability",
    type: "Skill Track",
    desc: "The 5 failure modes that kill AI agents in production. Build defenses against hallucination, context rot, math gaps, intelligence degradation, and semantic drift.",
    link: "/docs/agentic-reliability/overview",
    challenges: 4,
    tags: ["Production", "Hallucination", "TRACE", "FINRA"],
    accent: "linear-gradient(90deg, #3d1a5c, #7b2fbf)",
    challengePreview: [
      { num: "01", title: "The Hallucination Audit", link: "/docs/agentic-reliability/hallucination-audit/challenge-01", scenario: "Financial analyst agent fabricates board report figures" },
      { num: "02", title: "Context Rot at Scale", link: "/docs/agentic-reliability/context-rot/challenge-02", scenario: "Clinical decision agent degrades after 3 turns" },
      { num: "03", title: "The Verifiable Orchestrator", link: "/docs/agentic-reliability/verifiable-orchestrator/challenge-03", scenario: "Regulator demands audit trail for every AI figure" },
      { num: "04", title: "Semantic Control", link: "/docs/agentic-reliability/semantic-control/challenge-04", scenario: "Agent uses stale 2023 index composition" },
    ],
  },
];

const certTracks = [
  { emoji: "🧠", code: "AI-102", name: "Azure AI Engineer", level: "Associate", link: "/docs/ai-102/overview" },
  { emoji: "🏗️", code: "AZ-305", name: "Solutions Architect Expert", level: "Expert", link: "/docs/az-305/overview" },
  { emoji: "🛡️", code: "SC-500", name: "Cloud & AI Security", level: "Associate", link: "/docs/sc-500/overview" },
  { emoji: "🔧", code: "AZ-104", name: "Azure Administrator", level: "Associate", link: "/docs/az-104/overview" },
  { emoji: "🌐", code: "AZ-700", name: "Network Engineer", level: "Associate", link: "/docs/az-700/overview" },
  { emoji: "🟠", code: "Claude", name: "Claude Certified Architect – Foundations", level: "Foundations", link: "/docs/claude-architect/overview" },
];

const resources = [
  { emoji: "🛠️", title: "Tools", desc: "64+ tools for AI architects — observability, evaluation, deterministic computation, red teaming", link: "/docs/resources/tools" },
  { emoji: "📰", title: "Articles", desc: "Curated reads: TRACE pattern, academic papers, Azure WAF AI, hallucination benchmarks", link: "/docs/resources/articles" },
  { emoji: "📚", title: "Learning", desc: "MS Learn paths, Anthropic Academy, courses, repos, and YouTube channels", link: "/docs/resources/learning" },
];

const levelClass = {
  "Associate": styles.certLevelAssociate,
  "Expert": styles.certLevelExpert,
  "Foundations": styles.certLevelFoundations,
};

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="hero hero--primary" style={{ textAlign: "center", padding: "3.5rem 1rem" }}>
        <div className="container">
          <h1 className="hero__title" style={{ fontSize: "2.4rem", marginBottom: "0.75rem" }}>
            {siteConfig.title}
          </h1>
          <p className="hero__subtitle" style={{ fontSize: "1.1rem", maxWidth: "680px", margin: "0 auto", opacity: 0.9 }}>
            {siteConfig.tagline}
          </p>

          {/* Stats strip */}
          <div className={styles.statStrip}>
            {[
              { n: "12", l: "Challenges" },
              { n: "6", l: "Certifications" },
              { n: "64+", l: "Tools" },
              { n: "3", l: "Skill Tracks" },
            ].map((s) => (
              <div key={s.l} className={styles.stat}>
                <span className={styles.statNumber}>{s.n}</span>
                <span className={styles.statLabel}>{s.l}</span>
              </div>
            ))}
          </div>

          <div className={styles.heroCta}>
            <Link className="button button--secondary button--lg" to="/docs/agentic-reliability/overview">
              🔬 Start with Agentic Reliability
            </Link>
            <Link className="button button--outline button--secondary button--lg" to="/docs/azure-ai-foundry/overview">
              🤖 Azure AI Foundry Track
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="container" style={{ padding: "0 0 4rem" }}>

          {/* ── New Learning Plan v4 ───────────────────────────── */}
          <div className={styles.sectionHeader} style={{ marginTop: "2rem" }}>
            <span className={styles.sectionLabel}>New</span>
            <h2 className={styles.sectionTitle}>Learning Plan v4</h2>
          </div>
          <p style={{ marginTop: "-1rem", marginBottom: "1.5rem", color: "var(--ifm-color-emphasis-700)", maxWidth: "720px" }}>
            Follow the new 26-week execution model with weekly tracking, checkpoint gates, and evidence-first progress.
          </p>
          <div className={styles.heroCta} style={{ justifyContent: "flex-start", marginBottom: "2rem" }}>
            <Link className="button button--primary button--lg" to="/docs/learning-plan/overview">
              🗺️ Open Learning Plan v4
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/learning-plan/weekly-tracker">
              📊 Weekly Tracker
            </Link>
            <Link className="button button--outline button--secondary button--lg" to="/docs/learning-plan/checkpoints">
              ✅ Checkpoint Gates
            </Link>
          </div>

          {/* ── Jump to a Challenge ─────────────────────────────── */}
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Quick Access</span>
            <h2 className={styles.sectionTitle}>Jump to a Challenge</h2>
          </div>
          <div className={styles.challengeJumpGrid}>
            {[
              { num: "01", title: "The Hallucination Audit", scenario: "Financial analyst agent fabricates board report figures — PostToolUse hooks, structured error contracts", track: "Agentic Reliability", link: "/docs/agentic-reliability/hallucination-audit/challenge-01" },
              { num: "02", title: "Context Rot at Scale", scenario: "Clinical decision agent loses accuracy after 3 turns — context budgeting, scratchpad patterns", track: "Agentic Reliability", link: "/docs/agentic-reliability/context-rot/challenge-02" },
              { num: "03", title: "The Verifiable Orchestrator", scenario: "Regulator demands audit trail for every AI-generated figure — TRACE pattern, DuckDB, FINRA", track: "Agentic Reliability", link: "/docs/agentic-reliability/verifiable-orchestrator/challenge-03" },
              { num: "04", title: "Semantic Control & Business Rules", scenario: "Agent uses stale 2023 index composition — MCP concept registry, temporal grounding", track: "Agentic Reliability", link: "/docs/agentic-reliability/semantic-control/challenge-04" },
              { num: "01", title: "Patient Data Never Leaves the VNet", scenario: "Deploy an AI agent inside a hospital VNet — private endpoints, HIPAA, data residency", track: "Azure AI Foundry", link: "/docs/azure-ai-foundry/platform/challenge-01" },
              { num: "02", title: "Agent Hallucinating 20% of the Time", scenario: "Production agent hallucination rate spiking — guardrails, evaluation, monitoring", track: "Azure AI Foundry", link: "/docs/azure-ai-foundry/platform/challenge-02" },
              { num: "01", title: "EU AI Inventory in 30 Days", scenario: "EU regulator demands full AI system inventory — Purview AI Hub, classification", track: "Responsible AI", link: "/docs/responsible-ai/rai-standard/challenge-01" },
              { num: "02", title: "Shadow AI Detection", scenario: "Discover unsanctioned AI usage across the org — Purview AI Hub governance", track: "Responsible AI", link: "/docs/responsible-ai/purview-ai-hub/challenge-02" },
            ].map((c, i) => (
              <Link key={i} to={c.link} className={styles.challengeJumpCard}>
                <div className={styles.challengeJumpNum}>{c.num}</div>
                <div className={styles.challengeJumpBody}>
                  <p className={styles.challengeJumpTitle}>{c.title}</p>
                  <p className={styles.challengeJumpScenario}>{c.scenario}</p>
                  <p className={styles.challengeJumpTrack}>📂 {c.track}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className={styles.divider} />

          {/* ── Skill Tracks ─────────────────────────────────────── */}
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Skill Tracks</span>
            <h2 className={styles.sectionTitle}>Enterprise AI Architecture</h2>
          </div>
          <p style={{ marginTop: "-1rem", marginBottom: "2rem", color: "var(--ifm-color-emphasis-700)", maxWidth: "680px" }}>
            Every track is built from real customer problems — not lab exercises or exam memorization.
            Actual production architecture decisions with code, break-and-fix exercises, and knowledge checks.
          </p>

          <div className={styles.trackGrid}>
            {skillTracks.map((t, i) => (
              <div key={i} className={styles.trackCard}>
                {/* Accent bar — NOT a link so inner links work */}
                <div className={styles.trackCardAccent} style={{ background: t.accent }} />
                <div className={styles.trackCardBody}>
                  <div className={styles.trackCardTop}>
                    <span className={styles.trackEmoji}>{t.emoji}</span>
                    <span className={styles.trackTypeBadge}>{t.type}</span>
                  </div>
                  <h3 className={styles.trackTitle}>{t.title}</h3>
                  <p className={styles.trackDesc}>{t.desc}</p>
                  <div className={styles.trackTags}>
                    {t.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
                  </div>
                  <div className={styles.trackCta}>
                    <span className={styles.challengeCount}>🏆 {t.challenges} challenges</span>
                    <Link className="button button--sm button--primary" to={t.link}>
                      Explore Track →
                    </Link>
                  </div>
                </div>

                {/* Challenge preview (Agentic Reliability only) */}
                {t.challengePreview && (
                  <div className={styles.challengePreview}>
                    <p className={styles.challengePreviewLabel}>Challenges in this track</p>
                    <div className={styles.challengeMiniGrid}>
                      {t.challengePreview.map((c) => (
                        <Link key={c.num} to={c.link} className={styles.challengeMiniCard}>
                          <div className={styles.challengeNum}>{c.num}</div>
                          <div>
                            <p className={styles.challengeMiniTitle}>{c.title}</p>
                            <p className={styles.challengeMiniScenario}>{c.scenario}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.divider} />

          {/* ── Certification Prep ──────────────────────────────── */}
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Certifications</span>
            <h2 className={styles.sectionTitle}>Certification Prep</h2>
          </div>
          <div className={styles.certGrid}>
            {certTracks.map((c, i) => (
              <Link key={i} to={c.link} className={styles.certCard}>
                <span className={styles.certEmoji}>{c.emoji}</span>
                <span className={styles.certCode}>{c.code}</span>
                <p className={styles.certName}>{c.name}</p>
                <span className={`${styles.certLevel} ${levelClass[c.level]}`}>{c.level}</span>
              </Link>
            ))}
          </div>

          <div className={styles.divider} />

          {/* ── Resources ───────────────────────────────────────── */}
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Reference</span>
            <h2 className={styles.sectionTitle}>Tools & Resources</h2>
          </div>
          <div className={styles.resourceGrid}>
            {resources.map((r, i) => (
              <Link key={i} to={r.link} className={styles.resourceCard}>
                <span className={styles.resourceEmoji}>{r.emoji}</span>
                <p className={styles.resourceTitle}>{r.title}</p>
                <p className={styles.resourceDesc}>{r.desc}</p>
              </Link>
            ))}
          </div>

          {/* ── Contact ─────────────────────────────────────────── */}
          <div className={styles.contactSection}>
            <h2 style={{ margin: "0 0 0.5rem" }}>Feedback & Contact</h2>
            <p style={{ fontSize: "0.95rem", color: "var(--ifm-color-emphasis-700)", maxWidth: "560px", margin: "0 auto" }}>
              Found a bug, have a scenario suggestion, or want to discuss a challenge?
              Reach out or open a GitHub issue.
            </p>
            <div className={styles.contactButtons}>
              <a className="button button--primary" href="mailto:lesalgad@microsoft.com">✉️ lesalgad@microsoft.com</a>
              <a className="button button--secondary" href="mailto:garcia.lenin@outlook.com">✉️ garcia.lenin@outlook.com</a>
              <Link className="button button--outline button--secondary" to="https://github.com/LeninGarcia09/LeninGarcia09.github.io/issues">Open a GitHub Issue</Link>
            </div>
          </div>

        </div>
      </main>
    </Layout>
  );
}
