---
sidebar_position: 5
title: "Fase 5 — Cloud + AI Integración"
---

# Fase 5: Cloud + AI Integración (Semanas 21–28)

> **Objetivo:** Integrar conocimientos de cloud y AI en soluciones empresariales completas. Construir sistemas RAG, aprender evaluación de modelos, y obtener certificación AI-900 (con opción de AI-102).

## 🎯 Resultados Esperados

Al completar esta fase:
- Azure AI Foundry dominado (modelos, evaluaciones, agentes)
- RAG (Retrieval-Augmented Generation) implementado
- Evaluación y monitoreo de AI en producción
- Certificación AI-900 obtenida
- Sistema RAG funcional en portfolio

---

## Semanas 21-22: Azure AI Foundry

### Objetivo
Dominar la plataforma de AI de Microsoft para construir y desplegar soluciones empresariales.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [Azure AI Foundry Documentation](https://learn.microsoft.com/es-es/azure/ai-foundry/) | 🇪🇸 Español | Docs | 8 hrs |
| [Microsoft Learn: Azure AI Foundry (¿Qué es?)](https://learn.microsoft.com/es-es/azure/ai-foundry/what-is-azure-ai-foundry) | 🇪🇸 Español | Docs | 6 hrs |
| [Azure AI Foundry Quickstarts](https://learn.microsoft.com/es-es/azure/ai-foundry/quickstarts/get-started-code) | 🇪🇸 Español | Labs | 4 hrs |
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

## Semanas 27-28: Certificación AI-900 (+ Opcional AI-102)

### Objetivo
Consolidar conocimiento y obtener certificación AI-900.

### Recursos para AI-900

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [Microsoft Learn: AI-900](https://learn.microsoft.com/es-es/training/paths/get-started-with-artificial-intelligence-on-azure/) | 🇪🇸 Español | Learning Path | 8 hrs |
| [AI-900 Study Guide](https://learn.microsoft.com/es-es/credentials/certifications/azure-ai-fundamentals/) | 🇪🇸 Español | Guía oficial | Referencia |
| [John Savill's Technical Training (YouTube)](https://www.youtube.com/@NTFAQGuy) | 🇬🇧 Inglés | Video (study cram) | 2 hrs |
| [Practice Assessment oficial de AI-900 (gratis)](https://learn.microsoft.com/es-es/credentials/certifications/azure-ai-fundamentals/practice/assessment?assessmentId=26) | 🇪🇸 Español | Práctica oficial gratis | 2 hrs |

### Plan Semana 27

| Día | Módulo | Tema |
|-----|--------|------|
| Lunes | Módulo 1 | AI workloads y consideraciones |
| Martes | Módulo 2 | Machine Learning fundamentals |
| Miércoles | Módulo 3 | Computer Vision |
| Jueves | Módulo 4 | NLP y Document Intelligence |
| Viernes | Módulo 5 | Generative AI |

### Plan Semana 28

| Día | Actividad |
|-----|-----------|
| Lunes | Repaso general + gaps |
| Martes | Practice exams |
| Miércoles | Repaso áreas débiles |
| Jueves | Practice exam final |
| Viernes | **Examen AI-900** |
| Sábado | Si pasó: planear AI-102 |

### Certificación: AI-900

- **Costo:** $99 USD
- **Idioma:** Disponible en español
- **Formato:** 40-60 preguntas, 45 minutos
- **Puntuación para pasar:** 700/1000
- **Dominios:**
  - AI workloads and considerations (15-20%)
  - Machine Learning on Azure (20-25%)
  - Computer Vision workloads (15-20%)
  - NLP workloads (15-20%)
  - Generative AI workloads (15-20%)

### Opcional: AI-102 (si hay tiempo y motivación)

Para candidatos avanzados, AI-102 agrega valor significativo:
- Nivel Associate (más peso que Fundamentals)
- Incluye agentic AI y generative AI
- $165 USD, disponible en español
- Requiere 4-6 semanas adicionales de preparación

---

## 📋 Checklist de Fase 5

- [ ] Azure AI Foundry: modelos, agents, evaluations
- [ ] RAG: sistema completo implementado
- [ ] Policy Chatbot: funcional y documentado
- [ ] AI Safety: OWASP LLM Top 10 entendido
- [ ] Red teaming: ejercicio completado
- [ ] AI Safety Testing Framework: creado
- [ ] AI-900 Learning Path: completado
- [ ] **Certificación AI-900: obtenida**
- [ ] Portfolio: 10+ proyectos en GitHub

## 🔗 Valor para el CV

Después de esta fase:
> "Implementé sistemas RAG empresariales con Azure AI Foundry, incluyendo document ingestion, vector search y generation con source citations. Diseñé frameworks de AI safety testing que evalúan hallucinations, prompt injection y data leakage. Certificaciones: AZ-900, SC-900, AI-900."

## ⏭️ Siguiente Fase

[Fase 6: Lanzamiento de Carrera →](../career-launch/overview)
