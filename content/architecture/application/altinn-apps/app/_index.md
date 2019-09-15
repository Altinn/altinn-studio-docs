---
title: Application Architecture App
linktitle: App
description: Description of the application architecture for App
tags: [architecture]
weight: 100
---

The App developed in Altinn Studio is based on a application template that contains
backend and frontend components. The app developer modifies and enhances the template
with changing code and configuration in Altinn Studio or external devlopment tools.

The application is built and deployed as a Docker container in a Kubernetes Pod. 
See [deployment architecture](/architecture/infrastructure/deployement/altinn-apps) for deployment details. 

In the future Altinn Studio will support apps based on different templates. Currently we support the below template(s).

## App based on Asp.Net core backend and React frontend

### App Backend
App-Backend exposes api to frontend and contains functionality to handle the typical functional scenarious 
needed like process handling, data storage, business logic ++.

[Read more about the application architecture for App Frontend](app-backend)

### App Frontend
Apps based on this template can be configured to have a frontend. Apps created for beeing only a backend for mobile apps other systems will not have a
App Frontend. 

[Read more about the application architecture for App Frontend](app-frontend)

