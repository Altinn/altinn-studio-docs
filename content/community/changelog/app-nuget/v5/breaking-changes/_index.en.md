---
title: Breaking changes
description: Overview of breaking changes introduced into app nuget packages in v5.0.0.
---

## 1. Update the Altinn.App* package refrences to version 5.3.0.
Navigate to your application repository and find App.csproj in the App folder.

Once you locate the file, update the Altinn.App.* package refrences to version 5.3.0.

```xml
    <PackageReference Include="Altinn.App.Api" Version="5.3.0">
      <CopyToOutputDirectory>lib\$(TargetFramework)\*.xml</CopyToOutputDirectory>
    </PackageReference>
    <PackageReference Include="Altinn.App.Common" Version="5.3.0" />
    <PackageReference Include="Altinn.App.PlatformServices" Version="5.3.0" />
```

## 2. PDF generation implementation moved out from AppBase/IAltinnApp
All code related the generation of Pdf has been extracted from AppBase.cs and moved into PdfService.cs which in turn implements IPdfService. This opens up and allows us as service developers to replace the default Pdf implementation entirely.

Since App.cs passes parameteres to AppBase.cs you need to remove those no longer in use in the call to `base(...)` in the cosntructor:
* processService
* settings
* textService
  
Your App constructor should then look something like this:

```csharp
 public App(
            IAppResources appResourcesService,
            ILogger<App> logger,
            IData dataService,
            IProcess processService,
            IPdfService pdfService,
            IProfile profileService,
            IRegister registerService,
            IPrefill prefillService,
            IInstance instanceService,
            IOptions<GeneralSettings> settings,
            IText textService,
            IHttpContextAccessor httpContextAccessor) : base(
                appResourcesService,
                logger,
                dataService,
                pdfService,
                prefillService,
                instanceService,
                httpContextAccessor)
```
It might be that you don't use any of the removed services in you app code either, then you should remove those from the App constructor as well.


If you have implemented custom code to control Pdf generation, and depending on how you have done this, you have a couple options when it comes to what you need to do to resolve the breaking change. However the end result should be the same.

1. **Custom code in PdfHandler.cs**  
   This is when you have added custom code in PdfHandler.cs. You should continue to use this class but it needs to implement an interface by following the steps below:

   1. Make sure the PdfHandler class implements the ICustomPdfHandler interface.  
    Navigate to PdfHandler.cs and add `: ICustomPdfHandler` after the class name. The class should allready have the method defined in the interface.
    When adding the `ICustomPdfHandler`interface you also need to add a using statement `using Altinn.App.PlatformServices.Interface;`.

        ```csharp
        /// <summary>
        /// Handler for formatting PDF.
        /// </summary>
        public class PdfHandler : ICustomPdfHandler
        {
            /// <summary>
            /// Method to format PDF dynamic
            /// </summary>
            /// <example>
            ///     if (data.GetType() == typeof(Skjema)
            ///     {
            ///     // need to create object if not there
            ///     layoutSettings.Components.ExcludeFromPdf.Add("a23234234");
            ///     }
            /// </example>
            /// <param name="layoutSettings">the layoutsettings</param>
            /// <param name="data">data object</param>
            public async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
            {
                // Your code here
                return await Task.FromResult(layoutSettings);
            }
        }
        ```
    1. Register the PdfHandler implementation in Startup.cs  
        Add the following line
        ```csharp
        services.AddTransient<ICustomPdfHandler, PdfHandler>();
        ```
        You should add it above the registration of your application
        ```csharp
        services.AddTransient<ICustomPdfHandler, PdfHandler>();
        // Altinn App implementation service (The concrete implementation of logic from Application repository)
        services.AddTransient<IAltinnApp, AppLogic.App>();
        ```

    2. Your custom implementation will now be injected into the PdfService implementation and be called during the Pdf generation process.
       When adding a custom PdfHandler you also need the `using Altinn.App.AppLogic.Print;` statement.

