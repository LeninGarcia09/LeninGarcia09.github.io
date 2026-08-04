---
sidebar_position: 99
title: Hoja de referencia de CLI y SDK
---

# Azure AI Foundry — Hoja de referencia de CLI y SDK

## Azure CLI — Comandos de Foundry

```bash
# Create Foundry account (Standard mode)
az ai foundry account create \
  --name myFoundryAccount \
  --resource-group myRG \
  --location eastus2 \
  --sku Standard

# Create project
az ai foundry project create \
  --account-name myFoundryAccount \
  --name myProject \
  --resource-group myRG

# List agents
az ai agent list --project-name myProject

# Deploy a model
az cognitiveservices account deployment create \
  --name myFoundryAccount \
  --resource-group myRG \
  --deployment-name gpt-4o \
  --model-name gpt-4o \
  --model-version "2024-11-20" \
  --model-format OpenAI \
  --sku-capacity 100 \
  --sku-name GlobalStandard
```

## Python SDK — Operaciones de agentes

```python
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import (
    Agent, AgentThread, ThreadMessage, ThreadRun, RunStatus
)
from azure.identity import DefaultAzureCredential

client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential()
)

# Create agent
agent = client.agents.create_agent(
    model="gpt-4o",
    name="my-agent",
    instructions="You are a helpful assistant.",
    tools=[{"type": "file_search"}],
)

# Create thread and run
thread = client.agents.threads.create()
client.agents.messages.create(thread_id=thread.id, role="user", content="Hello!")
run = client.agents.runs.create_and_process(thread_id=thread.id, agent_id=agent.id)

# Get response
messages = client.agents.messages.list(thread_id=thread.id)
```

## Evaluation SDK — Referencia rápida

```python
from azure.ai.evaluation import evaluate, GroundednessEvaluator, ContentSafetyEvaluator
from azure.identity import DefaultAzureCredential

# Groundedness evaluation
groundedness = GroundednessEvaluator(
    model_config={"azure_endpoint": "...", "azure_deployment": "gpt-4o"},
    credential=DefaultAzureCredential()
)

result = evaluate(
    data="eval_dataset.jsonl",
    evaluators={"groundedness": groundedness},
    output_path="./eval_results.json"
)
```

## Endpoints importantes

| Recurso | Patrón de endpoint |
|----------|-----------------|
| Endpoint del proyecto | `https://<account>.services.ai.azure.com/api/projects/<project>` |
| Hosted Agent | `https://<account>.services.ai.azure.com/agents/v1.0/...` |
| Evaluación | Mismo endpoint del proyecto, ruta `/evaluations/` |
| Inferencia de modelo | `https://<account>.openai.azure.com/openai/deployments/<model>/...` |

## Versiones de API

| API | Estado | Notas |
|-----|--------|-------|
| Responses API (v2) | ✅ GA | Usar para todas las nuevas compilaciones |
| Assistants API (v1) | ⚠️ En desuso | Se retira en marzo de 2027 |
| Completions (legacy) | ⚠️ Legacy | Usar Chat Completions |
