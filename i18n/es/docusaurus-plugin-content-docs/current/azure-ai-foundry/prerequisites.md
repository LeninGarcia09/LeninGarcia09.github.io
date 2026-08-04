---
sidebar_position: 2
title: Prerrequisitos y configuración
---

# Prerrequisitos y configuración del entorno de laboratorio

## Recursos de Azure requeridos

Antes de iniciar cualquier desafío, asegúrate de tener:

```bash
# Check Azure CLI version (needs 2.65+)
az version

# Login
az login

# Install the AI Projects extension
pip install azure-ai-projects==2.0.0b1 --upgrade
```

## Permisos mínimos de Azure
- **Contributor** en la suscripción (para crear la cuenta de Foundry)
- **Cognitive Services OpenAI Contributor** (para implementaciones de modelos)
- **User Access Administrator** (para asignaciones de roles de Entra Agent ID)

## Requisitos de recursos en modo Standard
Para desafíos empresariales, necesitarás:
- Azure Storage Account (ADLS Gen2)
- Azure Key Vault (nivel Premium para HSM)
- Azure AI Search (nivel Standard)
- Virtual Network con al menos un espacio de direcciones /24

## Configuración del entorno

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

:::note[Directiva de ejecución (Windows)]
Si ejecutas scripts de PowerShell desde este sitio en Windows, ejecuta:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
:::
