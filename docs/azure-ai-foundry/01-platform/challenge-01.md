---
sidebar_position: 1
title: "Challenge 01: Patient Data Never Leaves the VNet"
---

# Challenge 01: Patient Data Never Leaves the VNet

:::info Scenario Brief
**Industry:** Healthcare | **Regulatory Context:** HIPAA, EU AI Act Article 10(5)  
**Time Estimate:** 90 minutes | **Azure Cost:** ~$8–12
:::

---

## What's at Stake

Your client is **Northside Regional Medical Center**, a 450-bed hospital in Germany that processes 8,000 patient records per day. Their legal team issued a hard requirement:

> *"No patient data — including metadata, conversation history, or embeddings — may traverse the public internet or reside on infrastructure not under our control."*

Their current AI chatbot sends summaries to a US-based cloud API. After a GDPR investigation, their DPO has given you **3 weeks** to replace it with a compliant solution.

---

## Skills Practiced

- Deploying Azure AI Foundry in **Standard mode** with BYO storage
- Configuring **Private Endpoints** for the Foundry account
- Setting up **BYO VNet** for Hosted Agent isolation
- Disabling public network access on all AI resources
- Verifying data residency with Azure Policy

---

## Architecture Decision

**Why Hosted Agents + Standard Mode?**

| Option | Why Not |
|--------|---------|
| Prompt Agent (Basic mode) | Microsoft manages storage — violates BYO requirement |
| Workflow Agent | Preview; limited VNet support as of mid-2025 |
| External AKS orchestration | Higher ops burden; loses Entra Agent ID benefits |
| **Hosted Agent (Standard mode)** | ✅ BYO VNet + storage + Micro-VM isolation + Entra Agent ID |

---

## 🧰 Before You Start — Environment Setup

This challenge is a **data-residency / network-isolation** build. Your setup is mostly Azure access and networking — the win is proving no data leaves your boundary.

### Prerequisites

| Requirement | Why you need it | How to check |
|-------------|-----------------|--------------|
| **Azure subscription** with Contributor on a resource group | Create Foundry, VNet, private endpoints | `az account show` |
| **Azure CLI** (or Azure PowerShell) | Provision + verify network isolation | `az version` |
| Rights to create a **VNet + Private Endpoints + Private DNS** | The whole point — keep traffic off the public internet | Network Contributor role |
| A region matching your residency rule (e.g. `germanywestcentral`) | Data must physically reside in-boundary | `az account list-locations -o table` |

### Step 0 — Sign in and set your context (5 min)

```bash
az login
az account set --subscription "<your-subscription-id>"
az group create --name rg-foundry-private --location germanywestcentral
```

### Step 1 — Confirm the residency requirement in writing (5 min)

Before building, write down the exact rule you must satisfy (region, no public egress, BYO storage). Everything you configure will be verified against this one sentence in Success Criteria.

> 🟦 **Microsoft-first note:** this challenge is already 100% Azure-native — **Azure AI Foundry Standard mode**, **Private Endpoints**, **BYO VNet + Storage + Key Vault**, **Private DNS zones**, and **Azure Policy** for enforcement. There is no third-party component to add; the skill is wiring them correctly.

### The path through this challenge

1. **Task 1** — deploy Foundry in Standard mode with BYO storage.
2. **Task 2** — add private endpoints + private DNS.
3. **Task 3** — disable public network access everywhere.
4. **Task 4** — verify residency with Azure Policy + a DNS test.
5. **Success Criteria** — prove traffic resolves to a `10.x` VNet IP.
6. **Adapt to Your Business** — apply the boundary to *your* data rule.

> ⏱️ **Time budget:** ~90 minutes. The DNS/private-endpoint verification (Task 4) is where you actually *prove* isolation — don't skip it.

---

## Your Tasks

### Task 1: Deploy Foundry Account in Standard Mode

```bash
# Deploy in Germany West Central for EU data residency
az group create --name rg-northside-ai --location germanywestcentral

az ai foundry account create \
  --name northside-foundry \
  --resource-group rg-northside-ai \
  --location germanywestcentral \
  --sku Standard \
  --public-network-access Disabled
```

