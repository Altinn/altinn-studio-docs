---
title: PDF
description: How to configure the generation of PDF.
weight: 50
---

## Exclude pages

It is possible to configure which pages one want to include in the generated PDF using `Settings.json` under `App/ui/`. This is done using:

```json
{
  "pages": {
    "excludeFromPdf": ["side2"]
  }
}
```

Here the pages specified in `pages.excludeFromPdf` will be excluded from pdf. If this array is not defined, all pages will be generated.

