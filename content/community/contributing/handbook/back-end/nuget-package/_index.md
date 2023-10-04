---
title: NuGet Package
description: How to work with NuGet packages in Altinn
tags: [nuget]
weight: 100
---


Altinn has published a number of nuget packages to share common libraries between different solutions.
[You can read more about NuGet.](https://www.nuget.org/).

All NuGet packages are available for download [here](https://www.nuget.org/profiles/altinn)

This page covers how to set up your project to support the publishing of NuGet packages, both manual and automated, 
as well as developer workflows in both cases. 

- [GitHub automated procedures](#github-automated-procedures)
  - [Project setup](#project-setup)
  - [GitHub setup](#github-setup)
  - [Package creation](#package-creation)
  - [Development lifecycle](#development-lifecycle)
- [Manual procedures](#manual-procedures)
  - [Project setup](#project-setup-1)
  - [Package creation](#package-creation-1)
  - [Development lifecycle](#development-lifecycle-1)

##  GitHub automated procedures

We use GitHub workflows and [MinVer](https://github.com/adamralph/minver) to enable the automation of both
package generation and publishing.


### Project setup
1. __Clean up the .csproj file to not interfere with the MinVer versioning__

    The following properties should be removed from the `PropertyGroup` section of the .csproj file: 
    - AssemblyVersion
    - FileVersion
    - PackageVersion
    - IncludeSymbols
    - SymbolPackageFormat

2. Add a `Directory.Build.props` file to the root of the _src_ folder and copy the content below.
   
    NB! Check if newer versions of the nuget packages are available.

      ```xml
      <?xml version="1.0" encoding="utf-8"?>
      <Project>

        <ItemGroup>
          <PackageReference Include="MinVer" Version="4.2.0" PrivateAssets="All" />
          <PackageReference Include="Microsoft.NETFramework.ReferenceAssemblies" Version="1.0.3" PrivateAssets="All" />
        </ItemGroup>
        <PropertyGroup>
          <RepoRoot>$([System.IO.Directory]::GetParent($(MSBuildThisFileDirectory)).Parent.FullName)</RepoRoot>
          <MinVerDefaultPreReleasePhase>preview</MinVerDefaultPreReleasePhase>
          <GenerateDocumentationFile>true</GenerateDocumentationFile>
          <LangVersion>10.0</LangVersion>
        </PropertyGroup>

        <Target Name="AssemblyVersionTarget" AfterTargets="MinVer" Condition="'$(BuildNumber)' != ''">
          <PropertyGroup>
            <FileVersion>$(MinVerMajor).$(MinVerMinor).$(MinVerPatch).$(BuildNumber)</FileVersion>
            <Version>$(MinVerMajor).$(MinVerMinor).$(MinVerPatch).$(BuildNumber)</Version>
            <AssemblyVersion>$(MinVerMajor).$(MinVerMinor).$(MinVerPatch).$(BuildNumber)</AssemblyVersion>
            <MinVerTagPrefix Condition="'$(MinVerTagPrefix)' == ''">$(PackageId).</MinVerTagPrefix>
          </PropertyGroup>
        </Target>

        <PropertyGroup Label="SourceLink">
          <PublishRepositoryUrl>true</PublishRepositoryUrl>
          <EmbedUntrackedSources>true</EmbedUntrackedSources>
          <IncludeSymbols>true</IncludeSymbols>
          <SymbolPackageFormat>snupkg</SymbolPackageFormat>
        </PropertyGroup>

        <ItemGroup Condition="'$(Deterministic)'=='true'">
          <SourceRoot Include="$(MSBuildThisFileDirectory)/" />
        </ItemGroup>

        <PropertyGroup Condition="'$(Deterministic)'=='true'">
          <ContinuousIntegrationBuild>true</ContinuousIntegrationBuild>
        </PropertyGroup>
      </Project>
      ```

3. Add a `Directory.Build.targets` file to the root of the _src_ folder and copy the content below.
   
    NB! Check if newer versions of the nuget packages are available.

      ```xml
      <Project>
        <ItemGroup>
            <PackageReference Include="Microsoft.SourceLink.GitHub" Version="1.1.1" Condition="'$(IntegrationBuild)' != 'true'">
                <PrivateAssets>all</PrivateAssets>
                <IncludeAssets>runtime; build; native; contentfiles; analyzers</IncludeAssets>
            </PackageReference>
        </ItemGroup>

        <PropertyGroup>
            <TargetFrameworkMonikerAssemblyAttributesPath>$([System.IO.Path]::Combine('$(IntermediateOutputPath)','$(TargetFrameworkMoniker).AssemblyAttributes$(DefaultLanguageSourceExtension)'))</TargetFrameworkMonikerAssemblyAttributesPath>
        </PropertyGroup>
        <ItemGroup>
            <EmbeddedFiles Include="$(GeneratedAssemblyInfoFile)" />
        </ItemGroup>
      </Project>
      ```
### GitHub setup
1. __Generate an API key with publishing rights for the library on nuget.org__
    
    A few key points for the key setup: 
    - choose a descriptive name, to know which key to rotate when. E.g. `altinn-access-token-publish-pipeline`
    - if the repository or solution includes multiple libraries, 
      find a matching global pattern to limit which packages the key is applicable to

2. __Add the API key as a secret to the repository under the name `NUGET_API_KEY`__
   
   [Please refer to GitHub's documentation on creating secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository)

3. __Set up a workflow for packing and publishing the library__    

    We assume the basics of GitHub workflow's are known here. Make sure to change all references to
    _Altinn.Common.AccessTokenClient_ in the example before using it in your repository. 

    ```yml 
    name: Pack and publish NuGet packages

    on:
      release:
        types:
          - published

    jobs:
      build-pack:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
            with:
              fetch-depth: 0

          - name: Install dotnet6
            uses: actions/setup-dotnet@v3
            with:
              dotnet-version: 7.0.x
          - name: Install deps
            run:  dotnet restore
          - name: Build AccessTokenClient
            if: startsWith(github.ref, 'refs/tags/Altinn.Common.AccessTokenClient-')
            run: |
              cd src/Altinn.Common.AccessTokenClient
              dotnet build --configuration Release --no-restore -p:Deterministic=true -p:BuildNumber=${{ github.run_number }}
          - name: Pack and publish AccessTokenClient
            if: startsWith(github.ref, 'refs/tags/Altinn.Common.AccessTokenClient-')
            run: |
              cd src/Altinn.Common.AccessTokenClient
              dotnet pack Altinn.Common.AccessTokenClient.csproj --configuration Release --no-restore --no-build -p:BuildNumber=${{ github.run_number }} -p:Deterministic=true
              dotnet nuget push bin/Release/*.nupkg --source https://api.nuget.org/v3/index.json --api-key ${{ secrets.NUGET_API_KEY }}       
    ```


### Package creation

Package creation is triggered by a new tag being added to the GitHub repository.
On creation, the workflow will run and depending on the created tag matching the _if_-condition
for the various steps, the building and publishing the NuGet package will commence.

### Development lifecycle 
1. Implement all changes necessary in the NuGet package project.
2. Submit a pull request on these changes and merge changes into main.
3. Create & publish a new preview release in the GitHub repository. The tag should match the name and version of the nuget package.
    
    e.g: Altinn.Common.AccessTokenClient-1.2.0-preview 
4. Once feature is tested ok, create a new release with an updated final tag

    e.g. or Altinn.Common.AccessTokenClient-1.2.0
    
## Manual procedures

### Project setup

To manually work with nuget packages the configuration below is required in the _.csproj_ file of the project.

Below is an example of the required values to be able to produce nuget packages. Be sure to update the highlighted
lines to reflect your project. All properties below are contained in the _\<PropertyGroup\>_ tag.

```xml {linenos=false,hl_lines=[5,6,8, 13]}
    <OutputType>Library</OutputType>

    <!-- NuGet package properties -->
    <IsPackable>true</IsPackable>
    <PackageId>Altinn.Common.AccessToken</PackageId>
    <PackageTags>Altinn;AccessToken</PackageTags>
    <Description>
      Package to verify Access Tokens from client. Require public certificates stored in Azure KeyVault.
    </Description>
    <Authors>Altinn Contributors</Authors>
    <RepositoryType>git</RepositoryType>
    <RepositoryUrl>
      https://github.com/Altinn/altinn-accesstoken
    </RepositoryUrl>
    <IncludeSymbols>true</IncludeSymbols>
  </PropertyGroup>
```

### Package creation

Detailed documentation on how to create a NuGet package, guidelines etc can be
found [here](https://docs.microsoft.com/en-us/nuget/quickstart/create-and-publish-a-package-using-visual-studio).

What follows is the common workflow that most Altinn developers use: 

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
   `dotnet nuget push ltinn.Common.AccessToken.2.5.10.snupkg -k [nuget api key] -s https://api.nuget.org/v3/index.json`
8. Your package will now be published to nuget.org


### Development lifecycle 

1. Implement all changes necessary in the NuGet package project. Remember to update the package version, 
   assembly version and file version so they match.
2. Submit a pull request on these changes only. No implementation on other projects should be included.
3. Once pull request is approved and changes are merged into master; 
   create and publish new NuGet package based on master branch.
4. Continue with implementation, referencing the updated package wherever it is needed.
5. Remember to update all outdated references to the package and check that all
   tests run successfully before submitting a final PR.

