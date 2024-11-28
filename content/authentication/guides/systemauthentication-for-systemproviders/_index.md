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
  "Id": "991825827_smartcloud",
  "Vendor": {
    "ID": "0192:991825827"
  },
  "Name": {
    "en": "SmartCloud",
    "nb": "SmartCloud",
    "nn": "Smart SKY"
  },
  "Description": {
    "en": "SmartCloud Rocks",
    "nb": "SmartCloud er verdens beste system.",
    "nn": "SmartSky er vestlandets beste system"
  },
  "Rights": [
    {
      "Resource": [
        {
          "value": "kravogbetaling",
          "id": "urn:altinn:resource"
        }
      ]
    }
  ],
  "AllowedRedirectUrls": [ "https://smartcloudaltinn.azurewebsites.net/receipt" ],
  "ClientId": [ "a2ed712d-4244-6671-839f-80ae4a68146b" ]
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
      "id" : "0192:314168267"
    },
    "systemuser_id" : [ "ebe4a681-0a8c-429e-a36f-8f9ca942b59f" ],
    "system_id" : "matrix_test"
  } ],
  "scope" : "krr:global/kontaktinformasjon.read",
  "iss" : "https://test.maskinporten.no/",
  "client_amr" : "private_key_jwt",
  "token_type" : "Bearer",
  "exp" : 1718175135,
  "iat" : 1718175015,
  "client_id" : "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "jti" : "-SpfU--1Zn_Oqvkpjwu3oVn--VLcPzSAwjqyiP6zBEw",
  "consumer" : {
    "authority" : "iso6523-actorid-upis",
    "ID" : "0192:314330897"
  }
}

```

See also documentation at [Maskinporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_func_systembruker).

## Using Systembruker Tokens with APIs

The token obtained from Maskinporten should be included as a bearer token when making API calls.

## Testing Systembruker in TT02

To test systembruker in TT02, the following steps are required:

- Add the system provider in Maskinporten. (orgnumber/name) This can be done via [servicedesk@digdir.no](mailto:servicedesk@digdir.no).
- Add the system provider in Altinn test environment.  (orgnumber/name) This can be done via [servicedesk@altinn.no](mailto:servicedesk@altinn.no).
- Create a system integration in the Maskinporten test environment.
- For systembruker creation, you can use test users/organizations from Tenor.
