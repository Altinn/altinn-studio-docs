---
title: Altinn 3 Melding utviklerveiledning
linktitle: Receive Files
description: Hvordan motta filer via Altinn Melding
tags: [Broker, guide]
toc: true
weight: 20
---

{{<children />}}

{{% notice warning  %}}
Denne delen av dokumentasjonen er under arbeid, og refererer derfor i stor grad til eksterne kilder.
{{% /notice %}}

## Operasjon: Hent filoverføringer {#operation-get-filetransfers}

**Endepunkt:** GET /broker/api/v1/filetransfer/(filtre)

Lar deg søke etter filoverføringer i henhold til angitte filtre, og returnerer en liste over FileTransferIds som matcher søkekriteriene.
Du kan deretter bruke disse ID-ene til å [hente filoverføringsoversikt](#operation-get-filetransfer-overview) og [laste ned](#operation-downloadfile).

{{% notice warning  %}}
Denne operasjonen bør brukes sparsomt, da man bør fokusere på webhook/event/hendelse [published](#event-published) for å varsle deg om filoverføringer som blir tilgjengeligjort til deg.
{{% /notice %}}

**Forespørsel:** Filtre spesifisert i URL-en:

- resourceId - ressurs-ID for Broker-ressursen, påkrevd.
- status - gjeldende status for filoverføringen.
- recipientStatus - gjeldende status for deg som mottaker.
- from - DateTimeOffset for å filtrere fra.
- to - DateTimeOffset for å filtrere til.

Når du søker etter filer du ikke har lastet ned som mottaker, spesifiser følgende:

- resourceId - ressurs-ID for Broker-ressursen
- status = "published"
- recipientStatus = "initialized"

**Respons:** En liste over FileTransferIds i GUID-format.

**Eksempel:**

'Broker\search' i vår [Postman-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json).

**Hendelser utløst:** Ingen.

## Operasjon: Hent filoverføringsoversikt {#operation-get-filetransfer-overview}

**Endepunkt:** GET /broker/api/v1/filetransfer/{fileTransferId}

Få en enkel oversikt over filoverføringen med relevant metadata og gjeldende status og mottakerstatus.
Du kan bruke enten FileTransferId fra [published](#event-published) hendelse eller fra [søk](#operation-get-filetransfers).

**Respons:** En JSON-seralisert versjon av [FileTransferOverviewExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/FileTransferOverviewExt.cs).

**Hendelser utløst:** Ingen.

**Eksempel:** 'Broker\{fileTransferId}\overview' i vår [Postman-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json).

## Operasjon: Last ned fil {#operation-downloadfile}

**Endepunkt:** GET /broker/api/v1/filetransfer/{fileTransferId}/download

Last ned fildataene som en strøm ved hjelp av FileTransferId mottatt fra oversikt.

**Forespørsel**: FileTransferID spesifisert i URL-en, og dataene som en strøm.

**Returner**: En binær strøm som inneholder fildataene.

**Hendelser utløst**: Ingen

**Eksempel:** 'Broker\{fileTransferId}\download' i vår [Postman-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json).

## Operasjon: Bekreft nedlastet {#operation-confirmdownloaded}

Etter at du har lastet ned og behandlet filen vellykket, må du bruke denne operasjonen for å varsle løsningen om at filen er levert.
Dette vil oppdatere statusen for filoverføringen, og potensielt slette fildataene i henhold til innstillingene på Brokerressursen.

**Endepunkt:** POST /broker/api/v1/filetransfer/{fileTransferId}/confirmdownload

Last opp fildataene som en strøm ved hjelp av FileTransferId mottatt i InitializeFileTransfer.

**Forespørsel**: FileTransferID spesifisert i URL-en.

**Returner**: HTTP 200 hvis vellykket gjennomført.

**Hendelser utløst**:

- [downloadconfirmed](#event-downloadconfirmed).

**Eksempel:** 'Broker\{fileTransferId}\confirm download' i vår [Postman-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn3-broker-postman-collection.json).

## Hendelse: no.altinn.broker.published {#event-published}

Denne hendelsen utløses når den asynkrone opplastingsbehandlingsprosessen har blitt fullført vellykket.

Som mottaker kan du deretter bruke *FileTransferId* spesifisert i *resourceinstance* for å starte nedlastning av metadata og filinnhold.

## Hendelse: no.altinn.broker.downloadconfirmed {#event-downloadconfirmed}

Denne hendelsen utløses når du har bekreftet at nedlastingen er fullført vellykket, og den sendes også til avsenderen.
Du trenger ikke å utføre handlinger mot Broker, men det er en ekstra bekreftelse på at ConfirmDownload har gått vellykket, og du kan velge å bruke dette til å utløse en intern prosess på din side.

## Hendelse: no.altinn.broker.fileneverconfirmeddownloaded {#event-fileneverconfirmeddownloaded}

Denne hendelsen utløses ved utløpstiden for filoverføringen i tilfelle en eller flere mottakere ikke har bekreftet nedlastingen av filen.
Dette kan indikere at enten mottakeren ikke har vært klar over filoverføringen, eller at de har lastet ned, men forsømt å kalle ConfirmDownload.
Denne hendelsen sendes også til de mottakere som ikke har bekreftet nedlastingen.
