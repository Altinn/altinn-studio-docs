---
title: "Brukerscenarier for systembruker"
linktitle: "Referansedokumentasjon"
description: "Oversikt over aktuelle brukerscenarier for systembruker"
weight: 5
---

## Generelle forutsetninger

Følgende forutsetninger gjelder for de fleste brukerscenariene:

1. **Systemleverandørens ansvar for tilgangskontroll**
   1. Ha full oversikt over hvilke rettigheter systembrukere som knyttes til sitt system trenger (for eksempel tilgangspakker eller enkeltrettigheter for MVA-rapportering). Informasjon om nødvendige rettigheter hentes fra tjenesteeier eller potensielt API Altinn. Tjenesteeier må tydelig kommunisere krav til rettigheter.
   2. Sette disse rettighetene på eget system i systemregisteret slik at systembrukeren for hver enkelt systemkunde kan tildeles de nødvendige rettighetene. 

---

## 1. Registrert regnskapsfører rapporterer data for klient

**Eksempel:** Rapportering av MVA.

### Forutsetninger

- Regnskapsfører er registrert i Enhetsregisteret for aktuell klient.
- Skatteetaten har inkludert MVA-rapportering i én eller flere tilgangspakker for regnskapsførere.
- Regnskapsfører benytter et system som støtter MVA-rapportering.

### Steg

1. **Legge til klient**
   - Regnskapsfører legger til klienten på systembrukeren. Tilganger videredelegeres automatisk.
2. **Hente token**
   - Systemleverandør henter systembruker-token fra Maskinporten.
3. **Rapportere data**
   - Systemet sender MVA-rapport via tjeneste-API ved bruk av token.
4. **Godkjenning og bekreftelse**
   - Altinn Autorisasjon validerer tilgangen.
   - API-et godtar rapporten og returnerer bekreftelse.

---

## 2. Forretningsfører rapporterer inn data for oppgavegiver

