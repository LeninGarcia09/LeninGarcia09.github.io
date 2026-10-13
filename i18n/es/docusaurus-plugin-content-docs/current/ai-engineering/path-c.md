---
sidebar_position: 4
title: "C: Sistemas de ML y Datos"
---

# C: profundiza en datos, entrenamiento y operación

**Empieza aquí si:** ya construyes APIs probadas, usas Git/CI, consultas SQL y despliegas servicios. **Presupuesto:** 32 semanas × 15 horas = **480 horas**: unas 6 de aprendizaje, 7 de implementación/evaluación y 2 de revisión por semana.

Esta ruta profundiza más en **machine learning y datos** que A. Entrenamiento, calidad de datos y pipelines repetibles son centrales, no un notebook opcional junto a una función de lenguaje.

## Criterio de entrada

Muestra un servicio explicable, join/función de ventana SQL, contenedor reproducible y fallo CI diagnosticado. Cubre brechas de software con [A](./path-a). Experiencia de software no establece comprensión de ML.

Mantén el asistente de apoyo al aprendizaje: versiona eventos de preguntas/temas, entrena clasificador y compara enfoques para responder desde documentos. Son tres resultados de **un sistema**, no tres proyectos aislados.

## Fase 1 — ML y criterio estadístico

**Semanas 1–6 / 90 horas.** Completa requisitos del proveedor si buscas certificado ML; extiende si superan esta asignación. Atiende brechas matemáticas, sin asumir que programar las resuelve.

