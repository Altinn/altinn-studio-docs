---
headless: true
hidden: true
---
Kalkulering med uttrykk defineres i en egen fil ved siden av datamodellen din, og bruker navnekonvensjonen `navn.calculation.json`.
Hvis datamodellen din heter `skjema`, har du allerede filene `skjema.cs` og `skjema.schema.json`. Den nye filen skal ligge i samme mappe og hete `skjema.calculation.json`.
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
    "regnskap.sum": {
      "expression":
      ["minus",
        ["dataModel", "regnskap.inntekter"], ["dataModel", "regnskap.utgifter"]
      ]
    }
  }
}
```

Reglene for feltene i datamodellen settes i `calculations`-objektet, der datamodellstien er nøkkelen, og verdien er en regel.

I motsetning til validering med uttrykk, støtter ikke kalkuleringer med uttrykk lister.

En regel består av en **expression**, som er et dynamisk uttrykk som returnerer et tall, en boolsk verdi eller en streng. Se [dynamiske uttrykk](/nb/altinn-studio/v8/reference/logic/expressions/) for mer informasjon.
