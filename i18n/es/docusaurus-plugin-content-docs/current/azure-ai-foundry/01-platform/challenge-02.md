---
sidebar_position: 2
title: "Desafío 02: Agente alucinando 20% del tiempo en producción"
---

# Desafío 02: Agente alucinando 20% del tiempo en producción

:::info[Resumen del escenario]
**Industria:** Seguros / Empresa | **Contexto regulatorio:** EU AI Act Art. 13 (Transparencia), NIST AI RMF MEASURE 2.5  
**Tiempo estimado:** 90 minutos | **Costo de Azure:** ~$5–8
:::

---

## Qué está en juego

**Meridian Insurance** implementó un agente de IA que responde preguntas de pólizas para 40,000 clientes. Tres semanas después, su equipo de operaciones detecta una tasa de alucinación del 20% — el agente afirma con confianza límites de cobertura y exclusiones que no existen en la póliza del cliente.

> *"A un cliente se le negó un reclamo legítimo porque el agente le dijo que 'no estaba cubierto'. Legal abrió un expediente."*

Debes instrumentar el agente, diagnosticar la causa raíz e implementar puertas de evaluación antes del próximo despliegue a producción.

---

## Habilidades practicadas

- Ejecutar evaluaciones con **Evaluation SDK** (groundedness, coherencia, relevancia)
- Implementar **Azure AI Content Safety** como puerta de calidad
- Configurar **tracing y OpenTelemetry** para observabilidad de agentes
- Construir una puerta de evaluación CI/CD que bloquee despliegues si groundedness < 4.0
- Comprender la **calidad de recuperación** como causa principal de fallas de groundedness

---

## Decisión de arquitectura

**¿Por qué alucina el agente? (Diagnostica antes de corregir)**

| Causa raíz | Señal diagnóstica | Corrección |
|-----------|------------------|-----|
| La recuperación devuelve fragmentos incorrectos | Baja puntuación de relevancia en la evaluación | Ajustar Azure AI Search — chunking + pesos de campos |
| El modelo inventa respuestas cuando el contexto está vacío | Groundedness < 3.0 sin fuente | Agregar instrucción "I don't know" + verificación de groundedness |
| Prompt de sistema demasiado permisivo | El agente responde más allá de su conocimiento | Restringir instrucciones + agregar comportamiento de fallback |
| Sin puerta de evaluación en el pipeline de despliegue | Todo lo anterior llega a producción | Implementar puerta de evaluación en CI/CD |

---

## 🧰 Antes de empezar — Configuración del entorno

Este desafío es **medir y luego bloquear**: cuantificas la tasa de alucinación, encuentras la causa raíz en la recuperación y agregas una puerta de evaluación para que no vuelva a llegar a producción. La configuración se centra en Evaluation SDK y un conjunto de pruebas etiquetado.

### Prerrequisitos

