---
title: Delegations API
linktitle: Delegations
description: Description of API for operations regarding delegation of rights and access to resources in Altinn 3
toc: true
---

## Overall description

{{<notice warning>}}
Documentation is under construction
{{</notice>}}
The Delegations API in the Altinn 3 platform lets enduser system integrations perform, retrieve and revoke delegations as an authenticated enduser, on behalf of a reportee the user is authorized for.

## Maskinporten Schema

The Maskinporten Schema corresponds to what was called Delegation Schema in the Altinn 2 solution. These define a delegable resource in Altinn which covers one or more scopes from Maskinporten.
A Maskinporten Schema can then be delegated from a client organization (consumer in the Maskinporten token) to a supplier organization (supplier in the Maskinporten token). When the client organization retrieves a supplier token from Maskinporten, Maskinporten through integration with Altinn will find that delegation exists and enrich the issued Maskinporten token with the scopes covered by the Maskinporten Schema (provided that the client organization itself has received access to these scopes from the API owner).

The resource registry is documented [here](https://docs.altinn.studio/technology/solutions/altinn-platform/authorization/resourceregistry/).

Postman example collection can be found [here](https://docs.altinn.studio/api/authorization/access-management/delegations/am-delegations.postman_collection.json).

Use of the API requires either a Altinn- or IDPorten-token for the authenticated user. See the API documentation for authentication [here](https://docs.altinn.studio/api/authentication/).
