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

This endpoint sets the status of a existing correspondence as "Read". Before using this endpoint, the status of the correspondence must be "Fetched". The status of a correspondence can be checked by using the details endpoint described [here](https://docs.altinn.studio/api/correspondence/spec/#/Correspondence/post_correspondence_api_v1_correspondence__correspondenceId__markasread).

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