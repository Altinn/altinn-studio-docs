---
title: Query events
linktitle: Query events
description: Developer guide on how to retrieve events using the Events API
weight: 40
toc: true
---

{{% notice warning %}}
Altinn Events enables event driven integration patterns, designed specifically to ***avoid*** the need for
continuously requesting resources, also known as 'polling'. <br/> <br/>
However, in order to allow for smooth and incremental architectural migrations,
the Events API also provides an HTTP API for scheduled requests of the same event data you hopefully
will receive via webhooks in the future.
{{% /notice %}}


## Endpoint

GET /events

## Authentication

This API requires authentication and the Maskinporten scope __altinn:events.subscribe__.

See [Authentication and Authorization](../../../api/#authentication--authorization) for more information.


## Request

### Content-Type
application/json

### Query parameters & headers

Query parameters marked with \* are required.

### after*
- ID of the event last retrieved, type: string

Result set will include events registered after the provided event ID in chronological order. (Use "0" if retrieving events for the first time.)

### resource*
- the event resource to include, type: string

The resource parameter must be an exact match to the resource on the event.
e.g. _urn:altinn:resource:altinnapp.ttd.apps-test_

### subject
- optional string property that usually identifies the entity a cloud event is related to. [Cloud Events specification](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#subject)


### Altinn-AlternativeSubject (header)
- alternative subject for the cloud events, type: string

### type
- the event types to include, type: array[string]

#### size
- size of the result set, type: string

Default size is set to 50 events

## Response

Contains a header `next` to be used to retrieve a new set of events following the final event in the result set.
Next header is returned regardless if there exists more events to be retrieved or not.

### Supported content-types
application/cloudevents+json

### Response codes
- 200 OK: Events matching query set are returned
- 400 Bad Request: Invalid set of query parameters
  Refer to problem details in response body for further information.
- 401 Unauthorized: Indicates a missing, invalid or expired authorization header
- 403 Forbidden: Indicating is missing required scope for subscribing to events

## Examples

### Request

```http
curl \
--location 'https://platform.at23.altinn.cloud/events/api/v1/events?after=43860c25-6804-4e0c-99b2-0254373f9b16&resource=urn:altinn:resource:altinnapp.ttd.apps-test&size=2' \
--header 'Authorization: Bearer { Insert Altinn token}'
```


### Response

#### 200 OK

Headers:
```http
Content-Type: application/cloudevents+json; charset=utf-8
Next: https://platform.at23.altinn.cloud/events/api/v1/events?after=408f4021-b2c4-4cb4-a902-f1ab110ff861&resource=urn:altinn:resource:altinnapp.ttd.apps-test&size=2
```

Body:
```json
[
    {
        "specversion": "1.0",
        "id": "fc21314e-9ad8-4af2-8425-27ba741bfedd",
        "time": "2022-05-12T00:02:07.541482Z",
        "type": "automatedtest.triggered",
        "source": "https://github.com/Altinn/altinn-events/tree/main/test/k6",
        "subject": "/autotest/k6",
        "resource": "urn:altinn:resource:altinnapp.ttd.apps-test"
    },
    {
        "specversion": "1.0",
        "id": "408f4021-b2c4-4cb4-a902-f1ab110ff861",
        "time": "2022-05-12T00:02:07.541482Z",
        "type": "automatedtest.triggered",
        "source": "https://github.com/Altinn/altinn-events/tree/main/test/k6",
        "subject": "/autotest/k6",
        "resource": "urn:altinn:resource:altinnapp.ttd.apps-test"
    }
]
```

#### 400 Bad Request

```json
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "Bad Request",
    "status": 400,
    "detail": "The 'source' parameter must be defined.",
    "traceId": "00-75d93441fd5f8cbe1b243a36f44b0250-d5e2e4a323fe63a1-00"
}
```