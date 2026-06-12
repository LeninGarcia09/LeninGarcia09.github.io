---
sidebar_position: 2
title: "Fase 2 — Datos y Automatización"
---

# Fase 2: Datos y Automatización (Semanas 5–8)

> **Objetivo:** Desarrollar habilidades de análisis de datos y automatización que demuestren valor empresarial inmediato. Estas son las skills más demandadas en roles de AI Program Management.

## 🎯 Resultados Esperados

Al completar esta fase:
- Excel avanzado y Power Query operativos
- SQL funcional para consultas y reportes
- Dashboard profesional en Power BI
- Flujo automatizado con Power Automate
- 2 proyectos adicionales en el portfolio

---

## Semana 5: Excel Avanzado y Power Query

### Objetivo
Dominar las herramientas de datos más usadas en entornos corporativos.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [Microsoft Learn: Power Query](https://learn.microsoft.com/es-es/training/modules/clean-data-power-query/) | 🇪🇸 Español | Learning Path | 4 hrs |
| [Excel Skills for Business (Coursera)](https://www.coursera.org/specializations/excel) | 🇬🇧 Inglés (subs ES) | Specialization | 6 hrs |
| [Power Query Documentation](https://learn.microsoft.com/es-es/power-query/) | 🇪🇸 Español | Docs | Referencia |
| [ExcelJet](https://exceljet.net/) | 🇬🇧 Inglés | Tutoriales | Referencia |

### Plan Diario

| Día | Tema | Práctica |
|-----|------|----------|
| Lunes | Tablas dinámicas avanzadas | Dataset de incidentes |
| Martes | VLOOKUP, INDEX/MATCH, XLOOKUP | Cruce de datos |
| Miércoles | Power Query: conectar y transformar | ETL de logs |
| Jueves | Power Query: combinaciones avanzadas | Merge de fuentes |
| Viernes | Dashboards en Excel | Template reutilizable |

### 🔨 Proyecto: Dashboard de Seguridad Automatizado

Crear un dashboard ejecutivo que:
- Conecte múltiples fuentes de datos (CSV de logs, API mock)
- Transforme y limpie datos con Power Query
- Presente métricas clave: incidentes/mes, tiempo de resolución, categorías
- Se actualice automáticamente al refrescar

**Entregable:** Archivo Excel + documentación en GitHub.

---

## Semana 6: SQL Fundamentals

### Objetivo
Consultar bases de datos para análisis de incidentes y reporting.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [SQLBolt](https://sqlbolt.com/) | 🇬🇧 Inglés | Interactivo | 4-6 hrs |
| [Khan Academy: SQL](https://www.khanacademy.org/computing/computer-programming/sql) | 🇪🇸 Español | Interactivo | 5 hrs |
| [W3Schools SQL](https://www.w3schools.com/sql/) | 🇬🇧 Inglés | Tutorial | Referencia |
| [Microsoft Learn: Azure SQL](https://learn.microsoft.com/es-es/training/paths/azure-sql-fundamentals/) | 🇪🇸 Español | Learning Path | 4 hrs |
| [Mode Analytics SQL Tutorial](https://mode.com/sql-tutorial/) | 🇬🇧 Inglés | Práctico | 6 hrs |

### Plan Diario

| Día | Tema | Ejercicios |
|-----|------|-----------|
| Lunes | SELECT, WHERE, ORDER BY | SQLBolt Lessons 1-4 |
| Martes | JOINs (INNER, LEFT, RIGHT) | SQLBolt Lessons 6-7 |
| Miércoles | Aggregation (COUNT, SUM, AVG, GROUP BY) | SQLBolt Lessons 10-12 |
| Jueves | Subqueries y CTEs | Mode Analytics |
| Viernes | CREATE, INSERT, UPDATE | Diseño de schema |
| Sábado | **Proyecto completo** | — |

### 🔨 Proyecto: Base de Datos de Tracking de Incidentes

```sql
-- Schema para gestión de incidentes de seguridad
-- Demuestra: diseño de DB, queries complejas, reporting

-- Tablas: incidents, analysts, categories, resolutions
-- Queries: KPIs mensuales, tiempo promedio de resolución,
--          top categorías, carga por analista
```

**Entregable:** 
- Schema SQL documentado
- 10+ queries útiles para reporting
- README explicando el diseño
- Repositorio en GitHub

---

## Semana 7: Power BI

### Objetivo
Crear visualizaciones ejecutivas que comuniquen insights de datos.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [Microsoft Learn: Power BI](https://learn.microsoft.com/es-es/training/paths/create-use-analytics-reports-power-bi/) | 🇪🇸 Español | Learning Path | 8 hrs |
| [Power BI Guided Learning](https://learn.microsoft.com/es-es/power-bi/guided-learning/) | 🇪🇸 Español | Tutorial | 6 hrs |
| [Guy in a Cube (YouTube)](https://www.youtube.com/@GuyInACube) | 🇬🇧 Inglés | Videos | Referencia |
| [SQLBI: DAX Fundamentals](https://www.sqlbi.com/learn/introduction-to-dax/) | 🇬🇧 Inglés | Curso | 4 hrs |

### Plan Diario

| Día | Tema | Práctica |
|-----|------|----------|
| Lunes | Instalación, conexión de datos, primer reporte | MS Learn Mod 1 |
| Martes | Visualizaciones: gráficos, tablas, KPIs | MS Learn Mod 2 |
| Miércoles | DAX básico: medidas y columnas calculadas | SQLBI intro |
| Jueves | Modelado de datos y relaciones | Dataset de seguridad |
| Viernes | Publicación y sharing | Power BI Service |
| Sábado | **Proyecto final** | — |

### 🔨 Proyecto: Executive Security Metrics Dashboard

Dashboard en Power BI que muestre:
- Resumen ejecutivo de postura de seguridad
- Tendencias de incidentes (mes a mes)
- Heat map de categorías de riesgo
- SLAs de respuesta (cumplimiento vs. target)
- Drill-down por equipo/región

**Entregable:** 
- Archivo .pbix publicado
- Screenshots en GitHub portfolio
- Documentación del modelo de datos

---

## Semana 8: Automatización con Power Automate

### Objetivo
Crear flujos de trabajo automatizados que eliminen tareas manuales repetitivas.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [Microsoft Learn: Power Automate](https://learn.microsoft.com/es-es/training/paths/automate-process-power-automate/) | 🇪🇸 Español | Learning Path | 6 hrs |
| [Power Automate Documentation](https://learn.microsoft.com/es-es/power-automate/) | 🇪🇸 Español | Docs | Referencia |
| [Power Automate in a Day](https://learn.microsoft.com/es-es/power-automate/guidance/planning/introduction) | 🇪🇸 Español | Workshop | 8 hrs |
| [Reza Dorrani (YouTube)](https://www.youtube.com/@RezaDorrani) | 🇬🇧 Inglés | Tutoriales | Referencia |

### Plan Diario

| Día | Tema | Práctica |
|-----|------|----------|
| Lunes | Introducción, triggers, actions | Flujo email → Excel |
| Martes | Condiciones, loops, variables | Lógica de negocio |
| Miércoles | Conectores: SharePoint, Teams, Outlook | Integración M365 |
| Jueves | HTTP connector y APIs | Conectar servicio externo |
| Viernes | Error handling y monitoring | Flujo robusto |
| Sábado | **Proyecto final** | — |

### 🔨 Proyecto: Flujo Automatizado de Reporting de Tickets

Automatización que:
1. Detecta nuevos tickets de seguridad (trigger)
2. Clasifica por prioridad (condición)
3. Notifica al equipo correcto (Teams)
4. Actualiza dashboard (Excel/SharePoint)
5. Genera reporte semanal automático (email)

**Entregable:**
- Flujo documentado con screenshots
- Diagrama de arquitectura
- README en GitHub

---

## 📋 Checklist de Fase 2

- [ ] Excel: Power Query dominado
- [ ] Dashboard de seguridad en Excel creado
- [ ] SQL: Queries complejas funcionales
- [ ] Base de datos de incidentes diseñada
- [ ] Power BI: Dashboard ejecutivo publicado
- [ ] Power Automate: Flujo de tickets operativo
- [ ] 4 proyectos nuevos en GitHub portfolio
- [ ] AZ-900 completado (si no se hizo en semana 4)

## 🔗 Valor para el CV

Después de esta fase, puedes decir:
> "Diseñé e implementé dashboards ejecutivos de seguridad usando Power BI y SQL, automaticé flujos de reporting que redujeron tiempo manual en un 60%, y creé pipelines de datos con Power Query."

## ⏭️ Siguiente Fase

[Fase 3: Ciberseguridad Moderna →](../cybersecurity/overview)
