---
title: Code lists based on repeating groups from the data model
linktitle: From repeating groups
description: How to configure code lists that gets it's values from a repeating group from the datamodel?
weight: 150
---

Traditional options are based on resources fetched from the backend.
This approach differs a bit from this, as it enables setting up a direct connection from the options to the form data that is stored in app frontend.
A use case here would typically be if the user fills out a repeating list of data that should later be selected in a dropdown/checkbox/radiobutton.

### Configuration

To set up options from the data model we have set up a new property on `RadioButtons`, `Checkboxes`, and `Dropdown`-components called `source`.
This property contains the fields `group`, `label`, and `value`. Example:

```json {hl_lines=["5-9"]}
      {
        "id": "dropdown-component-id",
        "type": "Dropdown",
        ...
        "source": {
          "group": "some.group",
          "label": "dropdown.label",
          "value": "some.group[{0}].someField"
        }
      },
```

Explanation:

- **group** - the group field in the data model to base the options on
- **label** - a reference to a text id to be used as the label for each iteration of the group, see more below.
- **value** - a reference to a field in the group that should be used as the option value. Notice that we set up this `[{0}]` syntax. Here the `{0}` will be replaced by each index of the group.

Notice that the **value** field must be unique for each element. If the repeating group does not contain a field which is unique for each item it is recommended to add a field to the data model that can be used as identifier, for instance a GUID.

As for the **label** property, we have to define a text resource that can be used as a label for each repetition of the group.
This follows similar syntax as the **value**, and will also be familiar if you have used [variables in text](/nb/app/development/ux/texts).

Example text resource connected:

```json
{
  "language": "nb",
  "resources": [
    {
      "id": "dropdown.label",
      "value": "Person: {0}, Age: {1}",
      "variables": [
        {
          "key": "some.group[{0}].name",
          "dataSource": "dataModel.default"
        },
        {
          "key": "some.group[{0}].age",
          "dataSource": "dataModel.default"
        }
      ]
    }
  ]
}
```

In the example above we have two parameters in the text which is referencing fields in the group.
We also recognize the `[{0}]` syntax in the `key` prop which enables the usage of this label for each index in the group.