| Semanas | Recurso seleccionado y foco | Actividad y evidencia |
| --- | --- | --- |
| 1–2 | [Especialización ML](https://www.coursera.org/specializations/machine-learning-introduction): regresión, clasificación, pérdida y optimización | Explica características, dimensiones de vectores/matrices y gradientes en modelo pequeño. Compara referencia heurística y lineal. |
| 3–4 | [Especialización ML](https://www.coursera.org/specializations/machine-learning-introduction): redes, árboles y selección; [validación cruzada](https://scikit-learn.org/stable/modules/cross_validation.html) | Elige división aleatoria, por grupos o temporal según datos; ajusta solo con desarrollo y compara errores por segmento. |
| 5–6 | [Especialización ML](https://www.coursera.org/specializations/machine-learning-introduction): no supervisado/recomendaciones y tareas pendientes; [errores frecuentes](https://scikit-learn.org/stable/common_pitfalls.html); [bootstrap SciPy](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html): remuestreo e intervalos | Explica fuga, desbalance, datos ausentes y umbrales. Estima variabilidad remuestreando observaciones sintéticas independientes; documenta intervalo y supuestos. **Criterio C1:** referencias, divisiones y límites justificados. |

## Fase 2 — Datos como producto recuperable

**Semanas 7–12 / 90 horas.** Empieza por pipeline local por lotes; planificadores opcionales hasta que funcione la línea de comandos.

| Semanas | Recurso seleccionado y foco | Actividad y evidencia |
| --- | --- | --- |
| 7–8 | [CS50 SQL: Designing](https://cs50.harvard.edu/sql/weeks/2/), [transacciones PostgreSQL](https://www.postgresql.org/docs/current/tutorial-transactions.html) y [funciones de ventana](https://www.postgresql.org/docs/current/tutorial-window.html) | Define claves, restricciones e historial; prueba transacciones fallidas y calcula conteos móviles de temas. |
| 9–10 | [Orquestación MLOps](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/03-orchestration): scripts parametrizados, dependencias y backfills | Ingesta incremental; repetir lote no duplica registros. Aísla registros malformados y recupera ejecución fallida. |
| 11–12 | [Introducción HF Datasets](https://huggingface.co/learn/llm-course/en/chapter5/1): carga, selección y procesamiento | Versiona datos, transformaciones y cambios de esquema. **Criterio C2:** backfill, eliminación, controles y linaje reproducibles desde fuente hasta entrenamiento. |

## Fase 3 — Entrenar y adaptar un modelo pequeño

**Semanas 13–18 / 90 horas.** fast.ai identifica grabaciones de Part 1 de 2022; usa APIs actuales y versiones compatibles fijadas. Lecciones seleccionadas no equivalen al curso completo.

| Semanas | Recurso seleccionado y foco | Actividad y evidencia |
| --- | --- | --- |
| 13–14 | fast.ai: [lección 1](https://course.fast.ai/Lessons/lesson1.html), entrenamiento/uso; [lección 2](https://course.fast.ai/Lessons/lesson2.html), datos propios/despliegue | Entrena modelo pequeño, guarda pesos y compara entrenamiento/validación. Explica sobreajuste y presupuesto de cómputo. |
| 15–16 | [HF Tokenizers](https://huggingface.co/learn/llm-course/en/chapter2/4) e [introducción a fine-tuning](https://huggingface.co/learn/llm-course/en/chapter3/1), después sus secciones de preprocesamiento/entrenamiento | Entrena clasificación textual pequeña con datos versionados; registra tokenizador, modelo, semilla, métricas y recursos. |
| 17–18 | [MLflow tracking](https://mlflow.org/docs/latest/ml/tracking/): ejecuciones, experimentos y artefactos; [calibración de probabilidades](https://scikit-learn.org/stable/modules/calibration.html): curvas; [fuga de información](https://scikit-learn.org/stable/common_pitfalls.html) | Compara heurística, lineal/árbol y adaptación en misma prueba intacta. Comprueba confianza predicha frente a frecuencia observada; ajusta calibración solo con desarrollo. **Criterio C3:** entrenamiento reproducible y comparación honesta. |

Empieza con CPU/modelos pequeños. No es obligatorio ajustar el modelo de la aplicación si no se justifica; el experimento controlado conserva valor educativo. GPU/API exige tope de gasto y limpieza.

## Fase 4 — Del entrenamiento al servicio

**Semanas 19–24 / 90 horas.** Selecciona temas indicados de MLOps Zoomcamp, no todo un curso adicional de nueve semanas. Adapta conceptos al proyecto sin adoptar todos sus servicios.

| Semanas | Recurso seleccionado y foco | Actividad y evidencia |
| --- | --- | --- |
| 19–20 | [Seguimiento de experimentos](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/02-experiment-tracking): artefactos, linaje y versiones | Registra ejecuciones/candidato; prueba consistencia de características entre entrenamiento y servicio. |
| 21–22 | [Despliegue](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/04-deployment): lotes/en línea; [buenas prácticas](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/06-best-practices): pruebas/CI | Sirve modelo por API y lote; bloquea regresión sembrada y ensaya entrega fallida/rollback. |
| 23–24 | [Monitoreo](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/05-monitoring): salud, calidad y deriva | Simula datos ausentes/desplazados; distingue deriva de bug. **Criterio C4:** pipeline entrenamiento-servicio, reporte/alertas y recuperación. |

## Fase 5 — Recuperación frente a adaptación

**Semanas 25–28 / 60 horas.**

| Semanas | Recurso seleccionado y foco | Actividad y evidencia |
| --- | --- | --- |
| 25–26 | [Lección RAG](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/11-llm-engineering/06-rag/docs/en.md) y [pgvector](https://github.com/pgvector/pgvector): búsqueda/persistencia | Construye recuperación léxica/embeddings; filtros de acceso fuera del modelo. Prueba actualización, eliminación y denegaciones con identidades sintéticas. |
| 27–28 | [Retrieval Evaluation Lab](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/projects/retrieval-evaluation-lab): comparaciones; [rúbrica de respuestas](./portfolio-practice#completion-gates) | **Criterio C5:** compara solo prompt y RAG en misma tarea de respuesta congelada. Compara adaptación solo si entrenada para esa tarea; métricas del clasificador no son calidad de respuesta. Informa segmentos, costo y complejidad. |

Algunas funciones del ejecutor requieren POSIX; usa WSL o implementa ejercicios de métricas por separado. Registra cuáles comprobaciones ejecutaste.

## Fase 6 — Consolidar y explicar

**Semanas 29–32 / 60 horas.**

| Semanas | Recurso seleccionado y foco | Actividad y evidencia |
| --- | --- | --- |
| 29–30 | [Guía de capacidades](./capability-guide), [MLflow](https://mlflow.org/docs/latest/ml/tracking/) y [credenciales opcionales](./credentials) | Corrige criterio más débil. Opcionalmente mapea un temario a brechas; preparación de examen no se incluye automáticamente en 60 horas. |
| 31–32 | [Career Practice](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md): feedback/reproducción; [revisión](./portfolio-practice#review-and-explain) | **Criterio C6:** revisor reproduce fallo de datos, resultado de entrenamiento y recuperación del servicio. Escribe tres casos conectados con resultados reales y límites. |

## Profundidad opcional, por separado

Procesamiento distribuido, streaming, feature stores, Kubernetes, recomendaciones, pronósticos y visión son electivos. Añade uno cuando datos/carga o pregunta de aprendizaje lo justifiquen; registra tiempo/costo adicional. No reconstruyas infraestructura para ocultar datos/evaluación débiles.

Para flujos con estado o mayor práctica operativa, la [extensión de entrega](./delivery-practice) añade **360 horas propuestas** completa. No están dentro de las 480 de C. Certificados y disponibilidad de demos no otorgan experiencia profesional.
