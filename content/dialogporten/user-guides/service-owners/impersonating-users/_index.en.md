---
title: 'Impersonating users'
description: 'How to impersonate a user in the service owner API for read operations'
weight: 40
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}} 

## Introduction

Service owners might want to offer custom views for Dialogporten data in their own portals. While it is possible for a service owner to [authenticate as a end-user system]({{<relref "../../authenticating/#id-porten-authentication">}}), this has both usability and GDPR drawbacks as it 1) requires the user to handle a consent dialog in ID-porten to grant the system access, and 2) grants the service owner access to user dialogs belonging to other service owners. 

To alleviate this, Dialogporten offers a way to utilize the (already employed) [service owner authentication]({{<relref "../../authenticating/#usage-for-service-owner-systems">}}) and additionally supplying a end-user id to further filter the available dialogs. This results in a list of dialogs created by the service owner which the end user has access to, eliminating the need for a ID-porten consent and avoids that the service owner gets access to any other dialogs that the user might have access to.

## Basic steps

1. Authenticate against Dialogporten as a [service owner system]({{<relref "../../authenticating/#usage-for-service-owner-systems">}})
2. Authenticate the end-user in the service owner portal (via ID-porten or other means)
3. Construct a end-user id (typically `urn:altinn:person:identifier-no:<11 digit norwegian identifier number>`)
4. Perform a call to `/api/v1/serviceowner/dialogs/?endUserId=urn:altinn:person:identifier-no:<11 digit norwegian identifier number>&Party=...&ServiceResource=...&<other filter parameters>`

## Searching for dialogs

Note than when impersonating users, the restrictions for the end-user API also apply here - notably that `serviceResource` and/or `party` must be supplied.

{{<swaggerdisplayoperation "get" "/api/v1/serviceowner/dialogs">}}

### Returned information

See the [dialog search DTO]({{<relref "../../../reference/entities/dialog#search-1">}}) for full details.

## Getting dialog details

{{<swaggerdisplayoperation "get" "/api/v1/serviceowner/dialogs/{dialogId}">}}

### Returned information

See the [dialog details DTO]({{<relref "../../../reference/entities/dialog#details-1">}}) for service owner for full details.

{{<children />}}
