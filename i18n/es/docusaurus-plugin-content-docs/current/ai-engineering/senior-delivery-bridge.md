---
sidebar_position: 9
title: "Puente de entrega sénior: IA de producción"
---

# Puente sénior: de cobertura a evidencia de entrega

**Para:** profesionales software/IA experimentados que apuntan a las [cuatro vacantes EPAM](./epam-reality-check). **Presupuesto propuesto:** 24 semanas x 15 horas = **360 horas**: 16 comunes (240) y **una** rama de 8 (120). Se agrega a los fundamentos faltantes; no promete seniority. Por semana: 4 horas lectura, 9 implementación/debugging, 2 revisión/comunicación.

Primero experiencia/región: E1/E3 piden 3+ años profesionales software e IA de producción; E2 3+ producción software incluyendo 1+ agentes LLM; E4 5+ IA/ML. El puente no otorga esa trayectoria.

## Entrada y alcance

Demuestra API Python probada, SQL joins/ventanas, contenedor/release, evaluación ML, experimento RAG independiente y diagnóstico CI/runtime. Resuelve fundamentos A/C antes.

Un proyecto: **workbench de soporte con datos sintéticos**, documentos, API de tickets y borrador revisado por humano. La rama medios reutiliza API/jobs para activos creativos licenciados. Sin integraciones/escrituras/pruebas de seguridad externas sin autorización explícita.

Stack común sugerido: Python 3.12+ soportado/compatible, uv, Ruff, pytest, FastAPI/Pydantic/Uvicorn, PostgreSQL/pgvector, LangGraph, Docker, una nube, IaC y herramienta de evaluación/trazas. Fija versiones compatibles; el mínimo del anuncio no recomienda congelar un intérprete sin soporte.

Los frameworks de ejemplo no son todos obligatorios. Implementa uno profundamente y explica equivalencias; familiaridad no es expertise.

## Plan común semanal

| Semana | Trabajo | Evidencia y requisito |
| --- | --- | --- |
| 1 | Auditoría, paquete tipado, uv lock, Ruff/pytest CI | Clon limpio, versiones y comandos; E3 |
| 2 | FastAPI async, contratos Pydantic, lifecycle Uvicorn | I/O bloqueante/no bloqueante, cancelación, timeout y shutdown; E1/E3 |
| 3 | Autenticación/autorización, migraciones SQL y tenants | Pruebas negativas, migración/rollback; E3/E4 |
| 4 | Límites async, workers acotados, idempotencia y reintentos | Duplicados, throttling, cancelación y cola acotada; E1/E3 |
| 5 | pgvector, baseline léxico y reranking | Persistir/reconstruir, actualizar/borrar y diferencias por consulta; E3/E4 |
| 6 | Tracking y harness de evaluación Python versionado | IDs prompt/modelo/datos, checks deterministas y jueces calibrados; E1/E3/E4 |
| 7 | LangGraph checkpointer y store | Reinicio/resume, aislamiento y retención/borrado; E2/E4 |
| 8 | Cliente/servidor MCP, contratos, transporte y autorización | Inputs inválidos/no autorizados, versiones SDK/protocolo; E2/E4 |
| 9 | Ejecución acotada y borrador con revisión humana | Aprobación ligada a payload/identidad; alteración/replay denegados; E2/E4 |
| 10 | Trazas, costos, errores y latencia | Diagnóstico span, conteo tokens y logs redactados; E1-E4 |
| 11 | Carga/soak, retry storm, outage y degradación | Carga/presupuestos previos, p95/p99, errores, costo y comportamiento visible; E1-E4 |
| 12 | Sandbox nube vía IaC y secretos | Plan revisado, despliegue y limpieza dirigida, mínimo privilegio; E1/E3 |
| 13 | Contenedores y fundamentos Kubernetes | Local: readiness/liveness, escala y recuperación de actualización; requisito E3 |
| 14 | Release gate, incidente y rollback | CI bloquea regresión crítica sembrada; timeline y runbook; E1-E4 |
| 15 | API mock CRM/tickets, triage del backlog y revisión de cliente | Contratos, recuperación, ADR/alternativas/costos, feedback real si existe; E1/E3/E4 |
| 16 | Reproducción independiente, entrevista de diseño e inglés | Revisor reproduce fallo/resultado; demo y brief inglés; E2/E3 idioma, E3/E4 comunicación |

Lecturas/labs **seleccionados**, no todos los cursos completos. Extiende por puertas fallidas. Kubernetes local no establece experiencia operando clusters de nube.

## Elige una sola especialización

No combines las cuatro ramas en ocho semanas.

