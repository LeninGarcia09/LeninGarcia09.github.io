---
id: challenge-04
title: "Desafío 04 — Control semántico y reglas de negocio"
sidebar_label: Desafío 04 — Control semántico
---

# Desafío 04 — Control semántico y reglas de negocio

## 📈 Escenario empresarial

> **Empresa:** Apex Quantitative Research — un quant fund que ejecuta estrategias sistemáticas  
> **Situación:** Tu AI research assistant es utilizado por portfolio managers para analizar desempeño sectorial y exposiciones a factores. En la misma semana ocurrieron tres incidentes:  
> 1. Un PM pidió retornos de "Magnificent Seven". El agente incluyó **Tesla**, aunque había sido retirada del grupo original. La estrategia se backtesteó con componentes incorrectos.  
> 2. Un PM pidió retornos de "Q1". El agente calculó desde el **open del 1 de enero**, cuando el estándar de tu firma es **close del 31 de diciembre del año anterior hasta close del 31 de marzo**. Las cifras quedaron desplazadas por un día.  
> 3. Un PM preguntó por el desempeño de "last week". El agente usó como "now" la **fecha de sus datos de entrenamiento** (septiembre de 2023) y se negó a consultar datos de 2026 alegando que estaban en el futuro.

Las tres fallas comparten la misma causa raíz: **la semántica del negocio quedó delegada a los datos de entrenamiento del LLM, en lugar de ser propiedad de tu sistema**.

---

## El problema central: delegación semántica

El patrón "Simple Agentic" trata al LLM como una autoridad sobre conceptos de negocio. Eso crea una dependencia oculta en los **datos de entrenamiento estáticos y probabilísticos** del modelo para decisiones que deberían estar definidas en tu código.

| Concepto | El "conocimiento" del LLM | La realidad de tu negocio |
|---------|------------------|----------------------|
| "Magnificent Seven" | Tesla (entrenamiento previo a 2024) | AAPL, MSFT, NVDA, AMZN, GOOGL, META, TSLA (varía según fecha/fuente) |
| "Q1 start" | Probablemente open del 1 de enero | En tu firma: close del 31 de diciembre del año anterior |
| "Last week" | Basado en el cutoff de entrenamiento | Requiere inyectar `date.today()` |
| "FANG stocks" | ¿Meta = Facebook? | Ticker META desde nov-2021 |
| "Technology sector" | Clasificación del modelo | Mapeo sectorial GICS (actualiza trimestralmente) |

La corrección es **Control Semántico**: externalizar todas las definiciones de conceptos de negocio en código/configuración, inyectar anclaje temporal en cada solicitud y usar hooks `PostToolUse` para imponer límites de alcance.

---

<details>
<summary>🏗️ <strong>Tabla de decisión de arquitectura</strong> — quién es dueño de la semántica de tu negocio</summary>

| Enfoque | Exactitud | Actualizable | Auditabilidad |
|----------|----------|------------|--------------|
| ❌ El LLM resuelve todos los conceptos | Probabilística (datos de entrenamiento) | No — requiere reentrenar el modelo | Ninguna |
| ⚠️ Inyección por prompt ("Magnificent 7 is: AAPL, MSFT...") | Mejor | Requiere actualizar prompts | Parcial |
| ✅ Registro externalizado de conceptos (config/DB) | Determinista | Sí — actualizas configuración, no código | Completa — historial versionado |
| ✅ Inyección de anclaje temporal (siempre inyectar la fecha actual) | Determinista | Automática | Completa |
| ✅ Hooks de enforcement de alcance (bloquear tool calls fuera de alcance) | Determinista | Sí | Completa |

</details>

---

## 🧰 Antes de empezar — configuración del entorno

Este desafío consiste en **hacer que tu sistema sea dueño de la semántica del negocio** en vez de tomarla prestada de los datos de entrenamiento del modelo. Tu entorno necesita un lugar donde almacenar definiciones de conceptos (un registry) y una forma de inyectar "now" en cada solicitud.

### Prerrequisitos

