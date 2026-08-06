---
title: API-endepunkt for varslinglogg
linktitle: Varslinglogg
description: Referanse for API-endepunktet for henting av varslinglogg i Altinn Notifications
weight: 35
toc: true
---

Varslinglogg-API-et gir deg et endepunkt for å hente historiske loggoppføringer for varsler som er sendt gjennom Altinn Notifications. Dette lar deg revidere, feilsøke og spore leveringsresultatet ved å spørre med Dialogporten-identifikatorer.

## Endepunkt

```http
GET /notifications/api/v1/future/log
```

## Spørringsparametrer

Minst en av følgende spørringsparametrer må oppgis og være ikke-tom (kun whitespace-verdier blir avvist):

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `dialogId` | string | Nei* | Dialogporten-dialogidentifikator å filtrere etter |
| `transmissionId` | string | Nei* | Dialogporten-overføringsidentifikator å filtrere etter |

*Minst en parameter må oppgis og være ikke-tom.

## Eksempler på forespørsler

### Spørring etter dialog-ID

```http
GET /notifications/api/v1/future/log?dialogId=550e8400-e29b-41d4-a716-446655440000
```

### Spørring etter overførings-ID

```http
GET /notifications/api/v1/future/log?transmissionId=550e8400-e29b-41d4-a716-446655440001
```

### Spørring etter begge identifikatorer

```http
GET /notifications/api/v1/future/log?dialogId=550e8400-e29b-41d4-a716-446655440000&transmissionId=550e8400-e29b-41d4-a716-446655440001
```

## Svar

Returnerer en matrise med loggoppføringer for varsler som stemmer med de angitte filtrene. En tom matrise returneres hvis ingen oppføringer samsvarer.

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
    "status": "Email_Delivered",
    "requestedSendTime": "2026-08-05T10:00:00Z",
    "lastUpdateTime": "2026-08-05T10:02:30Z"
  }
]
```

### Svarsfelter

| Felt | Type | Nullable | Beskrivelse |
|------|------|----------|-------------|
| `notificationId` | UUID | Nei | Unik identifikator for e-post- eller SMS-varselet som denne loggoppføringen er avledet fra |
| `dialogId` | string | Ja | Dialogporten-dialogidentifikator, eller null hvis ingen dialogtilknytning |
| `transmissionId` | string | Ja | Dialogporten-overføringsidentifikator, eller null hvis ingen overføringstilknytning |
| `type` | string | Nei | Varslingordningstype: `Notification` (standard), `Reminder` (påminnelse), `Instant` (øyeblikkelig sending), eller `Composed` (med vedlegg). Se [Komponert e-post](/nb/notifications/guides/composed-email/) og [Øyeblikkelige varsler](/nb/notifications/guides/instant-notifications/). |
| `channel` | string | Nei | Leveringskanal: `Email` eller `Sms` |
| `destination` | string | Nei | E-postadresse eller telefonnummer varselet ble sendt til |
| `status` | string | Nei | Status for leveringsresultat (se [statusverdi-referanse](/nb/notifications/reference/notification-status/)) |
| `requestedSendTime` | DateTime | Nei | UTC-tidsstempel når avsenderen forespurte at varselet skulle sendes |
| `lastUpdateTime` | DateTime | Nei | UTC-tidsstempel når leverandøren (e-post- eller SMS-tjeneste) rapporterte leveringsresultatet |

## Statuskoder

| Status | Betydning | Beskrivelse |
|--------|-----------|-------------|
| `200` | OK | Loggoppføringer som samsvarer med filteret ble hentet. Returnerer tom matrise hvis ingen oppføringer samsvarer. |
| `400` | Ugyldig forespørsel | En eller flere parametrer er ugyldige. Minst en av `dialogId` eller `transmissionId` må oppgis og være ikke-tom. |
| `401` | Uautorisert | Forespørselen mangler gyldige autentiseringslegitimasjon. |
| `403` | Forbudt | Anroperen er ikke autorisert til å få tilgang til varslinglogg. |
| `499` | Forespørsel avsluttet | Klienten koblet fra eller avbrøt forespørselen. |

## Feilsvar

Når en valideringsfeil oppstår (manglende eller ugyldige spørringsparametrer), returnerer API-et en standard valideringsrespons:

```json
{
  "type": "https://altinn.no/problems/validation-error",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "detail": "At least one of 'dialogId' or 'transmissionId' must be provided.",
  "instance": "/notifications/api/v1/future/log",
  "traceId": "0HMVH5K9A0O5E:00000001"
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
  "instance": "/notifications/api/v1/future/log",
  "traceId": "0HMVH5K9A0O5E:00000002"
}
```

For fullstendig feilkode-referanse, se [Feilkoder](/nb/notifications/reference/error-codes/).

## Eksempel: Komplett arbeidsflyt

### 1. Spørring etter dialog-ID

```bash
curl -X GET \
  'https://platform.altinn.no/notifications/api/v1/future/log?dialogId=550e8400-e29b-41d4-a716-446655440000' \
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
    "status": "Email_Delivered",
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
    "status": "SMS_Accepted",
    "requestedSendTime": "2026-08-05T10:00:00Z",
    "lastUpdateTime": "2026-08-05T10:01:15Z"
  }
]
```

### 2. Inspiser loggoppføring for feilsøking

Fra svaret ovenfor ser du:
- E-posten ble levert (`Email_Delivered`)
- SMS-en ble akseptert av leverandøren (`SMS_Accepted`)
- Begge varslene ble forespurt samtidig, men leveranseresultatene ble rapportert til ulike tider

### 3. Spørring med valideringsfeil

```bash
curl -X GET \
  'https://platform.altinn.no/notifications/api/v1/future/log' \
  -H 'Authorization: Bearer {altinn_token}'
```

**Svar (400 Ugyldig forespørsel):**

```json
{
  "type": "https://altinn.no/problems/validation-error",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "detail": "At least one of 'dialogId' or 'transmissionId' must be provided.",
  "instance": "/notifications/api/v1/future/log",
  "traceId": "0HMVH5K9A0O5E:00000002"
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
