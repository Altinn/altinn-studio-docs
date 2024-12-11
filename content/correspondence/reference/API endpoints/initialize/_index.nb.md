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

- Correspondence write scope __altinn:correspondence.write__ (for eksterne kall)

Se [Autentisering og Autorisasjon](/notifications/reference/api/#authentication--authorization) for mer informasjon.

## Request body

[Du kan se et eksempel på en request body her](https://docs.altinn.studio/api/correspondence/spec/#/Correspondence/post_correspondence_api_v1_correspondence)

## Respons

### Responskoder

- 200 OK: Responsen har blitt vellykket initialisert

  Se problemdetaljer i responskroppen for mer informasjon.
- 401 Unauthorized: Indikerer en manglende, ugyldig eller utløpt autorisasjonsheader.
- 403 Forbidden: Indikerer at nødvendig omfang eller plattformtilgangstoken mangler eller er ugyldig.

### Innholdstype

- application/json

### Response body 

Respons body returnerer en liste over meldinger [InitializeCorrespondencesResponseExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializeCorrespondencesResponseExt.cs), med en melding for hver mottaker. Hver melding kan ha flere forskjellige mottakere hvor hver mottaker vil få en unik correspondenceId, status, etc.

### Response body egenskaper

#### correspondenceId
Type: _Guid_

ID-en til meldingen som har blitt initialisert

#### status
Type: _string_

[De forskjellige statusene er definert her](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/Enums/CorrespondenceStatusExt.cs)

Viser statusen til den initialiserte meldingen

#### recipient
Type: _string_

Viser mottakeren i formatet 0192:{{recipientOrgNumber}}

#### notifications
Type: _Liste over [InitializedCorrespondencesNotificationsExt](https://docs.altinn.studio/api/correspondence/spec/#/Correspondence/post_correspondence_api_v1_correspondence)_

En liste over de genererte varslene med sendingsresultat. Hvert varsel vil inkludere følgende egenskaper:

- _orderId_: ID-en til ordren.
- _isReminder_: en boolsk verdi som indikerer om varselet er en påminnelse eller ikke.
- _status_: viser statusen til varselet i det tidspunktet meldingen(e) ble opprettet.

| Status            | Beskrivelse                                                                 |
|:-----------------:|:---------------------------------------------------------------------------:|
| Success           | Varselordren ble opprettet vellykket med kontaktinformasjon til __minst en__ av mottakerne til varslingen.       |
| MissingContact    | Kontaktinformasjon ble __ikke funnet for noen__ av mottakerne av varslingen. |
| Failure           | Opprettelse av varselordre mislyktes på grunn av en feil.  |