---
title: Instant-meldinger
description: "Altinn Varslinger tilbyr dedikerte endepunkter for å sende SMS og e-post umiddelbart til én mottaker. Denne siden forklarer hvordan instant-meldinger fungerer, hvilke felter som må med i forespørselen, og hvordan du følger opp levering."
linktitle: Instant-meldinger
tags: [instant, sms, e-post, otp]
weight: 50
---

## Introduksjon

Instant-meldinger i Altinn Varslinger er laget for situasjoner der du må sende en melding med en gang, uten kø eller forsinkelse. Funksjonen leverer SMS eller e-post til én mottaker, og krever at avsenderen oppgir alle nødvendige kontaktopplysninger. Den brukes blant annet til engangskoder (OTP), varsling av sikkerhetshendelser og andre tidssensitive utsendelser.

Instant-endepunktene er separate fra de vanlige ordre-endepunktene. Du må derfor velge dem eksplisitt i integrasjonen din.

## Når passer instant-meldinger

- Engangskoder eller passord som utløper etter kort tid
- Utsendelser som skal gå uavhengig av ordinære utsendelseskøer
- Situasjoner der du allerede har verifisert kontaktopplysninger for mottakeren
- Varsler som ikke skal påvirke reservasjonsstatus eller kanalpreferanser i Kontakt- og reservasjonsregisteret

{{% notice warning %}}
Instant-meldinger støtter kun én mottaker per bestilling. Bruk de ordinære ordre-endepunktene når du skal varsle flere mottakere samtidig.
{{% /notice %}}

## Arkitektur og endepunkter

| Endepunkt | Beskrivelse |
|-----------|-------------|
| `POST /future/orders/instant/sms` | Send én SMS umiddelbart til en mottaker. |
| `POST /future/orders/instant/email` | Send én e-post umiddelbart til en mottaker. |
| `POST /future/orders/instant` | Tidligere generelt endepunkt for instant-SMS. Er merket som foreldet og beholdes kun for bakoverkompatibilitet. |
| `GET /future/shipment/{shipmentId}` | Hent leveringsmanifest og status for bestillingen. |

### Viktige egenskaper

- **Idempotens**: Feltet `idempotencyId` sørger for at samme forespørsel ikke registreres to ganger. Gjenbruk samme verdi hvis klienten må prøve igjen.
- **Tidsstyring**: For SMS må du alltid angi `timeToLiveInSeconds`. Systemet avslutter forsøket når tiden er utløpt og markerer statusen som `SMS_Failed_TTL` hvis meldingen ikke ble levert i tide.
- **Egen kontaktdata**: Instant-endepunktene hopper over oppslag i Kontakt- og reservasjonsregisteret. Du må derfor lagre og validere mottakerens kontaktinformasjon selv.
- **Asynkront svar**: Responsen inneholder `shipmentId` som du bruker for å hente status senere. Selve sendingen skjer i bakgrunnen.

## Send en SMS med en gang

### Eksempel på forespørsel

```http
POST https://platform.altinn.no/notifications/api/v1/future/orders/instant/sms
Content-Type: application/json
Authorization: Bearer <token>

{
  "idempotencyId": "94e9d0f6-7a3d-4a20-b5a7-445fb207f9bb",
  "sendersReference": "otp-login-2024-09-30-1234",
  "recipientSms": {
    "phoneNumber": "<telefonnummer i E.164-format>",
    "timeToLiveInSeconds": 120,
    "smsSettings": {
      "sender": "Altinn",
      "body": "Engangskoden din er 428516. Den er gyldig i 2 minutter."
    }
  }
}
```

- `idempotencyId`: En unik verdi per melding. Serveren returnerer `200 OK` med samme `shipmentId` hvis du sender samme ID på nytt.
- `sendersReference`: Valgfri nøkkel du kan bruke i egne logger.
- `phoneNumber`: Må være i internasjonalt format med landkode.
- `timeToLiveInSeconds`: Hvor lenge systemet skal forsøke å levere meldingen. Velg en verdi som matcher levetiden til engangskoden.
- `smsSettings.sender`: Vises som avsendernavn når meldingen leveres. Bruk kun godkjente avsendernavn.
- `smsSettings.body`: SMS-teksten. Hold den kort og unngå personopplysninger.

{{% notice info %}}
Velg et `timeToLiveInSeconds` som er langt nok til at mottakeren rekker å bruke koden, men kort nok til å hindre misbruk. Vanlige verdier for OTP er 60–300 sekunder.
{{% /notice %}}

