---
title: Ta i bruk systembruker for systemleverandører
linktitle: Systembruker for systemleverandører
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

Dette er klientidene for integrasjonen som er opprettet i Maskinporten. Det er kun pålogginger med Maskinportenintegrasjoner som er knyttet mot oppgitte klientider som 


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
  "aud": "https://maskinporten.no/",
  "iss": "0e85a8ba-77e8-4a6c-a0f5-74fc328a9ffb",

  "scope": "digdir:dialogporten skatteetaten:mva"

   "authorization_details": [ {
    "type": "urn:altinn:systemuser",
    "systemuser_org": {
       "authority" : "iso6523-actorid-upis",  
       "ID": "0192:999888777"  
    }
}]
}

```


### JWT Token


```json
{
  "iss": "https://maskinporten.no",
  "scope":       "some_scope",
  "client_id":   "my_client_id",
  "exp": 1520589928,
  "iat": 1520589808,
  "jti": "asdjkl5434jlkfds"
  
  "authorization_details": [ {
    "type": "urn:altinn:systemuser",
    "systemuser_id": [ "a_unique_identifier_for_the_systemuser" ], 
    "systemuser_org": {"authority" : "iso6523-actorid-upis",  "ID": "0192:999888777" },
    "system_id": "a_unique_identifier_for_the_system",
  }]
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
