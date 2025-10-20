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

- Du må ha tilgang til å opprette, utvikle og distribuere apper eid av en organisasjon.
- Du må ha et eksisterende Altinn-skjema (app A) der du har identifisert dataene som skal videresendes til app B.
- Du må vite hvem instans-eierne er, det vil si hvilke roller og tilganger de har.

### Tekniske krav

- Appene dine må bruke versjon 8 eller nyere av Altinn-nugets.
- Organisasjonen må ha en eksisterende Maskinporten-klient med riktige altinn-spesifikke
   scopes: `altinn:serviceowner/instances.read` og
   `altinn:serviceowner/instances.write`*
- Du må ha en integrasjon mellom appen og klientene i Maskinporten. Dette må du gjøre i appene
   som skal sende forespørsler til en annen app, der appeieren må autorisere forespørslene.*

Hvis trinn 2 og 3 mangler, se
[Maskinporten-App Integrering](/nb/altinn-studio/v8/guides/integration/maskinporten/)

\* _Hvis sluttbrukeren av app A har de nødvendige rollene til å opprette app B på vegne av den
tiltenkte mottakeren, kan du hoppe over disse tekniske kravene._

{{<children description="true"/>}}