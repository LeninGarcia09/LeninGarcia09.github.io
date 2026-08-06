---
sidebar_position: 3
title: "Phase 3 — Modern Cybersecurity"
---

# Phase 3: Modern Cybersecurity (Weeks 9–12)

> **Objective:** Capitalize on prior digital forensics experience and raise it to modern cybersecurity level with Zero Trust, SOC operations, and preparation for a security certification (SC-900 or vendor-neutral option).

:::info[Vendor-neutral by design]
This phase uses Microsoft (Sentinel, Entra, SC-900) as **one** concrete example, but the competencies are **vendor-agnostic**. Where you see a Microsoft tool, there is an equivalent open alternative (Wazuh/Security Onion for SIEM, Sigma for detection rules, OWASP/MITRE for AI threats). Choose based on your target employer's stack.
:::

:::tip[🧪 Apply what you learn: AI Security Challenge Track]
The 5 labs in the **[Challenge Track: Applied AI Security](../challenges-ai-security/overview)** (Garak, PyRIT, Presidio, Semgrep + Gitleaks; OWASP LLM Top 10, MITRE ATLAS, NIST AI RMF, ISO 42001, OWASP Top 10:2025) turn this phase into **portfolio evidence** — exactly what roles such as AI Security Engineer, Detection Engineer, and AI Security Specialist ask for.
:::

## 🎯 Expected Outcomes

By completing this phase:
- Understanding of modern SOC and threat detection
- Threat modeling applied to AI systems
- Identity and Zero Trust implemented
- SC-900 certification earned
- Forensics experience repositioned as a competitive advantage

---

## Week 9: SOC Fundamentals and Security Operations

### Objective
Understand how a modern Security Operations Center works and how AI is transforming it.

### Main Resources

