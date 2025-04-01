---
title: Get a system user request
description: API for the vendor to get a system user request
toc: true
---
## Get a system user request

### Endpoint
GET authentication/api/v1/systemuser/request/vendor/{requestId}

### Scopes
Machineporten token with scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

## Arguments


### Required Arguments

#### requestId
The unique identifier of the request

## Example of Response Model
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

## Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| - | 400 | The value '{invalidrequestid}' is not valid | When the request id is not a valid guid |
| - | 401 | unauthorized |  |
| - | 404 | NotFound |  |
| AUTH-00010 | 404 | The Id does not refer to a Request in our system. |  |

## Get a system user request by external reference

### Endpoint
GET authentication/api/v1/systemuser/request/vendor/byexternalref/{systemid}/{orgno}/{externalref}

### Scopes
Machineporten token with scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

## Arguments


### Required Arguments

#### systemid
The id of the system that the request is referring to

#### orgno
The organisation number of the customer that has to handle the request

#### externalref
The unique external reference of the request provided by the vendor

## Example of Response Model
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

## Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| - | 400 | The value '{invalidrequestid}' is not valid | When the request id is not a valid guid |
| - | 401 | unauthorized |  |
| - | 404 | NotFound |  |
| AUTH-00010 | 404 | The Id does not refer to a Request in our system. |  |

## Get all system user requests for a vendor
Returns apaginated list of requests
### Endpoint
GET authentication/api/v1/systemuser/request/vendor/bysystem/{systemid}

### Scopes
Machineporten token with scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

## Arguments


### Required Arguments

#### systemid
The id of the system that the vendor is requesting a list for

## Example of Response Model
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

## Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| - | 400 | The value '{invalidrequestid}' is not valid | When the request id is not a valid guid |
| - | 401 | unauthorized |  |
| - | 404 | NotFound |  |
| AUTH-00010 | 404 | The Id does not refer to a Request in our system. |  |

