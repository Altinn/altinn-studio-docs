---
title: Konfigurere instillinger for en app
linktitle: Konfigurere innstillinger
description: Slik konfigurerer du generelle innstillinger for en app.
weight: 2
toc: true
---

{{% notice warning %}}
Denne siden er under utvikling.
{{% /notice %}}

## Om applikasjonen
Her kan du endre navnet som er synlig for sluttbrukere av applikasjonen.

![Om applikasjonen](https://altinncdn.no/studio/docs/images/app-development_settings-about.png "Om applilkasjonen")

## Oppsett
Her kan du endre enkle innstillinger for applikasjonen.

![Oppsett](https://altinncdn.no/studio/docs/images/app-development_settings-setup.png "Oppsett")

## Tilgangsregler
Tilganger i en app styres av en _Policy_-fil som ligger i appen. Denne filen baserer seg på XACML standarden. Vi har utviklet
et verktøy for å gjøre det enklere å legge til og redigere tilgangsregler.

Les mer om hvordan dette settes opp [her](https://docs.altinn.studio/nb/app/development/configuration/authorization/). Vi
har også skrevet en [veiledning for autorisasjonsregler](https://docs.altinn.studio/nb/app/development/configuration/authorization/guidelines_authorization/)
som kan være nyttig å lese gjennom før man setter i gang.

## Verktøy for tilgangsregler

Verktøy for å redigere tilgangsregler ligger under "Innstillinger".
Her kan man sette [påkrevd sikkerhetsnivå for innlogging](https://info.altinn.no/hjelp/innlogging/diverse-om-innlogging/hva-er-sikkerhetsniva/),
og man kan sette opp regler for hvem som skal få tilgang.

![Tilgangsregler](https://altinncdn.no/studio/docs/images/app-development_settings-access-rules.png "Tilgangsregler")

Hver regel må definere:
- HVA regelen skal gjelde for (hvilken ressurs eller sub-ressurs). For en app kan dette være hele appen, eller det kan
innsnevres til kun deler av appen (f.eks. kun et valgt steg i prosessen).
- HVILKE rettigheter skal gis? F.eks. "Les", "Skriv", "instansier", osv. Dette velges fra en liste med tilgjengelige rettigheter.
- HVEM skal denne regelen gjelde for. Her kan man velge fra liste med Altinn-roller, eller velge egen organisasjon.

![Tilgangsregler - eksempel](https://altinncdn.no/studio/docs/images/app-development_settings-acces-rule-example.png "Tilgangsregler - eksempel")

## Tilgangsstyring
Her kan du sette aktørkrav for applikasjonen. Dersom ingenting er valgt har alle aktørtyper tilgang.

![Tilgangsstyring](https://altinncdn.no/studio/docs/images/app-development_settings-access-management.png "Tilgangsstyring")

## Lokale endringer
Her kan du laste ned eller slette dine endringer

![Lokale endringer](https://altinncdn.no/studio/docs/images/app-development_settings-local-changes.png "")