| Resource | Language | Type | Duration |
|---------|--------|------|----------|
| [Microsoft Learn: Security Operations](https://learn.microsoft.com/es-es/training/paths/security-ops-sentinel/) | 🇪🇸 Spanish | Learning Path | 6 hrs |
| [SC-200 Training](https://learn.microsoft.com/es-es/training/paths/sc-200-mitigate-threats-using-microsoft-365-defender/) | 🇪🇸 Spanish | Learning Path | 8 hrs |
| [SANS SOC Fundamentals](https://www.sans.org/cyber-security-courses/security-operations-center-soc/) | 🇬🇧 English | Overview | Reference |
| [Microsoft Sentinel Documentation](https://learn.microsoft.com/es-es/azure/sentinel/) | 🇪🇸 Spanish | Docs | Reference |
| [Blue Team Labs Online](https://blueteamlabs.online/) | 🇬🇧 English | Practical labs | 4-6 hrs |
| [Wazuh — open source SIEM/XDR](https://wazuh.com/) | 🇬🇧 English | Open platform | Reference |
| [Sigma — open detection rules](https://github.com/SigmaHQ/sigma) | 🇬🇧 English | Rules (vendor-neutral) | Reference |
| [Splunk Free / Security Onion](https://securityonionsolutions.com/) | 🇬🇧 English | Alternative SIEM | Reference |

### Daily Plan

| Day | Topic | Resource |
|-----|------|---------|
| Monday | SOC roles, analyst tiers | MS Learn Security Ops |
| Tuesday | SIEM/SOAR: Microsoft Sentinel | Sentinel docs + labs |
| Wednesday | Threat detection, alerts, basic KQL | MS Learn KQL |
| Thursday | Modern incident response workflow | Blue Team Labs |
| Friday | AI in SOC: detection automation | Research AI tools |

### Connection to Forensics

| Your Experience | Modern Evolution |
|---------------|-------------------|
| Post-mortem analysis | Real-time detection with SIEM |
| Evidence recovery | Digital forensics in cloud |
| Chain of custody | Automated evidence collection |
| Investigation reports | Incident response playbooks |

---

## Week 10: Threat Modeling

### Objective
Model threats for modern systems, including AI systems.

### Main Resources

| Resource | Language | Type | Duration |
|---------|--------|------|----------|
| [Microsoft Threat Modeling Tool](https://learn.microsoft.com/es-es/azure/security/develop/threat-modeling-tool) | 🇪🇸 Spanish | Tool + docs | 4 hrs |
| [STRIDE Methodology](https://learn.microsoft.com/es-es/azure/security/develop/threat-modeling-tool-threats) | 🇪🇸 Spanish | Framework | 2 hrs |
| [OWASP Threat Modeling](https://owasp.org/www-community/Threat_Modeling) | 🇬🇧 English | Guide | 3 hrs |
| [AI/ML Threat Modeling (MITRE ATLAS)](https://atlas.mitre.org/) | 🇬🇧 English | Framework | 4 hrs |
| [Threat Modeling Manifesto](https://www.threatmodelingmanifesto.org/) | 🇬🇧 English | Principles | 1 hr |

### Daily Plan

| Day | Topic | Practice |
|-----|------|----------|
| Monday | STRIDE framework | Model a traditional web app |
| Tuesday | Attack Trees | Diagram attack vectors |
| Wednesday | MITRE ATT&CK basics | Map techniques to defenses |
| Thursday | MITRE ATLAS (AI threats) | AI-specific threats |
| Friday | **Project** | Complete threat model |

### 🔨 Project: Threat Model for Corporate AI Chatbot

Model threats for an enterprise AI chatbot:

**STRIDE threats applied to AI:**
- **Spoofing:** User impersonation in chat
- **Tampering:** Prompt injection, data poisoning
- **Repudiation:** Lack of audit trail in conversations
- **Information Disclosure:** Confidential data leakage
- **Denial of Service:** Model abuse, token exhaustion
- **Elevation of Privilege:** Model jailbreak

**Deliverable:**
- Threat diagram (draw.io or similar)
- Document with proposed mitigations
- Mapping to MITRE ATLAS
- GitHub repository

### 🔎 Secure code review for AI-generated code and agents

AI coding assistants (Copilot, ChatGPT, Claude) can reproduce classic, well-documented vulnerability classes because they were trained on code that contains them. Reviewing AI-generated code for these is now a core AppSec skill — the ability to be the human control gate, not just the prompt author.

| Vulnerability | CWE | OWASP Top 10:2025 category | Free detection tool |
|----------------|-----|------------------------------|------------------------|
| SQL Injection | [CWE-89](https://cwe.mitre.org/data/definitions/89.html) | A05:2025 – Injection | [Semgrep](https://github.com/semgrep/semgrep) (`p/owasp-top-ten`) |
| Cross-Site Scripting (XSS) | [CWE-79](https://cwe.mitre.org/data/definitions/79.html) | A05:2025 – Injection | Semgrep (`p/owasp-top-ten`) |
| Path Traversal | [CWE-22](https://cwe.mitre.org/data/definitions/22.html) | A01:2025 – Broken Access Control | Semgrep (`p/security-audit`) |
| Auth Bypass | [CWE-287](https://cwe.mitre.org/data/definitions/287.html) / [CWE-306](https://cwe.mitre.org/data/definitions/306.html) | A07:2025 – Authentication Failures | Semgrep (`p/security-audit`) + [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) checklist |
| Secrets in Code | [CWE-798](https://cwe.mitre.org/data/definitions/798.html) | A02:2025 – Security Misconfiguration | [Gitleaks](https://github.com/gitleaks/gitleaks) |
| SSRF | [CWE-918](https://cwe.mitre.org/data/definitions/918.html) | A01:2025 – Broken Access Control | Semgrep (`p/security-audit`) |

> Also see [MITRE CWE Top 25 Most Dangerous Software Weaknesses](https://cwe.mitre.org/top25/) for the broader, annually-updated list these 6 classes come from. [GitHub CodeQL](https://codeql.github.com/) (free for public/open-source repos) and [Copilot Autofix](https://github.blog/2024-01-16-github-copilot-autofix/) are strong complementary/vendor options once you have budget or a GitHub Advanced Security license.

**Practice this hands-on** in [Challenge 5 — Secure Code Review for AI-Generated Code](../challenges-ai-security/challenge-05), part of the parallel Challenge Track.

---

## Week 11: Identity and Zero Trust

### Objective
Master the fundamentals of modern identity and Zero Trust architecture.

### Main Resources

| Resource | Language | Type | Duration |
|---------|--------|------|----------|
| [Microsoft Zero Trust Guidance](https://learn.microsoft.com/es-es/security/zero-trust/) | 🇪🇸 Spanish | Framework | 4 hrs |
| [Microsoft Entra ID Documentation](https://learn.microsoft.com/es-es/entra/fundamentals/) | 🇪🇸 Spanish | Docs | 6 hrs |
| [NIST Zero Trust Architecture (SP 800-207)](https://csrc.nist.gov/pubs/sp/800/207/final) | 🇬🇧 English | Standard | 3 hrs |
| [Microsoft Learn: Identity & Access](https://learn.microsoft.com/es-es/training/paths/describe-azure-identity-access-security/) | 🇪🇸 Spanish | Learning Path | 4 hrs |

### Daily Plan

| Day | Topic | Practice |
|-----|------|----------|
| Monday | Zero Trust principles: Never trust, always verify | MS Zero Trust docs |
| Tuesday | MFA, Conditional Access policies | Entra ID labs |
| Wednesday | Identity governance, privileged access | PIM, access reviews |
| Thursday | Zero Trust for AI systems | How to apply ZT to AI workloads |
| Friday | Zero Trust assessment | Evaluate enterprise scenario |

### 🔨 Project: Zero Trust Assessment for Fictional Organization

Create a Zero Trust assessment that includes:
- Current-state evaluation (score 1-5 by pillar)
- Identified gaps
- Implementation roadmap
- Quick wins vs. long-term improvements
- Special considerations for AI/ML workloads

**Evaluated pillars:**
1. Identity
2. Endpoints
3. Applications
4. Data
5. Infrastructure
6. Network

---

## Week 12: SC-900 Preparation and Certification

### Objective
Consolidate knowledge and earn the SC-900 certification.

### Main Resources

| Resource | Language | Type | Duration |
|---------|--------|------|----------|
| [Microsoft Learn: SC-900](https://learn.microsoft.com/es-es/training/paths/describe-concepts-of-security-compliance-identity/) | 🇪🇸 Spanish | Learning Path | 8 hrs |
| [SC-900 Study Guide](https://learn.microsoft.com/es-es/credentials/certifications/security-compliance-and-identity-fundamentals/) | 🇪🇸 Spanish | Official guide | Reference |
| [John Savill's Technical Training (YouTube)](https://www.youtube.com/@NTFAQGuy) | 🇬🇧 English | Video (study cram) | 2 hrs |
| [Official SC-900 Practice Assessment (free)](https://learn.microsoft.com/es-es/credentials/certifications/security-compliance-and-identity-fundamentals/practice/assessment?assessmentId=17) | 🇪🇸 Spanish | Free official practice | 2 hrs |

### Daily Plan

| Day | SC-900 Module | Topic |
|-----|---------------|------|
| Monday | Module 1 | Security, compliance, and identity concepts |
| Tuesday | Module 2 | Microsoft Entra capabilities |
| Wednesday | Module 3 | Microsoft security solutions capabilities |
| Thursday | Module 4 | Microsoft compliance capabilities |
| Friday | Review | Practice exams |
| Saturday | **Exam** | SC-900 |

### Certification: SC-900

- **Cost:** $99 USD
- **Exam language:** Available in Spanish
- **Format:** 40-60 questions, 45 minutes
- **Passing score:** 700/1000
- **Domains:**
  - Security, compliance, and identity concepts (10-15%)
  - Microsoft Entra capabilities (25-30%)
  - Microsoft security solutions capabilities (25-30%)
  - Microsoft compliance solutions capabilities (25-30%)

:::tip[Vendor-neutral alternatives to SC-900]
SC-900 is an excellent entry point (low cost, available in Spanish), but it is **not mandatory**. If your target employer is not Microsoft-centric, consider **ISC2 CC** (free exam through the "1M Certified in Cybersecurity" program) or **CompTIA Security+** as vendor-neutral security credentials. For the **AI security** angle specifically, your differentiator is the artifacts from the [AI Security Challenge Track](../challenges-ai-security/overview) + command of OWASP LLM Top 10, MITRE ATLAS, and NIST AI RMF.
:::

---

## 📋 Phase 3 Checklist

- [ ] SOC operations understood
- [ ] Basic KQL functional
- [ ] Threat model for AI system completed
- [ ] MITRE ATLAS explored
- [ ] Zero Trust principles mastered
- [ ] Zero Trust assessment created
- [ ] SC-900 Learning Path completed
- [ ] **SC-900 certification earned**
- [ ] Portfolio updated with security projects

## 🔗 Resume Value

After this phase:
> "Cybersecurity professional with AZ-900 and SC-900 certifications, experience in threat modeling for AI systems (STRIDE + MITRE ATLAS), Zero Trust architecture implementation, and modern SOC operations with Microsoft Sentinel."

## ⏭️ Next Phase

[Phase 4: AI for Business and IT →](../ai-business/overview)
