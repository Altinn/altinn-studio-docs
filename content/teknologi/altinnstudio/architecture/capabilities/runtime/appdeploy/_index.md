---
title: Application build & deploy capabilties
linktitle: App Build & Deploy
description: Application developers using Altinn Studio to create Applications have access to build & deploy capabilties
tags: [architecture]
toc: true
---


Altinn Apps is the solution where all the apps developed in Altinn Studio is deployed.
The following diagram shows the deployment architecture for Altinn Studio together & Altinn Apps.

![Deployment architecture diagram](altinnapps_deploymentarchitecture.svg "Deployment architecture")

[Download as Visio](altinnapps_deploymentarchitecture.vsdx).

## Container Orchestration by Kubernetes

Each [app](/teknologi/altinnstudio/terms#app) created in Altinn Studio is deployed
to Altinn Apps as separate applications running in Docker Containers.
The containers will be orchestrated by Kubernetes.

The Altinn App is deployed as sets of Docker Containers defined as Kubernetes Deployment.
The deployment will be in the organisation's own Kubernetes Cluster.

> All organisations will have their own Kubernetes Cluster.

Each set of Kubernetes Deployment will be scaled based on the usage of the app.
Scaling of the Deployment will be configurable in the Kubernetes Deployment and automatically scaled using
[Kubernetes Replicaset](https://kubernetes.io/docs/reference/glossary/?all=true#term-replica-set).

> Kubernetes Clusters and Altinn Apps can do horizontal autoscaling.
> It is currently not decided if and how autoscaling will be used.

The Altinn App in Kubernetes will be configured as a Kubernetes Service which consist of the latest runtime application
available when building the Altinn App and the Altinn App with related code and configuration.

## Kubernetes Clusters per Organisation

In Altinn Apps, every organisation will have their separate Kubernetes Cluster in each environment.
The Kubernetes Cluster architecture will be the same in test and production environment
This will support scaling tailored each organisations needs and separation of each organisation's app.

### Secrets

Pods, where the Altinn App are delpoyed, gets access to secrets during deployment via HELM charts.

### Kubernetes Namespace

It's not planned to use namespaces.

### Kubernetes Service

Each Altinn App will be a Kubernetes Service.

### Networking

#### Sub domains

Each organisation will have their own sub domain `<org>.apps.altinn.no`.

#### Path for the Altinn App

`<org>.apps.altinn.no/<app>`

#### Encrypted traffic and network policy

There is ongoing analysis related to this topic. [Click here to find more information on Github](https://github.com/Altinn/altinn-studio/issues/1000).

#### Routing / Ingress-Controller

Routing in Kubernetes is handled by an Ingress-Controller called Traefik.

To be able to route traffic to the correct Kubernetes Service (Altinn App), each container is tagged to a specific
Altinn App. The routing mecahnism routes to the correct Kubernetes Service based on the url
containing the Altinn App parameter.

#### API Proxy

API Proxy is needed for controlling credentials and outbound firewall rules from the platform. 
This might be handled by the API Managment software. Needs Analyzis

#### API Management

The platform requires API management software to handle SLA ++. Needs Analyzis

### App build and deploy process

![Docker image build process diagram](ServiceRuntime.svg?width=1000 "Docker image build process")

Building the Altinn App with "app specific" files from Gitea, creating a "App Image", deploying to Azure Container Registry and telling Kubernetes to deploy app.

#### Build process (Pipeline)

* Downloading files from app repository in Gitea
* Building Docker base image with Dockerfile. This includes "Dotnet build" for C# files from Gitea. "Dotnet build" is executed on the Runtime Base Image reusing previous.
  * Docker Pull: Altinn/Runtime Base Image with SDK from ACR. This makes the AltinnApp build faster.
  * Clone and build code from Gitea inside Altinn-Runtime Base Image.
  * Docker Pull: Microsoft/DotNet AspNetCore.
  * Copy Altinn Runtime, AltinnApp Build files and App Metadata/Resources from Gitea.
* Publish to ACR.

The build and deploy app pipeline is controlled by different flags :

* APP_COMMIT_ID - used as id for the app image and should be used to reference the repository at that commit state
* APP_DEPLOY_TOKEN - used to identify user when cloning repository (is only really necessary for private repositorys but is mandetory)
* APP_ENVIRONMENT - represent which environment to deploy to (not yet used)
* APP_OWNER - the owner of the repository
* APP_REPO - the name of the repository to clone and use to create the app
* GITEA_ENVIRONMENT - the gitea environment to clone the repository from
* should_build - flag that can be used if one only wishes to deploy a app and not build it (default set to true)
* should_deploy - flag that can be used if one wishes to deploy an app (default set to false)

Triggered by:

* "Deploy"-button in Altinn Studio.

#### Manual deployment of Altinn App

A manual deployment of the Altinn App requires access to you Kubernetes Cluster and knowledge about Helm.

If you want to configure the Helm chart and do a manual deployment you can find the Helm chart in your repo in the "deployment" folder.

## Platform Cluster

The platform cluster in Altinn Studio Apps will host common application like DataServices.

### Platform integration

The platform integration is a new application hosted in the existing infrastructure.
It exposes REST-APIs for Profile, Register, Authorization, Intermediary and Authentication.
These are services not part of the Altinn Platform (yet) and
everyone planning to run the Altinn Platform would need to implement their own components that support. (?)

### Data services

The data services application is the application responsible exposing data related functionality
to the Altinn App. This container will be scaled based on need.

[Kubernetes Cluster]: https://kubernetes.io/docs/concepts/
[Kubernetes Pod]: https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/
[Kubernetes ReplicaSet]: https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/