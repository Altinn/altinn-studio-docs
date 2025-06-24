---
title: "Brukerscenarier for systembruker"
linktitle: "Brukerscenarioer"
description: "Oversikt over aktuelle brukerscenarier for systembruker"
weight: 5
---

## Begreper

Her er de viktigste begrepene for brukerscenarioene på denne siden.

### Systemleverandør

Leverandør av sluttbrukersystem tilgjengelig i markedet. Har tilgang til systemregisteret i Altinn for å registrere programvare med rettighetsbehov.

### Sluttbrukersystem

Programvare som vanligvis kjører i public cloud, men kan også kjøre lokalt med begrensninger. Se eksempel scenario.

Sluttbrukersystemet støtter prosesser for virksomheter og innbyggere, og kan implementere alt fra lakselusrapportering til MVA-rapportering.

Sluttbrukersystemet kan identifisere seg som systembruker knyttet til systemet. Hvilke rettigheter som kreves avhenger av hvilke prosesser som støttes.

### Systembruker

Virtuell bruker som systemleverandører kan få utstedt token for. Gir sluttbrukersystemet de rettighetene systembrukeren har.  
Denne brukertypen får kun tildelt rettigheter fra systemkunden.

### Systembruker for klientforhold

Virtuell bruker som systemleverandør kan få utstedt token for, og som brukes i klientforhold der systembrukeren får delegert rettigheter for én eller flere klienter.

### Systembruker-token

Token utstedt fra Maskinporten som identifiserer en systembruker. Inneholder også informasjon om sluttbrukersystemet og systemleverandøren.

### Systemkunde

Virksomhet som har anskaffet sluttbrukersystem fra systemleverandør. En systemkunde kan ha flere systemer for ulike behov.

En systemkunde kan være en virksomhet som rapporterer egne data, eller en virksomhet som tilbyr tjenester til andre – for eksempel regnskapsfører, revisor, forretningsfører eller andre rettighetsforhold mellom virksomheter opprettet i Altinn.

### Klient

Virksomhet som har avtale med tjenestetilbyder om støtte for virksomhetsprosesser. Dette kan være en klient av regnskapskontor, revisor eller forretningsfører.

Et annet ord med tilsvarende betydning er "kunde". Klient er et innarbeidet begrep i regnskaps- og revisorbransjen.  
I rapporteringsforhold vil klienten ofte være det som kalles "part".

### Klientadministrator

Ansatt hos systemkunden.  
Ansvarlig for å knytte sine klienter (kunder) til riktige systembrukere.

### Tilgangspakke

En samling rettigheter for offentlige tjenester. Pakken er definert i Altinn, og det er tjenesteeiere som velger å knytte rettigheter til en gitt pakke.  
Pakken har et navn/område som bør matche tjenestenes område.

---

## Generelle forutsetninger

Følgende forutsetninger gjelder for de fleste brukerscenariene:

1. **Systemleverandørens ansvar for tilgangskontroll**  
   - Ha full oversikt over hvilke rettigheter systembrukere trenger (f.eks. tilgangspakker eller enkeltrettigheter for MVA-rapportering).  
     Informasjon om rettigheter innhentes fra tjenesteeier eller via Altinn API. Tjenesteeier må kommunisere krav tydelig.  
   - Konfigurere disse rettighetene i systemregisteret slik at systembrukere kan tildeles nødvendige rettigheter per kunde.

---

## Tilgangskontroll i sluttbrukersystem

Ved bruk av systembruker vil offentlige tjenester ikke kjenne identiteten til personen bak programvaren som utløser utstedelse av systembruker-token og API-kall.

For å unngå misbruk er det viktig at systemleverandører har gode rutiner for autentisering og autorisering av brukere i sluttbrukersystemet, slik at kun autoriserte brukere får tilgang til systembruker-token.

Dette er særlig aktuelt for større virksomheter, som regnskapsbyråer med mange kunder og ansatte, hvor det er behov for å begrense tilgangen til data for ulike kunder.

---

