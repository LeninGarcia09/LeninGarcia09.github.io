---
sidebar_position: 1
title: "Desafío 01: Un regulador de la UE quiere tu inventario de IA en 30 días"
---

# Desafío 01: Un regulador de la UE quiere tu inventario de IA en 30 días

:::info[Resumen del escenario]
**Industria:** Empresa (cualquiera) | **Contexto regulatorio:** EU AI Act Art. 51, GDPR Art. 35  
**Tiempo estimado:** 90 minutos | **Costo de Azure:** ~$0–5 (requiere licenciamiento de Purview)
:::

---

## Qué está en juego

**Europax Manufacturing** opera en 7 estados miembros de la UE. Una autoridad nacional competente ha emitido una consulta formal:

> *"Conforme al Artículo 51 del Reglamento (UE) 2024/1689, se le requiere proporcionar en un plazo de 30 días un registro completo de todos los sistemas de IA de alto riesgo en uso, incluyendo la documentación técnica especificada en el Artículo 11."*

Su equipo de TI estima que tienen "alrededor de 15 sistemas de IA", pero no cuenta con un inventario formal. Tienes 30 días para descubrir, clasificar, documentar y responder.

---

## Habilidades practicadas

- Uso de **Microsoft Purview AI Hub** para descubrir automáticamente actividad de IA en todo el tenant
- Aplicación del marco de **clasificación de riesgo del EU AI Act** (unacceptable, high, limited, minimal)
- Creación de un **paquete de documentación técnica** conforme al Art. 11
- Implementación de la evaluación de impacto de **Microsoft RAI Standard v2**
- Comprensión de los **requisitos de registro del EU AI Act** para sistemas de alto riesgo

---

## Clasificación de riesgo del EU AI Act

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

## 🧰 Antes de empezar — configuración del entorno

Este es un ejercicio de **descubrimiento de gobernanza**, así que la mayor parte de la preparación consiste en acceso y permisos, no en código. El objetivo es poder ver *toda* la actividad de IA del tenant para luego clasificarla y documentarla.

### Prerrequisitos

