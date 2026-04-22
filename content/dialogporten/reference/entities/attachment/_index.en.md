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

Dialog-level attachments follow dialog-level authorization.

Transmission attachments follow transmission-level authorization. In end-user APIs, transmission attachment URLs are rewritten to `urn:dialogporten:unauthorized` when the user is not authorized to access the transmission.


{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogAttachment">}}

{{<children />}}
