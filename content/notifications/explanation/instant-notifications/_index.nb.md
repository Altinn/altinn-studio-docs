---
title: Umiddelbar varsling
description: "Umiddelbar varsling (instant notifications) er en funksjon i Altinn Varslinger som sender varsler øyeblikkelig til én enkelt mottaker. Dette er spesielt egnet for tidskritiske meldinger som engangskoder, varsler og andre situasjoner der forsinkelser ikke er akseptabelt."
linktitle: Umiddelbar varsling
tags: [umiddelbar varsling, instant notifications, OTP, engangskode]
weight: 50
---

## Hva er umiddelbar varsling?

Umiddelbar varsling er en spesialisert varslingstjeneste i Altinn Varslinger API som sender meldinger **øyeblikkelig** til **én enkelt mottaker** gitt en spesifikk e-postadresse eller telefonnummer.
I motsetning til vanlige varslingsordre som settes i kø før behandling, går umiddelbare varsler forbi køen og sendes direkte til SMS/e-post-tjenesten.

Denne funksjonaliteten er designet for brukstilfeller der **rask levering er kritisk**, og der du ikke har råd til forsinkelser som kan oppstå ved købasert behandling.

## Når bør du bruke umiddelbar varsling?

Umiddelbar varsling er spesielt godt egnet for følgende situasjoner:

### Engangskoder (OTP)

Det vanligste brukstilfellet for umiddelbar varsling er utsending av **engangskoder** (OTP - One-Time Password). Disse kodene:

- Må leveres **umiddelbart** for god brukeropplevelse
- Har kort **levetid** (time-to-live)
- Brukes for **autentisering** og **verifisering**
- Krever **rask levering** for å unngå at brukere må vente eller be om nye koder

**Eksempler på OTP-bruk:**
- Bekreftelse av mobilnummer eller e-postadresse
- To-faktor autentisering (2FA)
- Engangskoder for innlogging
- Verifisering av sensitiv informasjon

### Andre tidskritiske varsler

Umiddelbar varsling kan også brukes for andre typer tidskritiske meldinger:

- **Alarmer og kritiske varsler** som krever umiddelbar handling
- **Sanntidsmeldinger** i interaktive tjenester
- **Bekreftelser** som brukeren venter på i brukergrensesnittet
- **Statusoppdateringer** som må vises umiddelbart

## Forskjeller mellom umiddelbar varsling og vanlige varslingsordre

| Aspekt | Umiddelbar varsling | Vanlige varslingsordre |
|--------|----------------|------------------------|
| **Levering** | Ingen kø | Settes i kø |
| **Antall mottakere** | Én enkelt mottaker | Én eller flere mottakere |
| **Mottakerinformasjon** | Må oppgi konkret adresse (telefonnummer/e-post) | Støtter oppslag via KRR basert på fødselsnummer |
| **Brukstilfelle** | Tidskritiske varsler (f.eks. OTP) | Generelle varsler og masseutsendelser |
| **Varslingskanaler** | Enten SMS eller e-post | SMS, e-post, eller kombinasjoner |


### Mottakeroppsett

**Umiddelbar varsling:**
- Du må oppgi **eksakt kontaktinformasjon** (telefonnummer eller e-postadresse)
- **Ingen automatisk oppslag** i Kontakt- og Reservasjonsregisteret (KRR)
- **Ingen validering** av om mottaker er reservert mot digital kommunikasjon

**Vanlige varslingsordre:**
- Støtter oppslag basert på **fødselsnummer** eller **organisasjonsnummer**
- Henter automatisk kontaktinformasjon fra KRR
- Respekterer **reservasjoner** mot digital kommunikasjon

## Tekniske egenskaper

### Umiddelbar sending med asynkron statusoppfølging

Umiddelbar varsling fungerer som følger:

- API-kallet registrerer ordren og sender den umiddelbart til SMS/e-post-tjenesten
- API-et returnerer `201 Created` eller `200 OK` med sporingsinformasjon for ordre (`shipmentId` og `notificationOrderId`)
- Varslingen sendes til SMS/e-post-gatewayen umiddelbart (går forbi køen)
- Leveringsstatus må hentes asynkront via statusfeed (`/future/shipment/feed`) eller ved å polle `/future/shipment/:id`
- **Merk:** den opprinnelige `201 Created`-responsen bekrefter at ordren ble registrert og akseptert av gatewayen, ikke at leveringen lyktes

