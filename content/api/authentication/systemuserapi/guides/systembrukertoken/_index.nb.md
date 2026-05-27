---
title: Hent systembrukertoken fra Maskinporten
description: "Veiledning for å opprette systembrukerforespørsler og hente Maskinporten-token for standard og agent-systembrukere."
linktitle: Hent systembrukertoken
weight: 10
toc: true
tags: [maskinporten, systembruker, autentisering]
---

## Introduksjon
Denne veiledningen viser hvordan du henter et systembrukertoken fra Maskinporten. Den dekker både standard (egen) og agent-systembrukere, forklarer hva som skiller dem, og viser hvordan du lager tydelige forespørsels- og responsobjekter.

## Forutsetninger
- Maskinporten-klient med relevante scopes, for eksempel `altinn:authentication/systemuser.request.write`, `altinn:authentication/systemuser.request.read` og scopes for API-et som skal kalles.
- Registrert system i Altinn og tilgang til systemregister- og systembruker-API-et.
- Mulighet til å signere JWT-er med klientsertifikatet ditt i Maskinporten.
- For agent-systembrukere: Roller i Altinn som gir rett til å delegere klientorganisasjoner.

## Trinn 1 – Velg riktig systembrukertype
| Type | Når brukes den? | Viktige forskjeller |
| --- | --- | --- |
| Standard (egen) | Systemet representerer kun organisasjonen som eier systemet. | Kan bruke både `rights` og `accessPackages`. Ingen manuell klientdelegering etter godkjenning. |
| Agent | Systemet skal handle på vegne av flere kundeorganisasjoner. | Bruk kun `accessPackages`. Krever at sluttbruker delegerer klienter etter godkjenning. |

{{% notice info %}}
Velg systembrukertype før du lager forespørselen. Det påvirker hvilke felt Maskinporten-tokenet inneholder og hvilke steg brukeren må gjennom.
{{% /notice %}}

## Trinn 2 – Opprett forespørselen

### Standard-forespørsel (vendor)
**Request**
```http
POST https://platform.tt02.altinn.no/authentication/api/v1/systemuser/request/vendor
Authorization: Bearer <Maskinporten-token med write-scope>
Content-Type: application/json

{
  "systemId": "123456789_mitt-system",
  "partyOrgNo": "987654321",
  "rights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "ske-krav-og-betalinger"
        }
      ]
    }
  ],
  "accessPackages": [
    {
      "urn": "urn:altinn:accesspackage:skattegrunnlag"
    }
  ],
  "externalRef": "kunde-987654321",
  "redirectUrl": "https://leverandor.no/systembruker/mottatt"
}
```

**Response**
```json
{
  "id": "0c5c58ad-4fc1-4ef9-9c72-4a3376a0c3d0",
  "externalRef": "kunde-987654321",
  "systemId": "123456789_mitt-system",
  "partyOrgNo": "987654321",
  "rights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "ske-krav-og-betalinger"
        }
      ]
    }
  ],
  "status": "New",
  "redirectUrl": "https://leverandor.no/systembruker/mottatt",
  "confirmUrl": "https://am.ui.tt02.altinn.no/accessmanagement/ui/systemuser/request?id=0c5c58ad-4fc1-4ef9-9c72-4a3376a0c3d0"
}
```

### Agent-forespørsel (vendor/agent)
**Request**
```http
POST https://platform.tt02.altinn.no/authentication/api/v1/systemuser/request/vendor/agent
Authorization: Bearer <Maskinporten-token med write-scope>
Content-Type: application/json

{
  "systemId": "123456789_regnskapsfører",
  "partyOrgNo": "912345678",
  "accessPackages": [
    {
      "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrett"
    }
  ],
  "externalRef": "kunde-912345678",
  "redirectUrl": "https://leverandor.no/systembruker/mottatt"
}
```

