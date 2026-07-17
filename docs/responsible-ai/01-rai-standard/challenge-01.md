---
sidebar_position: 1
title: "Challenge 01: EU Regulator Wants Your AI Inventory in 30 Days"
---

# Challenge 01: EU Regulator Wants Your AI Inventory in 30 Days

:::info Scenario Brief
**Industry:** Enterprise (any) | **Regulatory Context:** EU AI Act Art. 51, GDPR Art. 35  
**Time Estimate:** 90 minutes | **Azure Cost:** ~$0–5 (Purview licensing required)
:::

---

## What's at Stake

**Europax Manufacturing** operates across 7 EU member states. A national competent authority has issued a formal inquiry:

> *"Under Article 51 of Regulation (EU) 2024/1689, you are required to provide a complete register of all high-risk AI systems in use within 30 days, including technical documentation as specified in Article 11."*

Their IT team estimates they have "about 15 AI systems" but has no formal inventory. You have 30 days to discover, classify, document, and respond.

---

## Skills Practiced

- Using **Microsoft Purview AI Hub** to auto-discover AI activity across the tenant
- Applying the **EU AI Act risk classification** framework (unacceptable, high, limited, minimal)
- Building a compliant **technical documentation package** per Art. 11
- Implementing **Microsoft RAI Standard v2** impact assessment
- Understanding **EU AI Act registration requirements** for high-risk systems

---

## EU AI Act Risk Classification

```
┌─────────────────────────────────────────────────────────────────┐
│               EU AI Act Risk Pyramid                           │
├─────────────────────────────────────────────────────────────────┤
│  UNACCEPTABLE RISK — BANNED as of Feb 2, 2025                  │
│  • Social scoring by public authorities                        │
│  • Real-time remote biometric surveillance in public spaces    │
│  • Subliminal manipulation                                     │
├─────────────────────────────────────────────────────────────────┤
│  HIGH RISK — Annex III list (must comply by Aug 2, 2026)       │
│  • Hiring & HR decisions      • Credit scoring                 │
│  • Medical devices            • Insurance risk assessment      │
│  • Critical infrastructure    • Educational assessment         │
│  • Law enforcement            • Migration & border control     │
├─────────────────────────────────────────────────────────────────┤
│  LIMITED RISK — Transparency obligations only                  │
│  • Chatbots (must disclose it's AI)                            │
│  • Deepfake content (must label)                               │
├─────────────────────────────────────────────────────────────────┤
│  MINIMAL RISK — No obligations (but document anyway)           │
│  • Spam filters, recommendation engines, AI in games          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧰 Before You Start — Environment Setup

This is a **governance discovery** exercise, so most of your setup is access and permissions, not code. The goal: be able to see *all* AI activity in your tenant, then classify and document it.

### Prerequisites

| Requirement | Why you need it | How to check |
|-------------|-----------------|--------------|
| **Microsoft 365 E5** or a **Purview compliance** license | Unlocks **Microsoft Purview AI Hub** (AI activity discovery + DSPM for AI) | [Purview portal](https://purview.microsoft.com) → Data Security → AI Hub |
| **Purview / compliance admin** role | Run activity reports and author DLP policies | Microsoft 365 admin center → Roles |
| PowerShell + **Exchange Online Management** module | Export AI activity via `Connect-IPPSSession` | `Get-Module -ListAvailable ExchangeOnlineManagement` |
| A spreadsheet / **Microsoft Lists** or **Dataverse** table | Hold your AI system inventory + risk classification | Microsoft 365 |

### Step 0 — Confirm you can actually see AI activity (10 min) — *the "where do I go"*

This exercise depends on **Microsoft Purview DSPM for AI**. Before anything else, prove you can reach it and that data is flowing — otherwise Task 1 discovery returns empty and you'll think you have no shadow AI when you just have no visibility.

1. Go to **[purview.microsoft.com](https://purview.microsoft.com)** and sign in with an account that has the **Purview / compliance admin** role.
2. In the left nav, open **DSPM for AI** (Data Security Posture Management for AI). If you don't see it, your tenant is missing the **M365 E5** or Purview compliance license — see the official [DSPM for AI get-started guide](https://learn.microsoft.com/purview/dspm-for-ai).
3. On the **Overview** page, confirm **Activity** tiles show data. If they're empty, turn on the **one-time setup** options (audit + Copilot/AI analytics) — DSPM for AI prompts you; allow up to 24–48h for first data.
4. Verify the PowerShell path you'll use to export activity:

```powershell
Install-Module ExchangeOnlineManagement -Scope CurrentUser   # if not already installed
Connect-IPPSSession   # opens sign-in; this is your compliance/eDiscovery endpoint
```

✅ **Done when** DSPM for AI shows activity tiles **and** `Connect-IPPSSession` connects without error.

### Step 1 — Create your inventory as a governed list, not a spreadsheet (10 min)

Your inventory is a regulated artifact, so give it ownership, history, and access control from the start. Create a **Microsoft List** (or a **Dataverse** table) with these exact columns:

`System name | Owner | Data touched | EU AI Act risk tier | Art. 11 doc? | Registered? | Last reviewed`

To create it: **[Microsoft Lists](https://www.microsoft.com/microsoft-365/microsoft-lists)** → **+ New list** → **Blank list** → add the columns above (use a **Choice** column for *risk tier*: Prohibited / High / Limited / Minimal).

✅ **Done when** the list exists with all 7 columns and at least you as owner.

> 🟦 **Microsoft-first note:** this challenge is already Microsoft-native — **Purview DSPM for AI** does the discovery, **Purview DLP** enforces the guardrails, and your inventory belongs in **Microsoft Lists** or **Dataverse** (not a loose spreadsheet) so it has ownership, history, and access control.

> **Common fixes:** DSPM for AI not visible → missing E5/Purview license or compliance-admin role. Activity empty → enable auditing under DSPM for AI **one-time setup** and wait for data to accrue.

### The path through this challenge

1. **Task 1** — discover AI activity with Purview AI Hub (expect shadow AI).
2. **Task 2** — classify every system by EU AI Act risk tier.
3. **Task 3** — complete Article 11 technical documentation for high-risk systems.
4. **Task 4** — stand up a Purview DLP policy blocking sensitive data to external AI.
5. **Success Criteria** — a complete, defensible inventory + regulator response.
6. **Adapt to Your Business** — run this discovery on *your* org.

> ⏱️ **Time budget:** ~90 minutes. Discovery (Task 1) usually surprises people — budget extra for shadow-AI findings.

---

## Your Tasks

### Task 1: Discover AI Activity with Microsoft Purview AI Hub

```bash
# Purview AI Hub requires Microsoft 365 E3/E5 or Purview compliance license
# Access via: https://purview.microsoft.com → Data Security → AI Hub

