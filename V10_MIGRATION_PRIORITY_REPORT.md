# V10 Dokumentasjon: Veien videre

**Dato:** 16. desember 2025
**Formål:** Planlegge arbeidet med v10-dokumentasjon fra nyttår
**Målgruppe:** Produkteiere og team

---

## Sammendrag

V10 er en ny **versjon av dokumentasjonen** med bedre struktur og språk. Mye godt arbeid er allerede gjort med omstrukturering og språkvask. Denne rapporten anbefaler en strategisk tilnærming for resten av arbeidet.

**Situasjonen i dag:**
- Mye innhold er allerede flyttet og omstrukturert fra v8 til v10
- Design, tips og råd er godt i gang
- Signering, svaralternativer, betaling og prefill har innhold i v10
- Komponentoversikten er under arbeid (separalt prosjekt)
- Noe teknisk referansedokumentasjon mangler fortsatt

**Anbefaling:**
Ikke flytt alt fra v8. Behold v8 som arkiv, og bruk resten av ressursene på språkvask og kvalitetssikring av det som allerede er i v10.

---

## Hva vi har oppnådd så langt

### ✅ Fullførte områder (omstrukturert og språkvasket)

**Plan-a-Service**
- Tips og råd (design, klarspråk, tilgjengelighet)
- Designprinsipper og tone of voice
- Maler og retningslinjer

**Develop-a-Service**
- Signering (API-basert, brukerstyrt, rolle/tilgangspakke)
- Svaralternativer (kilder og funksjonalitet)
- Betaling (oppsett og konfigurasjon)
- Forhåndsutfylling (prefill)
- Multi-app-løsninger
- Underskjema

**Manage-a-Service**
- Overvåking og instrumentering (delvis)
- Tilgangsstyring

**This-is-AS**
- Forklaringer om sentrale konsepter

**Getting-started**
- Grunnleggende navigasjon og kom-i-gang

**Status:** ~260 filer flyttet og omstrukturert ✅

---

## Kritiske områder som fortsatt mangler i v10

Disse områdene er ikke godt dekket i v10 enda og bør vurderes for flytting:

### 🔴 PRIORITET 1: Teknisk referansedokumentasjon

**Område:** Komponentbibliotek
**Status:** Under separat arbeid med designteamet
**Handling:** Koordiner med designteam om fremdrift

**Område:** Datamodeller og datalagring
**Hva mangler:**
- Grundig dokumentasjon om hvordan lage datamodeller
- Hvordan data lagres og håndteres
- Vedleggshåndtering
- Koble til eksterne API-er

**Hvorfor viktig:** Grunnleggende for all apputvikling. Andre deler av dokumentasjonen henviser til dette.

**Område:** Konfigurasjon
**Hva kan mangle:**
- Autentisering og autorisasjon
- Prosessoppsett
- Meldingsboks-konfigurasjon
- Hendelser (events)
- Håndtering av hemmeligheter (secrets)

**Hvorfor viktig:** Utviklere slår ofte opp i konfigurasjonsdokumentasjon.

---

### 🟡 PRIORITET 2: Repository-struktur og arkitektur

**Område:** Teknisk arkitektur
**Hva kan mangle:**
- Hvordan en Altinn-app er bygget opp
- Mappestruktur og filorganisering
- ServiceModel, metadata, layouts
- Application-metadata

**Hvorfor viktig:** Nødvendig for å forstå hvordan apper fungerer teknisk.

---

### 🟢 PRIORITET 3: Utrulling og drift

**Område:** Deployment og testing
**Hva kan mangle:**
- Oppsett av kjøremiljø
- Ressursallokering
- Firewall-konfigurasjon
- Testing (lokale API-tester, debugging)

**Hvorfor nyttig:** Viktig for produksjonssetting av apper.

---

### 🔵 PRIORITET 4: Spesialiserte funksjoner

**Område:** Avanserte features
**Eksempler:**
- Dynamisk feltsynlighet
- Beskyttede data
- Lokal utvikling
- eFormidling
- Integrasjoner

**Status:** Vurder fra sak til sak om dette trengs i v10.

---

