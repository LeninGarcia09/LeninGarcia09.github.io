---
sidebar_position: 1
title: "Challenge 04: Multi-Agent Claims System — Bank Security Review"
---

# Challenge 04: Multi-Agent Claims System That Survives a Bank Security Review

:::info Scenario Brief
**Industry:** Financial Services | **Regulatory Context:** PCI-DSS, EU AI Act Art. 9, FFIEC AI Guidance  
**Time Estimate:** 120 minutes | **Azure Cost:** ~$15–20
:::

---

## What's at Stake

**First Capital Bank** wants to deploy a multi-agent claims processing system — one orchestrator agent that routes claims to three specialist agents (medical, auto, property). Their security team's review found:

> *"We have no visibility into which agent made which decision. Agent-to-agent communication is over the public internet. There is no way to audit a specific claim's processing chain."*

The CISO has 8 questions on their security questionnaire. You have one week to build an architecture that answers all 8.

---

## Skills Practiced

- Designing **multi-agent orchestration** with clear ownership boundaries
- Implementing **private agent-to-agent communication** (no public internet)
- Creating **per-agent Entra Agent IDs** with scoped roles
- Building **end-to-end trace correlation** across agents (single trace ID per claim)
- Documenting the architecture for a security questionnaire

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                  First Capital Bank VNet                        │
│                                                                 │
│  Client App → [Orchestrator Agent]                             │
│                      ↓ (claim routing, via Foundry API)        │
│              ┌───────┴─────────────────────────┐               │
│              ↓               ↓                 ↓               │
│     [Medical Agent]  [Auto Agent]  [Property Agent]            │
│              │               │                 │               │
│              └───────────────┴─────────────────┘               │
│                              ↓                                  │
│                    [Azure Cosmos DB]  (claim records)          │
│                    [Azure Monitor]   (traces)                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧰 Before You Start — Environment Setup

This challenge is a **multi-agent architecture** build that must survive a security review: private agent-to-agent communication, per-agent identity, and one trace ID per claim end to end.

### Prerequisites

| Requirement | Why you need it | How to check |
|-------------|-----------------|--------------|
| **Azure subscription** with Contributor + RBAC rights | Create multiple agents, identities, networking | `az account show` |
| **Azure AI Foundry** Standard mode project | Hosted agents + BYO VNet + Entra Agent ID | Azure portal |
| **Azure Cosmos DB** | Store claim records with an audit trail | `az cosmosdb list -o table` |
| **Azure Monitor / Application Insights** | End-to-end trace correlation across agents | Azure portal |
| A VNet for private agent-to-agent traffic | No agent comms over the public internet | Network Contributor |

### Step 0 — Sign in and lay out the topology (10 min)

Sketch the 1 orchestrator + 3 specialists and the **single trace ID** that must follow a claim through all of them. The architecture diagram above is your target.

```bash
az login
az group create --name rg-claims-multiagent --location eastus
```

✅ **Done when** `az group show -n rg-claims-multiagent` exists and you have a diagram showing where the trace ID is created (orchestrator) and where it's read (every specialist + Cosmos).

### Step 1 — Provision the backbone, then answer the CISO's 8 questions (15 min) — *the "where do I go"*

Stand up the three shared resources every task depends on, then map each CISO question to the control that answers it. Where to click:

