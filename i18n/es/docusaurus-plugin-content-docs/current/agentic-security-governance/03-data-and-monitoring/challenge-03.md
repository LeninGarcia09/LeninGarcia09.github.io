---
id: challenge-03
title: "Desafío 03 — Protección de Datos y Monitoreo en Ejecución"
sidebar_label: Desafío 03 — Datos y Monitoreo
description: "Protege los datos incluso después de que un agente obtiene acceso, y diseña monitoreo de comportamiento en ejecución que observa llamadas a herramientas, solicitudes de acceso y escalaciones — no solo las salidas."
tags:
  - challenge
  - tutorial
  - agentic-security
  - data-protection
  - monitoring
  - intermediate
---

# Desafío 03 — Protección de Datos y Monitoreo en Ejecución

> **Capa de causa raíz:** Visibilidad · **Marcos:** Microsoft Purview · Defender/Sentinel · [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) (Measure) · **⏱ Tiempo:** 3–4 h · **Nivel:** 🟡 Intermedio · **Tipo:** 🧪 Laboratorio práctico

:::tip[🎯 Lo que construirás y podrás hacer]
Dos cosas que faltan en la mayoría de los despliegues de agentes: un **plan de protección de datos** que protege la información *incluso después* de que un agente obtiene acceso, y un **diseño de monitoreo de comportamiento en ejecución** que observa lo que el agente *hace* — no solo lo que *dice*.

Al terminar podrás:
- **Clasificar y proteger** datos sensibles con etiquetas + DLP para que un exceso quede contenido, no sea catastrófico.
- **Emitir telemetría de comportamiento estructurada** (llamadas a herramientas, solicitudes de acceso, escalaciones) desde un agente.
- **Escribir detecciones** que se activen ante excesos y permanezcan en silencio ante actividad normal, cada una mapeada a una función del NIST AI RMF y una primera acción de respuesta.
:::

:::note[📌 Resumen]
- La mayoría de las organizaciones monitorean **salidas**; la señal peligrosa está en el **comportamiento** — las llamadas a herramientas y el patrón de acceso — exactamente donde vivieron el reconocimiento de HF y el escaneo de red de o1.
- Protegerás los datos con etiquetas/DLP, luego instrumentarás el agente para emitir telemetría de comportamiento y escribirás detecciones sobre las que un analista SOC pueda actuar.
- Entregable: un plan de protección de datos + un diseño de detección de comportamiento de agentes.
:::

---

## 🏥 Escenario Empresarial

> **Compañía:** Región Salud — una red regional de atención médica.  
> **Situación:** Un agente de admisión clínica tiene acceso legítimo de lectura a registros de pacientes. Durante una tarea de larga duración empezó a extraer **muchos más registros de los que requería cualquier caso individual**, y copió extractos en un resumen compartido con un canal interno amplio. No ocurrió nada "malicioso", pero datos regulados (PII/PHI) se movieron a lugares donde no debían estar, y **no se disparó ninguna alerta**, porque el SOC monitoreaba *salidas y contenido*, no *comportamiento del agente*.

Debes responder dos preguntas de la junta: *"¿Los datos están protegidos incluso si el agente se excede?"* y *"¿Nos daríamos cuenta de un comportamiento inusual antes de que ocurra daño?"*

---

## El Problema Central: Monitoreamos Salidas, No Comportamiento

AppSec tradicional observa la **respuesta**. Los sistemas agénticos fallan mediante **comportamiento**: una ráfaga de solicitudes de acceso, un alcance hacia un nuevo repositorio de datos, un intento de escalación, un ciclo de larga duración que amplía silenciosamente su alcance. En el incidente de HF de 2026, la señal no fue la *respuesta*, sino el **reconocimiento, acceso a credenciales y movimiento lateral** en el camino, y fue revelada mediante **triaje basado en LLM de telemetría de seguridad** (los defensores usaron un modelo para separar señal de ruido). Su precursor de 2024 (el **escaneo de red + llamada a la API de Docker del host** de o1) tiene la misma forma a menor escala. Si solo registras salidas finales, estás ciego a la señal exacta que importa.

**Los ocho marcadores de comportamiento** vistos a lo largo de la kill chain de HF; trata cada uno como una detección que deberías poder disparar:

