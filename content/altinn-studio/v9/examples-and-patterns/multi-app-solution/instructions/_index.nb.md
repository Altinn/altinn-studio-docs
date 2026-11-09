---
title: Utvikle en flerappsløsning i Altinn
linktitle: Instruksjoner
description: Slik går du frem for å lage en flerappsløsning
weight: 20
tags: [needsReview]
aliases:

- /app/multi-app-solution/instructions

---

## Før du starter

Dette må du tenke på før du starter den tekniske implementeringen.

### Funksjonelle krav

- Du må ha tilgang til å opprette, utvikle og distribuere apper eid av en organisasjon.
- Du må ha et eksisterende Altinn-skjema (app A) der du har identifisert dataene som skal videresendes til app B.
- Du må vite hvem instans-eierne er, det vil si hvilke roller og tilganger de har.

### Tekniske krav

- App A sender forespørslene til app B som tjenesteeier, med den innebygde Maskinporten-klienten i appen.
- Scopene app A trenger, `altinn:serviceowner/instances.read` og `altinn:serviceowner/instances.write`, får alle v9-apper automatisk. Du trenger ikke legge dem til i Altinn Studio.
- `policy.xml` i app B må gi tjenesteeieren rettighetene `instantiate`, `read` og `write`. Malen for v9 gjør det allerede.

Les mer i [veiledningen for Maskinporten-integrasjon]({{< relref "/altinn-studio/v9/develop-a-service/integration/maskinporten" >}}).

{{<children description="true"/>}}
