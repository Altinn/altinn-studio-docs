---
title: Kodeliste fra organisasjonsbibliotek
linktitle: Organisasjonsbibliotek
description: Bruk kodelister publisert fra Altinn Studio Designer organisasjonsbibliotek
weight: 150
---

### Bibliotekselementer

Se [Organisasjonsbibliotek](/nb/altinn-studio/v8/concepts/organisation-library/) for mer informasjon om konseptet.

### Bruke en bibliotekskodeliste

For å bruke en kodeliste publisert fra Altinn Studio Designer organisasjonsbibliotek, kan du

* Låse en versjon - for å sikre at applikasjonen ikke endres hvis en ny versjon publiseres.
* Bruke den nyeste versjonen ved å sette version til `latest`

`prefix[separator]{org}[separator]{id}[separator]{version}/latest`

Eksempel: Du har publisert to versjoner av en kodeliste `countries` for din organisasjon `ttd`, og du vil bruke den første versjonen

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
  "optionsId": "prefix[separator]ttd[separator]countries[separator]1"
}
```

Eksempel: Du vil alltid bruke den nyeste versjonen av samme kodeliste, uten å måtte publisere applikasjonen din på nytt

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
  "optionsId": "prefix[separator]ttd[separator]countries[separator]latest"
}
```