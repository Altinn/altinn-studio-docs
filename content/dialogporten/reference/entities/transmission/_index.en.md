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
- `authorizationAttribute`, which can override the default authorization resource used for the transmission
- `relatedTransmissionId`, which links the transmission to another transmission when the service owner wants to express that relation
- `content`, `attachments`, and `navigationalActions`, which contain the transmission-specific presentation and navigation data

In end-user APIs, `isAuthorized` tells you whether the authenticated user may access the transmission content. If access is denied, embedded content and transmission attachments are not available, and navigational URLs are rewritten to `urn:dialogporten:unauthorized`.

The service-owner APIs expose the same transmission concept in the service-owner dialog entity and service-owner transmission endpoints.


{{<swaggerdisplayentity "V1EndUserDialogsQueriesGet_DialogTransmission">}}

{{<children />}}
