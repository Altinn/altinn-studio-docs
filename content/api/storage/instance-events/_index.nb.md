---
title: Instance events
description: Plattform API for å jobbe med instans-hendelser.
toc: true
tags: [api]
weight: 200
---

## Hendelser for instanser

Instans eventer, eller _hendelser_, er først og fremst logghendelser tilknyttet en datainstans.
Alle hendelser, for eksempel oprettelse, les, lagre, endrer tilstand ...

```http
GET {storagePath}/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/events
```

Eksempel på hendelsesdata

```json
{
    "id":"6dff32bc-0928-4ae8-937c-b362d6941c89",
    "instanceId": "60238/5c6b1a71-2e1f-447a-ae2f-d1807dcffbfb",
    "eventType": "deleted",
    "created": "2019-05-02T13:08:21.981476Z",
    "instanceOwnerPartyId": "60238",
    "user": {
        "userId": 338829,
        "authenticationLevel": 1,
        "enduserSystemId": 2
    },
    "process": {
        "started": "2019-05-01T12:45:01.3233Z",
        "startEvent": "Start_22",
        "currentTask": {
            "elementId": "Task_2"
        }
    }
}
```
