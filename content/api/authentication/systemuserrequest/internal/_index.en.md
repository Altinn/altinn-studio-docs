
---
title: Handle a system user request (Internal api)
description: API for the vendor to handle the system user request
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

## Arguments

#### party
The partyid of the organisation that has access to handle the request

#### requestId
The unique identifier of the request

### Response
True - if the request is successfully approved.

## Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00013 | 409 | The Status of the Request is not New. |  |
| AUTH-00014 | 403 | DelegationCheck failed with unknown error. |  |
| AUTH-00016 | 403 | DelegationCheck failed with error: Has not access by a delegation of role in ER or Altinn. |  |
| AUTH-00018 | 403 | DelegationCheck failed with error: Has not access by direct delegation. |  |
| AUTH-00019 | 403 | DelegationCheck failed with error: The service requires explicit access in SRR and the reportee is missing this. |  |
| AUTH-00020 | 403 | DelegationCheck failed with error: The service requires explicit authentication level and the reportee is missing this. |  |
| AUTH-00003 | 400 | Failed to create the SystemUser. |  |


## Reject a system user request
This endpoint is used by the internal system to reject the system user request

### Endpoint
POST /authentication/api/v1/systemuser/request/{party}/{requestid}/reject

### Scopes
This Api is not available for external. It requires scope portal.

### Content types
application/json

## Arguments

#### party
The partyid of the organisation that has access to handle the request

#### requestId
The unique identifier of the request

### Response
True - if the request is successfully rejected.

## Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00013 | 409 | The Status of the Request is not New. |  |
| AUTH-00010 | 400 | The Id does not refer to a Request in our system. |  |
| AUTH-00013 | 409 | The Status of the Request is not New. |  |
| AUTH-00013 | 409 | The Status of the Request is not New. |  |