## 1. Registrert regnskapsfører rapporterer data for klient

**Eksempel:** MVA-rapportering

### Forutsetninger

- Regnskapsfører er registrert i Enhetsregisteret for aktuell klient.
- Skatteetaten har [definert policy på applikasjon](/altinn-studio/reference/configuration/authorization/) slik at brukere med tilgangspakken MVA rapportering får tilgang.
- Sluttbrukersystemet er satt opp med nødvendige tilgangspakker for MVA-rapportering.
- Regnskapsfører har opprettet en *systembruker for klientforhold* knyttet til sluttbrukersystemet.

### Steg

1. **Legg til klient**  
   Klientadministrator hos regnskapsfører knytter regnskapskunden (klient) til systembrukeren. Tilgang for regnskapskunden delegeres automatisk til systembrukeren.
2. **Hent token**  
   Sluttbrukersystemet henter systembruker-token via Maskinporten.
3. **Send rapport**  
   Sluttbrukersystemet sender MVA-rapport via API med gyldig token.
4. **Validering og bekreftelse**  
   Altinn Autorisasjon sjekker tilgang. API returnerer bekreftelse.

**Støtte:** Utvikles som del av systembrukerleveranse 5.

---

## 2. Forretningsfører rapporterer data for oppgavegiver

**Eksempel:** [Rapportering for boligsameie](https://skatteetaten.github.io/api-dokumentasjon/api/innrapportering-boligsameie)

### Forutsetninger

- Forretningsfører er registrert i Enhetsregisteret for boligsameiet.
- Tilgangspakken **forretningsforer-eiendom** gir tilgang til tjenesten (definert av tjenesteeier).
- Systemleverandøren har registrert systemet i systemregisteret med nevnte tilgangspakke.

### Steg

1. Systemleverandør sender forespørsel om opprettelse av systembruker for klienter til forretningsfører (kunden). Tilgangspakken **forretningsforer-eiendom** legges inn som krav.
2. Forretningsfører godkjenner forespørselen.
3. Klientadministrator legger til boligsameiet som kunde/klient på systembrukeren. Tilgangspakken videredelegeres automatisk til systembrukeren.
4. Rapportering skjer via systemet.
5. Systembruker-token hentes fra Maskinporten.
6. Innsending skjer via API.
7. Tilgang verifiseres av Altinn PDP API.

**Støtte:** Utvikles som del av systembrukerleveranse 5.

---

## 3. Uregistrert regnskapsfører rapporterer data for klient

**Scenario:** Klienten er ikke registrert i Enhetsregisteret med regnskapsfører.

### Forutsetninger

- Klienten (regnskapsførerkunde) har avtale med regnskapsfører om regnskapstjenester.
- Regnskapsfører har kjøpt sluttbrukersystem og satt det opp.

### Steg

1. **Forespørsel om tilgang**  
   Regnskapsfører ber klienten delegere nødvendige rettigheter.
2. **Delegering**  
   Klienten delegerer via Altinn.
3. **Legg til klient**  
   Klientadministrator hos regnskapsfører knytter klient til systembrukeren. Tilgang videredelegeres til systembrukeren.
4. **Hent token**  
   Systembruker-token hentes fra Maskinporten.
5. **Rapportering**  
   Innsending skjer via API.
6. **Validering**  
   Altinn verifiserer tilgang og returnerer bekreftelse.

**Støtte:** Utvikles som del av systembrukerleveranse 6.

---

## 4. Virksomhet rapporterer egne data

**Scenario:** Virksomheten benytter systembruker for rapportering.

### Forutsetninger

- Systemet er satt opp med ressursen som definerer tjenesten.

### Steg

1. **Anskaffelse av system**  
   Virksomheten kjøper system fra leverandør.
2. **Forespørsel om systembruker**  
   Leverandør sender forespørsel om opprettelse av systembruker med nødvendige tilganger.
3. **Godkjenning**  
   Virksomheten godkjenner, og systembrukeren opprettes.
4. **Rapportering**  
   Systemet henter token og sender data via API.
5. **Validering**  
   API sjekker tilgang og returnerer bekreftelse.

**Støtte:** Oppsett med enkeltrettighet ble utviklet som del av systembrukerleveranse 2.  
Oppsett med tilgangspakker utvikles som del av systembrukerleveranse 4.

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
3. **Klientknytning**  
   Klientadministrator har knyttet klient til systembrukeren.
4. **Hent token**  
   Token hentes fra Maskinporten.
5. **Hent meldinger**  
   Meldinger hentes via API.
6. **Validering**  
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

**Scenario:** Egenutviklet løsning for innsending via formidlingstjeneste.

### Forutsetninger

1. Avtale med DigDir og tilgang til systemregisteret.
2. System registreres med nødvendige rettigheter.

### Steg

1. Forespørsel om systembruker sendes (til seg selv).
2. Forespørsel godkjennes.
3. Token hentes.
4. Systemet sender data via API.

---

## 8. Virksomhet har kjøpt inn SAP for lokal installasjon

**Scenario:** SAP-programvare installeres på virksomhetens egne servere, uten at SAP har kontroll.

### Forutsetninger

1. Virksomheten har avtale med Digdir for tilgang til systemregisteret.
2. Virksomheten har opprettet Maskinporten-klient.
3. Virksomheten registrerer systemet i registeret som representerer SAP-installasjonen, med nødvendige rettigheter.
4. Nøkkel for klient er installert og tilgjengelig på server.

### Steg

1. Forespørsel om opprettelse av systembruker sendes til egen virksomhet.
2. Forespørsel godkjennes og systembruker opprettes med riktige rettigheter.
3. Systemet kan nå opprette Maskinporten-token for systembrukeren og kalle nødvendige API.

**Merknad:** I slike scenarioer kan ikke systemleverandør dele eget sertifikat/nøkkelpar med systemkunde, da det kan medføre misbruk og tilgang til kundedata på tvers.

---

## NAV Scenario A (funksjonalitet ikke prioritert per nå)

**Eksempel:** Regnskapsfører bruker “Superavstemming” fra Kontrollen AS.

### Utfordringer

- NAV tilbyr ikke tilgangspakker med granularitet kun for A06/A07.
- Granulerte rettigheter for systembrukere eller klienter støttes ikke.

### Steg

1. Systemleverandør sender forespørsel om begrenset systembruker.
2. Regnskapsfører godkjenner.
3. Klienter legges til og tildeles kun A06/A07.
4. Rapportering skjer via systemet.
5. Token hentes og API kalles.
6. Autorisasjon via Altinn PDP.

---

## NAV Scenario B (funksjonalitet ikke prioritert per nå)

Tjenesteleverandør har kjøpt systemet Superavstemming fra Kontrollen AS.  
Superavstemming trenger nødvendige tilganger til å hente avstemmingsdata for a-melding (A06/A07) for de klientene systemet skal brukes for.  
Tjenesteleverandøren ønsker å sikre at Superavstemming ikke får rettigheter utover å hente avstemmingsdata for a-melding.  
Klienten har kun kjøpt tjenesten "avstemming av a-melding" og ønsker kun å delegere rettigheter for dette.  
(Her er det noen få spesifikke rettigheter som er nødvendig, trolig ikke en hel tilgangspakke, da tilgangspakker ofte er grovkornede.)

---

## NAV Scenario C (funksjonalitet ikke prioritert per nå)

Tjenesteleverandør har kjøpt systemet Superavstemming fra Kontrollen AS.  
Superavstemming trenger nødvendige tilganger til å hente avstemmingsdata for a-melding (A06/A07) for de aktuelle klientene.  
Tjenesteleverandøren ønsker å sikre at Superavstemming ikke får rettigheter utover det som er nødvendig.  
Klienten har kjøpt flere tjenester, men ønsker kun å delegere nødvendige rettigheter for de aktuelle tjenestene.  
(Her vil det være flere ulike rettigheter som er aktuelle, men det finnes ikke én passende tilgangspakke.)

---
