---
title: Authorization - Altinn Studio Apps
description: Description of the Authoirzation architecture
tags: ["architecture", "security"]
weight: 100
linktitle: Altinn Studio Apps
alwaysopen: false
---

The authorization architecture for Altinn Studio Apps are based on the 
[XACML reference architecture](https://en.wikipedia.org/wiki/XACML). 
This architecture defines the following two components.

### Policy Decision Point (PDP)
The Policy Decision Point is responsible for deciding if the requested operation is allowed.
PDP looks at the rules defined for a given resource, and based on roles or other claims it decides if
user or system is allowed to perform the request

### Policy Information Point
The Policy Information Point is used by PDP to gather information needed to perform the decision.

### Policy Administration Point
The policy administration point is where the rules are defined

### Policy Enforcment Point
The Policy Enforcment Point is where the user or system is actual stopped or allowed to perform a requested operation
on a resource. 






