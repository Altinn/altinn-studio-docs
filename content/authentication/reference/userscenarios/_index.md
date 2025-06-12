---

title: Brukerscenarier for systembruker
linktitle: Referansedokumentasjon
description: Oversikt over aktuelle brukerscenarier for systembruker
weight: 5
---------

## Generelle forutsetninger

Følgende forutsetninger gjelder for de fleste brukerscenariene:

### Systemleverandørens ansvar for tilgangskontroll

For å kunne rapportere eller hente data må systemleverandøren:

1. Ha full oversikt over hvilke rettigheter systembrukeren trenger (for eksempel tilgangspakker eller enkeltrettigheter for MVA-rapportering).
2. Konfigurere disse rettighetene i eget system slik at sluttkunden kan tildeles nødvendige rettigheter.
3. Hente informasjon om rettigheter fra tjenesteeier eller Altinn – tjenesteeiere bør kommunisere tydelig hvilke rettigheter som kreves.

---

## 1. Registrert regnskapsfører rapporterer data for klient

**Eksempel:** Rapportering av MVA.

### Forutsetninger

* Regnskapsfører er registrert i Enhetsregisteret for aktuell klient.
* Skatteetaten har inkludert MVA-rapportering i én eller flere tilgangspakker for regnskapsførere.
* Regnskapsfører har opprettet en systembruker i et system som støtter MVA-rapportering.

### Steg

1. **Legge til klient**

   * Regnskapsfører legger klienten til den aktuelle systembrukeren. Tilganger videredelegeres automatisk.
2. **Hente token**

   * Systemleverandør henter systembruker-token for den opprettede systembrukeren.
3. **Rapportere data**

   * Systemet kaller tjeneste-API med token for å sende MVA-rapport for klienten.
4. **Godkjenning og aksept**

   * Altinn Autorisasjon validerer tilgangen.
   * Tjeneste-API godtar rapporten og returnerer bekreftelse.

---

## 2. Uregistrert regnskapsfører rapporterer data for klient

**Scenario:** Klienten er ikke registrert som kunde hos regnskapsføreren i Enhetsregisteret.

### Forutsetninger

* Skatteetaten har inkludert MVA-rapportering i en tilgangspakke som kan delegeres fra virksomhet til regnskapsfører.
* Regnskapsfører har opprettet en systembruker med nødvendige tilgangspakker (dette kan være en annen bruker enn i scenario 1).

### Steg

1. **Forespørsel om delegering**

   * Regnskapsfører ber klienten om å delegere nødvendige tilgangspakker.
2. **Virksomhetsdelegering**

   * Klienten gjennomfører delegering av tilgang i Altinn til regnskapsføreren.
3. **Legge til klient**

   * Regnskapsfører legger klienten til den aktuelle systembrukeren. Tilganger videredelegeres.
4. **Hente token**

   * Systemleverandør henter systembruker-token for systembrukeren.
5. **Rapportere data**

   * Systemet kaller tjeneste-API med token for å sende MVA-rapport for klienten.
6. **Godkjenning og aksept**

   * Altinn Autorisasjon validerer tilgangen.
   * Tjeneste-API godtar rapporten og returnerer bekreftelse.

---

## 3. Rapportering av skjema for egen organisasjon

**Scenario:** Virksomhet rapporterer egne data.

### Forutsetninger

* Skatteetaten har inkludert MVA-rapportering i en tilgangspakke som kan tildeles systembruker for virksomheten.

### Steg

1. **Anskaffelse av system**

   * Virksomheten anskaffer system hos systemleverandør.
2. **Forespørsel om systembruker**

   * Systemleverandør sender forespørsel om opprettelse av systembruker med krav om nødvendige tilgangspakker for MVA.
3. **Opprettelse og delegering**

   * Virksomheten aksepterer forespørselen.
   * Systembruker opprettes og nødvendige tilgangspakker tildeles.
4. **Rapportering**

   * Virksomheten bruker programvare/system til å rapportere data.
5. **Hente token**

   * Systemleverandør henter systembruker-token fra Maskinporten.
   * Systemet kaller tjeneste-API med token for å sende MVA-rapport.
6. **Godkjenning og aksept**

   * Altinn Autorisasjon validerer tilgangen.
   * Tjeneste-API godtar rapporten og returnerer bekreftelse.
