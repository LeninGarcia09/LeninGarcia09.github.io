---
sidebar_position: 6
title: "Portafolio, puertas y carrera"
---

# Demuestra trabajo, no solo certificados

Usa un dominio y tres resultados conectados. Pueden convivir en un repositorio organizado con comandos y reportes independientes.

| Resultado | Ejemplo A/B | Evidencia mínima |
| --- | --- | --- |
| Servicio datos/ML | Clasificador de tickets públicos/sintéticos | Procedencia, baseline, divisiones, entrenamiento, API y ficha del modelo |
| Asistente fundamentado | Documentación pública | Corpus/índice versionado, citas, abstención y evaluación |
| Flujo acotado | Consulta de tickets y borrador sugerido | Entradas validadas, permisos externos al modelo, presupuestos de pasos/tiempo, fallos y aprobación |

C usa sus [proyectos de datos/ML](./path-c#tres-proyectos-conectados). No presentes flujos sintéticos como despliegues para clientes.

## Puertas concretas

Son **umbrales docentes propuestos**, no benchmarks de industria, cumplimiento ni evaluación suficiente para despliegue real. Define presupuestos de rendimiento antes de medir y documenta cambios.

| Puerta | Criterio |
| --- | --- |
| Software | Un revisor clona/ejecuta comandos; CI pasa; entradas inválidas y fallos API/datos probados; sin secretos |
| ML | Divisiones registradas; preprocessing ajustado solo en train; baseline; métricas y errores independientes aunque el modelo falle |
| Recuperación | Mínimo 50 consultas etiquetadas de desarrollo y 30 de test final no usadas; responder/no responder, fuentes obsoletas/conflictivas e inputs inválidos; sin tuning sobre test |
| Respuestas | Evaluar manualmente exactitud, soporte de citas y abstención por separado; objetivo 90% soporte entre afirmaciones factuales y 80% abstención correcta en preguntas sin respuesta |
| Herramientas | Denegar todo intento de escritura protegida del conjunto definido sin aprobación válida; probar aprobación alterada/reutilizada e inyección; cero éxitos en esta muestra no prueba seguridad general |
| Operación | Percentiles de latencia, costo, errores, versiones, carga y fecha; presupuestos previos; fallo externo y rollback funcional |
| Comunicación | Explicar fallo/compromiso sin tutorial; otra persona reproduce un resultado y ve limitaciones |

Reporta denominadores y muestras. Soporte de citas = afirmaciones factuales respaldadas / afirmaciones evaluadas; sin afirmaciones, registra no aplicable, no 100%. Abstención = rechazos correctos / preguntas sin respuesta. Métricas de recuperación no prueban exactitud de respuesta. Conserva resultados por consulta, no solo promedios.

Prueba escrituras solo con fixtures aislados, identidades sintéticas y herramientas simuladas. El modelo propone; autorización y aprobación siguen fuera de él.

## Registro reutilizable

```text
Tarea y usuario:
Datos/fuente, licencia y uso permitido:
Baseline y alternativas:
Commit, dependencias, modelo/configuración y comando:
División, rúbrica, muestras y resultados:
Latencia, costo y fallos:
Limitaciones y próxima mejora:
Feedback independiente (solo si realmente se recibió):
```

Guarda inputs/reportes sin secretos ni datos personales. Para APIs alojadas, documenta variabilidad y fechas.

## Carrera desde el inicio

| Cuándo | Acción | Evidencia |
| --- | --- | --- |
| Semana 1 y mensualmente | 10 vacantes reales por región/nivel, requisitos vs preferencias | Matriz fechada y selección de nube |
| Semanal | Explicación técnica, code review o conversación | Feedback o nota, no endorsement inventado |
| Tras puerta ML | Publicar y pedir revisión práctica | Problemas de reproducción y correcciones |
| Tras despliegue | Postular si cumples; practicar Python, SQL, ML y diseño IA | Postulaciones adaptadas y brechas |
| Cada dos semanas al postular | Revisar solicitudes, entrevistas y feedback | Ajustes de CV/portafolio/roles basados en evidencia |

No optimices solo volumen. Tracker privado: URL, fecha, requisitos, coincidencias/brechas, etapa, feedback y siguiente acción. No infieras motivos de rechazo.

## CV honesto

Mejor: "Construí un asistente evaluado sobre documentación pública; medí soporte de citas en 30 consultas independientes y documenté timeout/rollback". Agrega números reales solo después de medir.

Evita "ingeniero IA de producción", "reduje costos empresariales 40%" o "ingeniero ML certificado por Stanford" si solo tienes curso y proyecto sintético. Usa emisor/nombre exactos y distingue experiencia de proyecto.

**El empleo sigue siendo incierto.** Región, experiencia, comunicación, títulos, autorización laboral y demanda influyen. El plan entrega evidencia inspeccionable, no colocación.

## Barra separada para sénior

La [auditoría EPAM](./epam-reality-check) agrega antigüedad, producción IA, integraciones y ownership con clientes. Usa la [evaluación del puente](./senior-delivery-bridge#evaluación-de-salida-basada-en-evidencia); la muestra pequeña A/B no prueba capacidad operativa sénior.

Registro privado con **habilidades demostradas, ejercicios simulados, no evaluado y externos incumplidos**. Practica diseño/incidentes en inglés y evalúa B2+ aparte. Conserva confidencialidad de clientes y pide permiso para compartir evidencia.
