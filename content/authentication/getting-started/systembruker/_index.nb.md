---
title: Kom i gang med Systembruker
linktitle: Systembruker
description: Her finner du informasjon om hvordan du kommer i gang med Systembruker
toc: false
weight: 3
---

{{<notice warning>}}
 Denne funksjonaliteten er i test og kan endres
{{</notice>}}

### Ta i bruk systembruker
La oss forstå bruk av systembruker via et eksempel.

### Eksempel: Tilgang til API-et 'Krav og betalinger' fra testmiljøet tt02
Følgende aktører/tjenester er involvert i bruk av systembruker
1. Tjenesteeier/Tjenestetilbyder/Ressurseier - Skatteetaten
2. tjeneste/API/Ressurs - Krav og betalinger
3. Systemleverandør/Systemtilbyder - SmartCloud AS
4. System - SmartCloud
5. Sluttbruker - TILFELDIG SUBTIL APE
6. Sluttbruker (For kunde administrasjon) - TILBAKEHOLDEN USYMMETRISK TIGER AS, regnskapsfirma

Følgende trinn bør utføres av ulike aktører for å etablere system- og systembrukerintegrasjon.
1. [Tjenesteeier (Skatteetaten)](../../guides/serviceowner/)
2. [Systemleverandør (SmartCloud AS)](../../guides/systemvendor/)
3. [Sluttbruker (STADIG KONSERT, Dagligleder for TILFELDIG SUBTIL APE)](../../guides/enduser/standard)
3. [Sluttbruker for klientdelegering (DRESs MINST, Client Administrator for TILBAKEHOLDEN USYMMETRISK TIGER AS)](../../guides/enduser/clientdelegation/)

Når alle brukere har fullført sine forutsetninger for systemintegrasjonen, er systembrukeren klar til å tas i bruk av tredjepartsystemene.

#### Driftsfase – Bruk av systembruker
1. SmartCloud ber om tilgang
   - I driftsfasen ber SmartCloud kontinuerlig om tilgang via Maskinporten for scopet «skatteetaten:kravogbetalinger» og systembrukeren til TILFELDIG SUBTIL APE.
   - Maskinporten verifiserer med Altinn om systembrukeren og tilhørende klient-ID er gyldige.
   - Maskinporten returnerer et token som inneholder all nødvendig autentiserings- og autorisasjonsinformasjon for SmartCloud.
2. Sende forespørsler til Skatteetatens API
   - SmartCloud bruker tokenet som et 'ID-kort' for å autentisere sin forespørsel til Skatteetatens API for «Krav og betalinger».
3. Autorisasjonssjekk av Skatteetaten
   - Skatteetaten verifiserer at systembrukeren er autorisert til å få tilgang til tjenesten «Krav og betalinger».
   - Når autorisasjonen er fullført, returnerer Skatteetaten de totale utestående skatte- og avgiftskravene for TILFELDIG SUBTIL APE.
