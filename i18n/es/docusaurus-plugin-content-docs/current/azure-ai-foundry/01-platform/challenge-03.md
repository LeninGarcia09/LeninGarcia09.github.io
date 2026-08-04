---
sidebar_position: 3
title: "Desafío 03: Modo Standard — Entra Agent ID + RBAC"
---

# Desafío 03: Entra Agent ID + RBAC en modo Standard

:::info[Resumen del escenario]
**Industria:** SaaS empresarial | **Contexto regulatorio:** Zero Trust, NIST AI RMF GOVERN 1.2  
**Tiempo estimado:** 60 minutos | **Costo de Azure:** ~$2–4
:::

---

## Qué está en juego

**Contoso Corp** prepara su agente de IA para una auditoría SOC 2 Type II. El hallazgo del equipo de seguridad:

> *"Los 12 agentes comparten un único service principal con acceso Contributor sobre toda la suscripción. Si un agente se ve comprometido, el atacante tiene acceso de escritura a todas las bases de datos de producción."*

Debes implementar **Entra Agent ID** — cada agente obtiene su propia identidad administrada con RBAC de privilegio mínimo — antes de la auditoría en 6 semanas.

---

## Habilidades practicadas

- Comprender **Entra Agent ID** (identidad administrada por agente)
- Asignar **roles RBAC granulares** a agentes individuales
- Configurar **modo Standard** con Key Vault + Storage BYO
- Auditar actividad de identidad de agentes en **Azure Monitor**

---

## Decisión de arquitectura

| Enfoque | Riesgo | Veredicto |
|---------|------|---------|
| Service principal único (compartido) | Radio de impacto = toda la suscripción | ❌ Rechazar |
| Identidad administrada asignada por el usuario (compartida) | Mejor, pero aún compartida entre agentes | ⚠️ Insuficiente |
| **Entra Agent ID (por agente)** | Cada agente obtiene su propia identidad + alcance RBAC | ✅ Requerido |

---

## 🧰 Antes de empezar — Configuración del entorno

Este desafío es una construcción de **identidad con privilegio mínimo**: reemplazar un principal compartido con exceso de privilegios por identidades administradas por agente, limitadas exactamente a lo que cada agente necesita.

### Prerrequisitos

| Requisito | Por qué lo necesitas | Cómo verificar |
|-------------|-----------------|--------------|
| **Suscripción de Azure** + capacidad para asignar RBAC | Crear identidades y acotar roles | `az account show` |
| **Azure CLI** | Aprovisionar agentes, inspeccionar asignaciones de rol | `az version` |
| Derechos de **Microsoft Entra** para administrar identidades | Entra Agent ID = identidad administrada por agente | Centro de administración de Entra |
| Proyecto **Azure AI Foundry** en modo Standard | El modo Standard habilita BYO + identidad por agente | Azure portal |
| Un recurso de datos acotado (p. ej., un contenedor de storage) | Dónde conceder un rol estrecho y probar la denegación | `az storage account list` |

### Paso 0 — Inicia sesión y revisa la exposición actual (5 min)

**Dónde ejecutas esto:** en una terminal con **Azure CLI** autenticado — a diferencia de los desafíos locales de Python, estos comandos `az` se ejecutan contra **recursos reales en tu suscripción de Azure**.

```bash
az login
# See how broad your current agent principal is — this is the problem you're fixing:
az role assignment list --assignee <current-sp-id> -o table
```

✅ **Listo cuando** la lista se imprima — anota cualquier rol amplio (p. ej., `Contributor`, `Storage Blob Data Contributor` a nivel de suscripción). Esa amplitud es tu radio de impacto.

### Paso 1 — Decide el mapa de privilegio mínimo y habilita Entra Agent ID (10 min) — *el "a dónde voy"*

Primero, escribe **cada agente → el único rol más estrecho que necesita** (p. ej., `Storage Blob Data Reader` en *un* contenedor). El privilegio mínimo es una decisión de diseño, no un ajuste posterior:

| Agente | Recurso | Rol más estrecho |
|-------|----------|----------------|
| Agente lector | `container-reports` | Storage Blob Data **Reader** |
| Agente escritor | `container-drafts` | Storage Blob Data **Contributor** |

Luego habilita identidad por agente. **Entra Agent ID** da a cada agente su propia identidad administrada automáticamente cuando el proyecto se ejecuta en **modo Standard**:

