---
sidebar_position: 3
title: "Fase 3 — Ciberseguridad Moderna"
---

# Fase 3: Ciberseguridad Moderna (Semanas 13–16)

> **Objetivo:** Capitalizar la experiencia forense para seguridad AI empresarial, con foco en arquitectura (AZ-305) y seguridad cloud+AI (SC-500/SC-900 segun ruta vigente).

## 🎯 Resultados Esperados

Al completar esta fase:
- Comprensión de SOC moderno y detección de amenazas
- Threat modeling aplicado a sistemas AI
- Identidad y Zero Trust implementados
- Preparacion de certificacion alineada a ruta v4 (AZ-305 + SC-500 como prioridad)
- Experiencia forense reposicionada como ventaja competitiva

---

## Semana 9: SOC Fundamentals y Operaciones de Seguridad

### Objetivo
Entender cómo funciona un Security Operations Center moderno y cómo AI lo está transformando.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [Microsoft Learn: Security Operations](https://learn.microsoft.com/es-es/training/paths/security-ops-sentinel/) | 🇪🇸 Español | Learning Path | 6 hrs |
| [SC-200 Training](https://learn.microsoft.com/es-es/training/paths/sc-200-mitigate-threats-using-microsoft-365-defender/) | 🇪🇸 Español | Learning Path | 8 hrs |
| [SANS SOC Fundamentals](https://www.sans.org/cyber-security-courses/security-operations-center-soc/) | 🇬🇧 Inglés | Overview | Referencia |
| [Microsoft Sentinel Documentation](https://learn.microsoft.com/es-es/azure/sentinel/) | 🇪🇸 Español | Docs | Referencia |
| [Blue Team Labs Online](https://blueteamlabs.online/) | 🇬🇧 Inglés | Labs prácticos | 4-6 hrs |

### Plan Diario

| Día | Tema | Recurso |
|-----|------|---------|
| Lunes | Roles en SOC, niveles de analista | MS Learn Security Ops |
| Martes | SIEM/SOAR: Microsoft Sentinel | Sentinel docs + labs |
| Miércoles | Detección de amenazas, alertas, KQL básico | MS Learn KQL |
| Jueves | Incident response workflow moderno | Blue Team Labs |
| Viernes | AI en SOC: automatización de detección | Investigar herramientas AI |

### Conexión con Forensics

| Tu Experiencia | Evolución Moderna |
|---------------|-------------------|
| Análisis post-mortem | Real-time detection con SIEM |
| Recuperación de evidencia | Digital forensics en cloud |
| Cadena de custodia | Automated evidence collection |
| Reportes de investigación | Incident response playbooks |

---

## Semana 10: Threat Modeling

### Objetivo
Modelar amenazas para sistemas modernos, incluyendo sistemas AI.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [Microsoft Threat Modeling Tool](https://learn.microsoft.com/es-es/azure/security/develop/threat-modeling-tool) | 🇪🇸 Español | Tool + docs | 4 hrs |
| [STRIDE Methodology](https://learn.microsoft.com/es-es/azure/security/develop/threat-modeling-tool-threats) | 🇪🇸 Español | Framework | 2 hrs |
| [OWASP Threat Modeling](https://owasp.org/www-community/Threat_Modeling) | 🇬🇧 Inglés | Guide | 3 hrs |
| [AI/ML Threat Modeling (MITRE ATLAS)](https://atlas.mitre.org/) | 🇬🇧 Inglés | Framework | 4 hrs |
| [Threat Modeling Manifesto](https://www.threatmodelingmanifesto.org/) | 🇬🇧 Inglés | Principles | 1 hr |

### Plan Diario

| Día | Tema | Práctica |
|-----|------|----------|
| Lunes | STRIDE framework | Modelar app web tradicional |
| Martes | Attack Trees | Diagramar vectores de ataque |
| Miércoles | MITRE ATT&CK basics | Mapear técnicas a defensas |
| Jueves | MITRE ATLAS (AI threats) | Amenazas específicas de AI |
| Viernes | **Proyecto** | Threat model completo |

### 🔨 Proyecto: Threat Model para AI Chatbot Corporativo

Modelar amenazas para un chatbot empresarial con AI:

**Amenazas STRIDE aplicadas a AI:**
- **Spoofing:** Impersonación de usuarios en el chat
- **Tampering:** Prompt injection, data poisoning
- **Repudiation:** Falta de audit trail en conversaciones
- **Information Disclosure:** Leakage de datos confidenciales
- **Denial of Service:** Abuse del modelo, token exhaustion
- **Elevation of Privilege:** Jailbreak del modelo

**Entregable:**
- Diagrama de amenazas (draw.io o similar)
- Documento con mitigaciones propuestas
- Mapeo a MITRE ATLAS
- Repositorio en GitHub

---

## Semana 11: Identidad y Zero Trust

### Objetivo
Dominar los fundamentos de identidad moderna y arquitectura Zero Trust.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [Microsoft Zero Trust Guidance](https://learn.microsoft.com/es-es/security/zero-trust/) | 🇪🇸 Español | Framework | 4 hrs |
| [Microsoft Entra ID Documentation](https://learn.microsoft.com/es-es/entra/fundamentals/) | 🇪🇸 Español | Docs | 6 hrs |
| [NIST Zero Trust Architecture (SP 800-207)](https://csrc.nist.gov/pubs/sp/800/207/final) | 🇬🇧 Inglés | Standard | 3 hrs |
| [Microsoft Learn: Identity & Access](https://learn.microsoft.com/es-es/training/paths/describe-azure-identity-access-security/) | 🇪🇸 Español | Learning Path | 4 hrs |

### Plan Diario

| Día | Tema | Práctica |
|-----|------|----------|
| Lunes | Zero Trust principles: Never trust, always verify | MS Zero Trust docs |
| Martes | MFA, Conditional Access policies | Entra ID labs |
| Miércoles | Identity governance, privileged access | PIM, access reviews |
| Jueves | Zero Trust for AI systems | Cómo aplicar ZT a AI workloads |
| Viernes | Zero Trust assessment | Evaluar escenario empresarial |

### 🔨 Proyecto: Zero Trust Assessment para Organización Ficticia

Crear un assessment de Zero Trust que incluya:
- Evaluación del estado actual (score 1-5 por pilar)
- Gaps identificados
- Roadmap de implementación
- Quick wins vs. long-term improvements
- Consideraciones especiales para AI/ML workloads

**Pilares evaluados:**
1. Identidad
2. Endpoints
3. Aplicaciones
4. Datos
5. Infraestructura
6. Red

---

## Semana 12: Certificación de seguridad (ruta v4)

### Objetivo
Consolidar conocimientos y calendarizar la certificacion que mejor soporte los loops activos: SC-500 (prioridad) o SC-900 (fundamentos).

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [Cloud and AI Security Engineer Associate](https://learn.microsoft.com/en-us/credentials/certifications/cloud-and-ai-security-engineer-associate/) | 🇬🇧 Inglés | Cert page | 1 hr |
| [SC-500 Study Guide](https://aka.ms/SC500-StudyGuide) | 🇬🇧 Inglés | Guía oficial | Referencia |
| [SC-900 Learning Path](https://learn.microsoft.com/es-es/training/paths/describe-concepts-of-security-compliance-identity/) | 🇪🇸 Español | Ruta fundamentos | 6-8 hrs |
| [AZ-305 Study Guide](https://aka.ms/AZ305-StudyGuide) | 🇬🇧 Inglés | Arquitectura | Referencia |

### Plan Diario

| Día | Ruta | Tema |
|-----|---------------|------|
| Lunes | SC-500 | Manage identity, access, and governance |
| Martes | SC-500 | Secure storage, databases, and networking |
| Miércoles | SC-500 | Secure compute |
| Jueves | SC-500 | Manage and monitor security posture |
| Viernes | Decision gate | SC-500 vs SC-900 segun readiness y disponibilidad |
| Sábado | Examen | Ejecutar certificacion seleccionada |

### Certificación: SC-500 (prioridad) / SC-900 (fallback)

- **Costo:** Precio por region (Pearson Vue)
- **Idioma del examen:** Validar segun cert seleccionada
- **Formato:** Proctored; validar duracion segun examen
- **Puntuación para pasar:** 700/1000
- **Regla v4:** priorizar la certificacion que fortalezca la historia tecnica para entrevistas activas, no acumular certs por volumen.

---

## 📋 Checklist de Fase 3

- [ ] SOC operations entendido
- [ ] KQL básico funcional
- [ ] Threat model para AI system completado
- [ ] MITRE ATLAS explorado
- [ ] Zero Trust principles dominados
- [ ] Zero Trust assessment creado
- [ ] Decision gate de certificacion ejecutado (SC-500 o SC-900)
- [ ] Certificacion de seguridad seleccionada calendarizada o completada
- [ ] Portfolio actualizado con proyectos de security

## Operacion v4

- [Checkpoint Gates v4](../checkpoints)
- [Template de Evidencia v4](../evidence-template)
- [Weekly Tracker v4](../weekly-tracker)

## 🔗 Valor para el CV

Después de esta fase:
> "Profesional de ciberseguridad aplicado a AI, con experiencia en threat modeling para sistemas agenticos (STRIDE + MITRE ATLAS), implementacion de Zero Trust architecture y narrativa fuerte de seguridad cloud+AI para entornos enterprise."

## ⏭️ Siguiente Fase

[Fase 4: AI para Negocios e IT →](../ai-business/overview)
