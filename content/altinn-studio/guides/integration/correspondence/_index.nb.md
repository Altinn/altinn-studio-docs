---
title: Integrasjon av Altinn-app med Meldingstjenesten
linktitle: Meldingstjenesten
description: Hvordan sette opp en integrasjon mellom en Altinn-app og Meldingstjenesten.
weight: 100
toc: true
---

Denne veiledningen beskriver hvordan du integrerer [meldingstjenesten](/correspondence/) med en Altinn-applikasjon.
En slik integrasjon gjør det mulig for en app å sende digitale meldinger og vedlegg sikkert til både organisasjoner og enkeltpersoner.

## Forutsetninger
1. En [Altinn-ressurs](#altinn-ressurs)
2. [Altinn.App.Api](https://www.nuget.org/packages/Altinn.App.Api) og [Altinn.App.Core](https://www.nuget.org/packages/Altinn.App.Core) _v8.5.0_ eller nyere

### Altinn-ressurs
Når du sender en korrespondanse må den knyttes til en Altinn-ressurs. Denne ressursen kontrollerer tilgangsstyring for
meldinger. Disse evalueres for både avsendere og mottakere.

Vennligst se [veiledningen for ressursregistrering](/correspondence/getting-started/#register-a-resource-in-altinn-resource-registry)
for mer informasjon om oppsett og opprettelse.

{{<notice info notice-paragraph-fix>}}
Ressursen må tillate sender-tilgang for [din organisasjon](https://github.com/Altinn/altinn-cdn/blob/master/orgs/altinn-orgs.json)
og mottaker-tilgang for ønskelige [rollekoder](https://github.com/Altinn/altinn-cdn/blob/master/authorization/subjectoptions.json).

Merk at for meldinger sendt til en person, skal koden `priv` brukes. For meldinger sendt til en organisasjon, skal de rollene
som best beskriver din tiltenkte mottaker brukes.
{{</notice>}}

## Implementasjon og bruk
For å bruke meldingstjenesten, må forespørselen autoriseres med en passende bearer-token og en abonnementnøkkel.

Vennligst se seksjonene nedenfor for en detaljert veiledning om hvordan du oppnår dette:

- [Sende meldinger ved hjelp av Maskinporten](maskinporten)