## Strategisk anbefaling: Ikke migrer alt

### Hvorfor ikke flytte alt fra v8?

**1. Massivt arbeid uten gevinst**
- ~490 gjenstående filer i v8
- Mange av disse er utdaterte, overlappende eller lite brukte
- Bedre å bruke tiden på kvalitetssikring av v10

**2. V8 fungerer som arkiv**
- Eksisterende brukere kan fortsatt bruke v8
- Alle lenker fungerer
- Ingen hastverk med å flytte alt

**3. La brukerbehov styre**
- Se hvilke v8-sider som faktisk besøkes
- Flytt bare det som trengs
- "Just-in-time" migrering

---

## Anbefalinger for veien videre

### Fase 1: Kvalitetssikring (januar-februar)

**Mål:** Godkjenne og kvalitetssikre eksisterende v10-innhold

**Konkrete oppgaver:**
1. ✅ Gå gjennom alt innhold i v10 som er merket `needsReview`
2. ✅ Godkjenne språkvasket innhold (klarspråk er allerede gjort)
3. ✅ Sjekk at lenker fungerer
4. ✅ Verifiser at eksempler er oppdaterte
5. ✅ Samarbeid med designteam om komponentoversikt

**Merk:** Språkvask er allerede gjort på alt migrert innhold. Fase 1 handler om godkjenning og kvalitetssikring.

**Estimat:** 3-5 uker med 1 person, eller 1.5-2.5 uker med 2 personer

---

### Fase 2: Fylle kritiske hull (februar-mars)

**Mål:** Legge til manglende kritisk referansedokumentasjon

**Konkrete oppgaver:**
1. ✅ Vurder hva som faktisk mangler i hver prioritet 1-kategori
2. ✅ Flytt/skriv dokumentasjon om datamodeller og lagring
3. ✅ Flytt/skriv viktigste konfigurasjonsdokumentasjon
4. ✅ Vurder repository-strukturdokumentasjon

**Tilnærming:**
- Ikke bare kopier fra v8 - vurder hva som faktisk trengs
- Skriv om/forbedre underveis
- Språkvask samtidig

**Estimat:** 3-5 uker med 1 person, eller 1.5-2.5 uker med 2 personer

---

### Fase 3: Oversettelse (mars-april)

**Mål:** Oversette godkjent norsk innhold til engelsk

**Konkrete oppgaver:**
1. ✅ Oversett alt godkjent norsk innhold
2. ✅ Bruk AI-assistanse + human review
3. ✅ Kvalitetssikring av oversettelser

**Estimat:** 4-6 uker med 1 person, eller 2-3 uker med 2 personer

---

### Fase 4: Just-in-time migrering (løpende)

**Mål:** Fylle på basert på faktisk behov

**Tilnærming:**
- Overvåk hvilke v8-sider som besøkes mest
- Når brukere spør om noe som bare finnes i v8, vurder å flytte det
- Hold en liste over "vurdert og valgt bort"
- Transparent om at v8 er arkiv for eldre innhold

---

## Tidsplan - samlet oversikt

| Fase | Innhold | Med 1 person | Med 2 personer |
|------|---------|--------------|----------------|
| **Fase 1** | Kvalitetssikring av v10 | 3-5 uker | 1.5-2.5 uker |
| **Fase 2** | Fylle kritiske hull | 3-5 uker | 1.5-2.5 uker |
| **Fase 3** | Oversettelse | 4-6 uker | 2-3 uker |
| **TOTALT** | | **10-16 uker** | **5-8 uker** |

**Med 2 personer: Ferdig i løpet av Q1 2026** 🚀

---

## Nøkkelvedtak for produkteiere

### Vedtak 1: Behold v8 som arkiv ✅

**Anbefaling:** La v8 være tilgjengelig som "eldre dokumentasjon"

**Begrunnelse:**
- Eksisterende brukere trenger fortsatt tilgang
- Ikke nødvendig å flytte alt
- Sparer betydelig arbeid

**Implementering:**
- Banner på v8: "Dette er eldre dokumentasjon. Se v10 for oppdatert informasjon."
- V10 som standard startside
- Alle v8-lenker fortsetter å fungere

