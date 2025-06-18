---
title: "Brukerscenarier for systembruker"
linktitle: "Brukerscenarioer"
description: "Oversikt over aktuelle brukerscenarier for systembruker"
weight: 5
---

## Begreper

Her er de viktigste begrepene for brukerscenarioene beskrevet på denne siden.

### Systemleverandør

Leverandør av sluttbrukersystem som er tilgjengelig i markedet. Har tilgang til systemregisteret i Altinn for å registrere programvare med rettighetsbehov. 

### Sluttbrukersystem

Programvare som i utgangspunktet kjører i public cloud. (Scenario for lokalt installert programvare er ikke i scope på denne oversikten.)

Sluttbrukersystemet understøtter prosesser for virksomheter og innbyggere og kan implementere støtte for alt fra lakselusrapportering til rapportering av MVA.

Sluttbrukersystemet har rett til å identifisere seg som systembrukere knyttet til systemet. Rettigheten som kreves vil avhenge av hvilke sluttbrukerprosesser som understøttes.

### Systembruker 

Virtuell bruker som systemleverandører kan få utstedt token for. Gir implisitt sluttbrukersystem rettighetene som systembrukeren har.  
Denne typen bruker får kun tildelt rettigheter fra systemkunden.

### Systembruker for klientforhold

Virtuell bruker som systemleverandør kan få utstedt token for. Denne typen systembruker brukes når den skal benyttes i klientforhold, hvor systembrukeren får delegert rettigheter for én til mange klienter.

### Systembruker-token

Token utstedt fra Maskinporten som identifiserer en systembruker. Inneholder også informasjon om sluttbrukersystemet og systemleverandøren.

### Systemkunde

Virksomhet som har anskaffet sluttbrukersystem fra systemleverandør. En systemkunde kan ha anskaffet flere systemer for forskjellige behov.

En systemkunde kan være en virksomhet som rapporterer egne data, eller en virksomhet som tilbyr tjenester til andre – f.eks. regnskapsfører, revisor, forretningsfører eller andre rettighetsforhold mellom virksomheter opprettet i Altinn.

### Klient

Virksomhet som har inngått avtale med tjenestetilbyder om støtte for virksomhetsprosesser. Dette kan være en klient av regnskapskontor, revisor, forretningsfører.

Et annet ord med tilsvarende betydning er "kunde". Klient er et innarbeidet begrep i regnskaps- og revisorbransjen.  
I rapporteringsforhold vil klienten ofte være det som kalles "part".

### Klientadministrator

Ansatt hos systemkunden.  
Ansvarlig for å knytte sine klienter (kunder) til riktige systembrukere.

### Tilgangspakke

En samling av rettigheter for offentlige tjenester. Pakken er definert i Altinn, og det er tjenesteeiere som velger å knytte rettigheter til en gitt pakke.  
Pakken har et navn/område som bør matche tjenestenes område.

---

## Generelle forutsetninger

Følgende forutsetninger gjelder for de fleste brukerscenariene:

1. **Systemleverandørens ansvar for tilgangskontroll**  
   - Ha full oversikt over hvilke rettigheter systembrukere trenger (f.eks. tilgangspakker eller enkeltrettigheter for MVA-rapportering).  
     Informasjon om rettigheter innhentes fra tjenesteeier eller eventuelt via Altinn API. Tjenesteeier må kommunisere krav tydelig.  
   - Konfigurere disse rettighetene i systemregisteret slik at systembrukere kan tildeles nødvendige rettigheter per kunde.

---

## Tilgangskontroll i sluttbrukersystem

Med systembruker vil offentlige tjenester ikke kjenne identiteten til personen som sitter bak programvaren og utfører handlinger som resulterer i utstedelse av systembruker-token og kall mot API. 

For å unngå misbruk av systembrukere er det viktig at systemleverandører har systemer for å autentisere og autorisere bruk av sluttbrukersystemet med de tilhørende systembruker-token man som systemleverandør har mulighet til å hente ut. 

Dette kan for eksempel være aktuelt i sammenheng med større virksomheter, som regnskapsbyråer med mange kunder og ansatte, hvor byrået ønsker å begrense tilgangen til data for de forskjellige kundene.

---

## 1. Registrert regnskapsfører rapporterer data for klient

**Eksempel:** MVA-rapportering

### Forutsetninger

- Regnskapsfører er registrert i Enhetsregisteret for aktuell klient.
- Skatteetaten har inkludert MVA-rapportering i en tilgangspakke for regnskapsførere.
- Systemet støtter innsending via tjeneste-API.
- Regnskapsfører har opprettet en *systembruker for klientforhold* knyttet til sluttbrukersystemet.

