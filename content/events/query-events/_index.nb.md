---
title: Spørr etter hendelser
linktitle: Spørr etter hendelser
description: Dokumentasjon for å spørre etter hendelser fra API
weight: 20
---

## Spørring vs Abonnement

Forskjellen mellom å abonnere på hendelser og å spørre etter hendelser er ganske viktig. Å abonnere på hendelser innebærer 
at mottakeren ikke må aktivt sjekke for nye data med gitte intervaller. I stedet vil mottakeren, som abonnent,
registrere et endepunkt hvor hendelser vil bli postet av tjenesten.

Å spørre etter hendelser, på den andre siden, innebærer at mottakeren må aktivt spørre etter nye data ved å bruke vårt 
REST API. Dette er **ikke det anbefalte mønsteret**, selv om det støttes.

{{<children />}}