1. Reconocimiento / sondeo del entorno
2. Uso inusual de herramientas o APIs
3. Solicitudes de acceso fuera de la tarea asignada
4. Intentos de escalación de privilegios
5. Acceso a datos sensibles o credenciales
6. Conexiones de red salientes nuevas / inesperadas
7. Actividad de agente de larga duración o en bucle
8. Intentos de deshabilitar, evadir o cegar el monitoreo

```
LO QUE LA MAYORÍA DE ORGS MONITOREA     LO QUE REQUIEREN LOS SISTEMAS AGÉNTICOS
──────────────────────────────────      ───────────────────────────────────────
salida final / contenido        →       + uso de herramientas y frecuencia de llamadas
                                        + solicitudes de acceso (qué datos, cuánto)
                                        + intentos de escalación / cambios de permisos
                                        + eventos de acceso a datos sensibles
                                        + actividad de agente de larga duración / en bucle
```

<details>
<summary>🏗️ <strong>Tabla de decisión de arquitectura</strong> — proteger + detectar</summary>

| Objetivo | Control | Ejemplo de Microsoft | Equivalente neutral al proveedor |
|-----------|---------|-------------------|---------------------------|
| Proteger datos **después** del acceso | Clasificación + etiquetas + DLP | Etiquetas de sensibilidad de **Purview**, DLP, Information Protection | Clasificación de datos + DLP (Symantec, DLP nativo de nube) |
| Detener extracciones masivas/anormales de datos | Política de acceso + reglas DLP de egreso | Purview DLP + Conditional Access | Límites de filas/volumen, DLP de egreso |
| Ver el **comportamiento** del agente | Telemetría en ejecución + detecciones | **Defender XDR / Defender for Cloud**, analítica de **Sentinel**, audit logs | SIEM (Splunk/Elastic) + telemetría personalizada de agentes |
| Investigar rápido | Triaje asistido por IA | **Security Copilot** | SOAR + runbooks de analistas |

**Decisión:** Etiquetar y proteger los datos con DLP (para que una fuga sea *contenida*) **y** emitir telemetría estructurada del agente a un SIEM con detecciones de acceso/escalación anómalos (para que una fuga sea *vista*).
</details>

---

## 🧰 Antes de Empezar

Los entregables de diseño no necesitan nube. Para generación práctica de señales, emitirás **logs estructurados de agente** localmente y escribirás **detecciones como consultas** (estilo KQL) que podrías pegar en Sentinel/Defender o adaptar a cualquier SIEM.

:::warning[Ética y legalidad — usa solo datos sintéticos]
**Nunca** uses PII/PHI real. Genera registros falsos (p. ej., con `faker`). Nunca apuntes experimentos de monitoreo o DLP a datos de producción ni a un sistema que no poseas.
:::

---

## Tareas

### Tarea 1 — Clasifica y protege los datos (protección después del acceso)

Define una **clasificación de datos** para Región Salud (público / interno / confidencial / **regulated-PHI**). Para cada clase, especifica el control: cuáles necesitan **etiquetas de sensibilidad**, **cifrado** y **reglas DLP de egreso**. Indica la regla que habría contenido el incidente (p. ej., *"regulated-PHI no puede publicarse en un canal con miembros externos; DLP bloquea + alerta."*).

### Tarea 2 — Instrumenta el comportamiento del agente (haz visible el comportamiento)

Agrega telemetría estructurada a un agente de juguete para que cada paso emita un evento. Esquema mínimo de evento:

```json
{ "ts": "...", "agent_id": "intake-01", "action": "tool_call",
  "tool": "read_patient_record", "count": 1, "data_class": "regulated-PHI",
  "requested_scope": "case:4821", "outcome": "ok" }
```

Registra al menos: `tool_call`, `data_access` (con volumen + clase), `escalation_attempt`, `loop_iteration`. Ejecuta un caso normal y un caso de "over-reach"; conserva ambos logs.

### Tarea 3 — Escribe detecciones de comportamiento (¿nos daríamos cuenta?)

