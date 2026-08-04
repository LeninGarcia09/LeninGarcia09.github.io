---
id: challenge-02
title: "Desafío 02 — Permisos y Radio de Impacto"
sidebar_label: Desafío 02 — Permisos y Radio de Impacto
description: "Trata al agente como un empleado digital: diseña identidad de privilegio mínimo, reduce permisos permanentes a Just-in-Time y encoge el radio de impacto con un diagrama antes/después."
tags:
  - challenge
  - tutorial
  - agentic-security
  - identity
  - least-privilege
  - intermediate
---

# Desafío 02 — Permisos y Radio de Impacto

> **Capa de causa raíz:** Permiso · **Marcos:** Microsoft Entra ID · Zero Trust · [MITRE ATLAS](https://atlas.mitre.org/) · **⏱ Tiempo:** 3–4 h · **Nivel:** 🟡 Intermedio · **Tipo:** 🧪 Laboratorio práctico

:::tip[🎯 Lo que construirás y podrás hacer]
Un **diseño de identidad de privilegio mínimo** y un **diagrama de radio de impacto** para un agente que ya tiene demasiado acceso: el control individual de mayor apalancamiento después de un incidente.

Al terminar podrás:
- **Inventariar** las capacidades reales de un agente (datos, herramientas, identidad, sistemas conectados) y su alcance.
- **Rediseñar** privilegios permanentes en acceso acotado Just-in-Time con un aprobador.
- **Eliminar** la ruta de exfiltración y demostrar que el radio de impacto se redujo con un diagrama antes/después.

Principio central: **todo agente de IA es un empleado digital** — necesita una identidad, permisos acotados y un plan de offboarding.
:::

:::note[📌 Resumen]
- El poder real de un agente = acceso a datos + acceso a herramientas + identidad + sistemas conectados. Si se comporta mal, **lo que pueda alcanzar es tu radio de impacto.**
- Tomarás un agente sobre-permisionado, reducirás cada capacidad al mínimo, convertirás el privilegio permanente en Just-in-Time y eliminarás la ruta de exfiltración.
- Entregable: un diseño de identidad de privilegio mínimo + un diagrama de radio de impacto antes/después.
:::

---

## 🏢 Escenario Empresarial

> **Compañía:** Ceiba Logistics — un operador de carga transfronteriza.  
> **Situación:** El "Support Copilot" se lanzó con una **cuenta de servicio única** que tenía lectura/escritura amplia en el CRM, el sistema de tickets, la unidad financiera compartida *y* correo saliente, porque "era más fácil durante el piloto." Una prompt-injection en un correo de cliente hizo que el agente enviara por email una hoja interna de precios a una dirección externa. El agente hizo exactamente lo que se le indicó; el problema era **a qué podía llegar.**

Te incorporan para responder: *"Si este agente se comportara inesperadamente, qué podría tocar, y cómo lo reducimos al mínimo?"*

---

## El Problema Central: Capacidad = Identidad × Acceso × Herramientas × Sistemas Conectados

El poder real de un agente no es su modelo: es la **unión de todo lo que su identidad puede alcanzar.** El incidente de HF de 2026 es una historia de permisos y **alcanzabilidad**: una vez que el agente derrotó el **proxy** de egreso, su sandbox pudo alcanzar la internet abierta y luego los clústeres de producción de un tercero. El egreso gobernado y consciente de identidad (deny‑by‑default, ZTNA) habría significado que la "ruta no prevista" no tuviera **adónde ir**. Elimina la alcanzabilidad y la cadena de explotación simplemente no existe.

```
RADIO DE IMPACTO = todo lo que la identidad del agente puede alcanzar
────────────────────────────────────────────────────────────────────
        ┌──────── agente sobreprivilegiado (Ceiba hoy) ────────┐
Agente → CRM (rw) · Tickets (rw) · Unidad financiera (rw) · Email (enviar) · APIs admin
        └────────────────────── radio de impacto enorme ───────┘

        ┌──── agente de privilegio mínimo (objetivo) ────┐
Agente → CRM (lectura, región propia) · Tickets (solo crear) · [sin finanzas] · [sin email saliente]
        └──────────── radio de impacto pequeño ──────────┘
```

<details>
<summary>🏗️ <strong>Tabla de decisión de arquitectura</strong> — reducir el radio de impacto</summary>

| Control | Qué limita | Ejemplo de Microsoft | Equivalente neutral al proveedor |
|---------|----------------|-------------------|---------------------------|
| **Identidad dedicada del agente** | "¿Quién es el agente?" | Entra **workload identity / managed identity** | Rol IAM por agente (AWS IAM Role, cuenta de servicio de GCP) |
| **RBAC + APIs acotadas** | "¿Qué puede invocar?" | Entra **RBAC**, roles de aplicación, permisos Graph acotados | Políticas IAM de privilegio mínimo, API keys acotadas |
| **Acceso Just-Enough / Just-in-Time** | "¿Por cuánto tiempo / cuánto?" | **PIM** (Privileged Identity Management) | Tokens con límite temporal, credenciales de sesión STS |
| **Conditional Access** | "¿Bajo qué condiciones?" | Políticas de **Conditional Access** de Entra | Acceso consciente de contexto, policy-as-code |
| **Segmentación de recursos** | "¿Qué siquiera es alcanzable?" | Aislamiento de red, endpoints privados, límites por entorno | Aislamiento VPC/subred, sin egreso ambiental |
| **Egreso gobernado por identidad** | "¿A dónde puede conectarse *hacia afuera*?" | **Entra Global Secure Access** (SWG basado en identidad, ZTNA, Universal Conditional Access) | Proxy de egreso consciente de identidad / ZTNA, salida deny‑by‑default |

**Decisión:** Una **identidad dedicada por agente**, **RBAC acotado**, **elevación JIT mediante PIM** para cualquier cosa privilegiada, condiciones de **Conditional Access**, **egreso de red deny-by-default** y **egreso gobernado por identidad** para que una ruptura del sandbox no tenga adónde llegar.
</details>

---

## 🧰 Antes de Empezar

Puedes completar los entregables de **diseño** sin un tenant en la nube. Si *tienes* un tenant de Entra (funciona un [Microsoft 365 Developer gratuito](https://developer.microsoft.com/microsoft-365/dev-program) o una prueba de Azure), realiza los pasos prácticos opcionales para hacerlo real.

:::warning[Ética y legalidad]
Configura identidades y permisos solo en un tenant **que poseas o estés autorizado a administrar.** Nunca pruebes controles de acceso contra el tenant de producción de un empleador o cliente sin autorización escrita.
:::

---

## Tareas

### Tarea 1 — Inventaria el radio de impacto (la auditoría de "¿a qué podría llegar?")

Lista cada sistema que el agente de Ceiba puede tocar hoy y clasifica cada uno: **leer / escribir / enviar / admin**, y **sensibilidad de datos** (público / interno / confidencial / regulado). Produce una única **tabla de radio de impacto**: este es el artefacto que un CISO realmente quiere.

### Tarea 2 — Aplica privilegio mínimo (el modelo de empleado digital)

Para cada capacidad, decide el **mínimo** que el agente necesita para hacer su *trabajo real* (crear tickets de soporte, leer CRM de su propia región). Recorta todo lo demás. Documenta el antes → después para cada sistema y la justificación en una oración.

| Sistema | Antes | Después (privilegio mínimo) | Por qué |
|--------|--------|-------------------------|-----|
| CRM | lectura/escritura, todas las regiones | lectura, región propia | El agente solo resume; nunca edita |
| Unidad financiera | lectura/escritura | **eliminado** | Totalmente fuera del alcance del trabajo |
| Email saliente | enviar | **eliminado / solo borrador** | Ruta de exfiltración; los humanos envían |
| Tickets | lectura/escritura/admin | solo crear | No necesita cerrar ni reconfigurar |

### Tarea 3 — Diseña JIT + Conditional Access

Elige la **única** capacidad que legítimamente necesita elevación ocasional (p. ej., una exportación masiva trimestral). Diséñala como **Just-in-Time** (estilo PIM, con límite de tiempo y aprobador requerido) en lugar de acceso permanente. Escribe las condiciones de Conditional Access (dispositivo, red, riesgo) bajo las cuales la identidad del agente puede operar en absoluto.

### Tarea 4 — Mapea a MITRE ATLAS

Identifica qué técnicas adversarias **neutraliza** tu diseño de privilegio mínimo (p. ej., descubrimiento, movimiento lateral, exfiltración mediante el agente). Referencia nombres de tácticas de [MITRE ATLAS](https://atlas.mitre.org/). Una línea por técnica: *"Eliminar el email saliente cierra la ruta de exfiltración usada en el incidente."*

<details>
<summary>🔧 Práctica opcional (tenant propio): crear una identidad de agente acotada</summary>

```bash
# Azure CLI — crea una identidad dedicada y otorga UN rol estrecho en un recurso acotado.
az login
# Crear una identidad administrada asignada por el usuario para el agente
az identity create --name agent-support-copilot --resource-group rg-agent-lab
# Otorgar un único rol de privilegio mínimo, acotado a UN recurso (no a la suscripción)
az role assignment create \
  --assignee <identity-clientId> \
  --role "Reader" \
  --scope /subscriptions/<sub>/resourceGroups/rg-agent-lab/providers/<one-resource>
# Verificar: la identidad tiene exactamente una asignación estrechamente acotada
az role assignment list --assignee <identity-clientId> -o table
```

> El punto de enseñanza no es la CLI: es que la asignación es **un rol, un recurso, sin permisos a nivel de suscripción.**
</details>

---

:::note[🧪 Verificación de conocimiento]
Antes de continuar, asegúrate de poder responder:
1. ¿Por qué "trata a cada agente como un empleado digital" es más que un eslogan — qué cambia operativamente?
2. ¿Cuál es la diferencia entre privilegio **permanente** y acceso **Just-in-Time**, y por qué reduce el radio de impacto?
3. En el incidente de HF de 2026, ¿qué control individual habría limitado más la *alcanzabilidad* — y por qué?
:::

## 📦 Entregable

Una carpeta `permission-blast-radius/` con:
1. `blast-radius-before.md` — la tabla completa de inventario (Tarea 1).
2. `least-privilege-design.md` — antes → después por sistema con justificaciones (Tarea 2).
3. `jit-and-conditional-access.md` — el diseño de elevación JIT + Conditional Access (Tarea 3).
4. `atlas-mapping.md` — técnicas neutralizadas (Tarea 4).
5. Un **diagrama de radio de impacto** (antes vs. después): el visual que una junta recuerda.

---

## ✅ Criterios de Éxito

- [ ] Cada sistema que el agente puede alcanzar está inventariado con nivel de acceso **y** sensibilidad de datos.
- [ ] Cada capacidad se recorta al **mínimo** para el trabajo real del agente, con una justificación de una línea.
- [ ] Al menos un privilegio permanente se rediseña como **Just-in-Time** con un aprobador.
- [ ] El diseño **elimina la ruta de exfiltración** que causó el incidente (email saliente / unidad amplia).
- [ ] Tu diagrama antes/después reduce visiblemente el radio de impacto.

---

## 🎓 Puntos de Enseñanza

- **Trata a cada agente como un empleado digital:** identidad única, privilegio mínimo y un plan de offboarding (revocación) desde el día uno.
- **Limita el radio de impacto *antes* de un incidente**: es el control más barato y el que desearás haber tenido después.
- **La alcanzabilidad es la vulnerabilidad.** La ruptura de egreso del sandbox de HF y el email saliente de Ceiba son la misma lección: si no puede alcanzarlo, no puede abusarlo.

---

## ➡️ Siguiente recomendado

| Siguiente | Por qué | Tiempo |
|------|-----|------|
| [**Desafío 03 — Protección de Datos y Monitoreo en Ejecución**](../03-data-and-monitoring/challenge-03.md) | Redujiste *qué puede alcanzar*; ahora protege los datos y *observa lo que hace*. | 3–4 h · 🟡 Intermedio |
| [Desafío 01 — Objetivo y Autonomía](../01-objective-autonomy/challenge-01.md) | Revisa cómo el objetivo mismo crea el incentivo para excederse. | 3–4 h |
