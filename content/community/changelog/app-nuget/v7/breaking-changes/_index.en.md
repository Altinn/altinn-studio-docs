---
title: Breaking changes
description: Overview of breaking changes introduced in v7.0.0 of the App Nuget packages.
toc: true
---

{{% panel %}}
**Alpha Release**  
This is a alpha relase and is not used by default in new applications. Version 7 is a major rewrite of the app libraries to reduce Altinns dotnet code in a application.

{{% /panel %}}

{{% notice warning  %}}

If your application still is on version v5 or lower you should read the breaking changes guides until your application is updated to v6.

{{% /notice %}}

## Updating Altinn.App.* PackageReferences from v6 to v7

As mentioned [here](../) we have moved the code around and reduced the old nugets to two and introduced a new one.

To upgrade from v6 nuget to v7 nugets the Altinn.App.* PackageReferences in `App/App.csproj` needs to be changed from:

```xml
  <ItemGroup>
    <PackageReference Include="Altinn.App.Api" Version="6.0.2">
      <CopyToOutputDirectory>lib\$(TargetFramework)\*.xml</CopyToOutputDirectory>
    </PackageReference>
    <PackageReference Include="Altinn.App.Common" Version="6.0.2" />
    <PackageReference Include="Altinn.App.PlatformServices" Version="6.0.2" />
    <!-- Additional PackageReferences -->
  </ItemGroup>
```

to 

```xml
  <ItemGroup>
    <PackageReference Include="Altinn.App.Api" Version="7.0.0">
      <CopyToOutputDirectory>lib\$(TargetFramework)\*.xml</CopyToOutputDirectory>
    </PackageReference>
    <PackageReference Include="Altinn.App.Core" Version="7.0.0" />
  <!-- Additional PackageReferences -->
  </ItemGroup>
```

Once you or your IDE has completed the `dotnet restore` process your code will have multiple compilation warnings.
Work your way through the rest of this page and you will remove them one at a time.

## Upgrading Promgram.cs

It's highly recomended to follow the migration guide to [v6](../../v6/breaking-changes/) if your application still hasn't been upgraded to from v4 or v5.

In previous versions Altinn provided code and registration of custom/override services where hard to separate.
As an attempt to make it easier to see customer provided services we have extracted most of our code and introduced a new method at the top of Program.cs

Steps:

