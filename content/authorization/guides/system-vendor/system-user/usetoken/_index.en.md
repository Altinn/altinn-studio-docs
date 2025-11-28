---
title: Using System User
description: Step-by-step guide to retrieve and use a system user token from Maskinporten towards Altinn services.
linktitle: Using System User
weight: 5
---

## Introduction

**Audience:** Developers and integrators who already have a system user and need to obtain a Maskinporten token that can be used towards Altinn services.

This guide walks through the end-to-end flow: preparing the Maskinporten request, interpreting the response, and using the token with Altinn. We clarify the difference between the **agent** and **own** system user types, provide distinct request and response examples, and list common pitfalls to avoid.

Using a system user with Altinn services follows the sequence below:

{{<mermaid>}}
sequenceDiagram
EndUserSystem->>+Maskinporten: Request token (client_id, systemUserOrgNo)
Maskinporten->>AltinnAuthorization: GetSystemUser(client_id, systemUserOrgNo)
AltinnAuthorization-->>Maskinporten: SystemUser details
Maskinporten-->>EndUserSystem: SystemUser token
EndUserSystem->>API: API request with SystemUser token
API->>AltinnAuthorization: Authorize(systemUserId, resource, action, party)
AltinnAuthorization-->>API: AuthorizationResponse
API-->>EndUserSystem: API result
{{< /mermaid >}}

## Understand system user types

| Type | When to use it | Meaning of `authorization_details.systemuser_org.ID` | Scenario |
|------|----------------|-------------------------------------------------------|----------|
| **own** | The service owner uses the system user in its own line-of-business system | Same organisation number as the Maskinporten client (the authenticating party) | Service owner consuming its own API |
| **agent** | The system vendor operates on behalf of a customer | The customer’s organisation number. The Maskinporten response exposes `consumer.ID` with the system vendor’s organisation number | System vendor acting for the customer |

Regardless of type, the `authorization_details` entry must use `type: "urn:altinn:systemuser"`. The difference lies in who you request access for (`systemuser_org.ID`) and who authenticates (`consumer.ID`).

{{% notice info %}}
Choose **own** when you request a token for your organisation. Choose **agent** when you represent a customer and must specify the customer’s organisation number in the request.
{{% /notice %}}

## Prerequisites

- Maskinporten client for the line-of-business system (production and/or test) with valid key material.
- A system user has been created in Altinn and granted the necessary access packages for the customer(s).
- OAuth2 scopes for the APIs you plan to call are granted to the Maskinporten client.
- Organisation numbers are supplied in ISO 6523 format: `0192:XXXXXXXXX`.

## Step-by-step: retrieve a system user token

### 1. Identify the customer and resource

- Find the organisation number of the customer you will act on behalf of.
- Verify that the customer has delegated the system user access to your system.
- Decide which OAuth2 scopes you need in the token.

### 2. Build the JWT grant with Rich Authorization Requests (RAR)

The OAuth2 RAR extension is used to request a specific system user. Set `systemuser_org.ID` to the customer’s organisation (agent scenario) or to your own organisation (own scenario). The `aud` field must match the Maskinporten environment (`https://maskinporten.no` for production, `https://test.maskinporten.no` for test).

#### Example: Decoded JWT claims

```json
{
  "aud": "https://maskinporten.no",
  "iss": "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "sub": "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "scope": "krr:global/kontaktinformasjon.read",
  "authorization_details": [
    {
      "type": "urn:altinn:systemuser",
      "systemuser_org": {
        "authority": "iso6523-actorid-upis",
        "ID": "0192:123456789"
      }
    }
  ],
  "iat": 1718124715,
  "exp": 1718124835,
  "jti": "89365ecd-772b-4462-a4de-ac36af8ef3e2"
}
```

Sign the JWT with the client’s private key and place it in the `client_assertion` when calling Maskinporten.

### 3. Call the Maskinporten token endpoint

The Maskinporten token endpoint expects an `application/x-www-form-urlencoded` request.

#### Example: HTTP request

```
POST https://test.maskinporten.no/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&
scope=krr%3Aglobal%2Fkontaktinformasjon.read&
client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&
client_assertion=<signed-JWT>
```

#### Example: cURL

```bash
curl \
  --request POST "https://test.maskinporten.no/token" \
  --header "Content-Type: application/x-www-form-urlencoded" \
  --data "grant_type=client_credentials" \
  --data "scope=krr:global/kontaktinformasjon.read" \
  --data "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
  --data "client_assertion=$(cat signed-jwt.txt)"
```

{{% notice info %}}
You can only request one customer per call. The request must always include one or more OAuth2 scopes.
{{% /notice %}}

{{% notice warning %}}
Do not reuse the response example as a request. The request consists of the signed JWT and the form data shown above. The Maskinporten response is for interpretation only.
{{% /notice %}}

### 4. Interpret the Maskinporten response

When the call succeeds (`200 OK`), the response contains a Maskinporten token describing which system users you may act as.

```json
{
  "access_token": "IxC0B76vlWl3fiQhAwZUmD0hr_PPwC9hSIXRdoUslPU=",
  "token_type": "Bearer",
  "expires_in": 599,
  "scope": "krr:global/kontaktinformasjon.read",
  "authorization_details": [
    {
      "type": "urn:altinn:systemuser",
      "systemuser_org": {
        "authority": "iso6523-actorid-upis",
        "id": "0192:123456789"
      },
      "systemuser_id": [
        "ebe4a681-0a8c-429e-a36f-8f9ca942b59f"
      ],
      "system_id": "123456789_systemid"
    }
  ],
  "client_id": "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:987654321"
  }
}
```

| Field | Description |
|-------|-------------|
| `authorization_details[].systemuser_id` | List of system users you can use for the customer. Supply this value to Altinn Authorisation (PDP). |
| `authorization_details[].systemuser_org.ID` | Organisation that owns the system user. For agent scenarios this is the customer; for own scenarios it matches `consumer.ID`. |
| `authorization_details[].system_id` | Reference to your system in Altinn. Useful for troubleshooting and verification. |
| `consumer.ID` | Organisation number of the Maskinporten client (system vendor). Confirm that it matches the expected vendor. |

### 5. Use the token towards Altinn

Use the Maskinporten system user token as a Bearer token when calling Altinn APIs. Altinn Authorisation (PDP) decides whether the system user may perform the requested action based on `systemuser_id`, resource and action.

When calling PDP, provide `systemuser_id` in the attribute `urn:altinn:systemuser:uuid`. If the PDP decision is `Permit`, proceed with the API call; otherwise you must reject the request.

For a complete PDP example, see [Authorising the system user](/en/authorization/guides/resource-owner/system-user/#authorisation-of-system-user).

## Common pitfalls and tips

- **Response reused as request:** Always provide the signed JWT as the `client_assertion`. The JSON response from Maskinporten is for interpretation only.
- **Missing customer ID:** Set `systemuser_org.ID` to the customer’s organisation number when you act as an agent. Without it you will not receive `systemuser_id` in the response.
- **Expired key material:** Ensure that the Maskinporten client uses active keys before troubleshooting further.
- **Incorrect scope:** Verify that the Maskinporten client has been granted every OAuth2 scope you include in the request.
