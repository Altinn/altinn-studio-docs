---
title: App Process
linktitle: Process
description: Description of the process handling of App Backend 
tags: [app-backend]
weight: 100
---
A App deployed to Altinn Apps will typical have a process to follow. 

Altinn Apps uses [BPMN 2.0 standard](https://www.omg.org/spec/BPMN/2.0/) to describe the App Process and the App will have functionality
to support different types of tasks in the process.

## Supported Tasks
Altinn Studio / Altinn Apps / Altinn Platform will support different processes with different types of task as part of the process

### Formfilling 
This is the task where the user or system create and updates data for one more datamodelles defined for the App.

### Confirmation (POST MVP)
This is a task where user can look at the data filled and then confirm it. Replaces send in it 

### ConfirmationAndSigning  (POST MVP)
This is a task where user can look at the data filled and then confirm and sign data. Replaces send in it 

### Payment (POST MVP)
This is a task where user is redirected to a external payment provider to pay related to the process. The payment can be related to data
filled out in earliers task, or can be a fixed value connected to the app. 

### Paralell signing (POST MVP)
This is a task where serverel users need/can sign the data in paralell. The task is completed when the needed amount of signatures has been 

### Lookup  
This is a task in a process where user/system can lookup external data with help of inputs from UI or API.

## Example process
There is some freedom of the order of task in the process, but not all combinations is functional valid.

Each type of task will have som requirement to be fullfilled to be allowed to be completed. 

The below diagram show some example processes that a App possible will support in the future. Even it is possible to technical order the different types of task 

### Process: Formfilling

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/components/application/construction/altinn-apps/app/app-backend/process/app-backend-process-example1.svg" type="image/svg+xml" style="width: 200%;  max-width: 800px;"></object>
{{% /excerpt%}}

This is the a common process. In this scenario a user will typical fill out formdata and when formfilling task is completed the data will be marked as locked and the final data can be read from
the org. The org will be able to read data before the formfilling task is completed, but then the end user can still update the data.


### Process: Formfilling - Signing
{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/components/application/construction/altinn-apps/app/app-backend/process/app-backend-process-example2.svg" type="image/svg+xml" style="width: 200%;  max-width: 800px;"></object>
{{% /excerpt%}}


This is the a common process. In this scenario a user will typical fill out formdata and when formfilling task is completed, the process is moved to a signing task where the user
can verify the data and then confirm it with a signing of data.  Depending on the required security level for the application the signing will use PKI systems to digital sign the data or just
be a more functional confirmation from the user.  The org will be able to read data before the formfilling task is completed, but then the end user can still update the data. 
The data will not be allowed to be changed while the instance is in signing task.

### Process: Formfilling - Confirmation - Payment
{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/components/application/construction/altinn-apps/app/app-backend/process/app-backend-process-example3.svg" type="image/svg+xml" style="width: 200%;  max-width: 800px;"></object>
{{% /excerpt%}}

In this scenario a user will typical fill out formdata and when formfilling task is completed, the process is moved to a confirm task where the user
can verify the data and then confirm, when the data is confirmed the process is moved to a payment task where the user needs to pay before the process is completed. 
The payment functionality will be handled by external payment providers. The app will integrate with API's for the payment provider. Altinn runtime will support different payment providers.

### Process: Formfilling - Confirmation - External validation
{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/components/application/construction/altinn-apps/app/app-backend/process/app-backend-process-example4.svg" type="image/svg+xml" style="width: 200%;  max-width: 800px;"></object>
{{% /excerpt%}}

In this scenario a user or system will typical fill out formdata and when formfilling task is completed, the process is moved to a confirm task where the user
can verify the data and then confirm it. The process is the moved to a external validation task where the org is doing validation. The
org can chose to complete the task or send the instance back to a earlier task for correction of the data.


## Process definition
The process defintion is defined in a BPMN 2.0 file located in the app repository 

To change the process the app developer need to modify the BPNM file manually.

Later Altinn Studio will support creating and updating process through GUI.

Later we


