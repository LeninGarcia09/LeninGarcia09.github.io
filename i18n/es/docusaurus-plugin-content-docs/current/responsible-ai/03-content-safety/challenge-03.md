---
sidebar_position: 1
title: "Desafío 03: Herramienta de reclutamiento con IA señalada por sesgo"
---

# Desafío 03: Herramienta de reclutamiento con IA señalada por sesgo en tres departamentos

:::info[Resumen del escenario]
**Industria:** Enterprise HR | **Contexto regulatorio:** EU AI Act Annex III Sec. 4, EEOC AI Guidance, NIST AI RMF MEASURE 2.5  
**Tiempo estimado:** 90 minutos | **Costo de Azure:** ~$3–6
:::

---

## Qué está en juego

**GlobalTech Corporation** desplegó una herramienta de filtrado de currículums con IA hace 8 meses. Tres líderes de departamento reportaron a HR un patrón preocupante:

> *"La IA clasifica de forma consistente a las candidatas mujeres por debajo de los hombres para puestos de ingeniería, y a los candidatos con nombres no occidentales por debajo del resto para puestos de cara al cliente. Ya empezamos a anular manualmente sus decisiones en el 30% de los casos."*

El equipo legal ha advertido que esto probablemente constituye discriminación por impacto dispar conforme a las guías de la EEOC. Tienes 2 semanas para diagnosticar, documentar y mitigar antes de enfrentarse a una investigación de la EEOC.

---

## Habilidades practicadas

- Ejecutar **fairness evaluations** usando Azure AI Evaluation SDK
- Usar el **RAI Dashboard** para visualizar disparidades de rendimiento del modelo
- Implementar **estrategias de mitigación de fairness** (pre-processing, in-processing, post-processing)
- Documentar hallazgos de sesgo con fines legales y regulatorios
- Entender **disparate impact** vs **disparate treatment** en sistemas de IA

---

## Comprender el problema

```
Disparate Treatment: The AI was explicitly trained to prefer certain groups.
  → This is intentional discrimination. Rare but very serious.

Disparate Impact: The AI produces different outcomes for protected groups
  even without explicit group features.
  → This is what happened at GlobalTech. The model learned proxies:
    "attended women's college" → female signal → lower score
    "non-Western name patterns" → demographic proxy → lower score
```

---

## 🧰 Antes de empezar — configuración del entorno

Este es un ejercicio de **medición de fairness**. Vas a cuantificar la disparidad, encontrar la causa raíz, mitigarla y demostrar que la métrica mejora. La preparación se centra en la herramienta de fairness y en un dataset donde *sabes* que el sesgo existe.

### Prerrequisitos

