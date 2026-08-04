---
id: challenge-02
title: "Desafío 02 — Deterioro del contexto a escala"
sidebar_label: Desafío 02 — Deterioro del contexto a escala
---

# Desafío 02 — Deterioro del contexto a escala

## 🏥 Escenario empresarial

> **Empresa:** Northbrook Health System — una red regional de salud con 12 hospitales  
> **Situación:** Tu equipo desplegó un agente de apoyo a decisiones clínicas que ayuda a los coordinadores de atención a consultar puntajes de riesgo del paciente, historiales de medicación y tendencias de laboratorio. En demos y QA funcionó sin fallas. Dos semanas después del lanzamiento, el equipo de informática clínica abre un bug: **el agente da respuestas correctas durante las primeras 2–3 preguntas de una sesión y luego empieza a cometer errores sutiles** — rangos de referencia de laboratorio incorrectos, nombres de medicamentos mal atribuidos, direcciones de tendencia equivocadas.  
> **Nadie lo notó durante 11 días porque las respuestas seguían sonando autoritativas.**

Eres el AI Solution Architect. El sistema ya está en producción. Necesitas diagnosticar, cuantificar y corregir la degradación sin rehacerlo por completo.

---

## El problema central: degradación de la inteligencia

La exactitud de un LLM **no crece de forma lineal con el tamaño del contexto**. La investigación publicada en 2026 (arXiv:2601.15300) identificó un umbral crítico: cuando una conversación supera **40–50% de la ventana máxima de contexto**, la exactitud cae de forma catastrófica. En algunos modelos, las puntuaciones F1 disminuyen **45.5% dentro de un rango estrecho del 10% de contexto**.

El mecanismo es la "dilución de atención": el modelo debe distribuir su atención entre todos los tokens del contexto. A medida que el contexto crece, los datos importantes del inicio de la conversación reciben proporcionalmente menos atención. El modelo empieza a predecir a partir de patrones estadísticos en lugar de recuperar los valores concretos presentes en el contexto.

```
Context Size vs. Accuracy (illustrative — from arXiv:2601.15300 pattern)

100% ─────────────────────────────────────────
                    ↑ Safe zone
 55% ───────────────┼──────── CLIFF EDGE (~40-50% fill)
                    │         ↓ Catastrophic collapse begins
 10% ───────────────┼─────────────────────────────────────
      0%          40%       50%            100%
                  Context Window Fill
```

En el patrón "Simple Agentic", cada llamada de herramienta agrega datos en bruto al hilo. Una consulta que devuelve un mes de signos vitales del paciente (5,000+ tokens) infla el contexto, y esos datos permanecen en el hilo para cada llamada posterior al LLM.

```
Turn 1: Query + System Prompt                         = 1,000 tokens
Turn 2: + Lab results (30 days × 5 metrics)           = 6,000 tokens  ← 15% fill
Turn 3: + Medication history (2 years)                = 14,000 tokens ← 35% fill
Turn 4: + Risk score history                          = 18,000 tokens ← 45% fill ← CLIFF
Turn 5: Care coordinator asks a simple question...    ← Model is now unreliable
```

---

<details>
<summary>🏗️ <strong>Tabla de decisión de arquitectura</strong> — comparación de estrategias para el crecimiento del contexto</summary>

| Estrategia | Crecimiento del contexto | Exactitud preservada | Costo |
|----------|---------------|-------------------|------|
| ❌ Simple Agentic (sin pruning) | Cuadrático | Se degrada al superar 40% de llenado | Alto + crece por turno |
| ⚠️ Resumir todos los resultados de herramientas | Controlado | Parcial — los resúmenes pierden precisión | Medio |
| ✅ Presupuesto de ventana de contexto | Acotado | Sí — mantiene el llenado bajo el umbral | Medio |
| ✅ Archivos scratchpad + carga selectiva | Mínimo | Sí — solo se carga lo que necesita el turno actual | Bajo |
| ✅ Delegación a subagentes con contexto limpio | Mínimo | Sí — cada subagente empieza desde cero | Bajo + paralelizable |

