---
title: Authorization - Altinn Studio Apps
description: Description of the Authoirzation architecture
tags: ["architecture", "security"]
weight: 100
linktitle: Altinn Studio Apps
alwaysopen: false
---

Altinn Studio Apps authorization arhicecture is based 
on [attribute based access control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control) principles.

## Authorization Components
The authorization architecture for Altinn Studio Apps are based on the 
[XACML reference architecture](https://en.wikipedia.org/wiki/XACML).

This architecture defines the following components.

### Policy Decision Point (PDP)
The Policy Decision Point is responsible for deciding if the requested operation is allowed.
PDP looks at the rules defined for a given resource, and based on roles or other claims it decides if
user or system is allowed to perform the request
[Learn about Policy Decision Point in Altinn Studio Apps](pdp)

### Policy Information Point
The Policy Information Point is used by PDP to gather information needed to perform the decision.

[Learn about Policy Information Point in Altinn Studio Apps](pip)

### Policy Administration Point
The policy administration point is where the rules are defined

[Learn about Policy Administration Point in Altinn Studio Apps](pap)

### Policy Enforcment Point
The Policy Enforcment Point is where the user or system is actual stopped or allowed to perform a requested operation
on a resource. 

[Learn about Policy Enforcment Point in Altinn Studio Apps](pdp)

### Context handler
The context handler is responsible for converting the resource ID to somthing that 

## The Authorization Model
The authorization model is flexible.

[Learn about authorization model in Altinn Studio Apps](model)

## The Overall Authorization flow
The sequence diagram below show how request are authorized

{{%excerpt%}}
<object data="/architecture/security/authorization/altinn-studio-apps/AuthorizationFlow.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}


1. A system or user request a action to a resource
2. The configured Policy Enforcment Point for the API/View triggers to verify if the access 
