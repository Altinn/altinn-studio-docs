---
title: Access Token
linktitle: Access Token
description: Altinn uses an additional access token when we need to authenticate the application or call a component in the Altinn Platform.
tags: [architecture, security]
toc: false
---

## AccessToken Client

.Net applications use AccessToken clients needing to call protected APIs in the Altinn Platform infrastructure.

The AccessToken Client has an [Access Token generator](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessTokenClient/Services/AccessTokenGenerator.cs)   
that generates a JWT based on a unique certificate [made available](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessTokenClient/Services/SigningCredentialsResolver.cs) in the Kubernetes clusters.

### Example usage

- [App template calling register](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Infrastructure/Clients/Register/RegisterClient.cs).
- [App template calling Altinn Events](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Infrastructure/Clients/Events/EventsClient.cs).
- [Altinn Events function calling Altinn Events](https://github.com/Altinn/altinn-events/blob/main/src/Events.Functions/Clients/EventsClient.cs).

### Configuration

To use the Access Token client, you need to add the following to program.cs

```c#
    // The Acces Token service
    services.AddSingleton<IAccessTokenGenerator, AccessTokenGenerator>();
    // The Signing credential resolver that finds the correct certificate on disk
    services.AddTransient<ISigningCredentialsResolver, SigningCredentialsResolver>();
```

[Example from Altinn Events](https://github.com/Altinn/altinn-events/blob/main/src/Events/Program.cs)


## AccessToken

Platform components use AccessToken to protect API from external usage.

It uses an [AltinnTokenValidator](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessToken/Services/AccessTokenValidator.cs) to verify the presence of a bearer token in a special header.

The certificate to validate the token is retrieved from Keyvault using the [SigningKeyResolver](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessToken/Services/SigningKeysResolver.cs)

Each end platform cluster and apps cluster has its unique certificate.

### Configuration AccessToken

To use the Access Token, you need to add the following to  program.cs

```c#
    // The handler to validate token
    services.AddSingleton<IAuthorizationHandler, AccessTokenHandler>();
    // The resolver to get the certificate from KeyVault
    services.AddSingleton<ISigningKeysResolver, SigningKeysResolver>();

      services.AddAuthorization(options =>
    {
        // The policy to be used by API controllers
        options.AddPolicy("PlatformAccess", policy => policy.Requirements.Add(new AccessTokenRequirement()));
    });
```

[Example from register](https://github.com/Altinn/altinn-register/blob/main/src/Program.cs)

The API developer can configure the policy for each endpoint or controller.

```c#
    [Authorize]
    [Authorize(Policy = "PlatformAccess")]
    [Route("register/api/v1/parties")]
    public class PartiesController : Controller
```

Example from [Register](https://github.com/Altinn/altinn-register/blob/main/src/Controllers/PartiesController.cs)