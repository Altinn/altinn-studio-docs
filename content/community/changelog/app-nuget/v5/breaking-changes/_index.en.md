---
title: Breaking changes
description: Overview of breaking changes introduced into app nuget packages in v5.0.0.
---

## 1. PDF generation implementation moved out from AppBase/IAltinnApp
All code related the generation of Pdf has been extracted from AppBase.cs and moved into PdfService.cs which in turn implements IPdfService. This opens up and allows us as service developers to replace the default Pdf implementation entirely.

If you have implemented custom code to control Pdf generation, and depending on how you have done this, you have a couple options when it comes to what you need to do to resolve the breaking change. However the end result should be the same.

1. **Custom code in PdfHandler.cs**  
   This is when you have added custom code in PdfHandler.cs. You should continue to use this class but it needs to implement an interface by following the steps below:

   1. Make sure the PdfHandler class implements the ICustomPdfHandler interface.  
    Navigate to PdfHandler.cs and add `: ICustomPdfHandler` after the class name. The class should allready have the method defined in the interface.

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
    2. Register the PdfHandler implementation in Startup.cs  
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

    3. Your custom implementation will now be injected into the PdfService implementation and be called during the Pdf generation process.

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

## 2. Obsolete method GetOptionId removed from App/AppBase/IAltinnApp
In [version 4.24.0](../../v4/whats-new/_index.en.md) we introduced a new way of supporting dynamic options making the GetOptionId methods in obsolete. The methods have now been removed and you should use the new way of implementing options as described [in the documentation](../../../../../app/development/data/options/_index.en.md)

## 3. Obsolete method RunAppEvent removed from App/AppBase/IAltinnApp
The RunAppEvent method is a old construct for hooking into various application events. This have been made obsolete by having concrete method overrides for each type of event as [described in the documentation](../../../../../technology/architecture/components/application/construction/altinn-apps/app/app-backend/applogic-events/_index.md). The RunAppEvent method was passed in an `AppEventType` enum which specified the type of event that was fired. You would then need to have code checking the type and performing the logic needed. The table below shows the old enum values and their corresponding new methods that should be used instead.

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

## 4. Obsolete methods RunCalculation removed from AppBase/IAltinnApp
[In version 4.7.0](../../../../../community/changelog/app-nuget/_index.en.md) the RunCalculation method was replaced with the methods RunProcessDataRead and RunProcessDataWrite. RunCalculation has now been removed and those that have code in this method needs to move this to either RunProcessDataRead or RunProcessDataWrite.

The process to update is:

1. Add the DataProcessing folder and DataProcessingHandler class from our [app template](https://github.com/Altinn/app-template-dotnet/blob/main/src/App/logic) to your app.
2. Update App.cs. Add a class field for DataProcessingHandler and copy new methods (RunProcessDataRead and RunProcessDataWrite) from [App.cs](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/App/logic/App.cs)
3. Move logic from calculation handler to DataProcessingHandler
4. Remove RunCalculation method from App.cs
5. Remove CalculationHandler when code has been moved to DataProcessingHandler.
6. Compile and test your app. 
