---
title: Authorization
linktitle: Authorization
description: The authorization components provide access management and control functionality for digital and analog services hosted in the Altinn Platform or other places.
tags: [architecture, solution]
toc: false
weight: 1
---

The typical scenario is that some event will be triggered, or data will be read, updated, or created by a digital or analog service. A service owner owns this service and has defined some business rules for who is allowed to use the service.

This service needs to control who can access and modify data.

Altinn Authorization provides the capability to verify and enforce this. 

![User Scenario](userscenario.drawio.svg "User scenario")

Users and organizations get rights to access a service from defined rules and policies.

The below drawing show all aspects that control who and what rights a user or organization has.

![Rules](rules.drawio.svg "Access control aspects")

- Resources - describes the resource a rule applies to. It can be an app, a resource in the resource register, a specific task, or any other sub-resources to an app or resource in the rescource registry.
- Action - describes which action the rules apply to. This can be any action like read, write, sign, fire, Opendoor +++
- Subject - describes who the rules apply to. It can be a role, access group, an organization number or a specific user, and many more
- Obligation - describes additional information like minimum authentication level.
- Condition - Describes additional conditions like the reportee needs to be registered in SRR/RRR for this resource/service.

## Conceptual Components

In 2022-2024, Altinn will modernize its authorization architecture and components. Therefore, the below description is a mix of as-is and to-be.

Altinn uses [attribute-based access control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control).

In short, Altinn authorization control access through rules defined in XACML Policies. Each rule defines which resource the rule describes, what operation, and who can perform it.

When defining the authorization components, we used the [XACML reference architecture](https://en.wikipedia.org/wiki/XACML).

We have defined the following conceptual components/functional areas from the reference architecture.

### PDP - Policy Decision Point

The policy decision point is responsible for deciding if an authorization request
is authorized or not. It bases its decision on rules and information it has of the resource and the user/system
trying to access and perform an operation on a resource.

[Read more](pdp)

### PAP - Policy Administration Point

Responsible for defining and administering authorization policies.

In Altinn Authorization, there are the following components that function as a PAP

- Altinn Studio to define rules for Apps
- Altinn Access Management for defining delegated rules
- Altinn Resource Registry allows the administration of resource policies.

[Read more](pap)

### PRP - Policy Retrieval Point

The Policy Retrieval Point is responsible for finding the right policy.

In Altinn, there are two sources of Policies. Altinn Access Management for delegated policies
and Altinn Resource Registry  

[Read more](prp)

### Context Handler - In production

Responsible for enriching the decision request so authorization correctly can be evaluated. [Read more](contexthandler)

### PIP - Policy information point - In production

Responsible for providing information about the subject and the resource to the context handler. [Read more](pip)

### PEP - Policy Enforcement Point - In Pro

Responsible for enforcing the decision from PDP. PEP is the component that blocks a request or lets it through.

[Read more](pep)

## Altinn Authorization - Components

The below diagram shows the future components of a new Altinn Architecture.

![Future solution Altinn Authorization](authorization_solution_components_future.drawio.svg "Future solution Altinn Authorization")

This architecture defines the following components.

### Altinn Access Management

This component will be the component responsible for the administration of access to self and organization

- Giving the end-users an overview of which rights they and others have.
- Administration of AccessGroups
- Possibility to delegate and revoke rights

[Read more](accessmanagement)

### Altinn Resource Registry

This component will provide a register of

- Altinn 3 Apps
- Altinn 2 apps
- External services are hosted on other platforms but registered in Altinn for authorization purposes.

[Read more](resourceregistry)

### Altinn Access Groups

The Altinn Access Groups component contains the Altinn-defined Access Groups and information about members of these groups.

Exposes API to list and delegate Access Groups.

[Read more](accessgroups)

### Altinn Access Information

Altinn Access Information exposes API for Reportee, access groups, and rights for external consumers. Therefore, it needs to be highly scalable. 

### Altinn Consent

This component provides functionality to request consent and give consent. 

[Github issue](https://github.com/Altinn/altinn-authorization/issues/22)

### Altinn Policy Decision Point

The PDP component is responsible for evaluating if the user should get access to a given resource or not.

The component has a context handler, PIP functionality, PRP information, and more.
[Read more](pdp)

### Altinn Resource Rights Registry

A register allows resource owners to control which organizations or persons can access a service resource.

[Read more](rrr)