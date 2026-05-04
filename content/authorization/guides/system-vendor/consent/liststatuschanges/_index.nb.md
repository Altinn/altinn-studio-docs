---
title: Oversikt over de nyeste statusendringene knyttet til samtykke
linktitle: Oversikt over de nyeste statusendringene knyttet til samtykke
weight: 10
toc: false
---

## Forutsetning

1. Datakonsumenten må ha en registrert Maskinporten-klient.
2. Datakonsumenten må ha fått delegert samtykkescope fra Digdir (altinn:consentrequests.read).
3. De nødvendige scopene må legges til Maskinporten-klienten.

## API Endepunkt

Returnerer en paginert liste over samtykkeforspørsler som nylig har hatt statusendringer for den autentiserte virksomheten.
Resultatene sorteres etter siste statusendring, med nyeste først. Standardsidestørrelse er 100 hvis ikke annet er spesifisert.
Dette endepunktet bruker kursormbasert paginering, så kall endepunktet uten en ContinuationToken for å hente den første siden.
- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/latestchanges`
- **Produksjon**: `GET https://platform.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/latestchanges`

## Request/Response Eksempel
**Første side**
`GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/latestchanges`
Authorization: Bearer <maskinporten_token>

```jsonc
{
  "links": {
    "next": "https://<host>/accessmanagement/api/v1/enterprise/consentrequests/latestchanges?continuationToken=MjAyNS0wNS0wNFQxMDozMDowMCswMjowMHwzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTY%3D&pageSize=50"
  },
  "data": [
    {
      "consentRequestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "eventType": "accepted",
      "changedDate": "2025-05-04T10:30:00+02:00"
    }
  ]
}
```

**Neste side**
`GET /accessmanagement/api/v1/enterprise/consentrequests/latestchanges?continuationToken=MjAyNS0wNS0wNFQxMDozMDowMCswMjowMHwzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTY%3D&pageSize=50`
Authorization: Bearer <maskinporten_token>

```jsonc
{
  "links": {
    "next": "https://<host>/accessmanagement/api/v1/enterprise/consentrequests/latestchanges?continuationToken=MjAyNS0wNS0wNFQxMDozMDowMCswMjowMHwzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTY%3D&pageSize=50"
  },
  "data": [
    {
      "consentRequestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "eventType": "accepted",
      "changedDate": "2025-05-04T10:30:00+02:00"
    }
  ]
}
```

| Respons Felt | Beskrivelse |
|----------------|-------------|
|links.Next|URL for å hente neste side. null hvis det ikke finnes flere resultater.|
|data[].consentRequestId|Unik identifikator for samtykkeforspørselen.|
|data[].eventType|Type statushendelse. Hendelser: accepted, rejected, revoked, deleted, used. Hendelsen ‘created/expired’ listes ikke, da dette ikke er en statusendring.|
|data[].changedDate| Tidsstempel for når statusendringen skjedde.|


## Error Responses

| Statuskode | Beskrivelse |
|------------|-------------|
|401 Unauthorized|Manglende eller ugyldig autentiseringstoken.|
|403 Forbidden|Den autentiserte parten har ikke tilgang|
|400 Bad Request|Spørringsparametere er ugyldige. Se innholdet i ProblemDetails for detaljer.|
|500 Internal Server Error|Uventet feil på serversiden.|