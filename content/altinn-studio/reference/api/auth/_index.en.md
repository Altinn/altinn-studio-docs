---
title: Authentication
linktitle: Authentication
description: When it comes to authentication, there are some configurations that may be relevant
weight: 800
toc: true
tags:
---

The apps APIs are access-controlled using [Altinn Authorization](/authentication).
Requests to the APIs are authorized using the following information:

* `AltinnStudioRuntime` cookie
* `Authorization` header

## Login Methods

Altinn Authorization supports different types of users, which is important to consider when developing custom functionality in an app.

* **Users**
  * Can log in via the Altinn Portal or through an external ID-porten session
  * Have User ID, Party ID, and user profile. Authentication level is always greater than 0
  * Can represent other parties through party selection
  * ID-porten token must be exchanged for an Altinn token via Altinn Authorization
* **Organization**
  * Clients authenticated via Maskinporten
  * Applies to organizations with an agreement and access to Maskinporten
  * Maskinporten token must be exchanged for an Altinn token
  * Cannot be used for much in an Altinn app, as organizations are not valid submitters (an organization cannot submit on behalf of itself)
* **Service owner**
  * Clients authenticated via Maskinporten
  * Applies to organizations registered as service owners in Altinn (and owners of the running app), who have also requested a service owner scope when authenticating in Maskinporten (`altinn:serviceowner`)
  * Maskinporten token must be exchanged for an Altinn token
  * Service owner is not a valid submitter, but depending on the XACML policy, service owners can start new instances and modify data in existing instances
* **System user**
  * Clients authenticated via Maskinporten
  * A system user is owned by an organization that is a customer/user of a supplier system. The system user is owned by the customer, while the system is owned by the supplier
  * The supplier owns the Maskinporten client and authenticates. This allows the system to impersonate the system user (including rights the system user has been delegated from the customer)
  * The apps API only accepts Maskinporten tokens that have been exchanged for an Altinn token (in the future, we will support Maskinporten tokens directly)

{{% notice warning %}}
Enterprise users from Altinn 2 are only partially supported in Altinn 3. Authentication and authorization will work, but there may be
limitations in other parts of the platform. Enterprise users are classified as `Organization` from the list above.
There is no built-in restriction for these users, so if you want to block requests from enterprise users in your app,
this must be done manually. This can, for example, be achieved using ASP.NET Core middleware.
{{% /notice %}}

## Information in the app

The `Altinn.App.Core` library provides abstractions for retrieving information about the logged-in user.
By default, there are no restrictions on which user types an app accepts, but you can enforce such restrictions yourself in middleware or a validator.
Before version `v8.6` of the app libraries, it was common to, for example, retrieve the user ID directly from `HttpContext`, 
but this could yield unexpected results if the incoming request was authenticated as a system user.

From version `v8.6` of `Altinn.App.Core`, the `IAuthenticationContext` and `Authenticated` types are available:

```csharp
namespace Altinn.App.Core.Features.Auth;

public interface IAuthenticationContext
{
    Authenticated Current { get; }
}

...

public abstract class Authenticated
{
    public sealed class User : Authenticated { ... }
    public sealed class SelfIdentifiedUser : Authenticated { ... }
    public sealed class Org : Authenticated { ... }
    public sealed class ServiceOwner : Authenticated { ... }
    public sealed class SystemUser : Authenticated { ... }
}
```

The `IAuthenticationContext` interface can be used in custom code to check what type of user is logged in, and what information 
is associated with them. 

## Limit access

Apps have different requirements for access. In some cases, you may want to restrict the use to specific authentication methods.
There is currently no built-in configuration to restrict access based on authentication methods in an app, but this is being considered.

{{% notice info %}}
`IAuthenticationContext.Current` uses information about the logged-in user from ASP.NET Core's authentication stack.
This means that the ASP.NET Core auth middleware must have run for you to get the correct information.
Auth middleware is added in `UseAltinnAppCommonConfiguration`. So if you want to access `IAuthenticationContext.Current`
in an ASP.NET Core middleware, it must be added **after** `UseAltinnAppCommonConfiguration` has been called.
All interfaces implemented in an app, such as `IInstantiationValidator` in the example below, run at a time
when authentication information is available, so it is completely safe there.
{{% /notice %}}

### ✅ Altinn portal-users

Here is an example implementation of `IInstantiationValidator` that only allows instantiation by users logged in via the Altinn portal:

```csharp
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Features.Auth;
using Altinn.App.Core.Models.Validation;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Core;

internal sealed class ValidateInstantiation(IAuthenticationContext authenticationContext) : IInstantiationValidator
{
    public Task<InstantiationValidationResult?> Validate(Instance instance)
    {
        var current = authenticationContext.Current;

        switch (current)
        {
            case Authenticated.User user:
                if (!user.InAltinnPortal)
                {
                    return Task.FromResult<InstantiationValidationResult?>(
                        new()
                        {
                            Message = "You must be logged in to the Altinn portal to create a new instance",
                            Valid = false,
                        }
                    );
                }
                return Task.FromResult<InstantiationValidationResult?>(null);
            default:
                return Task.FromResult<InstantiationValidationResult?>(
                    new()
                    {
                        Message = "This app only supports user logins via the Altinn portal",
                        Valid = false,
                    }
                );
        }
    }
}
```

The same authorization can be enforced globally using ASP.NET Core middleware:

{{% notice info %}}
Note that this approach will also block unauthenticated requests.
{{% /notice %}}

```csharp
WebApplication app = builder.Build();

...

app.UseAltinnAppCommonConfiguration();

app.Use(
    async (context, next) =>
    {
        var authenticationContext = context.RequestServices.GetRequiredService<IAuthenticationContext>();
        var authenticated = authenticationContext.Current;
        if (authenticated is not Authenticated.User { InAltinnPortal: true })
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsJsonAsync(
                new ProblemDetails
                {
                    Title = "Forbidden",
                    Detail = "This app only supports users in the Altinn portal",
                    Status = StatusCodes.Status403Forbidden
                }
            );
            return;
        }

        await next(context);
    }
);
```

### ✅ System users

In this example, we only allow requests from system users:

{{% notice info %}}
Note that this approach will also block unauthenticated requests.
{{% /notice %}}

```csharp
WebApplication app = builder.Build();

...

app.UseAltinnAppCommonConfiguration();

app.Use(
    async (context, next) =>
    {
        var authenticationContext = context.RequestServices.GetRequiredService<IAuthenticationContext>();
        var authenticated = authenticationContext.Current;
        if (authentication.Current is not Authenticated.SystemUser)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsJsonAsync(
                new ProblemDetails
                {
                    Title = "Forbidden",
                    Detail = "This app can only be used as a system user",
                    Status = StatusCodes.Status403Forbidden
                }
            );
            return;
        }

        await next(context);
    }
);
```

### ❌ Enterprise users

In this example, we block the deprecated enterprise users from Altinn 2:

{{% notice info %}}
These tokens may exist until Altinn 2 is fully phased out.
{{% /notice %}}

```csharp
WebApplication app = builder.Build();

...

app.UseAltinnAppCommonConfiguration();

app.Use(
    async (context, next) =>
    {
        var authenticationContext = context.RequestServices.GetRequiredService<IAuthenticationContext>();
        var authenticated = authenticationContext.Current;
        if (authentication.Current is Authenticated.Org)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsJsonAsync(
                new ProblemDetails
                {
                    Title = "Forbidden",
                    Detail = "Enterprise users are not allowed in this app",
                    Status = StatusCodes.Status403Forbidden
                }
            );
            return;
        }

        await next(context);
    }
);
```
