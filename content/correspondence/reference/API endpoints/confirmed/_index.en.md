---
title: Confirm
linktitle: Confirm
description: Endpoint for giving the correspondence status "Confirmed".

weight: 60
toc: true
---

## Endpoint

POST /correspondence/api/v1/correspondence/{{correspondenceId}}/confirm

## Description

This endpoint sets the status of an existing correspondence to "Confirmed". The `IsConfirmationNeeded` field is a boolean value that is set to true if the correspondence requires confirmation. In practice, 
this means that if the due date is reached and the recipient has not confirmed, the sender will be notified. Before using this endpoint, the status of the correspondence must be "Fetched". 
This status means that the correspondence has been downloaded. This occurs when a recipient uses the overview or details request. 
The status of a correspondence can be checked by using the overview endpoint described [here](https://docs.altinn.studio/api/correspondence/spec/#/Correspondence/get_correspondence_api_v1_correspondence__correspondenceId_).

## Authentication

This API requires authentication, and the request must also include:

- Correspondence read scope __altinn:correspondence.read__ (for external system callers)

See [Authentication and Authorization](/notifications/reference/api/#authentication--authorization) for more information.

## Response

### Response codes
- 200 OK: The correspondence have been succesfully marked as confirmed

  Refer to problem details in response body for further information.
- 400 One or more validation errors occurred: Indicates that the correspondenceid was not found.

### Content-Type

- application/json

### Response body 

The response body consists of a GUID and contains the correspondence ID.

### Response body properties
Only returns the correspondence ID.