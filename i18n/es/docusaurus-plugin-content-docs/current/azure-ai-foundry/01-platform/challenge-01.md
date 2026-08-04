---
sidebar_position: 1
title: "Desafío 01: Los datos de pacientes nunca salen de la VNet"
---

# Desafío 01: Los datos de pacientes nunca salen de la VNet

:::info[Resumen del escenario]
**Industria:** Salud | **Contexto regulatorio:** HIPAA, EU AI Act Artículo 10(5)  
**Tiempo estimado:** 90 minutos | **Costo de Azure:** ~$8–12
:::

---

## Qué está en juego

Tu cliente es **Northside Regional Medical Center**, un hospital de 450 camas en Alemania que procesa 8,000 expedientes de pacientes al día. Su equipo legal emitió un requisito inflexible:

> *"Ningún dato de paciente — incluidos metadatos, historial de conversación o embeddings — puede atravesar Internet público ni residir en infraestructura que no esté bajo nuestro control."*

Su chatbot de IA actual envía resúmenes a una API en la nube con sede en EE. UU. Después de una investigación de GDPR, su DPO te dio **3 semanas** para reemplazarlo por una solución conforme.

---

## Habilidades practicadas

- Implementar Azure AI Foundry en **modo Standard** con almacenamiento BYO
- Configurar **Private Endpoints** para la cuenta de Foundry
- Configurar **BYO VNet** para aislamiento de Hosted Agents
- Deshabilitar el acceso de red pública en todos los recursos de IA
- Verificar residencia de datos con Azure Policy

---

## Decisión de arquitectura

**¿Por qué Hosted Agents + modo Standard?**

| Opción | Por qué no |
|--------|---------|
| Prompt Agent (modo Basic) | Microsoft administra el almacenamiento — viola el requisito BYO |
| Workflow Agent | Preview; soporte limitado de VNet a mediados de 2025 |
| Orquestación externa en AKS | Mayor carga operativa; pierde beneficios de Entra Agent ID |
| **Hosted Agent (modo Standard)** | ✅ BYO VNet + almacenamiento + aislamiento de Micro-VM + Entra Agent ID |

---

## 🧰 Antes de empezar — Configuración del entorno

Este desafío es una construcción de **residencia de datos / aislamiento de red**. Tu configuración es principalmente acceso a Azure y redes — el objetivo es demostrar que ningún dato sale de tu perímetro.

### Prerrequisitos

| Requisito | Por qué lo necesitas | Cómo verificar |
|-------------|-----------------|--------------|
| **Suscripción de Azure** con Contributor en un grupo de recursos | Crear Foundry, VNet, endpoints privados | `az account show` |
| **Azure CLI** (o Azure PowerShell) | Aprovisionar + verificar aislamiento de red | `az version` |
| Derechos para crear una **VNet + Private Endpoints + Private DNS** | El punto central: mantener el tráfico fuera de Internet público | Rol Network Contributor |
| Una región que coincida con tu regla de residencia (p. ej., `germanywestcentral`) | Los datos deben residir físicamente dentro del perímetro | `az account list-locations -o table` |

### Paso 0 — Inicia sesión y establece tu contexto (5 min)

**Dónde ejecutas esto:** en una terminal con **Azure CLI** autenticado — a diferencia de los desafíos locales de Python, estos comandos `az` se ejecutan contra **recursos reales en tu suscripción de Azure**.

```bash
az login
az account set --subscription "<your-subscription-id>"
az group create --name rg-foundry-private --location germanywestcentral
```

✅ **Listo cuando** `az account show` devuelva la suscripción correcta y `az group show -n rg-foundry-private` exista en tu región de residencia.

### Paso 1 — Confirma el requisito y crea el proyecto en modo Standard (10 min) — *el "a dónde voy"*

Primero, escribe la regla exacta que debes cumplir (región, sin egreso público, almacenamiento BYO) — todo lo que construyas se verificará contra esa oración en los Criterios de éxito.

Luego crea el proyecto que hace posible el aislamiento. La residencia de datos + redes BYO requieren **modo Standard** (un proyecto Foundry basado en hub), *no* el proyecto gratuito predeterminado:

