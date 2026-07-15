---
title: Send e-post med filreferanser
description: "Slik sender du sammensatte e-postbestillinger med filreferanser i sammensatt Varslings-API-et."
linktitle: E-post med filreferanser
tags: [e-post, vedlegg, sas, sammensatt e-post]
weight: 40
---

{{% notice info %}}
Før du begynner, sørg for at du har lest [forklaringen om sammensatte e-postbestillinger](/nb/notifications/explanation/composed-email/) for å forstå når og hvordan du bør bruke denne funksjonen.
{{% /notice %}}

Når du tester og overvåker sammensatte e-postbestillinger, kan du slå opp detaljerte beskrivelser av ordre‑ og varslingsstatus i referansen for [statusverdier for ordre og varsler]({{< relref "/notifications/reference/notification-status" >}}).

## Forutsetninger

Før du starter, må du ha:

1. En **Maskinporten-klient** med scopet `altinn:serviceowner/notifications.composedemail.create`
2. Et **Altinn-token** for autentisering mot API-et
3. Filer lastet opp i **Azure Blob Storage**
4. En **SAS-URL** for hver fil du vil legge ved

{{% notice info %}}
`attachments` er valgfri. Hvis listen er tom eller `null`, sendes e-posten uten vedlegg.
Hvis du legger ved filer, må hvert vedlegg oppfylle valideringskravene for SAS-URL og vedlegg.
{{% /notice %}}

## API-endepunkt

Altinn Notifications tilbyr ett endepunkt for sammensatte e-postbestillinger:

| Endepunkt | Beskrivelse |
|-----------|-------------|
| `POST /future/orders/composed-email` | Send sammensatt e-postbestilling (med valgfrie vedlegg via SAS-URL-referanser) |

**Base URL:**
- **Test (TT02):** `https://platform.tt02.altinn.no/notifications/api/v1`
- **Produksjon:** `https://platform.altinn.no/notifications/api/v1`

## Send sammensatt e-postbestilling

### Forespørselstruktur

```json
{
  "idempotencyId": "string",
  "sendersReference": "string (valgfri)",
  "requestedSendTime": "2026-07-01T10:00:00Z",
  "recipient": {
    "emailAddress": "string",
    "emailSettings": {
      "subject": "string",
      "body": "string",
      "contentType": "Plain",
      "attachments": [
        {
          "filename": "string",
          "mimeType": "string",
          "sasUrl": "https://..."
        }
      ]
    }
  }
}
```

### Felter

#### idempotencyId (påkrevd)
- **Type:** String
- **Beskrivelse:** Unik identifikator for denne sendingen. Brukes for å sikre at samme melding ikke sendes flere ganger ved gjentatte forespørsler.
- **Eksempel:** `"3fa85f64-5717-4562-b3fc-2c963f66afa6"`

{{% notice info %}}
Bruk en unik ID for hver ny sending. Hvis du sender samme forespørsel med samme `idempotencyId` flere ganger, blir bare første sending utført. Påfølgende forespørsler returnerer resultatet fra første sending.
{{% /notice %}}

#### sendersReference (valgfri)
- **Type:** String
- **Beskrivelse:** Din egen referanse for denne sendingen. Brukes til logging og sporing.
- **Eksempel:** `"ref-2026-001"`

#### requestedSendTime (valgfri)
- **Type:** DateTime (UTC)
- **Beskrivelse:** Ønsket sendetidspunkt for varslingsbestillingen.
- **Eksempel:** `"2026-07-01T10:00:00Z"`

{{% notice info %}}
Hvis `requestedSendTime` utelates, bruker API-et nåværende tidspunkt i UTC.
{{% /notice %}}

#### emailAddress (påkrevd)
- **Type:** String
- **Beskrivelse:** Mottakerens e-postadresse.
- **Eksempel:** `"recipient@example.com"`

#### subject (påkrevd)
- **Type:** String
- **Beskrivelse:** E-postens emnefelt.
- **Eksempel:** `"Vedtak i saken din"`

#### body (påkrevd)
- **Type:** String
- **Beskrivelse:** Innholdet i e-posten.
- **Eksempel:** `"Se vedlagte dokument."`

#### contentType (valgfri)
- **Type:** String
- **Verdier:** `"Plain"` eller `"Html"`
- **Standard:** `"Plain"`
- **Beskrivelse:** Innholdstype for e-postens innhold.

