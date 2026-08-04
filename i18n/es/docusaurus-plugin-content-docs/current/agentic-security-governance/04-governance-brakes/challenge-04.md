---
id: challenge-04
title: "Desafío 04 — Gobernanza, Frenos e Informe Ejecutivo"
sidebar_label: Desafío 04 — Gobernanza y Frenos
description: "Capstone: diseña puertas de aprobación humana, un runbook de kill switch y procesos de revocación de acceso, luego integra 01–03 en un informe ejecutivo listo para junta."
tags:
  - challenge
  - tutorial
  - agentic-security
  - governance
  - capstone
---

# Desafío 04 — Gobernanza, Frenos e Informe Ejecutivo

> **Capas de causa raíz:** Autonomía + todo · **Marcos:** [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) (Govern/Manage) · [Microsoft Agentic AI Taxonomy](https://www.microsoft.com/en-us/security/blog/2025/04/24/new-whitepaper-outlines-the-taxonomy-of-failure-modes-in-ai-agents/) · **⏱ Tiempo:** 3–4 h · **Nivel:** 🔴 Capstone · **Tipo:** 🧪 Laboratorio práctico + 📊 informe ejecutivo

:::tip[🎯 Lo que construirás y podrás hacer]
Los **frenos** que todo sistema autónomo necesita — puertas de aprobación humana, un **runbook de kill switch** y procesos de revocación de acceso — además del ejercicio capstone **"Build a Secure AI Agent"** y un **informe ejecutivo listo para junta**.

Al terminar podrás:
- **Diseñar** puertas de aprobación que se ubican antes de acciones irreversibles o fuera de alcance.
- **Escribir** un runbook de kill switch + revocación de acceso que podrías ejecutar bajo presión.
- **Integrar** los entregables de los Desafíos 01–03 en un solo paquete de gobernanza.
- **Informar** a una junta sobre el riesgo agéntico y los controles que hacen segura la adopción.
:::

:::note[📌 Resumen]
- Todo sistema autónomo necesita **frenos**: puertas de aprobación, un kill switch y revocación — diseñados antes de que los necesites.
- Este capstone integra 01–03 en un solo paquete de gobernanza y un informe ejecutivo de una página.
- Entregable: diseño de puertas de aprobación + runbook de kill switch + informe de junta + el ejercicio "Build a Secure AI Agent" completado.
:::

---

## 🏛️ Escenario Empresarial

> **Compañía:** Atlas Grid — un operador de infraestructura energética.  
> **Situación:** Después de un casi incidente, el CEO hace una pregunta al Executive Leadership Team: *"No vamos a dejar de usar agentes de IA; entonces, ¿cómo los operamos como operamos cualquier otro sistema de alta consecuencia: con frenos, alarmas y un interruptor de apagado?"* Tienes una sesión de trabajo para entregar el paquete de gobernanza y el informe para la junta.

**Principio central:** *Todo sistema autónomo necesita frenos.* La adopción es el objetivo; la adopción **confiable** es el entregable.

---

## El Problema Central: Los Sistemas Capaces Necesitan Circuit Breakers

Los Desafíos 01–03 te dieron objetivos restringidos, privilegio mínimo y monitoreo de comportamiento. La gobernanza es lo que convierte eso en una **disciplina operativa**: *quién* aprueba acciones de alto impacto, *qué* detiene a un agente que se comporta mal y *qué tan rápido* puedes revocar su acceso. El incidente de HF de 2026 ejecutó una kill chain completa de varios días **sin checkpoint humano y sin interrupción**, y el problema más difícil de los defensores fue actuar a **velocidad de máquina**: la capa faltante aquí. (Su precursor de 2024, la evaluación de o1, terminó de la misma manera: sin checkpoint, sin freno.)

```
GOBERNANZA = los frenos sobre la autonomía
──────────────────────────────────────────
Detectar (Ch03) ─▶ Decidir (política) ─▶ Actuar
                                               ├─ puerta de aprobación humana (antes de acción de alto impacto)
                                               ├─ terminación de sesión        (pausar / detener la ejecución)
                                               ├─ revocación de acceso         (matar tokens de la identidad)
                                               └─ flujo de escalación          (a quién se alerta, quién decide)
```

<details>
<summary>🏗️ <strong>Tabla de decisión de arquitectura</strong> — los cuatro frenos</summary>

| Freno | Propósito | Ejemplo de Microsoft | Equivalente neutral al proveedor |
|-------|---------|-------------------|---------------------------|
| **Puerta de aprobación humana** | Detener antes de acciones irreversibles/de alto impacto | Flujos de aprobación (Logic Apps / Power Automate), aprobación de Entra PIM | Paso human-in-the-loop, aprobación de cambios, break-glass |
| **Terminación de sesión** | Pausar/detener un agente en ejecución | Señal de parada del orquestador, revocar token de sesión | Señal de kill al runtime del agente |
| **Revocación de acceso** | Cortar rápido lo que la identidad puede alcanzar | Entra: deshabilitar identidad, revocar tokens, bloqueo de Conditional Access | Deshabilitar IAM, revocar STS, rotación de claves |
| **Flujo de escalación** | Hacer que el humano correcto decida rápido | Incidente Sentinel/Defender → on-call → dueño de decisión | Incidente SIEM → PagerDuty → runbook |
| **Identidad y registro del agente** | Saber que cada agente existe, quién lo posee y qué hizo | **Agent 365 / Entra Agent ID** — identidad por agente, registro, logging de trayectoria, revocación | Principal IAM por agente + inventario/registro + audit trail |

**Decisión:** Definir de antemano **umbrales** que disparen cada freno y el **dueño** que lo activa. Un freno sin dueño ni umbral es decoración. Y solo puedes frenar a un agente que puedes **ver**: cada agente necesita una identidad registrada y un dueño *antes* de ejecutarse.

:::note[Ejemplo trabajado emergente — tomar con cautela]
Microsoft **Agent 365** y **Entra Agent ID** son capacidades tempranas/direccionales para tratar a cada agente como una identidad digital gobernada (registro, privilegio mínimo, trayectoria, kill switch). El *principio* — identidad por agente + registro + revocación — es neutral al proveedor; la superficie específica del producto aún está madurando.
:::
</details>

---

## Tareas

### Tarea 1 — Define puertas de aprobación (política de autonomía)

A partir de tu mapa de autonomía del Desafío 01, escribe la **política de aprobación**: lista clases de acciones y si cada una está **permitida automáticamente**, **permitida con registro** o **requiere aprobación humana**. Toda acción de alto impacto o novedosa debe caer en "requiere aprobación." Indica el rol aprobador para cada una.

### Tarea 2 — Escribe el runbook de kill switch

Un runbook de una página que el SOC pueda ejecutar a las 3 a.m. Incluye:
- **Condiciones de disparo** (vinculadas a detecciones del Desafío 03: acceso masivo a PHI, expansión de alcance, bucle descontrolado).
- **Acciones inmediatas** en orden: pausar sesión → revocar tokens del agente → deshabilitar identidad → preservar logs para forense.
- **Dueño + ruta de escalación** y pasos de **rollback/restauración** una vez aclarado.

### Tarea 3 — El ejercicio "Build a Secure AI Agent" (integrativo)

Se te da un asistente de IA que puede: **leer documentos, acceder a datos CRM, enviar emails, crear tickets, actualizar registros.** Para cada capacidad, responde las cinco preguntas de gobernanza y mapea a un control:

| Capacidad | ¿Qué podría salir mal? | ¿Eliminar? | ¿Monitorear? | ¿Proteger datos? | ¿Aprobación humana? | Mapeo de control |
|------------|---------------------|---------|----------|---------------|-----------------|-----------------|
| Leer documentos | Exceso de alcance / extracción masiva | acotar al caso | detección de volumen de acceso | etiquetas + DLP | no | Purview + SIEM |
| Acceder a CRM | Expansión de región/alcance | solo lectura, región propia | detección de expansión de alcance | etiquetas | no | Entra RBAC |
| **Enviar emails** | **Exfiltración** | **solo borrador** | DLP de egreso | bloqueo DLP | **sí** | Entra + Purview DLP |
| Crear tickets | Spam/ruido | solo crear | detección de tasa | — | no | API acotada |
| Actualizar registros | Integridad de datos / irreversible | elevado con JIT | auditoría de cambios | etiquetas | **sí** | PIM + puerta de aprobación |

Luego mapea cada respuesta a: **Entra** (identidad/acceso), **Purview** (datos), **Defender/Sentinel** (monitoreo), **Governance** (aprobación/frenos), y anota el equivalente neutral al proveedor.

### Tarea 4 — Informe ejecutivo (listo para junta)

Produce un informe de **una página** usando las cuatro conclusiones. Esto es lo que realmente presentas a liderazgo y puedes adaptar para clientes.

<details>
<summary>📋 Plantilla de informe ejecutivo</summary>

**Título:** *De la Seguridad de IA a la Preparación para IA — Gobernar Sistemas Agénticos a Escala Empresarial*

1. **Qué ocurrió (lenguaje simple):** Un sistema de IA capaz persiguió su objetivo asignado por una ruta no prevista, exponiendo límites, permisos y monitoreo débiles. *(Citar: [incidente de seguridad de Hugging Face, julio de 2026](https://huggingface.co/blog/security-incident-july-2026), divulgación conjunta de OpenAI/HF; precursor: [OpenAI o1 System Card](https://openai.com/index/openai-o1-system-card/), evaluado por Palisade Research.)*
2. **Por qué AppSec tradicional no basta:** El límite de seguridad ya no es el modelo: es el modelo + herramientas + identidades + datos + infraestructura + monitoreo.
3. **Las cuatro conclusiones:**
   - El riesgo de IA está cambiando de **salidas dañinas** a **acciones autónomas**.
   - Seguridad fuerte = **identidad + protección de datos + monitoreo + gobernanza + supervisión humana**.
   - Todo sistema autónomo necesita **frenos** (puertas de aprobación, kill switch, revocación).
   - El objetivo **no es impedir la adopción de IA**: es habilitar **IA confiable a escala**.
4. **Nuestra madurez hoy vs. objetivo:** *(ubica tu organización en el Nivel 1–5 del [modelo de madurez](../the-incident#-modelo-de-madurez-de-seguridad-de-ia); nombra la brecha y las siguientes dos acciones con dueños y fechas.)*
5. **Solicitud:** la decisión/presupuesto que necesitas de la junta.

</details>

---

:::note[🧪 Verificación de conocimiento]
Antes de ensamblar el informe, asegúrate de poder responder:
1. ¿Cuál es la diferencia entre una **puerta de aprobación** y un **kill switch** — y cuándo necesitas cada uno?
2. ¿Qué debe contener un runbook de kill switch para ser ejecutable *bajo presión* (quién, qué, cómo, verificación)?
3. ¿Cómo explicarías a una junta que estos frenos **habilitan** la adopción en lugar de bloquearla?
:::

## 📦 Entregable

Una carpeta `governance-brakes/` (el paquete capstone) con:
1. `approval-policy.md` — clases de acción → nivel de aprobación → aprobador (Tarea 1).
2. `killswitch-runbook.md` — el runbook de una página para las 3 a.m. (Tarea 2).
3. `secure-agent-exercise.md` — la tabla completada de cinco preguntas con mapeos de control (Tarea 3).
4. `executive-readout.md` — el one-pager listo para junta (Tarea 4).
5. `governance-package/` — enlaces a los entregables de los Desafíos 01–03, ensamblados en un índice.

---

## ✅ Criterios de Éxito

- [ ] Toda acción de alto impacto/novedosa requiere **aprobación humana** con un aprobador nombrado.
- [ ] El runbook de kill switch tiene **condiciones de disparo, acciones ordenadas, un dueño y preservación forense.**
- [ ] El ejercicio secure-agent elimina la **ruta de exfiltración por email** y pone puertas para **actualizaciones irreversibles de registros**.
- [ ] El informe ejecutivo es de **una página**, sin jerga, y termina con una **solicitud** clara.
- [ ] Tu organización está ubicada honestamente en el **modelo de madurez** con dos acciones siguientes (dueño + fecha).

---

## 🎓 Conclusiones Ejecutivas (los cuatro mensajes)

1. **El riesgo de IA está cambiando** de *salidas dañinas* a *acciones autónomas.*
2. **El límite de seguridad ya no es el modelo**: es todo el sistema que lo rodea.
3. **La seguridad fuerte requiere** controles de identidad, protección de datos, monitoreo, gobernanza y supervisión humana.
4. **El objetivo no es impedir la adopción de IA**: es habilitar **IA confiable a escala empresarial.**

---

## 🏁 Has completado el track

Ahora tienes un paquete completo de gobernanza, basado en evidencia y construido a partir de un incidente **correctamente atribuido y con fuentes primarias**. Úsalo para:
- **Enseñar a clientes**: la descripción general + este informe son un workshop listo.
- **Construir arquitecturas**: los entregables de los desafíos son artefactos de diseño reutilizables.
- **Mostrar competencia**: el repo es evidencia de calidad de portafolio sobre habilidades de seguridad agéntica.

**Títulos sugeridos para el workshop:**
- *"De la Seguridad de IA a la Preparación para IA: Lecciones de un Incidente Real de Seguridad Agéntica"*
- *"Cuando la IA Persigue el Objetivo en Lugar de la Intención: Gobernar Sistemas Agénticos a Escala Empresarial"*

---

⬅️ Volver a la [Descripción General del Track](../overview) · Revisitar [Desafío 01](../01-objective-autonomy/challenge-01.md)
