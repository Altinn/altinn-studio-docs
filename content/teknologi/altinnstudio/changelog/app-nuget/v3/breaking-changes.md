---
title: Breaking changes
linktitle: Breaking changes
description: Overview of breaking changes introduced into app nuget packages in v3.0.0
---

We have added a new PDF handler to make it possible to hide pages and components in PDF.

The new version of the Altinn.App.* packages have breaking changes:

Updating to this version will require changes in multiple files.

1. Updated package dependencies  
    Navigate to you application repository and find `App.csproj` in the `App` folder.  
    Update nuget dependencies in `App.csproj` to version 3.0.0.  
    ```xml
    <PackageReference Include="Altinn.App.Api" Version="3.0.0" />
    <PackageReference Include="Altinn.App.Common" Version="3.0.0" />
    <PackageReference Include="Altinn.App.PlatformServices" Version="3.0.0" />
    ```

2. Create a new file for a new class called PdfHandler in the logic/Print folder [File from template](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/App/logic/Print/PdfHandler.cs)  
    ```cs
    using System.Threading.Tasks;
    using Altinn.App.Common.Models;

    namespace Altinn.App.AppLogic.Print
    {
      /// <summary>
      /// Handler for formatting PDF.
      /// </summary>
      public class PdfHandler
      {
        /// <summary>
        /// Method to format PDF dynamic
        /// </summary>
        /// <param name="layoutSettings">the layoutsettings</param>
        /// <param name="data">data object</param>
        public async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
        {
            return await Task.FromResult(layoutSettings);
        }
      }
    }
    ```

3. Changes to the App.cs file  
    Add using
    ```cs
    using Altinn.App.AppLogic.Print;
    using Microsoft.Extensions.Options;
    using Microsoft.AspNetCore.Http;
    using Altinn.App.Services.Configuration;
    ```

    Add a new private field below InstantiationHandler
    ```cs
      private readonly PdfHandler _pdfHandler;
    ```

    Change constructor from:
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
        IInstance instanceService
        ) : base(appResourcesService, logger, dataService, processService, pdfService, prefillService, instanceService)
      ```
      to:
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
        IInstance instanceService,
        IOptions<GeneralSettings> settings,
        IText textService,
        IHttpContextAccessor httpContextAccessor) : base(
          appResourcesService,
          logger,
          dataService,
          processService,
          pdfService,
          prefillService,
          instanceService,
          registerService,
          settings,
          profileService,
          textService,
          httpContextAccessor)
      {
        _logger = logger;
        _validationHandler = new ValidationHandler(httpContextAccessor);
        _calculationHandler = new CalculationHandler();
        _instantiationHandler = new InstantiationHandler(profileService, registerService);
        _pdfHandler = new PdfHandler();
      }
      ```

    Add method 
    ```cs
    /// <summary>
    /// Hook to run logic to hide pages or components when generatring PDF
    /// </summary>
    /// <param name="layoutSettings">The layoutsettings. Can be null and need to be created in method</param>
    /// <param name="data">The data that there is generated PDF from</param>
    /// <returns>Layoutsetting with possible hidden fields or pages</returns>
    public override async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
    {
        return await _pdfHandler.FormatPdf(layoutSettings, data);
    }
    ```
