---
title: Send umiddelbare varsler
description: "Lær hvordan du sender umiddelbare varsler via Altinn Varslinger API for tidskritiske meldinger som engangskoder (OTP)."
linktitle: Umiddelbar varsling
tags: [umiddelbar varsling, OTP, SMS, e-post]
weight: 30
---

{{% notice info %}}
Før du begynner, sørg for at du har lest [forklaringen om umiddelbar varsling](/nb/notifications/explanation/instant-notifications/) for å forstå når og hvordan du bør bruke denne funksjonen.
{{% /notice %}}

## Forutsetninger

Før du kan sende umiddelbare varsler må du ha:

1. **Maskinporten-klient** med scopet `altinn:serviceowner/notifications.create`
   - Se [veiledningen for Maskinporten-integrasjon](/nb/notifications/guides/#opprette-en-ny-maskinporten-klient) for mer informasjon om oppsett.
2. **Altinn-token** for autentisering mot API-et
3. **Mottakers kontaktinformasjon** (telefonnummer eller e-postadresse)

## API-endepunkter

Altinn Varslinger tilbyr to endepunkter for umiddelbar varsling:

| Endepunkt | Beskrivelse |
|-----------|-------------|
| `POST /future/orders/instant/sms` | Send umiddelbar SMS-varsling |
| `POST /future/orders/instant/email` | Send umiddelbar e-postvarsling |

**Base URL:**
- **Test (TT02):** `https://platform.tt02.altinn.no/notifications/api/v1`
- **Produksjon:** `https://platform.altinn.no/notifications/api/v1`

## Send umiddelbar SMS-varsling

### Forespørselstruktur

For å sende en umiddelbar SMS må du gjøre en POST-forespørsel til `/future/orders/instant/sms` med følgende struktur:

```json
{
  "idempotencyId": "string",
  "sendersReference": "string (valgfri)",
  "recipientSms": {
    "phoneNumber": "string",
    "timeToLiveInSeconds": 300,
    "smsSettings": {
      "sender": "string (valgfri)",
      "body": "string"
    }
  }
}
```

### Felter

#### idempotencyId (påkrevd)
- **Type:** String
- **Beskrivelse:** Unik identifikator for denne sendingen. Brukes for å sikre at samme melding ikke sendes flere ganger ved gjentatte forespørsler.
- **Eksempel:** `"otp-123456-2024-01-15T10:30:00Z"`

{{% notice info %}}
Bruk en unik ID for hver ny sending. Hvis du sender samme forespørsel med samme `idempotencyId` flere ganger, vil kun første sending bli utført. Påfølgende forespørsler vil returnere resultatet fra første sending.
{{% /notice %}}

#### sendersReference (valgfri)
- **Type:** String
- **Beskrivelse:** Din egen referanse for denne sendingen. Brukes til logging og sporing.
- **Eksempel:** `"bruker-verifisering-12345"`

#### phoneNumber (påkrevd)
- **Type:** String
- **Beskrivelse:** Mottakers telefonnummer i internasjonalt format.
- **Format:** `+[landskode][telefonnummer]`
- **Eksempel:** `"+4712345678"`

{{% notice warning %}}
Telefonnummeret må være i internasjonalt format med landskode. Norske numre starter med +47.
{{% /notice %}}

#### timeToLiveInSeconds (påkrevd)
- **Type:** Integer
- **Beskrivelse:** Levetid for meldingen i sekunder. Angir hvor lenge SMS-gatewayen skal forsøke å levere meldingen.
- **Eksempel:** `300` (5 minutter)

#### sender (valgfri)
- **Type:** String
- **Beskrivelse:** Avsenderidentifikator som vises på mottakers telefon.
- **Eksempel:** `"Altinn"`

#### body (påkrevd)
- **Type:** String
- **Beskrivelse:** Innholdet i SMS-meldingen.
- **Begrensninger:** Se [SMS-segmentering](/nb/notifications/explanation/sms-segmentation/) for detaljer om tegnbegrensninger.

### Eksempel: Send engangskode via SMS

```bash
curl -X POST "https://platform.tt02.altinn.no/notifications/api/v1/future/orders/instant/sms" \
  -H "Authorization: Bearer {ALTINN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "idempotencyId": "otp-verifisering-bruker123-20240115103000",
    "sendersReference": "bruker-verifisering-123",
    "recipientSms": {
      "phoneNumber": "+4712345678",
      "timeToLiveInSeconds": 300,
      "smsSettings": {
        "sender": "Altinn",
        "body": "Din engangskode er: 123456. Koden utløper om 5 minutter."
      }
    }
  }'
```

### Respons

Ved vellykket sending får du en respons med HTTP-status `201 Created`:

```json
{
  "notificationOrderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "notification": {
    "shipmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "sendersReference": "bruker-verifisering-123"
  }
}
```

Hvis du sender samme forespørsel på nytt med samme `idempotencyId`, får du HTTP-status `200 OK` med samme responsinnhold, uten at SMS-en sendes på nytt.

### Feilhåndtering

Mulige feilkoder:

| Status | Feilkode | Beskrivelse | Løsning |
|--------|----------|-------------|---------|
| `400 Bad Request` | - | Ugyldig forespørsel (f.eks. manglende påkrevde felter) | Sjekk at alle påkrevde felter er inkludert og har riktig format |
| `401 Unauthorized` | - | Manglende eller ugyldig token | Sørg for gyldig Altinn-token i Authorization-header |
| `403 Forbidden` | - | Manglende tilgang til API-et | Verifiser at Maskinporten-klienten har riktig scope |
| `422 Unprocessable Entity` | `NOT-00001` | Manglende kontaktinformasjon for mottaker(e) | Verifiser at telefonnummeret eller e-postadressen er gyldig og at mottaker har registrert kontaktinformasjon i Altinn |
| `499 Client Closed Request` | `NOT-00002` | Forespørsel avbrutt - Klienten koblet fra eller avbrøt forespørselen | Sjekk nettverkstilkobling og sørg for tilstrekkelige timeout-innstillinger i HTTP-klienten din |

## Send umiddelbar e-postvarsling

### Forespørselstruktur

For å sende en umiddelbar e-post må du gjøre en POST-forespørsel til `/future/orders/instant/email` med følgende struktur:

```json
{
  "idempotencyId": "string",
  "sendersReference": "string (valgfri)",
  "recipientEmail": {
    "emailAddress": "string",
    "emailSettings": {
      "subject": "string",
      "body": "string",
      "senderEmailAddress": "string (valgfri)",
      "contentType": "Plain"
    }
  }
}
```

### Felter

#### emailAddress (påkrevd)
- **Type:** String
- **Beskrivelse:** Mottakers e-postadresse.
- **Eksempel:** `"bruker@example.com"`

#### subject (påkrevd)
- **Type:** String
- **Beskrivelse:** E-postens emnefelt.
- **Eksempel:** `"Din engangskode fra Altinn"`

#### body (påkrevd)
- **Type:** String
- **Beskrivelse:** Innholdet i e-posten.

#### senderEmailAddress (valgfri)
- **Type:** String
- **Beskrivelse:** Avsenders e-postadresse. Hvis ikke spesifisert, brukes standard avsenderadresse.
- **Eksempel:** `"noreply@altinn.no"`

#### contentType (valgfri)
- **Type:** String
- **Verdier:** `"Plain"` eller `"Html"`
- **Standard:** `"Plain"`
- **Beskrivelse:** Innholdstype for e-postens innhold.

### Eksempel: Send engangskode via e-post

```bash
curl -X POST "https://platform.tt02.altinn.no/notifications/api/v1/future/orders/instant/email" \
  -H "Authorization: Bearer {ALTINN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "idempotencyId": "otp-epost-bruker123-20240115103000",
    "sendersReference": "bruker-verifisering-epost-123",
    "recipientEmail": {
      "emailAddress": "bruker@example.com",
      "emailSettings": {
        "subject": "Din engangskode fra Altinn",
        "body": "Din engangskode er: 123456\n\nKoden utløper om 5 minutter.\n\nMed vennlig hilsen\nAltinn",
        "contentType": "Plain"
      }
    }
  }'
```

### Eksempel: Send HTML-formatert e-post

```bash
curl -X POST "https://platform.tt02.altinn.no/notifications/api/v1/future/orders/instant/email" \
  -H "Authorization: Bearer {ALTINN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "idempotencyId": "otp-html-epost-bruker123-20240115103000",
    "sendersReference": "bruker-verifisering-html-epost-123",
    "recipientEmail": {
      "emailAddress": "bruker@example.com",
      "emailSettings": {
        "subject": "Din engangskode fra Altinn",
        "body": "<html><body><h1>Din engangskode</h1><p>Din engangskode er: <strong>123456</strong></p><p>Koden utløper om 5 minutter.</p><p>Med vennlig hilsen<br>Altinn</p></body></html>",
        "contentType": "Html"
      }
    }
  }'
```

### Respons

Ved vellykket sending får du en respons med HTTP-status `201 Created`:

```json
{
  "notificationOrderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "notification": {
    "shipmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "sendersReference": "bruker-verifisering-epost-123"
  }
}
```

## Testing

### Test i TT02-miljø

For å teste SMS-varsler i TT02:

1. **Legg til mobilnummer i tillattliste**
   - Send e-post til [tjenesteeier@altinn.no](mailto:tjenesteeier@altinn.no)
   - Be om at mobilnummeret ditt blir lagt til tillattlisten for TT02

2. **Test med tillatt nummer**
   - Numre på tillattlisten mottar faktiske SMS-meldinger
   - Numre som ikke er på listen går til simulator (vises som suksess i API)

3. **Test e-post**
   - E-poster sendes normalt i TT02
   - Sjekk søppelpostmappen hvis du ikke mottar e-post

## Neste steg

- Utforsk [API-referansen](/nb/notifications/reference/api/) for å sette opp autentisering
- Se [OpenAPI-spesifikasjonen](/nb/notifications/reference/openapi/) for detaljert teknisk dokumentasjon
