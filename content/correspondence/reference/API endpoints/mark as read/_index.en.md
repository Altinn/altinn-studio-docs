---
title: Mark as read
linktitle: Mark as read
description: Endpoint for giving the correspondence status "Read".

weight: 60
toc: true
---

## Endpoint

POST /correspondence/api/v1/correspondence/{{correspondenceId}}/markasread

## Description

This endpoint sets the status of an existing correspondence to "Read". Before using this endpoint, the status of the correspondence must be "Fetched". This status means that the correspondence has been downloaded. This occurs when a recipient uses the overview or details request. The status of a correspondence can be checked by using the overview endpoint described [here](https://docs.altinn.studio/api/correspondence/spec/#/Correspondence/get_correspondence_api_v1_correspondence__correspondenceId_).

## Authentication

This API requires authentication, and the request must also include:

- Correspondence read scope __altinn:correspondence.read__ (for external system callers)

See [Authentication and Authorization](/notifications/reference/api/#authentication--authorization) for more information.

## Response

### Response codes
- 200 OK: The correspondence have been succesfully marked as read

  Refer to problem details in response body for further information.
- 404 Not found: Indicates that the correspondence id was not found.

### Content-Type

- application/json

### Response body 

The response body consists of a GUID and contains the correspondence ID.

### Response body properties
Only returns the correspondenceId.