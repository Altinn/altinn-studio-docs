---
title: Code lists (options)
linktitle: Code lists
description: How to configure Options / Code lists for an app.
toc: true
weight: 300
---

Altinn offers two different ways an application can use code lists - static and dynamic. Both is done through the options api exposed by the application, and the code lists are available through the endpoint `{org}/{app}/api/options/{optionsId}`.
Checkbox, Dropdown, and RadioButton components will automatically be able to fetch such lists if you connect the component to the option id in question.

## Static codelists from the application repository

By adding json based option files in the application repository, the application will automatically read the file and expose it through the options api. For this to work, the files must be placed in the `App/options/` folder and be named according to the following conventions `{optionId}.json` for the application to recognize them.

For example if you have a list of countries in a file named `countries.json`, the optionId would be `countries`, and would be exposed through the api at `{org}/{app}/api/options/countries`. The static codelists should be in a special format as shown below:

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

## Dynamic codelists generated runtime

As an alternative to the static files you can have code that determines what the lists should be during runtime. This makes it possible to expose dynamic values that for instance are filtered or looked up in external sources. Dynamic codelists can either be open and accessible to all or secured and limited to those with read access to the instance.

In versions prior to 4.24.0 this was done by overriding the `GetOptions` method in `App.cs`. This method is now deprecated and is replaced by putting the option code in separate classes implementing an interface and registering the implementation in the application dependency injection container. This allows for better separation, inject dependencies into the constructor, pass in language and other query parameters and generally handle all aspects of the implementation as you see fit.

For codelists that are open you implement the `IAppOptionsProvider` interface and for codelists that should be secured you implement the `IInstanceAppOptionsProvider` interface. The pattern is the same for both, and the models returned is the same, but the implementation is kept separate to avoid exposing data that should be secured.

### Open dynamic codelists

Below you find an example of how to implement a open custom options provider. The url will will still be exposed from the same endpoint as before `{org}/{app}/api/options/countires`.

```C#
using Altinn.App.Common.Models;
using Altinn.App.PlatformServices.Options;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Altinn.App.Core
{
    public class CountryAppOptionsProvider : IAppOptionsProvider
    {
        public string Id { get; set; } = "countries";

        public Task<AppOptions> GetAppOptionsAsync(string language, Dictionary<string, string> keyValuePairs)
        {
            var options = new AppOptions
            {
                Options = new List<AppOption>
                    {
                        new AppOption
                        {
                            Label = "Norway",
                            Value = "47"
                        },
                        new AppOption
                        {
                            Label = "Sweden",
                            Value = "46"
                        }
                    }
            };

            return Task.FromResult(options);
        }
    }
}

```

For your implementation to be picked up you need to add the following line in your `Startup.cs` (or `Program.cs` in .NET 6):

```csharp
services.AddTransient<IAppOptionsProvider, CountryAppOptionsProvider>();
```

Note that you can have multiple registrations of this interface. The correct implementation is resolved by finding the one with the correct id.

The interface has a property `Id`, which should be set to the optionId, and a method `GetAppOptionsAsync` for resolving the options. This method accepts a language code and a dictionary of key/value pairs. Both parameters will typically be query parameters picked up from the controller and passed in. Allthough language could be put in the dictionary as well it's decided to be explicit on this particular parameter.

> Language codes should be based on ISO 639-1 or the W3C IANA Language Subtag Registry. The latter is built uppon the ISO 639-1 standard but is guaranties uniques of the codes, where as ISO 639-1 have conflicting usage for some codes.
>

### Secured dynamic options

{{%notice warning%}}

**NOTICE:** to use this functionality the app must use version >= 4.27.0 of the nuget packages `Altinn.App.PlatformServices`, `Altinn.App.Common` and `Altinn.App.Api`.

{{%/notice%}}

If you want to expose options that are sensitive you can use `IInstanceAppOptionsProvider`, which will validate that the user has read rights defined in the authorization policy defined in the app's `policy.xml`-file.
Below you find an example of how to implement a secured custom options provider. The `IInstanceAppOptionsProvider` interface must be implemented, and a `secure`-prop must be added to the component.
The following option will be exposed at `/{org}/{app}/instances/{instanceOwnerId}/{instanceGUID}/options/children`.

```C#
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Common.Models;
using Altinn.App.PlatformServices.Models;

namespace Altinn.App.Core
{
    public class ChildrenAppOptionsProvider : IInstanceAppOptionsProvider
    {
        public string Id { get; set; } = "children";

        public Task<AppOptions> GetInstanceAppOptionsAsync(InstanceIdentifier instanceIdentifier, string language, Dictionary<string, string> keyValuePairs)
        {
            // ...
            // Some custom code to get the list of children from the instance owner
            // ...

            var options = new AppOptions
            {
                Options = new List<AppOption>
                    {
                        new AppOption
                        {
                            Label = "Ole",
                            Value = "1"
                        },
                        new AppOption
                        {
                            Label = "Dole",
                            Value = "2"
                        },
                        new AppOption
                        {
                            Label = "Doffen",
                            Value = "3"
                        }
                    }
            };

            return Task.FromResult(options);
        }
    }
}

```

For your implementation to be picked up you need to add the following line in your `Startup.cs` (or `Program.cs` in .NET 6):

```csharp
services.AddTransient<IInstanceAppOptionsProvider, ChildrenAppOptionsProvider>();
```

Note that you can have multiple registrations of this interface. The correct implementation is resolved by finding the one with the correct id.

The interface has a property `Id`, which should be set to the optionId, and a method `GetInstanceAppOptionsAsync` for resolving the options. This method accepts a language code and a dictionary of key/value pairs. Both parameters will typically be query parameters picked up from the controller and passed in. Allthough language could be put in the dictionary as well it's decided to be explicit on this particular parameter. These parameters are the same as for the open variant of options, in addition the instance id (which identifies both the instance owner and the instance itself) will be passed in.

The final configuration needed is the `secure`-boolean on the component. Example:

```json {hl_lines=[13]}
      {
        "id": "dropdown-component",
        "type": "Dropdown",
        "textResourceBindings": {
          "title": "Some title",
          "description": "Some description"
        },
        "dataModelBindings": {
          "simpleBinding": "some.field"
        },
        "required": true,
        "optionsId": "children",
        "secure": true
      }
```

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

To set up options from redux we have set up a new property on `RadioButtons`, `Checkboxes`, and `Dropdown`-components called `source`.
This property contains the fields `group`, `label`, and `value`. Example:

```json
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
