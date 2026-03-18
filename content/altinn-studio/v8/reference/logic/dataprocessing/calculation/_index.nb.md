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

Kalkulering med uttrykk defineres i en egen fil ved siden av datamodellen din, og bruker navnekonvensjonen `navn.calculation.json`.
Hvis datamodellen din heter `skjema` skal du blant annet ha filene `skjema.cs` og `skjema.schema.json` fra før, og da skal filen du oppretter ligge i samme mappe, og hete `skjema.calculation.json`.
Du kan kopiere innholdet nedenfor som et utgangspunkt:

{{< code-title >}}
template.calculation.json
{{< /code-title >}}
```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/calculation/calculation.schema.v1.json",
  "calculations": {}
}
```

### Definere en kalkuleringsregel

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
        "expression": 
          ["minus", 
            ["dataModel", "regnskap.inntekter"], ["dataModel", "regnskap.utgifter"]
          ]
      }
    ]
  }
}
```

Reglene for feltene i datamodellen settes i `calculations`-objektet, hvor datamodell-stien er nøkkelen, og verdien er en liste med regler.

I motsetning til validering ved hjelp av uttrykk, støtter ikke kalkuleringer ved hjelp av uttrykk lister.

En regel består av en **condition**, som er et dynamisk uttrykk som returnerer et hvilke som helst nummer, boolean eller streng verdi. Se [dynamiske uttrykk](/nb/altinn-studio/v8/reference/logic/expressions/) for mer informasjon.