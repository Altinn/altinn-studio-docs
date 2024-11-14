---
title: Veiledning for avsender
linktitle: Send filer
description: Denne utviklerguiden hjelper deg med å komme i gang med å sende filer ved hjelp av Altinn Formidling.
tags: [Broker, guide, Formidling]
toc: true
weight: 10
---

{{<children />}}

{{% notice warning  %}}
Merk at dette avsnittet av dokumentasjonen fortsatt er under utvikling og derfor inneholder omfattende referanser til eksterne kilder.
{{% /notice %}}

Her finner du detaljerte API-operasjoner og hendelser som brukes ved filoverføring, inkludert operasjoner som initialisering av filoverføring, opplasting av filer og innhenting av filoverføringsstatus.

For mer informasjon, se vår [swagger-side](/api/broker/spec/) og [GitHub-repo](https://github.com/Altinn/altinn-broker), som også inneholder en Postman-samling med eksempler.

## Operasjon: Initialiser Filoverføring {#operation-initialize-filetransfer}

**Endepunkt:** POST /broker/api/v1/filetransfer/

Denne operasjonen initialiserer en filoverføring, inkludert validering av grunnleggende metadata og autorisasjon hvis mottaker(e) spesifisert er gyldige.

**Forespørsel**: En instans av [FileInitializeExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/FileTransferInitializeExt.cs) serialisert som JSON.

**Return**: HTTP 200 med GUID-en FileTransferID som er den unike ID-en brukt til å identifisere denne filoverføringen.

**Utløste hendelser**:

- Når fullført, blir hendelsen [filetransferinitialized](#event-filetransferinitialized) publisert til avsenderen, noe som indikerer at filoverføringen har blitt vellykket initialisert.

**Eksempel**: 'Broker\Intitialize' i vår [PostMan-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn-broker-postman-collection.json)

## Operasjon: Last opp strømmet {#operation-uploadStreamed}

**Endepunkt:** POST /broker/api/v1/filetransfer/{fileTransferId}/Upload

Last opp fildataene som en strøm ved hjelp av FileTransferId mottatt i InitialiserFileTransfer.

**Forespørsel**: FileTransferID spesifisert i URLen, og dataene som en strøm.

**Return**: HTTP 200 hvis vellykket fullført.

**Utløste hendelser**:

- Ved fullføring blir hendelsen [uploadprocessing](#event-uploadprocessing) publisert, og en asynkron jobb vil kjøre for å sjekke fildataene for skadelig programvare.
- Når opplastingsbehandlingen har blitt vellykket fullført, blir hendelsen [published](#event-published) publisert, og filen er tilgjengelig for nedlasting.
  - Hvis skadelig programvare ble oppdaget, blir hendelsen [uploadfailed](#event-uploadfailed) i stedet publisert.

**Eksempel**: 'Broker\{fileTransferId}\upload' i vår [PostMan-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn-broker-postman-collection.json)

## Operasjon: Hent Filoverføringsoversikt {#operation-get-filetransfer-overview}

**Endepunkt:** GET /broker/api/v1/filetransfer/{fileTransferId}

Få en enkel oversikt over filoverføringen med gjeldende status og mottakerstatus.

**Respons**: En JSON-seralisert versjon av [FileTransferOverviewExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/FileTransferOverviewExt.cs)

**Utløste hendelser**: ingen.

**Eksempel**: 'Broker\{fileTransferId}\overview' i vår [PostMan-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn-broker-postman-collection.json)

## Operasjon: Hent Filoverføringsdetaljer {#operation-get-filetransfer-details}

**Endepunkt:** GET /broker/api/v1/filetransfer/{fileTransferId}/details

Få en detaljert visning av filoverføringen, inkludert detaljerte filoverførings- og mottakerstatuser. Nyttig for feilsøking, men bør brukes sparsomt.

**Forespørsel**: FiletransferId spesifisert i URLen.

**Respons**: En JSON-seralisert versjon av [FileTransferStatusDetailsExt](https://github.com/Altinn/altinn-broker/blob/main/src/Altinn.Broker.API/Models/FileTransferStatusDetailsExt.cs)

**Utløste hendelser**: ingen.

**Eksempel**: 'Broker\{fileTransferId}\details' i vår [PostMan-samling](https://github.com/Altinn/altinn-broker/blob/main/altinn-broker-postman-collection.json)

## Hendelse: no.altinn.broker.filetransferinitialized {#event-filetransferinitialized}

Denne hendelsen utløses når initialiseringsoperasjonen har blitt fullført vellykket.
Som Avsender kan du nå laste opp fildataene dine.

## Hendelse: no.altinn.broker.uploadprocessing {#event-uploadprocessing}

Denne hendelsen utløses når opplastingsoperasjonen har blitt fullført vellykket, og fildataene venter på opplastingsbehandling.
Frem til du mottar enten uploadfailed eller published, trenger ingen handlinger å utføres.

## Hendelse: no.altinn.broker.uploadfailed {#event-uploadfailed}

Denne hendelsen utløses hvis enten opplastings- eller opplastingsbehandlingsstegene mislykkes. Vi anbefaler deg å kalle [get overview](#operation-get-filetransfer-overview) for å sjekke hvilke feilmeldinger som ble gitt.

## Hendelse: no.altinn.broker.published {#event-published}

Denne hendelsen utløses når den asynkrone opplastingsprosessen har blitt fullført vellykket.
Som avsender trenger du ikke å utføre noen ekstra handlinger.

## Hendelse: no.altinn.broker.downloadconfirmed {#event-downloadconfirmed}

Denne hendelsen utløses når en mottaker har bekreftet at nedlastingen har blitt fullført vellykket.

## Hendelse: no.altinn.broker.allconfirmeddownloaded {#event-allconfirmeddownloaded}

Denne hendelsen utløses når alle mottakerne har bekreftet at nedlastingen har blitt fullført. Hvis FileTransfer har en enkelt mottaker, vil dette bli publisert samtidig som downloadconfirmed. Avhengig av innstillingene for formidlingstjenesten kan dette føre til at filen blir automatisk slettet.

## Hendelse: no.altinn.broker.fileneverconfirmeddownloaded {#event-fileneverconfirmeddownloaded}

Denne hendelsen utløses ved ExpiryTime for FileTransfer i tilfelle en eller flere mottakere ikke har bekreftet nedlastingen av filen. Dette kan indikere at enten mottakeren ikke var klar over FileTransfer eller at de har lastet ned, men unnlot å kalle ConfirmDownload. Denne hendelsen sendes også til mottaker(ne) som ikke har bekreftet nedlastingen.

Vi foreslår å bruke dataene som leveres i [hent filoverførings detaljer](#operation-get-filetransfer-details) for å undersøke hvilke handlinger mottakerne har utført på filoverføringen.

## Hendelse: no.altinn.broker.filedpurged {#event-filepurged}

Denne hendelsen utløses av filopprydningsprosessen ved Expiry av filen eller når alle mottakerne har bekreftet nedlastingen.

Etter dette punktet er fildataene ikke lenger tilgjengelige for nedlasting, selv om metadataene forblir.

