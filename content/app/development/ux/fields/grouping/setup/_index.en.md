---
title: Setup of field grouping
linktitle: Setup
description: General Setup for grouping fields in form.
weight: 1
---

Fields in a form can be set up to be part of a _group_. This can be used to e.g. set up dynamic on a single group of fields,
instead of on each single field. In addition, fields must be able to be grouped to support [repeating groups](#repeating-groups) in a form.

A group is set up in `FormLayout.json`, together with the other components in the form. This can be done manually directly in the file, 
or through form editor in Altinn Studio by using the group component.

Some things to note when manually setting up:

- The group must be placed _before_ any components that are to be included in the group in FormLayout.json
- A group _MUST_ have `type: "group"` set if it is to be recognized as a group

An example of a (repeating) group defined in `FormLayout.json` that contains four fields that can be repeated three times:
A group is defined as follows in FormLayout.json:

```json {hl_lines=[3,"8-12"]}
{
  "id": "<unik-id>",
  "type": "group",
  "dataModelBindings": {
    "group": "<gruppen i datamodellen (kun repeterende grupper)>"
  },
  "maxCount": "<Antall ganger gruppen kan repetere>",
  "children": [
    "<felt-id>",
    "<felt-id>",
    "osv..."
  ],
  "tableHeaders": [
    "<felt-id>"
  ],
  "textResourceBindings": {
    "add_button": "tekstressurs.felt"
  }
}
```

| Parameter             | Required | Description                                                                                                                               |
| --------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | Yes      | Unique ID, same as ID on other components. Must be unique in the FormLayout.json file.                                                    |
| type                  | Yes      | MUST be 'group'. Says that this is a group.                                                                                               |
| dataModelBindings     | No       | MUST be set for repeating groups, with the `group`-parameter like in the example above. Should point to the repeating group in the data model.|
| textResourceBindings  | No       | Can be set for repeating groups, see [description](#textResourceBindings).                                                                |
| maxCount              | Yes      | The number of times a group can repeat. Set to `1` if the group is not repeating.                                                         |
| children              | Yes      | List of the fields that are to be included in the group. Field-id from FormLayout.json is used here.                                      |
| tableHeaders          | No       | List of components that are to be included as part of the table header fields. If not specified, all components are displayed.            |                                                           |

## textResourceBindings
It is possible to add different keys in textResourceBindings to overrule default texts.
- `add_button` - is added at the end of the "Add new" text on the button, and can be used to e.g. get text that says "Add new person".
- `save_button` - is used as text on the "Save"-button when the user is filling out data.
- `edit_button_open` - is used as text on the "Edit"-button on the table when the user is opening an element.
- `edit_button_close` - is used as text on the "Edit"-button on the table when the user is closing an element.
