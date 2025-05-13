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
Brukes for å identifisere en organisasjon.
- **appid** (string)
Identifikator for en applikasjon.
- **process.currentTask** (string)  
Søk etter instanser på et gitt steg i prosessen. 
- **process.isComplete** (bool)  
Søk etter instanser der prosessen er ferdig.
- **process.endEvent** (string)  
Dette parameteret er utgått
- **process.ended** (datetime)  
Hent instanser basert på dato de ble avsluttet.
- **instanceOwner.partyId** (int)  
Hent instanser basert på eiers party id.
- **lastChanged** (datetime)  
Hent instanser basert på sist det ble gjort endringer på dem.
- **created** (datetime)  
Hent instanser basert på når de ble opprettet.
- **visibleAfter** (datetime)  
Hent instanser etter når de ble synliggjort.
- **dueBefore** (datetime)  
Hent instanser basert på fristdato.
- **excludeConfirmedBy** (string)  
Ikke ta med instanser som allerede er bekreftet av en aksjonær. Vanligvis kortnavnet til en applikasjonseier.
- **status.isArchived** (bool)
Hent instanser basert på om de er arkivert.
- **size** (int)
Sett størrelsen/antall treff på lista som blir returnert.
- **mainVersionInclude** (int)
Resultatet inkluderer ønsket Altinn-versjon. For eksempel "mainVersionInclude=3" henter alle Altinn 3-instanser.
- **mainVersionExclude** (int)
Resultatet _ekskluderer_ ønsket Altinn-versjon. For eksempel "mainVersionExclude=3" henter _ikke_ Altinn 3-instanser.
- **status.isSoftDeleted** (bool)
Henter instanser basert på om de er _mykt slettet_. Slettet, men ikke permanent slettet.
- **status.isHardDeleted** (bool)
Henter instanser som er permanent slettet.
Merk at disse bare kan hentes av en applikasjonseier og resultatet kan også inneholde slettede kladder.

### Headerparametere
- **X-Ai-InstanceOwnerIdentifier** (string)  
Denne headeren ble introdusert fordi det ikke var ønskelig å skrive personnummer og organisasjonsnumer lett synlig i URLen.
Henter instanser basert på personnummer og organisasjonsnummer, for eksempel Person:14817697543, Organisation:313541479.

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

Spørringen returerer et resultatobjekt med en samling av instanser som oppfyller kriteriene for spørringen. 
Størrelsen er som standard 100 instanser, men man kan bruke *size*-parameteret for å endre antall treff per side. 
For å hente neste side, bruk *continuationToken* under *next* i resultatobjektet. 

```json
Accept: application/json
{
    "count": 50,
    "self": "{storagePath}/instances?appId=org/app&size=50",
    "next": "{storagePath}/instances?appId=org/app&size=50&continuationToken=%257b%2522token%2522%253a%2522%252bRID%...",
    "instances": [
            {...},
            {...},
            ...
      ]
    }
}
```
