---
headless: true
hidden: true
---
Calculations with expressions are defined in a separate file next to your data model, using the naming convention `name.calculation.json`.
If your data model is called `skjema`, you will already have files like `skjema.cs` and `skjema.schema.json`, and the file you create should be in the same folder and called `skjema.calculation.json`.
You can copy the content below as a starting point:

{{< code-title >}}
template.calculation.json
{{< /code-title >}}
```json
{
  "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/calculation/calculation.schema.v1.json",
  "calculations": {}
}
```

### Define a calculation rule

Below you can see an example of a calculation of the field `regnskap.sum` in the data model:

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

The rules for the fields in the data model are set in the `calculations` object, where the data model path is the key and the value is a rule.

Unlike validation using expressions, calculations using expressions do not support lists.

A rule consists of a **expression**, which is a dynamic expression that returns any number, boolean or string value. See [dynamic expressions](/en/altinn-studio/v8/reference/logic/expressions/) for more information.