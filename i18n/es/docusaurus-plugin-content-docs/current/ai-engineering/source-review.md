---
sidebar_position: 7
title: "Fuentes y Verificación"
---

# Cómo se utilizan las fuentes

**Fecha de revisión: 13 de octubre de 2026.** Sí, [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) informa el plan. Se revisaron [README](https://github.com/rohitg00/ai-engineering-from-scratch), [ROADMAP](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/ROADMAP.md) y [Career Practice](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md), además del contenido seleccionado abajo.

Es **revisión curricular/de contenido, no auditoría de todo el código**. No se copian lecciones a estas páginas. Las actividades son nuestra secuencia original de proyecto pequeño con enlaces de atribución.

## Qué se conserva y adapta

La referencia enfatiza implementación, pruebas, inspección de fallos y proyecto coherente. Conservamos esas prácticas y comparación por consulta del laboratorio. Acotamos su currículo amplio a tres niveles iniciales, enlazamos recursos junto a actividades, incluimos tiempo independiente/revisión y separamos profundidad opcional.

No usamos duraciones de fases como garantías. ROADMAP anuncia unas 332 horas; aquí usamos presupuestos propios de 336/480 horas y criterios. Completar lección/proyecto no establece experiencia profesional.

## Contenido de referencia efectivamente inspeccionado

| Contenido | Uso seleccionado | Límite |
| --- | --- | --- |
| [Git and Collaboration](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/00-setup-and-tooling/02-git-and-collaboration/docs/en.md) | B11: versiones locales, ramas y exclusiones | No verifica cada lección de configuración |
| [Model evaluation](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/02-ml-fundamentals/09-model-evaluation/docs/en.md) | Referencia complementaria de divisiones, métricas y fuga | scikit-learn y curso principal guían actividades ML |
| [RAG](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/11-llm-engineering/06-rag/docs/en.md) | A15/A17, C25–26: carga, fragmentos, embeddings, almacenamiento, recuperación y generación | No se adoptan afirmaciones universales de costo/privacidad/superioridad; compara por tarea |
| [Retrieval Evaluation Lab](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/projects/retrieval-evaluation-lab) | A16/A18: rankings, precisión/recobrado, orden y comparación individual | Descripción/mapa inspeccionados; ejecutor/solución no ejecutados ni auditados |
| [Tool schema design](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/13-tools-and-protocols/05-tool-schema-design/docs/en.md) | A14/A19: descripciones/restricciones | Benchmarks no verificados independientemente |
| [Agent loop](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/01-the-agent-loop/docs/en.md) | A19: registro, observaciones y parada/presupuesto | Conceptos seleccionados, no toda cadena de prerrequisitos |
| [Failure modes](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/26-failure-modes-agentic/docs/en.md) | A20/entrega: cascadas, contexto y herramientas | No verifica cada artículo o afirmación industrial |
| [Secrets and audit](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/17-infrastructure-and-production/25-security-secrets-audit/docs/en.md) | Revisión contextual, no lectura semanal obligatoria | No adopta incidentes, patrones universales o umbrales como estándares verificados |
| [Career Practice](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md) | Proyecto único, requisitos, reproducción y feedback real | Sus rutas laborales no son obligatorias ni promesas de empleo |

Los enlaces siguen `main`, que cambia. Registra fecha/revisión usada en cada ejercicio.

## Educación y documentación primaria consultadas

| Fuente | Contenido y pertinencia |
| --- | --- |
| [CS50P](https://cs50.harvard.edu/python/) | Descripción, semanas 0–9 y requisitos del proyecto final; selecciones directas B |
| [CS50 SQL](https://cs50.harvard.edu/sql/) | Descripción y Querying/Relating/Designing para datos |
| [Especialización ML](https://www.coursera.org/specializations/machine-learning-introduction) | Tres cursos y temas supervisados/no supervisados; no tareas protegidas |
| [fast.ai](https://course.fast.ai/) | Descripción y páginas de lecciones 1–2: requisitos, entrenamiento/despliegue y grabaciones Part 1 2022 |
| [HF LLM](https://huggingface.co/learn/llm-course/en/chapter1/1) | Introducción/requisitos, Tokenizers, introducciones a entrenamiento y Datasets |
| [scikit-learn](https://scikit-learn.org/stable/common_pitfalls.html) | Fuga/errores frecuentes, validación cruzada y [calibración](https://scikit-learn.org/stable/modules/calibration.html) con explicaciones/ejemplos |
| [Bootstrap SciPy](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html) | Ejemplo sintético de remuestreo, variabilidad e intervalos para práctica estadística C |
| [PostgreSQL](https://www.postgresql.org/docs/current/tutorial.html) | Tutorial, transacciones y funciones de ventana |
| [pytest](https://docs.pytest.org/en/stable/getting-started.html), [uv](https://docs.astral.sh/uv/guides/projects/), [FastAPI](https://fastapi.tiangolo.com/tutorial/) | Pruebas, proyectos/entornos, primeros pasos API, entrada/salida, errores, seguridad y concurrencia |
| [Docker](https://docs.docker.com/get-started/tutorials/run-an-app/), [CI Python](https://docs.github.com/en/actions/tutorials/build-and-test-code/python) | Aplicación/contenedor/Compose y guía de compilación/pruebas |
| [pgvector](https://github.com/pgvector/pgvector), [MLflow](https://mlflow.org/docs/latest/ml/tracking/) | Búsqueda/persistencia/cambios y registro de experimentos/artefactos |
| [MLOps Zoomcamp](https://github.com/DataTalksClub/mlops-zoomcamp) | README/acceso y descripciones de módulos 2–6: experimentos, orquestación, despliegue, monitoreo y buenas prácticas |
| [LangGraph](https://docs.langchain.com/oss/python/langgraph/persistence), [MCP](https://modelcontextprotocol.io/docs/learn/architecture) | Persistencia/interrupts y arquitectura del protocolo para entrega opcional |
| [Registro de credenciales](./credentials) | AI-103/guía, AI-102 retirado, AWS ML Associate y Google ML oficiales; solo estado/alcance público |

## Límites de verificación {/* #verification-limits */}

- Se consultaron páginas públicas y contenido seleccionado; no demuestra que todo enlace interno, video, código o ejercicio funcione.
- URLs iniciales tipo `/python/0/` y `/sql/0/` devolvieron 404. El índice reveló rutas correctas **`/weeks/…/`**, consultadas para las selecciones. La extracción simplificada omitió la lista, por lo que se inspeccionó HTML.
- Docker redirigió URL antigua de workshop; usamos tutorial de aplicación consultado. MCP redirigió arquitectura a documentación versionada. Fija versiones de protocolo/SDK.
- No se realizó inscripción, pago, despliegue de nube ni reserva de examen. Tareas protegidas, precios/citas locales, acceso a evaluación y resultados siguen sin verificar.
- Disponibilidad/temas no constituyen ranking de “mejores” ni evidencia laboral. Preparación individual exige artefactos reales y revisión.

La mayoría de recursos externos está en inglés. Esta ruta española explica las mismas actividades, sin prometer traducción del proveedor ni disponibilidad de exámenes en español.

Revisa enlaces rotos cuando aparezcan, APIs sensibles a versiones antes de implementar y credenciales antes de pagar. Registra fuente/fecha del cambio, sin asumir vigencia de códigos anteriores.
