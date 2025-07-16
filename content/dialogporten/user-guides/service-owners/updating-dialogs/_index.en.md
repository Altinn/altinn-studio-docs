---
title: 'Updating dialogs'
description: 'How to update a dialog in Dialogporten'
weight: 30
---

## Introduction

Updating dialogs as the business process advances, or if any relevant business event occurs, is central to the Dialogporten
 concept, allowing users to easily keep updated on the process, and end-user systems to immediately react to any business event
 defined by the service owner, allowing for rich and non-poll-based integrations to internal systems.

Most fields of the dialog can be changed after [dialog creation]({{<relref "../creating-dialogs">}}), with some notable exceptions.

* Party and service resource cannot be changed
* Created/updated fields cannot be changed
* Activities and transmissions are non-mutable (ie. existing entries cannot be deleted or changed)

### Content updates

Dialogporten differentiates between "content updates" and all other updates. A content update is considered any update to

- Status
- Extended status
- Any content-field members, ie. `title`, `summary`, `additionalInfo`, `sendersName`, `extendedStatus` or `mainContentReference`
- Attachments
- Actions (both GUI or API)
- Transmissions

Dialogs contain separate fields for the timestamp of the lastest content update (`contentUpdatedAt`), and for any update (`updatedAt`). 
So changes to ie. the activity list will bump the `updatedAt` field, but _not_ the `contentUpdatedAt` field. This means that `contentUpdatedAt` may
refer to an earlier point in time than `updatedAt`. It can never newer than `updatedAt`, as any change will bump `updatedAt`.

End-user systems that display lists of dialogs to users are encouraged to [sort]({{<relref "../../searching-for-dialogs#ordering">}}) by `contentUpdatedAt` in descending order.

## Basic steps

1. [Find the dialog]({{<relref "../../searching-for-dialogs">}}) you want to update
2. Construct a request body containing the fields you want to updated
3. Send a PUT or PATCH request. Successfull requests return `204 No Content`, while user errors (4xx return codes) return a [RFC9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457.html) reponse body.

## Using PUT and full request bodies

See the [reference documentation]({{<relref "../../../reference/entities/dialog/#update-put">}}) for details on the request body. Fields supplied 
that are not present in the PUT DTO definition will be ignored.

{{<notice warning>}}
As the list of transmissions and activities are immutable, you should NOT supply the existing entries, but leave the arrays empty or omit the fields 
completely unless you intend to add new transmissions and/or activities.
{{</notice>}}

## Using PATCH for concise updates

Dialogporten also supports PATCH operations, which allows a more concise request only containing the fields you want to alter. This can result in smaller 
request bodies, and can in some cases eliminate the need to GET the dialog first in order to construct the PUT DTO.

See the [reference documentation]({{<relref "../../../reference/entities/dialog/#update-patch">}}) for details and examples on how to construct a PATCH request.

## Separate endpoints for transmissions and activities

For a given dialog, the list of transmissions and activities are available on separate resource endpoints:
* `/api/v1/serviceowner/dialogs/{dialogId}/transmissions` 
* `/api/v1/serviceowner/dialogs/{dialogId}/activities`

These endpoints support `POST` where individual tranmssions and activities can be added one at a time. `POST` requests to these endpoints also support concurrency control as described below.

Each individual transmissions/activity is available by append the transmission-id/activity-id to the above endpoints. Only `GET` requests are supported for these endpoints.

## Concurrency control with conditional requests

To ensure data consistency when updating dialogs, Dialogporten uses optimistic concurrency control based on the `ETag` header. The `ETag` value corresponds to the `revision` field on the dialog object.

When performing an update, include the `If-Match` header in your request, setting its value to the current `ETag` of the dialog. This ensures that the update will only succeed if the dialog has not been modified since you last retrieved it.

### Example

1. Retrieve the dialog to get its current `ETag` value (found in the `revision` field).
2. Include the `If-Match` header with the `ETag` value in your PUT or PATCH request.

#### Sample request with `If-Match` header:
```http
PATCH /api/v1/serviceowner/dialogs/{dialogId}
Content-Type: application/json-patch+json
If-Match: "86ea8715-05f5-4a4e-8bf7-91840e06dee5"

[
    {
        "op": "replace",
        "path": "/status",
        "value": "Completed"
    }
]
```

If the value supplied in the `If-Match`-header does not match the current revision id for the supplied dialog, a `412 Precondition Failed` response is returned.

## Silent updates

In some cases, typically when correcting errors, it is desirable to perform a non-business-process related update to a dialog. These updates work exactly like normal updates, but 
* Does not bump `updatedAt` or `contentUpdatedAt`
* Does not cause Altinn Events to be produced

This behaviour can be enabled by added the query parameter `?isSilentUpdate=true` to the URL for the POST/PUT/PATCH request.

**Read more**
- {{<link "../creating-dialogs">}}
- [If-Match header on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/If-Match)

{{<children />}}
