---
title: Using System User
description: This guide describes how to use a system user after it has been created.
linktitle: Using System User
weight: 5
---

### Request (JWT Grant)

The functionality is based on the OAuth2 extension for fine-grained authorization (Rich Authorization Requests, RAR). We have defined a new type: **urn:altinn:systemuser** for the system user pattern.

The provider requests a token for a specific customer by providing the customer's organization number. If there is a system user delegation in Altinn, a Maskinporten token with a system user identifier is returned. 
The API provider can then use this token to send requests to Altinn Authorization PDP to determine which actions the provider's system is authorized to perform.

{{<mermaid>}}
sequenceDiagram
Sluttbrukersystem->>+Maskinporten: Forespørre token(client_id, systemUserOrgNo)
Maskinporten->>Altinn Autorisasjon: GetSystemUser(client_id, systemUserOrgNo)
Altinn Autorisasjon-->>Maskinporten: Systembrukerinformasjon
Maskinporten-->>Sluttbrukersystem: Systembruker-token
Sluttbrukersystem->>API: API-kall m/systembrukertoken
API->>Altinn Autorisasjon: Authorize(systemUserId, res, action, part)
Altinn Autorisasjon-->>API: AuthorizationResponse
API-->>Sluttbrukersystem: API Resultat
{{< /mermaid >}}

A business system requests a system user token on behalf of a party by including a RAR request of type urn:altinn:systemuser with the party's organization number, in [JWT-grant](https://docs.digdir.no/docs/Maskinporten/maskinporten_protocol_jwtgrant)

```http
POST https://test.maskinporten.no/token
Content-Type: application/json

{
  "aud" : "https://maskinporten.no",
  "sub" : "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "authorization_details" : [ {
    "systemuser_org" : {
      "authority" : "iso6523-actorid-upis",
      "ID" : "0192:123456789"
    },
    "type" : "urn:altinn:systemuser"
  } ],
  "scope" : "krr:global/kontaktinformasjon.read",
  "iss" : "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "exp" : 1718124835,
  "iat" : 1718124715,
  "jti" : "89365ecd-772b-4462-a4de-ac36af8ef3e2"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "access_token" : "IxC0B76vlWl3fiQhAwZUmD0hr_PPwC9hSIXRdoUslPU=",
  "token_type" : "Bearer",
  "expires_in" : 599,
  "scope" : "difitest:test1"
}
```

{{%notice info%}}
**NOTE:** You can only request one party at a time. The grant must always include one or more OAuth2 scopes.
{{% /notice%}}

### Response (JWT Token)

The token contains a list of system users belonging to the customer's organization number. These are linked to the provider's business system via the authenticated business system (client_id):

```json
{
  "authorization_details": [
    {
      "type": "urn:altinn:systemuser",
      "systemuser_org": {
        "authority": "iso6523-actorid-upis",
        "id": "0192:123456789"
      },
      "systemuser_id": ["ebe4a681-0a8c-429e-a36f-8f9ca942b59f"],
      "system_id": "123456789_systemid"
    }
  ],
  "scope": "krr:global/kontaktinformasjon.read",
  "iss": "https://test.maskinporten.no/",
  "client_amr": "private_key_jwt",
  "token_type": "Bearer",
  "exp": 1718175135,
  "iat": 1718175015,
  "client_id": "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "jti": "-SpfU--1Zn_Oqvkpjwu3oVn--VLcPzSAwjqyiP6zBEw",
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:987654321"
  }
}
```

{{%notice info%}}
**Note:** The token from Maskinporten must be used as a Bearer token in API calls.
{{% /notice%}}

### Demo Client

For a demonstration of vendor-controlled creation, see our demo client [SmartCloud](http://smartcloudaltinn.azurewebsites.net).

Source code with documentation can be found [here](https://github.com/TheTechArch/altinn-systemuser).

For creating system users; test users and organizations from Tenor can be used.