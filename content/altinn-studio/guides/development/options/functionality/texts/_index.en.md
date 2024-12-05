---
title: Texts
description: The different text properties that can be used for options
weight: 150
---

## Description and HelpText

`description` and `helpText` is supported by options in apps that use version v7.8.0 or higher. `description` and
`helpText` can be displayed by the components `RadioButtons` and `Checkboxes` by providing the option list with the
mentioned properties.

Descriptions and HelpTexts can be provided to `options` in the same way that a `label` is provided, in either static or
dynamic code lists. One can also use them in options based on repeating groups in the `source` attribute.

```json
[
  {
    "value": "norway",
    "label": "Norge",
    "description": "This is a description",
    "helpText": "This is a help text"
  },
  {
    "value": "denmark",
    "label": "Danmark"
  }
]
```

```cs
var options = new AppOptions
{
  Options = new List<AppOption>
  {
    new AppOption
    {
      Label = "Ole",
      Value = "1",
      Description = "This is a description",
      HelpText  = "This is a help text"
    },
    new AppOption
    {
      Label = "Dole",
      Value = "2"
    }
  }
};
```

Descriptions and help texts used in options based on repeating groups can be set up with dynamic text-resources in the
same way as labels, described in
[options based on repeating groups](repeating-group-codelists).

```json
{
  "id": "checkboxes-component-id",
  "type": "Checkboxes",
  ...
  "source": {
    "group": "some.group",
    "label": "checkboxes.label",
    "description": "checkboxes.descripiton",
    "helpText": "checkboxes.helpText",
    "value": "some.group[{0}].someField"
  }
},
```