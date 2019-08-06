---
title: Altinn Platform - Authorization
linktitle: Authorization
description: Description of authorization component
tags: ["solution", "architecture"]
weight: 100
---

{{%notice warning%}}
This page is a work-in-progress. Currently we haven't defined all the resources and operations for the authorization component.
{{% /notice%}}

The Authorization component exposes a REST-API to Altinn Apps.

Authorization is used by the applications to authorize an action requested by the logged in user on a given resource and to retreive policy information. Use the authorization api to manage authorizations in altinn platform.

Resources: Actor, Roles

## Parties
A party is a person whom  you can represent and perform a request on his behalf. A logged in user can retrieve a list of parties that he/she can represent.

### Operations

Get a list of parties that the user can represent. The userid is sent as parameter

```http
GET /authorization/api/v1/parties?userid={userid}
```

Validate that a given user is allowed to represent a given party. The partyid and userid are sent as parameters

```http
GET /authorization/api/v1/parties/{partyId}/validate?userid={userid}
```

## Roles
A role in altinn offers or denies right to the logged in user to perform an action or group of actions for him or on behalf of someone. 

### Operations
Get a list of roles that the user can perform for the selected party

```http
GET /authorization/api/v1/roles
```