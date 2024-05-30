---
title: Monitor and instrument
linktitle: Monitor and instrument
description: Get started with Altinn monitoring tools and instrumentation
toc: true
weight: 990
---

{{% notice info %}}
Configuration of [OpenTelemetry (OTel)](https://opentelemetry.io/) requires minimum version 8 of the Altinn.App libraries.
The existing Application Insights SDK setup is obsolete and will be removed in version 9. 
{{% /notice %}}

## Configuring your app

The new monitoring and instrumentation setup based on OpenTelemetry is enabled simply by setting 
`UseOpenTelemetry` to `true` in *appsettings.json* or equivalent.

{{< highlight json "linenos=false,hl_lines=3" >}}
{
  "AppSettings": {
    "UseOpenTelemetry": true
  }
}
{{< / highlight >}}

You can now run the app, and the Altinn.App library will by default ship telemetry to localtest when running locally,
and to Azure monitor when running in an environment.

[Read more about configuration options on the configuration reference page](/altinn-studio/reference/monitoring/configuration/).

## Custom instrumentation

The most straightforward way of getting familiar with the Altinn.App instrumentation APIs is by creating
a simple *IHostedService* implemented in *Program.cs*. This way we can get some code running which we can experiment with.
An *IHostedService* that is registered with *AddHostedService* will ensure that its' *StartAsync* is invoked
during startup for the process/container. The goal of this example is to get acquainted with the telemetry API and monitoring
solution. In practice, we will get a counter that increments by 1 when the app starts, and a trace containing a child-span
and a related log-message.

We recommend experimenting more with this example - add different types of metric, add attributes to traces etc.

The telemetry and instrumentation APIs of the Altinn.App library are exposed through the *Telemetry* class.
It is a thread-safe singleton object available in the dependency injection container.
Let's extend the the app by extending *Program.cs*.

If they're not there already, we need the following using statements at the top of the file:

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Altinn.App.Core.Features;
```

Then we can implement the following class in the bottom of the file:

```csharp
sealed class StartupService(ILogger<StartupService> logger, Telemetry telemetry) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        // Create a custom metric - a counter in this case. Name will become `altinn_app_started`
        var counter = telemetry.Meter.CreateCounter<long>(Telemetry.Metrics.CreateName("started"));
        // Increments the counter
        counter.Add(1);

        // Start an activity, which gets emitted as an OTel span
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

Now we can register this class in the .NET dependency injection container, which will ensure
that *StartAsync* is called when the process starts up.

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    services.AddHostedService<StartupService>();
}
```

Now you can run the app. Below in the next section we will take a look at visualisation of the telemetry above.

[You can also read more about instrumentation on the instrumentation reference page](/altinn-studio/reference/monitoring/instrumentation).

## Visualisation

Here is a brief overview of visualising the telemetry instrumented above.

###  Running locally 

When running locally using [localtest](/altinn-studio/guides/local-dev/), a monitoring stack consisting of Grafana and OpenTelemetry Collector 
can be provisioned along side localtest and Platform APIs. [See the localtest README for more info](https://github.com/Altinn/app-localtest/blob/main/README.md).

Localtest monitoring setup currently contains a Grafana instance with ASP.NET Core dashboards and a preview Altinn app dashboard.
In addition to these, you can freely explore the emitted telemetry while debugging or learning how the Altinn platform and libraries works.

[Read more about local Grafana on the visualisation reference page](/altinn-studio/reference/monitoring/visualisation/#grafana).

If you've implemented the code above, you should be able to find the `altinn_app_started` metric in the explore tab for the *Metrics* datasource.
You should also be able to find the log message and trace emitted above by using the other datasources.

To open Grafana, visit [local.altinn.cloud/grafana/](http://local.altinn.cloud/grafana/), then click explore in the side-menu.

First, let's explore metrics by navigation to the *Explore* tab and selecting *Metrics* as source in the dropdown menu. Here we
can choose which metric to view in the *Select a metric* section:
![Explore metrics](grafana-quickstart-metric.png "Explore metrics")

To view traces, we choose *Traces* as the source, while still in the *Explore* tab. We select our app name as the *Service Name*. 
Now we can see traces in the *Table view*. We click on a *trace ID* to see the full trace in a new pop-up to the right. 

![Explore traces](grafana-quickstart-trace.png "Explore traces. Here it is possible to analyze traces, attributes, and filter out log messages related to the trace.")

By clicking the *Logs for this span*-button we can navigate to the relevant log view for this span. A query will be generated for us,
 as seen below. Note that the source is changed from *Traces* to *Logs* and that we can easily navigate back.

![Explore logs](grafana-quickstart-logs.png "Explore logs. Now we see all log messages related to the root trace we made.")

### Deploying to an environment

When the app is deployed to an environment, the telemetry is currently shipped to Azure Monitor.

[Read more about Azure Monitor on the visualisation reference page](/altinn-studio/reference/monitoring/visualisation/#azure-monitor).

In Azure Monitor, logs and traces can be found by using the *Transaction search* menu blade,
while metrics are in the *Metrics* menu blade.

{{% notice info %}}
In the future, the Altinn monitoring solution for deployed apps will also be based on Grafana.
{{% /notice %}}
