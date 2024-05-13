---
title: v8
description: Overview of changes introduced in v8 of the Altinn.App.* packages
weight: 94
---

## Why version 8?
V8 is a rewrite of the process engine in apps to support more advanced process flows and signing.
For most existing apps the changes to the process engine are only visible in the `App/config/process/process.bpmn` file.

We also took the opportunity to move all interfaces from `Altinn.App.Core.Interfaces`  to more descriptive namespaces under `Altinn.App.Core.Internal`. 
Some of these interfaces have been renamed. For example, the `Altinn.App.Core.Interfaces.IData` has been moved and renamed to `Altinn.App.Core.Internal.Data.IDataClient`.

## Breaking changes

### Changes in process.bpmn

#### Altinn namespace changed
Previously the name space for Altinn was `http://altinn.no`. This has now been changed to `http://altinn.no/process`.

This is located at the top of the process.bpmn file.

Old `process.bpmn`:
```xml {hl_lines=[4]}
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions id="Altinn_SingleDataTask_Process_Definition"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:altinn="http://altinn.no"
xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
targetNamespace="http://bpmn.io/schema/bpmn" >
....
</bpmn:definitions>
```

New `process.bpmn`:
```xml {hl_lines=[4]}
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions id="Altinn_SingleDataTask_Process_Definition"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:altinn="http://altinn.no/process"
xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
targetNamespace="http://bpmn.io/schema/bpmn" >
....
</bpmn:definitions>
```

#### TaskType definition moved to bpmn:extensionElements
Up until v8 of the NuGet package, taskType was defined directly on the `<bpmn:task>` element.
To adhere closer to the BPMN specification, this has been moved to `<bpmn:extensionElements>` element.

```xml {hl_lines=[1]}
<bpmn:task id="Task_1" name="Utfylling" altinn:tasktype="data">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
</bpmn:task>
```

```xml {hl_lines=["4-8"]}
<bpmn:task id="Task1" name="Utfylling">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>data</altinn:taskType>
        </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```

This appears more verbose, but since we need to specify more options for signing, we opted to move all our custom configuration into the same section.


#### Confirmation tasks needs to define the confirm action
Previously, confirmation tasks implicitly added a confirm action for the user (enabling the Confirm button in the UI).
With the introduction of actions on process tasks, the developer needs to define the `confirm` action on confirmation tasks.

Old confirmation task:
```xml
<bpmn:task id="Task_1" name="Utfylling" altinn:tasktype="confirmation">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
</bpmn:task>
```

New confirmation task:
```xml
<bpmn:task id="Task1" name="Utfylling">
    <bpmn:incoming>Flow1</bpmn:incoming>
    <bpmn:outgoing>Flow2</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>confirmation</altinn:taskType>
            <altinn:actions>
                <altinn:action>confirm</altinn:action>
            </altinn:actions>
        </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```

### New .NET version
The solution has been updated to use the newest LTS version of .NET, 8.0.
This needs to be updated in the project file and in the `Dockerfile`.

Old `Dockerfile`:
```Dockerfile {hl_lines=[1,11]}
FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
WORKDIR /App

COPY /App/App.csproj .
RUN dotnet restore App.csproj

COPY /App .

RUN dotnet publish App.csproj --configuration Release --output /app_output

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine AS final
EXPOSE 5005
WORKDIR /App
```

New `Dockerfile`:
```Dockerfile {hl_lines=[1,11]}
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /App

COPY /App/App.csproj .
RUN dotnet restore App.csproj

COPY /App .

RUN dotnet publish App.csproj --configuration Release --output /app_output

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS final
EXPOSE 5005
WORKDIR /App
```

