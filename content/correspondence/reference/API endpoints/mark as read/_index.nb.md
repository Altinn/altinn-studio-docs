---
title: Merk som lest
linktitle: Merk som lest
description: Endepunkt for å gi meldingen status "Read".

weight: 60
toc: true
---

## Endepunkt

POST /correspondence/api/v1/correspondence/{{correspondenceId}}/markasread

## Beskrivelse

Dette endepunktet setter statusen til en eksisterende melding til "Read". Før dette endepunktet blir tatt i bruk, må statusen til meldingen være "Fetched". Denne statusen betyr at meldingen har blitt lastet ned. Dette skjer når en mottaker bruker overview- eller details-endepunktet. Statusen til en melding kan sjekkes ved å bruke overview-endepunktet beskrevet [her](https://docs.altinn.studio/api/correspondence/spec/#/Correspondence/get_correspondence_api_v1_correspondence__correspondenceId_).

## Autentisering

Dette API-et krever autentisering, og forespørselen må også inkludere:

- Correspondence read scope __altinn:correspondence.read__ (for eksterne kall)

Se [Autentisering og Autorisasjon](/notifications/reference/api/#authentication--authorization) for mer informasjon.

## Respons

### Responskoder

- 200 OK: Meldingen har blitt vellykket merket som lest

  Se problemdetaljer i responsen for mer informasjon.
- 404 Not Found: Indikerer at correspondenceId ikke ble funnet.

### Innholdstype

- application/json

### Response body

Response body består av en GUID og inneholder correspondenceId.

### Response body egenskaper

Returnerer kun correspondenceId.