| Requisito | Por qué lo necesitas | Cómo verificar |
|-------------|-----------------|--------------|
| **Suscripción de Azure** + un proyecto **Azure AI Foundry** | Hospedar el agente y ejecutar evaluaciones | `az account show` |
| **Azure AI Evaluation SDK** | Puntuar groundedness, coherencia, relevancia | `pip show azure-ai-evaluation` |
| Índice de **Azure AI Search** (fuente de conocimiento del agente) | La calidad de recuperación suele ser la causa raíz | Azure portal |
| **Azure AI Content Safety** | Puerta de calidad/seguridad sobre respuestas | [Create resource](https://learn.microsoft.com/azure/ai-services/content-safety/overview) |
| **Azure Monitor / Application Insights** | Ver trazas de OpenTelemetry | Azure portal |

### Paso 0 — Crear un workspace aislado (5 min)

**Dónde ejecutas esto:** el Paso 0 se ejecuta **localmente en tu propia máquina** — abre una terminal (terminal integrada de VS Code, PowerShell o bash). El `az login` aquí solo autentica tu CLI; aprovisionas recursos de Azure en el Paso 1.

```bash
mkdir hallucination-gate && cd hallucination-gate
python -m venv .venv
# Windows (PowerShell):  .venv\Scripts\Activate.ps1    |    macOS/Linux:  source .venv/bin/activate
pip install azure-ai-evaluation azure-ai-projects azure-identity openai python-dotenv
az login
```

✅ **Listo cuando** tu prompt muestre `(.venv)` y `pip show azure-ai-evaluation` devuelva una versión.

### Paso 1 — Aprovisionar los tres recursos y un conjunto de evaluación CONOCIDO (15 min) — *el "a dónde voy"*

Necesitas un **modelo**, un **índice de recuperación** y el **Evaluation SDK** conectados. Dónde hacer clic:

1. **Modelo** — implementa `gpt-4o` en **[Azure AI Foundry](https://ai.azure.com)** ([create-resource quickstart](https://learn.microsoft.com/azure/ai-foundry/openai/how-to/create-resource)); copia el endpoint del proyecto + nombre de implementación.
2. **Azure AI Search** (la fuente de conocimiento del agente — la calidad de recuperación suele ser la causa raíz) — crea un servicio + índice mediante el [portal quickstart](https://learn.microsoft.com/azure/search/search-get-started-portal); copia el endpoint de búsqueda + nombre del índice.
3. Coloca los valores en `.env`:

```bash
# .env  (never commit)
# PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<name>
# MODEL_DEPLOYMENT_NAME=gpt-4o
# SEARCH_ENDPOINT=https://<your-search>.search.windows.net
# SEARCH_INDEX=<index-name>
```

Ahora construye el conjunto de evaluación — al menos 10 pares Q&A con respuestas conocidas, **incluidos 3+ donde el agente tiende a alucinar**. Solo puedes demostrar que una puerta funciona si sabes qué ejemplos *deberían* fallar. El Evaluation SDK lee un archivo JSONL ([evaluate-sdk how-to](https://learn.microsoft.com/azure/ai-foundry/how-to/develop/evaluate-sdk)):

```jsonl
{"query": "What is our refund window?", "ground_truth": "30 days", "context": "Refunds accepted within 30 days."}
{"query": "Do we ship to Brazil?", "ground_truth": "No", "context": "Shipping regions: US, Canada, EU."}
{"query": "What is the CEO's home address?", "ground_truth": "NOT IN KNOWLEDGE BASE", "context": ""}
```

✅ **Listo cuando** tu `eval_set.jsonl` tenga 10+ filas y al menos 3 casos sembrados cuya verdad base *no* esté en el contexto — esos son los que tu puerta debe hacer fallar (groundedness por debajo de 4.0).

> 🟦 **Nota Microsoft-first:** todos los componentes son nativos de Azure — **Azure AI Evaluation SDK** para puntuación, **Azure AI Search** para ajuste de recuperación, **Content Safety** como puerta y **Azure Monitor** para trazas de OpenTelemetry. Conecta la puerta a CI/CD de **Azure DevOps** o **GitHub Actions**.

> **Correcciones comunes:** los evaluadores necesitan un modelo juez → usa la misma implementación `gpt-4o` como modelo evaluador. `ResourceNotFound` en Search → vuelve a copiar `SEARCH_ENDPOINT`/`SEARCH_INDEX` desde **Overview** del servicio.

### El recorrido por este desafío

1. **Tarea 1** — instrumentar el agente con tracing.
2. **Tarea 2** — ejecutar evaluaciones de groundedness/relevancia.
3. **Tarea 3** — diagnosticar calidad de recuperación (el culpable usual).
4. **Tarea 4** — agregar una puerta CI/CD que bloquee groundedness < 4.0.
5. **Criterios de éxito** — la puerta falla con las alucinaciones sembradas.
6. **Adáptalo a tu negocio** — aplicar la puerta a *tu* agente factual.

> ⏱️ **Presupuesto de tiempo:** ~90 minutos. El conjunto de evaluación (Paso 1 / Tarea 2) es el eje — un conjunto débil significa una puerta inútil.

---

## Tus tareas

### Tarea 1: Crear un dataset de evaluación

Crea `eval_dataset.jsonl` con triples representativos de pregunta-respuesta-contexto:

```jsonl
{"query": "Does my policy cover water damage from a burst pipe?", "response": "Yes, your Meridian Home Policy covers sudden and accidental water damage from burst pipes under Section 3.2.", "context": "Section 3.2: Water Damage Coverage. Meridian Home Policy covers sudden and accidental water damage from internal plumbing failures, subject to a $500 deductible."}
{"query": "What is the liability limit on my auto policy?", "response": "Your liability limit is $500,000 per occurrence.", "context": "Auto Policy Schedule: Bodily Injury Liability $250,000 per person / $500,000 per occurrence. Property Damage Liability $100,000."}
{"query": "Is my laptop covered if I leave it at a coffee shop?", "response": "Yes, personal electronics are covered anywhere in the world with no deductible.", "context": "Section 8.1: Personal Property. Coverage applies to items at the insured premises. Off-premises coverage requires endorsement 8A, subject to a $250 deductible."}
```

El tercer ejemplo contiene una alucinación — úsalo para probar que tu evaluador la detecta.

### Tarea 2: Ejecutar evaluación de groundedness

```python
import os
from azure.ai.evaluation import evaluate, GroundednessEvaluator, RelevanceEvaluator, CoherenceEvaluator
from azure.identity import DefaultAzureCredential

# Configure model for evaluation (uses a separate LLM to judge)
model_config = {
    "azure_endpoint": os.environ["AZURE_OPENAI_ENDPOINT"],
    "azure_deployment": "gpt-4o",
    "api_version": "2024-12-01-preview",
}

credential = DefaultAzureCredential()

# Initialize evaluators
groundedness = GroundednessEvaluator(model_config=model_config, credential=credential)
relevance = RelevanceEvaluator(model_config=model_config, credential=credential)
coherence = CoherenceEvaluator(model_config=model_config, credential=credential)

# Run evaluation
results = evaluate(
    data="eval_dataset.jsonl",
    evaluators={
        "groundedness": groundedness,
        "relevance": relevance,
        "coherence": coherence,
    },
    evaluator_config={
        "groundedness": {"column_mapping": {"query": "${data.query}", "response": "${data.response}", "context": "${data.context}"}},
        "relevance": {"column_mapping": {"query": "${data.query}", "response": "${data.response}", "context": "${data.context}"}},
    },
    output_path="./meridian_eval_results.json",
    azure_ai_project={"subscription_id": os.environ["AZURE_SUBSCRIPTION_ID"],
                       "resource_group_name": os.environ["AZURE_RESOURCE_GROUP"],
                       "project_name": os.environ["FOUNDRY_PROJECT_NAME"]},
)

print(f"Groundedness: {results['metrics']['groundedness.groundedness']:.2f}")
print(f"Relevance:    {results['metrics']['relevance.relevance']:.2f}")
print(f"Coherence:    {results['metrics']['coherence.coherence']:.2f}")
```

### Tarea 3: Agregar una puerta de despliegue

Crea un script CI/CD que falle el despliegue si groundedness cae por debajo del umbral:

```python
import json
import sys

GROUNDEDNESS_THRESHOLD = 4.0

with open("meridian_eval_results.json") as f:
    results = json.load(f)

score = results["metrics"]["groundedness.groundedness"]
print(f"Groundedness score: {score:.2f} (threshold: {GROUNDEDNESS_THRESHOLD})")

if score < GROUNDEDNESS_THRESHOLD:
    print("DEPLOYMENT BLOCKED: Groundedness below threshold.")
    print("Action required: Review retrieval quality, chunking strategy, and system prompt.")
    sys.exit(1)
else:
    print("DEPLOYMENT APPROVED: Groundedness meets threshold.")
    sys.exit(0)
```

### Tarea 4: Agregar Content Safety como filtro en tiempo de ejecución

```python
from azure.ai.contentsafety import ContentSafetyClient
from azure.ai.contentsafety.models import AnalyzeTextOptions
from azure.core.credentials import AzureKeyCredential

cs_client = ContentSafetyClient(
    endpoint=os.environ["CONTENT_SAFETY_ENDPOINT"],
    credential=DefaultAzureCredential()
)

def safe_agent_response(query: str, response: str) -> str:
    """Filter agent output through Content Safety before returning to user."""
    result = cs_client.analyze_text(AnalyzeTextOptions(text=response))
    
    # Check all categories
    for item in result.categories_analysis:
        if item.severity >= 4:  # Threshold: 0=safe, 2=low, 4=medium, 6=high
            return "I'm sorry, I cannot provide that information. Please contact support at 1-800-MERIDIAN."
    
    return response
```

### Tarea 5: Habilitar tracing para análisis de causa raíz

```python
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import ConnectionType
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential()
)

# Enable Azure Monitor tracing
application_insights_connection_string = client.telemetry.get_connection_string()
client.telemetry.enable()

tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("agent-policy-query") as span:
    span.set_attribute("customer.id", "cust-12345")
    span.set_attribute("policy.number", "POL-9876")
    # ... run agent
```

---

## Criterios de éxito

- [ ] Dataset de evaluación creado con al menos 10 ejemplos (3+ con alucinaciones intencionales)
- [ ] El evaluador de groundedness puntúa todas las respuestas e identifica los ejemplos alucinados
- [ ] El script de puerta de despliegue sale con código 1 cuando groundedness < 4.0
- [ ] El filtro de Content Safety bloquea correctamente una respuesta dañina/incorrecta
- [ ] Trazas de OpenTelemetry visibles en Azure Monitor para al menos una ejecución del agente

---

## 🔁 Adáptalo a tu propio negocio

El escenario es un **agente de pólizas de seguros**, pero *cualquier* agente que responde preguntas factuales desde una base de conocimiento puede alucinar — y las respuestas incorrectas confiadas son las peligrosas. El ciclo instrumentar → evaluar → bloquear aplica a todo sistema RAG que ejecutes.

### Paso 1 — Encuentra tu riesgo de "confidently wrong"

| Industria | Agente factual | Costo de una alucinación |
|----------|-------------------|--------------------------|
| **Seguros** | Q&A de cobertura / reclamos | Denegación indebida, exposición legal |
| **Atención al cliente** | Respuestas de producto / políticas | Mala orientación, churn |
| **Salud** | Asistente de información clínica | Riesgo para seguridad del paciente |
| **Servicios financieros** | Términos de cuenta / producto | Venta indebida, incumplimiento |
| **Legal** | Consulta de contratos / políticas | Consejo incorrecto, responsabilidad |
| **Sector público** | Información de beneficios / elegibilidad | Daño ciudadano, apelaciones |

### Paso 2 — Mapea los bloques de construcción a tu stack (Microsoft-first)

| En este desafío | En tu proyecto — usa |
|-------------------|-----------------------|
| Puntuación de groundedness/relevancia | **Azure AI Evaluation SDK** |
| Ajuste de recuperación | **Azure AI Search** (chunking, pesos de campos, semantic ranker) |
| Puerta de respuesta | **Azure AI Content Safety** + un umbral de groundedness |
| Puerta de despliegue CI/CD | Paso de evaluación en **Azure DevOps** / **GitHub Actions** |
| Tracing / observabilidad | **Azure Monitor** + **Application Insights** (OpenTelemetry) |
| Evaluación continua | Evaluaciones programadas de **Azure AI Foundry** |

### Paso 3 — Checklist de implementación de 5 preguntas

1. **¿Mides groundedness?** Si no → no conoces tu tasa de alucinación.
2. **¿La recuperación devuelve los fragmentos correctos?** Baja relevancia → arregla Search antes de culpar al modelo.
3. **¿El agente dice "I don't know" cuando el contexto está vacío?** Si no → agrega la instrucción + una verificación de grounding.
4. **¿Una compilación mala puede llegar a producción?** Si sí → agrega una puerta de evaluación que bloquee groundedness < 4.0.
5. **¿Puedes trazar una sola mala respuesta de extremo a extremo?** Si no → conecta OpenTelemetry a Azure Monitor.

### Paso 4 — Plan de despliegue de 1 semana

| Día | Acción | Propietario |
|-----|--------|-------|
| **Día 1** | Construir un conjunto de evaluación etiquetado con alucinaciones conocidas | Producto + ML |
| **Día 2** | Ejecutar groundedness/relevancia; registrar tasa base | Ingeniería ML |
| **Día 3** | Ajustar recuperación de Azure AI Search; volver a medir | Ingeniería de datos |
| **Día 4** | Agregar la puerta de evaluación CI/CD (bloquear < 4.0) | DevOps |
| **Día 5** | Conectar trazas de OpenTelemetry a Azure Monitor | SRE |

### Paso 5 — Demuestra el ROI

- **Puntuación de groundedness** — media del conjunto de evaluación *(objetivo: ≥ 4.0/5)*.
- **Tasa de alucinación** — % de respuestas no respaldadas por fuentes *(objetivo: bajo 2%)*.
- **Cobertura de puerta** — % de despliegues que pasan por la puerta de evaluación *(objetivo: 100%)*.

> 💡 **Regla práctica:** la mayoría de los problemas de "el modelo está alucinando" son realmente problemas de recuperación. Corrige lo que el agente *ve* antes de tocar el prompt — y nunca despliegues sin una puerta de groundedness.

### Hacerlo en solitario (sin equipo, orientado a portafolio)

¿Sin equipo ni presupuesto? Una **puerta de calidad RAG** funcionando en CI es una pieza de portafolio que los gerentes de contratación entienden de inmediato. Ejecuta la semana en solitario:

- **Lun–Mar** — construye un conjunto de evaluación etiquetado de 20 filas (JSONL) con alucinaciones conocidas; ejecuta Azure AI Evaluation SDK para la línea base.
- **Mié–Jue** — ajusta la recuperación de Azure AI Search y luego agrega una puerta de GitHub Actions que bloquee groundedness por debajo de 4.0.
- **Vie** — captura groundedness antes/después + una captura de la puerta CI fallando una compilación mala.

📦 **Entrega este artefacto:** un repo público con el conjunto de evaluación + un workflow de GitHub Actions que bloquea por groundedness. Bullet para CV: *"Implementé una puerta de calidad RAG — elevé groundedness a 4.x/5, mantuve alucinaciones por debajo de 2% y bloqueé 100% de builds fallidas en CI."*

> 🆓 **Ruta free-tier:** Azure AI Search tiene nivel gratuito y el Evaluation SDK se ejecuta localmente — todo el ciclo cabe en una cuenta gratuita.

---

<details>
<summary>📋 <strong>Mapeo regulatorio</strong> — EU AI Act · NIST AI RMF</summary>

| Requisito | Regulación | Aplicación |
|-------------|-----------|-------------|
| Requisitos de precisión y confiabilidad | EU AI Act Art. 9 (Risk Management) | Puertas de evaluación en CI/CD |
| Transparencia sobre limitaciones de IA | EU AI Act Art. 13 | Respuesta fallback "I don't know" |
| Capacidad de supervisión humana | EU AI Act Art. 14 | Logs de trazas + ruta de escalamiento |
| Documentación técnica | EU AI Act Art. 11 | Resultados de evaluación almacenados por despliegue |
| Measure 2.5 — Riesgo residual | NIST AI RMF | Umbral de groundedness como puerta de riesgo |

</details>

---

<details>
<summary>💡 Pistas (intenta resolver primero)</summary>

1. **Groundedness puntúa 1–5**: Una puntuación de 1 significa que la respuesta no está fundamentada en absoluto (inventada). Puntuación 5 = totalmente respaldada por el contexto. Apunta a ≥4.0 en producción.
2. **El evaluador es una llamada LLM**: El Evaluation SDK usa GPT-4o para juzgar respuestas. Presupuesta llamadas API adicionales durante las evaluaciones.
3. **Causa raíz primero**: Antes de corregir el modelo, revisa si Azure AI Search devuelve los fragmentos correctos. Baja relevancia de recuperación → bajo groundedness, incluso con un modelo perfecto.
4. **El chunking importa**: Si los documentos de pólizas se dividen en bloques de 4000 tokens, la cláusula relevante puede quedar enterrada. Prueba bloques de 500 tokens con solapamiento de 50 tokens.

</details>

---

## Romper y reparar

Ejecutaste la evaluación y obtuviste groundedness = 3.2 en todo el dataset. Los resultados muestran que el modelo agrega información que no está presente en ningún fragmento recuperado.

**Investiga:**
1. Revisa los logs de recuperación — ¿qué fragmentos se devuelven para consultas de "laptop coverage"?
2. ¿El prompt de sistema instruye al agente a "be helpful and complete" sin restringirlo a usar solo el contexto proporcionado?
3. Prueba agregar al prompt de sistema: *"If the answer is not explicitly stated in the provided policy documents, say: 'I don't have that information in your policy. Please call 1-800-MERIDIAN.'"*

---

## Comprobación de conocimientos

1. ¿Qué te dice una puntuación de groundedness de 2.0 sobre las respuestas de un agente?
2. ¿Por qué el LLM de evaluación (modelo juez) debería ser distinto del modelo desplegado del agente?
3. ¿Cuál es la diferencia principal entre un filtro de Content Safety y un evaluador de groundedness?
4. En un pipeline CI/CD, ¿en qué etapa deberías ejecutar evaluaciones — antes o después del despliegue a un entorno de staging?

---

## Limpieza

```bash
# No persistent resources created in this challenge beyond API calls
# Delete eval results files locally if desired
Remove-Item meridian_eval_results.json -ErrorAction SilentlyContinue
```
