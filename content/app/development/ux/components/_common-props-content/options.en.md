---
hidden: true
---

<!-- begin intro -->
#### Manually (`options`)

<!-- end intro -->


<!-- begin asd -->

Select "Manuelt" and click "Legg til flere" to add a new option. Choose or create a new text to add a label (`label`).

The option comes with a pre-filled value (`value`), which is the data that is stored when the user makes a selection.
 The value is stored as a string and can be changed as you wish.

{{% image file="component-settings/options-checkboxes.png" %}}

<!-- end asd -->


<!-- begin code -->

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-9"}
{
  "id": "komponent-id",
  ...
  "options": [
          {
            "label": "Alternativ 1",
            "value": "1"
          }
        ]
}
```

<!-- end code -->


<!-- begin more -->


<!-- end more -->