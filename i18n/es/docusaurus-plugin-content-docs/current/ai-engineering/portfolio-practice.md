---
sidebar_position: 6
title: "Proyecto y Práctica de Revisión"
---

# Haz visible lo que comprendes

Usa un asistente de apoyo al aprendizaje y tres resultados conectados. Basta un repositorio con comandos y reportes claros.

| Resultado | Ejemplo | Evidencia mínima |
| --- | --- | --- |
| Servicio de datos/ML | Organizar preguntas sintéticas por tema | Procedencia, referencia, divisiones, entrenamiento, pruebas API y ficha del modelo |
| Asistente con fuentes | Responder con documentos de referencia licenciados | Corpus/índice versionado, citas, abstención y evaluación separada de recuperación/respuesta |
| Flujo acotado | Consulta de pregunta de solo lectura y borrador humano | Argumentos validados, permisos fuera del modelo, límites de pasos/tiempo y trazas de fallo |

C profundiza en producto de datos recuperable, entrenamiento reproducible y comparación adaptación/recuperación. No describas proyecto sintético como despliegue de cliente.

## Criterios de avance {/* #completion-gates */}

Son **comprobaciones docentes propuestas**, no benchmarks universales, conclusiones de cumplimiento ni evaluación suficiente para despliegue real. Define carga y presupuestos antes de probar. Registra incumplimientos honestamente y mejora antes de avanzar.

| Criterio | Comprobación |
| --- | --- |
| Software | Revisor clona/ejecuta comandos; CI pasa; pruebas de entradas inválidas y fallos API/base; sin secretos en código. |
| ML | Divisiones entrenamiento/validación/prueba registradas; preprocesamiento ajustado solo en entrenamiento; referencia, métricas y fallos en prueba intacta. |
| Recuperación | Al menos 50 consultas etiquetadas de desarrollo y 30 intactas de prueba final: respondibles, no respondibles, obsoletas/conflictivas y malformadas. Sin ajuste con prueba final. |
| Respuestas | Corrección, respaldo de citas y abstención por separado. Metas propuestas: al menos 90% de afirmaciones fácticas respaldadas y 80% de abstención correcta; publica conteos y errores. |
| Herramientas | Deniega todos los intentos de escritura protegida del conjunto aislado sin aprobación válida. Incluye argumentos malformados, texto hostil, aprobación alterada/repetida y presupuestos agotados. |
| Operación | Registra carga, percentiles de latencia, costo/solicitud, errores, versiones y fecha; demuestra caída de proveedor y rollback. |
| Comunicación | Explica fallo y decisión sin tutorial; otra persona reproduce resultado y reconoce límites. |

Respaldo de citas = afirmaciones fácticas respaldadas / evaluadas; indica **no aplica**, no 100%, si no hay ninguna. Abstención correcta = preguntas no respondibles rechazadas correctamente / preguntas no respondibles. Publica denominadores y cantidades. Conjuntos pequeños tienen ruido; recuperación no prueba corrección de respuestas.

Conserva resultados por consulta, no solo promedios. Cero escapes en prueba finita no demuestra seguridad general. Usa fixtures aislados, identidades sintéticas y destinos simulados; no pruebes escrituras protegidas en sistemas reales sin autorización.

## Registro de evidencia {/* #evidence-record */}

Guarda esto en README o incidencia del proyecto:

```text
Tarea y usuario previsto:
Datos/fuente, licencia y uso permitido:
Referencia y alternativas:
Commit, dependencias fijadas, modelo/configuración y comando:
División de evaluación, rúbrica, cantidades y resultados:
Latencia, costo y fallos observados:
Limitaciones y siguiente mejora:
Comentarios del revisor (solo si se recibieron):
```

Conserva entradas/reportes sin secretos ni datos personales. Modelos alojados pueden variar; registra fecha e identificador. Sin revisor, marca reproducción independiente **no evaluada**, no inventes revisión.

## Revisar y explicar {/* #review-and-explain */}

| Ritmo | Práctica |
| --- | --- |
| Cada semana | Explica en dos minutos un concepto, fallo y corrección; guarda ejemplo. |
| En cada criterio de fase | Reconstruye con comandos, inspecciona pruebas y lista comportamiento sin explicar. |
| Tras un resultado útil | Pide seguir el inicio rápido; registra dificultades reales y mejora. |
| Al terminar | Demuestra tres resultados; compara referencia inicial/final y elige siguiente experimento. |

Un caso puede ser breve: **problema → referencia → experimento → resultado → límite → siguiente paso**. Ejemplo: “Construí asistente documental con corpus licenciado; evalué respaldo de citas en 30 consultas reservadas; documenté tiempos límite y rollback”. Añade resultados medidos solo después de medirlos.

Distingue cursos, simulaciones y experiencia real. No afirmes ahorro, adopción o experiencia profesional desde una demo. La [guía de capacidades](./capability-guide) distingue lo demostrado, lo pendiente y lo no evaluado.
