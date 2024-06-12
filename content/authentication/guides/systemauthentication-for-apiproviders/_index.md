---
title: Ta i bruk systembruker for API leverandører
linktitle: Systembruker for API
description: Systembruker er et nytt konsept for API autentisering. Denne guiden beskriver hvordan man som API tilbyder kan beskytte sine API med dette.
toc: false
weight: 1
---

{{<notice warning>}}
 Denne funksjonaliteten er i test og kan endres
{{</notice>}}

## Bakgrunn

Bakgrunnen til systembruker konsept kan leses om her.

##  Forutsetninger

Forutsetninger for at man API leverandør kan benytte seg av systembruker er

- Avtale med maskinporten som API Leverandør
- Avtale med Digdir for ressurser i system registeret
- Opprettet ressurser(er) som skal autoriseres på
- Fått tildelt scope for PDP integrasjon
- Integrasjon med Altinn PDP


## Validering av Maskinporten token


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
Se også dokumentasjon hos [Maskinporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_func_systembruker). 


## Autorisasjon av systembruker

API leverandøren må kalle Altinn PDP for å autorisere tilgangen til systembrukeren.

Dette gjøres via et kall 


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
             "Value": "ttdintegrationtest1"
           },
           {
             "AttributeId": "urn:altinn:organization:identifier-no",
             "Value": "312824450"
           }
         ]
       }
     ]
   }
}

```

