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

#### Events
The runtime has a defined event model that can be used by the service developer
to controll when logic in the service implementation will run.

These events are mapped to functional events triggered by end users or systems.

##### Instansiation
Instansiation is when the end user or system instansiates a new service instance.
Events connected to instansiation can contain logic that can prefill the datamodell
or validate if the user or system is allowed to instansiate that service.

{{%excerpt%}}
<object data="/architecture/application/runtime/Events_Instansiation.svg" type="image/svg+xml" style="width: 100%;  max-width: 300px;"></object>
{{% /excerpt%}}

##### Load form data (GET)
Loading of form data can be performed by the frontend (REACT) or an end user system that needs to get
the latest updated form data. 

The following events will be performed

{{%excerpt%}}
<object data="/architecture/application/runtime/Events_Get.svg" type="image/svg+xml" style="width: 100%;  max-width: 300px;"></object>
{{% /excerpt%}}

#### Storing of form data (POST)
Update of form data can happen when frontend (REACT app) sends data to backend
or a end user system does the same. When an update happend there is defined serveral
events that is performed in a given ordern. The service developer can implement
logic related to this event that could perform calculation, validation, API calls and much more.

The API for updating form data support different modes

* Create - Data should be stored as a new form instance
* Complete - Data is complete and the service should move ahead in the workflow
* Calculate - Logic in the calculation event should be performed and the updated form data should be returned
* Validate - Calculation will be performend and then validation logic is runned and any validation errors is returned.
* Update - Calculation is runned before data is stored in to the database.

The order of events are

{{%excerpt%}}
<object data="/architecture/application/runtime/Events_Post.svg" type="image/svg+xml" style="width: 100%;  max-width: 300px;"></object>
{{% /excerpt%}}

#### Update form data (PUT)
Update of form data happens when the frontend or external end user systems/applications 
want to update a existing form connected to a service instance

The following events happens:

{{%excerpt%}}
<object data="/architecture/application/runtime/Event_PUT.svg" type="image/svg+xml" style="width: 100%; max-width: 300px;"></object>
{{% /excerpt%}}

### Datamodel
The data model in a service is defined as an XSD. From the XSD it is generated
a C# representation of that model. 

In runtime all data is deserialized/serialized from/to this model when communication
with frontend/external systems.

All logic in the service will typical be related to the datamodel.


[download as visio]: /architecture/application/altinn-studio-apps/AltinnStudioApps_ApplicationArchitecture.vsdx
[See fullscreen]: /architecture/application/altinn-studio-apps/AltinnStudioApps_ApplicationArchitecture.svg