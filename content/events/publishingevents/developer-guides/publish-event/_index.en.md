---
title: Publish events
linktitle: Publish events
description: How-to guide on publishing events to Altinn
weight: 50
toc: true
---


{{% notice info %}}
This section covers the specific API requirements for publishing events. 
If you're just getting started or looking for information on how to use the Events API please refer to the 
[general API documentation.](../../../api/)
{{% /notice %}}

## How to publish Altinn App events

The publishing of app events is handled by the application itself. 
As an application owner you must enable the events functionality for you application to publish events.
There is support for defining custom app events in the application logic.

[Please reference the Altinn Apps documentation for guidance.](../../../../app/development/configuration/events/)


## How to publish generic events

### Authentication 
This API requires authentication and the Maskinporten scope __altinn:events.publish__.

See [Authentication and Authorization](../../../api/#authentication--authorization) for more information.


### Endpoint 

POST /events


### Request Body
{{% notice info %}}
Would like to link to a separate section where Altinn extension attributes are defined and described.
But what would be a suitable place for this? 
{{% /notice %}}

The incoming cloud event serialized in JSON format.

Required properties and Altinn-extension attributes are: _id_, _type_, _source_, _resource_.

Content type: `application/cloudevents+json`

```json
{
    "id": "288f71f2-8cbd-3442-1532-ac14f3fd9faa",
    "type": "no.altinn.events.digitalt-dodsbo.opprettet", 
    "resource": "urn:altinn:resource:dodsbo.domstoladmin.api",
    "resourceinstance": "91f2388f-bd8c-4647-8684-fd9f68af5b14", 
    "alternativesubject":"/person/16069412345",
    "source":  "https://api.domstol.no/dodsbo-api/v1/dodsbo/91f2388f-bd8c-4647-8684-fd9f68af5b14",
    "time": "2020-02-20T08:00:06.4014168Z",
    "specversion": "1.0"
}
```

__Example request__
```
curl --location 'https://plaform.altinn.no/events/api/v1/events' \
--header 'Content-Type: application/cloudevents+json' \
--header 'Authorization: Bearer [insert Altinn token]' \
--data '{
    "id": "288f71f2-8cbd-3442-1532-ac14f3fd9faa",
    "type": "no.altinn.events.digitalt-dodsbo.opprettet", 
    "resource": "urn:altinn:resource:dodsbo.domstoladmin.api",
    "resourceinstance": "91f2388f-bd8c-4647-8684-fd9f68af5b14", 
    "alternativesubject":"/person/16069412345",
    "source":  "https://api.domstol.no/dodsbo-api/v1/dodsbo/91f2388f-bd8c-4647-8684-fd9f68af5b14",
    "time": "2020-02-20T08:00:06.4014168Z",
    "specversion": "1.0"
}'
```


#### Response codes

A successful registration of the cloud event should result in a _200 OK_ response without any data.
It is only when this response code is returnedt that we guarantee that the event has been published successfully to Altinn.

- 200 OK: The cloud event was registered successfully  
- 400 Bad Request: The request was invalid.
  - Supported content types: _application/cloudevents+json_, _application/json_
  - A ProblemDetails object with information about the error.

