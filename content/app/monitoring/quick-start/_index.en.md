---
title: Quick start
linktitle: Quick start
description: An overview of configuration options for monitoring in Altinn Apps.
weight: 10
---

{{% notice info %}}
This page refers to configuration when [OpenTelemetry (OTel)](https://opentelemetry.io/) is enabled in the app from v8 and newer.
The existing Application Insights SDK setup is obsolete and will be removed in the next major version of the Altinn.App libraries. 
{{% /notice %}}

## Configuring your app

The new monitoring and instrumentation setup based on OpenTelemetry is enabled simply by setting 
`UseOpenTelemetry` to `true` in `appsettings.json` or equivalent.

{{< highlight json "linenos=false,hl_lines=3" >}}
{
  "AppSettings": {
    "UseOpenTelemetry": true
  }
}
{{< / highlight >}}

You can now run the app, and the Altinn.App library will by default ship telemetry to localtest when running locally,
and to Azure monitor when running in an environment.

[Read more about configuration options on the configuration page](/app/monitoring/configuration).

## Custom instrumentation

The simplest way of getting familiar with the instrumentation APIs made available by Altinn.App is by making
a simple `IHostedService` implemented in `Program.cs`, so that we can get some code running and experiment.

In telemetry and instrumentation APIs of the Altinn.App library are exposed through the `Telemetry` class.
It is a thread-safe singleton object available in the dependency injection container.
Let's extend the the app by extending `Program.cs`

If they're not there already, we need the following using statements at the top of the file 

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Altinn.App.Core.Features;
```

Then we can implement the following class in the bottom of the file

```csharp
sealed class StartupService(ILogger<StartupService> logger, Telemetry telemetry) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        // Create a custom metric - a counter in this case. Name will become `altinn_app_started`
        var counter = telemetry.Meter.CreateCounter<long>(Telemetry.Metrics.CreateName("started"));
        // Increments the counter
        counter.Add(1);

        // Start an activity, which get's emitted as an OTel span
        using var activity = telemetry.ActivitySource.StartActivity("StartupService");

        {
            // Wait a little, then spawn a child activity/span
            await Task.Delay(100, cancellationToken);
            using var childActivity = telemetry.ActivitySource.StartActivity("ChildActivity");
            await Task.Delay(100, cancellationToken);
        }

        // Logs come from the `ILogger<T>` interface
        var now = DateTimeOffset.UtcNow;
        logger.LogInformation("StartupService logging - Now={Now}", now);
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
```


[Read more about instrumentation options on the instrumentation page](/app/monitoring/instrumentation).

## Visualising

Here is a brief overview of visualising the telemetry instrumented above.

[More detailed information is available at the visualisation page](/app/monitoring/visualisation).

###  Running locally 

When running locally using [localtest](/app/getting-started/local-dev/), a monitoring stack consisting of Grafana and OpenTelemetry Collector 
can be provisioned along side localtest and Platform APIs. [See the localtest README for more info](https://github.com/Altinn/app-localtest/blob/main/README.md).

Localtest monitoring setup currently contains a Grafana instance with ASP.NET Core dashboards and a preview Altinn app dashboard.
In addition you can freely explore the emitted telemetry while debugging or learning how the Altinn platform and libraries works.

[See the visualization page Grafana section for more information](/app/monitoring/visualisation/#grafana).

If you've implemented the code above, you should be able to find the `altinn_app_started` metric in the explore tab for the `Metrics` datasource.
You should also be able to find the log message and trace emitted above.

To open Grafana, visit [local.altinn.cloud/grafana/](http://local.altinn.cloud/grafana/), then click explore in the side-menu.

![Explore metrics](grafana-quickstart-metric.png "Explore metrics")

![Explore traces](grafana-quickstart-trace.png "Explore traces. Here it is possible to analyze traces, attributes, and filter out log messages related to the trace.")

![Explore logs](grafana-quickstart-logs.png "Explore logs. We clicked the 'Logs for this span' button, so now we see all log messages related to the root trace we made. It is also possible to navigate back to the trace view")

### Deploying to an environment

When the app is deployed to an environment, the telemetry is currently shipped to Azure Monitor.

[See the visualization page Azure Monitor section for more information](/app/monitoring/visualisation/#azure-monitor).

In Azure Monitor, logs and traces can be found by using the `Transaction search` menu blade,
while metrics are in the `Metrics` menu blade.

{{% notice info %}}
In the future, the Altinn monitoring solution for deployed apps will also be based on Grafana.
{{% /notice %}}

