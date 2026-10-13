---
sidebar_position: 10
title: "Recursos de Aprendizaje Puntuales"
---

# Referencias para una pregunta concreta

Las actividades semanales A/B/C y de entrega ya indican qué abrir. Usa esta lista **para repasar o elegir profundidad opcional**, no como otro checklist.

**Contenido seleccionado consultado el 13 de octubre de 2026.** Son fuentes educativas, documentación del proveedor y currículo abierto complementario; disponibilidad no implica respaldo institucional, dominio o ranking.

| Pregunta | Recurso | Ejercicio útil |
| --- | --- | --- |
| ¿Puedo explicar/probar una función Python? | [CS50P Unit Tests](https://cs50.harvard.edu/python/weeks/5/), [pytest](https://docs.pytest.org/en/stable/getting-started.html) | Escribe prueba fallida, corrige función y explica assertion. |
| ¿Por qué un join duplica filas? | [CS50 SQL Relating](https://cs50.harvard.edu/sql/weeks/1/), [Designing](https://cs50.harvard.edu/sql/weeks/2/) | Inspecciona claves/cardinalidad, prueba restricción y corrige consulta. |
| ¿La validación filtra información? | [Errores scikit-learn](https://scikit-learn.org/stable/common_pitfalls.html), [validación cruzada](https://scikit-learn.org/stable/modules/cross_validation.html) | Divide antes de ajustar preprocesamiento; compara validación contaminada/limpia. |
| ¿Cómo se transforma texto en entrada? | [HF Tokenizers](https://huggingface.co/learn/llm-course/en/chapter2/4) | Compara tokens en dos idiomas y texto largo. |
| ¿Cómo entrenar con mis datos? | [HF Datasets](https://huggingface.co/learn/llm-course/en/chapter5/1), [fine-tuning](https://huggingface.co/learn/llm-course/en/chapter3/1) | Clasificación pequeña tras requisitos Python/aprendizaje profundo. |
| ¿Por qué empeoró una consulta? | [Retrieval Evaluation Lab](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/projects/retrieval-evaluation-lab) | Valida etiquetas/rankings e inspecciona cambio por consulta; generación necesita evaluación propia. |
| ¿Async acelera CPU? | [Concurrencia FastAPI](https://fastapi.tiangolo.com/async/) | Demuestra espera I/O frente a CPU; mide, no supongas. |
| ¿Cómo guardar vectores junto a relaciones? | [pgvector](https://github.com/pgvector/pgvector) | Inserta, busca, actualiza y elimina; compara exacto/aproximado antes de añadir índice. |
| ¿Cómo reproducir experimento? | [MLflow](https://mlflow.org/docs/latest/ml/tracking/), [módulo de experimentos](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/02-experiment-tracking) | Registra IDs datos/código/modelo, métricas y artefactos; repite comandos. |
| ¿Qué debe sobrevivir reinicio? | [Persistencia LangGraph](https://docs.langchain.com/oss/python/langgraph/persistence), [interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts) | Checkpoints duraderos, aislamiento y revisión; revisar no autoriza acciones. |
| ¿Qué aporta un protocolo de herramientas? | [Arquitectura MCP](https://modelcontextprotocol.io/docs/learn/architecture) | Explica host/cliente/servidor; valida herramienta local de solo lectura y fija versiones. |
| ¿Qué pasa tras entregar? | [Despliegue](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/04-deployment), [monitoreo](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/05-monitoring), [buenas prácticas](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/06-best-practices) | Monitorea entorno pequeño, provoca fallo y ensaya rollback/limpieza. |

## Profundidad opcional

Tras entrenamiento C, lecciones [fast.ai](https://course.fast.ai/) profundizan modelado; [curso HF](https://huggingface.co/learn/llm-course/en/chapter1/1) orienta a capítulos avanzados. Sigue requisitos y añade tiempo. Entrenamiento grande, múltiples frameworks, infraestructura distribuida y generación multimedia están fuera del núcleo.

## Lee tutoriales críticamente

La lección RAG de referencia incluye afirmaciones amplias de costo, privacidad y superioridad. Usamos explicación del pipeline, **no esas afirmaciones como hechos universales**: compara calidad/costo en tus datos y recuerda que prompts alojados pueden enviar pasajes recuperados. Sus requisitos previos son más amplios; lectura conceptual seleccionada no completa toda una fase.

MLOps/fast.ai pueden usar dependencias antiguas. Acompaña con APIs oficiales actuales, fija versiones y no expongas demos públicamente por defecto. Ejecutores del laboratorio tienen funciones dependientes de POSIX; elige entorno adecuado y registra pruebas reales.

Ver páginas públicas no valida cada bloque de código, video, ejecutor, dependencia o experiencia pagada/con sesión. Consulta [alcance de verificación](./source-review#verification-limits) y [credenciales](./credentials).
