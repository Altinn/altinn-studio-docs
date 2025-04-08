---
title: Internal api
description: API for the internal system to handle the system user request
toc: true
---
## Approve a system user request
This api is used by the internal system to approve the system user request.

### Endpoint
POST /authentication/api/v1/systemuser/request/{party}/{requestid}/approve

### Scopes
This Api is not available for external. It requires scope portal.

### Content types
application/json

### Parameters

#### party
The partyid of the organisation that has access to handle the request

#### requestId
The unique identifier of the request

### Response
True - if the request is successfully approved.

### Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00013 | 409 | The Status of the Request is not New. | - |
| AUTH-00014 | 403 | DelegationCheck failed with unknown error. | - |
| AUTH-00016 | 403 | DelegationCheck failed with error: Has not access by a delegation of role in ER or Altinn. | - |
| AUTH-00018 | 403 | DelegationCheck failed with error: Has not access by direct delegation. | - |
| AUTH-00019 | 403 | DelegationCheck failed with error: The service requires explicit access in SRR and the reportee is missing this. | - |
| AUTH-00020 | 403 | DelegationCheck failed with error: The service requires explicit authentication level and the reportee is missing this. | - |
| AUTH-00003 | 400 | Failed to create the SystemUser. | - |


## Reject a system user request
This endpoint is used by the internal system to reject the system user request

### Endpoint
POST /authentication/api/v1/systemuser/request/{party}/{requestid}/reject

### Scopes
This Api is not available for external. It requires scope portal.

### Content types
application/json

### Parameters

#### party
The partyid of the organisation that has access to handle the request

#### requestId
The unique identifier of the request

### Response
True - if the request is successfully rejected.

### Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00013 | 409 | The Status of the Request is not New. |  |
| AUTH-00010 | 400 | The Id does not refer to a Request in our system. |  |
| AUTH-00042 | 403 | Party does not match agent request's orgno |  |
| AUTH-00000 | 400 | Can't resolve the Organisation Number from the logged in Reportee PartyId. |  |

## Get An Agent System User Request By Party, RequestId

### Endpoint
GET authentication/api/v1/systemuser/request/agent/{party}/{requestId}

### Scopes
Machineporten token with scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

### Parameters

#### party
The party id of the organisation that must handle the request.

#### requestId
The unique identifier of the request

### Response
For en detailed description of each field in response, check the description [here](model#agent-systembruker-respons)

### Example of Response Model
```
{
    "id": "bb4955d4-6c44-4716-841c-911205dadade",
    "externalRef": "314250052",
    "systemId": "991825827_dhana_ap",
    "partyOrgNo": "314112938",
    "accesspackages": [
        {
            "urn":"urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet"
        }
    ],
    "status": "New",
    "redirectUrl": "",
    "confirmUrl": "https://am.ui.at22.altinn.cloud/accessmanagement/ui/systemuser/request?id=bb4955d4-6c44-4716-841c-911205dadade"
}
```

## Approve An Agent System User Request
This api is used by the internal system to approve the agent system user request.

### Endpoint
POST /authentication/api/v1/systemuser/request/agent/{party}/{requestid}/approve

### Scopes
This Api is not available for external. It requires scope portal.

### Content types
application/json

### Parameters

#### party
The partyid of the organisation that has access to handle the request

#### requestId
The unique identifier of the request

### Response
True - if the request is successfully approved.

### Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00013 | 409 | The Status of the Request is not New. | - |
| AUTH-00000 | 400 | Can't resolve the Organisation Number from the logged in Reportee PartyId. | - |
| AUTH-00030 | 404 | The Id does not refer to an AgentRequest in our system. | - |
| AUTH-00042 | 403 | Party does not match agent request's orgno | - |
| AUTH-00003 | 400 | Failed to create the SystemUser. | - |
| AUTH-00025 | 400 | The request id is valid but its not a valid request for creating an agent system user | - |
| AUTH-00011 | 404 | The Id does not refer to a Registered System. | - |
| AUTH-00017 | 404 | The SystemName was not found. | - |


## Reject An Agent System User Request
This endpoint is used by the internal system to reject the agent system user request

### Endpoint
POST /authentication/api/v1/systemuser/request/agent/{party}/{requestid}/reject

### Scopes
This Api is not available for external. It requires scope portal.

### Content types
application/json

### Parameters

#### party
The partyid of the organisation that has access to handle the request

#### requestId
The unique identifier of the request

### Response
True - if the request is successfully rejected.

### Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00000 | 400 | Can't resolve the Organisation Number from the logged in Reportee PartyId. | - |
| AUTH-00030 | 404 | The Id does not refer to an AgentRequest in our system. | - |
| AUTH-00042 | 403 | Party does not match agent request's orgno | - |
| AUTH-00013 | 409 | The Status of the Request is not New. | - |
| AUTH-00010 | 400 | The Id does not refer to a Request in our system. | - |