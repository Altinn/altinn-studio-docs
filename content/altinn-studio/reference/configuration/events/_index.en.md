---
title: Events
description: How to create custom events for an app.
toc: true
weight: 400
---

## Activate generation of events in your application

{{%notice info%}}
To allow generating events for your application it must refer to nuget version >= 1.2.4.
See how you update nuget references for your application [here](/altinn-studio/reference/maintainance/dependencies/).
{{% /notice%}}

Generation and storing of events is not enabled by default in applications per 22.10.2020.
Because of this, a manual step is required before your application can generate events.

In the file `appsettings.json` in the folder _App_ the following should be added into the section _AppSettings_

```json
"RegisterEventsWithEventsComponent": true
```

## Pushing self defined events into your application

The service `IEvents` is exposed in the application and can be dependency injected
into the class where you need to generate a self defined event.

The method _AddEvent_ requires the name of the event type and the instance as input

### Code example

In this section you can find an example of how to generate a self 
defined event by instantiation within the application

The logic is implemented in `InstantiationHandler.cs`

```cs
using Altinn.App.Services.Interface;
using Altinn.App.PlatformServices.Interface;
using Altinn.App.Services.Models.Validation;
using Altinn.Platform.Storage.Interface.Models;
using System.Threading.Tasks;
// using Altinn.App.Models; // Uncomment this line to refer to app model(s)

namespace Altinn.App.AppLogic
{
    public class InstantiationHandler
    {
        private IProfile _profileService;
        private IRegister _registerService;
        private IEvents _eventsService;

        /// <summary>
        /// Set up access to profile and register services
        /// </summary>
        public InstantiationHandler(IProfile profileService, IRegister registerService, IEvents eventsService)
        {
            _profileService = profileService;
            _registerService = registerService;
            _eventsService = eventsService;
        }

        /// <summary>
        /// Run validations related to instantiation
        /// </summary>
        /// <example>
        /// if ([some condition])
        /// {
        ///     return new ValidationResult("[error message]");
        /// }
        /// return null;
        /// </example>
        /// <param name="instance"></param>
        /// <param name="validationResults"></param>
        /// <returns>The validation result object (null if no errors) </returns>
        public async Task<InstantiationValidationResult> RunInstantiationValidation(Instance instance)
        {
            return await Task.FromResult((InstantiationValidationResult)null);
        }

        /// <summary>
        /// Run events related to instantiation
        /// </summary>
        /// <remarks>
        /// For example custom prefill.
        /// </remarks>
        /// <param name="instance">Instance information</param>
        /// <param name="data">The data object created</param>
        public async Task DataCreation(Instance instance, object data)
        {
            await _eventsService.AddEvent("app.test.event", instance);
            await Task.CompletedTask;
        }
    }
}
```

1. The private variable in the service is included in the class

    ```cs
    private IEvents _eventsService;
    ```

2. Namespace for IEvents must be included in the class. 
    Add the line below among the other _using_ statements in the top of the file.

    ```cs
    using Altinn.App.PlatformServices.Interface;
    ```

3. The IEvents service is dependency injected into the class. And the private variable is assigned a value.

    ```cs
        public InstantiationHandler(IProfile profileService, IRegister registerService, IEvents eventsService)
        {
            _profileService = profileService;
            _registerService = registerService;
            _eventsService = eventsService;
        }
    ```

4. In the method where you need to generate an event you call the service.

    Here the self defined event has received the name `app.test.event`,
    in addition the instance is sent. This is used to populate remaining metadata about the event

    ```cs
    await _eventsService.AddEvent("app.test.event", instance);  
   ```

5. If you try building the solution at this point, it will fail.

    IEvents will be missing the location where the InstantiationHandler is instantiated. 
    Navigate to `App.cs`and dependency inject the service into App's constructor.

    Further the service must be added into the call where InstantiationHandler is instantiated as shown below.

    ```cs
    public App(
        IAppResources appResourcesService,
        ILogger<App> logger,
        IData dataService,
        IProcess processService,
        IPDF pdfService,
        IProfile profileService,
        IRegister registerService,
        IPrefill prefillService,
        IEvents eventsService
        ) : base(appResourcesService, logger, dataService, processService, pdfService, prefillService)
    {
        _logger = logger;
        _validationHandler = new ValidationHandler();
        _calculationHandler = new CalculationHandler();
        _instantiationHandler = new InstantiationHandler(profileService, registerService, eventsService);
    }
    ```

6. Your application is now ready to generate a self defined event during instantiation.
You can [test this locally](https://github.com/Altinn/app-localtest/blob/master/README.md) before eventually deploying to a test environment.
