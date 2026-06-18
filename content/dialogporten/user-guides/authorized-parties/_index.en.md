---
title: 'Finding authorized parties'
description: 'How to get the list of parties that can be represented'
weight: 15
toc: true
---

## Introduction

This guilde shows how to use the Dialogporten proxy API to Altinn Access Managment for attaining the list of [authorized parties]({{< relref "/dialogporten/getting-started/authorization/parties" >}}#authorized-parties) that the authenticated user
has access to. 

## Basic steps (REST)

1. [Authenticate as an end-user]({{< relref "/dialogporten/user-guides/authenticating" >}}#usage-for-end-user-systems)
2. Perform a GET-request to `/api/v1/enduser/parties`

### Returned information

The data structure returned consists of all the parties that the end user can represent, which as a minimum, will include themselves. This includes
* The name of the party (full name for persons, or organization name).
* The identifier for the party, which can be used when [searching for dialogs]({{< relref "/dialogporten/user-guides/searching-for-dialogs" >}})
* Whether the party is the current user
* Whether the user has any special roles for the party

Note that organizations might have child/parent relations (one level). An end-user might have access to a child organization, but not its parent, however the parent will still be included for viewing purposes, but is flagged as only being present to indicate the hierarchy. 

Also note that deleted organizations will also be included. For full details, see the reference link below.

**Read more**
* {{<link "../../reference/authorization/parties">}}
* {{<link "../searching-for-dialogs">}}

## Basic steps (GraphQL)

The same functionality is available in GraphQL through `getParties`.

Example:

```graphql
query {
  getParties {
    party
    partyUuid
    partyId
    name
    partyType
    isDeleted
    hasKeyRole
    isCurrentEndUser
    isMainAdministrator
    isAccessManager
    hasOnlyAccessToSubParties
    subParties {
      party
      partyUuid
      partyId
      name
      partyType
      isDeleted
      hasKeyRole
      isCurrentEndUser
      isMainAdministrator
      isAccessManager
    }
  }
}
```

The `party` field in the response is the party URN you use in [dialog searches]({{< relref "/dialogporten/user-guides/searching-for-dialogs" >}}). The remaining fields describe the party and the authenticated user's relation to it, including whether the party is the current end user and whether the user has key administrative roles.

{{<children />}}
