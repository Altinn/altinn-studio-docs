---
title: Interne API
description: API for det interne systemet til å behandle systembrukerforespørsler
toc: true
---
## Godkjenn en systembrukerforespørsel
Dette API-et brukes av det interne systemet for å godkjenne systembrukerforespørselen.

### Endepunkt
POST /authentication/api/v1/systemuser/request/{party}/{requestid}/approve

### Scopes
Dette API-et er ikke tilgjengelig for eksterne. Det krever scope portal.

### Content types
application/json

### Argumenter

#### party
PartyID-en til organisasjonen som har tilgang til å behandle forespørselen

#### requestId
Den unike identifikatoren for forespørselen

### Response
True – hvis forespørselen er godkjent.

### Feil koder

| Feil kode     |Status kode | Feil melding      | Detaljert beskrivelse   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00013 | 409 | The Status of the Request is not New. |  |
| AUTH-00014 | 403 | DelegationCheck failed with unknown error. |  |
| AUTH-00016 | 403 | DelegationCheck failed with error: Has not access by a delegation of role in ER or Altinn. |  |
| AUTH-00018 | 403 | DelegationCheck failed with error: Has not access by direct delegation. |  |
| AUTH-00019 | 403 | DelegationCheck failed with error: The service requires explicit access in SRR and the reportee is missing this. |  |
| AUTH-00020 | 403 | DelegationCheck failed with error: The service requires explicit authentication level and the reportee is missing this. |  |
| AUTH-00003 | 400 | Failed to create the SystemUser. |  |


## Avvis en systembrukerforespørsel
Dette endepunktet brukes av det interne systemet for å avvise systembrukerforespørselen.

### Endepunkt
POST /authentication/api/v1/systemuser/request/{party}/{requestid}/reject

### Scopes
Dette API-et er ikke tilgjengelig for eksterne. Det krever scope portal.

### Content types
application/json

### Argumenter

#### party
PartyID-en til organisasjonen som har tilgang til å behandle forespørselen

#### requestId
Den unike identifikatoren for forespørselen

### Respons
True - if the request is successfully rejected.

### Feil koder

| Feil kode     |Status kode | Feil melding      | Detaljert beskrivelse   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00013 | 409 | The Status of the Request is not New. |  |
| AUTH-00010 | 400 | The Id does not refer to a Request in our system. |  |
| AUTH-00042 | 403 | Party does not match agent request's orgno |  |
| AUTH-00000 | 400 | Can't resolve the Organisation Number from the logged in Reportee PartyId. |  |

## Hent en agent systembrukerforespørsel etter party, RequestId

### Endepunkt
GET authentication/api/v1/systemuser/request/agent/{party}/{requestId}

### Scopes
Machineporten-token med scope <mark>altinn:authentication/systemuser.request.read</mark>

### Content types
application/json

### Argumenter

#### party
PartyID-en til organisasjonen som har tilgang til å behandle forespørselen.

#### requestId
Den unike identifikatoren for forespørselen

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

## Godkjenn en agent systembrukerforespørsel
Dette API-et brukes av det interne systemet for å godkjenne agent systembrukerforespørselen.

### Endepunkt
POST /authentication/api/v1/systemuser/request/agent/{party}/{requestid}/approve

### Scopes
Dette API-et er ikke tilgjengelig for eksterne. Det krever scope portal.

### Content types
application/json

### Argumenter

#### party
PartyID-en til organisasjonen som har tilgang til å behandle forespørselen

#### requestId
Den unike identifikatoren for forespørselen

### Response
True - om forespørselen er godkjent.

### Feil koder

| Feil kode     |Status kode | Feil melding      | Detaljert beskrivelse   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00013 | 409 | The Status of the Request is not New. |  |
| AUTH-00000 | 400 | Can't resolve the Organisation Number from the logged in Reportee PartyId. |  |
| AUTH-00030 | 404 | The Id does not refer to an AgentRequest in our system. |  |
| AUTH-00042 | 403 | Party does not match agent request's orgno |  |
| AUTH-00003 | 400 | Failed to create the SystemUser. |  |
| AUTH-00025 | 400 | The request id is valid but its not a valid request for creating an agent system user |  |
| AUTH-00011 | 404 | The Id does not refer to a Registered System. |  |
| AUTH-00017 | 404 | The SystemName was not found. |  |


## Avvis en agent systembrukerforespørsel
Dette endepunktet brukes av det interne systemet for å avvise agent systembrukerforespørselen.

### Endepunkt
POST /authentication/api/v1/systemuser/request/agent/{party}/{requestid}/reject

### Scopes
Dette API-et er ikke tilgjengelig for eksterne. Det krever scope portal.

### Content types
application/json

### Argumenter

#### party
PartyID-en til organisasjonen som har tilgang til å behandle forespørselen

#### requestId
Den unike identifikatoren for forespørselen

### Response
True - hvis forespørselen er avvist.

### Feil koder

| Feil kode     |Status kode | Feil melding      | Detaljert beskrivelse   |
|----------------|-------------|--------------------|------------------------|
| AUTH-00000 | 400 | Can't resolve the Organisation Number from the logged in Reportee PartyId. |  |
| AUTH-00030 | 404 | The Id does not refer to an AgentRequest in our system. |  |
| AUTH-00042 | 403 | Party does not match agent request's orgno |  |
| AUTH-00013 | 409 | The Status of the Request is not New. |  |
| AUTH-00010 | 400 | The Id does not refer to a Request in our system. |  |