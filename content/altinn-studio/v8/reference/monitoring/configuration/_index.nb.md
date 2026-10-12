---
title: Konfigurasjon
linktitle: Konfigurasjon
description: En oversikt over konfigurasjonsmuligheter for monitorering i Altinn Apps.
weight: 11
---

{{% notice info %}}
Denne siden refererer til konfigurasjon når [OpenTelemetry (OTel)](https://opentelemetry.io/) er i bruk i appen fra v8 og nyere.
Det eksisterende Application Insights SDK oppsettet er utgått, og vil fjernes i neste hovedversjon av Altinn.App biblioteker
{{% /notice %}}

Det nye oppsettet for monitorering og instrumenterting kan aktiveres ved å sette `UseOpenTelemetry` til `true` i *appsettings.json* eller ekvivalent.

{{< highlight json "linenos=false,hl_lines=3" >}}
{
  "AppSettings": {
    "UseOpenTelemetry": true
  }
}
{{< / highlight >}}

Med denne instillingen blir OpenTelemetry konfigurert i stedet for den klassiske Application Insights SDK.
All telemetri blir så eksportert til det lokale monitoreringsoppsettet ved lokal kjøring,
og til Azure monotipr ved kjøring i miljø.
Eventuelt kan en oppgi instrumenteringsnøkkel eller Application Insights connection string til Appsettings eller miljø lokalt,
og da vil Altinn.App ekspoertere til Azure monitor.
Når appen kjøres med `UseOpenTelemetry` så vil det følge med auto-intrumentert telemtri for HTTP (traces og metrikk),
pluss domenespesifikke trace og metrikk for Altinn.App. 

Det er også mulig å konfigurere opentelemetry. Neste seksjon bekriver hvordan dette gjøres, samt hvordan migrere fra
Application Insights for de som har laget egendefinert telemetri med denne SDK'en.
For informasjon om hvordan legge inn egendefinert telemetri se [Instrumentering](/nb/altinn-studio/v8/reference/monitoring/instrumentation/).

## Konfigurering av OpenTelemetry SDK 

Hvis appen har behov for å konfigurere OTel så kan utvidelsesmetodene under brukes for å få relevant provider-builde fra Otel SDK.
Dette er relevant dersom du

* Trenger egendefinert enrichment
* egendefinert sampling
* Trenger å eksportere telemetri til en annen backend

I eksempelet under blir det lagt til en ekstra eksporterer (`ConsoleExporter`) for de respektive provider-builders.

Først oppdaterer vi `App.csproj`-fila:

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
    // Konfigurer eksport for telemetrien (metrics, traces, logs).
    // Her bruker vi konsoll-eksport som eksempel.
    // Dette kunne også sendt telemetrien til en custom backend.
    services.ConfigureOpenTelemetryMeterProvider(builder =>
        builder.AddConsoleExporter(
            (_, readerOptions) =>
            {
                // Høyere frekvens på eksport av metrikker, for å se endringer raskere
                readerOptions.PeriodicExportingMetricReaderOptions.ExportIntervalMilliseconds = 5_000;
                readerOptions.PeriodicExportingMetricReaderOptions.ExportTimeoutMilliseconds = 4_000;
            }
        )
    );
    services.ConfigureOpenTelemetryTracerProvider(builder =>
    {
        // Egendefiner sampling
        builder.SetSampler(new ParentBasedSampler(new AlwaysOnSampler()));
        builder.AddConsoleExporter();
    });
    services.ConfigureOpenTelemetryLoggerProvider(builder => builder.AddConsoleExporter());
}
{{< / highlight >}}

For å lære mer om hva som kan konfigureres og hvordan, se de respektive dokumentene i opentelemetry-dotnet repo:

* [Customizing OpenTelemetry .NET SDK for Tracing](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/trace/customizing-the-sdk#customizing-opentelemetry-net-sdk-for-tracing)
* [Customizing OpenTelemetry .NET SDK for Logs](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/logs/customizing-the-sdk#customizing-opentelemetry-net-sdk-for-logs)
* [Customizing OpenTelemetry .NET SDK for Metrics](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/metrics/customizing-the-sdk#customizing-opentelemetry-net-sdk-for-metrics)

### Sampling og logger i Azure Monitor

{{% notice info %}}
Krever den kommende telemetrifiksen for v8 ([app-lib-dotnet#1889](https://github.com/Altinn/app-lib-dotnet/pull/1889)).
Tidligere v8-versjoner kan ha andre standardverdier.
{{% /notice %}}

Ved direkte eksport til Azure Monitor bruker Altinn.App disse standardverdiene:

| Innstilling | Standardverdi | Virkning |
| --- | --- | --- |
| `SamplingRatio` | `1.0F` | Behold alle traces. |
| `TracesPerSecond` | `null` | Ingen frekvensgrense. Når den har en verdi, overstyrer den `SamplingRatio`. |
| `EnableTraceBasedLogsSampler` | `false` | Eksporter logger uavhengig av sampling av traces. `true` forkaster logger, også feil, knyttet til traces som ikke beholdes. |

Konfigurer `AzureMonitorExporterOptions` i `RegisterCustomAppServices` for å endre innstillingene. For eksempel beholder dette 25 % av traces:

{{< highlight csharp "linenos=false" >}}
// Legg til using Azure.Monitor.OpenTelemetry.Exporter; øverst i Program.cs.
services.Configure<AzureMonitorExporterOptions>(options => options.SamplingRatio = 0.25F);
{{< / highlight >}}

Innstillingene gjelder eksport av traces, metrikk og logger til Azure, ikke eksport via en OTLP-collector. Azure-eksportøren
bruker sin egen sampler, så `SetSampler` og standardverdier for `OTEL_TRACES_SAMPLER` gjelder ikke ved direkte eksport
til Azure. Den støtter likevel `OTEL_TRACES_SAMPLER=microsoft.fixed_percentage` eller `microsoft.rate_limited` med
`OTEL_TRACES_SAMPLER_ARG`.

## Migrering fra classic Application Insights SDK

Microsoft [har dokumentert at](https://github.com/MicrosoftDocs/azure-docs/commit/25d58a0c1e5a1d5740d99fd68d89a9372042838e)

> The long-term plan for Application Insights is to collect data using OpenTelemetry.

(Den langsiktige planen for Application Insights er å samle inn data med OpenTelemetry)

Som betyr at classic SDK vil med stor sannsynlighet utfases i fremtiden.
Det er derfor å anbefale en migrering når mulig, ved å følge instruksene over.
må bli migrert til sine respektive OTel abstraksjoner.
Telemetri initializers og processors må bli migrert til sine respektive OTel abstraksjoner.

| **Application Insights** | **OpenTelemetry** |
| ------------------------ | ----------------- |
| ITelemetryInitializer    | Processor         |
| ITelemetryProcessor      | Processor         |

### Considerations

* Både OTel og App Insights SDK brukes W3C Trace-Context propogasjon som standard for distributed traces, så korrelasjon på tvers av systemer skal fungere i en migreringsfase


