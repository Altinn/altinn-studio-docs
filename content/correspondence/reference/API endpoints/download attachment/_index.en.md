---
title: Download attachment
linktitle: Download attachment
description: Endpoint for downloading a correspondence attachment.

weight: 60
toc: true
---

## Endpoint

GET /correspondence/api/v1/correspondence/{{correspondenceId}}/attachment/{{attachmentId}}/download

## Description

This endpoint allows you to download a specific attachment for the correspondence. 
Before using this endpoint, the correspondence status must be "Published". 
You can check the status of a correspondence by using the overview or details endpoint described [here](https://docs.altinn.studio/api/correspondence/spec/#/Correspondence/get_correspondence_api_v1_correspondence__correspondenceId_).

## Authentication

This API requires authentication, and the request must also include:

- Correspondence read scope __altinn:correspondence.read__ (for external system callers)

See [Authentication and Authorization](/notifications/reference/api/#authentication--authorization) for more information.

## Response

### Response codes
- 200 OK: The attachment has been downloaded succesfully.

  Refer to problem details in response body for further information.
- 400 One or more validation errors occurred: Indicates that the correspondenceid or the attachmentid was not found.

### Content-Type

- application/json

### Response body 

The response body consists of the attachment content.
