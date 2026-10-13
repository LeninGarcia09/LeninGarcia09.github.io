---
sidebar_position: 9
title: "Práctica de Entrega Opcional"
---

# Amplía el mismo proyecto hacia la práctica operativa

**Para:** quienes ya demuestran software, evaluación ML y recuperación. **Presupuesto adicional propuesto:** 24 semanas × 15 horas = **360 horas**: 16 comunes (**240**) y **un** foco de ocho semanas (**120**). Por semana: unas 4 horas de lectura, 9 de implementación/depuración y 2 de revisión/comunicación.

Es profundidad opcional, no requisito para terminar A/B/C. Selecciónala después de [revisar capacidades](./capability-guide), o elige ejercicios individuales con presupuesto adicional explícito. No otorga experiencia profesional.

## Antes de empezar

Demuestra independientemente API probada, joins/ventanas SQL, entrega contenerizada, división ML limpia, recuperación con prueba reservada y fallo CI/runtime diagnosticado. Corrige fundamentos A/C primero.

Mantén asistente público/sintético. Añade API externa simulada y borrador revisado, no integraciones/escrituras reales. Usa base existente; LangGraph y MCP ilustran estado/protocolos, no acumular frameworks. Fija y registra versiones compatibles.

## Práctica común: una actividad semanal

