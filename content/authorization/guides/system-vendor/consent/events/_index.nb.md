---
title: List alle samtykkehendelser
linktitle: List alle samtykke hendelser for virksomhet
weight: 10
toc: false
---

## Forutsetning

1. Datakonsumenten må ha en registrert Maskinporten-klient.
2. Datakonsumenten må ha fått delegert samtykkescope fra Digdir (altinn:consentrequests.read).
3. De nødvendige scopene må legges til Maskinporten-klienten.

## API Endepunkt

Returnerer en paginert liste over samtykkehendelser for den autentiserte virksomheten.
Resultatene er sortert etter eventid, eldste først. Som standard returnerer API-et opptil 100 endringer per forespørsel.
Dette endepunktet bruker kursor-basert paginering, så kall endepunktet uten en ContinuationToken for å hente den første siden.
- **Test**: `GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/latestchanges`
- **Produksjon**: `GET https://platform.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/latestchanges`

## Spørringsparametere
| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| ContinuationToken | string | Nei | opaque-kursor fra nextLink i en tidligere respons. Brukes til paginering. |
| createdAfter | Datetimeoffset | Nei | Filtrerer hendelser opprettet på eller etter dette tidspunktet. |
| createdBefore | Datetimeoffset | Nei | Filtrerer hendelser opprettet før dette tidspunktet. |
| EventType | string[] | Nei | Filtrerer etter hendelsestype. Kan gjentas: eventType=accepted&eventType=revoked. |
| ConsentRequestID | Guid | Nei | Filtrerer hendelser som tilhører en bestemt samtykkeforespørsel. |

Merk: createdAfter må være strengt mindre enn createdBefore hvis begge er oppgitt.

## Paginering
- Resultatene er sortert med eldste først (stigende etter hendelses-ID, som er en UUIDv7 og dermed tidssortert).
- Kun hendelser opprettet for mer enn 5 minutter siden returneres for å sikre konsistens.
- Sidestørrelsen er 100.
- Hvis en nextLink finnes i responsen, følg den for å hente neste side. En nextLink kan forekomme selv når neste side er tom.
- ContinuationToken er en Base64-kodet UUIDv7 GUID (16-byte UUID).

## Request/Response Eksempel
**Første side**
`GET https://platform.tt02.altinn.no/accessmanagement/api/v1/enterprise/consentrequests/latestchanges`

`Authorization: Bearer <maskinporten_token>`

```jsonc
{
  "links": {
    "next": "https://<host>/accessmanagement/api/v1/enterprise/consentrequests/latestchanges?continuationToken=MjAyNS0wNS0wNFQxMDozMDowMCswMjowMHwzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTY%3D"
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
`GET /accessmanagement/api/v1/enterprise/consentrequests/latestchanges?continuationToken=MjAyNS0wNS0wNFQxMDozMDowMCswMjowMHwzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTY%3D`

`Authorization: Bearer <maskinporten_token>`

```jsonc
{
  "links": {
    "next": "https://<host>/accessmanagement/api/v1/enterprise/consentrequests/latestchanges?continuationToken=MjAyNS0wNS0wNFQxMDozMDowMCswMjowMHwzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTY%3D"
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

### Responsfelter

| Responsfelt | Type | Beskrivelse |
|-------------|------|-------------|
| data[].consentRequestId | Guid | ID-en til samtykkeforespørselen som denne hendelsen tilhører. |
| data[].eventType | string | Typen statushendelse. Hendelser: accepted, rejected, revoked, deleted, used. |
| data[].changedDate | Datetimeoffset | Tidspunktet for når statusendringen skjedde. |
| links.next | | URL for å hente neste side. |

### Next
Finnes kun når flere resultater er tilgjengelige. Bruk URL-en som den er for å hente neste side. De opprinnelige filterparameterne (ConsentRequestID, createdAfter, createdBefore, EventType) bevares i next-lenken.

### Hendelsestyper
| Verdi | Beskrivelse |
|-------|-------------|
| accepted | Samtykkeforespørselen ble akseptert av samtykkepartens. |
| rejected | Samtykket ble avvist. |
| revoked | Samtykket ble trukket tilbake. |
| Deleted | Samtykkeforespørselen ble slettet. |
| used | Samtykket ble brukt/konsumert. |

## Error Responses

| Statuskode | Beskrivelse |
|------------|-------------|
| 401 Unauthorized | Manglende eller ugyldig autentiseringstoken. |
| 403 Forbidden | Den autentiserte parten har ikke tilgang. |
| 400 Bad Request | Spørringsparametere er ugyldige. Se innholdet i ProblemDetails for detaljer. |
| 500 Internal Server Error | Uventet feil på serversiden. |