### Idempotens

Umiddelbar varsling støtter **idempotens** gjennom et obligatorisk `idempotencyId`-felt:

- Forhindrer at samme melding sendes flere ganger ved gjentatte forespørsler
- Nyttig ved nettverksproblemer eller timeout
- Samme `idempotencyId` vil returnere samme resultat uten å sende meldingen på nytt

### Levetid (Time-to-Live)

For **SMS-baserte umiddelbare varsler** må du oppgi et `timeToLiveInSeconds`-felt:

- Definerer hvor lenge SMS-gatewayen skal prøve å levere meldingen
- Viktig for OTP-brukstilfeller der koden utløper etter en viss tid
- Forhindrer at utgåtte meldinger leveres for sent

{{% notice info %}}
Levetiden gjelder for SMS-leverandørens forsøk på levering. Hvis mottakerens telefon er avslått eller uten dekning, vil leverandøren fortsette å prøve til levetiden utløper.
{{% /notice %}}

## Begrensninger og hensyn

### Kapasitet

Umiddelbar varsling er **ikke optimalisert for høy throughput**:

- Designet for **enkeltstående, tidskritiske meldinger**, ikke masseutsendelser
- Ment for varsler til enkeltmottakere som krever umiddelbar sending
- Ved høye volum eller masseutsendelser bør du bruke vanlige varslingsordre i stedet

### Sikkerhet og personvern

Når du bruker umiddelbar varsling må du være oppmerksom på:

- **Ingen KRR-validering** - du er ansvarlig for å ha gyldig samtykke til å kontakte mottakeren
- **Ingen reservasjonssjekk** - mottakere som er reservert mot digital kommunikasjon vil likevel motta meldingen

{{% notice warning %}}
Ved bruk av umiddelbar varsling har du selv ansvar for å sikre at du har rett til å kontakte mottakeren på den oppgitte adressen. Altinn utfører ingen validering mot KRR eller andre registre.
{{% /notice %}}

## Brukstilfelle: Sending av engangskode (OTP)

La oss se på et komplett scenario for hvordan umiddelbar varsling brukes for å sende en engangskode:

### Scenario

En bruker ønsker å bekrefte sitt mobilnummer i en tjeneste. Tjenesten må sende en 6-sifret engangskode som brukeren må oppgi innen 5 minutter.

### Krav

1. Koden må sendes **umiddelbart** når brukeren ber om det
2. Koden har en **levetid på 5 minutter** (300 sekunder)
3. Hvis brukeren ikke mottar koden, må de kunne **be om en ny kode**
4. Systemet må **forhindre duplikate sendinger** hvis brukeren klikker flere ganger

### Løsning med umiddelbar varsling

### Steg 1: Generer engangskode
```plaintext
Tjenesten genererer en tilfeldig 6-sifret kode: 123456
Lagrer koden i database med utløpstid (5 minutter fra nå)
```

### Steg 2: Send umiddelbar SMS
```plaintext
Kall til API-et for umiddelbar varsling via SMS med:
- Mottakers telefonnummer
- Melding: "Din engangskode er: 123456. Koden utløper om 5 minutter."
- Levetid: 300 sekunder
- Idempotens-ID: unik ID for denne sendingen
```

### Steg 3: Håndter resultat
```plaintext
Hvis suksess:
  - Vis melding til bruker: "Engangskode sendt til ditt mobilnummer"
  - La brukeren taste inn koden

Hvis feil:
  - Vis feilmelding og tilby ny forsøk
```

### Steg 4: Verifiser kode
```plaintext
Når bruker taster inn kode:
  - Valider mot lagret kode i database
  - Sjekk at koden ikke er utløpt
  - Marker koden som brukt
```


## Neste steg

- Les [veiledningen for umiddelbar varsling](/nb/notifications/guides/instant-notifications/) for å lære hvordan du implementerer umiddelbar varsling i din tjeneste
- Utforsk [OpenAPI-spesifikasjonen](/nb/notifications/reference/openapi/) for tekniske spesifikasjonsdetaljer
