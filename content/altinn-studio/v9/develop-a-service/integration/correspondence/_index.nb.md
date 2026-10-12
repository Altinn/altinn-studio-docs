---
draft: true
title: Integrere Altinn-app med Meldingstjenesten
linktitle: Meldingstjenesten
description: Slik integrerer du en Altinn-app med Meldingstjenesten.
weight: 100
toc: true
tags: [needsReview]
---

Slik integrerer du [meldingstjenesten](/nb/correspondence/) med en Altinn-app. Med en slik integrasjon kan appen sende digitale meldinger og vedlegg sikkert til både organisasjoner og enkeltpersoner.

## Forutsetninger

Du trenger en [Altinn-ressurs](#altinn-ressurs). Meldingsklienten er innebygd i alle v9-apper, så du trenger ikke installere eller registrere noe.

### Altinn-ressurs
Når du sender en korrespondanse må du knytte den til en Altinn-ressurs. Ressursen bestemmer tilgangen til meldingene. Altinn evaluerer om både avsendere og mottakere har tilgang.

Se [veiledningen for ressursregistrering](/nb/correspondence/getting-started/developer-guides/serviceowner/#registeraresourceinaltinnresourceregistry) for mer informasjon om oppsett og opprettelse.

{{<notice info notice-paragraph-fix>}}
Policyen til ressursen må tillate handlingene:
- `read`, slik at mottakere kan åpne og lese meldingen
- `write`, slik at avsendere kan sende meldingen
- `subscribe`, for å registrere hendelsesabonnement i Altinn Events

Ressursen må tillate sender-tilgang for [din organisasjon](https://github.com/Altinn/altinn-cdn/blob/master/orgs/altinn-orgs.json)
og mottaker-tilgang for ønskelige [rollekoder](https://github.com/Altinn/altinn-cdn/blob/master/authorization/subjectoptions.json) eller [tilgangspakker](https://docs.altinn.studio/nb/authorization/what-do-you-get/accesspackages/business/). Tilgangspakker erstatter etter hvert de tradisjonelle Altinn-rollene, men rollekoder fungerer fortsatt som et unntak fram til 1. januar 2027.

Når du sender en melding til en person, bruker du koden `priv`. Når du sender en melding til en organisasjon, bruker du rollene eller tilgangspakkene
som best beskriver din tiltenkte mottaker.
{{</notice>}}

## Sende meldinger fra appen

Appen sender meldinger på vegne av tjenesteeieren og henter tokenet fra Maskinporten. Se [Sende meldinger med Maskinporten-autorisasjon]({{< relref "/altinn-studio/v9/develop-a-service/integration/correspondence/maskinporten" >}}) for hvordan du setter det opp og skriver koden.
