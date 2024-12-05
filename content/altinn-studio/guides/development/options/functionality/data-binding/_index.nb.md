---
title: Dataknytning
description: Hva kan lagres i datamodellen
---

### Lagring av ledetekst / visningsverdi

Komponenter som bruker svaralternativer vil vanligvis bare lagre verdien av det valgte alternativet i datamodellen.
Dette er ofte tilstrekkelig, men i noen tilfeller kan det være nyttig å lagre ledeteksten til det valgte alternativet
også. For eksempel kan dette være nyttig om man trenger å vise det valgte alternativet i en enkel tekstvisning senere,
uten å måtte gjøre ytterligere oppslag. Det kan også være nyttig å huske hvilken ledetekst brukeren faktisk valgte i
tilfelle den endres over tid. Når ledeteksten lagres i datamodellen, vil den følge brukerens valgte språk, slå opp
teksten i tekstressursene og lagre den endelige verdien i datamodellen.

Dette konfigureres ved å ha en separat binding med nøkkelen `label`. Denne bindingen må peke på et felt i
datamodellen av typen `string`:

```json {hl_lines=["6"]}
{
  "id": "dropdown-component",
  "type": "Dropdown",
  "dataModelBindings": {
    "simpleBinding": "kommune.value",
    "label": "kommune.label"
  },
  "optionsId": "kommuner"
}
```

### Lagring av metadata

Når appen henter svaralternativer, spesielt [felles kodelister](../../sources/shared), kan det være nyttig å lagre
noen metadata som beskriver hvordan svaralternativene ble hentet. Dette kan være nyttig for å rekonstruere
svaralternativene etter at skjemaet er sendt inn, samt for logging.

Dette kan konfigureres ved å sette `metadata`-egenskapen på komponentens `dataModelBinding`-egenskap til et felt i
datamodellen som inneholder en `string`-verdi:

```json {hl_lines=["9"]}
{
  "id": "some-dropdown-component",
  "type": "Dropdown",
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype",
    "metadata":  "soknad.nyGaranti.loyvetypeMetadata"
  },
  "required": true,
  "optionsId": "loyvetyper",
  "mapping": {
    "soknad.transportorOrgnummer": "orgnummer"
  }
}
```

Denne konfigurasjonen vil nå lagre metadataen til de hentede svaralternativene som en kommaseparert streng i
feltet `soknad.nyGaranti.loyvetypeMetadata` i datamodellen.
`