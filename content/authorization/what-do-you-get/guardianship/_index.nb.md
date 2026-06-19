---
title: Vergemål
linktitle: Vergemål
description: Altinn Autorisasjon gjør det enkelt for tjenesteeiere å innføre støtte for vergemål i sine tjenester.
tags: [needsReview]
---

Personer som ikke kan ta hånd om interessene sine selv på grunn av skade, sykdom eller funksjonsnedsettelse, kan få hjelp av en verge.
En slik ordning er frivillig og tilpasset ønskene og behovene til den som har verge.
Statsforvalteren oppnevner og følger opp vergene, og Sivilrettsforvaltningen er sentral vergemålsmyndighet.

## Slik fungerer vergemål i Altinn

![Overordnet arkitektur for vergemål i Altinn](./GuardianshipOverview.png "Overordnet arkitektur for vergemål i Altinn")

Sivilrettsforvaltningen definerer vergefullmaktene som angir hva en verge kan gjøre på vegne av vergehaver. Vergefullmaktene hentes fra Folkeregisteret og kobles mot tilgangspakker i Altinn Autorisasjon — du som tjenesteeier trenger ikke å håndtere dette.

Som tjenesteeier gjør du tre ting:

- Du oppretter tilgangsregler som knytter aktuelle vergefullmakter til tjenesten din.
- Du legger til aktørvalg slik at vergen kan velge hvem hen representerer.
- Du gjør et autorisasjonsoppslag for å bekrefte at vergen har riktig vergefullmakt.

Folkeregisteret er autoritativ kilde for vergefullmakter. Det er ikke mulig å gi eller trekke tilbake vergefullmakter i Altinn — det gjøres hos Statsforvalteren.

## Slik ser det ut for brukerne

I brukerflaten for tilgangsstyring vil vergehaver se sine verger, og verger vil se personene de er verge for.
Dersom en vergehaver har flere verger, vises alle, men det vises ikke innenfor hvilke områder den enkelte vergen har ansvar.

## Slik innfører du støtte for vergemål

1. Opprett en autorisasjonsressurs.
2. Sett tilgangsregler for vergemål.
3. Legg til støtte for aktørvalg og autorisasjonsoppslag.

Når dette er på plass, kan vergen logge inn, velge å representere vergehaver og utføre handlinger i tjenesten.

Se [steg-for-steg-guide for å innføre vergemål](/nb/authorization/getting-started/guardianship/).

## Les mer

- [Vergefullmakter fra Sivilrettsforvaltningen — oversikt over hva de ulike vergefullmaktene dekker](/nb/authorization/what-do-you-get/accessgroups/accessgroups-citizens/verger/)
- [Les mer om vergemål hos Sivilrettsforvaltningen](https://www.vergemal.no)