1. Ve a **[ai.azure.com](https://ai.azure.com)** → **+ Create project** → **Advanced options**.
2. Establece **Region** en tu región de residencia (p. ej., `germanywestcentral`) y elige **Create new hub** para poder adjuntar tu propio almacenamiento/Key Vault después.
3. Cuando se aprovisione, abre **Management center → your project → Overview** y anota el **hub** al que está adjunto — las Tareas 1–3 configuran endpoints privados en los recursos de ese hub.

✅ **Listo cuando** tengas un proyecto basado en hub en la región correcta (su grupo de recursos muestra una **Storage account + Key Vault** que puedes poner detrás de un endpoint privado).

> 🟦 **Nota Microsoft-first:** este desafío ya es 100% nativo de Azure — **Azure AI Foundry Standard mode**, **Private Endpoints**, **BYO VNet + Storage + Key Vault**, **Private DNS zones** y **Azure Policy** para cumplimiento. No hay componente de terceros que agregar; la habilidad está en cablearlos correctamente.

> **Correcciones comunes:** no aparecen opciones BYO de almacenamiento/redes → creaste un proyecto *default*, no uno **Standard** basado en hub; recréalo mediante **Advanced options**. Región bloqueada → revisa las regiones permitidas de tu suscripción con `az account list-locations -o table`.

### El recorrido por este desafío

1. **Tarea 1** — implementar Foundry en modo Standard con almacenamiento BYO.
2. **Tarea 2** — agregar endpoints privados + Private DNS.
3. **Tarea 3** — deshabilitar el acceso de red pública en todas partes.
4. **Tarea 4** — verificar residencia con Azure Policy + una prueba DNS.
5. **Criterios de éxito** — demostrar que el tráfico resuelve a una IP `10.x` de la VNet.
6. **Adáptalo a tu negocio** — aplicar el perímetro a *tu* regla de datos.

> ⏱️ **Presupuesto de tiempo:** ~90 minutos. La verificación DNS/endpoint privado (Tarea 4) es donde realmente *demuestras* el aislamiento — no la omitas.

---

## Tus tareas

### Tarea 1: Implementar la cuenta de Foundry en modo Standard

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

:::warning[El modo Standard no es el predeterminado]
El portal usa modo Basic por defecto. Especifica siempre `--sku Standard` para clientes empresariales. En modo Basic, Microsoft administra artefactos de conversación — el DPO rechazará esto.
:::

### Tarea 2: Crear endpoint privado + DNS

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

### Tarea 3: Conectar almacenamiento BYO y Key Vault

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

### Tarea 4: Implementar Hosted Agent

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

### Tarea 5: Verificar cumplimiento con Azure Policy

```bash
az policy assignment create \
  --name "ai-private-link-required" \
  --scope /subscriptions/<sub-id>/resourceGroups/rg-northside-ai \
  --policy "Cognitive Services accounts should use private link" \
  --enforcement-mode Default
```

---

## Criterios de éxito

- [ ] Cuenta de Foundry implementada en `germanywestcentral` con modo Standard
- [ ] Acceso de red pública deshabilitado en Foundry, Storage y Key Vault
- [ ] Endpoint privado creado y zona DNS `privatelink.services.ai.azure.com` vinculada a la VNet
- [ ] Agente implementado y devuelve respuestas solo mediante el endpoint privado
- [ ] `Resolve-DnsName northside-foundry.services.ai.azure.com` devuelve una IP `10.x.x.x` desde una VM en la VNet
- [ ] Azure Policy muestra cumplimiento

---

## 🔁 Adáptalo a tu propio negocio

El escenario es un **hospital alemán bajo GDPR**, pero *muchas* organizaciones tienen un perímetro estricto de "los datos no deben salir de X". El patrón — redes privadas + almacenamiento BYO + cumplimiento por políticas — es idéntico sin importar si el impulsor es HIPAA, GDPR o un mandato de nube soberana.

### Paso 1 — Encuentra tu perímetro de residencia de datos

| Industria | Requisito estricto | Impulsor |
|----------|----------------------|-----------|
| **Salud** | PHI nunca sale de la región / VNet | HIPAA, GDPR |
| **Servicios financieros** | Datos de clientes solo dentro del país | Leyes de soberanía de datos |
| **Gobierno / defensa** | Datos en nube soberana o Gov | FedRAMP / reglas nacionales |
| **Legal** | Datos privilegiados nunca en infraestructura compartida | Secreto profesional abogado-cliente |
| **Cualquier entidad de la UE** | Sin transferencia fuera del EEE | GDPR Capítulo V |

### Paso 2 — Mapea los bloques de construcción a tu stack (Microsoft-first)

| En este desafío | En tu proyecto — usa |
|-------------------|-----------------------|
| Modo Standard de Foundry + almacenamiento BYO | Igual — **Azure AI Foundry Standard mode** con tu cuenta de almacenamiento |
| Private Endpoints + Private DNS | Igual — extiéndelo a cada dependencia (SQL, Search, Key Vault) |
| Deshabilitar acceso de red pública | Aplícalo a **todos** los servicios de datos, no solo Foundry |
| Cumplimiento con Azure Policy | Iniciativa de **Azure Policy** + **Purview** para gobernanza de datos |
| Fijación de región | Implementa en tu región requerida; considera **nube soberana** |

### Paso 3 — Checklist de implementación de 5 preguntas

1. **¿Cuál es el perímetro exacto?** Escríbelo en una oración antes de construir.
2. **¿Cada dependencia tiene un endpoint privado?** Un solo punto de egreso público rompe toda la garantía.
3. **¿El acceso de red pública está deshabilitado en todas partes?** Denegar por defecto, luego permitir la VNet.
4. **¿Puedes demostrar que el tráfico permanece privado?** Una resolución DNS a una IP `10.x` es tu evidencia.
5. **¿El cumplimiento se aplica, no solo se configura?** Azure Policy detiene la deriva.

### Paso 4 — Plan de despliegue de 1 semana

| Día | Acción | Propietario |
|-----|--------|-------|
| **Día 1** | Documentar la regla de residencia; elegir la región | Cumplimiento + nube |
| **Día 2** | Implementar Foundry en modo Standard + almacenamiento BYO dentro de la región | Ingeniería cloud |
| **Día 3** | Agregar endpoints privados + Private DNS para cada dependencia | Ingeniería de red |
| **Día 4** | Deshabilitar acceso público; ejecutar la prueba DNS/private-link | Ingeniería de red |
| **Día 5** | Aplicar una iniciativa de Azure Policy; confirmar cumplimiento | Gobernanza |

### Paso 5 — Demuestra el ROI

- **Cobertura de private link** — % de servicios de datos con acceso público deshabilitado *(objetivo: 100%)*.
- **Prueba de egreso** — DNS resuelve a una IP privada `10.x` *(objetivo: sí, en cada endpoint)*.
- **Cumplimiento de políticas** — % de recursos conformes con la iniciativa de residencia *(objetivo: 100%)*.

> 💡 **Regla práctica:** "lo configuramos de forma privada" no es lo mismo que "demostramos que nada se filtra". Resuelve el DNS, revisa la IP y deja que Azure Policy lo mantenga así.

### Hacerlo en solitario (sin equipo, orientado a portafolio)

¿Sin equipo ni presupuesto? La arquitectura de residencia de datos es una habilidad rara y bien pagada — puedes demostrarla con una implementación pequeña. Ejecuta la semana en solitario:

- **Lun–Mar** — implementa Foundry en modo Standard + una cuenta de almacenamiento en tu región requerida.
- **Mié–Jue** — agrega un endpoint privado + Private DNS a una dependencia y deshabilita el acceso de red pública.
- **Vie** — captura la prueba: `nslookup` resolviendo a una IP privada `10.x` + una captura de cumplimiento de Azure Policy. Luego elimina todo (ver Limpieza).

📦 **Entrega este artefacto:** un diagrama de arquitectura (draw.io / Mermaid) + la captura DNS-a-IP-privada + un resumen de una página de "garantía de residencia". Bullet para CV: *"Diseñé una plataforma de IA conforme con residencia de datos — 100% de cobertura private-link con egreso privado verificado por DNS y aplicación mediante Azure Policy."*

> 🆓 **Ruta free-tier:** una cuenta gratuita de Azure (crédito inicial) cubre una VNet + endpoint privado para el ejercicio; elimina el grupo de recursos el mismo día para mantenerte en $0.

---

<details>
<summary>📋 <strong>Mapeo regulatorio</strong> — GDPR · EU AI Act · HIPAA</summary>

| Requisito | Regulación | Aplicación |
|-------------|-----------|-------------|
| Residencia de datos (Alemania) | GDPR Art. 44, EU AI Act Art. 10(5) | Ubicación del recurso = `germanywestcentral` |
| Sin tránsito por Internet público | GDPR Art. 32 | Endpoints privados + acceso público deshabilitado |
| Claves administradas por el cliente | HIPAA § 164.312(a) | CMK de Key Vault para cifrado de almacenamiento |
| Auditabilidad | EU AI Act Art. 12 | Azure Monitor + Activity Log |

</details>

---

<details>
<summary>💡 Pistas (intenta resolver primero)</summary>

1. **Private DNS Zone**: Sin `privatelink.services.ai.azure.com` vinculada a la VNet, el endpoint privado resuelve a una IP pública — anulando el propósito.
2. **Storage necesita DOS endpoints privados**: uno para subrecursos `blob` y otro para `dfs`.
3. **Acceso a Key Vault**: Concede a la identidad administrada de la cuenta de Foundry el rol `Key Vault Crypto User`.
4. **Disciplina de región**: Implementa TODOS los recursos en `germanywestcentral` — incluso un workspace de Log Analytics en `eastus` puede activar una revisión de residencia de datos.

</details>

---

## Romper y reparar

Tu colega implementó todo. El portal muestra "Approved" en el endpoint privado. Pero el agente agota el tiempo de espera desde la VNet del hospital.

**Investiga:**
1. `Resolve-DnsName northside-foundry.services.ai.azure.com` — ¿devuelve una IP `10.x.x.x` o una IP pública?
2. Revisa las reglas NSG — ¿TCP 443 está permitido de entrada en `snet-ai`?
3. ¿La Private DNS Zone está realmente vinculada a `vnet-northside`?

---

## Comprobación de conocimientos

1. ¿Cuál es la diferencia entre modo Basic y modo Standard, y por qué el modo Basic viola los requisitos de residencia de datos?
2. Cuando deshabilitas el acceso de red pública en una cuenta de Foundry, ¿qué más debes configurar para que los clientes dentro de la VNet puedan alcanzarla?
3. ¿Por qué cada Hosted Agent obtiene su propio Entra Agent ID en vez de compartir un service principal?
4. ¿Qué Azure Policy integrada exige private link para servicios de IA?

---

## Limpieza

```bash
az group delete --name rg-northside-ai --yes --no-wait
```
