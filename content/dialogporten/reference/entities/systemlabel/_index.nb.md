---
title: 'Systemetikett'
description: 'Referanseinformasjon om systemetikett-entiteten'
weight: 40
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

Systemetiketter er forhåndsdefinerte etiketter i sluttbrukerkontekst som brukes av fronter til å organisere dialoger i mapper eller sorteringskategorier, f.eks. Sent, Papirkurv og Arkiv.

| SystemLabel          | Beskrivelse                                                                                                                                                                         |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Default**          | Gjensidig utelukkende med Bin/Archive                                                                                                                                                |
| **Bin**              | Gjensidig utelukkende med Default/Archive                                                                                                                                            |
| **Archive**          | Gjensidig utelukkende med Default/Bin                                                                                                                                                |
| **Sent**             | Legges automatisk til av Dialogporten når en forsendelse av typen <br/>`Submission` eller `Correction` legges til dialogen.<br/>Kan ikke legges til eller fjernes av tjenesteeiere eller sluttbrukere |
| **MarkedAsUnopened** | Marker en dialog som uåpnet/ulest. Kan settes og fjernes av tjenesteeiere og sluttbrukere                                                                                            |

**Default**/**Bin**/**Archive** er påkrevde systemetiketter. De er gjensidig utelukkende, noe som betyr at en dialog bare kan ha én av disse etikettene om gangen.
Hvis du fjerner `Bin` eller `Archive`, legges `Default` automatisk til med mindre `Bin` eller `Archive` også legges til i samme forespørsel.

`MarkedAsUnopened` påvirker semantikken for ulest. En dialog anses bare som innhold-sett hvis den er hentet etter siste innholdsoppdatering og ikke har `MarkedAsUnopened`.

Hvis du endrer systemetiketter i bulk, bruk `addLabels` og `removeLabels`.

*Merk: Egenskapen `systemLabels` på entitetene nedenfor er deprecated. Bruk `addLabels` og `removeLabels` i stedet.*

## Operasjoner for sluttbruker

Sluttbrukere kan oppdatere systemetiketter gjennom REST og GraphQL.

- REST: `PUT /api/v1/enduser/dialogs/{dialogId}/context/systemlabels`
- REST bulk-oppdatering: `POST /api/v1/enduser/dialogs/context/systemlabels/actions/bulkset`
- GraphQL: `setSystemLabel`
- GraphQL bulk-oppdatering: `bulkSetSystemLabels`

REST-endepunktene bruker revisjonen for sluttbrukerkontekst for optimistisk samtidighetskontroll via `If-Match`. Vellykkede oppdateringer av én dialog returnerer den nye revisjonen i `ETag`-headeren.

{{<swaggerdisplayoperation "put" "/api/v1/enduser/dialogs/{dialogId}/context/systemlabels">}}

{{<swaggerdisplayoperation "post" "/api/v1/enduser/dialogs/context/systemlabels/actions/bulkset">}}

## Operasjoner for tjenesteeier

Tjenesteeiere kan også oppdatere sluttbrukers systemetiketter gjennom dedikerte tjenesteeierendepunkter:

- `PUT /api/v1/serviceowner/dialogs/{dialogId}/endusercontext/systemlabels`
- `POST /api/v1/serviceowner/dialogs/endusercontext/systemlabels/actions/bulkset`

Disse endepunktene bruker også revisjonen for sluttbrukerkontekst for optimistisk samtidighetskontroll.

Når du bruker tjenesteeierendepunktene:

- `endUserId` er påkrevd med mindre `performedBy` er oppgitt
- hvis `performedBy` er oppgitt, må `endUserId` utelates

{{<swaggerdisplayoperation "put" "/api/v1/serviceowner/dialogs/{dialogId}/endusercontext/systemlabels">}}

{{<swaggerdisplayoperation "post" "/api/v1/serviceowner/dialogs/endusercontext/systemlabels/actions/bulkset">}}

## Logg for etikettildeling

Dialogporten eksponerer en logg for etikettildeling ved endringer i sluttbrukerkonteksten:

- endepunkt: `GET /api/v1/enduser/dialogs/{dialogId}/context/labellog`
- oppføringer returneres i kronologisk rekkefølge
- hver oppføring inneholder `createdAt`, `name`, `action` og `performedBy`

Implementasjonen registrerer handlingene `set` og `remove` for ikke-standard systemetiketter.

{{<swaggerdisplayoperation "get" "/api/v1/enduser/dialogs/{dialogId}/context/labellog">}}

## Tjenesteeiersøk for sluttbrukerkontekst

Hvis du trenger gjeldende sluttbrukerkonteksttilstand uten å hente hele dialogsøkeresultatet, eksponerer tjenesteeier-API-et:

{{<swaggerdisplayoperation "get" "/api/v1/serviceowner/dialogs/endusercontext">}}

{{<children />}}
