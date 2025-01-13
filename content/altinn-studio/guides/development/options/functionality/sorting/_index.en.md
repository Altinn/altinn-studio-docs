---
title: Sorting
description: Sorting the options in the list
weight: 300
---

Options are usually displayed in the order they are defined, but it is also possible to sort them alphabetically by
label. This can be useful to make it easier for the user to find the option they are looking for when the list does not
need to be in a specific order.

Worth knowing:

1. The sorting can change along the way if the user changes the language in the form.
2. The actual sorting is done after the [preselected value](../preselection) has been found. This means that
   the sorting order should not affect which option is preselected.

### Configuration

The `sortOrder` property is optional, and can be set to one of the following values:

- `asc` (ascending) - sorts in ascending order. Texts are sorted alphabetically from A to Z.
- `desc` (descending) - sorts in descending order. Texts are sorted alphabetically from Z to A.

Example configuration:

```json {hl_lines=[10]}
{
  "id": "sort-example",
  "type": "RadioButtons",
  "options": [
    { "value": "1", "label": "Cow" },
    { "value": "2", "label": "Alligator" },
    { "value": "3", "label": "Cat" },
    { "value": "4", "label": "Dog" }
  ],
  "sortOrder": "asc",
  "preselectedOptionIndex": 0
}
```

In the configuration above, the options will be sorted alphabetically in ascending order, and "Cow" will be preselected
even if it is not the first option displayed for the user.