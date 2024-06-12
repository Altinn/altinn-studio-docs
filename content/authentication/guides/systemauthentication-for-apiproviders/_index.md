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
- Integrasjon med Altinn PDP


## Systenm

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


## Bruk av systembrukertoken mot API

Tokenet man får fra maskinporten legges ved som et bearer token mot de API man skal kalle. 


## Test av systembruker i TT02

For å teste systembruker i TT02 kreves følgende

 - Systemleverandør opprettet i maskinporten. Gjøres via servicedesk@digdir.no
 - Systemleverandør opprettet i Altinn. Gjøres vie servicedesk@altinn.no
 - Systemintegrasjon opprettet i maskinporten test.


For opprettelse av systembrukere kan testbrukere/organisasjoner fra Tenor benyttes