:::warning Standard Mode Is Not the Default
The portal defaults to Basic mode. Always specify `--sku Standard` for enterprise customers. In Basic mode, Microsoft manages conversation artifacts — the DPO will reject this.
:::

### Task 2: Create Private Endpoint + DNS

```bash
# Disable public access
az ai foundry account update \
  --name northside-foundry \
  --resource-group rg-northside-ai \
  --public-network-access Disabled

# Create private endpoint (assumes VNet + subnet already exist)
az network private-endpoint create \
  --name pe-northside-foundry \
  --resource-group rg-northside-ai \
  --vnet-name vnet-northside \
  --subnet snet-ai \
  --private-connection-resource-id $(az ai foundry account show \
    --name northside-foundry \
    --resource-group rg-northside-ai --query id -o tsv) \
  --group-id account \
  --connection-name northside-foundry-conn

# Create private DNS zone
az network private-dns zone create \
  --resource-group rg-northside-ai \
  --name "privatelink.services.ai.azure.com"

az network private-dns link vnet create \
  --resource-group rg-northside-ai \
  --zone-name "privatelink.services.ai.azure.com" \
  --name foundry-dns-link \
  --virtual-network vnet-northside \
  --registration-enabled false
```

### Task 3: Connect BYO Storage and Key Vault

```bash
az storage account create \
  --name stnorthsideai \
  --resource-group rg-northside-ai \
  --location germanywestcentral \
  --sku Standard_LRS \
  --kind StorageV2 \
  --enable-hierarchical-namespace true \
  --public-network-access Disabled

az keyvault create \
  --name kv-northside-ai \
  --resource-group rg-northside-ai \
  --location germanywestcentral \
  --public-network-access Disabled
```

### Task 4: Deploy Hosted Agent

```python
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential()
)

agent = client.agents.create_agent(
    model="gpt-4o",
    name="northside-clinical-assistant",
    instructions="""You are a clinical documentation assistant.
    Summarize physician notes and surface relevant ICD-10 codes.
    Never include patient names, dates of birth, or MRN numbers.""",
)

print(f"Agent created: {agent.id}")
print(f"Entra Agent ID: {agent.identity}")  # Each agent gets its own managed identity
```

### Task 5: Verify Compliance with Azure Policy

```bash
az policy assignment create \
  --name "ai-private-link-required" \
  --scope /subscriptions/<sub-id>/resourceGroups/rg-northside-ai \
  --policy "Cognitive Services accounts should use private link" \
  --enforcement-mode Default
```

---

## Success Criteria

- [ ] Foundry account deployed in `germanywestcentral` with Standard mode
- [ ] Public network access disabled on Foundry, Storage, and Key Vault
- [ ] Private endpoint created and `privatelink.services.ai.azure.com` DNS zone linked to VNet
- [ ] Agent deployed and returns responses only via private endpoint
- [ ] `Resolve-DnsName northside-foundry.services.ai.azure.com` returns a `10.x.x.x` IP from VNet VM
- [ ] Azure Policy shows compliant

---

## 🔁 Adapt This to Your Own Business

The scenario is a **German hospital under GDPR**, but *many* organizations have a hard "data must not leave X" boundary. The pattern — private networking + BYO storage + policy enforcement — is identical whether the driver is HIPAA, GDPR, or a sovereign-cloud mandate.

### Step 1 — Find your data-residency boundary

| Industry | The hard requirement | The driver |
|----------|----------------------|-----------|
| **Healthcare** | PHI never leaves the region / VNet | HIPAA, GDPR |
| **Financial services** | Customer data in-country only | Data sovereignty laws |
| **Government / defense** | Data in a sovereign or Gov cloud | FedRAMP / national rules |
| **Legal** | Privileged data never on shared infra | Attorney-client privilege |
| **Any EU entity** | No transfer outside the EEA | GDPR Chapter V |