1. En **[ai.azure.com](https://ai.azure.com)**, confirma que tu proyecto está en **modo Standard** (basado en hub) — consulta [agent identity concepts](https://learn.microsoft.com/azure/foundry/agents/concepts/agent-identity).
2. Sigue la [Entra Agent ID guided setup](https://learn.microsoft.com/entra/agent-id/agent-id-ai-guided-setup) para ver la identidad de cada agente en el centro de administración de Entra.
3. Asigna a cada identidad **solo** su fila de la tabla anterior con `az role assignment create --scope <resource-id> --role "<role>" --assignee <agent-identity-id>`.

✅ **Listo cuando** cada identidad de agente aparezca en Entra **y** `az role assignment list --assignee <agent-id> -o table` muestre exactamente un rol de alcance estrecho.

> 🟦 **Nota Microsoft-first:** este es un ejercicio puro de identidad Microsoft — **Microsoft Entra Agent ID**, roles con alcance de **Azure RBAC**, **BYO Key Vault + Storage** y **Azure Monitor** para auditoría de identidad. No participa IAM de terceros.

> **Correcciones comunes:** sin identidad por agente → el proyecto no está en modo Standard. `AuthorizationFailed` al asignar roles → necesitas **Owner** o **User Access Administrator** en el alcance del recurso objetivo.

### El recorrido por este desafío

1. **Tarea 1** — habilitar modo Standard con Key Vault + Storage BYO.
2. **Tarea 2** — dar a cada agente su propio Entra Agent ID.
3. **Tarea 3** — asignar el rol RBAC más estrecho por agente.
4. **Tarea 4** — auditar actividad de identidad en Azure Monitor.
5. **Criterios de éxito** — demostrar que un agente puede leer pero *no* escribir (403).
6. **Adáptalo a tu negocio** — aplicar identidad por agente a *tu* flota.

> ⏱️ **Presupuesto de tiempo:** ~60 minutos. La prueba de denegación de escritura 403 (Criterios de éxito) demuestra que el privilegio mínimo realmente se cumple.

---

## Tus tareas

### Tarea 1: Comprender Entra Agent ID

Cuando creas un Hosted Agent en modo Standard, Foundry aprovisiona automáticamente un **Entra Agent ID** — una identidad administrada asignada por el sistema vinculada a esa instancia específica de agente.

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

### Tarea 2: Asignar RBAC de privilegio mínimo

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

### Tarea 3: Verificar la identidad en el código del agente

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

### Tarea 4: Auditar actividad de identidad del agente

```bash
# Query Azure Monitor for agent identity activity
az monitor activity-log list \
  --caller $AGENT_PRINCIPAL_ID \
  --start-time 2025-01-01 \
  --output table \
  --query "[].{Time:eventTimestamp, Operation:operationName.value, Status:status.value, Resource:resourceId}"
```

### Tarea 5: Implementar revisión de acceso

```bash
# List all role assignments for this agent
az role assignment list \
  --assignee $AGENT_PRINCIPAL_ID \
  --all \
  --output table \
  --query "[].{Role:roleDefinitionName, Scope:scope}"
```

---

## Criterios de éxito

- [ ] Agente creado y `identity.principal_id` poblado (no null)
- [ ] La identidad administrada del agente tiene `Storage Blob Data Reader` solo en el contenedor `invoices` — NO un alcance más amplio
- [ ] El agente puede leer correctamente desde el contenedor `invoices`
- [ ] El agente no puede escribir en storage (prueba: `az storage blob upload` usando la identidad del agente debe fallar con 403)
- [ ] La auditoría de asignaciones de rol no muestra roles Contributor u Owner

---

## 🔁 Adáptalo a tu propio negocio

El escenario es una **auditoría SOC 2**, pero *cualquier* organización que ejecuta múltiples agentes sobre una identidad compartida con exceso de privilegios tiene el mismo problema de radio de impacto. Identidad por agente + RBAC de privilegio mínimo es una línea base de Zero Trust en cualquier entorno.

### Paso 1 — Encuentra el radio de impacto de tu identidad compartida

| Tipo de organización | Riesgo de identidad compartida | Qué alcanza una compromisión |
|-------------------|--------------------------|---------------------------|
| **SaaS empresarial** | Un SP para todos los agentes/servicios | Toda base de datos de producción |
| **Servicios financieros** | Identidad de automatización compartida | Sistemas de pagos + clientes |
| **Salud** | App registration amplia | Todos los almacenes PHI |
| **Retail** | Principal de integración compartido | Pedidos, pagos, inventario |
| **Cualquier org regulada** | Contributor/Owner en la suscripción | Todo, con una sola filtración |

### Paso 2 — Mapea los bloques de construcción a tu stack (Microsoft-first)

| En este desafío | En tu proyecto — usa |
|-------------------|-----------------------|
| Identidad por agente | **Microsoft Entra Agent ID** (identidad administrada por agente) |
| Permisos estrechos | Roles de **Azure RBAC** acotados a un solo recurso |
| Aislamiento de secretos/storage | **BYO Key Vault + Storage** en modo Standard |
| Auditoría de identidad | **Azure Monitor** + **registros de inicio de sesión / auditoría de Entra** |
| Aplicación de políticas | **Azure Policy** para prohibir Owner/Contributor en agentes |

### Paso 3 — Checklist de implementación de 5 preguntas

1. **¿Varios agentes comparten una identidad?** Si sí → ese es tu radio de impacto; sepáralos.
2. **¿Algún agente tiene Contributor/Owner?** Si sí → reemplázalo por un rol de plano de datos acotado a un recurso.
3. **¿El rol está acotado a un recurso, no a la suscripción?** Reduce el alcance al contenedor/base de datos.
4. **¿Puedes demostrar que un agente recibe denegación fuera de alcance?** Un 403 en escritura es tu evidencia.
5. **¿Se auditan las acciones de identidad?** Si no → envía logs de Entra + recursos a Azure Monitor.

### Paso 4 — Plan de despliegue de 1 semana

| Día | Acción | Propietario |
|-----|--------|-------|
| **Día 1** | Inventariar cada agente y sus permisos actuales | Seguridad |
| **Día 2** | Mapear cada agente a su único rol de privilegio mínimo | Seguridad + ingeniería |
| **Día 3** | Crear Entra Agent IDs por agente | Ingeniería cloud |
| **Día 4** | Asignar RBAC acotado; ejecutar la prueba de denegación 403 | Ingeniería cloud |
| **Día 5** | Conectar logs de auditoría de identidad; agregar una guardia de Azure Policy | SRE + gobernanza |

### Paso 5 — Demuestra el ROI

- **Reducción de radio de impacto** — máximo de recursos alcanzables por una identidad *(objetivo: 1 alcance)*.
- **Conteo de exceso de privilegios** — agentes con Owner/Contributor *(objetivo: 0)*.
- **Verificación de denegación** — acciones fuera de alcance devuelven 403 *(objetivo: 100%)*.

> 💡 **Regla práctica:** si una credencial filtrada puede alcanzar todo, no tienes un problema de seguridad de agentes — tienes un problema de arquitectura de identidad. Una identidad por agente, un rol estrecho para cada uno.

### Hacerlo en solitario (sin equipo, orientado a portafolio)

¿Sin equipo ni presupuesto? La identidad de agentes con privilegio mínimo es criterio puro de Zero Trust — y Entra + RBAC no cuestan nada para demostrar. Ejecuta la semana en solitario:

- **Lun–Mar** — inventaria tus agentes y mapea cada uno a exactamente un rol de privilegio mínimo.
- **Mié–Jue** — crea Entra Agent IDs (o identidades administradas) por agente y asigna RBAC con alcance de recurso.
- **Vie** — ejecuta la prueba de denegación: intenta una acción fuera de alcance y captura el 403.

📦 **Entrega este artefacto:** un mapa de roles de privilegio mínimo (tabla/diagrama) + la captura del 403 fuera de alcance. Bullet para CV: *"Reduje el radio de impacto de agentes a un único alcance de recurso — 0 identidades con exceso de privilegios, 100% de acciones fuera de alcance denegadas (403 verificado)."*

> 🆓 **Ruta free-tier:** Entra ID y Azure RBAC son gratuitos; un recurso de storage o Cosmos en nivel gratuito basta para demostrar la denegación.

---

<details>
<summary>📋 <strong>Mapeo regulatorio</strong> — NIST · SOC 2 · Zero Trust</summary>

| Requisito | Regulación | Aplicación |
|-------------|-----------|-------------|
| Privilegio mínimo | NIST AI RMF GOVERN 1.2 | RBAC por agente acotado a los recursos mínimos requeridos |
| No repudio | SOC 2 CC6.1 | Cada acción registrada bajo un ID de principal de agente único |
| Separación de identidades | Principio Zero Trust | Entra Agent ID por agente — sin identidades compartidas |
| Revisiones de acceso | SOC 2 CC6.3 | Auditoría trimestral de RBAC vía `az role assignment list` |

</details>

---

<details>
<summary>💡 Pistas (intenta resolver primero)</summary>

1. **Entra Agent ID solo está disponible en modo Standard**: En modo Basic, los agentes comparten la identidad del sistema de Foundry. Otra razón para usar siempre Standard.
2. **`--assignee-principal-type ServicePrincipal`**: Especifica siempre esta bandera al asignar roles a identidades administradas — evita búsquedas innecesarias en Azure AD y previene errores de asignación de roles.
3. **RBAC con alcance de contenedor**: El patrón de alcance es `{storageAccountId}/blobServices/default/containers/{containerName}`. Es más restrictivo que a nivel de cuenta y es lo que esperan los auditores.
4. **Prueba lo negativo**: Prueba explícitamente que el agente *no puede* escribir en storage. Los controles de seguridad solo son significativos si también verificas la ruta de denegación.

</details>

---

## Comprobación de conocimientos

1. ¿Cuál es la diferencia entre Entra Agent ID y una identidad administrada asignada por el usuario?
2. ¿Por qué es importante el aislamiento de identidad por agente desde la perspectiva del radio de impacto de seguridad?
3. ¿Qué rol RBAC asignarías si un agente necesita leer Y escribir en Azure Cosmos DB?
4. ¿Cómo verificas que la identidad administrada de un agente se usó para una operación específica de storage (vs. un operador humano)?

---

## Limpieza

```bash
# Remove role assignment first, then delete agent
az role assignment delete --assignee $AGENT_PRINCIPAL_ID --role "Storage Blob Data Reader"
# Delete agent via SDK or portal
```
