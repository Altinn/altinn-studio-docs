---
title: Business Process Processing Capabilities
linktitle: Process
description: Description of the business process processing capabiltiies
tags: [app-backend, BPMN]
weight: 100
---
A application deployed to Altinn Apps will typical have a business process that users and systems need to follow. 

Apps created in Altinn Studio uses [BPMN 2.0 standard](https://www.omg.org/spec/BPMN/2.0/) to describe the business process and the app will have functionality
to support different types of tasks in the process.

The process is defined by the application developer in Altinn Studio. When a new app is created it a [basic process]() is created. 

## Supported Tasks
Altinn Studio / Altinn Apps / Altinn Platform will support different processes with different types of task as part of the process

### Data
This is the task where the user or system create and updates data for one more datamodelles defined for the App.

### Confirmation (backlog)
This is a task where user can look at the data filled and then confirm it. Replaces send in it 

### ConfirmationAndSigning (backlog)
This is a task where user can look at the data filled and then confirm and sign data. Replaces send in it 

### Payment (backlog)
This is a task where user is redirected to a external payment provider to pay related to the process. The payment can be related to data
filled out in earliers task, or can be a fixed value connected to the app. 

[See Github issue for details](https://github.com/Altinn/altinn-studio/issues/1321)

### Signing (backlog)
Signing is a task where one or more users sign the data submitted. In most uses cases this is a strictly functional operation but depending
on the authentication level it can be a digital signature involved. The different types of signing relevant for this platform is.

[There is a epic for signing on GitHub](https://github.com/Altinn/altinn-studio/issues/1322)


#### Regular signing
Regular signing is when one user with a specific role is required to functional sign the data before submitting it. 


#### Paralell signing 
This is a task where serverel users need/can sign the data in paralell. The task is completed when the needed amount of signatures has been added

[See Github issue for details](https://github.com/Altinn/altinn-studio/issues/1325)

#### User controlled signing
User controlled signing is a task where the data inputed in earliers task in process defines which users that needs to sign.

[See GitHub issue for details](https://github.com/Altinn/altinn-studio/issues/1324)


### Lookup  (backlog)
This is a task in a process where user/system can lookup external data with help of inputs from UI or API.


## State change
The application is responsible to make sure that 


## Example process
There is some freedom of the order of task in the process, but not all combinations is functional valid.

Each type of task will have som requirement to be fullfilled to be allowed to be completed. 

The below diagram show some example processes that a App possible will support in the future. Even it is possible to technical order the different types of task 

### Process: Data

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/capabilities/runtime/processing/process/app-backend-process-example1.svg" type="image/svg+xml" style="width: 200%;  max-width: 700px;"></object>
{{% /excerpt%}}

This is the a common process. In this scenario a user will typical fill out formdata and when formfilling task is completed the data will be marked as locked and the final data can be read from
the org. The org will be able to read data before the formfilling task is completed, but then the end user can still update the data.


### Process: Data - Signing
{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/capabilities/runtime/processing/process/app-backend-process-example2.svg" type="image/svg+xml" style="width: 200%;  max-width: 700px;"></object>
{{% /excerpt%}}


This is the a common process. In this scenario a user will typical fill out formdata and when formfilling task is completed, the process is moved to a signing task where the user
can verify the data and then confirm it with a signing of data.  Depending on the required security level for the application the signing will use PKI systems to digital sign the data or just
be a more functional confirmation from the user.  The org will be able to read data before the formfilling task is completed, but then the end user can still update the data. 
The data will not be allowed to be changed while the instance is in signing task.

### Process: Data - Confirmation - Payment
{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/capabilities/runtime/processing/process/app-backend-process-example3.svg" type="image/svg+xml" style="width: 200%;  max-width: 700px;"></object>
{{% /excerpt%}}

In this scenario a user will typical fill out formdata and when formfilling task is completed, the process is moved to a confirm task where the user
can verify the data and then confirm, when the data is confirmed the process is moved to a payment task where the user needs to pay before the process is completed. 
The payment functionality will be handled by external payment providers. The app will integrate with API's for the payment provider. Altinn runtime will support different payment providers.

### Process: Data - Confirmation - External validation
{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/capabilities/runtime/processing/process/app-backend-process-example4.svg" type="image/svg+xml" style="width: 200%;  max-width: 700px;"></object>
{{% /excerpt%}}

In this scenario a user or system will typical fill out formdata and when formfilling task is completed, the process is moved to a confirm task where the user
can verify the data and then confirm it. The process is the moved to a external validation task where the org is doing validation. The
org can chose to complete the task or send the instance back to a earlier task for correction of the data.




