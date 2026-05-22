---
title: Hente systembruker via spørring
description: "Slik henter du en eksisterende systembruker for eget system ved hjelp av spørreparametere."
linktitle: Hente systembruker
weight: 3
---

Endepunktet lar deg som sluttbrukersystemleverandør (SBSL) hente en eksisterende systembruker for eget system. Du kan slå opp systembrukeren ved å kombinere system-ID og organisasjonsnummer, og eventuelt en ekstern referanse.

> **Merk:** Dette endepunktet brukes til å sjekke om en systembruker eksisterer og hente verdier som systembruker-ID. Det gir ikke tilgang til selve systembruker-tokenet. For å hente token og bruke systembrukeren i API-kall, se [Bruk av systembruker](../usetoken/).

Du bruker dette endepunktet til å

- verifisere at en systembruker er opprettet etter at sluttbrukeren har godkjent en forespørsel
- hente systembruker-ID-en som trengs for å opprette endringsforespørsler
- sjekke detaljer for en eksisterende systembruker

## Scope

Kallet autentiseres med et Maskinporten-token som inneholder scopet:

`altinn:authentication/systemuser.request.write`

Se [Kom i gang-veiledningen](https://docs.altinn.studio/nb/authorization/getting-started/systemuser/) for informasjon om hvordan du får tilgang til dette scopet.

## Endepunkt

- **Test (TT02):** `GET https://platform.tt02.altinn.no/authentication/api/v1/systemuser/vendor/byquery`
- **Produksjon:** `GET https://platform.altinn.no/authentication/api/v1/systemuser/vendor/byquery`

## Spørreparametere

| Parameter | Type | Obligatorisk | Beskrivelse |
|---|---|---|---|
| `system-id` | string | Ja | System-ID-en til systemet systembrukeren tilhører |
| `orgno` | string | Ja | Organisasjonsnummeret til virksomheten som eier systembrukeren |
| `external-ref` | string | Nei | Ekstern referanse satt ved opprettelse av systembrukeren |

Parameteren `external-ref` er nyttig dersom det finnes flere systembrukere for samme kombinasjon av system og organisasjon.

## Eksempel

### Forespørsel

```http
GET https://platform.tt02.altinn.no/authentication/api/v1/systemuser/vendor/byquery
  ?system-id=991825827_smartcloud
  &orgno=314248295
  &external-ref=0.abc123xyz
```

### Svar

```json
{
  "id": "b93107d3-da30-4b7a-a8ae-9b0cac079fd2",
  "integrationTitle": "SmartCloud for Skatt",
  "systemId": "991825827_smartcloud",
  "productName": "",
  "reporteeOrgNo": "314248295",
  "created": "2026-05-21T13:35:24.161Z",
  "isDeleted": false,
  "supplierName": "SmartCloud AS",
  "supplierOrgno": "991825827",
  "externalRef": "0.abc123xyz",
  "userType": "standard"
}
```

## Felter i responsen

| Felt | Type | Beskrivelse |
|---|---|---|
| `id` | UUID | Unik identifikator for systembrukeren |
| `integrationTitle` | string | Navn på systembrukeren satt ved opprettelse |
| `systemId` | string | System-ID-en systembrukeren tilhører |
| `productName` | string | Produktnavn (kan være tomt) |
| `reporteeOrgNo` | string | Organisasjonsnummeret til virksomheten som eier systembrukeren |
| `created` | datetime | Tidspunkt da systembrukeren ble opprettet |
| `isDeleted` | boolean | Om systembrukeren er slettet |
| `supplierName` | string | Navn på leverandøren |
| `supplierOrgno` | string | Organisasjonsnummeret til leverandøren |
| `externalRef` | string | Ekstern referanse satt ved opprettelse (kan være tom) |
| `userType` | string | Type systembruker: `standard` (eget system) eller `agent` (klientsystem) |
