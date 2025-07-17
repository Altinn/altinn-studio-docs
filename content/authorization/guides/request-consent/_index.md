---
title: Consent for Data Consumers
description: How to use the consent solution for data consumers in Altinn 3
linktitle: Consent
toc: false
weight: 10
---

## Introduction

This documentation describes how data consumers can request, retrieve, and manage consent using Altinn 3's consent solution. Consent gives data consumers access to specific data resources for individuals or organizations, as defined by the API provider.

## Glossary

* **Data Consumer**: The organization requesting access to data about an individual or another organization.
* **Resource**: A category of data defined by the actor providing the API in Altinn (e.g., income information, tax base).

## Providers of Consent Solutions

Below are some key actors with consent solutions for Altinn 2. Most are expected to migrate to Altinn 3 during Q3 2025 or Q1 2026:

* **Skatteetaten (Norwegian Tax Administration)**
  * [About Consent](https://skatteetaten.github.io/api-dokumentasjon/en/om/samtykke)
  * [Income API](https://skatteetaten.github.io/api-dokumentasjon/en/api/inntekt)
  * [Summed Tax Base API](https://skatteetaten.github.io/api-dokumentasjon/en/api/summertskattegrunnlag)
  * [Claims and Payments API](https://skatteetaten.github.io/api-dokumentasjon/en/api/kravogbetalinger)
  * [Employer's National Insurance Contribution API](https://skatteetaten.github.io/api-dokumentasjon/en/api/arbeidsgiveravgift)
  * [VAT Reporting Information API](https://skatteetaten.github.io/api-dokumentasjon/en/api/mva_meldingsopplysning)
  * [Foreign Companies Assignments API](https://skatteetaten.github.io/api-dokumentasjon/en/api/oppdragutenlandskevirksomheter)
  * [Outstanding Claims API](https://skatteetaten.github.io/api-dokumentasjon/en/api/restanser)
* **Lånekassen (Norwegian State Educational Loan Fund)**
  * [Student Loan Balance](https://dokumentasjon.dsop.no/dsop_saldostudielan_om.html)

Altinn itself offers APIs for requesting consent and retrieving the status of consent requests.

## 1. Request Consent

### 1.1 Prerequisites

1. The data consumer must have a registered Maskinporten client.
2. The data consumer must have been delegated the consent scope from Digdir.
3. The necessary scopes must be added to the Maskinporten client.
4. Access to request consent for the relevant resource(s) must be granted.

### 1.2 API Endpoint

* **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/`
* **Production**: `POST https://platform.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/`

#### Request (example)

```json
{
  "id": "019743e8-cb17-7f9f-b690-fb1338003c23",
  "from": "urn:altinn:person:identifier-no:01025161013",
  "to": "urn:altinn:organization:identifier-no:810419512",
  "validTo": "2025-06-07T06:23:39.2925023+00:00",
  "consentRights": [
    {
      "action": ["read"],
      "resource": [{"type": "urn:altinn:resource", "value": "ttd_inntektsopplysninger"}],
      "metadata": {"INNTEKTSAAR": "2024"}
    }
  ],
  "requestMessage": {"en": "Please approve this consent request"},
  "redirectUrl": "https://www.dnb.no"
}
```

#### Response (example)

```json
{
  "id": "019743e8-cb17-7f9f-b690-fb1338003c23",
  "from": "urn:altinn:person:identifier-no:01025161013",
  "to": "urn:altinn:organization:identifier-no:810419512",
  "validTo": "2025-06-07T06:23:39.292502+00:00",
  "consentRights": [{"action": ["read"],"resource": [{"type": "urn:altinn:resource","value": "ttd_inntektsopplysninger"}],"metaData": {"INNTEKTSAAR": "2024"}}],
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

## 2. Retrieve Consent Token

In Altinn 3, the consent token is retrieved as part of the Maskinporten token. Specify the following in the JWT:

```json
{
  "aud": "https://ver2.maskinporten.no/",
  "scope": "<scope>",
  "iss": "<client_id>",
  "exp": 1584693183,
  "iat": 1584693063,
  "jti": "<jti>",
  "type": "urn:altinn:consent",
  "id": "<consent_request_id>",
  "from": "urn:altinn:person:identifier-no:<pid>"
}
```

## 3. Consent on Behalf of Others

To create consent requests on behalf of other organizations, the scope must be delegated:

1. The organization that will be the recipient delegates the necessary scope(s) in Altinn under API delegation.
2. The request is created as described above.
3. When retrieving the token, also specify `consumer_org`:

```json
{
  "aud": "https://ver2.maskinporten.no/",
  "scope": "<scope>",
  "iss": "<client_id>",
  "exp": 1584693183,
  "iat": 1584693063,
  "jti": "<jti>",
  "type": "urn:altinn:consent",
  "id": "<consent_request_id>",
  "from": "urn:altinn:person:identifier-no:<pid>",
  "consumer_org": "<customer_orgnr>"
}
```

![Scope delegation in Altinn](scopedelegation.jpg)

## Resources

* [Maskinporten: API Consumer Guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument.html)
* [GitHub: Test Implementation](https://github.com/TheTechArch/smartbank)
