---
draft: true
title: Monitor Services
linktitle: Monitor Services
description: Track your service's performance, errors, and usage with metrics, logs, and traces.
weight: 70
tags: [needsReview]
---

{{% notice info %}}
We are migrating from the Application Insights SDK to using
[OpenTelemetry (OTel)](https://opentelemetry.io/) as a vendor-independent
solution for instrumenting and exporting telemetry from apps. This enables us to offer the existing Application
Insights solution whilst allowing developers to export to custom monitoring solutions and vendors, as well as improving instrumentation and flexibility.
This also means that these documentation pages are under active improvement and may be temporarily incomplete.
{{% /notice %}}

{{% notice info %}}
Configuration of custom rules and alerts is not currently available for service owners,
but we aim to support this during autumn 2024.
{{% /notice %}}

See [user guide for instrumentation and monitoring](/nb/altinn-studio/v8/guides/administration/monitor-and-instrument/) to get started in your app.

This documentation contains the necessary information to support app developers and service owners in
operating, monitoring, and instrumenting applications on the Altinn 3 platform.

## Key concepts

### Instrumentation

Instrumentation means that your software reports what it is doing whilst it runs. This is like adding measuring instruments to a system so you can see what is happening.

**Example:** When a user submits a form, the app can record how long it took to process the submission and whether any errors occurred along the way.

### Telemetry

Telemetry is the information collected from instrumentation. This information can be retrieved in two ways:

- **Pull:** Something asks the app for information (for example, a monitoring service that regularly fetches data)
- **Push:** The app actively sends messages to a receiver

**Example:** Your app continuously sends information about the number of logins per hour to Azure Application Insights.

### Monitoring

Monitoring is receiving telemetry from instrumentation and making it visible, for example through graphs, tables, or dashboards.

**Example:** In Azure Application Insights, you can see a graph showing how many users have logged in over the past week.

### Alerting

Alerting is responding automatically to monitored information or patterns in the data. You can set up rules that notify you when something unusual happens.

**Example:** You receive an email or SMS if the error rate in your app suddenly increases to over 5% of all requests.

{{<children />}}
