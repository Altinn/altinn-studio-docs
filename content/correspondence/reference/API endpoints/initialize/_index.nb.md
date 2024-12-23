---
title: Initialisere
linktitle: Initialisere
description: Endepunkt for initialisering av en melding.

weight: 60
toc: true
---

## Endepunkt

POST /correspondence/api/v1/correspondence

## Beskrivelse

Dette endepunktet oppretter en melding og legger den i kø for sending. Før du bruker dette endepunktet, må eventuelle tilhørende vedlegg lastes opp på forhånd for å fylle ut feltet "ExistingAttachments". Dette kan gjøres ved å bruke endepunktet beskrevet [her](https://docs.altinn.studio/api/correspondence/spec/#/Attachment/post_correspondence_api_v1_attachment__attachmentId__upload).

<!-- (will add link here when doc is ready) -->

## Autentisering

Dette API-et krever autentisering, og forespørselen må også inkludere:

- Correspondence write scope **altinn:correspondence.write** (for eksterne kall)

Se [Autentisering og Autorisasjon](/notifications/reference/api/#authentication--authorization) for mer informasjon.

## Request body

### Content-Type (Innholdstype)

- application/json

### Request body

Request body må bestå av melding(er) i requesten på formatet i [InitializeCorrespondencesRequest](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializeCorrespondencesExt.cs)

### Påkrevde felter i requesten

#### correspondence

Type: [BaseCorrespondenceExt](/correspondence/reference/api-endpoints/initialize/basecorrespondenceext/)

Meldingen(e) som skal opprettes.

#### recipients

Type: _List\<string>_

Liste of mottakere til meldingen(ene). Dette kan enten være organisasjonsnummer eller personnummer.

For _organisasjonsnummer_, er mottakerne nødt til å ha med prefiksen `urn:altinn:organization:identifier-no` foran organisasjonsnummeret. For eksempel "urn:altinn:organization:identifier-no:123456789"

For _personnummer_, the must have the prefix `urn:altinn:person:identifier-no` in front of the identity number. For eksempel "urn:altinn:person:identifier-no:01019912345"

### Valgfrie felter i requesten

#### existingAttachments

Type: _List\<string>_

Liste med ID(er) til vedlegg(ene) som skal inkluderes med meldingen(e). Disse må lastes opp på forhånd ved å bruke **attachment** sitt endepunkt.

## Respons

### Responskoder

- 200 OK: Responsen har blitt vellykket initialisert
- 400 Bad Request: Requesten var ugyldig. Se problemdetaljer i responskroppen for mer informasjon.
- 401 Unauthorized: Indikerer en manglende, ugyldig eller utløpt autorisasjonsheader.
- 403 Forbidden: Indikerer at nødvendig omfang eller plattformtilgangstoken mangler eller er ugyldig.

### Content-Type (Innholdstype)

application/json

### Response body

Respons body returnerer en liste over meldinger [InitializeCorrespondencesResponseExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializeCorrespondencesResponseExt.cs), med en melding for hver mottaker.
Nedenfor er en kort beskrivelse av hver av feltene.

#### correspondences
Type: [List\<InitializedCorrespondencesExt>](/correspondence/reference/api-endpoints/initialize/initializedcorrespondencesext/)

Informasjon on meldingen(e) som ble opprettet.
#### attachmentIds
Type: _List\<Guid>_

ID(ene) til vedleggene som ble inkludert med meldingen(e).