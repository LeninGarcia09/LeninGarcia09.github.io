import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

const tracks = [
  {
    emoji: "🤖",
    title: "Azure AI Foundry + Hosted Agents",
    type: "Skill Track",
    desc: "Production-grade labs using real enterprise scenarios: data residency, agent hallucinations, multi-agent security, and scale.",
    link: "/docs/azure-ai-foundry/overview",
    challenges: 14,
  },
  {
    emoji: "⚖️",
    title: "Responsible AI & Governance",
    type: "Skill Track",
    desc: "RAI Standard v2, Purview AI Hub, Azure AI Content Safety, PyRIT red teaming, EU AI Act & NIST RMF compliance.",
    link: "/docs/responsible-ai/overview",
    challenges: 10,
  },
  {
    emoji: "🧠",
    title: "AI-102: Azure AI Engineer",
    type: "Certification — Associate",
    desc: "Generative AI, agentic solutions, vision, NLP, knowledge mining. Redesigned April 2025.",
    link: "/docs/ai-102/overview",
    challenges: 0,
  },
  {
    emoji: "🏗️",
    title: "AZ-305: Solutions Architect Expert",
    type: "Certification — Expert",
    desc: "Architecture design, trade-offs, governance, and enterprise-scale cloud solutions.",
    link: "/docs/az-305/overview",
    challenges: 0,
  },
  {
    emoji: "🛡️",
    title: "SC-500: Cloud & AI Security",
    type: "Certification — Associate",
    desc: "Defender for AI, Purview, Zero Trust, identity, and network security controls.",
    link: "/docs/sc-500/overview",
    challenges: 0,
  },
  {
    emoji: "🔧",
    title: "AZ-104: Azure Administrator",
    type: "Certification — Associate",
    desc: "Identity, storage, compute, networking, and monitoring — the infra foundation for AI architects.",
    link: "/docs/az-104/overview",
    challenges: 0,
  },
  {
    emoji: "🌐",
    title: "AZ-700: Network Engineer",
    type: "Certification — Associate",
    desc: "Private endpoints, VNet, VPN, ExpressRoute — critical for Foundry enterprise isolation.",
    link: "/docs/az-700/overview",
    challenges: 0,
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <header className="hero hero--primary">
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            <Link className="button button--secondary button--lg" to="/docs/azure-ai-foundry/overview">
              Start with AI Foundry →
            </Link>
            <Link className="button button--outline button--secondary button--lg" to="/docs/responsible-ai/overview">
              Responsible AI Track →
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="container" style={{ padding: "3rem 0" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2>What makes this different</h2>
            <p style={{ fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto" }}>
              Every challenge is built from <strong>real enterprise scenarios</strong> — the exact problems customers bring to AI Solution Architects today.
              Not lab exercises. Not exam memorization. Actual production architecture decisions.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
            {[
              { icon: "🏥", title: "Healthcare", scenario: "Deploy AI agents to process patient records without data leaving the hospital VNet (HIPAA + EU AI Act)" },
              { icon: "🏦", title: "Financial Services", scenario: "AI credit decision model flagged for disparate impact — diagnose, mitigate, document for regulators" },
              { icon: "🏭", title: "Enterprise", scenario: "300 employees using ChatGPT without controls — build a governed AI platform in 30 days" },
              { icon: "🏛️", title: "Government", scenario: "EU regulator demands your full AI system inventory under Article 51. You have 30 days." },
            ].map((item, i) => (
              <div key={i} className="feature-card">
                <div style={{ fontSize: "2rem" }}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--ifm-color-emphasis-700)" }}>{item.scenario}</p>
              </div>
            ))}
          </div>

          <h2 style={{ marginBottom: "1.5rem" }}>All Learning Tracks</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
            {tracks.map((t, i) => (
              <Link key={i} to={t.link} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="feature-card" style={{ cursor: "pointer", transition: "border-color 0.2s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "2rem" }}>{t.emoji}</span>
                    <span style={{ fontSize: "0.75rem", background: "var(--ifm-color-primary)", color: "white", borderRadius: "4px", padding: "2px 8px" }}>
                      {t.type}
                    </span>
                  </div>
                  <h3 style={{ marginTop: "0.75rem", marginBottom: "0.5rem" }}>{t.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--ifm-color-emphasis-700)", marginBottom: "0.75rem" }}>{t.desc}</p>
                  {t.challenges > 0 && (
                    <span style={{ fontSize: "0.8rem", color: "var(--ifm-color-primary)" }}>
                      {t.challenges} challenges →
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem", padding: "2rem", border: "1px solid var(--ifm-color-emphasis-300)", borderRadius: "8px" }}>
            <h2>Feedback & Contact</h2>
            <p style={{ fontSize: "1rem", maxWidth: "600px", margin: "0 auto 1rem" }}>
              Found a bug, have a suggestion, or want to contribute a scenario? Reach out directly or open a GitHub issue.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
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
