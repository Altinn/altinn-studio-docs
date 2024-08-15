---
title: Visualisering
linktitle: Visualisering
description: Visualisering av telemetri fra Altinn 3 apps.
weight: 14
---

{{% notice info %}}
Denne siden refererer til konfigurasjon når [OpenTelemetry (OTel)](https://opentelemetry.io/) er i bruk i appen fra v8 og nyere.
Det eksisterende Application Insights SDK oppsettet er utgått, og vil fjernes i neste hovedversjon av Altinn.App biblioteker
{{% /notice %}}

## Azure Monitor

Azure Application Insights (AI) er en utvidelse av
[Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/overview) og er det verktøyet vi
bruker i Altinn for å tilby overvåkingsfunksjonalitet for apper.

{{% notice info %}}
I fremtiden vil apper i produksjon og andre miljøer også bruke Grafana som monitoreringsløsning.
{{% /notice %}}

AI kan gi deg som apputvikler verdifull innsikt i helse, ytelse og bruk av appen din.
Med sanntidsovervåking og ytelsesanalyse kan utviklere identifisere og løse problemer før de påvirker
brukeropplevelsen til en sluttbruker. Feilsøking og varsling* gjør AI til en verdifull ressurs også i drift.

![Illustrasjon av AI-grafer](ai-overview.png "Illustrasjon av AI-grafer")

### Forutsetninger

- **Test Developer eller Production Developer rollen i Azure.**
    Test Developer-rollen gir tilgang til AI for apper i TT02 og Production Developer-rollen gir tilgang
    til apper i produksjon.

    [Instrukser på hvordan be om rollen er tilgjengelig her](/nb/altinn-studio/guides/access-management/apps/)

- **Generell oversikt over AI features**
    AI har flere funksjoner tilgjengelig.

    [Sjekk Microsoft sin offisielle dokumentasjon](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview?tabs=net)
    for et raskt overblikk.

- **Grunnleggende kunnskap i Kusto Query Language (KQL)**

    Spørringer i AI skrives ved hjelp av KQL. Mulighetene innen datavisualisering og utforskning er mange med KQL,
    men man kommer langt med det mest grunnleggende for å identifisere datapunkter av interesse.

    [Finn en oversikt over KQL og eksempelspørringer på Microsofts nettsted.](https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/)

## Grafana

Grafana er et visualiseringsverktøy der en kan utforske telemetri og designe dashboards for sin virksomhets monitoreringsbehov.
Hvert app-cluster har en Grafana instance som tjenesteeiere kan bruke.
Det er fortsatt tidlige dager for Grafana-installasjon - i fremtiden vil tjenesteeiere få det følgende ut av boksen:

* Fri utforskning av telemetri
* ASP.NET Core dashboards
* .NET runtime dashboard
* Altinn app dashboard
* Alarmer

Et preview av Altinn app dashboard og ASP.NET Core dashboards er tilgjengelig i local-test


![Altinn app dashboard in Grafana](grafana-app-dashboard.png "Altinn app dashboard i Grafana")

![ASP.NET Core dashboard in Grafana](grafana-aspnetcore-dashboard.png "ASP.NET Core dashboard i Grafana")

![Exploration of traces in Grafana](grafana-explore-traces.png "Utforske traces i Grafana")

![Exploration of logs related to a trace in Grafana](grafana-explore-logs.png "Utforske logs knyttet til en trace i Grafana")
