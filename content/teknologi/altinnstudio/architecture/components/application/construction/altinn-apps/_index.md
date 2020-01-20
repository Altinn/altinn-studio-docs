---
title: Application construction components for Altinn Apps
linktitle: Altinn Apps
description: Application created in Altinn Studio is deployed to Altinn Apps. This documentation covers application construction components for the applications and for monitoring applications for Altinn Apps.  
toc: true
weight: 100
---
The diagram below shows the different components in Altinn Apps and below you find links to the description of the Application Architecture for the different
components/parts of Altinn Apps.

{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/components/application/construction/altinn-apps/altinnapps_application_architecture.svg" type="image/svg+xml" style="width: 100%;";></object>
{{% /excerpt%}}

[See fullscreen](/teknologi/altinnstudio/architecture/components/application/construction/altinn-apps/altinnapps_application_architecture.svg) or [download as visio](/teknologi/altinnstudio/architecture/application/altinn-apps/altinnapps_application_architecture.vsdx).

## App routing
In Altinn Apps each app is hosted inn different containers/Kubernetes Pods. We use Traefik to route traffic to the correct app/container/Pod

## Application (App)
The App developed in Altinn Studio is deployed as a Docker container in a Kubernetes Pod. 
See [deployment architecture](/teknologi/altinnstudio/architecture/components/infrastructure/deployement/altinn-apps) for deployment details. 

The App itself consist of two applications with different Application Architecture

[Read more about the application architecture for App Frontend](app)

## Kubernetes Proxy
This is the application that gives Altinn Studio information about a Apps cluster

