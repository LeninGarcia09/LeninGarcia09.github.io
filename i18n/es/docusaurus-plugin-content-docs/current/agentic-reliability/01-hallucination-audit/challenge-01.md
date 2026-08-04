---
id: challenge-01
title: "Desafío 01 — Auditoría de alucinaciones"
sidebar_label: Desafío 01 — Auditoría de alucinaciones
---

# Desafío 01 — Auditoría de alucinaciones

## 🏦 Escenario empresarial

> **Empresa:** Meridian Capital Partners — una firma mediana de gestión de activos  
> **Situación:** Tu equipo construyó un agente de IA para análisis financiero durante un hackathon de fin de semana. En el demo impresionó a todos. Seis semanas después, el CFO lo usó para preparar una presentación para la junta. El deck incluía **tres cifras incorrectas**: el rendimiento de una acción estaba desviado en 12%, una estadística de volumen correspondía a otro ticker y una cifra fue completamente inventada porque la base de datos estuvo bloqueada de forma momentánea durante la consulta.  
> **Nadie lo detectó antes de la reunión de la junta.**

Te incorporan como AI Solution Architect para diagnosticar y corregir el sistema antes de que provoque un incidente regulatorio o reputacional.

---

## El problema central: la paradoja de la ayuda

El patrón "Simple Agentic" tiene una falla fatal: **los LLM están entrenados para ser útiles, no para ser correctos**. Cuando una herramienta falla —base de datos bloqueada, timeout de red, error de permisos— un agente bien intencionado no se detiene. Alucina datos plausibles a partir de sus pesos de entrenamiento y los presenta con el mismo acabado profesional que si provinieran de datos reales.

```
# What the tool returned (INTERNAL ERROR):
{"ticker": "META", "error": "IO Error: Could not set lock on file..."}

# What the agent told the user 8 turns later:
"Meta Platforms (META) delivered the strongest upside in 2024.
| Stock | Approx. 2024 % Gain |
|-------|---------------------|
| META  | ≈ 30%               |  ← FABRICATED from training data
| AMZN  | ≈ 10%               |  ← FABRICATED
| NFLX  | ≈ -5%               |  ← FABRICATED"
```

El modelo generó cifras redondeadas y "aproximadas" que parecían profesionales, pero estaban totalmente desconectadas de los registros reales de la base de datos.

---

<details>
<summary>🏗️ <strong>Tabla de decisión de arquitectura</strong> — compensaciones entre exactitud y auditabilidad</summary>

| Enfoque | Garantía de exactitud | Auditabilidad | Complejidad |
|----------|-------------------|--------------|------------|
| ❌ Simple Agentic (sin barreras) | Ninguna — alucinación silenciosa | Ninguna | Baja |
| ⚠️ Restricción solo por prompt ("only use real data") | Probabilística — se puede evadir | Ninguna | Baja |
| ✅ Hook `PostToolUse` + detención estricta ante error | Determinista | Completa | Media |
| ✅ Respuesta estructurada de error + capa de validación | Determinista | Completa + trazable | Media |

**Decisión:** usa hooks PostToolUse combinados con contratos de error estructurados en cada herramienta. Nunca permitas que el LLM "compense" por una falla de herramienta.

</details>

---

## 🧰 Antes de empezar — configuración del entorno

Este desafío es práctico. Las tareas siguientes asumen que ya tienes un modelo que puedes invocar y una base de datos que puedes consultar. **Si nunca has construido un agente, sigue estos cinco pasos en orden**: al final tendrás un agente en ejecución al que podrás ver alucinar, que es precisamente el objetivo de la Tarea 1. Reserva ~30 minutos para la configuración.

### Prerrequisitos

