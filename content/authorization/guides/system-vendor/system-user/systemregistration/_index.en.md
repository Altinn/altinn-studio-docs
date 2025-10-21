---
title: System Registration
description: This guide describes how you, as an end-user system provider, register a system in the system registry.
linktitle: System Registration
weight: 1
---

## Prerequisites

The system provider must contact Digdir to gain access to the system registry and system user scopes. The procedure is described at [Samarbeidsportalen](https://samarbeid.digdir.no/altinn/kom-i-gang/2868). 
- We recommend that the SBS organization number is added to the TT02 test environment. 
- SBS must contact [servicedesk@altinn.no](mailto:servicedesk@altinn.no) to create a real organization number in TT02.
- Contact the service owner to find out which access packages the service API is associated with.

## System registration in Systemregisteret

The end-user system provider then registers the end-user system in Altinn's system registry via API. The necessary rights are defined to access a service by linking the client ID to the system.

The organization number in "id" and "ID" must match, as well as what is in the token. Both Maskinporten token and Altinn token are supported.

```json
{
  "id": "991825827_smartcloud",
  "vendor": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:991825827"
  },
  "name": {
    "nb": "SmartCloud 1",
    "en": "SmartCloud 1",
    "nn": "Smart SKY"
  },
  "description": {
    "nb": "SmartCloud er verdens beste system.",
    "en": "SmartCloud Rocks.",
    "nn": "SmartSky er vestlandets beste system"
  },
  "rights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "ske-krav-og-betalinger"
        }
      ]
    }
  ],
  "accessPackages": [
    {
      "urn": "urn:altinn:accesspackage:skattegrunnlag"
    }
  ],
  "clientId": ["32ef65ac-6e62-498d-880f-76c85c2052ae"],
  "allowedredirecturls": ["https://smartcloudxxxx/receipt"],
  "isVisible": true
}
```

## Important Notes

- The ClientId in the system registry is the same as used later when using system user against Maskinporten.
- Systems can be changed and deleted afterwards.

## Model for System Registry Information

Model for reading and writing system registry information.

### Model Id

**Format:** `{systemleverandørorgnr}_{valgt navn}`

**Example:** `991825827_testprodukt`

### Vendor

The organization number of the system provider must include a reference to the Entity Register.

For example:

```json
"vendor": {
  "ID": "0192:991825827"
}
```

«0192» is the reference indicating that it is a value for the Entity Register according to the Electronic Address Scheme, and 991825827 is the organization number of the Norwegian Digitalisation Agency.

### Description and Name

Used for display in the Altinn portal.

**Language support:** nb, nn, en.

```json
"name": {
  "nb": "The Matrix",
  "en": "The Matrix",
  "nn": "The Matrix"
}

"description": {
  "nb": "Test system",
  "en": "Test system",
  "nn": "Test system"
}
```

### Rights and AccessPackages

Defines which services or access packages are required.  
These **must** be set **before** the system user can be created.

```json
"rights": [
  {
    "resource": [
      {
        "id": "urn:altinn:resource",
        "value": "app_ttd_endring-av-navn-v2"
      }
    ]
  },
  {
    "resource": [
      {
        "id": "urn:altinn:resource",
        "value": "ske-krav-og-betalinger"
      }
    ]
  }
]

"accessPackages": [
  {
    "urn": "urn:altinn:accesspackage:skattnaering"
  }
]
```

### ClientId

A system can be linked to multiple client IDs. These client IDs are generated for integrations in Maskinporten, each of them is unique and specifically linked to one system.

```json
"clientId": [
  "32ef65ac-6e62-498d-880f-76c85c2052ae"
]
```

### IsVisible

- **True:** The system is visible in the Altinn portal and can be used to create a system user.
- **False:** The system is not visible in the Altinn portal, and the system user must be created through supplier-controlled creation.

```json
"isVisible": true
```

### AllowedRedirectUrls

You are allowed to create a system user request with a subset of the specified URLs.

```json
"allowedredirecturls": [
  "https://smartcloudxxxx/receipt"
]
```
