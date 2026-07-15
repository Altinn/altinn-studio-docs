---
title: Sammensatte e-postbestillinger
description: "Sammensatte e-postbestillinger lar deg sende e-post med filreferanser gjennom sammensatt Varslings-API-et."
linktitle: Sammensatte e-postbestillinger
tags: [sammensatt e-post, vedlegg, sas, varslinger]
weight: 45
---

## Hva er sammensatte e-postbestillinger?

Sammensatte e-postbestillinger er en variant i Altinn Notifications der du sender e-post direkte til en e-postadresse og inkluderer vedlegg som referanser.

API-et laster ikke opp vedleggsinnhold. I stedet oppgir du SAS-URL-er, og Altinn henter filene når e-posten sendes.

## Når bør du bruke sammensatte e-postbestillinger?

Bruk sammensatte e-postbestillinger når du må:

- Sende e-post med ett eller flere vedlegg (via SAS-URL-referanser)
- Styre emne og innhold direkte i forespørselen
- Planlegge sending med `requestedSendTime`
- Sende til en direkte e-postmottaker i stedet for via mottakeroppslag

## Tekniske egenskaper

### Filreferanser med SAS-URL-er

Hvert vedlegg må ha en SAS-URL. Ved sending henter Altinn filen fra Azure Blob Storage.

Det betyr at filen må være tilgjengelig til meldingen er behandlet.

Listen `attachments` er valgfri. Hvis den er tom eller `null`, sendes e-posten uten vedlegg. Hvis du legger ved filer, må hvert vedlegg oppfylle valideringskravene for SAS-URL og vedlegg.

### Validering ved API-grensen

Hver SAS-URL blir validert før bestillingen godtas. API-et kontrollerer at:

- URL-skjemaet er `https`
- Verten slutter med `.blob.core.windows.net`
- Queryen inneholder `se`, `sig`, `sp` og `sr`
- Query-parameteren `sr` er satt til `b` (blob-ressurs)
- Query-parameteren `sp` inneholder `r` (lesetilgang)
- Query-parameteren `se` kan tolkes som gyldig dato og klokkeslett

API-et validerer også metadata for vedlegg:

- Filnavnet må ikke inneholde skilletegn i filbaner (`/`, `\`) og må ha filendelse

### Sendetid og utløpsbuffer

Utløp på SAS-URL må være minst 15 minutter etter `requestedSendTime`. Denne bufferen reduserer risikoen for at filhenting feiler ved korte forsinkelser mellom planlagt sendetid og faktisk filhenting.

### Scopemodell

Sammensatte e-postbestillinger krever `altinn:serviceowner/notifications.composedemail.create`.

Dette scopet er separat fra `altinn:serviceowner/notifications.create`, som gir tilgang til Varslings-API-et, samt umiddelbare Varslings-API-et.

### Idempotens og responser

Som for andre bestillingstyper bruker du `idempotencyId` for å unngå duplikatsending ved gjentatte kall.

API-et returnerer `201 Created` ved første vellykkede behandling og `200 OK` ved idempotent gjentak.

## Neste steg

- Les [veiledningen for sammensatte e-postbestillinger](/nb/notifications/guides/composed-email/) for å implementere dette i tjenesten din
- Utforsk [OpenAPI-spesifikasjonen](/nb/notifications/reference/openapi/) for detaljer på endepunktnivå
