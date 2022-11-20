---
title: Define app process
linktitle: Process
description: As part of the development one must define a process for the app that end user needs to follow.
tags: [process]
---

A app will typical have a process that a end user / or system needs to follow. It could be anything from a single task process where the app is used
to retrieve data from some external api, to long living processes with many tasks involving. 

In Altinn Studio the developer will need to define the process for the app.

In current version of Altinn Studio the only support for process definition is to upload a BPMN process file and the only task type we support are FormFilling

[See Process Architecture for more details how process is defined](/technology/architecture/capabilities/runtime/processing/process/)

See all issues related to Altinn Studio and workflow on [Github](https://github.com/Altinn/altinn-studio/labels/area%2Fprocess).

## Instansiations hooks
Instansiation is the event that triggers a new instance of a App and starts the process for that instance.

Related to this event a developer can set instansiations hooks that are triggered when a new process is started.

[See Github for issues related to instansiation](https://github.com/Altinn/altinn-studio/labels/area%2Finstantiation).
