---
title: Metrikker
linktitle: Metrikker
description: Altinn App metrikker.
weight: 10
---

{{% notice info %}}
Denne siden refererer til konfigurasjon når [OpenTelemetry (OTel)](https://opentelemetry.io/) er i bruk i appen fra v8 og nyere.
Det eksisterende Application Insights SDK oppsettet er utgått, og vil fjernes i neste hovedversjon av Altinn.App biblioteker
{{% /notice %}}

| Metrikknavn                          | Type      | Måler                                                 | Labels                                                 |
| ------------------------------------ | --------- | ----------------------------------------------------- | ------------------------------------------------------ |
| `altinn_app_lib_data_patched`        | Counter   | Hvor mange ganger dataelemeters innhold ble oppdatert | `result` = `success`, `error`                          |
| `altinn_app_lib_instances_created`   | Counter   | Hvor mange ganger en instanse ble opprettet           |                                                        |
| `altinn_app_lib_instances_completed` | Counter   | Hvor mange ganger en insatnse ble fullført            |                                                        |
| `altinn_app_lib_instances_deleted`   | Counter   | Hvor mange ganger en instanse ble slettet             |                                                        |
| `altinn_app_lib_instances_duration`  | Histogram | Varighet i sekunder for en instans                    |                                                        |
| `altinn_app_lib_notification_orders` | Counter   | Antall bestillinger                                   | `type` = `sms`, `email`; `result` = `success`, `error` |
| `altinn_app_lib_processes_started`   | Counter   | Hvor mange ganger en prosess ble startet              |                                                        |
| `altinn_app_lib_processes_ended`     | Counter   | Hvor mange ganger en prosess ble avsluttet            |                                                        |
| `altinn_app_lib_processes_duration`  | Histogram | Varighet i sekunder for en prosess                    |                                                        |

{{<children />}}
