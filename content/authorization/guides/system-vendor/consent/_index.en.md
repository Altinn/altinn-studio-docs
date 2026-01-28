---
title: Consent for data consumers
description: This guide describes how data consumers can request, retrieve and manage consents using Altinn 3's consent solution.
linktitle: Consent
toc: false
---

Through consent, data consumers gain access to selected data resources for individuals or organisations, as defined by the service owner.
The service owner determines which data can be shared, how long the consent is valid, and under which conditions.

### Prerequisites

Complete the steps described in [Getting started with consent for data consumers](/en/authorization/getting-started/consent/)
before you follow this guide.

## Flow
{{< mermaid >}}
sequenceDiagram
participant Sluttbruker
participant Databehandler
participant Altinn
participant Maskinporten
participant Tjenesteeier

Sluttbruker->>+Databehandler: Starter tjeneste
Databehandler->>+Altinn: POST /consentrequest med id
Note over Databehandler,Altinn: body med id
Altinn-->>-Databehandler: 201 + body
Note over Altinn,Databehandler: body med id og redirectURL
Databehandler-->>-Sluttbruker: redirect(redirectURL)
Sluttbruker->>+Altinn: Godkjenn samtykke (id)
Altinn-->>-Sluttbruker: redirect(redirectURL?requestId=id)
Sluttbruker->>+Databehandler: GET /redirectURL?requestId=id
opt Valgfri verifisering
Databehandler->>+Altinn: GET /consentrequest/consentRequestId
Altinn-->>-Databehandler: status
Note over Altinn,Databehandler: Status på forespørsel <br/> consentRequestEvents med eventType Accepted/Denied
end
Databehandler->>+Maskinporten: POST /token
Note over Databehandler,Maskinporten: JWT med authorization_details <br/> type urn:altinn:consent <br/> from sluttbrukerid <br/> id consentRequuestId
Maskinporten-->>-Databehandler: samtykketoken
Note over Maskinporten,Databehandler: Samtykketoken
Databehandler->>+Tjenesteeier: GET /tjenesteSomKreverSamtykke
Note over Databehandler,Tjenesteeier: Samtykketoken i header
Tjenesteeier-->>-Databehandler: 200 OK
Databehandler-->>-Sluttbruker: Ferdig
{{< /mermaid >}}

When using consent, you follow the flow above.
After the user has processed the consent request and is redirected back to the data consumer, you can either query to retrieve the status or simply fetch the consent token and try it against the service.
If the user has not approved the consent, you will receive an error message from the service you use the consent token against.

## Contents

- [Request consent](request/)
- [Retrieve consent token](retrieve-token/)
- [Consent on behalf of others](behalf-of/)

## Resources

- [Maskinporten: API consumer guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument.html)
- [GitHub: Test implementation](https://github.com/TheTechArch/smartbank)
- [Running smartbank demo](https://smartbankdemo.azurewebsites.net/)
