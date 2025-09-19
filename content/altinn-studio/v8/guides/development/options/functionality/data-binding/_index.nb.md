---
title: Dataknytning
description: Hva kan lagres i datamodellen
weight: 50
---

### Lagring av valgt alternativ

{{<notice info>}}
Under følger noen eksempler på oppsett av dataknytning for komponenter som bruker svaralternativer. For noen komponenter
vil oppsettet være annerledes, og det anbefales å se på komponentens spesifikke dokumentasjon for mer informasjon.
{{</notice>}}

Komponenter som bruker svaralternativer må settes opp til å lagre valgte alternativer i datamodellen. Vanligvis vil
komponenten lagre verdien av det valgte alternativet i datamodellen mot et felt av typen `string`, satt opp i
komponentens konfigurasjon med nøkkelen `simpleBinding`:

```json {hl_lines=["8"]}
{
  "id": "single-choice-component",
  "type": "RadioButtons",
  "textResourceBindings": {
    "title": "Eier du en katt?"
  },
  "dataModelBindings": {
    "simpleBinding": "Submitter.HasCat"
  },
  "options": [
    { "value": "y", "label": "Ja" },
    { "value": "n", "label": "Nei" }
  ]
}
```

I eksempelet over vil komponenten lagre valget av om brukeren eier en katt i feltet `Submitter.HasCat` i datamodellen.
Dette feltet får verdien `y` om brukeren velger "Ja" og `n` om brukeren velger "Nei".

For flervalgskomponenter som f.eks. [`Checkboxes`](../../../../../reference/ux/components/checkboxes) og
[`MultipleSelect`](../../../../../reference/ux/components/multipleselect), vil komponenten lagre en kommaseparert
liste av valgte verdier i datamodellen.

```json
{
  "id": "multi-choice-component",
  "type": "Checkboxes",
  "textResourceBindings": {
    "title": "Hvilke kjæledyr har du?"
  },
  "dataModelBindings": {
    "simpleBinding": "Submitter.Pets"
  },
  "options": [
    { "value": "cat", "label": "Katt" },
    { "value": "dog", "label": "Hund" },
    { "value": "fish", "label": "Fisk" }
  ]
}
```

I eksempelet over vil komponenten lagre en kommaseparert liste av valgte kjæledyr i feltet `Submitter.Pets` i
datamodellen. Hvis du velger "Katt" og "Fisk", vil feltet få verdien `"cat,fish"`. Rekkefølgen på valgene er ikke
garantert å være den samme som rekkefølgen på svaralternativene, ei heller den rekkefølgen brukeren valgte dem i.

{{<notice warning>}}
Legg merke til at verdien for hvert svaralternativ må være unik, og om man bruker flervalgskomponenter kan ingen
av verdiene inneholde et komma.
{{</notice>}}

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