| Requisito | Por qué lo necesitas | Cómo comprobarlo |
|-------------|-----------------|--------------|
| Python 3.10+ + pandas | Calcular métricas de disparidad | `python --version` |
| **Azure AI Evaluation SDK** | Ejecutar evaluadores de fairness/calidad sobre salidas del modelo | `pip show azure-ai-evaluation` |
| **Responsible AI dashboard** (Azure Machine Learning) | Visualizar disparidades de rendimiento entre grupos | [Docs](https://learn.microsoft.com/azure/machine-learning/concept-responsible-ai-dashboard) |
| **Fairlearn** *(Microsoft open-source)* | Métricas de disparidad + algoritmos de mitigación | `pip show fairlearn` |
| Un dataset etiquetado con atributo protegido | Calcular el Disparate Impact Ratio (DIR) | ver Paso 1 |

### Paso 0 — Crea un workspace aislado (5 min)

**Dónde ejecutar esto:** el Paso 0 se ejecuta **localmente en tu propia máquina**; abre una terminal (la terminal integrada de VS Code, PowerShell o bash). La matemática del DIR corre localmente; solo llegas a Azure en la Tarea 2.

```bash
mkdir fairness-audit && cd fairness-audit
python -m venv .venv
# Windows (PowerShell):  .venv\Scripts\Activate.ps1    |    macOS/Linux:  source .venv/bin/activate
pip install pandas azure-ai-evaluation fairlearn azure-ai-ml azure-identity
az login   # only needed for Task 2 (Responsible AI dashboard in Azure ML); the DIR math runs locally
```

✅ **Completado cuando** tu prompt muestra `(.venv)` y `python -c "import fairlearn, pandas"` se ejecuta sin error.

### Paso 1 — Genera un dataset de muestra con sesgo CONOCIDO (10 min)

Usa un dataset pequeño donde la disparidad esté *deliberadamente presente* (son **filas sintéticas de ejemplo**, no candidatos reales), para que puedas demostrar que tu métrica la detecta y que tu mitigación la corrige. Ejecuta esto para crearlo:

```python
# make_sample.py — synthetic data, NOT real candidates. Group B is deliberately under-selected.
import numpy as np, pandas as pd
rng = np.random.default_rng(42)
n = 500
group = rng.choice(["A", "B"], size=n, p=[0.6, 0.4])
# Bias baked in: group A scores higher on average, so its selection rate exceeds B's.
score = np.where(group == "A", rng.normal(0.65, 0.15, n), rng.normal(0.45, 0.15, n)).clip(0, 1)
hired = (score >= 0.5).astype(int)
pd.DataFrame({"candidate_id": range(n), "group": group,
              "model_score": score.round(3), "hired": hired}).to_csv("sample_scores.csv", index=False)
sel = pd.read_csv("sample_scores.csv").groupby("group")["hired"].mean()
print(sel, "\nDIR (B/A):", round(sel["B"] / sel["A"], 3))   # expect well below 0.8 → bias confirmed
```

✅ **Completado cuando** `python make_sample.py` imprime un **DIR por debajo de 0.8**; esa es tu disparidad inicial demostrable para la Tarea 1.

> 🟦 **Nota Microsoft-first:** el stack de fairness aquí es Microsoft: **Azure AI Evaluation SDK** ([how-to](https://learn.microsoft.com/azure/ai-foundry/how-to/develop/evaluate-sdk)) y el **Responsible AI dashboard** de **Azure Machine Learning**, además de **Fairlearn** (el toolkit open-source de fairness de Microsoft). Guarda el dataset auditado y los resultados en **Azure ML datastores** / **Microsoft Fabric**, no en CSVs sueltos.

### El recorrido de este desafío

1. **Tarea 1** — medir la disparidad (Disparate Impact Ratio por grupo).
2. **Tarea 2** — visualizarla en el Responsible AI dashboard.
3. **Tarea 3** — encontrar la causa raíz (variables proxy).
4. **Tarea 4** — aplicar una mitigación y agregar human-in-the-loop.
5. **Criterios de éxito** — DIR ≥ 0.85 en todos los grupos.
6. **Adáptalo a tu negocio** — audita *tu* modelo de decisiones sobre personas.

> ⏱️ **Presupuesto de tiempo:** ~90 minutos. Medir el DIR (Tarea 1) es el ancla; todo lo demás se juzga contra esa línea base.

---

## Tus tareas

### Tarea 1: Mide la disparidad

```python
import pandas as pd
import numpy as np

# Load historical screening decisions (anonymized for this exercise)
df = pd.read_csv("screening_decisions.csv")
# Columns: candidate_id, department, ai_score, human_decision, gender, name_origin, hired

# Calculate selection rates by group
def disparate_impact_ratio(df, group_col, positive_outcome_col, majority_group):
    """
    Disparate Impact Ratio (DIR) = Selection rate of minority group / Selection rate of majority group
    EEOC 4/5ths rule: DIR < 0.8 indicates potential adverse impact
    """
    rates = df.groupby(group_col)[positive_outcome_col].mean()
    majority_rate = rates[majority_group]
    
    results = {}
    for group, rate in rates.items():
        if group != majority_group:
            dir_ratio = rate / majority_rate
            results[group] = {
                "selection_rate": round(rate, 3),
                "disparate_impact_ratio": round(dir_ratio, 3),
                "eeoc_concern": "⚠️ ADVERSE IMPACT" if dir_ratio < 0.8 else "✅ OK"
            }
    
    return results

# Engineering department analysis
eng_df = df[df["department"] == "Engineering"]
gender_analysis = disparate_impact_ratio(eng_df, "gender", "hired", "Male")
print("Engineering - Gender Disparate Impact:")
for group, stats in gender_analysis.items():
    print(f"  {group}: Selection rate={stats['selection_rate']}, DIR={stats['disparate_impact_ratio']} {stats['eeoc_concern']}")

# Example output:
# Female: Selection rate=0.12, DIR=0.53 ⚠️ ADVERSE IMPACT  (< 0.8 threshold)
```

### Tarea 2: Identifica causas raíz usando el RAI Dashboard

```python
from azure.ai.ml import MLClient
from azure.ai.ml.entities import ResponsibleAIInsights
from azure.identity import DefaultAzureCredential

# The RAI Dashboard (in Azure Machine Learning) provides visual fairness analysis
# First, register the model and dataset in Azure ML

ml_client = MLClient(
    credential=DefaultAzureCredential(),
    subscription_id=os.environ["AZURE_SUBSCRIPTION_ID"],
    resource_group_name=os.environ["AZURE_RESOURCE_GROUP"],
    workspace_name=os.environ["AZURE_ML_WORKSPACE"]
)

# Create RAI insights component
rai_job = ml_client.jobs.create_or_update({
    "type": "pipeline",
    "jobs": {
        "rai_insights": {
            "type": "command",
            "component": "azureml://registries/azureml/components/rai_insights_constructor/versions/latest",
            "inputs": {
                "target_column": "hired",
                "task_type": "classification",
                "sensitive_features": "gender,name_origin",
                "model_id": "azureml:hiring-screening-model:1",
                "train_dataset": "azureml:screening_train:1",
                "test_dataset": "azureml:screening_test:1",
            }
        }
    }
})
```

### Tarea 3: Implementa mitigación post-processing

```python
from sklearn.calibration import CalibratedClassifierCV
import numpy as np

class FairnessPostProcessor:
    """
    Post-processing mitigation: adjust score thresholds per group to equalize selection rates.
    This is the most common mitigation approach for deployed models.
    """
    
    def __init__(self, target_dir: float = 0.85):
        """target_dir: Desired minimum disparate impact ratio (0.8 = EEOC threshold, 0.85 = safer)"""
        self.target_dir = target_dir
        self.group_thresholds = {}
    
    def fit(self, X, y, sensitive_feature_col):
        """Learn per-group thresholds from historical data."""
        # Get base model scores
        base_scores = self.base_model.predict_proba(X)[:, 1]
        
        # Find threshold for majority group
        majority_mask = X[sensitive_feature_col] == "Male"
        majority_threshold = np.percentile(base_scores[majority_mask], 70)  # Top 30% selected
        majority_rate = (base_scores[majority_mask] >= majority_threshold).mean()
        
        # Adjust thresholds for other groups to achieve target DIR
        for group in X[sensitive_feature_col].unique():
            if group == "Male":
                self.group_thresholds[group] = majority_threshold
                continue
            
            group_mask = X[sensitive_feature_col] == group
            group_scores = base_scores[group_mask]
            
            # Find threshold that gives selection rate = majority_rate * target_dir
            target_rate = majority_rate * self.target_dir
            threshold = np.percentile(group_scores, (1 - target_rate) * 100)
            self.group_thresholds[group] = threshold
        
        return self
    
    def predict(self, scores, groups) -> np.ndarray:
        """Apply group-specific thresholds."""
        decisions = np.zeros(len(scores), dtype=bool)
        for i, (score, group) in enumerate(zip(scores, groups)):
            threshold = self.group_thresholds.get(group, self.group_thresholds.get("Male"))
            decisions[i] = score >= threshold
        return decisions
```

### Tarea 4: Implementa human-in-the-loop override

```python
# For EU AI Act Annex III compliance, hiring tools REQUIRE human review
# The AI can rank/score, but humans must make the final decision

class HuringScreeningPipeline:
    def __init__(self, ai_model, fairness_processor, human_review_threshold=0.5):
        self.ai_model = ai_model
        self.fairness_processor = fairness_processor
        # Candidates within 10% of threshold go to mandatory human review
        self.review_band = 0.10
    
    def screen_candidate(self, candidate: dict) -> dict:
        score = self.ai_model.score(candidate)
        group = candidate.get("inferred_demographic")  # From name analysis
        threshold = self.fairness_processor.group_thresholds.get(group, 0.5)
        
        # Mandatory human review band
        in_review_band = abs(score - threshold) < self.review_band
        
        return {
            "candidate_id": candidate["id"],
            "ai_score": round(score, 3),
            "ai_recommendation": "Advance" if score >= threshold else "Pass",
            "requires_human_review": in_review_band or score >= threshold * 0.9,
            "review_reason": "Score near threshold — human judgment required" if in_review_band else None,
            # EU AI Act Art. 14: Human must be able to override
            "human_decision": None,  # Filled by HR reviewer
            "human_override_reason": None,  # Required if overriding AI
        }
```

### Tarea 5: Crea documentación legal

```markdown
## Bias Incident Documentation — GlobalTech Hiring Tool

**Date Identified:** [Date]  
**Reported By:** Department Heads (Engineering, Marketing, Operations)  
**Regulatory Exposure:** EEOC, EU AI Act Annex III Section 4

### Findings
- Gender disparate impact ratio: 0.53 (below EEOC 0.8 threshold)
- Name-origin disparate impact ratio: 0.61 (below threshold)
- Affected candidates: ~340 over 8-month deployment period

### Root Cause
Model learned demographic proxies from historical hiring data that reflected 
existing workforce composition bias (pre-AI). The model optimized for "hired 
in the past" which reflected historical bias rather than job performance.

### Mitigation Implemented
1. Post-processing threshold adjustment per demographic group
2. Mandatory human review for all borderline decisions
3. Quarterly fairness audit with DIR measurement
4. HR training on AI limitations and override procedure

### Ongoing Monitoring
- Monthly DIR calculation logged to Responsible AI Dashboard
- Automated alert if any group's DIR drops below 0.85
- Annual third-party fairness audit

### Regulatory Status
- EU AI Act compliance assessment: IN PROGRESS
- EEOC pre-emptive disclosure: PENDING LEGAL REVIEW
- Technical documentation per Art. 11: COMPLETE (attached)
```

---

## Criterios de éxito

- [ ] Disparate Impact Ratio calculado para todos los grupos protegidos en los tres departamentos
- [ ] Al menos un grupo muestra DIR < 0.8 (confirmando el problema reportado)
- [ ] Causa raíz identificada (variables proxy en los datos de entrenamiento)
- [ ] La mitigación post-processing eleva el DIR a ≥ 0.85 en todos los grupos
- [ ] Mecanismo de human-in-the-loop override implementado
- [ ] Documentación legal completada con hallazgos, causa raíz y mitigación

---

## 🔁 Adáptalo a tu propio negocio

El escenario es una **herramienta de reclutamiento**, pero *cualquier* IA que tome o influya en decisiones **sobre personas** puede generar impacto dispar, a menudo mediante variables proxy y sin ningún atributo protegido explícito. El ciclo medir → diagnosticar → mitigar → documentar es el mismo en cualquier sector.

### Paso 1 — Encuentra tu momento de "la IA decide algo sobre una persona"

| Industria | La decisión sobre personas | El riesgo de impacto dispar |
|----------|---------------------|---------------------------|
| **HR / recruiting** | Filtrado de CVs, scoring para promociones | Proxies de género / etnia |
| **Lending / fintech** | Aprobación de crédito, pricing | Proxies de código postal / ingresos |
| **Insurance** | Underwriting, triage de reclamos | Proxies de edad / discapacidad |
| **Higher education** | Admisiones, scoring de becas | Proxies socioeconómicos |
| **Healthcare** | Triage, priorización de atención | Proxies de raza / acceso |
| **Public sector** | Elegibilidad para beneficios, scoring de fraude | Proxies de clases protegidas |

### Paso 2 — Mapea los bloques a tu stack (Microsoft-first)

| En este desafío | En tu proyecto — usa |
|-------------------|-----------------------|
| Métricas de DIR / disparidad | **Fairlearn** + **Azure AI Evaluation SDK** |
| Visualización de disparidad | **Responsible AI dashboard** (Azure ML) |
| Análisis de causa raíz | Importancia de variables / análisis de errores del RAI dashboard |
| Mitigación | Algoritmos de Fairlearn de pre/in/post-processing |
| Human-in-the-loop override | Paso obligatorio de reviewer (workflow con Power Apps / Dataverse) |
| Monitoreo continuo | Jobs programados de fairness en **Azure ML** + **Azure Monitor** |

### Paso 3 — Checklist de implementación en 5 preguntas

1. **¿Tu modelo influye en una decisión sobre una persona?** Si sí → necesita una auditoría de fairness, punto.
2. **¿Mides resultados por grupo protegido?** Si no → calcula ahora mismo DIR / la regla del 4/5.
3. **¿Una variable proxy podría estar filtrando pertenencia a un grupo?** Si no estás seguro → ejecuta feature importance en el RAI dashboard.
4. **¿Existe human override para decisiones adversas?** Si no → agrega human-in-the-loop antes incluso de corregir el DIR.
5. **¿Reauditas con una cadencia definida?** Si no → fija un job trimestral de fairness; los modelos derivan.

### Paso 4 — Plan de despliegue de 1 semana

| Día | Acción | Responsable |
|-----|--------|-------|
| **Day 1** | Calcular DIR / regla del 4/5 para cada grupo protegido | Data scientist |
| **Day 2** | Cargar el modelo en el Responsible AI dashboard | ML eng |
| **Day 3** | Identificar variables proxy que provocan la disparidad | Data scientist |
| **Day 4** | Aplicar una mitigación con Fairlearn y volver a medir DIR | ML eng |
| **Day 5** | Agregar human-in-the-loop + redactar el bias incident report | Compliance + ML |

### Paso 5 — Demuestra el ROI

- **Disparate Impact Ratio** — tasa de selección del grupo con peor resultado ÷ la del mejor *(objetivo: ≥ 0.8, idealmente ≥ 0.85)*.
- **Cobertura de grupos** — % de grupos protegidos realmente evaluados *(objetivo: 100%)*.
- **Cobertura de human override** — % de decisiones adversas con reviewer humano *(objetivo: 100%)*.

> 💡 **Regla práctica:** eliminar el atributo protegido **no** elimina el sesgo; los modelos aprenden proxies. Mide resultados por grupo o estarás volando a ciegas.

### Hacerlo en solitario (sin equipo, portfolio-first)

¿Sin equipo y sin presupuesto? Una auditoría de fairness con un DIR real antes/después es una de las piezas de portfolio de Responsible AI más respetadas. Haz la semana tú solo:

- **Mon–Tue** — toma un dataset público (o el sintético de setup) y calcula DIR / la regla del 4/5 por grupo protegido.
- **Wed–Thu** — encuentra variables proxy en el Responsible AI dashboard, aplica una mitigación con Fairlearn y vuelve a medir.
- **Fri** — exporta el antes/después del DIR y redacta un bias incident report de una página.

📦 **Entrega este artefacto:** un notebook de Fairlearn + una exportación del RAI dashboard mostrando que el DIR supera 0.8. Bullet para CV: *"Diagnostiqué y mitigé impacto dispar; elevé el Disparate Impact Ratio por encima de 0.85 y documenté la corrección conforme a NIST AI RMF."*

> 🆓 **Ruta free-tier:** Fairlearn y el Responsible AI dashboard son OSS gratuitos; toda la auditoría puede ejecutarse localmente en una laptop.

---

<details>
<summary>📋 <strong>Mapeo regulatorio</strong> — EU AI Act · EEOC · NIST AI RMF</summary>

| Requisito | Regulación | Implementación |
|-------------|-----------|----------------|
| No discriminación en IA para empleo | EU AI Act Annex III Sec. 4 | Supervisión humana obligatoria en todas las decisiones hire/pass |
| Pruebas de impacto adverso | EEOC Uniform Guidelines | Cálculo mensual de DIR + validación de la regla del 4/5 |
| Supervisión humana | EU AI Act Art. 14 | Reviewer de HR obligatorio para todas las decisiones |
| Documentación técnica | EU AI Act Art. 11 | Bias incident report + plan de monitoreo continuo |
| MEASURE 2.5 — Evaluación de sesgo | NIST AI RMF | Ciclo trimestral de auditoría de fairness |

</details>

---

<details>
<summary>💡 Pistas</summary>

1. **La regla del 4/5 es un piso, no un techo**: el umbral 0.8 de la EEOC es el mínimo legal. En la práctica apunta a 0.9+; 0.8 sigue siendo evidencia de disparidad significativa que un demandante sabrá explotar.
2. **No elimines variables demográficas; mídelas**: de forma contraintuitiva, volver al modelo "ciego" a la demografía suele empeorar el impacto dispar porque las variables proxy siguen codificando la información. Mejor enfoque: prueba explícitamente por grupos demográficos y aplica post-processing.
3. **El EU AI Act no dice "no uses IA para contratar"**: dice que la uses con la supervisión adecuada. Un pipeline de HR que obligue a un humano a confirmar cada recomendación de IA es la arquitectura compatible.
4. **Documenta todo**: el riesgo legal no solo viene de la disparidad, sino de no poder demostrar que la detectaste, investigaste y mitigaste. Una buena documentación puede convertir una demanda en un acuerdo manejable.

</details>

---

## Verificación de conocimiento

1. ¿Qué es la "regla del 4/5" de la EEOC y qué umbral de DIR activa preocupación?
2. ¿Por qué eliminar variables demográficas de los datos de entrenamiento suele no bastar para eliminar el impacto dispar?
3. Bajo el Annex III del EU AI Act, ¿qué requisito de supervisión humana aplica a la IA relacionada con empleo?
4. ¿Cuál es la diferencia entre disparate treatment y disparate impact?

---

## Limpieza

```bash
# Delete any candidate PII from local files
Remove-Item screening_decisions.csv -ErrorAction SilentlyContinue
```
