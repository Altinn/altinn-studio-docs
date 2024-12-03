---
title: Kodelister (svaralternativer)
linktitle: Kodelister
description: Hvordan konfigurere svaralternativer/kodelister for en app?
toc: true
weight: 40
aliases:
- /nb/altinn-studio/guides/options
- /nb/altinn-studio/reference/data/options
---

Altinn tilbyr to ulike måter en app kan eksponere kodelister på: Statisk og dynamisk. Disse eksponeres primært fra endepunktet som er tilgjengelig på `{org}/{app}/api/options/{optionsId}`, hvor `optionsId` er ID-en til listen.
Komponenter som avkrysningsbokser, radioknapper og nedtrekkslister vil automatisk kunne hente ut en slik liste om man kobler dem til en kodeliste-ID. Men ikke alle dynamiske kodelister må gå via API'et – vi har også dynamiske kodelister som baserer seg på verdiene fra en repeterende struktur i datamodellen.

## Koble en komponent til en kodeliste

En komponent kobles til en kodeliste ved å legge til feltet `optionsId`, som refererer til kodelistens ID. Eksempel:

```json
{
  "id": "dropdown-komponent",
  "type": "Dropdown",
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype"
  },
  "optionsId": "biler"
}
```

### Lagre visningsverdi i datamodellen
Noen ganger ønsker man å lagre den viste verdien på brukerens språk i datamodellen for enklere å kunne bruke de lagrede dataene til å lagre enkle visninger uten å være avhengig av å gjøre et nytt oppslag for å få en visningsvennlig verdi. Det kan også brukes for å huske hva brukeren faktisk har sett når han valgte i tilfelle man endrer ordlyd for en verdi og vil ha logg for hva brukeren har sett.

Dette gjøres ved å ha en egen ``dataModelBindings`` med navnet ``"label":`` i tillegg til en ``"simpleBinding":``.

```json
{
  "id": "dropdown-komponent",
  "type": "Dropdown",
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype",
    "label":"soknad.nyGaranti.loyvetypeLabel"
  },
  "optionsId": "biler"
}
```

### Lagre metadata for parametrene som ble brukt til å hente options

Du kan lagre metadata for parameterene som ble brukt til å hente kodeliste i datamodellen ved å sette egenskapen `metadata`
på komponentens `dataModelBinding`-egenskap:

```json
{
  "id": "some-dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "NyGarantiLoyvetype"
  },
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype",
    "metadata":  "soknad.transportorOrgnummer"
  },
  "required": true,
  "optionsId": "loyvetyper",
  "mapping": {
    "soknad.transportorOrgnummer": "orgnummer"
  }
}
```

Denne konfigurasjonen vil lagre metadata for parameterene som ble brukt til å hente kodelisten som en kommaseparert
streng i feltet `soknad.transportorOrgnummer` i datamodellen.

## Beskrivelse og hjelpetekst

`description` og `helpText` støttes av kodelister i apper som bruker versjon 7.8.0 eller høyere. Beskrivelse og
hjelpetekst kan vises av komponentene `RadioButtons` og `Checkboxes` ved å sette attributtene i en `option` som
brukes av komponenten.

Beskrivelser og hjelpetekster kan gis til `options` på samme måte som en `label` er gitt, enten i statiske eller
dynamiske kodelister. Man kan også bruke dem i kodelister basert på repeterende grupper i `source`-attributten.

```json
[
  {
    "value": "norway",
    "label": "Norge",
    "description": "This is a description",
    "helpText": "This is a help text"
  },
  {
    "value": "denmark",
    "label": "Danmark"
  }
]
```

```cs
var options = new AppOptions
{
  Options = new List<AppOption>
  {
    new AppOption
    {
      Label = "Ole",
      Value = "1",
      Description = "This is a description",
      HelpText  = "This is a help text"
    },
    new AppOption
    {
      Label = "Dole",
      Value = "2"
    }
  }
};
```

Beskrivelser og hjelpetekster som brukes i kodelister basert på repeterende grupper kan settes opp med dynamiske
tekstressurser på samme måte som `label`, som beskrevet i
[kodelister fra repeterende grupper](repeating-group-codelists).

```json
{
  "id": "checkboxes-component-id",
  "type": "Checkboxes",
  ...
  "source": {
    "group": "some.group",
    "label": "checkboxes.label",
    "description": "checkboxes.descripiton",
    "helpText": "checkboxes.helpText",
    "value": "some.group[{0}].someField"
  }
}
```

{{<children />}}
