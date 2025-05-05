---
title: Standard Systembruker
linktitle: Standard Systembruker
description: Finn omfattende informasjon om hvordan du kommer i gang med standard Systembruker.
toc: false
weight: 3
---

## Standard Systembruker integrasjon prosess
La oss forstå bruken av standard systembruker med et eksempel. 

### Eksempel: Tilgang til API-et "Krav og betalinger"
Følgende er aktørene/tjenestene:
1. API-leverandær - Skatteetaten
2. Tjeneste/API/ressurs - Krav og betalinger
3. System leverandør - SmartCloud AS
4. System - SmartCloud
5. Sluttbruker - TILFELDIG SUBTIL APE

Følgende trinn er nødvendige for å etablere integrasjon mellom system og systembruker.
1. [Forberedelser fra API-leverandør (Skatteetaten)](../../../guides/serviceowner/)
2. [Forberedelser fra systemleverandøren (SmartCloud AS)](../../../guides/systemvendor/)
3. [Tiltak for sluttbruker (Pia, Dagligleder av TILFELDIG SUBTIL APE)](../../../guides/enduser/standard)

Når alle brukere har fullført sine forutsetninger for systemintegrasjonen, er systembrukeren nå klar til å brukes av tredjepartsystemer.

#### Operativ fase – Bruk av systembruker
   1. SmartCloud ber om tilgang
      - I den operative fasen, SmartCloud kontinuerlig ber om tilgang via Maskinporten for scope "skatteetaten:kravogbetalinger" og systembruker for TILFELDIG SUBTIL APE.
      - Maskinporten verifiserer med Altinn om systembrukeren og tilknyttet klient-ID er gyldige.
      - Maskinporten returnerer et token som inneholder alle nødvendige autentiserings- og autorisasjonsdetaljer for SmartCloud.
   2. Forespørsler til Skatteetatens API
      - SmartCloud bruker tokenet som et "ID-kort" for å autentisere sin forespørsel til Skatteetatens "Krav og betalinger" API.
   3. Autorisasjonskontroll av Skatteetaten
       - Skatteetaten verifiserer at systembrukeren er autorisert til å få tilgang til tjenesten "Krav og betalinger".
       - Når autorisasjonen er fullført, returnerer Skatteetaten de totale utestående skatte- og avgiftskravene for TILFELDIG SUBTIL APE.