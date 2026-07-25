---
title: Standard policy
description: Slik ser en standard app policy ut når du lager appen
draft: true
---

## Regler fra applikasjonsmal

Når du oppretter en app i Altinn studio, er den basert på gjeldende mal og vil inkludere et standard regeloppsett.

![Standardregler fra malen](../default-policy.png)

Det er 2 regler, som gir følgende tilganger.

### Regel 1
- Gjelder hele appen, i alle tilstander.
- Gjelder brukere med rollen "Daglig leder" (ER-rolle) og "Privatperson" (FR-rolle).
- Gjelder handlingene Les, Skriv, Slett, og Start.

### Regel 2
- Gjelder hele appen, i alle tilstander.
- Gjelder tjenesteeeier.
- Gjelder handlingene Les, Skriv, Start og Bekreft mottatt.