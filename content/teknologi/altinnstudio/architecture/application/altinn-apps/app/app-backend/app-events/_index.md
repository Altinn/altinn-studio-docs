---
title: Application events
linktitle: Application Events
description: Description of application events
weight: 100
---

The application backend has a defined event model that can be used by the app developer
to controll when logic in the app will run.

These events are mapped to functional events triggered by end users or systems. This functional events are typical trigged by a API-call 
from App Frontend or other systems/applications using the API's in App Backend. 

Some Application Events happens in more than one functional event. 

## Functional event and their Application Events
Below different functional events are listed. For each functional event there is described which Application Events that is triggered.

### Instansiation
Instansiation is when the end user, end user system or organisation instansiates a new app instance.
Events connected to instansiation can contain logic that can prefill the datamodell
or validate if the user or system is allowed to instansiate that app.

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/application/altinn-apps/app/app-backend/app-events/swimlane_instansiation.svg" type="image/svg+xml" style="width: 100%;  max-width: 1300px;"></object>
{{% /excerpt%}}

The below sequence diagram shows how the app events are combined with other logic for a requesting to start an app in the app catalogue.

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/application/altinn-apps/app/app-backend/app-events/instansiation_sequence.svg" type="image/svg+xml" style="width: 100%;  max-width: 1300px;"></object>
{{% /excerpt%}}


### Load form data (GET)
Loading of form data can be performed by the App Frontend or an end user system that needs to get
the latest updated form data. 

The following events will be performed

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/application/altinn-apps/app/app-backend/app-events/swimlane_getformdata.svg" type="image/svg+xml" style="width: 100%;  max-width: 1300px;"></object>
{{% /excerpt%}}

### Storing of form data (POST)
Update of form data can happen when frontend (REACT app) sends data to backend
or a end user system does the same. When an update happend there is defined serveral
events that is performed in a given order. The app developer can implement
logic related to this event that could perform calculation, validation, API calls and much more.

The API for updating form data support different modes

* Create - Data should be stored as a new form instance
* Complete - Data is complete and the app should move ahead in the workflow
* Calculate - Logic in the calculation event should be performed and the updated form data should be returned
* Validate - Calculation will be performend and then validation logic is runned and any validation errors is returned.
* Update - Calculation is runned before data is stored in to the database.

The order of events are

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/application/altinn-apps/app/app-backend/app-events/events_post.svg" type="image/svg+xml" style="width: 100%;  max-width: 300px;"></object>
{{% /excerpt%}}

### Update form data (PUT)
Update of form data happens when the frontend or external end user systems/applications 
want to update a existing form connected to an app instance

The following events happens:

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/application/altinn-apps/app/app-backend/app-events/swimlane_updateformdata.svg" type="image/svg+xml" style="width: 100%;  max-width: 1300px;"></object>
{{% /excerpt%}}

### Validation
Validation is triggered from App Frontend or from end user system. 

The below sequence diagram shows the application events 

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/application/altinn-apps/app/app-backend/app-events/validation_sequence.svg" type="image/svg+xml" style="width: 100%;  max-width: 1300px;"></object>
{{% /excerpt%}}

## Process: Next