---

### Vedtak 2: Fokus på kvalitet fremfor kvantitet ✅

**Anbefaling:** Bruk ressurser på kvalitetssikring, ikke masse-flytting

**Begrunnelse:**
- Bedre med god dokumentasjon på det viktigste
- Mindre vedlikehold fremover
- Bedre brukeropplevelse

**Implementering:**
- Gjennomgå og godkjenn eksisterende v10-innhold først
- Flytt bare det som faktisk mangler og trengs
- Skriv om/forbedre underveis

---

### Vedtak 3: La brukerbehov styre prioritering ✅

**Anbefaling:** Bruk analytics og bruker-feedback til å prioritere

**Begrunnelse:**
- Effektiv ressursbruk
- Dokumentasjon som faktisk brukes
- Fleksibel tilnærming

**Implementering:**
- Sett opp analytics på dokumentasjonen hvis ikke allerede gjort
- Overvåk hvilke v8-sider som besøkes
- Hold en "vurdert og valgt bort"-liste
- Transparent kommunikasjon om strategi

---

## Risiko og avbøtende tiltak

### Risiko 1: Brukere finner ikke det de trenger

**Avbøtende tiltak:**
- God søkefunksjon i v10
- Tydelige lenker fra v10 til v8 når relevant
- Banner på v8 som forklarer situasjonen

### Risiko 2: Dobbelt vedlikehold (v8 + v10)

**Avbøtende tiltak:**
- V8 er arkiv - ikke aktiv vedlikehold
- Alt nytt innhold kun i v10
- Tydelig kommunikasjon til bidragsytere

### Risiko 3: Viktig innhold blir oversett

**Avbøtende tiltak:**
- Systematisk gjennomgang av prioritet 1-områder
- Involver fagpersoner i vurderingen
- Hold løpende dialog med brukere

---

## Konkrete neste steg fra nyttår

### Uke 1-2 (januar 2026)

**Oppgave 1:** Planleggingsmøte med teamet
- Gå gjennom denne rapporten
- Bli enige om strategi og prioriteringer
- Fordel ansvar

**Oppgave 2:** Kartlegg prioritet 1-områder
- Gå systematisk gjennom hver prioritet 1-kategori
- Identifiser konkret hva som mangler
- Lag prioritert liste

**Oppgave 3:** Sett opp trackingsystem
- Lag en todo-liste eller Kanban-board
- Merk filer med status (godkjent, under review, mangler)
- Etabler arbeidsflyt

### Uke 3-10 (januar-mars 2026)

**Hovedfokus:** Kvalitetssikring + fylle kritiske hull
- Systematisk gjennomgang av v10-innhold
- Språkvask underveis
- Flytte/skrive manglende referansedokumentasjon

### Fra uke 11 (mars-april 2026)

**Hovedfokus:** Oversettelse
- Alt godkjent norsk innhold oversettes
- Kvalitetssikring av oversettelser
- Forberede lansering av v10 som primærversjon

---

## Konklusjon

**Situasjonen:**
Dere har gjort mye godt arbeid med omstrukturering og språkvask av v10. Mye av kjerneinnholdet er på plass, men noe teknisk referansedokumentasjon mangler fortsatt.

**Anbefalingen:**
Ikke bruk tid på å flytte alt fra v8. Behold v8 som arkiv, og fokuser ressursene på:
1. Kvalitetssikre eksisterende v10-innhold
2. Fylle kritiske hull i teknisk referansedokumentasjon
3. Oversette til engelsk

**Gevinsten:**
- ✅ Bedre dokumentasjon (kvalitet over kvantitet)
- ✅ Raskere ferdig (10-16 uker vs. 24+ uker)
- ✅ Enklere vedlikehold fremover
- ✅ Mer effektiv ressursbruk
- ✅ Språkvask allerede gjort på eksisterende innhold

**Målet:**
Lansere v10 som primær dokumentasjon i løpet av Q1 2026, med v8 som arkiv for eldre innhold.

---

**Rapport utarbeidet av:** Claude Code
**Dato:** 16. desember 2025
**Versjon:** 2.0 (Revidert for produkteiere)