| Requisito | Por qué lo necesitas | Cómo obtenerlo / comprobarlo |
|-------------|-----------------|-----------------------|
| Python 3.10+ | Bucle asíncrono del agente + dataclasses | `python --version` → si falta, instálalo desde [python.org/downloads](https://www.python.org/downloads/) |
| Una **suscripción de Azure** | Para crear el modelo de Azure OpenAI en el Paso 1 | [azure.microsoft.com/free](https://azure.microsoft.com/free/) — la capa gratuita es suficiente |
| **Azure CLI** | Permite que tu código inicie sesión sin pegar API keys | `az version` → si falta, [instala Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) |
| Modelo de **Azure OpenAI** mediante [Azure AI Foundry](https://ai.azure.com) | El modelo que impulsa el agente — **ruta principal Microsoft-first** | Desplegarás `gpt-4o` en el **Paso 1** |
| Sistema de registro: **Azure SQL Database** / **Microsoft Fabric (OneLake)** en producción; DuckDB como sustituto *local* sin costo aquí | Capa de datos determinista (misma consulta → mismo resultado) | Se instala con `pip` en el Paso 0 |
| VS Code + una terminal | Necesitas leer el hilo completo de mensajes sin procesar | [code.visualstudio.com](https://code.visualstudio.com) |

### Paso 0 — Crea un espacio de trabajo aislado (5 min)

**Dónde ejecutar esto:** el Paso 0 corre **localmente en tu propia máquina**: abre una terminal (la terminal integrada de VS Code, PowerShell o bash). No tocas Azure hasta el Paso 1. Un entorno virtual (`venv`) mantiene separados los paquetes de este desafío, de modo que nada de lo que instales aquí rompa otro proyecto.

```bash
mkdir hallucination-audit && cd hallucination-audit
python -m venv .venv

# Activate it (your prompt should then start with "(.venv)"):
# Windows (PowerShell):  .venv\Scripts\Activate.ps1
# Windows (cmd):         .venv\Scripts\activate.bat
# macOS/Linux:           source .venv/bin/activate

# Microsoft-first stack. duckdb is only the local, offline stand-in for the system of record.
pip install azure-ai-projects azure-identity openai pydantic tiktoken duckdb python-dotenv
```

✅ **Terminaste este paso cuando** tu prompt muestra `(.venv)` y `pip list` incluye `azure-ai-projects`.

### Paso 1 — Despliega un modelo en Azure AI Foundry — *aquí es donde debes entrar* (10 min)

Las tareas llaman a un modelo real. Aquí tienes exactamente dónde hacer clic para crear uno y los **dos valores que debes copiar**. Si te atoras, sigue la guía oficial: [Create and deploy an Azure OpenAI resource](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/create-resource).

1. Ve a **[ai.azure.com](https://ai.azure.com)** e inicia sesión con tu cuenta de Azure.
2. Haz clic en **+ Create project** (acepta el nuevo recurso/hub predeterminado que te ofrezca). Espera ~1 min a que se aprovisione.
3. En el panel izquierdo, dentro de **My assets**, haz clic en **Models + endpoints**.
4. Haz clic en **+ Deploy model → Deploy base model**, busca **`gpt-4o`**, selecciónalo y haz clic en **Confirm → Deploy**.
5. Abre el deployment que acabas de crear y **copia dos cosas**:
   - el **Deployment name** (por ejemplo, `gpt-4o`) → lo guardarás como `MODEL_DEPLOYMENT_NAME`
   - el **endpoint de tu proyecto** — en la página **Overview** del proyecto, el **Azure AI Foundry project endpoint** (se ve como `https://<your-project>.services.ai.azure.com/api/projects/<name>`) → lo guardarás como `PROJECT_ENDPOINT`

> 💡 **¿Eres nuevo en Foundry?** La [introducción para empezar](https://learn.microsoft.com/azure/ai-foundry/openai/overview#get-started-with-azure-openai) recorre el portal con capturas.

### Paso 2 — Configura la autenticación (5 min)

El código de la tarea usa `DefaultAzureCredential`, lo que significa **sin API keys en tu código**: inicia sesión como *tú* a través de Azure CLI. Ese es el patrón sin claves recomendado por Microsoft.

```bash
# 1. Sign in once (opens a browser). Your code reuses this session.
az login

# 2. Save the two values from Step 1 into a .env file (never commit this file).
#    Windows PowerShell:
#      "PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<name>" | Out-File .env -Encoding utf8
#      "MODEL_DEPLOYMENT_NAME=gpt-4o" | Out-File .env -Append -Encoding utf8
#    macOS/Linux:
#      echo 'PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<name>' >> .env
#      echo 'MODEL_DEPLOYMENT_NAME=gpt-4o' >> .env
```

Tus scripts de la tarea cargan estas dos líneas al inicio:

```python
import os
from dotenv import load_dotenv
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

load_dotenv()
project = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential(),
)
DEPLOYMENT = os.environ["MODEL_DEPLOYMENT_NAME"]
```

### Paso 3 — Carga un conjunto de datos pequeño y CONOCIDO (5 min)

No puedes *detectar* una alucinación si no conoces la verdad de base. Crea una tabla mínima donde conozcas cada valor; así, cualquier número "extra" que produzca el agente será **demostrablemente inventado**.

```python
# seed.py — sample values you control (not real market data).
# The point: YOU know these 5 numbers, so anything else the agent shows is fabricated.
import duckdb
con = duckdb.connect("stock_prices.duckdb")
con.execute("CREATE TABLE stock_prices (ticker VARCHAR, date DATE, close DOUBLE)")
con.executemany(
    "INSERT INTO stock_prices VALUES (?, ?, ?)",
    [("META", "2024-12-31", 500.00), ("AMZN", "2024-12-31", 200.00),
     ("NFLX", "2024-12-31", 800.00), ("META", "2024-01-02", 350.00),
     ("AMZN", "2024-01-02", 150.00)],
)
print(con.execute("SELECT * FROM stock_prices").fetchall())
```

Ejecútalo: `python seed.py`. Deberías ver impresas las 5 filas.

> 🟦 **Nota Microsoft-first:** DuckDB se usa aquí solo como sustituto *local*, determinista y sin configuración para que puedas concentrarte en el patrón de guardrails. En producción —en Microsoft o en un engagement con clientes— el sistema de registro es **Azure SQL Database**, **Microsoft Fabric / OneLake**, **Azure Cosmos DB** o **Dataverse**. La arquitectura de guardrails de las Tareas 2–4 es idéntica sin importar el almacén de datos.

### Paso 4 — Haz una prueba rápida de la conexión (2 min)

Antes de la Tarea 1, confirma que el modelo realmente responde. Si esto imprime una respuesta, tu endpoint, el deployment name y `az login` están correctos, así que cualquier falla posterior será *de la lógica de tu agente*, no de la configuración.

```python
# smoke_test.py — proves Steps 1–2 work end to end.
import os
from dotenv import load_dotenv
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

load_dotenv()
project = AIProjectClient(endpoint=os.environ["PROJECT_ENDPOINT"], credential=DefaultAzureCredential())
client = project.inference.get_azure_openai_client(api_version="2024-10-21")
resp = client.chat.completions.create(
    model=os.environ["MODEL_DEPLOYMENT_NAME"],
    messages=[{"role": "user", "content": "Reply with exactly: setup works"}],
)
print(resp.choices[0].message.content)
```

✅ **Estás listo para las tareas cuando** `python smoke_test.py` imprime `setup works`.

> **Correcciones comunes:** `DefaultAzureCredential failed` → ejecuta `az login` de nuevo. `DeploymentNotFound` → `MODEL_DEPLOYMENT_NAME` debe coincidir exactamente con el nombre del Paso 1.5. `401 / PermissionDenied` → en el portal, asigna a tu cuenta el rol **Azure AI User** sobre el proyecto (Access control → Add role assignment).

### La ruta a través de este desafío

1. **Tarea 1** — reproduce la falla (verás al agente mentir).
2. **Tarea 2** — dale a las herramientas un contrato estructurado de errores (haz que las fallas sean legibles).
3. **Tarea 3** — agrega un hook `PostToolUse` (haz que el comportamiento correcto quede *forzado*, no sugerido).
4. **Tarea 4** — agrega un validador (verifica incluso las ejecuciones aparentemente exitosas).
5. **Criterios de éxito** — demuestra que cada guardrail funciona.
6. **Adáptalo a tu negocio** — reemplaza "stocks" por *tu* dominio.

> ⏱️ **Presupuesto de tiempo:** ~30 min de setup y luego ~2–3 horas para las tareas. Haz las Tareas 1–3 en una sola sesión: se construyen unas sobre otras.

---

## Tareas

### Tarea 1 — Reproduce la falla

Construye la línea base "Simple Agentic". Simula un bloqueo de base de datos y observa el comportamiento del agente.

```python
# simple_agent.py — the broken baseline
import json
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

# Tool that can silently fail
def query_financial_data(ticker: str, start_date: str, end_date: str) -> dict:
    try:
        # Simulate DB lock
        raise IOError("Could not set lock on file: stock_prices.duckdb")
        # return db.query(ticker, start_date, end_date)
    except Exception as e:
        # BAD: returns a vague error — LLM will try to "help anyway"
        return {"error": str(e)}

# Run query — watch agent hallucinate past the error
result = run_agent(
    query="Which FANG stock had the highest percent gain in 2024?",
    tools=[query_financial_data]
)
print(result)
# Expected: ERROR or refusal
# Actual:   Polished table of fabricated data
```

**Observa:** ejecútalo e inspecciona el hilo completo de mensajes. Cuenta cuántos turnos pasó el agente "intentando" antes de alucinar una respuesta final. Fíjate en el formato: se ve idéntico a un resultado real.

---

### Tarea 2 — Implementa contratos estructurados de error

Reemplaza los errores vagos por objetos de error estructurados que indiquen al agente que debe detenerse.

```python
# tool_contracts.py — structured error responses
from dataclasses import dataclass
from typing import Optional

@dataclass
class ToolResult:
    success: bool
    data: Optional[dict] = None
    error: Optional[str] = None
    error_category: Optional[str] = None   # "transient" | "permanent" | "scope"
    is_retryable: bool = False
    source_ref: Optional[str] = None        # audit trail: DB table + query hash

def query_financial_data(ticker: str, start_date: str, end_date: str) -> ToolResult:
    try:
        rows = db.execute(
            "SELECT * FROM stock_prices WHERE ticker=? AND date BETWEEN ? AND ?",
            [ticker, start_date, end_date]
        ).fetchall()
        
        return ToolResult(
            success=True,
            data={"ticker": ticker, "rows": rows},
            source_ref=f"stock_prices:ticker={ticker}:{start_date}:{end_date}"
        )
    except IOError as e:
        return ToolResult(
            success=False,
            error=str(e),
            error_category="transient",
            is_retryable=True   # tell agent: retry once, then stop
        )
    except Exception as e:
        return ToolResult(
            success=False,
            error=str(e),
            error_category="permanent",
            is_retryable=False  # tell agent: STOP, do not hallucinate
        )
```

**Prueba:** provoca el mismo error de bloqueo. Verifica que ahora el agente devuelva un mensaje de error claro en lugar de datos inventados.

---

### Tarea 3 — Agrega un hook `PostToolUse` (detención estricta)

El contrato estructurado de error le dice al agente qué ocurrió. El hook `PostToolUse` **impone** el comportamiento correcto de forma determinista: no depende de prompts.

```python
# hooks.py — deterministic guardrails
import json

def post_tool_use_hook(tool_name: str, tool_result: dict) -> dict:
    """
    Intercepts every tool result BEFORE the LLM sees it.
    Hard-stops on permanent errors — removes the 'opportunity' to hallucinate.
    """
    result = ToolResult(**json.loads(tool_result))
    
    if not result.success and not result.is_retryable:
        # Inject a STOP signal — agent cannot continue
        return {
            "action": "TERMINATE",
            "message": (
                f"Tool '{tool_name}' returned a permanent error: {result.error}. "
                "Cannot generate an answer without verified data. "
                "Please try again when the data source is available."
            ),
            "source_error": result.error_category
        }
    
    if not result.success and result.is_retryable:
        # Allow one retry, then stop
        return {
            "action": "RETRY_ONCE",
            "message": f"Transient error on '{tool_name}'. Retrying..."
        }
    
    # Success: pass through with source reference intact
    return {
        "action": "CONTINUE",
        "data": result.data,
        "source_ref": result.source_ref   # audit trail preserved
    }
```

**Por qué esto supera a los guardrails basados en prompts:** un prompt que diga "only use real data" es probabilístico; el modelo puede razonar para esquivarlo (por ejemplo, "aclararé que son estimaciones"). El hook PostToolUse se ejecuta en código Python, antes del bucle de razonamiento del LLM. Es **determinista por construcción**.

---

### Tarea 4 — Construye la capa de validación

Incluso cuando las herramientas funcionan, verifica que el LLM reportó los datos que recibió y no otra cosa.

```python
# validator.py — verify LLM output matches source data
import re

def validate_financial_output(
    llm_response: str,
    source_data: dict,
    tolerance: float = 0.01
) -> dict:
    """
    Extracts all numbers from LLM response and cross-references
    against the source data returned by tools.
    Returns a verification report.
    """
    # Extract all dollar amounts and percentages from response
    numbers_in_response = re.findall(r'\$?([\d,]+\.?\d*)\s*%?', llm_response)
    
    verification_results = []
    for num_str in numbers_in_response:
        num = float(num_str.replace(',', ''))
        # Check if this number appears in source data within tolerance
        found = any(
            abs(num - float(str(val).replace(',', ''))) <= tolerance
            for val in flatten_values(source_data)
        )
        verification_results.append({
            "value": num,
            "verified": found,
            "source_ref": find_source(num, source_data) if found else None
        })
    
    unverified = [r for r in verification_results if not r["verified"]]
    return {
        "all_verified": len(unverified) == 0,
        "unverified_values": unverified,
        "verification_rate": (len(verification_results) - len(unverified)) / max(len(verification_results), 1)
    }

def flatten_values(data: dict) -> list:
    """Recursively extract all numeric values from tool result."""
    values = []
    for v in data.values():
        if isinstance(v, (int, float)):
            values.append(v)
        elif isinstance(v, dict):
            values.extend(flatten_values(v))
        elif isinstance(v, list):
            for item in v:
                if isinstance(item, dict):
                    values.extend(flatten_values(item))
                elif isinstance(item, (int, float)):
                    values.append(item)
    return values
```

---

## Criterios de éxito

- [ ] El agente base reproduce la alucinación cuando la DB está bloqueada
- [ ] El contrato estructurado de error devuelve `is_retryable: false` para fallas permanentes
- [ ] El hook `PostToolUse` detiene al agente ante errores permanentes — cero respuestas alucinadas
- [ ] La capa de validación marca cualquier número de la respuesta que no sea trazable a los datos fuente
- [ ] El sistema devuelve al usuario un **mensaje de error claro y honesto** en lugar de datos inventados
- [ ] Todos los resultados de herramientas incluyen `source_ref` para la trazabilidad

---

## 🔁 Adapta esto a tu propio negocio

El escenario usa un **agente analista financiero**, pero el modo de falla es universal: *cualquier agente que invoque una herramienta que pueda fallar tenderá a fabricar una respuesta en lugar de admitir la falla*. Así puedes llevar este desafío a tu propio dominio, paso a paso.

### Paso 1 — Encuentra tu "momento de informe para la junta"

Identifica la salida de IA en tu organización donde **una respuesta incorrecta y silenciosa cause daño real**. Ese es tu equivalente al deck del CFO. Escríbelo en una frase: *"Cuando nuestro agente se equivoca sobre ___, perdemos ___."*

| Industria | La herramienta que puede fallar | La fabricación que duele |
|----------|------------------------|----------------------------|
| **Healthcare** | Consulta de EHR / resultados de laboratorio | El agente inventa una dosis o un valor de laboratorio |
| **Legal** | Base de datos de jurisprudencia / contratos | El agente cita un caso o una cláusula que no existe |
| **Insurance** | Sistema de pólizas / reclamos | El agente afirma una cobertura que no existe en la póliza |
| **Manufacturing** | API de ERP / inventario | El agente reporta stock o lead-time inexistentes |
| **Retail / e-commerce** | Servicio de precios / catálogo | El agente confirma un precio o un SKU incorrecto |
| **Any SaaS** | API REST interna | El agente devuelve una métrica tomada del entrenamiento, no de tu DB |

### Paso 2 — Mapea los cuatro bloques a tu stack

Nada en la solución es específico de finanzas. Cambia las etiquetas; conserva la arquitectura:

| En este desafío | En tu proyecto — reemplázalo por |
|-------------------|--------------------------------|
| `query_financial_data()` tool | Tu herramienta de datos real: una consulta a **Azure SQL / Fabric**, una herramienta REST en **Azure Functions** o un recuperador RAG de **Azure AI Search**; cualquier API REST/GraphQL |
| `stock_prices.duckdb` | Tu sistema de registro — primero **Azure SQL Database, Microsoft Fabric / OneLake, Azure Cosmos DB, Dataverse**; terceros (Snowflake, Postgres, SAP, Salesforce, ServiceNow) solo si los datos ya viven allí |
| `ToolResult` contract | **El mismo** contrato: es agnóstico al dominio; conserva `success / error_category / is_retryable / source_ref` |
| `validate_financial_output()` | Tu validador: reemplaza la comprobación de números por los campos críticos de tu dominio (códigos, IDs, montos, fechas, nombres) |

### Paso 3 — Checklist de implementación de 5 preguntas

Ejecuta esto hoy mismo sobre **cualquier** agente que tengas. Cada "no" corresponde a una tarea de este desafío:

1. **¿Qué devuelve cada herramienta cuando falla?** Si es una cadena vaga, ya tienes el bug → agrega un contrato estructurado de error (Tarea 2).
2. **¿Puede el modelo "continuar" después de una llamada fallida a una herramienta?** Si sí → agrega una detención estricta con `PostToolUse` (Tarea 3).
3. **¿Es trazable cada dato de la salida a una fuente?** Si no → agrega `source_ref` y un validador (Tarea 4).
4. **¿Cuál es el mensaje honesto de falla que debe ver el usuario?** Escríbelo ahora, antes de necesitarlo en producción.
5. **¿Podrías demostrar el origen de un valor ante un auditor, regulador o cliente?** Si no puedes hacerlo en un clic → aún no tienes rastro de auditoría.

### Paso 4 — Plan de despliegue de 1 semana para un equipo real

| Día | Acción | Responsable |
|-----|--------|-------|
| **Día 1** | Inventariar todas las herramientas que puede invocar tu agente; listar sus modos de falla | Eng lead |
| **Día 2** | Agregar el contrato `ToolResult` a las 1–2 herramientas de mayor riesgo | Backend dev |
| **Día 3** | Agregar detención estricta con `PostToolUse` + mensaje de error honesto | Backend dev |
| **Día 4** | Agregar un validador sobre los campos críticos de la salida | Backend dev |
| **Día 5** | Ejecutar las pruebas "Break & Fix" de abajo contra *tu* sistema y registrar resultados | QA / eng lead |

### Paso 5 — Demuestra el ROI a liderazgo

Mide dos números antes y después. Esa es la slide que justifica el trabajo:

- **Tasa de fallas silenciosas** — % de llamadas fallidas a herramientas que aun así produjeron una respuesta confiada *(objetivo: → 0%)*.
- **Tasa de trazabilidad** — % de valores de salida que llevan un `source_ref` válido *(objetivo: → 100%)*.

> 💡 **Regla práctica:** si no puedes responder *"where did this number come from?"* con un solo clic, el sistema no está listo para producción, sin importar qué tan bien se vea el demo.

### Hacerlo por tu cuenta (sin equipo, con foco en portafolio)

¿Sin equipo ni presupuesto? Este es uno de los mejores artefactos para mostrar: demuestra que construyes agentes **confiables**, no solo demos. Puedes hacerlo tú solo en una semana:

- **Lun–Mar** — construye una herramienta que pueda fallar + el contrato `ToolResult` sobre un dataset público gratuito (o el sustituto DuckDB del setup).
- **Mié–Jue** — agrega la detención estricta con `PostToolUse`, el mensaje honesto de error y el validador con `source_ref`.
- **Vie** — registra el **antes/después** de los dos indicadores de ROI anteriores (silent-failure rate → 0%, traceability → 100%) en el README.

📦 **Entrega este artefacto:** un pequeño repositorio público en GitHub con un resumen de 3 líneas "problema → corrección → resultado medido" y una captura del agente *negándose* a responder cuando la herramienta falla, en vez de inventar. Bullet para CV: *"Cut agent silent-failure rate to 0% and made 100% of outputs source-traceable with a tool-result contract + validation gate."*

> 🆓 **Ruta de costo mínimo:** la capa de consumo de Azure OpenAI más el sustituto local con DuckDB bastan para correr esto por centavos; el costo nunca debería ser el bloqueo.

---

<details>
<summary>📋 <strong>Mapeo regulatorio</strong> — EU AI Act · SOX · FINRA</summary>

| Regulación | Requisito | Cómo lo aborda este desafío |
|-----------|-------------|--------------------------------|
| **EU AI Act Art. 13** | Transparencia — los usuarios deben conocer las limitaciones de la IA | Detención estricta + mensaje de error honesto en lugar de alucinación |
| **EU AI Act Art. 14** | Supervisión humana — las personas pueden intervenir | La capa de validación marca valores no verificados para revisión |
| **SOX Section 302** | Los ejecutivos certifican la exactitud de los informes financieros | `source_ref` + reporte de validación como evidencia de auditoría |
| **FINRA Rule 4511** | Libros y registros — datos trazables | source_ref en cada valor de salida |

</details>

---

<details>
<summary>🧪 <strong>Break &amp; Fix</strong> — encuentra los tres bugs que introdujo tu colega</summary>

Tu colega hizo estas "mejoras". Encuentra y explica cada bug:

```python
# broken_agent.py
def post_tool_use_hook(tool_name, tool_result):
    result = json.loads(tool_result)
    
    # "Fix" 1: Be more helpful by allowing retries
    if result.get("error"):
        return {"action": "RETRY", "attempts": 999}  # ← what's wrong here?
    
    # "Fix" 2: Pass through all data to context
    return {"action": "CONTINUE", "data": result}    # ← what's missing?

def validate_output(response, source):
    numbers = re.findall(r'\d+\.?\d*', response)
    # "Fix" 3: Use exact match only, no tolerance
    return all(float(n) in [float(v) for v in flatten_values(source)]
               for n in numbers)                     # ← why does this fail?
```

:::details[Haz clic para ver las respuestas]
1. **Bucle infinito de reintentos**: `attempts: 999` significa que el agente intentará 999 llamadas de herramienta, consumiendo enormes cantidades de tokens y probablemente alucinando de todos modos cuando "se rinda". Debe ser `RETRY_ONCE` y luego `TERMINATE`.
2. **Falta `source_ref`**: pasar datos en bruto sin una referencia de origen rompe la trazabilidad. Cada valor debe poder rastrearse.
3. **La coincidencia exacta falla con el redondeo**: la DB almacena `174.4199981689453`, el LLM muestra `174.42`. La coincidencia exacta falla y marca una respuesta correcta como no verificada. Usa tolerancia (por ejemplo, `abs(a-b) < 0.01`).
:::

</details>

---

## Comprobación de conocimientos

1. ¿Por qué un hook `PostToolUse` es más confiable que una instrucción en el system prompt como "never make up data"?
2. ¿Cuál es la diferencia entre `is_retryable: true` y `is_retryable: false` en el contrato de error? Da un ejemplo real de cada uno.
3. Un agente obtiene correctamente `$174.4199` de la DB pero muestra `$174.42`. La capa de validación lo marca como no verificado. ¿Cómo corriges el validador sin perder garantías de exactitud?
4. Un regulador pregunta: "Can you prove the $91.80 in this report came from your database?" ¿Qué necesita proporcionar tu sistema?

---

## 📚 Herramientas y referencias

### Herramientas clave para este desafío

> **Microsoft-first:** prioriza herramientas nativas de Azure. Las herramientas de terceros se listan solo cuando aportan una capacidad confiable y de primer nivel que aún no está cubierta de forma nativa.

| Herramienta | Función en este desafío | Enlace |
|------|----------------------|------|
| **Azure AI Foundry Evaluations** | Ejecutar el evaluador de groundedness para medir si cada afirmación del LLM está respaldada por los datos recuperados por herramientas | [Docs](https://learn.microsoft.com/azure/foundry/how-to/evaluate-generative-ai-app) |
| **Azure AI Foundry Tracing** | Capturar spans por turno, incluidos inputs/outputs de llamadas de herramienta, para reconstruir el camino exacto a cada cifra | [Docs](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-setup) |
| **Azure SQL Database / Microsoft Fabric** | Sistema de registro determinista recomendado — mismo SQL = mismo resultado = auditable | [Azure SQL](https://learn.microsoft.com/azure/azure-sql/) · [Fabric](https://learn.microsoft.com/fabric/) |
| **Azure Monitor / Application Insights** | Persistir el rastro de auditoría (`source_ref`, resultados de validación) como telemetría consultable | [Docs](https://learn.microsoft.com/azure/azure-monitor/fundamentals/overview) |
| DuckDB *(third-party)* | Base de datos OLAP embebida y sin costo — sustituto local y offline del sistema de registro mientras aprendes el patrón | [duckdb.org](https://duckdb.org) |
| Pydantic v2 *(third-party)* | Impone contratos estructurados de error en cada respuesta de herramienta — valida el esquema antes de que el LLM vea datos | [docs.pydantic.dev](https://docs.pydantic.dev) |
| tiktoken *(third-party)* | Cuenta los tokens consumidos por los resultados de herramientas — clave para monitoreo de costos y presupuesto de contexto en producción | [GitHub](https://github.com/openai/tiktoken) |
| RAGAS *(third-party)* | Evaluador de fidelidad — mide si las afirmaciones del LLM se desprenden de los datos fuente de las herramientas | [GitHub](https://github.com/explodinggradients/ragas) |
| Patronus AI *(third-party)* | Detección de alucinaciones específica para finanzas con evaluadores conscientes del dominio para lenguaje financiero regulado | [patronus.ai](https://www.patronus.ai) |
| Braintrust *(third-party)* | Pipeline de trace-to-eval — conecta cada ejecución del agente en producción con una puntuación de evaluación para monitoreo continuo | [braintrust.dev](https://www.braintrust.dev) |

### Lectura obligatoria

| Recurso | Por qué importa |
|----------|---------------|
| [The LLM-as-Analyst Trap, Part 1](https://appliedingenuity.substack.com/p/the-llm-as-analyst-trap-a-technical) | El artículo original que describe los 5 modos de falla sobre los que se construye este desafío |
| [AgentHallu Benchmark (arXiv:2601.06818)](https://arxiv.org/abs/2601.06818) | Benchmark riguroso que muestra que incluso los modelos de frontera fallan en escenarios de alucinación con herramientas de varios pasos |
| [Azure AI Foundry — Groundedness Evaluator](https://learn.microsoft.com/azure/foundry/concepts/evaluation-evaluators/rag-evaluators) | Cómo ejecutar groundedness scoring en salidas de agentes a escala en producción |

---

## Limpieza

```bash
# Remove simulated lock files
rm -f *.lock stock_prices.duckdb.lock

# Reset agent conversation threads
az ai agent thread delete --thread-id $THREAD_ID

# Review audit logs
cat audit_trail.jsonl | jq '.[] | select(.verified == false)'
```
