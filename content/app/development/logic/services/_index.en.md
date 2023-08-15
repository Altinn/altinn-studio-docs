---
title: Services
linktitle: Services
description: How to use a few different services hidden away in the app template library.
toc: true
---

## Person lookup
The person lookup service can be use to verify a national identity number and to retrieve person information about the identified person. The user will need to provide the national identity number and the last name of the person. The service will then verify the input by comparing it with stored data. Both input are required and the last name is used to prevent cleaning of random identity numbers. If the user inputs invalid data too many times the service will block the user for some time.

The returned person data can be used to populate additional fields in the model.

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v7">}}
### Person lookup example
The service can be used in any of the handlers in the logic namespace. Below we've created an example using the `ProcessDataWrite` method in `DataProcessor`.

```C#
using System;
using System.Threading;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Core.Interface;
using Altinn.App.Models;
using Altinn.Platform.Register.Models;
using Altinn.Platform.Storage.Interface.Models;
using Microsoft.Extensions.Logging;

namespace Altinn.App.AppLogic.DataProcessing;

public class DataProcessor : IDataProcessor

public async Task<bool> ProcessDataWrite(
    Instance instance, Guid? dataId, object data)
{
    if (data is MessageV1 message)
    {
        Person person = await _personLookup.GetPerson(
            message.Personnummer, 
            message.Etternavn, 
            CancellationToken.None);

        message.Fornavn = person.FirstName;
        return true;
    }

    return false;
}
```

For this to work we'll need to do a few other changes in `DataProcessor`. 

Add a private field `_personLookup` for the lookup service and change the constructor to take an instance of the service. Initialize the field in the body of the constructor.

```C#
private readonly IPersonLookup _personLookup;

public DataProcessingHandler(IPersonLookup personLookup)
{
    _personLookup = personLookup;
}
```

Register you custom implementation in the Program.cs class

```C# {hl_lines=[3]}
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
{
    services.AddTransient<IPersonService, PersonService>();
    services.AddTransient<IDataProcessor, DataProcessor>();
    // Other custom services
}

{{</content-version-container>}}
{{<content-version-container version-label="v4, v5, v6">}}
### Person lookup example
The service can be used in any of the handlers in the logic namespace. Below we've created an example using the `ProcessDataWrite` method in `DataProcessingHandler`.

```C#
public async Task<bool> ProcessDataWrite(
    Instance instance, Guid? dataId, object data)
{
    if (data is MessageV1 message)
    {
        Person person = await _personLookup.GetPerson(
            message.Personnummer, 
            message.Etternavn, 
            CancellationToken.None);

        message.Fornavn = person.FirstName;
        return true;
    }

    return false;
}
```

For this to work we'll need to do a few other changes in `DataProcessingHandler`. 

Add a private field for the lookup service and change the constructor to take an instance of the service. Initialize the field in the body of the constructor.

```C#
private readonly IPersonLookup _personLookup;

public DataProcessingHandler(IPersonLookup personLookup)
{
    _personLookup = personLookup;
}
```

The changes to the `DataProcessingHandler` constructor also force us to update the constructor call from the `App` class constructor. Add `IPersonLookup` as an input parameter and use the parameter value as input to the constructor of `DataProcessingHandler`.

```C# {hl_lines=[4,9]}
public App(
    ...
    IText textService,
    IPersonLookup personLookup,
    IHttpContextAccessor httpContextAccessor) : base(...)
{
    _logger = logger;
    _validationHandler = new ValidationHandler(httpContextAccessor);
    _dataProcessingHandler = new DataProcessingHandler(personLookup);
    _instantiationHandler = new InstantiationHandler(profileService, registerService);
    _pdfHandler = new PdfHandler();
}
```
{{</content-version-container>}}

{{</content-version-selector>}}

### A note on exception handling

With no other changes than those above, the app backend will return response code `429 - TooManyRequests` if the user has been typing in invalid data too many times. This response code is currently not handled by the frontend react application which results in an "unknown error". This can be avoided with exception handling that singles out any `PlatformHttpException` with a response with status code 429, but there are currently no built in mechanism to convey to the user why a request failed. A workaround for this limitation is to use a property on the data model.

```C#
try
{
    ...
    return true;
}
catch (PlatformHttpException phex)
{
    switch (phex.Response.StatusCode)
    {
        case HttpStatusCode.TooManyRequests:
            // Add corrective messures
            break;
        case HttpStatusCode.NotFound:
            // Add corrective messures
            break;
    }
    throw;
}
```
