import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Translate, {translate} from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

const skillTracks = [
  {
    emoji: "🤖",
    title: translate({ id: "homepage.skill.azureAiFoundry.title", message: "Azure AI Foundry + Hosted Agents" }),
    type: translate({ id: "homepage.skill.type", message: "Skill Track" }),
    desc: translate({ id: "homepage.skill.azureAiFoundry.desc", message: "Production-grade labs: data residency, agent hallucinations, multi-agent security, and enterprise-scale AI orchestration." }),
    link: "/docs/azure-ai-foundry/overview",
    challenges: 5,
    tags: [
      translate({ id: "homepage.tag.foundry", message: "Foundry" }),
      translate({ id: "homepage.tag.agents", message: "Agents" }),
      translate({ id: "homepage.tag.enterprise", message: "Enterprise" }),
      translate({ id: "homepage.tag.multiAgent", message: "Multi-Agent" }),
    ],
    accent: "linear-gradient(90deg, #003087, #0078d4)",
  },
  {
    emoji: "⚖️",
    title: translate({ id: "homepage.skill.responsibleAi.title", message: "Responsible AI & Governance" }),
    type: translate({ id: "homepage.skill.type", message: "Skill Track" }),
    desc: translate({ id: "homepage.skill.responsibleAi.desc", message: "RAI Standard v2, Purview AI Hub, Azure AI Content Safety, PyRIT red teaming, EU AI Act & NIST RMF compliance." }),
    link: "/docs/responsible-ai/overview",
    challenges: 3,
    tags: [
      translate({ id: "homepage.tag.governance", message: "Governance" }),
      translate({ id: "homepage.tag.compliance", message: "Compliance" }),
      translate({ id: "homepage.tag.euAiAct", message: "EU AI Act" }),
      translate({ id: "homepage.tag.redTeaming", message: "Red Teaming" }),
    ],
    accent: "linear-gradient(90deg, #0f4c0f, #107c10)",
  },
  {
    emoji: "🔬",
    title: translate({ id: "homepage.skill.agenticReliability.title", message: "Agentic Reliability" }),
    type: translate({ id: "homepage.skill.type", message: "Skill Track" }),
    desc: translate({ id: "homepage.skill.agenticReliability.desc", message: "The 5 failure modes that kill AI agents in production. Build defenses against hallucination, context rot, math gaps, intelligence degradation, and semantic drift." }),
    link: "/docs/agentic-reliability/overview",
    challenges: 4,
    tags: [
      translate({ id: "homepage.tag.production", message: "Production" }),
      translate({ id: "homepage.tag.hallucination", message: "Hallucination" }),
      translate({ id: "homepage.tag.trace", message: "TRACE" }),
      translate({ id: "homepage.tag.finra", message: "FINRA" }),
    ],
    accent: "linear-gradient(90deg, #3d1a5c, #7b2fbf)",
    challengePreview: [
      { num: "01", title: translate({ id: "homepage.challenge.hallucinationAudit.title", message: "The Hallucination Audit" }), link: "/docs/agentic-reliability/hallucination-audit/challenge-01", scenario: translate({ id: "homepage.challenge.hallucinationAudit.previewScenario", message: "Financial analyst agent fabricates board report figures" }) },
      { num: "02", title: translate({ id: "homepage.challenge.contextRot.title", message: "Context Rot at Scale" }), link: "/docs/agentic-reliability/context-rot/challenge-02", scenario: translate({ id: "homepage.challenge.contextRot.previewScenario", message: "Clinical decision agent degrades after 3 turns" }) },
      { num: "03", title: translate({ id: "homepage.challenge.verifiableOrchestrator.title", message: "The Verifiable Orchestrator" }), link: "/docs/agentic-reliability/verifiable-orchestrator/challenge-03", scenario: translate({ id: "homepage.challenge.verifiableOrchestrator.previewScenario", message: "Regulator demands audit trail for every AI figure" }) },
      { num: "04", title: translate({ id: "homepage.challenge.semanticControl.title", message: "Semantic Control" }), link: "/docs/agentic-reliability/semantic-control/challenge-04", scenario: translate({ id: "homepage.challenge.semanticControl.previewScenario", message: "Agent uses stale 2023 index composition" }) },
    ],
  },
];

