---
title: Code lists (options)
linktitle: Code lists
description: How to configure Options / Code lists for an app.
toc: true
weight: 300
---
  
Altinn offers two different ways an application can use code lists - static and dynamic. Both is done through the options api exposed by the application, and the code lists are available through the endpoint `{org}/{app}/api/options/{optionsId}`.
Checkbox, Dropdown, and RadioButton components will automatically be able to fetch such lists if you connect the component to the option id in question. Not all dynamic codelist have to be fetched from the options api - we can also have codelists based on the values from a repeating structure in the datamodel.

## Connect the component to options (code list)

This is done by adding the optionId you would like to refer to either through the component UI in Designer or direcytly in `FormLayout.json` as shown below:

```json
{
    "id": "8e6f7b2f-fcf0-438d-8336-c1a8e1e03f44",
    "type": "Dropdown",    
    "textResourceBindings": {},
    "dataModelBindings": {},
    "optionsId": "countries",
}
```

## Pass query parameters when fetching options

Options supports query parameters when making the api call. `language` is added automatically, and you can also add custom parameters by defining `mapping` on the component.

```json
{
    "id": "c66d7b69-2e18-4786-af44-1fa913853618",
    "type": "Dropdown",
    "textResourceBindings": {
        "title": "NyGarantiLoyvetype"
    },
    "dataModelBindings": {
        "simpleBinding": "soknad.nyGaranti.loyvetype"
    },
    "required": true,
    "optionsId": "loyvetyper",
    "mapping": {
        "soknad.transportorOrgnummer": "orgnummer"
    }
},
```

In the example above, the query parameter `orgnummer={nr}`, where `{nr}` is the value of `soknad.transportorOrgnummer` will be set.
If an option is setup with mapping and the given data field changes app-frontend will refetch the option. This can be used to dynamicly decide which choices are availibable based on information given by the end user.

Passing query parameters from repeating groups is also supported by adding an index indicator for the relevant indexes. Example for a group:

```json
      {
        "id": "dropdown-group",
        "type": "Dropdown",
        "textResourceBindings": {
          "title": "Select city"
        },
        "dataModelBindings": {
          "simpleBinding": "Group.City"
        },
        "required": true,
        "optionsId": "cities",
        "mapping": {
          "Group[{0}].Country": "country"
        }
      },
```

For nested groups follows the same pattern but with an additional index indicator for the nested group:

```json
      {
        "id": "dropdown-nested-group",
        "type": "Dropdown",
        "textResourceBindings": {
          "title": "Select city"
        },
        "dataModelBindings": {
          "simpleBinding": "Group.SubGroup.City"
        },
        "required": true,
        "optionsId": "cities",
        "mapping": {
          "Group[{0}].SubGroup[{1}].Country": "country"
        }
      },
```

For a complete example on how this is setup see our [demo app.](https://altinn.studio/repos/ttd/dynamic-options-rep)

{{%notice warning%}}
During PDF-generation the app will try to call the same option endpoint as app-frontend does.
We currently has a weakness where mapping paramteres not are included in this request, see issue [#7903.](https://github.com/Altinn/altinn-studio/issues/7903)

A possible workaround here is to return an empty array when the PDF-generator asks for options with empty query params, example:

```c#
            string someArg = keyValuePairs.GetValueOrDefault("someArg");
            string someOtherArg = keyValuePairs.GetValueOrDefault("someOtherArg");

            if (string.IsNullOrEmpty(someArg) || string.IsNullOrEmpty(someOtherArg)) {
                return await Task.FromResult(new List<AppOption>());
            }
```

Notice that this wil result in the option value and not the label being present as the end users answer.
{{% /notice%}}


## Description and HelpText

`description` and `helpText` is supported by options in apps that use version v7.8.0 or higher. `description` and
`helpText` can be displayed by the components `RadioButtons` and `Checkboxes` by providing the option list with the
mentioned properties.

Descriptions and HelpTexts can be provided to options in the same way that a label is provided, in either static or
dynamic code lists.

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

{{%notice warning%}}
Description and HelpText is not yet compatible with options from repeating groups as `source` does not yet support
adding HelpText and Description.
{{% /notice%}}

{{<children />}}