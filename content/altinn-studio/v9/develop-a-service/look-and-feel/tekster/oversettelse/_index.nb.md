---
title: Oversette tekster i appen
description: Slik lar du brukeren velge språk for tekstene i appen.
toc: true
---

Du oversetter tekstene i appen ved å legge til flere tekstressursfiler – én fil per språk. Se {{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/tekster" >}} for mer om disse filene.

Under ser du et eksempel på norsk og engelsk:

`resource.nb.json`:

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

`resource.en.json`:

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

## Aktivere språkvelgeren

For at brukeren skal kunne velge språk i appen, må du legge til feltet `showLanguageSelector` i `Settings.json` og sette det til `true`. Da viser appen en nedtrekksmeny der brukeren kan velge språk.

I tillegg må du definere tekstene fra eksemplet over, slik at nedtrekksmenyen viser de riktige tekstene:

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

Hvis appen har flere layoutsett og du vil la brukeren oversette alle sidene, må du legge til `showLanguageSelector` i alle `Settings.json`-filene.
