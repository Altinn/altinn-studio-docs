---
title: PDF
description: Hvordan konfigurere generering av PDF.
weight: 50
---

Det er mulig å ekskludere enkelte komponenter, eller hele sider fra å bli med i pdf. Dette kan konfigureres i `Settings.json` under `App/ui`.

## Ekskludere sider

Her vil sidene spesifisert i `pages.excludeFromPdf` bli ekskludert fra pdf. Om denne array'en ikke settes i repo så vil alle sidene bli med.

```json {linenos=false,hl_lines=["3-5"]}
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
  "pages": {
    "excludeFromPdf": ["side2"]
  }
}
```

## Ekskludere komponenter

Komponenter spesifisert i `components.excludeFromPdf` vil blir ekskludert fra pdf. I dette eksempelet vil komponenten med id _image-component-id_ bli ekskludert fra pdf.

```json {linenos=false,hl_lines=["3-5"]}
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
  "components": {
    "excludeFromPdf": ["image-component-id"]
  }
}
```
