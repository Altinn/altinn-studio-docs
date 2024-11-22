---
title: Marker som lest
linktitle: Marker som lest
description: Endepunkt for å gi meldingen status "Read".

weight: 60
toc: true
---

## Endepunkt

POST /correspondence/api/v1/correspondence/{{correspondenceId}}/markasread

## Beskrivelse

Dette endepunktet setter statusen til en eksisterende meldinger som "Read". Før endepunktet kan brukes, må statusen til meldingen være "Fetched". Statusen til en melding kan sjekkes ved å bruke "Details"-endepunktet beskrevet [her](https://docs.altinn.studio/api/correspondence/spec/#/Correspondence/get_correspondence_api_v1_correspondence__correspondenceId__details).

## Autentisering

Dette API-et krever autentisering, og forespørselen må også inkludere:

- Correspondence write scope __altinn:correspondence.write__ (for eksterne kall)

Se [Autentisering og Autorisasjon](/notifications/reference/api/#authentication--authorization) for mer informasjon.

## Respons

### Responskoder

- 200 OK: Korrespondansen har blitt vellykket merket som lest

  Se problemdetaljer i responsen for mer informasjon.
- 404 Not found: Indicates that the correspondence id was not found.

### Innholdstype

- application/json

### Response body 

Response body sitt format er definert her:
[UpdateCorrespondenceStatusRequest](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.Application/UpdateCorrespondenceStatus/UpdateCorrespondenceStatusRequest.cs)

### Response body egenskaper

Returnerer kun correspondenceId.