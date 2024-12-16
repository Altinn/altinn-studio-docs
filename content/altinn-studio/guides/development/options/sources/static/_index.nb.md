---
title: Statiske svaralternativer og enkle kodelister
linktitle: Statisk
description: Svaralternativer som ikke endrer seg, men som kan filtreres
toc: false
weight: 50
aliases:
  - /nb/altinn-studio/guides/development/options/static-codelists
---

For enklere brukstilfeller er statiske svaralternativer og kodelister det letteste å sette opp. Disse kan enten settes direkte
i komponentkonfigurasjonen (dette kaller vi ofte svaralternativer) eller i en json-fil i
app-repositoriet (den enkleste formen for kodeliste). Hvilken metode som bør brukes avhenger av
gjenbruksbehovet. Hvis flere komponenter skal bruke de samme svaralternativene, anbefales det å
[putte kodelisten i en json-fil](#fra-json-filer-kodeliste) og dermed gjøre den om til en kodeliste.

Legg merke til at selv om slike svaralternativer kan være helt statisk, er det også mulig å gjøre dem (litt mer) dynamiske
ved å [filtrere svaralternativene](../../functionality/filtering) ved hjelp av et uttrykk. Ønsker du enda mer
fleksiilitet, kan du også [lage en egen kodebasert kodeliste](../dynamic).

## I komponentkonfigurasjonen (svaralternativer)

I denne eksempelkonfigurasjonen er en Dropdown-komponent satt opp med en statiske svaralternativer. Egenskapen `options` er en
liste med objekter, hvor hvert objekt representerer et svaralternativ. Egenskapen `value` er verdien som vil bli
lagret i datamodellen når brukeren velger elementet. Egenskapen `label` er ledeteksten som vil bli vist til brukeren.

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

Ved å legge json-lister i `options`-mappen i app repo vil appen automatisk lese denne filen og eksponere det gjennom `options`-APIet.
Options filene må ligge under `App/options/`. Lager man f.eks `land.json`, kan man sette opp en komponent med egenskapen `"optionsId": "land"`.
Kodelisten kan hentes fra API via endepunktet `{org}/{app}/api/options/land`.


Kodelistene må følge et spesifikt format. Eksempel på en kodeliste som inneholder land (`App/options/land.json`):

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

`label` feltet kan inneholde en tekstnøkkel til teskstressursene eller ren tekst.

For å referere til denne kodelisten i en komponent, kan du bruke egenskapen `optionsId` i komponentkonfigurasjonen:

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