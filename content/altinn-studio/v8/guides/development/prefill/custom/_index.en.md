---
title: Prefill data with custom code
linktitle: Custom code
description: How to set up automatic filling of form data with your own code.
toc: false
weight: 300
---

## What does this feature do?

You can create your own code to automatically fill out parts of the form before the user begins. This gives you more flexibility than the standard configuration file. For example, you can:
- Fetch data from an API
- Perform calculations
- Use other logic of your choice

## When should I use this?
If you need other data sources than those that are available through [configuration based setup](/en/altinn-studio/v8/guides/development/prefill/config/) of prefill, 
or if you need any logic as part of the prefill process.

## How to set it up

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v7">}}

In version 7, we use [dependency injection](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection) for custom prefilling.

### 1. Create a new class

Create a new file in your app project. You can choose the name and location yourself, but use sensible namespaces.
For example, `Altinn.App.Logic.Instantiation` or similar.

The class must implement the `IInstantiationProcessor` interface from `Altinn.App.Core.Features`.

### 2. Write the code for automatic filling

Implement the `DataCreation` method in the new class. In this method, you set up which fields should be filled out automatically and what value they should receive.
This is where you can fetch data from external sources, perform calculations or other relevant logic.

See below for examples.

### 3. Register your class

Open `Program.cs` and add this line:

```csharp
services.AddTransient<IInstantiationProcessor, MyFilling>();
```

{{</content-version-container>}}

{{<content-version-container version-label="v4, v5, v6">}}

For versions 4, 5, and 6, custom prefilling is implemented in `InstantiationHandler.cs`.

### 1. Find the correct file

Go to the `App/logic` folder in your app project and open the file `InstantiationHandler.cs`.

### 2. Implement the DataCreation method

Write your code in the `DataCreation` method. Here you set up which fields should be filled out automatically and what value they should receive.
This is where you can fetch data from external sources, perform calculations or other relevant logic.

See below for examples.

{{</content-version-container>}}

{{</content-version-selector>}}

## Examples

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v7">}}

### Example: Retrieve organization number and name from the Central Coordinating Register for Legal Entities

This fills in the `Organization.OrgNr` field with a custom organization number:

*Note that the field names here are just imaginary examples, adapt to your needs/data.*

```csharp {hl_lines=[17,18]}
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Models;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Logic.Instantiation;

public class MyFilling : IInstantiationProcessor
{
    public async Task DataCreation(Instance instance, object data, Dictionary<string, string> prefill)
    {
        if (data is DataModel form)
        {
            form.Organization = new Organization
            {
                OrgNr = "987654321",
                Name = "TestOrganization"
            };
        }

        await Task.CompletedTask;
    }
}
```

### Example: Retrieve personal identification number and name from the National Population Register

This fills in the `Person.PersonalId` field with a personal identification number and the `Person.Name` field with a name.

*Note that the field names here are just imaginary examples, adapt to your needs/data.*

```csharp {hl_lines=[17,18]}
using System.Collections.Generic;
using System.Threading.Tasks;
using Altinn.App.Core.Features;
using Altinn.App.Models;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Logic.Instantiation;

public class MyFilling : IInstantiationProcessor
{
    public async Task DataCreation(Instance instance, object data, Dictionary<string, string> prefill)
    {
        if (data is DataModel form)
        {
            form.Person = new Person
            {
                Personnr = "11223345678",
                Navn = "Test Testesen"
            };
        }

        await Task.CompletedTask;
    }
}
```

{{</content-version-container>}}

{{<content-version-container version-label="v4, v5, v6">}}

### Example: Retrieve organization number and name from the Central Coordinating Register for Legal Entities

This fills in the `Organization.OrgNr` field with a custom organization number:

*Note that the field names here are just imaginary examples, adapt to your needs/data.*

```csharp {hl_lines=[7,8]}
public async Task DataCreation(Instance instance, object data)
{
    if (data is DataModel form)
    {
        form.Organization = new Organization
        {
            OrgNr = "987654321",
            Name = "TestOrganization"
        };
    }
}
```

### Example: Set personal identification number and name

This fills in the `Person.PersonalId` field with a personal identification number and the `Person.Name` field with a name.

*Note that the field names here are just imaginary examples, adapt to your fields/data.*

```csharp {hl_lines=[7,8]}
    public async Task DataCreation(Instance instance, object data)
{
    if (data is DataModel form)
    {
        form.Person = new Person
        {
            PersonalId = "11223345678",
            Name = "Test Testesen"
        };
    }
}
```

{{</content-version-container>}}

{{</content-version-selector>}}

## Tips
- You can make queries against external sources to retrieve data that can then be used for prefilling.
- Remember that all names/fields in the examples must be replaced with names of the class/fields for your data model.
- Use a good code editor to get help finding the correct field names (intellisense).
- Remember to create objects for complex types before filling in sub-elements.