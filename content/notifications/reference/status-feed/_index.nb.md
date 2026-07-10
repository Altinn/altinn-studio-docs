---
title: Statusfeed for varslingsordrer
linktitle: Statusfeed
description: Referanse for statusfeed-endepunktet i Altinn Notifications
weight: 25
toc: true
---

Statusfeeden gir tjenesteeiere en fortløpende strøm av statusoppdateringer for
varslingsordrene sine. I stedet for å polle hver forsendelse enkeltvis
(`/future/shipment/{id}`) leser du alle statusendringer for organisasjonen din
fra ett endepunkt, og bruker et sekvensnummer til å holde rede på hvor langt du
har lest.

```http
GET /notifications/api/v1/future/shipment/feed
```

Hver oppføring i feeden har et `sequenceNumber` som øker for hver nye
statusoppdatering. Feeden inneholder bare oppføringer for organisasjonen din.

## Spørringsparametere

| Parameter  | Type              | Standardverdi | Beskrivelse                                                                                    |
|------------|-------------------|---------------|--------------------------------------------------------------------------------------------------|
| `seq`      | heltall (≥ 0)     | `0`           | Sekvensnummer som brukes som markør for paginering. Hvilke oppføringer som returneres, avhenger av `orderBy`. |
| `pageSize` | heltall           | `500`         | Maksimalt antall oppføringer per side. Verdier begrenses til intervallet 1–500.                |
| `orderBy`  | `asc` eller `desc` | `asc`         | Sorteringsretning for oppføringene.                                                            |

## Paginering

Parameteren `seq` er en eksklusiv markør: Oppføringen med sekvensnummer lik
`seq` blir aldri returnert.

### Stigende rekkefølge (standard)

Med `orderBy=asc` returnerer endepunktet oppføringer med sekvensnummer
**høyere enn** `seq`, sortert fra eldst til nyest.

Slik leser du feeden fremover:

1. Kall endepunktet med det siste sekvensnummeret du har behandlet som `seq`,
   eller `0` for å starte fra begynnelsen av feeden.
2. Behandle oppføringene og ta vare på det høyeste `sequenceNumber` i svaret.
3. Gjenta med `seq` satt til denne verdien. Et tomt svar betyr at det ikke
   finnes nye oppdateringer ennå.

### Synkende rekkefølge

Med `orderBy=desc` returnerer endepunktet oppføringer med sekvensnummer
**lavere enn** `seq`, sortert fra nyest til eldst. Unntaket er `seq=0` (eller
utelatt), som returnerer de nyeste oppføringene i feeden.

For å bla bakover bruker du det laveste `sequenceNumber` fra forrige svar som
neste `seq`.

### Finne den nyeste enden av feeden

Når du skal lese feeden for første gang, eller etter lengre nedetid, vil du
ofte hoppe over historiske oppføringer og starte fra den nyeste oppdateringen.
Kall endepunktet med `orderBy=desc` og uten `seq`:

```http
GET /notifications/api/v1/future/shipment/feed?orderBy=desc&pageSize=1
```

Den første oppføringen i svaret er den nyeste. Bruk `sequenceNumber` fra denne
som utgangspunkt (`seq`) når du deretter poller med `orderBy=asc`.

## Svar

Svaret er en liste med statusfeed-oppføringer. Hver oppføring inneholder
sekvensnummeret og det samme statusobjektet som `/future/shipment/{id}`:

```json
[
  {
    "sequenceNumber": 1523,
    "shipmentId": "c1d034c5-6af7-4813-aff7-920ab02e27b2",
    "sendersReference": "b6030a4e-93a3-489f-8478-85618d198745",
    "type": "Notification",
    "status": "Order_Completed",
    "lastUpdate": "2026-02-04T11:33:09.64992Z",
    "recipients": [
      {
        "type": "Email",
        "destination": "nullstilt@altinn.xyz",
        "status": "Email_Delivered",
        "lastUpdate": "2026-02-04T11:33:09.64992Z"
      }
    ]
  }
]
```

Statusverdiene er beskrevet i referansen for
[statusverdier for ordre og varsler]({{< relref "/notifications/reference/notification-status" >}}).
