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

{{<mermaid>}}
sequenceDiagram
Sluttbruker->>+Databehandler:Starter tjeneste
Databehandler->>+Altinn: POST /consentrequest med id
Note over Databehandler,Altinn: body med id
Altinn-->>-Databehandler:
Note over Altinn, Databehandler:body med id og redirectURL
Databehandler-->>Sluttbruker: redirect(redirectURL)
Sluttbruker ->>+Altinn: Godkjenn samtykke (id)
Altinn -->>- Sluttbruker: redirect(redirectURL?requestId=id)
Sluttbruker->>Databehandler: GET /redirectURL?requestId=id
Alt
Databehandler->>+Altinn: GET /consentrequest/consentRequestId
Altinn-->>-Databehandler:
Note over Altinn, Databehandler: Status på forespørsel <br/> consentRequestEvents med eventType Accepted/Denied
End
Databehandler->>+Maskinporten: POST /token
Note over Databehandler, Maskinporten: JWT med authorization_details <br/> "type": "urn:altinn:consent" <br/> "from":"sluttbrukerid"<br/> "id":"consentRequuestId"
Maskinporten-->>-Databehandler:
Note over Maskinporten,Databehandler: Samtykketoken
Databehandler->>+Tjenesteeier: Get /tjenesteSomKreverSamtykke
Note over Databehandler, Tjenesteeier: Samtykketoken i header
Tjenesteeier -->>- Databehandler:
Databehandler-->>-Sluttbruker:
{{< /mermaid >}}

Ved bruk av samtykke føleger man flyten over
Etter bruker har behandlet samtykkeforespørselen og blir redirected tilbake til datakonsument kam man slå opp for å hente status, eller eventuelt bare hente samtykketokenet og forsøke dette mot tjenesten.  
Dersom bruker ikke har godtatt samtykket vil man da få feilmelding fra tjenesten man bruker samtykketokenet mot

## Innhold

- [Be om samtykke](request/)
- [Hente samtykke-token](retrieve-token/)
- [På vegne av andre](behalf-of/)

## Ressurser

- [Maskinporten: API-konsument-guide](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument.html)

- [GitHub: Testimplementasjon](https://github.com/TheTechArch/smartbank)

- [Kjørende smartbank](https://smartbankdemo.azurewebsites.net/)
