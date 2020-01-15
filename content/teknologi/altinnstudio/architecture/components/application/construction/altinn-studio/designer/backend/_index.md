---
title: Altinn Studio Designer - Back-end
linktitle: Back-end
description:  Application construction components used in Altinn Studio Designer backend
weight: 100
---

Altinn Studio Designer Back-end is a [ASP.Net Core](https://docs.microsoft.com/en-us/aspnet/core/) application that exposes web-API's to be used by Altinn Studio Designer Frontend.
It is built and deployed as a Docker container running in Kubernetes

### API Controllers
The API controllers exposes the web-APIs.

They are structured in different controllers that is grouped by functional areas.

The controllers we have now is

- ApplicationMetadata controllers - responsible for functionality related to metadata
- Config
- Deployment
- Pipelines
- Releases
- Repository
- ServiceDevelopment
- UIEditor

### Services 
Services in a asp.Net application is configured services that controllers and other components used.
They are defined with a interface and a implementation and configured in startup. 

This makes them easy to mock out when doing integration testing of the Altinn Studio Designer backend.

The services we have now is

- ApplicationInformation
- ApplicationMetaata
- AuthorizationPolicy
- Deployment
- Pipeline
- Release
- GiteaAPIWrapper
- Repository
- SourceControl

### Model View Controllers
The model view controllers are responsible for presenting razor views where we dont use React as frontend. 

We are in process with moving functionality to react and api controllers. 

The following MVC controllers

### Factories

#### Model Factory
Model factory is the module that generates metadata and C# models based on uploaded XSD. 

### Libraries

Altinn Studio Designer backend uses some libraries for different functionality

#### Logging

#### Application Insight

#### GIT Client

The details about all libraries used can be found in the project file. 



