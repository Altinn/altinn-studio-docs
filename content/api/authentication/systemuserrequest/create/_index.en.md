---
title: Create a new system user request
description: API for the vendor to create a system user request
toc: true
---
## Create a new system user request

### Endpoint
POST authentication/api/v1/systemuser/request/vendor

### Scopes
Machineporten token with scope <mark>altinn:authentication/systemuser.request.write</mark>

### Content types
application/json

## Arguments

#### externalref
This is an optional reference set by the vendor for the system user request. If not provided, it defaults to partyOrgNo. If specified, this value must be used in the token request to Maskinporten.

#### systemid
The id of the registered system in altinn

#### partyorgno
The organisation number that must approve the system user request

#### rights
The list of resources the system bruker is seeking access to.

#### redirecturl
The url that the user must be redirected to after approving or rejecting the system user request

## Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00011 | 400 | The Id does not refer to a Registered System. | No system with the system id found in altinn system register |
| AUTH-00023 | 401 | Can't resolve the Organisation Number for the Vendor from the Token. |
| AUTH-00004 | 400 | Failed to create new SystemUser, existing SystemUser tied to the given System-Id. |
| AUTH-00006 | 400 | The combination of External Ids refer to an already Accepted SystemUser. |
| AUTH-00007 | 400 | The combination of External Ids refer to a Pending Request, please reuse or delete. |
| AUTH-00008 | 400 | The combination of External Ids refer to a Denied Request, please delete and renew the Request. |
| AUTH-00009 | 400 | The combination of External Ids refer to a Rejected Request, please delete and renew the Request. |
| AUTH-00000 | 400 | Can't resolve the Organisation Number from the logged in Reportee PartyId. |
| AUTH-00026 | 400 | No redirect uris are set for the system |
| AUTH-00021 | 400 | The RedirectUri was not found or not valid. |
| AUTH-00001 | 400 | One or more Right not found or not delegable. |
| AUTH-00012 | 400 | An error occured when storing the Request. |

### Request Example
```
{
  "externalReference": "dev-test-create_01",
  "systemId": "991825827_dhana_test_01",
  "partyOrgNo": "314112938",
  "rights": [
    {
      "Resource": [
        {
          "id": "urn:altinn:resource",
          "value": "authentication-e2e-test"
        }
      ]
    }
  ],
  "redirectUrl": ""
} 
```
### Response Model

#### id
The unique identifier of the created request. This ID is used to check the status or manage the request.

#### status
The status of the request. The status is "new" when the request is created. It changes to "accepted", "rejected", or "denied" depending on how the request is handled by the user.

### confirmurl
The vendor will provide this URL to their customers to approve or reject the system user requests

### Response Example
```
{
    "id": "bb4955d4-6c44-4716-841c-911205dadade",
    "externalRef": "314112938",
    "systemId": "991825827_dhana_test_01",
    "partyOrgNo": "314112938",
    "rights": [
        {
            "resource": [
                {
                    "id": "urn:altinn:resource",
                    "value": "authentication-e2e-test"
                }
            ]
        }
    ],
    "status": "New",
    "redirectUrl": "",
    "confirmUrl": "https://am.ui.at22.altinn.cloud/accessmanagement/ui/systemuser/request?id=bb4955d4-6c44-4716-841c-911205dadade"
}
```