---
title: Metrikker
linktitle: Metrikker
description: Altinn App metrikker.
weight: 10
---

{{% notice info %}}
Denne siden refererer til konfigurasjon når [OpenTelemetry (OTel)](https://opentelemetry.io/) er i bruk i appen fra v8 og nyere.
Det eksisterende oppsettet for Application Insights SDK er utgått, og vil fjernes i neste hovedversjon av Altinn.App biblioteker.
{{% /notice %}}

Følgende metrikker er innebygd i Altinn.App-bibliotekene og publiseres automatisk:

| Metrikknavn                            | Type      | Måler                                                         | Etiketter                                              |
| -------------------------------------- | --------- | ------------------------------------------------------------- | ------------------------------------------------------ |
| `altinn_app_lib_data_patched`          | Counter   | Hvor mange ganger innholdet i et dataelement ble oppdatert    | `result` = `success`, `error`                          |
| `altinn_app_lib_correspondence_orders` | Counter   | Number of meldingsbestillinger                                | `result` = `success`, `error`                          |
| `altinn_app_lib_instances_created`     | Counter   | Hvor mange ganger en instanse ble opprettet                   |                                                        |
| `altinn_app_lib_instances_completed`   | Counter   | Hvor mange ganger en insatnse ble fullført                    |                                                        |
| `altinn_app_lib_instances_deleted`     | Counter   | Hvor mange ganger en instanse ble slettet                     |                                                        |
| `altinn_app_lib_instances_duration`    | Histogram | Varighet i sekunder for en instanse                           |                                                        |
| `altinn_app_lib_notification_orders`    | Counter   | Antall varslingsbestillinger                                  | `type` = `sms`, `email`; `result` = `success`, `error` |
| `altinn_app_lib_processes_started`     | Counter   | Hvor mange ganger en prosess ble startet                      |                                                        |
| `altinn_app_lib_processes_ended`       | Counter   | Hvor mange ganger en prosess ble avsluttet                    |                                                        |
| `altinn_app_lib_processes_duration`    | Histogram | Varighet i sekunder for en prosess                            |                                                        |

{{<children />}}
