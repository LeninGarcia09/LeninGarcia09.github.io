---
sidebar_position: 5
title: "Reto 4 — Detección de PII (DLP) con Presidio"
---

# Reto 4: Pipeline de detección y anonimización de PII con Presidio

> **Herramienta:** [Presidio](https://github.com/data-privacy-stack/presidio) (open source, MIT) · **Marcos:** GDPR / LFPDPPP · **Tiempo:** 3–4 h

:::tip Qué vas a construir
Un **pipeline de clasificación de datos**: detecta datos personales (PII) en texto — nombres, correos, teléfonos, tarjetas, CURP/RFC — y los **anonimiza** automáticamente. Es el corazón de un programa de DLP y clasificación de datos.
:::

**Dónde ejecutas esto:** en tu máquina, dentro del entorno del [Paso 0](./overview#️-paso-0--entorno-aislado-una-sola-vez-5-min). Presidio dejó de ser un proyecto de Microsoft y hoy es mantenido por la comunidad ([data-privacy-stack](https://data-privacy-stack.github.io/presidio/)) — 100% abierto.

## Por qué importa para el empleo

La JD de BBVA pide *"identificación y clasificación de datos sensibles (PII) con herramientas automatizadas (DLP, BigID, Varonis)"* y *"salvaguarda de información confidencial según normativa"*. La de MAPFRE pide *"cumplimiento en protección de datos"*. Este reto te da un DLP funcional que **puedes demostrar en vivo** en la entrevista, sin licencias caras.

## Pasos

```bash
# 1. Instala Presidio (analyzer + anonymizer) y el modelo de lenguaje de spaCy
python -m pip install presidio-analyzer presidio-anonymizer
python -m spacy download en_core_web_lg
# Para español: python -m spacy download es_core_news_lg
```

<details>
<summary>Script mínimo: detectar + anonimizar PII</summary>

```python
# dlp.py — detecta y anonimiza PII en un texto
from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine

analyzer = AnalyzerEngine()
anonymizer = AnonymizerEngine()

texto = "Contacta a Ana Pérez en ana.perez@example.com o al +52 55 1234 5678."

# 1. Detectar
resultados = analyzer.analyze(text=texto, language="en")
for r in resultados:
    print(r.entity_type, texto[r.start:r.end], round(r.score, 2))

# 2. Anonimizar
anonimizado = anonymizer.anonymize(text=texto, analyzer_results=resultados)
print(anonimizado.text)   # -> Contacta a <PERSON> en <EMAIL_ADDRESS> o al <PHONE_NUMBER>.
```

> La API oficial y reconocedores personalizados están en la [documentación de Presidio](https://data-privacy-stack.github.io/presidio/).
</details>

<details>
<summary>Extiende: reconocedor personalizado para RFC/CURP (México)</summary>

Presidio permite añadir reconocedores por **regex** para identificadores locales que no trae de fábrica (ej. RFC, CURP, CLABE). Crea un `PatternRecognizer` con el patrón correspondiente y regístralo en el `AnalyzerEngine`. Documentar este paso demuestra que entiendes **contexto regulatorio local** (LFPDPPP) — un gran diferenciador para roles en LATAM.

</details>

## 📦 Entregable

Un repositorio `pii-dlp-pipeline/` con:

1. `README.md` — qué tipos de PII detecta y para qué normativa (GDPR/LFPDPPP).
2. `dlp.py` — el pipeline de detección + anonimización.
3. `samples/` — textos de entrada (ficticios) y su salida anonimizada.
4. Al menos **un reconocedor personalizado** (RFC, CURP o similar) con su justificación.
5. Un breve mapa: *tipo de PII → riesgo regulatorio → acción de tratamiento*.

## ✅ Criterios de éxito

- [ ] Detectas al menos **4 tipos de PII** distintos.
- [ ] Anonimizas correctamente (redacción o reemplazo por token).
- [ ] Añadiste **1 reconocedor personalizado** local (RFC/CURP/CLABE).
- [ ] Explicaste el vínculo con **GDPR o LFPDPPP** en el README.

:::warning Usa datos ficticios
Nunca proceses PII real de personas sin base legal y consentimiento. Para este reto usa **datos sintéticos/ficticios** que tú generes.
:::

---

**Anterior:** [← Reto 3](./challenge-03) · **Volver al** [inicio del track](./overview)

## 🎓 Terminaste el track — ¿ahora qué?

1. Publica los **4 repos** en tu GitHub y fíjalos (pin) en tu perfil.
2. Escribe **1 post de LinkedIn por reto** explicando qué aprendiste (esto genera visibilidad con reclutadores).
3. Añade la [línea de CV](./overview#-valor-para-el-cv) a tu currículum.
4. Prepara una **demo de 5 minutos** de tu favorito para entrevistas.
