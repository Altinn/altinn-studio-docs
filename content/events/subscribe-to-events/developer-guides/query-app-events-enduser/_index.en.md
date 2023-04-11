---
title: Query app events as end user
linktitle: Query app events - end user
description: Developer guide on how to query app events as an end user or end user system
weight: 40
---

{{% notice warning %}}
Altinn Events enables event driven integration patterns, designed specifically to ***avoid*** the need for 
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
- id of the event last retrieved, type: string

Result set will include events registered after the provided event id in chronological order

#### from
- the lower limit for when the cloud event was registered in UTC, type: string(date-time)
  
Accepted format is  `2023-06-16 08:22:19Z`

#### to
- the upper limit for when the cloud event was registered in UTC, type: string(date-time)
  
Accepted format is  `2023-06-16 08:22:19Z`

#### party
- the party id representing the subject of the cloud event

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

Contains a header `next`. 

### Supported content-types

### Response codes


## Examples

### Request
```bash
curl \
--location 'https://platform.at22.altinn.cloud/events/api/v1/app/party?after=5b9a8887-0023-4f07-8791-d98e15a3542b' \
--header 'Person: 16069412345' \
--header 'Authorization: Bearer {Insert Altinn token}'
```
### Response

