---
title: Application Architecture Kubernetes Wrapper
linktitle: Kubernetes Wrapper
description: Description of the application architecture for Kubernetes Wrapper
tags: ["tjenester 3.0"]
weight: 100
---

The App developed in Altinn Studio is deployed as a Docker container in a Kubernetes Pod. 
See [deployment architecture](/architecture/infrastructure/deployement/altinn-apps) for deployment details. 

The App itself consist of two applications with different Application Architecture

### App Frontend
Apps created in Altinn Studio can have a optional frontend. Apps created for beeing only a backend for mobile apps other systems will not have a
App Frontend. 

[Read more about the application architecture for App Frontend](app-frontend)

### App Backend
App-Backend exposes api to frontend and contains all needed functionality to handle 

[Read more about the application architecture for App Frontend](app-backend)
