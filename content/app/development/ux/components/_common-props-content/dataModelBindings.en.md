# Innhold

<!-- begin intro -->
### Data Model

To store and manipulate the data collected by the component, the component must be linked to a field in a [data model](/app/development/data/data-modeling/#data-models).
 The option values are stored as strings.

<!-- end intro -->


<!-- begin asd -->

Select the field you want to link the component to from the dropdown menu.
 If there are no fields available, you must first [upload a data model](/app/development/data/data-modeling/#upload-and-display-data-model).

<!-- Bilde må ligge i /assets/images/component-settings. Erstatt filnavn. -->
{{% image file="component-settings/dataModelBindings.png" %}}

<!-- end asd -->


<!-- begin code -->

{{< code-title >}}
App/ui/layouts/{page}.json
{{< /code-title >}}

```json{hl_lines="4-6"}
{
  "id": "komponent-id",
  ...
  "dataModelBindings": {
    "simpleBinding": "MyDataModel.SomeField"
    }
}
```

<!-- end code -->


<!-- begin more -->


<!-- end more -->