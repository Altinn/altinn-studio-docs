---
title: Monitoring
linktitle: Monitoring
description: Altinn app instrumentation and monitoring.
weight: 70
---

{{% notice info %}}
We are migrating from using Application Insights SDK directly to using [OpenTelemetry (OTel)](https://opentelemetry.io/) as a vendor neutral
solution to instrumenting and shipping telemetry from apps. This still allows us to offer existing
Application Insights solution, but also enables developers to ship telemetry to custom monitoring solutions and vendors, and improve instrumentation and flexibility.
This means that these documentation pages are currently in active development and may be temporarily incomplete.
[Read more below]({{< ref "#opentelemetry" >}})
{{% /notice %}}

{{% notice info %}}
Setting up custom rules and alerts is currently not available to application owners, 
but we are aiming to support this during the autumn of 2024. 
{{% /notice %}}

This documentation contains information needed to support app developers and service owners in 
operating, monitoring/observing and instrumenting applications on the Altinn 3 platform.
This includes

* [How are apps instrumented](/app/monitoring/instrumentation)
* [How is telemetry visualized, locally and when deployed](/app/monitoring/visualisation)
* [What tools are available for debugging and analysis](/app/monitoring/visualisation)
  * Explorative tools
  * Premade dashboards and alerts
* Recommended practices for building
  * Custom dashboards, visualizations and alerts
  * Well-instrumented apps
* What is the process for handling incidents and escalation
* Monitoring during onboarding and learning
* Monitoring for analysis and data-driven decision-making

Altinn 3 uses the open and vendor-neutral OpenTelemetry specifications and protocols for instrumenting and shipping
telemetry end-to-end. This enables us to bring a baseline monitoring that serves all applications,
and enables service owners to make appropriate customizations as necessary, from custom enrichment and instrumentation
to completely separate monitoring platforms.

To proceed, try out the [monitoring quick start guide](/app/monitoring/quick-start), 
or [read the reference on configuring monitoring and OpenTelemetry for an application](/app/monitoring/configuration).

{{<children />}}

