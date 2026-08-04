---
sidebar_position: 2
title: "Phase 2 — Data and Automation"
---

# Phase 2: Data and Automation (Weeks 5–8)

> **Objective:** Develop data analysis and automation skills that demonstrate immediate business value. These are among the most demanded skills in AI Program Management roles.

## 🎯 Expected Outcomes

By completing this phase:
- Advanced Excel and Power Query operational
- Functional SQL for queries and reports
- Professional dashboard in Power BI
- Automated flow with Power Automate
- 2 additional projects in the portfolio

---

## Week 5: Advanced Excel and Power Query

### Objective
Master the data tools most commonly used in corporate environments.

### Main Resources

| Resource | Language | Type | Duration |
|---------|--------|------|----------|
| [Microsoft Learn: Power Query](https://learn.microsoft.com/es-es/training/modules/clean-data-power-query/) | 🇪🇸 Spanish | Learning Path | 4 hrs |
| [Excel Skills for Business (Coursera)](https://www.coursera.org/specializations/excel) | 🇬🇧 English (ES subs) | Specialization | 6 hrs |
| [Power Query Documentation](https://learn.microsoft.com/es-es/power-query/) | 🇪🇸 Spanish | Docs | Reference |
| [ExcelJet](https://exceljet.net/) | 🇬🇧 English | Tutorials | Reference |

### Daily Plan

| Day | Topic | Practice |
|-----|------|----------|
| Monday | Advanced pivot tables | Incident dataset |
| Tuesday | VLOOKUP, INDEX/MATCH, XLOOKUP | Data matching |
| Wednesday | Power Query: connect and transform | Log ETL |
| Thursday | Power Query: advanced combinations | Merge sources |
| Friday | Dashboards in Excel | Reusable template |

### 🔨 Project: Automated Security Dashboard

Create an executive dashboard that:
- Connects multiple data sources (log CSVs, mock API)
- Transforms and cleans data with Power Query
- Presents key metrics: incidents/month, resolution time, categories
- Updates automatically on refresh

**Deliverable:** Excel file + documentation in GitHub.

---

## Week 6: SQL Fundamentals

### Objective
Query databases for incident analysis and reporting.

### Main Resources

| Resource | Language | Type | Duration |
|---------|--------|------|----------|
| [SQLBolt](https://sqlbolt.com/) | 🇬🇧 English | Interactive | 4-6 hrs |
| [Khan Academy: SQL](https://www.khanacademy.org/computing/computer-programming/sql) | 🇪🇸 Spanish | Interactive | 5 hrs |
| [W3Schools SQL](https://www.w3schools.com/sql/) | 🇬🇧 English | Tutorial | Reference |
| [Microsoft Learn: Azure SQL](https://learn.microsoft.com/es-es/training/paths/azure-sql-fundamentals/) | 🇪🇸 Spanish | Learning Path | 4 hrs |
| [Mode Analytics SQL Tutorial](https://mode.com/sql-tutorial/) | 🇬🇧 English | Practical | 6 hrs |

### Daily Plan

| Day | Topic | Exercises |
|-----|------|-----------|
| Monday | SELECT, WHERE, ORDER BY | SQLBolt Lessons 1-4 |
| Tuesday | JOINs (INNER, LEFT, RIGHT) | SQLBolt Lessons 6-7 |
| Wednesday | Aggregation (COUNT, SUM, AVG, GROUP BY) | SQLBolt Lessons 10-12 |
| Thursday | Subqueries and CTEs | Mode Analytics |
| Friday | CREATE, INSERT, UPDATE | Schema design |
| Saturday | **Complete project** | — |

### 🔨 Project: Incident Tracking Database

```sql
-- Schema para gestión de incidentes de seguridad
-- Demuestra: diseño de DB, queries complejas, reporting

-- Tablas: incidents, analysts, categories, resolutions
-- Queries: KPIs mensuales, tiempo promedio de resolución,
--          top categorías, carga por analista
```

**Deliverable:**`n- Documented SQL schema
- 10+ useful reporting queries
- README explaining the design
- GitHub repository

---

## Week 7: Power BI

### Objective
Create executive visualizations that communicate data insights.

### Main Resources

| Resource | Language | Type | Duration |
|---------|--------|------|----------|
| [Microsoft Learn: Power BI](https://learn.microsoft.com/es-es/training/paths/create-use-analytics-reports-power-bi/) | 🇪🇸 Spanish | Learning Path | 8 hrs |
| [Power BI: Prepare and visualize data](https://learn.microsoft.com/es-es/training/paths/prepare-visualize-data-power-bi/) | 🇪🇸 Spanish | Learning Path | 6 hrs |
| [Guy in a Cube (YouTube)](https://www.youtube.com/@GuyInACube) | 🇬🇧 English | Videos | Reference |
| [SQLBI: DAX Fundamentals](https://www.sqlbi.com/learn/introduction-to-dax/) | 🇬🇧 English | Course | 4 hrs |

### Daily Plan

| Day | Topic | Practice |
|-----|------|----------|
| Monday | Installation, data connection, first report | MS Learn Mod 1 |
| Tuesday | Visualizations: charts, tables, KPIs | MS Learn Mod 2 |
| Wednesday | Basic DAX: measures and calculated columns | SQLBI intro |
| Thursday | Data modeling and relationships | Security dataset |
| Friday | Publishing and sharing | Power BI Service |
| Saturday | **Final project** | — |

### 🔨 Project: Executive Security Metrics Dashboard

Power BI dashboard showing:
- Executive summary of security posture
- Incident trends (month over month)
- Risk category heat map
- Response SLAs (actual vs. target)
- Drill-down by team/region

**Deliverable:**`n- Published .pbix file
- Screenshots in GitHub portfolio
- Data model documentation

---

## Week 8: Automation with Power Automate

### Objective
Create automated workflows that eliminate repetitive manual tasks.

### Main Resources

| Resource | Language | Type | Duration |
|---------|--------|------|----------|
| [Microsoft Learn: Power Automate](https://learn.microsoft.com/es-es/training/paths/automate-process-power-automate/) | 🇪🇸 Spanish | Learning Path | 6 hrs |
| [Power Automate Documentation](https://learn.microsoft.com/es-es/power-automate/) | 🇪🇸 Spanish | Docs | Reference |
| [Power Automate in a Day](https://learn.microsoft.com/es-es/power-automate/guidance/planning/introduction) | 🇪🇸 Spanish | Workshop | 8 hrs |
| [Reza Dorrani (YouTube)](https://www.youtube.com/@RezaDorrani) | 🇬🇧 English | Tutorials | Reference |

### Daily Plan

| Day | Topic | Practice |
|-----|------|----------|
| Monday | Introduction, triggers, actions | Email → Excel flow |
| Tuesday | Conditions, loops, variables | Business logic |
| Wednesday | Connectors: SharePoint, Teams, Outlook | M365 integration |
| Thursday | HTTP connector and APIs | Connect external service |
| Friday | Error handling and monitoring | Robust flow |
| Saturday | **Final project** | — |

### 🔨 Project: Automated Ticket Reporting Flow

Automation that:
1. Detects new security tickets (trigger)
2. Classifies by priority (condition)
3. Notifies the right team (Teams)
4. Updates dashboard (Excel/SharePoint)
5. Generates automatic weekly report (email)

**Deliverable:**
- Documented flow with screenshots
- Architecture diagram
- README in GitHub

---

## 📋 Phase 2 Checklist

- [ ] Excel: Power Query mastered
- [ ] Security dashboard in Excel created
- [ ] SQL: complex queries functional
- [ ] Incident database designed
- [ ] Power BI: executive dashboard published
- [ ] Power Automate: ticket flow operational
- [ ] 4 new projects in GitHub portfolio
- [ ] AZ-900 completed (if not done in week 4)

## 🔗 Resume Value

After this phase, you can say:
> "I designed and implemented executive security dashboards using Power BI and SQL, automated reporting flows that reduced manual time by 60%, and created data pipelines with Power Query."

## ⏭️ Next Phase

[Phase 3: Modern Cybersecurity →](../cybersecurity/overview)
