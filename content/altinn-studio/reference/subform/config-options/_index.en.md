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

| Parameter                                                                                                                 | Required | Description                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| id                                                                                                                        | Yes      | Unique ID, same as ID on other components. Must be unique in the layout file, and should be unique across pages.         |
| type                                                                                                                      | Yes      | Must be 'Subform'                                                                                                        |
| layoutSet                                                                                                                 | Yes      | The layout set to load for this subform, must be unique IDs within layout-sets.json.                                     |
| [tableColumns](../../../../app/development/ux/fields/grouping/repeating/table/#widths-alignment-and-overflow-for-columns) | Yes      | Object containing column options for specified headers. If not specified, all columns will use default display settings. |
| showAddButton                                                                                                             | No       | Allow users to add subforms.                                                                                             |
| showDeleteButton                                                                                                          | No       | Allow users to delete subforms.                                                                                          |
| [textResourceBindings](#textresourcebindings)                                                                             | No       | Can be set for subform, see [description](#textresourcebindings).                                                        |

showAddButton

## textResourceBindings

It is possible to add different keys in textResourceBindings to overrule default texts.

- `title` - The title of the subform component.
- `description` - The description text shown underneath the title.
- `addButton` - The text for the Add button (used as a suffix after the default button text).
