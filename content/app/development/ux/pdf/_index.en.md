---
title: PDF
description: How to configure the generation of PDF.
weight: 50
---

It is possible to exclude components, or entire pages from being a part of the pdf generation. This is done by configuring `Settings.json` under `App/ui`.

## Exclude pages

Here the pages specified in `pages.excludeFromPdf` will be excluded from pdf. If this array is not defined, all pages will be generated.

```json
{
  "pages": {
    "excludeFromPdf": ["side2"]
  }
}
```

## Exclude components

Components specified in `components.excludeFromPdf` will be excluded from pdf. In this example, the component with id _image-component-id_ will be excluded from pdf.

```json {linenos=false,hl_lines=["3-5"]}
{
  "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
  "components": {
    "excludeFromPdf": ["image-component-id"]
  }
}
```
