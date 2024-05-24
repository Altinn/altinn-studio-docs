---
title: Instrumentering
linktitle: Instrumentering
description: En oversikt over hvordan man kan instrumentere Altinn Apper, både automatisk og manuelt.
weight: 12
---

{{% notice info %}}
Denne siden refererer til konfigurasjon når [OpenTelemetry (OTel)](https://opentelemetry.io/) er i bruk i appen fra v8 og nyere.
Det eksisterende Application Insights SDK oppsettet er utgått, og vil fjernes i neste hovedversjon av Altinn.App biblioteker
{{% /notice %}}

Instrumentering handler om å legge til ekstra kontekst og informasjon til eksponert telemetri. Det gjør debugging og analyse av app-helse og ytelse enklere.
Instrumentering gjennom OpenTelemetry kan ta tre former, signaltypene er:

* Traces
* Logger
* Metrikker

Ut av boksen får man automatisk instrumentert HTTP server og klientforespørsler. Det gjør at forespørsler som kommer fra bruker/frontend
automatisk vil bli innsamlet, samt alle andre HTTP-kall som er bygget inn i appen.
Denne instrumenteringer følger den [OpenTelemetry sine semantiske konvensjoner](https://opentelemetry.io/docs/concepts/semantic-conventions/) for attributter.

Konvensjonene burde også følges for manuell instrumentering.
Altinn.App.Core biblioteket har mekanismer for manuell instrumentering med standarder for attributtnavn og verdier
for Altinn-spesifikke data og identifikatorer.

## Distribuert trace

Distribuert tracing gjøres gjennom `System.Diagnostics.ActivitySource` og `System.Diagnostics.Activity` in .NET.
Alternativt kan et mellomlag-API som tilgjengeliggjøres av OTel sin SKD brukes. Det legger seg rundt `System.Diagnostics.Activity` APIet.

Distribuert tracer består av
* tracer - en samling av span, identifisert med en Trace ID
* span - en arbeidsenhet (unit of work) med start- og sluttidspunkt, identisfisert med en Span Id og en peker til foreldre sin Span ID

En trace kan tenkes på som et tre av span som gjør oss i stand til å visualisere og analysere arbeidsenheter i en konsteks og
i relasjon til andre span i samme trace. Trace kan brukes omtrent som en logger for debugging og analyser,
men tilbyr en mer omfattende kontekst - noe som er spesielt nyttig i en distribuert setting. Altinn 3 er en mikrotjenestebasert plattform 
som gjør at distribuert trace er å anbefale og burde være hovedverktøyet for debugging av observasjon for apper.

Her er et eksempel på en klient som implementerer Bring sitt API (som en del av Altinn apputvikling kurset),
hvor vi instrumenterer med domenespesifikk span/activity:

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

I kodeeksempelet over oppretter vi et span rundt hele HTTP operasjonen, og vi legger til postkoden som ekstra kontekst.
Vi vet da at om API-kallet skulle feile så kan vi verifisere om postkoden var noe vi forventet. 
Husk at den automatiserte instrumenteringer vil legge inn et span under vårt, som gir oss HTTP-spesifikk kontekst - statuskode, URL
og annen informasjon som definert i OpenTelemetry semantiske konvensjoner.
Fordi vi instrumenterte koden og analyserte mulige feilkilder så oppdaterer vi koden og gjør den mer robust:

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

Altinn-apper har også tilgang på metoder for å sette domenespesifikke tags, via en utvidelse av `System.Diagnostics.Activity?` i 
`Altinn.App.Core`. Dette inkluderer bruker ID, part ID, instans ID og prosessoppgave ID. I koden under, gir vi
ekstra kontekst ved å legge til brukers part ID til trace:

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

### Ressurser

Les mer om distribuert trace i
* [.NET docs](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/distributed-tracing-instrumentation-walkthroughs)
* [OpenTelemetry.io docs](https://opentelemetry.io/docs/concepts/signals/traces/)
* [opentelemetry-dotnet docs](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/trace)

## Logging

Logging gjøres ved å bruke `Microsoft.Extensions.Logging.ILogger<T>` interface. Da blir loggene automatisk sendt gjennom OTel eksportering
(local-test sin OTel Collector ved lokal kjøring, Azure Monitor når i et miljø som produksjon).

Under har vi modifisert vår `BringClient` til å logge informasjonslogg for postkoder som blir søkt etter:

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

## Ressurser

Les mer om logging i
* [.NET docs](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/logging/?view=aspnetcore-8.0)
* [opentelemetry-donet docs](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/logs)
* [OpenTelemetry.io docs](https://opentelemetry.io/docs/concepts/signals/logs/)

## Metrikker

Instrumentering av metrikker gjøre gjennom `System.Diagnostics.Metrics.Meter` og
  * `System.Diagnostics.Metrics.Counter<T>`
  * `System.Diagnostics.Metrics.UpDownCounter<T>`
  * `System.Diagnostics.Metrics.ObservableCounter<T>`
  * `System.Diagnostics.Metrics.ObservableUpDownCounter<T>`
  * `System.Diagnostics.Metrics.ObservableGauge<T>`
  * `System.Diagnostics.Metrics.Histogram<T>`

Les .NET og OTel dokumentasjon i `Ressurser`-seksjonen under for forskjellen mellom disse typene.

Metrikker er mest nyttig for grov aggregering av tidsserier, for å gi en høynivå innsikt inn i
tilstanden til en eller flere applikasjoner. Tidsserier kan visualiseres og gi et inntrykk og en referanse for hva som kan forventes.
I fremtiden vil det bli mulig å lage alarmer basert på disse metrikkene.

Vi fortsetter med `BringClient`-eksempelet. Nå legger vi inn caching av API svar for bedre ytelse,
og instrumenterer slik at vi for metrikker for hvor ofte cachen blir benyttet. Når vi legger inn metrikker må vi tenke på

* Instrumenter (e.g. `Counter<T>`) burde ikke opprettes ofte, så vi registrerer tjenesten som en `Singleton`
* Vi bruker `Telemetry.Metrics.CreateName` for å standardisere metrikknavn
* Vi bruker en minne cache og har attributes/tags tracking 

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
        Telemetry.Metrics.CreateName("bring_client_lookup_poststed_requests") // CreateName prefixer metrikknavn med 'altinn_app'
    );

    public async Task<PostalCodeLookupResult> LookupPostalCode(int postalCode, CancellationToken cancellationToken)
    {
        using var activity = telemetry.ActivitySource.StartActivity("PostalCodeLookup");

        var key = $"{nameof(LookupPostalCode)}-{postalCode}";

        if (postalCode is < 1000 or > 9999)
            throw new ArgumentOutOfRangeException(nameof(postalCode), "Must be a valid postal code");

        KeyValuePair<string, object?> tag; // Dette vil la oss kalkulerer treffraten
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

### Ressurser

Les mer om metrikker i 
* [.NET docs](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/metrics-instrumentation)
* [OpenTelemetry.io docs](https://opentelemetry.io/docs/concepts/signals/metrics/)
* [opentelemetry-dotnet docs](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/metrics)

## Migrering fra classic Application Insights SDK

Microsoft [har dokuemntert at](https://github.com/MicrosoftDocs/azure-docs/commit/25d58a0c1e5a1d5740d99fd68d89a9372042838e)

> The long-term plan for Application Insights is to collect data using OpenTelemetry.

(Den langsiktige planen for Application Insights er å samle inn data med OpenTelemetry)

Som betyr at classic SDK vil med stor sannsynlighet utfases i fremtiden.
Det er derfor å anbefale en migrering når mulig, ved å følge instruksene over.

Dersom du har manuell instrumentering med `TelemetryClient` fra classic Application Insights SDK, så må dette migreres til OTel ekvivalent.
Application Insights SDK sender - likt som OTel - logger basert på `ILogger<T>` abstraksjonen, so de eneste stedene
der endring er nødvendig er der APIet brukes (trace, metrikk, eventuelt annet fra Application Insights datamodellen)

Datamodellen til Application Insight er annerledes enn OTel sin.
Her er oversikt over ulikhetene:

| **Application Insights** | **OpenTelemetry**      | **`System.Diagnostics` API**                |
| ------------------------ | ---------------------- | ------------------------------------------- |
| Request                  | Span                   | `Activity`                                  |
| Exception                | Span with span event   | `Activity` with `Activity.AddEvent`         |
| Dependency               | Span                   | `Activity`                                  |
| Event                    | Span, span event, logs | `Activity`/`Activity.AddEvent`/`ILogger<T>` |
| Trace                    | Span, logs             | `Activity`/`ILogger<T>`                     |
| Metric                   | Metrics                | `Metric`                                    |