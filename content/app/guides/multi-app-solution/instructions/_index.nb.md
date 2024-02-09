---
title: Instruksjoner for å utvikle en flerappsløsning i Altinn
linktitle: Instruksjoner
description: Forklaringer om hvordan du går frem for å lage en generell flerappsløsning
weight: 20
aliases:

- /app/multi-app-solution/instructions/app-b

---

## Forutsetninger

Før du starter på den tekniske implementeringen, må du sørge for at de nødvendige forutsetningene er oppfylt.

### Funksjonelle forutsetninger

1. App-utvikleren må ha tilgang til å opprette, utvikle og distribuere applikasjoner eid av en organisasjon.
2. Et eksisterende Altinn-skjema (applikasjon A) der dataene som er ment å videresendes til applikasjon
   B, er identifisert.
3. Det skal være klart hvem instanse-eierne er, det vil si hvilke roller og tilganger de har.

### Tekniske forutsetninger

1. Applikasjonene dine bruker versjon 8 eller nyere av Altinn-nugets.
2. Organisasjonen har allerede en eksisterende Maskinporten-klient med riktige altinn-spesifikke
   scopes; `altinn:serviceowner/instances.read` og
   `altinn:serviceowner/instances.write`*
3. En integrasjon mellom applikasjon(en) og klientene i Maskinporten. Dette må gjøres i applikasjonen(e)
   som skal sende forespørsler til en annen applikasjon, hvor forespørslene må autoriseres av applikasjonenseier.*

Hvis trinn 2 og 3 av de tekniske kravene mangler, se
seksjonen [Maskinporten-App Integrering](../../maskinporten-app-integration)

\* _Hvis sluttbrukeren av applikasjon A har de nødvendige rollene for å instansiere applikasjon B på vegne av den
tiltenkte
mottakeren, kan du hoppe over disse tekniske kravene._

{{<children description="true"/>}}