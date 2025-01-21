---
title: Kodelister fra repeterede strukturer
linktitle: Fra datamodellen
description: Kodelister hentet fra en repeterende struktur i datamodellen
weight: 150
aliases:
  - /nb/altinn-studio/guides/development/options/repeating-group-codelists
---

I den forrige seksjonen om [dynamiske kodelister](../dynamic) beskrev vi hvordan man kan skrive kode på backend for å generere dynamiske kodelister. Du kunne også sende visse verdier fra datamodellen til backend for å generere denne kodelisten (via [spørringsparametre](../dynamic#spørringsparametre)). Denne fremgangsmåten skalerer dårlig når kodelisten ender opp med å endre alternativene ofte, dvs. når alternativene er funksjonelt unike for en del av dataene i datamodellen.

En annen tilnærming er å sette opp en kodeliste basert på en 'repeterende gruppe' i datamodellen. En slik repeterende struktur i datamodellen kan også representere en liste over alternativer for en nedtrekksliste, radioknapper eller avmerkingsbokser. Dette er spesielt nyttig i kombinasjon med [RepeatingGroup](../../../../../reference/ux/fields/grouping/repeating)-komponenten, da det lar brukeren legge til og fjerne elementer fra listen, og alternativene vil automatisk oppdateres.

Denne funksjonaliteten krever ikke bruk av noen `RepeatingGroup`-komponent i layout-filen, men det krever at datamodellen inneholder en repeterende struktur.

### Konfigurasjon

For å sette opp kodelister som hentes ut fra datamodellen brukes egenskapen `source`.
I dette objektet definerer man feltene `group`, `label` og `value`. Eksempel:

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

- `group` - den repeterende strukturen i datamodellen man baserer kodelisten på.
- `label` - en referanse til en tekstnøkkel som brukes som ledetekst for hvert svaralternativ. Se mer under.
- `value` - en referanse til det feltet i den repeterende strukturen som skal bruke som verdi, og dermed lagres når brukeren gjør et valg. Legg merke til at vi har fyllt inn `[{0}]` som vil bli erstattet med indeksen til det repeterende elementet.


Verdien hentet ut fra `value` må være unik for hvert repeterende element. Om man ikke har et felt som er unikt per rad, anbefales det å legge på et ekstra felt i datamodellen som kan benyttes som identifikator. For eksempel en GUID eller liknende. Dersom verdien ikke er unik vil den bli filtrert bort fra alle kodelister, og antallet svaralternativer tilgjengelige for brukeren kan da være noen færre enn forventet ut fra det som ligger i datamodellen.

For `label`-feltet må vi definere en tekstressurs som kan bli brukt som ledetekst for hvert svaralternativ.
I eksempelet under, brukes andre verdier fra den repeterende strukturen i ledeteksten via [variabler i tekst](/nb/altinn-studio/reference/ux/texts):

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

Egenskapene `label`, `description` og `helpText` støtter også [dynamiske uttrykk](../../../dynamics) i denne modusen.

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
