---
title: Samtykke for datakonsumenter
description: XACML stands for "eXtensible Access Control Markup Language".
tags: [consent]
linktitle: XACML
toc: false
weight: 10
---



## Be om samtykke


```json
{
  "id": "019743e8-cb17-7f9f-b690-fb1338003c23",
  "from": "urn:altinn:person:identifier-no:01025161013",
  "requiredDelegator": null,
  "to": "urn:altinn:organization:identifier-no:810419512",
  "validTo": "2025-06-07T06:23:39.2925023+00:00",
  "consentRights": [
    {
      "action": [
        "read"
      ],
      "resource": [
        {
          "type": "urn:altinn:resource",
          "value": "ttd_inntektsopplysninger"
        }
      ],
      "metadata": {
        "INNTEKTSAAR": "ADSF"
      }
    },
    {
      "action": [
        "read"
      ],
      "resource": [
        {
          "type": "urn:altinn:resource",
          "value": "ttd_skattegrunnlag"
        }
      ],
      "metadata": {
        "fraOgMed": "ADSF",
        "tilOgMed": "ADSF"
      }
    }
  ],
  "requestMessage": {
    "en": "Please approve this consent request"
  },
  "redirectUrl": "https://www.dnb.no"
}
```

```json
{
  "id": "019743e8-cb17-7f9f-b690-fb1338003c23",
  "from": "urn:altinn:person:identifier-no:01025161013",
  "to": "urn:altinn:organization:identifier-no:810419512",
  "requiredDelegator": null,
  "handledBy": null,
  "validTo": "2025-06-07T06:23:39.292502+00:00",
  "consentRights": [
    {
      "action": [
        "read"
      ],
      "resource": [
        {
          "type": "urn:altinn:resource",
          "value": "ttd_inntektsopplysninger"
        }
      ],
      "metaData": {
        "INNTEKTSAAR": "ADSF"
      }
    },
    {
      "action": [
        "read"
      ],
      "resource": [
        {
          "type": "urn:altinn:resource",
          "value": "ttd_skattegrunnlag"
        }
      ],
      "metaData": {
        "fraOgMed": "ADSF",
        "tilOgMed": "ADSF"
      }
    }
  ],
  "requestmessage": null,
  "consented": null,
  "redirectUrl": "https://www.dnb.no",
  "consentRequestEvents": [
    {
      "consentEventID": "019743e9-128b-74fc-bb3a-49a3997d63ff",
      "created": "2025-06-06T06:23:57.298375+00:00",
      "performedBy": "urn:altinn:organization:identifier-no:810419512",
      "eventType": "Created",
      "consentRequestID": "019743e8-cb17-7f9f-b690-fb1338003c23"
    }
  ],
  "viewUri": "https://am.ui.localhost/accessmanagement/ui/consent/request?id=019743e8-cb17-7f9f-b690-fb1338003c23"
}
```