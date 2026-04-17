---
title: Repeterende grupper
linktitle: Repeterende
description: Oppsett for repeterende grupper
weight: 1
---

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v4 (App Frontend)">}}

Grupper i datamodellen inneholder ett eller flere felter. Man lager en repeterende gruppe komponent ved å sette `"type"`
til  `"RepeatingGroup"` En gruppe som er repeterende i datamodellen må også settes opp som repeterende
i skjemaet/layout-konfigurasjonen, ellers vil lagring av data feile. I JSON defineres en repeterende gruppe som en
array/liste med objekter (hvor hvert objekt representerer en _rad_ i en repeterende gruppe). I XML defineres en
repetrende gruppe som en liste med elementer (hvor hvert element er en gruppe med egenskaper, gjengitt som en _rad_ i
en repeterende gruppe).

## Eksempel

Under vises et skjema med en repeterende gruppe som:

- Inneholder to komponenter (avkrysningsboks og adresse)
- Kan repeteres opp til 3 ganger
- Er knyttet til datamodellen gjennom `GruppeListe`

![Skjema med repeterende gruppe](repeating-groups-demo.gif "Skjema med repeterende gruppe")

{{% expandlarge id="full-example" header="Vis konfigurasjonen for dette skjermskuddet" %}}
```json {linenos=inline}
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json",
  "data": {
    "layout": [
      {
        "id": "gruppe",
        "type": "RepeatingGroup",
        "children": [
          "avkrysningsboks",
          "adresse"
        ],
        "maxCount": 3,
        "dataModelBindings": {
          "group": "GruppeListe"
        }
      },
      {
        "id": "avkrysningsboks",
        "type": "Checkboxes",
        "textResourceBindings": {
          "title": "Avkrysningsboks"
        },
        "dataModelBindings": {
          "simpleBinding": "GruppeListe.Avkrysning"
        },
        "options": [
          {
            "label": "Navn",
            "value": "Verdi1"
          },
          {
            "label": "Adresse",
            "value": "Verdi2"
          }
        ],
        "required": true
      },
      {
        "id": "adresse",
        "type": "Address",
        "dataModelBindings": {
          "address": "GruppeListe.Adresse",
          "zipCode": "GruppeListe.Postnr",
          "postPlace": "GruppeListe.Poststed"
        },
        "simplified": true,
        "readOnly": false,
        "required": true
      }
    ]
  }
}
```

{{% /expandlarge %}}

## Parametre

