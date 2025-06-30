---
title: 'Dialog'
description: 'Referanseinformasjon om dialogens aggregatrotelement'
weight: 10
toc: true
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

{{<notyetwritten>}}

## Dialog-entitet for sluttbrukere

### Detaljer

Dette er entiteten som returneres i sluttbruker-API-et når man henter detaljer for en enkelt dialog

{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_Dialog">}}

### Søk

Dette er entiteten som returneres i sluttbruker-API-et når man søker etter dialoger

{{<swaggerdisplayentity "V1EndUserDialogsQueriesSearch_Dialog">}}

## Dialog-entitet for tjenesteeiere

### Detaljer

Dette er entiteten som returneres i tjenesteeier-API-et når man henter detaljer for en enkelt dialog

{{<swaggerdisplayentity "V1ServiceOwnerDialogsQueriesGet_Dialog">}}

### Søk

Dette er entiteten som returneres i tjenesteeier-API-et når man søker etter dialoger

{{<swaggerdisplayentity "V1ServiceOwnerDialogsQueriesSearch_Dialog">}}

### Opprett (POST)

Dette er entiteten som forventes som input i tjenesteeier-API-et når man oppretter en ny dialog

{{<swaggerdisplayentity "V1ServiceOwnerDialogsCommandsCreate_Dialog">}}

### Oppdater (PUT)

Dette er entiteten som forventes som input i tjenesteeier-API-et når man oppdaterer en ny dialog

{{<swaggerdisplayentity "V1ServiceOwnerDialogsCommandsUpdate_Dialog">}}

### Oppdater (PATCH)

Dialogporten støtter [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902/) JSON Patch. Et patch-dokument bør konstrueres basert på PUT-entiteten beskrevet ovenfor.

Merk at listen over sendinger og aktiviteter er immutable; så erstatt/fjern-operasjoner aksepteres ikke på disse egenskapene.

**Se også**
* https://jsonpatch.com/

{{<children />}}