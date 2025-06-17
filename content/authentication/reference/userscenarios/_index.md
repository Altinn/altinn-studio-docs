---
title: "Brukerscenarier for systembruker"
linktitle: "Referansedokumentasjon"
description: "Oversikt over aktuelle brukerscenarier for systembruker"
weight: 5
---

## Generelle forutsetninger

Følgende forutsetninger gjelder for de fleste brukerscenariene:

1. **Systemleverandørens ansvar for tilgangskontroll**  
   - Ha full oversikt over hvilke rettigheter systembrukere trenger (f.eks. tilgangspakker eller enkeltrettigheter for MVA-rapportering).  
     Informasjon om rettigheter innhentes fra tjenesteeier eller eventuelt via Altinn API. Tjenesteeier må kommunisere krav tydelig.  
   - Konfigurere disse rettighetene i systemregisteret slik at systembrukere kan tildeles nødvendige rettigheter per kunde.

---

## 1. Registrert regnskapsfører rapporterer data for klient

**Eksempel:** MVA-rapportering

### Forutsetninger

- Regnskapsfører er registrert i Enhetsregisteret for aktuell klient.
- Skatteetaten har inkludert MVA-rapportering i en tilgangspakke for regnskapsførere.
- Systemet støtter innsending via tjeneste-API.

### Steg

1. **Legg til klient**  
   Regnskapsfører knytter klient til systembrukeren. Tilgang videredelegeres automatisk.
2. **Hent token**  
   Systemleverandør henter systembruker-token via Maskinporten.
3. **Send rapport**  
   Systemet sender MVA-rapport via API med gyldig token.
4. **Validering og bekreftelse**  
   Altinn Autorisasjon sjekker tilgang. API returnerer bekreftelse.

---

## 2. Forretningsfører rapporterer data for oppgavegiver

**Eksempel:** [Rapportering for boligsameie](https://www.skatteetaten.no/bedrift-og-organisasjon/rapportering-og-bransjer/tredjepartsopplysninger/eiendom-og-bolig/boligsameie/rettledning/)

### Forutsetninger

- Forretningsfører er registrert i Enhetsregisteret for borettslaget.
- Tilgangspakken **forretningsforer-eiendom** har gitt tilgang til tjenesten.
- Systemleverandøren har registrert systemet med relevant tilgang.

### Steg

1. Systemleverandør sender forespørsel om opprettelse av systembruker.
2. Forretningsfører godkjenner forespørselen.
3. Forretningsfører legger til borettslaget som klient. Tilgangspakke videredelegeres automatisk.
4. Rapportering skjer via systemet.
5. Systembruker-token hentes fra Maskinporten.
6. Innsending skjer via API.
7. Tilgang verifiseres av Altinn PDP API.

---

## 3. Uregistrert regnskapsfører rapporterer data for klient

**Scenario:** Klienten er ikke registrert i Enhetsregisteret med regnskapsfører.

### Forutsetninger

- Klient har kjøpt tjenester og delegerer manuelt nødvendige rettigheter.
- Regnskapsfører har satt opp systembruker med riktig tilgang.

### Steg

1. **Forespørsel om tilgang**  
   Regnskapsfører ber klienten delegere nødvendige rettigheter.
2. **Delegering**  
   Klienten delegerer via Altinn.
3. **Legg til klient**  
   Regnskapsfører knytter klient til systembrukeren. Tilgang videredelegeres.
4. **Hent token**  
   Systembruker-token hentes fra Maskinporten.
5. **Rapportering**  
   Innsending skjer via API.
6. **Validering**  
   Altinn verifiserer tilgang og returnerer bekreftelse.

---

## 4. Virksomhet rapporterer egne data

**Scenario:** Virksomheten benytter systembruker for rapportering.

### Forutsetninger

- Systemet er satt opp med tilgangspakken for aktuell rapportering (f.eks. MVA).

### Steg

1. **Anskaffelse av system**  
   Virksomheten kjøper system fra leverandør.
2. **Forespørsel om systembruker**  
   Leverandør sender forespørsel om nødvendige tilganger.
3. **Godkjenning**  
   Virksomheten godkjenner og systembrukeren opprettes.
4. **Rapportering**  
   Systemet henter token og sender data via API.
5. **Validering**  
   API sjekker tilgang og returnerer bekreftelse.

---

## 5. Regnskapsfører henter meldinger for klient via Dialogporten

**Scenario:** Systembruker henter meldinger sendt til klient.

### Forutsetninger

- Tilgang til meldinger er inkludert i tilgangspakken.
- Systemet støtter Dialogporten.

### Steg

1. **Forespørsel om systembruker**  
   Leverandør sender forespørsel med krav til meldingsscope.
2. **Godkjenning**  
   Regnskapsfører/virksomhet godkjenner forespørselen.
3. **Hent token**  
   Token hentes fra Maskinporten.
4. **Hent meldinger**  
   Meldinger hentes via API.
5. **Validering**  
   Altinn validerer og returnerer meldinger.

---

## 6. Virksomhet sender fil via formidlingstjeneste (broker)

**Scenario:** Innsending av tinglysning via Kartverkets formidlingstjeneste.

### Forutsetninger

- Kartverket har definert ressurs og tilgang.
- Systemleverandør har registrert systemet og fått godkjenning.

### Steg

1. Bruker sender tinglysning via systemet.
2. Token hentes fra Maskinporten.
3. API kalles med token.
4. Tilgang valideres av Altinn.

---

## 7. Virksomhet har utviklet eget rapporteringssystem

**Scenario:** Egetutviklet løsning for innsending via formidlingstjeneste.

### Forutsetninger

1. Avtale med DigDir og tilgang til systemregisteret.
2. System registreres med nødvendige rettigheter.
3. Forespørsel om systembruker sendes (til seg selv).
4. Forespørsel godkjennes.
5. Token hentes.
6. Systemet sender data via API.

---

## NAV Scenario A (støttes ikke per i dag)

**Eksempel:** Regnskapsfører bruker “Superavstemming” fra Kontrollen AS.

### Utfordringer

- NAV tilbyr ikke tilgangspakker med granularitet kun for A06/A07.
- Granulerte rettigheter for systembrukere eller klienter støttes ikke.

### Ønsket flyt

1. Systemleverandør sender forespørsel om begrenset systembruker.
2. Regnskapsfører godkjenner.
3. Klienter legges til og tildeles kun A06/A07.
4. Rapportering skjer via systemet.
5. Token hentes og API kalles.
6. Autorisasjon via Altinn PDP.

---

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