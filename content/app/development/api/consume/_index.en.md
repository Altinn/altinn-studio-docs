---
title: Consume APIs in an app
linktitle: Consume
description: An application can consume open and closed APIs available through the Internet.
toc: true
---

ASP.NET Core has good opportunities to consume different types of API.

This can be useful if you want to expose your organization's own APIs via an app or need help from external APIs in the application logic.

On this page, an example of using an external open API to enrich form data is presented. 
[The example app is available in Altinn Studio](https://altinn.studio/repos/ttd/consume-api-example).

The API used is [RestCountries v3](https://restcountries.com/#api-endpoints-v3), 
and it's the endpoint `https://restcountries.com/v3.1/name/{country}` we will use.
The endpoint returns metadata about the provided country. 

You may test the API in your browser and study the response: [https://restcountries.com/v3.1/name/Norway](https://restcountries.com/v3.1/name/Norway).

We would like to enrich the form data with details about the country that the end user fills out.

## Creating models for the API

If the API you are consuming is documented with Swagger or OpenAPI, 
you can easily generate C# classes based on the documentation.

This can be done manually, or by using available online tools.

In this example, the response object is quite large and contains much more data than we are interested in. 

Here is an abbreviated version of the response object for Norway
```json {linenos=false,hl_lines=[9,10,11,13]}
[
	{
		"name": {
			"common": "Norway",
			"official": "Kingdom of Norway",
			"nativeName": {}
		},
		"idd": {},
		"capital": [
			"Oslo"
		],
		"altSpellings": [],
		"region": "Europe",
		"subregion": "Northern Europe",
		"languages": {},
		"translations": {},
		"latlng": [
			62,
			10
		],
		"landlocked": false,
		"borders": [],
		"area": 323802,
		"demonyms": {},
		"flag": "🇳🇴",
		"maps": {},
		"population": 5379475,
		"postalCode": {
			"format": "###",
			"regex": "^(\\d{4})$"
		}
	}
]
```

In the application we are only interested in the data in the highlighted lines, 
capital and region. We create a minimal response object that only contains the properties we are interested in. 

In the folder _App/models_ a new file `Country.cs` is created.

```C#
using System.Collections.Generic;

namespace Altinn.App.models
{
    public class Country
    {
        public List<string> Capital { get; set; }
        public string Region { get; set; }  
    }
}
```

The `Country` object contains the fields `Capital` og `Region`.
`Capital` is a list of strings as a country can contain multiple capital cities.

In this example, the API doesn't require a complex request object, so we only need this one model.
Should you need a seperate model for the request object, a class can be created the same way.

## Setting up an interface for the client

It is reccomended that an interface if defined for the client what will call the API. 
This enables you to benefit from the strenghts of .NET with dependency injection and efficient handeling of HTTP clients. 

In the application repository, a new folder _App/clients_ is created.
Within this folder, a new file `ICountryClient.cs` is created.

The interface consists of a single method `GetCountry`, which accepts a string and returns a _Country_-objekt.

Define the interface as shown below.

```C#
using System.Threading.Tasks;

using Altinn.App.models;

namespace Altinn.App.client
{
    public interface ICountryClient
    {
        /// <summary>
        /// Retrieves metadata about the provided country.
        /// </summary>
        /// <param name="country">The name of the country</param>
        /// <returns>A country object</returns>
        public Task<Country> GetCountry(string country);
    }
}
```

The return object is framed by `Task<...>`, this is added to support the asynchronous running of this method.

## Implement the client

The client contains the code that makes the request towards the API and maps the response to the `Country`-model,
which is what the methods using the client expect as an output.

The full implementation of _CountryClient_ is shown below. 

```C# 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

using Altinn.App.models;

using Microsoft.Extensions.Logging;

namespace Altinn.App.client
{
    public class CountryClient : ICountryClient
    {
        HttpClient _client;
        ILogger<ICountryClient> _logger;
        JsonSerializerOptions _serializerOptions;

        public CountryClient(HttpClient client, ILogger<ICountryClient> logger)
        {
            _logger = logger;

            _client = client;
            _client.BaseAddress = new Uri("https://restcountries.com/v3.1");
            
            _serializerOptions = new()
            {
                PropertyNameCaseInsensitive = true
            };
        }

        public async Task<Country> GetCountry(string country)
        {
            string query = $"name/{country}";

            HttpResponseMessage res = await _client.GetAsync(query);

            if (res.IsSuccessStatusCode)
            {
                string resString = await res.Content.ReadAsStringAsync();
               
                List<Country> countryResponse = JsonSerializer.Deserialize<List<Country>>(resString, _serializerOptions);

                return countryResponse.Any() ? countryResponse.First() : null;
            }
            else
            {
                _logger.LogError("Retrieving country {country} failed with status code {statusCode}", country, res.StatusCode);
                return null;
            }
        }
    }
}

```

At the top of the file you find a reference to all the namespaces the class depends on

```cs
using System;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

using Altinn.App.models;

using Microsoft.Extensions.Logging;
```

Further, we define the class and which interface it inherrits from

```cs
public class CountryClient : ICountryClient
```

Further, three private object __client_, __logger and __serializerOptions_ 

```cs
private readonly HttpClient _client;
private readonly ILogger<ICountryClient> _logger;
private readonly JsonSerializerOptions _serializerOptions;
```        

The underscore before the name is simply a naming convention and does not a functional effect. 

- __client_ will be populated with an HTTP client in the constructor
- __logger_ will be populated with a logger, enabling logging error messages and other messages in the client logic
- __serializerOptions_ will be instantiated and configured in the contructor to support deserialization of the API response

Further in the class, the constructor is defined

```cs
public CountryClient(HttpClient client, ILogger<ICountryClient> logger)
{
      _logger = logger;
      _client = client;
      _client.BaseAddress = new Uri("https://restcountries.com/v3.1");
      
      _serializerOptions = new()
      {
          PropertyNameCaseInsensitive = true
      };
}
```

Objects are populated if there is mathcing input in the constructor, 
and the remaining objects are nstantiated directly in the constructor. 

If you require additional services in this class, simply add a private object and inject its interface
in the constructor ad we have done for __logger_  and __client_.

Further, you find the implementation of `GetCountry`.

```cs
public async Task<Country> GetCountry(string country)
{
    string query = $"name/{country}";
    HttpResponseMessage res = await _client.GetAsync(query);

    if (res.IsSuccessStatusCode)
    {
        string resString = await res.Content.ReadAsStringAsync();

        List<Country> countryResponse = JsonSerializer.Deserialize<List<Country>>(resString, _serializerOptions);

        return countryResponse.Any() ? countryResponse.First() : null;
    }
    else
    {
        _logger.LogError("Retrieving country {country} failed with status code {statusCode}", country, res.StatusCode);
        return null;
    }
}
```

Here, the status code of the API call is verified before it is deserialized and the country object returned. 
If the statusCode is not one that indicates success, a log entry is made and _null_ is returned. 
Her gjøres det en sjekk på at statuskoden på API-kallet er en suksess-kode før vi deserialiseres og returnerer objektet.
Dersom det ikke er en suksess-statuskode logger vi en feil og returnerer null.

## Registering the client in the application

Once the interface and client is implemented, it should be registerd in _App/Program.cs_ (.NET 6) or _App/Startup.cs_ (.NET 5),
to make it available to use in the application.

In the method `ConfigureServices`, the line below is included

```C#
services.AddHttpClient<ICountryClient, CountryClient>();
```

## Using the client in the application logic

To enrich the form data we need to include the use of our client in the logic in the method _ProcessDataWrite_ in _App/logic/DataProcessingHandler.cs_.

First the client must me made available by injecting it in the constructor of the class. 
DataProcessingHandler does not have a constructor by default, so this needs to be created.

```cs
 public DataProcessingHandler()
{
}
```

Further, a private entry for the client, inject the client into the constructor and assign it to the private client instance. 
The result should look like this: 

```cs
private readonly ICountryClient _countryClient;

public DataProcessingHandler(ICountryClient countryClient)
{
    _countryClient = countryClient;
}
```

__countryClient_ is now available in DataProcessingHandler, and we're ready to implement the logic in the _ProcessDataWrite_ method. 

```cs
public async Task<bool> ProcessDataWrite(Instance instance, Guid? dataId, object data)
{
    if (data.GetType() == typeof(skjema))
    {
        skjema skjema = (skjema)data;
        if (!string.IsNullOrEmpty(skjema.land))
        {
            Country country = await _countryClient.GetCountry(skjema.land.Trim());

            if (country != null)
            {
                skjema.hovedstad = string.Join(",", country.Capital);
                skjema.region = country.Region;
            }
            else
            {
                skjema.hovedstad = skjema.region = string.Empty;
            }

            return true;
        }
        else
        {
            skjema.hovedstad = string.Empty;
            skjema.region = string.Empty;
        }
    }
    return await Task.FromResult(false);
}
```

If you attempt to build the applicatin at this point, an error will occur. 
DataProcessingHandler is instansiated in App.cs, 
so all dependencies must be included in this file and included in the initialization of DataProcessingHandler. 


In the file _App/logic/App.cs_, the following changes are made

- Add a reference to the namespace of the client at the top of the file
  ```cs
  using Altinn.App.client;
  ```
- Inject `ICountryClient` as the last element of the pp.cs-constructor.
  
    This is done in line 14
    ```cs {linenos=inline,hl_lines=[14]}
    public App(
        IAppResources appResourcesService,
        ILogger<App> logger,
        IData dataService,
        IProcess processService,
        IPDF pdfService,
        IProfile profileService,
        IRegister registerService,
        IPrefill prefillService,
        IInstance instanceService,
        IOptions<GeneralSettings> settings,
        IText textService,
        IHttpContextAccessor httpContextAccessor,
        ICountryClient countryClient) : base(
            appResourcesService,
            logger,
            dataService,
            processService,
            pdfService,
            prefillService,
            instanceService,
            registerService,
            settings,
            profileService,
            textService,
            httpContextAccessor)
    ```

- Include countryClient in the initialization ofDataProcessingHandler 
    ```cs
    _dataProcessingHandler = new DataProcessingHandler(countryClient);
    ```


## Caching of respons data

A drawback of the example as it now stands if that a request will be made to the API each time 
a piece of the form data i updated.

It is a reasonable assumption that a countries capital and region will not change frequiently.
If information about Norway is retrieved, we can store this in the application for a period of time, 
so the cost of the request is saved.

The changes to the code are not described in detail, but the complete code is available below.
All the modifications are made to the _CountryClient.cs_-file.

```cs
using Altinn.App.models;

using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Altinn.App.client
{
    public class CountryClient : ICountryClient
    {
        private readonly HttpClient _client;
        private readonly ILogger<ICountryClient> _logger;
        private readonly JsonSerializerOptions _serializerOptions;
        private readonly IMemoryCache _memoryCache;
        private readonly MemoryCacheEntryOptions _cacheOptions;

        public CountryClient(HttpClient client, ILogger<ICountryClient> logger, IMemoryCache memoryCache)
        {
            _logger = logger;

            _client = client;
            _client.BaseAddress = new Uri("https://restcountries.com/v3.1/");

            _serializerOptions = new()
            {
                PropertyNameCaseInsensitive = true
            };

            _memoryCache = memoryCache;
            _cacheOptions = new()
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(24)
            };
        }

        public async Task<Country> GetCountry(string country)
        {
            string uniqueCacheKey = "Country_" + country;

            // Check if country is present in cache, if so return from cache
            if (_memoryCache.TryGetValue(uniqueCacheKey, out Country outputCountry))
            {
                return outputCountry;
            }

            string query = $"name/{country}";

            HttpResponseMessage res = await _client.GetAsync(query);

            if (res.IsSuccessStatusCode)
            {
                string resString = await res.Content.ReadAsStringAsync();

                List<Country> countryResponse = JsonSerializer.Deserialize<List<Country>>(resString, _serializerOptions);

                if (countryResponse.Any())
                {
                    outputCountry = countryResponse.First();

                    // Add response country to cache
                    _memoryCache.Set(uniqueCacheKey, outputCountry, _cacheOptions);
                    return outputCountry;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                _logger.LogError("Retrieving country {country} failed with status code {statusCode}", country, res.StatusCode);
                return null;
            }
        }
    }
}
```

