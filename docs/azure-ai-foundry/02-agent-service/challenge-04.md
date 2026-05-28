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
