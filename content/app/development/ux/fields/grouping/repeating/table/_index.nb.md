---
title: Tabelloppsett
linktitle: Tabell
description: Oppsett og konfigurasjon for tabellen som vises over de repeterende gruppene
weight: 2
toc: true
---

## Separat ledetekst for tabellvisning

Elementer i repeterende grupper som ikke er i redigeringsmodus vises som en tabell. I denne tabellvisningen er det begrenset plass til lange ledetekster. En kortere ledetekst for tabellvisninger kan settes ved å definere `tableTitle` under `textResourceBindings` for hver komponent i en repeterende gruppe.

Eksempel:

```json
{
  ...
  "type": "Input",
  "textResourceBindings": {
    "title": "Skriv inn ditt fulle navn",
    "tableTitle": "Navn"
  },
  ...
},
```

## Bredder, tekst-plassering og skjuling av overflødig tekst

Ved å bruke `tableColumns` er det mulig å konfigurere bredden, tekst plassering, og anntall linjer som vises før overfløding tekst skjules.

- `width` - streng verdi som inneholder en prosent, ex: `"25%"`, eller `"auto"` (default).
- `alignText` - velg mellom `"left"`, `"center"` eller `"right"` for å plassere tekst i celler tilsvarende.
- `textOverflow` - brukes for å kontrollere oppførsel når tekst innhold er for stort til å vises i en celle.
    - `lineWrap` - sett til `false` for å skru av skjuling av overflødig tekst. Standardverdi er `true`.
    - `maxHeight` - setter et maks antall tillatte linjer før tekst skjules med utellatelsestegn (...). `"maxHeight": 0` resulterer i å skru av skjuling av overflødig tekst.
- `editInTable` - settes til `true` for å tillate redigering av komponenten i tabellvisningen. Standardverdi er `false`. Se mer om dette i [seksjonen som beskriver denne funksjonaliteten](#).
- `showInExpandedEdit` - settes til `false` for å skjule komponenten i redigeringsmodus. Standardverdi er `true`. Se mer om dette i [seksjonen som beskriver denne funksjonaliteten](#).

Eksempel:

```json
{
  ...
  "tableHeaders": [
    "streetAdress",
    "postalNumber",
    "city"
  ],
  "tableColumns": {
    "streetAdress": {
      "width": "20%",
      "alignText": "left",
      "textOverflow": {
        "lineWrap": true, 
        "maxHeight": 1
      }
    },
    "postalNumber": {
      "alignText": "right"
    },
    "city": {
      "width": "auto",
      "alignText": "left",
      "textOverflow": {
        "lineWrap": true,
        "maxHeight": 3
      }
    }
  },
  ...
}
```

![Eksempel for kolonne options](column-options-example.png "Eksempel for kolonne options")

## Visning av komponenter direkte i tabellen

Det er mulig å tillate redigering av komponenter direkte i tabellen. Dette kan gjøres ved å
sette `editInTable` til `true` for den komponenten som skal tillate redigering i tabellen, i [`tableColumns`-konfigurasjonen](#bredder-tekst-plassering-og-skjuling-av-overflødig-tekst). Dette er nyttig for komponenter og grupper som ikke er for
store, og hvor det ikke er nødvendig å åpne en egen redigeringsmodus for å redigere dataene. Rent visuelt kan dette
ligne på noen konfigurasjoner av [Grid-komponenten](../../../../components/grid), men tillater brukeren å legge/til
fjerne rader i tabellen, og lagring av data mot en repeterende gruppe i datamodellen.