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
[
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
    "type": "AddressComponent",
    "textResourceBindings": {
      "title": "Adresse"
    },
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
| maxCount                                                                        | Nei     | Antall ganger en gruppe kan repetere.                                                                                                                               |
| minCount                                                                        | Nei     | Validering. Setter et minimum antall rader som må eksistere før den repeterende gruppen er godkjennt og bruker kan bevege seg videre.                               |
| children                                                                        | Ja      | Liste over komponent-IDer som inkluderes i gruppen.                                                                                                                 |
| [edit](edit)                                                                    | Nei     | Egenskaper og alternativer for redigerings-/utfyllingsvisningen for en repeterende gruppe.                                                                          |
| tableHeaders                                                                    | Nei     | Liste over komponenter som skal utgjøre kolonner i tabellvisningen for den repeterende gruppen. Om ingen er spesifisert, blir alle komponenter fra `children` vist. |
| [tableColumns](table/#bredder-tekst-plassering-og-skjuling-av-overflødig-tekst) | Nei     | Objekt som inneholder egenskaper for kolonnene som vises i tabellen.                                                                                                |
| [stickyHeaders](table/#sticky-tabell-headere)                                   | No      | Dersom satt til `true`, gjøres tabell headerene `sticky`.                                                                                                           |

## textResourceBindings

Det er mulig å legge til ulike nøkler i textResourceBindings for å overstyre standardtekster:

- `title` - tittel som blir vist over den repeterende gruppen og over hver gruppe-rad i en [Summary-komponent](../../../pages/summary).
- `summaryTitle` - dersom denne er satt, vil den overstyre `title` i [Summary-komponenten](../../../pages/summary).
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
    "textResourceBindings": {
      "title": "Adresse"
    },
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

- `title` - tittel som blir vist over hver gruppe-rad i en [Summary-komponent](../../../pages/summary).
- `add_button` - blir lagt til på enden av "Legg til ny" teksten på knappen, og kan brukes til å f.eks ha tekst som sier "Legg til ny person".
- `add_button_full` - blir brukt som egendefinert tekst på "Legg til ny" knappen. Overstyrer `add_button` dersom begge er satt.
- `save_button` - blir brukt som tekst i "Lagre"-knappen når brukeren fyller ut data.
- `save_and_next_button` - blir brukt som tekst i "Lagre og åpne neste"-knappen dersom denne er aktivert.
- `edit_button_open` - blir brukt som tekst i "Endre" knappen i tabellen når brukeren skal åpne et element.
- `edit_button_close` - blir brukt som tekst i "Endre" knappen tabellen når brukeren skal lukke et element.

{{</content-version-container>}}
{{</content-version-selector>}}
{{<children />}}
