---
title: Altinn Platform - Authorization
linktitle: Authorization
description: Description of authorization component
tags: ["solution", "architecture"]
weight: 100
alwaysopen: true
---

{{%notice warning%}}
This page is a work-in-progress. Currently we haven't defined all the resources and operations for the authorization component.
{{% /notice%}}

The Authorization component exposes a REST-API to Altinn Apps.

Authorization is used by the applications to authorize an action requested by the logged in user on a given resource and to retreive policy information. Use the authorization api to manage authorizations in altinn platform.

Resources: Actor, Roles

Actor
An actor (party) is a person who can represent you and perform a request on your behalf. A logged in user can retrieve a list of actors that he/she can represent.

Operations

Get the list of actors for the user

```http
GET /authorization/api/v1/actors
```

Roles
A role in altinn offers or denies right to the logged in user to perform an action or group of actions for him or on behalf of someone. 

Get the list of roles for the logged in user and the selected actor

```http
GET /authorization/api/v1/roles
```