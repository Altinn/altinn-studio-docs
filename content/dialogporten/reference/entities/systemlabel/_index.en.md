---
title: 'System label'
description: 'Reference information about the system label entity'
weight: 40
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

System labels are predefined end-user context labels used by frontends to organize dialogs into folders or sorting categories (e.g., Sent, Bin, Archive).

| SystemLabel          | Description                                                                                                                                                                             |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Default**          | Mutually exclusive with Bin/Archive                                                                                                                                                     |
| **Bin**              | Mutually exclusive with Default/Archive                                                                                                                                                 |
| **Archive**          | Mutually exclusive with Default/Bin                                                                                                                                                     |
| **Sent**             | Automatically added by Dialogporten when a transmission of type <br/>`Submission` or `Correction` is added to the dialog.<br/>Cannot be added or removed by service owners or end users |
| **MarkedAsUnopened** | Marks a dialog as unopened/unread. Can be set and removed by service owners and end users                                                                                     |

**Default**/**Bin**/**Archive** are required system labels. They are mutually exclusive, meaning that a dialog can only have one of these labels at a time.
If you remove `Bin` or `Archive`, `Default` is added automatically unless `Bin` or `Archive` is also being added in the same request.

`MarkedAsUnopened` affects unread semantics. A dialog is considered content-seen only if it has been retrieved after its last content update and it does not have `MarkedAsUnopened`.

If you are bulk changing system labels, use `addLabels` and `removeLabels`.

*Note: The `systemLabels` property on the below entities are deprecated. Use the `addLabels` and `removeLabels` properties instead.*

## End-user operations

End users can update system labels through REST and GraphQL.

- REST: `PUT /api/v1/enduser/dialogs/{dialogId}/context/systemlabels`
- REST bulk update: `POST /api/v1/enduser/dialogs/context/systemlabels/actions/bulkset`
- GraphQL: `setSystemLabel`
- GraphQL bulk update: `bulkSetSystemLabels`

The REST endpoints use the end-user-context revision for optimistic concurrency through `If-Match`. Successful single-dialog updates return the new revision in the `ETag` header.

{{<swaggerdisplayoperation "put" "/api/v1/enduser/dialogs/{dialogId}/context/systemlabels">}}

{{<swaggerdisplayoperation "post" "/api/v1/enduser/dialogs/context/systemlabels/actions/bulkset">}}

## Service-owner operations

Service owners can also update end-user system labels through dedicated service-owner endpoints:

- `PUT /api/v1/serviceowner/dialogs/{dialogId}/endusercontext/systemlabels`
- `POST /api/v1/serviceowner/dialogs/endusercontext/systemlabels/actions/bulkset`

These endpoints also use the end-user-context revision for optimistic concurrency.

When using the service-owner endpoints:

- `endUserId` is required unless `performedBy` is supplied
- if `performedBy` is supplied, `endUserId` must be omitted

{{<swaggerdisplayoperation "put" "/api/v1/serviceowner/dialogs/{dialogId}/endusercontext/systemlabels">}}

{{<swaggerdisplayoperation "post" "/api/v1/serviceowner/dialogs/endusercontext/systemlabels/actions/bulkset">}}

## Label assignment log

Dialogporten exposes a label assignment log for end-user context changes:

- endpoint: `GET /api/v1/enduser/dialogs/{dialogId}/context/labellog`
- entries are returned in chronological order
- each entry contains `createdAt`, `name`, `action`, and `performedBy`

The implementation records `set` and `remove` actions for non-default system labels.

{{<swaggerdisplayoperation "get" "/api/v1/enduser/dialogs/{dialogId}/context/labellog">}}

## Service-owner search for end-user context

If you need current end-user context state without retrieving the full dialog search result, the service-owner API exposes:

- `GET /api/v1/serviceowner/dialogs/endusercontext`

This endpoint is paginated and returns:

- `dialogId`
- `endUserContextRevision`
- `systemLabels`

The implemented filters are:

- `party`
- `label`
- `contentUpdatedAfter`

{{<swaggerdisplayoperation "get" "/api/v1/serviceowner/dialogs/endusercontext">}}

{{<swaggerdisplayentity "V1ServiceOwnerEndUserContextCommandsBulkSetSystemLabels_BulkSetSystemLabel">}}

{{<swaggerdisplayentity "V1ServiceOwnerEndUserContextCommandsSetSystemLabel_SetDialogSystemLabelRequest">}}


{{<children />}}
