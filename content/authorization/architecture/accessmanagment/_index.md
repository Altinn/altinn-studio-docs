---
title: Application construction components - Altinn Access Management
linktitle: Access Management
description: The Access Management component in the Altinn platform is an asp.net core 6 web API application with a REACT frontend deployed as a docker container to the Altinn Platform Kubernetes cluster.
tags: [architecture, solution]
toc: false
---


See [solutions](/authorization/accessmanagement/) for details about the functionality provided by this component.

![Access Management](accessmanagement.drawio.svg "Construction Components Altinn Resource Registry")


## Frontend

The frontend is created with REACT as a standalone REACT application.

It uses the following frameworks

- Axios : For 
- Redux :
- Redux Toolkit :
- Redux Query :

### Build & Deploy

We use GitHub Actions and Azure DevOps to build Frontend applications. 
The code is located in [altinn-access-mangement-frontend](https://github.com/Altinn/altinn-access-management-frontend) repo

- [Github Action](https://github.com/Altinn/altinn-access-management-frontend/actions)
- Azure DevOps Pipeline

### Hosting

The backend hosts the compiled frontend application.
Files is located in [wwwroot](https://github.com/Altinn/altinn-access-management/tree/main/backend/src/Altinn.Authorizationadmin/Altinn.Authorizationadmin/wwwroot/AuthorizationAdmin) folder in the backend. 

## Backend

The following API  controllers is available in component

- [DelegationAPI](https://github.com/Altinn/altinn-access-management/blob/main/src/Altinn.AccessManagement/Controllers/DelegationsController.cs)
- [DelegationRequestAPI](https://github.com/Altinn/altinn-access-management/blob/main/src/Altinn.AccessManagement/Controllers/DelegationRequestsController.cs)
- DelegationResourcesAPI
- AuthenticationAPI


## Database

The data for delegation is stored in postgreSQL and Azure blob storage.

- Delegationchange - contains delegation info for app delegations
- ResourceDelegationChange - contains delegation change info for resoruce delegations
- AuthorizationResources - Extract from resource registry with the most important resource information

![Database](dbmodel.drawio.svg "Access management Database")

## API

The following API is identifed

### Rights

Rights API List rights between two parties. (organizations/users/persons).

Rights is based on rules defined by resource owner or rights defined by reportee as part of a rights delegation

There is different consumers of API

- End user wondering which rights he/she have for the reportee
- Administrator for reportee 
- Resource owner needing to know which rights A have for B



#### Outbound Rights

The outbound API is targeted for administrators of the reportee.

```http
/accessmanagement/api/v1/{who}/rights/outbound/?resource={resource}&recevingParty={receivingparty}
```

**Example**

```http
/accessmanagement/api/v1/234234/rights/outbound/?resource=app:skd_flyttemelding&recevingParty=556677
```


#### Inbound Rights

```http
/accessmanagement/api/v1/{who}/rights/inbound/?resource={resource}&recevingParty={receivingparty}
```

**Example**

```http
/accessmanagement/api/v1/234234/rights/inbound/?resource=app_skd_flyttemelding&recevingParty=556677
```


#### Response

The list of rights for all types of relations is returned

- Rights from policy defined by resource owner (service owner) defining ER roles or Altinn roles
- Rights from delegated polices


```json
[
    {
        "PolicyId": "app:skd_flyttemelding",
         "PolicyVersion": "??",
        "RuleId" : "1",
        "OfferedByPartyId": "234234",
        "CoveredBy"[
            {
                "id": "urn:altinn:party",
                "value": "556677"
            }
        ],
        "Subject"[
            {
                "id": "urn:altinn:role",
                "value": "dagl"
            }
        ],
        "Resource"[
            {
                "id": "urn:altinn:org",
                "value": "skd"
            },
            {
                "id": "urn:altinn:app",
                "value": "flyttemelding"
            }
        ],
        "Action":
            {
                "id": "urn:altinn:action",
                "value": "read"
            }
        ,
        "RightSourceType":"Role",
        "HasPermit": true
    },
    {
        "PolicyId": "app:skd_flyttemelding",
         "PolicyVersion": "??",
        "RuleId" : "2",
        "OfferedByPartyId": "234234",
        "CoveredBy"[
            {
                "id": "urn:altinn:party",
                "value": "556677"
            }
        ],
        "Subject"[
            {
                "id": "urn:altinn:role",
                "value": "dagl"
            }
        ],
        "Resource"[
            {
                "id": "urn:altinn:org",
                "value": "skd"
            },
            {
                "id": "urn:altinn:app",
                "value": "flyttemelding"
            }
        ],
        "Action":
            {
                "id": "urn:altinn:action",
                "value": "write"
            }
        ,
        "RightSourceType":"Role",
        "HasPermit": true
    },
    {
        "PolicyId": "/skd_flyttemedling/234234/234234234",
        "PolicyVersion": "2010-12-10 10:35:123",
        "RuleId" : "1",
        "OfferedByPartyId": "234234",
        "CoveredBy"[
            {
                "id": "urn:altinn:party",
                "value": "556677"
            }
        ],
        "Subject"[
            {
                "id": "urn:altinn:user",
                "value": "234234"
            }
        ],
        "Resource"[
            {
                "id": "urn:altinn:org",
                "value": "skd"
            },
            {
                "id": "urn:altinn:app",
                "value": "flyttemelding"
            }
        ],
        "Action":
            {
                "id": "urn:altinn:action",
                "value": "sign"
            }
        ,
        "RightSourceType":"AppDelegation",
        "HasPermit": true
    }
]
```

### Rights delegations


#### List

Delegations list the existence of some rights between two parties for a specific resource or resource type

In first iteration we will expose a specific endpoint for maskinportenschemes.

This to delay the need for a generic endpoint

Endpoint for enduser using the portal

```http
/accessmanagement/api/v1/{who}/delegations/maskinportenscheme/outbound/
```

```http
/accessmanagement/api/v1/admin/delegations/maskinportenscheme/outbound/?supplierORg=234234&consumerOrg&scope=www.navn.no
```


Returns a list of delegations. Contains receiver, top resource and information about time.

```json
[
    {
        "ResourceId": "resource:innteksapi",
        "ResourceTitle": "2022-01-22",
        "Delegation": [
            {
                "CoveredByName": "EVRY",
                "OfferedByName": "NAV",
                "OfferedByPartyId": 123134234,
                "CoveredByPartyId": 234234,
                "PerformedByUserId": 123123,
                "Created": "2020-01-01",
                "OfferedByOrganizationNumber": null,
                "CoveredByOrganizationNumber": null 
            },
            {
                "CoveredByName": "KPMG",
                "OfferedByName": "NAV",
                "OfferedByPartyId": 123134234,
                "CoveredByPartyId": 234234,
                "PerformedByUserId": 123123,
                "Created": "2020-01-01",
                "OfferedByOrganizationNumber": null,
                "CoveredByOrganizationNumber": null 
            }
        ]
    }
]
```


**POST**

Delegates new rights with adding new rules



### Rights delegation

List details of a specific delegation.

```http
/accessmanagement/api/v1/admin/delegations/rules/?offeredByPartyId=2324
```



```json
[
    {
        "PolicyId": "d9da781a-b8d0-46f6-ba33-882a2e47c0c6",
        "RuleId" : "asdfasdfsdaf",
        "OfferedByPartyId": "234234",
        "CoveredBy"[
            {
                "id": "urn:altinn:party",
                "value": "556677"
            }
        ],
        "Subject"[
            {
                "id": "urn:altinn:userid",
                "value": "123123"
            }
        ],
        "Resource"[
            {
                "id": "urn:altinn:org",
                "value": "skd"
            },
            {
                "id": "urn:altinn:app",
                "value": "flyttemelding"
            }
        ],
        "Action":
            {
                "id": "urn:altinn:action",
                "value": "read"
            }
        ,
        "RightSourceType":"Role",
        "HasPermit": true
    },
    {
        "PolicyId": "app:skd_flyttemelding",
        "RuleId" : "asdfasdfsdaf",
        "OfferedByPartyId": "234234",
        "CoveredBy"[
            {
                "id": "urn:altinn:party",
                "value": "556677"
            }
        ],
        "Subject"[
            {
                "id": "urn:altinn:role",
                "value": "dagl"
            }
        ],
        "Resource"[
            {
                "id": "urn:altinn:org",
                "value": "skd"
            },
            {
                "id": "urn:altinn:app",
                "value": "flyttemelding"
            }
        ],
        "Action":
            {
                "id": "urn:altinn:action",
                "value": "write"
            }
        ,
        "RightSourceType":"Role",
        "HasPermit": true
    }
]
```

##### Delegations



##### Access Groups

/accessmanagement/api/v1/accessgroups

/accessmanagement/api/v1/accessgroups/offeredBy/{partyId}/coveredBy/{partyId}


GET - List groups


/accessmanagement/api/v1/accessgroups/{group}/resorucerights/

/accessmanagement/api/v1/accessgroups/{group}/resorucerights/{resourceid}/

GET


```json
[
    {
        "PolicyId": "d9da781a-b8d0-46f6-ba33-882a2e47c0c6",
        "RuleId" : "asdfasdfsdaf",
        "OfferedByPartyId": "234234",
        "CoveredBy"[
            {
                "id": "urn:altinn:party",
                "value": "556677"
            }
        ],
        "Subject"[
            {
                "id": "urn:altinn:userid",
                "value": "123123"
            }
        ],
        "Resource"[
            {
                "id": "urn:altinn:org",
                "value": "skd"
            },
            {
                "id": "urn:altinn:app",
                "value": "flyttemelding"
            }
        ],
        "Action":
            {
                "id": "urn:altinn:action",
                "value": "read"
            }
        ,
        "RightSourceType":"Role",
        "HasPermit": true
    },
    {
        "PolicyId": "app:skd_flyttemelding",
        "RuleId" : "asdfasdfsdaf",
        "OfferedByPartyId": "234234",
        "CoveredBy"[
            {
                "id": "urn:altinn:party",
                "value": "556677"
            }
        ],
        "Subject"[
            {
                "id": "urn:altinn:role",
                "value": "dagl"
            }
        ],
        "Resource"[
            {
                "id": "urn:altinn:org",
                "value": "skd"
            },
            {
                "id": "urn:altinn:app",
                "value": "flyttemelding"
            }
        ],
        "Action":
            {
                "id": "urn:altinn:action",
                "value": "write"
            }
        ,
        "RightSourceType":"Role",
        "HasPermit": true
    }
]
```













####



### Security

#### Authentication

Apis are protected and require an authenticated user or organization.

The token is provided through a cookie for users using the React frontend or through a bearer token header.

Altinn Access Management has configured the JWTCookie authentication method created for Altinn. This support validation of both JWTCookie and JTW bearer token.

Needs to be clarified: Do we support Maskinporten tokens directly?

#### CSRF protection

The API endpoints will have CSRF protection.

#### API Management subscription

Some functionality will require a specific API management subscription.
This requires external consumers to follow SLA and have an agreement for API usage. 

### Authorization

The API exposed will require authorization for the usage of different levels.

Some APIs will require general access to a resource. This will be processed by the standard Policy Enforcement Point or a possible custom enforcement point.

In addition, the APIS will often have its internal logic to filter data based on business rules. These are custom implementations

### Db Repository
Access Manamgent owns the delegated rights. 

- PostgreSQL is used to store information about a delegated policy
- Azure Blob Storage is used 

See [migration scripts](https://github.com/Altinn/altinn-access-management/tree/main/backend/src/Altinn.Authorizationadmin/Altinn.Authorizationadmin/Migration) for table structure and stored procedures.


## Build & Deploy

- Build and Code analysis are done by an [Github action](https://github.com/Altinn/altinn-resource-registry/actions)
- Build of the image is done in [Azure Devops](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=385)
- Deploy of the Image is done in [Azure Devops](https://dev.azure.com/brreg/altinn-studio/_release?_a=releases&view=all&definitionId=36)