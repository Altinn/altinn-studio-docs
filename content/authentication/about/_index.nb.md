---
title: About Altinn Authentication
linktitle: About
description: Altinn-autentiseringskomponenten gir funksjonalitet for å autentisere brukere og systemer som får tilgang til Altinn-apper og Altinn-plattformen.
toc: false
weight: 1
---

Autentiseringskomponenten er ikke en ID-leverandør og oppretter kun autentiseringssesjoner basert på eksterne 
ID-leverandører som [ID-porten](https://eid.difi.no/nb/id-porten), [Maskinporten](https://samarbeid.digdir.no/maskinporten/maskinporten/25) eller [Feide](https://www.feide.no/).

Autentiseringskomponenten oppretter JWT-tokene med påstander om brukeren og systemet.

Påstandene er basert på autentiseringsinformasjonen som kommer fra ID-leverandørene.

Repository for Altinn-autentisering finner du [her](https://github.com/Altinn/altinn-authentication).

Backlog med åpne saker finner du [her](https://github.com/Altinn/altinn-authentication/issues).
