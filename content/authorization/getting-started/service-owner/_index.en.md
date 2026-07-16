---
title: Protect an API with Altinn Authorization
linktitle: For service owners
description: How to register a resource, define rules and enforce an authorisation decision in your API.
weight: 2
toc: true
---

This guide gives service owners one main journey for protecting an API outside Altinn. Register what the API protects, define who may perform each action and check every request with Altinn Authorization.

Use the linked guides for screenshots, API contracts and examples.

## Before you start

Decide which service and actions you will protect, which party each action concerns, whether a person is present and whether access can be delegated.

[Use the integration chooser if authentication or representation is unclear.](../choose-authentication/)

## Follow the journey

1. **Clarify ownership and agreements.** Identify who owns the service, resource, rules, API and production approval. [Set up access to Resource Administration.](../resourceadministration/)
2. **Describe the resource and actions.** Use a stable resource identifier and actions that match the operations exposed by the API.
3. **Create the resource and policy.** Connect resource, action and the role or access package that grants access. [Create and publish the resource.](../../guides/resource-owner/create-resource-resource-admin/)
4. **Choose optional mechanisms.** Add [system users](../../guides/resource-owner/system-user/), [consent](../../guides/resource-owner/consent/), [access lists](../../guides/resource-owner/accesslist/) or [guardianship](../guardianship/) only when required.
5. **Authenticate the client.** Verify the ID-porten or Maskinporten token before using its contents. [See the authentication guides.](../authentication/)
6. **Find represented parties when required.** Authorized Parties may help the client choose a party, but it does not replace the final decision. [Integrate with Authorized Parties.](../../guides/resource-owner/generic-access-resource/integrating-link-service/#integration-with-api-for-authorized-parties-issuers)
7. **Request a PDP decision.** Supply the identity, resource, action and affected party. [Integrate with the PDP.](../../guides/resource-owner/generic-access-resource/integrating-link-service/#integration-with-pdp)
8. **Enforce the result.** Grant access only for an explicit `Permit`. Treat `Deny` and `NotApplicable` as no access and `Indeterminate` as a technical evaluation failure.
9. **Test the complete journey.** Cover expected permit and deny results, invalid tokens, wrong parties and resources, withdrawn access and unavailable dependencies.
10. **Prepare production.** Verify production resources, policies, scopes, clients, logging, tracing, rollback and contact information.

Never place tokens, national identity numbers, keys or personal data in documentation or defect reports.

[Check the current status of Altinn Authorization before production.](../../reference/status/)