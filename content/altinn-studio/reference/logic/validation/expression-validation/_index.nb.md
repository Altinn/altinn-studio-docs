---
title: Validering med uttrykk
description: Hvordan konfigurere valideringer ved hjelp av dynamiske uttrykk
toc: true
---

Validering med uttrykk er en metode for å definere valideringer på en datamodell som kan gi større fleksibilitet enn begrensninger i datamodellen, samtidig som det er enklere å utvikle enn valideringer i backend-kode.
Dette fungerer ved å definere regler ved hjelp av [dynamiske uttrykk](/nb/altinn-studio/reference/logic/expressions).

## Hvordan konfigurere validering med uttrykk

{{% notice info %}}
Validering med uttrykk kan ikke konfigureres igjennom Altinn Studio Designer per nå.
{{% /notice %}}

Validering med uttrykk defineres i en egen fil ved siden av datamodellen din, og bruker navne-konvensjonen `navn.validation.json`.
Hvis datamodellen din heter `skjema` skal du blant annet ha filene `skjema.cs` og `skjema.schema.json` fra før, og da skal filen du oppretter ligge i samme mappe, og hete `skjema.validation.json`.
Du kan kopiere innholdet nedenfor som et utgangspunkt:

{{< code-title >}}
template.validation.json
{{< /code-title >}}
```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/validation/validation.schema.v1.json",
  "validations": {},
  "definitions": {}
}
```

### Definere en validerings-regel

Nedenfor kan du se et eksempel på en validering mot feltet `kontaktinfo.epost` i datamodellen:

{{< code-title >}}
example.validation.json
{{< /code-title >}}
```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/validation/validation.schema.v1.json",
  "validations": {
    "kontaktinfo.epost": [
      {
        "message": "E-post må slutte med '@altinn.no'",
        "severity": "error",
        "condition": [
          "and",
          ["greaterThan", 
            ["stringLength", ["dataModel", "kontaktinfo.epost"]], 
          0],
          ["not", 
            ["endsWith", ["dataModel", "kontaktinfo.epost"], "@altinn.no"]
          ]
        ]
      }
    ],
  },
  "definitions": {}
}
```

Reglene for feltene i datamodellen settes i `validations`-objektet, hvor datamodell-stien er nøkkelen, og verdien er en liste med regler.

Datamodell-stien bruker akkurat samme format som `dataModelBindings` på en komponent, og dersom feltet er i en repeterende gruppe, vil regelene gjelde alle radene dersom det ikke er satt noen indeksering (**eksempel**: `kontaktinfo.adresser.postnummer` hvor `kontaktinfo.adresser` er en liste).

En regel består av følgende felter:

- **message**: Validerings-meldingen som skal vises dersom regelen er brutt. Dette bør være en referanse til en tekst-ressurs.
- **severity**: Hva slags type validerings-feil det er, kan være en av: `error`, `warning`, `info`, eller `success`. Dersom feltet utelates brukes `error`. Se [myke valideringer](/nb/altinn-studio/reference/logic/validation/#myke-valideringer) for mer informasjon.
- **condition**: Et dynamisk uttrykk som returnerer `true` hvis feilen skal vises, og `false` ellers. Se [dynamiske uttrykk](/nb/altinn-studio/reference/logic/expressions) for mer informasjon.

### Gjenbruk av regler

Dersom den samme regelen skal brukes flere steder, går det an å lage den gjenbrukbar så du slipper å kopiere regelen. Det gjøres ved å definere regelen som skal gjenbrukes under `definitions`-objektet. 
Da må du gi regelen et navn, og det blir nøkkelen i objektet hvor verdien er regelen. Eksempel: 

{{< code-title >}}
example2.validation.json
{{< /code-title >}}
```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/validation/validation.schema.v1.json",
  "validations": {
    "kontaktinfo.fornavn": ["tegn-ikke-tillatt"],
    "kontaktinfo.etternavn": [
      "tegn-ikke-tillatt",
      {
        "message": "en annen regel",
        "condition": [...]
      }
    ],
    "kontaktinfo.epost": [
      {
        "ref": "tegn-ikke-tillatt",
        "message": "E-post kan ikke inneholde æ,ø,å"
      },
      {
        "message": "en annen regel",
        "condition": [...]
      }
    ],
  },
  "definitions": {
    "tegn-ikke-tillatt": {
      "message": "Kan ikke inneholde æ,ø,å",
      "severity": "error",
      "condition": [
        "or",
        ["contains", ["lowercase", ["dataModel", ["argv", 0]]], "æ"],
        ["contains", ["lowercase", ["dataModel", ["argv", 0]]], "ø"],
        ["contains", ["lowercase", ["dataModel", ["argv", 0]]], "å"],
      ]
    }
  }
}
```

Her er det definert en regel som heter `tegn-ikke-tillatt`. Det er verdt å merke seg `dataModel`-uttrykket her. Istedenfor å referere til én bestemt sti i datamodellen brukes heller uttrykket `["argv", 0]`. 
Dette er et spesielt uttrykk som returnerer et argument som kommer fra utsiden. Dette er foreløpig kun aktuelt i validering med uttrykk, og her sendes datamodell-stien inn som det første og eneste argumentet når uttrykket blir kjørt. 
Dermed kan samme uttrykk gjenbrukes for ulike felter, fordi argumentet vil reflektere hvilket felt som valideringen kjøres på.

Validerings-regler definert i `definitions` kan brukes på et felt i `validations` ved å legge inn en streng med navnet på regelen, som ved `kontaktinfo.fornavn` og `kontaktinfo.etternavn` i eksempelet over. 

Det er også mulig å referere til en definert regel og deretter overstyre ett eller flere av feltene ved å legge inn et `ref`-felt med navnet på regelen, som ved `kontaktinfo.epost` i eksempelet over. Her brukes regelen `tegn-ikke-tillatt` men `message`-feltet overstyres.


## Kjøre valideringene i backend

Som standard kjører validering med dynamikk bare i appens frontend, men for å forsikre at dataen som sendes inn følger reglene du har satt opp bør det også kjøres i backend slik at innsendinger via API også blir validert på samme måte.
Det gjøres ved å sette flagget `"ExpressionValidation": true` under `"AppSettings"` i `App/appsettings.json` som vist nedenfor:

{{< code-title >}}
App/appsettings.*.json
{{< /code-title >}}
```json
{
  "AppSettings": {
    "ExpressionValidation": true
    ...
  },
  ...
}
```
