---
sidebar_position: 99
title: CLI & SDK Cheat Sheet
---

# Azure AI Foundry — CLI & SDK Cheat Sheet

## Azure CLI — Foundry Commands

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

## Python SDK — Agent Operations

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

## Evaluation SDK — Quick Reference

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

## Important Endpoints

| Resource | Endpoint Pattern |
|----------|-----------------|
| Project endpoint | `https://<account>.services.ai.azure.com/api/projects/<project>` |
| Hosted Agent | `https://<account>.services.ai.azure.com/agents/v1.0/...` |
| Evaluation | Same project endpoint, `/evaluations/` path |
| Model inference | `https://<account>.openai.azure.com/openai/deployments/<model>/...` |

## API Versions

| API | Status | Notes |
|-----|--------|-------|
| Responses API (v2) | ✅ GA | Use for all new builds |
| Assistants API (v1) | ⚠️ Deprecated | Retires March 2027 |
| Completions (legacy) | ⚠️ Legacy | Use Chat Completions |
