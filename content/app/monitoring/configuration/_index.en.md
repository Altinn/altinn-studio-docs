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

The new monitoring and instrumentation setup is enabled by setting `UseOpenTelemetry` to `true` in `appsettings.json` or equivalent.

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
Optionally, if an instrumentation key or Application Insights connection string is added to `AppSettings` or environment locally,
Altinn.App will ship the telemetry to Azure Monitor.
When the app is run, you will both get auto-instrumentation based on HTTP (traces and metrics),
but also manual trace spans and metrics that are domain specific.

The next sections will describe customizing the OpenTelemetry SDK and migrating from Application Insights.
On the next page, there is [information on automatic and manual instrumentation](/app/monitoring/instrumentation).

## Configuring the OpenTelemetry SDK 

If you need to customize OTel in any way, you can use the extension methods below to get the appropriate provider-builder from the OTel SDK.
This is relevant if you

* Need custom enrichment
* Customize sampling
* Need to export telemetry to a different backend

In this case, the configuration only adds an additional exporter to the respective provider-builders.

{{< highlight csharp "linenos=false,hl_lines=3-5" >}}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    services.ConfigureOpenTelemetryMeterProvider(builder => builder.AddConsoleExporter());
    services.ConfigureOpenTelemetryTracerProvider(builder => builder.AddConsoleExporter());
    services.Configure<OpenTelemetryLoggerOptions>(builder => builder.AddConsoleExporter());
}
{{< / highlight >}}

To learn more about what can be configured, read the respective docs on the opentelemetry-dotnet repo:

* [Customizing OpenTelemetry .NET SDK for Tracing](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/trace/customizing-the-sdk#customizing-opentelemetry-net-sdk-for-tracing)
* [Customizing OpenTelemetry .NET SDK for Logs](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/logs/customizing-the-sdk#customizing-opentelemetry-net-sdk-for-logs)
* [Customizing OpenTelemetry .NET SDK for Metrics](https://github.com/open-telemetry/opentelemetry-dotnet/tree/main/docs/metrics/customizing-the-sdk#customizing-opentelemetry-net-sdk-for-metrics)

## Migration from classic Application Insights SDK

Microsoft [have documented that](https://github.com/MicrosoftDocs/azure-docs/commit/25d58a0c1e5a1d5740d99fd68d89a9372042838e)

> The long-term plan for Application Insights is to collect data using OpenTelemetry.

Which means that the classic SDK that we now use is likely to be deprecated at some point.
It is therefore recommended to migrate when possible, by following the instructions above.

If you have manual instrumentation using `TelemetryClient` from the classic Application Insights SDK, these need to be migrated to OTel equivalents. 
The Application Insights SDK also ships logs based on the `ILogger<T>` abstraction, so the only places
where change is needed is for telemetry not using that API (traces, metrics, and anything else from the Application Insights datamodel)

The Application Insights datamodel is different from OTel.
See the mapping table below for recommendations:

| Application Insights | OpenTelemetry           | `System.Diagnostics` API                    |
|----------------------|-------------------------|---------------------------------------------|
| Request              |  Span                   | `Activity`                                  |
| Exception            |  Span with span event   | `Activity` with `Activity.AddEvent`         |
| Dependency           |  Span                   | `Activity`                                  |
| Event                |  Span, span event, logs | `Activity`/`Activity.AddEvent`/`ILogger<T>` |
| Trace                |  Span, logs             | `Activity`/`ILogger<T>`                     |
| Metric               |  Metrics                | `Metric`                                    |


### Considerations

* Both OTel and App Insights SDK use W3C Trace-Context propagation by default for distributed traces, so correlation across systems should still work during a migration
