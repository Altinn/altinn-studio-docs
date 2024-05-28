---
title: Sette opp integrasjon mot Altinn Autorisasjon fra eksterne tjenester
linktitle:  Ekstern autorisasjon
description:  Denne guiden beskriver hvordan man fra en ekstern tjeneste kan integrere seg mot Altinn Autorisasjon
toc: false
weight: 4
---


## Sette opp integrasjon med ID-porten 

For at man skal kunne autorisere sluttbrukere i en digital tjeneste er det nødvendig å kunne autentisere brukeren.

Dette gjøres typisk ved hjelp av ID-porten


## Få tilgang til Altinns API

For å få tilgang til Altinns API trenger tjenesteier følgende

- API Subscription for produktene Access Management. 
- Scope for avgiverliste for tjenesteeierbruker "altinn:accessmanagement/authorizedparties.resourceowner"
- Scope for PDP "altinn:authorization/authorize"

Dette kan bestilles hos Altinn tjenester@altinn.no

## Sette opp tilgangs håndtering i egen applikasjon

I applikasjonen som tilbyr tjenesten må tjenesteeier sette opp tilgangshåndtering for når brukere aksesserer funksjonalitet
som krever autorisasjon.  I Altinn kaller vi slik kode "Policy Enforcment Point" eller PEP. 

Policy Enforcement Point sin oppgave er å kalle Policy Decision Point for å få svar på om sluttbruker/system er autorisert for å utføre forespurt operasjon.

## Integrasjon med API for autoriserte parter (Avgivere)

For å kunne presentere en liste over avgivere som en sluttbruker kan velge mellom tilbyr Altinn et API for å kunne presentere dette. 

![Autoriserte parter fra vegvesen.no](authorizedparty.png "Autoriserter parter fra Altinn presentert på vegvesen.no")

API som Altinn tilbyr heter AuthorizedParties. Dokumentasjon finnes [her](https://docs.altinn.studio/nb/api/accessmanagement/resourceowneropenapi/#/Authorized%20Parties/post_resourceowner_authorizedparties) 

Input er personr til autentisert person på følgende format

```json
{
  "type": "urn:altinn:person:identifier-no",
  "value": "01017012345"
}
```

## Integrasjon med PDP

Det er laget et eget PDP API som støtter at PEP gjør et autorisasjonskall basert på XACML Json Profile.

Dokumentasjonen finnes [her](https://docs.altinn.studio/nb/api/authorization/spec/#/Decision/post_authorize)

Nedenfor vises eksempel på kall som autoriserer **01017012345** for **read** på ressursen **ttdintegrasjonstest1** for organisasjon **312824450**


```json
{
  "Request": {
    "ReturnPolicyIdList": true,
    "AccessSubject": [
      {
        "Attribute": [
          {
            "AttributeId": "urn:altinn:person:identifier-no",
            "Value": "01017012345"
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
            "Value": "ttdintegrasjonstest1"
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


