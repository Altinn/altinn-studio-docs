---
title: Breaking changes
description: Oversikt over breaking changes introdusert i App Nuget-pakker i v6.0.0.
tags: [translate-to-norwegian]
---


Altinn.App.* librarires target .Net 6 now, which requires that the application does the same.

In addition, all references to app and platform services have been moved from Startup.cs and should be replaced with 
two method calls.

Follow the instructions below to ensure that the app is compatible with version 6 of the Altinn.App.* packages.


1. Update target framework and package dependencies

    Install [.Net 6 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) before you start changing code.

    Navigate to you application repository and find `App.csproj` in the `App` folder. 

    Update target framework to .Net 6 by replacing 

    ```xml
    <TargetFramework>net5.0</TargetFramework>
    ```
    with 

    ```xml
    <TargetFramework>net6.0</TargetFramework>
    ```
    In the same file, update the Altinn.App.* package references to version 6.0.0.  

    ```xml
    <PackageReference Include="Altinn.App.Api" Version="6.0.0">
      <CopyToOutputDirectory>lib\$(TargetFramework)\*.xml</CopyToOutputDirectory>
    </PackageReference>
    <PackageReference Include="Altinn.App.Common" Version="6.0.0" />
    <PackageReference Include="Altinn.App.PlatformServices" Version="6.0.0" />
    ```

2. Update Dockerfile to use .Net 6 images

    The Dockerfile can be found in the root folder of the application repository.

    Update build image by replacing 

    ```Dockerfile
    FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine AS build
    ```

    with 

    ```Dockerfile
    FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
    ```

    And update the runtime image by replacing 

    ```Dockerfile
    FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine AS final
    ```

    with 

    ```Dockerfile
    FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine AS final
    ```

3. Update program.cs  
   The structure of program.cs has changed for dot net 6. Copy code from [this file](https://github.com/Altinn/app-template-dotnet/blob/5bcad2d485b3806b127604f2434d3ab833a7d142/src/App/Program.cs). 

4. Add custom service referances  
   If you have already added custom services and other changes to startup.cs and program.cs you need to add it to program.cs

5. Delete startup.cs  
   This is no longer needed
