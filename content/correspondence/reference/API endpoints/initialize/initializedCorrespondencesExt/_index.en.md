---
title: InitializedCorrespondencesExt
linktitle: InitializedCorrespondencesExt
description: Description of the properties for the object

weight: 60
toc: true
---
Link to [InitializeCorrespondenceContentExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializeCorrespondenceContentExt.cs)

#### correspondenceId

Type: _Guid_

The ID of the correspondence that has been initialized

#### status

Type: [CorrespondenceStatusExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/Enums/CorrespondenceStatusExt.cs)

Shows the status of the initialized correspondence

#### recipient

Type: _string_

The recipient of the correspondence

#### notifications

Type: [List\<InitializedCorrespondencesNotificationsExt>](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/InitializedCorrespondencesNotificationsExt.cs)

A list of the generated notifications with send results. Each notification will include the following properties:

- **orderId**: the ID of the order.
- **isReminder**: a boolean indicating whether the notification is a reminder or not.
- **status**: shows the status of the notification at the time of creating the correspondence(s).

|     Status     |                                                            Description                                                            |
| :------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
|    Success     | Notification order was created successfully with contact information for **at least one** of the recipients for the notification. |
| MissingContact | Contact information was not found for **any of** the recipients for the notification at the time of creating the correspondence.  |
|    Failure     |                                        Creating notification order failed due to an error.                                        |
