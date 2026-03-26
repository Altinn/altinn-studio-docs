---
title: Lagring
linktitle: Lagring
description:
weight: 10
---

## Konfigurer lagrings format i altinn-storage
Data elementer med skjemadata har en C# klasse som brukes for behandling i appen. Denne gjør at appens apier fungerer både med Json og xml.
Når man går direkte mot storage (eg. en maskin integrasjon eller i kvitteringsappen) har man ikke tilgang til C# klassen og må forholde seg til
de serialiserte dataene. Av historiske årsaker er standard format xml, men om man ønsker kan man velge json ved å sette `allowedContentTypes` i filen `App/config/applicationmetadata.json`, slik at `applciation/json` står først.

```json
{
    ...
    "dataTypes":[
        {
            ...
            "appLogic":{
                "className": "Altinn.App.Model",
                ...
            },
            "allowedContentTypes": ["application/json", "application/xml"]
        }
    ]
}
```
Når man oppdaterer gamle apper der det allerede ligger instanser i storage er det viktig at `application/xml` fremdeles står i lista. Eksisterende data elementer vil ikke bli konvertert.

## Konfigurer minimum levetid for persistens

Du kan konfigurere persistensens levetid for instanser av en applikasjon ved å konfigurere egenskapen `preventInstanceDeletionForDays` i filen `App/config/applicationmetadata.json`.
Dette hindrer at instansene blir slettet av brukere og tjenesteeieren i den angitte tidsperioden.

### Eksempel - hindre sletting av instanser i 30 dager

```json
{
    ...
    "preventInstanceDeletionForDays": 30,
    ...
}
```
