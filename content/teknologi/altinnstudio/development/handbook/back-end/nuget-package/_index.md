---
title: Nuget Package
description: Overview of nuget package usage in altinn studio
tags: [nuget]
weight: 100
---

## Altinn 3 NuGet Packages

Altinn 3 has published a number of nuget packages to share common libraries between different solutions. You can read more about nuget [here](https://www.nuget.org/).

The following nuget packages are available for download [here](https://www.nuget.org/profiles/altinn)

- [Altinn.App.Api](https://www.nuget.org/packages/Altinn.App.Api)
- [Altinn.App.Common](https://www.nuget.org/packages/Altinn.App.Common)
- [Altinn.App.PlatformServices](https://www.nuget.org/packages/Altinn.App.PlatformServices)
- [Altinn.Common.PEP](https://www.nuget.org/packages/Altinn.Common.PEP)
- [Altinn.Authorization.ABAC](https://www.nuget.org/packages/Altinn.Authorization.ABAC)
- [Altinn.Platform.Storage.Interface](https://www.nuget.org/packages/Altinn.Platform.Storage.Interface/)
- [Altinn.Platform.Models](https://www.nuget.org/packages/Altinn.Platform.Models/)
- [JWTCookieAuthentication](https://www.nuget.org/packages/JWTCookieAuthentication/)
- [Altinn.Common.AccessToken](https://www.nuget.org/packages/Altinn.Common.AccessToken/)
- [Altinn.Common.AccessTokenClient](https://www.nuget.org/packages/Altinn.Common.AccessTokenClient/)


## Procedure for changes involving NuGet Packages

1. Implement all changes necessary in the NuGet package project. Remember to update the package version, assembly version and file version so they match.
2. Submit a pull request on these changes only. No implementation on other projects should be included.
3. Once pull request is approved and changes are merged into master; create and publish new NuGet package based on master branch.
4. Continue with implementation, referencing the updated package wherever it is needed.
5. Remember to update all outdated references to the package and check that all tests run successfully before submitting a final PR.


## Creating a NuGet package

Detailed documentation on how to create a NuGet package, guidelines etc can be found [here](https://docs.microsoft.com/en-us/nuget/quickstart/create-and-publish-a-package-using-visual-studio).

## An example of nuget package creation

Open the project csproj file to edit it as an xml file. 

Keep properties related to NuGet separated from other properties as in the example below:
```xml
  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
    <OutputType>Library</OutputType>
    <AssemblyVersion>2.5.10.0</AssemblyVersion>
    <FileVersion>2.5.10.0</FileVersion>
    <!-- SonarCloud requires a ProjectGuid to separate projects. -->
    <ProjectGuid>{D9F6DAB7-E921-44B6-A1A6-5796DCAE0D07}</ProjectGuid>
  </PropertyGroup>

  <PropertyGroup>
    <!-- NuGet package properties -->
    <PackageId>Altinn.Platform.Storage.Interface</PackageId>
    <PackageVersion>2.5.10</PackageVersion>
    <PackageTags>Altinn;Studio;Platform;Storage;Models</PackageTags>
    <Description>
      This class library holds the models exposed by the external endpoints of the Altinn 3 Storage component.
    </Description>
    <PackageReleaseNotes>
      https://docs.altinn.studio/teknologi/altinnstudio/changelog/storage-interfaces/
    </PackageReleaseNotes>
    <Authors>Altinn Platform Contributors</Authors>
    <RepositoryType>git</RepositoryType>
    <RepositoryUrl>https://github.com/Altinn/altinn-studio</RepositoryUrl>
    <IncludeSymbols>true</IncludeSymbols>
    <SymbolPackageFormat>snupkg</SymbolPackageFormat>
  </PropertyGroup>
```

1. Save the changes  
2. Open a command line utility like *git bash*, *powershell* or *cmd*.  
3. Navigate to the project folder.  
4. Build the project using *Release* configuration:  
   `dotnet build -c Release`  
5. Pack the project into a NuGet package:  
   `dotnet pack -c Release --include-source -p:SymbolPackageFormat=snupkg`  
   The package will now be created in **{projectfolder}\bin\Release**.  
6. Navigate to the release folder.  
7. Publish the package:  
   `dotnet nuget push Altinn.Platform.Storage.Interface.2.5.10.nupkg -k [nuget api key] -s https://api.nuget.org/v3/index.json`
8. Your package will now be published to nuget.org

