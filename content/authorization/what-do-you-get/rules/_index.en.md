---
title: Authorisation rules
linktitle: Authorisation rules
description: Authorisation rules control who may use a service, which actions they may perform and where in the service flow the actions are allowed.
weight: 2
hidden: false
---

## Authorisation for resources and apps

Altinn uses the same overall authorisation model for resources and apps developed in Altinn Studio. This gives organisations one access model even though the underlying technology differs.

### One access model

Authorisation rules in Altinn describe three elements:

- **Who** may receive access, such as an access package, an Altinn role, a role from the Central Coordinating Register for Legal Entities or an app role.
- **What** actions or rights the person or system receives.
- **Where** the access applies, such as a process step in an app or a subresource in an external service.

### Access through authorisations

An organisation can grant access directly to an individual service or through the access package or role that contains the service. Access at package or role level covers the services and resources included in it.

### Differences between resources and apps

For an Altinn resource, you manage the policy in the Resource Registry. The policy is separate from the service code.

For an Altinn Studio app, the policy belongs to the app and is evaluated against instances of that app. You manage it from the app settings in Altinn Studio.
