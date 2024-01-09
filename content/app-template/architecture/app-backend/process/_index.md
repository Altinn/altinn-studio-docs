---
title: App Process
linktitle: Process
description: Description of the process handling of App Backend 
tags: [process, BMPN]
toc: true
---

## Process API
Apps created in Altinn Studio have a seperate Process API that exposes functionality to clients to controll the process.

[See github for source code](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/Altinn.App.Api/Controllers/ProcessController.cs).

## Instance API


## Process Service
The process service is where the business logic for BPMN processing is located. It is responsible for verifying state, and changes of state

[See github for source code](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/Altinn.App.PlatformServices/Implementation/ProcessAppSI.cs).

## BPMN Reader
BPMN reader is the component that parses BPMN process in apps.

[See github for source code](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/Altinn.App.Common/Process/BpmnReader.cs).

## App Logic
When app process changes state app logic is run making it possible for app developers to implements specific app logic.

See [AppBase.cs](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/Altinn.App.PlatformServices/Implementation/AppBase.cs) 
and [IAltinnApp](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/Altinn.App.PlatformServices/Interface/IAltinnApp.cs).