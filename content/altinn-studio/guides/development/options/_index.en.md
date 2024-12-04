---
title: Options (code lists)
linktitle: Options
description: How to configure Options / Code lists for an app?
toc: true
weight: 40
aliases:
- /altinn-studio/guides/options
- /altinn-studio/reference/data/options
---

Altinn offers two different ways an application can use code lists - static and dynamic. Both is primarily exposed
through the options api from application, and are available at `{org}/{app}/api/options/{optionsId}`.
Checkbox, Dropdown, and RadioButton components will automatically be able to fetch such lists if you connect the
component to the option id in question. Not all dynamic code list have to be fetched from the options api - we can also
have code lists based on the values from a repeating structure in the datamodel.

## Connect the component to options (code list)

This is done by adding the optionId you would like to refer to either through the component UI in Designer or directly
in `FormLayout.json` as shown below:

```json
{
  "id": "some-dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {},
  "dataModelBindings": {},
  "optionsId": "countries"
}
```

### Save label value in the datamodel
Sometimes you might wish to save the displayed value in the users chosen language to simplify creation of simple presentations of data without addtional lookups or a requirement to remember the label the user actually picked in case it have changed over time.

This is performed by having a separate ``dataModelBindings`` with the key ``"label":`` in addition to ``"simpleBinding":``

```json
{
  "id": "dropdown-component",
  "type": "Dropdown",
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype",
    "label":"soknad.nyGaranti.loyvetypeLabel"
  },
  "optionsId": "biler"
}
```

### Store metadata for the parameters used to retrieve options in tha datamodel

You can store metadata for the parameters used to retrieve options in the datamodel by setting the `metadata` property
on the components `dataModelBinding` property:

```json
{
  "id": "some-dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "NyGarantiLoyvetype"
  },
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype",
    "metadata":  "soknad.transportorOrgnummer"
  },
  "required": true,
  "optionsId": "loyvetyper",
  "mapping": {
    "soknad.transportorOrgnummer": "orgnummer"
  }
},
```

This configuration will store the metadata of the retrieved options as a comma separated string in the
field `soknad.transportorOrgnummer` in the datamodel.

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

{{<children />}}
