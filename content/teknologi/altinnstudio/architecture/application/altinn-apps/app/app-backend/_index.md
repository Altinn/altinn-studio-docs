---
title: App Backend Application Arcitecture
linktitle: App Backend
description: Description of the application architecture for App Backend 
tags: [architecture, app-backend]
weight: 100
---

In this app template the App Backend is based on [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/) and is 
a [Web Api application](https://docs.microsoft.com/en-us/aspnet/core/web-api/).

This App Backend exposes REST-Api's consumed by a optional App Frontend and/or external systems / mobile apps.
The structure of the API's is documentet [here](/altinn-api/)

The REST-APIS are implemented in different API-controllers and uses attribute based routing to identify the correct
operation.

The API-controllers uses defined interfaces to communicate with the app logic defined by the developer.

The below diagram show how the App Backend is build around 3 main packages.

- AltinnCore Runtime - MVC Application with predefined API's and functionality for Apps created in Altinn Studio
- ServiceLogic - Class library that contains business logic defined by the org/app developer
- ServiceLibrary - Common utils and interfaces making it possible for the Runtime to use ServiceLogic

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/application/altinn-apps/app-backend/app_backend_application_architecture.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px;"></object>
{{% /excerpt%}}


#### App logic
The app logic is C# code generated/created as part of the app development process in Altinn Studio.

The service implementation class implement a defined interface that backend uses to be able to interact
with the service implementation.

This is done through reflection. The App container contains a dll of the app logic. 

The service implementation contains all backend code for logic and rules.  

The different controllers calls the app logic

#### Datamodel
The data model in an app is defined as an XSD. From the XSD it is generated
a C# representation of that model.

In runtime all data is deserialized/serialized from/to this model when communication
with frontend/external systems.

All logic in the app will typical be related to the datamodel.

[download as visio]: /teknologi/altinnstudio/architecture/application/altinn-apps/altinnapps_application_architecture.vsdx
[See fullscreen]: /teknologi/altinnstudio/architecture/application/altinn-apps/altinnapps_application_architecture.svg


