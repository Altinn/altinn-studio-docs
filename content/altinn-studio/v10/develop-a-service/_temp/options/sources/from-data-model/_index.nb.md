---
draft: true
title: Kodelister fra repeterede strukturer
linktitle: Fra datamodellen
description: Kodelister hentet fra en repeterende struktur i datamodellen
weight: 150
tags: [needsReview, translate]
aliases:
  - /nb/altinn-studio/guides/development/options/repeating-group-codelists
---

Når alternativene i en kodeliste endrer seg ofte basert på data i datamodellen, har du to hovedalternativer:

- **Dynamiske kodelister med spørringsparametre** (beskrevet under [Dynamiske kodelister](/nb/altinn-studio/v8/guides/development/options/sources/dynamic/)): Du skriver kode på backend for å generere kodelisten og sender verdier fra datamodellen til backend via [spørringsparametre](/nb/altinn-studio/v8/guides/development/options/sources/dynamic#spørringsparametre). Ulempen er at denne fremgangsmåten skalerer dårlig når kodelisten endrer alternativene ofte.

- **Kodelister fra repeterende strukturer** (anbefalt): Du setter opp en kodeliste basert direkte på en repeterende struktur i datamodellen. Datamodellen blir da selve kilden til alternativene. Dette er spesielt nyttig i kombinasjon med [RepeatingGroup](/nb/altinn-studio/v8/reference/ux/fields/grouping/repeating/)-komponenten, da brukeren kan legge til og fjerne elementer fra listen, og alternativene oppdateres automatisk.

Du trenger ikke en `RepeatingGroup`-komponent for å bruke denne funksjonaliteten, men datamodellen må inneholde en repeterende struktur.

### Konfigurasjon

For å sette opp kodelister som hentes ut fra datamodellen, bruker du egenskapen `source`. I dette objektet definerer du feltene `group`, `label` og `value`. Eksempel:

```json {hl_lines=["5-9"]}
{
  "id": "dropdown-component-id",
  "type": "Dropdown",
  ...
  "source": {
    "group": "some.group",
    "label": "dropdown.label",
    "value": "some.group[{0}].someField"
  }
}
```

Forklaring:

- `group` - den repeterende strukturen i datamodellen som du baserer kodelisten på.
- `label` - en referanse til en tekstnøkkel som du bruker som ledetekst for hvert svaralternativ. Se mer under.
- `value` - en referanse til feltet i den repeterende strukturen som du bruker som verdi, og som lagres når brukeren gjør et valg. Legg merke til at vi har fylt inn `[{0}]`, som blir erstattet med indeksen til det repeterende elementet.


Verdien hentet ut fra `value` må være unik for hvert repeterende element. Hvis du ikke har et felt som er unikt per rad, anbefaler vi at du legger på et ekstra felt i datamodellen som kan brukes som identifikator. For eksempel en GUID eller liknende. Hvis verdien ikke er unik, blir den filtrert bort fra alle kodelister, og antallet svaralternativer tilgjengelige for brukeren kan da være noen færre enn forventet ut fra det som ligger i datamodellen.

For `label`-feltet må vi definere en tekstressurs som kan bli brukt som ledetekst for hvert svaralternativ. I eksempelet under, brukes andre verdier fra den repeterende strukturen i ledeteksten via [variabler i tekst](/nb/altinn-studio/v8/reference/ux/texts/):

```json
{
  "language": "nb",
  "resources": [
    {
      "id": "dropdown.label",
      "value": "Person: {0}, Age: {1}",
      "variables": [
        {
          "key": "some.group[{0}].name",
          "dataSource": "dataModel.default"
        },
        {
          "key": "some.group[{0}].age",
          "dataSource": "dataModel.default"
        }
      ]
    }
  ]
}
```

### Støtte for uttrykk

Egenskapene `label`, `description` og `helpText` støtter også [dynamiske uttrykk](/nb/altinn-studio/v8/guides/development/dynamics/) i denne modusen.

```json {hl_lines=["9-14"]}
{
  "id": "checkboxes-component-id",
  "type": "Checkboxes",
  ...
  "source": {
    "group": "some.group",
    "label": "checkboxes.label",
    "description": "checkboxes.description",
    "helpText": [
      "if", ["equals", ["dataModel.someField"], "someValue"],
        "checkboxes.helpText1",
      "else",
        "checkboxes.helpText2"
    ],
    "value": "some.group[{0}].someField"
  }
```

I eksempelet over er `helpText` satt opp til å vise forskjellige hjelpetekster basert på verdien av `someField` i datamodellen.
Hvis `someField` er lik `someValue`, vil hjelpeteksten være `checkboxes.helpText1`, ellers vil den være `checkboxes.helpText2`.
