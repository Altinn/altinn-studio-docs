---
title: Client delegation for system vendors
description: This guide shows how system vendors can integrate support for client delegation in their end user systems using Altinn's APIs. Client delegation makes it possible for a system user to represent clients (for example clients of accountants or auditors) in communication with public services. Each functional step is illustrated with concrete API examples, so you can easily implement the solution in your system.
linktitle: Client delegation
weight: 5
toc: true
---

A separate guide for _client delegation_ as an end user is available here: [Client delegation](/authorization/guides/end-user/system-user/delegate-clients/)

## 1 Retrieve system users for client systems

Find all system users for client systems that are linked to your organisation.

**API endpoint:** `GET authentication/api/v1/enduser/systemuser/agents`

**Scopes:** ID-porten token exchanged for an Altinn token with scope `altinn:clientdelegations.read`

**Content type:** `application/json`

### Request parameters

**party:** organisation number of the system user owner

### Example request

{{environmenturl}}/authentication/api/v1/enduser/systemuser/agents?party=314250052

### Example response

```json
[
  {
    "id": "6af73152-3304-47d6-b418-01cf7f3cdfd5",
    "integrationTitle": "Playwright-e2e-revisor-1750059427693-0.5132620954683862",
    "systemId": "310547891_Playwright-e2e-revisor-1750059427693-0.5132620954683862",
    "productName": "",
    "systemInternalId": "e7229409-d999-4103-ba4b-b2704b8ce70c",
    "partyId": "51117759",
    "partyUuId": "",
    "reporteeOrgNo": "314250052",
    "created": "2025-06-16T07:37:11.895306Z",
    "isDeleted": false,
    "supplierName": "",
    "supplierOrgno": "310547891",
    "externalRef": "0.2gfn08aq3661750059428187",
    "accessPackages": [
      {
        "urn": "urn:altinn:accesspackage:ansvarlig-revisor"
      }
    ],
    "userType": "agent"
  },
  {
    "id": "2bab4e06-1ae8-4037-9d59-9b31250b4da8",
    "integrationTitle": "Playwright-e2e-regnskapsfoerer-1750059436258-0.04049319303233756",
    "systemId": "310547891_Playwright-e2e-regnskapsfoerer-1750059436258-0.04049319303233756",
    "productName": "",
    "systemInternalId": "f3196b16-176c-4b28-a62c-906fdcc542a0",
    "partyId": "51117759",
    "partyUuId": "",
    "reporteeOrgNo": "314250052",
    "created": "2025-06-16T07:37:17.563908Z",
    "isDeleted": false,
    "supplierName": "",
    "supplierOrgno": "310547891",
    "externalRef": "0.3sn2wdnna2z1750059436420",
    "accessPackages": [
      {
        "urn": "urn:altinn:accesspackage:regnskapsforer-lonn"
      }
    ],
    "userType": "agent"
  }
]
```

## 2 Retrieve available clients for the system user

Retrieve a list of clients that can be delegated to the system user for client systems.

**API endpoint:** `GET authentication/api/v1/enduser/systemuser/clients/available`

**Scopes:** ID-porten token exchanged for an Altinn token with scope `altinn:clientdelegations.read`

**Content type:** `application/json`

### Request parameters

**agent:** The unique identifier of the system user for client relationships

**pagination:** The API does not currently support pagination, but this is planned for a later version. The groundwork for pagination has now been laid in the system.

### Example request

