---
title: Using System User
description: Guidance for system vendors on how to use a System User after it has been created.
linktitle: Using System User
weight: 5
---

**Audience:** Developers and system integrators who already have a system access and need to use it in their solutions.

The use of System User towards services occurs in the following way:

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

## Request system access token (JWT Grant)

The OAuth2 Rich Authorization Requests (RAR) extension is used to request a system access token. Altinn defines the type **urn:altinn:systemuser** for this purpose.

The vendor requests a token for a specific customer by providing the customer's organization number.  
It is important that the organization number is provided according to the following standard:

```
"systemuser_org" : {
      "authority" : "iso6523-actorid-upis",
      "ID" : "0192:123456789"
    }
```

If a valid System User exists in Altinn, a Maskinporten token is issued that contains the system user's identifier.

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
You can only request one organization per grant. Include at least one OAuth2 scope.
{{% /notice%}}

## Token contents

The token returns all System Users that the customer has granted to the authenticated system. They are linked to the system through the `client_id`.

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
Use the Maskinporten token as a Bearer token in API calls to both the API provider and Altinn Authorization.
{{% /notice%}}

The service owner then uses the token against Altinn Authorization (PDP) to determine which operations the system is authorized to perform.
