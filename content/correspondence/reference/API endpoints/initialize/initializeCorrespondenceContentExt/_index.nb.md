---
title: InitializeCorrespondenceContentExt
linktitle: InitializeCorrespondenceContentExt
description: Beskrivelse av feltene i objektet

weight: 60
toc: true
---

Lenke til [InitializeCorrespondenceContentExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializeCorrespondenceContentExt.cs)

Representerer innholdet i en melding.
### language
Type: _string_

Språket for melding, spesifisert i henhold til ISO 639-1.

### messageTitle
Type: _string_

Emnet for meldingen.

### messageSummary
Type: _string_

Sammendragsteksten for meldingen.

### messageBody
Type: _string_

Hovedinnholdet i meldingen.

### attachments
Type: [List\<InitializeCorrespondenceAttachmentExt>](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializeCorrespondenceAttachmentExt.cs) 

Liste over vedlegg som skal lastes opp _med_ meldingen, ved bruk av __upload__ endepunktet.