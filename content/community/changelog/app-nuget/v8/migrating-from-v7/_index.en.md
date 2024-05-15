---
title: Migrating from v7
description: Step by step guide to migrating your Altinn 3 App runtime from v7 to v8
weight: 50
toc: true
---

{{% notice info %}}
Altinn 3 App runtime v8 is now Generally Available and is recommended for all service owners.
Details about the latest point releases are on [GitHub](https://github.com/Altinn/app-lib-dotnet/releases).
{{% /notice %}}

## Introduction

This guide outlines the steps to migrate your app from version 7 to version 8 of the app nugets. 
Using the Altinn Studio command line interface (CLI) is the recommended upgrade path.

## Alternative 1 - Automated migration with the Altinn Studio CLI

The CLI will analyze your code and make the necessary changes to work with the new APIs in v8.

### 1. Ensure You Have the Latest Altinn Studio CLI Version

Ensure you’re using at least version `1.4.0`. 
Later versions may include additional code upgrade functionality. 

To check your current version, run:

```bash
altinn-studio --version
```

To install, run:
```bash
dotnet tool install -g altinn.studio.cli
```

To upgrade to the latest version, run:

```bash
dotnet tool update -g altinn.studio.cli
```

Altinn Studio CLI requires .NET 8.0 or later.

### Execute the Upgrade Command

Navigate to your app's root folder in your terminal. You can explore optional arguments for the `upgrade backend` command with:

```bash
altinn-studio upgrade backend --help
```

While the default options typically suffice, adjust them if your project has a non-standard structure. Errors and explanations will be provided if incorrect options are used.

It's advisable to have a clean working tree before upgrading. Commit or stash any changes to easily review or reset changes made by the CLI.

1. Restore any dependencies:
    ```bash
    dotnet restore
    ```
2. Run the upgrade command:
    ```bash
    altinn-studio upgrade backend
    ```

The CLI will update your code to version 8 and display any warnings or errors encountered.

## Alternative 2 - Manual migration

1. Update the nuget packages in your `App.csproj` file to version `8.0.0`.
    <br><br>
    {{< code-title >}}
    App/App.csproj
    {{< /code-title >}}
    ```diff
    -   <PackageReference Include="Altinn.App.Api" Version="7.15.3">
    +   <PackageReference Include="Altinn.App.Api" Version="8.0.0">
            <CopyToOutputDirectory>lib\$(TargetFramework)\*.xml</CopyToOutputDirectory>
        </PackageReference>
    -   <PackageReference Include="Altinn.App.Core" Version="7.15.3" />
    +   <PackageReference Include="Altinn.App.Core" Version="8.0.0" />
            <CopyToOutputDirectory>lib\$(TargetFramework)\*.xml</CopyToOutputDirectory>
        </PackageReference>
    ```
2. Address the breaking changes in your code. 
Refer to the [v8 changelog](/community/changelog/app-nuget/v8/#breaking-changes) for details. 
Note that the CLI does handle some breaking changes may not be fully documented, making CLI the preferred upgrade method.