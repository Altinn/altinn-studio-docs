---
title: Code lists (options)
linktitle: Code lists
description: How to configure Options / Code lists for an app.
toc: true
weight: 300
---
Altinn offers two different ways an application can use code lists. Both is done through the options api exposed by the application, and the code lists are available through the endpoint `{org}/{app}/api/options/{optionsId}`.
The dropdown component will automatically be able to fetch such lists from if you connect the component to the option id in question.

## Static codelists from the application repository
By adding json based option files in the application repository, the application will automatically read the file and expose it through the options api. For this to work, the files must be placed in the `App/options/` folder and be named according to the following conventions `{optionId}.json` for the application to recgonize them. 

For example if you have a list of countries in a file named `countries.json`, the optionId would be `countries`, and would be exposed through the api at `{org}/{app}/api/options/countires`. The static codelists should be in a special format format as shown below:


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

## Codelists generated runtime
As an alternative to the static files you can have code that determines what the lists should be during runtime. This makes it possible to expose dynamic values that for instance are filtered or looked up in external sources.

In versions prior to 4.24.0 this was done by overriding the `GetOptions` method in `App.cs`. This method is now deprecated and is replaced by implementing the `IAppOptionsProvider` interface and registering the implementation in the application dependency injection container. This allows for better separation, inject dependencies into the constructor, pass in language and other query parameters and generally handle all aspects of the implementation as you see fit.

Below you find an example of how to implement a custom options provider. The url will will still be exposed from the same endpoint as before `{org}/{app}/api/options/countires`.


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

For your implementation to be picked up you need to add the following line in your `Startup.cs`:
```csharp
services.AddTransient<IAppOptionsProvider, CountryAppOptionsProvider>();
```

Note that you can have multiple registrations of this interface. The correct implementation is resolved by finding the one with the correct id.

The interface has a property `Id`, which should be set to the optionId, and a method `GetAppOptionsAsync` for resolving the options. This method accepts a language code and a dictionary of key/value pairs. Both parameters will typically be query parameters picked up from the controller and passed in. Allthough language could be put in the dictionary as well it's decided to be explicit on this particular parameter. 

> Language codes should be based on ISO 639-1 or the W3C IANA Language Subtag Registry. The latter is built uppon the ISO 639-1 standard but is guaranties uniques of the codes, where as ISO 639-1 have conflicting usage for some codes.
> 
## Connect the dropdown component to the to a codelist
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
These parameters must be set during instantiation of the app in order to appear. [We are workgin on improving this](https://github.com/Altinn/altinn-studio/issues/7888) to make it more dynamic, f.ex by changing values in other fields.
