---
title: 'Service owner labels'
description: 'Reference information about the service owner label entity'
weight: 40
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

Service owner labels are custom tags used by service owners to categorize dialogs.

They are part of the service owner context and are not visible in end-user APIs.

## Rules

The current implementation enforces the following rules:

- labels are unique case-insensitively
- each label must be between 3 and 255 characters long
- a dialog can have at most 20 labels

Service owner labels can be supplied when creating a dialog through `serviceOwnerContext.serviceOwnerLabels`.

Dialogporten also uses service owner labels for certain integration-backed dialog types:

- dialogs representing Altinn App instances carry `urn:altinn:integration:storage:<partyId>/<instanceGuid>`
- dialogs referring to a single Altinn Correspondence carry `urn:altinn:correspondence:id:<correspondenceId>`

## Search behavior

[Dialog search]({{< relref "../dialog" >}}#search) supports filtering by one or more service owner labels.

- Multiple `serviceOwnerLabels` filters are combined with AND semantics
- Prefix matching is supported by ending the label with `*`, for example `finance*`

## Dedicated label endpoints

The dedicated label endpoints operate on the service owner context of a dialog.

- `GET` returns the current label set and the current service-owner-context revision in the `ETag` header
- `POST` adds one label
- `DELETE` removes one label

`POST` and `DELETE` support optimistic concurrency through `If-Match`, using the service-owner-context revision.

{{<swaggerdisplayoperation "post" "/api/v1/serviceowner/dialogs/{dialogId}/context/labels">}}

{{<swaggerdisplayoperation "get" "/api/v1/serviceowner/dialogs/{dialogId}/context/labels">}}

{{<swaggerdisplayoperation "delete" "/api/v1/serviceowner/dialogs/{dialogId}/context/labels/{label}">}}


{{<children />}}
