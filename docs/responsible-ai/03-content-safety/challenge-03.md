---
sidebar_position: 1
title: "Challenge 03: AI Hiring Tool Flagged for Bias"
---

# Challenge 03: AI Hiring Tool Flagged for Bias in Three Departments

:::info Scenario Brief
**Industry:** Enterprise HR | **Regulatory Context:** EU AI Act Annex III Sec. 4, EEOC AI Guidance, NIST AI RMF MEASURE 2.5  
**Time Estimate:** 90 minutes | **Azure Cost:** ~$3–6
:::

---

## What's at Stake

**GlobalTech Corporation** deployed an AI resume screening tool 8 months ago. Three department heads flagged a pattern to HR:

> *"The AI consistently ranks female candidates lower for engineering roles, and candidates with non-Western names lower for customer-facing roles. We've started manually overriding it in 30% of cases."*

The legal team has advised: this is likely disparate impact discrimination under EEOC guidelines. You have 2 weeks to diagnose, document, and mitigate before they face an EEOC inquiry.

---

## Skills Practiced

- Running **fairness evaluations** using Azure AI Evaluation SDK
- Using the **RAI Dashboard** to visualize model performance disparities
- Implementing **fairness mitigation strategies** (pre-processing, in-processing, post-processing)
- Documenting bias findings for legal and regulatory purposes
- Understanding **disparate impact** vs **disparate treatment** in AI systems

---

## Understanding the Problem

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

## 🧰 Before You Start — Environment Setup

This is a **fairness measurement** exercise. You quantify the disparity, find its root cause, mitigate it, and prove the metric improved. Setup centers on the fairness tooling and a dataset where you *know* the bias exists.

### Prerequisites

