---
title:  Events in Altinn 3 Correspondence
linktitle: Events
description: How to get started subscribing to Events from Altinn 3 Correspondence, for developers
tags: [Correspondence, guide, events]
toc: true
weight: 40
---

{{<children />}}

{{% notice warning  %}}
This section of the documentation is a work in progress, and as such currently makes extensive reference to external sources.
{{% /notice %}}

{{% notice warning  %}}
Currently the Events for Correspondence are not ready for full-scale use, due to pending changes in Altinn Events and Authorization.
This documents the expected scenario, but may be subject to change.
{{% /notice %}}

In order to use events/webhooks for a Correspondence resource, you need to setup a subscription for the given resource.
This subscription is used to configure the endpoint where the events published by correspondence end up. [You can read more about how to setup an Events subscription in Altinn Events here](/events/subscribe-to-events/developer-guides/setup-subscription/).

All Events published by Altinn Correspondence follow the same pattern:

```json
{
 "id": "1faa107f-3c0a-4fa6-9fce-7cee8838e258",
 "resource": "urn:altinn:resource:altinn-correspondence-test-resource-1",
 "resourceinstance": "da4ceacc-ad44-4e54-99b6-b58e3c13c785",
 "source": "https://platform.tt02.altinn.no/correspondence/api/v1/correspondence",
 "specversion": "1.0",
 "type": "no.altinn.correspondence.Published",
 "subject": "/party/50015641",
 "alternativesubject": "/organisation/123456789",
 "time": "2024-04-19T07:22:19.438039Z"
}
```

## Event Subscription {#event-subcription}

This subscription is used to configure the endpoint where the events published by correspondence end up. [You can read more about how to setup an Events subscription in Altinn Events here](/events/subscribe-to-events/developer-guides/setup-subscription/).

You are required to set up the following filters:

- sourceFilter
  - TT02: <https://platform.tt02.altinn.no/correspondence/api/v1/correspondence>
  - PROD: <https://platform.altinn.no/correspondence/api/v1/correspondence>
- resourceFilter
  - "urn:altinn:resource:" + The Resource Id for the Correspondence Resource
- alternativesubjectfilter
  - "/organisation/(organisation number for your organisation) or /person/(SSN number)

*Alternativesubjectfilter* is used to restrict the event to only the authorized sender or recipient for that particular event, this ensures security and reduces visibility.

*Resourceinstance* will always be the same as the FileTransferId of the FileTransfer.

In addition you may wish to use filters for Type, so that you receive the event types you are interested in/can perform actions on.
If you do not specify a Type Filter you will receive all the different types of events if you have access to them.

**For Senders:**
- `no.altinn.correspondence.attachmentinitialized`
- `no.altinn.correspondence.attachmentuploadprocessing`
- `no.altinn.correspondence.attachmentpublished`
- `no.altinn.correspondence.attachmentuploadfailed`
- `no.altinn.correspondence.attachmentpurged`
- `no.altinn.correspondence.attachmentdownloaded`


- `no.altinn.correspondence.correspondenceinitialized`
- `no.altinn.correspondence.correspondencearchived`
- `no.altinn.correspondence.correspondencepurged`
- `no.altinn.correspondence.correspondencepublishfailed`
- `no.altinn.correspondence.correspondencereceiverread`
- `no.altinn.correspondence.correspondencereceiverconfirmed`
- `no.altinn.correspondence.Correspondencereceiverreserved`


**For both Senders And Recipients:**
- `no.altinn.correspondence.correspondencepublished`
- `no.altinn.correspondence.correspondencereceiverneverread`
- `no.altinn.correspondence.correspondencereceiverneverconfirmed`


