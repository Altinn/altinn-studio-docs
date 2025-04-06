---
title: Internal API
linktitle: Internal API
description: API for the internal system to process system user information
toc: true
---
## List Standard System Users for Party

### Endpoint
GET authentication/api/v1/systemuser/{party}

### Scopes
This is an internal api.

### Content types
application/json

## Query Parameters

#### party
The party id of the organization

#### Example Response
```
[
    {
        "id": "06230e65-2fe7-4e33-85dc-84359478f01d",
        "integrationTitle": "Test system for e2e test",
        "systemId": "991825827_smartcloud",
        "productName": "",
        "systemInternalId": "19c3150b-0a5f-47b0-8911-e49f9a152a8a",
        "partyId": "51583348",
        "reporteeOrgNo": "312737574",
        "created": "2025-03-31T20:43:46.228209Z",
        "isDeleted": false,
        "supplierName": "",
        "supplierOrgno": "991825827",
        "externalRef": "312737574",
        "accessPackages": [],
        "userType": "standard"
    }
]
```

## List Agent System Users for Party

### Endpoint
GET authentication/api/v1/systemuser/agent/{party}

### Scopes
This is an internal api.

### Content types
application/json

## Query Parameters

#### party
The party id of the organization

#### Example Response
```
[
    {
        "id": "2518ff0a-1bca-469b-bd8f-82afcafb9f9e",
        "integrationTitle": "Dhana Test AP delegation",
        "systemId": "991825827_dhana_ap",
        "productName": "",
        "systemInternalId": "7d8cf1a9-adaa-4bf5-bcdc-790385e2ec62",
        "partyId": "51243526",
        "reporteeOrgNo": "314250052",
        "created": "2025-03-29T22:37:29.501584Z",
        "isDeleted": false,
        "supplierName": "",
        "supplierOrgno": "991825827",
        "externalRef": "at22_dhana_2903",
        "accessPackages": [
            {
                "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet"
            }
        ],
        "userType": "agent"
    },
    {
        "id": "6cc06073-77f2-4026-9067-77be8f658d76",
        "integrationTitle": "Dhana Test AP delegation",
        "systemId": "991825827_dhana_ap",
        "productName": "",
        "systemInternalId": "7d8cf1a9-adaa-4bf5-bcdc-790385e2ec62",
        "partyId": "51243526",
        "reporteeOrgNo": "314250052",
        "created": "2025-03-31T08:22:02.624892Z",
        "isDeleted": false,
        "supplierName": "",
        "supplierOrgno": "991825827",
        "externalRef": "at22_dhana_3103_01",
        "accessPackages": [
            {
                "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet"
            }
        ],
        "userType": "agent"
    }
]
```

## Get Delegations for an agent systemuser
Retrieves a list of delegations for an agent system user

### Endpoint
GET authentication/api/v1/systemuser/agent/{party}/{facilitator}/{systemUserId}/delegations"

### Scopes
This is an internal api.

### Content types
application/json

#### party
The partyid (old format) of the organiztion that owns the system user

#### facilitator
The party guid of the organization that owns the system user

#### systemuserid
The unique identifier of the system user

## Get systemuser by systemuserid
Fetches detailed information of a specific system user based on system user id

### Endpoint
GET authentication/api/v1/systemuser/{party}/{systemUserId}"

### Scopes
This is an internal api.

### Content types
application/json

#### party
The partyid (old format) of the organiztion that owns the system user

#### systemuserid
The unique identifier of the system user

## Delete Standard Systemuser
Deletes the standard systm user

### Endpoint
DELETE authentication/api/v1/systemuser/{party}/{systemUserId}"

### Scopes
This is an internal api.

### Content types
application/json

#### party
The partyid (old format) of the organiztion that owns the system user

#### systemuserid
The unique identifier of the system user


## List all systemusers for register component

### Endpoint
GET authentication/api/v1/internal/systemusers/stream

### Scopes
This is an internal api.

### Content types
application/json

## Create a Standard System User
Creates a standard system user. This is an internal api used by the frontend

### Endpoint 
POST authentication/api/v1/systemuser/{party}/create

### Scopes
This is an internal api

### Content Types
application/josn

## Example Request
```
{
    "IntegrationTitle" : "demouser",
    "SystemId" : "991825827_smartcloud"
}
```

