---
draft: true
title: Validere med datamodellen
linktitle: Datamodell
description: Slik setter du begrensninger på feltene i datamodellen, og slik tilpasser du feilmeldingene
toc: true
tags: [needsReview]
weight: 20
---

Datamodellen bestemmer hva som er gyldige verdier i hvert felt, for eksempel hvor lang en tekst kan være, eller hvilke tall som er lov. Appen sjekker verdiene mot begrensningene i nettleseren mens brukeren fyller ut, og viser feilen ved feltet med en gang.

## Sette begrensninger i datamodellen

Nettleseren bruker datamodellen som hører til skjemaet, til å avgjøre hva som er gyldige verdier i et felt.
Konkret bruker valideringen JSON Schema-utgaven av datamodellen. Systemet oppretter denne automatisk når du laster opp XSD.
Du kan gjøre endringer i JSON Schema direkte for å tilpasse valideringen ved behov.

**Merk at hvis du gjør tilpasninger i JSON Schema manuelt og deretter oppdaterer XSD og laster inn på nytt, oppretter systemet et nytt JSON Schema. Da må du gjøre alle manuelle tilpasninger på nytt. Vi anbefaler derfor å gjøre endringer i XSD eller datamodelleringsverktøyet slik at JSON Schema får med endringene.**

Et eksempel på hvordan du kan definere et felt i JSON Schema datamodellen:

```json
"someField": {
  "type": "string",
  "maxLength": 4
}
```

Systemet validerer inndata i dette feltet mot begrensningene du har satt opp. Brukeren får en feilmelding hvis inndata ikke oppfyller begrensningene – i dette tilfellet hvis teksten har mer enn fire tegn.

## Standard feilmeldinger

Det er satt opp standard feilmeldinger for alle valideringene som kjører på klientsiden:

| Regel     | Feilmelding bokmål            | Feilmelding nynorsk           | Feilmelding engelsk                   |
| --------- | ----------------------------- | ----------------------------- | ------------------------------------- |
| minimum   | 'Minste gyldig verdi er {0}'  | 'Minste gyldig verdi er {0}'  | 'Minimum valid value is {0}'          |
| maximum   | 'Største gyldig verdi er {0}' | 'Største gyldig verdi er {0}' | 'Maximum valid value is {0}'          |
| minLength | 'Bruk {0} eller flere tegn'   | 'Bruk {0} eller flere tegn'   | 'Use {0} or more characters'          |
| maxLength | 'Bruk {0} eller færre tegn'   | 'Bruk {0} eller færre tegn'   | 'Use {0} or fewer characters'         |
| length    | 'Antall tillatte tegn er {0}' | 'Antall tillatte tegn er {0}' | 'Number of characters allowed is {0}' |
| pattern   | 'Feil format eller verdi'     | 'Feil format eller verdi'     | 'Wrong format or value'               |
| required  | 'Du må fylle ut {0}'          | 'Du må fylle ut {0}'          | 'You have to fill out {0}'            |
| enum      | 'Kun verdiene {0} er tillatt' | 'Kun verdiene {0} er tillatt' | 'Only the values {0} are permitted'   |

## Egne feilmeldinger

Du kan definere egne feilmeldinger som vises når et felt får valideringsfeil. Dette gjør du ved å legge på en parameter `errorMessage` der
feltet er definert i JSON Schema. JSON Schema-filen ligger i mappen `App/models` og følger navnestandarden `*.schema.json`.

Du kan for eksempel utvide eksempelet over:

```json {hl_lines=[4]}
"someField": {
  "type": "string",
  "maxLength": "4",
  "errorMessage": "myCustomError"
}
```

Du kan skrive ønsket tekst direkte inn her, eller bruke en tekstnøkkel for en [tekst definert i ressursfilene](/nb/altinn-studio/v9/develop-a-service/look-and-feel/options/functionality/texts/) for språkstøtte.

Legg merke til at hvis du har en referanse til en definisjon, må feilmeldingen ligge på `property`-feltet, ikke på referansen/definisjonen.
Eksempel:

```json {hl_lines=[5]}
{
  "properties": {
    "person": {
        "$ref" : "#/definitions/personDefinition",
        "errorMessage": "myCustomError",
    }
  },
  "definitions": {
    "personDefinition" : {
      "age": {
        "type": "number"
      },
      ...
  }
}
```

{{% notice warning %}}
Merk at ved XSD-endringer forsvinner eventuelle egendefinerte feilmeldinger fordi JSON Schema-filen genereres på nytt fra XSD. På sikt er det planlagt at
du skal kunne sette opp egendefinerte feilmeldinger via datamodelleringsverktøyet i Altinn Studio. Foreløpig må dette gjøres manuelt.
{{% /notice %}}

## Begrensningene på serveren

Appen sjekker også begrensningene på serveren, gjennom attributtene på C#-modellen, for eksempel `[Range]`, `[MaxLength]` og `[RegularExpression]`. Altinn Studio genererer både C#-modellen og JSON Schema fra XSD-en, så de har vanligvis de samme reglene. Endrer du JSON Schema for hånd, sjekker serveren ikke den endringen.

Vil du at serveren skal sjekke skjemadataene mot hele XSD-en, kan du slå på innstillingen `XsdValidation`. Se [Validering på serveren]({{< relref "/altinn-studio/v9/develop-a-service/data/validation" >}}#validering-på-serveren).
