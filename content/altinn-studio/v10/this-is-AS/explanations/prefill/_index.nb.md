---
draft: false
title: Forhåndsutfylling
description: Forhåndsutfylling lar deg fylle ut skjema med data som allerede finnes.
weight: 40
tags: [needsReview]
---

## Forhåndsutfylling i Altinn Studio

Forhåndsutfylling lar deg tilby brukeren et skjema med felter som allerede er ferdig utfylt med relevant informasjon. I denne artikkelen forklarer vi hva forhåndsutfylling er, hvorfor det er nyttig, og hvordan du kan sette det opp.

### Hva er forhåndsutfylling?

Med forhåndsutfylling kan du fylle ut skjemafelt automatisk med informasjon som allerede er tilgjengelig. Dette sparer brukeren for tid og reduserer feil.

**Eksempel:**
Skattemeldingen er hvert år forhåndsutfylt med data fra Skatteetaten. Brukeren trenger derfor ikke å fylle ut informasjon som mottaker allerede har. Formålet blir da å be brukeren bekrefte informasjonen, eller eventuelt endre den hvis den ikke stemmer.

<!--Det er viktig å alltid gjøre en vurdering av hvilke data som skal innhentes i et skjema, og om man har hjemmel til
å hente inn disse dataene. All data som hentes inn skal ha et formål.
> TODO: Få en jurist til å skrive noen linjer om hva som gjelder her mtp forhåndsutfylling.-->

### Hvordan setter du opp forhåndsutfylling?

I Altinn Studio finnes det flere måter å sette opp forhåndsutfylling:

#### 1. Via konfigurasjon
For visse data fra Folkeregisteret, Enhetsregisteret eller brukerens Altinn-profil kan du sette opp forhåndsutfylling via konfigurasjon. Dette er den enkleste måten.

#### 2. Via eksterne API-er
Du kan hente data som er tilgjengelig via eksterne API-er under oppstart av et eksemplar av appen. Denne dataen legger du deretter inn i skjemaet via kode.

#### 3. Ved oppstart via API
Hvis du starter et eksemplar av en app via API, kan du sende med (helt eller delvis) ferdig utfylt skjemadata som utgangspunkt.
