---
title: What do you get?
linktitle: What do you get?
description: Overview of components and functions provided by Altinn Authorization.
tags: [architecture, solution]
toc: false
weight: 2
---

Altinn will modernize its authorization architecture and components during the period 2022-2026. Therefore, the description below is a mix of the current and future state.

Altinn uses [attribute-based access control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control).

In short, Altinn authorization controls access through rules defined in XACML Policies. Each rule defines which resource the rule describes, which operation can be performed, and who can perform it.

## Altinn Authorization - Components

The diagram below shows future components in a new Altinn architecture.

![Future solution Altinn Authorization](authorization_solution_components_future.drawio.svg "Future solution Altinn Authorization")

This architecture defines the following components:

### Access Management

This component will be responsible for managing access for both users and organizations.

- Provide end-users with an overview of their rights and the rights of others.
- Management of AccessGroups.
- Ability to delegate and revoke rights.

[Read more](./accessmanagement/)

### Resource Registry

This component will provide a registry of:

- Altinn 3 Apps.
- Altinn 2 apps.
- External services hosted on other platforms but registered in Altinn for authorization.

[Read more](./resourceregistry/)

### Access Control

The PDP component is responsible for evaluating whether the user should be granted access to a given resource or not.

The component includes a context handler, PIP functionality, PRP information, and more.

[Read more](./pdp/)

### Altinn Consent

This component provides functionality for requesting and giving consent.

[Read more](https://github.com/Altinn/altinn-authorization/issues/22)
