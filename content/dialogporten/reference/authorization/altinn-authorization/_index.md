---
title: 'Altinn Authorization'
description: 'Technical overview of how Dialogporten integrates with Altinn Authorization'
weight: 1
---

## Introduction

Dialogporten is fully integrated with Altinn Authorization, which is used for all authorization decisions made in Dialogporten. 

For performance reasons, there are two different ways that Altinn Authorization is utilized. 

## Authentication and coarse-grained authorization

Dialogporten performs basic authentication and scope-based authorization via self-contained access tokens issued by Maskinporten and ID-porten, and optionally exhanged at Altinn Token Exchange. 

**See also**
* {{<link "../../../user-guides/authenticating">}}


## Dialog list authorization

All list views in Dialogporten utilizes the [Authorized Parties API]({{<relref "../../../../authorization/guides/integrating-link-service/#integration-with-api-for-authorized-parties-issuers">}}), that yields a list of all parties the authenticated user can represent along with all roles/access packages and service/instance rights that user has been granted for each party.

Dialogporten maintains a map of which roles/access packages grant rights to each resource in the resource registry, and uses that to fetch only dialogs referring to service resources that the user has some kind of access to. Which actions (read, write, etc) are not considered - any right for the given party for the given resource is sufficient to see the dialog in the dialog list.

As only one request (for a given party/service resource tuple) will have to be performed within a cache TTL window, re-sorting/filtering and pagination does not require additional requests to Altinn Authorization, and can therefor be performed quickly.

## Dialog details authorization

For dialog details, the [PDP API]({{<relref "../../../../authorization/guides/integrating-link-service/#integration-with-pdp">}}) is utilized, allow for fine-grained authorization of the various actions and transmissions defined within the dialog.

All actions and transmissions are decorated with a `IsAuthorized` flag, which indicates to the end-user system whether or not the user has access. If not, all URLs are removed.

{{<notice warning>}}
While Dialogporten indicates that the action is unauthorized, and removes the URLs, the endpoint should still always perform authentication/authorization on incoming requests and not rely on Dialogporten simply obscuring access to the endpoints  
{{</notice>}}


{{<children />}}