#### attachments (valgfri)
- **Type:** Array
- **Beskrivelse:** Liste over filreferanser som legges ved e-posten. Hvis feltet utelates, er `null` eller er tomt, sendes e-posten uten vedlegg.

#### filename (påkrevd når vedlegg er med)
- **Type:** String
- **Beskrivelse:** Filnavn for vedlegget.
- **Validering:** Må ikke inneholde stiskilletegn (`/`, `\`) og må ha filendelse.
- **Eksempel:** `"vedtak.pdf"`

#### mimeType (påkrevd når vedlegg er med)
- **Type:** String
- **Beskrivelse:** MIME-type for vedlegget.
- **Validering:** Må være støttet av Azure Communication Services.
- **Eksempel:** `"application/pdf"`

#### sasUrl (påkrevd når vedlegg er med)
- **Type:** String (absolutt URI)
- **Beskrivelse:** SAS-URL som API-et bruker til å hente filen ved sending.
- **Eksempel:** `"https://youraccount.blob.core.windows.net/container/vedtak.pdf?se=...&sp=r&sr=b&sig=..."`

### Valideringskrav

#### Krav til SAS-URL

Ved API-grensen blir hver SAS-URL for vedlegg kontrollert mot disse kravene:

| Regel | Krav |
|-------|------|
| URL-skjema | Må være `https` |
| Vert | Må slutte med `.blob.core.windows.net` |
| Påkrevde query-parametere | `se`, `sig`, `sp`, `sr` må være med og ha verdi |
| Ressurstype (`sr`) | Må være `b` (blob) |
| Tillatelser (`sp`) | Må inneholde `r` (lesetilgang) |
| Utløp (`se`) | Må kunne tolkes som dato og klokkeslett |
| Utløpsbuffer | Må være minst **15 minutter etter `requestedSendTime`** |

#### Krav til vedlegg

| Regel | Krav |
|-------|------|
| Filnavn | Må ikke inneholde stiskilletegn (`/`, `\`) |
| Filnavn | Må ha filendelse |
| MIME-type | Må være støttet av Azure Communication Services |

### Eksempel: Send sammensatt e-post med vedlegg

```bash
curl -X POST "https://platform.tt02.altinn.no/notifications/api/v1/future/orders/composed-email" \
  -H "Authorization: ******" \
  -H "Content-Type: application/json" \
  -d '{
    "idempotencyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "sendersReference": "ref-2026-001",
    "requestedSendTime": "2026-07-01T10:00:00Z",
    "recipient": {
      "emailAddress": "recipient@example.com",
      "emailSettings": {
        "subject": "Vedtak i saken din",
        "body": "Se vedlagte dokument.",
        "contentType": "Plain",
        "attachments": [
          {
            "filename": "vedtak.pdf",
            "mimeType": "application/pdf",
            "sasUrl": "https://youraccount.blob.core.windows.net/container/vedtak.pdf?se=2026-07-01T12%3A00%3A00Z&sp=r&sr=b&sig=..."
          }
        ]
      }
    }
  }'
```

### Respons

Ved vellykket registrering får du `201 Created` med sporingsidentifikatorer:

```json
{
  "notificationOrderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "notification": {
    "shipmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "sendersReference": "ref-2026-001"
  }
}
```

Hvis du sender samme forespørsel på nytt med samme `idempotencyId`, returnerer API-et `200 OK` med samme responsinnhold.

### Feilhåndtering

Mulige feilkoder:

| Status | Feilkode | Beskrivelse | Løsning |
|--------|----------|-------------|---------|
| `400 Bad Request` | - | Validering feilet | Kontroller forespørselen, SAS-URL-verdier og vedleggsfelter |
| `401 Unauthorized` | - | Manglende eller ugyldig token | Sørg for gyldig Altinn-token i Authorization-header |
| `403 Forbidden` | - | Mangler scope for tilgang til API-et | Verifiser at Maskinporten-klienten har `altinn:serviceowner/notifications.composedemail.create` |
| `499 Client Closed Request` | `NOT-00002` | Forespørsel avbrutt før ferdig behandling | Sjekk nettverkstilkobling og timeout-innstillinger |

## Neste steg

- [API-referanse](/nb/notifications/reference/api/)
- [OpenAPI-spesifikasjon](/nb/notifications/reference/openapi/)
