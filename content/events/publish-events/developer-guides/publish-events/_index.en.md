---
title: How to publish events
linktitle: Publish events
description: How-to guide on publishing events to Altinn
weight: 40
toc: true
---


{{% notice info %}}
This section covers the specific API requirements for publishing events.
If you're just getting started or looking for information on how to use the Events API please refer to the
[general API documentation.](../../../api/)
{{% /notice %}}


## Endpoint

POST /events

## Authentication
This API requires authentication and the Maskinporten scope __altinn:events.publish__.

See [Authentication and Authorization](../../../api/#authentication--authorization) for more information.


## Request

### Content-type

application/cloudevents+json


### Request body
The request body should contain the cloud event serialized as a JSON string.

### Required cloud event properties and extension attributes

####  id
- ID of the cloud event, type: string

#### type
- event type of the cloud event, type: string

#### source
- event source of the cloud event, type: URI

#### resource
- ID for the resource that the cloud event relates to, type: string

The resource must be registered in Altinn Resource Registry _before_ cloud events are published.
Format of the resource property: _urn:altinn:resource:[prop1].[prop2]_

### Optional cloud event properties and extension attributes
{{% notice info %}}
In addition to the properties stated below, all properties defined in the
[Cloud Event v1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md) specification
as well as custom extension attributes defined on the cloud event will be accepted.
{{% /notice %}}

#### resourceinstance
- ID of the resource instance, type: string

#### alternative subject
- alternative identifier for the subject, type: string

The alternative subject should be an identifier that is commonly known to your subscribers.
This property is supported as a query/filter parameter when subscribing or querying events.
We recommend to include an alternative subject if the subject property is an internal id
that is unknown to the event subscribers

For Altinn-related events alternative subject follows the format `/person/16069412345`
and `/organisation/987564321`.


## Response
A successful registration of the cloud event should result in a _200 OK_ response without any data.

### Content-Type
- application/cloudevents+json
- application/json

### Response codes
- 200 OK: The cloud event was registered successfully
- 400 Bad Request: The request was invalid.

  Refer to problem details in response body for further information.
- 401 Unauthorized: Indicates a missing, invalid or expired authorization header.
- 403 Forbidden: Indicates the caller is not authorized  to publish events on the provided resource.

## Examples

### Request

Request body for a cloud event related to the _urn:altinn:resource:dodsbo.domstoladmin.api_ resource.
Note that an Altinn Token should be included in the authorization header.

```bash
curl \
--location 'https://plaform.altinn.no/events/api/v1/events' \
--header 'Content-Type: application/cloudevents+json' \
--header 'Authorization: Bearer {insert Altinn token}' \
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

### Response

#### 200 OK
Response has no content.

#### 400 Bad Request
Response contains a problem details object with the error message listed within the errors property.
```json
{
	"type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
	"title": "One or more validation errors occurred.",
	"status": 400,
	"traceId": "00-c3d1e2195c9f2bcb8095279cad1bda78-af1b5d6a090db3b3-00",
	"errors": {
		"RequestBody": [
			"CloudEvent is missing required attributes: type (Parameter 'data')"
		]
	}
}
```