**Eksempel:** [Innlevering av tredjepartsopplysninger for boligsameie](https://www.skatteetaten.no/bedrift-og-organisasjon/rapportering-og-bransjer/tredjepartsopplysninger/eiendom-og-bolig/boligsameie/rettledning/)

### Forutsetninger

- Forretningsfører (f.eks. OBOS) er registrert i Enhetsregisteret for boligsameiet (f.eks. Tertitten borettslag).
- Skatteetaten har definert tilgangspakken **forretningsforer-eiendom** med rettigheter til innsending.
- Systemleverandør (f.eks. Visma) har registrert et system i Systemregisteret som benytter denne tilgangspakken.

### Steg

1. Systemleverandør sender forespørsel til forretningsfører om opprettelse av systembruker.
2. Forretningsfører godkjenner forespørselen.
3. Forretningsfører legger til oppgavegiver (Tertitten) på systembrukeren. Tilgangspakken **forretningsforer-eiendom** videredelegeres når dette gjøres
4. Forretningsfører bruker systemet til å rapportere på vegne av Tertitten.
5. Systemleverandør henter systembruker-token fra Maskinporten.
6. Systemet poster data til rapporterings-API.
7. API-et verifiserer tilgang ved bruk av Altinn PDP API.

---

## 3. Uregistrert regnskapsfører rapporterer data for klient

**Scenario:** Klienten er ikke registrert som kunde hos regnskapsføreren i Enhetsregisteret, men sluttkunde har kjøpt regnskapstjenester hos regnskapsfører. 

### Forutsetninger

- MVA-rapportering ligger i en delegérbar tilgangspakke for regnskapsførere.
- Regnskapsfører har opprettet en systembruker med riktig tilgangkrav med tanke på slike kunder.

### Steg

1. **Forespørsel om delegering**
   - Regnskapsfører ber kunden om å delegere nødvendige tilgangspakke(r)
2. **Delegering i Altinn**
   - Kunden delegerer tilgang til regnskapsfører via Altinn.
3. **Legge til klient**
   - Regnskapsfører legger til klienten på systembrukeren. Tilgangen som ble gitt til regnskapsfører blir nå videredelegert til systembruker.
4. **Hente token**
   - Systemleverandør henter systembruker-token fra Maskinporten.
5. **Rapportere data**
   - Systemet sender MVA-rapport via tjeneste-API med token.
6. **Godkjenning og bekreftelse**
   - Altinn Autorisasjon validerer tilgangen.
   - API-et returnerer bekreftelse.

---

## 4. Virksomhet rapporterer egne data

**Scenario:** En virksomhet rapporterer egne data via systembruker.

### Forutsetninger

- MVA-rapportering er inkludert i en tilgangspakke som kan tildeles virksomhetens systembruker.

### Steg

1. **Anskaffelse av system**
   - Virksomheten anskaffer et egnet system hos en systemleverandør.
2. **Forespørsel om systembruker**
   - Systemleverandør sender forespørsel om systembruker med tilhørende tilgangspakker.
3. **Godkjenning og opprettelse**
   - Virksomheten godkjenner forespørselen og systembruker opprettes med nødvendige rettigheter.
4. **Rapportering**
   - Systemet henter systembruker-token og kaller API for innsending.
5. **Godkjenning og bekreftelse**
   - Tilgang valideres og API returnerer bekreftelse.

---

## 5. Registrert regnskapsfører henter meldinger via dialogportalen for klient

**Scenario:** Regnskapsfører henter meldinger sendt til klient via Dialogporten

### Forutsetninger

- Leserettighet til meldinger er inkludert i tilgangspakke for regnskapsførere.
- Regnskapsfører kjenner meldingstype.
- Systemleverandør har støtte for Altinn meldinger og nødvendige scope.

### Steg

1. **Forespørsel om systembruker**
   - Systemleverandør sender forespørsel med krav om meldingstilgang.
2. **Godkjenning**
   - Regnskapsfører/virksomhet godkjenner forespørselen.
3. **Hente token**
   - Systemleverandør henter systembruker-token fra Maskinporten.
4. **Hente meldinger**
   - Systemet kaller API for å hente meldinger.
5. **Validering og levering**
   - Altinn validerer tilgang og returnerer meldinger.

---

## 6. Virksomhet sender fil via formidlingstjeneste (brokerservice)

**Scenario:** Virksomheten skal sende tinglysning via Kartverkets formidlingstjeneste.

### Forutsetninger

- En systemleverandør tilbyr støtte for innsending.
- Kartverket har definert ressurs som gir tilgang til tinglysning.
- Systemleverandør har registrert sitt system og bedt virksomheten godkjenne systembruker.
- Virksomheten har godkjent opprettelsen.

### Steg

1. Bruker i virksomheten benytter system for å sende tinglysning.
2. Systemleverandør henter systembruker-token fra Maskinporten.
3. Systemet kaller broker-API med token.
4. Altinn validerer tilgang basert på rettigheter tildelt systembrukeren.

---

## NAV Scenario A: (støttes for øyeblikket ikke)

Regnskapsfører har kjøpt systemet Superavstemming fra leverandøren Kontrollen AS. 

Superavstemming trenger nødvendige tilganger til å hente avstemmingsdata for a-melding (A06/A07) for de av klientene til regnskapsfører som systemet skal benyttes for. 

Regnskapsfører ønsker å sikre at Superavstemming ikke får rettigheter utover å hente avstemmingsdata for a-melding.


### Forutsetninger
- NAV har registrert en tilgangspakke som bare dekker området som kreves for å hente avstemningsdata og denne pakken er en del av de pakkene som en ER registrert regnskapsfører automatisk mottar for sine kunder. **Dette er ikke tilfellet i dag da det er definert 3 og bare 3 pakker som tildeles regnskapsfører**
  eller
- Det er mulig å be om granulerte rettigheter ned på sub ressurs/action for en gitt systembruker. **For øyeblikket støttes dette ikke**
- Det er mulig å be om graunlerte rettigheter for klienter selv om tjenstetilbyder har fått tilgangene orignalt via tilgangspakker. **Dette støttes ikke og er relativt krevende å få til**

### Steg 
1. Kontrollen AS sender forespørsel om å opprette klientsystembruker hos regnskapsfører som bare inneholder leserettighet for a-melding.
2. Regnskapsfører aksepterer opprettelse av en slik systembruker da den ser at systembrukeren vil kun få tilgang til de rettigheten som kreves for avstemning.
3. Regnskapsfører legger til klienter på systembrukeren. I denne prosessen delegeres leserettighet for A-melding for hver enkelt klient. Regnskapsfører kan se hvilke rettigheter som delegers for hver kunde i dette skjermbildet.
4. Regnskapsfører bruker system for å avstemme på en gitt klient
5. System ber om systembrukertoken for systembrukeren
6. Systemet kaller API for å lese A-meldings data
7. API autoriserer tilgang mot Altinn PDP

---

## NAV Scenario B: (under arbeid)
Tjenesteleverandør har kjøpt systemet Superavstemming fra leverandøren Kontrollen AS. 
Superavstemming trenger nødvendige tilganger til å hente avstemmingsdata for a-melding (A06/A07) for de av klientene til tjenesteleverandøren som systemet skal benyttes for. 
Tjenesteleverandøren ønsker å sikre at Superavstemming ikke får rettigheter utover å hente avstemmingsdata for a-melding. 
Klienten har kun kjøpt tjenesten avstemming av a-melding fra tjenestetilbyderen og ønsker kun å delegere rettigheter for dette. 
(her vil det være noen få spesifike rettigheter som er nødvendig, trolig ikke en hel tilgangspakke etter som tilgangspakker ser ut til å være litt mer grovkornet)

---

## NAV Scenario C: (under arbeid)
Tjenesteleverandør har kjøpt systemet Superavstemming fra leverandøren Kontrollen AS. 
Superavstemming trenger nødvendige tilganger til å hente avstemmingsdata for a-melding (A06/A07) for de av klientene til tjenesteleverandøren som systemet skal benyttes for. 
Tjenesteleverandøren ønsker å sikre at Superavstemming ikke får rettigheter utover å hente avstemmingsdata for a-melding. 
Klienten har kjøpt flere tjenester fra tjenestetilbyderen men ønsker kun å delegere nødvendige rettigheter for de tjenestene som inngår i leveransen. 
(her vil det være flere ulike rettigheter som er aktuelle, men det finnes ikke èn passende tilgangspakke)

---