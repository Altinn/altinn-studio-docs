---
title: Consent
description: Altinn consent is renewed as part of the upgrade to Altinn 3
tags: [platform, register]
---

# Consent in Altinn 3

Altinn 3 continues and improves the consent solution from Altinn 2. This documentation provides an overview of the most important changes, how the consent process works, and what is required from both data consumers and API providers.

## What's new in Altinn 3?

- **Simplified token handling:** Only one Maskinporten token is used, containing all necessary information about the consent.
- **New token format:** API providers must update their validation code to interpret the new format.
- **Improved user experience:** End users encounter an upgraded and more user-friendly interface.
- **Support for vendors:** Possibility to use third-party vendors to handle the consent process.

## How the consent process works

### 1. Token from Maskinporten

In Altinn 3, only one Maskinporten token is issued per consent. This token identifies the data consumer and contains all details about the consent, simplifying validation and integration.

**Example of the new token format:**

```json
{
    "authorization_details": [
        {
            "type": "urn:altinn:concent",
            "id": "b55b0a8c-46db-4239-a417-a89daabfabba",
            "from": "urn:altinn:person:identifier-no:01039012345",
            "to": "urn:altinn:organization:identifier-no:984851006",
            "concented": "2024-06-01T00:00:00Z",
            "validTo": "2024-12-10T00:00:00Z",
            "concentrights": [
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

- See the [Altinn Studio documentation](https://docs.altinn.studio/) for guidance on resource management.

### 3. For data consumers

Data consumers initiate the process by creating a consent request. This contains information about who is being asked for consent, the duration, and which data access is requested.

**Requirements for creating a consent request:**

1. The organization must have been assigned the scope `altinn:consentrequests.write`.
2. The organization must have created a client and granted this scope.
3. The organization must have access to the relevant API.

**Example of a consent request:**

```json
{
    "id": "01972f77-c6ec-7b16-85b9-df016b6f90a7",
    "from": "urn:altinn:person:identifier-no:01025161013",
    "requiredDelegator": null,
    "to": "urn:altinn:organization:identifier-no:810419512",
    "validTo": "2025-06-03T07:07:48.3377702+00:00",
    "consentRights": [
        {
            "action": ["read"],
            "resource": [
                {
                    "type": "urn:altinn:resource",
                    "value": "ttd_inntektsopplysninger"
                }
            ],
            "metaData": {
                "INNTEKTSAAR": "ADSF"
            }
        }
    ],
    "requestmessage": {
        "en": "Please approve this consent request"
    },
    "redirectUrl": "https://www.dnb.no"
}
```

| Parameter        | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `id`             | Required: Unique generated UUID                                             |
| `from`           | Required: Party from whom consent is requested (person or organization)     |
| `to`             | Required: Recipient of the consent request                                  |
| `validTo`        | Required: Date/time the consent is valid until                              |
| `consentRights`  | Required: Rights and resources for which access is requested                |
| `requestmessage` | Optional: Message to the user. Depends on the service.                     |
| `redirectUrl`    | Optional: URL for redirect after consent. Must be provided if user is redirected. |

### 4. Use of vendors

It is possible to use vendors (third-party actors) to create consent requests and retrieve data on behalf of the data consumer.

**Requirements for using a vendor:**

1. The scope `altinn:consentrequests.write` must be delegated to the vendor.
2. The scope for the relevant API must also be delegated to the vendor (e.g. [skatteetaten:inntekt](https://skatteetaten.github.io/api-dokumentasjon/api/inntekt)).
3. The vendor creates the request on behalf of the data consumer.
4. The user retrieves the consent token and calls the API to fetch data.

> **Note:** The end user is informed in the GUI that the consent is handled by a vendor.

### 5. EBevis solution

For Digdir's EBevis solution, Digdir can request consent on behalf of the data consumer without the scope being delegated to Digdir. This makes it possible for actors such as municipalities to use the solution without a full setup in Maskinporten.

The EBevis solution has its own scope that allows the creation of consent requests for all organizations for their resources.

---

For more information, see the [Altinn Studio documentation](https://docs.altinn.studio/) or contact Altinn support.

