---
title: Retrieve consent token
linktitle: Retrieve consent token
weight: 20
toc: false
---

In Altinn 3, the consent token is retrieved as part of the Maskinporten token.
Find the required scopes in the API provider’s documentation or by contacting the API provider. The scope shown below is only an example (chosen because the Maskinporten client in the example is configured with this scope).

You request it from Maskinporten using a JWT assertion (RFC 7523) and include the consent reference in `authorization_details`.

```jsonc
{
  "aud": "https://test.maskinporten.no/",
  "iss": "<MASKINPORTEN_CLIENT_ID>",
  "scope": "altinn:consentrequests.read",
  "iat": 1736938000,
  "exp": 1736938120,
  "jti": "<UNIQUE_JTI>",
  "authorization_details": [
    {
      "type": "urn:altinn:consent",
      "id": "77ed8698-e619-4066-9eb4-5c1eb3f165a1", // Same "id" as in the consent request example
      "from": "urn:altinn:person:identifier-no:21818297804"
    }
  ]
}
```

Example of the contents of the returned token (decoded JWT payload):

```json
{
  "authorization_details": [
    {
      "type": "urn:altinn:consent",
      "id": "ecbff842-199b-45c9-8b58-80ed4d813660",
      "from": "urn:altinn:person:identifier-no:23886799519",
      "to": {
        "authority": "iso6523-actorid-upis",
        "ID": "0192:313876144"
      },
      "consented": "2026-01-15T10:34:39.676924+00:00",
      "validTo": "2026-01-20T10:34:34.836+00:00",
      "consentRights": [
        {
          "action": ["consent"],
          "resource": [
            {
              "type": "urn:altinn:resource",
              "value": "standard-samtykke-for-dele-data"
            }
          ],
          "metaData": {
            "inntektsaar": "2028"
          }
        }
      ]
    }
  ],
  "scope": "altinn:consentrequests.write",
  "supplier": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:310149942"
  },
  "iss": "https://test.maskinporten.no/",
  "client_amr": "private_key_jwt",
  "token_type": "Bearer",
  "exp": 1768473780,
  "delegation_source": "https://tt02.altinn.no/",
  "iat": 1768473280,
  "client_id": "<<redacted>>",
  "jti": "<<redacted>>",
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:313876144"
  }
}
```
