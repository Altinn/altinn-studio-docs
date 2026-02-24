---
title: Request consent
linktitle: Request consent
weight: 10
toc: false
---

### Prerequisites

1. The data consumer must have a registered Maskinporten client.
2. The data consumer must have been delegated the consent scope from Digdir. (altinn:consentrequests.write & altinn:consentrequests.read)
3. The necessary scopes must be added to the Maskinporten client.
4. Access to request consent for the relevant resource(s) must be granted.

### API Endpoint

- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/`
- **Production**: `POST https://platform.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/`

### Request (example)

```jsonc
{
  "id": "77ed8698-e619-4066-9eb4-5c1eb3f165a1", // per-request unique ID
  "from": "urn:altinn:person:identifier-no:21818297804",
  "to": "urn:altinn:organization:identifier-no:991825827",
  "validTo": "2026-07-18T06:18:12.2597103+00:00",
  "consentRights": [
    {
      "action": ["consent"],
      "resource": [
        {
          "type": "urn:altinn:resource",
          "value": "standard-samtykke-for-dele-data",
        },
      ],
      "metaData": {
        "inntektsaar": "2023",
      },
    },
    {
      "action": ["consent"],
      "resource": [
        {
          "type": "urn:altinn:resource",
          "value": "standard-samtykke-for-dele-data",
        },
      ],
      "metaData": {
        "inntektsaar": "2024",
      },
    },
  ],
  "redirectUrl": "https://bankenmin.no/huslaan?consentId=77ed8698-e619-4066-9eb4-5c1eb3f165a1",
  "portalViewMode": "hide"
}
```

#### Redirect URL

As part of the consent request, the consumer specifies which URL the user should be returned to after the consent process is completed.

If there is a need to receive an identifier back in the response, this can be added as a query parameter in the redirect URL with the desired parameter name. For example, `authorizationCode` can be used, which was the terminology used in Altinn 2.
In the example below, consentId=77ed8698-e619-4066-9eb4-5c1eb3f165a1 is specified in this way. In addition to this, Status (OK/Failed) and ErrorMessage in case of Failed will be added to the redirectURL

**Example of redirect URL with parameter:**

```
https://bankenmin.no/huslaan/?consentId=77ed8698-e619-4066-9eb4-5c1eb3f165a1&Status=OK
```

#### PortalViewMode
If the consent is not part of a synchronous flow (where the user is expected to consent immediately), the consent request can be set to PortalViewMode to "show". After the request is sent, the user who is to give consent will see the consent request in the Altinn portal under access control, and can give their consent there.

### Response (example)

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
          "value": "standard-samtykke-for-dele-data",
        },
      ],
      "metaData": {
        "inntektsaar": "2023",
      },
    },
    {
      "action": ["consent"],
      "resource": [
        {
          "type": "urn:altinn:resource",
          "value": "standard-samtykke-for-dele-data",
        },
      ],
      "metaData": {
        "inntektsaar": "2024",
      },
    },
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
      "consentRequestID": "77ed8698-e619-4066-9eb4-5c1eb3f165a1",
    },
  ],
  "viewUri": "https://am.ui.tt02.altinn.no/accessmanagement/ui/consent/request?id=77ed8698-e619-4066-9eb4-5c1eb3f165a1",
}
```
