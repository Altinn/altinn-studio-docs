---
title: InitializeCorrespondenceNotificationExt
linktitle: InitializeCorrespondenceNotificationExt
description: Beskrivelse av feltene i objektet

weight: 60
toc: true
---

Lenke til [InitializeCorrespondenceNotificationExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializeCorrespondenceNotificationExt.cs)

Brukes for en varsling knyttet til en spesifikk melding opprettet

### notificationTemplate
Type: [NotificationTemplateExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/Enums/NotificationTemplateExt.cs)

Spesifiserer hvilken av varslingsmalene som skal brukes for varslingen

### notificationChannel
Type: [NotificationChannelExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/Enums/NotificationChannelExt.csj)

Hvilken kommunikasjonskanal som skal brukes for varslingen
- Email
- Sms
- Email foretrukket
- Sms foretrukket

### reminderNotificationChannel
Type: [NotificationChannelExt?](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/Enums/NotificationChannelExt.cs)

Hvilken kommunikasjonskanal som skal brukes for revarslingen
- Email
- Sms
- Email foretrukket
- Sms foretrukket

### emailSubject
Type: _string?_

Emne for e-post hvis e-post er valgt som varslingskanal

### emailBody
Type: _string?_

Innhold for e-post hvis e-post er valgt som varslingskanal

### smsBody
Type: _string?_

Innhold for sms hvis sms er valgt som varslingskanal

### sendReminder
Type: _string?_

Brukes til å bestemme om en revarsling skal sendes hvis meldingen ikke er blitt lest innen 7 dager

### reminderEmailSubject
Type: _string?_

Emne for revarslingen sin e-post hvis e-post er valgt som varslingskanal

### reminderEmailBody
Type: _string?_

Innhold for revarslingen sin e-post hvis e-post er valgt som varslingskanal

### reminderSmsBody
Type: _string?_

Innhold for revarslingen sin sms hvis sms er valgt som varslingskanal

### requestedSendTime
Type: _DateTimeOffset?_

Når varslingen skal sendes til mottakerne. Hvis ingen tidspunkt er spesifisert, sendes varslingen 5 minutter etter at meldingen er publisert

### customNotificationRecipientExt
Type: [customNotificationRecipientExt?](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/CustomNotificationRecipientExt.cs)

En liste over valgfrie mottakere for varslingen. Hvis verdien ikke er satt, vil varslingen bli sendt til mottakeren av meldingen.
For mer informasjon om valgfrie mottakere, se [denne delen av dokumentasjonen](/correspondence/getting-started/developer-guides/notifications/#custom-recipients-for-notifications)