# PowerShell: Export Purview AI activity report
Connect-IPPSSession

# Get AI interactions report (last 30 days)
Get-AIActivityReport -StartDate (Get-Date).AddDays(-30) -EndDate (Get-Date) |
  Export-Csv -Path "ai_activity_report.csv" -NoTypeInformation

# Get list of AI applications detected
Get-AISiteActivityReport |
  Select-Object ApplicationName, UserCount, InteractionCount, DataSensitivity |
  Sort-Object InteractionCount -Descending |
  Format-Table
```

### Task 2: Classify Each AI System

For each discovered system, apply this classification matrix:

```python
from enum import Enum
from dataclasses import dataclass
from typing import Optional

class EUAIActRisk(Enum):
    UNACCEPTABLE = "Unacceptable"  # BANNED
    HIGH = "High"                   # Art. 6 + Annex III
    LIMITED = "Limited"             # Art. 52 transparency
    MINIMAL = "Minimal"             # Recommended practice

@dataclass
class AISystemRecord:
    name: str
    description: str
    vendor: str
    deployment_date: str
    data_processed: list[str]
    eu_act_risk: EUAIActRisk
    annex_iii_category: Optional[str]
    article_11_docs_complete: bool
    human_oversight_mechanism: str
    registration_required: bool
    notes: str

# Example classification
systems = [
    AISystemRecord(
        name="HR Candidate Screening Tool",
        description="AI-powered resume screening that ranks candidates",
        vendor="Internal (Azure OpenAI)",
        deployment_date="2024-03-15",
        data_processed=["CV/Resume", "Work history", "Education", "Name", "Location"],
        eu_act_risk=EUAIActRisk.HIGH,
        annex_iii_category="Section 4 — Employment and workers management (HR decisions)",
        article_11_docs_complete=False,  # MUST complete before Aug 2026
        human_oversight_mechanism="HR manager reviews all ranked candidates before outreach",
        registration_required=True,  # Must register in EU AI database
        notes="URGENT: Must implement Art. 14 oversight + Art. 11 documentation"
    ),
    AISystemRecord(
        name="Customer Service Chatbot",
        description="AI chatbot answering product FAQs on website",
        vendor="Azure OpenAI + Custom Agent",
        deployment_date="2024-09-01",
        data_processed=["Chat messages", "Session ID"],
        eu_act_risk=EUAIActRisk.LIMITED,
        annex_iii_category=None,
        article_11_docs_complete=True,
        human_oversight_mechanism="Escalation to human agent available at all times",
        registration_required=False,
        notes="Must disclose AI to users per Art. 52. DONE: disclosure message in chat header."
    ),
]

