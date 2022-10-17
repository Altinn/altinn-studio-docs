---
title: Authorization
linktitle: Authorization
description: The authorization components provide access management and control functionality for Altinn Apps, Altinn Platform, and other consumers.
tags: [architecture, solution]
toc: false
weight: 2
---

In 2022-2024, Altinn will modernize its authorization architecture and components. Therefore, the below description is a mix of as-is and to-be.

Altinn uses [attribute-based access control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control).

In short, Altinn authorization control access through rules defined in XACML Policies. Each rule defines which resource the rule describes, what operation, and who can perform it.

The below diagram shows the future components of a new Altinn Architecture.

![Future solution Altinn Authorization](authorization_solution_components_future.drawio.svg "Future solution Altinn Authorization")

This architecture defines the following components.

## PDP - Policy Decision Point

The policy decision point is responsible for deciding if an authorization request
is authorized or not. It bases its decision on rules and information it has of the resource and the user/system
trying to access and perform an operation on a resource.

[Read more](pdp)

## PAP - Policy Administration Point

Responsible for defining and administering authorization policies.

In Altinn Authorization, there are the following components that function as a PAP

- Altinn Studio to define rules for Apps
- Altinn Access Management for defining delegated rules
- Altinn Resource Registry allows the administration of resource policies.

[Read more](pap)

## PRP - Policy Retrieval Point

Responsible for identifying the correct policy for a request. [Read more](prp)

## Context Handler - In production

Responsible for enriching the decision request so it can correctly be evaluated. [Read more](contexthandler)

## PIP - Policy information point - In production

Responsible for providing information about the subject and the resource to the context handler. [Read more](pip)

## PEP - Policy Enforcement Point - In Pro

Responsible for enforcing the decision from PDP. This is the component that blocks a request or let it through.

For details about how the components are constructed go [here](/technology/architecture/components/application/construction/altinn-platform/authorization).



### Roles

A role in altinn offers or denies right to the logged in user to perform an action or group of actions for him or on behalf of someone.

#### Operations

Get a list of roles that the user can perform for the selected party.

```http
GET /authorization/api/v1/roles
```

### Policies

A set of polices contains authorization rules.


## Altinn Authorization - Future

{{<notice warning>}}
This is work in progress
{{</notice>}}

In the coming years, Authorization will be [modernized](https://github.com/Altinn/altinn-authorization/issues/23) from being a part of Altinn 2 monolith to a cloud-native architecture.

The diagram below shows the different solution components.



### Altinn Access Management

This component will be the component responsible for the administration of access to self and organization

- Giving the end-users an overview of which rights he and other has	
- Administration of AccessGroups
- Possibility to delegate and revoke rights

[Github Issue](https://github.com/Altinn/altinn-authorization-admin/issues/27)

### Altinn Resource Registry

This component will provide a register of

- Altinn 3 Apps
- Altinn 2 apps
- External services that are hosted in other platforms but registered in Altinn for authorization purposes.

[Github issue](https://github.com/Altinn/altinn-authorization/issues/24)
  
[A POC is planned](https://github.com/Altinn/altinn-authorization/issues/26)

### Altinn Access Groups

Altinn Access Groups component contains the Altinn defined Access Groups and information which is member of this groups.

Exposes API to list and delegate Access Groups.

[Github issue](https://github.com/Altinn/altinn-authorization/issues/25)

[A POC is planned](https://github.com/Altinn/altinn-authorization/issues/28)

### Altinn Access Information

Altinn Access Information exposes API for Reportee, access groups, and rights for external consumers. Therefore, it needs to be highly scalable. 

### Altinn Consent

Provides functionality to request consent and give consents

[Github issue](https://github.com/Altinn/altinn-authorization/issues/22)

### Altinn Policy Decision Point

This is the core PDP responsible to evaluate if the user should get access to a given resource. 

Depends on Altinn Access Groups for groups information and Altinn Access Policies for policy information. 


### Altinn Resource Rights Registry

A register that allows resource owner to control which organizations or person that can access a service resource.

[Github Issue](https://github.com/Altinn/altinn-authorization/issues/53)

Access Groups
The Access Groups component is responsible for keeping track of membership of different Access Groups defined in Altinn.

Access Management component
The Access Management provides functionality to end users for managing groups, roles and rights

Context Handler
The responsibility to the Context Handler is to enrich a decision request sent from a PEP so it can be evaluated by PDP.

Policy Administration Point
The Policy Administration Point is responsible for creating and modifying the different authorization policies used by the PDP

Policy Decision Point
The Policy Decision Point is responsible to evaluate if users and systems is authorized to perform the requested operation on a resource.

Policy Enforcement Point
In Altinn Platform there are PEP's that enforce access to different types of API

Policy Information Point
The Policy Information Point(s) are responsible for providing needed information to the context handler so it can enrich the context request.

Policy Retrieval Point
The Policy Retrieval Point is the functionality where Policy Decision Point (PDP) can retrieve the policy defined for an app resource.

Resource Registry
The Resource Registry

Resource Rights Registry
The Resource Rights Registry gives the administrator of a Resource in Resource Registry the capability to administrate which organizations and persons can access their resources.

XACML - Altinn Studio
XACML stands for "eXtensible Access Control Markup Language".