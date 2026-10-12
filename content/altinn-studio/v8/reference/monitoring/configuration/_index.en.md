---
title: Configuration
linktitle: Configuration
description: An overview of configuration options for monitoring in Altinn Apps.
weight: 11
---

{{% notice info %}}
This page refers to configuration when [OpenTelemetry (OTel)](https://opentelemetry.io/) is enabled in the app from v8 and newer.
The existing Application Insights SDK setup is obsolete and will be removed in the next major version of the Altinn.App libraries. 
{{% /notice %}}

The new monitoring and instrumentation setup is enabled by setting `UseOpenTelemetry` to `true` in *appsettings.json* or equivalent.

{{< highlight json "linenos=false,hl_lines=3" >}}
{
  "AppSettings": {
    "UseOpenTelemetry": true
  }
}
{{< / highlight >}}

When this flag is enabled, OTel is configured as opposed to the classic Application Insights SDK.
All the telemetry is then shipped by default to the local monitoring setup with running locally,
and to Azure Monitor when the app is deployed in an environment.
Optionally, if an instrumentation key or Application Insights connection string is added to *AppSettings* or environment locally,
Altinn.App will ship the telemetry to Azure Monitor.
When the app is run, you will both get auto-instrumentation based on HTTP (traces and metrics),
but also manual trace spans and metrics that are domain specific.

The next sections will describe customizing the OpenTelemetry SDK and migrating from Application Insights.
On the next page, there is [information on automatic and manual instrumentation](/en/altinn-studio/v8/reference/monitoring/instrumentation).

## Configuring the OpenTelemetry SDK 

If you need to customize OTel in any way, you can use the extension methods below to get the appropriate provider-builder from the OTel SDK.
This is relevant if you

* Need custom enrichment
* Customize sampling
* Need to export telemetry to a different backend

In this case, the configuration only adds an additional exporter (`ConsoleExporter`) to the respective provider-builders.

First, we update the `App.csproj` file:

{{< highlight csproj "linenos=false" >}}
        <PackageReference Include="OpenTelemetry.Exporter.Console" Version="1.9.0" />
{{< / highlight >}}

Then we update the configuration code in `Program.cs`:

{{< highlight csharp "linenos=false,hl_lines=1-3 7-25" >}}
using OpenTelemetry.Logs;
using OpenTelemetry.Metrics;
using OpenTelemetry.Trace;

void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Configure exporters for telemetry signals (metrics, traces and logging). 
    // Here console exporters are used for demonstration purposes.
    // This could also ship your telemetry to a custom backend.
    services.ConfigureOpenTelemetryMeterProvider(builder =>
        builder.AddConsoleExporter(
            (_, readerOptions) =>
            {
                // Lower the export interval so that we get metrics more often
                readerOptions.PeriodicExportingMetricReaderOptions.ExportIntervalMilliseconds = 5_000;
                readerOptions.PeriodicExportingMetricReaderOptions.ExportTimeoutMilliseconds = 4_000;
            }
        )
    );
    services.ConfigureOpenTelemetryTracerProvider(builder =>
    {
        // Customize sampling
        builder.SetSampler(new ParentBasedSampler(new AlwaysOnSampler()));
        builder.AddConsoleExporter();
    });
    services.ConfigureOpenTelemetryLoggerProvider(builder => builder.AddConsoleExporter());
}
{{< / highlight >}}

To learn more about what can be configured, read the respective docs on the opentelemetry-dotnet repo:

* [Customizing OpenTelemetry .NET SDK for Tracing](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/trace/customizing-the-sdk#customizing-opentelemetry-net-sdk-for-tracing)
* [Customizing OpenTelemetry .NET SDK for Logs](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/logs/customizing-the-sdk#customizing-opentelemetry-net-sdk-for-logs)
* [Customizing OpenTelemetry .NET SDK for Metrics](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/metrics/customizing-the-sdk#customizing-opentelemetry-net-sdk-for-metrics)

### Azure Monitor sampling and logs

{{% notice info %}}
The defaults and shared exporter options below require the forthcoming v8 telemetry fix ([app-lib-dotnet#1889](https://github.com/Altinn/app-lib-dotnet/pull/1889)).
Earlier v8 releases may use different defaults.
{{% /notice %}}

When exporting directly to Azure Monitor, Altinn.App sets these defaults:

| Option | Default | Behavior |
| --- | --- | --- |
| `SamplingRatio` | `1.0F` | Sample 100% of traces. |
| `TracesPerSecond` | `null` | No rate limit on trace sampling. |
| `EnableTraceBasedLogsSampler` | `false` | Export logs independently of trace sampling. Logging level filters still apply. |

Service owners can change these options. For example, put this in `RegisterCustomAppServices` to sample 25% of traces:

{{< highlight csharp "linenos=false" >}}
// Add using Azure.Monitor.OpenTelemetry.Exporter; at the top of Program.cs.
services.Configure<AzureMonitorExporterOptions>(options =>
{
    options.TracesPerSecond = null;
    options.SamplingRatio = 0.25F;
});
{{< / highlight >}}

`TracesPerSecond` takes precedence over `SamplingRatio` when it has a value.
Use `services.PostConfigure<AzureMonitorExporterOptions>(...)` instead of `Configure` if the values must
take precedence over all SDK configuration callbacks, including environment and configuration processing.
The options apply to the Azure trace, metric and log exporters. They do not change the OTLP collector path.

Setting `EnableTraceBasedLogsSampler = true` opts into dropping logs associated with unsampled traces,
including `Error` and `Critical` logs. Logs without trace context are still exported.

The Azure exporter also reads the `AzureMonitorExporter` section in `appsettings.json` or equivalent configuration.
For example, `"AzureMonitorExporter": { "SamplingRatio": 0.25 }` selects fixed-percentage sampling.
It supports these sampler environment variables:

| `OTEL_TRACES_SAMPLER` | `OTEL_TRACES_SAMPLER_ARG` example | Behavior |
| --- | --- | --- |
| `microsoft.fixed_percentage` | `0.25` | Sample 25% of traces. |
| `microsoft.rate_limited` | `5` | Target five traces per second. |

Both variables are required. The Azure exporter installs its own sampler, so standard OTel sampler names such as
`always_off` and `traceidratio`, and samplers set with `SetSampler` in `RegisterCustomAppServices`, do not control
the direct Azure exporter path. Use the options above instead. Custom samplers still apply when exporting through
the OTLP collector.

See the [Azure exporter configuration source](https://github.com/Azure/azure-sdk-for-net/blob/Azure.Monitor.OpenTelemetry.Exporter_1.9.0/sdk/monitor/Azure.Monitor.OpenTelemetry.Exporter/src/DefaultAzureMonitorExporterOptions.cs)
for the supported configuration and environment settings.

## Migration from classic Application Insights SDK

Microsoft [have documented that](https://github.com/MicrosoftDocs/azure-docs/commit/25d58a0c1e5a1d5740d99fd68d89a9372042838e)

> The long-term plan for Application Insights is to collect data using OpenTelemetry.

Which means that the classic SDK that we now use is likely to be deprecated at some point.
It is therefore recommended to migrate when possible, by following the instructions above.

Telemetry initializers and processors need to be migrated to the respective OTel abstractions.

| **Application Insights** | **OpenTelemetry** |
| ------------------------ | ----------------- |
| ITelemetryInitializer    | Processor         |
| ITelemetryProcessor      | Processor         |

### Considerations

* Both OTel and App Insights SDK use W3C Trace-Context propagation by default for distributed traces, so correlation across systems should still work during a migration
