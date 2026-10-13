---
sidebar_position: 2
title: "A: Ingeniería de aplicaciones de IA"
---

# A: cambio de carrera hacia aplicaciones de IA

**Objetivo:** demostrar que puedes construir, evaluar, desplegar y explicar una aplicación pequeña de IA. Busca puestos junior de desarrollo de IA, Python/backend con funcionalidades de IA o integración, cuyos requisitos correspondan con tu experiencia.

**Presupuesto:** 28 semanas x 12 horas = **336 horas planificadas**. Por semana: aproximadamente 6 horas de aprendizaje, 5 de construcción/pruebas y 1 de investigación laboral o comunicación. Incluye proyectos independientes, pero no tasas de examen, repeticiones ni remediación adicional. Con 6 horas/semana, considera unas 56 semanas sin comprimir las puertas.

## Prueba de entrada

Sin pedir a un asistente de IA que genere la solución, escribe un programa Python que lea JSON/CSV, llame una API HTTP con timeout, maneje respuestas fallidas y guarde el resultado. Agrega dos pruebas y un commit. Explica entornos, excepciones y dependencias.

Si no puedes hacerlo, usa [B](./path-b). Puedes usar IA después, pero debes revisar el código generado y reproducir su comportamiento de forma independiente.

## Siete fases

