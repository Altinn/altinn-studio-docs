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
The Service App consist of plattform code (AltinnCore.Runtime) and  

This is deployed as a Docker container in a Kubernetes Pod. 
See [deployment architecture](/architecture/deployement/altinn-studio-apps) for deployment details. 

### Front-end Service App
The Service App have two different types of front.end.
* Front-end configured by the service developer in Altinn Studio ui-designer
* Front-end that is part of the plattform and can't be changed by the service developer

#### Front-end configured by the service developer
The front-end developed as part of the service development in Altinn Studio is based on REACT.

Altinn Studio Generates a REACT app based on the selected components in the service UI. 

This app uses the backend APIS for creating, updating, deleting data in the service datamodell. 

See details for [REACT App architecture](react-app)

For services with requirements that is not supported with the WYSIWYG REACT editor the service developer 
could build theire own client based frontend on REACT or other frameworks hosted in runtime. 

It will also be possible to build a GUI hosted elsewhere and just use the service APIs to handle data updates

#### Front-end for platform 
As part of the platform there is some standard pages presented during the workflow for a service
that the service developer does not need to create GUI for. 
* Instansiation
* Send in
* Signing
* Payment

The assumption is that these will be React apps. They are currently Razor.

### Backend
Backend is based on ASP.Net Core and is a MVC application that uses defined
interfaces to run the specific service logic implemented in Altinn Studio.

This backend exposes API to front-end react applications and external systems. 

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

[download as visio]: /architecture/application/altinn-studio-apps/AltinnStudioApps_ApplicationArchitecture.vsdx
[See fullscreen]: /architecture/application/altinn-studio-apps/AltinnStudioApps_ApplicationArchitecture.svg


## DataServices
The data service application exposes API to the Service Apps for data related functionality like
save, update and get instance data. 

## Authorization
The authorization application contains functionality for Policy Information Point and Policy
Decission Point. This is used from service apps and other platform services like dataservices that need
to authorize access.

The authorization application will be a .Net Core ASP.NET MVC application that 
exposes functionality through REST-API

