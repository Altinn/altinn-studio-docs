---
title: Application Architecture Runtime
linktitle: Altinn Studio Apps
description: Description of the application architecture for runtime applicationz
tags: ["tjenester 3.0"]
weight: 100
---
{{% notice warning %}}
NOTE: Work in progress. Stuff will change
{{% /notice %}}

The following diagram shows the application architecture for the Altinn Studio Apps solution.

{{%excerpt%}}
<object data="/architecture/application/altinn-studio-apps/AltinnStudioApps_ApplicationArchitecture.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}

[See fullscreen] or [download as visio]


## Service App
The Service App consist of plattform code (AltinnCore.Runtime) and Service Code and logic.

AltinnCore.Runtime is a .Net Core MVC application 

### Frontend
The runtime application will have two different types of frontend.
* Frontend developed by the service developer in Altinn Studio designer
* Frontend that is part of the plattform and cant be changed by the service developer

#### Frontend for Altinn Studio service
The frontend developed as part of the service development in Altinn Studio is based on REACT.

Altinn Studio Generates a REACT app based on the selected components in the service UI. 

This app uses the backend APIS for creating, updating, deleting data in the service datamodell. 

See details for [REACT App architecture](react-app)

For services with requirements that is not supported with the WYSIWYG REACT editor the service developer 
could build theire own client based frontend on REACT or other frameworks hosted in runtime. 

It will also be possible to build a GUI hosted elsewhere and just use the service APIs to handle data updates

#### Frontend for platform views
As part of the platform there is some standard pages presented during the workflow for a service
that the service developer does not need to create GUI for. 
* Instansiation
* Send in
* Signing
* Payment

These are all using Razor as frontend framework.

### Backend
Backend is based on ASP.Net Core and is a MVC application that uses defined
interfaces to run the specific service logic implemented in Altinn Studio.

#### Altinn Studio Mode
In Altinn Studio mode the runtime instances will be shared between different end user services.

Based on the logged in service developer and URL parames the correct service implementation will be compiled and loaded in to memory
for backend. 

#### End User Mode
In End User mode there will be built dedicated container images for each service. 
The Service Implementation will be pre-compilled and stored in the container file structure
so it can be loaded in to memory. 

#### Service Implementation.
The service implementation is C# code generated/created as part of the service 
development process in Altinn Studio.

The Service Implementation implement a defined interface that backend uses to be able to interact
with the service implementation.

The service implementation contains all backend code for logic and rules.  


## DataServices
The data service application exposes API to the Service Apps for data related functionality like
save, update and get instance data. 

## Authorization
The authorization application contains functionality for Policy Information Point and Policy
Decission Point. This is used from service apps and other platform services like dataservices that need
to authorize access.

The authorization application will be a .Net Core ASP.NET MVC application that 
exposes functionality through REST-API

### Datamodel
The data model in a service is defined as an XSD. From the XSD it is generated
a C# representation of that model. 

In runtime all data is deserialized/serialized from/to this model when communication
with frontend/external systems.

All logic in the service will typical be related to the datamodel.

[download as visio]: /architecture/application/altinn-studio-apps/AltinnStudioApps_ApplicationArchitecture.vsdx
[See fullscreen]: /architecture/application/altinn-studio-apps/AltinnStudioApps_ApplicationArchitecture.svg