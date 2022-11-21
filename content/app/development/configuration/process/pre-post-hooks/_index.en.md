---
title: Define custom process hooks
description: Define custom logic to be executed berfor or after a task is started/ended
toc: true
---

{{%notice info%}}
The functionallity described on this page requires version v7 or newer of altinn nugets.
{{%/notice%}}

It's possible to execute custom code when tasks in the process is started, ended or abandoned.
All registeret classes will be executed for each task so if you want your code to only be executed when one specific task starts/ends you need to take this into account when writing your code.

## Execute custom code when tasks is started

To execute custom code when a tasks starts, before Altinns standard logic you need to write a class implementing `Altinn.App.Core.Feature.IProcessTaskStart` and register it as a transient.

It is possible to add multiple classes implementing the interface, all of them will be executed each time a task in the process starts.

[View the interface here](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Features/IProcessTaskStart.cs)

## Execute custom code when tasks is ended

To execute custom code when a tasks is ended, before Altinns standard logic you need to write a class implementing `Altinn.App.Core.Feature.IProcessTaskEnd` and register it as a transient.

It is possible to add multiple classes implementing the interface, all of them will be executed each time a task in the process ends.

[View the interface here](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Features/IProcessTaskEnd.cs)

## Execute custom code when tasks are abandoned

To execute custom code when a tasks is abandoned, before Altinns standard logic you need to write a class implementing `Altinn.App.Core.Feature.IProcessTaskAbandon` and register it as a transient.

It is possible to add multiple classes implementing the interface, all of them will be executed each time a task in the process is abanoned.

[View the interface here](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Features/IProcessTaskAbandon.cs)
