---
title: Altinn Studio Designer - Back-end
linktitle: Back-end
description:  Application construction components used in Altinn Studio Designer backend.
toc: true
---

Altinn Studio Designer Back-end is a [ASP.Net Core](https://docs.microsoft.com/en-us/aspnet/core/) application
that exposes web-API's to be used by Altinn Studio Designer Frontend.

It is built and deployed as a Docker container running in Kubernetes.

## API Controllers
The API controllers exposes the web-APIs.

They are structured in different controllers that is grouped by functional areas.

The controllers we have now are:

- [ApplicationMetadata](https://github.com/Altinn/altinn-studio/blob/master/backend/src/Designer/Controllers/ApplicationMetadataController.cs) - responsible for functionality related to metadata
- [Config](https://github.com/Altinn/altinn-studio/blob/master/backend/src/Designer/Controllers/ConfigController.cs)
- [Deployment](https://github.com/Altinn/altinn-studio/blob/master/backend/src/Designer/Controllers/DeploymentsController.cs)
- [Pipelines](https://github.com/Altinn/altinn-studio/blob/master/backend/src/Designer/Controllers/PipelinesController.cs)
- [Releases](https://github.com/Altinn/altinn-studio/blob/master/backend/src/Designer/Controllers/ReleasesController.cs)
- [Repository](https://github.com/Altinn/altinn-studio/blob/master/backend/src/Designer/Controllers/RepositoryController.cs)
- [ServiceDevelopment](https://github.com/Altinn/altinn-studio/blob/master/backend/src/Designer/Controllers/ServiceDevelopmentController.cs)
- [UIEditor](https://github.com/Altinn/altinn-studio/blob/master/backend/src/Designer/Controllers/UIEditorController.cs)

## Services 
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

## Model View Controllers
The model view controllers are responsible for presenting razor views where we dont use React as frontend. 

We are in process with moving functionality to using only React and API Controllers. 


## Factories

### Model Factory
Model factory is the module that generates metadata and C# models based on uploaded XSD. 


## Libraries

Altinn Studio Designer backend uses some libraries for different functionality

### Logging

TODO

### Application Insight

TODO

### GIT Client

The details about all libraries used can be found in the project file. 

