---
title: Dynamic options
linktitle: Dynamic
description: Generated runtime by custom C# code
toc: false
weight: 100
aliases:
  - /altinn-studio/guides/development/options/dynamic-codelists
---

In an Altinn 3 app you can also have dynamic code lists that are generated runtime. This makes it possible to have dynamic lists that are filtered or looked up in external sources. Dynamic code lists can either be public (accessible to all, without authentication), or secured and limited to those with read access to the instance.

For public code lists, implement the `IAppOptionsProvider` interface, while for secured code lists, implement the `IInstanceAppOptionsProvider`. The approach is the same for both, and the model returned is the same. The implementation is kept separate to avoid exposing values that should be secured.

### Public code lists

Below you find an example of how to implement a public options provider.

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

For your implementation to be picked up you need to add the following line in your `Program.cs`:

```C#
services.AddTransient<IAppOptionsProvider, CountryAppOptionsProvider>();
```

The result of this implementation will be available at the endpoint `{org}/{app}/api/options/countries`. The identifier can be used in components, so to use the code list in a Dropdown component you can set `optionsId` as in the following example:

```json {hl_lines=[10]}
{
  "id": "dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "Some title"
  },
  "dataModelBindings": {
    "simpleBinding": "some.field"
  },
  "optionsId": "countries"
}
```

### Secured options

If you want to produce lists of options that are sensitive you can implement `IInstanceAppOptionsProvider`, which will validate that the user has read rights as defined in the authorization policy from the `policy.xml`-file.
Below you'll find an example of how to implement a secured options provider.

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

For your implementation to be picked up you need to add the following line in your `Program.cs`:

```csharp
services.AddTransient<IInstanceAppOptionsProvider, ChildrenAppOptionsProvider>();
```

The result of this implementation will be available at the endpoint `{org}/{app}/instances/{instanceOwnerId}/{instanceGUID}/options/children`. The identifier can be used in components, so to use the code list in a Dropdown component you can set `optionsId` as in the following example. It is also important to set the `secure` property to `true` to indicate that this is a secured code list.

```json {hl_lines=["10-11"]}
{
  "id": "dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "Some title"
  },
  "dataModelBindings": {
    "simpleBinding": "some.field"
  },
  "optionsId": "children",
  "secure": true
}
```

## Query parameters

The options endpoint you create supports query parameters. The `language` parameter is sent automatically, and other parameters can be sent from the component configuration. These can be read from the `keyValuePairs` parameter in the implementation. This can be useful to filter the code list based on data in the data model, or in other ways vary the code list based on context.

As an example, consider a form with two `Dropdown` components that are linked together. The first lets the user choose a county, and the second lets the user choose a municipality. The municipalities shown in the second component should be filtered based on the county selected in the first component. This can be solved by sending the county as a query parameter to the code list for municipalities (and then filter the list based on this parameter in your implementation).

### Based on expressions

{{%notice info%}}
Query parameters based on expressions are available from app-frontend version 4.9.0 or higher. If your app is using the rolling release of major version 4, this is already available.
{{% /notice%}}

You can add both static and dynamic parameters by setting up `queryParameters` on the component:

```json {hl_lines=["11-15"]}
{
  "id": "dropdown-component",
  "type": "Dropdown",
  "textResourceBindings": {
    "title": "Some title"
  },
  "dataModelBindings": {
    "simpleBinding": "some.field"
  },
  "optionsId": "countries",
  "queryParameters": {
    "country": "norway",
    "orgnumber": ["dataModel", "some.orgnumber"],
    "adult": ["greaterThanEq", ["dataModel", "some.age"], 18]
  }
}
```

In the example above the parameter `country=norway` will always be added to the request (this is entirely static and will not change). The parameter `orgnumber={nr}` will be added, where `{nr}` is the value of the field `some.orgnumber` in the data model. The parameter `adult={bool}` will be added, where `{bool}` will be either `true` or `false` based on whether the value of the field `some.age` is greater than or equal to 18.

More examples of expressions can be found in the [dynamics documentation](../../../dynamics), and the full list of available functions can be found in the [expression reference overview](../../../../../reference/logic/expressions).

### Based on the data model

{{%notice warning%}}
This approach is discouraged. From app-frontend version 4.9.0, it is possible to use the `queryParameters` property instead. As described above, this property allows you to add both static and dynamic query parameters using expressions, making them more flexible than `mapping`.

At some point, the `mapping` property will be removed, but when that happens tools will be provided to migrate existing configurations to use `queryParameters` instead.
{{% /notice%}}

You can add dynamic parameters by setting the `mapping` property on the component:

```json {hl_lines=["12-14"]}
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
}
```

In the example above, the query parameter `orgnummer={nr}`, where `{nr}` is the value of `soknad.transportorOrgnummer`
will be set.
If an option is setup with mapping and the given data field changes app-frontend will refetch the option. This can be
used to dynamically decide which choices are available based on information given by the end user.

Passing query parameters from repeating groups is also supported by adding an index indicator for the relevant indexes.
Example for a group:

```json {hl_lines=[13]}
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
}
```

For nested groups follows the same pattern but with an additional index indicator for the nested group:

```json {hl_lines=[13]}
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
}
```

For a complete example of how this is setup see our [demo app.](https://altinn.studio/repos/ttd/dynamic-options-rep)

## Things to consider

- The method `GetAppOptionsAsync` receives a language code in the `language` parameter. Language codes are based on ISO 639-1 or the W3C IANA Language Subtag Registry. The latter is built upon the ISO 639-1 standard but is guaranties uniques of the codes, whereas ISO 639-1 have conflicting usage for some codes.
- An app can have many implementations of these interfaces, one for each option list. The correct implementation is found by looking at the code list identifier that is requested, and comparing it to the `Id` property in the implementation. This is also the identifier used in the `optionsId` property in the component configuration. Therefore, the `Id` property in the implementation must be unique per app.
- It may be tempting to implement a dynamic option list that fetches data from the data model and produces the option list based on this. This is not recommended, as the app frontend only fetches the option list once for each unique set of query parameters. This means that the user interface showing the option list will not update in line with changes in the data model.
    - An alternative is to use the functionality for [dynamic code lists based on the data model](../from-data-model), in some cases together with corresponding code in [DataProcessor](../../../dynamics/data-processing).
    - Another alternative may be to use query parameters, as described above.
- If you use query parameters, it may be wise to consider how many unique combinations of parameters will typically be used in the app. If there are many, consider using a different approach such as fetching all data and filtering valid values in the frontend using [`optionFilter`](../../functionality/filtering). Many different combinations of query parameters can lead to the app having to do a lot of unnecessary work to fetch new option lists every time the user makes a change in the form.
