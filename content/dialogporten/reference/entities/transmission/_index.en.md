---
title: 'Transmission'
description: 'Reference information about the transmission entity'
weight: 20
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}}

The schema below shows the end-user transmission entity returned from dialog details.

A transmission represents one immutable communication unit inside a dialog. The transmission list can only be appended to; existing transmissions are not updated or removed.

Important parts of the transmission model are:

- `type`, which indicates the implemented transmission category such as `Information`, `Acceptance`, `Rejection`, `Request`, `Alert`, `Decision`, `Submission`, or `Correction`
- `sender`, which identifies whether the transmission came from the service owner or a party representative
- an [authorization context]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) (preferred), which can evaluate access to the transmission against a different resource, additional parties, or both
- `authorizationAttribute` (deprecated), which can override the default authorization resource used for the transmission
- `relatedTransmissionId`, which links the transmission to another transmission when the service owner wants to express that relation
- `content`, `attachments`, and `navigationalActions`, which contain the transmission-specific presentation and navigation data

In end-user APIs, `isAuthorized` tells you whether the authenticated user may access the transmission content. If access is denied, the transmission's `unauthorizedPresentation` decides what remains visible: `Disabled` masks URLs and embedded content but keeps the rest of the content, while `Redacted` additionally clears the content and empties `attachments`/`navigationalActions`, leaving only enough fields to show the transmission exists. Either way the transmission itself is never removed from the list. `contextToken` is present when the transmission carries an authorization context the current user is authorized for, and must be used instead of the dialog token against the transmission's URLs, including for [front channel embeds]({{< relref "/dialogporten/reference/front-end/front-channel-embeds" >}}).

The service-owner APIs expose the same transmission concept in the service-owner dialog entity and service-owner transmission endpoints.


{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogTransmission">}}

**Read more**

- {{<link "../../authorization/authorization-contexts">}}
- {{<link "../../authorization/context-tokens">}}

{{<children />}}
