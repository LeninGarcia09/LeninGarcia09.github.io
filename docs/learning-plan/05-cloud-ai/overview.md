---
sidebar_position: 5
title: "Phase 5 — Cloud + AI Integration"
---

# Phase 5: Cloud + AI Integration (Weeks 21–28)

> **Objective:** Integrate cloud and AI knowledge into complete enterprise solutions. Build RAG systems, learn model evaluation, and earn AI-900 certification (with optional advanced AI-103 path).

## 🎯 Expected Outcomes

By completing this phase:
- Azure AI Foundry mastered (models, evaluations, agents)
- RAG (Retrieval-Augmented Generation) implemented
- AI evaluation and monitoring in production
- AI-900 certification earned
- Functional RAG system in portfolio

---

## Weeks 21-22: Azure AI Foundry

### Objective
Master Microsoft's AI platform for building and deploying enterprise solutions.

### Main Resources

| Resource | Language | Type | Duration |
|---------|--------|------|----------|
| [Azure AI Foundry Documentation](https://learn.microsoft.com/es-es/azure/ai-foundry/) | 🇪🇸 Spanish | Docs | 8 hrs |
| [Microsoft Learn: Azure AI Foundry (What is it?)](https://learn.microsoft.com/es-es/azure/ai-foundry/what-is-azure-ai-foundry) | 🇪🇸 Spanish | Docs | 6 hrs |
| [Azure AI Foundry Quickstarts](https://learn.microsoft.com/es-es/azure/ai-foundry/quickstarts/get-started-code) | 🇪🇸 Spanish | Labs | 4 hrs |
| [Azure OpenAI Service](https://learn.microsoft.com/es-es/azure/ai-services/openai/) | 🇪🇸 Spanish | Docs | 4 hrs |
| [DeepLearning.AI: Building with Azure AI](https://www.deeplearning.ai/) | 🇬🇧 English | Course | 3 hrs |

### Week 21 Plan

| Day | Topic | Practice |
|-----|------|----------|
| Monday | Azure AI Foundry: overview, projects, hubs | Create project |
| Tuesday | Available models: GPT-4, GPT-4o, Phi | Compare models |
| Wednesday | Playground: prompt testing and refinement | Experiment |
| Thursday | Deployments: quotas, rate limits, regions | Deploy model |
| Friday | Content filters and safety settings | Configure safety |

### Week 22 Plan

| Day | Topic | Practice |
|-----|------|----------|
| Monday | Azure AI Agents: overview and types | Explore Agent Service |
| Tuesday | Agents with tools: code interpreter, file search | Build agent |
| Wednesday | Evaluations: built-in and custom metrics | Evaluate responses |
| Thursday | Prompt flow: orchestration flows | Design flow |
| Friday | Monitoring and logging in production | Metrics dashboard |

### Key Concepts

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

## Weeks 23-24: RAG (Retrieval-Augmented Generation)

### Objective
Build a system that answers questions based on internal documents, eliminating hallucinations.

### Main Resources

| Resource | Language | Type | Duration |
|---------|--------|------|----------|
| [Microsoft Learn: RAG with Azure AI](https://learn.microsoft.com/es-es/azure/ai-foundry/concepts/retrieval-augmented-generation) | 🇪🇸 Spanish | Docs | 3 hrs |
| [DeepLearning.AI: Building RAG Applications](https://www.deeplearning.ai/short-courses/) | 🇬🇧 English | Course | 3 hrs |
| [LangChain RAG Tutorial](https://python.langchain.com/docs/tutorials/rag/) | 🇬🇧 English | Tutorial | 4 hrs |
| [Azure AI Search Documentation](https://learn.microsoft.com/es-es/azure/search/) | 🇪🇸 Spanish | Docs | 4 hrs |
| [Pinecone: RAG Guide](https://www.pinecone.io/learn/retrieval-augmented-generation/) | 🇬🇧 English | Guide | 2 hrs |

### Week 23 Plan

| Day | Topic | Practice |
|-----|------|----------|
| Monday | RAG concepts: why, how, architecture | Diagram system |
| Tuesday | Embeddings: text → vectors | Generate embeddings |
| Wednesday | Vector stores: Azure AI Search, Pinecone | Setup vector store |
| Thursday | Chunking strategies: size, overlap | Process documents |
| Friday | Retrieval: similarity search, hybrid | Implement search |

### Week 24 Plan

| Day | Topic | Practice |
|-----|------|----------|
| Monday | Generation: prompt with context | System prompts for RAG |
| Tuesday | Evaluation: groundedness, relevance | Measure quality |
| Wednesday | Advanced: reranking, metadata filters | Improve precision |
| Thursday | Production: caching, monitoring | Optimize |
| Friday | **Deploy complete project** | — |

### 🔨 Project: Internal Policy Chatbot

Chatbot that answers questions about an organization's internal policies:

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

**Example documents:**
- Information security policy
- Acceptable use policy
- Incident response plan
- Data privacy policy

**Deliverable:** Complete repository with code, documentation, and demo.

---

## Weeks 25-26: AI Monitoring and Safety

### Objective
Learn to monitor AI systems in production and detect issues before they impact users.

### Main Resources

| Resource | Language | Type | Duration |
|---------|--------|------|----------|
| [Microsoft: AI Content Safety](https://learn.microsoft.com/es-es/azure/ai-services/content-safety/) | 🇪🇸 Spanish | Docs | 3 hrs |
| [Azure AI Evaluation SDK](https://learn.microsoft.com/es-es/azure/ai-foundry/how-to/develop/evaluate-sdk) | 🇪🇸 Spanish | Tutorial | 4 hrs |
| [Giskard: AI Testing](https://www.giskard.ai/) | 🇬🇧 English | Tool | 3 hrs |
| [OWASP Top 10 for LLMs](https://owasp.org/www-project-top-10-for-large-language-model-applications/) | 🇬🇧 English | Framework | 4 hrs |
| [Microsoft: Red Teaming AI](https://learn.microsoft.com/es-es/azure/ai-services/openai/concepts/red-teaming) | 🇪🇸 Spanish | Guide | 2 hrs |

### Week 25 Plan

| Day | Topic | Practice |
|-----|------|----------|
| Monday | Hallucinations: causes and detection | Evaluate models |
| Tuesday | Content safety: filters and moderation | Implement filters |
| Wednesday | Prompt injection: attacks and defenses | Red team exercise |
| Thursday | Data leakage: prevention | PII detection |
| Friday | OWASP Top 10 for LLMs | Assessment |

### Week 26 Plan

| Day | Topic | Practice |
|-----|------|----------|
| Monday | Evaluation metrics: groundedness, coherence | Evaluation SDK |
| Tuesday | A/B testing prompts and models | Testing framework |
| Wednesday | Monitoring dashboards | Azure Monitor + AI |
| Thursday | Alerting and incident response for AI | Playbooks |
| Friday | Complete AI Red Team exercise | Document findings |

### 🔨 Project: AI Safety Testing Framework

Create a testing framework that includes:
1. Test cases for prompt injection
2. Groundedness evaluation (hallucinations)
3. PII detection checks
4. Content safety validation
5. Performance benchmarks
6. Reporting template

---

## Weeks 27-28: AI-900 Certification (+ Optional AI-103)

### Objective
Consolidate knowledge and earn AI-900 certification.

### AI-900 Resources

| Resource | Language | Type | Duration |
|---------|--------|------|----------|
| [Microsoft Learn: AI-900](https://learn.microsoft.com/es-es/training/paths/get-started-with-artificial-intelligence-on-azure/) | 🇪🇸 Spanish | Learning Path | 8 hrs |
| [AI-900 Study Guide](https://learn.microsoft.com/es-es/credentials/certifications/azure-ai-fundamentals/) | 🇪🇸 Spanish | Official guide | Reference |
| [John Savill's Technical Training (YouTube)](https://www.youtube.com/@NTFAQGuy) | 🇬🇧 English | Video (study cram) | 2 hrs |
| [Official AI-900 Practice Assessment (free)](https://learn.microsoft.com/es-es/credentials/certifications/azure-ai-fundamentals/practice/assessment?assessmentId=26) | 🇪🇸 Spanish | Free official practice | 2 hrs |

### Week 27 Plan

| Day | Module | Topic |
|-----|--------|------|
| Monday | Module 1 | AI workloads and considerations |
| Tuesday | Module 2 | Machine Learning fundamentals |
| Wednesday | Module 3 | Computer Vision |
| Thursday | Module 4 | NLP and Document Intelligence |
| Friday | Module 5 | Generative AI |

### Week 28 Plan

| Day | Activity |
|-----|-----------|
| Monday | General review + gaps |
| Tuesday | Practice exams |
| Wednesday | Review weak areas |
| Thursday | Final practice exam |
| Friday | **AI-900 exam** |
| Saturday | If passed: plan next credential (AI-103 or vendor-neutral) |

### Certification: AI-900

- **Cost:** $99 USD
- **Language:** Available in Spanish
- **Format:** 40-60 questions, 45 minutes
- **Passing score:** 700/1000
- **Domains:**
  - AI workloads and considerations (15-20%)
  - Machine Learning on Azure (20-25%)
  - Computer Vision workloads (15-20%)
  - NLP workloads (15-20%)
  - Generative AI workloads (15-20%)

### Optional: AI-103 (if there is time and motivation)

For advanced candidates with a **development** objective, AI-103 adds value:
- Associate level (more weight than Fundamentals)
- **Successor to AI-102** (retired Jun 30, 2026); covers generative AI apps and multi-agent solutions with Microsoft Foundry (Python)
- Verify price, status (beta/GA), and syllabus on the [official AI-103 page](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/)
- Requires 4-6 additional weeks of preparation

:::tip[Governance/program instead of development? Consider vendor-neutral]
If your target is **AI Program Manager / AI Governance / TPM** (not writing production code), a **vendor-neutral** credential such as **IAPP AIGP** or **PMI-CPMAI** (exam in Spanish) often provides more return than AI-103. See the full ladder in [Plan Overview](../overview#-certifications--vendor-neutral-ladder-free-first).
:::

:::note[Stack portability]
The patterns in this phase (RAG, evaluation, agents, safety) **do not depend on one vendor**. Everything you build in Azure AI Foundry can be replicated with **LangChain / LlamaIndex**, open models (**Llama, Mistral, Phi**), and open vector stores (**ChromaDB, pgvector, FAISS**). Use Azure as *one* example, but document your project in a vendor-agnostic way so it applies to employers using AWS, GCP, or open-source stacks.
:::

---

## 📋 Phase 5 Checklist

- [ ] Azure AI Foundry: models, agents, evaluations
- [ ] RAG: complete system implemented
- [ ] Policy Chatbot: functional and documented
- [ ] AI Safety: OWASP LLM Top 10 understood
- [ ] Red teaming: exercise completed
- [ ] AI Safety Testing Framework: created
- [ ] AI-900 Learning Path: completed
- [ ] **AI-900 certification: earned**
- [ ] Portfolio: 10+ projects in GitHub

## 🔗 Resume Value

After this phase:
> "I implemented enterprise RAG systems with Azure AI Foundry, including document ingestion, vector search, and generation with source citations. I designed AI safety testing frameworks that evaluate hallucinations, prompt injection, and data leakage. Certifications: AZ-900, SC-900, AI-900."

## ⏭️ Next Phase

[Phase 6: Career Launch →](../career-launch/overview)
