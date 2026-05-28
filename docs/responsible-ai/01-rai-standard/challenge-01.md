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
