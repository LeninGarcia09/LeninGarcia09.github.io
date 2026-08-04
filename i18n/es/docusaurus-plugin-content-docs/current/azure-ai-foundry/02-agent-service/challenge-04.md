---
sidebar_position: 1
title: "Desafío 04: Sistema de reclamos Multi-Agent — Revisión de seguridad bancaria"
---

# Desafío 04: Sistema de reclamos Multi-Agent que supera una revisión de seguridad bancaria

:::info[Resumen del escenario]
**Industria:** Servicios financieros | **Contexto regulatorio:** PCI-DSS, EU AI Act Art. 9, FFIEC AI Guidance  
**Tiempo estimado:** 120 minutos | **Costo de Azure:** ~$15–20
:::

---

## Qué está en juego

**First Capital Bank** quiere implementar un sistema multi-agent de procesamiento de reclamos — un agente orquestador que enruta reclamos a tres agentes especialistas (médico, auto, propiedad). La revisión del equipo de seguridad encontró:

> *"No tenemos visibilidad de qué agente tomó qué decisión. La comunicación entre agentes pasa por Internet público. No hay forma de auditar la cadena de procesamiento de un reclamo específico."*

El CISO tiene 8 preguntas en su cuestionario de seguridad. Tienes una semana para construir una arquitectura que responda las 8.

---

## Habilidades practicadas

- Diseñar **orquestación multi-agent** con límites claros de propiedad
- Implementar **comunicación privada entre agentes** (sin Internet público)
- Crear **Entra Agent IDs por agente** con roles acotados
- Construir **correlación de trazas de extremo a extremo** entre agentes (un trace ID por reclamo)
- Documentar la arquitectura para un cuestionario de seguridad

---

## Arquitectura

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

## 🧰 Antes de empezar — Configuración del entorno

Este desafío es una construcción de **arquitectura multi-agent** que debe superar una revisión de seguridad: comunicación privada entre agentes, identidad por agente y un trace ID por reclamo de extremo a extremo.

### Prerrequisitos

| Requisito | Por qué lo necesitas | Cómo verificar |
|-------------|-----------------|--------------|
| **Suscripción de Azure** con Contributor + derechos RBAC | Crear múltiples agentes, identidades, redes | `az account show` |
| Proyecto **Azure AI Foundry** en modo Standard | Hosted agents + BYO VNet + Entra Agent ID | Azure portal |
| **Azure Cosmos DB** | Almacenar registros de reclamos con pista de auditoría | `az cosmosdb list -o table` |
| **Azure Monitor / Application Insights** | Correlación de trazas de extremo a extremo entre agentes | Azure portal |
| Una VNet para tráfico privado entre agentes | Sin comunicaciones de agentes por Internet público | Network Contributor |

### Paso 0 — Inicia sesión y define la topología (10 min)

Dibuja el orquestador + 3 especialistas y el **trace ID único** que debe acompañar un reclamo a través de todos ellos. El diagrama de arquitectura anterior es tu objetivo.

**Dónde ejecutas esto:** en una terminal con **Azure CLI** autenticado — a diferencia de los desafíos locales de Python, estos comandos `az` se ejecutan contra **recursos reales en tu suscripción de Azure**.

```bash
az login
az group create --name rg-claims-multiagent --location eastus
```

✅ **Listo cuando** `az group show -n rg-claims-multiagent` exista y tengas un diagrama que muestre dónde se crea el trace ID (orquestador) y dónde se lee (cada especialista + Cosmos).

### Paso 1 — Aprovisiona la columna vertebral y responde las 8 preguntas del CISO (15 min) — *el "a dónde voy"*

Levanta los tres recursos compartidos de los que depende cada tarea y luego mapea cada pregunta del CISO al control que la responde. Dónde hacer clic:

