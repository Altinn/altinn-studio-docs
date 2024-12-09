---
title: Purge
linktitle: Purge
description: Endpoint for deleting a correspondence.

weight: 60
toc: true
---

## Endpoint

DELETE /correspondence/api/v1/correspondence/{{correspondenceId}}/purge

## Description

This endpoint is used to delete an existing correspondence. If the correspondence includes any attachments, they will also be deleted, provided they are not associated with any other correspondence.

## Authentication

This API requires authentication, and the request must also include either of the following:

- Correspondence write scope __altinn:correspondence.write__
- Correspondence read scope __altinn:correspondence.read__

See [Authentication and Authorization](/notifications/reference/api/#authentication--authorization) for more information.

## Response

### Response codes
- 200 OK: The correspondence have been succesfully deleted
- 400 One or more validation errors occurred: Indicates that the correspondenceid is on wrong format.
- 404 Not found: The requested correspondence was not found.

### Content-Type

- application/json

### Response body 

The response body consists of a GUID and contains the correspondence ID.

### Response body properties
Only returns the correspondence ID.