---
sidebar_position: 2
title: "A: Construcción de Aplicaciones de IA"
---

# A: de Python básico a una aplicación de IA explicable

**Objetivo:** construir, evaluar, entregar y explicar una aplicación útil mediante tres resultados conectados: servicio de datos/ML, asistente con fuentes y flujo acotado.

**Presupuesto:** 28 semanas × 12 horas = **336 horas previstas**. Por semana: unas 6 de aprendizaje, 5 de construcción/pruebas y 1 de explicación/revisión. A 6 horas semanales, calcula unas 56 semanas. Las tareas de cursos, depuración y revisión pueden necesitar más tiempo; no comprimas los criterios para cumplir una fecha.

## Prueba de entrada {/* #entry-check */}

Sin soluciones generadas, escribe un programa que lea JSON/CSV, llame una API HTTP con tiempo límite, gestione una respuesta fallida y guarde un resultado. Añade dos pruebas y usa Git. Explica entornos, excepciones y dependencias. Si resulta difícil, empieza [B](./path-b).

## Cómo seguir el plan

Sigue el **tema seleccionado**, no todo el sitio de documentación. Los resultados siguientes son actividades originales del proyecto, no necesariamente tareas evaluadas del proveedor. Si buscas el certificado de la especialización ML, completa sus requisitos. Mantén el mismo asistente de apoyo al aprendizaje con datos públicos/sintéticos.

Como ejemplo concreto: Python, pytest, FastAPI y base de datos relacional. SQLite basta al inicio; PostgreSQL resulta útil al añadir búsqueda vectorial persistente. Mantén un entorno reproducible. Puedes usar herramientas equivalentes conocidas si producen la misma evidencia. El nombre de una biblioteca o nube no es un resultado de aprendizaje.

## Fase 1 — Software cotidiano confiable {/* #phase-software */}