### Step 2 — Map the building blocks to your stack (Microsoft-first)

| In this challenge | In your project — use |
|-------------------|-----------------------|
| Foundry Standard mode + BYO storage | Same — **Azure AI Foundry Standard mode** with your storage account |
| Private Endpoints + Private DNS | Same — extend to every dependency (SQL, Search, Key Vault) |
| Disable public network access | Apply to **all** data services, not just Foundry |
| Azure Policy compliance | **Azure Policy** initiative + **Purview** for data governance |
| Region pinning | Deploy to your required region; consider **sovereign cloud** |

### Step 3 — The 5-question implementation checklist

1. **What is the exact boundary?** Write it as one sentence before you build.
2. **Does every dependency have a private endpoint?** One public egress point breaks the whole guarantee.
3. **Is public network access disabled everywhere?** Default-deny, then allow the VNet.
4. **Can you prove traffic stays private?** A DNS resolution to a `10.x` IP is your evidence.
5. **Is compliance enforced, not just configured?** Azure Policy stops drift.

### Step 4 — A 1-week rollout plan

| Day | Action | Owner |
|-----|--------|-------|
| **Day 1** | Document the residency rule; pick the region | Compliance + cloud |
| **Day 2** | Deploy Foundry Standard mode + BYO storage in-region | Cloud eng |
| **Day 3** | Add private endpoints + private DNS for every dependency | Network eng |
| **Day 4** | Disable public access; run the DNS/private-link test | Network eng |
| **Day 5** | Apply an Azure Policy initiative; confirm compliant | Governance |

### Step 5 — Prove the ROI

- **Private-link coverage** — % of data services with public access disabled *(target: 100%)*.
- **Egress proof** — DNS resolves to a private `10.x` IP *(target: yes, on every endpoint)*.
- **Policy compliance** — % of resources compliant with the residency initiative *(target: 100%)*.

> 💡 **Rule of thumb:** "we configured it privately" is not the same as "we proved nothing leaks." Resolve the DNS, check the IP, and let Azure Policy keep it that way.

---

## Regulatory Mapping

| Requirement | Regulation | Enforcement |
|-------------|-----------|-------------|
| Data residency (Germany) | GDPR Art. 44, EU AI Act Art. 10(5) | Resource location = `germanywestcentral` |
| No public internet transit | GDPR Art. 32 | Private endpoints + disabled public access |
| Customer-managed keys | HIPAA § 164.312(a) | Key Vault CMK for storage encryption |
| Auditability | EU AI Act Art. 12 | Azure Monitor + Activity Log |

---

<details>
<summary>💡 Hints (try to solve first)</summary>

1. **Private DNS Zone**: Without `privatelink.services.ai.azure.com` linked to the VNet, the private endpoint resolves to a public IP — defeating the purpose.
2. **Storage needs TWO private endpoints**: one for `blob`, one for `dfs` sub-resources.
3. **Key Vault access**: Grant the Foundry account's managed identity `Key Vault Crypto User` role.
4. **Region discipline**: Deploy ALL resources in `germanywestcentral` — even a Log Analytics workspace in `eastus` can trigger a data residency review.

</details>

---

## Break & Fix

Your colleague deployed everything. The portal shows "Approved" on the private endpoint. But the agent times out from the hospital VNet.

**Investigate:**
1. `Resolve-DnsName northside-foundry.services.ai.azure.com` — does it return a `10.x.x.x` or public IP?
2. Check NSG rules — is TCP 443 allowed inbound on `snet-ai`?
3. Is the Private DNS Zone actually linked to `vnet-northside`?

---

## Knowledge Check

1. What is the difference between Basic mode and Standard mode, and why does Basic mode violate data residency requirements?
2. When you disable public network access on a Foundry account, what else must you configure for clients inside the VNet to reach it?
3. Why does each Hosted Agent get its own Entra Agent ID rather than sharing a service principal?
4. Which Azure Policy built-in enforces private link for AI services?

---

## Cleanup

```bash
az group delete --name rg-northside-ai --yes --no-wait
```
