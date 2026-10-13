---
sidebar_position: 8
title: "Reality check: cuatro puestos sénior de EPAM"
---

# Cobertura técnica no equivale a preparación para un puesto sénior

**Veredicto:** A/B son fundamentos, no preparación suficiente para estas vacantes sénior. C es mejor punto técnico, pero le falta profundidad específica de aplicaciones/agentes y no establece experiencia profesional en IA. Agrega el [puente de entrega sénior](./senior-delivery-bridge) para profesionales experimentados, sin convertir años de trabajo en otro certificado.

**Auditoría: 13 de octubre de 2026.** Evaluamos currículos escritos A/B/C, no competencia individual. No se proporcionaron código, trayectoria, entrevistas ni evaluación de inglés. **La preparación individual es desconocida.** Cuatro vacantes de un empleador son una muestra objetivo, no un estudio representativo del mercado.

## Evidencia del empleador

Los extractos simplificados omitieron secciones. También inspeccionamos el `JobPosting` público embebido: responsabilidades, requisitos, preferencias, fechas y países. Los países son restricciones de ubicación del postulante remoto, no prueba de elegibilidad ni trabajo desde cualquier lugar.

| ID y fuente primaria | Publicación | Experiencia explícita | Requisitos/responsabilidades específicos | Países |
| --- | --- | --- | --- | --- |
| **E1:** [Senior AI Software Engineer](https://careers.epam.com/en/vacancy/senior-ai-software-engineer-blt90bfd6slamzuuw8j_en) | 9-oct-2026 | 3+ años de software; Python backend profundo; aplicaciones de producción GenAI/LLM/difusión demostradas | FastAPI asíncrono, AWS o GCP, generación imagen/video, harness Python, CI/CD, Docker y despliegue IaC | México |
| **E2:** [Senior Agentic AI Engineer](https://careers.epam.com/en/vacancy/senior-agentic-ai-engineer-bltjq2jggrlcnbcceut_en) | 9-oct-2026 | 3+ años de software de producción, **incluyendo 1+ año entregando agentes LLM a producción** | Python/framework; AgentCore Runtime/Memory/Identity/Gateway/Observability **o capacidad demostrada de aprender rápido**; MCP, contexto/memoria, evaluación, confiabilidad y límites de seguridad; inglés B2+ | México, Colombia, Chile, Brasil, Argentina |
| **E3:** [Senior Python AI Solution Engineer](https://careers.epam.com/en/vacancy/senior-python-ai-solution-engineer-bltht2rz6lq3rut6jqn_en) | 7-oct-2026 | 3+ años profesionales de software; trabajo significativo en IA/LLM de producción | Python 3.11/3.12+, frameworks, HF/embeddings/tokenizers, uv/venv/Poetry, Ruff/Pytest, ML/deep learning, búsqueda vectorial, FastAPI/Pydantic/Uvicorn, Docker/Kubernetes, PostgreSQL/Redis/Kafka; B2+ y colaboración técnica con clientes | Argentina, Brasil, Chile, Colombia, México |
| **E4:** [Senior/Lead AI Engineer](https://careers.epam.com/en/vacancy/senior-lead-ai-engineer-blt596z4ram1g96jzya_en) | 29-sep-2026 | **5+ años en ingeniería IA/ML con entregas de producción** | RAG/agentes, búsqueda híbrida/ranking, memoria avanzada, integración empresarial, métricas LLM/agentes y A/B, MLOps/seguridad, comunicación y liderazgo técnico; conocer MCP/A2A/ACP | Colombia, Argentina, Brasil, México |

Las cuatro describen entrega de producción. **Ninguna sección revisada de requisitos/preferencias nombra certificados de cursos ni certificaciones profesionales.** No demuestra que EPAM nunca los valore; estas vacantes no establecen ese requisito.

En E1 Terraform, Firefly, OpenCV/FFmpeg y experiencia de medios son **preferencias**; desplegar con IaC sigue siendo responsabilidad. E2 prefiere seguridad/red teaming y sandbox/browser. E3 prefiere TRL, DSPy, LiteLLM, MLflow/W&B y UI. El catálogo E4 **no exige dominar todos** los lenguajes, frameworks, bases vectoriales y nubes; sus requisitos dicen al menos un lenguaje/framework moderno.

## Cobertura original, antes de estas mejoras

**Presente:** enseñanza explícita con evidencia/puerta. **Parcial:** mención o evidencia adyacente sin la profundidad del puesto. **Brecha:** sin requisito/evidencia explícito. **Externo:** no lo establece completar el currículo. B hereda A tras sus fundamentos.

| Grupo | Fuente | A / B | C | Mejora |
| --- | --- | --- | --- | --- |
| Antigüedad y entrega IA de producción | E1-E4 | Externo | Externo | Registro de elegibilidad y experiencia real, sin sustituto académico |
| Python backend, async/concurrencia y contratos | E1/E3 | Parcial: API genérica | Parcial: entrada de software y serving genérico | Stack concreto A y pruebas async/cancelación/carga del puente |
| uv, Ruff, Pydantic y Uvicorn | E3 | Brecha más allá de pytest | Brecha en herramientas específicas | Toolchain explícito y conceptos equivalentes |
| ML/datos, HF, entrenamiento y tracking | E3/E4 | Fundamentos presentes; avanzado parcial | Fundamentos presentes; tracking específico parcial | Preservar C y agregar evidencia/MLflow |
| Búsqueda vectorial, híbrida y ranking | E3/E4 | Básico presente; infraestructura parcial | Híbrida/ranking presente; operación parcial | pgvector, aislamiento, actualizaciones y regresiones |
| Framework agentes, MCP, memoria durable | E2-E4 | Bucle parcial; MCP/persistencia faltantes | Brecha de runtime agentes | LangGraph/MCP; rama Strands/AgentCore y pruebas restart/memoria |
| Docker, nube, Kubernetes, IaC e infraestructura de datos | E1/E3 | Docker/nube presentes; otras brechas | Pipelines/MLOps genéricos; Kubernetes electivo | Núcleo de despliegue y rama E3 Kubernetes/Redis/Kafka |
| Difusión e imagen/video | E1 | Brecha, pospuesta a propósito | Brecha: visión no equivale a entrega difusión/video | Rama de medios, no requisito para todos |
| Evaluación, seguridad, observabilidad y costos | E1-E4 | Puertas básicas presentes; profundidad parcial | Operación ML presente; agentes/regresiones parcial | Runner versionado, carga/incidentes y diagnóstico |
| Clientes, integración y experimentación | E3/E4 | Comunicación parcial; sin liderazgo entregado | Diseño/entrevistas parcial | Integración, ADR, revisión y propuesta A/B |
| Inglés B2+ | E2/E3 | Brecha explícita | Brecha explícita | Práctica técnica y evaluación lingüística separada |

No conviertas cobertura en probabilidad de contratación. "Presente" describe intención curricular, no competencia demostrada. El puente mejora cobertura, pero no prepara automáticamente a una persona no evaluada.

## Preparación por puesto

| Objetivo | Solo A/B | Solo C | Siguiente paso para candidato experimentado |
| --- | --- | --- | --- |
| E1 medios/software | Fundamentos; faltan difusión, async y AWS/GCP | Adyacente ML/datos, no medios | Puente + rama medios + trayectoria verificada |
| E2 agentes | Dos semanas no equivalen a un año de agentes | Falta especialización runtime | Puente + AgentCore/Strands; resolver antigüedad de agentes |
| E3 soluciones Python | Falta stack empresarial | Punto general más cercano, incompleto | Puente + datos/integración Python y entrega con clientes |
| E4 sénior/lead | No ruta directa creíble | No crea 5+ años IA/ML | Experiencia IA/ML + puente + rama liderazgo |

No hay puntaje de entrevistas ni estimación de colocación justificados sin evaluar al candidato. Solo el empleador puede confirmar si una trayectoria concreta cumple sus requisitos.

## Cambios realizados

A concreta Python, uv/Ruff, FastAPI/Pydantic/Uvicorn, PostgreSQL, recuperación vectorial persistente, primera práctica framework/MCP e inglés técnico **sin cambiar su propósito de fundamentos**. B hereda mejoras. Horas siguen siendo estimaciones; extiende fases.

C mantiene ML/estadística/datos y agrega herramientas/tracking y acceso al puente, no se convierte en ruta solo de agentes.

El **puente de 24 semanas** propone 360 horas: 16 semanas comunes y una rama de 8. **No** es ruta inicial ni sustituto de experiencia. Salta módulos solo con evidencia reproducible, no por reconocer nombres.

Para estas vacantes, prioriza despliegue, diagnóstico, frameworks/datos y comunicación sobre exámenes. AWS es default práctico para E2; E1 acepta AWS/GCP. E3/E4 no justifican proveedor obligatorio. AI-103 sigue opcional para Azure, no credencial default de esta muestra.

## Puerta de experiencia y siguiente acción

Registro privado: fechas, rol, contexto profesional/proyecto, contribución exacta, producción vs sandbox, usuarios, releases, incidentes y material compartible legalmente. No expongas documentos de clientes ni cuentes meses superpuestos dos veces.

| Situación | Recomendación |
| --- | --- |
| Principiante/cambio de carrera | B/A, luego puesto junior/backend/integración apropiado y experiencia real |
| Ingeniero software sin IA de producción | C o fundamentos por brechas + puente; buscar ownership supervisado de IA |
| Ingeniero IA/ML experimentado | Auditar la vacante; resolver puertas fallidas y preparar casos verificables |
| Antigüedad insuficiente | Declararlo; consultar recruiter sobre experiencia adyacente o apuntar a otro nivel |

No hay calendario fijo para adquirir experiencia elegible. Demo, open source y voluntariado ayudan, pero no se rebautizan como empleo profesional o un año de agentes de producción.

[Investigación de recursos](./senior-resources). Reconfirma disponibilidad y ubicación; fecha de expiración embebida no garantiza vacante abierta.
