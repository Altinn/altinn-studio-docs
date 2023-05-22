---
title: Code lists (options)
linktitle: Code lists
description: How to configure Options / Code lists for an app.
toc: true
weight: 300
---


  
Altinn offers two different ways an application can use code lists - static and dynamic. Both is done through the options api exposed by the application, and the code lists are available through the endpoint `{org}/{app}/api/options/{optionsId}`.
Checkbox, Dropdown, and RadioButton components will automatically be able to fetch such lists if you connect the component to the option id in question.

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

## Options based on repeating groups from the data model

Traditional options are based on resources fetched from the backend.
This approach differs a bit from this, as it enables setting up a direct connection from the options to the form data that is stored in app frontend.
A use case here would typically be if the user fills out a repeating list of data that should later be selected in a dropdown/checkbox/radiobutton.

### Configuration

To set up options from the data model we have set up a new property on `RadioButtons`, `Checkboxes`, and `Dropdown`-components called `source`.
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
      },
```

Explanation:

- **group** - the group field in the data model to base the options on
- **label** - a reference to a text id to be used as the label for each iteration of the group, see more below.
- **value** - a reference to a field in the group that should be used as the option value. Notice that we set up this `[{0}]` syntax. Here the `{0}` will be replaced by each index of the group.

Notice that the **value** field must be unique for each element. If the repeating group does not contain a field which is unique for each item it is recommended to add a field to the data model that can be used as identificator, for instance a GUID.

As for the **label** property, we have to define a text resource that can be used as a label for each repetition of the group.
This follows similar syntax as the **value**, and will also be familiar if you have used [variables in text](../../ux/texts).

Example text resource connected:

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

In the example above we have two parameters in the text which is referencing fields in the group.
We also recognize the `[{0}]` syntax in the `key` prop which enables the usage of this label for each index in the group.

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