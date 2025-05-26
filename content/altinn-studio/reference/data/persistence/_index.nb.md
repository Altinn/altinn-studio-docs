---
title: Lagring
linktitle: Lagring
description:
weight: 10
---

## Konfigurer minimum levetid for persistens

Du kan konfigurere persistensens levetid for instanser av en applikasjon ved å konfigurere egenskapen `preventInstanceDeletionForDays` i filen `App/config/applicationmetadata.json`.
Dette hindrer at instansene blir slettet av brukere og tjenesteeieren i den angitte tidsperioden.

### Eksempel - hindre sletting av instanser i 30 dager

```
{
    ...
    "preventInstanceDeletionForDays": 30,
    ...
}
```