### Respons

En vellykket bestilling gir `201 Created` med følgende nyttelast:

```json
{
  "notificationOrderId": "caa7f1c0-9d7b-4e56-8d3f-5350f4eb932f",
  "notification": {
    "shipmentId": "2d4f1359-4c38-48a7-9a5c-c7b036f53f51",
    "sendersReference": "otp-login-2024-09-30-1234"
  }
}
```

- `notificationOrderId` peker på ordre-kjeden i Altinn.
- `shipmentId` er identifikatoren du bruker for å hente status.

Hvis du gjenbruker `idempotencyId`, returnerer tjenesten `200 OK` med samme innhold.

## Send en e-post med en gang

### Eksempel på forespørsel

```http
POST https://platform.altinn.no/notifications/api/v1/future/orders/instant/email
Content-Type: application/json
Authorization: Bearer <token>

{
  "idempotencyId": "8f2a6a61-073b-4a52-9f42-52e9972af974",
  "sendersReference": "otp-email-2024-09-30-1234",
  "recipientEmail": {
    "emailAddress": "<e-postadresse>",
    "emailSettings": {
      "subject": "Engangskode for pålogging",
      "body": "<p>Engangskoden din er <strong>428516</strong>. Den er gyldig i 2 minutter.</p>",
      "senderEmailAddress": "<avsenderadresse>",
      "contentType": "Html"
    }
  }
}
```

- `emailAddress`: Må være en gyldig e-postadresse som du har lov til å bruke.
- `emailSettings.subject`: Korte, beskrivende emnelinjer gir høyere leveringsgrad.
- `emailSettings.body`: Kan være `Plain` tekst eller `Html`. Husk å inkludere tekstversjon hvis du sender HTML i produksjon.
- `senderEmailAddress`: Valgfritt hvis organisasjonen har konfigurert avsendere i Altinn Varslinger. Bruk adresser som er godkjent for løsningen din.

### Respons

Strukturen er den samme som for SMS og inneholder `notificationOrderId` og `shipmentId`.

## Hente leveringsstatus

Bruk `shipmentId` for å hente status for meldingen:

```http
GET https://platform.altinn.no/notifications/api/v1/future/shipment/2d4f1359-4c38-48a7-9a5c-c7b036f53f51
Authorization: Bearer <token>
```

Eksempel på svar:

```json
{
  "shipmentId": "2d4f1359-4c38-48a7-9a5c-c7b036f53f51",
  "status": "SMS_Delivered",
  "lastUpdate": "2024-09-30T08:25:14Z",
  "recipients": [
    {
      "destination": "<telefonnummer i E.164-format>",
      "status": "SMS_Delivered",
      "lastUpdate": "2024-09-30T08:25:13Z"
    }
  ]
}
```

### Tolk statusverdier

- `SMS_Delivered` / `Email_Delivered`: Meldingen ble bekreftet levert av kanal-leverandøren.
- `SMS_Failed_TTL`: Tidsvinduet gikk ut før meldingen ble levert. Vurder om koden skal regenereres.
- `SMS_Failed_InvalidRecipient` eller `Email_Failed_InvalidFormat`: Kontaktinformasjonen er ugyldig. Varsle brukeren og hent nye detaljer.
- `Email_Failed_Bounced` eller `Email_Failed_FilteredSpam`: Leverandøren avviste meldingen. Følg opp manuelt ved behov.

## Beste praksis for OTP

1. Generer nye koder hver gang og logg kun referanser, ikke selve koden.
2. Sett `timeToLiveInSeconds` lik levetiden for koden og informer mottakeren i meldingen.
3. Bruk korte tekster uten ekstra informasjon som kan avsløre sikkerhetsdetaljer.
4. Overvåk status-feeder for `Failed`-verdier og bygg inn automatikk for å tilby ny kode.
5. Sørg for at klienten din gjenbruker `idempotencyId` ved nettverksfeil, slik at brukeren ikke mottar duplikater.

## Begrensninger du må kjenne til

- Kun én mottaker per bestilling.
- Ingen vedlegg eller rike formater utover enkel HTML i e-post.
- Du må alltid oppgi kontaktdata; endepunktet gjør ikke oppslag mot KRR.
- Tjenesten validerer ikke reservasjonsstatus i offentlige registre.
- SMS må ha `timeToLiveInSeconds` satt til en positiv verdi.
- Du må ha gyldig tilgangstoken med korrekt scope for Altinn Varslinger.
