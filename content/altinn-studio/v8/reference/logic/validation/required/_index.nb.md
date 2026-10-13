---
title: Påkrevde felt
description: Slik gjør du et felt påkrevd, og slik tilpasser du feilmeldingen brukeren ser
toc: true
weight: 10
---

Et påkrevd felt er et felt brukeren må fylle ut før hen kan gå videre. Du gjør et felt påkrevd i innstillingene for komponenten i Altinn Studio Designer. I layoutfilen blir det lagret som `required` på komponenten:

```json {hl_lines=[5]}
{
  "id": "fornavn",
  "type": "Input",
  "textResourceBindings": { "title": "tekst-fornavn" },
  "required": true,
  "dataModelBindings": { "simpleBinding": "Person.Fornavn" }
}
```

Verdien kan også være et [dynamisk uttrykk]({{< relref "/altinn-studio/v8/reference/logic/expressions" >}}), slik at feltet bare er påkrevd i noen tilfeller.

## Når brukeren ser feilen

Brukeren ser ikke feil for tomme påkrevde felt mens hen fyller ut skjemaet. Appen viser feilen først når brukeren prøver å sende inn, lagre en rad i en repeterende gruppe eller bytte side, hvis appen er satt opp til å sjekke ved lagring av rad eller sidebytte. Se [Når brukeren ser valideringsmeldingene]({{< relref "/altinn-studio/v8/reference/logic/validation" >}}#når-brukeren-ser-valideringsmeldingene).

Alle andre valideringer viser appen med en gang. Vanligvis lar du derfor `required` sjekke om et felt er fylt ut, og lar de andre reglene godta tomme felt.

## Skjulte felt

Er komponenten skjult for brukeren, sjekker ikke appen om feltet er fylt ut, verken i nettleseren eller på serveren. Det gjelder også når komponenten ligger på en skjult side eller i en skjult gruppe.

Du kan derfor gjøre en komponent både påkrevd og skjult, slik at feltet bare er påkrevd når brukeren ser det. Begge deler kan du sette opp i Designer. I layoutfilen ser det slik ut:

```json {hl_lines=["5-6"]}
{
  "id": "antall-barn",
  "type": "Input",
  "textResourceBindings": { "title": "tekst-antall-barn" },
  "required": true,
  "hidden": ["equals", ["component", "har-barn"], false],
  "dataModelBindings": { "simpleBinding": "Person.AntallBarn" }
}
```

## Standard feilmelding

Feilmeldingen for påkrevde felt er _"Du må fylle ut {0}"_. Appen setter inn navnet på feltet i stedet for `{0}`.

Appen finner navnet på feltet slik:

- Har komponenten en `shortName`-tekst, bruker appen den. Du setter opp `shortName` per komponent, på samme måte som ledeteksten (`title`). _Appen bruker foreløpig bare denne teksten i feilmeldingen for påkrevde felt._
- Ellers bruker appen ledeteksten (`title`), med liten forbokstav hvis teksten ikke ser ut som en forkortelse.
- For komponenter med flere felt, som Adresse, bruker appen standardtekstene for hvert felt.

### Eksempel: Felt med kun `title`

```json
{
  "id": "fornavn",
  "type": "Input",
  "textResourceBindings": {
    "title": "tekst-fornavn"
  },
  ...
}
```

Tekstene i ressursfilen:

```json
{
  "id": "tekst-fornavn",
  "value": "Fornavn"
}
```

Da blir valideringsmeldingen `"Du må fylle ut fornavn"`.

### Eksempel: Felt med `shortName`

Er ledeteksten lang, eller passer den dårlig i feilmeldingen, kan du legge til en `shortName`-tekst som appen bruker i stedet.
_Appen bruker bare `shortName`-teksten i denne feilmeldingen, ikke andre steder._

```json
{
  "id": "fornavn",
  "type": "Input",
  "textResourceBindings": {
    "title": "tekst-fornavn",
    "shortName": "fornavn-kort"
  },
  ...
}
```

Tekstene i ressursfilen:

```json
{
  "id": "tekst-fornavn",
  "value": "Skriv fornavnet ditt"
},
{
  "id": "fornavn-kort",
  "value": "fornavnet ditt"
}
```

Da blir valideringsmeldingen `"Du må fylle ut fornavnet ditt"`.

## Erstatte feilmeldingen helt

Vil du bruke en helt annen feilmelding for et felt, legger du til `requiredValidation` i `textResourceBindings` på komponenten. Verdien er en tekstnøkkel fra [tekstressursene]({{< relref "/altinn-studio/v8/reference/ux/texts" >}}), slik at meldingen finnes på alle språkene appen støtter.

```json {hl_lines=[6]}
{
  "id": "fornavn",
  "type": "Input",
  "textResourceBindings": {
    "title": "tekst-fornavn",
    "requiredValidation": "fornavn-pakrevd"
  },
  ...
}
```

## Påkrevde felt på serveren

Appen kan også sjekke påkrevde felt på serveren når brukeren går videre i prosessen. Sjekken er av som standard, og du slår den på med innstillingen `RequiredValidation`. Vi anbefaler å slå den på, slik at også data som andre systemer sender inn gjennom API-et, blir sjekket. Serveren sjekker bare komponenter som er synlige for brukeren, i steg som har et layoutsett. Se [Validering på serveren]({{< relref "/altinn-studio/v8/reference/logic/validation" >}}#validering-på-serveren).
