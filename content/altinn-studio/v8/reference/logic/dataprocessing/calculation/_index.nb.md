---
title: Kalkulering av datafelt ved hjelp av uttrykk
description: Hvordan konfigurere kalkulering ved hjelp av dynamiske uttrykk
toc: true
---

Kalkulering av datafelt ved hjelp av uttrykk gjør det mulig 
å sette datamodellfelt med uttryksmotoren gjennom en json 
schema spec.

## Hvordan konfigurere kalkulering med uttrykk

{{% notice info %}}
Kalkulering med uttrykk kan ikke konfigureres igjennom Altinn Studio Designer per nå.
{{% /notice %}}

Kalkulering med uttryk defineres i en egen fil ved siden av datamodellen din, og bruker navne-konvensjonen `navn.calculation.json`.
Hvis datamodellen din heter `skjema` skal du blant annet ha filene `skjema.cs` og `skjema.schema.json` fra før, og da skal filen du oppretter ligge i samme mappe, og hete `skjema.calculation.json`.
Du kan kopiere innholdet nedenfor som et utgangspunkt:

{{< code-title >}}
template.calculation.json
{{< /code-title >}}
```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/calculation/calculation.schema.v1.json",
  "calculations": {},
  "definitions": {}
}
```

### Definere en validerings-regel

Nedenfor kan du se et eksempel på en kalkulering av feltet `regnskap.sum` i datamodellen:

{{< code-title >}}
example.calculation.json
{{< /code-title >}}
```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/calculation/calculation.schema.v1.json",
  "calculations": {
    "regnskap.sum": [
      {
        "condition": 
          ["minus", 
            ["datamodel", "regnskap.inntekter"], ["dataModel", "regnskap.utgifter"]
          ]
      }
    ]
  },
  "definitions": {}
}
```

Reglene for feltene i datamodellen settes i `calculations`-objektet, hvor datamodell-stien er nøkkelen, og verdien er en liste med regler.

I motsetning til validering ved hjelp av uttrykk, støtter ikke kalkuleringer ved hjelp av uttrykk lister.

En regel består av en **condition**, som er et dynamisk uttrykk som returnerer en hvilke som helst objekttype. Se [dynamiske uttrykk](/nb/altinn-studio/v8/reference/logic/expressions/) for mer informasjon.

[//]: # (Hør med Squad om dette egentlig gir mening, klarer ikke helt å finne godt use case for dette)
### Gjenbruk av regler

Dersom den samme regelen skal brukes flere steder, går det an å lage den gjenbrukbar så du slipper å kopiere regelen. Det gjøres ved å definere regelen som skal gjenbrukes under `definitions`-objektet.
Da må du gi regelen et navn, og det blir nøkkelen i objektet hvor verdien er regelen. Eksempel:

{{< code-title >}}
example2.calculation.json
{{< /code-title >}}

```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/calculation/calculation.schema.v1.json",
  "calculations": {
    "prefered-language": ["application-language"]
  },
  "definitions": {
    "application-language": {
      "condition":  ["language",
          ["datamodel", "regnskap.inntekter"], ["dataModel", "regnskap.utgifter"]
        ]
    }
  }
}
```

[//]: # (Hør med Squad end)