const certTracks = [
  { emoji: "🧠", code: "AI-102 → AI-103", name: translate({ id: "homepage.cert.azureAiApps.name", message: "Azure AI Apps & Agents Developer" }), level: "Associate", levelLabel: translate({ id: "homepage.cert.level.associate", message: "Associate" }), link: "/docs/ai-102/overview" },
  { emoji: "🏗️", code: "AZ-305", name: translate({ id: "homepage.cert.solutionsArchitect.name", message: "Solutions Architect Expert" }), level: "Expert", levelLabel: translate({ id: "homepage.cert.level.expert", message: "Expert" }), link: "/docs/az-305/overview" },
  { emoji: "🛡️", code: "SC-500", name: translate({ id: "homepage.cert.cloudAiSecurity.name", message: "Cloud & AI Security" }), level: "Associate", levelLabel: translate({ id: "homepage.cert.level.associate", message: "Associate" }), link: "/docs/sc-500/overview" },
  { emoji: "🔧", code: "AZ-104", name: translate({ id: "homepage.cert.azureAdministrator.name", message: "Azure Administrator" }), level: "Associate", levelLabel: translate({ id: "homepage.cert.level.associate", message: "Associate" }), link: "/docs/az-104/overview" },
  { emoji: "🌐", code: "AZ-700", name: translate({ id: "homepage.cert.networkEngineer.name", message: "Network Engineer" }), level: "Associate", levelLabel: translate({ id: "homepage.cert.level.associate", message: "Associate" }), link: "/docs/az-700/overview" },
  { emoji: "🟠", code: "Claude", name: translate({ id: "homepage.cert.claudeArchitect.name", message: "Claude Certified Architect – Foundations" }), level: "Foundations", levelLabel: translate({ id: "homepage.cert.level.foundations", message: "Foundations" }), link: "/docs/claude-architect/overview" },
];

const resources = [
  { emoji: "🛠️", title: translate({ id: "homepage.resource.tools.title", message: "Tools" }), desc: translate({ id: "homepage.resource.tools.desc", message: "64+ tools for AI architects — observability, evaluation, deterministic computation, red teaming" }), link: "/docs/resources/tools" },
  { emoji: "📰", title: translate({ id: "homepage.resource.articles.title", message: "Articles" }), desc: translate({ id: "homepage.resource.articles.desc", message: "Curated reads: TRACE pattern, academic papers, Azure WAF AI, hallucination benchmarks" }), link: "/docs/resources/articles" },
  { emoji: "📚", title: translate({ id: "homepage.resource.learning.title", message: "Learning" }), desc: translate({ id: "homepage.resource.learning.desc", message: "MS Learn paths, Anthropic Academy, courses, repos, and YouTube channels" }), link: "/docs/resources/learning" },
];

