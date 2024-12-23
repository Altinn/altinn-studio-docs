---
title: SmartCloud - Altinn Reference Implementation
linktitle: SmartCloud
description: Reference implementation for integrating System User functionality into end-user systems.
weight: 5
---

SmartCloud demonstrates how system vendors can integrate System User functionality into their products, including:

- Creating a system user token from Maskinporten
- Using system user tokens to call public APIs
- Registering requests for creating system users
- Checking the status of system user requests
- Listing all system users for a system

## Creating a System User Request

End users can sign up as users for SmartCloud. Depending on the SmartCloud version, different rights will be requested.

The request is sent from the [Redirect controller](https://github.com/TheTechArch/altinn-systemuser/blob/main/src/SystemUserClientSystem/SuperSystem/SuperSystem.Server/Controllers/RedirectController.cs#L35). The rights requested vary based on the product.

SmartCloud authenticates with Maskinporten and requests a token with the scope **altinn:authentication/systemuser.request.write**.

## Creating a Maskinporten System User Token

SmartCloud includes code to generate a Maskinporten token for system users using the "logged in" organization number.

## Calling APIs with System User Token

With the generated system user token, SmartCloud can call various APIs.

- The [LogisticController](https://github.com/TheTechArch/altinn-systemuser/blob/main/src/SystemUserClientSystem/SuperSystem/SuperSystem.Server/Controllers/LogisticController.cs) calls the Logistics API, requiring read access for the resource.

The project can be studied [here](https://github.com/TheTechArch/altinn-systemuser/tree/main/src/SystemUserClientSystem/SuperSystem).
