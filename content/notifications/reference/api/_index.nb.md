---
title: Altinn Varslinger API
linktitle: API
description: En oversikt over Altinn Varslinger API
weight: 10
toc: true
---

Altinn Varslinger API er et HTTP-basert RESTful API som tilbyr endepunkter og handlinger for å bestille,
håndtere og gjennomgå varslinger sendt gjennom Altinn.

## Base URL

{{% insert "content/altinn-studio/v8/guides/shared/api/base-urls.md" "notifications"%}}

## Autentisering og Autorisasjon

### Altinn-token

{{% insert "content/altinn-studio/v8/guides/shared/api/altinn-token.md" "Notifications"%}}

### Maskinporten-scopes

{{% insert "content/altinn-studio/v8/guides/shared/api/maskinporten-scopes.md" %}}


### Plattform Aksess-token

{{% insert "content/altinn-studio/v8/guides/shared/api/platform-access-token.md" %}}

## Feilhåndtering

Altinn Varslinger API bruker standard HTTP-statuskoder og gir detaljert feilinformasjon gjennom problemdetaljrespons.

### Feilkoder

API-et returnerer unike feilkoder i formatet `NOT-XXXXX` for spesifikke feilforhold. Disse feilkodene hjelper deg med å identifisere og håndtere spesifikke feilscenarier programmatisk.

For en fullstendig referanse over alle feilkoder, se [Feilkodereferanse](/nb/notifications/reference/error-codes/).

### Vanlige feilkoder

| Feilkode | HTTP-status | Beskrivelse |
|----------|-------------|-------------|
| `NOT-00001` | 422 | Manglende kontaktinformasjon for mottaker(e) |
| `NOT-00002` | 499 | Forespørsel avbrutt av klient |
| `NOT-00003` | 404 | Forsendelse ikke funnet |

### Problemdetaljrespons-format

Når en feil oppstår, returnerer API-et en problemdetaljrespons i henhold til [RFC 9110](https://tools.ietf.org/html/rfc9110):

```json
{
  "status": 422,
  "code": "NOT-00001",
  "detail": "Missing contact information for recipient(s)"
}
```