1. **Proyecto Foundry en modo Standard** (habilita identidad por agente + redes privadas) en **[ai.azure.com](https://ai.azure.com)** → **Create project → Advanced options** ([agent identity concepts](https://learn.microsoft.com/azure/foundry/agents/concepts/agent-identity)).
2. **Entra Agent ID por agente** para el orquestador + 3 especialistas ([Entra Agent ID guided setup](https://learn.microsoft.com/entra/agent-id/agent-id-ai-guided-setup)).
3. **Azure Cosmos DB** para registros de reclamos con el trace ID como campo — créalo con el [portal quickstart](https://learn.microsoft.com/azure/cosmos-db/nosql/quickstart-portal).

Ahora responde el cuestionario de seguridad **primero en papel** — cada respuesta se mapea a un control concreto (redes privadas, Entra Agent ID, auditoría en Cosmos, trazas correlacionadas). Construye contra las preguntas.

✅ **Listo cuando** tengas un proyecto en modo Standard, cuatro identidades de agente visibles en Entra, un contenedor de Cosmos y una respuesta de una línea + control de Azure para cada una de las 8 preguntas.

> 🟦 **Nota Microsoft-first:** toda la arquitectura es nativa de Azure — agentes hospedados de **Azure AI Foundry**, **Microsoft Entra Agent ID** por agente, comunicaciones privadas agente-a-agente en **VNet**, **Azure Cosmos DB** para registros de reclamos y **Azure Monitor** para trazas correlacionadas. Los flujos multi-agent usan el modelo de agentes conectados de **Foundry Agent Service**.

> **Correcciones comunes:** sin identidad por agente → el proyecto no está en modo Standard. Los trace IDs no correlacionan entre agentes → estás generando un ID nuevo por agente en vez de **propagar el del orquestador** (corrige en la Tarea 4).

### El recorrido por este desafío

1. **Tarea 1** — construir el orquestador + 3 agentes especialistas.
2. **Tarea 2** — dar a cada uno un Entra Agent ID acotado.
3. **Tarea 3** — forzar el tráfico agente-a-agente a través de la VNet.
4. **Tarea 4** — correlacionar un trace ID por reclamo en Azure Monitor.
5. **Criterios de éxito** — responder las 8 preguntas del CISO con evidencia.
6. **Adáptalo a tu negocio** — aplicar el patrón a *tu* flujo multi-agent.

> ⏱️ **Presupuesto de tiempo:** ~120 minutos. La correlación de trazas (Tarea 4) hace que el sistema sea auditable — es la parte más difícil e importante.

---

## Tus tareas

### Tarea 1: Crear el orquestador y los agentes especialistas

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

### Tarea 2: Implementar trazas correlacionadas (auditoría de reclamo de extremo a extremo)

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

### Tarea 3: Responder el cuestionario de seguridad del CISO

Con base en la arquitectura que construiste, documenta respuestas a estas 8 preguntas:

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

## Criterios de éxito

- [ ] Cuatro agentes creados (1 orquestador + 3 especialistas), cada uno con Entra Agent IDs únicos
- [ ] Un reclamo de prueba se enruta correctamente al agente especialista adecuado
- [ ] Traza de extremo a extremo visible en Azure Monitor con correlación de claim ID
- [ ] Cuestionario del CISO completado con detalles técnicos específicos
- [ ] Asignaciones de rol documentadas: cada agente tiene solo los permisos mínimos requeridos

---

## 🔁 Adáptalo a tu propio negocio

El escenario es un **sistema de reclamos bancarios**, pero *cualquier* flujo multi-agent enfrenta las mismas tres preguntas de seguridad: quién hizo qué, si la comunicación fue privada y si puedes auditar una transacción completa de extremo a extremo. El patrón es el mismo en todas las industrias.

### Paso 1 — Encuentra tu flujo multi-agent

| Industria | Orquestador + especialistas | Qué debe ser auditable |
|----------|-------------------------------|------------------------|
| **Servicios financieros** | Enrutador de reclamos → médico/auto/propiedad | Cada enrutamiento + decisión |
| **Salud** | Ingreso → agentes de triaje/codificación/facturación | Cada acceso a PHI |
| **Cadena de suministro** | Agente de pedidos → abastecimiento/logística/finanzas | Cada acción entre sistemas |
| **Atención al cliente** | Enrutador → agentes de facturación/técnico/retención | La cadena completa del caso |
| **Legal** | Agente de asunto → investigación/redacción/revisión | Cada toque de documento |

### Paso 2 — Mapea los bloques de construcción a tu stack (Microsoft-first)

| En este desafío | En tu proyecto — usa |
|-------------------|-----------------------|
| Orquestador + especialistas | Agentes conectados / flujo multi-agent de **Azure AI Foundry Agent Service** |
| Identidad por agente | **Microsoft Entra Agent ID** con RBAC acotado |
| Comunicaciones privadas entre agentes | **BYO VNet** + endpoints privados (sin egreso público) |
| Registros de transacciones | **Azure Cosmos DB** (amigable para anexos, por reclamo) |
| Correlación de trazas extremo a extremo | **Azure Monitor** + **Application Insights** (un trace ID) |

### Paso 3 — Checklist de implementación de 5 preguntas

1. **¿Puedes saber qué agente tomó qué decisión?** Si no → agrega identidad por agente + trazas correlacionadas.
2. **¿El tráfico agente-a-agente está en Internet público?** Si sí → muévelo dentro de una VNet.
3. **¿Un trace ID sigue una transacción por todos los agentes?** Si no → propaga un ID de correlación.
4. **¿Cada agente tiene solo los permisos que necesita?** Si no → acota los Entra Agent IDs.
5. **¿Puedes reproducir la cadena completa de una sola transacción?** Si no → persístela en Cosmos DB con el trace ID.

### Paso 4 — Plan de despliegue de 1 semana

| Día | Acción | Propietario |
|-----|--------|-------|
| **Día 1** | Mapear el orquestador + especialistas y el flujo del trace ID | Arquitecto |
| **Día 2** | Construir los agentes en Foundry Agent Service | Desarrollador backend |
| **Día 3** | Asignar Entra Agent IDs por agente; forzar comunicaciones VNet | Cloud + seguridad |
| **Día 4** | Persistir registros en Cosmos DB con IDs de correlación | Desarrollador backend |
| **Día 5** | Conectar trazas de extremo a extremo; responder el cuestionario de seguridad | SRE + seguridad |

### Paso 5 — Demuestra el ROI

- **Atribución de decisiones** — % de decisiones de agentes trazables a una identidad específica de agente *(objetivo: 100%)*.
- **Comunicaciones privadas** — % del tráfico agente-a-agente fuera de Internet público *(objetivo: 100%)*.
- **Auditabilidad** — tiempo para reconstruir la cadena completa de una transacción *(objetivo: minutos)*.

> 💡 **Regla práctica:** un sistema multi-agent que seguridad no puede auditar nunca llegará a producción. Diseña primero el trace ID y las identidades por agente — la inteligencia es la parte fácil.

### Hacerlo en solitario (sin equipo, orientado a portafolio)

¿Sin equipo ni presupuesto? Un trace ID cosido entre varios agentes es una captura que comunica madurez de producción al instante. Ejecuta la semana en solitario:

- **Lun–Mar** — construye un orquestador + dos agentes especialistas en Foundry Agent Service.
- **Mié–Jue** — da a cada uno una identidad por agente, propaga un ID de correlación/trace y persiste registros en Cosmos DB (nivel gratuito).
- **Vie** — reproduce una transacción de extremo a extremo a partir de su trace ID.

📦 **Entrega este artefacto:** un repo + una sola captura que muestre un trace ID cosido entre los tres agentes. Bullet para CV: *"Construí un flujo multi-agent auditable — 100% de decisiones atribuibles por agente, cualquier transacción reconstruible de extremo a extremo en minutos."*

> 🆓 **Ruta free-tier:** el nivel gratuito de Cosmos DB + muestreo de Application Insights mantienen esto dentro de una cuenta gratuita.

---

<details>
<summary>📋 <strong>Mapeo regulatorio</strong> — EU AI Act · GDPR · PCI-DSS</summary>

| Requisito | Regulación | Implementación |
|-------------|-----------|----------------|
| Supervisión humana para decisiones de alto valor | EU AI Act Art. 14 | Marcar reclamos > $50K para revisión humana |
| Auditabilidad de decisiones de IA | EU AI Act Art. 12, PCI-DSS 10.x | Trazas correlacionadas por reclamo en Azure Monitor |
| Minimización de datos | GDPR Art. 5(1)(c) | Los agentes reciben solo contexto específico del reclamo |
| Clasificación de IA de alto riesgo | EU AI Act Annex III, Section 5(b) | Documentado, registrado antes del despliegue |

</details>

---

<details>
<summary>💡 Pistas</summary>

1. **Llamadas agente-a-agente en Foundry**: El orquestador no llama a otros agentes directamente por HTTP — trabaja mediante el modelo de threads de Foundry. El orquestador produce una decisión de enrutamiento y la aplicación invocadora llama al agente especialista correcto.
2. **Correlación de trazas**: Usa el mismo `trace_id` del span raíz como tu `correlation_id` almacenado en Cosmos DB. Esto vincula los logs de la aplicación con las trazas de Azure Monitor.
3. **EU AI Act High-Risk**: La puntuación/toma de decisiones de reclamos de seguros está explícitamente listada en Annex III. Esto significa que el banco debe registrar el sistema en la base de datos de IA de la UE antes de desplegarlo a clientes de la UE.

</details>

---

## Comprobación de conocimientos

1. ¿Por qué cada agente necesita su propio Entra Agent ID en lugar de compartir una identidad?
2. ¿Cómo ayuda la correlación de trazas de OpenTelemetry a responder el requisito de auditabilidad del CISO?
3. Bajo EU AI Act Annex III, ¿por qué el procesamiento de reclamos de seguros se considera High-Risk AI?
4. ¿Cuál es la diferencia entre el estado del thread del agente y la identidad del agente?

---

## Limpieza

```bash
# Delete all agents (use SDK or portal)
for agent_id in orchestrator.id medical_agent.id auto_agent.id property_agent.id:
    client.agents.delete_agent(agent_id)
```
