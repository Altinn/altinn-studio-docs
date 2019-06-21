---
title: App Process
linktitle: Process
description: Description of the process handling of App Backend 
tags: ["tjenester 3.0", "app-backend", "application architecture"]
weight: 100
---

A App will typical have a process to follow. 

Altinn Apps uses BPMN 2.0 standard to describe the App Process and the App will have functionality
to support different types of Tasks in the process. 

The below diagram show some example processes that a App possible will support in the future.

{{%excerpt%}}
<object data="/architecture/application/altinn-apps/app/app-backend/process/app-backend-process.svg" type="image/svg+xml" style="width: 200%;  max-width: 800px;"></object>
{{% /excerpt%}}


- Example process 1 shows a process where the only step is formfilling. Data is locked for editing when the formfilling step is completed.
- Example process 2 shows a process where the user formfilling and then sign data. 
- Example process 3 shows a process where user do formfilling, then confirm the data and then are sent to perform payment befor the process is completed
- Example process 4 shows a process where user do formfilling, then confirms the data, and then the process waits on a external validation befor the process is complete.