**Response**
```json
{
  "id": "78b6c716-9d1d-4ff4-9c92-55296e6bb4f6",
  "externalRef": "kunde-912345678",
  "systemId": "123456789_regnskapsfører",
  "partyOrgNo": "912345678",
  "accessPackages": [
    {
      "urn": "urn:altinn:accesspackage:regnskapsforer-med-signeringsrett"
    }
  ],
  "status": "New",
  "redirectUrl": "https://leverandor.no/systembruker/mottatt",
  "confirmUrl": "https://am.ui.tt02.altinn.no/accessmanagement/ui/systemuser/agentrequest?id=78b6c716-9d1d-4ff4-9c92-55296e6bb4f6"
}
```

{{% notice warning %}}
Hold forespørsler (request) og responser adskilt. Flere brukere har forsøkt å sende responsobjektet tilbake til API-et, noe som feiler.
{{% /notice %}}

## Trinn 3 – Be sluttbruker godkjenne
1. Send `confirmUrl` til sluttbrukeren.
2. Sluttbrukeren logger inn i Altinn og godkjenner forespørselen.
3. API-et oppdaterer status til `Accepted` eller `Rejected`.
4. Du kan sjekke status via `GET /authentication/api/v1/systemuser/request/vendor/{id}` eller agent-varianten.

## Trinn 4 – Delegere klienter (kun agent)
Når forespørselen er godkjent må sluttbruker delegere hvilke kundeorganisasjoner agenten skal håndtere.

1. **List tilgjengelige klienter**
   ```http
   GET https://platform.tt02.altinn.no/authentication/api/v1/enduser/systemuser/clients/available?agent={systemUserId}
   ```
2. **Legg til klient**
   ```http
   POST https://platform.tt02.altinn.no/authentication/api/v1/enduser/systemuser/clients/?agent={systemUserId}&client={clientId}
   ```
3. **Bekreft delegering**
   ```http
   GET https://platform.tt02.altinn.no/authentication/api/v1/enduser/systemuser/clients/?agent={systemUserId}
   ```

## Trinn 5 – Hent token fra Maskinporten

### 5.1 Lag `authorization_details`
```json
{
  "authorization_details": [
    {
      "type": "urn:altinn:systemuser",
      "systemuser_org": {
        "authority": "iso6523-actorid-upis",
        "ID": "0192:987654321"
      },
      "externalRef": "kunde-987654321"
    }
  ]
}
```
- `systemuser_org.ID` er organisasjonsnummeret til kunden som godkjente forespørselen, med prefiks `0192:`.
- `externalRef` er valgfri, men anbefales hvis du bruker egne referanser.

### 5.2 Signer JWT-en
Inkluder følgende claims når du signerer JWT-en med Maskinporten-klientsertifikatet:
- `aud`: `https://maskinporten.no/token` (eller test-endepunktet)
- `iss` og `sub`: klient-ID-en i Maskinporten
- `scope`: minst ett API-scope du trenger (for eksempel `altinn:maskinporten/systemuser.read`)
- `exp`, `iat`, `jti`: standard tids- og identifikasjonsfelt
- `authorization_details`: objektet fra forrige steg

### 5.3 Send forespørselen til Maskinporten
```http
POST https://test.maskinporten.no/token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<base64url-signert-jwt>
```

### 5.4 Les responsen
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 599,
  "scope": "altinn:maskinporten/systemuser.read"
}
```
Dekoder du `access_token` finner du:
- `authorization_details[0].system_id`: systemet som ble godkjent
- `authorization_details[0].systemuser_id`: UUID-en til systembrukeren
- `authorization_details[0].systemuser_org`: organisasjonen som eier systembrukeren
- `consumer`: Maskinporten-klienten som hentet tokenet

## Neste steg
Bruk `access_token` som `Bearer`-token når du kaller API-er som forutsetter Altinn-autorisasjon. Tokenet er vanligvis gyldig i rundt 10 minutter, så planlegg for fornyelse.
