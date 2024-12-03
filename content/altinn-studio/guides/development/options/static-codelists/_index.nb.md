---
title: Statiske kodelister
toc: false
weight: 50
---

For enklere brukstilfeller er statiske kodelister det letteste å sette opp. Disse kan enten settes direkte
i komponentkonfigurasjonen eller i en json-fil i app-repositoriet. Hvilken metode som bør brukes avhenger av
gjenbruksbehovet til kodelisten. Hvis flere komponenter skal bruke samme kodeliste, anbefales det å
bruke metoden med json-filen.

## Statiske kodelister basert på komponentkonfigurasjon

I denne eksempelkonfigurasjonen er en Dropdown-komponent satt opp med en statisk kodeliste. Egenskapen `options` er en
array av objekter, hvor hvert objekt representerer et kodelisteelement. Egenskapen `value` er verdien som vil bli
lagret i datamodellen når brukeren velger elementet. Egenskapen `label` er teksten som vil bli vist til brukeren.

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

## Statiske kodelister basert på json-filer

Ved å legge json-lister i options mappen i app repo vil appen automatisk lese denne filen og eksponere det gjennom options-apiet.
Options filene må ligge under `App/options/` og vil bli differensiert ved hjelp av navngivningen på json-filen. F.eks `land.json`. Her vil da optionsId være `land`, og vil være eksponert gjennom endepunktet `{org}/{app}/api/options/land`.
Kodelistene må være på et spesifikt format. Eksempel på en kodeliste som inneholder land (`App/options/land.json`):

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