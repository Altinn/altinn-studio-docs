---
title: Application Architecture Altinn Apps
linktitle: App Backend
description: Description of the application architecture for App Backend 
tags: ["tjenester 3.0", "app-backend", "application architecture"]
weight: 100
---

Backend is based on [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/) and is 
a [MVC application](https://docs.microsoft.com/en-us/aspnet/core/mvc/overview) that uses defined
interfaces to run the specific service logic implemented in Altinn Studio.

This backend exposes REST-Api's consumed by the App Frontend and/or external systems / mobile apps.

The MVC backend application loads service specific code from container disk.

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


