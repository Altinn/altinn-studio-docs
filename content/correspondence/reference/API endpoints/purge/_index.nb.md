---
title: Slett
linktitle: Slett
description: Endepunkt for å slette en melding.

weight: 60
toc: true
---

## Endepunkt

DELETE /correspondence/api/v1/correspondence/{{correspondenceId}}/purge

## Beskrivelse

Dette endepunktet brukes til å slette en eksisterende melding. Hvis meldingen inkluderer vedlegg, vil de også bli slettet, forutsatt at de ikke er knyttet til noen annen melding.

## Autentisering

Dette API-et krever autentisering, og forespørselen må også inkludere en av følgende:

- Correspondence write scope __altinn:correspondence.write__
- Correspondence read scope __altinn:correspondence.read__

Se [Autentisering og Autorisasjon](/notifications/reference/api/#authentication--authorization) for mer informasjon.

## Respons

### Responskoder

- 200 OK: Meldingen har blitt slettet
- 400 One or more validation errors occurred: Indikerer at correspondenceid er i feil format.
- 404 Not found: Den forespurte meldingen ble ikke funnet.

### Innholdstype

- application/json

### Response body

Response body består av en GUID og inneholder correspondenceid.

### Response body egenskaper

Returnerer kun correspondenceid.