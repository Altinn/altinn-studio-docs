---
title: 'Dialog'
description: 'Reference information about the dialog aggregate root'
weight: 10
toc: true
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

## Dialog entity for end-users

### Details 

This is the entity returned in the end-user API when fetching details for a single dialog 

{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_Dialog">}}

### Search

This is the entity returned in the end-user API when searching for dialogs

{{<swaggerdisplayentity "V1EndUserDialogsQueriesSearch_Dialog">}}

## Dialog entity for service owners

### Details

This is the entity returned in the service owner API when fetching details for a single dialog 

{{<swaggerdisplayentity "V1ServiceOwnerDialogsQueriesGet_Dialog">}}

### Search

This is the entity returned in the service owner API when searching for dialogs

{{<swaggerdisplayentity "V1ServiceOwnerDialogsQueriesSearch_Dialog">}}

### Create (POST)

This is the entity expected as input in the service owner API when creating a new dialog 

{{<swaggerdisplayentity "V1ServiceOwnerDialogsCommandsCreate_Dialog">}}

### Update (PUT)

This is the entity expected as input in the service owner API when updating a new dialog 

{{<swaggerdisplayentity "V1ServiceOwnerDialogsCommandsUpdate_Dialog">}}

### Update (PATCH)

Dialogporten supports [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902/) JSON Patch. A patch document must be constructed based on the PUT entity described above.

Note that the list of transmissions and activities are immutable; so replace/remove operations are not accepted on those properties.

### Example

This sets the status, updates the dialog summary, removes all GUI actions (buttons) and adds a attachment

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
Note that localizations (ie. /content/summary) contain an array of languageCode and translated text-pairs. In order to have consistent indexing, the localizations are ordered lexicographically by `languageCode`. This means that when having eg. translations for norwegian nynorsk (`nn`), norwegian bokmål (`nb`) and english (`en`), the order will always be `en`, `nb`, `nn`, meaning that index 1 will always point to `nb` regardless of the order of which the localization was added.
{{</notice>}}

**See also**
* https://jsonpatch.com/
* [JSON Patch Builder Online](https://json-patch-builder-online.github.io/)

{{<children />}}

