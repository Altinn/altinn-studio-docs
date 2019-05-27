---
title: Application events
linktitle: Application Events
description: Description of application events
tags: ["tjenester 3.0"]
weight: 100
---
{{% notice warning %}}
NOTE: Work in progress. Stuff will change
{{% /notice %}}

#### Application Events
The runtime has a defined event model that can be used by the service developer
to controll when logic in the service implementation will run.

These events are mapped to functional events triggered by end users or systems.

##### Instansiation
Instansiation is when the end user or system instansiates a new service instance.
Events connected to instansiation can contain logic that can prefill the datamodell
or validate if the user or system is allowed to instansiate that service.

{{%excerpt%}}
<object data="/architecture/application/altinn-apps/Events_Instansiation.svg" type="image/svg+xml" style="width: 100%;  max-width: 300px;"></object>
{{% /excerpt%}}


The below sequence diagram shows how the app events are combined with other logic


{{%excerpt%}}
<object data="/architecture/application/altinn-apps/instansiation_sequence.svg" type="image/svg+xml" style="width: 100%;  max-width: 300px;"></object>
{{% /excerpt%}}



##### Load form data (GET)
Loading of form data can be performed by the frontend (REACT) or an end user system that needs to get
the latest updated form data. 

The following events will be performed

{{%excerpt%}}
<object data="/architecture/application/altinn-apps/Events_Get.svg" type="image/svg+xml" style="width: 100%;  max-width: 300px;"></object>
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
<object data="/architecture/application/altinn-apps/Events_Post.svg" type="image/svg+xml" style="width: 100%;  max-width: 300px;"></object>
{{% /excerpt%}}

#### Update form data (PUT)
Update of form data happens when the frontend or external end user systems/applications 
want to update a existing form connected to a service instance

The following events happens:

{{%excerpt%}}
<object data="/architecture/application/altinn-apps/Event_PUT.svg" type="image/svg+xml" style="width: 100%; max-width: 300px;"></object>
{{% /excerpt%}}

