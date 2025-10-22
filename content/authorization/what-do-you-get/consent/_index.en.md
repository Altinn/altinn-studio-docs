---
title: Consent
description: The Altinn consent functionality is a technical solution for sharing data from a service owner to a data consumer based on the consent of the individual or organisation the information concerns.
tags: [platform, register]
---

![Consent](samtykke_overordnet.png)

Depending on the purpose and content of the consent, it can give the service owner both the necessary legal basis for sharing data in line with the Personal Data Act/GDPR and consent for, for example, lifting statutory confidentiality.

## What do you get with consent in Altinn 3?

- An end-to-end consent process where Altinn manages the dialogue between end user, data consumer, and service owner.
- A single Maskinporten consent token that contains everything you need to validate and log the delegation.
- An improved end-user experience with an upgraded consent screen and clearer information flow.
- Flexible support for third-party vendors that can administer consent on behalf of the data consumer.
- Built-in controls for access lists, duration, and revocation so users and service owners stay in control of shared data.

## What's new in Altinn 3?

The consent process in Altinn 2 works well, so we have aimed to change it as little as possible to keep the transition to Altinn 3 simple. To make the experience even smoother for everyone involved, we have still introduced some improvements.

- **Simplified token handling:** Only one Maskinporten token is used, containing all the information about the consent.
- **New token format:** API providers must update their validation code to interpret the new format. The format is described in the guides for both [service owners]({{< relref "authorization/guides/resource-owner/consent" >}}) and [data consumers]({{< relref "authorization/guides/system-vendor/consent" >}}).
- **Improved user experience:** End users meet an upgraded and more user-friendly interface.
- **Support for vendors:** Option to use third-party vendors to manage the consent process.

## How the consent process works

### Actors

**End user** Individual or organisation that grants consent.  
**Data consumer** Organisation (e.g. a bank) that requests access to data. [Read more about what data consumers must do]({{< relref "authorization/getting-started/consent#datakonsumentsluttbrukersystem" >}}).  
**Service owner** (Data source) Public entity that owns the data. [Read more about the service owner’s responsibilities]({{< relref "authorization/getting-started/consent#tjenesteeier" >}}).  
**Altinn Authorization** Altinn’s system for consent, delegation, and authorisation.  
**Maskinporten** Shared infrastructure for authentication and tokens (OAuth2).

![Consent flow](samtykke_flyt.png)

### Process flow

1. The end user starts a service where the data consumer needs to fetch data from a public service → initiates the consent flow.
2. The data consumer sends a consent request to Altinn.
3. Altinn returns a `redirect_url` → the user is sent there to approve.
4. The user authenticates and grants consent (delegation).
5. The data consumer retrieves the consent token (`consent_id`).
6. The data consumer uses the token to fetch data from the service owner (data source).

{{< expandsmall header="Detailed process flow" id="prosessflyt">}}

| Step                    | Description                                                                       | Technical action                                                                  | Comment                                         |
| ----------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------- |
| 1. Start the service    | End user starts the consent process via the data consumer (e.g. the bank’s site)  | User clicks “Request consent”                                                     | Data consumer initiates the flow                |
| 2. Create request       | Data consumer creates a consent request in Altinn                                 | POST /api/consentRequests with parameters (CoveredBy, OfferedBy, RedirectUrl, etc.) | Requires enterprise authentication (Maskinporten) |
| 3. Redirect to Altinn   | Data consumer sends the end user to Altinn’s consent form                         | Redirect to a GUI link that contains `consentRequestId`                           | User reviews and approves the request           |
| 4. Perform delegation   | User approves the consent in Altinn                                               | Altinn registers the delegation and updates the consent status                    | User signs in via ID-porten                     |
| 5. Fetch consent token  | Data consumer fetches a consent token after approval                              | GET /api/consentTokens/{consent_id}                                               | Token confirms that consent has been granted    |
| 6. Fetch data           | Data consumer uses the consent token to access data from the service owner        | API call to the service owner with the token in the header                        | Service owner validates the token and returns data |

{{< /expandsmall >}}

## Technical requirements

### Enterprise authentication

Data consumers must authenticate via Maskinporten with the correct scopes.

<!--
altinn:consentrequests.read
altinn:consentrequests.write
altinn:consenttokens
-->

### Access lists

Service owners can control which organisations are allowed to use the service with access lists.

### Validity

Consents must have a defined duration.

### Revocation

The user can withdraw consent at any time in the Altinn portal.

<!--
### Onboarding:

Organisations must be registered as integration partners through the Altinn onboarding process.

### 1. Token from Maskinporten

In Altinn 3, only one Maskinporten token is issued per consent. The token identifies the data consumer and includes every detail needed to validate the consent, allowing validation without calls to Altinn Authorization.

**Example of the new token format:**

```json
{
  "authorization_details": [
    {
      "type": "urn:altinn:consent",
      "id": "b55b0a8c-46db-4239-a417-a89daabfabba",
      "from": "urn:altinn:person:identifier-no:01039012345",
      "to": "urn:altinn:organization:identifier-no:984851006",
      "consented": "2024-06-01T00:00:00Z",
      "validTo": "2024-12-10T00:00:00Z",
      "consentrights": [
        {
          "action": ["read", "write"],
          "resource": [
            {
              "id": "urn:altinn:resource",
              "value": "skd_inntektsapi"
            }
          ],
          "metadata": {
            "fraOgMed": "2017-06",
            "tilOgMed": "2017-08"
          }
        },
        {
          "action": ["read", "write"],
          "resource": [
            {
              "id": "urn:altinn:resource",
              "value": "skd_skattegrunnlag"
            }
          ],
          "metadata": {
            "inntektsaar": "2016"
          }
        }
      ]
    }
  ],
  "scope": "scope:global/kontaktinformasjon.read",
  "iss": "https://test.maskinporten.no/",
  "client_amr": "private_key_jwt",
  "token_type": "Bearer",
  "exp": 1718175135,
  "iat": 1718175015,
  "client_id": "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "jti": "-SpfU--1Zn_Oqvkpjwu3oVn--VLcPzSAwjqyiP6zBEw",
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:984851006"
  }
}
```

### 2. For API providers

API providers must define their APIs as resources in the Altinn Resource Registry via Altinn Studio. This makes it possible to link consent to specific APIs.

- See [Altinn Studio documentation](https://docs.altinn.studio/) for guidance on resource management.

### 3. For data consumers

Data consumers start the process by creating a consent request. The request includes information about who consent is requested from, how long it should last, and which data access is requested.

**Requirements for creating a consent request:**

1. The organisation must be granted the scope `altinn:consentrequests.write`.
2. The organisation must have created a client and assigned this scope.
3. The organisation must have access to the relevant API.

**Example of a consent request:**
-->