| Requirement | Why you need it | How to check |
|-------------|-----------------|--------------|
| Python 3.10+ + pandas | Compute disparity metrics | `python --version` |
| **Azure AI Evaluation SDK** | Run fairness/quality evaluators on model outputs | `pip show azure-ai-evaluation` |
| **Responsible AI dashboard** (Azure Machine Learning) | Visualize performance disparities across groups | [Docs](https://learn.microsoft.com/azure/machine-learning/concept-responsible-ai-dashboard) |
| **Fairlearn** *(Microsoft open-source)* | Disparity metrics + mitigation algorithms | `pip show fairlearn` |
| A labeled dataset with a protected attribute | Compute the Disparate Impact Ratio (DIR) | see Step 1 |

### Step 0 — Create an isolated workspace (5 min)

```bash
mkdir fairness-audit && cd fairness-audit
python -m venv .venv
# Windows (PowerShell):  .venv\Scripts\Activate.ps1    |    macOS/Linux:  source .venv/bin/activate
pip install pandas azure-ai-evaluation fairlearn azure-ai-ml azure-identity
az login   # only needed for Task 2 (Responsible AI dashboard in Azure ML); the DIR math runs locally
```

✅ **Done when** your prompt shows `(.venv)` and `python -c "import fairlearn, pandas"` runs without error.

### Step 1 — Generate a KNOWN-biased sample dataset (10 min)

Use a small dataset where the disparity is *deliberately present* (these are **synthetic sample rows**, not real candidates), so you can prove your metric detects it and your mitigation fixes it. Run this to create it:

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

✅ **Done when** `python make_sample.py` prints a **DIR below 0.8** — that's your provable starting disparity for Task 1.

> 🟦 **Microsoft-first note:** the fairness stack here is Microsoft — the **Azure AI Evaluation SDK** ([how-to](https://learn.microsoft.com/azure/ai-foundry/how-to/develop/evaluate-sdk)) and the **Responsible AI dashboard** in **Azure Machine Learning**, plus **Fairlearn** (Microsoft's open-source fairness toolkit). Store the audited dataset and results in **Azure ML datastores** / **Microsoft Fabric**, not loose CSVs.

### The path through this challenge

1. **Task 1** — measure the disparity (Disparate Impact Ratio per group).
2. **Task 2** — visualize it in the Responsible AI dashboard.
3. **Task 3** — find the root cause (proxy variables).
4. **Task 4** — apply a mitigation and add human-in-the-loop.
5. **Success Criteria** — DIR ≥ 0.85 across all groups.
6. **Adapt to Your Business** — audit *your* people-decision model.

> ⏱️ **Time budget:** ~90 minutes. Measuring the DIR (Task 1) is the anchor — everything else is judged against it.

---

## Your Tasks

### Task 1: Measure the Disparity

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

### Task 2: Identify Root Causes Using the RAI Dashboard

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

### Task 3: Implement Post-Processing Mitigation

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

### Task 4: Implement Human-in-the-Loop Override

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

### Task 5: Create Legal Documentation

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

## Success Criteria

- [ ] Disparate Impact Ratio calculated for all protected groups across all three departments
- [ ] At least one group shows DIR < 0.8 (confirming the reported problem)
- [ ] Root cause identified (proxy variables in training data)
- [ ] Post-processing mitigation raises DIR to ≥ 0.85 across all groups
- [ ] Human-in-the-loop override mechanism implemented
- [ ] Legal documentation completed with findings, root cause, and mitigation

---

## 🔁 Adapt This to Your Own Business

The scenario is a **hiring tool**, but *any* AI that makes or influences decisions **about people** can produce disparate impact — often through proxy variables, without any explicit protected attribute. The measure → diagnose → mitigate → document loop is the same everywhere.

### Step 1 — Find your "AI decides something about a person" moment

| Industry | The people-decision | The disparate-impact risk |
|----------|---------------------|---------------------------|
| **HR / recruiting** | Resume screening, promotion scoring | Gender / ethnicity proxies |
| **Lending / fintech** | Credit approval, pricing | ZIP-code / income proxies |
| **Insurance** | Underwriting, claims triage | Age / disability proxies |
| **Higher education** | Admissions, scholarship scoring | Socioeconomic proxies |
| **Healthcare** | Triage, care-management targeting | Race / access proxies |
| **Public sector** | Benefits eligibility, fraud scoring | Protected-class proxies |

### Step 2 — Map the building blocks to your stack (Microsoft-first)

| In this challenge | In your project — use |
|-------------------|-----------------------|
| DIR / disparity metrics | **Fairlearn** + **Azure AI Evaluation SDK** |
| Disparity visualization | **Responsible AI dashboard** (Azure ML) |
| Root-cause analysis | RAI dashboard feature importance / error analysis |
| Mitigation | Fairlearn pre/in/post-processing algorithms |
| Human-in-the-loop override | Required reviewer step (Power Apps / Dataverse workflow) |
| Ongoing monitoring | Scheduled **Azure ML** fairness jobs + **Azure Monitor** |

### Step 3 — The 5-question implementation checklist

1. **Does your model influence a decision about a person?** If yes → it needs a fairness audit, full stop.
2. **Do you measure outcomes by protected group?** If not → compute DIR / the 4/5ths rule now.
3. **Could a proxy variable be leaking group membership?** If unsure → run feature importance in the RAI dashboard.
4. **Is there a human override for adverse decisions?** If not → add human-in-the-loop before the DIR fix.
5. **Do you re-audit on a schedule?** If not → set a quarterly fairness job; models drift.

### Step 4 — A 1-week rollout plan

| Day | Action | Owner |
|-----|--------|-------|
| **Day 1** | Compute DIR / 4/5ths rule for each protected group | Data scientist |
| **Day 2** | Load the model into the Responsible AI dashboard | ML eng |
| **Day 3** | Identify proxy variables driving the disparity | Data scientist |
| **Day 4** | Apply a Fairlearn mitigation; re-measure DIR | ML eng |
| **Day 5** | Add human-in-the-loop + write the bias incident report | Compliance + ML |

### Step 5 — Prove the ROI

- **Disparate Impact Ratio** — lowest group's selection rate ÷ highest's *(target: ≥ 0.8, ideally ≥ 0.85)*.
- **Group coverage** — % of protected groups actually tested *(target: 100%)*.
- **Human-override coverage** — % of adverse decisions with a human reviewer *(target: 100%)*.

> 💡 **Rule of thumb:** removing the protected attribute does **not** remove the bias — models learn proxies. Measure outcomes by group, or you're flying blind.

---

## Regulatory Mapping

| Requirement | Regulation | Implementation |
|-------------|-----------|----------------|
| Non-discrimination in employment AI | EU AI Act Annex III Sec. 4 | Mandatory human oversight of all hire/pass decisions |
| Adverse impact testing | EEOC Uniform Guidelines | Monthly DIR calculation + 4/5ths rule check |
| Human oversight | EU AI Act Art. 14 | HR reviewer required for all decisions |
| Technical documentation | EU AI Act Art. 11 | Bias incident report + ongoing monitoring plan |
| MEASURE 2.5 — Bias evaluation | NIST AI RMF | Quarterly fairness audit cycle |

---

<details>
<summary>💡 Hints</summary>

1. **The 4/5ths rule is a floor, not a ceiling**: EEOC's 0.8 threshold is the legal minimum. Aim for 0.9+ in practice — 0.8 is still evidence of significant disparity that plaintiffs' attorneys will notice.
2. **Don't remove demographic features — add them**: Counterintuitively, making the model "blind" to demographics often worsens disparate impact because proxy features still encode the information. A better approach: explicitly test on demographic groups and apply post-processing.
3. **EU AI Act doesn't say "don't use AI for hiring"**: It says use it with appropriate oversight. The HR pipeline that requires a human to confirm every AI recommendation is the compliant architecture.
4. **Document everything**: The legal risk isn't just from the disparity — it's from not having documentation showing you discovered, investigated, and mitigated it. Good documentation can turn a lawsuit into a settlement.

</details>

---

## Knowledge Check

1. What is the EEOC's "4/5ths rule" and what DIR threshold triggers concern?
2. Why does removing demographic features from training data often fail to eliminate disparate impact?
3. Under EU AI Act Annex III, what human oversight requirement applies to employment-related AI?
4. What is the difference between disparate treatment and disparate impact?

---

## Cleanup

```bash
# Delete any candidate PII from local files
Remove-Item screening_decisions.csv -ErrorAction SilentlyContinue
```
