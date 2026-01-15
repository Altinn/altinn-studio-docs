---
title: Hente samtykke-token
linktitle: Hente samtykke-token
weight: 20
toc: false
---

I Altinn 3 hentes samtykke-token som en del av Maskinporten-tokenet. Spesifiser følgende i JWT-en:

```json
{
  "aud": "https://test.maskinporten.no/",
  "scope": "altinn:consentrequests.read",
  "iss": "<clientid>",
  "exp": 1752827349,
  "iat": 1752827339,
  "jti": "<jti>",
  "authorization_details": [
    {
      "from": "urn:altinn:person:identifier-no:25922947409",
      "id": "77ed8698-e619-4066-9eb4-5c1eb3f165a1",
      "type": "urn:altinn:consent"
    }
  ]
}
```

Eksempel på innholdet i tokenet du får tilbake (dekodet JWT payload):

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
          "metadata": {
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
