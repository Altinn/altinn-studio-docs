---
draft: true
title: Teste appen lokalt
linktitle: Lokalt
description: Slik kjører og tester du appen på egen maskin med lokal testplattform
tags: [needsReview, translate-to-english]

aliases:
- /nb/altinn-studio/v8/reference/testing/local/
---

Slik tester du appen lokalt hvis du skal skrive en del kode (for eksempel [logikk](/nb/altinn-studio/v8/reference/logic/)) eller raskt sjekke hvordan skjemaet ser ut. Det er nyttig å teste endringer uten å måtte distribuere hele appen til testmiljøet.

Når appen lages, kommer den med alle nødvendige filer og oppsett til å kunne kjøres som en frittstående applikasjon. Ved å laste ned alle filene knyttet til appen fra app-repositoriet, kan du kjøre appen lokalt på egen maskin, og på den måten enkelt teste endringer.

I testmiljøet bruker appen et sett med plattformtjenester for å kunne hente ut/lagre data. Det er opprettet en forenklet versjon av disse tjenestene som kan settes opp og kjøres lokalt. Dette er nødvendig for at appen skal kunne testes lokalt.

## Kjøre appen lokalt

1. Gå til app-repositoriet i Altinn Studio. [Les hvordan du kommer til app-repositoriet](/nb/altinn-studio/v8/getting-started/navigation/repos/).
2. Last ned alle filene i repositoriet:
  - ved å bruke `git clone`-kommandoen. [Les mer om git clone i Git-dokumentasjonen](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository).
  - ved å klikke på nedlastingsikonet (lastes ned som en zip-fil)

[Les hvordan du laster ned og kjører den lokale plattformen, og hvordan du kjører appen](https://github.com/Altinn/app-localtest/blob/master/README.md).

{{<children />}}
