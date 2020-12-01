---
title: Nuget Package
description: Overview of nuget package usage in altinn studio
tags: [nuget]
weight: 100
---
{{%notice warning%}}
This page is constantly updated on the use of nuget package in altinn studio. 
{{% /notice%}}

### Nuget Package

Altinn Studio publishes nuget package to share common libraries between different solutions. You can read more about nuget [here](https://www.nuget.org/).

Following nuget packages are published and are available for download [here](https://www.nuget.org/profiles/altinn)

- [Altinn.App.Api](https://www.nuget.org/packages/Altinn.App.Api)
- [Altinn.App.Common](https://www.nuget.org/packages/Altinn.App.Common)
- [Altinn.App.PlatformServices](https://www.nuget.org/packages/Altinn.App.PlatformServices)
- [Altinn.Common.PEP](https://www.nuget.org/packages/Altinn.Common.PEP)
- [Altinn.Platform.Storage.Interface](https://www.nuget.org/packages/Altinn.Platform.Storage.Interface/)
- [JWTCookieAuthentication](https://www.nuget.org/packages/JWTCookieAuthentication/)


### Procedure for Nuget Packages
1. Implement all changes necessary in the Nuget package project. Remember to update the package version.
2. Submit a pull request on these changes only. No implementation on other projects should be included.
3. Once pull request is approved and changes are merged into master; create and deploy new Nuget package based on master branch.
4. Continue with implementation, referencing the updated package wherever it is needed.
5. Remember to update all outdated references to the package and check that all tests run successfully before submitting a final PR.


### Create Nuget package

Detailed documentation on how to create a NuGet package, guidelines etc can be found [here](https://docs.microsoft.com/en-us/nuget/quickstart/create-and-publish-a-package-using-visual-studio).

### An example of  nuget package creation in altinn studio

Example : Create Altinn.Platform.Storage.Interface nuget package

### Set Project Properties

1. Open Altinn.Platform.Storage solution  
2. Right click on Storage.Interface project and select properties. You will see the screen below:  
![Project Properties](storageinterface-props.png?width=1000 "Project Properties")
3. Choose Package, add the package details such as id, version, description, author, company and tags.
4. Save the changes
5. Choose release mode
6. Right click on Storage.Interface and select "Pack"
7. The package will now be created in  
   **C:\Repos\altinn-studio\src\Altinn.Platform\Altinn.Platform.Storage\Storage.Interface\bin\Release**
8. Go to commandline, navigate to the release path
9. Run the command:  
   **dotnet nuget push Altinn.Platform.Storage.Interface.2.3.0.nupkg -k [nuget api key] -s https://api.nuget.org/v3/index.json**
10. Your package will now be published to nuget.org

