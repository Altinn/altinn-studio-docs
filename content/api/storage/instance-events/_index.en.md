---
title: Instance events
description: The Platform API for working with instance events.
toc: true
tags: [api]
weight: 200
aliases:
- /teknologi/altinnstudio/altinn-api/platform-api/instancee-events/
---

## Instance events

All instance events, e.g. creation, read, save, change process state, ...

```http
GET {storagePath}/instances/347829/762011d1-d341-4c0a-8641-d8a104e83d30/events
```

Example of event data.

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
### Application events (for application owners)

> **WARNING**: This section will be redesigned

Selected instance events. Created, first read, change process state. Optionally specified by application developer.

Events can be queried. May be piped.

```http
GET {storagePath}/applications/org/app/events?created=gte:2019-03-30&process.currentTask=Task_2
```
