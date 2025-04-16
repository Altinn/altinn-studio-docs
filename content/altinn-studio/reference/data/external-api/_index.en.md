---
title: External API
linktitle: External API
description: How to integrate external API data into your Altinn application.
toc: true
---

{{% notice info %}}
Available from v8.2.8
{{% /notice %}}

## Introduction

The External API feature allows you to integrate data from external APIs into your Altinn application. This is useful when you need to display or process data from external sources within your application. The feature works by implementing the `IExternalApiClient` interface and registering your implementation in the application's service container. When implemented, the external api data can be accessed through expressions (see the [Expressions documentation](../../logic/expressions)) or other classes in your application.

## How it works

To use the External API feature, you need to:

1. Create a class that implements the `IExternalApiClient` interface
2. Place the implementation in the `config/logic` folder of your application
3. Register the implementation in the `Program.cs` file under `RegisterCustomAppServices`

The `IExternalApiClient` interface requires you to implement:

- An `Id` property that uniquely identifies your external API client
- A `GetExternalApiDataAsync` method that returns the data from the external API

The `GetExternalApiDataAsync` method can return any object (but not primitives), allowing you to structure the returned data according to your needs.

## Implementation example

Here's an example of how to implement the `IExternalApiClient` interface:

```csharp
public class ExternalApiTestClient : IExternalApiClient
{
    public string Id => "externalApiTestId";

    public async Task<object> GetExternalApiDataAsync(
        InstanceIdentifier instanceIdentifier,
        Dictionary<string, string> queryParams = null
    )
    {
        var mockData = new[]
        {
            new
            {
                schemaTitle = "Pantopplysninger for TRANBY OG RØDEBERG REGNSKAP",
                href = "https://example.com/mock1",
                date = DateTime.Now.ToString("dd.MM.yyyy")
            },
            new
            {
                schemaTitle = "Panteopplysninger for MADELENE NYRUD",
                href = "https://example.com/mock2",
                date = DateTime.Now.AddDays(-1).ToString("dd.MM.yyyy")
            },
            new
            {
                schemaTitle = "Panteopplysninger for MADELENE NYRUD",
                href = "https://example.com/mock3",
                date = DateTime.Now.AddDays(-2).ToString("dd.MM.yyyy")
            },
            new
            {
                schemaTitle = "Registerutskrift for TRANBY OG RØDEBERG REGNSKAP",
                href = "https://example.com/mock3",
                date = DateTime.Now.AddDays(-2).ToString("dd.MM.yyyy")
            },
            new
            {
                schemaTitle = "Registerutskrift for MADELENE NYRUD",
                href = "https://example.com/mock3",
                date = DateTime.Now.AddDays(-2).ToString("dd.MM.yyyy")
            },
            new
            {
                schemaTitle = "Ektepakt",
                href = "https://example.com/mock3",
                date = DateTime.Now.AddDays(-2).ToString("dd.MM.yyyy")
            },
            new
            {
                schemaTitle = "Registerutskrift fra Løseøreregisteret",
                href = "https://example.com/mock3",
                date = DateTime.Now.AddDays(-2).ToString("dd.MM.yyyy")
            }
        };

        return mockData;
    }
}
```

In this example, we're returning mock data, but in a real implementation, you would typically use a HttpClient to make HTTP requests to an external API.

## Registering the External API client

