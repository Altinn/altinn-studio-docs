---
title: Instanser
description: Platform API for instanser.
toc: true
tags: [api]
weight: 100
---

## Overview

En [instans](../../models/instance) virker som en slags _mappe_ eller gruppering
der data kan samles og utveksles mellom bruker og applikasjonseier.
Instans-dokumentet er en måte for Altinn og eksterne parter å kunne spore tilstanden på en type datautveksling.
Levetiden på en instans og hvor mange interaksjoner melom applikasjonseier og bruker, avhenger av applikasjonen.
Avanserte applikasjoner vil ha kunne ha egen dokumentasjon mht hvirdan dette er implementert.

```http
basePath = https://{hostname}/storage/api/v1/instances
```

## Spørring mot instanser

Det er mulig å gjøre spørringer mot instanser basert på utvalgte parametere.

Applikasjonseiere kan søke fra en enkelt applikasjon eller på tvers av alle sine applikasjoner.
For å benytte dette endepunktet kreves scope 'altinn:instances.read'. 
Parameter for 'org' or 'appId' må inkluderes i spørringen.

Brukere kan søke etter instanser knyttet til dem selv, eller instans-eier der de har nødvendig autorisasjon til å gjøre dette.
Som sluttbruker må 'instanceOwner.partyId' være inkludert som parameter i spørringen.

Det er mulig å søke etter instanser gjennom en enkel GET request mot *instances*-endepunktet.
Tilgjengelige parametere er følgende:

- **org** (string)
The organization identifier.
- **appid** (string)
The application identifier.
- **process.currentTask** (string)  
Search for instances at a specific step in its process. 
- **process.isComplete** (bool)  
Search for instances where the process is completed.
- **process.endEvent** (string)  
Deprecated. The parameter doesn't have any code associated with it.
- **process.ended** (datetime)  
Filter instances based on ended date.
- **instanceOwner.partyId** (int)  
Filter instances based on the instance owner party id.
- **lastChanged** (datetime)  
Filter instances based on the last time they where worked on.
- **created** (datetime)  
Filter instances based on when they where initially created.
- **visibleAfter** (datetime)  
Filter instances based on when they became visible.
- **dueBefore** (datetime)  
Filter instances based on their due date.
- **excludeConfirmedBy** (string)  
Exclude instances already confirmed by a specific stakeholder. Usually the short name of an application owner.
- **status.isArchived** (bool)
Filter instances based on whether they are archived.
- **size** (int)
The page size returned
- **mainVersionInclude** (int)
The Altinn version to include. E.g. "mainVersionInclude=3" will filter the response to only get the Altinn 3 instances.
- **mainVersionExclude** (int)
The Altinn version to exclude. E.g. "mainVersionExclude=3" will filter the response to exclude Altinn 3 instances.
- **status.isSoftDeleted** (bool)
Filter instances based on whether they are soft deleted.
- **status.isHardDeleted** (bool)
Filter instances based on whether they are hard deleted. 
Note that hard deleted instances are only included if an application owner retrieves instances, and the results may include deleted drafts. 

### Header input parameter
- **X-Ai-InstanceOwnerIdentifier** (string)  
Filter instances based on the person number or organisation number, i.e  Person:14817697543, Organisation:313541479. 
Denne headeren ble introdusert fordi det ikke var ønskelig å skrive personnummer og organisasjonsnumer lett synlig i URLen.

**Noen eksempler**:

Hent alle instanser av en applikasjon *org/app* der task id = _Submit_ (se prosess definisjon) og sist endret dato er større enn *2019-05-01*.
```http
GET {storagePath}/instances?appId=org/app&process.currentTask=Task_2&lastChanged=gt:2019-05-01
```

Hent alle instanser for _alle_ applikasjoner tilhørende en applikasjonseier *org* med dato større enn 2020-03-10.
```http
GET {storagePath}/instances?org=org&process.ended=gt:2020-03-10
```

Hent alle instanser for alle applikasjoner tilhørende applikasjonseier *org* som ikke allerede er bekreftet ferdigstilt av *org*
```http
GET {storagePath}/instances?org=org&excludeConfirmedBy=org
```

Hent alle instanser av en applikasjon på et gitt prosesssteg
```http
GET {storagePath}/instances?appId={org}/{app}&process.currentTask={taskId}
```

For å gjøre filtreringer på tid, bruk følgende operatorer:

* gt: - større enn
* gte: - større eller lik
* lt: - mindre enn
* lte: - mindre enn eller lik
* eq: - lik (kan også være tom)

Operatorene kan kombineres for å lage et intervall:

```http
dueBefore=gt:2019-02&dueBefore=lt:2019-03-01
```

Spørringen returerer et resultatobjekt med en samling av instanser som oppfyller kriteriene for spørringen. Størrelsen er som standard *100* instanser, men man kan bruke *size*-parameteret for å endre antall treff per side. 
For å hente neste site, bruk tokenet under _next_ i resultatobjektet. 
Resultatobjektet inneholder informasjon om antall resultater som traff kriteriene totalt *totalHits*, og hvor mange som ble returnert *count*.

```json
Accept: application/json
{
    "totalHits": 234,
    "count": 50,
    "self": "{storagePath}/instances?appId=org/app&size=50",
    "next": "{storagePath}/instances?appId=org/app&size=50&continuationToken=%257b%2522token%2522%253a%2522%252bRID%..."
    "instances": [
            {...},
            {...},
            ...
      ]
    }
}
```
