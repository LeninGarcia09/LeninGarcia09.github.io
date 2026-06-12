---
sidebar_position: 3
title: "Fase 3 — Ciberseguridad Moderna"
---

# Fase 3: Ciberseguridad Moderna (Semanas 9–12)

> **Objetivo:** Capitalizar la experiencia previa en informática forense y llevarla al nivel de ciberseguridad moderna con Zero Trust, SOC operations, y preparación para SC-900.

## 🎯 Resultados Esperados

Al completar esta fase:
- Comprensión de SOC moderno y detección de amenazas
- Threat modeling aplicado a sistemas AI
- Identidad y Zero Trust implementados
- Certificación SC-900 obtenida
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

## Semana 12: Preparación y Certificación SC-900

### Objetivo
Consolidar conocimientos y obtener la certificación SC-900.

### Recursos Principales

| Recurso | Idioma | Tipo | Duración |
|---------|--------|------|----------|
| [Microsoft Learn: SC-900](https://learn.microsoft.com/es-es/training/paths/describe-concepts-of-security-compliance-identity/) | 🇪🇸 Español | Learning Path | 8 hrs |
| [SC-900 Study Guide](https://learn.microsoft.com/es-es/credentials/certifications/security-compliance-and-identity-fundamentals/) | 🇪🇸 Español | Guía oficial | Referencia |
| [John Savill SC-900 Study Cram](https://www.youtube.com/watch?v=Bz-8jM3jg-8) | 🇬🇧 Inglés | Video | 2 hrs |
| [MeasureUp SC-900 Practice](https://www.measureup.com/sc-900-microsoft-security-compliance-and-identity-fundamentals.html) | 🇬🇧 Inglés | Practice exam | 2 hrs |

### Plan Diario

| Día | Módulo SC-900 | Tema |
|-----|---------------|------|
| Lunes | Módulo 1 | Conceptos de seguridad, compliance e identidad |
| Martes | Módulo 2 | Capacidades de Microsoft Entra |
| Miércoles | Módulo 3 | Capacidades de soluciones de seguridad Microsoft |
| Jueves | Módulo 4 | Capacidades de Microsoft compliance |
| Viernes | Repaso | Exámenes de práctica |
| Sábado | **Examen** | SC-900 |

### Certificación: SC-900

- **Costo:** $99 USD
- **Idioma del examen:** Disponible en español
- **Formato:** 40-60 preguntas, 45 minutos
- **Puntuación para pasar:** 700/1000
- **Dominios:**
  - Security, compliance, and identity concepts (10-15%)
  - Microsoft Entra capabilities (25-30%)
  - Microsoft security solutions capabilities (25-30%)
  - Microsoft compliance solutions capabilities (25-30%)

---

## 📋 Checklist de Fase 3

- [ ] SOC operations entendido
- [ ] KQL básico funcional
- [ ] Threat model para AI system completado
- [ ] MITRE ATLAS explorado
- [ ] Zero Trust principles dominados
- [ ] Zero Trust assessment creado
- [ ] SC-900 Learning Path completado
- [ ] **Certificación SC-900 obtenida**
- [ ] Portfolio actualizado con proyectos de security

## 🔗 Valor para el CV

Después de esta fase:
> "Profesional de ciberseguridad con certificaciones AZ-900 y SC-900, experiencia en threat modeling para sistemas AI (STRIDE + MITRE ATLAS), implementación de Zero Trust architecture, y operaciones SOC modernas con Microsoft Sentinel."

## ⏭️ Siguiente Fase

[Fase 4: AI para Negocios e IT →](../ai-business/overview)
