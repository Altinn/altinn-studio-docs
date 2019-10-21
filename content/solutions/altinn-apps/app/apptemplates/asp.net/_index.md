---
title: Asp.Net Web Application Template
description: Description of the app created in Altinn Studio and that is deployed to Altinn Apps.
tags: [altinn-apps]
weight: 200
---

This template is based on a [ASP.Net Core Web application](https://dotnet.microsoft.com/apps/aspnet/web-apps) with [Rest APIs](https://dotnet.microsoft.com/apps/aspnet/apis)

It is integrated with Altinn Platform making it easy to utilize the functionality provided in Altinn Platform like storage, authentication, authorization and other components.

For web applications that need a web based UI, it has a React based frontend that can be configured in Altinn Studio.

[ASP.Net Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-3.0) is a cross-platform, high performance, 
open-source framework for building modern cloud-based, Internet-connected application.

Together with the added Altinn functionality in the template it is a effective platform to build application powered by Altinn Platform.

## Template Content
The template contains lots of features to support functionality needed by Apps running in Altinn Apps.

The below describes the different features and possibilities. 

### App Configuration
The App template based on Asp.Net Core contains different types of standard configuration files.

#### Process
The Process.xml defines the business process of the app and is based om BPMN 2.0.

#### XACML
The Polixy.xml defines the authorization policy with rules. Is based on XACML 3.0

#### UI
The Formlayout.json defines the rendering of the UI based on Altinn Studio UI designer. 

#### Text Resources
The App can be breated with multiple langauges at the same time. The different texts are put in language files for each language.

#### Prefill 
Prefill.json defines the prefill for a app

### App libraries
The Asp.Net Template uses some libraries created by Altinn.

#### Altinn.App.Api 
This library contains controllers for the standard App APIS in a App. The app uses this API to expose all the API's typical needed by Apps.

##### Instance API
API for instances

##### Data Api
API for data

##### Process Api
API for process management of Apps.

##### Validation API
API to validate state of the App

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




