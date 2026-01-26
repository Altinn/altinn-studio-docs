---
draft: false
title: Overvåke tjenester
linktitle: Overvåke tjenester
description: Følg med på tjenestens ytelse, feil og bruk med målinger, logger og sporing.
weight: 70
tags: [needsReview]
---

{{% notice info %}}
Vi migrerer fra Application Insights SDK til å bruke
[OpenTelemetry (OTel)](https://opentelemetry.io/) som en leverandøruavhengig
løsning for instrumentering og eksportering av telemetri fra apper. Dette gjør oss i stand til å kunne tilby den eksisterende Application
Insights-løsningen, samtidig som utviklere kan eksportere til egendefinerte overvåkingsløsninger og leverandører, samt forbedre instrumentasjon og fleksibilitet.
Det betyr også at disse dokumentasjonssidene er under aktiv utbedring og kan være midlertidig ufullstendige.
{{% /notice %}}

{{% notice info %}}
Konfigurasjon av egendefinerte regler og varsler er for øyeblikket ikke tilgjengelig for tjenesteeiere,
men vi har som mål å støtte dette i løpet av høsten 2024.
{{% /notice %}}

Se [brukerveiledning for instrumentering og overvåking](/nb/altinn-studio/v8/guides/administration/monitor-and-instrument/) for å komme i gang i din app.

Denne dokumentasjonen inneholder nødvendig informasjon for å støtte apputviklere og tjenesteeiere i å
drifte, overvåke og instrumentere applikasjoner på Altinn 3-plattformen.

## Sentrale begreper

### Instrumentering

Instrumentering betyr at programvaren din forteller hva den gjør mens den kjører. Dette er som å legge til måleinstrumenter i et system for å kunne se hva som skjer.

**Eksempel:** Når en bruker sender inn et skjema, kan appen registrere hvor lang tid det tok å behandle innsendingen og om det oppstod noen feil underveis.

### Telemetri

Telemetri er informasjonen som samles inn fra instrumenteringen. Denne informasjonen kan hentes ut på to måter:

- **Pull:** Noe spør appen om informasjon (for eksempel en overvåkingstjeneste som jevnlig henter data)
- **Push:** Appen sender aktivt meldinger til en mottaker

**Eksempel:** Appen din sender løpende informasjon om antall innlogginger per time til Azure Application Insights.

### Overvåking (monitorering)

Overvåking er å motta telemetri fra instrumenteringen og gjøre den synlig, for eksempel gjennom grafer, tabeller eller dashbord.

**Eksempel:** I Azure Application Insights kan du se en graf som viser hvor mange brukere som har logget inn i løpet av den siste uken.

### Alarmering

Alarmering er å reagere automatisk på den overvåkede informasjonen, eller mønstre i dataen. Du kan sette opp regler som varsler deg når noe uvanlig skjer.

**Eksempel:** Du får en e-post eller SMS hvis feilraten i appen din plutselig øker til over 5 % av alle forespørsler.

{{<children />}}