1. **Standard-mode Foundry project** (enables per-agent identity + private networking) in **[ai.azure.com](https://ai.azure.com)** → **Create project → Advanced options** ([agent identity concepts](https://learn.microsoft.com/azure/foundry/agents/concepts/agent-identity)).
2. **Per-agent Entra Agent ID** for the orchestrator + 3 specialists ([Entra Agent ID guided setup](https://learn.microsoft.com/entra/agent-id/agent-id-ai-guided-setup)).
3. **Azure Cosmos DB** for claim records with the trace ID as a field — create via the [portal quickstart](https://learn.microsoft.com/azure/cosmos-db/nosql/quickstart-portal).

Now answer the security questionnaire **on paper first** — each answer maps to a concrete control (private networking, Entra Agent ID, Cosmos audit, correlated tracing). Build to the questions.

✅ **Done when** you have a Standard-mode project, four agent identities visible in Entra, a Cosmos container, and a one-line answer + Azure control for each of the 8 questions.

> 🟦 **Microsoft-first note:** the entire architecture is Azure-native — **Azure AI Foundry** hosted agents, **Microsoft Entra Agent ID** per agent, private **VNet** agent-to-agent comms, **Azure Cosmos DB** for claim records, and **Azure Monitor** for correlated traces. Multi-agent workflows use the **Foundry Agent Service** connected-agents model.

> **Common fixes:** no per-agent identity → project isn't Standard mode. Trace IDs don't correlate across agents → you're generating a new ID per agent instead of **propagating the orchestrator's** one ID (fix in Task 4).

### The path through this challenge

1. **Task 1** — build the orchestrator + 3 specialist agents.
2. **Task 2** — give each a scoped Entra Agent ID.
3. **Task 3** — force agent-to-agent traffic through the VNet.
4. **Task 4** — correlate one trace ID per claim in Azure Monitor.
5. **Success Criteria** — answer all 8 CISO questions with evidence.
6. **Adapt to Your Business** — apply the pattern to *your* multi-agent flow.

> ⏱️ **Time budget:** ~120 minutes. Trace correlation (Task 4) is what makes the system auditable — it's the hardest and most important part.

---

## Your Tasks

### Task 1: Create the Orchestrator and Specialist Agents

```python
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential()
)

# Create specialist agents
medical_agent = client.agents.create_agent(
    model="gpt-4o",
    name="medical-claims-specialist",
    instructions="""You process medical insurance claims. 
    Validate ICD-10 codes, verify coverage against the member's policy, 
    and return: {approved: bool, amount: float, reason: str, icd10_validated: bool}
    Never approve claims exceeding $50,000 without flagging for human review.""",
)

auto_agent = client.agents.create_agent(
    model="gpt-4o",
    name="auto-claims-specialist", 
    instructions="""You process auto insurance claims.
    Validate repair estimates, check coverage type (collision/comprehensive/liability).
    Return: {approved: bool, amount: float, reason: str, requires_inspection: bool}""",
)

property_agent = client.agents.create_agent(
    model="gpt-4o",
    name="property-claims-specialist",
    instructions="""You process property insurance claims.
    Validate damage assessments, check policy limits and deductibles.
    Return: {approved: bool, amount: float, reason: str, adjuster_required: bool}""",
)

# Create orchestrator
orchestrator = client.agents.create_agent(
    model="gpt-4o",
    name="claims-orchestrator",
    instructions=f"""You are the claims processing orchestrator for First Capital Bank.
    Route incoming claims to the appropriate specialist:
    - Medical claims (ICD codes present) → agent ID: {medical_agent.id}
    - Auto claims (vehicle damage) → agent ID: {auto_agent.id}
    - Property claims (home/commercial) → agent ID: {property_agent.id}
    
    Always include the original claim ID in your routing decision for audit trail.""",
)

print(f"Orchestrator: {orchestrator.id} | Identity: {orchestrator.identity.principal_id}")
print(f"Medical: {medical_agent.id} | Identity: {medical_agent.identity.principal_id}")
print(f"Auto: {auto_agent.id} | Identity: {auto_agent.identity.principal_id}")
print(f"Property: {property_agent.id} | Identity: {property_agent.identity.principal_id}")
```

### Task 2: Implement Correlated Tracing (End-to-End Claim Audit)

```python
import uuid
from opentelemetry import trace
from opentelemetry.propagate import inject, extract

def process_claim(claim: dict) -> dict:
    """Process a claim with full trace correlation across all agents."""
    claim_id = claim.get("claim_id", str(uuid.uuid4()))
    tracer = trace.get_tracer(__name__)
    
    with tracer.start_as_current_span(f"claim-processing-{claim_id}") as root_span:
        root_span.set_attribute("claim.id", claim_id)
        root_span.set_attribute("claim.type", claim.get("type"))
        root_span.set_attribute("claim.amount_requested", claim.get("amount"))
        root_span.set_attribute("customer.id", claim.get("customer_id"))
        
        # Orchestrator routing decision
        with tracer.start_as_current_span("orchestrator-routing") as routing_span:
            routing_span.set_attribute("agent.id", orchestrator.id)
            routing_span.set_attribute("agent.name", "claims-orchestrator")
            
            thread = client.agents.threads.create()
            client.agents.messages.create(
                thread_id=thread.id,
                role="user",
                content=f"Process claim {claim_id}: {claim}"
            )
            run = client.agents.runs.create_and_process(
                thread_id=thread.id,
                agent_id=orchestrator.id
            )
            routing_span.set_attribute("run.status", run.status)
        
        return {"claim_id": claim_id, "trace_id": format(root_span.get_span_context().trace_id, "032x")}
```

### Task 3: Answer the CISO's Security Questionnaire

Based on the architecture you've built, document answers to these 8 questions:

```markdown
## First Capital Bank AI Security Questionnaire

1. **How are agent identities managed?**
   Each agent has a dedicated Entra Agent ID (managed identity). No shared secrets or service principals.
   Agent IDs: [list principal IDs from Task 1 output]

2. **How is agent-to-agent communication secured?**
   All communication traverses the Foundry private endpoint inside the bank's VNet.
   Public network access is disabled on the Foundry account (Standard mode).

3. **How are decisions auditable to a specific claim?**
   Every claim processing chain is correlated with a single OpenTelemetry trace ID.
   Trace ID is stored in Cosmos DB alongside the claim decision.

4. **What prevents an agent from accessing another customer's data?**
   Orchestrator passes claim ID; specialist agents are scoped to read only the current thread context.
   Cosmos DB access is via RBAC with agent principal ID — no cross-account queries possible.

5. **How are high-value claims handled?**
   Medical agent flags claims > $50,000 for human review before approval.
   Human-in-the-loop is implemented via Azure Logic Apps escalation workflow.

6. **What happens if an agent fails mid-processing?**
   Thread state is persisted in Foundry. Orchestrator can resume or re-route.
   Failed runs are logged with full context for support team investigation.

7. **How is the AI model itself controlled?**
   Models deployed in customer-owned Foundry account (Standard mode).
   No data sent to external providers — all inference within Azure boundary.

8. **How is this system classified under EU AI Act?**
   Insurance claims processing = High-Risk AI system under Annex III, Section 5(b).
   Compliance: human oversight (Art. 14), technical documentation (Art. 11), 
   registration in EU AI database (Art. 51) required before August 2026.
```

---

## Success Criteria

- [ ] Four agents created (1 orchestrator + 3 specialists) each with unique Entra Agent IDs
- [ ] A test claim is routed correctly to the appropriate specialist agent
- [ ] End-to-end trace visible in Azure Monitor with claim ID correlation
- [ ] CISO questionnaire completed with specific technical details
- [ ] Role assignments documented: each agent has minimum required permissions only

---

## 🔁 Adapt This to Your Own Business

The scenario is a **bank claims system**, but *any* multi-agent workflow faces the same three questions from security: who did what, was communication private, and can you audit a single transaction end to end? The pattern is the same across industries.

### Step 1 — Find your multi-agent workflow

| Industry | The orchestrator + specialists | What must be auditable |
|----------|-------------------------------|------------------------|
| **Financial services** | Claim router → medical/auto/property | Every routing + decision |
| **Healthcare** | Intake → triage/coding/billing agents | Each PHI access |
| **Supply chain** | Order agent → sourcing/logistics/finance | Each cross-system action |
| **Customer service** | Router → billing/tech/retention agents | The full case chain |
| **Legal** | Matter agent → research/drafting/review | Each document touch |

### Step 2 — Map the building blocks to your stack (Microsoft-first)

| In this challenge | In your project — use |
|-------------------|-----------------------|
| Orchestrator + specialists | **Azure AI Foundry Agent Service** connected agents / multi-agent workflow |
| Per-agent identity | **Microsoft Entra Agent ID** with scoped RBAC |
| Private agent-to-agent comms | **BYO VNet** + private endpoints (no public egress) |
| Transaction records | **Azure Cosmos DB** (append-friendly, per-claim) |
| End-to-end trace correlation | **Azure Monitor** + **Application Insights** (one trace ID) |

### Step 3 — The 5-question implementation checklist

1. **Can you tell which agent made which decision?** If not → add per-agent identity + correlated tracing.
2. **Is agent-to-agent traffic on the public internet?** If yes → move it inside a VNet.
3. **Does one trace ID follow a transaction across all agents?** If not → propagate a correlation ID.
4. **Does each agent have only the permissions it needs?** If not → scope Entra Agent IDs.
5. **Can you replay a single transaction's full chain?** If not → persist it in Cosmos DB with the trace ID.

### Step 4 — A 1-week rollout plan

| Day | Action | Owner |
|-----|--------|-------|
| **Day 1** | Map the orchestrator + specialists and the trace-ID flow | Architect |
| **Day 2** | Build the agents in Foundry Agent Service | Backend dev |
| **Day 3** | Assign per-agent Entra Agent IDs; force VNet comms | Cloud + security |
| **Day 4** | Persist records in Cosmos DB with correlation IDs | Backend dev |
| **Day 5** | Wire end-to-end tracing; answer the security questionnaire | SRE + security |

### Step 5 — Prove the ROI

- **Decision attribution** — % of agent decisions traceable to a specific agent identity *(target: 100%)*.
- **Private comms** — % of agent-to-agent traffic off the public internet *(target: 100%)*.
- **Auditability** — time to reconstruct one transaction's full chain *(target: minutes)*.

> 💡 **Rule of thumb:** a multi-agent system a security team can't audit will never reach production. Design the trace ID and the per-agent identities first — the intelligence is the easy part.

### Doing this solo (no team, portfolio-first)

No team, no budget? One trace ID stitched across several agents is a screenshot that instantly signals production maturity. Run the week solo:

- **Mon–Tue** — build an orchestrator + two specialist agents in Foundry Agent Service.
- **Wed–Thu** — give each a per-agent identity, propagate one correlation/trace ID, and persist records in Cosmos DB (free tier).
- **Fri** — replay one transaction end to end from its trace ID.

📦 **Ship this artifact:** a repo + a single screenshot showing one trace ID stitched across all three agents. Resume bullet: *"Built an auditable multi-agent workflow — 100% of decisions attributable per-agent, any transaction reconstructable end-to-end in minutes."*

> 🆓 **Free-tier path:** Cosmos DB free tier + Application Insights sampling keep this inside a free account.

---

## Regulatory Mapping

| Requirement | Regulation | Implementation |
|-------------|-----------|----------------|
| Human oversight for high-value decisions | EU AI Act Art. 14 | Flag claims > $50K for human review |
| Auditability of AI decisions | EU AI Act Art. 12, PCI-DSS 10.x | Correlated traces per claim in Azure Monitor |
| Data minimization | GDPR Art. 5(1)(c) | Agents receive only claim-specific context |
| High-risk AI classification | EU AI Act Annex III, Section 5(b) | Documented, registered before deployment |

---

<details>
<summary>💡 Hints</summary>

1. **Agent-to-agent calls in Foundry**: The orchestrator doesn't call other agents directly via HTTP — it works through Foundry's thread model. The orchestrator produces a routing decision, and the calling application invokes the correct specialist agent.
2. **Trace correlation**: Use the same `trace_id` from the root span as your `correlation_id` stored in Cosmos DB. This links your application logs to the Azure Monitor traces.
3. **EU AI Act High-Risk**: Insurance claims scoring/decisioning is explicitly listed in Annex III. This means the bank must register the system in the EU AI database before deploying to EU customers.

</details>

---

## Knowledge Check

1. Why does each agent need its own Entra Agent ID rather than sharing one identity?
2. How does OpenTelemetry trace correlation help answer the CISO's auditability requirement?
3. Under EU AI Act Annex III, why is insurance claims processing considered High-Risk AI?
4. What is the difference between agent thread state and agent identity?

---

## Cleanup

```bash
# Delete all agents (use SDK or portal)
for agent_id in orchestrator.id medical_agent.id auto_agent.id property_agent.id:
    client.agents.delete_agent(agent_id)
```
