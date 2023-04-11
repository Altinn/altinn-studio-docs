---
title: Query app events as application owner
linktitle: Query app events - org
description: Developer guide on how to query app events as an application owner
weight: 40
---


{{% notice warning %}}
Altinn Events enables event driven integration patterns, designed specifically to __avoid__ the need for
continuously requesting resources, also known as 'polling'. <br/> <br/>
However, in order to allow for smooth and incremental architectural migrations,
the Events API also provides an HTTP API for scheduled requests of the same event data you hopefully
will receive via webhooks in the future.
{{% /notice %}}


## Endpoint

GET /app/{org}/{app}

where {org}/{app} makes up the application ID for the app resource you want to retrieve events for.

## Authentication

This API requires authentication.

See [Authentication and Authorization](../../../api/#authentication--authorization) for more information.


## Request

### Query parameters & headers

#### after
- ID of the event last retrieved, type: string

Result set will include events registered after the provided event ID in chronological order

#### from
- the lower limit for when the cloud event was registered in UTC, type: string(date-time)

Accepted format is  `2023-02-16T18:00Z`

#### to
- the upper limit for when the cloud event was registered in UTC, type: string(date-time)

Accepted format is  `2023-02-16T18:00Z`

#### party
- the party ID representing the subject of the cloud event

#### unit
- the organisation number representing the unit in the cloud event's alternative subject

#### person (header)
- the person number representing the person in the cloud event's alternative subject

#### type
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

## Examples

### Request
```bash
curl \
--location 'https://platform.altinn.no/events/api/v1/app/ttd/apps-test?from=2023-02-16T18:00Z&size=2' \
--header 'Authorization: Bearer {Insert Altinn token}'
```

### Response


#### 200 OK
If the result set contains events that you are authorized to receive, the response object will look like below,
if no events match your query or you aren't authorized to read the event, and empty array '[]' will be returned.

Headers:
```http
Content-Type: application/cloudevents+json; charset=utf-8
Next: https://platform.altinn.no/events/api/v1/app/ttd/apps-test?after=fc12dc69-fcd4-43c6-9fde-b94fcdcc3597&from=2023-02-16T18:00Z&size=2
```

Body:
```json
[
	{
		"specversion": "1.0",
		"id": "cf7577ad-7ae6-498f-bc48-0704bd895b41",
		"time": "2023-02-16T18:02:11.0276259Z",
		"source": "https://ttd.apps.at22.altinn.cloud/ttd/apps-test/instances/50019855/f21e491f-f862-4776-b81f-725657ef0a18",
		"subject": "/party/50019855",
		"type": "app.instance.created",
		"alternativesubject": "/person/16035001577"
	},
	{
		"specversion": "1.0",
		"id": "fc12dc69-fcd4-43c6-9fde-b94fcdcc3597",
		"time": "2023-02-16T18:02:12.8660282Z",
		"source": "https://ttd.apps.at22.altinn.cloud/ttd/apps-test/instances/50019855/f21e491f-f862-4776-b81f-725657ef0a18",
		"subject": "/party/50019855",
		"type": "app.instance.process.completed",
		"alternativesubject": "/person/16035001577"
	}
]
```

#### 400 Bad Request
Response contains a problem details object with the error message listed within the errors property.
```json
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "Bad Request",
    "status": 400,
    "detail": "The 'From' or 'After' parameter must be defined.",
    "traceId": "00-f4b14cafa151f01e81d227de85be4c89-f13652f55cdfaa7e-00"
}
```

