---
title: Telemetry Registry
linktitle: Telemetry Registry
description: Overview of which telemetry is built into your Altinn app.
weight: 13
tags: [needsReview]
---

{{% notice info %}}
This page refers to configuration when [OpenTelemetry (OTel)](https://opentelemetry.io/) is enabled in the app from v8 and newer.
The existing Application Insights SDK setup is obsolete and will be removed in the next major version of the Altinn.App libraries.
{{% /notice %}}

## What is the telemetry registry?

This registry shows which telemetry (metrics, traces, and logs) automatically comes with an Altinn app. You do not need to write code to access this data – it is collected automatically when the app runs.

**Example:** You can see how many forms have been submitted, how long it took to process them, and whether any failed along the way – all without having to add extra code.

{{<children />}}
