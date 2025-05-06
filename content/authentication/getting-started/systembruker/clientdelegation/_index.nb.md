---
title: Klient Delegering
linktitle: Klient Delegering
toc: false
---

{{% notice warning %}}
🚧 This documentation is a work in progress.
{{% /notice %}}

## Klient Delegering
Klientdelegering er en funksjon som gir regnskapsførere og revisorer mulighet til å delegere roller for klientene til en systembruker i regnskaps-/revisjonsselskapet.
For å bruke denne funksjonen må brukeren være Klientadministrator for regnskaps-/revisjonsselskapet.

## Klientadministrator
Denne rollen forhåndstildeles følgende eksterne roller (i selskap registrert som regnskapsfører og revisor):

- Bestyrende reder
- Bostyrer
- Daglig leder
- Deltaker i ANS/DA (kun fødselsnummer)
- Innehaver
- Komplementar (kun fødselsnummer)
- Norsk representant for utenlandsk enhet
- Styrets leder
regnskapsførere/revisorer må etablere en integrasjon med en systembruker av typen **'agent'** for å kunne integrere med tredjepartsystemer på vegne av sine kunder.

## Agent Systembruker integrasjon process
La oss forstå bruken av agent systembruker med et eksempel.

### Eksempel: Tilgang til API-et "Krav og betalinger"
Følgende er aktørene/tjenestene:
1. API-leverandær - Skatteetaten
2. Tjeneste/API/ressurs - Krav og betalinger
3. System leverandør - SmartCloud AS
4. System - SamrtCloud
5. Sluttbruker - TILBAKEHOLDEN USYMMETRISK TIGER AS, regnskapsfører organisasjon

Følgende trinn er nødvendige for å etablere integrasjon mellom system og systembruker.
1. [Forberedelser fra API-leverandør (Skatteetaten)](../../../guides/serviceowner/)
2. [Forberedelser fra systemleverandøren (SmartCloud AS)](../../../guides/systemvendor/)
3. [Tiltak for sluttbruker (DRESs MINST, Klientadministrator for TILBAKEHOLDEN USYMMETRISK TIGER AS )](../../../guides/enduser/clientdelegation)

Når alle brukere har fullført sine forutsetninger for systemintegrasjonen, er agent systembrukeren nå klar til å brukes av tredjepartsystemer.

#### Operativ fase – Bruk av systembruker
   1. SamrtCloud ber om tilgang
- I den operative fasen, SamrtCloud kontinuerlig ber om tilgang via Maskinporten for scope "skatteetaten:kravogbetalinger" og systembruker for TILBAKEHOLDEN USYMMETRISK TIGER AS.
      - Maskinporten verifiserer med Altinn om systembrukeren og tilknyttet klient-ID er gyldige.
      - Maskinporten returnerer et token som inneholder alle nødvendige autentiserings- og autorisasjonsdetaljer for SamrtCloud.
   2. Forespørsler til Skatteetatens API
      - SamrtCloud bruker tokenet som et "ID-kort" for å autentisere sin forespørsel til Skatteetatens "Krav og betalinger" API.
   3. Autorisasjonskontroll av Skatteetaten
       - Skatteetaten verifiserer at systembrukeren er autorisert til å få tilgang til tjenesten "Krav og betalinger".
       - Når autorisasjonen er fullført, returnerer Skatteetaten de totale utestående skatte- og avgiftskravene for kunder av TILBAKEHOLDEN USYMMETRISK TIGER AS.
