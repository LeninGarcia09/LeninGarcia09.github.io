---
sidebar_position: 2
title: "Desafío 05: Hosted Agent funciona localmente, falla a escala"
---

# Desafío 05: Funciona localmente, falla en producción a escala

:::info[Resumen del escenario]
**Industria:** Retail / E-Commerce | **Contexto regulatorio:** Obligaciones de SLA, NIST AI RMF MANAGE 1.3  
**Tiempo estimado:** 90 minutos | **Costo de Azure:** ~$5–10
:::

---

## Qué está en juego

**TechMart** lanzó un asistente de compras con IA para Black Friday. Funcionó perfectamente en desarrollo con 5 usuarios concurrentes. Con 500 usuarios concurrentes en producción, 40% de las solicitudes agotan el tiempo de espera y el otro 60% devuelve recomendaciones de productos desactualizadas.

> *"Estamos perdiendo $15,000/minuto en carritos abandonados. El agente está ahí, pero no responde. Tenemos 4 horas para corregirlo antes de reiniciar la campaña."*

Debes diagnosticar y corregir una falla de Hosted Agent en producción bajo presión de tiempo.

---

## Habilidades practicadas

- Leer **logs de contenedor de Hosted Agent** y métricas de Micro-VM
- Diagnosticar problemas de **arranque en frío vs. escalado**
- Configurar ajustes de **concurrencia y timeout**
- Implementar el **patrón circuit breaker** para fallas de APIs descendentes
- Usar **Azure Monitor** para identificar cuellos de botella en tiempo real

---

## Marco diagnóstico

Cuando un Hosted Agent falla a escala, revisa en este orden:

```
1. Is the agent running?          → Azure Monitor: agent health metrics
2. Is it receiving requests?      → Application Insights: request rate
3. Is it timing out?              → Check timeout config + downstream latency
4. Is it hitting resource limits? → Micro-VM CPU/memory metrics
5. Are downstream tools failing?  → Tool call success rate in traces
6. Is there a VNet routing issue? → NSG flow logs + private endpoint health
```

---

## 🧰 Antes de empezar — Configuración del entorno

Este desafío es un ejercicio de **resiliencia en producción**: un agente que funciona en desarrollo colapsa a escala. Tu configuración necesita observabilidad y una forma de generar carga concurrente para reproducir y corregir la falla.

### Prerrequisitos

| Requisito | Por qué lo necesitas | Cómo verificar |
|-------------|-----------------|--------------|
| **Suscripción de Azure** + un **Hosted Agent** desplegado | Lo que está bajo carga | Azure portal |
| **Azure Monitor / Application Insights** | Leer métricas de salud, tasa de solicitudes, trazas | Azure portal |
| **Azure CLI** | Inspeccionar configuración del agente, timeouts, escalado | `az version` |
| Herramienta de generación de carga — **Azure Load Testing** (o `locust` *(tercero)*) | Reproducir la concurrencia que lo rompe | Azure portal / `pip show locust` |
| Acceso a las herramientas/APIs descendentes del agente | Las correcciones de circuit breaker y latencia viven aquí | configuración de app |

### Paso 0 — Mira el sistema primero (5 min) — *el "a dónde voy"*

Antes de cambiar algo, abre los paneles. Bajo presión, el instinto es adivinar — resístelo y lee las métricas.

1. `az login`.
2. Abre el recurso **Application Insights** de tu Hosted Agent → **Live metrics** y las secciones **Failures** + **Performance** ([App Insights overview](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview)). Si tu agente no tiene App Insights adjunto, agrega uno desde el recurso del agente → **Monitoring**.
3. Anota tres números base con el tráfico *actual*: tasa de solicitudes, tasa de fallas y latencia p95 de dependencias.

✅ **Listo cuando** puedas ver tasa de solicitudes en vivo, tasa de fallas y latencia de dependencias para el agente — esta es la instrumentación de la que dependen las Tareas 1–3.

### Paso 1 — Reproducir la falla con carga (10 min)

