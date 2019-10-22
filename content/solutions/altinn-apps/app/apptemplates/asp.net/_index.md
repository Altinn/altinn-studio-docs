---
title: ASP.NET Web Application Template
description: Description of ASP.NET Web based App template for Altinn Apps
linktitle: ASP.NET Web
tags: [altinn-apps]
weight: 200
---

This template is based on a [ASP.NET Core Web application](https://dotnet.microsoft.com/apps/aspnet/web-apps) with [Rest APIs](https://dotnet.microsoft.com/apps/aspnet/apis)

It is integrated with Altinn Platform making it easy to utilize the functionality provided in [Altinn Platform](/solutions/altinn-platform/) like [storage](/solutions/altinn-platform/storage/), [authentication](/solutions/altinn-platform/authentication/), 
[authorization](/solutions/altinn-platform/authorization/) and other components.

For web applications that need a web based UI, it has a [React](https://reactjs.org/) based frontend that can be [configured in Altinn Studio](https://altinn.github.io/docs/altinn-studio/app-creation/ui-editor/).

[ASP.Net Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-3.0) is a cross-platform, high performance,
open-source framework for building modern cloud-based, Internet-connected application.

Together with the added Altinn functionality in the template, it is a effective platform to build applications powered by Altinn Platform.

Applications based on this templates are buildt as Docker Containers and hosted in Kubernetes.

## Template Content
The template contains lots of features to support functionality needed by Apps running in Altinn Apps.

The below describes the different features and possibilities.

### App Configuration
The App template based on Asp.Net Core contains different types of standard configuration files.

#### Process
The Process.xml defines the business process of the app and is based om [BPMN 2.0.](https://www.omg.org/spec/BPMN/2.0/) 
The app supports differen types of processes.

#### XACML
The Polixy.xml defines the authorization policy with rules. Is based on [XACML 3.0.](http://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html)

The XACML is imported in to authorization component.

#### UI
The Formlayout.json defines the rendering of the UI based on Altinn Studio UI designer. 

#### Text Resources
The App can be breated with multiple langauges at the same time. The different texts are put in language files for each language.

#### Prefill 
Prefill.json defines the prefill for a app

#### Dockerfile
Defines the docker image

### App libraries
The Asp.Net Template uses some libraries created by Altinn.

#### Altinn.App.Api 
This library contains controllers for the standard App APIS in a App. The app uses this API to expose all the API's typical needed by Apps.
The API's are in detailed explained [here](https://docs.altinn.studio/altinn-api/), the below summaries the most important ones.

##### Instance API
API for instances

##### Data Api
API for data

##### Process Api
API for process management of Apps.

##### Validation API
API to validate state of the App

##### Profile Api


#### Altinn.App.Services
The Service Library contains client functionality for platform and other functionality that a App can choose to need.

##### Storage


##### Register


##### Profile


###### 


#### Altinn.App.Common
Contains common functionality needed.


## Extensibility

### Apis

### Custom frontend
If the configurable React based UI is to limited for a application need, it is possible to build your own SPA based frontend that uses the 


## Testing
The template contains a test project making it easy to extend with own tests.




