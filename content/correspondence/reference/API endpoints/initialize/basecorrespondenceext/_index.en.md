---
title: BaseCorrespondenceExt
linktitle: BaseCorrespondenceExt
description: Description of the properties for the object

weight: 60
toc: true
---
Link to [BaseCorrespondenceExt](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/BaseCorrespondenceExt.cs)

Represents a request object for the operation, InitializeCorrespondence, that can create a correspondence in Altinn.

### resourceId

Type: _string_

The ID for the resource associated with the correspondence

### sender

Type: _string_

The sender of the correspondence.

### sendersReference

Type: _string_

Used by senders and receiver to identify a specific Correspondence using external identification methods.

### messageSender

Type: _string?_

An alternative name for the sender of the correspondence. The name will be displayed instead of the organization name.

### content

Type: [InitializeCorrespondenceContentExt](/correspondence/reference/api-endpoints/initialize/initializecorrespondencecontentext)

The correspondence content. Contains information about the title, body, etc.

### requestedPublishTime

Type: _DateTimeOffset?_

When the correspondence should become visible to the recipient.
If value is set to `null` during initialization, the correspondence is published immediately. 

### allowSystemDeleteAfter

Type: _DateTimeOffset?_

The date for when Altinn can remove the correspondence from its database

### dueDateTime

Type: _DateTimeOffset?_

The date and time for when the recipient must reply.

### externalReferences

Type: [List\<ExternalReferencesExt>?](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/ExternalReferenceExt.cs)

A list of references senders can use to tell the recipient that the correspondence is related to the referenced item(s).
Examples include Altinn App instances, Altinn Broker file transfers.

### propertyList

Type: _Dictionary\<string, string>_

User-defined properties related to the Correspondence.

### replyOptions

Type: [List\<CorrespondenceReplyOptions>](https://github.com/Altinn/altinn-correspondence/blob/main/src/Altinn.Correspondence.API/Models/CorrespondenceReplyOptionExt.cs)

Options for how the recipient can reply to the correspondence by accessing one or more URLs.

### notification

Type: [InitializeCorrespondenceNotificationExt?](/correspondence/reference/api-endpoints/initialize/initializecorrespondencenotificationext)

Notifications directly related to the correspondence

### ignoreReservation

Type: _bool?_, false if not specified otherwise

Specifies whether the correspondence can override reservation against digital communication in the __Contact and Reservation Register (KRR)__

### published

Type: _DateTimeOffset?_

The date and time of which the correspondence was published. 

### isConfirmationNeeded

Type: _bool?_, false if not specified otherwise

Specifies whether the recipient must confirm the correspondence have been read.
If confirmation is needed and the recipient has not confirmed the correspondence within the due date, this will result in the event `CorrespondenceRecipientNeverConfirmed` being published.