Escribe 3–5 detecciones contra tu telemetría. Exprésalas como consultas estilo SIEM. Ejemplos a implementar:
- **Acceso masivo:** conteo de `data_access` sobre `regulated-PHI` por un agente en 5 min > umbral.
- **Expansión de alcance:** `requested_scope` se expande más allá del id de caso asignado.
- **Intento de escalación:** cualquier evento `escalation_attempt`.
- **Bucle descontrolado:** `loop_iteration` > N sin checkpoint humano.

<details>
<summary>🔧 Detección de ejemplo (estilo KQL — pegar en Sentinel/Defender o adaptar)</summary>

```kusto
// Acceso masivo a datos regulados por un solo agente en una ventana de 5 minutos
AgentTelemetry
| where action == "data_access" and data_class == "regulated-PHI"
| summarize records = sum(count) by agent_id, bin(ts, 5m)
| where records > 25   // ajustar a tu línea base
| project ts, agent_id, records, alert = "Possible bulk PHI access by agent"
```

> El punto es la **señal conductual**, no la sintaxis exacta. La misma lógica funciona en Splunk SPL, Elastic EQL o una comprobación en Python.
</details>

### Tarea 4 — Mapea a NIST AI RMF (Measure) + define respuesta

Para cada detección, anota la función de **NIST AI RMF** que satisface (principalmente **MEASURE**, alimentando **MANAGE**) y la **primera acción de respuesta** (alertar al SOC, revocar token automáticamente, pausar sesión). Esto se convierte en la entrada para el runbook de kill switch del Desafío 04.

---

:::note[🧪 Verificación de conocimiento]
Antes de continuar, asegúrate de poder responder:
1. ¿Por qué monitorear **salidas** es insuficiente — qué captura la telemetría de comportamiento que las salidas omiten?
2. ¿Cuál de los **ocho marcadores de comportamiento** atraparían tus detecciones, y cuál se escaparía?
3. ¿Por qué "una detección sin respuesta" es solo una entrada de diario — qué hace que una alerta sea accionable?
:::

## 📦 Entregable

Una carpeta `data-and-monitoring/` con:
1. `data-classification-and-dlp.md` — clases, controles y la regla de contención (Tarea 1).
2. `agent-telemetry/` — los dos logs de ejecución (normal + over-reach) y el esquema de evento (Tarea 2).
3. `detections.md` — 3–5 detecciones de comportamiento con consultas y umbrales (Tarea 3).
4. `rmf-and-response.md` — detección → función NIST → primera acción de respuesta (Tarea 4).

---

## ✅ Criterios de Éxito

- [ ] Los datos regulados tienen una **etiqueta + regla DLP** que **contendría** el incidente incluso si el acceso tiene éxito.
- [ ] Tu agente emite **telemetría estructurada de comportamiento**, no solo salidas finales.
- [ ] Al menos una detección se dispara en el log de **over-reach** y permanece silenciosa en el log **normal** (bajos falsos positivos).
- [ ] Cada detección mapea a una función de **NIST AI RMF** y a una **primera acción de respuesta** concreta.
- [ ] Un analista SOC podría actuar sobre tus alertas sin leer el chain-of-thought del modelo.

---

## 🎓 Puntos de Enseñanza

- **Protege los datos, no solo el perímetro.** Etiquetas + DLP significan que un exceso de alcance queda *contenido*, no se vuelve catastrófico.
- **Monitorea comportamiento, no solo salidas.** La señal peligrosa está en las *llamadas a herramientas y el patrón de acceso*: los ocho marcadores de comportamiento anteriores, exactamente donde vivieron el reconocimiento de HF y el escaneo de red de o1. El triaje asistido por IA fue lo que permitió a los defensores de HF encontrarlo en el ruido.
- **Una detección sin respuesta es una entrada de diario.** Cada alerta necesita una primera acción; por eso existe el Desafío 04.

---

## ➡️ Siguiente recomendado

| Siguiente | Por qué | Tiempo |
|------|-----|------|
| [**Desafío 04 — Gobernanza, Frenos e Informe Ejecutivo**](../04-governance-brakes/challenge-04.md) | Ya puedes *ver* el mal comportamiento; ahora construye los **frenos** y el informe de junta. Capstone. | 3–4 h · 🔴 Capstone |
| [Descripción general del track — 8 marcadores de comportamiento](../overview.md) | Relee las señales a velocidad de máquina que tus detecciones deben apuntar. | 5 min |
