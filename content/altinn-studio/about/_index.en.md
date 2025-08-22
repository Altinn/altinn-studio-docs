---
title: About Altinn Studio
description: High-level description of Altinn Studio
aliases:
- /altinn-studio/
- /technology/altinnstudio/solutions/altinn-studio/
weight: 10
cascade:
  params:
    diataxis: diataxis_explanation
---

Altinn Studio is a platform for developing, operating, and managing digital services for citizens and businesses. The platform 
runs on secure, isolated, and scalable infrastructure and is pre-integrated with a range of shared solutions and open APIs. 
Altinn Studio supports both user interfaces for manual submission and APIs for machine-to-machine submission.

## What can I create with Altinn Studio?

With Altinn Studio, you can develop digital services that cover a broad spectrum of use cases - from simple form services 
and information solutions to complex workflows with payment and signing functionality. The platform supports everything 
from traditional forms to custom applications with advanced integrations.

See [detailed overview of use cases](./usecases) for a description of the possibilities.

## Altinn Studio is the "connector"
A form is rarely just data fields to be submitted; more is needed to create a good service – e.g., connection
to ID-porten, submission to the case processing system via eFormidling, or connection to national registers.

Altinn Studio has pre-developed integrations with several of Digdir's shared services and national registers, and will
continue to develop and add more.

![Altinn Studio is the "connector"](./studio-i-midten.png "Altinn Studio is the connector")

## Low-code and traditional code
Altinn Studio is a hybrid between low-code and traditional coding. This means you can start with low-code in Altinn Studio
Designer and switch to dedicated development tools like Visual Studio Code if you have advanced needs that require coding.

Our goal is to do as much as possible with low-code but retain the option for traditional coding and the flexibility
it provides. This allows non-technical resources to design and publish services without the need to involve developers.
At the same time, a developer can be brought in to create more advanced functionality that requires coding.

![The tool supports both low-code and traditional coding](./nocode_vs_coding.png "The tool supports both low-code and traditional coding")

## Principles that Altinn Studio is built on
Here are some of the principles underlying our development of Altinn Studio.
- **Free and open-source code** because we genuinely believe that openness and the opportunity for others to contribute is the way to go for developing services in the public sector.
- **Based on open standards** because closed code ties you to a supplier and often entails additional costs.
- **Cloud-based infrastructure** where loose connections are sought without binding to a specific cloud provider.
- **Built on modern and popular frameworks/products** because it makes it easier for both us and our customers to acquire technical resources and because it's something one wants to work with/learn.
- **Embedded security** where each layer in the architecture authorizes use regardless of where the calls come from.
- **Isolation** – Service owners get their own environments for testing and production.

### Open source and collaboration
Altinn Studio is not perfect, but it takes you a long way in creating good digital services - and we continuously add new functionality.

Instead of creating something on your own or buying something – why not contribute to the open-source project where there may be gaps
and thus give something back to the community?
The Altinn Studio teams handle quality assurance and ongoing code management.

Creating an environment around the development of services is important to us, and we now have a good number of contributors from
many public agencies contributing to advancing the product with us.
Contributions range from fixing typos that take seconds to fix to major components that have taken months.

An important part of creating an environment is the developer contact we have via Altinn Slack. Each service owner has their own
channel where questions can be asked.
We also see that service owners help each other and share experiences across organizations.
Backlog, user stories, plans, and roadmaps – everything is openly available on GitHub, providing both insight
and comments.

#### Governance

The Studio product consists of multiple components. 
Here are core services and libraries that are owned and governed by the Studio team:

* [Studio Designer](https://altinn.studio/)
  * New features and bugfixes are continuously deployed on a daily basis
  * Development and work is tracked [in the Altinn/altinn-studio GitHub repository](https://github.com/Altinn/altinn-studio)
* App libraries - [Altinn.App.Api, Altinn.App.Core](https://github.com/Altinn/app-lib-dotnet) and [the frontend](https://github.com/Altinn/app-frontend-react)
  * Libraries hosted on NuGet.org. All Studio apps reference these libraries
  * Versioned using [SemVer 2.0](https://semver.org/). Prereleases consist of `preview` and `rc` (release candidate) stages. When `rc` stage is reached we intend to only do bug fixes and patching until stabilization
  * HTTP APIs described in the app via OpenAPI specifications have their own versioning scheme. API changes here occur in line with major version changes in the rest of the app (the libraries). Note that there may be APIs that are _not_ described in OpenAPI specifications; these are intended for internal use and we may make changes to these without any communication.
  * Development and work is tracked [in the Altinn/app-lib-dotnet](https://github.com/Altinn/app-lib-dotnet) and [Altinn/app-frontend-react](https://github.com/Altinn/app-frontend-react) GitHub repositories
* Localtest - [local copy of core Altinn platform APIs](https://github.com/Altinn/app-localtest)
  * New features and bugfixes are continuously deployed as needed
  * Development and work is tracked [in the Altinn/app-localtest GitHub repository](https://github.com/Altinn/app-localtest)

The apps themselves are owned and operated by the owning organisation.
