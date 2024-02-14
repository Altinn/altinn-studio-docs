---
title: Dynamic behaviour in repeating groups
linktitle: Dynamics
description: How to hide rows in a repeating group
---

## Hide rows within repeating groups

Sometimes you want to hide rows within repeating groups when some criteria are met.
This can be done with expression by using the `hiddenRow` property. The example below shows how to
hide a row when the firstName within the data model is equal to "John".

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v4 (App Frontend)">}}

```json {linenos=inline}
{
  "id": "myGroup",
  "type": "RepeatingGroup",
  "hiddenRow": ["equal", ["dataModel", "firstName"], "John"],
  ...
}
```

{{</content-version-container >}}
{{<content-version-container version-label="v3 (App Frontend)">}}

```json {linenos=inline}
{
  "id": "myGroup",
  "type": "Group",
  "hiddenRow": ["equal", ["dataModel", "firstName"], "John"],
  ...
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

You can read more about [expressions here](/app/development/logic/expressions).
