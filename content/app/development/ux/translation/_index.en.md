---
title: Oversettelse av tekster
description: Hvordan oversette tekster i applikasjonen.
toc: true
weight: 40
tags: [translate-to-english]
---

Selve logikken rundt oversettelse av tekster benytter seg av tekst-ressursfiler. Se [Tekster](../texts/_index.en.md) for mer informasjon om disse filene.
Det er mulig å oversette tekster i applikasjonen ved å legge til flere tekst-ressursfiler. Altså én fil per språk.
Under kan man se et eksempel på norsk og engelsk:

`resource.nb.json`

```json
{
    "language": "nb",
    "languageDescription": "Norsk bokmål",
    "dropdownLabel": "Språk",
    "resources": [...]
    ...
}
```

`resource.en.json`

```json
{
    "language": "en",
    "languageDescription": "English",
    "dropdownLabel": "Language",
    "resources": [...]
    ...
}
```

## Aktivere oversettelse

For å kunne utføre oversettelse av tekster i applikasjonen må komponenten aktiveres.
Ved å legge til feltet `showLanguageDropdown` og sette feletet til `true` i `settings.json` vil en nedtreksmeny være tilgjengelig i applikasjonen.

```json
{
    "$schema": "https://altinncdn.no/schemas/json/layout/layoutSettings.schema.v1.json",
    "components": {
      "excludeFromPdf": [...]
    },
    "pages": {
      "order": [...],
      "showLanguageDropdown": true
    }
}
```
