---
title: Kodeliste fra organisasjonsbibliotek
linktitle: Organisasjonsbibliotek
description: Bruk kodelister publisert fra Altinn Studio Designer organisasjonsbibliotek
weight: 150
---

### Bibliotekselementer

Se [Organisasjonsbibliotek](/nb/altinn-studio/v8/concepts/organisation-library/) for mer informasjon om konseptet.

### Bruke en bibliotekskodeliste

Når du skal bruke en publisert kodeliste, kan du

* Låse en versjon for å sikre at applikasjonen ikke endres når en ny versjon av kodelisten publiseres
* Bruke den nyeste versjonen ved å sette versjon til `latest`

`optionsId`-feltet i koden følger denne syntaksen:
`prefix**{organisasjon}**{kodelistenavn}**{{versjon}/latest}`

Eksempel: Du har publisert to versjoner av en kodeliste med navnet `countries` for din organisasjon `ttd`, og du vil bruke den første versjonen. Slik skriver du koden:

```json {hl_lines=[10]}
{
  "id": "dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "Noen tittel"
  },
  "dataModelBindings": {
    "simpleBinding": "some.field"
  },
  "optionsId": "prefix**ttd**countries**1"
}
```

Hvis du alltid vil bruke den nyeste versjonen av samme kodeliste uten å måtte publisere applikasjonen din på nytt, skriver du koden slik:

```json {hl_lines=[10]}
{
  "id": "dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "Noen tittel"
  },
  "dataModelBindings": {
    "simpleBinding": "some.field"
  },
  "optionsId": "prefix**ttd**countries**latest"
}
```