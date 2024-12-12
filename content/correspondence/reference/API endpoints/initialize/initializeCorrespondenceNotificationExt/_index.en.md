---
title: InitializeCorrespondenceNotificationExt
linktitle: InitializeCorrespondenceNotificationExt
description: Description of the properties for the object

weight: 60
toc: true
---

Link to [InitializeCorrespondenceNotificationExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializeCorrespondenceNotificationExt.cs)

Used to specify a single notification connected to a specific Correspondence during the Initialize Correspondence operation

### notificationTemplate
Type: [NotificationTemplateExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/Enums/NotificationTemplateExt.cs)

Specifies which of the notification templates to use for the notification

### notificationChannel
Type: [NotificationChannelExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/Enums/NotificationChannelExt.csj)

Which channel to use for the notification
- Email
- Sms
- Email preferred
- Sms preferred

### reminderNotificationChannel
Type: [NotificationChannelExt?](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/Enums/NotificationChannelExt.cs)

Which channel to use for the reminder notification
- Email
- Sms
- Email preferred
- Sms preferred

### emailSubject
Type: _string?_

Subject for email if email is chosen as notification channel

### emailBody
Type: _string?_

Body for email if email is chosen as notification channel

### smsBody
Type: _string?_

Body for sms if sms is chosen as notification channel

### sendReminder
Type: _string?_

Used to decide a reminder be sent if the notification is not confirmed within 7 days

### reminderEmailSubject
Type: _string?_

Subject for reminder email if email is chosen as notification channel

### reminderEmailBody
Type: _string?_

Body for reminder email if email is chosen as notification channel

### reminderSmsBody
Type: _string?_

Body for reminder sms if sms is chosen as notification channel

### requestedSendTime
Type: _DateTimeOffset?_

When the notification should be sent to the recipients. If none are specified, the notification is sent 5 minutes after the correspondence has been published

### customNotificationRecipientExt
Type: [customNotificationRecipientExt?](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/CustomNotificationRecipientExt.cs)

A list of custom recipients for the notification. If not set, the notification will be sent to the recipient of the Correspondence.
For more details about custom recipients see [this part of the documentation](/correspondence/getting-started/developer-guides/notifications/#custom-recipients-for-notifications)