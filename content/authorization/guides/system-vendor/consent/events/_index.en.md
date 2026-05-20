---
title: List consent events
linktitle: List consent events for the enterprise
weight: 10
toc: false
---

## Prerequisites

1. The data consumer must have a registered Maskinporten client.
2. The data consumer must have been delegated the consent scope from Digdir. (altinn:consentrequests.read)
3. The necessary scopes must be added to the Maskinporten client.

## API Endpoint

Returns a paginated list of consent events for the authenticated enterprise. 
Results are ordered by eventid, oldest first. By default, the API returns up to 100 changes per request.
This endpoint uses cursor-based pagination, so call the endpoint without a ContinuationToken to get the first page.
- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/events`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/events`

## Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ContinuationToken | string | No | Opaque cursor from the nextLink of a previous response. Used for pagination.|
| createdAfter | Datetimeoffset | No | Filters events created at or after this timestamp |
| createdBefore | Datetimeoffset| No | Filters events created before this timestamp |
| EventType | string[] | No | Filters by event type. Repeatable: eventType=accepted&eventType=revoked. |
| ConsentRequestID | Guid | No | Filters events belonging to a specific consent request. |

Note: createdAfter must be strictly less than createdBefore if both are provided.

## Pagination
- Results are ordered oldest first (ascending by event ID, event id is of type UUIDv7 and therefore sorted by time).
- Only events created more than 5 minutes ago are returned to ensure consistency.
- Page size is 100.
- If a nextLink is present in the response, follow it to retrieve the next page. A nextLink may be present even when the next page is empty.
- The ContinuationToken is a Base64-encoded UUIDv7 GUID (16-byte UUID).


## Request/Response Example
**First page**
`GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/events`

`Authorization: Bearer <maskinporten_token>`

```jsonc
{
  "links": {
    "next": "https://<host>/accessmanagement/api/v1/enterprise/consentrequests/events?continuationToken=MjAyNS0wNS0wNFQxMDozMDowMCswMjowMHwzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTY%3D"
  },
  "data": [
    {
      "consentRequestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "eventType": "accepted",
      "changedDate": "2025-05-04T10:30:00+02:00"
    }
  ]
}
```

**Next Page**
`GET /accessmanagement/api/v1/enterprise/consentrequests/events?continuationToken=MjAyNS0wNS0wNFQxMDozMDowMCswMjowMHwzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTY%3D`

`Authorization: Bearer <maskinporten_token>`

```jsonc
{
  "links": {
    "next": "https://<host>/accessmanagement/api/v1/enterprise/consentrequests/events?continuationToken=MjAyNS0wNS0wNFQxMDozMDowMCswMjowMHwzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTY%3D"
  },
  "data": [
    {
      "consentRequestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "eventType": "accepted",
      "changedDate": "2025-05-04T10:30:00+02:00"
    }
  ]
}
```
### Response Fields

| Response Field | Type | Description |
|----------------|------|-------------|
| data[].consentRequestId | Guid | The ID of the consent request this event belongs to. |
| data[].eventType | string | the type of status event. Events: accepted, rejected, revoked, deleted, used. |
| data[].changedDate | Datetimeoffset | the timestamp of when the status change occured.|
| links.next | | URL to fetch the next page. |

### Next
Present only when more results are available. Re-issue the URL as-is to get the next page. The original filter parameters (ConsentRequestID, createdAfter, createdBefore, EventType) are preserved in the next link.

### Event Types
| Value | Description |
|-------|-------------|
| accepted | The consent request was accepted by the consenting party. |
| rejected | The consent was rejected. |
| revoked | The consent was revoked. |
| Deleted | The consent request was deleted |
| used | The consent was used/consumed. |

## Error Responses

| StatusCode | Description |
|------------|-------------|
|401 Unauthorized|Missing or invalid authentication token.|
|403 Forbidden|Authenticated party is not authorized.|
|400 Bad Request|Invalid query parameters. See the ProblemDetails body for details.|
|500 Internal Server Error|Unexpected server-side error.|