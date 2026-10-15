---
draft: true
title: Dataknytning
description: Hva du kan lagre i datamodellen
weight: 50
tags: [needsReview]
---

## Slik lagrer du valgte alternativer

{{<notice info>}}
Under følger noen eksempler på oppsett av dataknytning for komponenter som bruker svaralternativer. For noen komponenter vil oppsettet være annerledes, og det anbefales å se på komponentens spesifikke dokumentasjon for mer informasjon.
{{</notice>}}

Du må sette opp komponenter som bruker svaralternativer til å lagre valgte alternativer i datamodellen. Vanligvis vil komponenten lagre verdien av det valgte alternativet i datamodellen mot et felt av typen `string`, satt opp i komponentens konfigurasjon med nøkkelen `simpleBinding`:

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

For flervalgskomponenter som f.eks. [`Checkboxes`](/nb/altinn-studio/v8/reference/ux/components/checkboxes/) og
[`MultipleSelect`](/nb/altinn-studio/v8/reference/ux/components/multipleselect/), vil komponenten lagre en kommaseparert
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

I eksempelet over lagrer komponenten valgte kjæledyr i feltet `Submitter.Pets` i datamodellen.
Hvis du først krysser av "Katt" og deretter "Fisk", får feltet verdien `"cat,fish"`.
Hvis du krysser av i motsatt rekkefølge, får feltet verdien `"fish,cat"`.
Rekkefølgen på de lagrede verdiene kan altså være forskjellig fra rekkefølgen på svaralternativene i skjemaet.

{{<notice warning>}}
Legg merke til at verdien for hvert svaralternativ må være unik, og hvis du bruker flervalgskomponenter kan ingen av verdiene inneholde et komma.
{{</notice>}}

## Slik lagrer du ledetekst og visningsverdi

Komponenter som bruker svaralternativer lagrer vanligvis bare verdien av det valgte alternativet i datamodellen. Dette er ofte tilstrekkelig, men i noen tilfeller kan det være nyttig å lagre ledeteksten til det valgte alternativet også. Dette kan for eksempel være nyttig hvis du trenger å vise det valgte alternativet i en enkel tekstvisning senere, uten å måtte gjøre ytterligere oppslag. Det kan også være nyttig å huske hvilken ledetekst brukeren faktisk valgte i tilfelle den endres over tid. Når du lagrer ledeteksten i datamodellen, følger systemet brukerens valgte språk, slår opp teksten i tekstressursene og lagrer den endelige verdien i datamodellen.

Legg til en separat binding med nøkkelen `label`. For enkeltvalgskomponenter som `Dropdown` og `RadioButtons`
må denne bindingen peke på et felt av typen `string`:

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

For flervalgskomponenter som `Checkboxes` og `MultipleSelect` må `label`-bindingen peke på en liste med
strenger, `string[]`. `simpleBinding` peker fortsatt på et `string`-felt med kommaseparerte verdier.
Ledetekstene trenger en liste fordi selve teksten kan inneholde komma.

{{<notice info>}}
Eksempelet under viser endringen i app-frontend v4.35.0. Samme endring må overføres til v9-frontenden
før du kan bruke indeks til å koble lagrede verdier og ledetekster i v9.
{{</notice>}}

### Eksempel på rekkefølge i lagrede data

I en søknad velger brukeren hvilke kommuner virksomheten har aktivitet i. Komponenten under viser
kommunene alfabetisk med `sortOrder: "asc"`. `label` lagrer teksten ved de valgte svaralternativene i
datamodellen. Dette er teksten brukeren ser ved hver avkrysningsboks, for eksempel "Stavanger".

```json
{
  "id": "municipalities",
  "type": "Checkboxes",
  "textResourceBindings": {
    "title": "Hvilke kommuner har virksomheten aktivitet i?"
  },
  "dataModelBindings": {
    "simpleBinding": "Business.Municipalities",
    "label": "Business.MunicipalityLabels"
  },
  "sortOrder": "asc",
  "options": [
    { "value": "1103", "label": "Stavanger" },
    { "value": "1108", "label": "Sandnes" },
    { "value": "1124", "label": "Sola" }
  ]
}
```

Definer feltene under `Business` i datamodellens JSON Schema slik:

```json
"Municipalities": {
  "type": "string"
},
"MunicipalityLabels": {
  "type": "array",
  "items": { "type": "string" }
}
```

Brukeren ser alternativene i rekkefølgen **Sandnes, Sola, Stavanger**, men krysser først av **Stavanger**,
deretter **Sandnes** og til slutt **Sola**. `Checkboxes` lagrer da kommunenumrene i valgrekkefølgen,
`"1103,1108,1124"`.

Før app-frontend v4.35.0 fulgte de lagrede ledetekstene visningsrekkefølgen til svaralternativene.
Fra v4.35.0 følger de rekkefølgen til de lagrede verdiene:

| Felt i datamodellen | Før app-frontend v4.35.0 | Fra app-frontend v4.35.0 |
| --- | --- | --- |
| `Business.Municipalities` | `"1103,1108,1124"` | `"1103,1108,1124"` |
| `Business.MunicipalityLabels` | `["Sandnes", "Sola", "Stavanger"]` | `["Stavanger", "Sandnes", "Sola"]` |

Fra app-frontend v4.35.0 følger de lagrede ledetekstene rekkefølgen til de lagrede verdiene.
Når du deler `Business.Municipalities` på komma, hører hver verdi til ledeteksten på samme indeks i
`Business.MunicipalityLabels`. For eksempel hører den første verdien, `1103`, til den første ledeteksten,
`"Stavanger"`. I eldre versjoner kunne samme indeks gi feil kommune, som `1103` og `"Sandnes"` i eksempelet.

Endringen gjelder bare rekkefølgen på ledetekstene som lagres i datamodellen. Brukeren ser fortsatt
alternativene i rekkefølgen **Sandnes, Sola, Stavanger**. Hvis du endrer sorteringen av svaralternativene,
følger de lagrede ledetekstene fortsatt rekkefølgen til de lagrede verdiene.

Hvis du bruker `group`-bindingen til å lagre valgene i en repeterende struktur, lagrer hver rad sin egen verdi
og ledetekst. Da må `label` peke på et `string`-felt inne i raden, i stedet for en separat liste med ledetekster.

## Slik lagrer du metadata

Når appen henter svaralternativer, spesielt [felles kodelister](../../sources/shared/), kan det være nyttig å lagre noen metadata som beskriver hvordan systemet hentet svaralternativene. Dette kan være nyttig for å rekonstruere svaralternativene etter at skjemaet er sendt inn, samt for logging.

Dette kan konfigureres ved å sette `metadata`-egenskapen på komponentens `dataModelBinding`-egenskap til et felt i datamodellen som inneholder en `string`-verdi:

```json {hl_lines=["6"]}
{
  "id": "some-dropdown-component",
  "type": "Dropdown",
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype",
    "metadata":  "soknad.nyGaranti.loyvetypeMetadata"
  },
  "required": true,
  "optionsId": "loyvetyper",
  "queryParameters": {
    "orgnummer": ["dataModel", "soknad.transportorOrgnummer"]
  }
}
```

Denne konfigurasjonen vil nå lagre metadataen til de hentede svaralternativene som en kommaseparert streng i feltet `soknad.nyGaranti.loyvetypeMetadata` i datamodellen.
