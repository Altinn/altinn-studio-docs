---
title: Application architecture receipt component - Altinn Platform
linktitle: Receipt
description: Description of receipt component
tags: [architecture, solution, receipt]
weight: 100
---

The receipt component is an .NET Core MVC Application exposing a react receipt application, and internal apis.

The receipt frontend view is available at `https://platform.at22.altinn.cloud/receipt/{instanceOwnerId}/{instanceId}`.
The receipt component also exposes apis that are intended for use by the receipt frontend. If you need information about the user, instance or party you should use [their respective platform components.](/teknologi/altinnstudio/architecture/components/application/construction/altinn-platform/)

Receipt backend exposes two enitities through API endpoints prefixed with `https://platform.at22.altinn.cloud/receipt/api/v1/`; _user_ and _extendedInstance_

## /users
A user is the entity which is logged in in Altinn and performs actions for on behalf of an instance owner.

### Operations
Get information about the currently logged in user

```http
/users/current
```

## /extendedinstance
The extended instance object holds metadata about and instance and party data related to the instance owner.


## Operations
Get instance and party data for a given instance. Including the party object is optional and regulated using the query parameter _includeParty_. 

```http
/instances/{instanceOwnerPartyId}/{instanceGuid}?includeParty={true/false}
```
