---
title: Exception handling
description: Guidelines for exception handling in backend logic.
tags: [development, error-handling, exception-handling]
weight: 100
---

## Exception Handling

Exception handling is the act of catching an exception with the intention of handling the situation so that normal execution flow can continue. It should not be used as any part of an expected execution flow. It should also be avoided if the situation continue to be unrecoverable.

.Net core provides a default middleware *UseExceptionHandler* that will catch exceptions and log them. You can read more about this [here](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/error-handling?view=aspnetcore-3.1). This is the preferred mechanism when it comes to dealing with errors the application logic is unable to handle elegantly on its own. The middleware should be configured to generate a response that is appropriate for the running environment.

Exceptions that can be handled by the application logic should be handled as soon and as specific as possible. The following example is found in the platform Storage application. More specifically the [DataController.GetDataElementAsync](https://github.com/Altinn/altinn-studio/blob/0ff6a8d1dde279578fdab3b0a4403da001601a50/src/Altinn.Platform/Altinn.Platform.Storage/Storage/Controllers/DataController.cs#L494) method.

```cs
ActionResult errorMessage;
try
{
    DataElement dataElement = 
        await _dataRepository.Read(instanceGuid, dataGuid);

    return (dataElement, null);
}
catch (DocumentClientException dce)
{
    if (dce.StatusCode == HttpStatusCode.NotFound)
    {
        errorMessage = 
            NotFound($"Unable to find any data element with id: {dataGuid}.");
    }
    else
    {
        throw;
    }
}
```

In this example the try..catch is interested only in the DocumentClientException, and on top of that only when the StatusCode is NotFound. All other exceptions and exception reasons are ignored and will end up in the .Net Core middleware.

### API Response

Exceptions that are handled by application logic can result in almost any response. The outcome will depend on the type of exception and how it is handled:

- **200 - Ok** - The original request is considered successfully processed.
- **400 - BadRequest** - The exception was caused by a faulty request. In this case it is preferred that the application logic does active validation instead of needing to deal with an exception.
- **401 - Unauthorized** - Similar to BadRequest, but logic is associated with authentication.
- **403 - Forbidden** - Similar to BadRequest, but logic is associated with authorization.
- **404 - NotFound** - The requested resource does not exist.

By limiting the usage of status codes, we can ease the handling of different status codes at client side. Application logic should (ideally) never produce a 500 response. Exceptions that are not handled by application logic, but the default middleware will always result in a response with status code 500. 

### Middleware configuration

Handling of unrecoverable errors should be done by the built in middleware mentioned previously. The configuration should be different between production environments and other environments. In development and staging environments the middleware should allow detailed exception information to be exposed by the API. 

Configuration of the middleware is done in the [Startup.Configure](https://github.com/Altinn/altinn-studio/blob/0ff6a8d1dde279578fdab3b0a4403da001601a50/src/Altinn.Platform/Altinn.Platform.Storage/Storage/Startup.cs#L210) method. This is an example from the platform Storage application:

```cs
if (env.IsDevelopment() || env.IsStaging())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/storage/api/v1/error");
}
```

This configuration requires an ErrorController that can handle the server side redirect performed by the middleware. The following code sample is a stipped version of the [ErrorController](https://github.com/Altinn/altinn-studio/blob/0ff6a8d1dde279578fdab3b0a4403da001601a50/src/Altinn.Platform/Altinn.Platform.Authentication/Authentication/Controllers/ErrorController.cs) in the platform Storage application:

```cs
[ApiController]
[ApiExplorerSettings(IgnoreApi = true)]
[AllowAnonymous]
[Route("storage/api/v1")]
public class ErrorController : ControllerBase
{
    [Route("error")]
    public IActionResult Error() => Problem();
}
```

