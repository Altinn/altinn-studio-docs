---
title: Last ned vedlegg
linktitle: Last ned vedlegg
description: Endepunkt for nedlasting av et meldingsevedlegg.

weight: 60
toc: true
---

## Endepunkt

GET /correspondence/api/v1/correspondence/{{correspondenceId}}/attachment/{{attachmentId}}/download

## Beskrivelse

Dette endepunktet muliggjør nedlasting av et spesifikt vedlegg knyttet til en melding. Før endepunktet kan brukes, må statusen til meldingen være satt til "Publisert". Statusen til en melding kan verifiseres ved å bruke oversikts- eller detaljendepunktet, som beskrevet [her](https://docs.altinn.studio/api/correspondence/spec/#/Correspondence/get_correspondence_api_v1_correspondence__correspondenceId_).

## Autentisering

Dette API-et krever autentisering, og forespørselen må også inkludere:

- Correspondence read scope __altinn:correspondence.read__ (for eksterne kall)

Se [Autentisering og Autorisasjon](/notifications/reference/api/#authentication--authorization) for mer informasjon.

## Respons

### Responskoder

- 200 OK: Vedlegget har blitt lastet ned vellykket.

  Se problemdetaljer i responskroppen for mer informasjon.
- 400 One or more validation errors occurred: Indikerer at correspondenceid eller attachmentid ikke ble funnet.

### Innholdstype
- text

### Response body 

Respons body består av innholdet i vedlegget.
