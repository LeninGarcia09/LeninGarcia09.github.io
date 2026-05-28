---
sidebar_position: 3
title: "Challenge 03: Standard Mode — Entra Agent ID + RBAC"
---

# Challenge 03: Entra Agent ID + RBAC in Standard Mode

:::info Scenario Brief
**Industry:** Enterprise SaaS | **Regulatory Context:** Zero Trust, NIST AI RMF GOVERN 1.2  
**Time Estimate:** 60 minutes | **Azure Cost:** ~$2–4
:::

---

## What's at Stake

**Contoso Corp** is preparing their AI agent for a SOC 2 Type II audit. The security team's finding:

> *"All 12 agents share a single service principal with Contributor access on the entire subscription. If one agent is compromised, the attacker has write access to all production databases."*

You need to implement **Entra Agent ID** — each agent gets its own managed identity with least-privilege RBAC — before the audit in 6 weeks.

---

## Skills Practiced

- Understanding **Entra Agent ID** (per-agent managed identity)
- Assigning **granular RBAC roles** to individual agents
- Configuring **Standard mode** with BYO Key Vault + Storage
- Auditing agent identity activity in **Azure Monitor**

---

## Architecture Decision

| Approach | Risk | Verdict |
|---------|------|---------|
| Single service principal (shared) | Blast radius = entire subscription | ❌ Reject |
| User-assigned managed identity (shared) | Better, but still shared across agents | ⚠️ Insufficient |
| **Entra Agent ID (per-agent)** | Each agent gets its own identity + RBAC scope | ✅ Required |

---

## Your Tasks

### Task 1: Understand Entra Agent ID

When you create a Hosted Agent in Standard mode, Foundry automatically provisions an **Entra Agent ID** — a system-assigned managed identity tied to that specific agent instance.

```python
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential()
)

# Create the agent — Entra Agent ID is auto-provisioned
agent = client.agents.create_agent(
    model="gpt-4o",
    name="contoso-invoice-processor",
    instructions="Process invoices from Azure Blob Storage. Read only from the invoices container.",
)

print(f"Agent ID: {agent.id}")
print(f"Entra Agent ID (Principal ID): {agent.identity.principal_id}")
print(f"Tenant ID: {agent.identity.tenant_id}")
```

### Task 2: Assign Least-Privilege RBAC

```bash
# Only grant Storage Blob Data Reader on the specific container
# NOT Contributor on the subscription

AGENT_PRINCIPAL_ID=$(az ai agent show \
  --agent-id <agent-id> \
  --project-name contoso-project \
  --query "identity.principalId" -o tsv)

STORAGE_ACCOUNT_ID=$(az storage account show \
  --name stcontosoai \
  --resource-group rg-contoso-ai \
  --query id -o tsv)

# Read-only on invoices container only
az role assignment create \
  --assignee-object-id $AGENT_PRINCIPAL_ID \
  --assignee-principal-type ServicePrincipal \
  --role "Storage Blob Data Reader" \
  --scope "$STORAGE_ACCOUNT_ID/blobServices/default/containers/invoices"

echo "Agent can now read from invoices container only"
```

### Task 3: Verify Identity in Agent Code

```python
# The agent automatically uses its Entra Agent ID when calling Azure services
# No credentials in code — identity is resolved by the Foundry runtime

from azure.storage.blob import BlobServiceClient
from azure.identity import ManagedIdentityCredential

def read_invoice(blob_name: str) -> str:
    """Agent uses its own managed identity — no shared secrets."""
    # ManagedIdentityCredential resolves to the agent's Entra Agent ID at runtime
    credential = ManagedIdentityCredential()
    
    blob_client = BlobServiceClient(
        account_url="https://stcontosoai.blob.core.windows.net",
        credential=credential
    ).get_blob_client(container="invoices", blob=blob_name)
    
    return blob_client.download_blob().readall().decode("utf-8")
```

### Task 4: Audit Agent Identity Activity

```bash
# Query Azure Monitor for agent identity activity
az monitor activity-log list \
  --caller $AGENT_PRINCIPAL_ID \
  --start-time 2025-01-01 \
  --output table \
  --query "[].{Time:eventTimestamp, Operation:operationName.value, Status:status.value, Resource:resourceId}"
```

### Task 5: Implement Access Review

```bash
# List all role assignments for this agent
az role assignment list \
  --assignee $AGENT_PRINCIPAL_ID \
  --all \
  --output table \
  --query "[].{Role:roleDefinitionName, Scope:scope}"
```

---

## Success Criteria

- [ ] Agent created and `identity.principal_id` is populated (not null)
- [ ] Agent's managed identity has `Storage Blob Data Reader` on `invoices` container only — NOT broader scope
- [ ] Agent can successfully read from the `invoices` container
- [ ] Agent cannot write to storage (test: `az storage blob upload` using agent identity should fail with 403)
- [ ] Role assignment audit shows no Contributor or Owner roles

---

## Regulatory Mapping

| Requirement | Regulation | Enforcement |
|-------------|-----------|-------------|
| Least privilege | NIST AI RMF GOVERN 1.2 | Per-agent RBAC scoped to minimum required resources |
| Non-repudiation | SOC 2 CC6.1 | Each action logged under unique agent principal ID |
| Identity separation | Zero Trust principle | Entra Agent ID per agent — no shared identities |
| Access reviews | SOC 2 CC6.3 | Quarterly RBAC audit via `az role assignment list` |

---

<details>
<summary>💡 Hints (try to solve first)</summary>

1. **Entra Agent ID is only available in Standard mode**: In Basic mode, agents share Foundry's system identity. Another reason to always use Standard.
2. **`--assignee-principal-type ServicePrincipal`**: Always specify this flag when assigning roles to managed identities — it avoids unnecessary Azure AD lookups and prevents role assignment errors.
3. **Container-scoped RBAC**: The scope pattern is `{storageAccountId}/blobServices/default/containers/{containerName}`. This is more restrictive than account-level and is what auditors expect.
4. **Test the negative**: Explicitly test that the agent *cannot* write to storage. Security controls are only meaningful if you verify the deny path too.

</details>

---

## Knowledge Check

1. What is the difference between Entra Agent ID and a user-assigned managed identity?
2. Why is per-agent identity isolation important from a security blast radius perspective?
3. What RBAC role would you assign if an agent needs to read from AND write to Azure Cosmos DB?
4. How do you verify that an agent's managed identity was used for a specific storage operation (vs. a human operator)?

---

## Cleanup

```bash
# Remove role assignment first, then delete agent
az role assignment delete --assignee $AGENT_PRINCIPAL_ID --role "Storage Blob Data Reader"
# Delete agent via SDK or portal
```
