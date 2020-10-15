---
title: Altinn Platform - Authorization
linktitle: Authorization
description: Authorization is used by the applications to authorize an action requested by the logged in user on a given resource and to retreive policy information.
tags: [architecture, solution]
toc: false
weight: 102
---

The following diagram describes the different solution components that provides the Authorization capabilities.

![Authorization Solution components](authorization_solution_components.svg "Authorization solution components")


## PDP - Policy Decision Point

Responsible for make a decision if a request is authorized or not. [Read more](pdp)

## PAP - Policy Administration Point

Responsible for defining and administration of the authorization policies. [Read more](pap)

## PRP - Policy Retrieval Point

Responsible for identifying the correct policy for a request. [Read more](prp)

## Context Handler

Responsible for enriching the decision requst so it can correctly be evaluated. [Read more](contexthandler)

## PIP - Policy information point

Responsible for providing information about the subject and the resource to the context handler. [Read more](pip)

## PEP - Policy Enforcement Point

Responsible for enforcing the decision from PDP. This is the component that blocks a request or let it through.


## Authorization API
The Authorization component exposes a REST-API to Altinn Apps.
Use the authorization API to manage authorizations in altinn platform.

### Parties
A party is a person whom  you can represent and perform a request on his behalf. A logged in user can retrieve a list of parties that he/she can represent.

#### Operations

Get a list of parties that the user can represent. The userid is sent as parameter.

```http
GET /authorization/api/v1/parties?userid={userid}
```

Validate that a given user is allowed to represent a given party. The partyid and userid are sent as parameters.

```http
GET /authorization/api/v1/parties/{partyId}/validate?userid={userid}
```

### Roles
A role in altinn offers or denies right to the logged in user to perform an action or group of actions for him or on behalf of someone. 

#### Operations
Get a list of roles that the user can perform for the selected party.

```http
GET /authorization/api/v1/roles
```

### Policies
A set of polices contains authorization rules. 

#### Operations
Stores / updates rules for a given app, defined in the query string.
The rules are sent in the body of the request. Reade more about the [policy format](prp).

```http
POST /authorization/api/v1/policies?org=org&app=app
```

{{% children description="true" depth="1" %}}