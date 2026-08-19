---
title: 'Attachment'
description: 'Reference information about the attachment entity'
weight: 25
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

Attachments represent logical files plus one or more concrete URL representations of those files.

An attachment consists of:

- metadata such as `displayName` and optional logical `name`
- one or more URLs in `urls`
- optional `expiresAt`

Each URL represents one concrete attachment representation and can vary by:

- `mediaType`
- `consumerType`

This allows the same logical attachment to be exposed in different formats for different consumers, for example a PDF for GUI frontends and JSON or XML for API consumers.

Attachments can exist at two levels:

- on the dialog root
- on individual transmissions

Dialog-level attachments follow dialog-level authorization by default, but can carry their own [authorization context]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) to narrow access further - access to the dialog remains a precondition.

Transmission attachments follow transmission-level authorization by default, with the same option to carry their own authorization context - access to the transmission remains a precondition. In end-user APIs, an attachment's URLs are rewritten to `urn:dialogporten:unauthorized` when the user is not authorized to access it, or further redacted if its `unauthorizedPresentation` is `Redacted`. `contextToken` is present when the attachment carries an authorization context the current user is authorized for, and must be used instead of the dialog token against its URLs.


{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogAttachment">}}

**Read more**

- {{<link "../../authorization/authorization-contexts">}}
- {{<link "../../authorization/context-tokens">}}

{{<children />}}
