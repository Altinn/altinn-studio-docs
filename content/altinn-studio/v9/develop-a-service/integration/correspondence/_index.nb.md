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
Hver melding du sender, må høre til en Altinn-ressurs. Policyen til ressursen bestemmer hvem som får lese meldingene.

Se [veiledningen for ressursregistrering](/nb/correspondence/getting-started/developer-guides/serviceowner/#registeraresourceinaltinnresourceregistry) for hvordan du oppretter ressursen.

{{<notice info notice-paragraph-fix>}}
Policyen til ressursen må tillate disse handlingene:
- `read`, slik at mottakerne kan åpne og lese meldingen
- `subscribe`, hvis du skal abonnere på hendelser for ressursen i Altinn Events

Mottakerne gir du tilgang med [rollekoder](https://github.com/Altinn/altinn-cdn/blob/master/authorization/subjectoptions.json) eller [tilgangspakker](/nb/authorization/what-do-you-get/accesspackages/business/). Sender du meldinger til personer, bruker du rollekoden `priv`. Det er [rollen Privatperson]({{< relref "/authorization/what-do-you-get/accesspackages/citizens/privatperson" >}}), som alle innbyggere har fra Folkeregisteret.

Sender du til virksomheter, velger du rollene eller tilgangspakkene som passer best for mottakeren. De gamle Altinn-rollene fra Altinn 2 gir ikke lenger tilgang fra 1. januar 2027, så bruk tilgangspakker for virksomheter. Roller fra Folkeregisteret, som Privatperson, er ikke Altinn 2-roller. Se [Altinn Autorisasjon – detaljert konsept]({{< relref "/authorization/about/detailed" >}}).

Eier virksomheten din ressursen, trenger policyen ingen `write`-regel for at appen skal kunne sende. Meldingstjenesten slipper gjennom tjenesteeieren som eier ressursen, og appens token viser hvilken virksomhet appen tilhører. Bruker du en ressurs en annen virksomhet eier, må policyen gi virksomheten din `write`.
{{</notice>}}

## Sende meldinger fra appen

Appen sender meldinger på vegne av tjenesteeieren og henter tokenet via Maskinporten. Se [Sende meldinger med Maskinporten-autorisasjon]({{< relref "/altinn-studio/v9/develop-a-service/integration/correspondence/maskinporten" >}}) for hvordan du setter det opp og skriver koden.
