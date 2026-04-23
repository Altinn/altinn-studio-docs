---
title: 'Dialogtoken'
description: 'Lær hvordan dialogtoken kan brukes til å forenkle autorisasjon og muliggjøre høyere konfidensialitet'
slug: 'dialogtoken'
aliases:
  - /nb/dialogporten/getting-started/authorization/dialog-tokens/
weight: 30
---

## Introduksjon
Et dialogtoken er en signert JSON Web Token (JWT) utstedt av Dialogporten som inneholder informasjon om den autentiserte brukeren eller organisasjonen, den valgte aktøren, dialogidentifikatoren, dato og andre detaljer.

Dialogtokenet muliggjør en enklere autorisasjonsflyt for både sluttbrukersystemer og tjenesteleverandører, da det inneholder autorisasjonsbeslutningene fra Altinn Autorisasjon basert på ID-porten- eller Maskinporten-identiteten som ble brukt til å autentisere brukeren. Bruk av dette tokenet gjør at tjenesteleverandørsystemene slipper å sende forespørsler tilbake til Altinn Autorisasjon for å autorisere forespørsler, men i stedet kan stole på informasjonen i dialogtokenet som er sendt inn av sluttbrukersystemet, noe som reduserer ventetiden og gir bedre ytelse.

{{<mermaid>}}
sequenceDiagram
autonumber
participant SBS as End-user system
participant DP as Dialogporten
participant AA as Altinn Authorization
participant TT as Service Provider
DP->>AA: Authorize request
AA->>DP: Return decision
DP->>SBS: Return dialog + dialogtoken
SBS->>TT: Perform action, supply dialogtoken
TT->>TT: Validate dialogtoken and action
TT->>SBS: Return response
{{</mermaid>}}
{{<center>}}_Diagram som viser den overordnede sluttbruker-systemflyten ved bruk av dialogtoken. Merk trinn 5, der tjenesteleverandøren autoriserer handlingen uten å måtte sende forespørsler til Altinn Autorisasjon, men i stedet gjenbruker informasjon fra beslutningen Dialogporten fikk i trinn 2_{{</center>}}

## Front channel embeds og skriv handlinger

Dialogtokenet er også det som muliggjør [front channel embeds](../../front-channel-embeds/) og [skrivehandlinger](../../write-actions/), som er punkt-til-punkt-interaksjoner mellom sluttbrukerens enhet eller system og tjenesteleverandørsystemene, og unngår behovet for mellommenn for å håndtere dataoverføringer.

## Sikkerhet og tillit
Dialogporten utsteder bearer tokens som JWT-er (JSON Web Tokens) signert ved hjelp av state-of-the-art kryptografistandarder. Det offentlige nøkkelmaterialet som brukes til å verifisere tokens utstedt av Dialogporten er publisert på en standard HTTPS-plassering, noe som muliggjør automatisk konfigurasjon ved hjelp av de fleste veletablerte kryptografiske applikasjonsbiblioteker.

**Les mer**
* [Teknisk referanse for dialogtoken](../../../reference/authorization/dialog-tokens/)

{{<children />}}
