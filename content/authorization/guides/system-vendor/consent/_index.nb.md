---
title: Samtykke for datakonsument

description: Denne veiledningen beskriver hvordan datakonsumenter kan be om, hente og administrere samtykker ved hjelp av Altinn 3 sin samtykkeløsning.

linktitle: Samtykke

toc: false
---

Gjennom samtykke får datakonsumenter tilgang til utvalgte dataressurser for innbyggere eller virksomheter, slik disse er definert av tjenesteeieren.
Det er tjenesteeieren som fastsetter hvilke data som kan deles, hvor lenge samtykket gjelder, og under hvilke vilkår.

### Forutsetning

Du må ha gjennomført stegene beskrevet i [Kom i gang med samtykke for datakonsumenter](/nb/authorization/getting-started/consent/)
før du følger denne veiledningen.

## Flyt

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

Ved bruk av samtykke følger man flyten over.
Etter at brukeren har behandlet samtykkeforespørselen og blir omdirigert tilbake til datakonsumenten, kan man slå opp for å hente status, eller bare hente samtykketokenet og prøve dette mot tjenesten.
Dersom brukeren ikke har godtatt samtykket, vil man få en feilmelding fra tjenesten man bruker samtykketokenet mot.

## Innhold

- [Be om samtykke](request/)
- [Hente samtykke-token](retrieve-token/)
- [På vegne av andre](behalf-of/)

## Ressurser

- [Maskinporten: API-konsument-guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument.html)

- [GitHub: Testimplementasjon](https://github.com/TheTechArch/smartbank)

- [Kjørende smartbank](https://smartbankdemo.azurewebsites.net/)
