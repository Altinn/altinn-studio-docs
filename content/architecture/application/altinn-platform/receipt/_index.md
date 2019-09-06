---
title: Application architecture receipt component - Altinn Platform
linktitle: Receipt
description: Description of receipt component
tags: [architecture, solution, receipt]
weight: 100
---

The profile component is an .NET Core MVC Application exposing a react receipt application, and an internal api for getting the current user.

The receipt frontend view is available at `http://at21.platform.altinn.cloud/receipt/{instanceOwnerId}/{instanceId}`,
example [https://platform.at21.altinn.cloud/receipt/50002121/a78b3029-009b-4fbc-995d-d8d2abf6f74b](https://platform.at21.altinn.cloud/receipt/50002121/a78b3029-009b-4fbc-995d-d8d2abf6f74b)
The receipt component also exposes an api which is available at `http://at21.platform.altinn.cloud/receipt/api/v1`, where available resources are defined below. This api is intended for
use by the receipt frontend, if you need information about the user you should [use the profile component.](/architecture/application/altinn-platform/profile)

To use the receipt component you need to have a valid `AltinnStudioRuntime` cookie. To obtain this you need to:
- Login to at21 with a valid testuser
- Navigate to https://platform.at21.altinn.cloud/authentication/api/v1/authentication?goto=https://at21.altinn.cloud/

The receipt component itself should redirect users to the authentication component, and this is something we are working on implementing.

## /users
A user is the entity which is logged in in Altinn and performs actions for on behalf of an instance owner.

Get information about the currently logged in user

```http
/users/current
```