| Requisito | Por qué lo necesitas | Cómo comprobarlo |
|-------------|-----------------|--------------|
| **Microsoft 365 E5** o una licencia de **Purview compliance** | Habilita **Microsoft Purview AI Hub** (descubrimiento de actividad de IA + DSPM for AI) | [Purview portal](https://purview.microsoft.com) → Data Security → AI Hub |
| Rol de **Purview / compliance admin** | Ejecutar reportes de actividad y crear políticas DLP | Centro de administración de Microsoft 365 → Roles |
| PowerShell + módulo **Exchange Online Management** | Exportar actividad de IA mediante `Connect-IPPSSession` | `Get-Module -ListAvailable ExchangeOnlineManagement` |
| Una hoja de cálculo o una tabla de **Microsoft Lists** o **Dataverse** | Guardar el inventario de sistemas de IA y su clasificación de riesgo | Microsoft 365 |

### Paso 0 — Confirma que realmente puedes ver la actividad de IA (10 min) — *el "¿a dónde entro?"*

Este ejercicio depende de **Microsoft Purview DSPM for AI**. Antes de cualquier otra cosa, confirma que puedes acceder y que los datos están fluyendo; de lo contrario, el descubrimiento de la Tarea 1 regresará vacío y pensarás que no tienes shadow AI cuando en realidad no tienes visibilidad.

1. Ve a **[purview.microsoft.com](https://purview.microsoft.com)** e inicia sesión con una cuenta que tenga el rol de **Purview / compliance admin**.
2. En la navegación izquierda, abre **DSPM for AI** (Data Security Posture Management for AI). Si no lo ves, a tu tenant le falta **M365 E5** o la licencia de Purview compliance; consulta la guía oficial de inicio de [DSPM for AI](https://learn.microsoft.com/purview/dspm-for-ai).
3. En la página **Overview**, confirma que los mosaicos de **Activity** muestran datos. Si están vacíos, activa las opciones de **one-time setup** (audit + Copilot/AI analytics); DSPM for AI te guiará. Considera de 24 a 48 horas para que aparezcan los primeros datos.
4. Verifica la ruta de PowerShell que usarás para exportar actividad:

```powershell
Install-Module ExchangeOnlineManagement -Scope CurrentUser   # if not already installed
Connect-IPPSSession   # opens sign-in; this is your compliance/eDiscovery endpoint
```

✅ **Completado cuando** DSPM for AI muestra activity tiles **y** `Connect-IPPSSession` se conecta sin error.

### Paso 1 — Crea tu inventario como una lista gobernada, no como una hoja suelta (10 min)

Tu inventario es un artefacto regulado, así que dale ownership, historial y control de acceso desde el inicio. Crea una **Microsoft List** (o una tabla de **Dataverse**) con estas columnas exactas:

`System name | Owner | Data touched | EU AI Act risk tier | Art. 11 doc? | Registered? | Last reviewed`

Para crearla: **[Microsoft Lists](https://www.microsoft.com/microsoft-365/microsoft-lists)** → **+ New list** → **Blank list** → agrega las columnas anteriores (usa una columna **Choice** para *risk tier*: Prohibited / High / Limited / Minimal).

✅ **Completado cuando** la lista existe con las 7 columnas y, al menos, tú como owner.

> 🟦 **Nota Microsoft-first:** este desafío ya es completamente Microsoft-native: **Purview DSPM for AI** hace el descubrimiento, **Purview DLP** aplica los guardrails y tu inventario debe vivir en **Microsoft Lists** o **Dataverse** (no en una hoja suelta) para tener ownership, historial y control de acceso.

> **Correcciones comunes:** DSPM for AI no visible → falta licencia E5/Purview o rol de compliance admin. Activity vacío → habilita auditing en el **one-time setup** de DSPM for AI y espera a que los datos se acumulen.

### El recorrido de este desafío

1. **Tarea 1** — descubrir actividad de IA con Purview AI Hub (espera encontrar shadow AI).
2. **Tarea 2** — clasificar cada sistema por risk tier del EU AI Act.
3. **Tarea 3** — completar la documentación técnica del Artículo 11 para sistemas de alto riesgo.
4. **Tarea 4** — poner en marcha una política de Purview DLP que bloquee datos sensibles hacia IA externa.
5. **Criterios de éxito** — inventario completo y defendible + respuesta al regulador.
6. **Adáptalo a tu negocio** — ejecuta este descubrimiento en *tu* organización.

> ⏱️ **Presupuesto de tiempo:** ~90 minutos. El descubrimiento (Tarea 1) suele sorprender a la gente; reserva tiempo adicional para hallazgos de shadow AI.

---

## Tus tareas

### Tarea 1: Descubre actividad de IA con Microsoft Purview AI Hub

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

### Tarea 2: Clasifica cada sistema de IA

Para cada sistema descubierto, aplica esta matriz de clasificación:

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

### Tarea 3: Crea la documentación técnica del Artículo 11

Para cada sistema High-Risk, el Artículo 11 requiere documentación de:

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

### Tarea 4: Configura políticas de Purview para controlar shadow AI

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

## Criterios de éxito

- [ ] Purview AI Hub muestra aplicaciones de IA descubiertas y sus interaction counts
- [ ] Todos los sistemas de IA están clasificados con niveles de riesgo del EU AI Act
- [ ] Los sistemas de alto riesgo tienen completa la plantilla de documentación del Artículo 11
- [ ] El requisito de registro está identificado para cada sistema de alto riesgo
- [ ] La política de Purview que bloquea datos sensibles hacia herramientas de IA externas está activa
- [ ] La respuesta de 30 días al regulador está redactada con el inventario completo de sistemas

---

## 🔁 Adáptalo a tu propio negocio

El escenario es una **consulta de un regulador de la UE**, pero *toda* organización necesita un inventario de IA: por el EU AI Act, ISO 42001, NIST AI RMF, auditoría interna o simplemente para saber qué está corriendo. El ciclo descubrir → clasificar → documentar es universal.

### Paso 1 — Encuentra tu momento de "¿qué IA está corriendo aquí realmente?"

| Tipo de organización | El disparador | Lo que descubrirás |
|-------------------|-------------|----------------------|
| **Multinational enterprise** | EU AI Act / auditoría transfronteriza | Sistemas de HR, crédito o biometría de alto riesgo |
| **Regulated finance** | Gestión de riesgo de modelos (SR 11-7) | Modelos de scoring / pricing no documentados |
| **Healthcare** | Revisión FDA SaMD / HIPAA | Herramientas de decisión clínica sin documentación de supervisión |
| **Public sector** | Obligaciones de transparencia / FOIA | IA orientada a ciudadanos que requiere disclosure |
| **Any company** | Rollout de Copilot / GenAI | Shadow AI: personal pegando datos en herramientas públicas |

### Paso 2 — Mapea los bloques a tu stack (Microsoft-first)

| En este desafío | En tu proyecto — usa |
|-------------------|-----------------------|
| Descubrimiento con Purview AI Hub | **Microsoft Purview AI Hub / DSPM for AI** — actividad de IA a nivel tenant |
| Clasificación de riesgo | **Microsoft RAI Standard v2** + tiers del Annex III del EU AI Act |
| Documentación del Artículo 11 | Un registro de **Transparency Note** / **Dataverse** por sistema |
| Registro de inventario | **Microsoft Lists** o **Dataverse** (con ownership y auditado) |
| Bloqueo de datos sensibles | Política de **Purview DLP** para aplicaciones de generative AI |
| Monitoreo continuo | **Purview Compliance Manager** + **Azure Monitor** |

### Paso 3 — Checklist de implementación en 5 preguntas

1. **¿Puedes ver uso de IA que no aprobaste?** Si no → activa primero Purview AI Hub / DSPM for AI.
2. **¿Cada sistema de IA tiene un owner identificado?** Si no → asígnalo antes de clasificar.
3. **¿Sabes qué sistemas son "high-risk"?** Si no → aplica Annex III + RAI Standard v2.
4. **¿Están saliendo datos sensibles hacia herramientas públicas de IA?** Si no lo sabes → una política DLP te dará esa respuesta rápido.
5. **¿Podrías producir este inventario en 30 días bajo auditoría?** Si no → este desafío *es* tu simulacro de incendio.

### Paso 4 — Plan de despliegue de 1 semana

| Día | Acción | Responsable |
|-----|--------|-------|
| **Day 1** | Habilitar Purview AI Hub / DSPM for AI y ejecutar un activity report de 30 días | Compliance admin |
| **Day 2** | Construir el registro de inventario en Microsoft Lists / Dataverse | Governance lead |
| **Day 3** | Clasificar cada sistema por tier del EU AI Act + RAI Standard | Risk + eng |
| **Day 4** | Redactar notas de Art. 11 / Transparency Notes para sistemas de alto riesgo | Product owner |
| **Day 5** | Desplegar una política de Purview DLP para herramientas de IA externas | Security |

### Paso 5 — Demuestra el ROI

- **Compleción del inventario** — % de sistemas de IA dentro de un registro gobernado *(objetivo: 100%)*.
- **Reducción de shadow AI** — herramientas de IA no aprobadas bloqueadas o formalizadas *(medición mes contra mes)*.
- **Preparación para auditoría** — días para producir un inventario completo *(objetivo: bastante menos de 30)*.

> 💡 **Regla práctica:** no puedes gobernar lo que no puedes ver. Activa discovery *antes* de escribir una sola política; ahí está precisamente el valor de las sorpresas.

### Hacerlo en solitario (sin equipo, portfolio-first)

¿Sin equipo y sin presupuesto? Un inventario de gobernanza de IA no requiere código y demuestra que puedes operacionalizar el EU AI Act, una habilidad muy demandada. Haz la semana tú solo:

- **Mon–Tue** — enumera cada sistema de IA que puedas encontrar (empieza con el uso de Copilot/GenAI de tu propio tenant) en un registro de Microsoft List/Excel, cada uno con owner identificado.
- **Wed–Thu** — clasifica cada uno por tier del EU AI Act + RAI Standard; redacta una Transparency Note para el de mayor riesgo.
- **Fri** — cronometra cuánto tardas en producir el inventario completo; ese es tu indicador de audit-readiness.

📦 **Entrega este artefacto:** un registro RAI completo del inventario + una Transparency Note. Bullet para CV: *"Implementé un inventario de IA listo para el EU AI Act: 100% de los sistemas gobernados con owners identificados, risk tier y documentación de transparencia."*

> 🆓 **Ruta free-tier:** Microsoft Lists / Excel + la plantilla pública de RAI Standard; este desafío realmente puede hacerse con $0.

---

<details>
<summary>📋 <strong>Mapeo regulatorio</strong> — artículos y fechas del EU AI Act</summary>

| Requisito | Artículo | Fecha límite | Verificación |
|-------------|---------|----------|-------------|
| Registrar sistemas de IA de alto riesgo | Art. 51 | Aug 2, 2026 | ¿Cada sistema de alto riesgo está registrado? |
| Documentación técnica | Art. 11 | Before deployment | ¿El documento del Art. 11 está completo para cada sistema? |
| Supervisión humana | Art. 14 | Before deployment | ¿Está documentado el mecanismo de supervisión? |
| Sistema de gestión de riesgos | Art. 9 | Before deployment | ¿Se mantiene el registro de riesgos? |
| Post-market monitoring | Art. 72 | Ongoing | ¿Se están rastreando los KPIs? |
| Transparency disclosure | Art. 52 | Immediate | ¿Los chatbots informan a los usuarios que están interactuando con IA? |

</details>

---

<details>
<summary>💡 Pistas</summary>

1. **Shadow AI es el verdadero reto**: Purview AI Hub suele descubrir entre 3 y 5 veces más herramientas de IA de las que TI cree que existen. Reserva tiempo para hallazgos sorpresa (Grammarly, Notion AI, Midjourney en dispositivos personales conectados a la red corporativa).
2. **High-Risk ≠ malo**: que un sistema se clasifique como High-Risk significa que es *significativo*, no que sea inherentemente problemático. La ley simplemente exige más documentación y supervisión.
3. **La fecha límite de registro es el 2 de agosto de 2026** para sistemas del Annex III ya desplegados. Los nuevos sistemas de alto riesgo desplegados después del 2 de agosto de 2026 deben registrarse antes del despliegue.
4. **Art. 52 es inmediato**: si hoy ejecutas un chatbot en la UE sin revelar que es IA, ya estás en incumplimiento. Agrega de inmediato "This conversation is with an AI assistant" a la interfaz del chat.

</details>

---

## Verificación de conocimiento

1. Bajo el EU AI Act, ¿qué categoría de riesgo requiere registro en la base de datos de IA de la UE?
2. ¿Cuál es la diferencia entre un "provider" y un "deployer" de sistemas de IA bajo el EU AI Act?
3. ¿Por qué un recommendation engine podría clasificarse como Minimal Risk mientras que una herramienta de credit scoring sería High Risk?
4. ¿Qué descubre Microsoft Purview AI Hub que las herramientas tradicionales de gestión de activos de TI no detectan?

---

## Limpieza

No se crean recursos de Azure; Purview es un servicio SaaS. Elimina cualquier archivo CSV exportado que contenga datos sensibles.
