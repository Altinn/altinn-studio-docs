---
title: Ta i bruk systembruker for API-leverandører
linktitle: Systembruker for API
description: Systembruker er et nytt konsept for API-autentisering. Denne guiden beskriver hvordan API-leverandører kan beskytte sine API-er med dette konseptet.
toc: false
weight: 1
---

{{<notice warning>}}
 Denne funksjonaliteten er i test og kan endres
{{</notice>}}

## Bakgrunn

Bakgrunnen til systembruker konsept kan leses om [her](../../what-do-you-get/systemuser/).

## Forutsetninger

For å kunne bruke systembruker som API-leverandør må følgende forutsetninger være oppfylt:

- Avtale med Maskinporten som [API-leverandør](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apitilbyder)
- Avtale med Digdir for tilgang til ressursregisteret for opprettelse av ressurser
- Opprettelse av [nødvendige ressurser](/authorization/guides/create-resource-resource-admin/) som skal autoriseres
- Tildelt scope for PDP-integrasjon
- Integrasjon med Altinn PDP

## Validering av Maskinporten token

Selve tokenet valideres som et standardisert Maskinporten token. [Les mer hos Maskinporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apitilbyder).

Et systembrukertoken inneholder en del flere detaljer enn et vanlig Maskinporten token. 

Nedenfor vises et eksempeltoken.

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

Verdiene som er viktige for API leverandør er.


| Verdi  | Betydning |
|----|-----|
|authorization_details:systemuser_id| Unik id for systembrukeren. Det er denne verdien som Altinn trenger for å kunne autorisere tilgang. Det er denne som har fått delegert tilganger. |
|authorization_details:systemuser_org:id | Organisasjonen som har opprettet systembrukeren |
|authorization_details:system_id |  Referanse til systemet som systembrukeren peker på |
|Consumer:id | Organisasjonsnr til systemleverandør (organisasjon som har autentisert seg mot Maskinporten) |    




Se også dokumentasjon hos [Maskinporten](https://docs.digdir.no/docs/Maskinporten/maskinporten_func_systembruker). 

## Autorisasjon av systembruker

API-leverandøren må kalle Altinn PDP for å autorisere tilgangen til systembrukeren. Dette gjøres ved å sende et kall til Altinn PDP.

API-leverandøren må konfigurere hvilke handlinger og ressurser som aksesseres via API-et for å bygge opp den totale forespørselen.

Nedenfor vises et eksempel på et kall utført av systembruker **a545ca29-7fb8-4810-a2f2-0be171cb2a26** som prøver å gjøre en **read**-operasjon 
på en ressurs av typen **kravogbetaling** for organisasjonen **923609016**.


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