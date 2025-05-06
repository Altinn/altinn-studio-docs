---
title: Kom i gang med Systembruker
linktitle: Systembruker
description: Her finner informasjon om hvordan komme i gang med Systembruker
toc: false
weight: 3
---
## Oversikt
Denne veiledningen hjelper deg i gang med integrasjonsprosessen for systembruker.

## Systembruker
En systembruker er en ny type bruker i Altinn som gjør det mulig for en virksomhet å gi autorisasjoner til en upersonlig bruker, slik at den kan utføre oppgaver på vegne av virksomheten.
Brukeren fungerer tett sammen med Maskinporten, og muliggjør tilgangsstyring gjennom både Maskinporten og Altinn Autorisasjon. Med systembrukeren blir autorisasjonsprosessen mer effektiv, og sikrer at systemleverandøren kun får de nødvendige tilgangene.
I fremtiden vil systembrukeren være essensiell for virksomheter som ønsker å automatisere rapportering og administrative oppgaver overfor offentlig sektor.
Det finnes to typer systembrukere:
1. Standard
2. Agent

### Standard
En standard systembruker er en brukertype for virksomheter som ønsker å få tilgang til tjenester levert av offentlige eller private aktører gjennom tredjepartsystemer.

### Agent
En fullmektig systembruker er en brukertype ment for virksomheter som integrerer med tredjepartsystemer på vegne av sine kunder.

### Ta i bruk systembruker
La oss forstå bruk av systembruker via et eksempel.

### Eksempel: Tilgang til API-et 'Krav og betalinger
Følgende aktører/tjenester er involvert i bruk av systembruker
1. Tjenesteeier/Tjenestetilbyder/Ressurseier - Skatteetaten
2. tjeneste/API/Ressurs - Krav og betalinger
3. Systemleverandør/Systemtilbyder - SmartCloud AS
4. System - SmartCloud
5. Sluttbruker - TILFELDIG SUBTIL APE (fra tt02 miljø)
6. Sluttbruker(For kunde administrasjon) - TILBAKEHOLDEN USYMMETRISK TIGER AS, regnskapsfirma (fra tt02 miljø)

Følgende trinn bør utføres av ulike aktører for å etablere system- og systembrukerintegrasjon.
1. [Forberedelse av tjenesteeier (Skatteetaten)](../../guides/serviceowner/)
2. [Tiltak fra systemleverandør (SmartCloud AS)](../../guides/systemvendor/)
3. [Tiltak fra sluttbruker (STADIG KONSERT, Dagligleder for TILFELDIG SUBTIL APE)](../../guides/enduser/standard)

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
       - Når autorisasjonen er fullført, returnerer Skatteetaten de totale utestående skatte- og avgiftskravene for TILFELDIG SUBTIL APE..
