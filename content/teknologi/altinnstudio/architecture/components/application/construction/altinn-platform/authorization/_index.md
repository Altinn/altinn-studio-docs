---
title: Application construction components - Altinn Platform Authorization
linktitle: Authorization
description: The authorization component in Altinn platform is constructed as an asp.net core web API application deployed as a docker container to a Kubernetes cluster.
tags: [architecture, solution]
---

The authorization component consists of several parts.
For a functional description see details in
[application solution components](/teknologi/altinnstudio/architecture/components/application/solution/altinn-platform/authorization/).

## Policy Decision Point - PDP

This is implemented as a separate class [library](https://github.com/Altinn/altinn-studio/tree/master/src/Altinn.Platform/Altinn.Platform.Authorization/Altinn.Authorization.ABAC
) [This is published to Nuget](https://www.nuget.org/packages/Altinn.Authorization.ABAC/).

## Policy Retrieval Point - PRP

Policy Retrieval Point component that stores authorization policies for applications.

The policies are stored as XACML (xml) documents in a blob storage.

When an authorization request is received to PDP, PRP identifies the correct policy document in the policy storage.

[See code](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/Authorization/Services/Implementation/PolicyRetrievalPoint.cs).

## Context Handler

Context handler enriches the authorization request with information about the user and the resource requested.
Roles are retrieved from SBL Brigde while resource information is retrieved from Instances in storage. 

[See code](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/Authorization/Services/Implementation/ContextHandler.cs).

## Policy Information Point - Roles

PIP for roles, calls SBL bridge to get the rules a user or system has for a resource party.

## Api controllers

- [Decision](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/Authorization/Controllers/DecisionController.cs)
- [Policy](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/Authorization/Controllers/PolicyController.cs)
- [Roles](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/Authorization/Controllers/RolesController.cs)
- [Parties](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/Authorization/Controllers/PartiesController.cs)

## Dependencies

See [csproj](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authorization/Authorization/Altinn.Platform.Authorization.csproj).