For a complete overview of the changes in the `Dockerfile`, see [the
diff on github](https://github.com/Altinn/app-template-dotnet/commit/d13946262286542564445779e87b75c4bbb2cdaf#diff-51767e9b1bad3f38294e90b0aaadd99ee89bb126f426b22bb8f5e199c6c69bc6).

### Changes to interfaces for clients and services
Clients and services we provide that communicate with our core services, like storage and secrets, have been moved and renamed to make it more clear what they interact with.

#### Moved/renamed interfaces and their new location

| Old namespace             | Old name           | New namespace                 | New name   | Notes |
| ------------------------- | ------------------ | ---------------------------------- | --------------------- | ----- |
| Altinn.App.Core.Interface | IAppEvents         | Altinn.App.Core.Internal.App       | IAppEvents            | |
| Altinn.App.Core.Interface | IApplicationClient | Altinn.App.Core.Internal.App       | IApplicationClient    | |
| Altinn.App.Core.Interface | IAppResources      | Altinn.App.Core.Internal.App       | IAppResources         | |
| Altinn.App.Core.Interface | IAuthentication    | Altinn.App.Core.Internal.Auth      | IAuthenticationClient | |
| Altinn.App.Core.Interface | IAuthorization     | Altinn.App.Core.Internal.Auth      | IAuthorizationClient  | |
| Altinn.App.Core.Interface | IData              | Altinn.App.Core.Internal.Data      | IDataClient           | |
| Altinn.App.Core.Interface | IDSF               | Altinn.App.Core.Internal.Registers | IPersonClient         | This interface is different as the upstream API has changed and require more parameters |
| Altinn.App.Core.Interface | IER                | Altinn.App.Core.Internal.Registers | IOrganizationClient   | |
| Altinn.App.Core.Interface | IEvents            | Altinn.App.Core.Internal.Events    | IEventsClient         | |
| Altinn.App.Core.Interface | IInstance          | Altinn.App.Core.Internal.Instances | IInstanceClient       | |
| Altinn.App.Core.Interface | IInstanceEvent     | Altinn.App.Core.Internal.Instances | IInstanceEventClient  | |
| Altinn.App.Core.Interface | IPersonLookup      | Altinn.App.Core.Internal.Registers | IPersonClient         | |
| Altinn.App.Core.Interface | IPersonRetriever   | Altinn.App.Core.Internal.Registers | IPersonClient         | |
| Altinn.App.Core.Interface | IPrefill           | Altinn.App.Core.Internal.Prefill   | IPrefill              | |
| Altinn.App.Core.Interface | IProcess           | Altinn.App.Core.Internal.Process   | IProcessClient        | |
| Altinn.App.Core.Interface | IProfile           | Altinn.App.Core.Internal.Profile   | IProfileClient        | |
| Altinn.App.Core.Interface | IRegister          | Altinn.App.Core.Internal.Registers | IAltinnPartyClient    | If you previously used IRegister.ER to perform lookup of orgs you should inject IOrganizationClient direcly for those usecases |
| Altinn.App.Core.Interface | ISecrets           | Altinn.App.Core.Internal.Secrets   | ISecretsClient        | |
| Altinn.App.Core.Interface | ITaskEvents        | Altinn.App.Core.Internal.Process   | ITaskEvents           | |
| Altinn.App.Core.Interface | IUserTokenProvider | Altinn.App.Core.Internal.Auth      | IUserTokenProvider    | |

All the old interfaces are marked as Obsolete and will generate compile time errors with reference to what interface you should use in its place.

## What's new?

### Support for signing tasks
V8 supports defining signing tasks in the process definition.
v8.0.0 supports sequential signing steps with the possibility to define that signing tasks needs to be completed by unique users.
To see how signing tasks are define please see the [signing documentation under process]().

### Support for expressions in the process definition
It is now possible to make process flow decisions using expressions in the process definition.
To see how you can leverage expressions to dictate process flow, see [using expressions to dictate process flow]().

### Custom process actions
Custom actions make it possible to create custom actions for moving the process along. These actions can be authorized separately, used in expressions inside the process definition to change how the process flows and execute custom code before the process is moved to the next task.
To see how you can use custom process actions, see [defining custom actions in process tasks](../../../../altinn-studio/reference/process/actions/process-actions).

### Custom server actions
Custom server actions make it possible to create custom actions that can be executed from the UI without moving the process. These actions can be authorized separately and execute custom code.
To see how you can use custom server actions, see [defining custom actions in process tasks](../../../../altinn-studio/reference/process/actions/serveraction/).