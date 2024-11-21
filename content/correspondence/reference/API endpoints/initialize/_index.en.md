---
title: Initialize
linktitle: Initialize
description: Endpoint for initializing a correspondence.

weight: 60
toc: true
---

## Endpoint

POST /correspondence/api/v1/correspondence

## Description
This endpoint prepares and queues a correspondence for sending. Before using the endpoint and attachment must be uploaded by using the following endpoint in order to populate the "ExistingAttachments" field:

/correspondence/api/v1/attachment/{{attachmentId}}/upload     

(will add link here when doc is ready)


## Authentication

This API requires authentication and the request must also include one of the following:

- Correspondence write scope __altinn:correspondence.write__ (for external system callers)
- Platform Access Token (for Altinn Apps and internal Altinn systems)

See [Authentication and Authorization](/notifications/reference/api/#authentication--authorization) for more information.

## Response

### Response codes
- 200 OK: The correspondence have been succesfully initialized

  Refer to problem details in response body for further information.
- 401 Unauthorized: Indicates a missing, invalid or expired authorization header.
- 403 Forbidden: Indicates that required scope or Platform Access Token is missing or invalid.

### Content-Type
- application/json

### Response body 
The response body is formatted as an 

[InitializeCorrespondenceResponseExt](https://docs.altinn.studio/api/correspondence/spec/#/Correspondence/post_correspondence_api_v1_correspondence)
and serialized as a JSON string.


### Response body properties

#### correspondenceId
Type: _Guid_

The ID of the correspondence that has been initialized

#### status
Type: _string_

Shows the status of the initialized correspondence

#### recipient
Type: _string_

Shows the recipient on the format 0192:{{senderOrgNo}}


#### notifications
Type: _List of [InitializedCorrespondencesNotificationsExt](https://docs.altinn.studio/api/correspondence/spec/#/Correspondence/post_correspondence_api_v1_correspondence)_

A list of the generated notifications with send result.
Each notification will include the following properties: 
  - _orderId_: the ID of the order.
  - _isReminder_: a boolean indicating whether the notification is a reminder or not.
  - _status_: shows the status of the notification.

| Status                        | Description       |
|:-----------------------------:|:-----------------:|
| Success                       | Means that the notification order was created successfully with contactinformation.|
| MissingContact                | Contact information was not not found at the time of creating the correspondence.|
| Failure                       | Creating notification order failed.|
