---
title: Multiple pages within a group
linktitle: MultiPage
description: How to show components in a group in multiple pages
---

## Multiple pages within group-display

{{% notice info %}} This functionality is as of today only available for repeating groups. Displaying of groups over
multiple pages inside the editing area of the group is only supported for groups at the top level, and is not supported
for nested groups. {{% /notice %}}

When entering data in a group, there may be incidents where each element in the group contains multiple fields, which may result in a lot of scrolling
and confusion for the user. To solve this, there has been implemented a possibility to split the fill out over multiple pages, which the user can navigate
through while filling out the group element. The navigation takes place within a layout, and updates
only the display within the editing area of the group.

To make use of this functionality, you will have to _prefix_ the components in the `children` list with a number indicating which "page" of the fill out
the component should be displayed on, followed by `:`. We start the count on `0`, that is to say components to be displayed on the first "page" must be prefixed with
`0:`. Components to be displayed on the second page must be prefixed with `1:`, and so on. In addition, you must set `"multiPage": true` in the `edit`-parameter.
See example below:

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v4 (App Frontend)">}}

```json {hl_lines=["5-8", "14-16"]} {linenos=inline}
{
  "id": "Some-group-id",
  "type": "RepeatingGroup",
  "children": [
    "0:fnr",
    "1:fornavn",
    "1:mellomnavn",
    "1:etternavn"
  ],
  "maxCount": 10,
  "dataModelBindings": {
    "group": "familie.barn"
  },
  "edit": {
    "multiPage": true,
    "mode": "hideTable",
  }
}
```

{{</content-version-container >}}
{{<content-version-container version-label="v3 (App Frontend)">}}


```json {hl_lines=["5-8", "14-16"]} {linenos=inline}
{
  "id": "Some-group-id",
  "type": "Group",
  "children": [
    "0:fnr",
    "1:fornavn",
    "1:mellomnavn",
    "1:etternavn"
  ],
  "maxCount": 10,
  "dataModelBindings": {
    "group": "familie.barn"
  },
  "edit": {
    "multiPage": true,
    "mode": "hideTable",
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

Here a [mode](../edit#mode) that hides the table when editing has also been added.
The result will be as displayed below.

![Fill-out of group over multiple "pages"](group-multipage.gif "Fill-out of group over multiple pages")