### Steg

1. **Legg til klient**  
   Klientadministrator hos regnskapsfører knytter sin regnskapskunde (klient) til systembrukeren. Tilgang for regnskapskunden delegeres automatisk til systembrukeren i denne prosessen.
2. **Hent token**  
   Sluttbrukersystemet henter systembruker-token via Maskinporten.
3. **Send rapport**  
   Sluttbrukersystemet sender MVA-rapport via API med gyldig token.
4. **Validering og bekreftelse**  
   Altinn Autorisasjon sjekker tilgang. API returnerer bekreftelse.

---

## 2. Forretningsfører rapporterer data for oppgavegiver

**Eksempel:** [Rapportering for boligsameie](https://www.skatteetaten.no/bedrift-og-organisasjon/rapportering-og-bransjer/tredjepartsopplysninger/eiendom-og-bolig/boligsameie/rettledning/)

### Forutsetninger

- Forretningsfører er registrert i Enhetsregisteret for borettslaget.
- Tilgangspakken **forretningsforer-eiendom** gir tilgang til tjenesten (definert av tjenesteeier).
- Systemleverandøren har registrert systemet i systemregisteret med nevnte tilgangspakke.

### Steg

1. Systemleverandør sender forespørsel om opprettelse av systembruker for klienter til forretningsfører (kunden til systemleverandøren). Tilgangspakken **forretningsforer-eiendom** legges inn som krav i forespørselen.
2. Forretningsfører godkjenner forespørselen. 
3. Klientadministrator legger til borettslaget som kunde/klient på systembrukeren. Tilgangspakken videredelegeres automatisk i denne prosessen til systembrukeren opprettet i steg 2.
4. Rapportering skjer via systemet.
5. Systembruker-token hentes fra Maskinporten.
6. Innsending skjer via API.
7. Tilgang verifiseres av Altinn PDP API.

---

## 3. Uregistrert regnskapsfører rapporterer data for klient

**Scenario:** Klienten er ikke registrert i Enhetsregisteret med regnskapsfører.

### Forutsetninger

- Klienten (regnskapsførerkunde) har inngått avtale med regnskapsfører om regnskapstjenester.
- Regnskapsfører har kjøpt sluttbrukersystem og har satt det opp.

### Steg

1. **Forespørsel om tilgang**  
   Regnskapsfører ber klienten delegere nødvendige rettigheter.
2. **Delegering**  
   Klienten delegerer via Altinn.
3. **Legg til klient**  
   Klientadministrator hos regnskapsfører knytter klient til systembrukeren. Tilgang videredelegeres til systembrukeren når dette utføres.
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
   Leverandør sender forespørsel om opprettelse av systembruker med nødvendige tilganger.
3. **Godkjenning**  
   Virksomheten godkjenner, og systembrukeren opprettes.
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

## NAV Scenario A (funksjonalitet ikke prioritert på nåværende tidspunkt)

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

## NAV Scenario B (funksjonalitet ikke prioritert på nåværende tidspunkt)

Tjenesteleverandør har kjøpt systemet Superavstemming fra leverandøren Kontrollen AS.  
Superavstemming trenger nødvendige tilganger til å hente avstemmingsdata for a-melding (A06/A07) for de av klientene til tjenesteleverandøren som systemet skal benyttes for.  
Tjenesteleverandøren ønsker å sikre at Superavstemming ikke får rettigheter utover å hente avstemmingsdata for a-melding.  
Klienten har kun kjøpt tjenesten "avstemming av a-melding" fra tjenestetilbyderen og ønsker kun å delegere rettigheter for dette.  
(Her vil det være noen få spesifikke rettigheter som er nødvendig, trolig ikke en hel tilgangspakke, ettersom tilgangspakker ser ut til å være litt mer grovkornede.)

---

## NAV Scenario C (funksjonalitet ikke prioritert på nåværende tidspunkt)

Tjenesteleverandør har kjøpt systemet Superavstemming fra leverandøren Kontrollen AS.  
Superavstemming trenger nødvendige tilganger til å hente avstemmingsdata for a-melding (A06/A07) for de av klientene til tjenesteleverandøren som systemet skal benyttes for.  
Tjenesteleverandøren ønsker å sikre at Superavstemming ikke får rettigheter utover å hente avstemmingsdata for a-melding.  
Klienten har kjøpt flere tjenester fra tjenestetilbyderen, men ønsker kun å delegere nødvendige rettigheter for de tjenestene som inngår i leveransen.  
(Her vil det være flere ulike rettigheter som er aktuelle, men det finnes ikke én passende tilgangspakke.)

---
