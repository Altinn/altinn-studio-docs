---
title: Filestructure in template
description: Description of the files in the ASP.Net template
linktitle: Filestructure
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

[See standard BPMN file in template](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/App/config/process/process.bpmn)

#### XACML
The Polixy.xml defines the authorization policy with rules. Is based on [XACML 3.0.](http://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html)

The XACML is imported in to authorization component.

[See standard XACML file in template](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/App/config/authorization/policy.xml)


#### UI
The Formlayout.json defines the rendering of the UI based on Altinn Studio UI designer. 

#### Text Resources
The App can be breated with multiple langauges at the same time. The different texts are put in language files for each language.

#### Prefill 
Prefill.json defines the prefill for a app

#### Dockerfile
Defines the docker image
