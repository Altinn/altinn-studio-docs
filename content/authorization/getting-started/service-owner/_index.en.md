---
title: Get started as a service owner
linktitle: For service owners
description: Find the right guidance for protecting services, granting access and supporting systems that use Altinn Authorization
weight: 2
toc: true
---

Choose the task that most closely matches what you need to achieve. Each journey explains the intended result and the guidance to follow.

The service owner is responsible for the resource, the rules and the final access check. A system vendor may implement the integration, but the service owner must decide who may do what.

## Protect an external service or API

**Use this when:** A service outside Altinn will use Altinn Authorization to decide whether an individual or system has access.

**You will achieve:** A registered resource and policy, an API that requests a PDP decision and enforcement that grants access only for an explicit Permit.

1. [Set up access to Resource Administration.](../resourceadministration/)
2. [Create and publish the resource and policy.](../../guides/resource-owner/create-resource-resource-admin/)
3. [Integrate the service with Authorized Parties and the PDP.](../../guides/resource-owner/generic-access-resource/integrating-link-service/)
4. [Choose ID-porten or Maskinporten for authentication.](../authentication/)
5. [Check status and limitations before production.](../../reference/status/)

Your API is the Policy Enforcement Point (PEP). It must reject Deny and NotApplicable, and treat Indeterminate or a missing response as a technical failure. Technical failures must never grant access.

## Make an API available to system users

**Use this when:** A system will call the API without a signed-in person, and an organisation must approve the access granted to the system.

**You will achieve:** A resource that can be included in a system registration, a policy that supports system users and an API that verifies the system user token.

1. [Read what service owners must provide for system users.](../../guides/resource-owner/system-user/)
2. [Create or update the resource.](../../guides/resource-owner/create-resource-resource-admin/)
3. Decide whether the system will act for its own organisation or for clients.
4. Agree the access packages, actions and Maskinporten scopes with the system vendor.
5. Test the wrong organisation, system user or client, and missing access.

A valid Maskinporten token does not by itself grant every operation. The API must still check the resource, action and affected party.

## Allow organisations to delegate access to the service

**Use this when:** An organisation must be able to give an employee, another individual or a supplier access to the service.

**You will achieve:** The service is included in an access package that describes a recognisable task, and the policy uses the package for the relevant actions.

1. [Find an access package that matches the task.](../../what-do-you-get/accesspackages/business/)
2. [See how roles from the Central Coordinating Register may pre-assign packages.](../../what-do-you-get/accesspackages/register_ER/)
3. Map the policy actions to the package.
4. Test direct assignment, pre-assignment and missing access.
5. Contact the service desk if no existing package covers the need.

Choose the package based on the task rather than the name of a job or system.

## Restrict access to selected organisations

**Use this when:** The service is limited to a defined group of organisations.

**You will achieve:** An access list maintained by the service owner and a rule that requires the organisation to be on the list.

- [See when access lists are suitable.](../../guides/resource-owner/accesslist/)
- [Manage access lists in Resource Administration.](../../guides/resource-owner/accesslist/manage-accesslists-resource-admin/)
- [Manage access lists through the API.](../../guides/resource-owner/accesslist/manage-accesslist-api/)

An access list does not replace authentication or other rules. Test organisations both on and off the list.

## Share specific data with consent

**Use this when:** An individual or organisation must approve that a particular recipient may retrieve limited data for a stated purpose.

**You will achieve:** A consent resource, a consent request and an API that verifies the consent token before sharing data.

1. [Get an overview of consent for service owners.](../../guides/resource-owner/consent/)
2. [Create and publish the consent resource.](../../guides/resource-owner/consent/create-resource/)
3. Agree the purpose, duration and data model with the data consumer.
4. [Verify the consent token before sharing data.](../../guides/resource-owner/consent/validate-concent/)

Do not use consent as a general or permanent power of attorney.

## Support representation for a signed-in user

**Use this when:** A user must choose the individual or organisation concerned by an action, or act as a guardian or other representative.

**You will achieve:** A clear party selector and a final access check for the selected party, resource and action.

- Use Authorized Parties to find candidate parties.
- Do not use the party list as the final access check.
- [Integrate with Authorized Parties and the PDP.](../../guides/resource-owner/generic-access-resource/integrating-link-service/)
- [Read what the service must consider for guardianship.](../guardianship/)

## Before production

Verify that the resource and policy are published in the correct environment, expected and denied access are tested, and withdrawn access takes effect. Logs must support troubleshooting without complete tokens or unnecessary personal data.

[Check the current status of Altinn Authorization.](../../reference/status/)
