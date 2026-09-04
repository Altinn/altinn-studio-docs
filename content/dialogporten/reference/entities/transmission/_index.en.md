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

In end-user APIs, `isAuthorized` tells you whether the authenticated user may access the transmission content. If access is denied, the transmission's `unauthorizedPresentation` decides what happens: `Disabled` keeps the transmission in the list, masks its embedded content reference and the URLs of its children, and keeps the rest of the content readable, while `Excluded` removes the transmission from `transmissions` altogether and records its id and creation time in `excludedTransmissions` beside it - its children go with it. When the transmission carries an authorization context the current user is authorized for, the dialog token lists the transmission's `id` (or the context's `tokenRef`) in its `e` claim; the dialog token is used against the transmission's URLs as usual, including for [front channel embeds]({{< relref "/dialogporten/reference/front-end/front-channel-embeds" >}}).

The standalone transmission endpoints follow the same rule: `GET` by ID returns `403 Forbidden` for an excluded transmission, and the transmission list simply leaves it out.

The service-owner APIs expose the same transmission concept in the service-owner dialog entity and service-owner transmission endpoints.


{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogTransmission">}}

**Read more**

- {{<link "../../authorization/authorization-contexts">}}
- {{<link "../../authorization/dialog-tokens">}}

{{<children />}}
