---
title: Monitorer og instumenter
linktitle: Monitorer og instumenter
description: Kom i gang med verktøyene for instrumentering og monitorering i Altinn
toc: true
weight: 990
---

{{% notice info %}}
Konfigurasjon av [OpenTelemetry (OTel)](https://opentelemetry.io/) krever minimum versjon 8 av Altinn.App biblioteker.
Det eksisterende Application Insights SDK oppsettet er utgått, og vil fjernes i versjon 9.
{{% /notice %}}

## Konfigurering av en app

Det nye monitorerings- og instrumenteringsoppsettet basert på OpenTelemetry kan aktiveres ved å sette 
`UseOpenTelemetry` til `true` i *appsettings.json* eller ekvivalent.

{{< highlight json "linenos=false,hl_lines=3" >}}
{
  "AppSettings": {
    "UseOpenTelemetry": true
  }
}
{{< / highlight >}}

Når appen kjøres med denne innstillingen så vil Altinn.App biblioteket sende telemetri til localtest ved lokal kjøring
og til Azure Monitor ved kjøring i et miljø.

[Les mer om konfigurasjonsmuligheter på referansesiden for konfigurasjon](/nb/altinn-studio/reference/monitoring/configuration).

## Egendefinert instrumentering

Vi illustrerer egendefinert instrumentering med et eksempel. I *Program.cs* legger vi til en simpel *IHostedService* implementasjon
som kan instrumenteres til å eksponere telemetri.

Telemetri- og instrumentering-APIene i Altinn.App biblioteket blir eksponert gjennom *Telemetry*-klassen. Det er
et trådsikkert singleton-objekt tilgjengelig i dependency injection containeren.
La oss utvide *Program.cs* til å inkludere dette.

Hvis de ikke allerede er der, så trenger vi de følgende avhengighetene øverst i filen:

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Altinn.App.Core.Features;
```

Så kan vi implementere den følgende klassen nederst i filen:

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

[Les mer om instrumenteringsmuligheter på referansesiden for instrumentering](/nb/altinn-studio/reference/monitoring/instrumentation).

## Visualisering

Her er en kort oversikt over visualisering av telemetrien vi instrumenterte over.

### Lokal utvikling

Ved lokal utvikling så kan en monitoreringsstack bestående av Grafana og OpenTelemetry Collector
provisjoneres ved siden av localtest og Platform APIer. [Se localtest README for mer informasjon](https://github.com/Altinn/app-localtest/blob/main/README.md).

Monitoreringsoppsettet i localtest inneholder en Grafana instans med ASP.NET Core dashboard og et preview Altinn app dashboard.
I tillegg gir det muligheten til å fritt undersøke telemetrien som eksponeres fra Altinn plattform og bibliotek.

[Les mer om lokal Grafana på referansesiden for visualisering](/nb/altinn-studio/reference/monitoring/visualisation/#grafana).

Hvis du har implementert koden over, så skal du kunne finne `altinn_app_started`-metrikken på "Explore"-siden når "Metrics"-datakilden er valgt.
Du kan også finne logger og traces fra koden over på denne siden ved hjelp av de andre datakildene.

For å åpne Grafana, åpne [local.altinn.cloud/grafana/](http://local.altinn.cloud/grafana/), og naviger via sidemenyen.

Vi starter med å utforske metrikker ved å navigere til *Explore*-siden, der vi kan velge *Metrics* som kilde i nedtrekksmenyen. Her
kan vi se på ønskelig metrikk ved hjelp av *Select a metric*-seksjonen:

![Utforsk metrikker](grafana-quickstart-metric.png "Utforsk metrikker")

For å se traces bruker vi *Traces* som kilde på *Explore*-siden. Vi velger vårt appnavn som *Service Name*. Nå kan vi se
traces i *Table view*-seksjonen. Vi trykker på *trace ID* for å se full trace i et nytt pop-up på høyre side.

![Explore traces](grafana-quickstart-trace.png "Utforsk traces. Her er det mulig å analysere traces, attributter, samt å filtrere ut logg-meldingene relatert til en trace.")

Ved å trykke på *Logs for this span*-knappen kan vi navigere til de relevante loggene for det valgte span. En spøøring vil bli generert for 
oss, som vist i bildet under. Legg merke til at kildetype endres fra *Traces* til *Logs* og at vi enkelt kan navigere tilbake.

![Explore logs](grafana-quickstart-logs.png "Utforsk logger. Her ser vi alle logg-meldinger relatert til root-tracen vi laget med koden over.")

### Deployment til et miljø

Når appen er deployed til et test- eller produksjons-miljø så vil telemetrien sendes til Azure Monitor.

[Les mer om Azure Monitor på referansesiden for visualisering](/nb/altinn-studio/reference/monitoring/visualisation/#azure-monitor).

I Azure Monitor kan logger og traces finnes ved å bruke *Transaction search* menyen, mens metrikker er å finne under *Metrics*.

{{% notice info %}}
I fremtiden vil apper i produksjon og andre miljøer også bruke Grafana som monitoreringsløsning.
{{% /notice %}}