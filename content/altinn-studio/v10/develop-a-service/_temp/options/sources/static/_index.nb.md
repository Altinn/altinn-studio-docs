---
draft: true
title: Statiske svaralternativer og enkle kodelister
linktitle: Statisk
description: Svaralternativer som ikke endrer seg, men som kan filtreres
toc: false
weight: 50
tags: [needsReview, translate]
aliases:
  - /nb/altinn-studio/guides/development/options/static-codelists
---

Statiske svaralternativer og kodelister er lettest å sette opp. Du kan legge dem direkte i komponentkonfigurasjonen (vi kaller dette ofte svaralternativer) eller i en json-fil i app-repositoriet (den enkleste formen for kodeliste). Velg metode basert på hvor mange komponenter som skal bruke dem. Hvis flere komponenter trenger de samme svaralternativene, bør du [legge dem i en json-fil](#fra-json-filer-kodeliste) og gjøre dem om til en kodeliste.

Du kan også gjøre statiske svaralternativer (litt mer) dynamiske ved å [filtrere dem](/nb/altinn-studio/v8/guides/development/options/functionality/filtering/) med uttrykk. Trenger du enda mer fleksibilitet, kan du [lage en egen kodebasert kodeliste](/nb/altinn-studio/v8/guides/development/options/sources/dynamic/).

## I komponentkonfigurasjonen (svaralternativer)

I dette eksempelet setter vi opp en Dropdown-komponent med statiske svaralternativer. Egenskapen `options` er en liste med objekter, hvor hvert objekt representerer et svaralternativ. `value` er verdien som lagres i datamodellen når brukeren velger elementet. `label` er ledeteksten som vises til brukeren.

```json {hl_lines=["8-21"]}
{
  "id": "some-dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {},
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype"
  },
  "options": [
    {
      "value": "1",
      "label": "Type 1"
    },
    {
      "value": "2",
      "label": "Type 2"
    },
    {
      "value": "3",
      "label": "Type 3"
    }
  ]
}
```

## Fra JSON-filer (kodeliste)

Legg json-lister i `options`-mappen i app-repositoriet. Appen leser filen automatisk og eksponerer den gjennom `options`-API-et. Options-filene må ligge under `App/options/`. Lager du f.eks `land.json`, kan du sette opp en komponent med egenskapen `"optionsId": "land"`. Kodelisten er da tilgjengelig fra API-et via endepunktet `{org}/{app}/api/options/land`.

Kodelistene må følge et spesifikt format. Her er et eksempel på en kodeliste som inneholder land (`App/options/land.json`):

```json
[
    {
        "value": "norway",
        "label": "Norge"
    },
    {
        "value": "denmark",
        "label": "Danmark"
    },
    {
        "value": "sweden",
        "label": "country.label.sweden"
    }
]
```

`label`-feltet kan inneholde en tekstnøkkel til tekstressursene eller ren tekst.

Referer til kodelisten ved å bruke egenskapen `optionsId` i komponentkonfigurasjonen:

```json {hl_lines=["8"]}
{
  "id": "some-dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {},
  "dataModelBindings": {
    "simpleBinding": "soknad.opphavsland"
  },
  "optionsId": "land"
}
```
