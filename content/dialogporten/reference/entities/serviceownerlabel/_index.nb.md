---
title: 'Tjenesteeieretiketter'
description: 'Referanseinformasjon om tjenesteeieretikett-entiteten'
weight: 40
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

Tjenesteeieretiketter er tilpassede merkelapper som brukes av tjenesteeiere for å kategorisere dialoger.

De er en del av tjenesteeierkonteksten og er ikke synlige i sluttbruker-API-er.

## Regler

Den nåværende implementasjonen håndhever følgende regler:

- etiketter er unike uten hensyn til store og små bokstaver
- hver etikett må være mellom 3 og 255 tegn lang
- en dialog kan ha maksimalt 20 etiketter

Tjenesteeieretiketter kan oppgis når en dialog opprettes gjennom `serviceOwnerContext.serviceOwnerLabels`.

Dialogporten bruker også tjenesteeieretiketter for enkelte integrasjonsbaserte dialogtyper:

- dialoger som representerer Altinn App-instanser har `urn:altinn:integration:storage:<partyId>/<instanceGuid>`
- dialoger som refererer til en enkelt Altinn Melding har `urn:altinn:correspondence:id:<correspondenceId>`

## Søkeadferd

[Dialogsøk]({{< relref "../dialog" >}}#søk) støtter filtrering på én eller flere tjenesteeieretiketter.

- Flere `serviceOwnerLabels`-filtre kombineres med OG-semantikk
- Prefikssøk støttes ved å avslutte etiketten med `*`, for eksempel `finance*`

## Dedikerte endepunkter for etiketter

De dedikerte etikettendepunktene opererer på tjenesteeierkonteksten til en dialog.

- `GET` returnerer gjeldende etikettsett og gjeldende revisjon for tjenesteeierkontekst i `ETag`-headeren
- `POST` legger til én etikett
- `DELETE` fjerner én etikett

`POST` og `DELETE` støtter optimistisk samtidighetskontroll gjennom `If-Match`, ved bruk av revisjonen for tjenesteeierkontekst.

{{<swaggerdisplayoperation "post" "/api/v1/serviceowner/dialogs/{dialogId}/context/labels">}}

{{<swaggerdisplayoperation "get" "/api/v1/serviceowner/dialogs/{dialogId}/context/labels">}}

{{<swaggerdisplayoperation "delete" "/api/v1/serviceowner/dialogs/{dialogId}/context/labels/{label}">}}

{{<children />}}
