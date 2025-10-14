---
title: Add tracing and metrics
linktitle: Add tracing and metrics
description: How to add tracing and metrics to your Altinn app, both automatically and manually.
weight: 12
tags: [needsReview]
---

{{% notice info %}}
This page refers to the configuration when [OpenTelemetry (OTel)](https://opentelemetry.io/) is in use in the app from v8 and newer.
The existing Application Insights SDK setup is deprecated and will be removed in the next major version of the Altinn.App libraries.
{{% /notice %}}

## What is instrumentation?

Instrumentation is about adding extra context and information to the telemetry that your app sends out. This makes it easier to debug and analyse your app's health and performance.

**Example:** Instead of just knowing that a request took 2 seconds, instrumentation can tell you that the request came from a user with partyId 12345, and that it spent 1.5 seconds fetching data from Bring's API.

## The three signal types in OpenTelemetry

Instrumentation through OpenTelemetry can take three forms:

### 1. Traces
Tracing shows the entire journey of a request through your system, from start to finish.

**Example:** When a user submits a form, you can see all the steps: receive request → validate data → save to database → call external API → return response.

### 2. Logs
Logs are text messages that describe what is happening in the app.

**Example:** "User 12345 submitted form for postal code 0123" or "Error during validation: national identity number missing".

### 3. Metrics
Metrics are numerical values that are measured over time, for example the number of requests or response times.

**Example:** "The app has received 1500 requests in the last hour" or "Average response time is 350 milliseconds".

## Automatic instrumentation

Out of the box you get automatically instrumented HTTP server and client requests. This means that requests coming from the user/frontend
are automatically collected, as well as all other HTTP calls that are built into the app.

**Explanation:** "Out of the box" means that this works automatically without you needing to write extra code.

This instrumentation follows [OpenTelemetry's semantic conventions](https://opentelemetry.io/docs/concepts/semantic-conventions/) for attributes. The conventions should also be followed for manual instrumentation.

The Altinn.App.Core library has mechanisms for manual instrumentation with standards for attribute names and values
for Altinn-specific data and identifiers. This is done via the *Altinn.App.Core.Features.Telemetry* class and extension methods on *System.Diagnostics.Activity*.

## Distributed tracing

Distributed tracing is done through *System.Diagnostics.ActivitySource* and *System.Diagnostics.Activity* in .NET.
Alternatively, a middleware API made available by OpenTelemetry's SDK can be used. It wraps around the *System.Diagnostics.Activity* API.

### What does distributed tracing consist of?

Distributed tracing consists of:
* **Trace:** A collection of spans, identified with a trace ID
* **Span:** A unit of work with a start and end time, identified with a span ID and a link to a parent span

**Explanation:** Think of a trace as a path through your system, and each span as a step on this path. Each step has a start and end time, and a link to the previous step.

We can think of a trace as a tree of spans. This allows us to visualise and analyse units of work in a context and
in relation to other spans in the same trace. We can use a trace somewhat like a logger for debugging and analysis,
but it offers a more comprehensive context – which is especially useful in a distributed setting. Altinn 3 is a microservice-based platform,
which means that distributed tracing is recommended and should be the main tool for debugging and observation for apps.

### Example: Instrumenting an API call

Here is an example of a client that implements Bring's API (as part of the Altinn app development course),
where we instrument with a domain-specific span/activity:

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

In the code example above, we create a span around the entire HTTP operation, and we add the postal code as extra context.
We then know that if the API call were to fail, we can verify whether the postal code was something we expected.

**Explanation:** `SetTag` adds extra information (metadata) to the span, which you can use to filter and search in the telemetry later.

Remember that the automated instrumentation will add a span under ours, which gives us HTTP-specific context – status code, URL
and other information as defined in OpenTelemetry's semantic conventions.
Because we instrumented the code and analysed possible sources of errors, we update the code and make it more robust:

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

### Altinn-specific tags

Altinn apps also have access to methods for setting domain-specific tags, via an extension of *System.Diagnostics.Activity?* in
*Altinn.App.Core*. This includes user ID, party ID, instance ID and process task ID.

In the code below we give extra context by adding the user's party ID to the trace:

{{< highlight csharp "linenos=false,hl_lines=4 9-18" >}}
internal sealed class BringClient(
    IHttpClientFactory httpClientFactory,
    Telemetry telemetry,
    IHttpContextAccessor httpContextAccessor
)
{
    public async Task<PostalCodeLookupResult> LookupPostalCode(int postalCode, CancellationToken cancellationToken)
    {
        var httpContext = httpContextAccessor.HttpContext;
        if (httpContext is null)
            throw new InvalidOperationException("Can't lookup postal code without running the context of a users HTTP request");

        var partyIdStr = httpContext.User?.Claims.FirstOrDefault(c => c.Type == "urn:altinn:partyid")?.Value;
        if (partyIdStr is null || !int.TryParse(partyIdStr, CultureInfo.InvariantCulture, out var partyId))
            throw new Exception("Couldn't fetch information on current user");

        using var activity = telemetry.ActivitySource.StartActivity("PostalCodeLookup");
        activity?.SetUserPartyId(partyId);
        activity?.SetTag("address.postalcode", postalCode);

        if (postalCode is < 1000 or > 9999)
            throw new ArgumentOutOfRangeException(nameof(postalCode), "Must be a valid postal code");

        // ...
    }
}
{{< / highlight >}}

### Learn more about distributed tracing

Read more about distributed tracing in:
* [.NET docs](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/distributed-tracing-instrumentation-walkthroughs)
* [OpenTelemetry.io docs](https://opentelemetry.io/docs/concepts/signals/traces/)
* [opentelemetry-dotnet docs](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/trace)

## Logging

Logging is done by using the *Microsoft.Extensions.Logging.ILogger<T>* interface. The logs are then automatically sent through OpenTelemetry export
(local-test's OpenTelemetry Collector when running locally, Azure Monitor when in an environment such as production).

Below we have modified our *BringClient* to log information logs for postal codes that are being searched for:

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

**Explanation:** `LogInformation` writes an information message to the log. There are different log levels: Information (general info), Warning (warnings), Error (errors), etc.

### Learn more about logging

Read more about logging in:
* [.NET docs](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/logging/?view=aspnetcore-8.0)
* [opentelemetry-dotnet docs](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/logs)
* [OpenTelemetry.io docs](https://opentelemetry.io/docs/concepts/signals/logs/)

## Metrics

Instrumentation of metrics is done through `System.Diagnostics.Metrics.Meter` and:
  * `System.Diagnostics.Metrics.Counter<T>`
  * `System.Diagnostics.Metrics.UpDownCounter<T>`
  * `System.Diagnostics.Metrics.ObservableCounter<T>`
  * `System.Diagnostics.Metrics.ObservableUpDownCounter<T>`
  * `System.Diagnostics.Metrics.ObservableGauge<T>`
  * `System.Diagnostics.Metrics.Histogram<T>`

**Explanation of metric types:**
- **Counter:** A counter that can only increase (for example, total number of requests)
- **Up/down counter:** A counter that can increase and decrease (for example, number of active users)
- **Histogram:** Distribution of values (for example, response times distributed in intervals)
- **Gauge:** A value that can go up and down (for example, memory usage)

Read the .NET and OpenTelemetry documentation in the *Resources* section below for the difference between these types.

### Why use metrics?

Metrics are most useful for coarse aggregation of time series, to provide a high-level insight into
the state of one or more applications. Time series can be visualised and give an impression and a reference for what can be expected.
In the future it will be possible to create alerts based on these metrics.

**Example:** You can create a graph showing the number of logins per hour over a week, and set up an alert if the number suddenly falls below 100 per hour.

### Example: Cache instrumentation with metrics

We continue with the *BringClient* example. Now we add caching of API responses for better performance,
and instrument so that we get metrics for how often the cache is used. When we add metrics we must consider:

* Instruments (for example *Counter<T>*) should not be created frequently, so we register the service as a *Singleton*
* We use *Telemetry.Metrics.CreateName* to standardise metric names
* We use a memory cache and have attributes/tags for tracing

**Explanation:**
- **Singleton:** A service that is only created once and reused
- **Cache:** A temporary storage that remembers results to avoid making the same lookup multiple times

{{< highlight csharp "linenos=false,hl_lines=5 12 22-24 35-49 62" >}}
internal static class BringClientDI
{
    public static IServiceCollection AddBringClient(this IServiceCollection services)
    {
        services.AddSingleton<BringClient>(); // Counters should not be created frequently, so we use Singleton here
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
        Telemetry.Metrics.CreateName("bring_client_lookup_poststed_requests") // CreateName prefixes metric name with 'altinn_app'
    );

    public async Task<PostalCodeLookupResult> LookupPostalCode(int postalCode, CancellationToken cancellationToken)
    {
        using var activity = telemetry.ActivitySource.StartActivity("PostalCodeLookup");

        var key = $"{nameof(LookupPostalCode)}-{postalCode}";

        if (postalCode is < 1000 or > 9999)
            throw new ArgumentOutOfRangeException(nameof(postalCode), "Must be a valid postal code");

        KeyValuePair<string, object?> tag; // This will allow us to calculate the hit rate
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

**Explanation of the example:** We count each time we make a lookup, and mark it with whether it was a cache hit (found in cache) or not. We can then later see how effective the cache is by comparing the number of hits against the total number of lookups.

### Learn more about metrics

Read more about metrics in:
* [.NET docs](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/metrics-instrumentation)
* [OpenTelemetry.io docs](https://opentelemetry.io/docs/concepts/signals/metrics/)
* [opentelemetry-dotnet docs](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/metrics)

## Migrate from Application Insights SDK

Microsoft [has documented that](https://github.com/MicrosoftDocs/azure-docs/commit/25d58a0c1e5a1d5740d99fd68d89a9372042838e)

> The long-term plan for Application Insights is to collect data using OpenTelemetry.

This means that the classic SDK will most likely be phased out in the future.
We therefore recommend migrating when possible, by following the instructions above.

### Migrate manual instrumentation

If you have manual instrumentation with *TelemetryClient* from the classic Application Insights SDK, this must be migrated to the OpenTelemetry equivalent.
Application Insights SDK sends – like OpenTelemetry – logs based on the *ILogger<T>* abstraction, so the only places
where changes are necessary are where the API is used (trace, metrics, or other elements from the Application Insights data model).

The Application Insights data model is different from OpenTelemetry's.
Here is an overview of the differences:

| **Application Insights** | **OpenTelemetry**      | **System.Diagnostics API**                |
| ------------------------ | ---------------------- | ------------------------------------------- |
| Request                  | Span                   | *Activity*                                  |
| Exception                | Span with span event   | *Activity* with *Activity.AddEvent*         |
| Dependency               | Span                   | *Activity*                                  |
| Event                    | Span, span event, logs | *Activity*/*Activity.AddEvent*/*ILogger<T>* |
| Trace                    | Span, logs             | *Activity*/*ILogger<T>*                     |
| Metric                   | Metrics                | *Metric*                                    |
