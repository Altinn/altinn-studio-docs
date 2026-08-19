---
title: Integrere Altinn-app med Meldingstjenesten
linktitle: Meldingstjenesten
description: Slik integrerer du en Altinn-app med Meldingstjenesten.
weight: 100
toc: true
tags: [needsReview]
---

Slik integrerer du [meldingstjenesten](/nb/correspondence/) med en Altinn-app. Med en slik integrasjon kan appen sende digitale meldinger og vedlegg sikkert til både organisasjoner og enkeltpersoner.

## Forutsetninger
1. En [Altinn-ressurs](#altinn-ressurs)
2. [Altinn.App.Api](https://www.nuget.org/packages/Altinn.App.Api) og [Altinn.App.Core](https://www.nuget.org/packages/Altinn.App.Core) _v8.12.2_ eller nyere

### Altinn-ressurs
Når du sender en korrespondanse må du knytte den til en Altinn-ressurs. Ressursen bestemmer tilgangen for meldingene. Systemet evaluerer både avsendere og mottakere.

Se [veiledningen for ressursregistrering](/nb/correspondence/getting-started/developer-guides/serviceowner/#registeraresourceinaltinnresourceregistry) for mer informasjon om oppsett og opprettelse.

{{<notice info notice-paragraph-fix>}}
Ressursen må tillate sender-tilgang for [din organisasjon](https://github.com/Altinn/altinn-cdn/blob/master/orgs/altinn-orgs.json)
og mottaker-tilgang for ønskelige [rollekoder](https://github.com/Altinn/altinn-cdn/blob/master/authorization/subjectoptions.json).

Når du sender en melding til en person, bruker du koden `priv`. Når du sender en melding til en organisasjon, bruker du de rollene
som best beskriver din tiltenkte mottaker.
{{</notice>}}

## Implementasjon og bruk

For å bruke meldingstjenesten må du autorisere forespørselen med en passende bearer-token og en abonnementnøkkel.

Under finner du veiledninger for hvordan du setter opp dette:

- [Sende meldinger ved hjelp av Maskinporten](maskinporten)