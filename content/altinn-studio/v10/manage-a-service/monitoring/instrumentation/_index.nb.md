---
draft: false
title: Legge til sporing og målinger
linktitle: Legge til sporing og målinger
description: Slik legger du til sporing og målinger i Altinn-appen din, både automatisk og manuelt.
weight: 12
tags: [needsReview]
---

{{% notice info %}}
Denne siden refererer til konfigurasjon når [OpenTelemetry (OTel)](https://opentelemetry.io/) er i bruk i appen fra v8 og nyere.
Det eksisterende Application Insights SDK-oppsettet er utgått, og vil bli fjernet i neste hovedversjon av Altinn.App-bibliotekene.
{{% /notice %}}

## Hva er instrumentering?

Instrumentering handler om å legge til ekstra kontekst og informasjon til telemetrien som appen din sender ut. Dette gjør det enklere å finne feil (debugging) og analysere appens helse og ytelse.

**Eksempel:** I stedet for bare å vite at en forespørsel tok 2 sekunder, kan instrumentering fortelle deg at forespørselen kom fra bruker med partyId 12345, og at den brukte 1,5 sekunder på å hente data fra Bring sitt API.

## De tre signaltypene i OpenTelemetry

Instrumentering gjennom OpenTelemetry kan ta tre former:

### 1. Sporingsdata (traces)
Sporing viser hele reisen til en forespørsel gjennom systemet ditt, fra start til slutt.

**Eksempel:** Når en bruker sender inn et skjema, kan du se alle stegene: motta forespørsel → validere data → lagre til database → kalle eksternt API → returnere svar.

### 2. Logger (logs)
Logger er tekstmeldinger som beskriver hva som skjer i appen.

**Eksempel:** "Bruker 12345 sendte inn skjema for postkode 0123" eller "Feil ved validering: personnummer mangler".

### 3. Målinger (metrics)
Målinger er tallverdier som måles over tid, for eksempel antall forespørsler eller responstider.

**Eksempel:** "Appen har mottatt 1500 forespørsler den siste timen" eller "Gjennomsnittlig responstid er 350 millisekunder".

## Automatisk instrumentering

Ut av boksen får du automatisk instrumentert HTTP-server og klientforespørsler. Det betyr at forespørsler som kommer fra bruker/frontend
automatisk blir innsamlet, samt alle andre HTTP-kall som er bygget inn i appen.

**Forklaring:** "Ut av boksen" betyr at dette fungerer automatisk uten at du trenger å skrive ekstra kode.

Denne instrumenteringen følger [OpenTelemetry sine semantiske konvensjoner](https://opentelemetry.io/docs/concepts/semantic-conventions/) for attributter. Konvensjonene bør også følges for manuell instrumentering.

Altinn.App.Core-biblioteket har mekanismer for manuell instrumentering med standarder for attributtnavn og verdier
for Altinn-spesifikke data og identifikatorer. Dette gjøres via *Altinn.App.Core.Features.Telemetry*-klassen og extension-metoder på *System.Diagnostics.Activity*.

## Distribuert sporing (distributed tracing)

Distribuert sporing gjøres gjennom *System.Diagnostics.ActivitySource* og *System.Diagnostics.Activity* i .NET.
Alternativt kan et mellomlag-API som tilgjengeliggjøres av OpenTelemetry sin SDK brukes. Det legger seg rundt *System.Diagnostics.Activity*-API-et.

### Hva består distribuert sporing av?

Distribuert sporing består av:
* **Spor (trace):** En samling av steg (spans), identifisert med en spor-ID (trace ID)
* **Steg (span):** En arbeidsenhet (unit of work) med start- og sluttidspunkt, identifisert med en steg-ID (span ID) og en kobling til overordnet steg (parent span)

**Forklaring:** Tenk på en trace som en sti gjennom systemet ditt, og hver span som et steg på denne stien. Hvert steg har en start- og sluttid, og en kobling til steget før.

Vi kan tenke på en trace som et tre av spans. Dette gjør at vi kan visualisere og analysere arbeidsenheter i en kontekst og
i relasjon til andre spans i samme trace. Vi kan bruke trace omtrent som en logger for feilsøking og analyser,
men den tilbyr en mer omfattende kontekst – noe som er spesielt nyttig i en distribuert setting. Altinn 3 er en mikrotjenestebasert plattform,
noe som gjør at distribuert sporing er å anbefale og bør være hovedverktøyet for feilsøking og observasjon for apper.

### Eksempel: Instrumentere et API-kall

Her er et eksempel på en klient som implementerer Bring sitt API (som en del av Altinn-apputviklingskurset),
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

I kodeeksempelet over oppretter vi et span rundt hele HTTP-operasjonen, og vi legger til postkoden som ekstra kontekst.
Vi vet da at om API-kallet skulle feile, så kan vi verifisere om postkoden var noe vi forventet.

**Forklaring:** `SetTag` legger til ekstra informasjon (metadata) til spanet, som du kan bruke til å filtrere og søke i telemetrien senere.

Husk at den automatiserte instrumenteringen vil legge inn et span under vårt, som gir oss HTTP-spesifikk kontekst – statuskode, URL
og annen informasjon som definert i OpenTelemetry semantiske konvensjoner.
Fordi vi instrumenterte koden og analyserte mulige feilkilder, så oppdaterer vi koden og gjør den mer robust:

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

### Altinn-spesifikke tags

Altinn-apper har også tilgang på metoder for å sette domenespesifikke tags, via en utvidelse av *System.Diagnostics.Activity?* i
*Altinn.App.Core*. Dette inkluderer bruker-ID, party-ID, instans-ID og prosessoppgave-ID.

I koden under gir vi ekstra kontekst ved å legge til brukerens party-ID til trace:

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

### Lære mer om distribuert sporing

Les mer om distribuert sporing i:
* [.NET docs](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/distributed-tracing-instrumentation-walkthroughs)
* [OpenTelemetry.io docs](https://opentelemetry.io/docs/concepts/signals/traces/)
* [opentelemetry-dotnet docs](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/trace)

## Logging

Logging gjøres ved å bruke *Microsoft.Extensions.Logging.ILogger<T>*-interfacet. Da blir loggene automatisk sendt gjennom OpenTelemetry-eksportering
(local-test sin OpenTelemetry Collector ved lokal kjøring, Azure Monitor når i et miljø som produksjon).

Under har vi modifisert vår *BringClient* til å logge informasjonslogg for postkoder som blir søkt etter:

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

**Forklaring:** `LogInformation` skriver en informasjonsmelding til loggen. Det finnes ulike logg-nivåer: Information (generell info), Warning (advarsler), Error (feil), osv.

### Lære mer om logging

Les mer om logging i:
* [.NET docs](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/logging/?view=aspnetcore-8.0)
* [opentelemetry-dotnet docs](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/logs)
* [OpenTelemetry.io docs](https://opentelemetry.io/docs/concepts/signals/logs/)

## Målinger (metrics)

Instrumentering av målinger gjøres gjennom `System.Diagnostics.Metrics.Meter` og:
  * `System.Diagnostics.Metrics.Counter<T>`
  * `System.Diagnostics.Metrics.UpDownCounter<T>`
  * `System.Diagnostics.Metrics.ObservableCounter<T>`
  * `System.Diagnostics.Metrics.ObservableUpDownCounter<T>`
  * `System.Diagnostics.Metrics.ObservableGauge<T>`
  * `System.Diagnostics.Metrics.Histogram<T>`

**Forklaring av målingstyper:**
- **Teller (counter):** En teller som bare kan øke (for eksempel antall forespørsler totalt)
- **Opp-og-ned-teller (up/down counter):** En teller som kan øke og minke (for eksempel antall aktive brukere)
- **Histogram (histogram):** Fordeling av verdier (for eksempel responstider fordelt i intervaller)
- **Måler (gauge):** En verdi som kan gå opp og ned (for eksempel minnebruk)

Les .NET- og OpenTelemetry-dokumentasjon i *Ressurser*-seksjonen under for forskjellen mellom disse typene.

### Hvorfor bruke målinger?

Målinger er mest nyttige for grov aggregering av tidsserier, for å gi en høynivåinnsikt i
tilstanden til én eller flere applikasjoner. Tidsserier kan visualiseres og gi et inntrykk og en referanse for hva som kan forventes.
I fremtiden vil det bli mulig å lage alarmer basert på disse målingene.

**Eksempel:** Du kan lage en graf som viser antall innlogginger per time over en uke, og sette opp et varsel hvis antallet plutselig faller under 100 per time.

### Eksempel: Cache-instrumentering med målinger

Vi fortsetter med *BringClient*-eksempelet. Nå legger vi inn caching av API-svar for bedre ytelse,
og instrumenterer slik at vi får målinger for hvor ofte cachen blir benyttet. Når vi legger inn målinger må vi tenke på:

* Instrumenter (for eksempel *Counter<T>*) bør ikke opprettes ofte, så vi registrerer tjenesten som en *Singleton*
* Vi bruker *Telemetry.Metrics.CreateName* for å standardisere metrikknavn
* Vi bruker en minnecache og har attributes/tags for sporing

**Forklaring:**
- **Singleton:** En tjeneste som bare opprettes én gang og gjenbrukes
- **Cache:** Et midlertidig lager som husker resultater for å unngå å gjøre samme oppslag flere ganger

{{< highlight csharp "linenos=false,hl_lines=5 12 22-24 35-49 62" >}}
internal static class BringClientDI
{
    public static IServiceCollection AddBringClient(this IServiceCollection services)
    {
        services.AddSingleton<BringClient>(); // Counters bør ikke opprettes ofte, så vi bruker Singleton her
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

        KeyValuePair<string, object?> tag; // Dette vil la oss kalkulere treffraten
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

**Forklaring av eksempelet:** Vi teller hver gang vi gjør et oppslag, og merker det med om det var et cache-treff (funnet i cache) eller ei. Da kan vi senere se hvor effektiv cachen er ved å sammenligne antall treff mot antall totale oppslag.

### Lære mer om målinger

Les mer om målinger i:
* [.NET docs](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/metrics-instrumentation)
* [OpenTelemetry.io docs](https://opentelemetry.io/docs/concepts/signals/metrics/)
* [opentelemetry-dotnet docs](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/metrics)

## Migrere fra Application Insights SDK

Microsoft [har dokumentert at](https://github.com/MicrosoftDocs/azure-docs/commit/25d58a0c1e5a1d5740d99fd68d89a9372042838e)

> The long-term plan for Application Insights is to collect data using OpenTelemetry.

(Den langsiktige planen for Application Insights er å samle inn data med OpenTelemetry)

Dette betyr at den klassiske SDK vil med stor sannsynlighet fases ut i fremtiden.
Vi anbefaler derfor å migrere når det er mulig, ved å følge instruksene over.

### Migrere manuell instrumentering

Dersom du har manuell instrumentering med *TelemetryClient* fra klassisk Application Insights SDK, så må dette migreres til OpenTelemetry-ekvivalent.
Application Insights SDK sender – likt som OpenTelemetry – logger basert på *ILogger<T>*-abstraksjonen, så de eneste stedene
der endring er nødvendig er der API-et brukes (trace, målinger, eventuelt annet fra Application Insights-datamodellen).

Datamodellen til Application Insights er annerledes enn OpenTelemetry sin.
Her er oversikt over ulikhetene:

| **Application Insights** | **OpenTelemetry**      | **System.Diagnostics API**                |
| ------------------------ | ---------------------- | ------------------------------------------- |
| Request                  | Span                   | *Activity*                                  |
| Exception                | Span with span event   | *Activity* with *Activity.AddEvent*         |
| Dependency               | Span                   | *Activity*                                  |
| Event                    | Span, span event, logs | *Activity*/*Activity.AddEvent*/*ILogger<T>* |
| Trace                    | Span, logs             | *Activity*/*ILogger<T>*                     |
| Metric                   | Metrics                | *Metric*                                    |