| Requisito | Por qué lo necesitas | Cómo comprobarlo |
|-------------|-----------------|--------------|
| Python 3.10+ | Registry, parser y hooks de enforcement | `python --version` |
| **Azure OpenAI** mediante [Azure AI Foundry](https://ai.azure.com) | El intent parser: resuelve *la forma de decirlo*, nunca *la definición* | Despliega `gpt-4o` en Foundry |
| Un almacén para concept registry — **Azure SQL / Dataverse / Cosmos DB / App Configuration** (prod); JSON local aquí | La fuente autoritativa y versionada de lo que "Magnificent Seven" significa hoy | Azure portal / `mkdir .registry` |
| **Azure AI Foundry — Evaluations** | Medir la exactitud en resolución de conceptos contra tu registry | [Docs](https://learn.microsoft.com/azure/foundry/how-to/evaluate-generative-ai-app) |

### Paso 0 — Crea un espacio de trabajo aislado (5 min)

**Dónde ejecutar esto:** el Paso 0 corre **localmente en tu propia máquina**. Abre una terminal (la terminal integrada de VS Code, PowerShell o bash). No tocas Azure hasta el Paso 1.

```bash
mkdir semantic-control && cd semantic-control
python -m venv .venv
# Windows (PowerShell):  .venv\Scripts\Activate.ps1    |    macOS/Linux:  source .venv/bin/activate
pip install azure-ai-projects azure-identity openai pydantic python-dotenv
mkdir .registry   # local stand-in for Azure SQL / Dataverse / App Configuration
```

✅ **Listo cuando** tu prompt muestra `(.venv)` y `pip list` incluye `azure-ai-projects`.

### Paso 1 — Aprovisiona tu modelo e inicia sesión (10 min)

El intent parser usa un deployment real de `gpt-4o`. Si **todavía no** lo has desplegado, realiza los **Pasos 1–2 de [Desafío 01 — Auditoría de alucinaciones](../01-hallucination-audit/challenge-01.md)** para seguir el recorrido exacto del portal y obtener los dos valores siguientes; después crea un `.env`:

```bash
# .env  — from Azure AI Foundry (never commit this file)
# PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<name>
# MODEL_DEPLOYMENT_NAME=gpt-4o
az login   # keyless auth via DefaultAzureCredential
```

Haz una prueba rápida antes de la Tarea 1: si imprime `setup works`, cualquier falla posterior será problema de tu lógica, no de la configuración.

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

> **Correcciones comunes:** `DefaultAzureCredential failed` → ejecuta `az login` otra vez. `DeploymentNotFound` → el deployment name no coincide. `401` → asigna el rol **Azure AI User** al proyecto.

### Paso 2 — Carga un concept registry versionado (10 min)

Guarda cada concepto de negocio **con una fecha de vigencia** para que las consultas históricas se resuelvan correctamente. Estas son **definiciones de ejemplo**: reemplázalas por las reales de tu firma.

```python
# registry.json — the authoritative definitions your code owns
{
  "magnificent_seven": [
    {"effective": "2023-01-01", "members": ["AAPL","MSFT","NVDA","AMZN","GOOGL","META","TSLA"]},
    {"effective": "2025-01-01", "members": ["AAPL","MSFT","NVDA","AMZN","GOOGL","META","AVGO"]}
  ],
  "fiscal_q1": {"start_rule": "prior_year_dec_31_close", "end_rule": "mar_31_close"}
}
```

> 🟦 **Nota Microsoft-first:** la carpeta / JSON `.registry` es un sustituto local. En producción, el registry debe vivir en **Azure SQL** (las temporal tables te dan historial versionado gratis), **Microsoft Dataverse** (editable por usuarios de negocio), **Azure Cosmos DB** o **Azure App Configuration** para despliegues tipo feature-flag. El anclaje temporal (`date.today()` inyectado por solicitud) y los hooks de enforcement de alcance permanecen en Python determinista en cualquier caso.

### La ruta a través de este desafío

1. **Tarea 1** — construye el concept registry externalizado.
2. **Tarea 2** — inyecta anclaje temporal en cada solicitud.
3. **Tarea 3** — construye un intent parser consciente de conceptos.
4. **Tarea 4** — agrega un hook de enforcement de alcance (pre-LLM).
5. **Criterios de éxito** — las definiciones provienen de *tu* registry, no de los datos de entrenamiento.
6. **Adáptalo a tu negocio** — externaliza *tus* conceptos.

> ⏱️ **Presupuesto de tiempo:** ~3 horas. La Tarea 1 (el registry) es la pieza central; todas las demás dependen de ella.

---

## Tareas
### Tarea 1 — Construye el concept registry

Externaliza todos los agrupamientos definidos por el negocio en un registry versionado. El LLM nunca "sabe" estas definiciones; siempre las recibe como contexto inyectado.

```python
# concept_registry.py
import json
from datetime import date
from typing import Optional
from pathlib import Path

class ConceptRegistry:
    """
    Versioned registry of business-defined groupings and rules.
    All definitions are date-ranged — correct answer depends on when the query runs.
    
    This replaces LLM training data as the authority on business concepts.
    """
    
    def __init__(self, registry_path: str = "config/concepts.json"):
        with open(registry_path) as f:
            self._registry = json.load(f)
    
    def resolve(self, concept: str, as_of_date: Optional[str] = None) -> dict:
        """
        Resolve a concept name to its current definition.
        Respects effective_date ranges — correct even for historical queries.
        """
        as_of = date.fromisoformat(as_of_date) if as_of_date else date.today()
        
        concept_key = concept.lower().replace(" ", "_").replace("-", "_")
        entries = self._registry.get("concepts", {}).get(concept_key, [])
        
        # Find the entry effective on the query date
        active = [
            e for e in entries
            if date.fromisoformat(e["effective_from"]) <= as_of
            and (e.get("effective_to") is None or date.fromisoformat(e["effective_to"]) >= as_of)
        ]
        
        if not active:
            return {"found": False, "concept": concept, "as_of": str(as_of)}
        
        return {
            "found": True,
            "concept": concept,
            "definition": active[-1],  # most recent effective entry
            "as_of": str(as_of),
            "source": "concept_registry"  # not LLM training data
        }
    
    def list_concepts(self) -> list:
        return list(self._registry.get("concepts", {}).keys())
```

```json
// config/concepts.json — the source of truth your code owns
{
  "concepts": {
    "magnificent_seven": [
      {
        "effective_from": "2023-01-01",
        "effective_to": "2024-12-31",
        "tickers": ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "TSLA", "META"],
        "description": "Magnificent Seven (2023 composition)",
        "source": "internal-research-team"
      },
      {
        "effective_from": "2025-01-01",
        "effective_to": null,
        "tickers": ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "AVGO"],
        "description": "Magnificent Seven (2025 composition — Broadcom replaces Tesla)",
        "source": "internal-research-team"
      }
    ],
    "fang": [
      {
        "effective_from": "2021-11-01",
        "effective_to": null,
        "tickers": ["META", "AMZN", "NFLX", "GOOGL"],
        "description": "FANG stocks (post FB→META rename)",
        "note": "Facebook became META on 2021-10-28"
      }
    ],
    "fiscal_quarter_q1": [
      {
        "effective_from": "2000-01-01",
        "effective_to": null,
        "start_convention": "prior_year_dec31_close",
        "end_convention": "mar31_close",
        "description": "Apex QR Q1 definition: Dec 31 close → Mar 31 close"
      }
    ]
  }
}
```

---

### Tarea 2 — Inyecta anclaje temporal

Cada solicitud debe incluir un `current_date` explícito. Ningún LLM debería inferir "today" a partir de sus pesos de entrenamiento.

```python
# temporal_grounding.py
from datetime import date, timedelta
import re

class TemporalGrounding:
    """
    Resolves relative time expressions to absolute dates
    using the actual current date — never LLM training data.
    """
    
    def __init__(self, current_date: Optional[date] = None):
        self.today = current_date or date.today()
    
    def resolve_time_expression(self, expression: str) -> dict:
        """
        Convert relative time expressions to concrete date ranges.
        Returns absolute dates for deterministic downstream use.
        """
        expr = expression.lower().strip()
        
        if "last week" in expr:
            # Previous Monday through Sunday
            days_since_monday = self.today.weekday()
            last_monday = self.today - timedelta(days=days_since_monday + 7)
            last_sunday = last_monday + timedelta(days=6)
            return {
                "start_date": str(last_monday),
                "end_date": str(last_sunday),
                "resolved_from": expression,
                "resolution_date": str(self.today)
            }
        
        elif "ytd" in expr or "year to date" in expr:
            return {
                "start_date": str(date(self.today.year, 1, 1)),
                "end_date": str(self.today),
                "resolved_from": expression,
                "resolution_date": str(self.today)
            }
        
        elif re.match(r"q[1-4]\s+\d{4}", expr):
            # e.g., "Q1 2025"
            quarter = int(expr[1])
            year = int(re.search(r'\d{4}', expr).group())
            return self._resolve_fiscal_quarter(quarter, year)
        
        # Default: pass through if already absolute dates
        return {"start_date": None, "end_date": None, "resolved_from": expression}
    
    def _resolve_fiscal_quarter(self, quarter: int, year: int) -> dict:
        """
        Resolve fiscal quarters using YOUR firm's definition.
        Not the LLM's interpretation.
        """
        registry = ConceptRegistry()
        q_def = registry.resolve(f"fiscal_quarter_q{quarter}")
        
        if not q_def["found"]:
            raise ValueError(f"Q{quarter} definition not found in concept registry")
        
        convention = q_def["definition"]
        
        if convention["start_convention"] == "prior_year_dec31_close":
            start = date(year - 1, 12, 31)
        else:
            # default: first trading day of quarter
            quarter_starts = {1: (1,1), 2: (4,1), 3: (7,1), 4: (10,1)}
            m, d = quarter_starts[quarter]
            start = date(year, m, d)
        
        quarter_ends = {1: (3,31), 2: (6,30), 3: (9,30), 4: (12,31)}
        m, d = quarter_ends[quarter]
        end = date(year, m, d)
        
        return {
            "start_date": str(start),
            "end_date": str(end),
            "resolved_from": f"Q{quarter} {year}",
            "convention_used": convention["description"],
            "resolution_date": str(self.today)
        }
    
    def build_grounded_system_prompt(self, base_prompt: str) -> str:
        """
        Prepend authoritative temporal context to any system prompt.
        LLM always knows today's date from code — never from training data.
        """
        return f"""
TEMPORAL CONTEXT (authoritative — use these values, not your training data):
- Today: {self.today.isoformat()}
- Current Year: {self.today.year}
- Current Quarter: Q{(self.today.month - 1) // 3 + 1} {self.today.year}

{base_prompt}
"""
```

---
### Tarea 3 — Intent parser consciente de conceptos

Intercepta las referencias a conceptos antes de que lleguen al LLM. Sustitúyelas por definiciones concretas.

```python
# concept_aware_parser.py

class ConceptAwareIntentParser:
    """
    Pre-processes user queries to replace concept references with
    concrete, registry-sourced definitions before the LLM sees them.
    
    LLM receives: "Compare AAPL, MSFT, GOOGL, AMZN, NVDA, META, AVGO returns"
    Not:          "Compare Magnificent Seven returns"
    """
    
    KNOWN_CONCEPTS = [
        "magnificent seven", "magnificent 7", "mag 7", "mag seven",
        "fang", "fang stocks", "faang",
        "dow 30", "dow jones", "s&p 500",
        "q1", "q2", "q3", "q4",
        "ytd", "year to date", "last week", "last month", "last year"
    ]
    
    def __init__(self):
        self.registry = ConceptRegistry()
        self.temporal = TemporalGrounding()
    
    def expand(self, user_query: str) -> tuple[str, dict]:
        """
        Expand concepts in user query to concrete definitions.
        Returns (expanded_query, expansion_log).
        
        Expansion log is part of the audit trail.
        """
        expanded = user_query
        expansion_log = {}
        
        # Resolve stock groupings
        for concept in self.KNOWN_CONCEPTS:
            if concept.lower() in user_query.lower():
                resolution = self.registry.resolve(concept)
                if resolution["found"]:
                    definition = resolution["definition"]
                    if "tickers" in definition:
                        tickers_str = ", ".join(definition["tickers"])
                        expanded = expanded.replace(concept, tickers_str)
                        expanded = expanded.replace(concept.title(), tickers_str)
                        expansion_log[concept] = {
                            "replaced_with": tickers_str,
                            "source": "concept_registry",
                            "definition_version": definition.get("effective_from")
                        }
        
        # Resolve temporal expressions
        time_expressions = self.temporal.find_relative_expressions(user_query)
        for expr in time_expressions:
            resolved = self.temporal.resolve_time_expression(expr)
            if resolved["start_date"]:
                expanded = expanded.replace(
                    expr,
                    f"from {resolved['start_date']} to {resolved['end_date']}"
                )
                expansion_log[expr] = resolved
        
        return expanded, expansion_log
    
    def parse(self, user_query: str) -> tuple[FinancialQuerySpec, dict]:
        """Full pipeline: expand concepts → parse intent → return spec + audit."""
        expanded_query, expansion_log = self.expand(user_query)
        
        # LLM now receives concrete, unambiguous query
        spec = parse_intent(
            expanded_query,
            current_date=str(self.temporal.today)
        )
        
        # Attach expansion log for audit trail
        audit = {
            "original_query": user_query,
            "expanded_query": expanded_query,
            "concept_expansions": expansion_log
        }
        
        return spec, audit
```

---

### Tarea 4 — Hook de enforcement de alcance

Usa un hook estilo `PostToolUse` para bloquear tool calls fuera de alcance a nivel de código.

```python
# scope_enforcement.py

ALLOWED_SCOPE = {
    "tools": ["query_financial_data", "calculate_returns"],
    "data_sources": ["stock_prices"],
    "query_types": ["historical_price", "return_calculation", "volume"],
    "forbidden": ["strategic_analysis", "earnings_forecast", "recommendation"]
}

def pre_llm_scope_check(user_query: str) -> dict:
    """
    Classify query scope BEFORE sending to LLM.
    Hard-block out-of-scope requests at the gateway.
    """
    # Fast, cheap classification call
    scope_classification = fast_classify(user_query, categories=[
        "historical_price_query",    # in scope
        "return_calculation",        # in scope
        "strategic_analysis",        # OUT OF SCOPE
        "earnings_forecast",         # OUT OF SCOPE
        "general_recommendation"     # OUT OF SCOPE
    ])
    
    if scope_classification in ALLOWED_SCOPE["forbidden"]:
        return {
            "allowed": False,
            "reason": f"Query classified as '{scope_classification}' — outside system scope",
            "message": (
                "This system is designed for historical price and return queries only. "
                "For strategic analysis or forecasts, please use [link to appropriate tool]."
            )
        }
    
    return {"allowed": True, "classification": scope_classification}
```

---

## Criterios de éxito

- [ ] La consulta de "Magnificent Seven" usa la definición del registry para la fecha correcta — no los datos de entrenamiento del LLM
- [ ] Una consulta histórica de "Magnificent Seven" en 2023 usa la composición de 2023 (incluye Tesla) y en 2025 usa la composición de 2025 (Broadcom, no Tesla)
- [ ] "Q1 returns" usa la convención del calendario fiscal de la firma — no la interpretación del LLM
- [ ] "Last week" se resuelve a fechas absolutas correctas con base en `date.today()` — nunca en datos de entrenamiento
- [ ] El LLM deja de fingir que "sabe" la fecha actual por entrenamiento y siempre usa el valor inyectado
- [ ] Las consultas fuera de alcance se bloquean en la gateway — no mediante una instrucción en el prompt
- [ ] Todas las expansiones de conceptos quedan registradas en el audit trail con `source: "concept_registry"`

---
## 🔁 Adapta esto a tu propio negocio

El escenario es un **quant fund**, pero *toda* empresa tiene términos de negocio cuyo significado el modelo entiende mal, con sutileza y con mucha confianza. La corrección es siempre la misma: **tu sistema es dueño de la definición, no el LLM.**

### Paso 1 — Encuentra los términos donde "el modelo cree saberlo, pero se equivoca"

| Industria | Término ambiguo que el LLM adivina | Lo que realmente debería significar (definido por ti) |
|----------|--------------------------------|-------------------------------------|
| **Retail** | "Top sellers" | Tu lista actual de merchandising, no la del año pasado |
| **Healthcare** | "High-risk patient" | Los criterios exactos de tu protocolo clínico |
| **Insurance** | "Preferred customer" | Tus reglas de niveles vigentes este trimestre |
| **SaaS / RevOps** | "Enterprise account" | Tus umbrales de segmentación, no una suposición genérica |
| **Manufacturing** | "Critical part" | Tus banderas actuales de criticidad en el BOM |
| **Public sector** | "Current fiscal year" | El calendario de tu jurisdicción, no enero–diciembre |

### Paso 2 — Mapea los bloques a tu stack (Microsoft-first)

| En este desafío | En tu proyecto — reemplázalo por |
|-------------------|--------------------------------|
| `registry.json` | **Azure SQL** (temporal tables), **Dataverse**, **Cosmos DB** o **App Configuration** |
| Versiones efectivas de conceptos | SQL temporal tables / historial de auditoría en Dataverse |
| Inyección de anclaje temporal | Middleware que inyecta `date.today()` por solicitud |
| Intent parser consciente de conceptos | **Azure OpenAI** solo para phrasing; la resolución permanece en código |
| Hook de enforcement de alcance | Gateway determinista pre-LLM (Azure Functions / API Management) |
| Evaluación de exactitud en resolución | Evaluador personalizado de **Azure AI Foundry Evaluations** |

### Paso 3 — Checklist de implementación de 5 preguntas

1. **¿Qué términos de negocio te avergonzaría que definiera el modelo?** Esos van primero al registry.
2. **¿Alguna de tus definiciones cambia con el tiempo?** Si sí → guárdalas con vigencia y resuélvelas según la fecha de la consulta.
3. **¿Tu agente asume la fecha de hoy en algún momento?** Si sí → inyecta `date.today()` por solicitud, nunca al iniciar el proceso.
4. **¿Una reformulación ingeniosa puede saltarse tu regla de "solo responde sobre X"?** Si sí → mueve el enforcement de alcance a código pre-LLM.
5. **¿Puedes demostrar de dónde salió una definición?** Si no → registra `source: "concept_registry"` en cada expansión.

### Paso 4 — Plan de despliegue de 1 semana

| Día | Acción | Responsable |
|-----|--------|-------|
| **Day 1** | Inventariar los 10 términos ambiguos más importantes que maneja tu agente | Domain expert + eng |
| **Day 2** | Construir el registry con vigencia en Azure SQL / Dataverse | Data eng |
| **Day 3** | Agregar middleware de anclaje temporal por solicitud | Backend dev |
| **Day 4** | Mover el enforcement de alcance a una gateway pre-LLM | Backend dev |
| **Day 5** | Agregar un evaluador de Foundry Evaluations para exactitud conceptual | ML eng |

### Paso 5 — Demuestra el ROI

- **Exactitud de definiciones** — % de resoluciones de conceptos que coinciden con el registry *(objetivo: 100%)*.
- **Corrección temporal** — % de consultas tipo "now/last week/this quarter" resueltas a fechas absolutas correctas *(objetivo: 100%)*.
- **Tasa de evasión de alcance** — % de reformulaciones adversariales que logran pasar el enforcement *(objetivo: 0%)*.

> 💡 **Regla práctica:** si la respuesta a "what does this term mean?" vive solo en la cabeza del modelo, *va a derivar* cuando el modelo cambie. Pon la definición en tu sistema, asígnale fecha y registra de dónde salió.

### Hacerlo por tu cuenta (sin equipo, con foco en portafolio)

¿Sin equipo ni presupuesto? Un demo de "el sistema es dueño de la definición, no el LLM" muestra un criterio senior que pocos perfiles junior tienen. Puedes hacerlo en una semana tú solo:

- **Lun–Mar** — inventaria tus 10 términos de negocio más riesgosos; construye un concept registry con vigencia (JSON/SQLite local por ahora, Azure SQL/Dataverse después).
- **Mié–Jue** — agrega anclaje temporal por solicitud (`date.today()`) + una compuerta de alcance pre-LLM.
- **Vie** — ejecuta una evaluación pequeña: exactitud de definiciones, corrección temporal e intentos adversariales de bypass de alcance.

📦 **Entrega este artefacto:** el registry + un informe de evaluación que muestre 100% de exactitud en definiciones/fechas y 0% de bypass de alcance. Bullet para CV: *"Made business-term resolution deterministic — 100% definition and date accuracy, 0% scope-bypass on adversarial rephrasings."*

> 🆓 **Ruta de costo mínimo:** un archivo de registry local + el modelo en capa de consumo; no se necesita infraestructura adicional para demostrar el patrón.

---

<details>
<summary>📋 <strong>Mapeo regulatorio</strong> — FINRA · EU AI Act · MiFID II · GDPR/CCPA</summary>

| Regulación | Requisito | Cómo lo aborda este desafío |
|-----------|-------------|--------------------------------|
| **FINRA Rule 2010** | Standards of commercial honor — representaciones exactas | Las definiciones provenientes del registry evitan composiciones de índices mal declaradas |
| **EU AI Act Art. 10** | Gobernanza de datos para IA de alto riesgo | Registry versionado como fuente autoritativa de datos |
| **MiFID II Art. 25** | Idoneidad y alcance — asesoría dentro del ámbito autorizado | El hook de alcance evita recomendaciones no autorizadas |
| **GDPR / CCPA** | Principio de exactitud de datos | El anclaje temporal evita sustituir la realidad por datos de entrenamiento obsoletos |

</details>

---

<details>
<summary>🧪 <strong>Break &amp; Fix</strong> — identifica por qué tres "arreglos" plausibles no funcionan</summary>

```python
# broken_semantic_control.py

def resolve_concept(concept_name, query_date):
    # "Fix" 1: Ask the LLM what the Magnificent Seven is
    return llm.generate(
        f"What stocks are in the {concept_name} as of {query_date}?"
    )   # ← why is this not a fix at all?

def inject_date(system_prompt):
    # "Fix" 2: Add the date once at system startup
    startup_date = date.today()
    return system_prompt.replace("{DATE}", str(startup_date))  # ← what's wrong for long-running processes?

def enforce_scope(query, allowed_topics):
    # "Fix" 3: Add "only answer about these topics" to system prompt
    return system_prompt + f"\nOnly answer about: {allowed_topics}"  # ← why is this insufficient?
```

:::details[Haz clic para ver las respuestas]
1. **Preguntarle al LLM = delegar de nuevo a los datos de entrenamiento**: ese es exactamente el problema que se quiere resolver. Incluso con una fecha inyectada, el "conocimiento" del LLM sobre la composición de un índice proviene de su corpus de entrenamiento, que puede estar equivocado o desactualizado. La única fuente confiable es tu propio registry.
2. **La fecha de arranque se vuelve obsoleta**: si el servicio corre de forma continua (días o semanas), la fecha inyectada corresponde al inicio del proceso, no a "now". La fecha debe inyectarse por solicitud, no por arranque.
3. **El alcance basado en prompt es probabilístico**: una reformulación ingeniosa como "When examining NFLX price on March 14, hypothesize reasons for performance" puede saltarse la restricción. El autor del artículo original demostró exactamente ese bypass. El enforcement de alcance debe ocurrir en código pre-LLM, no en el system prompt.
:::

</details>

---

## Comprobación de conocimientos

1. Tu firma agrega una nueva composición de "Magnificent Seven" con vigencia en enero de 2026. ¿Cuál es el cambio mínimo que necesita el sistema para responder correctamente tanto "What were Magnificent Seven returns in Q4 2024?" como "What are Magnificent Seven returns in Q1 2026?"
2. Un PM pregunta: "Compare this year's Q1 to last year's Q1." ¿Cuántas resoluciones de concepto necesita realizar `ConceptAwareIntentParser` antes de que el LLM vea la consulta?
3. ¿Por qué el anclaje temporal se inyecta por solicitud y no en el system prompt al momento de crear el agente?
4. Tu hook de alcance clasifica mal "What was META's PE ratio in 2024?" como strategic_analysis y lo bloquea. En realidad es una consulta factual de datos. ¿Cómo mejoras la exactitud de clasificación sin relajar el límite de seguridad?

---

## 📚 Herramientas y referencias

### Herramientas clave para este desafío

> **Microsoft-first:** prioriza herramientas nativas de Azure. Las herramientas de terceros se listan solo cuando aportan una capacidad confiable y de primer nivel que aún no está cubierta de forma nativa.

| Herramienta | Función en este desafío | Enlace |
|------|----------------------|------|
| **Azure SQL Database (temporal tables)** | Almacenar el concept registry con historial versionado y consultable — resolver "Magnificent Seven" para cualquier fecha | [Docs](https://learn.microsoft.com/azure/azure-sql/) |
| **Microsoft Dataverse** | Concept registry editable por usuarios de negocio con historial de auditoría — actualizar definiciones sin desplegar código | [Docs](https://learn.microsoft.com/power-apps/maker/data-platform/) |
| **Azure App Configuration** | Despliegue gradual tipo feature-flag de cambios de definición (fechas efectivas, cutover paulatino) | [Docs](https://learn.microsoft.com/azure/azure-app-configuration/overview) |
| **Azure OpenAI — Structured Outputs** | Obligar al intent parser a devolver un objeto `IntentQuery` tipado, no texto libre | [Docs](https://learn.microsoft.com/azure/ai-services/openai/how-to/structured-outputs) |
| **Azure AI Foundry Evaluations** | Evaluadores personalizados — medir la exactitud de resolución de conceptos contra tu registry | [Docs](https://learn.microsoft.com/azure/foundry/how-to/evaluate-generative-ai-app) |
| **Azure API Management / Azure Functions** | Gateway determinista pre-LLM para enforcement de alcance — bloquear consultas fuera de alcance antes de que el modelo las vea | [APIM](https://learn.microsoft.com/azure/api-management/) · [Functions](https://learn.microsoft.com/azure/azure-functions/) |
| Pydantic v2 *(third-party)* | Esquema local para modelos del registry cuando no usas Structured Outputs | [docs.pydantic.dev](https://docs.pydantic.dev) |
| DeepEval / RAGAS *(third-party)* | Métricas de similitud semántica para pruebas de regresión de resolución de conceptos | [DeepEval](https://github.com/confident-ai/deepeval) · [RAGAS](https://github.com/explodinggradients/ragas) |

### Lectura obligatoria

| Recurso | Por qué importa |
|----------|---------------|
| [The LLM-as-Analyst Trap, Part 1 — Semantic Drift section](https://appliedingenuity.substack.com/p/the-llm-as-analyst-trap-a-technical) | El modo de falla original que aborda este desafío: los LLM usan definiciones de entrenamiento, no las definiciones empresariales vigentes |
| [Azure OpenAI Structured Outputs](https://learn.microsoft.com/azure/ai-services/openai/how-to/structured-outputs) | Cómo obligar al LLM a devolver objetos tipados — la base del intent parsing determinista |
| [Azure SQL temporal tables](https://learn.microsoft.com/azure/azure-sql/temporal-tables) | Cómo almacenar definiciones de conceptos con vigencia e historial automático de versiones |
| [Data governance for high-risk AI (Azure)](https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns) | Guía de Microsoft sobre fuentes de datos autoritativas para decisiones de agentes |