1. Identify the custom services your application has registered in Program.cs. Take a note of these as we will have to register them again later.
2. Copy and paste the version 7 of Program.cs from our template at [altinn/app-template-dotnet](https://github.com/Altinn/app-template-dotnet/blob/chore/90-appbase-simplified/src/App/Program.cs) into your `App/Program.cs` (replacing existing code)
3. Register your apps custom services from step 1 in the method `RegisterCustomAppServices`


## Replacing or upgrading old classes to implement new Interfaces

### Upgrade and register DataProcessingHandler

Custom logic while performing DataWrite or DataRead are from v7 handeled by registering a service class implementing `Altinn.App.Core.Features.DataProcessing.IDataProcessor`

If your `App/logic/DataProcessing/DataProcessingHandler.cs` is similar to the following code you can delete the file and move on [Replace InstantiationHandler.cs and register new service](#replace-instantiationhandlercs-and-register-new-service).

```csharp
using System;
using System.Threading.Tasks;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.AppLogic.DataProcessing
{
    public class DataProcessingHandler
    {
        public async Task<bool> ProcessDataRead(Instance instance, Guid? dataId, object data)
        {
            return await Task.FromResult(false);
        }

        public async Task<bool> ProcessDataWrite(Instance instance, Guid? dataId, object data)
        {
            return await Task.FromResult(false);
        }
    }
}
```

If you have custom code in this class complete the steps below:
1. Create a new class named `DataProcessor` in the folder `App/logic/DataProcessing`, make the class implement the interface  `Altinn.App.Core.Features.IDataProcessor`. The file should now look something like this:
   ```csharp
   using System;
    using System.Threading.Tasks;
    using Altinn.App.Core.Features;
    using Altinn.Platform.Storage.Interface.Models;

    namespace Altinn.App.AppLogic.DataProcessing;

    public class DataProcessor : IDataProcessor
    {
        public async Task<bool> ProcessDataRead(Instance instance, Guid? dataId, object data)
        {
        }

        public async Task<bool> ProcessDataWrite(Instance instance, Guid? dataId, object data)
        {
        }
    }
   ```
2. Move your code from the file `App/logic/DataProcessing/DataProcessingHandler.cs` to the file you just created.
3. Register `DataProcessor`  in the method `RegisterCustomAppServices` `App/Program.cs`
    ```csharp
     void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
    {
      services.AddTransient<IDataProcessor, DataProcessor>();

      // Other custom services
    }
    ```
    Remember to add the necessary usings.
4. Delete the old DataProcessingHandler.cs file

### Replace InstantiationHandler.cs and register new service

The logic that previously was defined in `App/logic/InstantiationHandler.cs` is now defined by implementing two interfaces

* `IInstantiationProcessor` is used to do custom data/instance manipulation during instantiation. Replaces the method `DataCreation` in `InstantiationHandler`
* `IInstantiationValidator` is used to do custom validation during Instantiation. Replaces the method `RunInstantiationValidation` in `InstantiationHandler`

If your `App/logic/InstantiationHandler.cs` looks like the code below you have no custom code here and can delete the class now and move on to [Upgrade ValidationHandler.cs and register new service](#upgrade-validationhandlercs-and-register-new-service)

```csharp
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Services.Interface;
using Altinn.App.Services.Models.Validation;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.AppLogic
{
    public class InstantiationHandler
    {
        private IProfile _profileService;
        private IRegister _registerService;

        public InstantiationHandler(IProfile profileService, IRegister registerService)
        {
            _profileService = profileService;
            _registerService = registerService;
        }

        public async Task<InstantiationValidationResult> RunInstantiationValidation(Instance instance)
        {
            return await Task.FromResult((InstantiationValidationResult)null);
        }

        public async Task DataCreation(Instance instance, object data, Dictionary<string, string> prefill)
        {
            await Task.CompletedTask;
        }
    }
}
```

If you have custom code in the mehod `DataCreation` complete these steps:
1. Create a new Class named `InstantiationProcessor.cs` in `App/logic/DataProcessing` and implement the interface `Altinn.App.Core.Features.IInstantiationProcessor`. The class can be named or placed where you like, this is only a suggestion. The file should look something like this now:
    ```csharp
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Altinn.App.Core.Features;
    using Altinn.Platform.Storage.Interface.Models;

    namespace Altinn.App.AppLogic.DataProcessing;

    public class InstantiationProcessor : IInstantiationProcessor
    {
        public async Task DataCreation(Instance instance, object data, Dictionary<string, string> prefill)
        {
            
        }
    }
    ```
2. Move all the code from `DataCreation` in `ÌnstantiationHandler.cs` into the method `DataCreation` in the class you just created.
3. Register `InstantiationProcessor`  in the method `RegisterCustomAppServices` `App/Program.cs`
    ```csharp
     void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
    {
      services.AddTransient<IInstantiationProcessor, InstantiationProcessor>();

      // Other custom services
    }
    ```
    Remember to add the necessary usings.


If you have custom code in the method `RunInstantiationValidation` complete the steps below, if not delete `App/logic/InstantiationHandler.cs` and move on to [Upgrade ValidationHandler.cs and register new service](#upgrade-validationhandlercs-and-register-new-service):

1. Create a new Class named `InstantiationValidator.cs` in `App/logic/Validation` and implement the interface `Altinn.App.Core.Features.IInstantiationValidator`. The class can be named or placed where you like, this is only a suggestion. 
   The file should look something like this now:
    ```csharp
    using System.Threading.Tasks;
    using Altinn.App.Core.Features;
    using Altinn.App.Core.Models.Validation;
    using Altinn.Platform.Storage.Interface.Models;

    namespace Altinn.App.AppLogic.Validation;

    public class InstantiationValidator : IInstantiationValidator
    {
        public async Task<InstantiationValidationResult> Validate(Instance instance)
        {
            
        }
    }
    ```
2. Move all the code from `RunInstantiationValidation` in `ÌnstantiationHandler.cs` into the method `Validate` in the class you just created.
3. Register `InstantiationValidator`  in the method `RegisterCustomAppServices` `App/Program.cs`
    ```csharp
     void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
    {
      services.AddTransient<IInstantiationValidator, InstantiationValidator>();

      // Other custom services
    }
    ```
    Remember to add the necessary usings.

You can now delete the file `App/logic/InstantiationHandler.cs`

### Upgrade ValidationHandler.cs and register new service

Custom data and task validation is in v7 handeled by registering a service class implementing `Altinn.App.Core.Features.IInstanceValidator`.

If your `App/logic/Validation/ValidationHandler.cs` looks like the code below you have no custom code and can delete the file. And move on to [Upgrading custom PdfFormatting]().

```csharp
using System.Threading.Tasks;
using Altinn.Platform.Storage.Interface.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Altinn.App.AppLogic.Validation
{
    public class ValidationHandler
    {
        private IHttpContextAccessor _httpContextAccessor;

        public ValidationHandler(IHttpContextAccessor httpContextAccessor = null)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task ValidateData(object data, ModelStateDictionary validationResults)
        {
            await Task.CompletedTask;
        }

        public async Task ValidateTask(Instance instance, string taskId, ModelStateDictionary validationResults)
        {
            await Task.CompletedTask;
        }
    }
}
```

If you have custom code here complete the steps below:

1. Create a new class named `InstanceValidator` in the folder `App/logic/Validation`, make the class implement the interface `Altinn.App.Core.Features.IInstanceValidator`. The file should now look something like this:
    ```csharp
    using System.Threading.Tasks;
    using Altinn.App.Core.Features;
    using Altinn.Platform.Storage.Interface.Models;
    using Microsoft.AspNetCore.Mvc.ModelBinding;

    namespace Altinn.App.AppLogic.Validation;

    public class InstanceValidator : IInstanceValidator
    {
        public async Task ValidateData(object data, ModelStateDictionary validationResults)
        {
        }

        public async Task ValidateTask(Instance instance, string taskId, ModelStateDictionary validationResults)
        {
        }
    }
    ```
2. Move the code in `ValidateData` method in the old class `ValidatorHandler` to the new one in `InstanceValidator` class.
3. Move the code in `ValidateTask` method in the old class `ValidatorHandler` to the new one in `InstanceValidator` class.
4. Register `InstanceValidator`  in the method `RegisterCustomAppServices` `App/Program.cs`
    ```csharp
    void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
    {
      services.AddTransient<IInstanceValidator, InstanceValidator>();

      // Other custom services
    }
    ```
    Remember to add the necessary usings.
5. Delete the ValidationHandler.cs file.

### Upgrading Custom PDF formatting logic

In previous versions dynamic customization was handled by registering a service implementing ICustomPdfHandler. In v7 this is done by registering a service implementing `Altinn.App.Core.Features.Pdf.IPdfFormatter`

If your `App/logic/Pdf/PdfHandler.cs` looks like the following code you have no custom code and can delete the file and move on to [Updating PageOreder logic]()


```csharp
using System.Threading.Tasks;
using Altinn.App.Common.Models;
using Altinn.App.PlatformServices.Interface;

namespace Altinn.App.AppLogic.Print
{
    public class PdfHandler: ICustomPdfHandler
    {
        public async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
        {
            return await Task.FromResult(layoutSettings);
        }
    }   
}

```

If not, complete the steps below:
1. Create a new class named `PdfFormatter` in the folder `App/logic/Pdf`. make the class implement the interface `Altinn.App.Core.Features.IPdfFormatter`. The file should new look something like this:
    ```csharp
    using System.Threading.Tasks;
    using Altinn.App.Core.Features;
    using Altinn.App.Core.Models;

    namespace Altinn.App.AppLogic.Print
    {
        public class PdfHandler: IPdfFormatter
        {
            public async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
            {
            }
        }   
    }
    ```
2. Move youre code from ICustomPdfHandler to the newly created PdfFormatter class.
3. Register `PdfFormatter`  in the method `RegisterCustomAppServices` `App/Program.cs`
    ```csharp
     void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
    {
      services.AddTransient<IPdfFormatter, PdfFormatter>();

      // Other custom services
    }
    ```
    Remember to add the necessary usings.
4. Delete the old file 
5. Remove the transient service registration of the old class from `Program.cs`. Should look something like this: `services.AddTransient<ICustomPdfHandler, PdfHandler>();` (remove it by deleteing the line)


### Upgrading PageOrder.cs

In v5 of the nugets tracks or pageorder was extracted in a non-breaking way from App.cs. The old way was deprecated in v6 and now removed in v7.

The new way of defining page order in v5 has not really change in v7, but some interfaces has moved namespace.

If you don't have any classes implementing IPageOrder you can safely move on to [Moving code form App.cs and removing it](#moving-code-from-appcs-and-removing-it)

If you do have a class implementing IPageOrder here are some changes in namespace that might be helpful to know:
* The namespace for IPageOrder has changed from __Altinn.App.Services.Interfaces__ to `Altinn.App.Core.Features.PageOrder`
* The namespace for AppIdentifier has changed from __Altinn.App.PlatformSerices.Models__ to `Altinn.App.Core.Models`
* The namespace for IAppResources has changed from __Altinn.App.PlatformSerices.Interface__ `Altinn.App.Core.Interface`

## Moving eFormidling code

This next chapter only applies to applications which integrates with eFormidling. If yours don't you can move on to [Moving code from App.cs and removing it](#moving-code-from-appcs-and-removing-it)

To determin if your app is integrated agains eFormidling check if you have defined the method `GenerateEFormidlingMetadata` defined in `App/logic/App.cs`
### Move code from GenerateEFormidlingMetadata in App.cs

1. Create a new class named `EFormidlingMetadata` in the folder `App/logic/EFormidling`. You can name and place the file whatever and wherever you like, this is just an suggestion. Make the newly created class implement the interface `Altinn.App.Core.EFormidling.Interface.IEFormidlingMetadata`. The file should look something like this now:
    ```csharp
    using System.IO;
    using System.Threading.Tasks;
    using Altinn.App.Core.EFormidling.Interface;
    using Altinn.Platform.Storage.Interface.Models;

    namespace Altinn.App.logic.EFormidling;

    public class EFormidlingMetadata : IEFormidlingMetadata
    {
        public Task<(string MetadataFilename, Stream Metadata)> GenerateEFormidlingMetadata(Instance instance)
        {
            
        }
    }
    ```
3. Move the code from the method `GenerateEFormidlingMetadata` in `App/logic/App.cs` to the method `GenerateEFormidlingMetadata` in the class you just created.


### Move code from GetEFormidlingReceivers in App.cs

If you have no definition of `GetEFormidlingReceivers` in `App/logic/App.cs` you can move on to [Register Eformidling implementation](#register-eformidling-implementation). If it is defined complete the following steps

1. Create a new class named `EFormidlingReceivers`in `App/logic/EFormidling`. You can name and place the file whatever and whereever you like, this is just an suggestion. Make the new class implement the interface `Altinn.App.Core.EFormidling.Interface.IEFormidlingReceivers`. The file should look something like this now:
    ```csharp
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Altinn.App.Core.EFormidling.Interface;
    using Altinn.Common.EFormidlingClient.Models.SBD;
    using Altinn.Platform.Storage.Interface.Models;

    namespace Altinn.App.logic.EFormidling;

    public class EFormidlingReceivers : IEFormidlingReceivers
    {
        public Task<List<Receiver>> GetEFormidlingReceivers(Instance instance)
        {
        }
    }
    ```
2. Move the code from the method `GetEFormidlingReceivers` in `App/logic/App.cs` to the mwthod `GetEformidlingReceivers` in the class you just created.

### Register Eformidling implementation

This step depends on the previous steps. Whether your code has custom logic for GetEFormidlingReceivers or not.

In the method `RegisterCustomAppServices` in `Program.cs` you need to register the eFormidling implementation.

To add eFormidling services and your imnplementation `EFormidlingMetadata` add this to your `RegisterCustomAppServices`. 

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
{
    services.AddEFormidlingServices<EFormidlingMetadata>(config);
}
```

This will register the default implementation of [IEFormidlingReceivers](https://github.com/Altinn/app-lib-dotnet/blob/chore/90-appbase-simplified/src/Altinn.App.Core/EFormidling/Implementation/DefaultEFormidlingReceivers.cs)

If you have a custom implementation of `IEFormidlingReceivers` you should add your implementation as the second type parameter:

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
{
    services.AddEFormidlingServices<EFormidlingMetadata, IEFormidlingReceivers>(config);
}
```

## Moving code from App.cs and removing it

As we are going to extract code from App.cs and eventually removing it there is no need to pay attention to compilation error.

The next sections will extract custom code from App.cs, if any, and move it to its new home.

### Moving custom code in RunProcessDataRead and RunProcessDataWrite

If `RunProcessDataRead` and `RunProcessDataWrite` in `App/App.cs` looks like the code below you have no custom code and can safely move on to [Moving custom code in RunDataValidation and RunTaskValidation](#moving-code-from-appcs-and-removing-it). If not complete the steps below.

```csharp
        public override async Task<bool> RunProcessDataRead(Instance instance, Guid? dataId, object data)
        {
            return await _dataProcessingHandler.ProcessDataRead(instance, dataId, data);
        }

        public override async Task<bool> RunProcessDataWrite(Instance instance, Guid? dataId, object data)
        {
            return await _dataProcessingHandler.ProcessDataWrite(instance, dataId, data);
        }
```


1. Move custom code in `RunProcessDataRead` to the method `ProcessDataRead` in `App/logic/DataProcessing/DataProcessor.cs` that was created and registered in the step [Upgrade and register DataProcessingHadler](#upgrade-and-register-dataprocessinghandler)
2. Move custom code in `RunProcessDataWrite` to the method `ProcessDataWrite` in `App/logic/DataProcessing/DataProcessor.cs`

### Moving custom code in RunDataValidation and RunTaskValidation

If `RunDataValidation`and `RunTaskValidation` looks like the code below you have no custom code and can safely move on to [Moving custom code in RunInstantiationValidation and RunDataCreation](#moving-custom-code-in-rundatacreation). If not complete the steps below

```csharp
public override async Task RunDataValidation(object data, ModelStateDictionary validationResults)
{
    await _validationHandler.ValidateData(data, validationResults);
}

public override async Task RunTaskValidation(Instance instance, string taskId, ModelStateDictionary validationResults)
{
    await _validationHandler.ValidateTask(instance, taskId, validationResults);
}
```

1. Move custom code in `RunDataValidation` to the method `ValidateData` in `App/logic/Validation/InstanceValidator.cs` that you created and registered here [Upgrade ValidationHandler.cs and register new service](#upgrade-validationhandlercs-and-register-new-service).
2. Move custom code in `RunTaskValidation` to the method `ValidateTask` in `App/logic/Validation/InstanceValidator.cs`


### Moving custom code in RunDataCreation

If `RunDataCreation` looks like the code below you have no custom code and can safely move on to [Moving custom code in RunInstantiationValidation](#moving-custom-code-in-runinstantiationvalidation). If not complete the steps below.

```csharp
public override async Task RunDataCreation(Instance instance, object data, Dictionary<string, string> prefill)
{
    await _instantiationHandler.DataCreation(instance, data, prefill);
}
```

1. If you haven't already: Create a new class named `InstantiationProcessor.cs` in `App/logic/DataProcessing` and implement the interface `Altinn.App.Core.Features.IInstantiationProcessor`. The class can be named or placed where you like, this is only a suggestion. The file should look something like this now:
    ```csharp
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Altinn.App.Core.Features;
    using Altinn.Platform.Storage.Interface.Models;

    namespace Altinn.App.AppLogic.DataProcessing;

    public class InstantiationProcessor : IInstantiationProcessor
    {
        public async Task DataCreation(Instance instance, object data, Dictionary<string, string> prefill)
        {
            
        }
    }
    ```
2. Move custom code in `DataCreation` to the method `DataCreation` in `App/logic/DataProcessing/InstantiationHandler.cs` that you created and registered here [Replace InstantiationHandler.cs and register new service](#replace-instantiationhandlercs-and-register-new-service)
3. Register `InstantiationProcessor`  in the method `RegisterCustomAppServices` `App/Program.cs`
    ```csharp
    void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
    {
      services.AddTransient<IInstantiationProcessor, InstantiationProcessor>();

      // Other custom services
    }
    ```
    Remember to add the necessary usings.

### Moving custom code in RunInstantiationValidation

If `RunInstantiationValidation` looks like the code below you have no custom code and can safely move on to [Moving custom code in RunProcessTaskEnd](#moving-custom-code-in-runprocesstaskend). If not complete the steps below.

```csharp
public override async Task<InstantiationValidationResult> RunInstantiationValidation(Instance instance)
{
    return await _instantiationHandler.RunInstantiationValidation(instance);
}
```

1. If you haven't already: Create a new Class named `InstantiationValidator.cs` in `App/logic/Validation` and implement the interface `Altinn.App.Core.Features.IInstantiationValidator`. The class can be named or placed where you like, this is only a suggestion. 
   The file should look something like this now:
    ```csharp
    using System.Threading.Tasks;
    using Altinn.App.Core.Features;
    using Altinn.App.Core.Models.Validation;
    using Altinn.Platform.Storage.Interface.Models;

    namespace Altinn.App.AppLogic.Validation;

    public class InstantiationValidator : IInstantiationValidator
    {
        public async Task<InstantiationValidationResult> Validate(Instance instance)
        {
            
        }
    }
    ```
2. Move all the code from `RunInstantiationValidation` in `ÌnstantiationHandler.cs` into the method `Validate` in the class you just created.
3. Register `InstantiationValidator`  in the method `RegisterCustomAppServices` `App/Program.cs`
    ```csharp
     void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
    {
      services.AddTransient<IInstantiationValidator, InstantiationValidator>();

      // Other custom services
    }
    ```
    Remember to add the necessary usings.

### Moving custom code in RunProcessTaskEnd

If `RunProcessTaskEnd` looks like the code below you have no custom code and can safely move on to [Moving custom code in GetPageOrder](). If not complete the steps below.

```csharp
public override async Task RunProcessTaskEnd(string taskId, Instance instance)
{
    await Task.CompletedTask;
}
```

1. Create a new class implementing the Interface `Altinn.App.Core.Features.ITaskProcessor` you can name and place this class wherever you like, but as a suggestion you can create and place it in the folder `App/logic/TaskProcessors` and name the file TaskProcessor.
    The class should look something like this after the interface is implemented:
    ```csharp
    using System.Threading.Tasks;
    using Altinn.App.Core.Features;
    using Altinn.Platform.Storage.Interface.Models;

    namespace Altinn.App.AppLogic.Custom;

    public class TaskProcessor: ITaskProcessor
    {
        public Task ProcessTaskEnd(string taskId, Instance instance)
        {
            return Task.CompletedTask;
        }
    }
    ```
2. Move code from `RunProcessTaskEnd`to the method `ProcessTaskEnd`in the class implementing ITaskProcessor
3. Register your custom implementation of `ITaskProcessor` in the method `RegisterCustomAppServices` inside `App/Program.cs`


### Moving custom code in GetPageOrder

If `GetPageOrder` in `App/logic/App.cs` is not present you have no custom code and can safely move on the [Removing App.cs](#removing-appcs). If not complete the steps below. 

1. Create a new class implementing the interface `Altinn.App.Core.Features.IPageOrder` you can name and place this class wherever you like in your project, but a suggestion is to name it `PageOrder` and place it in the folder `App/logic/PageOrder`. The file should look something like this now:
   ```csharp
   using System.Collections.Generic;
   using System.Threading.Tasks;
   using Altinn.App.Models;
   using Altinn.App.Core.Features;
   using Altinn.App.Core.Interface;
   using Altinn.App.Core.Models;

   namespace Altinn.App.AppLogic.PageOrder;

   public class PageOrder : IPageOrder
   {
       public async Task<List<string>> GetPageOrder(AppIdentifier appIdentifier, InstanceIdentifier instanceIdentifier, string layoutSetId, string currentPage, string dataTypeId, object formData)
       {
       }
   }
   ```
2. Move the code from `GetPageOrder` to the mehod `GetPageOrder` in the class you just created.
3. Register your custom implementation of `IPageOrder` in the mehtod `RegisterCustomAppServices` inside `App/Program.cs`
   ```csharp
     void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
    {
      services.AddTransient<IPageOrder, PageOrder>();

      // Other custom services
    }
    ```
    Remember to add the necessary usings.

### Removing App.cs

Now all youre custom code should be moved out of App.cs, take a look in the file and see if there is any code you need to move left.

See the old default `App.cs` [here](https://github.com/Altinn/app-template-dotnet/blob/5bcad2d485b3806b127604f2434d3ab833a7d142/src/App/logic/App.cs)

If you don't see any code worth keeping go ahead and delete the file. All of the logic Altinn used to have in this file is moved elsewhere in our code and should not leak into you application code.


## Noteable namespace changes

This is truly not a complete list of alle the changes to namespace we have done in v7, for that see the actual PR on [Github]()

The following list is some of the namespaces that have changed that we think will affect most of the applications

* Interfaces that service owners naturally overrides/customize is moved from `Altinn.App.PlatformServices.Interfaces` to `Altinn.App.Core.Features`
* `Altinn.App.Common.Models` namespace is moved to `Altinn.App.Core.Models`
* `Altinn.App.PlatformServices.Interface.ICustomPdfHandler` interface is moved and renamed to: `Altinn.App.Core.Features.Pdf.IPdfFormatter`

## Recomended plugin for Visual Studio Code
There are alot of changes to namespaces so we strongly recomend using Visual Studio Code with the C# plugin installed. This will give you code help for importing and locating new or changed interfaces.

Plugin information:<br/>
Name: _C#_<br/>
Id: _ms-dotnettools.csharp_<br/>
Description: _C# for Visual Studio Code (powered by OmniSharp)._<br/>
Publisher: _Microsoft_<br/>
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp