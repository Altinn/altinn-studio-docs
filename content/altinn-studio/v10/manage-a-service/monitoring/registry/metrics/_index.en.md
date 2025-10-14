---
title: Metrics
linktitle: Metrics
description: Built-in metrics in your Altinn app.
weight: 10
tags: [needsReview]
---

{{% notice info %}}
This page refers to configuration when [OpenTelemetry (OTel)](https://opentelemetry.io/) is enabled in the app from v8 and newer.
The existing Application Insights SDK setup is obsolete and will be removed in the next major version of the Altinn.App libraries.
{{% /notice %}}

## What are metrics?

Metrics are numbers and statistics that are automatically collected whilst the app runs. They provide you with an overview of what is happening in your app.

**Example:** Instead of having to read through thousands of log messages, you can see a simple metric showing that 150 instances were created today, and that 5 of them failed.

## Built-in metrics

The following metrics are built into Altinn.App libraries and are published automatically:

| Metric name                            | Type      | Measures                                                  | Labels                                                 |
| -------------------------------------- | --------- | --------------------------------------------------------- | ------------------------------------------------------ |
| `altinn_app_lib_data_patched`          | Counter   | Number of times the content of a data element was updated | `result` = `success`, `error`                          |
| `altinn_app_lib_correspondence_orders` | Counter   | Number of correspondence orders                           | `result` = `success`, `error`                          |
| `altinn_app_lib_instances_created`     | Counter   | Number of times an instance was created                   |                                                        |
| `altinn_app_lib_instances_completed`   | Counter   | Number of times an instance was completed                 |                                                        |
| `altinn_app_lib_instances_deleted`     | Counter   | Number of times an instance was deleted                   |                                                        |
| `altinn_app_lib_instances_duration`    | Histogram | Duration in seconds for an instance                       |                                                        |
| `altinn_app_lib_notification_orders`   | Counter   | Number of notification orders                             | `type` = `sms`, `email`; `result` = `success`, `error` |
| `altinn_app_lib_processes_started`     | Counter   | Number of times a process was started                     |                                                        |
| `altinn_app_lib_processes_ended`       | Counter   | Number of times a process was ended                       |                                                        |
| `altinn_app_lib_processes_duration`    | Histogram | Duration in seconds for a process                         |                                                        |

### Explanation of metric types

- **Counter:** A metric that only increases. Used to count events, for example the number of instances created.

  **Example:** If 5 instances are created, the counter goes from 0 to 5. It never decreases.

- **Histogram:** Shows the distribution of values over time. Used to measure durations and sizes.

  **Example:** Instead of just knowing the average duration, you can see that 90% of instances take under 10 seconds, whilst 10% take over 1 minute.

### Explanation of labels

Labels (also called tags) are used to categorise metrics.

**Example:** For `altinn_app_lib_data_patched`, you can distinguish between successful updates (`result=success`) and failed updates (`result=error`). This allows you to easily see how many succeeded versus how many failed.

### Explanation of concepts

- **Instance:** A single completion of a form or a process in Altinn. Each time a user starts a new completion, a new instance is created.
- **Data element:** A part of the data in an instance, for example the form completion itself or an attachment.
- **Process:** The entire flow from start to finish for an instance, including all steps the user must go through.

{{<children />}}
