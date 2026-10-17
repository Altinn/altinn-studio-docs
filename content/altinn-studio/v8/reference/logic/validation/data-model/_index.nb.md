---
title: Validere med datamodellen
linktitle: Datamodell
description: Slik setter du begrensninger på feltene i datamodellen, og slik tilpasser du feilmeldingene
toc: true
weight: 20
---

Datamodellen bestemmer hva som er gyldige verdier i hvert felt, for eksempel hvor lang en tekst kan være, eller hvilke tall som er lov. Appen sjekker verdiene mot begrensningene i nettleseren mens brukeren fyller ut, og viser feilen ved feltet med en gang.

## Sette begrensninger i datamodellen

Klientside-validering baserer seg på datamodellen som hører til skjemaet, og bruker denne til å bestemme hva som er gyldig input i et felt.
Helt konkret brukes JSON Schema utgaven av datamodellen for valideringen. Denne genereres automatisk når man laster opp XSD.
Det går an å gjøre endringer i JSON schema direkte for å tilpasse valideringen ved behov.

**Merk at dersom man gjør tilpasninger i JSON schema manuelt, for å så oppdatere XSD og laste inn på nytt, vil nytt
JSON schema også genereres, og alle manuelle tilpasninger må gjøres på nytt. Derfor er det anbefalt å gjøre endringer i XSD og/eller datamodelleringsverktøyet
for at disse endringene skal reflekteres i JSON schema.**

Et eksempel på hvordan et felt kan defineres i JSON schema datamodellen er:

```json
"someField": {
  "type": "string",
  "maxLength": "4"
}
```

Input i dette feltet vil valideres mot begrensningene som er satt opp, og en feilmelding vil vises dersom disse ikke møtes - i dette tilfellet, dersom
input er en tekst med lengde mer enn 4 karakterer.


## Standard feilmeldinger

Det er satt opp standard feilmeldinger for alle valideringene som gjøres på klientsiden. Se oversikten under.

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

## Egendefinerte feilmeldinger

Det er mulig å definere egne feilmeldinger som skal vises når et felt får valideringsfeil. Dette gjøres ved å legge på en parameter `errorMessage` der
hvor feltet er definert i JSON schema. JSON schema filen ligger i mappen `App/models` og følger navnestandard `*.schema.json`.

F.eks., man kan utvide eksempelet over:

```json {hl_lines=[4]}
"someField": {
  "type": "string",
  "maxLength": "4",
  "errorMessage": "myCustomError"
}
```

Man kan skrive ønsket tekst direkte inn her, eller bruke en tekstnøkkel for en [tekst definert i ressursfilene](/nb/altinn-studio/v8/reference/ux/texts/) for språkstøtte.

Legg merke til at om man har en referanse til en definisjon så må feilmeldingen ligge på `property`-feltet, og ikke på referansen/definisjonen.
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
Merk at ved XSD-endringer, så vil ev. egendefinerte feilmeldinger forsvinne da JSON schema filen genereres på nytt fra XSD. På sikt er det tenkt at
det å sette opp egendefinerte feilmeldinger skal være mulig å gjøre via datamodelleringsverktøyet i Altinn Studio. Per nå må dette gjøres manelt.
{{% /notice %}}


## Begrensningene på serveren

Appen sjekker også begrensningene på serveren, gjennom attributtene på C#-modellen, for eksempel `[Range]`, `[MaxLength]` og `[RegularExpression]`. Både C#-modellen og JSON Schema lager Altinn Studio fra XSD-en, så de har vanligvis de samme reglene. Endrer du JSON Schema for hånd, sjekker serveren ikke den endringen.

Vil du at serveren skal sjekke skjemadataene mot hele XSD-en, kan du slå på innstillingen `XsdValidation`. Se [Validering på serveren]({{< relref "/altinn-studio/v8/reference/logic/validation" >}}#validering-på-serveren).
