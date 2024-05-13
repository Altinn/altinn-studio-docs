---
title: Oversettelse av tekster
description: Hvordan oversette tekster i applikasjonen.
toc: true
weight: 40
---

Selve logikken rundt oversettelse av tekster benytter seg av tekst-ressursfiler. Se [Tekster](..) for mer informasjon om disse filene.
Det er mulig å oversette tekster i applikasjonen ved å legge til flere tekst-ressursfiler. Altså én fil per språk.
Under kan man se et eksempel på norsk og engelsk:

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

## Aktivere oversettelse

For å kunne utføre oversettelse av tekster i applikasjonen må komponenten aktiveres.
Ved å legge til feltet `showLanguageSelector` og sette feletet til `true` i `Settings.json` vil en nedtreksmeny være tilgjengelig i applikasjonen.
I tillegg må tekstene fra eksemplet over være definert for at nedtreksmenyen skal vises.

```json
{
    "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
    "components": {
      "excludeFromPdf": [...]
    },
    "pages": {
      "order": [...],
      "showLanguageSelector": true
    }
}
```

Om applikasjonen inneholder flere `layout-sets` og man ønsker muligheten til å oversette alle sider er det viktig at `showLanguageSelector` legges til i alle `Settings.json`.
