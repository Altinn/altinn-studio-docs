---
title: Static options
description: Lists of options that does not change, but can be filtered
toc: false
weight: 50
aliases:
  - /altinn-studio/guides/development/options/static-codelists
---

For simpler use-cases, a static code list is easy to configure. These can either be set directly in the component
configuration or in a json file in the application repository. Which method to use depends on the re-usability of
the code list. If multiple components should use the same code list, it is recommended to use the json file method.

## Static code lists based on component configuration

In the example configuration, a Dropdown component is set up with a static code list. The `options` property is an
array of objects, where each object represents a code list item. The `value` property is the value that will be
saved in the data model when the user selects the item. The `label` property is the text that will be displayed to
the user.

```json {hl_lines=["8-21"]}
{
  "id": "some-dropdown-component",
  "type": "Dropdown", 
  "textResourceBindings": {},
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype"
  },
  "options": [
    {
      "value": "1",
      "label": "Type 1"
    },
    {
      "value": "2",
      "label": "Type 2"
    },
    {
      "value": "3",
      "label": "Type 3"
    }
  ]
}
```

## Static code lists based on json files

By adding json based option files in the application repository, the application will automatically read the file and expose it through the options api. For this to work, the files must be placed in the `App/options/` folder and be named according to the following conventions `{optionId}.json` for the application to recognize them.

For example if you have a list of countries in a file named `countries.json`, the optionId would be `countries`, and would be exposed through the api at `{org}/{app}/api/options/countries`. The static code lists should be in a special format as shown below:

```json
[
    {
        "value": "norway",
        "label": "Norge"
    },
    {
        "value": "denmark",
        "label": "Danmark"
    },
    {
        "value": "sweden",
        "label": "country.label.sweden"
    }
]
```

Note that the `label` field can be a key to a text resource (as shown above for sweden) or plain text.

In order to reference this code list in a component, you can use the `optionsId` property in the component configuration:

```json {hl_lines=["8"]}
{
  "id": "some-dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {},
  "dataModelBindings": {
    "simpleBinding": "soknad.opphavsland"
  },
  "optionsId": "countries"
}
```