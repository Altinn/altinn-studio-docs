---
title: App Frontend Application Architecture
linktitle: App Frontend
description: Description of the Application architecture for App-Frontend
tags: [architecture]
---

App Frontend is a [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application) built using React + Redux.

This application is responsible for presenting a UI to the end user. The application consists of several different features
that are responsible for handling the UI for different steps in the workflow.

The app frontend is automatically built and deployed to a CDN, and is versioned using [semantic versioning](https://semver.org/). 
Each App developed in Altinn Studio will reference the app frontend, which will be served by the CDN. By default,
an app will reference the latest _major_ version that was available when the app was created. Each app may reference a specific
version, so that there can be different versions of the app frontend for two different deployed apps.

{{<children>}}