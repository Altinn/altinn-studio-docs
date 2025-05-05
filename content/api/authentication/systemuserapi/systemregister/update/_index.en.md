---
title: Update a system in system register
linktitle: Update
description: API for the vendor to update a system in the system register
toc: false
weight: 4
---
## Update a registered system
System owners or administrators from the Digitalization Directorate can update a system. The update request follows a similar model to the create request. The update endpoint replaces the existing system information with the data provided in the update request. For example, the existing list of rights will be entirely replaced by the list specified in the update request.

### Endpoint
PUT authentication/api/v1/systemregister/vendor/{systemid}

### Request Body
For detailed description about each entity in the body, please refer the description [here](../model)

```
{
  "id": "",
  "vendor": {
    "authority": "iso6523-actorid-upis",
    "ID": ""
  },
  "name": {
    "nb": "",
    "en": "",
    "nn": ""
  },
  "description": {
    "nb": "",
    "en": "",
    "nn": ""
  },
  "rights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": ""
        }
      ]
    },
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": ""
        }
      ]
    }
  ],
  "clientId": [
    ""
  ],
  "allowedredirecturls": [
    "",
  ],
  "isVisible": 
}
```


### Scopes
Machineporten token with scope <mark>altinn:authentication/systemregister.write</mark>

### Content types
application/json

## Arguments

#### systemId
The id should be in the format of {systemvendororgno}_{name chosen by the vendor}. F.example "310547891_testproduct". This is a unique id to identify the product.

## Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| AUTH.VLD-00000 | 400 | the org number identifier is not valid ISO6523 identifier | The organization identifier must be 0192, f.ex 0192:991825827 |
| AUTH.VLD-00001 | 400 | The system id does not match the format orgnumber_xxxx...  | The systemid is expected to be in the format vendororgnumber_xxxxxx |
| AUTH.VLD-00002 | 400 | The system id already exists | The system id is already taken |
| AUTH.VLD-00003 | 400 | One or all the resources in rights is not found in altinn's resource register | Any service outside altinn must be registered as a resource in altinn's resource register. Either the service provider has failed to register the resource or is specified wrong in the system register request. 
| AUTH.VLD-00004 | 400 | One of the client id is already tagged with an existing system | The ClientId can be tied to only one organisation. The vendor must use a different client id for the new system.|
| AUTH.VLD-00005 | 400 | One or more of the redirect urls format is not valid. The valid format is https://xxx.xx | - |
| AUTH.VLD-00006 | 400 | One or more duplicate rights found | Cehck your rights section and eliminate any duplicate app/resource |
| AUTH.VLD-00007 | 400 | One or more duplicate access package(s) found | The system id is already taken |
| AUTH.VLD-00008 | 400 | One or all the accesspackage(s) is not found in altinn's access packages or is not a part of REGN/REVI/Forretningsfører roller | The system id is already taken |
| AUTH.VLD-00009 | 400 | One or more resource id is in wrong format. The vlaid format is urn:altinn:resource | - |

## Examples

### System with app and resource defined
```
{
  "id": "991825827_systemwithappandresource",
  "vendor": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:991825827"
  },
  "name": {
    "nb": "System med app og ressurs",
    "en": "System With App and Resource",
    "nn": "System med app og ressurs"
  },
  "description": {
    "nb": "Test system with app and resource",
    "en": "Test system with app and resource",
    "nn": "Test system with app and resource"
  },
  "rights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "app_ttd_endring-av-navn-v2"
        }
      ]
    },
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "ske-krav-og-betalinger"
        }
      ]
    }
  ],
  "clientId": [
    "087fc0e3-674f-4eaa-aea2-75e3369463e5"
  ],
  "allowedredirecturls": [
    "https://vg.no",
    "https://nrk.no",
    "https://altinn.no"
  ],
  "isVisible": true
}
```

### System with access package
```
{
  "id": "991825827_systemwithaccesspackageandresource",
  "vendor": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:991825827"
  },
  "name": {
    "nb": "The Matrix",
    "en": "The Matrix",
    "nn": "The Matrix"
  },
  "description": {
    "nb": "Test system",
    "en": "Test system",
    "nn": "Test system"
  },
  "accessPackages": [
    {
      "urn": "urn:altinn:accesspackage:skattnaering"
    }
  ],
  "rights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "ske-krav-og-betalinger"
        }
      ]
    }
  ],
  "clientId": [
    "32ef65ac-6e62-498d-880f-76c85c2052ae"
  ],
  "allowedredirecturls": [
    "https://vg.no",
    "https://nrk.no",
    "https://altinn.no"
  ],
  "isVisible": true
}
```

## Update rights for a system
The system owner or the digitaliseringsdirectorate admin can update rights of a system. The update rights request takes just the rights information

### Endpoint
PUT authentication/api/v1/systemregister/vendor/{systemid}/rights

### Request Body

```
[
    {
        "resource": [
            {
                "id": "urn:altinn:resource",
                "value": "authentication-e2e-test"
            },
            {
                "id": "urn:altinn:resource",
                "value": "authentication-e2e-test"
            }
        ]
    }
]
```
### Scopes
Machineporten token with scope <mark>altinn:authentication/systemregister.write</mark>

### Content types
application/json

## Update accesspackages for a system
The system owner or the digitaliseringsdirectorate admin can update accesspackages of a system. The update accesspackages request takes just the accesspackage information

### Endpoint
PUT authentication/api/v1/systemregister/vendor/{systemid}/accesspackages

### Request Body

```
[
    {
        "urn": "urn:altinn:accesspackage:revisormedarbeider"
    },
    {
        "urn": "urn:altinn:accesspackage:ansvarlig-revisor"
    }
]
```
### Scopes
Machineporten token with scope <mark>altinn:authentication/systemregister.write</mark>

### Content types
application/json