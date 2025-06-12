---
title: "Brukerscenarier for systembruker"
linktitle: "Referansedokumentasjon"
description: "Oversikt over aktuelle brukerscenarier for systembruker"
weight: 5
---------

## Generelle forutsetninger

Følgende forutsetninger gjelder for de fleste brukerscenariene:

1. **Systemleverandørens ansvar for tilgangskontroll**

   1. Ha full oversikt over hvilke rettigheter systembrukeren trenger (f.eks. tilgangspakker eller enkeltrettigheter for MVA‑rapportering).
   2. Konfigurere disse rettighetene i eget system slik at sluttkunden kan tildeles nødvendige rettigheter.
   3. Hente informasjon om rettigheter fra tjenesteeier eller Altinn; tjenesteeiere må tydelig kommunisere krav til rettigheter.

---

## 1. Registrert regnskapsfører rapporterer data for klient

**Eksempel:** Rapportering av MVA.

### Forutsetninger

* Regnskapsfører er registrert i Enhetsregisteret for aktuell klient.
* Skatteetaten har inkludert MVA‑rapportering i én eller flere tilgangspakker for regnskapsførere.
* Regnskapsfører har opprettet en systembruker i et system som støtter MVA‑rapportering.

### Steg

1. **Legge til klient**

   * Regnskapsfører legger til klienten på den aktuelle systembrukeren. Tilganger videredelegeres automatisk.
2. **Hente token**

   * Systemleverandør henter systembruker‑token fra Maskinporten.
3. **Rapportere data**

   * Systemet kaller tjeneste‑API med token for å sende MVA‑rapport for klienten.
4. **Godkjenning og bekreftelse**

   * Altinn Autorisasjon validerer tilgangen.
   * Tjeneste‑API godtar rapporten og returnerer en bekreftelse.

---

## 2. Uregistrert regnskapsfører rapporterer data for klient

**Scenario:** Klienten er ikke registrert som kunde hos regnskapsføreren i Enhetsregisteret.

### Forutsetninger

* Skatteetaten har lagt MVA‑rapportering i en delegérbar tilgangspakke for regnskapsfører.
* Regnskapsfører har opprettet en systembruker med nødvendige tilgangspakker (kan være en annen bruker enn i scenario 1).

### Steg

1. **Forespørsel om delegering**

   * Regnskapsfører ber kunden om å delegere nødvendige tilgangspakker.
2. **Delegering i Altinn**

   * Kunden gjennomfører delegering til regnskapsfører via Altinn.
3. **Legge til klient**

   * Regnskapsfører legger til klienten på systembrukeren. Tilganger videredelegeres.
4. **Hente token**

   * Systemleverandør henter systembruker‑token fra Maskinporten.
5. **Rapportere data**

   * Systemet kaller tjeneste‑API med token for å sende MVA‑rapport.
6. **Godkjenning og bekreftelse**

   * Altinn Autorisasjon validerer tilgangen.
   * Tjeneste‑API godtar rapporten og returnerer en bekreftelse.

---

## 3. Virksomhet rapporterer egne data

**Scenario:** Virksomhet rapporterer egne data via systembruker.

### Forutsetninger

* Skatteetaten har inkludert MVA‑rapportering i en tilgangspakke som kan tildeles systembruker for virksomheten.

### Steg

1. **Anskaffelse av system**

   * Virksomheten anskaffer relevant rapporteringssystem hos systemleverandør.
2. **Forespørsel om systembruker**

   * Systemleverandør sender forespørsel om opprettelse av systembruker med krav om nødvendige tilgangspakker.
3. **Godkjenning og opprettelse**

   * Virksomheten godkjenner forespørselen.
   * Systembrukeren opprettes, og nødvendige tilgangspakker tildeles.
4. **Rapportering**

   * Systemet henter systembruker‑token fra Maskinporten og kaller tjeneste‑API for å sende MVA‑rapport.
5. **Godkjenning og bekreftelse**

   * Altinn Autorisasjon validerer tilgangen.
   * Tjeneste‑API godtar rapporten og returnerer en bekreftelse.

---

## 4. Registrert regnskapsfører henter meldinger via dialogportalen for klient

**Scenario:** Regnskapsfører henter meldinger sendt til klient via Altinn Dialogportalen.

### Forutsetninger

* Tjenesteeier har knyttet leserettighet for melding til én eller flere tilgangspakker for regnskapsførere.
* Regnskapsfører vet hvilke meldinger som skal hentes.
* Systemleverandør har definert meldingstjeneste i sitt system med krav til tilgangspakker for regnskapsførere.

### Steg

1. **Forespørsel om systembruker**

   * Systemleverandør sender forespørsel om opprettelse av systembruker med krav om meldingstilgang.
2. **Godkjenning**

   * Virksomheten/regnskapsfører godkjenner forespørselen.
3. **Hente token**

   * Systemleverandør henter systembruker‑token fra Maskinporten.
4. **Hente meldinger**

   * Systemet kaller dialogportalen-API med token for å hente meldinger for klienten.
5. **Validering og levering**

   * Altinn Autorisasjon validerer tilgangen.
   * Dialogportalen returnerer meldingene.

---

*Dokumentet gir en strukturert oversikt over typiske arbeidsflyter når systembruker benyttes til rapportering og meldingstjenester i Altinn.*
