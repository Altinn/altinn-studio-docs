---
title: Overgangs- og migreringsløsning
linktitle: Overgangsløsning
description: Overordnet om overgangs- og migreringsløsning for Altinn melding
tags: []
toc: false
weight: 60
---

For å forenkle overgangen fra Altinn 2 til Altinn 3 versjonen av melding-produktet, så har man fulgt en overordnet strategi som har hatt som mål å balansere kompleksitet og brukervennlighet for alle parter.

## Migrering av Altinn 2 Meldinger

- Altinn 3 melding har i stor grad lik datamodell som Altinn 2 for å muliggjøre mapping/migrering.
- Alle Altinn 2 meldinger og vedlegg migreres til Altinn 3 melding.
- Alle Altinn 2 meldingstjenester med data blir opprettet som Altinn 3 meldingstjenester.
- Man migrerer data og metadata til Altinn 3 i en prosess som er uavhengig av å tilgjengeliggjøre elementene i Dialogporten og Arbeidsflate.
- Å tilgjengeliggjøre data via Altinn 3 API og Dialogporten/Arbeidsflate gjøres som et separat steg etter migrering av data er utført.
- Migrering av delegeringer gjøres som et separat steg, men bør utføres før meldinger tilgjengeliggjøres  for sluttbrukere i A3 API og Dialogporten/Arbeidsflate.
- Migrering av historiske data vil ta tid (uker/måneder), og overgangsløsning bygges med dette i mente.
- Til slutt vil migrerings-jobben «ta igjen» Live/Ferske data, slik at elementene kan tilgjengeliggjøres i Altinn 3 kort tid etter at de var opprettet i Altinn 2.
- Siden endringer kan skje på migrerte elementer i Altinn 2 må disse endringene synkroniseres over til Altinn 3, men ikke tilbake.

## Overgangsløsning

- For å gjøre seg uavhengig av produksjonsdato for nye Arbeidsflate, så er Altinn 3 meldinger tilgjengeliggjort i [Altinn 2 Portal for sluttbrukere](./portal/).
- Det lages IKKE en overgangsløsning for API-endepunkter:
  - Sluttbrukersystemer og Tjenesteeiersystemer må opprettholde integrasjon mot både Altinn 2 og Altinn 3 i en overgangsperiode.
  - Migrerte meldinger vil etter migrering kunne nås via både Altinn 2 og Altinn 3, da i sine respektive versjoner.

## Overordnet prosessflyt for migrering av historiske meldinger

1. **Hovedmigrering av historiske meldingsdata:** 1-gangs jobb over tid.
   1. Migrering av historiske data og vedlegg - [migrering av meldingsdata](./data-migration/).
   2. [Migrering av tjenestekonfigurasjon](./service-migration/).
2. **Data-synk periode:** Starter når steg 1 er utført, fortsetter til Altinn 2 skrus av.
   1. Kontinuerlig migrering av **nye** meldinger.
   2. Kontinuerlig synk av statusendringer for migrerte meldinger.
3. **[Migrering av delegeringer](./delegation-migration/):** Starter når steg 1 er utført.
   Vi forventer en stor "backlogg" når denne startes, men i praksis samme jobb/komponent som benyttes i steg 4.
4. **Synk av delegering periode:** når steg 1 og 3 er fullført, fortsetter til Altinn 2 skrus av.
   Kontinuerlig synk av endringer i delegering.
5. **Tilgjengeliggjøring av historiske meldinger i Altinn 3/Dialogporten/Arbeidsflate:** kan i teorien skje etter steg 1 er utført, men for best resultat; når man er i periode 4.
6. **Løpende migrering og tilgjengeliggjøring av meldinger** til slutt vil man være i en fase der alle nye meldinger i Altinn 2 nesten umiddelbart går gjennom steg 2,4 og 5 og dermed fortløpende er tilgjengelige i Dialogporten/Arbeidsflate.

### Ansvarsdeling

*Flytt av Data prosjektet* tar ansvar for utvikling av komponenter til, og utføring av steg 1 og 2, samt steg 3 og 4 i samarbeid med *Team Autorisasjon*.
*Team Dialogporten/Arbeidsflate* tar ansvar for steg 5, i samarbeid med *Flytt av Data prosjektet*.

{{<children />}}