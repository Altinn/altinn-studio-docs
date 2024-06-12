---
title: Ta i bruk systembruker for systemleverandører
linktitle: Systembruker for SBS
description: Systembruker er et nytt konsept for API autentisering. Denne guiden beskriver hvordan man som systemleverandør kan benytte seg av dette.
toc: false
weight: 1
---

{{<notice warning>}}
 Denne funksjonaliteten er i test og kan endres
{{</notice>}}

## Bakgrunn

Bakgrunnen til systembruker konsept kan leses om her.

##  Forutsetninger

Forutsetninger for at man systemleverandør kan benytte seg systembruker er.

- Avtale med maskinporten som klient
- Avtale med Digdir som gir tilgang til systemregister

## Sette opp maskinporten integrasjon

For å konsumere offentlige API med systembrukere trenger man å registrere minst en MaskinPorten integrasjon. 
Dette kan gjøres i [sammarbeidsportalen](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_web#opprette-klient-for-%C3%A5-konsumere-api) eller via [API](https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_api#registrere-klient).

## Registrere system

Første steg etter man har fått tilgang til systemregisteret er å registrere systemet.

Systemet er da typisk en nettbasert programvare som er tilgjengelig i markedet som sluttkunder (virksomheter) kan
benytte seg av for kommunukasjon med det offentlige. 

Systemet må beskrives med følgende egenskaper

### SystemTypeId

Dette er en unik ID som vil benyttes for å identifisere programvaren. Gyldige tegn er a-z 0-9 og _

### KlientId

Dette er klientidene for integrasjonen som er opprettet i Maskinporten. 
Det er kun pålogginger med Maskinportenintegrasjoner som er knyttet mot oppgitte klientider.


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