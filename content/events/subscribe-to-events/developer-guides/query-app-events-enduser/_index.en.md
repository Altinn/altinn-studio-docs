---
title: Query app events as end user
linktitle: Query app events - end user
description: Developer guide on how to query app events as an end user or end user system
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

GET /app/party

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

#### source
- the event sources to include, type: array[string]

The source parameter supports wildcard _%_ to escape unknown number of characters
e.g. _https://digdir.apps.altinn.no/digdir/%_

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
--location 'https://platform.altinn.no/events/api/v1/app/party?after=5b9a8887-0023-4f07-8791-d98e15a3542b' \
--header 'Person: 07124912037' \
--header 'Authorization: Bearer {Insert Altinn token}'
```

### Response


#### 200 OK
If the result set contains events that you are authorized to receive, the response object will look like below,
if no events match your query or you aren't authorized to read the event, and empty array '[]' will be returned.

Headers:
```http
Content-Type: application/cloudevents+json; charset=utf-8
Next: https://platform.altinn.no/events/api/v1/app/party?after=3d529b03-ff67-4e98-9cfb-387df4b09f82

Body:
```json
[
	{
		"specversion": "1.0",
		"id": "3ebaa1a2-9113-4905-ab26-a84fc3ec8acc",
		"time": "2023-04-11T08:58:35.185428Z",
		"source": "https://ttd.apps.altinn.no/ttd/apps-test/instances/50002598/d67239bd-3b43-479d-afeb-125a9209f4ac",
		"subject": "/party/50002598",
		"type": "app.instance.created",
		"alternativesubject": "/person/07124912037"
	},
	{
		"specversion": "1.0",
		"id": "3d529b03-ff67-4e98-9cfb-387df4b09f82",
		"time": "2023-04-11T08:59:24.4701492Z",
		"source": "https://ttd.apps.altinn.no/ttd/apps-test/instances/50002598/d67239bd-3b43-479d-afeb-125a9209f4ac",
		"subject": "/party/50002598",
		"type": "app.instance.process.completed",
		"alternativesubject": "/person/07124912037"
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
	"detail": "Subject must be specified using either query params party or unit or header value person.",
	"traceId": "00-7d18efb9ae1304c96884676e3de17fe2-b987907d01983550-00"
}
```