| Semana | Lectura seleccionada | Construye y demuestra |
| --- | --- | --- |
| 1 | [Proyectos uv](https://docs.astral.sh/uv/guides/projects/) y [pytest](https://docs.pytest.org/en/stable/getting-started.html) | Paquete tipado, entorno fijado, pruebas y comandos para clon limpio. |
| 2 | [Concurrencia FastAPI](https://fastapi.tiangolo.com/async/) | Compara I/O bloqueante/no bloqueante; prueba cancelación y tiempos límite sin afirmar paralelismo CPU. |
| 3 | FastAPI: [validación](https://fastapi.tiangolo.com/tutorial/body/) y [seguridad](https://fastapi.tiangolo.com/tutorial/security/); [transacciones PostgreSQL](https://www.postgresql.org/docs/current/tutorial-transactions.html) | Controles de acceso de aplicación, aislamiento sintético y migración fallida/rollback. |
| 4 | [Orquestación MLOps](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/03-orchestration): trabajo parametrizado repetible | Solicitudes idempotentes; limita workers/colas/reintentos y prueba saturación. |
| 5 | [pgvector](https://github.com/pgvector/pgvector): búsqueda, filtros e índices | Reconstruye índice; compara léxico/vector y prueba cambios/eliminación/filtros de acceso. |
| 6 | [MLflow tracking](https://mlflow.org/docs/latest/ml/tracking/) | Versiona prompts/modelos/datos; evalúa referencia/candidato. Calibra juez de modelo con etiquetas humanas. |
| 7 | [Persistencia LangGraph](https://docs.langchain.com/oss/python/langgraph/persistence): checkpoints frente a stores | Reanuda tras reinicio con almacenamiento duradero. Prueba aislamiento, retención y eliminación; ejemplo en memoria no prueba durabilidad. |
| 8 | [Arquitectura MCP](https://modelcontextprotocol.io/docs/learn/architecture): host/cliente/servidor y capa de datos | Conecta herramienta local de solo lectura; fija protocolo/SDK y prueba llamadas inválidas/no autorizadas. |
| 9 | [Interrupts LangGraph](https://docs.langchain.com/oss/python/langgraph/interrupts) | Pausa borrador para revisión; vincula aprobación a identidad/contenido. Deniega alteración/repetición; interrupt no es autorización. |
| 10 | [Modos de fallo](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/26-failure-modes-agentic/docs/en.md) | Traza herramienta fallida y presupuesto agotado. Oculta datos sensibles en logs; explica latencia y tokens/costo sin doble conteo. |
| 11 | [Monitoreo MLOps](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/05-monitoring) | Declara carga/duración y presupuestos de costo/latencia/error antes; ejecuta carga y simula caída. |
| 12 | [Buenas prácticas MLOps](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/06-best-practices): infraestructura versionada/entrega | Recrea entorno de pruebas con configuración revisada; con IaC/nube, revisa plan y verifica eliminación selectiva. |
| 13 | [Tutorial Docker](https://docs.docker.com/get-started/tutorials/run-an-app/): múltiples contenedores | Recrea API/datos/worker localmente; prueba reinicio y disponibilidad. No exige clúster. |
| 14 | [CI Python](https://docs.github.com/en/actions/tutorials/build-and-test-code/python) y [buenas prácticas](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/06-best-practices) | CI bloquea regresión crítica sembrada; ensaya rollback y registra cronología del incidente. |
| 15 | [Career Practice](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md): feedback/responsabilidad | Integra API simulada, recupera contrato roto, explica alternativas y mejora un problema señalado realmente. |
| 16 | [Rúbrica de revisión](./portfolio-practice#review-and-explain) y [capacidades](./capability-guide) | Otra persona reproduce fallo/resultado; presenta diseño y guía breve de recuperación. Marca revisión no disponible si corresponde. |

Son lecturas/laboratorios puntuales, no cursos completos. Algunas fuentes usan otras bibliotecas/nubes: transfiere concepto, no toda la infraestructura.

## Elige un foco de ocho semanas

Cada fila ocupa dos semanas: lectura/experimento, después implementación/revisión. No combines todos los focos dentro de 120 horas.

### Flujos con estado

| Semanas | Recurso | Actividad |
| --- | --- | --- |
| 17–18 | [Persistencia LangGraph](https://docs.langchain.com/oss/python/langgraph/persistence) | Separa checkpoints de conversación de datos duraderos; prueba reinicio/aislamiento. |
| 19–20 | [Arquitectura MCP](https://modelcontextprotocol.io/docs/learn/architecture) | Añade contrato de herramienta; documenta compatibilidad y denegación/errores. |
| 21–22 | [Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts), [modos de fallo](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/26-failure-modes-agentic/docs/en.md) | Prueba estado perdido, aprobación obsoleta, tiempo límite y eliminación; permisos fuera del modelo. |
| 23–24 | [Rúbrica de evidencia](./portfolio-practice#completion-gates) | Compara flujo directo/framework en mismas tareas: calidad, latencia, costo y recuperación. |

### Operación de datos y modelos

| Semanas | Recurso | Actividad |
| --- | --- | --- |
| 17–18 | [Orquestación MLOps](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/03-orchestration) | Recupera período ausente; prueba duplicados y linaje. |
| 19–20 | [Experimentos](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/02-experiment-tracking) | Compara modelos versionados sin cambiar divisiones; explica promoción. |
| 21–22 | [Despliegue](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/04-deployment) y [monitoreo](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/05-monitoring) | Scoring por lotes, consistencia de características, deriva frente a corrupción. |
| 23–24 | [Buenas prácticas](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/06-best-practices) | Reproduce entrenamiento-servicio y rollback; explica límites de pruebas operativas. |

### Evaluación y comunicación de diseño

| Semanas | Recurso | Actividad |
| --- | --- | --- |
| 17–18 | [Retrieval Evaluation Lab](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/projects/retrieval-evaluation-lab) | Diagnostica regresiones por consulta ocultas por mejora agregada. |
| 19–20 | [Validación cruzada](https://scikit-learn.org/stable/modules/cross_validation.html), [rúbrica](./portfolio-practice#completion-gates) | Diseña experimento offline controlado, datos intactos, segmentos y criterios de parada. |
| 21–22 | [Career Practice](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md) | Revisión entre pares e incidente simulado; registra comentarios reales y mejora implementada. |
| 23–24 | [Registro de evidencia](./portfolio-practice#evidence-record) | Presenta decisión a público técnico/no técnico; separa mediciones de supuestos. |

## Evaluación de salida

Usa **demostrado / necesita práctica / no evaluado / fuera del alcance** en contratos, estado/herramientas, evaluación, carga, recuperación y comunicación. Adjunta comandos y resultados reales. Un revisor debería recrear entorno y operación fallida/recuperada.

Experimento offline no es A/B en vivo; contenedor local no es operación productiva; conversación de práctica no certifica idioma. Protege información de clientes y obtén autorización antes de compartir artefactos profesionales u operar fuera del laboratorio sintético.

**Continúa:** [recursos puntuales y límites](./learning-resources).
