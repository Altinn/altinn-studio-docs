---
title: 'Impersonating users'
description: 'How to impersonate a user in the service owner API for read operations'
weight: 40
---

{{<dialogportenswaggerselector>}}
{{<swaggerload>}} 

## Introduction

Service owners might want to offer custom views for Dialogporten data in their own portals. While it is possible for a service owner to [authenticate as an end-user system](/en/dialogporten/user-guides/service-owners/impersonating-users/../../authenticating/#id-porten-authentication), this has both usability and GDPR drawbacks, as it 1) requires the user to handle a consent dialog in ID-porten to grant the system access, and 2) grants the service owner access to user dialogs belonging to other service owners.

To alleviate this, Dialogporten offers a way to use the existing [service-owner authentication](/en/dialogporten/user-guides/service-owners/impersonating-users/../../authenticating/#usage-for-service-owner-systems) while additionally supplying an end-user ID to further filter the available dialogs. This results in a list of dialogs created by the service owner that the end user has access to, eliminating the need for ID-porten consent and avoiding the service owner getting access to any other dialogs the user might have access to.

## Basic steps

1. Authenticate against Dialogporten as a [service owner system](/en/dialogporten/user-guides/service-owners/impersonating-users/../../authenticating/#usage-for-service-owner-systems)
2. Authenticate the end-user in the service owner portal (via ID-porten or other means)
3. Construct an end-user ID, typically `urn:altinn:person:identifier-no:<11 digit Norwegian identifier number>`
4. Perform a call to `/api/v1/serviceowner/dialogs/?endUserId=urn:altinn:person:identifier-no:<11 digit norwegian identifier number>&Party=...&ServiceResource=...&<other filter parameters>`

## Searching for dialogs

Note that when impersonating users, the restrictions for the end-user API also apply here, notably that `serviceResource` and/or `party` must be supplied.

{{<swaggerdisplayoperation "get" "/api/v1/serviceowner/dialogs">}}

### Returned information

See the [dialog search DTO](/en/dialogporten/user-guides/service-owners/impersonating-users/../../../reference/entities/dialog#search-1) for full details.

## Getting dialog details

{{<swaggerdisplayoperation "get" "/api/v1/serviceowner/dialogs/{dialogId}">}}

### Returned information

See the [dialog details DTO](/en/dialogporten/user-guides/service-owners/impersonating-users/../../../reference/entities/dialog#details-1) for service owners for full details.

{{<children />}}
