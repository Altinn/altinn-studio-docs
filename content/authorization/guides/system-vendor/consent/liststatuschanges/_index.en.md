---
title: List latest status changes for consent
linktitle: List latest status changes for consent
weight: 10
toc: false
---

## Prerequisites

1. The data consumer must have a registered Maskinporten client.
2. The data consumer must have been delegated the consent scope from Digdir. (altinn:consentrequests.read)
3. The necessary scopes must be added to the Maskinporten client.

## API Endpoint

Returns a paginated list of consent requests that have had recent status changes for the authenticated enterprise. 
Results are ordered by the latest status change, newest first. By default, the API returns up to 100 changes per request.
This endpoint uses cursor-based pagination, so call the endpoint without a ContinuationToken to get the first page.
- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/latestchanges`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/latestchanges`

## Request/Response Example
**First page**
`GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/latestchanges`

`Authorization: Bearer <maskinporten_token>`

```jsonc
{
  "links": {
    "next": "https://<host>/accessmanagement/api/v1/enterprise/consentrequests/latestchanges?continuationToken=MjAyNS0wNS0wNFQxMDozMDowMCswMjowMHwzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTY%3D"
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
`GET /accessmanagement/api/v1/enterprise/consentrequests/latestchanges?continuationToken=MjAyNS0wNS0wNFQxMDozMDowMCswMjowMHwzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTY%3D`

`Authorization: Bearer <maskinporten_token>`

```jsonc
{
  "links": {
    "next": "https://<host>/accessmanagement/api/v1/enterprise/consentrequests/latestchanges?continuationToken=MjAyNS0wNS0wNFQxMDozMDowMCswMjowMHwzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTY%3D"
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

| Response Field | Description |
|----------------|-------------|
|links.next|URL to fetch the next page. null if there are no more results.|
|data[].consentRequestId|Unique identifier of the consent request.|
|data[].eventType|the type of status event. Events: accepted, rejected, revoked, deleted, used. Event created/expired will not be listed as it is not a status change.|
|data[].changedDate|the timestamp of when the status change occured.|


## Error Responses

| StatusCode | Description |
|------------|-------------|
|401 Unauthorized|Missing or invalid authentication token.|
|403 Forbidden|Authenticated party is not authorized.|
|400 Bad Request|Invalid query parameters. See the ProblemDetails body for details.|
|500 Internal Server Error|Unexpected server-side error.|