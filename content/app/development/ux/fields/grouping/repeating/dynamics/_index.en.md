---
title: Dynamic behaviour in repeating groups
linktitle: Dynamics
description: How to hide rows in a repeating group
---

## Hide rows within repeating groups

Sometimes you want to hide rows within repeating groups when some criteria are met.
This can be done with expression by using the `hiddenRow` property. The example below shows how to
hide a row when the firstName within the data model is equal to "John".

```json {linenos=inline}
{
  "id": "myGroup",
  "type": "group",
  "hiddenRow": ["equal", ["dataModel", "firstName"], "John"],
}
```
You can read more about [expressions here](/app/development/logic/expressions).

## Filter (deprecated)

{{%notice warning%}}
This functionality will be deprecated and you should use `hiddenRow` with expressions instead. Read more above.
{{% /notice %}}

Support to filter elements in group, so that only the elements matching the defined criteria are displayed.
E.g. in a group displaying work experience, only display the elements where the workplace was Oslo.
List of criteria is based on values of one or more fields in the group, on the format:

```json
"edit": {
  "filter": [
    { "key": "<felt i datamodell>", "value": "<ønsket verdi>" }
  ]
}
```

If there are multiple criteria, all must match for the element to be displayed.

If there is only one result, this is displayed automatically in editing-mode. If there are multiple elements in the group that match the filter, these will be displayed.
Other elements in the group will be hidden. `filter` can be combined with the `mode`-parameter.

{{%notice warning%}}
If you combine `"mode": "showAll"` with `"filter"`, it will not be possible to add more elements to the group. This is because with "showAll" only the editing area is displayed,
and as long as the filter does not match, the element will not be displayed.
{{% /notice %}}