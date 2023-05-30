---
title: Repeating groups
linktitle: Repeating
description: Setup for repeating groups
weight: 1
---

Groups in the data model contain one or more fields. Groups are defined as _repeating_ if they have `maxCount > 1` in
the layout configuration. A group that is repeating in the data model must also be set up as repeating in the form, if
not, data saving will fail. In JSON, a repeating group is defined as an array of objects, where each object is a group.
In XML, a repeating group is defined as a list of elements, where each element is a group/object with properties.

## Example

Below is a form with a repeating group that:

- Contains two components (checkbox and address)
- Can be repeated up to three times
- Is bound to the data model group/array `GruppeListe`

![Form with repeating group](repeating-groups-demo.gif "Form with repeating group")

{{% expandlarge id="full-example" header="Show configuration for this screenshot" %}}
```json {linenos=inline}
[
  {
    "id": "gruppe",
    "type": "Group",
    "children": [
      "avkrysningsboks",
      "adresse"
    ],
    "maxCount": 3,
    "dataModelBindings": {
      "group": "GruppeListe"
    }
  },
  {
    "id": "avkrysningsboks",
    "type": "Checkboxes",
    "textResourceBindings": {
      "title": "Avkrysningsboks"
    },
    "dataModelBindings": {
      "simpleBinding": "GruppeListe.Avkrysning"
    },
    "options": [
      {
        "label": "Navn",
        "value": "Verdi1"
      },
      {
        "label": "Adresse",
        "value": "Verdi2"
      }
    ],
    "required": true
  },
  {
    "id": "addresse",
    "type": "AddressComponent",
    "textResourceBindings": {
      "title": "Adresse" 
    },
    "dataModelBindings": {
      "address": "GruppeListe.Adresse",
      "zipCode": "GruppeListe.Postnr",
      "postPlace": "GruppeListe.Poststed"
    },
    "simplified": true,
    "readOnly": false,
    "required": true
  }
]
```
{{% /expandlarge %}}

## Parameters

| Parameter                                                        | Required | Description                                                                                                                    |
|------------------------------------------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------|
| id                                                               | Yes      | Unique ID, same as ID on other components. Must be unique in the layout file, and should be unique across pages.               |
| type                                                             | Yes      | Must be 'Group'                                                                                                                |
| dataModelBindings                                                | No       | Must be set for repeating groups with form components inside. Should point to the repeating group in the data model.           |
| [textResourceBindings](#textresourcebindings)                    | No       | Can be set for repeating groups, see [description](#textresourcebindings).                                                     |
| maxCount                                                         | Yes      | The number of times a group can repeat. Must be set to `1` or more for the group component to work as a repeating group.       |
| children                                                         | Yes      | List of the component IDs that are to be included in the repeating group.                                                      |
| [edit](edit)                                                     | No       | Options for how to display the group when editing a row.                                                                       |
| tableHeaders                                                     | No       | List of components that are to be included as part of the table header fields. If not specified, all components are displayed. |
| [tableColumns](table/#widths-alignment-and-overflow-for-columns) | No       | Object containing column options for specified headers. If not specified, all columns will use default display settings.       |

## textResourceBindings

It is possible to add different keys in textResourceBindings to overrule default texts.

- `title` - title to show above the group row in a [Summary component](../../../pages/summary).
- `add_button` - is added at the end of the "Add new" text on the button, and can be used to e.g. get text that says "Add new person".
- `add_button_full` - is used as custom text on the "Add new" button. Overrides `add_button` if both are set.
- `save_button` - is used as text on the "Save" button when the user is filling out data.
- `save_and_next_button` - is used as text on the "Save and open next" button if enabled.
- `edit_button_open` - is used as text on the "Edit" button on the table when the user is opening an element.
- `edit_button_close` - is used as text on the "Edit" button on the table when the user is closing an element.

{{<children />}}
