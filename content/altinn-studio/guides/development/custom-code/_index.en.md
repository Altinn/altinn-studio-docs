---
title: Implementing custom code
description: How to implement interfaces for custom code in your app
toc: true
weight: 500
---

This guide shows you how to implement interfaces in your Altinn app to extend functionality beyond what is available in 
the Altinn Studio online tool.

## Prerequisites

- You have created an app in Altinn Studio
- You have set up a [local development environment](/altinn-studio/guides/development/local-dev/)
- You have basic knowledge of C# and .NET

## Step 1: Choose the right interface

Before you start coding, you need to identify which interface best fits your needs. See the [overview of available interfaces](/altinn-studio/reference/custom-development/) to find the one that suits you.

**Example:** If you need to calculate values automatically when users fill in data, you should implement `IDataProcessor`.

## Step 2: Create the implementation class

1. Open the app's source code in Visual Studio Code or your preferred development environment
2. Navigate to the folder where you want to place your implementation (recommended: create a folder called `Logic` or `Features`)
3. Create a new C# class that implements the chosen interface

### Example: Implementing IDataProcessor

```csharp
using Altinn.App.Core.Features;
using Altinn.Platform.Storage.Interface.Models;
using Microsoft.Extensions.Logging;

namespace Altinn.App.Logic
{
    public class DataProcessor : IDataProcessor
    {
        private readonly ILogger<DataProcessor> _logger;

        public DataProcessor(ILogger<DataProcessor> logger)
        {
            _logger = logger;
        }

        public async Task<bool> ProcessDataRead(Instance instance, Guid? dataId, object data)
        {
            // Logic that runs when data is read
            _logger.LogInformation("ProcessDataRead called for instance {InstanceId}", instance.Id);
            
            // Return false if no changes were made
            return await Task.FromResult(false);
        }

        public async Task<bool> ProcessDataWrite(Instance instance, Guid? dataId, object data)
        {
            bool hasChanges = false;
            
            // Cast to your data model
            if (data is MyDataModel model)
            {
                // Example: Automatic calculation
                if (model.Amount.HasValue && model.VatRate.HasValue)
                {
                    var calculatedVat = model.Amount.Value * model.VatRate.Value / 100;
                    
                    if (model.VatAmount != calculatedVat)
                    {
                        model.VatAmount = calculatedVat;
                        model.TotalAmount = model.Amount.Value + calculatedVat;
                        hasChanges = true;
                        
                        _logger.LogInformation("Calculated VAT: {VatAmount} for instance {InstanceId}", 
                                             calculatedVat, instance.Id);
                    }
                }
            }

            return await Task.FromResult(hasChanges);
        }
    }
}
```

## Step 3: Register the implementation

For the Altinn app to find and use your implementation, you must register it in the `Program.cs` file.

1. Open `Program.cs` in the root folder of the app project
2. Add registration of your implementation in the `RegisterCustomAppServices` method

```csharp
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Existing registrations...
    
    // Register your custom implementation
    services.AddTransient<IDataProcessor, DataProcessor>();
    
    // You can register multiple interfaces if needed
    services.AddTransient<IInstantiationValidator, MyInstantiationValidator>();
}
```

### Different service lifetimes

- **AddTransient**: New instance created each time it's used (recommended for most cases)
- **AddScoped**: One instance per HTTP request (use for services that should share state within a request)
- **AddSingleton**: One instance for the entire application lifetime (rarely used for app-specific logic)

## Step 4: Handle dependencies

If your implementation needs other services, you can inject these through the constructor:

```csharp
public class DataProcessor : IDataProcessor
{
    private readonly ILogger<DataProcessor> _logger;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public DataProcessor(
        ILogger<DataProcessor> logger,
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration)
    {
        _logger = logger;
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    // ... implementation of methods
}
```

Ensure that all dependencies are also registered in `Program.cs` if necessary.

## Step 5: Test the implementation locally

1. Start the app locally by running `dotnet run` in the app's root folder
2. Navigate to the app in the browser (usually `http://localhost:5005`)
3. Test the functionality that uses your implementation
4. Check logs to verify that the code runs as expected

### Testing tips

- Use breakpoints in Visual Studio Code to debug the code
- Add comprehensive logging to track what's happening
- Test edge cases and error situations
- Verify that return values are correct (especially `bool` values that indicate whether data has been changed)

## Step 6: Deploy and verify

1. Commit and push the changes to your git repository
2. Deploy the app to test environment
3. Test the functionality in test environment
4. Deploy to production when you're satisfied with the testing

## Common pitfalls and tips

### Return values
- For `IDataProcessor`: Return `true` from `ProcessDataWrite` only if you actually changed data
- For `IValidator`: Add error messages to `ModelStateDictionary` for validation errors

### Error handling
- Use try-catch blocks to handle exceptions gracefully
- Log errors with sufficient context for debugging
- Don't throw exceptions unless they are critical errors

### Performance
- Avoid heavy operations that can affect user experience
- Use asynchronous methods (`async`/`await`) for I/O operations
- Consider caching for data that doesn't change often

### Security
- Validate all input from users or external sources
- Don't log sensitive data
- Use parameterised queries for database calls

## Examples of common implementations

### Validation at instantiation
```csharp
public class InstantiationValidator : IInstantiationValidator
{
    public async Task<InstantiationValidationResult?> Validate(Instance instance)
    {
        // Example: Only allow instantiation on weekdays
        if (DateTime.Now.DayOfWeek == DayOfWeek.Saturday || 
            DateTime.Now.DayOfWeek == DayOfWeek.Sunday)
        {
            return new InstantiationValidationResult
            {
                Valid = false,
                Message = "The service is not available at weekends"
            };
        }

        return null; // Null means validation OK
    }
}
```

### Custom user action
```csharp
public class CalculateAction : IUserAction
{
    public string Id => "calculate";

    public async Task<UserActionResult> HandleAction(UserActionContext context)
    {
        // Perform calculation based on context
        var result = PerformCalculation(context.Instance);
        
        return new UserActionResult
        {
            Success = true,
            UpdatedDataModel = result,
            ClientAction = new NavigateClientAction { PageId = "summary" }
        };
    }
}
```

## Further reading

- [Overview of all available interfaces](/altinn-studio/reference/custom-development/)
- [Data processing](/altinn-studio/reference/logic/dataprocessing/)
- [Validation](/altinn-studio/reference/logic/validation/)
- [Instantiation](/altinn-studio/reference/logic/instantiation/)
- [Process actions](/altinn-studio/reference/process/actions/)
- [Local development](/altinn-studio/guides/development/local-dev/)