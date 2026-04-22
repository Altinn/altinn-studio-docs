---
title: 'Activity'
description: 'Refererence information about the dialog activity entity'
weight: 30
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

The schema below shows the end-user activity entity returned from dialog details.

Activities are immutable timeline entries attached to a dialog. They are used to record state changes and notable events around the dialog and, optionally, around a specific transmission.

An activity contains:

- `id`
- `createdAt`
- `type`
- optional `extendedType`
- optional `transmissionId`
- `performedBy`
- `description`, which is only populated for `Information`

The implemented activity types are:

- `DialogCreated`
- `DialogClosed`
- `Information`
- `TransmissionOpened`
- `PaymentMade`
- `SignatureProvided`
- `DialogOpened`
- `DialogDeleted`
- `DialogRestored`
- `SentToSigning`
- `SentToFormFill`
- `SentToSendIn`
- `SentToPayment`
- `FormSubmitted`
- `FormSaved`
- `CorrespondenceOpened`
- `CorrespondenceConfirmed`

Activities complement transmissions. A transmission records the communication unit itself, while an activity records that something happened to the dialog or transmission.

Activity creation also feeds other Dialogporten features, including Altinn Events and the notification-condition APIs.


{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogActivity">}}

{{<children />}}
