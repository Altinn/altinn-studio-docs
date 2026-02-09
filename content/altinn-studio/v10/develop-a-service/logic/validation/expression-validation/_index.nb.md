---
draft: true
title: Validering med uttrykk
description: Slik konfigurerer du valideringer ved hjelp av dynamiske uttrykk.
toc: true
tags: [needsReview, needsTranslation]
---

Validering med uttrykk gir deg mulighet til å definere valideringsregler som er mer fleksible enn begrensninger i datamodellen, men enklere å utvikle enn valideringer i backend-kode.
Du definerer regler ved hjelp av [dynamiske uttrykk](/altinn-studio/v10/reference/logic/expressions).

## Konfigurere validering med uttrykk

{{% notice info %}}
Du kan foreløpig ikke konfigurere validering med uttrykk gjennom Altinn Studio Designer.
{{% /notice %}}

Definer validering med uttrykk i en egen fil ved siden av datamodellen din. Filen bruker navnekonvensjonen `navn.validation.json`.
Hvis datamodellen din heter `skjema`, har du blant annet filene `skjema.cs` og `skjema.schema.json` fra før. Da skal filen du oppretter ligge i samme mappe og hete `skjema.validation.json`.
Du kan kopiere innholdet nedenfor som utgangspunkt:

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

### Definere en valideringsregel

Nedenfor ser du et eksempel på en validering mot feltet `kontaktinfo.epost` i datamodellen:

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

Sett reglene for feltene i datamodellen i `validations`-objektet, der datamodellstien er nøkkelen og verdien er en liste med regler.

Datamodellstien bruker akkurat samme format som `dataModelBindings` på en komponent. Hvis feltet er i en repeterende gruppe, gjelder reglene alle radene dersom det ikke er satt noen indeksering (**eksempel**: `kontaktinfo.adresser.postnummer` der `kontaktinfo.adresser` er en liste).

En regel består av følgende felter:

- **message** – Valideringsmeldingen som vises hvis regelen er brutt. Dette bør være en referanse til en tekstressurs.
- **severity** – Typen valideringsfeil: `error`, `warning`, `info` eller `success`. Hvis feltet utelates, brukes `error`. Se [myke valideringer](/altinn-studio/v10/develop-a-service/logic/validation/).
- **condition** – Et dynamisk uttrykk som returnerer `true` hvis feilen skal vises, og `false` ellers. Se [dynamiske uttrykk](/altinn-studio/v10/reference/logic/expressions).

### Gjenbruke regler

Hvis du skal bruke den samme regelen flere steder, kan du gjøre den gjenbrukbar så du slipper å kopiere regelen. Det gjør du ved å definere regelen under `definitions`-objektet.
Du må gi regelen et navn som blir nøkkelen i objektet, og verdien er regelen. Eksempel:

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

Her er det definert en regel som heter `tegn-ikke-tillatt`. Legg merke til `dataModel`-uttrykket her. I stedet for å referere til én bestemt sti i datamodellen, brukes uttrykket `["argv", 0]`.
Dette er et spesielt uttrykk som returnerer et argument som kommer utenfra. Dette er foreløpig kun aktuelt i validering med uttrykk, og her sendes datamodellstien inn som det første og eneste argumentet når uttrykket kjører.
Dermed kan du gjenbruke samme uttrykk for ulike felter, fordi argumentet reflekterer hvilket felt valideringen kjører på.

Du kan bruke valideringsregler definert i `definitions` på et felt i `validations` ved å legge inn en streng med navnet på regelen, som ved `kontaktinfo.fornavn` og `kontaktinfo.etternavn` i eksempelet over.

Du kan også referere til en definert regel og deretter overstyre ett eller flere av feltene ved å legge inn et `ref`-felt med navnet på regelen, som ved `kontaktinfo.epost` i eksempelet over. Her brukes regelen `tegn-ikke-tillatt`, men `message`-feltet overstyres.


## Kjøre valideringene i backend

Som standard kjører validering med dynamikk bare i appens frontend, men for å sikre at dataen som sendes inn følger reglene du har satt opp, bør du også kjøre valideringene i backend slik at innsendinger via API også blir validert på samme måte.
Det gjør du ved å sette flagget `"ExpressionValidation": true` under `"AppSettings"` i `App/appsettings.json` som vist nedenfor:

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
