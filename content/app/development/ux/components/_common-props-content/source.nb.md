---
hidden: true
---

<!-- begin intro -->
#### Kilde (`source`)

En måte å legge til alternativer er å koble komponenten til en kodeliste basert på skjemadata lagret i selve appen.
 Dette gjør du ved å legge til en kilde (`source`); se [dokumentasjon](/nb/app/development/data/options/repeating-group-codelists/) for hvordan dette konfigureres.
<!-- end intro -->


<!-- begin asd -->
Innstillinger i Altinn Studio.

{{% image file="component-settings/source.png" %}}
<!-- end asd -->


<!-- begin code -->
{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-9"}
{
  "id": "komponent-id",
  ...
  "source": {
    "group": "some.group",
    "label": "dropdown.label",
    "value": "some.group[{0}].someField",
    "description": "",
    "helpText": ""
  }
}
...
```
<!-- end code -->


<!-- begin more -->

<!-- end more -->