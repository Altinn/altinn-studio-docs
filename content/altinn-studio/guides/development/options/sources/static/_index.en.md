---
title: Static options
linktitle: Static
description: Lists of options that does not change, but can be filtered
toc: false
weight: 50
aliases:
  - /altinn-studio/guides/development/options/static-codelists
---

For simpler use cases, a static list of options or a simple code list is easy to configure.
These can either be set directly in the component configuration (in which case we call them options) or in a json file
in the application repository (the simplest form for code lists). Which method to use depends on the need for reusability.
If multiple components need to use the same set of options, it is recommended to
use the [json file method](#from-json-files-code-list) and thus turn it into a code list.

Note that even though a static list of options can be completely static, it is also possible to make it (a bit more) dynamic
by [filtering the options](../../functionality/filtering) using expressions. If you want even more flexibility,
you can also [create your own code-based code list](../dynamic).

## In component configuration (options)

In the example configuration, a Dropdown component is set up with a simple set of options. The `options` property is an
array of objects, where each object represents a choice for the user. The `value` property is the value that will be
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

## From JSON files (code list)

By adding json based option files in the application repository, the application will automatically read the file
and expose it through the options api. For this to work, the files must be placed in the `App/options/` folder and be
named according to the following conventions `{optionId}.json` for the application to recognize them.

For example if you have a list of countries in a file named `countries.json`, the optionId would be `countries`, and
would be exposed through the api at `{org}/{app}/api/options/countries`.

The static code lists should be in the format as shown below:

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