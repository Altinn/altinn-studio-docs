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

This endpoint prepares and queues a correspondence for sending. Before using this endpoint, any correlating attachments must be uploaded beforehand to populate the "ExistingAttachments" field. This can be done by using the upload attachment endpoint described [here](https://docs.altinn.studio/api/correspondence/spec/#/Attachment/post_correspondence_api_v1_attachment__attachmentId__upload).

<!-- (will add link here when doc is ready) -->

## Authentication

This API requires authentication, and the request must also include:

- Correspondence write scope **altinn:correspondence.write** (for external system callers)

See [Authentication and Authorization](/notifications/reference/api/#authentication--authorization) for more information.

## Request

### Content-Type

application/json

### Request body

The request body must contain the correspondence request formatted as an [InitializeCorrespondencesRequest](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializeCorrespondencesExt.cs)

### Required request properties

#### correspondence

Type: [BaseCorrespondenceExt](/correspondence/reference/api-endpoints/initialize/basecorrespondenceext/)

The correspondence which is to be sent.


#### recipients

Type:  _List\<string>_

List of recipients for the correspondence. This can either be the organization number or the national identity number of the recipient.

For *organization numbers*, the recipients must include the prefix `urn:altinn:organization:identifier-no` in front of the organization number. Example `urn:altinn:organization:identifier-no:123456789`

For *national identity numbers*, the recipients must have the prefix `urn:altinn:person:identifier-no` in front of the identity number. Example `urn:altinn:person:identifier-no:01019912345`

### Optional request properties

#### existingAttachments

Type:  _List\<string>_

List of attachment ID(s) for the attachment(s) which should be included with the correspondence(s). These must be uploaded using the **attachment** endpoint beforehand.

## Response

### Response codes

- 200 OK: The correspondence has been successfully initialized
- 400 Bad Request: The request was invalid. Refer to problem details in the response body for further information.
- 401 Unauthorized: Indicates a missing, invalid, or expired authorization header.
- 403 Forbidden: Indicates that the required scope or Platform Access Token is missing or invalid.

### Content-Type

- application/json

### Response body

The response body returns a list of correspondences [InitializeCorrespondencesResponseExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializeCorrespondencesResponseExt.cs), with one correspondence for each recipient.
Find a short description of each property below.

#### correspondences
Type: [List\<InitializedCorrespondencesExt>](/correspondence/reference/api-endpoints/initialize/initializedcorrespondencesext/)

Information about the correspondences created in the request.
#### attachmentIds
Type: _List\<Guid>_


The IDs of the attachments that were included with the correspondences

<!-- ## Examples -->
