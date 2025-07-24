---
title: Publiser hendelser
linktitle: Publiser hendelser
description: Dokumentasjon for hendelsesutgivere
weight: 20
---

Hendelser publisert til Altinn pushes til alle autoriserte abonnenter og lagres for on-demand henting i 90 dager. 

CloudEvent-spesifikasjonen følges, men det er ytterligere Altinn-spesifikke egenskaper som du bør vite om
og bruke der du ser det hensiktsmessig.

- resource (alltid påkrevd)
- resourceinstance
- alternativesubject

Hendelser publisert på Altinn Events-plattformen lagres i 90 dager og er tilgjengelige for både utgiver og
abonnenter gjennom et aktivt abonnement på tidspunktet hendelsen publiseres eller gjennom vårt API når som helst i løpet av
de 90 dagene.

{{<children />}}