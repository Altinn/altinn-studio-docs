---
title: Texts
description: The different text properties that can be used for options
weight: 150
---

## Label

The most common text property for options is the `label`. The `label` is the text that is displayed to the user in the
UI (in contrast to the `value`, which is the value [stored in the data model](../data-binding)).
Both `label` and `value` are required properties for an option.

```json
[
  { "value": "norway", "label": "Norge" },
  { "value": "denmark", "label": "text.key.for.denmark" }
]
```

Labels, as with all texts, can either be plain text or a key pointing to a text resource. If the label is a key pointing
to a text resource, the text can change according to the selected language.

The final text displayed to the user can [also be stored in the data model](../data-binding/#storing-the-label) if needed.

## Description and help text

If you need to provide additional information about an option, you can use the `description` and `helpText` properties.
`description` and `helpText` can be displayed by the components `RadioButtons` and `Checkboxes`.

Descriptions and help texts can be provided to `options` in the same way that a `label` is provided, via
[static](../../sources/static), [dynamic](../../sources/dynamic)
and [options from the data model](../../sources/from-data-model).

Click on the headers below to expand the examples.

{{% expandlarge id="static" header="Static JSON file or component configuration" %}}
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
{{% /expandlarge %}}

{{% expandlarge id="dynamic" header="Dynamic options via C# code" %}}
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
{{% /expandlarge %}}

{{% expandlarge id="from-data-model" header="Options based on repeating structures in the data model" %}}
```json
{
  "id": "checkboxes-component-id",
  "type": "Checkboxes",
  ...
  "source": {
    "group": "some.group",
    "label": "checkboxes.label",
    "description": "checkboxes.description",
    "helpText": "checkboxes.helpText",
    "value": "some.group[{0}].someField"
  }
}
```
{{% /expandlarge %}}