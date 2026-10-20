---
draft: true
title: Slik tar du imot vedlegg i skjemaet
linktitle: Vedlegg i skjemaet
description: Slik legger du til en vedleggskomponent i skjemaet og setter opp filtyper, antall filer og merking.
weight: 10
tags: [needsReview]
---

Du legger til komponenten `FileUpload` i Designer. Du kan bruke flere vedleggskomponenter i samme skjema. Hvor mange du trenger, avhenger av hvilke dokumenter du ber om, og av hvilke begrensninger du vil sette for hver dokumenttype.

Her er de viktigste valgene:

- **Filtyper:** Du kan begrense hvilke filtyper brukerne kan laste opp. Brukerne får en feilmelding hvis de prøver å laste opp en annen filtype.
- **Antall filer:** Du bestemmer det minste og det største antallet filer brukeren skal laste opp.
- **Filstørrelse:** Du bestemmer hvor store filene kan være, målt i MB.
- **Merking:** Du kan la brukeren merke hver fil, for eksempel med dokumenttype, med en nedtrekksliste. Du kobler kodelisten til `FileUpload` med `optionsId`. Ledeteksten som brukerne ser når de velger merking, setter du med `textResourceBindings.tagTitle`.
- **Varsel ved sletting:** Med `alertOnDelete` åpner appen et varsel når brukeren klikker på **Slett**. Appen viser ikke varsel hvis du ikke setter egenskapen.

[[FIX BEFORE MERGE: skjermbilde av innstillingene for FileUpload i Designer, med filtyper, antall filer og filstørrelse synlige. Filnavn: fileupload-innstillinger.png. Alt-tekst: Innstillinger for vedleggskomponenten i Altinn Studio Designer]]

[[FIX BEFORE MERGE: skjermbilde av FileUpload med merking slik den ser ut i Designer. Filnavn: fileupload-merking-designer.png. Alt-tekst: Innstillinger for merking av vedlegg i Altinn Studio Designer]]

[[FIX BEFORE MERGE: skjermbilde av vedleggskomponenten med merking slik brukeren ser den i skjemaet, etter at en fil er lastet opp. Filnavn: fileupload-merking-skjema.png. Alt-tekst: Vedleggskomponenten med nedtrekksliste for merking av en opplastet fil]]

Du finner alle egenskapene på siden om [`FileUpload`]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/FileUpload" >}}).

{{% notice warning %}}
Komponenten `FileUploadWithTag` finnes ikke lenger. Du bruker `FileUpload` også når brukeren skal merke filene.
{{% /notice %}}

## Gjøre opplasting obligatorisk

Egenskapen `required` virker ikke på `FileUpload`. Vil du kreve at brukeren laster opp minst én fil, setter du `minNumberOfAttachments` til 1 eller mer. Setter du den til 0, kan brukeren sende inn uten å laste opp noe.

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json
{
  "id": "attest",
  "type": "FileUpload",
  "minNumberOfAttachments": 1,
  "alertOnDelete": true
}
```

## La brukeren merke filene

Vil du at brukeren skal merke hver fil, kobler du en kodeliste til komponenten og setter en ledetekst for merkingen.

{{< code-title >}}
App/ui/{taskId}/layouts/{page}.json
{{< /code-title >}}

```json
{
  "id": "attest",
  "type": "FileUpload",
  "minNumberOfAttachments": 1,
  "optionsId": "dokumenttyper",
  "textResourceBindings": {
    "tagTitle": "attest.merking"
  }
}
```

`dokumenttyper` er id-en til kodelisten, og `attest.merking` er nøkkelen til teksten brukeren ser.

## Endre id-en til datatypen

Når du bruker Designer, får datatypen en tilfeldig kode som id (en GUID). Vil du bruke et navn som er lettere å lese, må du endre id-en to steder: i `App/config/applicationmetadata.json` og i layoutfilen der komponenten ligger.

## Se også

- [Slik tar du imot vedlegg via API]({{< relref "/altinn-studio/v9/develop-a-service/data/attachments/how-to/api" >}})
- [Egenskaper på datatypen for vedlegg]({{< relref "/altinn-studio/v9/develop-a-service/data/attachments/reference/datatype" >}})
