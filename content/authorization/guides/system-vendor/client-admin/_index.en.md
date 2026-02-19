---
title: Client administration API
description: This guide explains how to use the client administration API.
linktitle: Client administration
toc: false
---

Altinn provides a client administration API for managing clients and users on behalf of service providers.

## OpenAPI 

- [EndUser](../../../../api/accessmanagement/enduser/)
- [Metadata](../../../../api/accessmanagement/metadata/)

## Prerequisites

There are two ways you can authenticate towards these APIs. The prerequisites differ depending on which method you choose.

### Authentication using ID-porten

When you use ID-porten, the person who is client administrator in an organisation can sign in to a system that uses the API.

- The person is delegated the scope `altinn:clientdelegations.write`.
- You have configured an ID-porten client in the application that requests this scope.
- You sign in as client administrator for the service provider.
- The system exchanges the ID-porten token for an Altinn token.

Once this is done, you have a token for a person who is authorised to call the API described in this guide.

### Authentication using a system user

It is also possible to use a [system user](../system-user/) as client administrator in the organisation.

This requires the following:

#### 1. Access to scope for the client delegation API

Through Altinn support you must be granted the following scopes:

- `altinn:clientdelegations.write` for the client delegation API itself.
- `altinn:authentication/systemregister.write` to be able to register a system in the system register.
- `altinn:authentication/systemuser.request.read` to be able to check the status of requests.
- `altinn:authentication/systemuser.request.write` to be able to submit requests.

#### 2. Set up a Maskinporten client

