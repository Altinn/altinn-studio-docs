---
draft: true
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
- Appen som sender forespørsler til en annen app må ha nødvendige Maskinporten-scopes lagt til i Altinn Studio:
   `altinn:serviceowner/instances.read` og
   `altinn:serviceowner/instances.write`.*
- Appen må bruke den innebygde Maskinporten-klienten når appeieren må autorisere forespørslene.*

Hvis trinn 2 og 3 mangler, se
[Maskinporten-App Integrering](/nb/altinn-studio/v9/develop-a-service/integration/maskinporten/)

\* _Hvis sluttbrukeren av app A har de nødvendige rollene til å opprette app B på vegne av den
tiltenkte mottakeren, kan du hoppe over disse tekniske kravene._

{{<children description="true"/>}}
