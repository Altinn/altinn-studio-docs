---
title: Access Token
linktitle: Access Token
description: Altinn uses An additional access token in the scenario where we need to authenticate the application or call a component in the Altinn Platform.
tags: [architecture, security]
toc: false
---

## AccessToken Client

.Net applications use AccessToken clients needing to call protected APIs in the Altinn Platform infrastructure.

The AccessToken Client has a [Access Token generator](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessTokenClient/Services/AccessTokenGenerator.cs)  that
generates a jwt token based on a certifcate [made available](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessTokenClient/Services/SigningCredentialsResolver.cs) in in the different Kubernetes clusters.

### Example usage

- [App template calling register](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Infrastructure/Clients/Register/RegisterClient.cs).
- [App template calling Altinn Events](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Infrastructure/Clients/Events/EventsClient.cs).
- [Altinn Events function calling Altinn Events](https://github.com/Altinn/altinn-events/blob/main/src/Events.Functions/Clients/EventsClient.cs)

### Configuration

To use the Access Token client you need to add the following to program.cs

```c#
    services.AddSingleton<ISigningKeysResolver, SigningKeysResolver>();
    services.AddSingleton<IAccessTokenGenerator, AccessTokenGenerator>();
```

[Example from Altinn Events](https://github.com/Altinn/altinn-events/blob/main/src/Events/Program.cs)


## AccessToken

AccessToken is usedd by platform components that need to protect API from externala usage.

It uses a [AltinnTokenValidator](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessToken/Services/AccessTokenValidator.cs) to verify the presens of a bearer token in a special header.

The certficate is retrived from Keyvault using the [SigningKeyResolver](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessToken/Services/SigningKeysResolver.cs)

Each end4

### Configuration AccessToken

To use the Access Token client you need to add the following to program.cs

```c#
    services.AddSingleton<IAuthorizationHandler, AccessTokenHandler>();
    services.AddSingleton<ISigningKeysResolver, SigningKeysResolver>();

      services.AddAuthorization(options =>
    {
        options.AddPolicy("PlatformAccess", policy => policy.Requirements.Add(new AccessTokenRequirement()));
        options.AddPolicy("AuthorizationLevel2", policy =>
    });
```

[Example from register](https://github.com/Altinn/altinn-register/blob/main/src/Program.cs)

The validator can be configured for each endpoint or controller

```c#
   [Authorize]
    [Authorize(Policy = "PlatformAccess")]
    [Route("register/api/v1/parties")]
    public class PartiesController : Controller
```

Example from [Register](https://github.com/Altinn/altinn-register/blob/main/src/Controllers/PartiesController.cs)