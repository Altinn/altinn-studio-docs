---
title: Configuration options for subform layout
linktitle: Configuration
description: Options for subform layout configuration
weight: 120
---

{{% notice warning  %}}
This documentation is a work in progess. Subforms are currently in preview-release.
{{% /notice %}}

## Parameters

| Parameter                                                       | Type   | Required | Description                                                                                                                           |
| --------------------------------------------------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                              | string | Yes      | Unique ID, same as ID on other components. Must be unique in the layout file, and should be unique across pages.                       |
| type                                                            | string | Yes      | Must be 'Subform'                                                                                                                     |
| layoutSet                                                       | string | Yes      | The layout set to load for this subform, must be unique IDs within layout-sets.json.                                                  |
| [tableColumns](#tablecolumns)                                   | array  | Yes      | Array of objects containing column definitions for the subform table. Each entry provides a header, cell query and cell default value. |
| showAddButton                                                   | bool   | No       | Allow users to add subforms. Defaults to true.                                                                                        |
| showDeleteButton                                                | bool   | No       | Allow users to delete subforms. Defaults to true.                                                                                     |
| [textResourceBindings](#textresourcebindings)                   | object | No       | Object describing text resource bindings for the subform component.                                                                   |

## textResourceBindings

The following keys in the `textResourceBindings` object are available for customization:

- `title` - The title of the subform component.
- `description` - The description text shown underneath the title.
- `addButton` - The text for the add-button.

## tableColumns

The `tableColumns` entry contains a list of objects that define the columns of the subform table.

Each entry must contain a `headerContent` and `cellContent` definition. `cellContent` is in turn also an object,
which must include a `query` parameter alongside an optional `default` parameter.

{{< notice info >}}
The *query* value is a lookup path for the subform's data model. 

Eg. `propertyName` or `propertyName.nestedProperty`
{{< /notice >}}

```json
"tableColumns": [
  {
    "headerContent": "Name",
    "cellContent": {
      "query": "name"
    }
  },
  {
    "headerContent": "Age",
    "cellContent": {
      "query": "age",
      "default": "[Unknown age]"
    }
  },
]
```