---
title:  Events in Altinn 3 Correspondence
linktitle: Events
description: How to get started subscribing to Events from Altinn 3 Correspondence, for developers
tags: [Correspondence, guide, events]
toc: true
weight: 40
---

{{<children />}}

In order to use events/webhooks for a Correspondence resource, you need to setup a subscription for the given resource.
This subscription is used to configure the endpoint where the events published by correspondence end up.

All Events published by Altinn Correspondence follow the same pattern:

```json
{
 "id": "1faa107f-3c0a-4fa6-9fce-7cee8838e258",
 "resource": "urn:altinn:resource:altinn-correspondence-test-resource-1",
 "resourceinstance": "da4ceacc-ad44-4e54-99b6-b58e3c13c785",
 "source": "https://platform.tt02.altinn.no/correspondence/api/v1/correspondence",
 "specversion": "1.0",
 "type": "no.altinn.correspondence.correspondencepublished",
 "subject": "urn:altinn:organization:identifier-no:123456789",
 "alternativesubject": "/organisation/123456789",
 "time": "2024-04-19T07:22:19.438039Z"
}
```

## Event Subscription {#event-subcription}

This subscription is used to configure the endpoint where the events published by correspondence end up. [You can read more about how to setup an Events subscription in Altinn Events here](/en/events/subscribe-to-events/developer-guides/setup-subscription/).

**For service owners**, you are required to set up the following filter:

- resourceFilter
  - "urn:altinn:resource:" + The Resource Id for the Correspondence Resource

**For recipients**, you are required to set up the following filters:

- resourceFilter
  - "urn:altinn:resource:" + The Resource Id for the Correspondence Resource
- subjectFilter
  - "urn:altinn:organization:identifier-no:{{recipient_orgnumber}}"

*SubjectFilter* is used to restrict the event to only the authorized recipient for that particular event, this ensures security and reduces visibility.

*Resourceinstance* will always be the same as the CorrespondenceId of the Correspondence.

The *source* for events produced by Correspondence is:

- TT02 (test): <https://platform.tt02.altinn.no/correspondence/api/v1/correspondence>
- Production: <https://platform.altinn.no/correspondence/api/v1/correspondence>

In addition you may wish to use filters for Type, so that you receive the event types you are interested in/can perform actions on.
If you do not specify a Type Filter you will receive all the different types of events if you have access to them.

**For service owners:**

| Event | When | Usage |
|-------|------|-------|
| `no.altinn.correspondence.attachmentinitialized` | Attachment has been created and is awaiting upload | Confirmation that attachment has been initialized |
| `no.altinn.correspondence.attachmentpublished` | Attachment has passed malware scanning and is ready for use | Confirmation that attachment is available and can be used in new correspondences |
| `no.altinn.correspondence.attachmentuploadfailed` | Attachment failed malware scanning | Notification that the attachment has been rejected |
| `no.altinn.correspondence.attachmentexpired` | Attachment expiration time has passed, it is no longer available to the recipient and cannot be used in new correspondences | Confirmation that attachment has expired |
| `no.altinn.correspondence.correspondenceinitialized` | Correspondence has been initialized | Confirmation that correspondence has been initialized |
| `no.altinn.correspondence.correspondencepublished` | Correspondence has been published and is available to the recipient | Confirmation and notification that correspondence has been successfully published |
| `no.altinn.correspondence.correspondencepurged` | Correspondence has either been purged by the recipient after publishing, or by the service owner before publishing | Notification that correspondence has been purged |
| `no.altinn.correspondence.correspondencepublishfailed` | Correspondence publish failed | Notification that correspondence failed before publish and will not be made available to the recipient |
| `no.altinn.correspondence.notificationcreated` | Notification order has been created in Altinn Notification | Confirmation that notification has been ordered |
| `no.altinn.correspondence.correspondencenotificationcreationfailed` | Creation of notification order failed, for example because recipient was missing contact information | Notification that the notification order was not successfully placed. Consider follow-up |
| `no.altinn.correspondence.correspondencenotificationfailed` | Delivery to one or more notification addresses failed (partial failure) | At least one address was successfully notified, but not all. Consider follow-up |
| `no.altinn.correspondence.correspondencenotificationallfailed` | Delivery to all notification addresses failed — recipient was not notified | Notification that the recipient was not successfully notified. Consider follow-up |
| `no.altinn.correspondence.correspondencenotificationdelivered` | The initial notification has been confirmed delivered | Confirmation that recipient has been notified |
| `no.altinn.correspondence.correspondencenotificationreminderdelivered` | The reminder notification has been confirmed delivered | Confirmation that reminder has been sent |

**For each recipient:**

| Event | When | Usage |
|-------|------|-------|
| `no.altinn.correspondence.correspondencepublished` | Correspondence has been published and is available | Recipient can fetch the content |
| `no.altinn.correspondence.correspondencereceiverread` | Recipient has read the correspondence | Track read status |
| `no.altinn.correspondence.correspondencereceiverconfirmed` | Recipient has confirmed the correspondence | Track confirmation of correspondence |
| `no.altinn.correspondence.correspondencereceiverneverread` | Due date passed without the recipient reading the correspondence | Trigger reminders or escalation flow |
| `no.altinn.correspondence.correspondencereceiverneverconfirmed` | Due date passed without the recipient confirming the correspondence | Trigger reminders or escalation flow |
