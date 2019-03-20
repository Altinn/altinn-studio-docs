---
title: Altinn Apps - Deployment Architecture
linktitle: Altinn Apps
description: Description of the deployment architecture for Altinn Apps
tags: ["tjenester 3.0"]
weight: 100
---
{{% notice warning %}}
NOTE: Work in progress. Stuff will change
{{% /notice %}}

Altinn Studio Apps is the solution where all the service apps developed in Altinn Studio is deployed.
The following diagram shows the deployment architecture for Altinn Studio together & Altinn Apps

{{%excerpt%}}
<object data="/architecture/deployment/altinn-apps/AltinnApps_DeploymentArchitecture.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}

[See fullscreen] or [download as visio]

### Kubernetes
Each ["ServiceApp"]({{< ref "/about/wordlist" >}}) created in Altinn Studio is deployed
to Altinn Studio Apps as separate applications running in Docker Containers.
The containers will be orchestrated by Kubernetes.

#### Deployment
The Altinn Studio Service Apps are deployed as sets of Docker Containers defined as Kubernetes Deployment.
The deployment will be in the service owners own Kubernetes Cluster.

> All service owners will have their own Kubernetes Cluster.

Each set of Kubernetes Deployment will be scaled based on the usage of the service.
Scaling of the Deployment will be configurable in the Kubernetes Deployment and automatically scaled using
[Kubernetes Replicaset](https://kubernetes.io/docs/reference/glossary/?all=true#term-replica-set).

> Kubernetes Clusters and Serviceapps can do horizontal autoscaling.
> It is currently not decided if and how autoscaling will be used.

The service container will consist of the runtime application and service specific code and configuration.

### Service Owner Clusters
In Altinn Studio Apps, every service owner will have their separate Kubernetes Cluster in each environment.
The Kubernetes Cluster architecture will be the same in test and production environment
This will support scaling tailored each service owners needs and separation of services.

#### Secrets

Pods, where Service Apps are delpoyed, gets access to secrets during deployment via HELM charts.

#### Kubernetes Namespace

It's not planned to use namespaces.

#### Routing

To be able to route traffic to the correct container, each container is tagged to a specific
end user service. The routing mecahnism routes to the correct container based on the url
containing the service parameter.

### Data services

The data services application is the application responsible exposing data related functionality 
to the service containers. This container will be scaled based on need.

### Platform Cluster

The platform cluster in Altinn Studio Apps will host common application like DataServices. 

#### Platform integration

The platform integration is a new application hosted in the existing infrastructure. 
It exposes REST-APIs for Profile, Register, Authorization, Intermediary and Authentication. 
These are services not part of the Altinn Studio Platform (yet) and
everyone planning to run the Altinn Studio platform would need to implement their own components that support. 

### Networking

#### Sub domains

Each service owner will have their own sub domain.

> org.apps.altinn.no

#### Path for the service

> org.apps.altinn.no/servicename

#### Encrypted traffic and network policy

There is ongoing analysis related to this topic. [Click here to find more information on Github](https://github.com/Altinn/altinn-studio/issues/1000).

#### Ingress / Load balancer

Traefik will be used as an Ingree / Load balancer.

#### API Proxy

API Proxy is needed for controlling credentials and outbound firewall rules from the platform. 
This might be handled by the API Managment software. Needs Analyzis

#### API Management

The platform requires API management software to handle SLA ++. Needs Analyzis

[download as visio]: /architecture/deployment/altinn-apps/AltinnApps_DeploymentArchitecture.vsdx
[See fullscreen]: /architecture/deployment/altinn-apps/AltinnApps_DeploymentArchitecture.svg
[Kubernetes Cluster]: https://kubernetes.io/docs/concepts/
[Kubernetes Pod]: https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/
[Kubernetes ReplicaSet]: https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/