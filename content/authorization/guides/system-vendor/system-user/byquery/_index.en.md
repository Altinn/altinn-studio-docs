---
title: Query for a system user
description: "How to retrieve an existing system user for your own system using query parameters."
linktitle: Query for a system user
weight: 3
---

The endpoint lets you, as an end-user system vendor (SBSL), retrieve an existing system user for your own system. You can look up the system user by combining the system ID and organisation number, and optionally an external reference.

> **Note:** This endpoint is used to check whether a system user exists and to retrieve values such as the system user ID. It does not provide access to the system user token itself. To retrieve a token and use the system user in API calls, see [Using a system user](../usetoken/).

You use this endpoint to

- verify that a system user has been created after the end-user has approved a request
- retrieve the system user ID needed to create change requests
- check details for an existing system user

## Scope

The call is authenticated with a Maskinporten token containing the scope:

`altinn:authentication/systemuser.request.write`

See the [Getting started guide](https://docs.altinn.studio/nb/authorization/getting-started/systemuser/) for information on how to obtain access to this scope.

## Endpoint

- **Test (TT02):** `GET https://platform.tt02.altinn.no/authentication/api/v1/systemuser/vendor/byquery`
- **Production:** `GET https://platform.altinn.no/authentication/api/v1/systemuser/vendor/byquery`

## Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `system-id` | string | Yes | The system ID of the system the system user belongs to |
| `orgno` | string | Yes | The organisation number of the business that owns the system user |
| `external-ref` | string | No | External reference set when the system user was created |

The `external-ref` parameter is useful if there are multiple system users for the same combination of system and organisation.

## Example

### Request

```http
GET https://platform.tt02.altinn.no/authentication/api/v1/systemuser/vendor/byquery
  ?system-id=991825827_smartcloud
  &orgno=314248295
  &external-ref=0.abc123xyz
```

### Response

```json
{
  "id": "b93107d3-da30-4b7a-a8ae-9b0cac079fd2",
  "integrationTitle": "SmartCloud for Skatt",
  "systemId": "991825827_smartcloud",
  "productName": "",
  "reporteeOrgNo": "314248295",
  "created": "2026-05-21T13:35:24.161Z",
  "isDeleted": false,
  "supplierName": "SmartCloud AS",
  "supplierOrgno": "991825827",
  "externalRef": "0.abc123xyz",
  "userType": "standard"
}
```

## Response fields

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier for the system user |
| `integrationTitle` | string | Name of the system user set at creation |
| `systemId` | string | The system ID the system user belongs to |
| `productName` | string | Product name (may be empty) |
| `reporteeOrgNo` | string | The organisation number of the business that owns the system user |
| `created` | datetime | Timestamp when the system user was created |
| `isDeleted` | boolean | Whether the system user is deleted |
| `supplierName` | string | Name of the vendor |
| `supplierOrgno` | string | The organisation number of the vendor |
| `externalRef` | string | External reference set at creation (may be empty) |
| `userType` | string | Type of system user: `standard` (own system) or `agent` (client system) |
