---
title: Dataknytning
description: Hva kan lagres i datamodellen
---

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