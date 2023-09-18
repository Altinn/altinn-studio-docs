---
title: Code lists (options)
linktitle: Code lists
description: How to configure Options / Code lists for an app?
toc: true
weight: 300
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

## Pass query parameters when fetching options

Options supports query parameters when making the api call, the parameter `language` is added automatically.

### Pass static query parameters

You can add static query parameters by setting the `queryParameters` property on the component:

```json
{
  "id": "some-dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "NyGarantiLoyvetype"
  },
  "dataModelBindings": {
    "simpleBinding": "soknad.nyGaranti.loyvetype"
  },
  "required": true,
  "optionsId": "loyvetyper",
  "queryParameters": {
    "loyvetype": "garanti"
  }
},
```

In the example above the parameter `?loyvetype=garanti` will be added to the request.

### Pass dynamic query parameters based on the data model

You can add dynamic parameters by setting the `mapping` property on the component:

```json
{
  "id": "some-dropdown-component",
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

In the example above, the query parameter `orgnummer={nr}`, where `{nr}` is the value of `soknad.transportorOrgnummer`
will be set.
If an option is setup with mapping and the given data field changes app-frontend will refetch the option. This can be
used to dynamically decide which choices are available based on information given by the end user.

Passing query parameters from repeating groups is also supported by adding an index indicator for the relevant indexes.
Example for a group:

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

**Applies to applications using version 7.4.0 or older of the nuget packages** - https://github.com/Altinn/app-lib-dotnet/release

<br>

During PDF-generation the app will try to call the same option endpoint as app-frontend does.
We currently have a weakness where mapping parameters not are included in this request, see issue [#7903.](https://github.com/Altinn/altinn-studio/issues/7903)

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
[options based on repeating groups](dynamic-codelists).

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
