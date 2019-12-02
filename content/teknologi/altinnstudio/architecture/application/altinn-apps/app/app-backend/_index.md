---
title: App Backend Application Arcitecture
linktitle: App Backend
description: Description of the application architecture for App Backend 
tags: [architecture, app-backend]
weight: 100
---

In this app template the App Backend is based on [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/) and is 
a [Web Api application](https://docs.microsoft.com/en-us/aspnet/core/web-api/).

This App Backend exposes REST-Api's consumed by a optional App Frontend and/or external systems / mobile apps.
The structure of the API's is documented [here](/altinn-api/)

The diagram below show how the code is structured in different parts. 

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/application/altinn-apps/app/app-backend/app_backend_application_architecture.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px;"></object>
{{% /excerpt%}}

## Altinn.App.Api - Standard API's
The REST-APIS are implemented in different API-controllers and uses attribute based routing to identify the correct
operation. The API controllers are implemented in a library called [Altinn.App.Api](https://www.nuget.org/packages/Altinn.App.Api) and is published to Nuget. 

The app template is configured to use this. 

## Altinn.App.PlatformServices - Platform services 
Platform services are services that are configured in startup on the app and with help of dependendency injection is available to 
the API controllers and other code in the app. 

## Altinn.App.Common - Common functionality

## App logic
The app logic contains the custom application code that a app developer has generated/created in Altinn Studio or
in third party development tools like Visual Studio Code. 


#### Datamodel
The data model in an app is defined as an XSD. From the XSD it is generated
a C# representation of that model.

In runtime all data is deserialized/serialized from/to this model when communication
with frontend/external systems.

All logic in the app will typical be related to the datamodel.


