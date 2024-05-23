---
title: Application construction components - Altinn Authorization
linktitle: Architecture
description: Altinn Authorization is constructed as serveral components.
tags: [architecture, solution]
weight: 999
toc: false

---

When defining the authorization components, we used the [XACML reference architecture](https://en.wikipedia.org/wiki/XACML).

## Conceptual components


We have defined the following conceptual components/functional areas from the reference architecture.

### PDP - Policy Decision Point

The policy decision point is responsible for deciding if an authorization request
is authorized or not. It bases its decision on rules and information it has of the resource and the user/system
trying to access and perform an operation on a resource.

[Read more](accesscontrol)

### PAP - Policy Administration Point

Responsible for defining and administering authorization policies.

In Altinn Authorization, there are the following components that function as a PAP

- Altinn Studio to define rules for Apps
- Altinn Access Management for defining delegated rules
- Altinn Resource Registry allows the administration of resource policies.

[Read more](../what-do-you-get/accessmanagement/pap/)

### PRP - Policy Retrieval Point

The Policy Retrieval Point is responsible for finding the right policy.

In Altinn, there are two sources of Policies. Altinn Access Management for delegated policies
and Altinn Resource Registry  

[Read more](../what-do-you-get/resourceregistry/prp)

### Context Handler - In production

Responsible for enriching the decision request so authorization correctly can be evaluated. [Read more](accesscontrol/contexthandler)

### PIP - Policy information point - In production

Responsible for providing information about the subject and the resource to the context handler. 

### PEP - Policy Enforcement Point - In Pro

Responsible for enforcing the decision from PDP. PEP is the component that blocks a request or lets it through.

[Read more](accesscontrol/pep)



For a functional description see details in [application solution components](../../).

## Construction diagram Authorization

![Construction](authorizationbff.drawio.svg "Construction diagram Altinn authorization")






{{<children />}}
