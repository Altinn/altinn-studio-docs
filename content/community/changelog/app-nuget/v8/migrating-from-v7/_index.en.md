---
title: Migration from v7
description: How to migrate from v7 to v8
weight: 50
toc: true
---

{{% notice info %}}
As of writing this documentation, the latest preview release of v8 is `8.0.0-preview.17`. Updated information
[is available on GitHub](https://github.com/Altinn/app-lib-dotnet/releases).
{{% /notice %}}

## Introduction

This guide will help you migrate your app from using version 7 of the app nugets to version 8. 
There is currently no support in Altinn Studio for upgrading apps, so using the Altinn Studio CLI is the recommended way to migrate. 

## Migrate automatically using the Altinn Studio CLI

The Altinn Studio CLI is a command line tool for upgrading Altinn Apps. The tool is able to upgrade and fix most breaking changes between version 7 and 8 of the app nugets.

### Verify that you have the latest version of the Altinn Studio CLI

If you do not have the CLI installed, you can install it by following the instructions in the [installation guide](/app/cli/install).

<!-- TODO: Uncomment and update version number when a new version gets released
Make sure you are using at least version 1.0.0 of the altinn studio cli. You can check the version by running:

```bash
altinn-studio --version
```

If you have an older version, you can update it by running:

```bash
dotnet tool update -g altinn.studio.cli
```

-->

### Run the upgrade command

First, navigate to the root folder of your app in your terminal. There are several optional arguments you can use with the `upgrade backend` command. You can see all the available options by running:

```bash
altinn-studio upgrade backend --help
```

The default options should work for most apps, but you may need to specify some options if you have a non-standard project structure. 
If some of the options are not correct, the CLI should print an error message explaining what went wrong.

It is recommended to have a clean working tree before running the upgrade command. 
This means that you should commit or stash any changes you have made to your code before running the command. 
That way you can easily see what changes the CLI made to your code, as well as reset and try again if something went wrong.

1. Before running the upgrade you need to first restore any dependencies:
    ```bash
    dotnet restore
    ```
2. When you are ready to upgrade, run the following command:
    ```bash
    altinn-studio upgrade backend
    ```

The CLI will then make the necessary changes to your code to upgrade it to version 8. The CLI will also print warnings and errors if it encounters any problems during the upgrade process, make sure to read these carefully.

## Migrate manually

1. To migrate manually from v7 to v8, you need to upgrade the nuget packages in your `App.csproj` file to version `8.0.0-preview.17`.
    <br><br>
    {{< code-title >}}
    App/App.csproj
    {{< /code-title >}}
    ```diff
    -   <PackageReference Include="Altinn.App.Api" Version="7.15.3">
    +   <PackageReference Include="Altinn.App.Api" Version="8.0.0-preview.17">
            <CopyToOutputDirectory>lib\$(TargetFramework)\*.xml</CopyToOutputDirectory>
        </PackageReference>
    -   <PackageReference Include="Altinn.App.Core" Version="7.15.3" />
    +   <PackageReference Include="Altinn.App.Core" Version="8.0.0-preview.17" />
            <CopyToOutputDirectory>lib\$(TargetFramework)\*.xml</CopyToOutputDirectory>
        </PackageReference>
    ```
2. Next, you need to fix the breaking changes in your code. See the [changelog for v8](/community/changelog/app-nuget/v8/#breaking-changes) for more information.
