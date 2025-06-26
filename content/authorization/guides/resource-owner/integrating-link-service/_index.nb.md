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

Dette kan bestilles hos Altinn servicedesk@altinn.no

Når API scopes er tildelt organisasjonen kan man sette opp en integrasjon i Maskinporten som tildeles scopene.

Ved å autentisere seg mot Maskinporten med den aktuelle klientene får man da en token som er autorisert til disse API.

Dette maskinporten tokenet må veksles inn til et Altinn token. 

Oppsett av Maskinportenklient og innveksling er beskrevet [her](/api/authentication/maskinporten/).

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

Response

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



### Multi Resource-integrasjon med PDP

Altinn PDP tilbyr en praktisk løsning i scenarier der flere elementer må autoriseres for en gitt bruker samtidig. Takket være XACML Jason-profilen, støtter den flere autorisasjonsforespørsler i en enkelt PDP-forespørsel, og lindrer potensielle komplikasjoner.

I eksemplet nedenfor må en bruker være autorisert for tre ressurser som eies av en annen organisasjon og av to forskjellige typer.
```json
{
  "Request": {
    "ReturnPolicyIdList": true,
    "AccessSubject": [
      {
        "Id": "s1",
        "Attribute": [
          {
            "AttributeId": "urn:altinn:person:identifier-no",
            "Value": "01039012345"
          }
        ]
      }
    ],
    "Action": [
      {
        "Id": "a1",
        "Attribute": [
          {
            "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
            "Value": "read",
            "DataType": "http://www.w3.org/2001/XMLSchema#string",
            "IncludeInResult": true
          }
        ]
      }
    ],
    "Resource": [
      {
        "Id": "r1",
        "Attribute": [
          {
            "AttributeId": "urn:altinn:resource",
            "Value": "ttd-externalpdp-resource1",
            "IncludeInResult": true
          },
          {
            "AttributeId": "urn:altinn:organization:identifier-no",
            "Value": "897069651",
            "IncludeInResult": true
          }
        ]
      },
      {
        "Id": "r2",
        "Attribute": [
          {
            "AttributeId": "urn:altinn:resource",
            "Value": "ttd-externalpdp-resource1",
            "IncludeInResult": true
          },
          {
            "AttributeId": "urn:altinn:organization:identifier-no",
            "Value": "950474084",
            "IncludeInResult": true
          }
        ]
      },
      {
        "Id": "r3",
        "Attribute": [
          {
            "AttributeId": "urn:altinn:resource",
            "Value": "ttd-externalpdp-resource3",
            "IncludeInResult": true
          },
          {
            "AttributeId": "urn:altinn:organization:identifier-no",
            "Value": "950474084",
            "IncludeInResult": true
          }
        ]
      }
    ],
    "MultiRequests": {
      "RequestReference": [
        {
          "ReferenceId": [
            "s1",
            "a1",
            "r1"
          ]
        },
        {
          "ReferenceId": [
            "s1",
            "a1",
            "r2"
          ]
        },
        {
          "ReferenceId": [
            "s1",
            "a1",
            "r3"
          ]
        }
      ]
    }
  }
}

```
Du får en liste over svar i retur. I forespørselen forteller du hvilke elementer du trenger i retur for hver forespørsel for å kunne kartlegge svaret på forespørselen.
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
      ],
      "Category": [
        {
          "CategoryId": "urn:oasis:names:tc:xacml:3.0:attribute-category:action",
          "Attribute": [
            {
              "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
              "DataType": "http://www.w3.org/2001/XMLSchema#string",
              "Value": "read"
            }
          ]
        },
        {
          "CategoryId": "urn:oasis:names:tc:xacml:3.0:attribute-category:resource",
          "Attribute": [
            {
              "AttributeId": "urn:altinn:resource",
              "DataType": "http://www.w3.org/2001/XMLSchema#string",
              "Value": "ttd-externalpdp-resource1"
            },
            {
              "AttributeId": "urn:altinn:organization:identifier-no",
              "DataType": "http://www.w3.org/2001/XMLSchema#string",
              "Value": "897069651"
            }
          ]
        }
      ]
    },
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
      ],
      "Category": [
        {
          "CategoryId": "urn:oasis:names:tc:xacml:3.0:attribute-category:action",
          "Attribute": [
            {
              "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
              "DataType": "http://www.w3.org/2001/XMLSchema#string",
              "Value": "read"
            }
          ]
        },
        {
          "CategoryId": "urn:oasis:names:tc:xacml:3.0:attribute-category:resource",
          "Attribute": [
            {
              "AttributeId": "urn:altinn:resource",
              "DataType": "http://www.w3.org/2001/XMLSchema#string",
              "Value": "ttd-externalpdp-resource1"
            },
            {
              "AttributeId": "urn:altinn:organization:identifier-no",
              "DataType": "http://www.w3.org/2001/XMLSchema#string",
              "Value": "950474084"
            }
          ]
        }

      ]
    },
    {
      "Decision": "NotApplicable",
      "Status": {
        "StatusCode": {
          "Value": "urn:oasis:names:tc:xacml:1.0:status:ok"
        }
      },
      "Category": [
        {
          "CategoryId": "urn:oasis:names:tc:xacml:3.0:attribute-category:action",
          "Attribute": [
            {
              "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
              "DataType": "http://www.w3.org/2001/XMLSchema#string",
              "Value": "read"
            }
          ]
        },
        {
          "CategoryId": "urn:oasis:names:tc:xacml:3.0:attribute-category:resource",
          "Attribute": [
            {
              "AttributeId": "urn:altinn:resource",
              "DataType": "http://www.w3.org/2001/XMLSchema#string",
              "Value": "ttd-externalpdp-resource3"
            },
            {
              "AttributeId": "urn:altinn:organization:identifier-no",
              "DataType": "http://www.w3.org/2001/XMLSchema#string",
              "Value": "950474084"
            }
          ]
        }

      ]
    }
  ]
}

```