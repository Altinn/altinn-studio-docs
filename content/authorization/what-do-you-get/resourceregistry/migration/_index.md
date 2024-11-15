---
title: Migration of Linked Services to Resource Registry
linktitle: Migration of Linked Services
description: The Resource Registry is central for those who want to use Altinn authorization for access control and management for services they operate outside of Altinn.
tags: [architecture, security, authorization, xacml]
weight: 1
---

In the resource registry, you can create entirely new resources or base resources on Altinn 2 linked services.

{{% notice warning %}}
Altinn 2 linked services where Altinn offers startup control will not be continued.

This means that those who currently use startup control must implement this in their own solutions and link the user directly to their solution. For example, from the Altinn service catalog.
{{% /notice %}}

### Import from Altinn 2 Linked Services

If you have existing linked services in Altinn 2 that you use for external authorization, these must be moved to the resource registry in the Altinn 3 platform.

In Altinn Studio, you can choose to create new resources based on existing linked services.

Select import resource

![Migration](/authorization/what-do-you-get/resourceregistry/migration/migrationstep1.png "Migration")

Provide the ID to be used in the Altinn resource registry. This ID will be central in

![Migration](/authorization/what-do-you-get/resourceregistry/migration/migrationstep2.png "Migration")

When you click import, a new resource is created in Altinn Studio in the organization's repository.

Since the resource registry requires more complete data than was possible to set in Altinn 2, you will need to fill in additional values

- Title in Bokmål, Nynorsk, and English
- Delegation text in Bokmål, Nynorsk, and English
- Description in Bokmål, Nynorsk, and English
- Contact information for the service (can be displayed in the service catalog)

![Migration](migrationstep3.png "Migration")

#### Access Rules

Upon import, access rules similar to those in Altinn 2 are created.

Relevant access packages should also be added to make the service ready for transition to access packages from Altinn roles.

![Migration](migrationstep4.png "Migration")

#### Publishing

When the properties of the resource are complete, it can be published to the test environment or production.

#### Change of API Integration

To perform access control on users in external services, the service owner must make calls to Altinn access control (PDP) to check access.
This is done via an API based on the XACML standard.

Functionally, the request contains

- Information about who wants to perform the request
- What type of resource is being discussed and who is the party for that resource.
- What operation the end user wants to perform.

In a request, you can ask about several things simultaneously if needed.

#### Migration of Rights

For most linked services, there are active delegations in Altinn 2. These are rights granted from an actor to a person or organization.
For these users to continue to have access after a transition to a resource in the resource registry, the rights must be migrated.

Altinn plans to offer the following

- 

