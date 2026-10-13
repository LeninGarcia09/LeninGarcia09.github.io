---
sidebar_position: 7
title: "Revisión de referencia y verificación"
---

# Revisión de AI Engineering from Scratch

**Consultado el 13 de octubre de 2026:** [README](https://github.com/rohitg00/ai-engineering-from-scratch), [ROADMAP](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/ROADMAP.md) y [Career Practice](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md). Es revisión curricular, **no auditoría de código ni verificación de cada lección**. Los enlaces siguen main, que cambia.

## Qué conservar

README prioriza implementar, probar e inspeccionar y ofrece Retrieval Evaluation Lab, Agent Trace Debugger y Tool Call Firewall. Career Practice ya recomienda **un proyecto coherente, prerrequisitos, criterio de producto, feedback y evidencia sin garantía de empleo**.

Conservamos estas ideas; no afirmamos que la referencia carezca de proyectos, rutas de carrera u operación.

| Observación | Adaptación propuesta |
| --- | --- |
| Veinte fases cubren matemáticas, ML, visión, audio, transformers, agentes, infraestructura y alineación | Separar por nivel/rol; no exigir todas las especialidades para aplicaciones |
| Python, TypeScript, Rust y Julia | A empieza con Python + SQL; otros lenguajes por vacante |
| ROADMAP muestra ~332 horas arriba y ~1.081 al final, incluyendo ~620 de capstones | Estimaciones internamente inconsistentes; publicar presupuesto propio con proyecto/revisión |
| README anuncia 528 lecciones; footer ROADMAP dice 523 | No usar conteos como métrica de finalización |
| Career Practice excluye proyecto/revisión de los minutos guiados | Incluirlos en presupuesto y avanzar por puertas |
| Páginas revisadas enfatizan implementación/rutas, no secuencia de selección de exámenes oficiales | Agregar verificación actual, distinciones de credenciales y selección de una nube |

**Inferencia:** acotar prerrequisitos debería reducir trabajo innecesario para aplicaciones. No medimos tiempo ni contratación frente al original.

## Lecciones seleccionadas

Son referencia, **no otro curso completo obligatorio**. Consulta README/ROADMAP para lecciones adyacentes y requisitos.

| Etapa | Fuente | Uso |
| --- | --- | --- |
| Configuración | [Fase 0](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/phases/00-setup-and-tooling) | Git, entornos, APIs, Docker y debugging |
| Evaluación ML | [Model evaluation](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/02-ml-fundamentals/09-model-evaluation/docs/en.md) | Divisiones, métricas y baselines |
| Recuperación | [RAG](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/11-llm-engineering/06-rag/docs/en.md), [laboratorio](https://github.com/rohitg00/ai-engineering-from-scratch/tree/main/projects/retrieval-evaluation-lab) | Implementación y regresiones por consulta |
| Agentes | [Bucle](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/01-the-agent-loop/docs/en.md), [fallos](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/14-agent-engineering/26-failure-modes-agentic/docs/en.md) | Runtime acotado antes de multiagentes |
| Contratos | [Tool schema](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/13-tools-and-protocols/05-tool-schema-design/docs/en.md) | Validación y límites de confianza |
| Operación | [Seguridad/secretos/auditoría](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/phases/17-infrastructure-and-production/25-security-secrets-audit/docs/en.md) | Minimización de datos y evidencia |
| Carrera | [Career Practice](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/learning-paths/CAREER-PRACTICE.md) | Un proyecto, reproducción y feedback |

Firewall Rust y debugger TypeScript son electivas, no requisitos de A. README limita sus demostraciones; no son autorización completa ni sandbox.

## Registro de fuentes primarias

| Fuente | Hecho soportado | Límite |
| --- | --- | --- |
| [CS50P](https://cs50.harvard.edu/python/) y [CS50 SQL](https://cs50.harvard.edu/sql/) | OpenCourseWare gratuito y contenidos de Python/pruebas/datos | Confirmar términos de certificados |
| [ML Specialization](https://www.coursera.org/specializations/machine-learning-introduction) | Tres cursos Stanford Online/DeepLearning.AI y alcance ML | Sin resultado laboral independiente; checkout cambia |
| [fast.ai](https://course.fast.ai/) | Gratis para programadores, grabaciones Part 1 de 2022 | APIs/paquetes pueden requerir documentación actual |
| [Hugging Face](https://huggingface.co/learn/llm-course/en/chapter1/1) | Gratis; recomienda Python y deep learning inicial | Lectura seleccionada no es finalización |
| [AI-103](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/) y [guía](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103) | Rol Python/Foundry y dominios del examen | Reverificar agenda, idioma, precio y práctica |
| [Azure AI Engineer retirado](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/) | Certificación y renovación retiradas | Material antiguo no es temario actual |
| [AWS ML Associate](https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/) | Fin C01 inglés y transición C02 beta | No asumir GA ni tiempos de resultados |
| [Google ML Engineer](https://cloud.google.com/learn/certification/machine-learning-engineer) | Datos/pipelines/MLOps y programación no evaluada directamente | Demanda regional y preparación individual no establecidas |

Todas consultadas el **2026-10-13**. Sustentan cobertura técnica, **no ranking estadístico de valor para empleadores**.

## Mercado e incertidumbre

Los perfiles de Microsoft/Google apoyan habilidades seleccionadas, pero **no son estudio representativo del mercado laboral**. No contamos con muestra regional verificada ni evidencia causal de credencial a empleo para esta persona. **Evidencia insuficiente** para prometer prima salarial, probabilidad de contratación o mejor certificación universal.

Usa el [método de vacantes](./portfolio-career#carrera-desde-el-inicio): nivel, región, fecha, Python/SQL/ML/datos/nube y credenciales requeridas/preferidas. Revisa mensualmente; certificado no implica elegibilidad sénior.

Reverifica exámenes antes de pagar y trimestralmente; registra fuente, fecha y cambios. Es una secuencia original que referencia el trabajo upstream sin copiar sus lecciones ni afirmar endorsement.

## Evidencia posterior de empleadores

La [auditoría EPAM](./epam-reality-check), también del 13-oct-2026, añade cuatro vacantes verificadas. Resuelve ausencia de muestra concreta para esos roles, **no** ausencia de datos regionales representativos ni evidencia causal credencial/empleo. El [puente](./senior-delivery-bridge) atiende brechas explícitas; preparación individual exige evaluación.
