---
title: Monitorering
linktitle: Monitorering
description: Altinn App metrikker, telemetri og logger er tilgjengelig i Azure Application Insights.
weight: 70
---

{{% notice info %}}
Vi migrerer fra Application Insights SDK til å bruke [OpenTelemetry (OTel)](https://opentelemetry.io/) som en leverandøruavhengig 
løsning for instrumenterting og eksportering av telemetri fra apper. Dette gjør oss i stand til å kunne tilby eksisterende Application
Insights løsning, samtidig som utviklere we i stand til å eksportere til egendefinerte monitoreringsløsninger og leverandører, samt forbedre instrumentasjon og fleksibilitet.
Det betyr også at disse dokumentasjonssidene er under aktiv utbedring og kan være midlertidig ufullstendige.
{{% /notice %}}

{{% notice info %}}
Konfigurering av egendefinerte regler og varsler er for øyeblikket ikke tilgjengelig for tjenesteeiere,
men vi har som mål å støtte dette i løpet av høsten 2024.
{{% /notice %}}

Se [brukerveiledning for instrumentering og monitorering](/nb/altinn-studio/guides/monitor-and-instrument/) for å komme i gang i din app.

Denne dokumentasjonen inneholder nødvendig informasjon for å støtte apputviklere og tjenesteeiere i å
drifte, overvåke/observere og instrumentere applikasjoner på Altinn 3 plattformen.

Dette inkluderer

* [Hvordan apper instrumenteres](/nb/altinn-studio/reference/monitoring/instrumentation)
* [Hvordan telemetri visualiseres, lokalt og i produksjon](/nb/altinn-studio/reference/monitoring/visualisation)
* [Hvilke verktøy som er tilgjengelige for debugging og analyse](/nb/altinn-studio/reference/monitoring/visualisation)
  * Eksplorative verktøy
  * Ferdiglagde dashbord og alarmer
* Anbefalt praksis for å lage
  * Egendefinerte dashbord, visualisering og alarmer
  * Godt instrumenterte apper
* Prosess for håndtering av hendelser og eskalering
* Monitorering under onboarding og opplæring
* Monitorering for analyse og data-dreven Monitoring for analysis and data-driven beslutningstaking

## Sentrale begreper

**Instrumentering** er at din software sier hva den gjør.

**Telemetri** er å gjøre denne informasjonen tilgjengelig, enten ved pull—noe som spør—eller ved push—sending av meldinger.

**Monitorering** er å motta instrumentering og gjør det synlig.

**Alarmering** er å reagere på den monitorerte dataen, eller mønstre i dataen.

{{<children />}}