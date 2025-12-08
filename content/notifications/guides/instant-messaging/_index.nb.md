---
title: Sende umiddelbare varsler
description: "Lær hvordan du sender umiddelbare varsler (instant messaging) via Altinn Varslinger API for tidskritiske meldinger som engangskoder (OTP), autentiseringsbekreftelser og andre varsler som ikke tåler forsinkelse."
linktitle: Umiddelbar varsling
tags: [umiddelbar varsling, instant messaging, OTP, SMS, e-post]
weight: 30
---

## Introduksjon

Denne veiledningen viser hvordan du sender umiddelbare varsler via Altinn Varslinger API. Umiddelbare varsler leveres med en gang til én enkelt mottaker og er spesielt egnet for tidskritiske meldinger som engangskoder (OTP).

{{% notice info %}}
Før du starter, sørg for at du har lest [forklaringen om umiddelbar varsling](/nb/notifications/explanation/instant-messaging/) for å forstå når og hvordan du bør bruke denne funksjonen.
{{% /notice %}}

## Forutsetninger

Før du kan sende umiddelbare varsler, må du ha:

1. **Maskinporten-klient** med scopet `altinn:serviceowner/notifications.create`
2. **Altinn-token** for autentisering mot API-et
3. **Mottakers kontaktinformasjon** (telefonnummer eller e-postadresse)

Se [veiledning for Maskinporten-integrasjon](/en/notifications/guides/#creating-a-new-maskinporten-client) for mer informasjon om oppsett.

## API-endepunkter

Altinn Varslinger tilbyr to endepunkter for umiddelbar varsling:

| Endepunkt | Beskrivelse |
|-----------|-------------|
| `POST /future/orders/instant/sms` | Send umiddelbar SMS-varsling |
| `POST /future/orders/instant/email` | Send umiddelbar e-postvarsling |

**Base URL:**
- **Test (TT02):** `https://platform.tt02.altinn.no/notifications/api/v1`
- **Produksjon:** `https://platform.altinn.no/notifications/api/v1`

## Sende umiddelbar SMS-varsling

### Request-struktur

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
Bruk en unik ID for hver nye sending. Hvis du sender samme forespørsel med samme `idempotencyId` flere ganger, vil kun den første sendingen gjennomføres. Påfølgende forespørsler vil returnere resultatet fra den første sendingen.
{{% /notice %}}

#### sendersReference (valgfri)
- **Type:** String
- **Beskrivelse:** Din egen referanse for denne sendingen. Brukes for logging og sporing.
- **Eksempel:** `"user-verification-12345"`

#### phoneNumber (påkrevd)
- **Type:** String
- **Beskrivelse:** Mottakerens telefonnummer i internasjonalt format.
- **Format:** `+[landskode][telefonnummer]`
- **Eksempel:** `"+4712345678"`

{{% notice warning %}}
Telefonnummeret må være i internasjonalt format med landkode. Norske nummer starter med +47.
{{% /notice %}}

#### timeToLiveInSeconds (påkrevd)
- **Type:** Integer
- **Beskrivelse:** Levetiden for meldingen i sekunder. Angir hvor lenge SMS-gatewayen skal prøve å levere meldingen.
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
    "idempotencyId": "otp-verification-user123-20240115103000",
    "sendersReference": "user-verification-123",
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

### Response

Ved vellykket sending får du en response med HTTP status `201 Created`:

```json
{
  "notificationOrderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "notification": {
    "shipmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "sendersReference": "user-verification-123"
  }
}
```

Hvis du sender samme forespørsel på nytt med samme `idempotencyId`, får du HTTP status `200 OK` med samme response-innhold.

### Feilhåndtering

Mulige feilkoder:

| Status | Feilkode | Beskrivelse | Løsning |
|--------|----------|-------------|---------||
| `400 Bad Request` | - | Ugyldig forespørsel (f.eks. manglende påkrevde felt) | Kontroller at alle påkrevde felt er med og har riktig format |
| `401 Unauthorized` | - | Manglende eller ugyldig token | Sørg for gyldig Altinn-token i Authorization-header |
| `403 Forbidden` | - | Mangler tilgang til API-et | Verifiser at Maskinporten-klienten har riktig scope |
| `422 Unprocessable Entity` | `NOT-00001` | Manglende kontaktinformasjon for mottaker(e) | Verifiser at telefonnummeret eller e-postadressen er gyldig og at mottakeren har registrert kontaktinformasjon i Altinn |
| `499 Client Closed Request` | `NOT-00002` | Forespørselen ble avbrutt - Klienten koblet fra eller kansellerte før serveren fullførte behandlingen | Sjekk nettverkstilkoblingen og sørg for tilstrekkelige timeout-innstillinger i HTTP-klienten |

## Sende umiddelbar e-postvarsling

### Request-struktur

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
- **Beskrivelse:** Mottakerens e-postadresse.
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
- **Beskrivelse:** Avsenders e-postadresse. Hvis ikke oppgitt, brukes standard avsenderadresse.
- **Eksempel:** `"noreply@altinn.no"`

#### contentType (valgfri)
- **Type:** String
- **Verdier:** `"Plain"` eller `"Html"`
- **Standard:** `"Plain"`
- **Beskrivelse:** Innholdstype for e-postens body.

### Eksempel: Send engangskode via e-post

```bash
curl -X POST "https://platform.tt02.altinn.no/notifications/api/v1/future/orders/instant/email" \
  -H "Authorization: Bearer {ALTINN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "idempotencyId": "otp-email-user123-20240115103000",
    "sendersReference": "user-verification-email-123",
    "recipientEmail": {
      "emailAddress": "bruker@example.com",
      "emailSettings": {
        "subject": "Din engangskode fra Altinn",
        "body": "Din engangskode er: 123456\n\nKoden utløper om 5 minutter.\n\nVennlig hilsen\nAltinn",
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
    "idempotencyId": "otp-html-email-user123-20240115103000",
    "sendersReference": "user-verification-html-email-123",
    "recipientEmail": {
      "emailAddress": "bruker@example.com",
      "emailSettings": {
        "subject": "Din engangskode fra Altinn",
        "body": "<html><body><h1>Din engangskode</h1><p>Din engangskode er: <strong>123456</strong></p><p>Koden utløper om 5 minutter.</p><p>Vennlig hilsen<br>Altinn</p></body></html>",
        "contentType": "Html"
      }
    }
  }'
```

### Response

Ved vellykket sending får du en response med HTTP status `201 Created`:

```json
{
  "notificationOrderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "notification": {
    "shipmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "sendersReference": "user-verification-email-123"
  }
}
```

## Best practices

### 1. Bruk unike idempotens-IDer

Generer en unik `idempotencyId` for hver ny sending. En god praksis er å inkludere:
- Brukeridentifikator
- Tidsstempel
- Type handling

**Eksempel:**
```plaintext
otp-verification-user12345-20240115103045
```

### 2. Håndter timeout

Umiddelbar varsling er synkron og kan ta noen sekunder. Sett en passende timeout i HTTP-klienten:
- **Anbefalt:** 10-15 sekunder
- **Minimum:** 5 sekunder

### 3. Implementer retry-logikk

Ved nettverksfeil eller timeout, kan du prøve på nytt med samme `idempotencyId`:
```plaintext
1. Første forsøk: Send forespørsel med idempotencyId
2. Hvis timeout eller nettverksfeil: Vent 2 sekunder
3. Prøv igjen med samme idempotencyId
4. Hvis fortsatt feil: Vis feilmelding til bruker
```

### 4. Valider telefonnummer

Før du sender SMS, valider at telefonnummeret:
- Er i internasjonalt format (`+[landskode][nummer]`)
- Er et gyldig mobilnummer (ikke fasttelefon)
- Tilhører landet du forventer

### 5. Sett riktig levetid for OTP

For engangskoder, sett `timeToLiveInSeconds` til samme verdi som kodens levetid:
- **Standard OTP:** 300 sekunder (5 minutter)
- **Kortvarig OTP:** 180 sekunder (3 minutter)
- **Langvarig OTP:** 600 sekunder (10 minutter)

### 6. Bruk tydelig melding

Skriv klare og konsise meldinger:
- Start med formålet: "Din engangskode er:"
- Inkluder koden tydelig
- Oppgi levetid: "Koden utløper om 5 minutter"
- Legg til avsender hvis relevant

**Eksempel på god SMS-melding:**
```plaintext
Din engangskode er: 123456. Koden utløper om 5 minutter. Ikke del denne koden med andre. Hilsen Altinn
```

### 7. Logg sendinger

Logg alle umiddelbare varsler i ditt system for:
- **Feilsøking:** Spor problemer med levering
- **Sikkerhet:** Oppdage misbruk (f.eks. mange OTP-forsøk)
- **Revisjon:** Dokumentere hvem som fikk hvilke meldinger

Logg minimum:
- Tidspunkt for sending
- Mottaker (anonymiser eller hash for personvern)
- Resultat (suksess/feil)
- Idempotens-ID

## Komplett eksempel: OTP-implementasjon

Her er et komplett eksempel på hvordan du kan implementere OTP-sending med umiddelbar varsling:

### Steg 1: Generer og lagre OTP

```javascript
// Pseudo-kode
function generateAndStoreOTP(userId, phoneNumber) {
  // Generer 6-sifret tilfeldig kode
  const otp = generateRandomCode(6);

  // Lagre i database med utløpstid
  database.save({
    userId: userId,
    otp: otp,
    expiresAt: now() + 5 * 60, // 5 minutter
    attempts: 0,
    phoneNumber: phoneNumber
  });

  return otp;
}
```

### Steg 2: Send OTP via umiddelbar varsling

```javascript
// Pseudo-kode
async function sendOTP(userId, phoneNumber) {
  // Generer OTP
  const otp = generateAndStoreOTP(userId, phoneNumber);

  // Generer unik idempotens-ID
  const idempotencyId = `otp-${userId}-${Date.now()}`;

  // Send umiddelbar SMS
  const response = await fetch(
    'https://platform.tt02.altinn.no/notifications/api/v1/future/orders/instant/sms',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${altinnToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idempotencyId: idempotencyId,
        sendersReference: `otp-${userId}`,
        recipientSms: {
          phoneNumber: phoneNumber,
          timeToLiveInSeconds: 300,
          smsSettings: {
            sender: 'Altinn',
            body: `Din engangskode er: ${otp}. Koden utløper om 5 minutter.`
          }
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to send OTP');
  }

  return response.json();
}
```

### Steg 3: Verifiser OTP

```javascript
// Pseudo-kode
function verifyOTP(userId, inputOTP) {
  // Hent lagret OTP
  const stored = database.get(userId);

  // Sjekk om OTP eksisterer
  if (!stored) {
    return { success: false, error: 'NO_OTP_FOUND' };
  }

  // Sjekk om OTP er utløpt
  if (now() > stored.expiresAt) {
    return { success: false, error: 'OTP_EXPIRED' };
  }

  // Sjekk for mange forsøk
  if (stored.attempts >= 3) {
    return { success: false, error: 'TOO_MANY_ATTEMPTS' };
  }

  // Øk forsøksteller
  database.incrementAttempts(userId);

  // Verifiser OTP
  if (stored.otp === inputOTP) {
    // Slett OTP etter vellykket verifisering
    database.delete(userId);
    return { success: true };
  }

  return { success: false, error: 'INVALID_OTP' };
}
```

## Testing

### Test i TT02-miljøet

For å teste SMS-varsling i TT02:

1. **Legg mobilnummer til tillatingsliste**
   - Send e-post til [tjenesteeier@altinn.no](mailto:tjenesteeier@altinn.no)
   - Be om at ditt mobilnummer legges til tillatingslisten for TT02

2. **Test med tillatt nummer**
   - Nummer på tillatingslisten mottar faktiske SMS-er
   - Nummer som ikke er på listen går til simulator (vises som suksess i API)

3. **Test e-post**
   - E-poster sendes normalt i TT02
   - Sjekk spam-mappe hvis du ikke mottar e-post

{{% notice info %}}
Det er en forsinkelse på opptil 10 minutter før endringer i kontaktinformasjon i KRR trer i kraft. Dette gjelder ikke umiddelbar varsling siden du oppgir kontaktinformasjon direkte.
{{% /notice %}}

## Neste steg

- Les mer om [umiddelbar varsling-konseptet](/nb/notifications/explanation/instant-messaging/)
- Utforsk [API-referansen](/nb/notifications/reference/api/) for fullstendig API-dokumentasjon
- Se [OpenAPI-spesifikasjonen](/nb/notifications/reference/openapi/) for detaljert teknisk dokumentasjon
