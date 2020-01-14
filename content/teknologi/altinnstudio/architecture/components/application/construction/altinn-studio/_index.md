---
title: Application Construction Architecture Altinn Studio
linktitle: Altinn Studio
description: Description of the application construction architecture for altinn studio solution
weight: 100
---
{{% notice warning %}}
NOTE: Work in progress. Stuff will change
{{% /notice %}}

The following diagram shows the application architecture for Altinn Studio solution

{{%excerpt%}}
<object data="/architecture/application/altinn-studio/AltinnStudio_ApplicationArchitecture.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}


[See fullscreen] or [download as visio]

## Designer

### Frontend  designer
The frontend for the designer application is based on REACT. 
It is split into different REACT applications and components for the different functional areas of the designer. Take a look at the [front-end architecture](react-app) for more details.

### Backend designer
Backend of designer is based on .Net Core and ASP.Net Core. It exposes API to the REACT applications

## Repository
The repository application is based on [GITEA](https://gitea.io/). This is a open source product created in [GO](https://golang.org/). Take a look at the [Customize Gitea]() for more details on how to customize gitea.

## Runtime
Runtime is both part of the Altinn Studio and the Altinn Studio Apps solution.

For Altinn Studio the Runtime is shared between all services and all 

### Frontend runtime
The runtime application will have two different types of frontend.

* Frontend developed by the app developer in Altinn Studio designer
* Frontend that is part of the plattform. 

#### Frontend for Altinn Studio App
The frontend developed as part of the app development in Altinn Studio is based on REACT.

Altinn Studio Generates a REACT app based on the selected components in the app UI. 

This app uses the backend APIS for creating, updating, deleting data in the app datamodell. 

See details for [REACT App architecture](react-app)

For apps with requirements that is not supported with the WYSIWYG REACT editor the app developer 
could build their own client based frontend on REACT or other frameworks hosted in runtime. 

It will also be possible to build a GUI hosted elsewhere and just use the app APIs to handle data updates

#### Frontend for platform views
As part of the platform there is some standard pages presented during the workflow for an app
that the app developer does not need to create GUI for. 
* Instansiation
* Payment

These are all using Razor as frontend framework.

### Backend
Backend is based on ASP.Net Core and is a MVC application that uses defined
interfaces to run the specific app logic implemented in Altinn Studio.

#### Altinn Studio Mode
In Altinn Studio mode the runtime instances will be shared between different end user services.

Based on the logged in app developer and URL parames the correct service implementation will be compiled and loaded in to memory
for backend. 

[download as visio]: /architecture/application/altinn-studio/AltinnStudio_ApplicationArchitecture.vsdx
[See fullscreen]: /architecture/application/altinn-studio/AltinnStudio_ApplicationArchitecture.svg

