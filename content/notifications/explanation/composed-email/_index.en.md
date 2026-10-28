---
title: Composed email orders
description: "Composed email orders let you send email with file references through the Composed Notifications API."
linktitle: Composed email orders
tags: [composed email, attachments, sas, notifications]
weight: 45
---

## What are composed email orders?

Composed email orders are a variant in Altinn Notifications where you send email directly to an email address and include attachments by reference. The API does not upload attachment content. Instead, you provide SAS URLs, and the API fetches the files when the email is sent.

## When should you use composed email orders?

Use composed email orders when you need to:

- Send email with one or more attachments (via SAS URL references)
- Control email subject and body directly in the request
- Schedule sending with `requestedSendTime`
- Send to a direct email recipient rather than via recipient lookup

## Technical characteristics

### File references with SAS URLs

Each attachment must include a SAS URL. At send time, The API retrieves the file from Azure Blob Storage. This means the file must remain available until the message is processed.

The `attachments` list is optional. If it is null or empty, the email is sent without attachments. If attachments are included, each item must satisfy the SAS URL and attachment validation rules.

### Validation at API boundary

Each SAS URL is validated before the order is accepted. The API checks that:

- The URL scheme is `https`
- The host ends with `.blob.core.windows.net`
- The query includes `se`, `sig`, `sp`, and `sr`
- The `sr` query parameter is set to `b` (blob resource)
- The `sp` query parameter contains `r` (read permission)
- The `se` query parameter can be parsed as a valid date and time

The API also validates attachment metadata:

- Filename must not include path separators (`/`, `\`) and must include a file extension

### Send time and expiry buffer

SAS URL expiry must be at least 15 minutes after `requestedSendTime`. This buffer reduces risk of fetch failure if there is a short delay between scheduling and file retrieval.

### Scope model

Composed email orders require `altinn:serviceowner/notifications.composedemail.create`.

This scope is separate from `altinn:serviceowner/notifications.create`, which gives access to the Notifications and Instant Notifications APIs.

### Idempotency and responses

As with other order types, you use `idempotencyId` to avoid duplicate sends on retries.

The API returns `201 Created` for first successful processing and `200 OK` for idempotent replay.

## Next steps

- Read the [guide for composed email orders](/en/notifications/guides/composed-email/) to implement this in your service
- Explore the [OpenAPI specification](/en/notifications/reference/openapi/) for endpoint-level details
