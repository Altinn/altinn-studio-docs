---
title: SmartCloud - Altinn Reference Implementation
linktitle: SmartCloud
description: Here you will find our reference implementation for end-user systems.
weight: 5
---

SmartCloud is designed to demonstrate how system vendors can integrate System User functionality into their own products, including:

- Creating a system user token from Maskinporten
- Using system user tokens from applications to call public APIs
- Using APIs to register requests for creating system users
- Checking the status of system user requests
- Listing all system users for a system

## Creating a system user request

As part of the SmartCloud application, end users can sign up as users for SmartCloud. 

Depending on the version of SmartCloud, different rights will be requested.

The request is sent from the [Redirect controller](https://github.com/TheTechArch/altinn-systemuser/blob/main/src/SystemUserClientSystem/SuperSystem/SuperSystem.Server/Controllers/RedirectController.cs#L35). Depending on the product, the rights part of the request differs.

SmartCloud authenticates with Maskinporten and asks for a token with the scope **altinn:authentication/systemuser.request.write**.

## Creating a Maskinporten system user token

SmartCloud includes code to generate a Maskinporten token for system users. 

It uses the "logged in" organization number to create the Maskinporten token.

## Calling API with system user token

With the created system user token, SmartCloud can call various APIs.

- The [LogisticController](https://github.com/TheTechArch/altinn-systemuser/blob/main/src/SystemUserClientSystem/SuperSystem/SuperSystem.Server/Controllers/LogisticController.cs) calls the Logistics API. Requires read access for the resource.
