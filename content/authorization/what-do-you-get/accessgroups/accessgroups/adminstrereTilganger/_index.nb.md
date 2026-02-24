---
title: Administrere tilganger
linktitle: Administrere tilganger
description: Dette fullmaktsområdet omfatter fullmakter til å administrere tilganger. Tilgangspakkene i denne kategorien skal ikke knyttes til ressurser og tjenester. Ved regelverksendringer eller innføring av nye digitale tjenester kan det bli endringer i tilganger som fullmaktene gir.
toc: true
weight: 100
aliases:
- /authorization/modules/accessgroups
---

|**Tilgangspakker i kategorien**|
|---|
|[Klientadministrator](#klientadministrator)|
|[Tilgangsstyring](#tilgangsstyring)|
|[Hovedadministrator](#hovedadministrator)|
|[Maskinporten administrator](#maskinporten-administrator)|

### Klientadministrator
Denne rollen gir bruker mulighet til å administrere tilganger som virksomheten har på vegne av klienter og kunder, enten via registrerte kundeforhold i Enhetsregisteret eller delegering til virksomheten.  
Når kundeforholdet opphører, vil delegeringer gjort via klientadministrasjon også opphøre.
*urn:altinn:accesspackage:klientadminstrator*

### Tilgangsstyring
Denne tilgangspakken gir bruker mulighet til å gi videre tilganger for virksomheten som man selv innehar.  
*urn:altinn:accesspackage:tilgangsstyring*

### Hovedadministrator
Denne tilgangspakken gir bruker mulighet til å administrere alle tilganger for virksomheten.  
*urn:altinn:accesspackage:hovedadministrator*

### Maskinporten administrator
Denne tilgangspakken gir bruker mulighet til å administrere tilgang til Maskinporten scopes.  
*urn:altinn:accesspackage:maskinporten-administrator*

## Hvilke roller fra Enhetsregisteret får fullmakt til tilgangspakken
|**Tilgangspakke**|**Enhetsregisterroller**|**Delegerbar**|
|---|---|---|
|Klientadministrator|Daglig leder, Styrets leder, Innehaver, Deltaker fullt ansvar, Deltaker delt ansvar, Komplementar, Bestyrende reder, Bostyrer|Ja|
|Tilgangsstyring|Daglig leder, Styrets leder, Innehaver, Deltaker fullt ansvar, Deltaker delt ansvar, Komplementar, Bestyrende reder, Bostyrer, Kontaktperson NUF|Ja|
|Hovedadministrator|Daglig leder, Styrets leder, Innehaver, Deltaker fullt ansvar, Deltaker delt ansvar, Komplementar, Bestyrende reder|Ja|
|Konkursbo tilgangsstyring|Privatperson|Ja|
|Maskinporten administrator|Daglig leder, Styrets leder, Innehaver, Deltaker fullt ansvar, Deltaker delt ansvar, Komplementar, Bestyrende reder, Bostyrer, Kontaktperson NUF|Ja|