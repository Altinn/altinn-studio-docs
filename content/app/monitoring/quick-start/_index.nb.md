---
title: Hurtigstart
linktitle: Hurtigstart
description: En oversikt over konfigurasjonsmuligheter for monitorering i Altinn Apps.
weight: 10
---

{{% notice info %}}
Denne siden refererer til konfigurasjon når [OpenTelemetry (OTel)](https://opentelemetry.io/) er i bruk i appen fra v8 og nyere.
Det eksisterende Application Insights SDK oppsettet er utgått, og vil fjernes i neste hovedversjon av Altinn.App biblioteker
{{% /notice %}}

## Konfigurering av en app

Det nye monitorerings- og instrumenteringsoppsettet basert på OpenTelemetry kan aktiveres ved å sette 
`UseOpenTelemetry` til `true` i `appsettings.json` eller ekvivalent.

{{< highlight json "linenos=false,hl_lines=3" >}}
{
  "AppSettings": {
    "UseOpenTelemetry": true
  }
}
{{< / highlight >}}

Når appen kjøres med denne instillingen så vil Altinn.App biblioteket sende telemetri til localtest ved lokal kjøring
og til Azure Monitor ved kjøring i et miljø.

[Les mer om konfigurasjonsmuligheter på konfigurasjonssiden](/app/monitoring/configuration).

## Egendefinert instrumentering

Vi illustrerer egendefinert instrumentering med et eksempel. I `Program.cs` legger vi til en simpel `IHostedService` implementasjon
som kan instrumenteres til å eksponere telemetri.

Telemetri- og instrumentering-API'ene i Altinn.App biblioteket bli eksponert gjennom `Telemetry`-klassen. Det er
et trådsikkert singleton-objekt tilgjengelig i dependency injection containeren.
La oss utvide `Program.cs` til å inkludere dette

Hvis de ikke allerede er der, så trenger vi de følgende avhengighetene på toppen av filen

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Altinn.App.Core.Features;
```

Så kan vi implementere den følgende klassen nederst i filen

```csharp
sealed class StartupService(ILogger<StartupService> logger, Telemetry telemetry) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        // Lag en egendefinert metrikk - en teller i dette tilfellet. Navnet blir `altinn_app_started`
        var counter = telemetry.Meter.CreateCounter<long>(Telemetry.Metrics.CreateName("started"));
        // Inkrementer telleren
        counter.Add(1);

        // Start en aktivitet, som blir utsendt som et OTel span
        using var activity = telemetry.ActivitySource.StartActivity("StartupService");
        {
            // Vent litt, deretter legg til en underaktivitet
            await Task.Delay(100, cancellationToken);
            using var childActivity = telemetry.ActivitySource.StartActivity("ChildActivity");
            await Task.Delay(100, cancellationToken);
        }

        // Logger kommer fra `ILogger<T>` interfacet
        var now = DateTimeOffset.UtcNow;
        logger.LogInformation("StartupService logging - Now={Now}", now);
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
```

[Les mer om instrumenteringsmuligheter på instrumenteringsiden](/app/monitoring/instrumentation).

### Lokal utvikling

Ved lokal utvikling med [localtest](/app/getting-started/local-dev/), så kan en monitoreringsstack bestående av Grafana og OpenTelemetry Collector
provisjoneres ved siden av localtest og Platform APIer. [Se localtest README for mer informasjon](https://github.com/Altinn/app-localtest/blob/main/README.md).

Monitoreringsoppsettet i localtest inneholder en Grafana instanse med ASP.NET Core dashboard og et preview Altinn app dashboard.
I tillegg gir det muligheten til å fritt undersøke telemetrien som eksponeres fra Altinn plattform og bibliotek.

[Se Grafana-seksjonen på visualiseringssiden for mer informasjon](/app/monitoring/visualisation/#grafana).

I Azure Monitor kan logger og traces finnes ved å bruke `Transaction search` menyen, mens metrikker er å finne under `Metrics`.

{{% notice info %}}
I fremtiden vil apper i produksjon og andre miljøer også bruke Grafana som monitoreringsløsning.
{{% /notice %}}