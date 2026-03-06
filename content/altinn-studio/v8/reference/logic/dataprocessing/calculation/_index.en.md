Calculation of data fields using expressions makes it possible
to set data model fields with the expression engine through a JSON
schema spec.

## How to configure calculation with expressions

{{% notice info %}}
Calculation with expressions cannot be configured through Altinn Studio Designer at present.
{{% /notice %}}

Calculation with expressions is defined in a separate file next to your data model, using the naming convention `name.calculation.json`.
If your data model is called `skjema`, you will already have files like `skjema.cs` and `skjema.schema.json`, and the file you create should be in the same folder and called `skjema.calculation.json`.
You can copy the content below as a starting point:

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

### Define a validation rule

Below you can see an example of a calculation of the field `regnskap.sum` in the data model:

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

The rules for the fields in the data model are set in the `calculations` object, where the data model path is the key and the value is a list of rules.

Unlike validation using expressions, calculations using expressions do not support lists.

A rule consists of a **condition**, which is a dynamic expression that returns any object type. See [dynamic expressions](/altinn-studio/v8/reference/logic/expressions/) for more information.
