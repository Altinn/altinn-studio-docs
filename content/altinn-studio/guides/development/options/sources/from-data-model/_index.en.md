---
title: Code list from repeating structures
linktitle: From data model
description: Code list made from a repeating structure in the data model
weight: 150
aliases:
  - /altinn-studio/guides/development/options/repeating-group-codelists
---

In the previous section about [dynamic code lists](../dynamic) we covered how to write code on the backend to generate a dynamic code list for a component. You could use pass certain values from the data model to the backend to generate that code list (via [query parameters](../dynamic#query-parameters)), but that approach scales poorly when the query parameters would end up changing the code list frequently, i.e. when the options are functionally unique for some set of data in the data model.

Another approach is to set up a code list based on a 'repeating group' in the data model. Such a repeating object in the data model could also represent a list of options for a dropdown, radio buttons, or checkboxes. This is especially useful combined with the [RepeatingGroup](../../../../../reference/ux/fields/grouping/repeating) component, as it allows the user to add and remove items from the list, and the code list will automatically update.

This functionality does not require the use of any `RepeatingGroup` component in the form layout, but it does require that the data model contains a repeating structure.

### Configuration

To set up a code list derived from the data model, use the `source` property in your component configuration.
This property contains the fields `group`, `label`, and `value`. Example:

```json {hl_lines=["5-9"]}
{
  "id": "dropdown-component-id",
  "type": "Dropdown",
  ...
  "source": {
    "group": "some.group",
    "label": "dropdown.label",
    "value": "some.group[{0}].someField"
  }
}
```

Explanation:

- **group** - the repeating group field in the data model to base the code list on
- **label** - a reference to a text id to be used as the label for each option, see more below.
- **value** - a reference to a field in the group that should be used as the option value. Notice that we set up a placeholder `[{0}]` that will be replaced with the index of the repeating element.

The **value** field must be unique for each element. If the repeating group does not contain a field which is unique for each item it is recommended to add a field to the data model that can be used as identifier, for instance a GUID. Non-unique values will be filtered out from all code lists, so not choosing a unique value can make it seem like the code list is not being correctly populated.

As for the **label** property, you have to define a text resource that can be used as a label for each option.
In the example below, other values from the repeating structure is used in the label via [variables in text](/altinn-studio/reference/ux/texts):

```json
{
  "language": "nb",
  "resources": [
    {
      "id": "dropdown.label",
      "value": "Person: {0}, Age: {1}",
      "variables": [
        {
          "key": "some.group[{0}].name",
          "dataSource": "dataModel.default"
        },
        {
          "key": "some.group[{0}].age",
          "dataSource": "dataModel.default"
        }
      ]
    }
  ]
}
```

### Expression support

The properties `label`, `description`, and `helpText` can also be [dynamic expressions](../../../dynamics) in this mode.

```json {hl_lines=["9-14"]}
{
  "id": "checkboxes-component-id",
  "type": "Checkboxes",
  ...
  "source": {
    "group": "some.group",
    "label": "checkboxes.label",
    "description": "checkboxes.description",
    "helpText": [
      "if", ["equals", ["dataModel.someField"], "someValue"],
        "checkboxes.helpText1",
      "else",
        "checkboxes.helpText2"
    ],
    "value": "some.group[{0}].someField"
  }
```

In the example above, the `helpText` property is set up to show different help texts based on the value
of `someField` in the data model. If `someField` is equal to `someValue`, the help text will
be `checkboxes.helpText1`, otherwise it will be `checkboxes.helpText2`.