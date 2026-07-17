---
title: Get started as a system vendor
linktitle: For system vendors
description: Find the right guidance for system users, party selection, client access, consent and API calls
weight: 3
toc: true
aliases:
  - /authorization/getting-started/system-integrator/
---

Choose the task that describes what the system must do. This page also suits organisations that develop and operate their own end-user systems.

The service owner determines which resources, actions and access packages the API requires. The system vendor is responsible for using the correct identity, party and token context for each call.

## Call an API with a system user for your own organisation

**Use this when:** The system retrieves or sends data for the organisation using it, without a signed-in person.

**You will achieve:** A registered system, an approved system user and a Maskinporten token containing system user information.

1. [Set up a Maskinporten client.](../maskinportenclient/)
2. [Register the system with the required resources or access packages.](../../guides/system-vendor/system-user/systemregistration/)
3. Choose a system user for your own system.
4. [Send or support a system user request.](../../guides/system-vendor/system-user/systemuserrequest/)
5. [Wait for approval and retrieve the system user.](../../guides/system-vendor/system-user/byquery/)
6. [Retrieve and use the system user token.](../../guides/system-vendor/system-user/usetoken/)
7. Call the API with the correct organisation, resource and action.

A submitted request is not an approved system user. Handle rejected, expired and deleted requests as separate states.

## Call APIs on behalf of clients

**Use this when:** An accountant, auditor or other service provider uses the system to work for several clients.

**You will achieve:** A registered client system, a system user for the service provider and controlled client delegations.

1. [Understand the difference between your own system and a client system.](../../guides/system-vendor/system-user/)
2. [Follow the security requirements for systems with several clients.](../../guides/system-vendor/system-user/access-control/)
3. Register the system with the access packages required for client work.
4. Create and obtain approval for the system user.
5. [Connect approved clients to the system user.](../../guides/system-vendor/system-user/client-delegation/)
6. Retrieve a token with the correct client context and call the API.
7. Test the wrong client, a missing client relationship and a missing package.

Never use one client's token context, cache or authorization result for another client.

## Find parties a signed-in user can represent

**Use this when:** A user signs in with ID-porten and must choose the individual or organisation concerned by an action.

**You will achieve:** A clear party selector based on Authorized Parties, followed by a separate access check.

1. [Set up authentication with ID-porten.](../authentication/id-porten/)
2. Use the ID-porten access token in the subsequent token flow, not the ID token.
3. [Retrieve candidate parties with Authorized Parties.](../../guides/resource-owner/generic-access-resource/integrating-link-service/#integration-with-api-for-authorized-parties-issuers)
4. Display only the information needed to choose the correct party.
5. Call the service with the selected party.
6. Handle denied access as an expected outcome.

Authorized Parties does not replace the service owner's final check of the resource and action.

## Request and use consent to retrieve data

**Use this when:** The system needs time-limited, explicit approval to retrieve specific data.

**You will achieve:** A consent request and a consent token for the correct API and data set.

1. Agree the consent resource, purpose and data model with the service owner.
2. [Get an overview of the consent journey.](../../guides/system-vendor/consent/)
3. [Create the consent request.](../../guides/system-vendor/consent/request/)
4. [Follow events and status.](../../guides/system-vendor/consent/events/)
5. [Retrieve the consent token.](../../guides/system-vendor/consent/retrieve-token/)
6. [Call the API on behalf of the consenting party.](../../guides/system-vendor/consent/behalf-of/)

The system must handle rejected, expired and withdrawn consent.

## Manage access for clients

**Use this when:** The system helps a service provider manage which employees can work for which clients.

**You will achieve:** An integration that displays and changes access without mixing clients or granting broader administrative rights than the user holds.

- [See the client administration guidance.](../../guides/system-vendor/client-admin/)
- [See the access management APIs.](../../guides/system-vendor/access-management/)
- [See how an end user delegates clients.](../../guides/end-user/system-user/delegate-clients/)

Check both that the user may administer the access and that the employee can use it afterwards.

## Call an API as the system's own identity

**Use this when:** The API requires Maskinporten authentication, but not authority granted through a system user.

**You will achieve:** A Maskinporten client with the correct scope and a token representing the client organisation.

1. Confirm with the service owner whether a system user is required.
2. [Set up the Maskinporten client.](../maskinportenclient/)
3. Request only the scopes required by the API.
4. Verify the audience, scope, environment and lifetime.
5. Call the API according to the service owner's contract.

## Test and maintain the integration

Test approved, rejected and expired requests, the wrong organisation or client, missing access, invalid tokens and unavailable APIs. Do not log complete tokens, keys or unnecessary personal data.

- [Use the System User troubleshooting guidance.](../../guides/system-vendor/system-user/troubleshooting/)
- [Change a system user's rights.](../../guides/system-vendor/system-user/changerequest/)
- [Delete a system user.](../../guides/system-vendor/system-user/deleterequest/)
- [Check the current status.](../../reference/status/)