No puedes corregir lo que no puedes reproducir. Crea un recurso de **Azure Load Testing** y aumenta la concurrencia (p. ej., 5 → 100 → 500) para encontrar dónde empiezan los timeouts — ese punto de inflexión es tu objetivo. Sigue el [create-and-run quickstart](https://learn.microsoft.com/azure/load-testing/quickstart-create-and-run-load-test); apunta la prueba al endpoint de tu agente.

✅ **Listo cuando** una prueba de carga reproduzca la falla (la tasa de error sube con mayor concurrencia) y hayas registrado el nivel de concurrencia donde empieza — ese número enmarca cada corrección.

> 🟦 **Nota Microsoft-first:** diagnóstico y carga son nativos de Microsoft — **Azure Monitor**, **Application Insights**, métricas de **Micro-VM** de Hosted Agent y **Azure Load Testing**. `locust` se lista solo como alternativa local de terceros para generación rápida de carga.

> **Correcciones comunes:** la prueba de carga no alcanza el agente → revisa la URL del endpoint + cualquier header de autenticación requerido. Sin métricas de Micro-VM → confirma que el objetivo es Hosted Agent (no una ejecución local) y que las métricas están habilitadas en Azure Monitor.

### El recorrido por este desafío

1. **Marco diagnóstico** — recorre el checklist de 6 pasos en orden.
2. **Tarea 1** — leer logs + métricas de Micro-VM para encontrar el cuello de botella.
3. **Tarea 2** — corregir configuración de concurrencia/timeout.
4. **Tarea 3** — agregar un circuit breaker para fallas descendentes.
5. **Criterios de éxito** — menos de 5% de errores con 100 usuarios concurrentes.
6. **Adáptalo a tu negocio** — endurecer *tu* agente para carga pico.

> ⏱️ **Presupuesto de tiempo:** ~90 minutos. Sigue el orden diagnóstico — saltar a una solución antes de encontrar el cuello de botella es cómo se agota el reloj de 4 horas.

---

## Tus tareas

### Tarea 1: Habilitar monitoreo integral

```python
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential()
)

# Enable telemetry with Application Insights connection string
connection_string = client.telemetry.get_connection_string()
print(f"App Insights connection string: {connection_string}")

# Enable automatic tracing
client.telemetry.enable()

# Now ALL agent operations are automatically traced
```

```bash
# Query agent performance metrics in Azure Monitor
az monitor metrics list \
  --resource /subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.MachineLearningServices/workspaces/<project> \
  --metric "AgentRequestCount,AgentRequestLatency,AgentErrorRate" \
  --interval PT1M \
  --output table
```

### Tarea 2: Implementar reintento + circuit breaker

```python
import asyncio
import time
from typing import Optional

class AgentCircuitBreaker:
    """Prevent cascade failures when the agent is overwhelmed."""
    
    def __init__(self, failure_threshold=5, recovery_timeout=30):
        self.failure_count = 0
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.last_failure_time: Optional[float] = None
        self.state = "CLOSED"  # CLOSED=normal, OPEN=failing, HALF_OPEN=testing
    
    def call(self, func, *args, **kwargs):
        if self.state == "OPEN":
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = "HALF_OPEN"
            else:
                raise Exception("Circuit breaker OPEN — service unavailable. Try again in 30s.")
        
        try:
            result = func(*args, **kwargs)
            if self.state == "HALF_OPEN":
                self.state = "CLOSED"
                self.failure_count = 0
            return result
        except Exception as e:
            self.failure_count += 1
            self.last_failure_time = time.time()
            if self.failure_count >= self.failure_threshold:
                self.state = "OPEN"
            raise e

# Usage
breaker = AgentCircuitBreaker(failure_threshold=5, recovery_timeout=30)

def get_product_recommendation(user_query: str) -> str:
    return breaker.call(
        lambda: client.agents.runs.create_and_process(
            thread_id=thread.id,
            agent_id=agent.id,
            timeout=10  # 10 second hard timeout per request
        )
    )
```

### Tarea 3: Implementar connection pooling + procesamiento asíncrono

```python
import asyncio
from concurrent.futures import ThreadPoolExecutor
from azure.ai.projects.aio import AIProjectClient as AsyncAIProjectClient

async def process_user_request(client: AsyncAIProjectClient, user_query: str, session_id: str):
    """Process a single user request asynchronously."""
    thread = await client.agents.threads.create()
    
    await client.agents.messages.create(
        thread_id=thread.id,
        role="user",
        content=user_query
    )
    
    run = await client.agents.runs.create_and_process(
        thread_id=thread.id,
        agent_id=os.environ["AGENT_ID"],
    )
    
    messages = await client.agents.messages.list(thread_id=thread.id)
    return {"session_id": session_id, "response": messages.data[0].content[0].text.value}

async def process_batch(queries: list[dict]) -> list[dict]:
    """Process up to 50 concurrent requests."""
    async with AsyncAIProjectClient(
        endpoint=os.environ["PROJECT_ENDPOINT"],
        credential=DefaultAzureCredential()
    ) as client:
        # Limit concurrency to avoid overwhelming the agent
        semaphore = asyncio.Semaphore(50)
        
        async def bounded_call(query):
            async with semaphore:
                return await process_user_request(client, query["text"], query["session_id"])
        
        return await asyncio.gather(*[bounded_call(q) for q in queries], return_exceptions=True)
```

### Tarea 4: Script de health check de producción

```python
import httpx
import asyncio

async def check_agent_health():
    """Run every 30 seconds in production."""
    checks = {
        "endpoint_reachable": False,
        "agent_responds": False,
        "latency_ms": None,
        "error": None,
    }
    
    start = time.time()
    try:
        # Quick smoke test
        thread = client.agents.threads.create()
        client.agents.messages.create(thread_id=thread.id, role="user", content="ping")
        run = client.agents.runs.create_and_process(thread_id=thread.id, agent_id=os.environ["AGENT_ID"])
        
        checks["endpoint_reachable"] = True
        checks["agent_responds"] = run.status == "completed"
        checks["latency_ms"] = int((time.time() - start) * 1000)
        
        # Clean up health check thread
        client.agents.threads.delete(thread.id)
        
    except Exception as e:
        checks["error"] = str(e)
    
    # Alert if latency > 5s or agent not responding
    if checks["latency_ms"] and checks["latency_ms"] > 5000:
        print(f"⚠️  HIGH LATENCY: {checks['latency_ms']}ms — investigate scaling")
    if not checks["agent_responds"]:
        print(f"🚨 AGENT NOT RESPONDING: {checks['error']}")
    
    return checks
```

### Tarea 5: Pruebas de escala con simulación de carga

```bash
# Install hey (HTTP load tester)
# Run 500 concurrent requests to your agent endpoint
hey -n 1000 -c 500 -t 30 \
  -H "Authorization: ****** account get-access-token --query accessToken -o tsv)" \
  -m POST \
  -T "application/json" \
  -d '{"query": "Show me gaming laptops under $1000"}' \
  https://<your-endpoint>/process-query

# Expected output shows:
# - Response time distribution
# - Error rate (target: <1%) - check for 429 rate limit errors too
# - Throughput (requests/second)
```

---

## Criterios de éxito

- [ ] Application Insights muestra trazas para todas las solicitudes del agente (no solo errores)
- [ ] El circuit breaker bloquea correctamente solicitudes cuando el conteo de fallas supera el umbral
- [ ] El procesamiento batch asíncrono maneja 50 solicitudes concurrentes sin timeouts
- [ ] El script de health check identifica correctamente un agente detenido o lento
- [ ] La prueba de carga muestra &lt;5% de tasa de error con 100 usuarios concurrentes

---

## 🔁 Adáptalo a tu propio negocio

El escenario es un **asistente de compras de Black Friday**, pero *cualquier* agente enfrenta la brecha entre "funciona en la demo" y "sobrevive tráfico real". El enfoque diagnosticar-en-orden + patrones de resiliencia aplica a todo agente de producción.

### Paso 1 — Encuentra tu momento de carga pico

| Industria | Evento pico | Qué falla primero |
|----------|----------------|------------------|
| **Retail / e-commerce** | Black Friday / venta relámpago | Timeouts, recomendaciones obsoletas |
| **Servicios financieros** | Apertura de mercado, temporada fiscal | Saturación de APIs descendentes |
| **Salud** | Periodos de inscripción | Recuperación lenta bajo concurrencia |
| **Viajes / hospitalidad** | Picos de reservas en festivos | Arranques en frío, rate limits |
| **Sector público** | Fechas límite de presentación | Colas acumuladas, solicitudes descartadas |

### Paso 2 — Mapea los bloques de construcción a tu stack (Microsoft-first)

| En este desafío | En tu proyecto — usa |
|-------------------|-----------------------|
| Métricas de salud + solicitudes | **Azure Monitor** + **Application Insights** |
| Métricas de contenedor / Micro-VM | Métricas de Hosted Agent en **Azure Monitor** |
| Generación de carga | **Azure Load Testing** *(locust como opción local de terceros)* |
| Ajuste de concurrencia / timeout | Configuración de escalado + timeout de Hosted Agent |
| Circuit breaker | Resiliencia en código (p. ej., Polly para .NET) para llamadas descendentes |
| Cache de datos calientes | **Azure Cache for Redis** para recomendaciones/consultas |

### Paso 3 — Checklist de implementación de 5 preguntas

1. **¿Puedes ver en vivo tasa de solicitudes, tasa de fallas y latencia?** Si no → instrumenta primero, corrige después.
2. **¿Puedes reproducir la falla con carga?** Si no → ejecuta Azure Load Testing antes de cambiar algo.
3. **¿Es arranque en frío o saturación?** Lee métricas de Micro-VM — la corrección es completamente distinta.
4. **¿Las fallas descendentes se propagan en cascada?** Si sí → agrega circuit breaker + timeouts.
5. **¿Los datos calientes se recalculan en cada solicitud?** Si sí → cachea (Azure Cache for Redis).

### Paso 4 — Plan de despliegue de 1 semana

| Día | Acción | Propietario |
|-----|--------|-------|
| **Día 1** | Agregar instrumentación completa de solicitudes/dependencias | SRE |
| **Día 2** | Prueba de carga para encontrar el punto de inflexión de falla | SRE |
| **Día 3** | Ajustar configuración de concurrencia + timeouts | Desarrollador backend |
| **Día 4** | Agregar circuit breaker + timeouts descendentes | Desarrollador backend |
| **Día 5** | Agregar cache; repetir prueba de carga para confirmar menos de 5% de errores | SRE |

### Paso 5 — Demuestra el ROI

- **Tasa de error a carga objetivo** — % de solicitudes fallidas a concurrencia pico *(objetivo: bajo 5%)*.
- **Latencia P95 bajo carga** — tiempo de respuesta en pico *(objetivo: dentro del SLA)*.
- **Impacto de arranque en frío** — % de solicitudes lentas atribuibles al arranque en frío *(objetivo: cerca de 0)*.

> 💡 **Regla práctica:** "funciona localmente" prueba corrección; producción prueba concurrencia. Instrumenta, reproduce con carga y luego corrige en orden diagnóstico — adivinar bajo un reloj de pérdida de ingresos alarga las interrupciones.

### Hacerlo en solitario (sin equipo, orientado a portafolio)

¿Sin equipo ni presupuesto? Un reporte de prueba de carga antes/después es uno de los artefactos más claros de "hago sistemas production-ready" que puedes mostrar. Ejecuta la semana en solitario:

- **Lun–Mar** — instrumenta solicitudes/fallas/latencia y luego ejecuta una primera prueba de carga para encontrar el punto de inflexión.
- **Mié–Jue** — ajusta concurrencia/timeouts, agrega un circuit breaker y cachea datos calientes.
- **Vie** — repite la prueba de carga y captura el gráfico antes/después de tasa de error vs. concurrencia.

📦 **Entrega este artefacto:** un reporte de prueba de carga (antes/después) que muestre tasa de error bajo 5% en pico. Bullet para CV: *"Endurecí un agente para tráfico pico — mantuve tasa de error bajo 5% y p95 dentro del SLA con 500 usuarios concurrentes."*

> 🆓 **Ruta free-tier:** si no hay presupuesto para Azure Load Testing, ejecuta `locust` *(tercero)* localmente contra un endpoint de nivel gratuito — el reporte se ve igual.

---

<details>
<summary>📋 <strong>Mapeo regulatorio</strong> — SLA · EU AI Act · NIST</summary>

| Requisito | Regulación | Implementación |
|-------------|-----------|----------------|
| Compromisos de confiabilidad del servicio | SLA / Contrato | Circuit breaker + monitoreo de salud |
| Registro de incidentes | EU AI Act Art. 20 | Todas las fallas registradas con contexto en Azure Monitor |
| Monitoreo de desempeño | NIST AI RMF MANAGE 1.3 | Métricas de latencia + alertas automatizadas |
| Degradación elegante | Buena práctica de ingeniería | Circuit breaker devuelve mensaje fallback útil |

</details>

---

<details>
<summary>💡 Pistas</summary>

1. **Arranque en frío vs. carga sostenida**: Si la PRIMERA solicitud agota el tiempo pero las siguientes tienen éxito, es arranque en frío. Si la degradación ocurre gradualmente, es límite de recursos o cuello de botella descendente.
2. **Tamaño del semáforo**: `Semaphore(50)` limita a 50 llamadas concurrentes al agente. Ajusta según tu cuota de Foundry (el límite de tokens por minuto afecta más el throughput que la concurrencia bruta).
3. **Limpieza de threads**: Cada `client.agents.threads.create()` crea un thread persistente. Elimina siempre los threads de health check. A 500 req/min, acumularás 30,000 threads/hora si no limpias.
4. **El cuello de botella real suele ser el modelo**: A escala, la cuota de tokens por minuto (TPM) de GPT-4o suele ser el límite vinculante, no el runtime del agente. Revisa errores `429 Too Many Requests` en tus trazas.

</details>

---

## Comprobación de conocimientos

1. ¿Cuál es la diferencia entre una falla de arranque en frío y una falla de carga sostenida en Hosted Agents?
2. ¿Cuándo debe un circuit breaker transicionar de OPEN a HALF_OPEN?
3. ¿Por qué el procesamiento asíncrono es más eficiente que threading para llamadas de agentes I/O-bound?
4. ¿Sobre qué métrica de Azure Monitor alertarías para detectar degradación del agente antes de que los clientes lo noten?

---

## Limpieza

```bash
# No persistent infrastructure beyond the agent itself
# Delete test threads via SDK if you created many
```