**Decisión para healthcare:** combina **presupuesto de ventana de contexto** (nunca superar 35% de llenado) con **archivos scratchpad** (persistir los datos fuera de la ventana de contexto y cargarlos selectivamente por turno).

</details>

---

## 🧰 Antes de empezar — configuración del entorno

El deterioro del contexto solo se revela a lo largo de **muchos turnos**, así que tu configuración debe permitirte ejecutar una sesión multivuelta repetible y medir el llenado del contexto en cada paso.

### Prerrequisitos

| Requisito | Por qué lo necesitas | Cómo comprobarlo |
|-------------|-----------------|--------------|
| Python 3.10+ | Bucle asíncrono del agente + harness de pruebas | `python --version` |
| **Azure OpenAI** mediante [Azure AI Foundry](https://ai.azure.com) | El modelo bajo prueba: debes conocer el tamaño exacto de su ventana de contexto | Despliega `gpt-4o` (128K) en Foundry |
| **Azure AI Foundry — Tracing** | Registrar el % de llenado del contexto como span en cada turno; así *ves* el cliff | [Docs](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-setup) |
| tiktoken *(third-party)* | Contar tokens exactos por turno / por resultado de herramienta | `pip show tiktoken` |
| Almacén scratchpad — **Azure Blob / OneLake / Cosmos DB** (prod); carpeta local aquí | Guardar resultados completos de herramientas *fuera* de la ventana de contexto | Azure portal / `mkdir .scratchpad` |

### Paso 0 — Crea un espacio de trabajo aislado (5 min)

**Dónde ejecutar esto:** el Paso 0 corre **localmente en tu propia máquina**: abre una terminal (la terminal integrada de VS Code, PowerShell o bash). No tocas Azure hasta el Paso 1.

```bash
mkdir context-rot && cd context-rot
python -m venv .venv
# Windows (PowerShell):  .venv\Scripts\Activate.ps1    |    macOS/Linux:  source .venv/bin/activate
pip install azure-ai-projects azure-identity openai tiktoken python-dotenv
mkdir .scratchpad   # local stand-in for Azure Blob / OneLake
```

✅ **Listo cuando** tu prompt muestra `(.venv)` y `pip list` incluye `azure-ai-projects`.

### Paso 1 — Aprovisiona tu modelo e inicia sesión (10 min)

Este desafío usa un modelo real `gpt-4o`. Si **todavía no** has desplegado uno, realiza ahora los **Pasos 1–2 de [Desafío 01 — Auditoría de alucinaciones](../01-hallucination-audit/challenge-01.md)**; ahí están los clics exactos en el portal y los dos valores que necesitas. Después crea un `.env` aquí:

```bash
# .env  — the two values you copied from Azure AI Foundry (never commit this file)
# PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<name>
# MODEL_DEPLOYMENT_NAME=gpt-4o
az login   # keyless auth — your code signs in as you, no API keys
```

**Haz una prueba rápida** antes de continuar: si esto imprime `setup works`, el resto es lógica de tu agente, no configuración.

```python
# smoke_test.py
import os
from dotenv import load_dotenv
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
load_dotenv()
project = AIProjectClient(endpoint=os.environ["PROJECT_ENDPOINT"], credential=DefaultAzureCredential())
client = project.inference.get_azure_openai_client(api_version="2024-10-21")
print(client.chat.completions.create(model=os.environ["MODEL_DEPLOYMENT_NAME"],
      messages=[{"role":"user","content":"Reply with exactly: setup works"}]).choices[0].message.content)
```

> **Correcciones comunes:** `DefaultAzureCredential failed` → ejecuta `az login` otra vez. `DeploymentNotFound` → `MODEL_DEPLOYMENT_NAME` debe coincidir exactamente con el nombre del deployment en Foundry. `401` → asigna a tu cuenta el rol **Azure AI User** sobre el proyecto.

### Paso 2 — Fija tu límite de contexto y una prueba repetible (10 min)

No puedes medir "40% de llenado" sin conocer el denominador. Registra la ventana de contexto de tu modelo y luego crea una lista fija de preguntas multivuelta con respuestas CONOCIDAS (como `CLINICAL_TEST_CASES` en la Tarea 1) para que cada ejecución sea comparable.

```python
# config.py — know your denominator
MODEL = "gpt-4o"
CONTEXT_LIMIT = 128_000     # confirm on your model card in Azure AI Foundry (Models + endpoints → your deployment)
SAFETY_THRESHOLD = 0.35     # stay below the ~40% cliff
```

> 🟦 **Nota Microsoft-first:** la carpeta `.scratchpad` es un sustituto local. En producción, descarga los resultados completos de herramientas a **Azure Blob Storage**, **OneLake** o **Azure Cosmos DB**, y delega los turnos pesados en datos a agentes con contexto limpio mediante **Azure AI Foundry Agent Service**. La lógica de presupuesto es la misma.

### La ruta a través de este desafío

1. **Tarea 1** — mide tu degradación base (encuentra *tu* cliff turn).
2. **Tarea 2** — impone un presupuesto de contexto por turno (limita el llenado).
3. **Tarea 3** — carga el contexto de manera selectiva (solo lo que necesita el turno).
4. **Tarea 4** — delega los turnos pesados a subagentes con contexto limpio.
5. **Criterios de éxito** — demuestra que el llenado se mantiene por debajo de 35% y que la exactitud se conserva.
6. **Adáptalo a tu negocio** — aplica el presupuesto de contexto a *tus* sesiones largas.

> ⏱️ **Presupuesto de tiempo:** ~2–3 horas. La Tarea 1 (medición) es la de mayor valor; no la omitas.

---

## Tareas

### Tarea 1 — Mide tu degradación base

Antes de corregir nada, cuantifica el problema. Construye un harness de prueba para degradación.

```python
# degradation_test.py
import json
from typing import List, Tuple

def measure_context_degradation(
    agent_client,
    test_questions: List[Tuple[str, str]],  # (question, expected_answer)
    verbose_tool_responses: bool = True
) -> dict:
    """
    Runs a multi-turn session and scores accuracy at each turn.
    Tracks context fill percentage to identify the degradation threshold.
    """
    thread = agent_client.create_thread()
    results = []
    
    for i, (question, expected) in enumerate(test_questions):
        # Ask question
        response = agent_client.ask(thread_id=thread.id, message=question)
        
        # Measure context fill
        total_tokens = count_thread_tokens(thread)
        max_tokens = agent_client.model_context_limit
        fill_pct = (total_tokens / max_tokens) * 100
        
        # Score accuracy
        accuracy = score_answer(response.content, expected)
        
        results.append({
            "turn": i + 1,
            "question": question,
            "context_fill_pct": round(fill_pct, 1),
            "accuracy_score": accuracy,
            "response_snippet": response.content[:200]
        })
        
        print(f"Turn {i+1}: Context={fill_pct:.1f}%  Accuracy={accuracy:.2f}")
    
    # Find degradation threshold
    cliff = next(
        (r for r in results if r["accuracy_score"] < 0.7),
        None
    )
    return {
        "results": results,
        "degradation_cliff_turn": cliff["turn"] if cliff else None,
        "degradation_cliff_context_fill": cliff["context_fill_pct"] if cliff else None
    }

# Sample test cases for clinical agent
CLINICAL_TEST_CASES = [
    ("What is patient 1042's most recent HbA1c result?", "7.2"),
    ("What medications is patient 1042 currently on?", "metformin, lisinopril"),
    ("Show the last 30 days of blood pressure readings for patient 1042", "..."),
    ("What was the HbA1c result from 6 months ago?", "7.8"),  # ← likely fails
    ("Has the blood pressure trend improved or worsened?", "improved"), # ← likely fails
]
```

**Hallazgo esperado:** la exactitud cae de forma significativa entre los turnos 3–5, correlacionándose con el momento en que el llenado del contexto cruza el 40%.

---

### Tarea 2 — Implementa presupuesto de ventana de contexto

Limita el crecimiento del contexto aplicando un presupuesto de tokens por cada respuesta de herramienta.

```python
# context_budget.py
from typing import Optional
import tiktoken

CONTEXT_LIMIT = 32_000          # model max tokens
SAFETY_THRESHOLD = 0.35         # never exceed 35% fill (below 40% cliff)
MAX_TOOL_RESPONSE_TOKENS = 2_000  # hard cap on any single tool result

def enforce_context_budget(
    tool_result: dict,
    current_thread_tokens: int,
    tool_name: str
) -> dict:
    """
    Trims tool results to stay within context budget.
    Returns summary + pointer to scratchpad file for full data.
    """
    result_tokens = count_tokens(json.dumps(tool_result))
    budget_remaining = int(CONTEXT_LIMIT * SAFETY_THRESHOLD) - current_thread_tokens
    
    if result_tokens <= budget_remaining and result_tokens <= MAX_TOOL_RESPONSE_TOKENS:
        # Fits within budget — pass through
        return tool_result
    
    # Exceeds budget — summarize and offload to scratchpad
    scratchpad_path = write_scratchpad(tool_name, tool_result)
    summary = summarize_tool_result(tool_result, max_tokens=500)
    
    return {
        "summary": summary,
        "full_data_available": True,
        "scratchpad_ref": scratchpad_path,
        "row_count": count_rows(tool_result),
        "note": (
            f"Full dataset ({result_tokens} tokens) written to scratchpad. "
            f"Summary shown here to preserve context budget. "
            f"Request specific values for precise lookup."
        )
    }

def count_tokens(text: str, model: str = "gpt-4o") -> int:
    enc = tiktoken.encoding_for_model(model)
    return len(enc.encode(text))

def write_scratchpad(tool_name: str, data: dict) -> str:
    """Write full tool result to a file outside the context window."""
    import uuid, json
    path = f".scratchpad/{tool_name}_{uuid.uuid4().hex[:8]}.json"
    with open(path, 'w') as f:
        json.dump(data, f)
    return path
```

---

### Tarea 3 — Implementa carga selectiva de contexto

Sustituye "agregar todo" por "cargar solo lo que necesita este turno".

```python
# selective_loader.py

class ContextAwareAgent:
    """
    Agent that loads tool data selectively based on current question intent,
    rather than accumulating all tool results in the thread.
    """
    
    def __init__(self, agent_client, scratchpad_dir=".scratchpad"):
        self.client = agent_client
        self.scratchpad_dir = scratchpad_dir
        self.scratchpad_index = {}   # tool_name → file path
    
    def ask(self, question: str, thread_id: str) -> str:
        # 1. Classify what data this question actually needs
        data_needs = self.classify_data_needs(question)
        
        # 2. Load only relevant scratchpad sections (not full history)
        relevant_context = self.load_relevant_context(data_needs)
        
        # 3. Build minimal prompt: question + only necessary context
        augmented_question = self.build_minimal_prompt(question, relevant_context)
        
        # 4. Run with bounded context
        return self.client.ask(thread_id=thread_id, message=augmented_question)
    
    def classify_data_needs(self, question: str) -> list:
        """
        Use a fast, cheap LLM call to classify what data categories
        the question needs. Avoids loading all historical data.
        """
        classification_prompt = f"""
        Classify what data is needed to answer: "{question}"
        
        Categories: labs, medications, vitals, risk_scores, demographics
        Return: JSON array of needed categories only.
        Example: ["labs", "vitals"]
        """
        # Use a fast model for classification (not the main reasoning model)
        result = self.client.classify(classification_prompt)
        return json.loads(result)
    
    def load_relevant_context(self, data_needs: list) -> dict:
        """Load only the scratchpad files relevant to this turn's data needs."""
        context = {}
        for need in data_needs:
            if need in self.scratchpad_index:
                with open(self.scratchpad_index[need]) as f:
                    context[need] = json.load(f)
        return context
    
    def build_minimal_prompt(self, question: str, context: dict) -> str:
        """Build a prompt with only the data needed for this specific question."""
        context_str = "\n".join(
            f"[{k.upper()}]\n{json.dumps(v, indent=2)}"
            for k, v in context.items()
        )
        return f"{question}\n\nRelevant data:\n{context_str}"
```

---

### Tarea 4 — Implementa delegación a subagentes para sesiones largas

Para sesiones que deben extenderse a muchos turnos, delega en subagentes con contexto limpio.

```python
# subagent_delegation.py
# Pattern: Coordinator holds session state; subagents start with fresh context

class ClinicalCoordinator:
    """
    Coordinator that manages long clinical sessions.
    Delegates complex, data-heavy queries to subagents with fresh context.
    This ensures subagents never exceed 40% context fill.
    """
    
    SUBAGENT_CONTEXT_LIMIT = 0.30  # 30% max — safe margin below 40% cliff
    
    def route_query(self, question: str, session_state: dict) -> str:
        token_estimate = self.estimate_query_tokens(question, session_state)
        
        if token_estimate > self.SUBAGENT_CONTEXT_LIMIT * self.model_context_limit:
            # Delegate to fresh subagent
            return self.delegate_to_subagent(question, session_state)
        else:
            # Handle in main thread
            return self.handle_in_thread(question)
    
    def delegate_to_subagent(self, question: str, session_state: dict) -> str:
        """
        Spawn a subagent with ONLY the context it needs.
        No full conversation history — starts fresh.
        """
        minimal_context = self.extract_minimal_context(question, session_state)
        
        subagent_prompt = f"""
        You are a clinical data specialist. Answer this specific question:
        
        QUESTION: {question}
        
        PATIENT CONTEXT (only what you need):
        {json.dumps(minimal_context, indent=2)}
        
        Return a structured JSON answer with source_ref for each value.
        """
        
        # Subagent starts with fresh, minimal context
        return self.client.run_subagent(
            prompt=subagent_prompt,
            tools=["query_labs", "query_medications"],  # scoped tools only
            max_turns=3
        )
```

---

## Criterios de éxito

- [ ] La prueba base de degradación muestra el cliff de exactitud entre los turnos 3–5 (aprox. 40% de llenado)
- [ ] El presupuesto de contexto evita que el llenado supere 35% — el cliff de degradación nunca se alcanza
- [ ] Los archivos scratchpad almacenan correctamente resultados completos de herramientas fuera de la ventana de contexto
- [ ] El cargador selectivo reduce el contexto por turno al menos 60% frente a la línea base
- [ ] La delegación a subagentes produce respuestas correctas en el turno 6+ que el agente base responde mal
- [ ] El costo de tokens por sesión se reduce al menos 40% (mídelo con `count_tokens()`)

---

## 🔁 Adapta esto a tu propio negocio

El escenario es un **agente de decisión clínica**, pero el deterioro del contexto afecta a *cualquier* agente cuyas conversaciones se alargan: el cliff de exactitud alrededor de 40–50% de llenado es comportamiento del modelo, no una rareza de healthcare.

### Paso 1 — Encuentra tu "sesión larga"

Identifica dónde tus usuarios tienen **conversaciones multivuelta y cargadas de datos**: ahí es donde el deterioro aparece en silencio.

| Industria | La sesión larga | Qué se degrada tras unos pocos turnos |
|----------|------------------|---------------------------------|
| **Customer support** | Hilo de troubleshooting con varios problemas | El agente olvida un detalle anterior del ticket |
| **Financial services** | Revisión de portafolio sobre muchas posiciones | Mezcla cifras entre cuentas |
| **Legal** | Revisión extensa de contratos / discovery | Atribuye una cláusula al documento equivocado |
| **Field service** | Sesión diagnóstica de varios pasos | Recomienda una pieza de un caso previo y no relacionado |
| **Sales / RevOps** | Q&A de deal-desk entre varias cuentas | Cita términos de otra oportunidad |
| **IT / SRE** | Chat largo de respuesta a incidentes | Pierde el error original mientras persigue logs nuevos |

### Paso 2 — Mapea los bloques a tu stack (Microsoft-first)

| En este desafío | En tu proyecto — reemplázalo por |
|-------------------|--------------------------------|
| `tiktoken` counting | Lo mismo: tiktoken es el tokenizador correcto para Azure OpenAI GPT-4o/4.1 |
| `.scratchpad/*.json` | **Azure Blob Storage**, **OneLake** o **Azure Cosmos DB** — almacenamiento duradero fuera de la ventana de contexto |
| `classify_data_needs()` | Un modelo económico de **Azure OpenAI** (por ejemplo, `gpt-4o-mini`) como router |
| `ClinicalCoordinator` subagents | Agentes conectados/alojados en **Azure AI Foundry Agent Service** con contexto limpio |
| Context-fill logging | Atributo de span en **Azure AI Foundry Tracing** + alertas en **Azure Monitor** |

### Paso 3 — Checklist de implementación de 5 preguntas

1. **¿Cuál es tu límite de contexto y qué % representa un resultado típico de herramienta?** Si un resultado supera 10% de la ventana → llegarás al cliff muy rápido.
2. **¿Los resultados en bruto de herramientas permanecen para siempre en el hilo?** Si sí → descárgalos a un almacén scratchpad y pasa solo un resumen + un puntero.
3. **¿Cada turno recarga todo el historial?** Si sí → agrega carga selectiva (clasificar y luego cargar solo lo necesario).
4. **¿A qué % de llenado delegas a un agente limpio?** Si la respuesta es "más de 50%" o "nunca" → muévelo a ~30%.
5. **¿Puedes ver el % de llenado del contexto por turno en un dashboard?** Si no → agrega el span de trazas antes de ajustar nada.

### Paso 4 — Plan de despliegue de 1 semana

| Día | Acción | Responsable |
|-----|--------|-------|
| **Day 1** | Instrumentar el % de llenado de contexto por turno (Foundry Tracing) en un agente real | Eng lead |
| **Day 2** | Ejecutar el harness de degradación y encontrar *tu* cliff turn | QA / eng |
| **Day 3** | Agregar presupuesto de tokens por turno + descarga a scratchpad (Blob/OneLake/Cosmos) | Backend dev |
| **Day 4** | Agregar carga selectiva + un router `gpt-4o-mini` | Backend dev |
| **Day 5** | Delegar turnos pesados en Foundry Agent Service y volver a correr el harness | Backend dev |

### Paso 5 — Demuestra el ROI

- **Retención de exactitud** — exactitud en el turno 8 ÷ exactitud en el turno 1 *(objetivo: ≥ 0.95)*.
- **Llenado máximo de contexto** — máximo % de llenado a lo largo de una sesión real *(objetivo: ≤ 35%)*.
- **Costo por sesión** — tokens × precio; el presupuesto suele recortarlo **40%+**.

> 💡 **Regla práctica:** si tu agente "se vuelve más tonto cuanto más hablas con él", tienes un problema de presupuesto de contexto, no de modelo. Limita el llenado antes de cambiar de modelo.

### Hacerlo por tu cuenta (sin equipo, con foco en portafolio)

¿Sin equipo ni presupuesto? Un gráfico limpio de "exactitud vs. longitud de la conversación" es una excelente pieza de portafolio: demuestra que entiendes *por qué* los agentes se degradan. Puedes hacerlo tú solo durante la semana:

- **Lun–Mar** — ejecuta el harness de degradación sobre gpt-4o y encuentra *tu* cliff de exactitud; registra el % de llenado por turno.
- **Mié–Jue** — agrega un presupuesto de tokens por turno + descarga a scratchpad (JSON local por ahora; Blob/Cosmos después) + carga selectiva con un router económico `gpt-4o-mini`.
- **Vie** — vuelve a ejecutar el harness y grafica exactitud-vs-turno antes y después.

📦 **Entrega este artefacto:** un notebook/repo con la gráfica de exactitud-vs-turno mostrando una retención de ≥ 0.95 y un llenado máximo ≤ 35%. Bullet para CV: *"Eliminated multi-turn context rot — held agent accuracy at 95% of turn-1 through turn 8 while cutting per-session token cost 40%."*

> 🆓 **Ruta de costo mínimo:** un router `gpt-4o-mini` + un scratchpad local en JSON convierten esto en un experimento de centavos por ejecución.

---

<details>
<summary>📋 <strong>Mapeo regulatorio</strong> — HIPAA · EU AI Act · FDA · Joint Commission</summary>

| Regulación | Requisito | Cómo lo aborda este desafío |
|-----------|-------------|--------------------------------|
| **HIPAA §164.312** | Exactitud e integridad de la información para PHI | La exactitud se preserva por debajo del umbral de degradación |
| **EU AI Act Art. 9** | Gestión de riesgos para IA de alto riesgo (médica) | El monitoreo de degradación actúa como control continuo de riesgo |
| **FDA AI/ML SaMD Guidance** | Monitoreo del desempeño después del despliegue | El harness de degradación funciona como auditoría continua de exactitud |
| **Joint Commission Standards** | Exactitud del soporte a decisiones clínicas | El presupuesto de contexto actúa como salvaguarda de arquitectura |

</details>

---

<details>
<summary>🧪 <strong>Break &amp; Fix</strong> — identifica por qué tres "soluciones" plausibles corrompen el contexto</summary>

```python
# broken_context_manager.py
class BrokenContextManager:
    
    def trim_context(self, thread_messages):
        # "Fix" 1: Remove oldest messages when context is full
        while count_tokens(thread_messages) > MAX_TOKENS:
            thread_messages.pop(0)   # ← what critical problem does this cause?
        return thread_messages
    
    def summarize(self, tool_result):
        # "Fix" 2: Summarize every tool result to 100 tokens
        return llm.summarize(tool_result, max_tokens=100)  # ← when does this fail?
    
    def should_delegate(self, context_fill):
        # "Fix" 3: Delegate when context is 80% full
        return context_fill > 0.80   # ← why is this threshold wrong?
```

:::details[Haz clic para ver las respuestas]
1. **Quitar los mensajes más antiguos corrompe el system prompt**: el system prompt siempre es el primer mensaje. Hacer pop(0) lo elimina y destruye todas las barreras de comportamiento. Conserva siempre el system prompt; recorta resultados de herramientas intermedios, no el inicio.
2. **Un resumen de 100 tokens pierde precisión clínica**: valores de laboratorio, dosis de medicamentos y signos vitales deben ser exactos. Un resumen como "blood pressure was elevated" no sirve frente a "BP 145/92 on 2026-03-14". Los datos clínicos requieren precisión numérica, no resúmenes en prosa.
3. **80% está más allá del cliff**: el cliff de degradación ocurre en 40–50%. Si delegas al 80%, el modelo ya habrá estado operando en modo de "exactitud colapsada" durante 30–40% de la ventana de contexto, potencialmente decenas de turnos de respuestas clínicas degradadas.
:::

</details>

---

## Comprobación de conocimientos

1. Una sesión de un coordinador clínico llena 35% del contexto tras el turno 4 (cada turno agrega ~3,000 tokens). ¿Cuántos turnos faltan para llegar al cliff de 40%? ¿Cuál es tu estrategia de mitigación?
2. ¿Por qué la carga selectiva de contexto requiere un paso de clasificación? ¿Qué ocurre si lo omites y siempre cargas todos los datos del scratchpad?
3. Se delega una pregunta a un subagente, pero su contexto mínimo sigue siendo 38% de la ventana. ¿Qué opciones tienes?
4. Un coordinador de atención reporta: "The agent gave me the right answer on turn 1, wrong answer on turn 5, right answer again on turn 6." ¿Qué explica ese patrón?

---

## 📚 Herramientas y referencias

### Herramientas clave para este desafío

> **Microsoft-first:** prioriza herramientas nativas de Azure. Las herramientas de terceros se listan solo cuando aportan una capacidad confiable y de primer nivel que todavía no está cubierta de forma nativa.

| Herramienta | Función en este desafío | Enlace |
|------|----------------------|------|
| **Azure AI Foundry Tracing** | Capturar el % de llenado de la ventana de contexto como atributo personalizado de span en cada turno del agente y exponer la degradación en dashboards | [Docs](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-setup) |
| **Azure AI Foundry Agent Service** | Delegar turnos pesados en datos a agentes conectados/alojados que arrancan con contexto limpio — la forma de producción de la Tarea 4 | [Docs](https://learn.microsoft.com/azure/foundry/agents/overview) |
| **Azure Blob / OneLake / Cosmos DB** | Scratchpad duradero — almacena resultados completos de herramientas fuera de la ventana de contexto | [Blob](https://learn.microsoft.com/azure/storage/blobs/) · [OneLake](https://learn.microsoft.com/fabric/onelake/onelake-overview) · [Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/introduction) |
| **Azure AI Foundry Evaluations** | Evaluación multivuelta — verificar que la exactitud se mantiene en sesiones largas, no solo en turnos individuales | [Docs](https://learn.microsoft.com/azure/foundry/observability/how-to/evaluate-agent) |
| tiktoken *(third-party)* | Medir **conteos exactos de tokens** por turno, por resultado de herramienta y por snapshot de contexto antes de cada llamada al LLM | [GitHub](https://github.com/openai/tiktoken) |
| Langfuse *(third-party)* | Trazado open source de sesiones — visualizar el crecimiento del contexto a lo largo de los turnos para encontrar el turno exacto donde comenzó la degradación | [langfuse.com](https://langfuse.com) |
| Arize Phoenix *(third-party)* | Detectar deriva de contexto en producción — alertas cuando la exactitud se correlaciona con el aumento del llenado de contexto | [GitHub](https://github.com/Arize-ai/phoenix) |
| Confident AI *(third-party)* | Evaluación de agentes multivuelta — mide si la exactitud se sostiene en sesiones largas | [confident-ai.com](https://www.confident-ai.com) |

### Lectura obligatoria

| Recurso | Por qué importa |
|----------|---------------|
| [Lost in the Middle (arXiv:2601.15300)](https://arxiv.org/abs/2601.15300) | La investigación que demuestra el cliff de contexto en 40–50% — **léela antes de construir cualquier agente de sesión larga** |
| [Same Task, More Tokens (arXiv:2510.05381)](https://arxiv.org/abs/2510.05381) | Demuestra que agregar más contexto perjudica el rendimiento incluso cuando la recuperación es perfecta — la paradoja de la longitud de contexto |
| [Context engineering for AI agents (Azure Architecture Center)](https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns) | Guía de Microsoft para gestionar el contexto y la memoria de agentes en producción |
| [The LLM-as-Analyst Trap, Part 1](https://appliedingenuity.substack.com/p/the-llm-as-analyst-trap-a-technical) | La sección sobre "Multi-Turn Context Accumulation" en la que se basa este escenario de healthcare |
