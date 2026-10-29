---
draft: true
title: Overview of components, versioning and governance responsibilities
linktitle: Components, versions and responsibilities
description: Overview of components, versioning and governance responsibilities in Altinn Studio.
weight: 3
---

Here are important services and libraries that the Studio team owns and maintains:

## Studio Designer
[Studio Designer](https://altinn.studio/) is the tool where you design services.

- New features and bug fixes are published continuously
- Development and work is organised [in the Altinn/altinn-studio GitHub repo](https://github.com/Altinn/altinn-studio)

## App libraries
The app libraries consist of [Altinn.App.Api, Altinn.App.Core](https://github.com/Altinn/altinn-studio/tree/main/src/App/backend) and [frontend](https://github.com/Altinn/altinn-studio/tree/main/src/App/frontend).

- The backend libraries are hosted on NuGet.org. All Studio apps reference these libraries
- We use [SemVer 2.0](https://semver.org/) for versioning. Pre-release versions consist of `preview` and `rc` (release candidate) stages. Once the `rc` stage is reached, our goal is only to make bug fixes and patching until stabilisation
- HTTP APIs described in the app via OpenAPI specification follow their own versioning. API changes here occur in line with major version changes in the rest of the app (the libraries). Note that there may be APIs that are _not_ described in OpenAPI specifications. These are intended for internal use, and we can make changes to these without communicating it
- Development and work is organised [in the Altinn/altinn-studio GitHub repo](https://github.com/Altinn/altinn-studio).

## Localtest
[Localtest](https://github.com/Altinn/altinn-studio/tree/main/src/Runtime/localtest) is a local copy of the core APIs in the Altinn platform.

- New features and bug fixes are published continuously as needed
- Development and work is organised [in the Altinn/altinn-studio GitHub repo](https://github.com/Altinn/altinn-studio).

## Responsibility for apps
The apps themselves are owned and maintained by the service owner organisations.
