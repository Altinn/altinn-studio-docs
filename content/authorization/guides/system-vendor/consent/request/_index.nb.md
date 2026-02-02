---
title: Be om samtykke
linktitle: Be om samtykke
weight: 10
toc: false
---

Legg til de nødvendige parameterene i forespørselen:

- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/`
- **Produksjon**: `POST https://platform.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/`

### Forespørsel (eksempel)

```jsonc
{
  "id": "77ed8698-e619-4066-9eb4-5c1eb3f165a1",
  "from": "urn:altinn:person:identifier-no:21818297804",
  "to": "urn:altinn:organization:identifier-no:991825827",
  "validTo": "2026-07-18T06:18:12.2597103+00:00",
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
        "inntektsaar": "2023"
      }
    },
    {
      "action": ["consent"],
      "resource": [
        {
          "type": "urn:altinn:resource",
          "value": "standard-samtykke-for-dele-data"
        }
      ],
      "metaData": {
        "inntektsaar": "2024"
      }
    }
  ],
  "redirectUrl": "https://bankenmin.no/huslaan/?consentId=77ed8698-e619-4066-9eb4-5c1eb3f165a1"
}
```

#### Redirect URL

Som del av samtykkeforespørselen spesifiserer konsumenten hvilken URL brukeren skal returneres til etter at samtykkebehandlingen er fullført. 

Dersom det er behov for å motta en identifikator tilbake i responsen, kan denne legges til som en query-parameter i redirect URL-en med ønsket parameternavn. For eksempel kan `authorizationCode` brukes, som var terminologien fra Altinn 2.

**Eksempel på redirect URL med parameter:**

```
https://bankenmin.no/huslaan/?consentId=77ed8698-e619-4066-9eb4-5c1eb3f165a1
```

### Svar (eksempel)

```jsonc
{
  "id": "77ed8698-e619-4066-9eb4-5c1eb3f165a1",
  "from": "urn:altinn:person:identifier-no:21818297804",
  "to": "urn:altinn:organization:identifier-no:991825827",
  "requiredDelegator": null,
  "handledBy": null,
  "validTo": "2026-07-18T06:18:12.25971+00:00",
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
        "inntektsaar": "2023"
      }
    },
    {
      "action": ["consent"],
      "resource": [
        {
          "type": "urn:altinn:resource",
          "value": "standard-samtykke-for-dele-data"
        }
      ],
      "metaData": {
        "inntektsaar": "2024"
      }
    }
  ],
  "requestMessage": null,
  "consented": null,
  "redirectUrl": "https://altinn.no",
  "consentRequestEvents": [
    {
      "consentEventID": "01981c2f-1de4-7b9f-a7c7-854f1dd4f115",
      "created": "2025-07-18T06:18:26.65293+00:00",
      "performedBy": "urn:altinn:organization:identifier-no:991825827",
      "eventType": "Created",
      "consentRequestID": "77ed8698-e619-4066-9eb4-5c1eb3f165a1"
    }
  ],
  "viewUri": "https://am.ui.tt02.altinn.no/accessmanagement/ui/consent/request?id=77ed8698-e619-4066-9eb4-5c1eb3f165a1"
}
```
