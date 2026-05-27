---
draft: true
title: Telemetri-register
linktitle: Telemetri-register
description: Oversikt over hvilken telemetri som er innebygd i Altinn-appen din.
weight: 13
tags: [needsReview]
---

{{% notice info %}}
Denne siden refererer til konfigurasjon når [OpenTelemetry (OTel)](https://opentelemetry.io/) er i bruk i appen fra v8 og nyere.
Det eksisterende Application Insights SDK-oppsettet er utgått, og vil bli fjernet i neste hovedversjon av Altinn.App-bibliotekene.
{{% /notice %}}

## Hva er telemetri-registeret?

Dette registeret viser hvilken telemetri (målinger, sporing og logger) som automatisk følger med en Altinn-app. Du trenger ikke å skrive kode for å få tilgang til disse dataene – de samles inn automatisk når appen kjører.

**Eksempel:** Du kan se hvor mange skjemaer som er sendt inn, hvor lang tid det tok å behandle dem, og om noen feilet underveis – alt uten å måtte legge til ekstra kode.

{{<children />}}
