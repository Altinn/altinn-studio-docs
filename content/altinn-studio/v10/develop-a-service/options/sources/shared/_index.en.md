---
draft: true
title: Common shared code lists
linktitle: Shared
description: Code lists that are shared across applications
toc: false

aliases:
  - /altinn-studio/guides/development/options/common-codelists
---

## What are common standard code lists?
Common standard code lists are lists such as countries, counties, municipalities, genders, marital statuses, etc. that can be used in an application without the need to maintain these code lists yourself.

These code lists are created as a separate [NuGet package](https://www.nuget.org/packages/Altinn.Codelists) that can be imported into your application. This is done to keep the core of an Altinn 3 application as small as possible and to be able to release and use new code lists without depending on having to upgrade the application (beyond v7.8.0).

## Available code lists

The following code lists are available from different sources:

### Statistics Norway (SSB)
| Code list ID | Description |
|--------------|-------------|
| fylker | The counties of Norway |
| grunnbeløpfolketrygden | National insurance base amount |
| kjønn | Sex |
| kommuner | The communes of Norway (all) |
| land | The countries of the world |
| næringsgruppering | Industrial grouping |
| sivilstand | Marital status |
| yrker | Occupations |

### Kartverket (KV)
| Code list ID | Description |
|--------------|-------------|
| fylker-kv | The counties of Norway |
| kommuner-kv | The communes of Norway with ability to filter on county |

### Posten
| Code list ID | Description |
|--------------|-------------|
| poststed | Norwegian postal codes |

## How to add common standard code lists to the application?
### 1. Add a reference to the [Altinn.Codelists NuGet package](https://www.nuget.org/packages/Altinn.Codelists)  

Open the command line to your application's repository and navigate to the App folder where the App.csproj file is located, and run the following command:

```shell
dotnet add package Altinn.Codelists
```
This will add the latest stable version of the package to your solution.

Alternatively, you can directly edit your application's App.csproj file by adding the reference below to the `<itemgroup>` where you have package references. 
```xml
<PackageReference Include="Altinn.Codelists" Version="8.0.1" />     
```
Note that you then need to explicitly specify the version you would like. See the link in step one for available versions.

### 2. Register the code lists in your app's DI container

Add the following to your Program.cs file:
```csharp
services.AddAltinnCodelists();
```
By calling this method, you will register all codelists across all sources. You can also register code lists one by one if you want to have control over which code lists are used or configure and customize the setup of the code list.

#### 2.1 Add individual sources

Instead of registering all available code lists, you can choose to register only specific sources:

**SSB (Statistics Norway) codelists:**
```csharp
services.AddSSBClassifications();
```
This registers all SSB-based code lists: fylker, kjønn, kommuner, land, næringsgruppering, sivilstand, yrker, and grunnbeløpfolketrygden.

**Kartverket codelists:**
```csharp
services.AddKartverketAdministrativeUnits();
```
This registers Kartverket's administrative unit code lists: fylker-kv and kommuner-kv.

**Posten codelists:**
```csharp
services.AddPosten();
```
This registers Posten's postal code list: poststed.

**Individual SSB code lists:**
You can also add individual SSB code lists with custom configuration:
```csharp
services.AddSSBClassificationCodelistProvider("næring", Classification.IndustryGrouping, new Dictionary<string, string> { { "level", "1" } });
```

**RestCountries client:**
For advanced country information beyond the basic SSB countries codelist:
```csharp
services.AddRestCountriesClient();
```
This registers the `ICountryClient` interface that provides detailed information about all countries of the world with filtering capabilities.

### 3. Connect your application to the code list you want to use

Use one of the code list IDs from the available code lists above.

You can do this either using [Altinn Studio](https://altinn.studio) and configure the *code list ID* of your component in the user interface.

Or you can configure the component by editing the `optionsId` property for the component in the layout file.

## Custom Configuration
While the configuration mentioned above, where you use the method `services.AddAltinnCodelists();`, will register all available code lists with default values, there may be cases where you want to customize the configuration of a code list. The examples below will vary slightly depending on the source of the code list, as different sources offer different options.

### Add a code list with a custom code list ID
If you don't want to use the default code list ID, or if you only want to register code lists that are relevant to your app, you can register each code list individually.

The example uses a code list from SSB and overrides the code list ID:
```csharp
services.AddSSBClassificationCodelistProvider("næring", Classification.IndustryGrouping);
```

### Add a code list with default parameters
Some of the code lists accept parameters that control what is returned.

The example uses a code list from SSB and specifies a filter to only retrieve values from the first level (this specific code list is hierarchical).

```csharp
services.AddSSBClassificationCodelistProvider("næring", Classification.IndustryGrouping, new Dictionary<string, string>() { { "level", "1" } });
```
The default parameters are a collection of name/value pairs that allow you to pass in any parameter that can be picked up by the implementation of the code list provider.

### Add a code list that supports description and/or help text values
While a regular code list is just a key/value pair, you can extend it by adding description and help texts, which provide a more descriptive user interface.

The following example makes the notes field from the SSB classification fill out the description text.

```csharp
services.AddSSBClassificationCodelistProvider("næring", Classification.IndustryGrouping,
    new ClassificationOptions() { MapNotesToDescription = true },
    new Dictionary<string, string>() { { "level", "1" } });
```
The example activates a predefined way to add a description text. If you want to customize the description text even further, you can pass in a function. The example below passes in a function that will be evaluated when the code list is populated and will return a combination of the classification code and the notes field, separated by a colon.

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

### Add a code list from SSB that is not available in the `Classification` enum.
Currently, only a small subset of the available code lists from SSB is included in the `Classification` enum. The enum is essentially just a more readable version of the underlying ID used by SSB. But in our case, it also serves as a way to indicate which code lists we have explicitly tested against. If you find a code list you would like to use, you can specify its ID directly instead of using the enum.

```csharp
   services.AddSSBClassificationCodelistProvider("næring", 6);
```

[Overview of available code lists from SSB](https://www.ssb.no/klass/) or [here for the JSON variant](https://data.ssb.no/api/klass/v1/classifications).
