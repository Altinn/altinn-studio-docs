---
title: Components & Modules
linktitle: Components & modules
description: The authorization components provide access management and control functionality for digital and analog services hosted in the Altinn Platform or other places.
tags: [architecture, solution]
toc: false
weight: 1
---

In 2022-2026, Altinn will modernize its authorization architecture and components. Therefore, the below description is a mix of as-is and to-be.

Altinn uses [attribute-based access control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control).

In short, Altinn authorization control access through rules defined in XACML Policies. Each rule defines which resource the rule describes, what operation, and who can perform it.

## Altinn Authorization - Components

The diagram below shows the future components of a new Altinn Architecture.

![Future solution Altinn Authorization](authorization_solution_components_future.drawio.svg "Future solution Altinn Authorization")

This architecture defines the following components.

### Access Management

This component will be responsible for administering access to self and organization.

- Giving the end-users an overview of which rights they and others have.
- Administration of AccessGroups
- Possibility to delegate and revoke rights

[Read more](accessmanagement)

### Resource Registry

This component will provide a register of

- Altinn 3 Apps
- Altinn 2 apps
- External services are hosted on other platforms but registered in Altinn for authorization.

[Read more](resourceregistry)

### Access Control

The PDP component is responsible for evaluating if the user should get access to a given resource or not.

The component has a context handler, PIP functionality, PRP information, and more.
[Read more](pdp)


### Altinn Consent

This component provides functionality to request consent and give consent. 

[Github issue](https://github.com/Altinn/altinn-authorization/issues/22)

