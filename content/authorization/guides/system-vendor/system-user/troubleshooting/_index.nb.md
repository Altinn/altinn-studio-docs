---
title: Feilsøking for Systembruker
linktitle: Feilsøking
description: Hvordan feilsøke vanlige problemer med Systembruker-integrasjonen.
toc: true
---

## Introduksjon

Denne guiden er ment for leverandører og utviklere for å diagnostisere og løse vanlige problemer knyttet til Systembruker-integrasjonen i Altinn. Mange feil stammer fra konfigurasjonsproblemer eller avvik i data mellom leverandørens system og informasjonen som er registrert i Altinn.

Finn din spesifikke feilkode i listen nedenfor for å gå til en detaljert feilsøkingsside.

## Vanlige feilkoder

*   [**`invalid_altinn_customer_configuration (MP-303)`**](errors/mp-303-error/): Oppstår når det er et konfigurasjonsproblem i Altinns Systemregister/systembruker-forespørselen for den angitte systembrukeren, ofte relatert til Maskinporten-autentisering.

## Vanlige problemer og løsninger

### 403 Forbidden ved registrering av system

**Symptom:** `POST /authentication/api/v1/systemregister/vendor` returnerer `403 Forbidden`.

**Vanlige årsaker:**

- Tokenet som brukes mangler scopet `altinn:authentication/systemregister.write`. Kontroller at Maskinporten-klienten din er tildelt dette scopet, og at du inkluderer det i tokenforespørselen.
- Organisasjonsnummeret i tokenet stemmer ikke overens med `vendor.ID` i JSON-nyttelasten. Nummeret i `id`-feltet og `vendor.ID` må samsvare med org.nr. til systemleverandøren som er autentisert i Maskinporten.
- Du prøver å registrere systemet i produksjon, men organisasjonsnummeret er ikke registrert der. For å registrere et system i TT02 med et ekte organisasjonsnummer, ta kontakt med <servicedesk@altinn.no>.

---

### Tom liste fra Dialogporten (ingen dialoger returneres)

**Symptom:** Kall mot Dialogporten returnerer en tom liste, selv om du forventer dialoger.

**Årsak:** Systembrukeren har ikke fått delegert de nødvendige tilgangspakkene for de tjenestene du forventer dialoger fra.

**Løsning:** Se veiledningen [Systembruker og Dialogporten-API-et](../dialogporten/) for en fullstendig gjennomgang av hvilke tilganger systembrukeren trenger.

---

### 400 Bad Request fra Dialogporten

**Symptom:** Kall mot Dialogporten returnerer HTTP 400 med en feiltype som peker til RFC 7231 section 6.5.3.

**Vanlige årsaker:**

- Maskinporten-tokenet mangler påkrevd scope for Dialogporten. Kontroller at du bruker riktig scope. Se [veiledningen for søk etter dialoger](https://docs.altinn.studio/nb/dialogporten/user-guides/searching-for-dialogs/) for hvilke scopes som kreves.
- Systembrukeren er en klient-systembruker (agent-systembruker), og du prøver å hente dialoger med klientens org.nr. i `systemuser_org`. Husk at `systemuser_org.ID` alltid skal være organisasjonsnummeret til **virksomheten som eier systembrukeren** (f.eks. regnskapsførerens org.nr.), ikke klientens org.nr.

---

### Sluttbruker blir ikke sendt tilbake til callback-URL etter godkjenning

**Symptom:** Etter at en systembrukerforespørsel er godkjent, blir ikke brukeren sendt til `redirectUrl`.

**Forklaring:** `redirectUrl` i systembrukerforespørselen er knyttet til flyten der sluttbrukeren følger `confirmUrl`-lenken og godkjenner forespørselen i samme nettleserøkt. Omdirigeringen skjer i nettleseren til den som godkjenner.

Hvis en **annen person** (f.eks. en leder med tilgangsstyrerrolle) godkjenner forespørselen på vegne av virksomheten, er det denne personens nettleserøkt som mottar omdirigeringen — ikke systemet eller personen som sendte forespørselen opprinnelig.

**Anbefalt løsning:** Bruk statusendepunktet til å sjekke om forespørselen er godkjent, i stedet for å basere flyten utelukkende på callback-URL-en. Se [Status på forespørsler](../systemuserrequest/#status-på-forespørsler) og [Hente systembruker via spørring](../byquery/).

---

### Systembruker opprettes ikke i PROD etter godkjenning i TT02

**Symptom:** Systembrukeroppsettet fungerer i TT02, men systemet er ikke registrert i produksjon.

**Årsak:** Systemregisteret i TT02 og produksjon er separate. Du må registrere systemet på nytt i produksjonsmiljøet.

- TT02: `https://platform.tt02.altinn.no/authentication/api/v1/systemregister/vendor`
- Produksjon: `https://platform.altinn.no/authentication/api/v1/systemregister/vendor`