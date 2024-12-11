---
title: Overgangsløsning
linktitle: Overgangsløsning
description: Overgangsløsning for Altinn Melding
tags: []
toc: false
weight: 60
---

For å forenkle overgangen fra Altinn 2 til Altinn 3 versjon av Melding-produktet, så har man fulgt en overordnet strategi som har hatt som mål å balansere kompleksitet og brukervennlighet for alle parter.

- Altinn 3 Melding har i stor grad lik datamodell som Altinn 2 for å muliggjøre mapping/migrering.
- Alle Altinn 2 Meldinger og vedlegg migreres inn i Altinn 3 Melding.
- Alle Altinn 2 Meldingstjenester med data blir opprettet som Altinn 3 Meldingstjenester.
- Man migrerer data/metadata i en prosess som også tilgjengeliggjør elementene i Dialogporten og Arbeidsflate.
- Migrering av historiske data vil ta tid (uker/måneder), og overgangsløsning bygges med dette i mente.
- Til slutt vil migrerings-jobben «ta igjen» Live/Ferske data, slik at elementene kan tilgjengeliggjøres i Altinn 3 kort tid etter at de var opprettet i Altinn 2.
- For å gjøre seg uavhengig av produksjonsdato for nye Arbeidsflate, så tilgjengeliggjøres Altinn 3 Meldinger i Altinn 2 Portal for sluttbrukere.
- Det lages IKKE overgangsløsning for API-endepunkter:
  - Sluttbrukersystemer og Tjenesteeiersystemer må opprettholde integrasjon mot både Altinn 2 og Altinn 3 i en overgangsperiode.

## Overordnet prosessflyt

TODO: Kortversjon av prosessflyt med diagram??

{{<children />}}
