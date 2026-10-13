---
sidebar_position: 4
title: "C: Machine Learning y Datos"
---

# C: del software a sistemas de ML y datos

**Para:** ingenieros que ya construyen APIs probadas, usan Git/CI y SQL y despliegan servicios. **Presupuesto:** 32 semanas a 15 horas = **480 horas**. Por semana: 6 de aprendizaje, 7 de implementación/evaluación y 2 de carrera/comunicación.

C agrega deliberadamente **más Machine Learning y Datos**. El entrenamiento y los pipelines son trabajo principal, no un notebook opcional junto al LLM.

## Puerta de entrada

Muestra un servicio explicable, consulta SQL con joins y funciones de ventana, contenedor reproducible y fallo CI diagnosticado. Si faltan fundamentos de software, usa A. Experiencia de software no equivale a experiencia ML.

| Fase | Semanas / horas | Aprender e implementar | Evidencia |
| --- | --- | --- | --- |
| Estadística y ML | 1-6 / 90 | [ML Specialization](https://www.coursera.org/specializations/machine-learning-introduction); probabilidad, álgebra, optimización, muestreo, fuga e incertidumbre | Líneas base, estrategia de divisiones, intervalos y errores por segmento |
| Ingeniería de datos | 7-12 / 90 | SQL avanzado, modelado, ingesta batch/incremental, evolución de esquema, contratos, calidad y linaje | Pipeline idempotente, backfill, cuarentena y transformaciones probadas |
| Deep learning y NLP | 13-18 / 90 | [fast.ai](https://course.fast.ai/) seleccionado; luego [Hugging Face](https://huggingface.co/learn/llm-course/en/chapter1/1): datasets, tokenización y entrenamiento | Entrenamiento reproducible, dataset versionado y comparación de fine-tuning |
| MLOps y serving | 19-24 / 90 | Tracking, registro, consistencia de features, batch/online, evaluación CI, rollout/rollback y deriva | Pipeline entrenamiento-serving, ensayo rollback y alertas |
| GenAI y recuperación | 25-28 / 60 | Recuperación híbrida, reranking, filtros de acceso, versiones y evaluación | Experimento independiente RAG vs adaptación, con costos |
| Especialización y carrera | 29-32 / 60 | Preparación oficial de una nube, diseño de sistemas y postulaciones | Mapa de brechas del examen y tres resultados defendibles |

Los módulos son seleccionados salvo la especialización completa de ML. El mapa no implica completar fast.ai, Hugging Face ni una certificación profesional. Extiende cualquier fase si las tareas o puertas requieren más tiempo.

## Tres proyectos conectados

| Proyecto | Implementación mínima | Diferencia frente a A |
| --- | --- | --- |
| Producto de datos | Ingesta pública/sintética en almacenamiento relacional/analítico; contratos, incremental, backfill y linaje | Recuperación, semántica, frescura, duplicados y reproducción |
| Servicio ML entrenado | Heurística, modelo lineal/árbol y red pequeña; datos versionados; batch y API | Selección/tuning sin fuga, tracking y consistencia entrenamiento-serving |
| Benchmark de recuperación/adaptación | Mismo problema y test independiente: prompt, RAG y fine-tune pequeño justificado | Procedencia/versiones, análisis por segmentos, costo y complejidad |

No hagas fine-tuning **si no se justifica**: explica la decisión y ejecuta un experimento pequeño controlado. Empieza con CPU/modelos pequeños; GPU requiere tope escrito y plan de limpieza.

## Profundidad requerida

Defiende divisiones temporales/por grupo, valores faltantes, desbalance, calibración, umbrales, fuga de features, deriva vs bugs y reproducibilidad. En datos: claves/restricciones, migraciones, idempotencia, reintentos, registros fallidos, linaje y borrado.

Procesamiento distribuido, Kubernetes, feature stores, forecasting, recomendación y visión son **electivas según el puesto**. Agrega Spark u otro motor solo por escala o vacantes; no reconstruyas infraestructura durante todo el plan.

## Mejora de entrega para objetivos sénior

La [auditoría EPAM](./epam-reality-check) detecta requisitos de aplicaciones/agentes que ML/datos no establece. Mantén profundidad ML con herramientas explícitas: uv/Ruff/pytest, FastAPI/Pydantic/Uvicorn, PostgreSQL/pgvector, NumPy, pandas o Polars, scikit-learn, PyTorch, datasets/tokenizers HF y sentence-transformers según tarea; MLflow para experimentos. Explica equivalencias TensorFlow/Keras sin afirmar dominio no probado.

Selecciona módulos [MLOps Zoomcamp](https://github.com/DataTalksClub/mlops-zoomcamp) en 19-24, no curso completo adicional de nueve semanas dentro de igual presupuesto. En 29-32 prioriza brechas de entrega/diseño/inglés sobre examen para EPAM; extiende si hace falta.

Agrega el [puente sénior](./senior-delivery-bridge) tras puertas de entrada. Kubernetes/Redis/Kafka son prácticas E3, AgentCore/Strands y difusión/video ramas separadas. **Añade hasta 360 horas propuestas** si se toma entero; no están ocultas en las 480 de C y no crean antigüedad profesional.

## Credenciales y roles

Para producción ML en AWS, considera **AWS Certified Machine Learning Engineer - Associate**. La página oficial indica transición a **MLA-C02 beta en inglés**; no planifiques la sesión inglesa terminada de MLA-C01. Espera un temario estable si no necesitas beta.

Para Google ML/datos, evalúa **Professional Machine Learning Engineer** tras suficiente práctica; no prueba capacidad de programar. AI-103 corresponde a aplicaciones Azure, pero no reemplaza la evidencia de datos/entrenamiento.

Busca ML engineer, data engineer para IA, AI platform/MLOps o applied AI según experiencia y vacantes. Investigación y roles sénior pueden exigir formación que este plan no entrega.

**Continúa:** [cursos/exámenes oficiales](./credentials), [rúbrica](./portfolio-career) y [referencias](./source-review).
