---
title: Translation of texts
description: How to translate texts in the application.
toc: true
weight: 40
---

The actual logic of translating texts uses text resource files. See [Texts](../texts) for more information on these files.
It is possible to translate texts in the application by adding more text resource files. I.e. one file per language.
Below you can see an example of norwegian and english.

`resource.nb.json`

```json
{
  "language": "nb",
  "resources": [
    {
      "id": "language.selector.label",
      "value": "Språk"
    },
    {
      "id": "language.full_name.nb",
      "value": "Norsk bokmål"
    },
    {
      "id": "language.full_name.en",
      "value": "Engelsk"
    }
  ]
}
```

`resource.en.json`

```json
{
  "language": "en",
  "resources": [
    {
      "id": "language.selector.label",
      "value": "Language"
    },
    {
      "id": "language.full_name.nb",
      "value": "Norwegian bokmål"
    },
    {
      "id": "language.full_name.en",
      "value": "English"
    }
  ]
}
```

## Activate translation

To be able to perform the translation of texts in the application the component must be activated.
By adding the field `showLanguageSelector` and setting it to `true` in `settings.json` a dropdown menu will be available in the application.
In addition, the texts from the example above must be defined for the dropdown menu to be visible.

```json
{
    "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
    "components": {
      "excludeFromPdf": [...]
    },
    "pages": {
      "order": [...],
      "showLanguageSelector": true
    }
}
```

If the application contains multiple `layout-sets` and you want the opportunity to translate all pages, it is important that `showLanguageSelector` is added in all `Settings.json`.