| Parameter                                                                       | Påkrevd | Beskrivelse                                                                                                                                                         |
|---------------------------------------------------------------------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                                                                              | Ja      | Unik ID, tilsvarer ID på andre komponenter. Må være unik i layout-filen, og bør være unik på tvers av sider.                                                        |
| type                                                                            | Ja      | Må settes til `Group`                                                                                                                                               |
| dataModelBindings                                                               | Nei     | Må settes for repeterende grupper med skjemakomponenter under, og må peke mot den repeterende strukturen i datamodellen.                                            |
| [textResourceBindings](#textresourcebindings)                                   | Nei     | Kan settes for grupper, se [nærmere beskrivelse under](#textresourcebindings).                                                                                      |
| maxCount                                                                        | Nei     | Antall ganger en gruppe kan repetere.                                                                                                                               |
| minCount                                                                        | Nei     | Validering. Setter et minimum antall rader som må eksistere før den repeterende gruppen er godkjennt og bruker kan bevege seg videre.                               |
| children                                                                        | Ja      | Liste over komponent-IDer som inkluderes i gruppen.                                                                                                                 |
| [edit](edit)                                                                    | Nei     | Egenskaper og alternativer for redigerings-/utfyllingsvisningen for en repeterende gruppe.                                                                          |
| tableHeaders                                                                    | Nei     | Liste over komponenter som skal utgjøre kolonner i tabellvisningen for den repeterende gruppen. Om ingen er spesifisert, blir alle komponenter fra `children` vist. |
| [tableColumns](table/#bredder-tekst-plassering-og-skjuling-av-overflødig-tekst) | Nei     | Objekt som inneholder egenskaper for kolonnene som vises i tabellen.                                                                                                |
| [stickyHeaders](table/#sticky-tabell-headere)                                   | No      | Dersom satt til `true`, gjøres tabell headerene `sticky`.                                                                                                           |

## rowsBefore/rowsAfter: colSpan og skjulte kolonner
`rowsBefore` og `rowsAfter` bruker samme grid-rad/celle-struktur som Grid-komponenten.

- Celler i disse radene støtter `colSpan` gjennom `gridColumnOptions.colSpan`.
- Skjuling av kolonner konfigureres med `columnOptions.hidden` på celler i en headerrad.
- For å skjule en kolonne i `rowsBefore`/`rowsAfter`, sett `columnOptions.hidden` på den tilsvarende cellen i en headerrad ("header": true).

Merk: _Når du bruker `colSpan`, må celler som dekkes av spennet fjernes eller settes til null._

Merk: _Hvis du konfigurerer en celle slik at `colSpan` dekker én eller flere kolonner som også er skjulte, vil tabellen fortsatt rendres, men oppsettet stemmer kanskje ikke med det du forventer. Under utvikling logger appen en kort advarsel i nettleserkonsollen som beskriver hvilken celle som spenner over hvor mange kolonner og at den overlapper skjulte kolonne(r), og at dette kan føre til uventet oppsett. Unngå å kombinere `colSpan` med skjulte kolonner hvis du trenger en forutsigbar tabell._

Eksempel `rowsBefore/rowsAfter` uten overlapp mellom `colSpan` og `hidden`:
```json
"rowsBefore": [
  {
    "header": true,
    "cells": [
      {},
      { "text": "Summary before", "gridColumnOptions": { "colSpan": 2 } },
      null,
      { "text": "Hidden before", "columnOptions": { "hidden": true } }
    ]
  }
],

"rowsAfter": [
  {
    "header": true,
    "cells": [
      {},
      { "text": "All changes", "gridColumnOptions": { "colSpan": 2 } },
      null,
      { "text": "Hidden after", "columnOptions": { "hidden": true } }
    ]
  }
]
```

## textResourceBindings

Det er mulig å legge til ulike nøkler i textResourceBindings for å overstyre standardtekster:

- `title` - tittel som blir vist over den repeterende gruppen og over hver gruppe-rad i en [Summary-komponent](/nb/altinn-studio/v8/reference/ux/pages/summary/).
- `summaryTitle` - dersom denne er satt, vil den overstyre `title` i [Summary-komponenten](/nb/altinn-studio/v8/reference/ux/pages/summary/).
- `description` - beskrivelse som blir vist over den repeterende gruppen under tittelen.
- `add_button` - blir lagt til på enden av "Legg til ny" teksten på knappen, og kan brukes til å f.eks ha tekst som sier "Legg til ny person".
- `add_button_full` - blir brukt som egendefinert tekst på "Legg til ny" knappen. Overstyrer `add_button` dersom begge er satt.
- `save_button` - blir brukt som tekst i "Lagre"-knappen når brukeren fyller ut data.
- `save_and_next_button` - blir brukt som tekst i "Lagre og åpne neste"-knappen dersom denne er aktivert.
- `edit_button_open` - blir brukt som tekst i "Endre" knappen i tabellen når brukeren skal åpne et element.
- `edit_button_close` - blir brukt som tekst i "Endre" knappen tabellen når brukeren skal lukke et element.

{{</content-version-container >}}
{{<content-version-container version-label="v3 (App Frontend)">}}

Grupper i datamodellen inneholder ett eller flere felter. Grupper er definert som _repeterende_ dersom de har
`maxCount > 1` i layout-konfigurasjonen. En gruppe som er repeterende i datamodellen må også settes opp som repeterende
i skjemaet/layout-konfigurasjonen, ellers vil lagring av data feile. I JSON defineres en repeterende gruppe som en
array/liste med objekter (hvor hvert objekt representerer en _rad_ i en repeterende gruppe). I XML defineres en
repetrende gruppe som en liste med elementer (hvor hvert element er en gruppe med egenskaper, gjengitt som en _rad_ i
en repeterende gruppe).

## Eksempel

Under vises et skjema med en repeterende gruppe som:

- Inneholder to komponenter (avkrysningsboks og adresse)
- Kan repeteres opp til 3 ganger
- Er knyttet til datamodellen gjennom `GruppeListe`

![Skjema med repeterende gruppe](repeating-groups-demo.gif "Skjema med repeterende gruppe")

{{% expandlarge id="full-example" header="Vis konfigurasjonen for dette skjermskuddet" %}}
```json {linenos=inline}
[
  {
    "id": "gruppe",
    "type": "Group",
    "children": [
      "avkrysningsboks",
      "adresse"
    ],
    "maxCount": 3,
    "dataModelBindings": {
      "group": "GruppeListe"
    }
  },
  {
    "id": "avkrysningsboks",
    "type": "Checkboxes",
    "textResourceBindings": {
      "title": "Avkrysningsboks"
    },
    "dataModelBindings": {
      "simpleBinding": "GruppeListe.Avkrysning"
    },
    "options": [
      {
        "label": "Navn",
        "value": "Verdi1"
      },
      {
        "label": "Adresse",
        "value": "Verdi2"
      }
    ],
    "required": true
  },
  {
    "id": "addresse",
    "type": "AddressComponent",
    "dataModelBindings": {
      "address": "GruppeListe.Adresse",
      "zipCode": "GruppeListe.Postnr",
      "postPlace": "GruppeListe.Poststed"
    },
    "simplified": true,
    "readOnly": false,
    "required": true
  }
]

```
{{% /expandlarge %}}

## Parametre

| Parameter                                                                       | Påkrevd | Beskrivelse                                                                                                                                                         |
|---------------------------------------------------------------------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                                                                              | Ja      | Unik ID, tilsvarer ID på andre komponenter. Må være unik i layout-filen, og bør være unik på tvers av sider.                                                        |
| type                                                                            | Ja      | Må settes til `Group`                                                                                                                                               |
| dataModelBindings                                                               | Nei     | Må settes for repeterende grupper med skjemakomponenter under, og må peke mot den repeterende strukturen i datamodellen.                                            |
| [textResourceBindings](#textresourcebindings)                                   | Nei     | Kan settes for grupper, se [nærmere beskrivelse under](#textresourcebindings).                                                                                      |
| maxCount                                                                        | Ja      | Antall ganger en gruppe kan repetere. Må settes til `1` eller mer for repeterende grupper.                                                                          |
| minCount                                                                        | Nei     | Validering. Setter et minimum antall rader som må eksistere før den repeterende gruppen er godkjennt og bruker kan bevege seg videre.                               |
| children                                                                        | Ja      | Liste over komponent-IDer som inkluderes i gruppen.                                                                                                                 |
| [edit](edit)                                                                    | Nei     | Egenskaper og alternativer for redigerings-/utfyllingsvisningen for en repeterende gruppe.                                                                          |
| tableHeaders                                                                    | Nei     | Liste over komponenter som skal utgjøre kolonner i tabellvisningen for den repeterende gruppen. Om ingen er spesifisert, blir alle komponenter fra `children` vist. |
| [tableColumns](table/#bredder-tekst-plassering-og-skjuling-av-overflødig-tekst) | Nei     | Objekt som inneholder egenskaper for kolonnene som vises i tabellen.                                                                                                |

## textResourceBindings

Det er mulig å legge til ulike nøkler i textResourceBindings for å overstyre standardtekster:

- `title` - tittel som blir vist over hver gruppe-rad i en [Summary-komponent](/nb/altinn-studio/v8/reference/ux/pages/summary/).
- `add_button` - blir lagt til på enden av "Legg til ny" teksten på knappen, og kan brukes til å f.eks ha tekst som sier "Legg til ny person".
- `add_button_full` - blir brukt som egendefinert tekst på "Legg til ny" knappen. Overstyrer `add_button` dersom begge er satt.
- `save_button` - blir brukt som tekst i "Lagre"-knappen når brukeren fyller ut data.
- `save_and_next_button` - blir brukt som tekst i "Lagre og åpne neste"-knappen dersom denne er aktivert.
- `edit_button_open` - blir brukt som tekst i "Endre" knappen i tabellen når brukeren skal åpne et element.
- `edit_button_close` - blir brukt som tekst i "Endre" knappen tabellen når brukeren skal lukke et element.

{{</content-version-container>}}
{{</content-version-selector>}}
{{<children />}}
