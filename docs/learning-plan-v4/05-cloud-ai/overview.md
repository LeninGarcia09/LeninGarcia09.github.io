---
sidebar_position: 5
title: "Fase 5 — Cloud + AI Integración"
---

# Fase 5: Cloud + AI Integración (Semanas 22-26)

> **Objetivo:** Integrar conocimientos de cloud y AI en soluciones empresariales completas. Construir sistemas RAG, fortalecer evaluacion/observabilidad, y cerrar con ruta de certificacion vigente (AI-103 como referencia principal, AI-200 opcional).

## 🎯 Resultados Esperados

Al completar esta fase:
- Azure AI Foundry dominado (modelos, evaluaciones, agentes)
- RAG (Retrieval-Augmented Generation) implementado
- Evaluación y monitoreo de AI en producción
- Ruta de certificacion AI vigente alineada a objetivos de entrevista
- Sistema RAG funcional en portfolio

---

## Semanas 21-22: Azure AI Foundry

### Objetivo
Dominar la plataforma de AI de Microsoft para construir y desplegar soluciones empresariales.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [Azure AI Foundry Documentation](https://learn.microsoft.com/es-es/azure/ai-foundry/) | 🇪🇸 Español | Docs | 8 hrs |
| [Microsoft Learn: Azure AI Foundry](https://learn.microsoft.com/es-es/training/browse/?products=azure-ai-foundry) | 🇪🇸 Español | Learning Path | 6 hrs |
| [Azure AI Foundry Quickstarts](https://learn.microsoft.com/es-es/azure/ai-foundry/quickstarts/) | 🇪🇸 Español | Labs | 4 hrs |
| [Azure OpenAI Service](https://learn.microsoft.com/es-es/azure/ai-services/openai/) | 🇪🇸 Español | Docs | 4 hrs |
| [DeepLearning.AI: Building with Azure AI](https://www.deeplearning.ai/) | 🇬🇧 Inglés | Course | 3 hrs |

### Plan Semana 21

| Día | Tema | Práctica |
|-----|------|----------|
| Lunes | Azure AI Foundry: overview, projects, hubs | Crear proyecto |
| Martes | Modelos disponibles: GPT-4, GPT-4o, Phi | Comparar modelos |
| Miércoles | Playground: prompt testing y refinement | Experimentar |
| Jueves | Deployments: quotas, rate limits, regions | Deploy modelo |
| Viernes | Content filters y safety settings | Configurar safety |

### Plan Semana 22

| Día | Tema | Práctica |
|-----|------|----------|
| Lunes | Azure AI Agents: overview y tipos | Explorar Agent Service |
| Martes | Agents con tools: code interpreter, file search | Build agent |
| Miércoles | Evaluations: built-in y custom metrics | Evaluar respuestas |
| Jueves | Prompt flow: flujos de orquestación | Diseñar flow |
| Viernes | Monitoring y logging en producción | Dashboard de métricas |

### Conceptos Clave

```
Azure AI Foundry:
├── Hub (organización)
│   └── Project (workspace)
│       ├── Models
│       │   ├── Azure OpenAI (GPT-4, GPT-4o)
│       │   ├── Open models (Phi, Llama, Mistral)
│       │   └── Custom fine-tuned
│       ├── Agents
│       │   ├── Code Interpreter
│       │   ├── File Search
│       │   └── Custom Tools
│       ├── Evaluations
│       │   ├── Groundedness
│       │   ├── Relevance
│       │   ├── Coherence
│       │   └── Custom metrics
│       └── Deployments
│           ├── Serverless
│           └── Provisioned
```

---

## Semanas 23-24: RAG (Retrieval-Augmented Generation)

### Objetivo
Construir un sistema que responde preguntas basándose en documentos internos, eliminando hallucinations.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [Microsoft Learn: RAG with Azure AI](https://learn.microsoft.com/es-es/azure/ai-foundry/concepts/retrieval-augmented-generation) | 🇪🇸 Español | Docs | 3 hrs |
| [DeepLearning.AI: Building RAG Applications](https://www.deeplearning.ai/short-courses/) | 🇬🇧 Inglés | Course | 3 hrs |
| [LangChain RAG Tutorial](https://python.langchain.com/docs/tutorials/rag/) | 🇬🇧 Inglés | Tutorial | 4 hrs |
| [Azure AI Search Documentation](https://learn.microsoft.com/es-es/azure/search/) | 🇪🇸 Español | Docs | 4 hrs |
| [Pinecone: RAG Guide](https://www.pinecone.io/learn/retrieval-augmented-generation/) | 🇬🇧 Inglés | Guide | 2 hrs |

### Plan Semana 23

| Día | Tema | Práctica |
|-----|------|----------|
| Lunes | RAG concepts: why, how, architecture | Diagramar sistema |
| Martes | Embeddings: text → vectors | Generar embeddings |
| Miércoles | Vector stores: Azure AI Search, Pinecone | Setup vector store |
| Jueves | Chunking strategies: size, overlap | Procesar documentos |
| Viernes | Retrieval: similarity search, hybrid | Implementar búsqueda |

### Plan Semana 24

| Día | Tema | Práctica |
|-----|------|----------|
| Lunes | Generation: prompt con contexto | System prompts para RAG |
| Martes | Evaluation: groundedness, relevance | Medir calidad |
| Miércoles | Advanced: reranking, metadata filters | Mejorar precisión |
| Jueves | Production: caching, monitoring | Optimizar |
| Viernes | **Deploy proyecto completo** | — |

### 🔨 Proyecto: Internal Policy Chatbot

Chatbot que responde preguntas sobre políticas internas de una organización:

```
Policy Chatbot Architecture:
├── Document Ingestion
│   ├── PDF/Word processing
│   ├── Chunking (500 tokens, 50 overlap)
│   └── Embedding generation
├── Vector Store
│   ├── Azure AI Search / ChromaDB
│   └── Metadata indexing
├── Retrieval
│   ├── Similarity search (top-k)
│   ├── Hybrid search (vector + keyword)
│   └── Reranking
├── Generation
│   ├── System prompt (compliance expert)
│   ├── Context injection
│   └── Source citations
└── Interface
    ├── Streamlit UI
    └── API endpoint
```

**Documentos de ejemplo:**
- Política de seguridad de información
- Política de uso aceptable
- Plan de respuesta a incidentes
- Política de privacidad de datos

**Entregable:** Repositorio completo con código, documentación, y demo.

---

## Semanas 25-26: AI Monitoring y Safety

### Objetivo
Aprender a monitorear sistemas AI en producción y detectar problemas antes que impacten usuarios.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [Microsoft: AI Content Safety](https://learn.microsoft.com/es-es/azure/ai-services/content-safety/) | 🇪🇸 Español | Docs | 3 hrs |
| [Azure AI Evaluation SDK](https://learn.microsoft.com/es-es/azure/ai-foundry/how-to/develop/evaluate-sdk) | 🇪🇸 Español | Tutorial | 4 hrs |
| [Giskard: AI Testing](https://www.giskard.ai/) | 🇬🇧 Inglés | Tool | 3 hrs |
| [OWASP Top 10 for LLMs](https://owasp.org/www-project-top-10-for-large-language-model-applications/) | 🇬🇧 Inglés | Framework | 4 hrs |
| [Microsoft: Red Teaming AI](https://learn.microsoft.com/es-es/azure/ai-services/openai/concepts/red-teaming) | 🇪🇸 Español | Guide | 2 hrs |

### Plan Semana 25

| Día | Tema | Práctica |
|-----|------|----------|
| Lunes | Hallucinations: causas y detección | Evaluar modelos |
| Martes | Content safety: filtros y moderación | Implementar filtros |
| Miércoles | Prompt injection: ataques y defensas | Red team ejercicio |
| Jueves | Data leakage: prevención | PII detection |
| Viernes | OWASP Top 10 for LLMs | Assessment |

### Plan Semana 26

| Día | Tema | Práctica |
|-----|------|----------|
| Lunes | Evaluation metrics: groundedness, coherence | SDK de evaluación |
| Martes | A/B testing de prompts y modelos | Framework de testing |
| Miércoles | Monitoring dashboards | Azure Monitor + AI |
| Jueves | Alerting y incident response para AI | Playbooks |
| Viernes | AI Red Team exercise completo | Documentar findings |

### 🔨 Proyecto: AI Safety Testing Framework

Crear un framework de testing que incluya:
1. Test cases para prompt injection
2. Evaluation de groundedness (hallucinaciones)
3. PII detection checks
4. Content safety validation
5. Performance benchmarks
6. Reporting template

---

## Semanas 27-28: Certificaciones AI vigentes (AI-103 / AI-200 opcional)

### Objetivo
Consolidar conocimiento para cerrar brechas de certificacion segun rol objetivo, usando el portfolio actual de examenes.

### Recursos para AI-103

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [AI-103 Certification Page](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/) | 🇬🇧 Inglés | Referencia oficial | 1 hr |
| [AI-103 Study Guide](https://aka.ms/AI103-StudyGuide) | 🇬🇧 Inglés | Guía oficial | Referencia |
| [Agent Framework: Your First Agent](https://learn.microsoft.com/en-us/agent-framework/get-started/your-first-agent) | 🇬🇧 Inglés | Lab guiado | 1-2 hrs |
| [Azure AI Foundry Learning Paths](https://learn.microsoft.com/en-us/training/browse/?products=azure&terms=foundry) | 🇬🇧 Inglés | Learning paths | 4-6 hrs |

### Plan Semana 27 (AI-103)

| Día | Módulo | Tema |
|-----|--------|------|
| Lunes | Dominio 1 | Plan and manage Azure AI solutions |
| Martes | Dominio 2 | Implement generative AI and agentic solutions |
| Miércoles | Dominio 3 | Implement computer vision solutions |
| Jueves | Dominio 4 | Implement text analysis solutions |
| Viernes | Dominio 5 | Implement information extraction solutions |

### Plan Semana 28 (cierre y opcion AI-200)

| Día | Actividad |
|-----|-----------|
| Lunes | Repaso general + matriz de gaps |
| Martes | Simulacion por objetivos (sin depender de practice assessment oficial) |
| Miércoles | Repaso áreas débiles |
| Jueves | Sandbox + rehearsal final |
| Viernes | **Examen AI-103** |
| Sábado | Decidir AI-200 segun loops activos |

### Certificación: AI-103

- **Costo:** Precio por region (Pearson Vue)
- **Idioma:** Ingles (validar disponibilidad vigente)
- **Formato:** Evaluacion proctored, 120 minutos
- **Puntuación para pasar:** 700/1000
- **Dominios evaluados:**
  - Plan and manage an Azure AI solution
  - Implement generative AI and agentic solutions
  - Implement computer vision solutions
  - Implement text analysis solutions
  - Implement information extraction solutions

### Opcional: AI-200 (si hay necesidad real de señal adicional)

Para candidatos avanzados, AI-200 agrega valor en loops orientados a desarrollo cloud nativo:
- Enfasis en soluciones containerizadas, servicios de datos y observabilidad
- Complementa AI-103 con foco de implementacion back-end
- No reemplaza experiencia demostrable: priorizar portfolio y articulacion tecnica

---

## 📋 Checklist de Fase 5

- [ ] Azure AI Foundry: modelos, agents, evaluations
- [ ] RAG: sistema completo implementado
- [ ] Policy Chatbot: funcional y documentado
- [ ] AI Safety: OWASP LLM Top 10 entendido
- [ ] Red teaming: ejercicio completado
- [ ] AI Safety Testing Framework: creado
- [ ] AI-103 Study Guide: completada por dominio
- [ ] **Certificación AI-103: completada**
- [ ] AI-200 decision gate ejecutado (si/no con razon)
- [ ] Portfolio: 10+ proyectos en GitHub

## Operacion v4

- [Checkpoint Gates v4](../checkpoints)
- [Template de Evidencia v4](../evidence-template)
- [Weekly Tracker v4](../weekly-tracker)

## 🔗 Valor para el CV

Después de esta fase:
> "Implemente sistemas RAG empresariales con Azure AI Foundry, incluyendo ingest, retrieval y evaluacion reproducible. Disene frameworks de AI safety testing para prompt injection y data leakage, y complete la ruta de certificacion vigente para soluciones AI y agentes en Azure."

## ⏭️ Siguiente Fase

[Fase 6: Lanzamiento de Carrera →](../career-launch/overview)
