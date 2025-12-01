---
title: Retrieve a system user token from Maskinporten
description: "How-to guide for creating system user requests and fetching Maskinporten tokens for standard and agent system users."
linktitle: Retrieve system user token
weight: 10
toc: true
tags: [maskinporten, systemuser, authentication]
---

## Introduction
This guide explains how to retrieve a system user token from Maskinporten. It covers both standard (own) and agent system users, highlights the practical differences, and shows separate request and response examples.

## Prerequisites
- A Maskinporten client with the relevant scopes, for example `altinn:authentication/systemuser.request.write`, `altinn:authentication/systemuser.request.read`, and the scopes for the API you plan to call.
- A registered system in Altinn and access to the system register and system user APIs.
- Ability to sign JWTs with your Maskinporten client certificate.
- For agent system users: Altinn roles that allow client delegations.

## Step 1 – Choose the correct system user type
| Type | When to use it | Key differences |
| --- | --- | --- |
| Standard (own) | The system only represents the organisation that owns the system. | May use both `rights` and `accessPackages`. No manual client delegation after approval. |
| Agent | The system must act on behalf of multiple customer organisations. | Use `accessPackages` only. Requires the end user to delegate clients after approval. |

{{% notice info %}}
Pick the system user type before you create the request. It affects which fields the Maskinporten token contains and which steps the end user must complete.
{{% /notice %}}

## Step 2 – Create the request

### Standard request (vendor)
**Request**
```http
POST https://platform.tt02.altinn.no/authentication/api/v1/systemuser/request/vendor
Authorization: Bearer <Maskinporten token with write scope>
Content-Type: application/json

{
  "systemId": "123456789_my-system",
  "partyOrgNo": "987654321",
  "rights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "ske-krav-og-betalinger"
        }
      ]
    }
  ],
  "accessPackages": [
    {
      "urn": "urn:altinn:accesspackage:skattegrunnlag"
    }
  ],
  "externalRef": "customer-987654321",
  "redirectUrl": "https://vendor.example/systemuser/receipt"
}
```

**Response**
```json
{
  "id": "0c5c58ad-4fc1-4ef9-9c72-4a3376a0c3d0",
  "externalRef": "customer-987654321",
  "systemId": "123456789_my-system",
  "partyOrgNo": "987654321",
  "rights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "ske-krav-og-betalinger"
        }
      ]
    }
  ],
  "status": "New",
  "redirectUrl": "https://vendor.example/systemuser/receipt",
  "confirmUrl": "https://am.ui.tt02.altinn.no/accessmanagement/ui/systemuser/request?id=0c5c58ad-4fc1-4ef9-9c72-4a3376a0c3d0"
}
```

### Agent request (vendor/agent)
**Request**
```http
POST https://platform.tt02.altinn.no/authentication/api/v1/systemuser/request/vendor/agent
Authorization: Bearer <Maskinporten token with write scope>
Content-Type: application/json

{
  "systemId": "123456789_accounting",
  "partyOrgNo": "912345678",
  "accessPackages": [
    {
      "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrett"
    }
  ],
  "externalRef": "customer-912345678",
  "redirectUrl": "https://vendor.example/systemuser/receipt"
}
```

**Response**
```json
{
  "id": "78b6c716-9d1d-4ff4-9c92-55296e6bb4f6",
  "externalRef": "customer-912345678",
  "systemId": "123456789_accounting",
  "partyOrgNo": "912345678",
  "accessPackages": [
    {
      "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrett"
    }
  ],
  "status": "New",
  "redirectUrl": "https://vendor.example/systemuser/receipt",
  "confirmUrl": "https://am.ui.tt02.altinn.no/accessmanagement/ui/systemuser/agentrequest?id=78b6c716-9d1d-4ff4-9c92-55296e6bb4f6"
}
```

{{% notice warning %}}
Keep request and response payloads separate. Several users have tried to post the response back to the API, which fails.
{{% /notice %}}

## Step 3 – Ask the end user to approve
1. Send the `confirmUrl` from the response to the end user.
2. The end user signs in to Altinn and approves the request.
3. The API updates the status to `Accepted` or `Rejected`.
4. Poll the status through `GET /authentication/api/v1/systemuser/request/vendor/{id}` (or the agent variant).

## Step 4 – Delegate clients (agent only)
Once the agent request is approved, the end user must delegate customer organisations to the agent system user.

1. **List available clients**
   ```http
   GET https://platform.tt02.altinn.no/authentication/api/v1/enduser/systemuser/clients/available?agent={systemUserId}
   ```
2. **Add a client**
   ```http
   POST https://platform.tt02.altinn.no/authentication/api/v1/enduser/systemuser/clients/?agent={systemUserId}&client={clientId}
   ```
3. **Verify the delegation**
   ```http
   GET https://platform.tt02.altinn.no/authentication/api/v1/enduser/systemuser/clients/?agent={systemUserId}
   ```

## Step 5 – Retrieve the token from Maskinporten

### 5.1 Prepare `authorization_details`
```json
{
  "authorization_details": [
    {
      "type": "urn:altinn:systemuser",
      "systemuser_org": {
        "authority": "iso6523-actorid-upis",
        "ID": "0192:987654321"
      },
      "externalRef": "customer-987654321"
    }
  ]
}
```
- `systemuser_org.ID` is the organisation number of the customer that approved the request, prefixed with `0192:`.
- `externalRef` is optional but recommended if you rely on your own identifiers.

### 5.2 Sign the JWT
Include the following claims when you sign the JWT with your Maskinporten client certificate:
- `aud`: `https://maskinporten.no/token` (or the relevant environment)
- `iss` and `sub`: your Maskinporten client ID
- `scope`: at least one API scope you need (for example `altinn:maskinporten/systemuser.read`)
- `exp`, `iat`, `jti`: standard time and identifier claims
- `authorization_details`: the object from the previous step

### 5.3 Call the Maskinporten token endpoint
```http
POST https://test.maskinporten.no/token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<base64url-signed-jwt>
```

### 5.4 Inspect the response
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 599,
  "scope": "altinn:maskinporten/systemuser.read"
}
```
Decoding `access_token` reveals:
- `authorization_details[0].system_id`: the approved system
- `authorization_details[0].systemuser_id`: the UUID of the system user
- `authorization_details[0].systemuser_org`: the organisation that owns the system user
- `consumer`: the Maskinporten client that fetched the token

## Next steps
Send the `access_token` as a Bearer token when invoking APIs that rely on Altinn authorisation. Tokens typically expire after about 10 minutes, so plan to renew them frequently.