const levelClass = {
  "Associate": styles.certLevelAssociate,
  "Expert": styles.certLevelExpert,
  "Foundations": styles.certLevelFoundations,
};

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={translate({ id: "homepage.layout.title", message: "Home" })} description={siteConfig.tagline}>

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
              { n: "12", l: translate({ id: "homepage.stats.challenges", message: "Challenges" }) },
              { n: "6", l: translate({ id: "homepage.stats.certifications", message: "Certifications" }) },
              { n: "64+", l: translate({ id: "homepage.stats.tools", message: "Tools" }) },
              { n: "3", l: translate({ id: "homepage.stats.skillTracks", message: "Skill Tracks" }) },
            ].map((s) => (
              <div key={s.l} className={styles.stat}>
                <span className={styles.statNumber}>{s.n}</span>
                <span className={styles.statLabel}>{s.l}</span>
              </div>
            ))}
          </div>

          <div className={styles.heroCta}>
            <Link className="button button--secondary button--lg" to="/docs/agentic-reliability/overview">
              <Translate id="homepage.cta.agenticReliability">🔬 Start with Agentic Reliability</Translate>
            </Link>
            <Link className="button button--outline button--secondary button--lg" to="/docs/azure-ai-foundry/overview">
              <Translate id="homepage.cta.azureAiFoundry">🤖 Azure AI Foundry Track</Translate>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="container" style={{ padding: "0 0 4rem" }}>

          {/* ── Career Plans ────────────────────────────────────── */}
          <div className={styles.sectionHeader} style={{ marginTop: "2rem" }}>
            <span className={styles.sectionLabel}><Translate id="homepage.career.label">Career Roadmaps</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="homepage.career.title">Two Development Plans</Translate></h2>
          </div>
          <p style={{ marginTop: "-1rem", marginBottom: "1.5rem", color: "var(--ifm-color-emphasis-700)", maxWidth: "720px" }}>
            <Translate id="homepage.career.description">Choose the roadmap that fits your pace: the original 36-week plan or the execution-focused v4 26-week model.</Translate>
          </p>
          <div className={styles.heroCta} style={{ justifyContent: "flex-start", marginBottom: "2rem" }}>
            <Link className="button button--primary button--lg" to="/docs/learning-plan/overview">
              <Translate id="homepage.career.aiSecurityProfessional">🛡️ Open AI Security Professional (9 meses)</Translate>
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/learning-plan-v4/overview">
              <Translate id="homepage.career.learningPlanV4">🧭 Open Learning Plan v4 (26 semanas)</Translate>
            </Link>
            <Link className="button button--outline button--secondary button--lg" to="/docs/learning-plan-v4/weekly-tracker">
              <Translate id="homepage.career.weeklyTracker">📊 Weekly Tracker</Translate>
            </Link>
            <Link className="button button--outline button--secondary button--lg" to="/docs/learning-plan-v4/checkpoints">
              <Translate id="homepage.career.checkpointGates">✅ Checkpoint Gates</Translate>
            </Link>
          </div>

          {/* ── Jump to a Challenge ─────────────────────────────── */}
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}><Translate id="homepage.quickAccess.label">Quick Access</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="homepage.quickAccess.title">Jump to a Challenge</Translate></h2>
          </div>
          <div className={styles.challengeJumpGrid}>
            {[
              { num: "01", title: translate({ id: "homepage.challenge.hallucinationAudit.title", message: "The Hallucination Audit" }), scenario: translate({ id: "homepage.challenge.hallucinationAudit.scenario", message: "Financial analyst agent fabricates board report figures — PostToolUse hooks, structured error contracts" }), track: translate({ id: "homepage.track.agenticReliability", message: "Agentic Reliability" }), link: "/docs/agentic-reliability/hallucination-audit/challenge-01" },
              { num: "02", title: translate({ id: "homepage.challenge.contextRot.title", message: "Context Rot at Scale" }), scenario: translate({ id: "homepage.challenge.contextRot.scenario", message: "Clinical decision agent loses accuracy after 3 turns — context budgeting, scratchpad patterns" }), track: translate({ id: "homepage.track.agenticReliability", message: "Agentic Reliability" }), link: "/docs/agentic-reliability/context-rot/challenge-02" },
              { num: "03", title: translate({ id: "homepage.challenge.verifiableOrchestrator.title", message: "The Verifiable Orchestrator" }), scenario: translate({ id: "homepage.challenge.verifiableOrchestrator.scenario", message: "Regulator demands audit trail for every AI-generated figure — TRACE pattern, DuckDB, FINRA" }), track: translate({ id: "homepage.track.agenticReliability", message: "Agentic Reliability" }), link: "/docs/agentic-reliability/verifiable-orchestrator/challenge-03" },
              { num: "04", title: translate({ id: "homepage.challenge.semanticControlBusinessRules.title", message: "Semantic Control & Business Rules" }), scenario: translate({ id: "homepage.challenge.semanticControlBusinessRules.scenario", message: "Agent uses stale 2023 index composition — MCP concept registry, temporal grounding" }), track: translate({ id: "homepage.track.agenticReliability", message: "Agentic Reliability" }), link: "/docs/agentic-reliability/semantic-control/challenge-04" },
              { num: "01", title: translate({ id: "homepage.challenge.patientData.title", message: "Patient Data Never Leaves the VNet" }), scenario: translate({ id: "homepage.challenge.patientData.scenario", message: "Deploy an AI agent inside a hospital VNet — private endpoints, HIPAA, data residency" }), track: translate({ id: "homepage.track.azureAiFoundry", message: "Azure AI Foundry" }), link: "/docs/azure-ai-foundry/platform/challenge-01" },
              { num: "02", title: translate({ id: "homepage.challenge.agentHallucinating.title", message: "Agent Hallucinating 20% of the Time" }), scenario: translate({ id: "homepage.challenge.agentHallucinating.scenario", message: "Production agent hallucination rate spiking — guardrails, evaluation, monitoring" }), track: translate({ id: "homepage.track.azureAiFoundry", message: "Azure AI Foundry" }), link: "/docs/azure-ai-foundry/platform/challenge-02" },
              { num: "01", title: translate({ id: "homepage.challenge.euAiInventory.title", message: "EU AI Inventory in 30 Days" }), scenario: translate({ id: "homepage.challenge.euAiInventory.scenario", message: "EU regulator demands full AI system inventory — Purview AI Hub, classification" }), track: translate({ id: "homepage.track.responsibleAi", message: "Responsible AI" }), link: "/docs/responsible-ai/rai-standard/challenge-01" },
              { num: "02", title: translate({ id: "homepage.challenge.shadowAiDetection.title", message: "Shadow AI Detection" }), scenario: translate({ id: "homepage.challenge.shadowAiDetection.scenario", message: "Discover unsanctioned AI usage across the org — Purview AI Hub governance" }), track: translate({ id: "homepage.track.responsibleAi", message: "Responsible AI" }), link: "/docs/responsible-ai/purview-ai-hub/challenge-02" },
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
            <span className={styles.sectionLabel}><Translate id="homepage.section.skillTracks.label">Skill Tracks</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="homepage.section.skillTracks.title">Enterprise AI Architecture</Translate></h2>
          </div>
          <p style={{ marginTop: "-1rem", marginBottom: "2rem", color: "var(--ifm-color-emphasis-700)", maxWidth: "680px" }}>
            <Translate id="homepage.section.skillTracks.description">
              Every track is built from real customer problems — not lab exercises or exam memorization.
              Actual production architecture decisions with code, break-and-fix exercises, and knowledge checks.
            </Translate>
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
                    <span className={styles.challengeCount}>🏆 {translate({ id: "homepage.track.challenges", message: "{count} challenges" }, { count: t.challenges })}</span>
                    <Link className="button button--sm button--primary" to={t.link}>
                      <Translate id="homepage.track.explore">Explore Track →</Translate>
                    </Link>
                  </div>
                </div>

                {/* Challenge preview (Agentic Reliability only) */}
                {t.challengePreview && (
                  <div className={styles.challengePreview}>
                    <p className={styles.challengePreviewLabel}><Translate id="homepage.challengePreview.label">Challenges in this track</Translate></p>
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
            <span className={styles.sectionLabel}><Translate id="homepage.certifications.label">Certifications</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="homepage.certifications.title">Certification Prep</Translate></h2>
          </div>
          <div className={styles.certGrid}>
            {certTracks.map((c, i) => (
              <Link key={i} to={c.link} className={styles.certCard}>
                <span className={styles.certEmoji}>{c.emoji}</span>
                <span className={styles.certCode}>{c.code}</span>
                <p className={styles.certName}>{c.name}</p>
                <span className={`${styles.certLevel} ${levelClass[c.level]}`}>{c.levelLabel}</span>
              </Link>
            ))}
          </div>

          <div className={styles.divider} />

          {/* ── Resources ───────────────────────────────────────── */}
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}><Translate id="homepage.resources.label">Reference</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="homepage.resources.title">Tools & Resources</Translate></h2>
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
            <h2 style={{ margin: "0 0 0.5rem" }}><Translate id="homepage.contact.title">Feedback & Contact</Translate></h2>
            <p style={{ fontSize: "0.95rem", color: "var(--ifm-color-emphasis-700)", maxWidth: "560px", margin: "0 auto" }}>
              <Translate id="homepage.contact.description">
                Found a bug, have a scenario suggestion, or want to discuss a challenge?
                Reach out or open a GitHub issue.
              </Translate>
            </p>
            <div className={styles.contactButtons}>
              <a className="button button--primary" href="mailto:lesalgad@microsoft.com">✉️ lesalgad@microsoft.com</a>
              <a className="button button--secondary" href="mailto:garcia.lenin@outlook.com">✉️ garcia.lenin@outlook.com</a>
              <Link className="button button--outline button--secondary" to="https://github.com/LeninGarcia09/LeninGarcia09.github.io/issues"><Translate id="homepage.contact.openIssue">Open a GitHub Issue</Translate></Link>
            </div>
          </div>

        </div>
      </main>
    </Layout>
  );
}
