---
title: Using System User for System Providers
linktitle: System User for SBS
description: System User is a new concept for API authentication. This guide describes how system providers can use it.
toc: false
weight: 1
---

{{<notice warning>}}
 This functionality is in testing and may change.
{{</notice>}}

## Background

The background of the system user concept can be read about [here](https://github.com/Altinn/altinn-authentication/issues/200).

## Prerequisites

Prerequisites for a system provider to use system user are:

- [Agreement with Maskinporten as a consumer](https://samarbeid.digdir.no/maskinporten/konsument/119)
- Agreement with Digdir that provides access to the system register
- Delegated access to scope altinn:authentication/systemregister.write
- Delegated access to scope altinn:authentication/systemuser.request.read
- Delegated access to scope altinn:authentication/systemuser.request.write

In addition, access to the scope for the API that the system will use is required. This information is held by the service owner.

## Setting up Maskinporten integration

To consume public APIs with system users, you need to register at least one MaskinPorten integration.
This can be done in the [collaboration portal](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#opprette-klient-for-%C3%A5-konsumere-api) or via [API](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_api#registrere-klient).

## Registering a system

The first step after gaining access to the system register is to register the system.

The system is typically web-based software available in the market, which end customers (businesses) can use for communication with the public sector.

The system must be described with the following properties:

### Id

This is a unique ID used to identify the software. Valid characters are a-z 0-9 and _

The ID must start with the supplier's organization number. The example below shows with the Digitalization Directorate's organization number.

### Vendor

This is information about the supplier.
ID is in the format 0192:{orgnr}

0192 is a reference to the Entity Register in the [Electronic Address Scheme](https://docs.peppol.eu/poacc/billing/3.0/codelist/eas/)

### Name

The name of the system must be provided in English (en), Bokmål (nb), and Nynorsk (nn). The name can be the same in all languages.

The name is presented on Altinn pages during system user registration.

### Description

Description describes the system. It can be presented on Altinn pages for information to end users.

Provided in English, Bokmål, and Nynorsk.

### Rights

Rights describe which services the system needs rights to function. These are references to applications in the Altinn platform or services outside Altinn registered with Altinn.

The required rights will depend on the use case.

The example below shows a system that needs access to the service [Claims and Payments](https://skatteetaten.github.io/api-dokumentasjon/api/kravogbetalinger) from the Tax Directorate, which is [registered in the Altinn resource register](https://platform.tt02.altinn.no/resourceregistry/api/v1/resource/ske-krav-og-betalinger).

Later, System User will support access packages, which are a collection of rights across services within an area.

### ClientId

These are the client IDs for the integration created in Maskinporten.

Only logins with Maskinporten integrations linked to the specified client IDs are allowed.

### Example from TT02

The example shows the system registered for the demo application SmartCloud in the TT02 test environment.

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
  "ClientId": [ "a2ed712d-8188-4471-839f-80ae4a68146b" ]
}
```

URL to register

```http
POST https://platform.tt02.altinn.no/authentication/api/v1/systemregister/system
```

URL to update this system (ID must be changed for other systems)

```http
POST https://platform.tt02.altinn.no/authentication/api/v1/systemregister/system/91825827_smartcloud
```

For production, change the domain to **platform.altinn.no**

See also [example application](https://github.com/TheTechArch/altinn-systemuser/tree/main/src/SystemAdmin) for registering a system.

## Sending a request to create a system user to a business

As a system provider, you can ask your customers to create a system user with the necessary rights.
This provides easy onboarding of new customers.

To do this, you must be assigned the scope **altinn:authentication/systemuser.request.write**

System User only supports businesses as customers.

### External ref

This is used as an external reference by the system provider. If not set, it is automatically set to the organization number.

### SystemId

Reference to the system.

### PartyOrgNo

Organization number of the system provider's customer.

### Rights

A list of rights the system user needs access to. It is currently described with a reference to the resource.

### RedirectUrl

This URL is used after the end user has accepted the request.

### Example

```json
{
  "externalRef": "313725138_2024",
  "systemId": "991825827_smartcloud",
  "partyOrgNo": "313725138",
  "rights": [
    {
      "resource": [
        {
          "value": "ske-krav-og-betalinger",
          "id": "urn:altinn:resource"
        }
      ]
    }
  ],
  "redirectUrl": "https://smartcloudaltinn.azurewebsites.net/receipt"
}
```

## Maskinporten authentication

When the system needs to authenticate as the system user for the customer, the JWT grant request to Maskinporten must contain information about the customer.

### JWT Grant

```json
{
  "aud": "https://maskinporten.no",
  "sub": "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "authorization_details": [
    {
      "systemuser_org": {
        "authority": "iso6523-actorid-upis",
        "ID": "0192:310385980"
      },
      "type": "urn:altinn:systemuser"
    }
  ],
  "scope": "krr:global/kontaktinformasjon.read",
  "iss": "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "exp": 1718124835,
  "iat": 1718124715,
  "jti": "89365ecd-772b-4462-a4de-ac36af8ef3e2"
}
```

### JWT Token

```json
{
  "authorization_details": [
    {
      "type": "urn:altinn:systemuser",
      "systemuser_org": {
        "authority": "iso6523-actorid-upis",
        "id": "0192:314168267"
      },
      "systemuser_id": ["ebe4a681-0a8c-429e-a36f-8f9ca942b59f"],
      "system_id": "matrix_test"
    }
  ],
  "scope": "krr:global/kontaktinformasjon.read",
  "iss": "https://test.maskinporten.no/",
  "client_amr": "private_key_jwt",
  "token_type": "Bearer",
  "exp": 1718175135,
  "iat": 1718175015,
  "client_id": "fc9a8287-e7cb-45e5-b90e-123048d32d85",
  "jti": "-SpfU--1Zn_Oqvkpjwu3oVn--VLcPzSAwjqyiP6zBEw",
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:314330897"
  }
}
```
See also documentation at [Maskinporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_func_systembruker).

## Using system user token against API

The token received from Maskinporten is attached as a bearer token to the APIs being called.

## Testing system user in TT02

To test system user in TT02, the following is required:

- System provider registered in Maskinporten. Done via servicedesk@digdir.no
- System provider registered in Altinn. Done via servicedesk@altinn.no
- System integration registered in Maskinporten test.

For creating system users, test users/organizations from Tenor can be used.

### Using system user token against API

The token received from Maskinporten is attached as a Bearer Token to the APIs being called.

### Testing system user in TT02

To test system user in TT02, the following is required:

- System provider registered in Maskinporten. This is done via servicedesk@digdir.no.
- System provider registered in Altinn. This is done via servicedesk@altinn.no.
- System integration registered in Maskinporten test.

For creating system users, test users/organizations from Tenor can be used.

### Reference implementation and setup

A reference implementation has been developed to demonstrate the use of system user. It is developed in C# and can be run as a console application.
It does the following:

1. Creates a token based on configured JSON Web Key, client ID, scope, and organization number of the system user creator.
2. Based on the token received, it makes calls to reference APIs that require system user.

See code with documentation [here](https://github.com/TheTechArch/altinn-systemuser).

### Setting up reference implementation with own configuration

A reference implementation has been developed to demonstrate the use of system user. It is developed in C# and can be run as a console application.

It does the following:

1. Creates a token based on configured JSON Web Key, client ID, scope, and organization number of the system user creator.
2. Based on the token received, it makes calls to reference APIs that require system user.

See code with documentation [here](https://github.com/TheTechArch/altinn-systemuser).

### Setting up reference implementation with own configuration

The repository contains the necessary test certificate to run the application. The following must be done to set up your own integration as a system provider:

1. Log in to [onboarding Maskinporten](https://onboarding.test.maskinporten.no/). Here you can use a test ID that is the CEO of a test entity.

    ![Onboarding](onboarding1.png "Simplified onboarding")

    ![Onboarding](onboarding2.png "Select entity")

    ![Onboarding](onboarding3.png "Overview of integrations in Maskinporten. Here you can add new ones")

    ![Onboarding](onboarding4.png "Create integration, search for required scope")

    ![Onboarding](onboarding5.png "Add any additional scope and describe the integration")

    ![Onboarding](onboarding6.png "Download generated keys")

    ![Onboarding](onboarding7.png "Integration created")

2. Get the system registered in the System Register with the correct client ID and linkage to necessary resources/access packages.

3. Log in with a test user at tt02.altinn.no. The user must have the access management role in Altinn for a test organization and go to the page [https://authn.ui.tt02.altinn.no/authfront/ui/auth/creation](https://authn.ui.tt02.altinn.no/authfront/ui/auth/creation).

    ![Onboarding](delegering1.png "10. Select system")

    ![Onboarding](delegering2.png "11. Accept creation of system user with rights to it")

    ![Onboarding](delegering3.png "12. Overview of system users for test organization")

4. Configure key, certificate, client ID, and scope in the test application.

```c#
string clientID = "7ee41fce-9f6e-4c32-8195-0fe2c1517f43";
string scope = "altinn:systembruker.demo";
string systemUserOrg = "210493352";
string pemCertificatePath = @".\mp-key.pem";
```
