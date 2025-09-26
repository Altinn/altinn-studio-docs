---
title: Create and Publish Consent Resource
linktitle: Consent
description: This guide explains what to do as a service-owner to use Altinn Consent
toc: false
---

To use Altinn Consent, you must create consent resources for each set of services or data to be included in a consent.

Examples of such resources are the Tax Administration's "income API" and tax base, which banks use to access financial information during loan applications.

This guide explains how to set up a consent resource.

## Prerequisites

You must have access to resource administration for your organization. See the [Getting Started Guide]({{< relref "/authorization/getting-started/resource-admin-studio" >}}).

## Create New Resource

Select **Create Resource** in the upper right corner.

The resource ID should be named in the format `{serviceowner-code}-{understandableresourceid}`.

![consentresource](consentresource1.png)

### Name and Description

Give the consent resource a name and description. This is shown to users when they delegate access to give consent on behalf of organizations.

![consentresource](consentresource2.png)

### Consent Template

The choice of consent template determines how the consent is presented in Altinn for the user who will accept it.

For example, the template decides whether you can add custom text for the consent.

![consentresource](consentresource3.png)

### Metadata and Consent Text

Metadata is used for consent services where information beyond the service itself is needed. For example, this could be a restriction on which data or which year the consent applies to.

This metadata can be presented as part of the consent text shown to the end user.

![consentresource](consentresource4.png)

### One-Time Consent

If you want the service to only be available via one-time consent, you can set this option.

This means that the party requesting consent can only retrieve data once, regardless of the period length.

## Validate Consent

In the new consent solution for Altinn 3, it is **Maskinporten** that issues the consent token.  
The token is issued as a regular Maskinporten token, but also includes `authorization_details` attributes containing information about which rights the consent grants.

The example below shows a token from the **Smartbank** demo application in the TT02 test environment:

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
