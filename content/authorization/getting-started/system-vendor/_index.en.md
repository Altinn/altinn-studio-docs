---
title: Integrate a system with Altinn Authorization
linktitle: For system vendors
description: How to choose an identity, set up a system user and call a service on behalf of people or organisations.
weight: 3
toc: true
aliases:
  - /authorization/getting-started/system-integrator/
---

This guide gives system vendors one main journey from choosing an identity to a production-ready call. It also suits organisations that develop and operate their own end-user systems.

Use the linked pages for API contracts and complete examples.

## Before you start

Confirm whether a person is signed in, whether the system acts for its own organisation or for clients, which API you will call, which access it requires and who can approve that access.

[Use the integration chooser if the method is unclear.](../choose-authentication/)

## Choose the main journey

- Use [ID-porten](../authentication/id-porten/) when a person is present and the system acts on behalf of that person.
- Use Maskinporten when the system runs without a signed-in person.
- Add a system user when the API requires access approved by an organisation.
- Use a client system user when a service provider acts for customers. [Follow the security requirements for shared systems.](../../guides/system-vendor/system-user/access-control/)

## Set up a system user

1. **Create a Maskinporten client.** Obtain the scopes required for the system registry, system users and the service owner's API. [Set up a Maskinporten client.](../maskinportenclient/)
2. **Register the system.** Define the system identifier, supplier, text, resources or access packages, clients and redirect addresses. [Register the system.](../../guides/system-vendor/system-user/systemregistration/)
3. **Choose own organisation or clients.** [See the difference between system user types.](../../guides/system-vendor/system-user/#system-user-for-own-system)
4. **Choose supplier-led or user-led creation.** [Create a system user.](../../guides/system-vendor/system-user/systemuserrequest/)
5. **Wait for approval.** Treat rejected, expired and deleted requests as separate states. [Retrieve an existing system user.](../../guides/system-vendor/system-user/byquery/)
6. **Connect clients when required.** A client system requires a client relationship, access packages and delegation. [Set up client delegation.](../../guides/system-vendor/system-user/client-delegation/)
7. **Retrieve and verify the token.** Verify the system, system user, organisation, client, scope and environment. [Use the system user token.](../../guides/system-vendor/system-user/usetoken/)
8. **Call the service owner's API.** Supply the correct party, resource and action. The service owner performs the final access check.

Never use one customer's token context for another customer. Do not log complete tokens or unnecessary personal data.

## Test and prepare production

Test approval and rejection, expired requests and tokens, wrong customers, withdrawn access, retries and unavailable dependencies. Verify production scopes, registration values, exact redirect addresses, tenant separation, key rotation and user-facing errors.

- [Troubleshoot the System User integration.](../../guides/system-vendor/system-user/troubleshooting/)
- [Check the current status of Altinn Authorization.](../../reference/status/)
- [Delete a system user.](../../guides/system-vendor/system-user/deleterequest/)