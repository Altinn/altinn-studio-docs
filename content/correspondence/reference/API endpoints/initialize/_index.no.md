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
This endpoint prepares and queues a correspondence for sending. Before using this endpoint any correlating attachments must be uploaded beforehand to populate the "ExistingAttachments" field. This can be done by using the upload attachment endpoint described [here](https://docs.altinn.studio/api/correspondence/spec/#/Attachment/post_correspondence_api_v1_attachment__attachmentId__upload).

<!-- (will add link here when doc is ready) -->

## Authentication

This API requires authentication and the request must also include:

- Correspondence write scope __altinn:correspondence.write__ (for external system callers)
See [Authentication and Authorization](/notifications/reference/api/#authentication--authorization) for more information.

## Request body
[You can se example of a request body here](https://docs.altinn.studio/api/correspondence/spec/#/Correspondence/post_correspondence_api_v1_correspondence)


## Response

### Response codes
- 200 OK: The correspondence have been succesfully initialized

  Refer to problem details in response body for further information.
- 401 Unauthorized: Indicates a missing, invalid or expired authorization header.
- 403 Forbidden: Indicates that required scope or Platform Access Token is missing or invalid.

### Content-Type
- application/json

### Response body 
The response body returns a list of correspondences [InitializeCorrespondencesResponseExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializeCorrespondencesResponseExt.cs), 
with one correspondence for each recipient. Each correspondence can have multiple different recipients where each recipients will be given a unique correspondenceId, status, etc.

### Response body properties

#### correspondenceId
Type: _Guid_

The ID of the correspondence that has been initialized

#### status
Type: _string_ 

[The different statuses are defined here](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/Enums/CorrespondenceStatusExt.cs)

Shows the status of the initialized correspondence

#### recipient
Type: _string_

Shows the recipient on the format 0192:{{recipientOrgNumber}}


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
