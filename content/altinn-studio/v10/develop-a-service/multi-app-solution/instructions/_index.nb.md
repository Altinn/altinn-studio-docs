---
title: Utvikle en flerappsløsning i Altinn
linktitle: Instruksjoner
description: Slik går du frem for å lage en flerappsløsning
weight: 20
tags: [needsReview]
aliases:

- /app/multi-app-solution/instructions/app-b

---

## Før du starter

Dette må du tenke på før du starter den tekniske implementeringen.

### Funksjonelle krav

1. Du må ha tilgang til å opprette, utvikle og distribuere applikasjoner eid av en organisasjon.
2. Du må ha et eksisterende Altinn-skjema (applikasjon A) der du har identifisert dataene som skal videresendes til applikasjon B.
3. Du må vite hvem instans-eierne er, det vil si hvilke roller og tilganger de har.

### Tekniske krav

1. Applikasjonene dine må bruke versjon 8 eller nyere av Altinn-nugets.
2. Organisasjonen må ha en eksisterende Maskinporten-klient med riktige altinn-spesifikke
   scopes: `altinn:serviceowner/instances.read` og
   `altinn:serviceowner/instances.write`*
3. Du må ha en integrasjon mellom applikasjonen og klientene i Maskinporten. Dette må du gjøre i applikasjonene
   som skal sende forespørsler til en annen applikasjon, der applikasjonseieren må autorisere forespørslene.*

Hvis trinn 2 og 3 mangler, se
[Maskinporten-App Integrering](/nb/altinn-studio/v8/guides/integration/maskinporten/)

\* _Hvis sluttbrukeren av applikasjon A har de nødvendige rollene til å opprette applikasjon B på vegne av den
tiltenkte mottakeren, kan du hoppe over disse tekniske kravene._

{{<children description="true"/>}}