---
title: Monitoring
linktitle: Monitoring
description: Altinn app instrumentation and monitoring.
weight: 70
---

{{% notice info %}}
Setting up custom rules and alerts is currently not available to application owners, 
but we are aiming to support this during the autumn of 2024. 
{{% /notice %}}

{{% notice info %}}
We are migrating from using Application Insights SDK directly to using [OpenTelemetry (OTel)](https://opentelemetry.io/) as a vendor neutral
solution to instrumenting and shipping telemetry from apps. This still allows us to offer existing
Application Insights solution, but also enables developers to ship telemetry to custom monitoring solutions and vendors.
[Read more below]({{< ref "#opentelemetry" >}})
{{% /notice %}}

## OpenTelemetry

You can now use OpenTelemetry (OTel) to instrument and ship telemetry to the built in monitoring solution (AI) or your own solution.
For v8 of the Altinn.App libraries OTel is disabled by default (enabled with `UseOpenTelemetry` in `AppSettings`, configurable in `appsettings.json`).
By v9, OTel will be the default, and the Application Insights SDK will be removed as a dependency.

The main change this brings is substantial improvement to instrumentation of the Altinn.App libraries.
In addition to auto-instrumentation provided by the .NET standard library, there will be telemetry specific to Altinn
emitted alongside it in the form of distributed traces and metrics (in addition to the existing logs). 
This enables a simpler and better understanding of context in the face of errors and performance issues, 
and should also make it easier to understand Altinn from a technical point of view.

In the future, we will provide prebuilt dashboards and alerting such that the simplest of applications,
those that are mostly configured directly in Altinn Studio, already have what they need out of the box
in terms of monitoring.

In addition to telemetry being shipped to Azure Monitor in deployed environments,
it is possible to explore telemetry locally using localtest. 
[See the localtest repo for more information](https://github.com/Altinn/app-localtest).

For more information on enabling and configuring OpenTelemetry, [see the configuration page](/app/monitoring/configuration).

<br />

{{% expandlarge id="q1" header="Altinn monitors your infrastructure" %}}

The Altinn team has access to all of the telemetry logged by the application that the app owners also have access to. 
In addition we monitor the infrastructure components for each application owner such as Kubernetes cluster, 
storage account and key vault. 

As a main rule the Altinn team has action plans for alerts related to the infrastructure that is required to run the apps 
i.e  CPU exhaustion in the application cluster or a pod is in an error state in the cluster.

__Altinn does not actively monitor the performance or failure rates
of individual applications.__

{{% /expandlarge %}}
{{<children />}}

TODO
- mye such
- lage et eksempel for extension methods
- hovedsiden - kort og godt og lenker til relevante områder
- Visualisering-underside
  - Grafana er tilgjengelig lokalt og delvis i miljøene 
- Quick start


