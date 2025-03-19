---
title: Create a new system in system register
description: API for the vendor to create a system in the system register
toc: true
---
## Create a new system

### Endpoint
authentication/api/v1/systemregister/vendor

### Scopes
Machineporten token with scope <mark>altinn:authentication/systemregister.write</mark>

### Content types
application/json

## Arguments


### Required Arguments

#### Id
The id should be in the format of {systemvendororgno}_{name chosen by the vendor}. F.example "310547891_testproduct". This is a unique id to identify the product.

#### Vendor
The organization number of the system vendor. It must start with a reference code for the enhetsregister.

for example
```    
"vendor": {
  "ID": "0192:991825827"
}
```
<<0192>> is the reference that it is a value from EnhetsRegister according to [Electronic Address Scheme](https://docs.peppol.eu/poacc/billing/3.0/codelist/eas/) and 991825827 is the organization number of Norwegian Digitalisation Agency.

#### Name
Name of the system. This supports languages english(en), norwegian bokmål(nb) and nynorsk(nn). This is used on the display of th system in the user interface for manulaly creating the system user and also on approval of a system user request.

```    
  "name": {
    "nb": "The Matrix",
    "en": "The Matrix",
    "nn": "The Matrix"
  },
```

#### Description
A short text that describes the system. This is used to present to the end user in the Altinn portal. english(en), norwegian nokmål(nb) and nynorsk(nn) are supported.
```    
  "description": {
    "nb": "Test system",
    "en": "Test system",
    "nn": "Test system"
  },
```
#### Rights
This defines the services that the vendor's system requires access from the system user. This can be either altinn 3 app, service outside altinnn but is registered as a resource in Altinn. The example below defines an app "app_ttd_endring-av-navn-v2" in altinn and service "ske-krav-og-betalinger" outside altinn that is registered as a resource in Altinn. This is an optional argument to create a system but it must be set before the system user can be created.
```
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
```
#### AccessPackages
This defines the access packages that the vendor's system requires access from the system user. As of now, this is defined only for the client delegation case. The example below defines the accesspackage "skattnaering". The access package should be one of the roles "REGN/REVI/FFOR". This is an optional argument to create a system but it must be set before the system user can be created.
```
  "accessPackages": [
    {
      "urn": "urn:altinn:accesspackage:skattnaering"
    }
  ]
```

#### ClientId
A system can be associated with multiple client IDs. These client IDs are generated for integrations in Maskinporten, and each one is unique, tied specifically to a system. As a result, a client ID cannot be reused for a different system. If the system linked to a client ID is deleted, the client ID may be reassigned to a new or existing system.

```
  "clientId": [
    "32ef65ac-6e62-498d-880f-76c85c2052ae"
  ],
```

#### IsVisible
The vendor can decide whether the system should be visible in the Altinn portal for end users to manually create it.
 - True: The system is visible in the user-driven system creation process in the Altinn portal.
 - False: The system is not visible in the Altinn portal and can only be created by the vendor through the vendor-driven system creation process.

#### AllowedRedirectUrls
This is to whitelist the urls that is allowed to be set in the redirecturl for a vendor driven system user request. Only https urls are allowed.
 ```
   "allowedredirecturls": [
    "https://vg.no",
    "https://nrk.no",
    "https://altinn.no"
  ],
 ```

## Error Codes

| Error Code     | Status Code | Error Message      | Detailed Description   |
|----------------|-------------|--------------------|------------------------|
| AUTH.VLD-00000 | 400 | the org number identifier is not valid ISO6523 identifier | The organization identifier must be 0192, f.ex 0192:991825827 |
| AUTH.VLD-00001 | 400 | The system id does not match the format orgnumber_xxxx...  | The systemid is expected to be in the format vendororgnumber_xxxxxx |
| AUTH.VLD-00002 | 400 | The system id already exists | The system id is already taken |
| AUTH.VLD-00003 | 400 | One or all the resources in rights is not found in altinn's resource register | Any service outside altinn must be registered as a resource in altinn's resource register. Either the service provider has failed to register the resource or is specified wrong in the system register request. 
| AUTH.VLD-00004 | 400 | One of the client id is already tagged with an existing system | The ClientId can be tied to only one organisation. The vendor must use a different client id for the new system.
| AUTH.VLD-00005 | 400 | One or more of the redirect urls format is not valid. The valid format is https://xxx.xx | |
| AUTH.VLD-00006 | 400 | One or more duplicate rights found | Cehck your rights section and eliminate any duplicate app/resource |
| AUTH.VLD-00007 | 400 | One or more duplicate access package(s) found | The system id is already taken |
| AUTH.VLD-00008 | 400 | One or all the accesspackage(s) is not found in altinn's access packages or is not a part of REGN/REVI/Forretningsfører roller | The system id is already taken |

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