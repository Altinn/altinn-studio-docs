---
title: Common shared codelists
linktitle: Common shared codelist
description: How to re-use common codelists shared accross applications?
toc: false
weight: 200
---

{{%notice info%}}
This functionality requires that the application uses at least [version 7.8.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v7.8.0) of the Altinn.App.Core NuGet package.
{{% /notice%}}

## What are common standard codelists?
Common standard codelists are lists such as countries, counties, municipalities, genders, marital statuses, etc. that can be used in an application without the need to maintain these codelists yourself. See the [complete list](https://github.com/Altinn/codelists-lib-dotnet#available-codelists) of available codelists.

These codelists are created as a separate [NuGet package](https://www.nuget.org/packages/Altinn.Codelists) that can be imported into your application. This is done to keep the core of an Altinn 3 application as small as possible and to be able to release and use new codelists without depending on having to upgrade the application (beyond v7.8.0).

## How to add common standard codelists to the application?
### 1. Add a reference to the [Altinn.Codelists NuGet package](https://www.nuget.org/packages/Altinn.Codelists)  
   Open the command line to your application's repository and navigate to the App folder where the App.csproj file is located, and run the following command:

   ```shell
   dotnet add package Altinn.Codelists
   ```
   This will add the latest stable version of the package to your solution.

   Alternatively, you can directly edit your application's App.csproj file by adding the reference below to the `<itemgroup>` where you have package references. 
   ```xml
     <PackageReference Include="Altinn.Codelists" Version="0.5.0" />     
   ```
   Note that you then need to explicitly specify the version you would like. See the link in step one for available versions.

### 2. Register the codelists in your app's DI container  
   Add the following to your Program.cs file:
   ```csharp
   services.AddAltinnCodelists();
   ```
   By calling this method, you will register all codelists across all sources. You can also register codelists one by one if you want to have control over which codelists are used or configure and customize the setup of the codelist.

### 3. Connect your application to the codelist you want to use  
   See the [documentation](https://github.com/Altinn/codelists-lib-dotnet#available-codelists) below for available codelists.

   You can do this either using [Altinn Studio](https://altinn.studio) and configure the *codelist ID* of your component in the user interface.

   Or you can configure the component by editing the `optionsId` property in FormLayout.json according to the [documentation](https://docs.altinn.studio/app/development/data/options/#connect-the-component-to-options-code-list).

## Custom Configuration
While the configuration mentioned above, where you use the method `services.AddAltinnCodelists();`, will register all available codelists with default values, there may be cases where you want to customize the configuration of a codelist. The examples below will vary slightly depending on the source of the codelist, as different sources offer different options.

### Add a codelist with a custom codelist ID
If you don't want to use the default codelist ID, or if you only want to register codelists that are relevant to your app, you can register each codelist individually.

The example uses a codelist from SSB and overrides the codelist ID:
```csharp
services.AddSSBClassificationCodelistProvider("næring", Classification.IndustryGrouping);
```

### Add a codelist with default parameters
Some of the codelists accept parameters that control what is returned.

The example uses a codelist from SSB and specifies a filter to only retrieve values from the first level (this specific codelist is hierarchical).

```csharp
services.AddSSBClassificationCodelistProvider("næring", Classification.IndustryGrouping, new Dictionary<string, string>() { { "level", "1" } });
```
The default parameters are a collection of name/value pairs that allow you to pass in any parameter that can be picked up by the implementation of the codelist provider.

### Add a codelist that supports description and/or help text values
While a regular codelist is just a key/value pair, you can extend it by adding description and help texts, which provide a more descriptive user interface.

The following example makes the notes field from the SSB classification fill out the description text.

```csharp
services.AddSSBClassificationCodelistProvider("næring", Classification.IndustryGrouping,
    new ClassificationOptions() { MapNotesToDescription = true },
    new Dictionary<string, string>() { { "level", "1" } });
```
The example activates a predefined way to add a description text. If you want to customize the description text even further, you can pass in a function. The example below passes in a function that will be evaluated when the codelist is populated and will return a combination of the classification code and the notes field, separated by a colon.

```csharp
services.AddSSBClassificationCodelistProvider(
    "næring",
    Classification.IndustryGrouping,
    new ClassificationOptions() 
    { 
        MapDescriptionFunc = (classificationCode) => $"{classificationCode.Code}: {classificationCode.Notes}" 
    },
    new Dictionary<string, string>() { { "level", "1" } });
```

### Add a codelist from SSB that is not available in the `Classification` enum.
Currently, only a small subset of the available codelists from SSB is included in the `Classification` enum. The enum is essentially just a more readable version of the underlying ID used by SSB. But in our case, it also serves as a way to indicate which codelists we have explicitly tested against. If you find a codelist you would like to use, you can specify its ID directly instead of using the enum.

```csharp
   services.AddSSBClassificationCodelistProvider("næring", 6);
```

[Overview of available codelists from SSB](https://www.ssb.no/klass/) or [here for the JSON variant](https://data.ssb.no/api/klass/v1/classifications).