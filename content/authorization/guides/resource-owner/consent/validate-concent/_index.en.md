---
title: Validate consent tokens
linktitle: Validate
description: How service owners validate consent tokens
toc: false
---

Once you have finished configuring access rules for the consent, you need to validate that the consent works as expected in the service.
This is done by verifying that the rights specified in the consent token (under `consentRights`) match the rights required by the service.

In the new consent solution for Altinn 3, Maskinporten issues the consent token.
The token is issued as a regular Maskinporten token, but additionally contains an attribute called `authorization_details`.
This field contains information about which rights the consent grants and is used by the service to verify that the necessary consent has been given.

The example below shows a consent token from the demo application Smartbank in the TT02 test environment.
Here we can see that the token has received the consent `samtykke-test-vegard` for the income year 2022. This confirms that the consent setup works as expected:

```json
{
  "authorization_details": [
    {
      "type": "urn:altinn:consent",
      "id": "93413201-b7e8-4ec3-a899-580fc02c6aeb",
      "from": "urn:altinn:person:identifier-no:25922947409",
      "to": {
        "authority": "iso6523-actorid-upis",
        "ID": "0192:991825827"
      },
      "consented": "2025-07-18T07:57:30.409251+00:00",
      "validTo": "2026-07-18T07:57:15.639509+00:00",
      "consentRights": [
        {
          "action": ["consent"],
          "resource": [
            {
              "type": "urn:altinn:resource",
              "value": "samtykke-test-vegard"
            }
          ],
          "metadata": {
            "inntektsaar": "2022"
          }
        }
      ]
    }
  ],
  "scope": "altinn:consentrequests.read",
  "iss": "https://test.maskinporten.no/",
  "client_amr": "private_key_jwt",
  "token_type": "Bearer",
  "exp": 1752825571,
  "iat": 1752825451,
  "client_id": "107c6f58-e06b-44e9-be7a-11ea44c7ad8b",
  "jti": "T2KUt3ufgIPycdoGPMEFU87pNm9e9nPB1ODkJj5wH0k",
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:991825827"
  }
}
```


## Validation of converted consents

As part of the migration process from Altinn 2 to Altinn 3, Altinn will automatically convert existing consents. 

This means that service providers must be prepared to handle three different types of consent tokens:

1. **Existing Altinn 2 tokens** - Old consent tokens that are still valid
2. **New Altinn 3 tokens** - Tokens based on new resource definitions created by the service owner
3. **Migrated tokens** - Tokens for services that were originally consented to in Altinn 2, but are now converted to Altinn 3 format

### Responsibilities and configuration work

Altinn takes responsibility for the actual conversion of resources and migration of consents. However, the service owner must configure their API to accept tokens with migrated resources. 

ResourceID for migrated resources follows the format: `{org}_{serviceCode}_{serviceEditionCode}`

{{% alert title="Important" color="warning" %}}
**Parameters in the consent will also be converted to lowercase during migration.**
{{% /alert %}}