| Rama | Semanas 17-18 | Semanas 19-20 | Semanas 21-22 | Semanas 23-24 |
| --- | --- | --- | --- | --- |
| **Agentes / E2** | Portar a Strands; mapear cinco primitivas AgentCore | Despliegue sandbox autorizado; contexto, memoria corta/larga y borrado/aislamiento | Comparar trazas/evals ante fallos, estado perdido, timeout y accesos denegados | Recrear despliegue y explicar primitivas, costo/latencia y aprendizaje rápido |
| **Soluciones Python / E3** | Redis keys por tenant, TTL/invalidation; Kafka duplicados/replay | Contratos PostgreSQL, actualización vectorial e integración Kubernetes local | Slice LlamaIndex o PydanticAI comparado; HF datasets/tokenizers, sentence-transformers y bibliotecas ML | Tradeoffs con cliente, fallo de integración y caso de entrega |
| **Medios / E1** | Difusión HF y prerrequisitos PyTorch, imagen licenciada y procedencia | Jobs async y un experimento pequeño API image-to-video/generación video con presupuesto | Harness versionado: alineación prompt, formato, calidad y revisión humana | IaC AWS/GCP, throughput/costo, rollback y límites |
| **Sénior/Lead / E4** | Contratos mock CRM/ERP; MCP vs A2A; aclarar ACP con empleador | Hipótesis, éxito/guardrails, experimento offline y propuesta A/B | Liderar revisión, tickets acotados, revisar cambio de colega e incidente simulado | Readout técnico/no técnico, migración/costo e historias verificables |

Imagen por difusión no demuestra expertise video: registra API/modelo real, licencia, límites y costos. Firefly/OpenCV/FFmpeg son extensiones opcionales. No necesitas entrenar modelos masivos.

En E3 estudia equivalencias a otros frameworks, gestores, bases vectoriales y PyTorch/TensorFlow, aunque implementes uno profundamente. Registra brechas sin afirmar dominio universal. TRL/DSPy/LiteLLM/UI son opcionales.

Para responsabilidades de seguridad E2, usa **scanners mock y resultados sintéticos en laboratorio aislado**. No incluye crear herramientas de explotación ni probar sistemas externos. Pentesting es preferencia separada, no experiencia otorgada por lab.

En E4 un experimento offline/simulado **no es A/B en vivo**. Prueba real requiere usuarios autorizados, randomización, exposición/telemetría, razonamiento de tamaño de muestra, guardrails y regla de parada acordada. ACP es ambiguo: no asumas especificación/versión.

## Evaluación de salida basada en evidencia

Umbrales docentes, no criterios de contratación EPAM ni prueba de seguridad general.

| Puerta | Evidencia mínima |
| --- | --- |
| API/datos | Contratos, accesos tenant denegados, migración, duplicados/replay y ausencia de I/O bloqueante escondido |
| Estado/herramientas | Restart/resume, fallo, presupuesto, memoria/borrado, aprobación alterada/replay e inputs MCP inválidos; casos/resultados enumerados |
| Evaluación | Baseline/candidato versionados, dev/test separado; éxito, herramientas, citas, fallos y calibración; regresión crítica sembrada bloquea CI |
| Rendimiento | Concurrencia, duración, workload y presupuestos p95/p99/errores/costo previos; resultados y explicación sin mover metas después |
| Despliegue/recuperación | Revisor recrea sandbox por IaC/config; fallo/rollback y limpieza confirmada |
| Rama | Artefacto elegido, tecnologías no evaluadas y experiencia faltante |
| Comunicación | 15 minutos diseño/debugging en inglés y brief escrito con feedback; práctica **no certifica B2** |
| Elegibilidad profesional | Registro verificable, geografía, aportes reales y requisitos incumplidos |

No declares "preparado" por checklist. Usa **demostrado / necesita práctica / no evaluado / externo incumplido** por vacante. Revisión independiente de código/diseño y evaluación de idioma si B2 es desconocido.

## Evidencia profesional real

Con autorización, asume una funcionalidad IA acotada en trabajo profesional: requisitos, código revisado, release, monitoreo, soporte, incidentes y mejora. Conserva revisión y aprobación humanas establecidas. Registra hechos y pide permiso antes de compartir.

Sin oportunidad, busca backend/integración apropiada o proyecto claramente etiquetado. Estudio, demo alojada y uptime de lab no son años profesionales de producción. No existe conversión fija de 360 horas a antigüedad.

[Recursos verificados](./senior-resources). Certificaciones opcionales; reemplaza semanas de examen por brechas importantes.
