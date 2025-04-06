---
title: Opprett et nytt system i systemregister
linktitle: Opprett system
description: API for the vendor to create a system in the system register
toc: false
weight: 2
---
## Opprett et nytt system

### Endepunkt

### Scopes
Machineporten-token med scope <mark style="background-color:lightgrey">altinn:authentication/systemregister.write</mark>

### Content typer
application/json

## Request Body
For detaljert beskrivelse av hver enhet i request, vennligst se beskrivelsen [her](../model)

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

## Error Codes

| Feil Kode     | Status Kode | Feil Melding      | Detaljert beskrivelse   |
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

## Eksempler

### System med app og ressurs
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

### System med tilgangspakke
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