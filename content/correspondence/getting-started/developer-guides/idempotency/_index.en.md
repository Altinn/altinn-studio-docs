---
title: Idempotency in Altinn 3 Correspondence
linktitle: Idempotency
description: How to make sure Altinn only creates a correspondence once, even if your system sends the request several times
tags: [Correspondence, guide, idempotency, idempotentKey, duplicates]
toc: true
weight: 50
---

{{<children />}}

The `idempotentKey` field makes sure Altinn only creates a correspondence once, even if your system sends the same request several times. **We recommend that every sender uses this field.**

Without the key, Altinn cannot tell whether a request is a duplicate. If your integration sends the request again after a timeout or another error, Altinn may create a new correspondence. The recipient then gets two identical messages in their inbox and one notification for each of them.

## How idempotentKey works

`idempotentKey` is a GUID you include when you create a correspondence. Altinn stores the key together with the correspondence, and

- the first request with a given key creates the correspondence and receives `200 OK`
- every later request with the same key is rejected with `409 Conflict` and error code 1034
- rejected requests create neither a correspondence nor a notification

Altinn checks the key before anything is created. If several requests arrive with the same key at exactly the same time, only one of them wins. The others get `409 Conflict`.

The key never expires. It applies indefinitely, and it is shared across all of Altinn Correspondence.

### Include the key in the request

`idempotentKey` sits at the top level of the request, alongside `correspondence` and `recipients`:

```json
POST /correspondence/api/v1/correspondence

{
  "correspondence": { ... },
  "recipients": ["urn:altinn:organization:identifier-no:123456789"],
  "existingAttachments": [],
  "idempotentKey": "6b1f4c8e-3a2d-5f7b-9c04-1e8a5d2b7f36"
}
```

### Create a stable key

The key only works if it is the same every time your system tries to send the same correspondence. If you create a new unique key immediately before each call, for example with `Guid.NewGuid()`, duplicate requests each get their own key, and the safeguard disappears.

The key could for example be

- a UUID v5 derived from a fixed namespace and data that identifies the send, such as the resource ID, the recipient and a case number
- a random GUID, such as UUID v7, that you store before you call the API

A UUID v5 comes out the same every time, without you storing anything. A UUID v7 is time-ordered and works well as a database ID, but the value is random, so you have to store it to find it again on later attempts.

### Find the correspondence that already exists

The `409` response does not contain the ID of the correspondence that already exists. If you need it, look it up using the key:

```
GET /correspondence/api/v1/correspondence?resourceId=<resource-id>&role=Sender&idempotentKey=<key>
```

The response contains the ID of the correspondence. If no correspondence exists with that key, you get an empty list.

## Limitations

- `idempotentKey` only works for requests with a single recipient. If you have several recipients, send one request per recipient, each with its own key. You cannot use the key with [batch sending]({{< relref "/correspondence/explanation/basic-concepts" >}}).
- Altinn does not compare the content of the correspondence. If you send different content with the same key, you get `409 Conflict`, and the correspondence created first remains unchanged. The key identifies the send, not the content.
- Purging a correspondence does not release the key. The same key still returns `409 Conflict`.
