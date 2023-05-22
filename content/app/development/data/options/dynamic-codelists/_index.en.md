---
title: Dynamic codelists generated runtime
linktitle: Dynamic codelists
description: How to create dynamic codelists created during runtime execution of the application?
toc: false
weight: 150
---

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