{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/available?agent=1b6cea43-f499-4aae-a633-51cf542795af

### Example response

```json
{
  "links": {},
  "systemUserInformation": {
    "systemUserId": "1b6cea43-f499-4aae-a633-51cf542795af",
    "systemUserOwnerOrg": "314250052"
  },
  "data": [
    {
      "clientId": "fffefbe8-72ed-4729-b80b-dc16a96f4d9f",
      "clientOrganizationNumber": "310609544",
      "clientOrganizationName": "AUTORISERT VEIK TIGER AS"
    },
    {
      "clientId": "f9475c0b-2ee4-4a41-b306-f428f00ec21f",
      "clientOrganizationNumber": "313872076",
      "clientOrganizationName": "TØFF SITRONGUL TIGER AS"
    },
    {
      "clientId": "f909a031-5a6b-4cd7-910d-7f71bdba51d5",
      "clientOrganizationNumber": "310599298",
      "clientOrganizationName": "SPESIFIKK OPPSTEMT TIGER AS"
    }
  ]
}
```

## 3 Retrieve delegated clients for the system user

See which clients have already been delegated to the system user for client relationships.

**API endpoint:** `GET authentication/api/v1/enduser/systemuser/clients/`

**Scopes:** ID-porten token exchanged for an Altinn token with scope `altinn:clientdelegations.read`

**Content type:** `application/json`

### Request parameters

**agent:** The unique identifier of the system user for client relationships

**pagination:** The API does not currently support pagination, but this is planned for a later version. The groundwork for pagination has now been laid in the system.

### Example request

{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/?agent=d06fe261-c46b-4d8b-b54d-b87aa6711f4c

### Example response

```json
{
  "links": {},
  "systemUserInformation": {
    "systemUserId": "d06fe261-c46b-4d8b-b54d-b87aa6711f4c",
    "systemUserOwnerOrg": "314250052"
  },
  "data": [
    {
      "clientId": "cdc9c5ef-caff-4617-b4da-30f405ed373a",
      "clientOrganizationNumber": "313169960",
      "clientOrganizationName": "LILLA BLØT TIGER AS"
    }
  ]
}
```

## 4 Delegate a client to the system user

Delegates access from a client to the system user for client relationships.

**API endpoint:** `POST authentication/api/v1/enduser/systemuser/clients/`

**Scopes:** ID-porten token exchanged for an Altinn token with scope `altinn:clientdelegations.read` `altinn:clientdelegations.write`

**Content type:** `application/json`

### Request parameters

**agent:** The unique identifier of the system user for client relationships

**client:** The unique identifier of the client to add to the system user

### Example request

{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/?agent=58cd5a57-ea49-4d04-bf7d-d48b338c68db&client=ff254c60-d02a-4ae8-bcd1-34cce38a823a

### Example response

```json
{
  "agent": "58cd5a57-ea49-4d04-bf7d-d48b338c68db",
  "client": "ff254c60-d02a-4ae8-bcd1-34cce38a823a"
}
```

## 5 Remove a client from the system user

Removes an existing client from the system user for client relationships.

**API endpoint:** `DELETE authentication/api/v1/enduser/systemuser/clients/`

**Scopes:** ID-porten token exchanged for an Altinn token with scope `altinn:clientdelegations.read` `altinn:clientdelegations.write`

**Content type:** `application/json`

### Request parameters

**agent:** The unique identifier of the system user for client relationships

**client:** The unique identifier of the client to remove from the system user

### Example request

{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/?agent=58cd5a57-ea49-4d04-bf7d-d48b338c68db&client=ff254c60-d02a-4ae8-bcd1-34cce38a823a

### Example response

```json
{
  "agent": "58cd5a57-ea49-4d04-bf7d-d48b338c68db",
  "client": "ff254c60-d02a-4ae8-bcd1-34cce38a823a"
}
```

## 6 Retrieve clients the system user is authorised for

Once a system user for client relationships has been delegated clients, the end user system can use a system user token to call the AuthorizedParties endpoint in the access management API. The endpoint returns the parties (clients) the system user is authorised for, so the end user system can find the correct `partyUuid` for subsequent calls to Altinn services on behalf of the client.

**API endpoint:** `GET accessmanagement/api/v1/enduser/authorizedparties`

**Scopes:** Maskinporten token (exchanged for an Altinn token) with scope `altinn:accessmanagement/authorizedparties`

**Content type:** `application/json`

### Example request

{{environmenturl}}/accessmanagement/api/v1/enduser/authorizedparties

See [the access management API](../../access-management/#api-retrieve-authorised-parties) for a complete description of the endpoint, including all parameters and response fields.

## Explore the API documentation

For complete technical documentation, including detailed descriptions of parameters, responses and authentication, see Altinn's OpenAPI interface [here](/api/authentication/systemuserapi/clientdelegation/).
