---
title: Data binding
description: What can be stored in the data model
---

### Storing the label

Components using options will usually only store the value of the selected option in the data model. While this is
usually sufficient, there are cases where you might want to store the label of the selected option as well. This can
be useful for displaying the selected option in a simple presentation of the data without additional lookups or if
you have a requirement to remember the label the user actually picked in case it has changed over time. When storing
the label in the data model, it will respect the users chosen language, look up the actual text from the text resources
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