---
title: Metrics
linktitle: Metrics
description: Altinn App metrics.
weight: 10
---

{{% notice info %}}
This page refers to configuration when [OpenTelemetry (OTel)](https://opentelemetry.io/) is enabled in the app from v8 and newer.
The existing Application Insights SDK setup is obsolete and will be removed in the next major version of the Altinn.App libraries. 
{{% /notice %}}

The following metrics are built into Altinn.App libraries and are emitted automatically:

| Metric Name                            | Type      | Measures                                                  | Labels                                                 |
| -------------------------------------- | --------- | --------------------------------------------------------- | ------------------------------------------------------ |
| `altinn_app_lib_data_patched`          | Counter   | Number of times the content of a data element was patched | `result` = `success`, `error`                          |
| `altinn_app_lib_correspondence_orders` | Counter   | Number of correspondence orders                           | `result` = `success`, `error`                          |
| `altinn_app_lib_instances_created`     | Counter   | Number of times an instance was created                   |                                                        |
| `altinn_app_lib_instances_completed`   | Counter   | Number of times an instance was completed                 |                                                        |
| `altinn_app_lib_instances_deleted`     | Counter   | Number of times an instance was deleted                   |                                                        |
| `altinn_app_lib_instances_duration`    | Histogram | Duration in seconds an instance was active                |                                                        |
| `altinn_app_lib_notification_orders`    | Counter   | Number of notification orders                              | `type` = `sms`, `email`; `result` = `success`, `error` |
| `altinn_app_lib_processes_started`     | Counter   | Number of times a process was started                     |                                                        |
| `altinn_app_lib_processes_ended`       | Counter   | Number of times a process was ended                       |                                                        |
| `altinn_app_lib_processes_duration`    | Histogram | Duration in seconds a process was active                  |                                                        |

{{<children />}}
