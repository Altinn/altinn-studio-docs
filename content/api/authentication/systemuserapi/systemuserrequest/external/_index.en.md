---
title: External API
description: API for the vendor to manage the system user request
toc: true
---
## Create a standard system user request

### Endpoint
POST authentication/api/v1/systemuser/request/vendor

### Scopes
Maskinporten token with scope <mark>altinn:authentication/systemuser.request.write</mark>

### Content types
application/json

### Request Body
For detailed description about each entity in the body, please refer the description [here](model#standard-system-user-request)

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

### Response
For detailed description about each entity in the response body, please refer the description [here](model#standard-system-user-response)

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
### Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00011 | 400 | The Id does not refer to a Registered System. | No system with the system id found in altinn system register |
| AUTH-00023 | 401 | Can't resolve the Organisation Number for the Vendor from the Token. | - |
| AUTH-00004 | 400 | Failed to create new SystemUser, existing SystemUser tied to the given System-Id. | - |
| AUTH-00006 | 400 | The combination of External Ids refer to an already Accepted SystemUser. | - |
| AUTH-00007 | 400 | The combination of External Ids refer to a Pending Request, please reuse or delete. | - |
| AUTH-00008 | 400 | The combination of External Ids refer to a Denied Request, please delete and renew the Request. | - |
| AUTH-00009 | 400 | The combination of External Ids refer to a Rejected Request, please delete and renew the Request. | - |
| AUTH-00000 | 400 | Can't resolve the Organisation Number from the logged in Reportee PartyId. | - |
| AUTH-00026 | 400 | No redirect uris are set for the system | - |
| AUTH-00021 | 400 | The RedirectUri was not found or not valid. | - |
| AUTH-00001 | 400 | One or more Right not found or not delegable. | - |
| AUTH-00012 | 400 | An error occured when storing the Request. | - |


## Get a system user request

### Endpoint
GET authentication/api/v1/systemuser/request/vendor/{requestId}

### Scopes
Maskinporten token with scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

### Arguments

#### requestId
The unique identifier of the request

### Example of Response Model
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

### Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| - | 400 | The value '{invalidrequestid}' is not valid | When the request id is not a valid guid |
| - | 401 | unauthorized | - |
| - | 404 | NotFound | - |
| AUTH-00010 | 404 | The Id does not refer to a Request in our system. | - |

## Get a system user request by external reference

### Endpoint
GET authentication/api/v1/systemuser/request/vendor/byexternalref/{systemid}/{orgno}/{externalref}

### Scopes
Maskinporten token with scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

### Arguments


### Required Arguments

#### systemid
The id of the system that the request is referring to

#### orgno
The organisation number of the customer that has to handle the request

#### externalref
The unique external reference of the request provided by the vendor

### Example of Response Model
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

### Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| - | 400 | The value '{invalidrequestid}' is not valid | When the request id is not a valid guid |
| - | 401 | unauthorized | - |
| - | 404 | NotFound | - |
| AUTH-00010 | 404 | The Id does not refer to a Request in our system. | - |

## Get all system user requests for a vendor
Returns apaginated list of requests
### Endpoint
GET authentication/api/v1/systemuser/request/vendor/bysystem/{systemid}

### Scopes
Maskinporten token with scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

### Arguments

#### systemid
The id of the system that the vendor is requesting a list for

### Example of Response Model
```
{
    "links": {},
    "data": [
        {
            "id": "774a4a2e-0e6a-4fd4-8540-0aebd7239acb",
            "externalRef": "314048431",
            "systemId": "991825827_smartcloud",
            "partyOrgNo": "314048431",
            "rights": [
                {
                    "resource": [
                        {
                            "id": "urn:altinn:resource",
                            "value": "kravogbetaling"
                        }
                    ]
                }
            ],
            "status": "Timedout"
        },
        {
            "id": "f5bac5cc-11e3-40cc-81a5-0cf125a2b9e9",
            "externalRef": "12345qwerty",
            "systemId": "991825827_smartcloud",
            "partyOrgNo": "314048431",
            "rights": [
                {
                    "resource": [
                        {
                            "id": "urn:altinn:resource",
                            "value": "kravogbetaling"
                        }
                    ]
                }
            ],
            "status": "Timedout"
        },
        {
            "id": "a739f996-3e22-449c-b8fe-78a24496cb68",
            "externalRef": "313775429",
            "systemId": "991825827_smartcloud",
            "partyOrgNo": "313775429",
            "rights": [
                {
                    "resource": [
                        {
                            "id": "urn:altinn:resource",
                            "value": "kravogbetaling"
                        }
                    ]
                }
            ],
            "status": "Timedout",
            "redirectUrl": "https://smartcloudaltinn.azurewebsites.net/receipt"
        },
        {
            "id": "df9aa0d3-8235-4677-b445-83ddcb3fc133",
            "externalRef": "312975955",
            "systemId": "991825827_smartcloud",
            "partyOrgNo": "312975955",
            "rights": [
                {
                    "resource": [
                        {
                            "id": "urn:altinn:resource",
                            "value": "kravogbetaling"
                        }
                    ]
                }
            ],
            "status": "Timedout",
            "redirectUrl": "https://smartcloudaltinn.azurewebsites.net/receipt"
        },
        {
            "id": "f69cfe09-b8ea-4dc3-a611-e4aec3e2d076",
            "externalRef": "310816191",
            "systemId": "991825827_smartcloud",
            "partyOrgNo": "310816191",
            "rights": [
                {
                    "resource": [
                        {
                            "id": "urn:altinn:resource",
                            "value": "kravogbetaling"
                        }
                    ]
                }
            ],
            "status": "Timedout",
            "redirectUrl": "https://smartcloudaltinn.azurewebsites.net/receipt"
        },
        {
            "id": "bac4d8ec-8e3e-4e47-93f8-0a38d16cbab7",
            "externalRef": "313641341",
            "systemId": "991825827_smartcloud",
            "partyOrgNo": "313641341",
            "rights": [
                {
                    "resource": [
                        {
                            "id": "urn:altinn:resource",
                            "value": "kravogbetaling"
                        }
                    ]
                }
            ],
            "status": "Timedout",
            "redirectUrl": "https://smartcloudaltinn.azurewebsites.net/receipt"
        }
    ]
}
```

### Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| - | 400 | The value '{invalidrequestid}' is not valid | When the request id is not a valid guid |
| - | 401 | unauthorized | - |
| - | 404 | NotFound | - |
| AUTH-00010 | 404 | The Id does not refer to a Request in our system. | - |

## Create an Agent System User Request
This endpoint is used to create a system user request of type agent

### Endpoint
POST authentication/api/v1/systemuser/request/vendor/agent

### Scopes
Maskinporten token with scope <mark>altinn:authentication/systemuser.request.write</mark>

### Content types
application/json

### Request Body
For detailed description about each entity in the body, please refer the description [here](model#agent-request)

#### Request Example
```
{
  "externalRef": "at22_dhana_3103_02",
  "systemId": "991825827_dhana_ap",
  "partyOrgNo": "314250052",
  "accesspackages": [
    {
        "urn":"urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet"
    }
  ],
  "redirectUrl": ""
} 
```
### Response
For detailed description about each entity in the response, please refer the description [here](model#agent-response)

#### Response Example
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
### Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00011 | 400 | The Id does not refer to a Registered System. | No system with the system id found in altinn system register |
| AUTH-00023 | 401 | Can't resolve the Organisation Number for the Vendor from the Token. | - |
| AUTH-00004 | 400 | Failed to create new SystemUser, existing SystemUser tied to the given System-Id. | - |
| AUTH-00006 | 400 | The combination of External Ids refer to an already Accepted SystemUser. | - |
| AUTH-00007 | 400 | The combination of External Ids refer to a Pending Request, please reuse or delete. | - |
| AUTH-00008 | 400 | The combination of External Ids refer to a Denied Request, please delete and renew the Request. | - |
| AUTH-00009 | 400 | The combination of External Ids refer to a Rejected Request, please delete and renew the Request. | - |
| AUTH-00000 | 400 | Can't resolve the Organisation Number from the logged in Reportee PartyId. | - |
| AUTH-00026 | 400 | No redirect uris are set for the system | - |
| AUTH-00021 | 400 | The RedirectUri was not found or not valid. | - |
| AUTH-00001 | 400 | One or more Right not found or not delegable. | - |
| AUTH-00012 | 400 | An error occured when storing the Request. | - |

## Get An Agent system user request

### Endpoint
GET authentication/api/v1/systemuser/request/vendor/agent/{requestId}

### Scopes
Maskinporten token with scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

### Parameters

#### requestId
The unique identifier of the request

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

### Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| - | 400 | The value '{requestid}' is not valid | When the request id is not a valid guid |
| - | 401 | unauthorized | - |
| - | 404 | NotFound | - |
| AUTH-00010 | 404 | The Id does not refer to a Request in our system. | - |

## Get an Agent System User Request By External Reference

### Endpoint
GET authentication/api/v1/systemuser/request/vendor/agent/byexternalref/{systemid}/{orgno}/{externalref}

### Scopes
Maskinporten token with scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

### Parameters

#### systemid
The id of the system that the request is referring to

#### orgno
The organisation number of the customer that has to handle the request

#### externalref
The unique external reference of the request provided by the vendor

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

### Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| - | 400 | The value '{requestid}' is not valid | When the request id is not a valid guid |
| - | 401 | unauthorized |  |
| - | 404 | NotFound |  |
| AUTH-00010 | 404 | The Id does not refer to a Request in our system. |  |

## Get All Agent System User Requests For A Vendor
Returns a paginated list of agent requests

### Endpoint
GET authentication/api/v1/systemuser/request/vendor/agent/bysystem/{systemid}

### Scopes
Maskinporten token with scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

### Parameters

#### systemid
The id of the system that the vendor is requesting a list for

### Example of Response Model
```
{
    "links": {},
    "data": [
        {
            "id": "b5abe2d4-e226-4f14-9805-fd04999967d7",
            "externalRef": "314250052",
            "systemId": "991825827_dhana_ap",
            "partyOrgNo": "314250052",
            "accessPackages": [
                {
                    "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet"
                }
            ],
            "status": "Timedout",
            "redirectUrl": ""
        },
        {
            "id": "e33e6e68-81bf-4a49-a66b-a282c3721383",
            "externalRef": "at22_dhana_2903",
            "systemId": "991825827_dhana_ap",
            "partyOrgNo": "314250052",
            "accessPackages": [
                {
                    "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet"
                }
            ],
            "status": "Accepted",
            "redirectUrl": ""
        },
        {
            "id": "7546bccc-1edc-46a3-81e9-228028c6aabe",
            "externalRef": "at22_dhana_3103_01",
            "systemId": "991825827_dhana_ap",
            "partyOrgNo": "314250052",
            "accessPackages": [
                {
                    "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet"
                }
            ],
            "status": "Accepted",
            "redirectUrl": ""
        },
        {
            "id": "8da293b0-bf1e-4bee-94a6-884a4eaec98e",
            "externalRef": "at22_dhana_3103_02",
            "systemId": "991825827_dhana_ap",
            "partyOrgNo": "314250052",
            "accessPackages": [
                {
                    "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrettighet"
                }
            ],
            "status": "Accepted",
            "redirectUrl": ""
        }
    ]
}
```

## Delete System User Request
This endpoint is used by the internal system to delete the system user request

### Endpoint
DELETE /authentication/api/v1/systemuser/request/vendor/{requestid}

### Scopes
Maskinporten token with scope <mark>altinn:authentication/systemuser.request.write</mark>

### Content types
application/json

### Parameters

#### requestId
The unique identifier of the request

### Response
True - if the request is successfully deleted.

### Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00010 | 400 | The Id does not refer to a Request in our system. | - |