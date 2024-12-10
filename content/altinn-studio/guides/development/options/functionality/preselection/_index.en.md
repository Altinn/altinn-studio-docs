---
title: Pre-selection
description: Making one option selected by default
weight: 250
---

In some cases it is desirable that one of the options is pre-selected. There are different ways to achieve this.

1. In the data model, you can [prefill the field](../../../prefill) with the desired value. Note that
   the value must also belong to one of the valid options for components linked to this field in the data model,
   otherwise the [value will be automatically cleaned up](../automatic-cleanup).
2. While filling out the form, you can also use [data processing](../../../../../reference/logic/dataprocessing)
   to set the field to a desired pre-selected value. Beware that in some cases it is important to allow the user
   to _not choose an option_. If the field is simply overwritten when it lacks a value, the user will not be able
   to remove a pre-selected option using this approach.
3. Use the `preselectedOptionIndex` property, as described here. This allows the component itself to automatically choose
   a numbered position in the list of options as pre-selected.

### The `preselectedOptionIndex` property

This property allows you to choose an option as pre-selected. It takes an integer as an argument, which is the index
of the option that should be pre-selected. The index starts at 0 for the first option, 1 for the second option, etc.

```json
{
  "id": "my-component-id",
  "type": "Checkboxes",
  ...
  "options": [
    { "value": "red", "label": "Red" },
    { "value": "blue", "label": "Blue" },
    { "value": "green", "label": "Green" }
  ],
  "preselectedOptionIndex": 1
}
```

In the configuration above, "Blue" will be pre-selected when the component is displayed. The user can still choose
another option, and since this is a multi-select component, the user can also remove the pre-selection by clicking
the pre-selected option again.

This functionality follows a set of rules:

1. If the data model already has a value for the field, the pre-selection will not be set.
2. If a pre-selected value has already been set earlier (and e.g. deselected), this will not happen again as long as
   the app is open in the browser. If the user reloads the page, the pre-selection may be set again.
3. The pre-selection is set as soon as the page has loaded and the components are ready, regardless of whether the
   component is visible on the screen or not.
4. Pre-selected values are not set for components that are hidden using [dynamics](../../../dynamics). If
   the component is shown again later, the pre-selection may be set.

{{% notice warning %}}
There are situations where pre-selection with this property is not optimal, and can lead to situations that may be
perceived as erroneous:

1. If an option is selected, the user deselects it, and reloads the form later, the pre-selection will be set again -
   even if the component is on a page the user has already filled out and won't see again.
2. When the form is submitted via the API, pre-selections set with this property will have no effect. This property
   requires that the form is open in the browser to work.
3. If the form is in a state where the data model is not writable or locked (e.g. in the PDF generator),
   setting pre-selected values can lead to error messages and failed submissions.

For these reasons, it is recommended to use this property with caution, and to consider one of the other alternative
methods for pre-selection described above.
{{% /notice %}}