# Generate compliance status report
for sys in systems:
    status = "⚠️ ACTION REQUIRED" if not sys.article_11_docs_complete else "✅ Compliant"
    print(f"{status} | {sys.eu_act_risk.value} | {sys.name}")
    if sys.registration_required:
        print(f"  → Must register in EU AI database before Aug 2, 2026")
```

### Task 3: Build Article 11 Technical Documentation

For each High-Risk system, Article 11 requires documentation of:

```markdown
## Article 11 Technical Documentation — [System Name]

### 1. General Description
- System name, version, purpose
- Intended use case and geographic deployment
- Intended users (deployers, end users)

### 2. Development Information  
- Training data description and governance
- Model architecture and validation approach
- Performance metrics on validation datasets

### 3. Risk Management System (Art. 9)
- Identified risks and their severity
- Mitigation measures implemented
- Residual risks and acceptance rationale

### 4. Human Oversight Measures (Art. 14)
- How human oversight is implemented
- What decisions require human review
- How humans can intervene or override

### 5. Data Governance (Art. 10)
- Data sources and lineage
- Data quality measures
- Bias testing results

### 6. Monitoring (Art. 17)
- How the system is monitored post-deployment
- Key performance indicators and thresholds
- Incident reporting procedure
```

### Task 4: Set Up Purview Policies to Control Shadow AI

```bash
# In Microsoft Purview, create an AI Interaction Protection policy
# This prevents sensitive data from being sent to external AI tools

# PowerShell: Create AI Interaction Protection policy
New-DlpCompliancePolicy -Name "Block-Sensitive-Data-To-AI" `
  -Mode Enable `
  -Comment "Prevent PII and confidential data from being sent to AI tools"

New-DlpComplianceRule -Name "Block-AI-PII-Transfer" `
  -Policy "Block-Sensitive-Data-To-AI" `
  -ContentContainsSensitiveInformation @{Name="EU Social Security Numbers"; minCount=1} `
  -BlockAccess $true `
  -GenerateAlert $true
