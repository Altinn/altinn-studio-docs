---
title: Instrumentation
linktitle: Instrumentation
description: An overview of how to instrument Altinn Apps, both automatic and manually.
weight: 12
---

{{% notice info %}}
This page refers to configuration when [OpenTelemetry (OTel)](https://opentelemetry.io/) is enabled in the app from v8 and newer.
The existing Application Insights SDK setup is obsolete and will be removed in the next major version of the Altinn.App libraries. 
{{% /notice %}}

Instrumentation is about adding additional breadcrumbs for you to use when debugging or analyzing app health or performance.
Instrumentation through OpenTelemetry can take the form of 3 signal types:

* Traces
* Logs
* Metrics

By default, automatic instrumentation is added for HTTP server and client requests,
which will automatically capture all requests coming from the user/fronend to the API of the app,
and all downstream requests to Platform APIs and any other HTTP-based integration that has been built into the app.
This instrumentation follows the [semantic conventions of the OTel spec](https://opentelemetry.io/docs/concepts/semantic-conventions/) in terms of attributes.

For manual instrumentation, you should also make sure to follow semantic conventions where applicable.
The Altinn.App.Core library has mechanisms for doing manual instrumentation while standardizing on attribute names and values
for Altinn-specific data and identifiers.

## Distributed tracing

Distributed tracing is done through `System.Diagnostics.ActivitySource` and `System.Diagnostics.Activity` in .NET
Alternatively, there is a shim API provided by the OTel SDK that simply wraps the Activity API that can be used.

Distributed tracing consists of 
* Traces - a collection of spans, identified by a Trace ID
* Spans - a unit of work with a start and a stop timestamp, identified by a Span ID with a pointer to a parent Span ID

A trace can be thought of as a tree of spans, letting us visualize and analyze units of work in context and in relation
to other spans in the same trace. Traces can be used in roughly the same way as logs in terms of debugging and analysis,
but offers richer context, which is especially useful in a distributed setting. Altinn 3 is a microservices-based platform,
so utilizing distributed tracing is highly recommended and should be the primary tool for debugging and observing apps.

Here is an example of a client that implements Bring's API (as part of the Altinn app development course), 
which has been instrumented with a domain specific span/activity:

{{< highlight csharp "linenos=false,hl_lines=3 8-9" >}}
internal sealed class BringClient(
    IHttpClientFactory httpClientFactory, 
    Telemetry telemetry
)
{
    public async Task<PostalCodeLookupResult> LookupPostalCode(int postalCode, CancellationToken cancellationToken)
    {
        using var activity = telemetry.ActivitySource.StartActivity("PostalCodeLookup");
        activity?.SetTag("address.postalcode", postalCode);

        using var client = httpClientFactory.CreateClient();

        using var response = await client.GetAsync(
            $"https://fraktguide.bring.no/fraktguide/api/postalCode.json?country=no&pnr={postalCode}",
            cancellationToken
        );
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadFromJsonAsync<PostalCodeLookupResult>(cancellationToken);
    }
}
{{< / highlight >}}

In the case above, we create a single span wrapping the HTTP client operation, and add the postal code as additional context.
We then know that if this API fails, we can at least verify that the postal code was something that we expected.
Remember, automatic instrumentation will make sure to inject an additional span below ours, such that we can inspect
attributes such as HTTP status code, URL and other information as per OTel semantic conventions as needed.
As we encounter errors or analyze the potential failure conditions of the code, we might decide to add error handling for the postal code:

{{< highlight csharp "linenos=false,hl_lines=11-12" >}}
internal sealed class BringClient(
    IHttpClientFactory httpClientFactory, 
    Telemetry telemetry
)
{
    public async Task<PostalCodeLookupResult> LookupPostalCode(int postalCode, CancellationToken cancellationToken)
    {
        using var activity = telemetry.ActivitySource.StartActivity("PostalCodeLookup");
        activity?.SetTag("address.postalcode", postalCode);

        if (postalCode is < 1000 or > 9999)
            throw new ArgumentOutOfRangeException(nameof(postalCode), "Must be a valid postal code");

        // ...
    }
}
{{< / highlight >}}

There are also extension methods on `System.Diagnostics.Activity?` for setting domain-specific tags,
such as a User ID, Party ID, Instance ID and Process Task ID.

### Resources

Read more about distributed tracing at
* [.NET docs](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/distributed-tracing-instrumentation-walkthroughs)
* [OpenTelemetry.io docs](https://opentelemetry.io/docs/concepts/signals/traces/)
* [opentelemetry-dotnet docs on Github](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/trace)

## Logging

Logging is done through injecting the `Microsoft.Extensions.Logging.ILogger<T>` interface where needed.
Logs are automatically shipped through the configured OTel exporters (localtest OTel collector if running locally, Azure Monitor when deployed).

Below we have modified our `BringClient` to log information messages for postal codes that are looked up:

{{< highlight csharp "linenos=false,hl_lines=4 15" >}}
internal sealed class BringClient(
    IHttpClientFactory httpClientFactory, 
    Telemetry telemetry,
    ILogger<BringClient> logger
)
{
    public async Task<PostalCodeLookupResult> LookupPostalCode(int postalCode, CancellationToken cancellationToken)
    {
        using var activity = telemetry.ActivitySource.StartActivity("PostalCodeLookup");
        activity?.SetTag("address.postalcode", postalCode);

        if (postalCode is < 1000 or > 9999)
            throw new ArgumentOutOfRangeException(nameof(postalCode), "Must be a valid postal code");

        logger.LogInformation("Looking up postal code information - PostalCode={PostalCode}", postalCode);
        // ...
    }
}
{{< / highlight >}}

### Resources

Read more about logging at
* [.NET docs](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/logging/?view=aspnetcore-8.0)
* [opentelemetry-donet docs on Github](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/logs)
* [OpenTelemetry.io docs](https://opentelemetry.io/docs/concepts/signals/logs/)

## Metrics

Metric instrumentation is done through `System.Diagnostics.Metrics.Meter` and
  * `System.Diagnostics.Metrics.Counter<T>`
  * `System.Diagnostics.Metrics.UpDownCounter<T>`
  * `System.Diagnostics.Metrics.ObservableCounter<T>`
  * `System.Diagnostics.Metrics.ObservableUpDownCounter<T>`
  * `System.Diagnostics.Metrics.ObservableGauge<T>`
  * `System.Diagnostics.Metrics.Histogram<T>`

Read the .NET and OTel docs below for the differences between these types.

Metrics are mostly useful for coarse aggregation of timeseries, to provide high level insight
into the state of of an app or across multiple apps. Timeseries can then be visualized to create a baseline of expectations.
In the future we will also be able to create alerts based on these metrics.

We continue to expand on the `BringClient` example, where we now cache the API respones
and make sure to track the cache hitrate using metrics. With metrics we have to consider

* Instruments (e.g. `Counter<T>`) should not be created often, so we register the service as a `Singleton`
* We use `Telemetry.Metrics.CreateName` to standardize on metric names
* We use a memory cache and have attributes/tags tracking 

{{< highlight csharp "linenos=false,hl_lines=5 12 22-24 35-49 62" >}}
internal static class BringClientDI
{
    public static IServiceCollection AddBringClient(this IServiceCollection services)
    {
        services.AddSingleton<BringClient>(); // Counters shouldn't be created/retrieved often, so we use Singleton here
        return services;
    }
}

internal sealed class BringClient(
    IHttpClientFactory httpClientFactory, 
    Telemetry telemetry
)
{
    private readonly MemoryCache _cache = new MemoryCache(new MemoryCacheOptions() { SizeLimit = 10_000 });
    private readonly MemoryCacheEntryOptions _cacheEntryOptions = new MemoryCacheEntryOptions()
    {
        Size = 1,
        AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(24)
    };

    private readonly Counter<long> _counter = telemetry.Meter.CreateCounter<long>(
        Telemetry.Metrics.CreateName("bring_client_lookup_poststed_requests") // CreateName prefixes the metric name with 'altinn_app'
    );

    public async Task<PostalCodeLookupResult> LookupPostalCode(int postalCode, CancellationToken cancellationToken)
    {
        using var activity = telemetry.ActivitySource.StartActivity("PostalCodeLookup");

        var key = $"{nameof(LookupPostalCode)}-{postalCode}";

        if (postalCode is < 1000 or > 9999)
            throw new ArgumentOutOfRangeException(nameof(postalCode), "Must be a valid postal code");

        KeyValuePair<string, object?> tag; // This will let us calculate cache hitrate
        if (_cache.TryGetValue(key, out PostalCodeLookupResult? result))
        {
            if (result is null)
                throw new Exception("Null value was cached");
            tag = new KeyValuePair<string, object?>("cache.hit", "true");
            return result;
        }
        else
        {
            tag = new KeyValuePair<string, object?>("cache.hit", "false");
        }

        activity?.SetTag(tag.Key, tag.Value);
        _counter.Add(1, tag);

        using var client = httpClientFactory.CreateClient();

        using var response = await client.GetAsync(
            $"https://fraktguide.bring.no/fraktguide/api/postalCode.json?country=no&pnr={postalCode}",
            cancellationToken
        );
        response.EnsureSuccessStatusCode();

        result =
            await response.Content.ReadFromJsonAsync<PostalCodeLookupResult>(cancellationToken)
            ?? throw new Exception("Could not deserialize postal code lookup result");
        _cache.Set(key, result, _cacheEntryOptions);
        return result;
    }
}
{{< / highlight >}}

### Resources

Read more about metrics at
* [.NET docs](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/metrics-instrumentation)
* [OpenTelemetry.io docs](https://opentelemetry.io/docs/concepts/signals/metrics/)
* [opentelemetry-dotnet docs on Github](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/metrics)
