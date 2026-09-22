---
draft: true
title: Oversette tekster i appen
description: Slik lar du brukeren velge språk for tekstene i appen.
toc: true
tags: [needsReview, translate]
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

For at brukeren skal kunne velge språk i appen, setter du `showLanguageSelector` til `true` i `App/ui/Settings.json`. Da viser appen en nedtrekksmeny der brukeren kan velge språk i alle oppgaver:

```json
{
  "showLanguageSelector": true
}
```

Du kan overstyre innstillingen for en oppgave i `App/ui/<TaskId>/Settings.json`. Da legger du `showLanguageSelector` under `pages`:

```json
{
  "pages": {
    "order": ["Side1", "Side2"],
    "showLanguageSelector": false
  }
}
```

Se [innstillinger for sider og oppgaver](/nb/altinn-studio/v9/develop-a-service/look-and-feel/ui-settings/) for hvordan felles innstillinger og overstyringer virker.

Appen kan velge språk fra URL-en, et tidligere lagret valg eller brukerprofilen. Se [hvordan appen velger språk](/nb/altinn-studio/v9/develop-a-service/look-and-feel/language/) for rekkefølgen og hvordan du bruker `lang`-parameteren i en lenke.
