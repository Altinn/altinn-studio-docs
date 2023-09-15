---
---

<!-- begin intro -->
### Kilde (`source`)

One way to add options is by linking the component to a code list based on form data stored within the app itself.
 You can do this by adding a source (`source`); please refer to the [documentation](/app/development/data/options/repeating-group-codelists/) for instructions on how to configure this.

<!-- end intro -->

<!-- begin asd -->

Settings in Altinn Studio.

{{% image file="component-settings/source.png" %}}

<!-- end asd -->

<!-- begin code -->

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