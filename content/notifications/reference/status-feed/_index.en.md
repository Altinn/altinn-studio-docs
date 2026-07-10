---
title: Status feed for notification orders
linktitle: Status feed
description: Reference for the status feed endpoint in Altinn Notifications
weight: 25
toc: true
---

The status feed gives service owners a sequential feed of status updates for
their notification orders. Instead of polling each shipment individually
(`/future/shipment/{id}`), you read all status changes for your organisation
from a single endpoint and use a sequence number to keep track of how far you
have read.

```http
GET /notifications/api/v1/future/shipment/feed
```

Each entry in the feed has a `sequenceNumber` that increases for every new
status update. The feed only contains entries for your own organisation.

## Query parameters

| Parameter  | Type             | Default | Description                                                                                    |
|------------|------------------|---------|------------------------------------------------------------------------------------------------|
| `seq`      | integer (≥ 0)    | `0`     | Sequence number used as a cursor for pagination. Which entries are returned depends on `orderBy`. |
| `pageSize` | integer          | `500`   | Maximum number of entries per page. Values are limited to the range 1–500.                     |
| `orderBy`  | `asc` or `desc`  | `asc`   | Sort direction for the returned entries.                                                       |

## Pagination

The `seq` parameter is an exclusive cursor: the entry with a sequence number
equal to `seq` is never included in the response.

### Ascending order (default)

With `orderBy=asc`, the endpoint returns entries with a sequence number
**greater than** `seq`, sorted from oldest to newest.

To read the feed forwards:

1. Call the endpoint with the last sequence number you have processed as
   `seq`, or `0` to start from the beginning of the feed.
2. Process the entries and keep the highest `sequenceNumber` from the
   response.
3. Repeat with `seq` set to this value. An empty response means there are no
   new updates yet.

### Descending order

With `orderBy=desc`, the endpoint returns entries with a sequence number
**less than** `seq`, sorted from newest to oldest. The exception is `seq=0`
(or omitted), which returns the most recent entries in the feed.

To page backwards, use the lowest `sequenceNumber` from the previous response
as the next `seq`.

### Finding the current tail of the feed

When you start consuming the feed for the first time, or after a long period
of downtime, you often want to skip historical entries and start from the most
recent update. Call the endpoint with `orderBy=desc` and without `seq`:

```http
GET /notifications/api/v1/future/shipment/feed?orderBy=desc&pageSize=1
```

The first entry in the response is the most recent one. Use its
`sequenceNumber` as the starting point (`seq`) for subsequent polling with
`orderBy=asc`.

## Response

The response is an array of status feed entries. Each entry contains the
sequence number and the same status object as `/future/shipment/{id}`:

```json
[
  {
    "sequenceNumber": 1523,
    "shipmentId": "c1d034c5-6af7-4813-aff7-920ab02e27b2",
    "sendersReference": "b6030a4e-93a3-489f-8478-85618d198745",
    "type": "Notification",
    "status": "Order_Completed",
    "lastUpdate": "2026-02-04T11:33:09.64992Z",
    "recipients": [
      {
        "type": "Email",
        "destination": "nullstilt@altinn.xyz",
        "status": "Email_Delivered",
        "lastUpdate": "2026-02-04T11:33:09.64992Z"
      }
    ]
  }
]
```

The status values are described in the reference for
[status values for orders and notifications]({{< relref "/notifications/reference/notification-status" >}}).
