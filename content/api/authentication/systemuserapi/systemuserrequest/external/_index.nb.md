---
title: Eksterne API
description: API for leverandøren til å administrere systembrukerforespørsler
toc: true
---
## Opprett en standard systembrukerforespørsel

### Endepunkt
POST authentication/api/v1/systemuser/request/vendor

### Scopes
Maskinporten-token med scope <mark>altinn:authentication/systemuser.request.write</mark>

### Content types
application/json

### Request Body
For en detaljert beskrivelse av hver felt i requesten, vennligst se beskrivelsen [her](model#standard-systembruker-request)

### Request Eksempel
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
For en detaljert beskrivelse av hver felt i responsen, vennligst se beskrivelsen [her](model#standard-systembruker-respons)

### Respons Eksempel
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
### Feil koder

| Feil kode     | Status kode | Feil Melding      | Detaljert beskrivelse   |
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


## Hent en systembruker forespørsel

### Endepunkt
GET authentication/api/v1/systemuser/request/vendor/{requestId}

### Scopes
Maskinporten-token med scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

### Argumenter

#### requestId
Den unike identifikatoren for forespørselen.

### Respons eksempel
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

### Feil koder

| Feil kode     | Status kode | Feil Melding      | Detaljert beskrivelse   |
|----------------|-------------|--------------------|------------------------|
| - | 400 | The value '{invalidrequestid}' is not valid | When the request id is not a valid guid |
| - | 401 | unauthorized | - |
| - | 404 | NotFound | - |
| AUTH-00010 | 404 | The Id does not refer to a Request in our system. | - |

## Hent en systembruker foresporsel med eksterne referanse

### Endepunkt
GET authentication/api/v1/systemuser/request/vendor/byexternalref/{systemid}/{orgno}/{externalref}

### Scopes
Maskinporten-token med scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

### Argumenter

#### systemid
ID-en til systemet som forespørselen refererer til

#### orgno
Organisasjonsnummeret til kunden som må håndtere forespørselen

#### externalref
Den unike eksterne referansen for forespørselen gitt av leverandøren

### Respons eksempel
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

### Feil koder

| Feil kode     | Status kode | Feil Melding      | Detaljert beskrivelse   |
|----------------|-------------|--------------------|------------------------|
| - | 400 | The value '{invalidrequestid}' is not valid | When the request id is not a valid guid |
| - | 401 | unauthorized | - |
| - | 404 | NotFound | - |
| AUTH-00010 | 404 | The Id does not refer to a Request in our system. | - |

## Hent systembruker forespørseler for leverandøren
Returnerer en paginert liste over forespørsler

### Endepunkt
GET authentication/api/v1/systemuser/request/vendor/bysystem/{systemid}

### Scopes
Maskinporten token with scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

### Argumenter

#### systemid
ID-en til systemet som leverandøren ber om en liste for

### Respons eksempel
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

### Feil koder

| Feil kode     | Status kode | Feil melding      | Detaljert beskrivelse   |
|----------------|-------------|--------------------|------------------------|
| - | 400 | The value '{invalidrequestid}' is not valid | When the request id is not a valid guid |
| - | 401 | unauthorized | - |
| - | 404 | NotFound | - |
| AUTH-00010 | 404 | The Id does not refer to a Request in our system. | - |


## Opprett en agent systembruker forespørsel
Dette endepunktet brukes til å opprette en systembrukerforespørsel av typen agent.

### Endepunkt
POST authentication/api/v1/systemuser/request/vendor/agent

### Scopes
Maskinporten-token med scope <mark>altinn:authentication/systemuser.request.write</mark>

### Content types
application/json

### Request Body
For en detaljert beskrivelse av hver felt i requesten, vennligst se beskrivelsen [her](model#agent-systembruker-request)

#### Request eksempel
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
### Respons
For en detaljert beskrivelse av hver felt i responsen, vennligst se beskrivelsen [here](model#agent-systembruker-respons)

#### Respons eksempel
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
### Feil koder

| Feil kode    | Status kode | Feil melding      | Detaljert beskrivelse   |
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

## Hent en agent systembruker forespørsel

### Endepunkt
GET authentication/api/v1/systemuser/request/vendor/agent/{requestId}

### Scopes
Maskinporten-token med scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

### Argumenter

#### requestId
Den unike identifikatoren for forespørselen.

### Respons
For en detaljert beskrivelse av hver felt i responsen, vennligst se beskrivelsen [here](model#agent-systembruker-respons)

#### Respons eksempel
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

### Feil koder

| Feil kode    | Status kode | Feil melding      | Detaljert beskrivelse   |
|----------------|-------------|--------------------|------------------------|
| - | 400 | The value '{requestid}' is not valid | When the request id is not a valid guid |
| - | 401 | unauthorized | - |
| - | 404 | NotFound | - |
| AUTH-00010 | 404 | The Id does not refer to a Request in our system. | - |

## Hent en agent systembruker forespørsel med eksterne referanse

### Endepunkt
GET authentication/api/v1/systemuser/request/vendor/agent/byexternalref/{systemid}/{orgno}/{externalref}

### Scopes
Maskinporten-token med scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

### Argumenter

#### systemid
ID-en til systemet som forespørselen refererer til

#### orgno
Organisasjonsnummeret til kunden som må håndtere forespørselen

#### externalref
Den unike eksterne referansen for forespørselen gitt av leverandøren

### Respons
For en detaljert beskrivelse av hver felt i responsen, vennligst se beskrivelsen [here](model#agent-systembruker-respons)

#### Respons eksempel
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

### Feil koder

| Feil kode    | Status kode | Feil melding      | Detaljert beskrivelse   |
|----------------|-------------|--------------------|------------------------|
| - | 400 | The value '{requestid}' is not valid | When the request id is not a valid guid |
| - | 401 | unauthorized | - |
| - | 404 | NotFound | - |
| AUTH-00010 | 404 | The Id does not refer to a Request in our system. | - |


## Hent agent systembruker forspørseler for en leverandør
Returnerer en paginert liste over forespørsler

### Endepunkt
GET authentication/api/v1/systemuser/request/vendor/agent/bysystem/{systemid}

### Scopes
Maskinporten-token med scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

### Argumenter

#### systemid
ID-en til systemet som leverandøren ber om en liste for

### Respons
For en detaljert beskrivelse av hver felt i responsen, vennligst se beskrivelsen [here](model#agent-systembruker-respons)

### Respons eksempel
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

## Slett systembruker forespørsel
Dette endepunktet brukes av leverandøren for å slette systembrukerforespørselen.

### Endpoint
DELETE /authentication/api/v1/systemuser/request/vendor/{requestid}

### Scopes
Maskinporten-token med scope <mark>altinn:authentication/systemuser.request.write</mark>

### Content types
application/json

### Argumenter

#### requestId
The unique identifier of the request

### Respons
True – hvis forespørselen er slettet

### Feil koder

| Feil kode    | Status kode | Feil melding      | Detaljert beskrivelse   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00010 | 400 | The Id does not refer to a Request in our system. | - |