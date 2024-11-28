---
title: Bekreft
linktitle: Bekreft
description: Endepunkt for å gi meldingen statusen "Confirmed".

weight: 60
toc: true
---

## Endepunkt

POST /correspondence/api/v1/correspondence/{{correspondenceId}}/confirm

## Beskrivelse

Dette endepunktet setter statusen til en eksisterende melding til "Confirmed". Feltet `IsConfirmationNeeded` er en boolsk verdi som settes til true hvis meldingen krever bekreftelse. I praksis betyr dette at hvis forfallsdatoen er nådd og mottakeren ikke har bekreftet, vil avsenderen bli varslet. Før du bruker dette endepunktet, må statusen til meldingen være "Fetched". Denne statusen betyr at meldingen har blitt lastet ned. Dette skjer når en mottaker bruker overview- eller details-forespørselen. Statusen til en melding kan sjekkes ved å bruke oversiktsendepunktet beskrevet [her](https://docs.altinn.studio/api/correspondence/spec/#/Correspondence/get_correspondence_api_v1_correspondence__correspondenceId_).

## Autentisering

Dette API-et krever autentisering, og forespørselen må også inkludere:

- Correspondence read scope __altinn:correspondence.read__ (for eksterne kall)

Se [Autentisering og Autorisasjon](/notifications/reference/api/#authentication--authorization) for mer informasjon.

## Respons

### Responskoder

- 200 OK: meldingen har blitt vellykket merket som bekreftet

  Se problemdetaljer i responsen for mer informasjon.
- 400 One or more validation errors occurred: Indikerer at correspondenceId ikke ble funnet.

### Innholdstype

- application/json

### Response body

Response body består av en GUID og inneholder correspondenceId.

### Response body egenskaper

Returnerer kun correspondenceId.