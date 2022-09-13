---
title: Breaking changes
description: Overview of breaking changes introduced in v7.0.0 of the App Nuget packages.
toc: true
---

{{% panel %}}
**Alpha Release**  
This is a alpha relase and is not used by default in new applications. Version 7 is a major rewrite of the app libraries to reduce Altinns dotnet code in a application.

{{% /panel %}}

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
    <PackageReference Include="Altinn.App.SourceGenerator" Version="7.0.0" 
      PrivateAssets="all" 
      ExcludeAssets="runtime;compile" /> 
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

1. dentify the custom services your application has registered in Program.cs. Take a note of these as we will have to register them again later.
2. Copy and paste the version 7 of Program.cs from our template at [altinn/app-template-dotnet](https://github.com/Altinn/app-template-dotnet/blob/chore/90-appbase-simplified/src/App/Program.cs) into your `App/Program.cs` (replacing existing code)
3. Register your apps custom services from step 1 in the method `RegisterCustomAppServices`


## Replacing or upgrading old classes to implement new Interfaces

### Upgrade and register DataProcessingHandler

If your `App/logic/DataProcessing/DataProcessingHandler.cs` is similar to the following code you can delete the file and move on [TODO next step](). If not please follow the steps below.

```csharp
using System;
using System.Threading.Tasks;
using Altinn.Platform.Storage.Interface.Models;

//// using Altinn.App.Models; // <-- Uncomment this line to refer to app model(s)

namespace Altinn.App.AppLogic.DataProcessing
{
    /// <summary>
    /// Represents a business logic class responsible for running calculations on an instance.
    /// </summary>
    public class DataProcessingHandler
    {
        /// <summary>
        /// Perform data processing on data read. When reading data from App API
        /// </summary>
        /// <example>
        /// if (data.GetType() == typeof(Skjema)
        /// {
        ///     Skjema model = (Skjema)data;
        ///     // Perform calculations and manipulation of data model here
        /// }
        /// </example>
        /// <param name="instance">The instance that data belongs to</param>
        /// <param name="dataId">The dataId for data if available</param>
        /// <param name="data">The data as object</param>
        public async Task<bool> ProcessDataRead(Instance instance, Guid? dataId, object data)
        {
            return await Task.FromResult(false);
        }

        /// <summary>
        /// Perform data processing on data write. When posting and putting data against app
        /// </summary>
        /// <example>
        /// if (data.GetType() == typeof(Skjema)
        /// {
        ///     Skjema model = (Skjema)data;
        ///     // Perform calculations and manipulation of data model here
        /// }
        /// </example>
        /// <param name="instance">The instance that data belongs to</param>
        /// <param name="dataId">The dataId for data if available</param>
        /// <param name="data">The data as object</param>
        public async Task<bool> ProcessDataWrite(Instance instance, Guid? dataId, object data)
        {
            return await Task.FromResult(false);
        }
    }
}
```

1. `DataProcessingHandler` needs to implement `Altinn.App.Core.Features.DataProcessing.IDataProcessor`.

    Change:
    ```csharp
    public class DataProcessingHandler
    ```

    to 

    ```csharp
    public class DataProcessingHandler: IDataProcessor
    ```

    Remember to add the using for `Altinn.App.Core.Features.DataProcessing`

    ```csharp
    using Altinn.App.Core.Features.DataProcessing;
    ```

    Unless you have made changes to the method names this should be enough as the Interface is designed on the old DataProcessingHandler.

2. Register your custom implementation of `IDataProcessor` in the method `RegisterCustomAppServices` `App/Program.cs`

    ```csharp
    void RegisterCustomAppServices(IServiceCollection services, IConfiguration config)
    {
      services.AddTransient<IDataProcessor, DataProcessingHandler>();

      // Other custom services
    }
    ```

    Remember to att the necessary usings.


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

The code above is default code and only additional code should be copied.

1. Move custom code in `RunProcessDataRead` to the method `ProcessDataRead` in `App/logic/DataProcessing/DataProcessingHandler.cs`
2. Move custom code in `RunProcessDataWrite` to the method `ProcessDataWrite` in `App/logic/DataProcessing/DataProcessingHandler.cs`

### Moving custom code in RunDataValidation and RunTaskValidation

If `RunDataValidation`and `RunTaskValidation` looks like the code below you have no custom code and can safely move on to [Moving custom code in RunInstantiationValidation and RunDataCreation](#moving-custom-code-in-runinstantiationvalidation-and-rundatacreation). If not complete the steps below

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

1. Move custom code in `RunDataValidation` to the method `ValidateData` in `App/logic/Validation/ValidationHandler.cs`
2. Move custom code in `RunTaskValidation` to the method `ValidateTask` in `App/logic/Validation/ValidationHandler.cs`


### Moving custom code in RunInstantiationValidation and RunDataCreation

If `RunInstantiationValidation` and `RunDataCreation` looks like the code below you have no custom code and can safely move on to [Moving custom code in RunProcessTaskEnd](#moving-custom-code-in-runprocesstaskend). If not complete the steps below.

```csharp
        public override async Task<InstantiationValidationResult> RunInstantiationValidation(Instance instance)
        {
            return await _instantiationHandler.RunInstantiationValidation(instance);
        }

        public override async Task RunDataCreation(Instance instance, object data, Dictionary<string, string> prefill)
        {
            await _instantiationHandler.DataCreation(instance, data, prefill);
        }
```

1. Move custom code in `RunInstantiationValidation` to the method `Validation` in `App/logic/InstantiationHandler.cs`
2. Move custom code in `DataCreation` to the method `DataCreation` in `App/logic/InstantiationHandler.cs`

### Moving custom code in RunProcessTaskEnd

If `RunProcessTaskEnd` looks like the code below you have no custom code and can safely move on to [Moving custom code in GetPageOrder](). If not complete the steps below.

```csharp
        public override async Task RunProcessTaskEnd(string taskId, Instance instance)
        {
            await Task.CompletedTask;
        }
```

1. Create a new class implementing the Interface `Altinn.App.Core.Interface.ITaskProcessor` you can name and place this class wherever you like, but as a suggestion you can create and place it in the folder `App/logic/TaskProcessors` and name the file TaskProcessor.

    The class should look something like this after the interface is implemented:
    ```csharp
    using Altinn.Platform.Storage.Interface.Models;

    namespace Altinn.App.logic.TaskProcessors;

    /// <summary>
    /// Implementation of the ITaskProcessor interface.
    /// </summary>
    public class TaskProcessor: ITaskProcessor
    {
        /// <inheritdoc />
        public async Task ProcessTaskEnd(string taskId, Instance instance)
        {
            await Task.CompletedTask;
        }
    }
    ```
2. Move code from `RunProcessTaskEnd`to the method `ProcessTaskEnd`in the class implementing ITaskProcessor
3. Register your custom implementation of `ITaskProcessor` in the method `RegisterCustomAppServices` inside `App/Program.cs`


### Moving custom code in GetPageOrder

If `GetPageOrder` in `App/logic/App.cs` is not present you have no custom code and can safely move on the [Removing App.cs](#removing-app-cs). If not complete the steps below. 

1. Create a new class implementing the interface `Altinn.App.Core.Features.PageOrder.IPageOrder` you can name and place this class wherever you like in your project, but a suggestion is to name it `PageOrder` and place it in the folder `App/logic/PageOrder`.
2. Move the code from `GetPageOrder` to the mehod `GetPageOrder` in the class you just created.
3. Register your custom implementation of `IPageOrder` in the mehtod `RegisterCustomAppServices` inside `App/Program.cs`

