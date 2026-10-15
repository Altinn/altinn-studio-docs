---
title: Varslingslogg API for sluttbrukere innlogget i portalen
linktitle: Varslingslogg
description: Overordnet beskrivelse av sluttbrukers API for henting av varslingsloggen til en dialog.
weight: 35
toc: true
---

Varseltjenesten tar vare på en assosiasjon mellom dialoger og varsel som blir registrert. Dette gjør det mulig å senere
hente ut igjen en liste over alle varslingsadressene som fikk varsel relatert til en dialog. Loggen 
inkluderer også enkelte feilede forsøk på å sende varsel slik at en bruker kan oppdage eventuelle feil ved for 
eksempel en epostkonto.

API'et benyttes av portalen på altinn.no når man åpner aktivitetsloggen til en dialog.

{{% notice warning %}}
Dette er per nå kun tilgjengelig for brukere logget inn med ID-porten. Det vil jobbes videre med å gjøre funksjonen
tilgjengelig for sluttbrukersystemer med systembrukerautentisering.
{{% /notice %}}

## Endepunkt

```http
GET /notifications/api/v1/future/enduser/log
```

## Spørringsparametrer

Søk i varslingsloggen krever en dialog id mens id på forsendelse er valgfritt.

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `dialogId` | string | Ja | Dialogporten-dialogidentifikator å filtrere etter |
| `transmissionId` | string | Nei | Dialogporten-forsendeleidentifikator å filtrere etter |


## Eksempler på forespørsler

### Søk med dialog id

```http
GET /notifications/api/v1/future/enduser/log?dialogId=550e8400-e29b-41d4-a716-446655440000
```

### Søk med både dialog og forsendelses identifikatorer

```http
GET /notifications/api/v1/future/enduser/log?dialogId=550e8400-e29b-41d4-a716-446655440000&transmissionId=550e8400-e29b-41d4-a716-446655440001
```

## Svar

Returnerer en matrise med loggoppføringer for varsler som stemmer med de angitte filtrene. Hvis det ikke finnes noen 
innslag som passer med kriteriene så returneres det en tom liste.

### Skjema for svar

```json
[
  {
    "notificationId": "550e8400-e29b-41d4-a716-446655440002",
    "dialogId": "550e8400-e29b-41d4-a716-446655440000",
    "transmissionId": "550e8400-e29b-41d4-a716-446655440001",
    "type": "Notification",
    "channel": "Email",
    "destination": "recipient@example.com",
    "status": "Delivered",
    "requestedSendTime": "2026-08-05T10:00:00Z",
    "lastUpdateTime": "2026-08-05T10:02:30Z"
  }
]
```

### Svarsfelter

| Felt | Type | Nullable | Beskrivelse |
|------|------|----------|-------------|
| `notificationId` | UUID | Nei | Unik identifikator for e-post- eller SMS-varselet som denne loggoppføringen er avledet fra |
| `dialogId` | string | Ja | Dialogporten-dialogidentifikator |
| `transmissionId` | string | Ja | Dialogporten-forsendeleidentifikator, eller null hvis det ikke er noen forsendelerelasjon |
| `type` | string | Nei | Varslingordningstype: `Notification` (standard), `Reminder` (påminnelse), `Instant` (øyeblikkelig sending), eller `Composed` (med vedlegg). Se [Komponert e-post](/nb/notifications/guides/composed-email/) og [Øyeblikkelige varsler](/nb/notifications/guides/instant-notifications/). |
| `channel` | string | Nei | Leveringskanal: `Email` eller `Sms` |
| `destination` | string | Nei | E-postadresse eller telefonnummer varselet ble sendt til |
| `status` | string | Nei | Status for leveringsresultat (se [statusverdi-referanse](/nb/notifications/reference/notification-status/)) |
| `requestedSendTime` | DateTime | Nei | UTC-tidsstempel når avsenderen ville at varselet skulle sendes |
| `lastUpdateTime` | DateTime | Nei | UTC-tidsstempel når leverandøren (e-post- eller SMS-tjeneste) rapporterte leveringsresultatet |

## Statuskoder

| Status | Betydning | Beskrivelse |
|--------|-----------|-------------|
| `200` | OK | Loggoppføringer som samsvarer med filteret ble hentet. Returnerer tom matrise hvis ingen oppføringer samsvarer. |
| `400` | Ugyldig forespørsel | En eller flere parametrer er ugyldige. DialogId er et obligatorisk felt og må være en gyldig UUID. |
| `401` | Uautorisert | Forespørselen mangler gyldige autentiseringslegitimasjon. |
| `403` | Forbudt | Anroperen er ikke autorisert til å få tilgang til varslinglogg for oppgitt dialog. |
| `499` | Forespørsel avsluttet | Klienten koblet fra eller avbrøt forespørselen. |

## Feilsvar

Når en valideringsfeil oppstår (manglende eller ugyldige spørringsparametrer), returnerer API-et en standard valideringsrespons:

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "dialogId": [
      "The value '01a0ae3d-df1d-790d-8343-sasdasdasd' is not valid for dialogId.",
      "A value for the 'dialogId' parameter or property was not provided."
    ]
  },
  "traceId": "00-057e1d5fdfa49d63834136fc4f5a47d9-039d9fc51942fcf4-01"
}
```

Når en forespørsel avbrytes av klienten (499), returnerer API-et en feil med kode `NOT-00002`:

```json
{
  "type": "https://altinn.no/problems/request-terminated",
  "title": "Request Terminated",
  "status": 499,
  "code": "NOT-00002",
  "detail": "The client disconnected or cancelled the request before the server could complete processing",
  "instance": "/notifications/api/v1/future/enduser/log",
  "traceId": "0HMVH5K9A0O5E:00000002"
}
```

For fullstendig feilkode-referanse, se [Feilkoder](/nb/notifications/reference/error-codes/).

## Eksempel: Komplett arbeidsflyt

### 1. Spørring etter dialog-ID

```bash
curl -X GET \
  'https://platform.altinn.no/notifications/api/v1/future/enduser/log?dialogId=550e8400-e29b-41d4-a716-446655440000' \
  -H 'Authorization: Bearer {altinn_token}'
```

**Svar:**

```json
[
  {
    "notificationId": "550e8400-e29b-41d4-a716-446655440002",
    "dialogId": "550e8400-e29b-41d4-a716-446655440000",
    "transmissionId": "550e8400-e29b-41d4-a716-446655440001",
    "type": "Notification",
    "channel": "Email",
    "destination": "john.doe@example.com",
    "status": "Delivered",
    "requestedSendTime": "2026-08-05T10:00:00Z",
    "lastUpdateTime": "2026-08-05T10:02:30Z"
  },
  {
    "notificationId": "550e8400-e29b-41d4-a716-446655440003",
    "dialogId": "550e8400-e29b-41d4-a716-446655440000",
    "transmissionId": "550e8400-e29b-41d4-a716-446655440001",
    "type": "Notification",
    "channel": "Sms",
    "destination": "+4798765432",
    "status": "Delivered",
    "requestedSendTime": "2026-08-05T10:00:00Z",
    "lastUpdateTime": "2026-08-05T10:01:15Z"
  },
  {
    "notificationId": "550e8400-e29b-41d4-a716-446655440002",
    "dialogId": "550e8400-e29b-41d4-a716-446655440000",
    "transmissionId": "550e8400-e29b-41d4-a716-446655440001",
    "type": "Notification",
    "channel": "Email",
    "destination": "jane.smith@example.com",
    "status": "Failed_Bounced",
    "requestedSendTime": "2026-08-05T10:00:00Z",
    "lastUpdateTime": "2026-08-05T11:14:32Z"
  }
]
```

### 2. Inspiser loggoppføring for feilsøking

Fra svaret ovenfor ser du:
- Første E-post ble levert (`Delivered`)
- SMS-en ble levert (`Delivered`)
- Andre e-post ble avvist av epostserver (`Failed_Bounced`)
- Alle varslene ble forespurt samtidig, men leveranseresultatene ble rapportert til ulike tider

### 3. Spørring med valideringsfeil

```bash
curl -X GET \
  'https://platform.altinn.no/notifications/api/v1/future/enduser/log?dialogId=01a0ae3d-df1d-790d-8343-sasdasdasd' \
  -H 'Authorization: Bearer {altinn_token}'
```

**Svar (400 Ugyldig forespørsel):**

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "dialogId": [
      "The value '01a0ae3d-df1d-790d-8343-sasdasdasd' is not valid for dialogId.",
      "A value for the 'dialogId' parameter or property was not provided."
    ]
  },
  "traceId": "00-057e1d5fdfa49d63834136fc4f5a47d9-039d9fc51942fcf4-01"
}
```

## Merknader og begrensninger

- Spørringsparametrer er case-sensitive og må samsvare nøyaktig med Dialogporten-identifikatorer.
- Whitespace-only-verdier for `dialogId` eller `transmissionId` behandles som manglende.

## Se også

- [Status Feed-referanse](/nb/notifications/reference/status-feed/) — Sekvensiell feed-API for polling
- [Statusverdi-referanse](/nb/notifications/reference/notification-status/) — Alle leveringsstatuser
- [Feilkoder-referanse](/nb/notifications/reference/error-codes/) — Feilkoder og feilsøking
- [API-oversikt](/nb/notifications/reference/api/) — Andre API-er
