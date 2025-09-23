---
title: API Scopes Configuration
linktitle: API Scopes
description: Configure custom API scopes
weight: 200
toc: true
---

Custom API scopes allow you to define API-level client access to your application's instance-related APIs.

{{%notice info%}}
Custom API scope functionality is only available from v8.9.0-preview releases and onwards in the Altinn.App.Api library.
{{% /notice%}}

{{%notice warning%}}
Scope configuration is not yet enforced in Storage APIs. This will come in a future release and the documentation will be updated. We will notify on Slack when this is available.
{{% /notice%}}

## Overview

While XACML enables granular access control to the actual underlying resource (instances), the API scope authorization implements
simple authorization of clients for instance-related APIs in your app (it takes effect _before_ XACML authorization).

There are built in scopes for users and service owners:
* `altinn:instances.read` and `altinn:instances.write` for users (and systemusers)
* `altinn:serviceowner/instances.read` and `altinn:serviceowner/instances.write` for service owners

These are "global", in the sense that they give a client access to the app APIs for _all Altinn apps_.
We support custom configuration to enable apps to have app-specific scopes, so that a given client can retrieve
access tokens which have scopes that are specific to one or more apps.

## Configuration

App-specific API scopes are configured in the `applicationmetadata.json` file located in `App/config/` within your application repository.

### Example

Here is an example configuration using a similar scope structure but with a custom ID-porten scope prefix
and using the `[app]` placeholer support (it will be substituted with the app name during runtime).

```json
{
  "apiScopes": {
    "users": {
      "read": "<ID-porten prefix>:[app].instances.read",
      "write": "<ID-porten prefix>:[app].instances.write",
      "errorMessageTextResourceKey": "authorization.scopes.insufficient"
    },
    "serviceOwners": {
      "read": "<ID-porten prefix>:[app]/serviceowner/instances.read",
      "write": "<ID-porten prefix>:[app]/serviceowner/instances.write",
      "errorMessageTextResourceKey": "authorization.scopes.insufficient"
    },
    "errorMessageTextResourceKey": "authorization.scopes.insufficient"
  }
}
```

The `errorMessageTextResourceKey` specified above are the default values.
They can be overridden at both levels, and the inner keys have precedence if set (they are optional).
The value resolved through the text resources are put into the `details` property in the `ProblemDetails` 403 response
when scope authorization doesn't succeed.

### Configuration Properties

| Property | Description |
|----------|-------------|
| `users` | Defines API scopes for regular users |
| `serviceOwners` | Defines API scopes for service owner clients |
| `read` | Scope required for read operations |
| `write` | Scope required for write operations |
| `errorMessageTextResourceKey` | Custom error message key (optional) |

## API response

When scope authorization fails, the app returns a 403 respons with `ProblemDetails` format:

```json
{
    "title": "Forbidden",
    "status": 403,
    "detail": "Insufficient scope",
    "instance": "<request-path>"
}
```

The `detail` property of the response is overridden through `errorMessageTextResourceKey` configuration.

### Debugging

The app computes and caches required scopes per API endpoint during startup of the application.
If you want to see the results of this you can enable `Debug` logs in your `appsettings` JSON file
and rerun the application. Then it will log a list of endpoints and required scopes per user/serviceowner.
These logs come from `ScopeAuthorizationService` in library code.

## Related Documentation

- [Authorization Policies](../) - Learn about XACML-based authorization
- [Authentication](../../../api/auth/) - Understand authentication mechanisms
- [Text Resources](../../../ux/texts/) - Configure custom text messages