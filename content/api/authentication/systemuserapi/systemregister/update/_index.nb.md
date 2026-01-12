---
title: Oppdater et system i systemregisteret.
linktitle: Oppdater system
description: API for leverandøren til å oppdatere et system i systemregisteret.
toc: false
weight: 4
---

## Oppdater et registrert system.

Systemeiere eller administratorer fra Digitaliseringsdirektoratet kan oppdatere et system. Oppdateringsforespørselen følger et lignende modell som opprettingsforespørselen. Oppdateringsendepunktet erstatter den eksisterende systeminformasjonen med de dataene som er oppgitt i oppdateringsforespørselen. For eksempel vil den eksisterende listen over rettigheter bli fullstendig erstattet med listen som er spesifisert i oppdateringsforespørselen.

### Endepunkt

PUT authentication/api/v1/systemregister/vendor/{systemid}

### Scopes

Maskinporten-token med scope <mark>altinn:authentication/systemregister.write</mark>

### Content types

application/json

## Argumenter

#### systemId

ID-en skal være i formatet {systemleverandørorgnr}\_{navn valgt av leverandøren}. For eksempel '310547891_testprodukt'. Dette er en unik ID for å identifisere systemet.

## Request Body

For detaljert beskrivelse av hver felt i request, vennligst se beskrivelsen [her](/nb/api/authentication/systemuserapi/systemregister/model/)

```
{
  "id": "",
  "vendor": {
    "authority": "iso6523-actorid-upis",
    "ID": ""
  },
  "name": {
    "nb": "Testsystem",
    "en": "Testsystem",
    "nn": "Testsystem"
  },
  "description": {
    "nb": "Testsystem",
    "en": "Testsystem",
    "nn": "Testsystem"
  },
  "rights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "ske-krav-og-betalinger"
        }
      ]
    },
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "authentication-e2e-test"
        }
      ]
    }
  ],
  "accessPackages": [],
  "clientId": [
    "824234239-e8cf-4fe1-b3434335-42423482349fbdc"
  ],
  "isVisible": false,
  "allowedRedirectUrls": [
    "https://altinn.no/",
    "https://altinn.studio/"
  ]
}
```

> **Merk:** I alle eksemplene er `isVisible` satt til `false` slik at leverandører kan registrere og teste systemer uten å eksponere dem for sluttbrukere i produksjon.

## Error Koder

| Feil Kode      | Status Kode | Feil melding                                                                                                          | Detaljert beskrivelse                                                                                                                                                                                                                                                                                                                                                           |
| -------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AUTH.VLD-00000 | 400         | the org number identifier is not valid ISO6523 identifier                                                             | The organization identifier must be 0192, f.ex 0192:991825827                                                                                                                                                                                                                                                                                                                   |
| AUTH.VLD-00001 | 400         | The system id does not match the format orgnumber_xxxx...                                                             | The systemid is expected to be in the format vendororgnumber_xxxxxx                                                                                                                                                                                                                                                                                                             |
| AUTH.VLD-00002 | 400         | The system id already exists                                                                                          | The system id is already taken                                                                                                                                                                                                                                                                                                                                                  |
| AUTH.VLD-00003 | 400         | One or more resources specified in rights were not found in Altinn's resource register.                               | Any service outside altinn must be registered as a resource in altinn's resource register. Either the service provider has failed to register the resource or is specified wrong in the system register request.                                                                                                                                                                |
| AUTH.VLD-00004 | 400         | One of the client id is already tagged with an existing system                                                        | The ClientId can be tied to only one organisation. The vendor must use a different client id for the new system.                                                                                                                                                                                                                                                                |
| AUTH.VLD-00005 | 400         | One or more of the redirect urls format is not valid. The valid format is https://xxx.xx                              | -                                                                                                                                                                                                                                                                                                                                                                               |
| AUTH.VLD-00006 | 400         | One or more duplicate rights found                                                                                    | Check your rights section and eliminate any duplicate app/resource                                                                                                                                                                                                                                                                                                              |
| AUTH.VLD-00007 | 400         | One or more duplicate access package(s) found                                                                         | The system id is already taken                                                                                                                                                                                                                                                                                                                                                  |
| AUTH.VLD-00008 | 400         | One or all the accesspackage(s) is not found in altinn's access packages or is not delegable                          | The system id is already taken                                                                                                                                                                                                                                                                                                                                                  |
| AUTH.VLD-00009 | 400         | One or more resource id is in wrong format. The valid format is urn:altinn:resource                                   | -                                                                                                                                                                                                                                                                                                                                                                               |
| AUTH.VLD-00011 | 400         | Request contains duplicate client ids                                                                                 | -                                                                                                                                                                                                                                                                                                                                                                               |
| AUTH.VLD-00012 | 400         | The system ID in the request body does not match the system ID in the URL                                             | -                                                                                                                                                                                                                                                                                                                                                                               |
| AUTH.VLD-00013 | 400         | System ID cannot have spaces in id (leading, trailing or in between the id)                                           | -                                                                                                                                                                                                                                                                                                                                                                               |
| AUTH.VLD-00017 | 400         | One or more resources specified in rights is of resource type which is not delegable.                                 | -                                                                                                                                                                                                                                                                                                                                                                               |
| AUTH.VLD-00018 | 400         | Access packages meant for system user for client relations can't be used in combination with the flag isVisible: true | Når du oppretter en systembruker via brukerflaten, må systemet i Systemregisteret være satt til isVisible: true. Dette gjelder kun for egen (standard) systembruker, der rettigheter delegeres direkte til systembrukeren i opprettelsesprosessen. Klientdelegeringsspesifikke tilgangspakker kan ikke kombineres med isVisible: true, fordi disse pakkene ikke er delegerbare. |

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
  "isVisible": false
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
  "isVisible": false
}
```

## Oppdater rettighet for et system

Systemeieren eller administratoren fra Digitaliseringsdirektoratet kan oppdatere rettighetene for et system. Oppdateringsforespørselen for rettigheter tar kun med rettighetsinformasjonen.

### Endepunkt

PUT authentication/api/v1/systemregister/vendor/{systemid}/rights

### Request Body

```
[
  {
    "resource": [
      {
        "id": "urn:altinn:resource",
        "value": "authentication-e2e-test"
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
]
```

### Scopes

Maskinporten-token med scope <mark>altinn:authentication/systemregister.write</mark>

### Content types

application/json

## Oppdater tilgangspakker for et system

Systemeieren eller digitaliseringsdirektoratets administrator kan oppdatere tilgangspakker for et system. Oppdateringsforespørselen for tilgangspakker krever kun tilgangspakkeinformasjonen.

### Endepunkt

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

Maskinporten-token med scope <mark>altinn:authentication/systemregister.write</mark>

### Content types

application/json
