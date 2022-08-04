
---
title: Hide instances
linktitle: Hide instances
description: Configuration for hiding instances from the message box.
weight: 200
---

For applications with a complex process flow it can be useful to hide
instances from the message box during parts of, or the whole, process.

## Configuration

{{% notice info  %}}
The configuration has a retroactive effect and will also apply to previously created instances.
{{% /notice %}}

Configuration for hiding instances is defined in `applicationmetadata.json`,
which you can find in ythe appliation repository in the folder `App/config`.

Add a new section called `messageBoxConfiguration` with the child property `hideSettings`.

HideSettings can consist of one of two properties

 Name         | Description
--------------|------------
hideOnTask  | A list of tasks where the instance should be hidden from the messagebox.
hideAlways  | A boolean indicating that the instance should always be hidden.

## Examples

The configuration for an application where instances should be hidden on `Task_1` and `Task_3`, but be visible for all other process tasks.

```json
"messageBoxConfig": {
  "hideSettings": {
      "hideOnTask":["Task_1", "Task_3"]
  }
}
```

The configuration for an application that should never be shown in the message box:

```json
"messageBoxConfig": {
  "hideSettings": {
      "hideAlways":true
  }
}
```