## Example Response
```
{
    "id": "59000244-8e07-415c-996d-2a8a077f6bad",
    "integrationTitle": "Smartcloud system",
    "systemId": "312600757_smartcloud",
    "productName": "",
    "systemInternalId": "35fe04fd-2f34-4dee-8d4e-433e5d075e95",
    "partyId": "51574835",
    "reporteeOrgNo": "312615398",
    "created": "2025-04-01T20:14:34.835953Z",
    "isDeleted": false,
    "supplierName": "",
    "supplierOrgno": "312600757",
    "externalRef": "312615398",
    "accessPackages": [],
    "userType": "standard"
}
```

## Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00011 | 404 | The Id does not refer to a Registered System. |  |
| AUTH-00002 | 400 | The Delegation failed. |  |
| AUTH-00000 | 400 | Can't resolve the Organisation Number from the logged in Reportee PartyId. |  |
| AUTH-00004 | 400 | Failed to create new SystemUser, existing SystemUser tied to the given System-Id. |  |
| AUTH-00014 | 400 | DelegationCheck failed with unknown error. |  |
| AUTH-00003 | 400 | Failed to create the SystemUser |
| AUTH-00016 | 403 | DelegationCheck failed with error: Has not access by a delegation of role in ER or Altinn. | |
| AUTH-00018 | 403 | DelegationCheck failed with error: Has not access by direct delegation. |
| AUTH-00019 | 403 | DelegationCheck failed with error: The service requires explicit access in SRR and the reportee is missing this. | |
| AUTH-00020 | 403 | DelegationCheck failed with error: The service requires explicit authentication level and the reportee is missing this. | |

## Delegate To An Agent Systemuser
This is an internal api to delegate to an agent system user

### Endpoint 
POST authentication/api/v1/systemuser/agent/{party}/{systemUserId}/delegation/

### Scopes
This is an internal api

### Content Types
application/josn

## Example Request
```
{
    "customerid" : "a23b7707-0349-4903-b8d9-6a293d15ec89",
    "facilitatorid" : "368f5a82-97f5-4f33-b372-ac998a4d6b22"
}
```

## Example Response
```
[
    {
        "agentSystemUserId": "7d8cf1a9-adaa-4bf5-bcdc-790385e2ec62",
        "delegationId": "0195f657-0a63-7202-8290-fc04c656f690",
        "customerId": "a23b7707-0349-4903-b8d9-6a293d15ec89"
    }
]
```

## Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00000 | 400 | Can't resolve the Organisation Number from the logged in Reportee PartyId. |  |
|  | 400 | SystemUser with Id {systemUserId} Not Found |  |
| AUTH-00028 | 400 | The customer id was not provided or did not validate. |  |
| AUTH-00015 | 404 | The SystemUser was not found. |  |
| AUTH-00027 | 400 | The accesspackage provided in the request can't be mapped to a valid role. |  |
| AUTH-00002 | 400 | The Delegation failed. |  |

## Delete Customer From An Agent Systemuser
This is an internal api to remove a client from an agent system user

### Endpoint 
DELETE authentication/api/v1/systemuser/agent/{party}/delegation/{delegationId}?facilitatorid=

## Parameters
#### party
The partyid of the organization that owns the agent system user

#### delegationid
The delegation identifier that identifies the delegation between the agent system user and the customer

#### facilitatorid
The party uuid of the organization that owns the agent system user

### Scopes
This is an internal api

### Content Types
application/josn

## Example Request
```
{{platformenvurl}}/authentication/api/v1/systemuser/agent/51243526/delegation/0195f66e-c56b-7723-bd50-0317241fedb9?facilitatorid=368f5a82-97f5-4f33-b372-ac998a4d6b22
```

## Delete An Agent Systemuser
This is an internal api to delete an agent system user

### Endpoint 
POST authentication/api/v1/systemuser/agent/{party}{systemuserid}?facilitatorid=

## Parameters
#### party
The partyid of the organization that owns the agent system user

#### systemuserid
The unique identifier of the system user id

#### facilitatorid
The party uuid of the organization that owns the agent system user

### Scopes
This is an internal api

### Content Types
application/josn

## Example Request
```
{{platformenvurl}}/authentication/api/v1/systemuser/agent/51243526/2518ff0a-1bca-469b-bd8f-82afcafb9f9e?facilitatorid=368f5a82-97f5-4f33-b372-ac998a4d6b22
```