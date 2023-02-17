---
title: Update dependencies in app
linktitle: Dependencies
description: How to update dependencies in an app.
toc: true
---

The app is dependent on multiple external dependencies.
This includes larger libraries with common functionality for all apps and reference to the apps frontend.

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
- Check if there is any [breaking changes](/community/changelog/app-nuget) with the new version,
  make necessary changes if there are any issues.
- Build and deploy a new version of your app.


## App frontend

App frontend is loaded at runtime, through a link to the javascript-file for app frontend.
This javascript-file uses [Semantic Versioning](https://semver.org/):

> Given a version number MAJOR.MINOR.PATCH, increment the:
> 
> MAJOR version when you make incompatible API changes,<br/>
> MINOR version when you add functionality in a backwards compatible manner, and<br/>
> PATCH version when you make backwards compatible bug fixes.
> 
> Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

The app references by default to a _major_ version of app frontend, e.g. version 1.x.y
With the default setup all _minor_ and _patch_ version will be automatically pulled in.
If a new _major_ version is published you need to update your app to pull this new version, watch out for [breaking changes](/community/changelog/app-frontend))

If you want to lock the frontend to a specific version of app frontend (e.g. 1.2.3) you specify this directly in the URL that points to app frontend.

### Upgrade to new version / specific version
The reference to app frontend is located in `App/views/Home/Index.cshtml`.

You need to update two references:

- Reference to altinn-app-frontend.**js**-file which contains the code for app frontend.
  
```html
<script src="https://altinncdn.no/toolkits/altinn-app-frontend/<VERSIONNUMBER>/altinn-app-frontend.js"></script>
```
- Reference to altinn-app-frontend.**css** which contains the styling for app frontend.

```html
<script src="https://altinncdn.no/toolkits/altinn-app-frontend/<VERSIONNUMBER>/altinn-app-frontend.css"></script>
```

Search for the filename (àltinn-app-frontend.js` or `altinn-app-frontend.css`) and replace the version number (e.g. 1) with the desired version number (e.g. 2).

_Reminder:_ If you depend on a _major_ version (e.g. 2), every _minor_ and _patch_ version of this _major_ release will be applied automatically. If a specific version is defined (e.g. 2.0.0) the application will fetch this version until the reference is updated and no fixes or improvements will be fetched.

## Deployment

Deployments are defined with helm-charts. The standard deployment setup is fetched from altinn-studios helm repository if you leverage the latest deployment strategy (recommended).

If you unsure if your app leverages the latest deployment strategy you can follow the migration guide [here](/community/changelog/deployment/migration)

To find the latest version of the standard helm-chart you can either check for the latest release of the chart `deployment` [here](https://github.com/Altinn/altinn-studio-charts/releases)
or add the helm repo locally and search for available version with these commands:

```shell
# Add the altinn-studio helm repo
helm repo add altinn-studio https://charts.altinn.studio

# Search for version of altinn-studio/deployment chart
helm search repo -l altinn-studio/deployment
```

If there is a new version of the helm chart check the [changelog](/community/changelog/deployment/) to see what's new in this release.

To update to the new version update the dependency reference in `deployment/Chart.yaml`

```yaml {hl_lines=[9]}
apiVersion: v1
description: A Helm chart for Kubernetes
name: deployment
version: 1.1.0

dependencies:
- name: deployment
  repository: https://charts.altinn.studio/
  version: 2.5.0                                <--- Update this
```
