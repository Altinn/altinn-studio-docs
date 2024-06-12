---
title: Ta i bruk systembruker for systemleverandører
linktitle: Systembruker for SBS
description: Systembruker er et nytt konsept for API autentisering. Denne guiden beskriver hvordan man som systemleverandør kan benytte seg av dette.
toc: false
weight: 1
---

{{<notice warning>}}
This functionality is in testing and subject to change.
{{</notice>}}

## Background

The background of the systembruker concept can be read about here.

## Prerequisites

To use systembruker as a system provider, the following prerequisites must be met:

- Agreement with Maskinporten as a client
- Agreement with Digdir granting access to the system register

## Setting Up Maskinporten Integration

To consume public APIs with systembruker, you need to register at least one MaskinPorten integration. This can be done through the [collaboration portal](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#opprette-klient-for-%C3%A5-konsumere-api) or via the [API](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_api#registrere-klient).

## Registering a System

The first step after gaining access to the system register is to register your system.

Typically, the system is web-based software available in the market that end customers (organizations) can use for communication with the public sector.

The system must be described with the following properties:

### SystemTypeId

This is a unique ID used to identify the software. Valid characters are a-z, 0-9, and _.

### KlientId

This is the client ID for the integration created in Maskinporten. Only logins with Maskinporten integrations associated with specific client IDs are allowed.


```json
{
 "SystemTypeId": "visma_supertax",
 "SystemVendor": "978234522",
 "Name": {
      "en": "Visma Super Tax",
     "nb" : "Visma superskatt"
  "Description": {
     "en": "Visma Super Tax allows for .........",
     "nb":  "Visma superskatt gir deg mulighet...."
  }
  },
  "AccessGroupNeeds": ["MVA", "SKATT"],
  "ResourceNeeds": ["urn:altinn:resource:skd/mva"],.
  "ClientId":["123123","234534552345"]
}
```

## Maskinporten autentisering

Når system skal autentisere seg som systembrukeren til kunden må JWT grant forespørselen til maskinporten inneholde informasjon om kunden


### JWT Grant

```json
{
  "aud" : "https://maskinporten.no",
  "sub" : "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "authorization_details" : [ {
    "systemuser_org" : {
      "authority" : "iso6523-actorid-upis",
      "ID" : "0192:310385980"
    },
    "type" : "urn:altinn:systemuser"
  } ],
  "scope" : "krr:global/kontaktinformasjon.read",
  "iss" : "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "exp" : 1718124835,
  "iat" : 1718124715,
  "jti" : "89365ecd-772b-4462-a4de-ac36af8ef3e2"
}

```


### JWT Token


```json
{
  "authorization_details" : [ {
    "type" : "urn:altinn:systemuser",
    "systemuser_org" : {
      "authority" : "iso6523-actorid-upis",
      "id" : "0192:310385980"
    },
    "systemuser_id" : [ "a545ca29-7fb8-4810-a2f2-0be171cb2a26" ],
    "system_id" : "systembrukar_test"
  } ],
  "scope" : "krr:global/kontaktinformasjon.read",
  "supplier" : {
    "authority" : "iso6523-actorid-upis",
    "ID" : "0192:991825827"
  },
  "iss" : "https://maskinporten.no",
  "client_amr" : "private_key_jwt",
  "token_type" : "Bearer",
  "exp" : 1718124836,
  "delegation_source" : "https://maskinporten.dev/",
  "iat" : 1718124716,
  "client_id" : "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "jti" : "8aVHR7gkm7HDqakr8mfs8rAQQR_OAU4WG0BXUPi5Leg",
  "consumer" : {
    "authority" : "iso6523-actorid-upis",
    "ID" : "0192:314330897"
  }
}

See also documentation at [Maskinporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_func_systembruker).

## Using Systembruker Tokens with APIs

The token obtained from Maskinporten should be included as a bearer token when making API calls.

## Testing Systembruker in TT02

To test systembruker in TT02, the following steps are required:

1. **System Provider Registration in Maskinporten**:
   - Create a system provider in Maskinporten. This can be done via [servicedesk@digdir.no](mailto:servicedesk@digdir.no).

2. **System Provider Registration in Altinn**:
   - Create a system provider in Altinn. This can be done via [servicedesk@altinn.no](mailto:servicedesk@altinn.no).

3. **System Integration Setup in Maskinporten Test Environment**:
   - Create a system integration in the Maskinporten test environment.

4. **Creating Systembrukers**:
   - For systembruker creation, you can use test users/organizations from Tenor.
