---
title: Svaralternativer fra repeterede strukturer
linktitle: Fra datamodellen
description: Svaralternativer hentet fra en repeterende struktur i datamodellen
weight: 150
aliases:
  - /nb/altinn-studio/guides/development/options/repeating-group-codelists
---

I den forrige seksjonen om [dynamiske svaralternativer](../dynamic) beskrev vi hvordan man kan skrive kode på backend for å generere dynamiske svaralternativer for en komponent. Du kunne også sende visse verdier fra datamodellen til backend for å generere disse alternativene (via [spørringsparametere](../dynamic#spørringsparametere)). Denne fremgangsmåten skalerer dårlig når spørringsparametrene ender opp med å endre alternativene ofte, dvs. når alternativene er funksjonelt unike for en del av dataene i datamodellen.

En annen tilnærming er å sette opp svaralternativer basert på en 'repeterende gruppe' i datamodellen. En slik repeterende struktur i datamodellen kan også representere en liste over alternativer for en nedtrekksliste, radioknapper eller avmerkingsbokser. Dette er spesielt nyttig i kombinasjon med [RepeatingGroup](../../../../../reference/ux/fields/grouping/repeating) komponenten, da det lar brukeren legge til og fjerne elementer fra listen, og alternativene vil automatisk oppdateres.

Denne funksjonaliteten krever ikke bruk av noen `RepeatingGroup` komponent i skjemalayout, men det krever at datamodellen inneholder en repeterende struktur.

### Konfigurasjon

For å sette opp svaralternativer som hentes ut fra datamodellen brukes egenskapen `source`.
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

- **group** - den repeterende strukturen i datamodellen man baserer svaralternativene på.
- **label** - en referanse til en tekstnøkkel som brukes som ledetekst for hvet svaralternativ. Se mer under.
- **value** - en referanse til det feltet i den repeterende strukturen som skal bruke som verdi, og dermed lagres når brukeren gjør et valg. Legg merke til at vi har fyllt inn `[{0}]` som vil bli erstattet med indeksen til det repeterende elementet.


Verdien hentet ut fra **value** må være unikt for hvert repeterende element. Om man ikke har et felt som er unikt per rad, anbefales det å legge på et ekstra felt i datamodellen som kan benyttes som identifikator f.eks en GUID eller liknende. Dersom verdien ikke er unik vil den bli filtrert bort fra alle svaralternativlister, og antallet svaralternativer tilgjengelige for brukeren kan da være noe lavere enn forventet ut fra datamodellen.

For **label** feltet må vi definere en tekstressurs som kan bli brukt som ledetekst for hvert svaralternativ.
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
