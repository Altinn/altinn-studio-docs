---
title: InitializeCorrespondenceContentExt
linktitle: InitializeCorrespondenceContentExt
description: Description of the properties for the object

weight: 60
toc: true
---

Link to [InitializeCorrespondenceContentExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializeCorrespondenceContentExt.cs)

Represents the content of a reported element of the type correspondence.
### language
Type: _string_

The language for the correspondence, specified according to ISO 639-1.

### messageTitle
Type: _string_

The message subject.

### messageSummary
Type: _string_

The summary text of the correspondence.

### messageBody
Type: _string_

The main body of content of the correspondence.

### attachments
Type: [List\<InitializeCorrespondenceAttachmentExt>](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializeCorrespondenceAttachmentExt.cs) 

List of attachments to be uploaded _with_ the correspondence, using the __upload__ endpoint.