| Semana | Abre y estudia | Aplícalo al proyecto |
| --- | --- | --- |
| 1 | [CS50P: Unit Tests](https://cs50.harvard.edu/python/weeks/5/), [pytest: Get Started](https://docs.pytest.org/en/stable/getting-started.html); [proyectos uv](https://docs.astral.sh/uv/guides/projects/) como ejemplo de entorno | Empaqueta el lector de preguntas. Prueba registros inválidos y archivos ausentes; guarda versiones y comandos. |
| 2 | [CS50 SQL: Querying](https://cs50.harvard.edu/sql/weeks/0/) y [Relating](https://cs50.harvard.edu/sql/weeks/1/) | Guarda preguntas y temas en dos tablas; escribe cinco consultas con joins, agregaciones y valores nulos. Registra procedencia y duplicados. |
| 3 | FastAPI: [primeros pasos](https://fastapi.tiangolo.com/tutorial/first-steps/), [cuerpos de solicitud](https://fastapi.tiangolo.com/tutorial/body/) y [errores](https://fastapi.tiangolo.com/tutorial/handling-errors/) | Expón un endpoint de preguntas/consulta. Prueba solicitudes válidas, malformadas y un fallo de la base. |
| 4 | [Docker: aplicación e imagen](https://docs.docker.com/get-started/tutorials/run-an-app/) y [CI para Python](https://docs.github.com/en/actions/tutorials/build-and-test-code/python): compilación/pruebas | Conteneriza la API y ejecuta pruebas en CI. **Criterio 1:** otra persona reproduce API/base desde un clon limpio. |

## Fase 2 — Qué hace útil a un modelo {/* #phase-ml */}

Sigue la [Machine Learning Specialization](https://www.coursera.org/specializations/machine-learning-introduction) en el orden del proveedor. Los enlaces reutilizan la página del programa: los temas indican qué seleccionar, sin inventar números de semana internos.

| Semana | Abre y estudia | Aplícalo al proyecto |
| --- | --- | --- |
| 5 | [Especialización ML](https://www.coursera.org/specializations/machine-learning-introduction): aprendizaje supervisado, regresión y pérdida | Define la predicción; crea una referencia mayoritaria/heurística antes de entrenar. |
| 6 | [Especialización ML](https://www.coursera.org/specializations/machine-learning-introduction): clasificación; [validación cruzada](https://scikit-learn.org/stable/modules/cross_validation.html): prueba frente a validación | Congela divisiones de entrenamiento/validación/prueba y justifica su pertinencia. |
| 7 | [Especialización ML](https://www.coursera.org/specializations/machine-learning-introduction): regularización/evaluación; [errores frecuentes](https://scikit-learn.org/stable/common_pitfalls.html): fuga de información | Ajusta preprocesamiento solo con entrenamiento. Compara umbrales con precisión/recobrado y cinco errores. |
| 8 | [Especialización ML](https://www.coursera.org/specializations/machine-learning-introduction): redes neuronales y entrenamiento | Entrena un modelo pequeño del curso, grafica pérdida y explica sobreajuste. Transfiere solo ideas pertinentes. |
| 9 | [Especialización ML](https://www.coursera.org/specializations/machine-learning-introduction): árboles y conjuntos | Compara modelo lineal y árbol con la misma validación. |
| 10 | [Especialización ML](https://www.coursera.org/specializations/machine-learning-introduction): agrupamiento, anomalías y recomendaciones | Ejecuta un experimento pequeño del curso; explica si aporta al proyecto, sin incorporarlo a la fuerza. |
| 11 | [Especialización ML](https://www.coursera.org/specializations/machine-learning-introduction): tareas obligatorias pendientes | Cierra brechas; convierte preprocesamiento/entrenamiento elegido en un script versionado con semilla. |
| 12 | [Validación cruzada](https://scikit-learn.org/stable/modules/cross_validation.html): evaluación final reservada | **Criterio 2:** evalúa datos de prueba intactos, sirve predicciones por API y escribe ficha del modelo con referencia y límites. |

Las **96 horas de ML son una estimación**, incluida la práctica del proyecto. Completar tres cursos y sus tareas puede llevar más. Extiende la fase: ver videos no equivale a completarla.

## Fase 3 — Una función de modelo de lenguaje con cuidado {/* #phase-language-models */}

| Semana | Abre y estudia | Aplícalo al proyecto |
| --- | --- | --- |
| 13 | [Introducción Hugging Face](https://huggingface.co/learn/llm-course/en/chapter1/1) y [Tokenizers](https://huggingface.co/learn/llm-course/en/chapter2/4) | Compara cantidad de tokens en entradas cortas/largas. Registra modelo, límites, datos permitidos y costo aproximado. |
| 14 | FastAPI: [modelos de salida](https://fastapi.tiangolo.com/tutorial/response-model/) y [errores](https://fastapi.tiangolo.com/tutorial/handling-errors/); [esquemas de herramientas](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/13-tools-and-protocols/05-tool-schema-design/docs/en.md): descripción y restricciones | Añade una sugerencia estructurada de tema. Valida salida; prueba tiempo límite, salida inválida y reintento acotado. Empieza con respuesta simulada. |

Es orientación, no todo el curso HF. Requiere buen Python e introducción a aprendizaje profundo. Si las redes siguen poco claras, añade práctica de entrenamiento de [fast.ai](https://course.fast.ai/) **fuera de este presupuesto** antes de ejercicios HF de entrenamiento.

## Fase 4 — Recuperar evidencia y evaluar respuestas {/* #phase-retrieval */}

RAG es **generación aumentada por recuperación**: buscar pasajes pertinentes y usarlos como contexto. No garantiza respuestas correctas.

| Semana | Abre y estudia | Aplícalo al proyecto |
| --- | --- | --- |
| 15 | [Lección RAG de referencia](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/11-llm-engineering/06-rag/docs/en.md): carga, fragmentación, embeddings y almacenamiento; [pgvector](https://github.com/pgvector/pgvector): inicio y actualización/eliminación | Da IDs estables a documentos; crea índice persistente pequeño y comando de reconstrucción. Prueba cambios y eliminación. |
| 16 | [Retrieval Evaluation Lab](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/projects/retrieval-evaluation-lab): etapas 1–2, validación de rankings y precisión/recobrado | Etiqueta consultas de desarrollo; compara búsqueda léxica y embeddings con recall@k. Conserva etiquetas y resultados individuales. |
| 17 | [Lección RAG](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/11-llm-engineering/06-rag/docs/en.md): recuperación y generación | Responde con citas o “evidencia insuficiente”. Evalúa corrección, respaldo de citas y abstención por separado. |
| 18 | [Retrieval Evaluation Lab](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/projects/retrieval-evaluation-lab): etapas 3–4, métricas sensibles al orden y comparaciones | **Criterio 3:** compara respuestas con/sin recuperación en consultas intactas; informa regresiones por consulta, latencia y costo con la [rúbrica compartida](./portfolio-practice#completion-gates). |

El laboratorio advierte que algunas funciones del ejecutor requieren POSIX. En Windows, usa WSL o implementa los ejercicios de ranking en tu proyecto; no afirmes haber pasado su evaluador sin ejecutarlo.

## Fase 5 — Flujos acotados {/* #phase-workflows */}

| Semana | Abre y estudia | Aplícalo al proyecto |
| --- | --- | --- |
| 19 | [Bucle de agente](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/01-the-agent-loop/docs/en.md): registro, observaciones y parada; repasa [esquemas](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/13-tools-and-protocols/05-tool-schema-design/docs/en.md) | Implementa consulta directa de solo lectura, argumentos validados y límites de pasos/tiempo; sin código arbitrario ni escrituras reales. |
| 20 | [Modos de fallo](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/26-failure-modes-agentic/docs/en.md): cascadas, pérdida de contexto y uso indebido | **Criterio 4:** prueba herramientas ausentes, argumentos inválidos, texto recuperado hostil y presupuestos agotados. Prepara borrador humano; permisos fuera del modelo. |

Persistencia de frameworks e integración de protocolos son [extensiones opcionales](./delivery-practice), no requisitos adicionales escondidos en dos semanas.

## Fase 6 — Entregar, observar y recuperar {/* #phase-delivery */}

| Semana | Abre y estudia | Aplícalo al proyecto |
| --- | --- | --- |
| 21 | [Tutorial Docker](https://docs.docker.com/get-started/tutorials/run-an-app/): imágenes, Compose y distribución; [despliegue MLOps](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/04-deployment): lotes frente a servicio en línea | Entrega un servicio de pruebas pequeño. Empieza localmente o con una nube conocida; registra configuración y eliminación de recursos. |
| 22 | [CI para Python](https://docs.github.com/en/actions/tutorials/build-and-test-code/python): pruebas/compilación; [pytest](https://docs.pytest.org/en/stable/getting-started.html) | Fija dependencias, añade comprobaciones de salud y bloquea una regresión sembrada en los controles de entrega. Secretos fuera del código. |
| 23 | [Monitoreo MLOps](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/05-monitoring): salud, calidad y deriva | Mide latencia, errores, costo y calidad con carga declarada. Basta un reporte; no se exige toda la plataforma de dashboards. |
| 24 | [Buenas prácticas MLOps](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/06-best-practices): integración y entrega | Simula caída de proveedor, ensaya rollback y escribe guía breve de recuperación. |
| 25 | [Guía de capacidades](./capability-guide) y [credenciales](./credentials) | Corrige una capacidad pendiente. **Sustitución opcional:** relaciona objetivos actuales de un examen con evidencia/brechas; no añadas todos sus dominios al presupuesto semanal. |
| 26 | [Rúbrica del proyecto](./portfolio-practice#completion-gates) | **Criterio 5:** otra persona ejecuta, evalúa y recupera la app. Si buscas examen, extiende su preparación hasta cumplir requisitos propios. |

APIs, nube, cursos, exámenes y reintentos tienen costos separados. Declara límite de gasto y limpieza antes de usarlos; una alerta no es un tope efectivo.

## Fase 7 — Explicar el aprendizaje con claridad {/* #phase-review */}

| Semana | Abre y estudia | Aplícalo al proyecto |
| --- | --- | --- |
| 27 | [Career Practice de referencia](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md): un proyecto, retroalimentación y reproducción; [plantilla de evidencia](./portfolio-practice#evidence-record) | Escribe dos casos breves: referencia, fallo, mejora y límite. Graba explicación de cinco minutos. |
| 28 | [Guía de capacidades](./capability-guide) y [práctica de revisión](./portfolio-practice#review-and-explain) | **Criterio 6:** demuestra los tres resultados; solicita revisión de reproducción/diseño, registra comentarios reales y elige la siguiente mejora. |

**Profundidad opcional:** ajuste avanzado, entrenamiento distribuido, múltiples agentes y plataformas adicionales vienen después, cuando una pregunta de aprendizaje los justifique. Para más datos/entrenamiento, continúa con [C](./path-c).
