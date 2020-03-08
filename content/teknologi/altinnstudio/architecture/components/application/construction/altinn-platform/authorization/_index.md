---
title: Application construction components - Altinn Platform Authorization
linktitle: Authorization
description: The authorization component in Altinn platform is constructed as a asp.net core web API application deployed as a docker container to a Kubernetes cluster.
tags: [architecture, solution]
weight: 100
---

The authorization component consist of serveral parts. 

## Policy Decision Point - PDP

This is implemented as seperate class library. 
[Altinn.Authorization.Abac](https://github.com/Altinn/altinn-studio/tree/master/src/Altinn.Platform/Altinn.Platform.Authorization/Altinn.Authorization.ABAC
) [This is published to Nuget](https://www.nuget.org/packages/Altinn.Authorization.ABAC/). 

## Policy Retrieval Point - PRP

Policy Retrieval Point component that stores authorization policies for applications.

The policies is stored as XACML (xml) documents in a blob storage.

When a authorization request is received to PDP, PRP identifies the correct policy document in the policy storage.

[See code](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/Authorization/Services/Implementation/PolicyRetrievalPoint.cs)

## Context Handler 

Context handler enrich the authorization request with information about the user and the resource requsted.
Roles are retrieved from SBL Brigde while resoure information is retrieved from Instances in storage. 

[See code](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/Authorization/Services/Implementation/ContextHandler.cs)

## Policy Information Point - Roles

PIP for roles, calls SBL bridge to get the rules a user or system has for a resource party.

## Api controllers
- [Decision](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/Authorization/Controllers/DecisionController.cs)
- [Policy](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/Authorization/Controllers/PolicyController.cs)
- [Roles](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/Authorization/Controllers/RolesController.cs)
- [Parties](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/Authorization/Controllers/PartiesController.cs)

## Dependencies

See [csproj](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/Authorization/Altinn.Platform.Authorization.csproj)