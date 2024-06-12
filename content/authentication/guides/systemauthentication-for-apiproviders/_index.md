---
title: Utilize system user for API providers
linktitle: Systemusers for API
description: System user is a new concept for API authentication. This guide describes how API providers can protect their APIs using this concept.
toc: false
weight: 1
---

{{<notice warning>}}
 Denne funksjonaliteten er i test og kan endres
{{</notice>}}

## Background

You can read about the background of the system user concept [here](../../what-do-you-get/systemuser/).

## Prerequisites

To use a system user as an API provider, the following prerequisites must be met:

- Agreement with Maskinporten as an API provider
- Agreement with Digdir for access to the resource registry for resource creation
- Creation of necessary resources to be authorized
- Assigned scope for PDP integration
- Integration with Altinn PDP

## Validation of Maskinporten Token

The token itself is validated as a standardized Maskinporten token. [Read more at Maskinporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apitilbyder).

A system user token contains more details than a regular Maskinporten token.

Below is an example token.

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
  "iss" : "https://maskinporten.dev/",
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

```

Verdiene som er viktige for API leverandør er.


| Verdi  | Betydning |
|----|-----|
|authorization_details:systemuser_id| Unik id for systembrukeren. Det er denne verdien som Altinn trenger for å kunne autorisere tilgang. Det er denne som har fått delegert tilganger. |
|authorization_details:systemuser_org:id | Organisasjonen som har opprettet systembrukeren |
|authorization_details:system_id |  Referanse til systemet som systembrukeren peker på |
|Consumer:id | Organisasjonsnr til systemleverandør (organisasjon som har autentisert seg mot Maskinporten) |    

See also the documentation at [Maskinporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_func_systembruker).

## Authorization of System User

The API provider must call Altinn PDP to authorize access for the system user. This is done by sending a request to Altinn PDP.

The API provider must configure which actions and resources are accessed via the API to build the complete request.

Below is an example of a request made by the system user **a545ca29-7fb8-4810-a2f2-0be171cb2a26**, attempting to perform a **read** operation on a resource of type **kravogbetaling** for the organization **923609016**.

```json
{
   "Request": {
     "ReturnPolicyIdList": true,
     "AccessSubject": [
       {
         "Attribute": [
           {
             "AttributeId": "urn:altinn:systemuser:uuid",
             "Value": "a545ca29-7fb8-4810-a2f2-0be171cb2a26"
           }
         ]
       }
     ],
     "Action": [
       {
         "Attribute": [
           {
             "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
             "Value": "read",
             "DataType": "http://www.w3.org/2001/XMLSchema#string"
           }
         ]
       }
     ],
     "Resource": [
       {
         "Attribute": [
           {
             "AttributeId": "urn:altinn:resource",
             "Value": "kravogbetaling"
           },
           {
             "AttributeId": "urn:altinn:organization:identifier-no",
             "Value": "923609016"
           }
         ]
       }
     ]
   }
}

```

Altinn PDP returnerer svaret som en XACML Json respons hvor det informeres om request autorisert eller ikke. 

API tilbyder må i sitt API ha logikk for å kunne avvise eller godta forespørsel fra system basert på dette. 


```json
{
  "Response": [
    {
      "Decision": "Permit",
      "Status": {
        "StatusCode": {
          "Value": "urn:oasis:names:tc:xacml:1.0:status:ok"
        }
      },
      "Obligations": [
        {
          "id": "urn:altinn:obligation:authenticationLevel1",
          "attributeAssignment": [

            {
              "attributeId": "urn:altinn:obligation-assignment:1",
              "value": "2",
              "category": "urn:altinn:minimum-authenticationlevel",
              "dataType": "http://www.w3.org/2001/XMLSchema#integer",
              "issuer": null
            }
          ]
        }
      ]
    }
  ]
}
```


Se flere eksempler på bruk av Altinn PDP her. 