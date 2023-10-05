---
title: Register sender info
linktitle: Register sender info 
weight: 10
toc: true
---

{{% notice info %}}
does this guide cover both sms or email or does that need to be separate? 
{{% /notice %}}

## Endpoint

POST /admin

## Authentication

This API requires authentication and the request must also include one of the following: 
- Maskinporten scope __altinn:notifications.admin__ (for external system callers) 
- Platform Access Token (for Altinn Apps or internal Altinn systems)

See [Authentication and Authorization](../../../api/#authentication--authorization) for more information.

## Request

### Content-type

application/json

### Request body


### Required request properties 

#### foo
- bar

### Optional request properties

## Response

### Content-Type
- application/json

### Response codes
- 200 OK: 
- 400 Bad Request: The request was invalid.

  Refer to problem details in response body for further information.
- 401 Unauthorized: Indicates a missing, invalid or expired authorization header or that app is not authorized to publish events for the provided source.
- 403 Forbidden: Indicates that Platform Access Token is missing or invalid.

## Examples

### Request

### Response

#### 200 OK

#### 400 Bad Request
