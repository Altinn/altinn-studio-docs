---
title: Consent on behalf of others
linktitle: Consent on behalf of others
weight: 30
toc: false
---

To create consent requests on behalf of another organization, you must distinguish between:

- The data consumer (consumer): the organization that should be the recipient of the consent (e.g. Sparebank Super).
- The organization that owns the Maskinporten client: the supplier/operations organization that makes the API calls (e.g. Sparebank Super - Drift).

The examples below use fictional actors (TT02):

- Sparebank Super org no (consumer): `313876144`
- Sparebank Super - Drift org no (Maskinporten client is owned here): `310149942`
- Person: `03867199348`

## 3.1 Delegate the required scopes in Altinn (API delegation)

Sparebank Super delegates the required scopes (minimum `altinn:consentrequests.write` and `altinn:consentrequests.read`) to Sparebank Super - Drift in Altinn under API delegation.

![Scope delegation in Altinn](../scopedelegation.jpg)

## 3.2 Sparebank Super - Drift: get a Maskinporten token to create the consent request

Sparebank Super - Drift requests a Maskinporten access token with scope `altinn:consentrequests.write`, but with `consumer_org` set to Sparebank Super’s organization number.

### JWT assertion claims

```jsonc
{
  "aud": "https://test.maskinporten.no/",
  "iss": "<MASKINPORTEN_CLIENT_ID_FOR_SPAREBANK_SUPER_DRIFT>",
  "scope": "altinn:consentrequests.write",
  "iat": 1736938000,
  "exp": 1736938120,
  "jti": "<UNIQUE_JTI>",
  "consumer_org": "313876144" // Sparebank Super
}
```

## 3.3 Sparebank Super - Drift: create the consent request (from person, to Sparebank Super)

The consent request is created to Sparebank Super’s org no, but the call is performed using Sparebank Super - Drift’s Maskinporten token (with `consumer_org=313876144`).

### Request payload (example)

```jsonc
{
  "id": "a005e4e7-78b3-42b4-ce69-dc68cc5349eb", // Unique consent UUID (generate a new one per request)
  "from": "urn:altinn:person:identifier-no:03867199348", // Person or organization you request consent from
  "to": "urn:altinn:organization:identifier-no:313876144", // Sparebank Super
  "validTo": "2026-07-07T13:45:00.0000000+00:00", // Consent validity (expiration time)
  "consentRights": [
    {
      "action": ["consent"],
      "resource": [
        {
          "type": "urn:altinn:resource",
          "value": "enkelt-samtykke" // Reference to resource in Resource Registry (see https://docs.altinn.studio/nb/api/resourceregistry/resource/)
        }
      ],
      "metaData": {
        // Metadata tags defined on the resource in the Resource Registry
        "simpletag": "2026"
      }
    }
  ],
  "redirectUrl": "https://altinn.no" // Where the end user is redirected after approve/deny
}
```

## 3.4 Person: approve the consent request

![Approve the consent request in Altinn](../../images/behalfOfEN.png)

## 3.5 Sparebank Super - Drift: retrieve the consent token

After approval, Sparebank Super - Drift requests a consent token. Remember to set `consumer_org` to Sparebank Super’s org no.

### JWT assertion claims

```jsonc
{
  "aud": "https://test.maskinporten.no/",
  "iss": "<MASKINPORTEN_CLIENT_ID_FOR_SPAREBANK_SUPER_DRIFT>",
  "scope": "altinn:consentrequests.read",
  "iat": 1736938000,
  "exp": 1736938120,
  "jti": "<UNIQUE_JTI>",
  "consumer_org": "313876144", // Sparebank Super
  "authorization_details": [
    {
      "type": "urn:altinn:consent",
      "id": "a005e4e7-78b3-42b4-ce69-dc68cc5349eb", // Same "id" as in the consent request above
      "from": "urn:altinn:person:identifier-no:03867199348"
    }
  ]
}
```
