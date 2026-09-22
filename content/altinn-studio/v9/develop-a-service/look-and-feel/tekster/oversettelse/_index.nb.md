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

## Hvordan appen velger språk

Appen velger det første språket i denne rekkefølgen som den har tekstressurser for:

1. Språket i URL-parameteren `lang`.
2. Brukerens tidligere valg, lagret i en informasjonskapsel.
3. Språket i brukerens profil.
4. Bokmål (`nb`), nynorsk (`nn`), deretter engelsk (`en`).
5. Det første tilgjengelige språket i appen.

Du kan dele en lenke med `?lang=en` for å åpne appen på engelsk. Hvis URL-en allerede har parametre, bruker du `&lang=en`. Appen hopper over språk den ikke støtter.

URL-parameteren overstyrer språket for denne åpningen av appen og lagrer ikke et nytt språkvalg. Når brukeren velger et språk i språkvelgeren, lagrer appen valget i en informasjonskapsel og fjerner `lang` fra URL-en.

Denne rekkefølgen gjelder valg av språk for appen. Den betyr ikke at en manglende tekstnøkkel automatisk hentes fra et annet språk. Sørg for at tekstressursene inneholder tekstene appen bruker.
