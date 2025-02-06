---
title: Overgangsløsning
linktitle: Overgangsløsning
description: Overgangsløsning for Altinn melding
tags: []
toc: false
weight: 60
---

{{% notice warning  %}}
Denne delen av dokumentasjonen er under utarbeidelse.
Det er kapitler som bare er delvis ferdigstilt.
Noe funksjonalitet er fremdeles under avklaring og utvikling og representerer ikke endelig versjon.
{{% /notice %}}

For å forenkle overgangen fra Altinn 2 til Altinn 3 versjon av melding-produktet, så har man fulgt en overordnet strategi som har hatt som mål å balansere kompleksitet og brukervennlighet for alle parter.

- Altinn 3 melding har i stor grad lik datamodell som Altinn 2 for å muliggjøre mapping/migrering.
- Alle Altinn 2 meldinger og vedlegg migreres til Altinn 3 melding.
- Alle Altinn 2 meldingstjenester med data blir opprettet som Altinn 3 meldingstjenester.
- Man migrerer data/metadata i en prosess som også tilgjengeliggjør elementene i Dialogporten og Arbeidsflate.
- Migrering av historiske data vil ta tid (uker/måneder), og overgangsløsning bygges med dette i mente.
- Til slutt vil migrerings-jobben «ta igjen» Live/Ferske data, slik at elementene kan tilgjengeliggjøres i Altinn 3 kort tid etter at de var opprettet i Altinn 2.
- For å gjøre seg uavhengig av produksjonsdato for nye Arbeidsflate, så tilgjengeliggjøres Altinn 3 meldinger i Altinn 2 Portal for sluttbrukere.
- Det lages IKKE overgangsløsning for API-endepunkter:
  - Sluttbrukersystemer og Tjenesteeiersystemer må opprettholde integrasjon mot både Altinn 2 og Altinn 3 i en overgangsperiode.

## Overordnet prosessflyt

TODO: Kortversjon av prosessflyt med diagram??

{{<children />}}
