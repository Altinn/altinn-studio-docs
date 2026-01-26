---
draft: false
title: Visualisere telemetri
linktitle: Visualisere telemetri
description: Slik visualiserer du telemetri fra Altinn 3-apper.
weight: 14
tags: [needsReview]
---

{{% notice info %}}
Denne siden refererer til konfigurasjon når [OpenTelemetry (OTel)](https://opentelemetry.io/) er i bruk i appen fra v8 og nyere.
Det eksisterende Application Insights SDK-oppsettet er utgått, og vil bli fjernet i neste hovedversjon av Altinn.App-bibliotekene.
{{% /notice %}}

## Azure Monitor

Azure Application Insights (AI) er en utvidelse av
[Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/overview) og er verktøyet vi
bruker i Altinn for å tilby overvåkingsfunksjonalitet for apper.

**Forklaring:** Azure Monitor er Microsofts overvåkingsplattform i skyen, mens Application Insights er den delen som er spesielt laget for å overvåke applikasjoner.

### Hva kan Application Insights gjøre for deg?

Application Insights kan gi deg som apputvikler verdifull innsikt i helse, ytelse og bruk av appen din.
Med sanntidsovervåking og ytelsesanalyse kan utviklere identifisere og løse problemer før de påvirker
brukeropplevelsen til en sluttbruker. Feilsøking og varsling gjør Application Insights til et verdifullt verktøy også i drift.

**Eksempel:** Hvis appen din plutselig begynner å svare saktere enn vanlig, kan Application Insights vise deg nøyaktig når problemet startet, hvilke forespørsler som er berørt, og hvor i koden forsinkelsen oppstår.

![Illustrasjon av AI-grafer](ai-overview.png "Illustrasjon av AI-grafer")

### Forutsetninger for å bruke Application Insights

- **Test Developer eller Production Developer-rollen i Azure.**
    Test Developer-rollen gir tilgang til Application Insights for apper i TT02, og Production Developer-rollen gir tilgang
    til apper i produksjon.

    [Her kan du se hvordan du ber om rollen](/nb/altinn-studio/v8/guides/administration/access-management/apps/)

- **Generell oversikt over Application Insights-funksjoner**
    Application Insights har flere funksjoner tilgjengelig.

    [Sjekk Microsofts offisielle dokumentasjon](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview?tabs=net)
    for et raskt overblikk.

- **Grunnleggende kunnskap i Kusto Query Language (KQL)**

    Spørringer i Application Insights skrives ved hjelp av KQL. Mulighetene innen datavisualisering og utforskning er mange med KQL,
    men du kommer langt med det mest grunnleggende for å identifisere datapunkter av interesse.

    **Forklaring:** KQL er et spørrespråk som ligner litt på SQL. Du bruker det til å søke, filtrere og analysere data i Application Insights.

    **Eksempel på KQL-spørring:**
    ```
    requests
    | where timestamp > ago(1h)
    | where resultCode != 200
    | summarize count() by resultCode
    ```
    Denne spørringen viser alle forespørsler den siste timen som ikke var vellykket, gruppert etter responskode.

    [Finn en oversikt over KQL og eksempelspørringer på Microsofts nettsted.](https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/)

## Grafana

Grafana er et visualiseringsverktøy der du kan utforske telemetri og designe dashbord for din virksomhets overvåkingsbehov.
Hvert app-cluster har en Grafana-instans som tjenesteeiere kan bruke.

**Forklaring:** Grafana er et åpen kildekode-verktøy for å lage grafer og dashbord. Det er mer fleksibelt enn Application Insights for å lage egendefinerte visualiseringer.

### Hva får du i fremtiden med Grafana?

Grafana er nytt i Altinn. I fremtiden vil tjenesteeiere få følgende ut av boksen:

* Fri utforskning av telemetri
* ASP.NET Core-dashbord
* .NET runtime-dashbord
* Altinn app-dashbord
* Alarmer

**Forklaring av dashbord-typer:**
- **ASP.NET Core-dashbord:** Viser standard målinger for webapplikasjoner, som antall forespørsler, feilrater og responstider
- **.NET runtime-dashbord:** Viser hvordan appen bruker systemressurser som minne, CPU og garbage collection
- **Altinn app-dashbord:** Viser Altinn-spesifikke målinger som antall instanser, prosesser og dataelementer

### Preview i local-test

Et forhåndsvisning av Altinn app-dashbord og ASP.NET Core-dashbord er tilgjengelig i local-test.

**Forklaring:** Local-test er det lokale utviklingsmiljøet der du kan teste appen din på egen maskin før du publiserer den.

![Altinn app-dashbord i Grafana](grafana-app-dashboard.png "Altinn app-dashbord i Grafana")

![ASP.NET Core-dashbord i Grafana](grafana-aspnetcore-dashboard.png "ASP.NET Core-dashbord i Grafana")

![Utforsking av traces i Grafana](grafana-explore-traces.png "Utforske traces i Grafana")

![Utforsking av logger knyttet til en trace i Grafana](grafana-explore-logs.png "Utforske logger knyttet til en trace i Grafana")
