---
title: Error flow
tags: [development, business-layer, presentation-layer, service, controller]
weight: 100
---

## How to pass on error information from service to presentation layer ? 

We do not want the service layer to have any direct knowledge about HTTP status codes, 
however the controller does need to know which status code to return to the client
if the service does provide a response indicating success. 

Currently, this is handled by the service returning a tuple if addition specification of the error is required. 


```cs
Task<(List<Subscription> Subscription, ServiceError Error)> GetAllSubscriptions(string consumer);
```

This example is from the Subcription Service in the Events component. 
The ServiceError model is a simple class with two properties and two constructors. 

```cs
public class ServiceError
{
    /// <summary>
    /// The error code
    /// </summary>
    /// <remarks>An error code translates directly into an HTTP status code</remarks>
    public int ErrorCode { get; private set; }
    /// <summary>
    /// The error message
    /// </summary>
    public string ErrorMessage { get; private set; }
    /// <summary>
    /// Create a new instance of a service error
    /// </summary>
    public ServiceError(int errorCode, string errorMessage)
    {
        ErrorCode = errorCode;
        ErrorMessage = errorMessage;
    }
    /// <summary>
    /// Create a new instance of a service error
    /// </summary>
    public ServiceError(int errorCode)
    {
        ErrorCode = errorCode;
    }
}
```

Within the service if an error is occured, a new ServiceError object is created and we return the touple with the
first element as null. However, if no error occurs, we return the tuple with the ServiceError equal to null.

```cs

if (!await AuthorizeAccessToSubscription(subscription))
{
    return (null, new ServiceError(401));
}

return (subscription, null);
```

In the controller the error object is always checked first before continuing with the regular flow of logic. 

```cs
(List<Subscription> subscriptions, ServiceError error) = await _eventsSubscriptionService.GetAllSubscriptions(consumer);

if (error != null)
{
    return StatusCode(error.ErrorCode, error.ErrorMessage);
}

## continue working with the subscription object.

```