---
title: Client Delegation
description: API to manage clients for an agent system user
toc: true
---

## Client Delegation API
The client delegation API provides methods to manage clients for an agent system user from a third party system.

## Security Scheme
Bearer authentication scheme is used to authenticate.
System user api requires that the external authenticates with a bearer token which is an id porten token with specific scope. This token must be exchanged with the altinn token using the endpoint 
GET authentication/api/v1/exchange/id-porten (on test environment, add the query parameter ?test=true)

## API Methods

- [List all agent system users for the organisation](#list-all-agent-system-users-for-the-organisation)
- [List all available clients for the system user](#list-all-the-potential-clients-for-the-system-user)
- [List all delegated clients for the system user](#list-all-delegated-clients-for-the-system-user)
- [Delegate a client to the system user](#delegate-a-client-to-the-system-user)
- [Remove a delegated client from the system user](#remove-a-client-from-the-system-user)

## List All Agent System Users For The Organisation
Returns a list of all agent system users linked to the organisation 

### Endpoint
GET authentication/api/v1/enduser/systemuser/agents

### Scopes
The Id porten token exchanged into altinn token with scope <mark>altinn:clientdelegations.read</mark>

### Content type
application/json

## Query Parameters

#### party
The organization number of the system user owner

### Example Request
{{environmenturl}}/authentication/api/v1/enduser/systemuser/agents?party=314250052

### Example Response
```
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

## List all the potential clients for the system user
Lists all the potential clients for the party that has access to the accesspackage for the systemuser

### Endpoint
GET authentication/api/v1/enduser/systemuser/clients/available

### Scopes
Id porten token with scope <mark>altinn:clientdelegations.read</mark>

### Content types
application/json

## Query Parameters

#### agent
The unique identifier of the agent system user

### Pagination
The API currently does not support pagination, but this is planned for a future release. We have now laid the groundwork for pagination in the system.

### Example Request
{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/available?agent=1b6cea43-f499-4aae-a633-51cf542795af

### Example Response
```
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
        },
    ]
}
```

## List all delegated clients for the system user
Lists all the delegated clients for the system user

### Endpoint
GET authentication/api/v1/enduser/systemuser/clients/

### Scopes
Id porten token with scope <mark>altinn:clientdelegations.read</mark>

### Content types
application/json

## Query Parameters

#### agent
The unique identifier of the agent system user

### Pagination
The API currently does not support pagination, but this is planned for a future release. We have now laid the groundwork for pagination in the system.

### Example Request
{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/?agent=d06fe261-c46b-4d8b-b54d-b87aa6711f4c

### Example Response
```
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

## Delegate a client to the system user
Delegates a client to the system user

### Endpoint
POST authentication/api/v1/enduser/systemuser/clients/

### Scopes
Id porten token with scope <mark>altinn:clientdelegations.read altinn:clientdelegations.write</mark>

### Content types
application/json

## Query Parameters

#### agent
The unique identifier of the agent system user

#### client
The unique identifier of the client to be added to the system user

### Example Request
{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/?agent=58cd5a57-ea49-4d04-bf7d-d48b338c68db&client=ff254c60-d02a-4ae8-bcd1-34cce38a823a

### Example Response
```
{
    "agent": "58cd5a57-ea49-4d04-bf7d-d48b338c68db",
    "client": "ff254c60-d02a-4ae8-bcd1-34cce38a823a"
}
```

## Remove a client from the system user
Removes a delegated client from the system user

### Endpoint
DELETE authentication/api/v1/enduser/systemuser/clients/

### Scopes
Id porten token with scope <mark>altinn:clientdelegations.read altinn:clientdelegations.write</mark>

### Content types
application/json

## Query Parameters

#### agent
The unique identifier of the agent system user

#### client
The unique identifier of the client to be removed from the system user

### Example Request
{{environmenturl}}/authentication/api/v1/enduser/systemuser/clients/?agent=58cd5a57-ea49-4d04-bf7d-d48b338c68db&client=ff254c60-d02a-4ae8-bcd1-34cce38a823a

### Example Response
```
{
    "agent": "58cd5a57-ea49-4d04-bf7d-d48b338c68db",
    "client": "ff254c60-d02a-4ae8-bcd1-34cce38a823a"
}
```