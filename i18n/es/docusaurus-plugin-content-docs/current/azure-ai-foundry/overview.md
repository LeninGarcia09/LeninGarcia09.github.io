---
sidebar_position: 1
title: Azure AI Foundry + Hosted Agents
---

# 🤖 Azure AI Foundry + Hosted Agents

**Tipo de track:** Skill Track — Técnico profundo  
**Audiencia objetivo:** AI Solution Architects, Cloud Architects, Principal Engineers  
**Prerrequisitos:** AZ-900 o exposición equivalente a Azure; comodidad con Python o PowerShell

---

:::tip[Lo que construirás]
Arquitecturas de IA de grado producción basadas en restricciones empresariales reales. Cada desafío parte de un escenario de cliente — del tipo que encontrarás en interacciones reales con clientes.
:::

---

## Contexto de plataforma (2025)

Microsoft renombró Azure AI Studio → **Azure AI Foundry** → **Microsoft Foundry** (2025). La plataforma unifica:

| Componente | Rol |
|-----------|------|
| **Foundry Portal** (`ai.azure.com`) | Centro de proyectos unificado |
| **Foundry Resource** | Cuenta única + proyectos (reemplaza Hub + AOAI + AI Services) |
| **Agent Service** | Tres tipos de agentes: Prompt, Workflow, Hosted |
| **Model Catalog** | Más de 1,900 modelos de Microsoft, OpenAI, Meta, Mistral, Hugging Face |
| **Tool Ecosystem** | Más de 1,400 conectores MCP, Azure Search, Logic Apps, Functions |
| **Evaluation SDK** | Puntuación de groundedness, coherencia, fluidez y seguridad |
| **Observability** | Trazas de OpenTelemetry, paneles, integración con Azure Monitor |

---

## Los tres tipos de agentes

```
┌─────────────────────────────────────────────────────────────┐
│                    Azure AI Agent Service                   │
├──────────────┬──────────────────┬───────────────────────────┤
│ Prompt Agent │ Workflow Agent   │ Hosted Agent              │
│ (No-code)    │ (YAML/Visual)    │ (Container/Code)          │
│              │ [Preview]        │ [Preview]                 │
├──────────────┼──────────────────┼───────────────────────────┤
│ Chat UI      │ Multi-step flows │ Full code control         │
│ Simple Q&A   │ Conditional DAGs │ BYO framework (LangGraph) │
│ 5-min deploy │ Visual designer  │ Micro-VM isolation        │
│              │                  │ <1s cold start            │
│              │                  │ $0 idle cost              │
└──────────────┴──────────────────┴───────────────────────────┘
```

### Hosted Agents — Análisis profundo de arquitectura

Hosted Agents son la opción **empresarial, code-first**. Datos clave que todo arquitecto debe conocer:

- **Aislamiento:** Cada agente se ejecuta en una **Micro-VM** (basada en gVisor) — aislamiento a nivel de proceso, no contenedor compartido
- **Ciclo de vida:** Arranque en frío < 1 segundo; costo idle de $0; escala a cero automáticamente  
- **Frameworks:** LangGraph, Azure Agent Framework, Semantic Kernel — trae cualquier agente de Python
- **Red:** Admite **BYO VNet** (modo Standard) — endpoints privados, integración con NSG
- **Identidad:** Cada agente recibe un **Entra Agent ID** (identidad administrada) — sin contraseñas, RBAC completo
- **Versión de API:** Construye sobre **Responses API (v2)** — la Assistants API clásica (v1) se retira en marzo de 2027
- **SDK:** `azure-ai-projects` 2.x — cliente unificado, endpoint único de proyecto

---

## Modos de implementación: decisión empresarial crítica

| Modo | Almacenamiento | Redes | Caso de uso |
|------|---------|-----------|----------|
| **Basic** | Microsoft administra | Pública | Solo desarrollo/pruebas |
| **Standard** | BYO del cliente (Storage + Key Vault + Search) | Endpoints privados disponibles | **Todas las cargas empresariales** |

:::danger[Usa siempre el modo Standard para la empresa]
El modo Basic da a Microsoft acceso a tus datos de conversación y artefactos. Cualquier cliente con requisitos de residencia de datos, HIPAA, PCI o EU AI Act **debe** usar el modo Standard.
:::

---

## Ruta de aprendizaje (14 módulos)

| # | Módulo | Tipo | Tiempo |
|---|--------|------|------|
| 1 | Arquitectura de plataforma y modelo de recursos | Concepto | 45 min |
| 2 | Fundamentos de Agent Service | Laboratorio | 60 min |
| 3 | Primer Hosted Agent (LangGraph) | Laboratorio | 90 min |
| 4 | Aislamiento de VNet y endpoints privados | Laboratorio | 90 min |
| 5 | Entra Agent ID y RBAC | Laboratorio | 60 min |
| 6 | Evaluation SDK y groundedness | Laboratorio | 90 min |
| 7 | Integración de Content Safety | Laboratorio | 60 min |
| 8 | Orquestación Multi-Agent | Laboratorio | 120 min |
| 9 | Herramientas MCP y conectores externos | Laboratorio | 90 min |
| 10 | OpenTelemetry y observabilidad | Laboratorio | 90 min |
| 11 | Configuración empresarial en modo Standard | Laboratorio | 120 min |
| 12 | Solución de problemas en producción | Laboratorio | 90 min |
| 13 | Publicación de agentes (Copilot Studio / Teams) | Laboratorio | 60 min |
| 14 | Optimización de costos y escalado | Concepto | 45 min |

---

## Desafíos (laboratorios basados en escenarios)

Todos los laboratorios se basan en **escenarios empresariales reales**:

| Desafío | Escenario | Dominio |
|-----------|---------|--------|
| [1 — BYO VNet en salud](./01-platform/challenge-01.md) | Los datos de pacientes no pueden salir de la VNet del hospital | Salud / Residencia de datos |
| [2 — Alucinación en producción](./01-platform/challenge-02.md) | El agente devuelve respuestas incorrectas 20% del tiempo | Evaluación / Calidad |
| [3 — Configuración de Entra Agent ID](./01-platform/challenge-03.md) | Modo Standard con identidad administrada + RBAC | Seguridad / Identidad |
| [4 — Sistema de reclamos Multi-Agent](./02-agent-service/challenge-04.md) | Equipo de seguridad de un banco revisando arquitectura de IA | Financiero / Multi-Agent |
| [5 — Hosted Agent a escala](./02-agent-service/challenge-05.md) | Funciona localmente, falla con 500 usuarios concurrentes | Producción / Solución de problemas |

---

## Recursos clave

- [Microsoft Foundry Portal](https://ai.azure.com)
- [Documentación de Agent Service](https://learn.microsoft.com/en-us/azure/ai-services/agents/)
- [Información general de Hosted Agents](https://learn.microsoft.com/en-us/azure/ai-services/agents/concepts/hosted-agents)
- [`azure-ai-projects` SDK](https://pypi.org/project/azure-ai-projects/)
- [Evaluation SDK](https://learn.microsoft.com/en-us/azure/ai-studio/how-to/develop/evaluate-sdk)
