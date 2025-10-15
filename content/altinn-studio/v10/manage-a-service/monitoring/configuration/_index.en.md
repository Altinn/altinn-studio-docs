---
title: Set Up Monitoring
linktitle: Set Up Monitoring
description: How to set up monitoring in your Altinn app.
weight: 11
tags: [needsReview]
---

{{% notice info %}}
This page refers to configuration when [OpenTelemetry (OTel)](https://opentelemetry.io/) is enabled in the app from v8 and newer.
The existing Application Insights SDK setup is obsolete and will be removed in the next major version of the Altinn.App libraries.
{{% /notice %}}

## Enable OpenTelemetry

The new monitoring and instrumentation setup can be enabled by setting `UseOpenTelemetry` to `true` in *appsettings.json* or equivalent configuration file.

{{< highlight json "linenos=false,hl_lines=3" >}}
{
  "AppSettings": {
    "UseOpenTelemetry": true
  }
}
{{< / highlight >}}

With this setting, OpenTelemetry is configured instead of the classic Application Insights SDK.

### What happens when you enable OpenTelemetry?

All telemetry (metrics, logs, and traces) is exported to:
- **Local execution:** The local monitoring setup (for testing and development)
- **Execution in environment (test/production):** Azure Monitor

You can also specify an **instrumentation key** or **Application Insights connection string** in appsettings or environment variables locally. In that case, Altinn.App will export to Azure Monitor also during local execution.

### Automatic instrumentation

When the app runs with `UseOpenTelemetry`, you automatically get:

- **HTTP tracing (traces):** Records all incoming and outgoing HTTP requests
- **HTTP metrics:** Measures response times, number of requests, and error rates
- **Altinn-specific telemetry:** Domain-specific metrics and tracing for Altinn.App

**Example:** If a user submits a form, the system will automatically record how long it took, which HTTP status code was returned, and which external services were called along the way.

For information on how to add custom telemetry, see [Instrumentation](/en/altinn-studio/v10/manage-a-service/monitoring/instrumentation/).

## Configure OpenTelemetry SDK

In some cases, you may need to customise how OpenTelemetry functions. This is relevant if you:

* Need custom **enrichment** – adding extra information to telemetry
* Need custom **sampling** – controlling how much data is collected
* Need to export telemetry to a different backend (for example, your own monitoring solution)

### What is enrichment?

Enrichment means adding extra information to telemetry to make it more useful.

**Example:** You can automatically add environment name (test/production) or organisation number to all telemetry that is sent out.

### What is sampling?

Sampling means selecting only a portion of telemetry to be collected. This can reduce costs and data volume.

**Example:** Instead of storing information about every single request, you only store every tenth request, or only requests that take over 1 second.

### Add an additional exporter

In the example below, we add an additional exporter (`ConsoleExporter`) that sends telemetry to the console in addition to standard Azure Monitor. This can be useful for local testing.

First, we update the `App.csproj` file:

{{< highlight csproj "linenos=false" >}}
        <PackageReference Include="OpenTelemetry.Exporter.Console" Version="1.9.0" />
{{< / highlight >}}

Then we update the configuration in `Program.cs`:

{{< highlight csharp "linenos=false,hl_lines=1-3 7-25" >}}
using OpenTelemetry.Logs;
using OpenTelemetry.Metrics;
using OpenTelemetry.Trace;

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Configure export for telemetry (metrics, traces, logs).
    // Here we use console export as an example.
    // This could also send the telemetry to a custom backend.
    services.ConfigureOpenTelemetryMeterProvider(builder =>
        builder.AddConsoleExporter(
            (_, readerOptions) =>
            {
                // Higher frequency for metric export, to see changes more quickly
                readerOptions.PeriodicExportingMetricReaderOptions.ExportIntervalMilliseconds = 5_000;
                readerOptions.PeriodicExportingMetricReaderOptions.ExportTimeoutMilliseconds = 4_000;
            }
        )
    );
    services.ConfigureOpenTelemetryTracerProvider(builder =>
    {
        // Custom sampling
        builder.SetSampler(new ParentBasedSampler(new AlwaysOnSampler()));
        builder.AddConsoleExporter();
    });
    services.ConfigureOpenTelemetryLoggerProvider(builder => builder.AddConsoleExporter());
}
{{< / highlight >}}

### Learn more about configuration

To learn more about what can be configured and how, see the documentation in the opentelemetry-dotnet repository:

* [Customizing OpenTelemetry .NET SDK for Tracing](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/trace/customizing-the-sdk#customizing-opentelemetry-net-sdk-for-tracing)
* [Customizing OpenTelemetry .NET SDK for Logs](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/logs/customizing-the-sdk#customizing-opentelemetry-net-sdk-for-logs)
* [Customizing OpenTelemetry .NET SDK for Metrics](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/metrics/customizing-the-sdk#customizing-opentelemetry-net-sdk-for-metrics)

## Migrate from Application Insights SDK

Microsoft [have documented that](https://github.com/MicrosoftDocs/azure-docs/commit/25d58a0c1e5a1d5740d99fd68d89a9372042838e)

> The long-term plan for Application Insights is to collect data using OpenTelemetry.

This means that the classic SDK will most likely be phased out in the future.
We therefore recommend migrating when possible by following the instructions above.

### Migrate components that initialise and process telemetry

If you have custom code that initialises telemetry (initialisers) or processes telemetry along the way (processors), these must be migrated to OpenTelemetry equivalents.

| **Application Insights** | **OpenTelemetry** | **What it does** |
| ------------------------ | ----------------- | ---------------- |
| ITelemetryInitializer    | Processor         | Initialises and adds basic information to telemetry |
| ITelemetryProcessor      | Processor         | Processes and optionally filters telemetry before it is sent out |

### Important considerations

* Both OpenTelemetry and Application Insights SDK use W3C Trace-Context propagation as standard for distributed trace data. This means that context across systems should work well during a migration phase.

**Explanation:** W3C Trace-Context is a standard that enables different systems to share trace data and understand the context between requests that span multiple services.