2. **Custom code in FormatPdf method**  
  This the old way when you have your code directly in the overridden FormatPdf method in App.cs in your application.

    ```csharp
    public override async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
    {
        // You have code here...
    }
    ```
    1. Create a new class PdfHandler.cs and have it implement the ICustomPdfHandler interface
    2. Move your custom code to the FormatPdf method of the new class. You should then have a implementation similar to the example in step 1.1 above:

    
        ```csharp
        public class PdfHandler : ICustomPdfHandler
        {
            public async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
            {
                // Your code here
                return await Task.FromResult(layoutSettings);
            }
        }
        ```

## 3. Obsolete method GetOptionId removed from App/AppBase/IAltinnApp
In [version 4.24.0](../../v4/whats-new/) we introduced a new way of supporting dynamic options making the GetOptionId methods in obsolete. The methods have now been removed and you should use the new way of implementing options as described [in the documentation](../../../../../app/development/data/options/)

When you update your app you should then remove the following from App.cs as this method is removed from AppBase.cs:
```csharp
        /// <inheritdoc />
#pragma warning disable CS0672 // Member overrides obsolete member
        public override Task<AppOptions> GetOptions(string id, AppOptions options)
#pragma warning restore CS0672 // Member overrides obsolete member
        {
            return Task.FromResult(options);
        }
```

## 4. Obsolete method RunAppEvent removed from App/AppBase/IAltinnApp
The RunAppEvent method is a old construct for hooking into various application events. This have been made obsolete by having concrete method overrides for each type of event as [described in the documentation](/technology/architecture/components/application/construction/app/app-backend/applogic-events/). The RunAppEvent method was passed in an `AppEventType` enum which specified the type of event that was fired. You would then need to have code checking the type and performing the logic needed. The table below shows the old enum values and their corresponding new methods that should be used instead.

| Enum                      |Corresponding method                       |
| ---                       | ---                                       |
| Calculation               | RunProcessDataRead or RunProcessDataWrite |
| Instantiation             | RunDataCreation                           |
| ValidateInstantiation     | RunInstantiationValidation                |
| Validation                | RunDataValidation                         |
| DataRetrieval             | RunProcessDataRead                        |
| BeforeProcessChange       | OnStartProcess                            |
| AfterProcessChange        | OnEndProcess                              |
| AppModelCreation          | CreateNewAppModel                         |

The AppEventType.cs has been removed. This was referenced and used in App.cs - both the using reference and usage needs to be removed.

Delete the following:
```csharp
using Altinn.App.Common.Enums;
```
and  

```csharp
/// <summary>
/// Run app event
/// </summary>
/// <remarks>DEPRECATED METHOD, USE EVENT SPECIFIC METHOD INSTEAD</remarks>
/// <param name="appEvent">The app event type</param>
/// <param name="model">The service model</param>
/// <param name="modelState">The model state</param>
/// <returns>True if the event was handled</returns>
public override async Task<bool> RunAppEvent(AppEventType appEvent, object model, ModelStateDictionary modelState = null)
{
    _logger.LogInformation($"RunAppEvent {appEvent}");

    return await Task.FromResult(true);
}
```
The `RunAppEvent`method should be replaced with the appropriate methods as described above.

## 5. Obsolete methods RunCalculation removed from AppBase/IAltinnApp
[In version 4.7.0](../../../../../community/changelog/app-nuget/) the RunCalculation method was replaced with the methods RunProcessDataRead and RunProcessDataWrite. RunCalculation has now been removed and those that have code in this method needs to move this to either RunProcessDataRead or RunProcessDataWrite.

The process to update is:

1. Add the DataProcessing folder and DataProcessingHandler class from our [app template](https://github.com/Altinn/app-template-dotnet/blob/e600e19/src/App/logic/DataProcessing/DataProcessingHandler.cs) to your app.
2. Update App.cs. Add a class field for DataProcessingHandler and copy new methods (RunProcessDataRead and RunProcessDataWrite) from [App.cs](https://github.com/Altinn/app-template-dotnet/blob/e600e19/src/App/logic/App.cs)
3. Move logic from calculation handler to DataProcessingHandler
4. Remove RunCalculation method from App.cs
5. Remove CalculationHandler when code has been moved to DataProcessingHandler.
6. Compile and test your app. 
