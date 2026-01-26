---
draft: false
title: Sette opp overvåking
linktitle: Sette opp overvåking
description: Slik setter du opp overvåking i Altinn-appen din.
weight: 11
tags: [needsReview]
---

{{% notice info %}}
Denne siden refererer til konfigurasjon når [OpenTelemetry (OTel)](https://opentelemetry.io/) er i bruk i appen fra v8 og nyere.
Det eksisterende Application Insights SDK-oppsettet er utgått, og vil bli fjernet i neste hovedversjon av Altinn.App-bibliotekene.
{{% /notice %}}

## Aktivere OpenTelemetry

Det nye oppsettet for overvåking og instrumentering kan aktiveres ved å sette `UseOpenTelemetry` til `true` i *appsettings.json* eller tilsvarende konfigurasjonsfil.

{{< highlight json "linenos=false,hl_lines=3" >}}
{
  "AppSettings": {
    "UseOpenTelemetry": true
  }
}
{{< / highlight >}}

Med denne innstillingen blir OpenTelemetry konfigurert i stedet for den klassiske Application Insights SDK.

### Hva skjer når du aktiverer OpenTelemetry?

All telemetri (målinger, logger og sporing) blir eksportert til:
- **Lokal kjøring:** Det lokale overvåkingsoppsettet (for testing og utvikling)
- **Kjøring i miljø (test/produksjon):** Azure Monitor

Du kan også oppgi **instrumenteringsnøkkel** (instrumentation key) eller **Application Insights connection string** i appsettings eller miljøvariabler lokalt. Da vil Altinn.App eksportere til Azure Monitor også ved lokal kjøring.

### Automatisk instrumentering

Når appen kjøres med `UseOpenTelemetry`, får du automatisk med:

- **HTTP-sporing (traces):** Registrerer alle innkommende og utgående HTTP-forespørsler
- **HTTP-målinger:** Måler responstider, antall forespørsler og feilrater
- **Altinn-spesifikk telemetri:** Domenespesifikke målinger og sporing for Altinn.App

**Eksempel:** Hvis en bruker sender inn et skjema, vil systemet automatisk registrere hvor lang tid det tok, hvilken HTTP-statuskode som ble returnert, og hvilke eksterne tjenester som ble kalt underveis.

For informasjon om hvordan du legger inn egendefinert telemetri, se [Instrumentering](/nb/altinn-studio/v10/manage-a-service/monitoring/instrumentation/).

## Konfigurere OpenTelemetry SDK

I noen tilfeller kan du ha behov for å tilpasse hvordan OpenTelemetry fungerer. Dette er relevant dersom du:

* Trenger egendefinert **berikelse** (enrichment) – å legge til ekstra informasjon i telemetrien
* Trenger egendefinert **utvalgsmetode** (sampling) – å kontrollere hvor mye data som samles inn
* Trenger å eksportere telemetri til en annen backend (for eksempel en egen overvåkingsløsning)

### Hva er berikelse (enrichment)?

Berikelse betyr å legge til ekstra informasjon i telemetrien for å gjøre den mer nyttig.

**Eksempel:** Du kan automatisk legge til miljønavn (test/produksjon) eller organisasjonsnummer på all telemetri som sendes ut.

### Hva er utvalgsmetode (sampling)?

Utvalgsmetode betyr å velge ut bare en del av telemetrien som skal samles inn. Dette kan redusere kostnader og datamengde.

**Eksempel:** I stedet for å lagre informasjon om hver eneste forespørsel, lagrer du kun hver tiende forespørsel, eller bare forespørsler som tar over 1 sekund.

### Legge til en ekstra eksportør

I eksempelet under legger vi til en ekstra eksportør (`ConsoleExporter`) som sender telemetri til konsollen i tillegg til standard Azure Monitor. Dette kan være nyttig for lokal testing.

Først oppdaterer vi `App.csproj`-filen:

{{< highlight csproj "linenos=false" >}}
        <PackageReference Include="OpenTelemetry.Exporter.Console" Version="1.9.0" />
{{< / highlight >}}

Deretter må vi oppdatere konfigurasjonen i `Program.cs`:

{{< highlight csharp "linenos=false,hl_lines=1-3 7-25" >}}
using OpenTelemetry.Logs;
using OpenTelemetry.Metrics;
using OpenTelemetry.Trace;

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Konfigurer eksport for telemetrien (målinger, traces, logger).
    // Her bruker vi konsolleksport som eksempel.
    // Dette kunne også sendt telemetrien til en egendefinert backend.
    services.ConfigureOpenTelemetryMeterProvider(builder =>
        builder.AddConsoleExporter(
            (_, readerOptions) =>
            {
                // Høyere frekvens på eksport av målinger, for å se endringer raskere
                readerOptions.PeriodicExportingMetricReaderOptions.ExportIntervalMilliseconds = 5_000;
                readerOptions.PeriodicExportingMetricReaderOptions.ExportTimeoutMilliseconds = 4_000;
            }
        )
    );
    services.ConfigureOpenTelemetryTracerProvider(builder =>
    {
        // Egendefinert utvalgsmetode (sampling)
        builder.SetSampler(new ParentBasedSampler(new AlwaysOnSampler()));
        builder.AddConsoleExporter();
    });
    services.ConfigureOpenTelemetryLoggerProvider(builder => builder.AddConsoleExporter());
}
{{< / highlight >}}

### Lære mer om konfigurasjon

For å lære mer om hva som kan konfigureres og hvordan, se dokumentasjonen i opentelemetry-dotnet-repositoriet:

* [Customizing OpenTelemetry .NET SDK for Tracing](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/trace/customizing-the-sdk#customizing-opentelemetry-net-sdk-for-tracing)
* [Customizing OpenTelemetry .NET SDK for Logs](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/logs/customizing-the-sdk#customizing-opentelemetry-net-sdk-for-logs)
* [Customizing OpenTelemetry .NET SDK for Metrics](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/metrics/customizing-the-sdk#customizing-opentelemetry-net-sdk-for-metrics)

## Migrere fra Application Insights SDK

Microsoft [har dokumentert at](https://github.com/MicrosoftDocs/azure-docs/commit/25d58a0c1e5a1d5740d99fd68d89a9372042838e)

> The long-term plan for Application Insights is to collect data using OpenTelemetry.

(Den langsiktige planen for Application Insights er å samle inn data med OpenTelemetry)

Dette betyr at den klassiske SDK vil med stor sannsynlighet fases ut i fremtiden.
Vi anbefaler derfor å migrere når det er mulig, ved å følge instruksene over.

### Migrere komponenter som setter i gang og behandler telemetri

Hvis du har egendefinert kode som setter i gang telemetri (initializers) eller behandler telemetri underveis (processors), må disse migreres til OpenTelemetry-ekvivalenter.

| **Application Insights** | **OpenTelemetry** | **Hva det gjør** |
| ------------------------ | ----------------- | ---------------- |
| ITelemetryInitializer    | Processor         | Setter i gang og legger til grunnleggende informasjon i telemetrien |
| ITelemetryProcessor      | Processor         | Behandler og eventuelt filtrerer telemetri før den sendes ut |

### Viktige hensyn

* Både OpenTelemetry og Application Insights SDK bruker W3C Trace-Context-videreføring (propagation) som standard for distribuerte sporingsdata. Dette betyr at sammenhengen på tvers av systemer skal fungere godt i en migreringsfase.

**Forklaring:** W3C Trace-Context er en standard som gjør at ulike systemer kan dele sporingsdata og forstå sammenhengen mellom forespørsler som går på tvers av flere tjenester.
