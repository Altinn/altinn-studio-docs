---
title: Data binding
description: What can be stored in the data model
weight: 50
---

### Storing the chosen option

{{<notice info>}}
Below are some examples of setting up data binding for components using options. For some components, the setup will be
different, and it is recommended to look at the specific documentation for the component for more information.
{{</notice>}}

Components using options must be set up to store the selected options in the data model. Usually, the component will
store the value of the selected option in the data model against a field of type `string`, set up in the component
configuration with the key `simpleBinding`:

```json {hl_lines=["8"]}
{
  "id": "single-choice-component",
  "type": "RadioButtons",
  "textResourceBindings": {
    "title": "Do you own a cat?"
  },
  "dataModelBindings": {
    "simpleBinding": "Submitter.HasCat"
  },
  "options": [
    { "value": "y", "label": "Yes" },
    { "value": "n", "label": "No" }
  ]
}
```

In the example above, the component will store the choice of whether the user owns a cat in the field `Submitter.HasCat`
in the data model. This field will get the value `y` if the user chooses "Yes" and `n` if the user chooses "No".

For multi-choice components such as [`Checkboxes`](/en/altinn-studio/v8/reference/ux/components/checkboxes/) and
[`MultipleSelect`](/en/altinn-studio/v8/reference/ux/components/multipleselect/), the component will store a comma-separated
list of selected values in the data model.

```json
{
  "id": "multi-choice-component",
  "type": "Checkboxes",
  "textResourceBindings": {
    "title": "Which pets do you have?"
  },
  "dataModelBindings": {
    "simpleBinding": "Submitter.Pets"
  },
  "options": [
    { "value": "cat", "label": "Cat" },
    { "value": "dog", "label": "Dog" },
    { "value": "fish", "label": "Fish" }
  ]
}
```

In the example above, the component stores the selected pets in the field `Submitter.Pets` in the data model.
If you select "Cat" first and then "Fish", the field gets the value `"cat,fish"`.
If you select them in the opposite order, the field gets the value `"fish,cat"`.
The stored values can therefore have a different order from the options displayed in the form.

{{<notice warning>}}
Note that the value for each option must be unique, and if you use multi-choice components, none of the values can
contain a comma.
{{</notice>}}

### Storing the label

Components using options will usually only store the value of the selected option in the data model. While this is
usually sufficient, there are cases where you might want to store the label of the selected option as well. This can
be useful for displaying the selected option in a simple presentation of the data without additional lookups or if
you have a requirement to remember the label the user actually picked in case it has changed over time. When storing
the label in the data model, it will respect the user's chosen language, look up the actual text from the text resources
and store the final value in the data model.

Add a separate binding with the key `label`. For single-choice components such as `Dropdown` and `RadioButtons`,
this binding must point to a field of type `string`:

```json {hl_lines=["6"]}
{
  "id": "dropdown-component",
  "type": "Dropdown",
  "dataModelBindings": {
    "simpleBinding": "municipality.value",
    "label": "municipality.label"
  },
  "optionsId": "municipalities"
}
```

For multi-choice components such as `Checkboxes` and `MultipleSelect`, the `label` binding must point to a list of
strings, `string[]`. The `simpleBinding` still points to a `string` containing comma-separated values. Labels use a
list because the label text itself can contain commas.

#### Example of ordering in stored data

In an application form, the user selects the municipalities where their business operates. The component
below displays municipalities alphabetically using `sortOrder: "asc"`. The `label` binding stores the text
of the selected options in the data model. This is the text the user sees beside each checkbox, such as "Stavanger".

```json
{
  "id": "municipalities",
  "type": "Checkboxes",
  "textResourceBindings": {
    "title": "In which municipalities does the business operate?"
  },
  "dataModelBindings": {
    "simpleBinding": "Business.Municipalities",
    "label": "Business.MunicipalityLabels"
  },
  "sortOrder": "asc",
  "options": [
    { "value": "1103", "label": "Stavanger" },
    { "value": "1108", "label": "Sandnes" },
    { "value": "1124", "label": "Sola" }
  ]
}
```

Define the fields under `Business` in the data model's JSON Schema as follows:

```json
"Municipalities": {
  "type": "string"
},
"MunicipalityLabels": {
  "type": "array",
  "items": { "type": "string" }
}
```

The user sees the options in the order **Sandnes, Sola, Stavanger**, but selects **Stavanger** first,
then **Sandnes**, then **Sola**. `Checkboxes` stores the municipality codes in selection order,
`"1103,1108,1124"`.

Before app-frontend v4.35.0, the stored labels followed the display order of the options. From v4.35.0,
they follow the order of the stored values:

| Field in the data model | Before app-frontend v4.35.0 | From app-frontend v4.35.0 |
| --- | --- | --- |
| `Business.Municipalities` | `"1103,1108,1124"` | `"1103,1108,1124"` |
| `Business.MunicipalityLabels` | `["Sandnes", "Sola", "Stavanger"]` | `["Stavanger", "Sandnes", "Sola"]` |

From app-frontend v4.35.0, the stored labels follow the order of the stored values.
After splitting `Business.Municipalities` on commas, each value corresponds to the label at the same index in
`Business.MunicipalityLabels`. For example, the first value, `1103`, corresponds to the first label,
`"Stavanger"`. In earlier versions, using the same index could give the wrong municipality, such as
`1103` and `"Sandnes"` in this example.

The change only affects the order of labels stored in the data model. The user still sees the options in
the order **Sandnes, Sola, Stavanger**. If you change how the options are sorted, the stored labels still
follow the order of the stored values.

If you use the `group` binding to store choices in a repeating structure, each row stores its own value and label.
In that case, `label` must point to a `string` field inside the row, rather than a separate list of labels.

### Storing metadata

When fetching options, especially [shared common code lists](/en/altinn-studio/v8/guides/development/options/sources/shared/), you might want to store some
metadata describing how the options were fetched. This can be useful for reconstructing the options after the form
has been submitted, as well as for logging purposes.

This can be configured by setting the `metadata` property on the components `dataModelBinding` property to a field
in the data model containing a `string` value:

```json {hl_lines=["9"]}
{
  "id": "some-dropdown-component",
  "type": "Dropdown",
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype",
    "metadata":  "soknad.nyGaranti.loyvetypeMetadata"
  },
  "required": true,
  "optionsId": "loyvetyper",
  "mapping": {
    "soknad.transportorOrgnummer": "orgnummer"
  }
}
```

This configuration will store the metadata of the retrieved options as a comma separated string in the
field `soknad.nyGaranti.loyvetypeMetadata` in the data model.