---
draft: true
title: Update dependencies in app
linktitle: Dependencies
description: How to update dependencies in an app.
toc: true
---

The app depends on several external resources.
These include shared libraries used by all apps and the Helm chart used for deployment.

These dependencies are defined in different places in the app, and each dependency is references by a specific _version_.
When fixes and improvements are made to the dependencies a new _version_ will be published.
To use the updated dependencies, you need to update the version use in your app.

## Nuget
_Nuget is .NET package manager, this is where we publish code libraries that is used by all the apps._

Apps uses multiple libraries, these are updated regularly with improvements and new functionality. 
Apps references explicit versions of the different libraries. 
These references must be updated to get the latest version

### Upgrade to latest version

{{%panel info%}}
**Tip** Install [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens)-extension for Visual Studio Code.  
With this extension you can view what the latest version of all dependencies when you open App.csproj (the extension also supports npm).
{{% /panel%}}

{{<content-version-selector classes="border-box">}}

{{<content-version-container version-label="v7.0.0 and newer">}}

- Locate the references to the libraries used in your app. The references are located in `App/App.csproj`. 

Example.:

```xml
<ItemGroup>
  <PackageReference Include="Altinn.App.Api" Version="7.15.1" />
  <PackageReference Include="Altinn.App.Core" Version="7.15.1" />
</ItemGroup>
```

- Check if a new version of the libraries are published:
    - [Altinn.App.Api](https://www.nuget.org/packages/Altinn.App.Api)
    - [Altinn.App.Core](https://www.nuget.org/packages/Altinn.App.Core)
- Update the reference to the latest version and save the file.
- Check if there is any [breaking changes](/en/community/changelog/app-nuget/) with the new version,
  make necessary changes if there are any issues.
- Build and deploy a new version of your app.
{{</content-version-container>}}

{{<content-version-container version-label="v6.1.0 and older">}}

- Locate the references to the libraries used in your app. The references are located in `App/App.csproj`. 

Example.:

```xml
<ItemGroup>
  <PackageReference Include="Altinn.App.Api" Version="3.0.0" />
  <PackageReference Include="Altinn.App.Common" Version="3.0.0" />
  <PackageReference Include="Altinn.App.PlatformServices" Version="3.0.0" />
  <PackageReference Include="Microsoft.Extensions.Logging.Debug" Version="3.1.3" />
  <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="3.1.2" />
</ItemGroup>
```

- Check if a new version of the libraries are published:
    - [Altinn.App.Api](https://www.nuget.org/packages/Altinn.App.Api)
    - [Altinn.App.Common](https://www.nuget.org/packages/Altinn.App.Common)
    - [Altinn.App.PlatformServices](https://www.nuget.org/packages/Altinn.App.PlatformServices)
- Update the reference to the latest version and save the file.
- Check if there is any [breaking changes](/en/community/changelog/app-nuget/) with the new version,
  make necessary changes if there are any issues.
- Build and deploy a new version of your app.

{{</content-version-container>}}
{{</content-version-selector>}}

## Deployment

Deployments are defined with helm-charts. The standard deployment setup is fetched from altinn-studios helm repository if you leverage the latest deployment strategy (recommended).

If you unsure if your app leverages the latest deployment strategy you can follow the migration guide [here](/en/community/changelog/deployment/migration/)

To find the latest version of the standard helm-chart you can either check for the latest release of the chart `deployment` [here](https://github.com/Altinn/altinn-studio-charts/releases)
or add the helm repo locally and search for available version with these commands:

```shell
# Add the altinn-studio helm repo
helm repo add altinn-studio https://charts.altinn.studio

# Search for version of altinn-studio/deployment chart
helm search repo -l altinn-studio/deployment
```

If there is a new version of the helm chart check the [changelog](/en/community/changelog/deployment/) to see what's new in this release.

To update to the new version update the dependency reference in `deployment/Chart.yaml`

```yaml {hl_lines=[9]}
apiVersion: v1
description: A Helm chart for Kubernetes
name: deployment
version: 1.1.0

dependencies:
- name: deployment
  repository: https://charts.altinn.studio/
  version: 2.8.0                                <--- Update this
```
