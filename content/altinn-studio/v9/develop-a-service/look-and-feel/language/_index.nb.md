---
draft: true
title: Språkvalg
description: Slik velger appen språk og viser språkvelgeren.
weight: 80
toc: true
---

Appen støtter språkene du har tekstressurser for i `App/config/texts`. For eksempel kan du ha `resource.nb.json`, `resource.nn.json` og `resource.en.json`. Verdien i `language` i hver fil må samsvare med språkkoden i filnavnet.

## Vis språkvelgeren

Sett `showLanguageSelector` til `true` i `App/ui/Settings.json`:

```json
{
  "showLanguageSelector": true
}
```

Du kan overstyre innstillingen for hver oppgave. Se [innstillinger for sider og oppgaver](/nb/altinn-studio/v9/develop-a-service/look-and-feel/ui-settings/).

## Hvordan appen velger språk

Appen velger det første språket i denne rekkefølgen som den har tekstressurser for:

1. Språket i URL-parameteren `lang`.
2. Brukerens tidligere valg, lagret i en informasjonskapsel.
3. Språket i brukerens profil.
4. Bokmål (`nb`), nynorsk (`nn`), deretter engelsk (`en`).
5. Det første tilgjengelige språket i appen.

Du kan dele en lenke med `?lang=en` for å åpne appen på engelsk. Hvis URL-en allerede har parametre, bruk `&lang=en`. Appen hopper over språk den ikke støtter.

URL-parameteren overstyrer språket for denne åpningen av appen og lagrer ikke et nytt språkvalg. Når brukeren velger et språk i språkvelgeren, lagrer appen valget i en informasjonskapsel og fjerner `lang` fra URL-en.

Denne rekkefølgen gjelder valg av språk for appen. Den betyr ikke at en manglende tekstnøkkel automatisk hentes fra et annet språk. Sørg for at tekstressursene inneholder tekstene appen bruker.
