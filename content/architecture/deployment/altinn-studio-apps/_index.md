---
title: Altinn Studio Apps - Deployment Architecture
linktitle: Altinn Studio Apps
description: Description of the deployment architecture for Altinn Studio Apps
tags: ["tjenester 3.0"]
weight: 100
---
{{% notice warning %}}
NOTE: Work in progress. Stuff will change
{{% /notice %}}

Altinn Studio Apps is the solution where all the service apps developed in Altinn Studio is deployed.
The following diagram shows the deployment architecture for Altinn Studio together & Altinn Studio Apps

{{%excerpt%}}
<object data="/architecture/deployment/altinn-studio-apps/AltinnStudioApps_deployment_Architecture.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}

[See fullscreen] or [download as visio]

### Service Owner Clusters
In Altinn Studio Apps every service owner will have their seperate Kubernetes Cluster. 
This is to ensure seperation of services.

### Platform Cluster
The platform cluster in Altinn Studio Apps will host common application like DataServices. 

### Kubernetes Deployment
In Altinn Studio apps the Service Apps are deployed as sets of Docker Containers defined as Kubernetes Deployment
in the Kubernetes Cluster for the service owner. 
Each set of service containers will be scaled based on the usage of the service. This will be configured
with help of the Kubernetes ReplicaSet. It is currently not decided if and how autoscaling will be used.

The service container will consist of the runtime application and service specific code and configuration.

### Routing
To be able to route traffic to the correct container, each container is tagged to a specific 
end user service. The routing mecahnism routes to the correct container based on the url 
containing the service parameter.

### Data services
The data services application is the application responsible exposing data related functionality 
to the service containers. This container will be scaled based on need.

### Platform integration
The platform integration is a new application hosted in the existing infrastructure. 
It exposes REST-APIs for Profile, Register, Authorization, Intermediary and Authentication. 
These are services not part of the Altinn Studio Platform (yet) and
everyone planning to run the Altinn Studio platform would need to implement their own components that support. 

### API Proxy
API Proxy is needed for controlling credentials and outbound firewall rules from the platform. 
This might be handled by the API Managment software. Needs Analyzis

### API Management
The platform requires API management software to handle SLA ++. Needs Analyzis



[download as visio]: /architecture/deployment/altinn-studio-apps/AltinnStudioApps_DeploymentArchitecture.vsdx
[See fullscreen]: /architecture/deployment/altinn-studio-apps/AltinnStudioApps_deployment_Architecture.svg
[Kubernetes Cluster]: https://kubernetes.io/docs/concepts/
[Kubernetes Pod]: https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/
[Kubernetes ReplicaSet]: https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/