After implementing the `IExternalApiClient` interface, you need to register your implementation in the `Program.cs` file:

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
{
    // Register your External API client
    services.AddTransient<IExternalApiClient, ExternalApiTestClient>();

    // Register the HTTP client if needed
    services.AddHttpClient<ExternalApiHttpClient>();

    // Other custom services<>
}
```

## Accessing data from the External API in your application

The External API feature is primarily designed to be used through expressions in your Altinn application. This allows you to display data from external sources or implement conditional logic based on external data directly in your forms and layouts.

### Accessing External API data through expressions

To access data from your External API client in expressions, you can use the `externalApi` function. This function requires two parameters:

1. `clientId`: The ID of your External API client
2. `pathToProperty`: A dot notation path to the property you want to access from the returned object

```json
["externalApi", "externalApiTestId", "0.schemaTitle"]
```

This expression will return the schema title of the first item in the array returned by the `GetExternalApiDataAsync` method of the External API client with the ID "externalApiTestId".

The `pathToProperty` parameter uses dot notation to navigate through the object structure. For example:

- `"0"` accesses the first element of an array
- `"items.0.title"` accesses the title property of the first element in the items array
- `"data.user.name"` accesses the name property of the user object within the data object

### Examples of using External API data in expressions

#### Displaying external data

You can use the External API data to display information in your form:

```json
{
  "id": "externalDataText",
  "type": "Text",
  "textResourceBindings": {
    "value": [
      "concat",
      "Document title: ",
      ["externalApi", "externalApiTestId", "0.schemaTitle"]
    ]
  }
}
```

#### Conditional visibility based on external data

You can also use External API data to control the visibility of components:

```json
{
  "id": "conditionalInput",
  "type": "Input",
  "hidden": ["equals", ["externalApi", "externalApiTestId", "length"], 0]
}
```

This will hide the component if the External API returns an empty array.

For more information about expressions and how to use them in your Altinn application, see the [Expressions documentation](../../logic/expressions).

### Accessing the data through the API Endpoint

The data fetched through the External API implementation is also available through a REST API endpoint. The endpoint follows this pattern:

```
{org}/{app}/instances/{instanceOwnerPartyId:int}/{instanceGuid:guid}/api/external/{externalApiId}
```

Where:

- `{org}` is the organization code (e.g., "ttd")
- `{app}` is the application name (e.g., "my-app")
- `{instanceOwnerPartyId:int}` is the party ID of the instance owner
- `{instanceGuid:guid}` is the unique identifier of the instance
- `{externalApiId}` is the ID of the External API client (the value returned by the `Id` property)

For example, to access the "externalApiTestId" External API for a specific instance, you would use:

```
https://ttd.apps.altinn.no/ttd/my-app/instances/50001337/b2572673-5afa-4a23-9c4e-db2cb0f8a9c9/api/external/externalApiTestId
```

You can also pass query parameters to the endpoint, which will be forwarded to the `GetExternalApiDataAsync` method:

```
https://ttd.apps.altinn.no/ttd/my-app/instances/50001337/b2572673-5afa-4a23-9c4e-db2cb0f8a9c9/api/external/externalApiTestId?param=value
```

{{% notice warning %}}
**Security Warning**: Never include sensitive information such as Social Security Numbers (SSNs) or other personal identifiers in query parameters. Query parameters can be logged in server logs, appear in browser history, and may be cached by proxies. For accessing data from Folkeregisteret or other sensitive sources, always use secure methods like retrieving the identifier from the instance data or using post requests with encrypted payloads.
{{% /notice %}}

The response will be the JSON representation of the object returned by the `GetExternalApiDataAsync` method.

## Example: Implementing a real External API client

Here's a more complete example of an External API client that calls a real API:

```csharp
public class WeatherApiClient : IExternalApiClient
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<WeatherApiClient> _logger;
    private readonly IConfiguration _configuration;

    public WeatherApiClient(
        HttpClient httpClient,
        ILogger<WeatherApiClient> logger,
        IConfiguration configuration)
    {
        _httpClient = httpClient;
        _logger = logger;
        _configuration = configuration;

        // Configure the HTTP client
        _httpClient.BaseAddress = new Uri("https://api.weatherapi.com/v1/");
        _httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
    }

    public string Id => "weatherApi";

    public async Task<object> GetExternalApiDataAsync(
        InstanceIdentifier instanceIdentifier,
        Dictionary<string, string> queryParams = null)
    {
        try
        {
            // Get the API key from configuration
            var apiKey = _configuration["WeatherApi:ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
            {
                _logger.LogError("Weather API key not found in configuration");
                return new { Error = "API key not configured" };
            }

            // Add API key to header instead of query string for better security
            _httpClient.DefaultRequestHeaders.Add("X-Api-Key", apiKey);

            // Build the query string
            var query = new Dictionary<string, string>
            {
                { "q", queryParams?.GetValueOrDefault("location") ?? "Oslo" },
                { "days", queryParams?.GetValueOrDefault("days") ?? "3" }
            };

            var queryString = string.Join("&", query.Select(kv => $"{kv.Key}={Uri.EscapeDataString(kv.Value)}"));

            // Make the API call
            var response = await _httpClient.GetAsync($"forecast.json?{queryString}");

            // Check if the request was successful
            if (response.IsSuccessStatusCode)
            {
                // Parse and return the response
                var content = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<JsonDocument>(content);
            }
            else
            {
                // Handle error response
                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError($"Weather API returned error: {response.StatusCode}, {errorContent}");

                return new { Error = $"Weather API returned error: {response.StatusCode}" };
            }
        }
        catch (Exception ex)
        {
            // Handle exceptions
            _logger.LogError($"Error calling Weather API: {ex.Message}");

            return new { Error = "Failed to call Weather API" };
        }
    }
}
```

Register this client in `Program.cs`:

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
{
    // Register the Weather API client
    services.AddHttpClient<WeatherApiClient>();
    services.AddTransient<IExternalApiClient, WeatherApiClient>();

    // Other custom services
}
```

