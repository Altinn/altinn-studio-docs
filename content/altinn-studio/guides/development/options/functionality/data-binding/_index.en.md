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

For multi-choice components such as [`Checkboxes`](../../../../../reference/ux/components/checkboxes) and
[`MultipleSelect`](../../../../../reference/ux/components/multipleselect), the component will store a comma-separated
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

In the example above, the component will store a comma-separated list of selected pets in the field `Submitter.Pets` in
the data model. If you choose "Cat" and "Fish", the field will get the value `"cat,fish"`. The order of the choices is
not guaranteed to be the same as the order of the options, nor the order the user chose them in.

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

This is configured by having a separate binding with the key `label`. The `label` binding should point to a field in the
data model of type `string`:

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

### Storing metadata

When fetching options, especially [shared common code lists](../../sources/shared), you might want to store some
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