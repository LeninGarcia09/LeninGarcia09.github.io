---
sidebar_position: 2
title: Prerequisites & Setup
---

# Prerequisites & Lab Environment Setup

## Required Azure Resources

Before starting any challenge, ensure you have:

```bash
# Check Azure CLI version (needs 2.65+)
az version

# Login
az login

# Install the AI Projects extension
pip install azure-ai-projects==2.0.0b1 --upgrade
```

## Minimum Azure Permissions
- **Contributor** on the subscription (for Foundry account creation)
- **Cognitive Services OpenAI Contributor** (for model deployments)
- **User Access Administrator** (for Entra Agent ID role assignments)

## Standard Mode Resource Requirements
For enterprise challenges, you'll need:
- Azure Storage Account (ADLS Gen2)
- Azure Key Vault (Premium tier for HSM)
- Azure AI Search (Standard tier)
- Virtual Network with at least /24 address space

## Environment Setup

```python
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

# Initialize client
client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential()
)
```

:::note Execution Policy (Windows)
If running PowerShell scripts from this site on Windows, run:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
:::
