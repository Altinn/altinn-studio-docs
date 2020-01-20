---
title: Application construction components App
linktitle: App (Asp.Net Web)
description: Description of the application construction components for the app developed in altinn studio. 
tags: [architecture]
weight: 100
---

The App developed in Altinn Studio is currently based on a [asp.net application template](/teknologi/altinnstudio/solutions/altinn-apps/app/apptemplates/asp.net/) that contains
backend and frontend components. The app developer modifies and enhances the app
with changing code and configuration in Altinn Studio or external devlopment tools like [Visual Studio Code](https://code.visualstudio.com/). 

The application is built and deployed as a Docker container in a Kubernetes Pod to a Kubernetes cluster.
See [deployment architecture](/teknologi/altinnstudio/architecture/infrastructure/deployement/altinn-apps) for deployment details. 

In the future Altinn Studio will support apps based on different templates. Currently we support the below template(s).

## App based on Asp.Net core backend and React frontend

### App Backend
App-Backend exposes api to frontend and contains functionality to handle the typical functional scenarious 
needed like process handling, data storage, business logic ++.

[Read more about the application architecture for App Backend](app-backend)

### App Frontend
Apps based on this template can be configured to have a frontend. Apps created for beeing only a backend for mobile apps other systems will not have a
App Frontend. 

[Read more about the application architecture for App Frontend](app-frontend)

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/components/application/construction/altinn-apps/app/app_application_architecture.svg" type="image/svg+xml" style="width: 100%; max-width: 1000px;"></object>
{{% /excerpt%}}