In the [self-service solution for Maskinporten](https://sjolvbetjening.samarbeid.digdir.no/login) you must configure one or more clients with the required scope.
It can be wise to use one client for administering the system register (the three last scopes) and a separate client for client administration.

#### 3. Define a system for client administration

In the Altinn system register you must [define a system](../system-user/systemregistration/) with the access package `urn:altinn:accesspackage:klientadministrator`.

Example of what such a system looks like for the organisation 991825827:

**Example JSON payload**

The example below shows how to register the system. `clientId` is the integration ID of the Maskinporten client that has been granted the scope `urn:altinn:accesspackage:klientadministrator`.
By registering this client on the system, the client will be able to obtain a system user token for client administration.

```json
    {
      "id": "991825827_clientadministrator",
      "vendor": {
        "authority": "iso6523-actorid-upis",
        "ID": "0192:991825827"
      },
      "name": {
        "nb": "Smart Client Admin",
        "en": "Smart Client Admin",
        "nn": "Smart Client Admin"
      },
      "description": {
        "nb": "System for å håndtere klienter og agenter i vår virksomhet",
        "en": "System for å håndtere klienter og agenter i vår virksomhet",
        "nn": "System for å håndtere klienter og agenter i vår virksomhet"
      },
      "accessPackages": [
        {
          "urn": "urn:altinn:accesspackage:klientadministrator"
        }
      ],
      "clientId": ["32ef65ac-6e62-498d-880f-76c85c2052ae"],
      "allowedredirecturls": ["https://myclientadmin.no/receipt"],
      "isVisible": true
    }
```


#### 4. Create a system user request

You have [submitted a request to create a system user](../system-user/systemuserrequest/) for your own organisation, where the access package `urn:altinn:accesspackage:klientadministrator` is required.

Example:

```json
    {
    "systemId": "991825827_smartcloud",
    "partyOrgNo": "991825827",
    "accessPackages": [
      {
        "urn": "urn:altinn:accesspackage:klientadministrator"
      }
    ],
    "redirectUrl": "https://myclientadmin.no/receipt"
    }
```

#### 5. Approve the request

A user in your organisation who has both **the access package for access management** and **the access package for client administrator** can [approve the request](../../end-user/system-user/accept-request/).

#### 6. Configure the system

You must configure the system with the registered client ID that [obtains the system user token](../system-user/usetoken/) from Maskinporten.
The system user token from Maskinporten must then be [exchanged for an Altinn token](../../../../api/).

Once this is done, you have a token for a system user who is authorised to call the API described in this guide.

## What is a service provider?

In this context, a service provider is an organisation that:

- Is registered as an accountant for other organisations in the Central Coordinating Register for Legal Entities.
- Is registered as an auditor for other organisations in the register.
- Is registered as a property manager for other organisations in the register.
- Has been delegated one or more access packages for organisations and individuals in Altinn.

## What is a client?

- An organisation that has registered the service provider in the register as its accountant.
- An organisation that has registered the service provider in the register as its auditor.
- An organisation (housing co-operative or owner-occupied property) that has registered the service provider in the register as its property manager.
- An organisation that has delegated access packages to the service provider in Altinn.
- An individual who has delegated an access package to the service provider in Altinn.

![Client admin](clientadmin.drawio.svg)

## What do client rights consist of?

Client rights consist of access packages that the service provider can further delegate to users in Altinn who are registered as agents for the service provider.

For rights granted through Altinn access management, this can include all access packages for organisations and individuals.

For client relationships registered in the Central Coordinating Register for Legal Entities, these relationships give the following:

### Accountant

The accountant role in the register gives [the following access packages](https://platform.altinn.no/accessmanagement/api/v1/meta/info/roles/46e27685-b3ba-423e-8b42-faab54de5817/packages?variant=AS) that can be further delegated.

Select the package name to see which concrete rights the packages give for services.

- Access package [Regnskapsfører lønn](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/43becc6a-8c6c-4e9e-bb2f-08fe588ada21)
- Access package [Regnskapsfører med signeringsrettighet](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/955d5779-3e2b-4098-b11d-0431dc41ddbe)
- Access package [Regnskapsfører uten signeringsrettighet](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/a5f7f72a-9b89-445d-85bb-06f678a3d4d1)

### Auditor

The auditor role in the register gives [the following access packages](https://platform.altinn.no/accessmanagement/api/v1/meta/info/roles/f76b997a-9bd8-4f7b-899f-fcd85d35669f/packages?variant=AS) that can be further delegated.

Select the package name to see which concrete rights the packages give for services.

- Access package [Ansvarlig revisor](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/2f176732-b1e9-449b-9918-090d1fa986f6)
- Access package [Revisormedarbeider](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/96120c32-389d-46eb-8212-0a6540540c25)

### Property manager

When you are registered as property manager for an organisation that is either a housing co-operative or an owner-occupied property, you get [the following access package](https://platform.altinn.no/accessmanagement/api/v1/meta/info/roles/348b2f47-47ee-4084-abf8-68aa54c2b27f/packages?variant=BRL).

- Access package [Forretningsfører eiendom](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/0195efb8-7c80-7cf2-bcc8-720a3fb39d44)

## Who can be given delegated client rights?

Any person with a national identity number or D number in Altinn can be granted client rights.

Before you can delegate client rights (access packages) to a person, there must be an agent relationship defined between the person and the service provider.
This is done via a separate API. Deleting the agent relationship will at the same time remove all client rights the service provider has granted to the agent.

## API description

The API lets you:

- Add new users in the organisation.
- Give users client rights for a client by delegating access packages.
- List users with rights for a client.


### Authentication

To use the API you must be signed in as client administrator for the service provider.

This happens via an ID-porten client.

The ID-porten token must be exchanged for an Altinn token.

### Identifiers

In the current version of the API, Altinn `partyUuid` identifiers are used.
These are UUIDs; each person or organisation in Altinn has a unique UUID.

#### How do I find these?

- `partyUuid` for the service provider is available in the authorised party API. This API lists all organisations and individuals a user is authorised for.
- `partyUuid` for the agent is available in the agent API.
- `partyUuid` for the client is available in the client API.

### API: list agents

This lets you list all persons who have been given the agent role for the service provider.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}`

The `party` parameter is the `partyUuid` for the service provider.

Example response

```json
{
  "links": {
    "next": null
  },
  "data": [
    {
      "agent": {
        "id": "01f7a70d-2619-4c50-8ff4-efd7ae6c8960",
        "name": "KREATIV GRANITT",
        "type": "Person",
        "variant": "Person",
        "keyValues": {
          "PartyId": "50441038",
          "PersonIdentifier": "08919574934",
          "DateOfBirth": "1895-11-08"
        },
        "parent": null,
        "children": null,
        "partyid": 50441038,
        "userId": 1465828,
        "username": null,
        "organizationIdentifier": null,
        "personIdentifier": "08919574934",
        "dateOfBirth": "1895-11-08",
        "dateOfDeath": "2020-12-22",
        "isDeleted": false,
        "deletedAt": null
      },
      "access": [
        {
          "role": {
            "id": "ff4c33f5-03f7-4445-85ed-1e60b8aafb30",
            "code": "agent",
            "urn": "urn:altinn:role:agent",
            "legacyurn ": null,
            "children": null
          },
          "packages": []
        }
      ]
    }
  ]
}
```


### API: add agent

This lets you add an agent for the service provider. Provide national identity number (fødselsnummer) or username, and last name.

- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}`
- **Production**: `POST https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}`

Example request body

```json
{
  "personidentifier": "01038712345", // fødselsnummer (national identity number) or username
  "lastName": "Salt"
}
```


Example response


```json
{
  "id": "019c2e70-c577-7b20-a11c-245fecd5e564",
  "roleId": "ff4c33f5-03f7-4445-85ed-1e60b8aafb30",
  "fromId": "4a06214d-b261-4695-b33a-0771a995b503",
  "toId": "01f7a70d-2619-4c50-8ff4-efd7ae6c8960"
}

```

### API: delete agent

This API removes the agent role that has been granted to a user from the service provider.

Client delegations given for clients will be removed in the same operation, depending on whether `cascade` is `false` or `true`. The default is `true`.

- **Test**: `DELETE https://platform.tt02.altinn.no{{baseUrl}}/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}&to={{to}}&cascade=false`
- **Production**: `DELETE https://platform.altinn.no{{baseUrl}}/accessmanagement/api/v1/enduser/clientdelegations/agents?party={{party}}&to={{to}}&cascade=false`


`{{party}}` is the `partyUuid` for the service provider.

`{{to}}` is the `partyUuid` for the agent.


### API: list clients

This API lets you list all clients.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/clients?party={{party}}`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/clients?party={{party}}`


`{{party}}` is the `partyUuid` for the service provider.


Example response

```json
{
  "links": {
    "next": null
  },
  "data": [
    {
      "client": {
        "id": "006cdf09-e874-4fcc-8502-5342b871e2ac",
        "name": "ENKEL SKJØR TIGER AS",
        "type": "Organisasjon",
        "variant": "AS",
        "keyValues": {
          "OrganizationIdentifier": "310757314",
          "PartyId": "51591744"
        },
        "parent": null,
        "children": null,
        "partyid": 51591744,
        "userId": null,
        "username": null,
        "organizationIdentifier": "310757314",
        "personIdentifier": null,
        "dateOfBirth": null,
        "dateOfDeath": null,
        "isDeleted": false,
        "deletedAt": null
      },
      "access": [
        {
          "role": {
            "id": "46e27685-b3ba-423e-8b42-faab54de5817",
            "code": "regnskapsforer",
            "urn": "urn:altinn:external-role:ccr:regnskapsforer",
            "legacyurn ": "urn:altinn:rolecode:regn",
            "children": null
          },
          "packages": [
            {
              "id": "a5f7f72a-9b89-445d-85bb-06f678a3d4d1",
              "urn": "urn:altinn:accesspackage:regnskapsforer-uten-signeringsrettighet",
              "areaId": "64cbcdc8-01c9-448c-b3d2-eb9582beb3c2"
            },
            {
              "id": "43becc6a-8c6c-4e9e-bb2f-08fe588ada21",
              "urn": "urn:altinn:accesspackage:regnskapsforer-lonn",
              "areaId": "64cbcdc8-01c9-448c-b3d2-eb9582beb3c2"
            },
            {
              "id": "955d5779-3e2b-4098-b11d-0431dc41ddbe",
              "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet",
              "areaId": "64cbcdc8-01c9-448c-b3d2-eb9582beb3c2"
            }
          ]
        }
      ]
    },
    {
      "client": {
        "id": "00d8acc2-3fac-49ad-88be-5d85ac28475e",
        "name": "OPPLYST REFLEKTERENDE TIGER AS",
        "type": "Organisasjon",
        "variant": "AS",
        "keyValues": {
          "OrganizationIdentifier": "310244589",
          "PartyId": "51546314"
        },
        "parent": null,
        "children": null,
        "partyid": 51546314,
        "userId": null,
        "username": null,
        "organizationIdentifier": "310244589",
        "personIdentifier": null,
        "dateOfBirth": null,
        "dateOfDeath": null,
        "isDeleted": false,
        "deletedAt": null
      },
      "access": [
        {
          "role": {
            "id": "46e27685-b3ba-423e-8b42-faab54de5817",
            "code": "regnskapsforer",
            "urn": "urn:altinn:external-role:ccr:regnskapsforer",
            "legacyurn ": "urn:altinn:rolecode:regn",
            "children": null
          },
          "packages": [
            {
              "id": "a5f7f72a-9b89-445d-85bb-06f678a3d4d1",
              "urn": "urn:altinn:accesspackage:regnskapsforer-uten-signeringsrettighet",
              "areaId": "64cbcdc8-01c9-448c-b3d2-eb9582beb3c2"
            },
            {
              "id": "955d5779-3e2b-4098-b11d-0431dc41ddbe",
              "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet",
              "areaId": "64cbcdc8-01c9-448c-b3d2-eb9582beb3c2"
            },
            {
              "id": "43becc6a-8c6c-4e9e-bb2f-08fe588ada21",
              "urn": "urn:altinn:accesspackage:regnskapsforer-lonn",
              "areaId": "64cbcdc8-01c9-448c-b3d2-eb9582beb3c2"
            }
          ]
        }
      ]
    }
  ]
}

```


{{% notice warning %}}
The client API also includes organisations that have granted access in other ways than the client relationships described above. For these there will be no delegable client relationship. This applies for example to:

- BEDR relationship – sub-units that in the register have a BEDR link to the given party.
{{% /notice %}}

### API: delegate client rights to agent

This API makes it possible to delegate access packages that the service provider has for clients.


- **Test**: `POST https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&from={{fromOrg}}&to={{to}}`
- **Production**: `POST https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&from={{fromOrg}}&to={{to}}`

`{{party}}` is the `partyUuid` for the service provider.
`{{fromOrg}}` is the `partyUuid` for the client.
`{{to}}` is the `partyUuid` for the agent.


Example delegation of access package for tax base (skattegrunnlag)
```json
{
  "values": [
   {
     "role": "rettighetshaver",
     "packages" : [
       "urn:altinn:accesspackage:skattegrunnlag"
     ]
   }
  ]
}

```

Example response

```json
[
  {
    "roleId": "42cae370-2dc1-4fdc-9c67-c2f4b0f0f829",
    "packageId": "4c859601-9b2b-4662-af39-846f4117ad7a",
    "viaId": "0dbde1a0-0680-414f-9f2e-80cba19c4407",
    "fromId": "e902b28d-bc80-4712-8cf4-438ef737f047",
    "toId": "01f7a70d-2619-4c50-8ff4-efd7ae6c8960",
    "changed": true
  }
]
```

### API: delete client rights for agent

This API lets you remove one or more access packages that have been delegated to an agent for a client.

- **Test**: `DELETE https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&from={{from}}&to={{to}}`
- **Production**: `DELETE https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&from={{from}}&to={{to}}`

```json
{
  "values": [
   {
     "role": "rettighetshaver",
     "packages" : [
       "urn:altinn:accesspackage:innbygger-samliv"
     ]
   }
  ]
}
```

Example response

```json
[
  {
    "roleId": "42cae370-2dc1-4fdc-9c67-c2f4b0f0f829",
    "packageId": "7778f33d-83b7-4089-93fc-4fbacbf28600",
    "viaId": "03b14d35-4b8c-44cd-9c71-dc740d8585c2",
    "fromId": "a4c0369b-2261-4123-ac03-e0028a64d265",
    "toId": "01f7a70d-2619-4c50-8ff4-efd7ae6c8960",
    "changed": true
  }
]
```

If you try to delete a package that is already deleted or does not exist, `changed` in the response will be `false`.


### API: list agents who have rights for a client

This API lets you list which agents have access to a client.


- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/clients/accesspackages?party={{party}}&from={{from}}`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/clients/accesspackages?party={{party}}&from={{from}}`


`{{party}}` is the `partyUuid` for the service provider.
`{{from}}` is the `partyUuid` for the client.

Example response

```json
{
  "links": {
    "next": null
  },
  "data": [
    {
      "agent": {
        "id": "01f7a70d-2619-4c50-8ff4-efd7ae6c8960",
        "name": "KREATIV GRANITT",
        "type": "Person",
        "variant": "Person",
        "keyValues": {
          "PartyId": "50441038",
          "PersonIdentifier": "08919574934",
          "DateOfBirth": "1895-11-08"
        },
        "parent": null,
        "children": null,
        "partyid": 50441038,
        "userId": 1465828,
        "username": null,
        "organizationIdentifier": null,
        "personIdentifier": "08919574934",
        "dateOfBirth": "1895-11-08",
        "dateOfDeath": "2020-12-22",
        "isDeleted": false,
        "deletedAt": null
      },
      "access": [
        {
          "role": {
            "id": "42cae370-2dc1-4fdc-9c67-c2f4b0f0f829",
            "code": "rettighetshaver",
            "urn": "urn:altinn:role:rettighetshaver",
            "legacyurn ": null,
            "children": null
          },
          "packages": [
            {
              "id": "4c859601-9b2b-4662-af39-846f4117ad7a",
              "urn": "urn:altinn:accesspackage:skattegrunnlag",
              "areaId": "7d32591d-34b7-4afc-8afa-013722f8c05d"
            }
          ]
        }
      ]
    }
  ]
}
```



### API: list clients a given agent has access to

This API lists all clients a given agent has been delegated access packages for. The response contains details about which packages and which clients the agent has been delegated.

- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&to={{to}}`
- **Production**: `GET https://platform.altinn.no/accessmanagement/api/v1/enduser/clientdelegations/agents/accesspackages?party={{party}}&to={{to}}`


`{{party}}` is the `partyUuid` for the service provider.
`{{to}}` is the `partyUuid` for the agent.

Example response

```json
{
  "links": {
    "next": null
  },
  "data": [
    {
      "client": {
        "id": "e902b28d-bc80-4712-8cf4-438ef737f047",
        "name": "GEOMETRISK VOKSENDE TIGER AS",
        "type": "Organisasjon",
        "variant": "AS",
        "keyValues": {
          "OrganizationIdentifier": "310757632",
          "PartyId": "51561408"
        },
        "parent": null,
        "children": null,
        "partyid": 51561408,
        "userId": null,
        "username": null,
        "organizationIdentifier": "310757632",
        "personIdentifier": null,
        "dateOfBirth": null,
        "dateOfDeath": null,
        "isDeleted": false,
        "deletedAt": null
      },
      "access": [
        {
          "role": {
            "id": "42cae370-2dc1-4fdc-9c67-c2f4b0f0f829",
            "code": "rettighetshaver",
            "urn": "urn:altinn:role:rettighetshaver",
            "legacyurn ": null,
            "children": null
          },
          "packages": [
            {
              "id": "4c859601-9b2b-4662-af39-846f4117ad7a",
              "urn": "urn:altinn:accesspackage:skattegrunnlag",
              "areaId": "7d32591d-34b7-4afc-8afa-013722f8c05d"
            }
          ]
        }
      ]
    }
  ]
}
```

### Client administration for agents

Via the API it is also possible for an agent to see their clients and which organisations have delegated client rights to them.

You can also delete such relationships via the API.

This requires a dedicated scope for the signed-in user.

