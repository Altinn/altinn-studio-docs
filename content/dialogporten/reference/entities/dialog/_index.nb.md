---
title: 'Dialog'
description: 'Referanseinformasjon om dialogens aggregatrotelement'
weight: 10
toc: true
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

## Dialogentitet for sluttbrukere

### Detaljer

Dette er entiteten som returneres i sluttbruker-API-et når man henter detaljer for en enkelt dialog

{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_Dialog">}}

### Søk

Dette er entiteten som returneres i sluttbruker-API-et når man søker etter dialoger

{{<swaggerdisplayentity "V1EndUserDialogsQueriesSearch_Dialog">}}

## Dialogentitet for tjenesteeiere

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

Dialogporten støtter [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902/) JSON Patch. Et patch-dokument må konstrueres basert på PUT-entiteten beskrevet ovenfor.

Merk at listen over forsendelser og aktiviteter er immutable; så replace/remove-operasjoner aksepteres ikke på disse egenskapene.

### Eksempel

Dette setter statusen, oppdaterer dialogsammendraget, fjerner alle GUI-handlinger (knapper) og legger til et vedlegg

```json
[
    {
        "op": "replace",
        "path": "/status",
        "value": "Completed"
    },
    {
        "op": "replace",
        "path": "/content/summary/value/1/value",
        "value": "Din innsending er mottatt og godkjent."
    },
    {
        "op": "replace",
        "path": "/guiActions",
        "value": []
    },
    {
        "op": "add",
        "path": "/attachments/-",
        "value": {
            "displayName": [
                {
                    "value": "Vedtaksbrev",
                    "languageCode": "nb"
                }
            ],
            "urls": [
                {
                    "url": "https://mintjenesteplattform/sak-1234/vedtak.pdf",
                    "mediaType": "application/pdf",
                    "consumerType": "Gui"
                }
            ]
        }
    }
]
```

{{<notice info>}}
Merk at lokaliseringer (ie. /content/summary) inneholder en array av languageCode og oversatte tekstpar. For å ha konsistent indeksering, er lokaliseringene sortert leksikografisk etter `languageCode`. Dette betyr at når man har f.eks. oversettelser for norsk nynorsk (`nn`), norsk bokmål (`nb`) og engelsk (`en`), vil rekkefølgen alltid være `en`, `nb`, `nn`, som betyr at indeks 1 alltid vil peke til `nb` uavhengig av rekkefølgen lokaliseringen ble lagt til i.
{{</notice>}}

**Se også**
* https://jsonpatch.com/
* [JSON Patch Builder Online](https://json-patch-builder-online.github.io/)

{{<children />}}