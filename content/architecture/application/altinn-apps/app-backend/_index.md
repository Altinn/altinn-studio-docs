---
title: App Backend Application Arcitecture
linktitle: App Backend
description: Description of the application architecture for App Backend 
tags: ["tjenester 3.0", "app-backend", "application architecture"]
weight: 100
---

App Backend is based on [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/) and is 
a [MVC application](https://docs.microsoft.com/en-us/aspnet/core/mvc/overview).

This App Backend exposes REST-Api's consumed by the App Frontend and/or external systems / mobile apps.

The REST-APIS are implemented in different API-controllers and uses attribute based routing to identify the correct
operation.

The API-controllers uses defined interfaces to communicate with the app logic defined by the developer.

The below diagram show how the App Backend is build around 3 main packages.

- AltinnCore Runtime - MVC Application with predefined API's and functionality for Apps created in Altinn Studio
- ServiceLogic - Class library that contains business logic defined by the org/app developer
- ServiceLibrary - Common utils and interfaces making it possible for the Runtime to use ServiceLogic


{{%excerpt%}}
<object data="/architecture/application/altinn-apps/app-backend/app-backend-lib-dependencies-classdiagram.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}


#### Service Implementation.
The service implementation is C# code generated/created as part of the service 
development process in Altinn Studio.

The Service Implementation implement a defined interface that backend uses to be able to interact
with the service implementation.

The service implementation contains all backend code for logic and rules.  

#### Datamodel
The data model in a service is defined as an XSD. From the XSD it is generated
a C# representation of that model. 

In runtime all data is deserialized/serialized from/to this model when communication
with frontend/external systems.

All logic in the service will typical be related to the datamodel.

[download as visio]: /architecture/application/altinn-apps/altinnapps_application_architecture.vsdx
[See fullscreen]: /architecture/application/altinn-apps/altinnapps_application_architecture.svg


