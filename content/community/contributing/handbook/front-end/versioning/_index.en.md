---
title: Versioning
description: Guidelines for versioning of front-end
tags: [development, front-end, versioning]
weight: 100
---

The frontends, both for Altinn Studio and Apps are set up as node modules, using a package.json
to import external dependencies. In `package.json` for each package we can specify the version of the 
package. In this context, _package_ refers to the different applications we are bulding, such as
`altinn-app-frontend`, `receipt`, etc.  

Each time we make a change to a package, we need to update the version of the package to reflect the change. 
This is especially important in the packages related to `Altinn.Apps` - whenever changes are merged into the 
main branch, the compiled javascript is uploaded to a CDN where it can be used by the app, and the 
CDN supports versioning. So an app can refer to a specific version of f.ex. the app frontend.

The packages use [semantic versioning](https://semver.org/):

> Given a version number MAJOR.MINOR.PATCH, increment the:
>
> 1. MAJOR version when you make incompatible API changes,
> 2. MINOR version when you add functionality in a backwards compatible manner, and
> 3. PATCH version when you make backwards compatible bug fixes.
> Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.
 
Each time a change is made to any frontend applications, the version in the corresponding `package.json` must be
updated according to the rules above.

{{%notice warning%}}
The default is for a new app to refer to the latest MAJOR version of the app frontend. If 
any changes are made that cause us to update the MAJOR version, remember to also update
the app template, so that any new apps will refer to the newest MAJOR version.
{{%/notice%}}