```

---

## Success Criteria

- [ ] Purview AI Hub shows discovered AI applications and interaction counts
- [ ] All AI systems classified with EU AI Act risk levels
- [ ] High-risk systems have Article 11 documentation template completed
- [ ] Registration requirement identified for each high-risk system
- [ ] Purview policy blocking sensitive data to external AI tools is active
- [ ] 30-day response to regulator is drafted with complete system inventory

---

## 🔁 Adapt This to Your Own Business

The scenario is an **EU regulator inquiry**, but *every* organization needs an AI inventory — for the EU AI Act, ISO 42001, NIST AI RMF, internal audit, or simply knowing what's running. The discovery-classify-document loop is universal.

### Step 1 — Find your "what AI is even running here?" moment

| Organization type | The trigger | What you'll discover |
|-------------------|-------------|----------------------|
| **Multinational enterprise** | EU AI Act / cross-border audit | High-risk HR, credit, or biometric systems |
| **Regulated finance** | Model risk management (SR 11-7) | Undocumented scoring / pricing models |
| **Healthcare** | FDA SaMD / HIPAA review | Clinical-decision tools without oversight docs |
| **Public sector** | Transparency / FOIA obligations | Citizen-facing AI needing disclosure |
| **Any company** | Copilot / GenAI rollout | Shadow AI: staff pasting data into public tools |

### Step 2 — Map the building blocks to your stack (Microsoft-first)

| In this challenge | In your project — use |
|-------------------|-----------------------|
| Purview AI Hub discovery | **Microsoft Purview AI Hub / DSPM for AI** — tenant-wide AI activity |
| Risk classification | **Microsoft RAI Standard v2** + EU AI Act Annex III tiers |
| Article 11 documentation | A **Transparency Note** / **Dataverse** record per system |
| Inventory register | **Microsoft Lists** or **Dataverse** (owned, audited) |
| Blocking sensitive data | **Purview DLP** policy for generative-AI apps |
| Ongoing monitoring | **Purview Compliance Manager** + **Azure Monitor** |

### Step 3 — The 5-question implementation checklist

1. **Can you see AI usage you didn't approve?** If not → turn on Purview AI Hub / DSPM for AI first.
2. **Does every AI system have a named owner?** If not → assign one before classifying.
3. **Do you know which systems are "high-risk"?** If not → apply Annex III + RAI Standard v2.
4. **Is sensitive data leaving to public AI tools?** If unknown → a DLP policy answers this fast.
5. **Could you produce this inventory in 30 days under audit?** If not → this challenge *is* your fire drill.

### Step 4 — A 1-week rollout plan

| Day | Action | Owner |
|-----|--------|-------|
| **Day 1** | Enable Purview AI Hub / DSPM for AI; run a 30-day activity report | Compliance admin |
| **Day 2** | Build the inventory register in Microsoft Lists / Dataverse | Governance lead |
| **Day 3** | Classify each system by EU AI Act tier + RAI Standard | Risk + eng |
| **Day 4** | Draft Art. 11 / Transparency Notes for high-risk systems | Product owner |
| **Day 5** | Deploy a Purview DLP policy for external AI tools | Security |

### Step 5 — Prove the ROI

- **Inventory completeness** — % of AI systems in a governed register *(target: 100%)*.
- **Shadow-AI reduction** — unapproved AI tools blocked or sanctioned *(track month over month)*.
- **Audit readiness** — days to produce a full inventory *(target: well under 30)*.

> 💡 **Rule of thumb:** you cannot govern what you cannot see. Turn on discovery *before* you write a single policy — the surprises are the whole point.

### Doing this solo (no team, portfolio-first)

No team, no budget? An AI governance inventory needs zero code and proves you can operationalize the EU AI Act — a skill in huge demand. Run the week solo:

- **Mon–Tue** — list every AI system you can find (start with your own tenant's Copilot/GenAI use) into a Microsoft List/Excel register, each with a named owner.
- **Wed–Thu** — classify each by EU AI Act tier + RAI Standard; draft a Transparency Note for the highest-risk one.
- **Fri** — time yourself producing the full inventory — that's your audit-readiness number.

📦 **Ship this artifact:** a completed RAI inventory register + one Transparency Note. Resume bullet: *"Stood up an EU AI Act-ready AI inventory — 100% of systems governed with named owners, risk tier, and transparency documentation."*

> 🆓 **Free-tier path:** Microsoft Lists / Excel + the public RAI Standard template — this one is genuinely $0.

---

## Regulatory Mapping

| Requirement | Article | Deadline | Status Check |
|-------------|---------|----------|-------------|
| Register high-risk AI systems | Art. 51 | Aug 2, 2026 | Is each high-risk system registered? |
| Technical documentation | Art. 11 | Before deployment | Is Art. 11 doc complete for each system? |
| Human oversight | Art. 14 | Before deployment | Is oversight mechanism documented? |
| Risk management system | Art. 9 | Before deployment | Is risk register maintained? |
| Post-market monitoring | Art. 72 | Ongoing | Are KPIs being tracked? |
| Transparency disclosure | Art. 52 | Immediate | Are chatbots disclosing AI to users? |

---

<details>
<summary>💡 Hints</summary>

1. **Shadow AI is the real challenge**: Purview AI Hub often discovers 3–5x more AI tools than IT knows about. Budget time for surprise discoveries (Grammarly, Notion AI, Midjourney on personal devices connecting to corporate network).
2. **High-risk ≠ bad**: Being classified as High-Risk means the system is *significant* — not that it's inherently problematic. The law just requires more documentation and oversight.
3. **The registration deadline is August 2, 2026** for Annex III systems already deployed. New high-risk systems deployed after August 2, 2026 must register before deployment.
4. **Art. 52 is immediate**: If you're running a chatbot today in the EU without disclosing it's AI, you're already non-compliant. Add "This conversation is with an AI assistant" to the chat interface immediately.

</details>

---

## Knowledge Check

1. Under the EU AI Act, which risk category requires registration in the EU AI database?
2. What is the difference between a "provider" and a "deployer" of AI systems under the EU AI Act?
3. Why might a recommendation engine be classified as Minimal Risk while a credit scoring tool is High Risk?
4. What does Microsoft Purview AI Hub discover that traditional IT asset management tools miss?

---

## Cleanup

No Azure resources created — Purview is a SaaS service. Delete any exported CSV files with sensitive data.
