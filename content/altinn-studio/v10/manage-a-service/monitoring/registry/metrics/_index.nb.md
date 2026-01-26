---
draft: false
title: Målinger
linktitle: Målinger
description: Innebygde målinger i Altinn-appen din.
weight: 10
tags: [needsReview]
---

{{% notice info %}}
Denne siden refererer til konfigurasjon når [OpenTelemetry (OTel)](https://opentelemetry.io/) er i bruk i appen fra v8 og nyere.
Det eksisterende oppsettet for Application Insights SDK er utgått, og vil bli fjernet i neste hovedversjon av Altinn.App-bibliotekene.
{{% /notice %}}

## Hva er målinger (metrics)?

Målinger er tall og statistikk som automatisk samles inn mens appen kjører. De gir deg oversikt over hva som skjer i appen din.

**Eksempel:** I stedet for å måtte lese gjennom tusenvis av loggmeldinger, kan du se en enkel måling som viser at 150 instanser ble opprettet i dag, og at 5 av dem feilet.

## Innebygde målinger

Følgende målinger er innebygd i Altinn.App-bibliotekene og publiseres automatisk:

| Metrikknavn                            | Type      | Måler                                                         | Etiketter                                              |
| -------------------------------------- | --------- | ------------------------------------------------------------- | ------------------------------------------------------ |
| `altinn_app_lib_data_patched`          | Counter   | Hvor mange ganger innholdet i et dataelement ble oppdatert    | `result` = `success`, `error`                          |
| `altinn_app_lib_correspondence_orders` | Counter   | Antall meldingsbestillinger                                   | `result` = `success`, `error`                          |
| `altinn_app_lib_instances_created`     | Counter   | Hvor mange ganger en instans ble opprettet                    |                                                        |
| `altinn_app_lib_instances_completed`   | Counter   | Hvor mange ganger en instans ble fullført                     |                                                        |
| `altinn_app_lib_instances_deleted`     | Counter   | Hvor mange ganger en instans ble slettet                      |                                                        |
| `altinn_app_lib_instances_duration`    | Histogram | Varighet i sekunder for en instans                            |                                                        |
| `altinn_app_lib_notification_orders`   | Counter   | Antall varslingsbestillinger                                  | `type` = `sms`, `email`; `result` = `success`, `error` |
| `altinn_app_lib_processes_started`     | Counter   | Hvor mange ganger en prosess ble startet                      |                                                        |
| `altinn_app_lib_processes_ended`       | Counter   | Hvor mange ganger en prosess ble avsluttet                    |                                                        |
| `altinn_app_lib_processes_duration`    | Histogram | Varighet i sekunder for en prosess                            |                                                        |

### Forklaring av målingstyper

- **Teller (counter):** En måling som bare øker. Brukes til å telle hendelser, for eksempel antall opprettede instanser.

  **Eksempel:** Hvis 5 instanser opprettes, går telleren fra 0 til 5. Den går aldri ned.

- **Histogram (histogram):** Viser fordelingen av verdier over tid. Brukes til å måle varigheter og størrelser.

  **Eksempel:** I stedet for å bare vite gjennomsnittlig varighet, kan du se at 90 % av instansene tar under 10 sekunder, mens 10 % tar over 1 minutt.

### Forklaring av etiketter

Etiketter (labels/tags) brukes til å kategorisere målinger.

**Eksempel:** For `altinn_app_lib_data_patched` kan du skille mellom vellykkede oppdateringer (`result=success`) og feilede oppdateringer (`result=error`). Da kan du enkelt se hvor mange som gikk bra versus hvor mange som feilet.

### Forklaring av begreper

- **Instans (også kalt eksemplar):** En enkelt utfylling av et skjema eller en prosess i Altinn. Hver gang en bruker starter en ny utfylling, opprettes en ny instans – et nytt eksemplar av skjemaet.
- **Dataelement:** En del av dataene i en instans, for eksempel selve skjemautfyllingen eller et vedlegg.
- **Prosess:** Hele flyten fra start til slutt for en instans, inkludert alle stegene brukeren må gjennom.

{{<children />}}
