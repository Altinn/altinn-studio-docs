---
title: Umiddelbar varsling
description: "Umiddelbar varsling (instant messaging) er en funksjon i Altinn Varslinger som leverer varsler øyeblikkelig til én enkelt mottaker. Dette er spesielt egnet for tidskritiske meldinger som engangskoder, varsler og andre situasjoner der forsinkelser ikke er akseptabelt."
linktitle: Umiddelbar varsling
tags: [umiddelbar varsling, instant messaging, OTP, engangskode]
weight: 50
---

## Hva er umiddelbar varsling?

Umiddelbar varsling er en spesialisert funksjon i Altinn Varslinger som leverer meldinger **straks** til **én bestemt mottaker**. I motsetning til vanlige varslingsordre som settes i kø og behandles asynkront, sendes umiddelbare varsler med en gang forespørselen mottas og behandles synkront.

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
| **Levering** | Synkron - sendes umiddelbart | Asynkron - settes i kø |
| **Antall mottakere** | Én enkelt mottaker | Én eller flere mottakere |
| **Mottakerinformasjon** | Må oppgi konkret adresse (telefonnummer/e-post) | Støtter oppslag via KRR basert på fødselsnummer |
| **Brukstilfelle** | Tidskritiske varsler (f.eks. OTP) | Generelle varsler og masseutsendelser |
| **API-respons** | Returnerer leveringsstatus umiddelbart | Returnerer ordre-ID for senere oppfølging |
| **Varslingskanaler** | SMS eller e-post | SMS, e-post, eller kombinasjoner |

### Detaljert sammenligning

#### Mottakeroppsett

**Umiddelbar varsling:**
- Du må oppgi **eksakt kontaktinformasjon** (telefonnummer eller e-postadresse)
- **Ingen automatisk oppslag** i Kontakt- og Reservasjonsregisteret (KRR)
- **Ingen validering** av om mottaker er reservert mot digital kommunikasjon

**Vanlige varslingsordre:**
- Støtter oppslag basert på **fødselsnummer** eller **organisasjonsnummer**
- Henter automatisk kontaktinformasjon fra KRR
- Respekterer **reservasjoner** mot digital kommunikasjon

#### Behandlingsflyt

**Umiddelbar varsling:**
1. API mottar forespørsel
2. Validerer innhold
3. Sender umiddelbart til SMS/e-post gateway
4. Returnerer resultat til klient

**Vanlige varslingsordre:**
1. API mottar forespørsel
2. Oppretter varslingsordre
3. Setter ordre i behandlingskø
4. Returnerer ordre-ID
5. Behandler ordre asynkront (inkludert KRR-oppslag)
6. Sender varsler basert på konfigurasjon

## Tekniske egenskaper

### Synkron behandling

Umiddelbar varsling behandles **synkront**, noe som betyr at:

- API-kallet venter til meldingen er sendt til leverandøren
- Du får **umiddelbar tilbakemelding** på om sendingen lyktes eller feilet
- **Høyere responstid** på API-kall sammenlignet med vanlige varslingsordre
- Ingen behov for å polle statusendepunkt for å sjekke leveringsstatus

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

- Designet for **enkeltstående meldinger**, ikke masseutsendelser
- Synkron behandling betyr at hver forespørsel tar lengre tid
- Ved høye volum bør du vurdere vanlige varslingsordre i stedet

### Kostnad

Umiddelbar varsling kan ha **andre kostnadsmål** enn vanlige varslingsordre:

- Synkron behandling krever mer ressurser
- Diskuter med Altinn om prismodell for ditt brukstilfelle

### Sikkerhet og personvern

Når du bruker umiddelbar varsling må du være oppmerksom på:

- **Ingen KRR-validering** - du er ansvarlig for å ha gyldig samtykke til å kontakte mottakeren
- **Ingen reservasjonssjekk** - mottakere som er reservert mot digital kommunikasjon vil likevel motta meldingen
- **Logging** - alle umiddelbare varsler logges for revisjonsformål

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

### Fordeler med umiddelbar varsling for OTP

1. **Øyeblikkelig levering** - brukeren får koden mens de venter
2. **Levetidskontroll** - koden sendes ikke hvis den allerede er utløpt
3. **Idempotens** - forhindrer duplikate sendinger ved gjentatte klikk
4. **Enkel implementasjon** - synkron API er enklere å implementere enn asynkron håndtering

## Neste steg

- Les [veiledningen for umiddelbar varsling](/nb/notifications/guides/instant-messaging/) for å lære hvordan du implementerer umiddelbar varsling i din tjeneste
- Se [API-referansen](/nb/notifications/reference/api/) for detaljert beskrivelse av endepunktene
- Utforsk [OpenAPI-spesifikasjonen](/nb/notifications/reference/openapi/) for fullstendig API-dokumentasjon
