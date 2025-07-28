---
title: Lesetilgang til API-et
linktitle: API-tilgang
weight: 10
description: Lesetilgang til Altinns API-er kreves for de som ønsker å få tilgang til hendelser
---

## Hendelser fra Altinn Studio apper 
Lese- og abonnenttilgang til hendelser fra apper krever tilgang til hendelseskilden.
Tilgang administreres derfor gjennom appens policy. Det er ingen restriksjoner på bruken av API-et.

## Hendelser fra andre hendelseskilder - ikke apper
Bruk av API-et krever scopet: **altinn:events.subscribe**
Dette scopet er tilgjengelig for alle klienter definert i Maskinporten eller ID-porten

Tilgang til de faktiske hendelsene beskrives gjennom tilgangspolicyen for hendelseskilden