---
title: Choose the right integration method
linktitle: Choose integration method
description: How to choose authentication, representation and authorisation for your service or system.
weight: 1
toc: true
---

Start by deciding who will act, which party the action concerns and whether a person is present. The choice determines which tokens, authorisations and APIs you need.

## Choose by situation

| Situation | Start with | What the choice provides |
|---|---|---|
| A person uses your system and can sign in | [ID-porten](../authentication/id-porten/) | Confirms the person's identity |
| A system calls an API as its own organisation | [Maskinporten](../authentication/maskinporten/) | Confirms the organisation or client calling the API |
| A system acts with access approved by an organisation | [System user](../../guides/system-vendor/system-user/) | Connects the system to approved access |
| A system works for customers or clients | [System user for clients](../../guides/system-vendor/system-user/#system-user-for-client-system) | Connects the system to client relationships and access packages |
| A data consumer needs permission to retrieve specific data | [Consent](../consent/) | Records what the person or organisation has consented to |
| A service decides whether an identity may perform an action | [PDP access control](../../guides/resource-owner/generic-access-resource/integrating-link-service/#integration-with-pdp) | Checks identity, resource, action and affected party |

You may need several choices together. A system user, for example, uses Maskinporten for authentication whilst the service owner uses Altinn Authorization to check access.

## Separate authentication from authorisation

**Authentication** confirms the identity of a person or system. ID-porten and Maskinporten issue tokens that the service can verify.

**Representation** describes the party on whose behalf the identity acts. This may be the person, their own organisation or a client.

**Authorisation** decides whether the identity may perform a particular action on a resource for the affected party. A valid token alone does not grant access.

**Consent** permits a data consumer to retrieve or use specific data. Consent does not replace authentication or access control.

## Continue with your role

- [Follow the main journey for service owners.](../service-owner/)
- [Follow the main journey for system integrators.](../system-integrator/)
- [Check current status and planned work.](../../reference/status/)