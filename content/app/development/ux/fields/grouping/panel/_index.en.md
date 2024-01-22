---
title: Group displayed as panel
linktitle: Panel
description: Configuration details for groups displayed as panels
---

{{% notice warning %}}
This concept is not available from version 4 of the App Frontend. See [non-repeating groups](../non-repeating/_index.en.md) for more information about how to visually group components.
{{% /notice %}}

## Display group as part of Panel

On a Group component, the parameter `panel` can be set up.
This says that the group should be displayed as part of the [Panel component](../../../components/panel).

Here, you will recognize the appearance and settings that can be set on the panel component. Example configuration:

```json
{
  "id": "input-panel-group",
  "type": "Group",
  "children": [
    "child1",
    "child2"
  ],
  "dataModelBindings": {},
  "textResourceBindings": {
    "title": "This is just a demo of input panel outside of repeating group",
    "body": "Here I just see that things work as expected."
  },
  "panel": {
    "variant": "info"
  }
}
```

Here the group has been set up to be displayed as a panel with the variant "info". The setup is otherwise exactly the same as a regular group.

This will give the following output:

![Group with panel](input-panel.jpeg "Group with panel")

It is possible to configure the following settings in the `panel` field of a group:

| Parameter      | Required | Description                                                                                                                                                                                |
|----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| variant        | Yes      | Which variant of panel the group should be placed in. Available values are "info", "success" and "warning"                                                                                 |
| iconUrl        | No       | If you want your own icon as part of a panel, this can be set. Relative or full path, e.g. "awesomeIcon.png" or "http://cdn.example.com/awesomeIcon.png"                                   |                                                                                           |
| iconAlt        | No       | Alternate text for the custom icon. Can only be set if iconUrl has been set. Can be plain text or a reference to a text resource.                                                          |

Example:

```json
{
  "id": "input-panel-group",
  "type": "Group",
  "panel": {
    "variant": "info",
    "iconUrl": "kort.svg",
    "iconAlt": "Betalingskort ikon"
  }
}
```