## Example: Using External API with Maskinporten and DAN Client

The Data Altinn Norway (DAN) client is an SDK that provides a clean API for retrieving data from various datasets at [data.altinn.no](https://data.altinn.no).
The DAN client can be used with an External API to provide access to these datasets in an Altinn application.

To komme i gang with DAN client, you can follow the guide here: https://docs.data.altinn.no/api/

If you need access to one of the APIs requiring authentication through Maskinporten, see the [Maskinporten Integration Guide](../../../guides/integration/maskinporten).

### Implementation

#### Installing the DAN Client

To use the DAN client in your application, you need to add the `Altinn.ApiClients.Dan` NuGet package to the `App.csproj` file:

```xml
<PackageReference Include="Altinn.ApiClients.Dan" Version="4.1.0" />
```

#### Implementing an External API Client with DAN

Here's an example of how to implement an External API client that uses the DAN client to retrieve data from the FregPerson dataset:

```csharp
public class DanExternalClient(IDanClient danClient) : IExternalApiClient
{
    private readonly IDanClient _danClient = danClient;

    public string Id => "externalDanApi";

    public async Task<object> GetExternalApiDataAsync(
        InstanceIdentifier instanceIdentifier,
        Dictionary<string, string> queryParams = null)
    {

        // Call the DAN client to get the dataset
        var response = await _danClient.GetDataSet(
            dataSetName: "danDataSetName"
            /// other params needed for the specific API used
        );

        return response;
    }
}
```

In this example:

- We inject the `IDanClient` into our External API client
- We call the DAN client's `GetDataSet` method to retrieve the data
- We return the response from the DAN client

#### Registering the DAN Client and External API Client

To use the DAN client with your External API client, you need to register both in your application's service container. You also need to register a Maskinporten client definition to enable the DAN client to authenticate with Maskinporten. Add the following code to the `RegisterCustomAppServices` method in your `Program.cs` file:

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
{
    // Register the Maskinporten client definition for DAN
    services.RegisterMaskinportenClientDefinition<SettingsJwkClientDefinition>(
        "my-client-definition-for-dan",
        config.GetSection("MaskinportenSettingsForDanClient")
    );

    // Register the DAN client with the Maskinporten message handler
    services
        .AddDanClient(config.GetSection("DanSettings"))
        .AddMaskinportenHttpMessageHandler<SettingsJwkClientDefinition>(
            "my-client-definition-for-dan"
        );

    // Register your External API client
    services.AddTransient<IExternalApiClient, DanExternalClient>();

    // Other custom services
}
```

You can remove `RegisterMaskinportenClientDefinition` and `AddMaskinportenHttpMessageHandler` if you do not need Maskinporten for authentication.

You'll also need to add both the DAN client and Maskinporten configuration to your `appsettings.json` file:

```json
{
  "DanSettings": {
    "Environment": "dev",
    "EnableDebugLog": true
  },
  "MaskinportenSettingsForDanClient": {
    "Environment": "test",
    "ClientId": "",
    "Scope": "", // relevant scopes for the APIs you want to use
    "EncodedJwk": "",
    "ExchangeToAltinnToken": false,
    "EnableDebugLog": true
  }
}
```

The actual values for `ClientId` and `EncodedJwk` should be stored in Azure Key Vault as described in the [Maskinporten Integration Guide](../../../guides/integration/maskinporten). The `Scope` value should match the dataset you want to access.

## Error handling

When implementing the `GetExternalApiDataAsync` method, you should handle any errors that might occur when calling the external API. Here's an example of how to handle errors:

```csharp
public async Task<object> GetExternalApiDataAsync(
    InstanceIdentifier instanceIdentifier,
    Dictionary<string, string> queryParams = null)
{
    try
    {
        // Make the API call
        var response = await _httpClient.GetAsync("https://api.example.com/data");

        // Check if the request was successful
        if (response.IsSuccessStatusCode)
        {
            // Parse and return the response
            var content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<MyDataModel>(content);
        }
        else
        {
            // Handle error response
            var errorContent = await response.Content.ReadAsStringAsync();
            _logger.LogError($"External API returned error: {response.StatusCode}, {errorContent}");

            // Return an error object or throw an exception
            return new { Error = $"External API returned error: {response.StatusCode}" };
        }
    }
    catch (Exception ex)
    {
        // Handle exceptions
        _logger.LogError($"Error calling external API: {ex.Message}");

        // Return an error object or throw an exception
        return new { Error = "Failed to call external API" };
    }
}
```

## Security considerations

When implementing an External API client, consider the following security aspects:

1. **Authentication**: Ensure that your External API client authenticates properly with the external API. This might involve using API keys, OAuth tokens, or other authentication mechanisms.

2. **Data protection**: Be careful about what data you send to and receive from the external API. Avoid sending sensitive data unless necessary, and validate all incoming data.

3. **Error handling**: As shown in the example above, handle errors gracefully to prevent exposing sensitive information to end users.

4. **Rate limiting**: Implement rate limiting to prevent overloading the external API and to comply with any usage limits imposed by the API provider.

## Troubleshooting

Here are some common issues you might encounter when implementing External API and how to resolve them:

### External API data not showing up in the UI

If your External API data is not appearing in your UI components:

1. **Check your implementation**: Ensure your `IExternalApiClient` implementation is correctly returning data.
2. **Verify registration**: Make sure your client is properly registered in `Program.cs`.
3. **Check expressions**: Verify that your expressions are correctly referencing the External API client ID and property paths.
4. **Inspect network requests**: Use browser developer tools to check if the API endpoint is being called and what response it returns.
5. **Check logs**: Look for any errors in your application logs related to the External API client.

### Authentication issues with external services

If you're having trouble authenticating with external services:

1. **Check credentials**: Verify that your API keys, tokens, or other credentials are correct and not expired.
2. **Inspect request headers**: Ensure authentication headers are being properly set in your requests.
3. **Check environment**: Make sure you're using the correct environment settings (dev, test, prod) for the external service.
4. **Verify scopes**: For Maskinporten, ensure you have the correct scopes configured for the APIs you're trying to access.