| Fase | Semanas / horas | Aprendizaje principal | Evidencia de salida |
| --- | --- | --- | --- |
| Software y SQL | 1-4 / 48 | Lecciones seleccionadas de [CS50P](https://cs50.harvard.edu/python/), [CS50 SQL](https://cs50.harvard.edu/sql/) y fase 0 de la referencia | API probada sobre datos relacionales |
| ML aplicado | 5-12 / 96 | [Machine Learning Specialization](https://www.coursera.org/specializations/machine-learning-introduction) | Línea base, evaluación independiente y análisis de errores |
| Fundamentos LLM | 13-14 / 24 | Conceptos seleccionados del [curso de Hugging Face](https://huggingface.co/learn/llm-course/en/chapter1/1) y referencia | Salida estructurada con pruebas de fallo |
| Recuperación y evaluación | 15-18 / 48 | RAG, evaluación y Retrieval Evaluation Lab de la referencia | Benchmark frente a búsqueda léxica y sin recuperación |
| Flujos acotados | 19-20 / 24 | Bucle del agente, contratos de herramientas y fallos | Flujo de lectura, validación y límite de aprobación |
| Despliegue y una credencial | 21-26 / 72 | Preparación oficial de la nube seleccionada | Despliegue reproducible, monitoreo, rollback y brechas del examen |
| Carrera | 27-28 / 24 | Revisión de portafolio y entrevistas simuladas | Tres resultados explicables, CV y postulaciones adaptadas |

[Cursos y credenciales](./credentials) · [Lecciones de referencia](./source-review#lecciones-seleccionadas)

## Lista semanal

Guarda el resultado en tu repositorio. Una puerta pendiente se arrastra: no agregues otro framework para ocultar un fundamento faltante.

| Semana | Tarea principal | Resultado |
| --- | --- | --- |
| 1 | Brechas de entrada; Python 3.12+ y dependencias compatibles, uv, Git, Ruff, pytest | Entorno locked, CI lint/tests y datos inválidos |
| 2 | SQL: joins, agregación, nulos; licencia y duplicados | Ficha de datos, esquema y cinco consultas |
| 3 | FastAPI/Pydantic/Uvicorn y PostgreSQL para ingesta/consulta | Contratos, fallos y ejemplo I/O async vs bloqueante |
| 4 | Contenedor, CI y reproducción por otra persona | **Puerta 1:** API + base de datos desde un clon limpio |
| 5 | Regresión, pérdida, características y línea base sin ML | Problema y línea base heurística/mayoritaria |
| 6 | Clasificación y división train/validation/test | Pruebas de fuga y manifiesto fijo de divisiones |
| 7 | Regularización, umbrales y métricas | Compromiso precision/recall y ejemplos de error |
| 8 | Redes neuronales y entrenamiento práctico | Modelo pequeño; explicar sobreajuste y pérdida |
| 9 | Árboles y selección de modelos | Comparación de modelo lineal y árbol |
| 10 | Aprendizaje no supervisado y recomendación | Experimento pertinente y cuándo no usarlo |
| 11 | Terminar tareas de especialización; reproducir modelo | Script versionado de preparación/entrenamiento y semilla |
| 12 | Evaluar datos de prueba no usados; API de predicción | **Puerta 2:** servicio ML, ficha y comparación honesta |
| 13 | Tokenización, contexto, embeddings y contratos API | Límites de entrada/salida y comparación pequeña |
| 14 | Salida estructurada, timeout y reintentos acotados | Funcionalidad probada con errores explícitos |
| 15 | Ingesta, IDs, fragmentación, actualización/borrado y vectores pgvector | Índice PostgreSQL versionado, reconstrucción y corpus público/sintético |
| 16 | Comparar recuperación léxica y embeddings | Consultas etiquetadas y recall@k |
| 17 | Respuestas con pasajes, citas y abstención | Rúbrica y casos sin respuesta |
| 18 | Laboratorio de recuperación y evaluación completa | **Puerta 3:** diferencias por consulta y calidad/latencia/costo |
| 19 | Un flujo con herramienta antes de orquestación | Contrato tipado y operaciones de lectura permitidas |
| 20 | Portar flujo a LangGraph; contrato MCP; fallos, pasos y aprobación | **Puerta 4:** comparación directa/framework, contratos y denegación/aprobación |
| 21 | Elegir nube por vacantes y desplegar | Configuración registrada, secretos fuera del código y tope de gasto |
| 22 | CI, versiones de dependencias y health checks | Instrucciones de despliegue y release reproducible |
| 23 | Medir latencia, costo, errores y deriva | Reporte operativo sin afirmar producción no demostrada |
| 24 | Ensayar fallo/rollback y recibir feedback | Runbook y mejora con evidencia antes/después |
| 25 | Mapear temario oficial a habilidades implementadas | Brechas y laboratorios para dominios faltantes |
| 26 | Evaluación oficial de práctica si existe; resolver brechas | **Puerta 5:** otra persona ejecuta, evalúa y recupera la app |
| 27 | CV, dos casos, Python/SQL y explicación técnica en inglés | CV con evidencia y explicación grabada con feedback |
| 28 | Diseño de sistemas y postulaciones adaptadas | **Puerta 6:** portafolio revisable y seguimiento |

## Alcance realista

La fase ML busca terminar los **tres cursos y sus tareas**, no solo videos. Si exceden 96 horas, extiende la fase. Solo declara el certificado tras cumplir los requisitos del proveedor.

Dos semanas de LLM son **orientación**, no el curso completo de Hugging Face. Este recomienda buen Python e introducción a deep learning. Primero usa el material de redes del curso ML; si falta base, agrega lecciones de [fast.ai](https://course.fast.ai/) antes de ejercicios de entrenamiento. Fine-tuning avanzado y modelos de razonamiento son extensiones o material de C.

Usa Python, SQL, un framework API, una base de datos, un proveedor de modelos y un destino de despliegue. Aprende orquestación después de que la implementación directa funcione. Pospon Rust/Julia, CUDA, entrenamiento distribuido, multiagentes y multimodalidad salvo demanda del puesto.

### Mejora a partir de vacantes

La [auditoría EPAM](./epam-reality-check) concreta uv/Ruff/pytest, FastAPI/Pydantic/Uvicorn, PostgreSQL/pgvector y primera práctica LangGraph/MCP. Son introducciones, no dominio empresarial. Usa [recursos oficiales](./senior-resources) y extiende fases; 336 horas sigue siendo estimación.

Para E2/E3 practica inglés técnico semanal y evalúa B2 aparte; demo no certifica idioma. Para EPAM reemplaza semanas 25-26 de examen por puertas de entrega y brechas si el examen no aporta valor actual. Dos semanas de agentes no sustituyen un año de producción pedido por E2.

## La certificación tiene una puerta separada

Para puestos de aplicaciones Azure, **AI-103** es la recomendación inicial, no requisito universal. Incluye visión, análisis de texto y extracción: un proyecto RAG **no prepara todos los dominios**. Cubre brechas en semanas 25-26 o extiende el estudio.

No reserves por llegar a semana 26. Usa las [reglas de compra](./credentials#cuándo-pagar-el-examen). Para ML en AWS/Google, considera C y experiencia práctica antes del examen.

Investiga el mercado desde semana 1 y conversa sobre tu portafolio desde puerta 2. Puedes postular antes si cumples la vacante; cursos y exámenes no autorizan afirmar experiencia profesional.

**Continúa:** [rúbrica del portafolio](./portfolio-career).
