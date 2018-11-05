---
title: Altinn Studio - Runtime - Deployment Architecture
linktitle: Runtime
description: Description of the deployment architecture for runtime application
tags: ["tjenester 3.0"]
weight: 100
---
{{% notice warning %}}
NOTE: Work in progress. Stuff will change
{{% /notice %}}

The runtime application is deployed both as part of Altinn Studio solution and part
of the end user solution. The deployment architecture is different for these two scenarios.

The following diagram shows the deploy architecture for runtime and its related components in end user solution configuratgion

{{%excerpt%}}
<object data="/documentation/runtime/architecture/deployment/RunTime_deployment_Architecture.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}

### Service Containers
In end user solution mode each end user service will have a uniqe docker container managed by Kubernetes. 
Each set of service containers will be scaled based on the use of the service.

### Routing
To be able to route traffic to the correct container, each container is tagged to a specific end user service.
The routing mecahnismen routes to the correct container based on the url.

### Data services
The data services application is the application responsible exposing data related functionality to the service containers.
This containers are 

### Platform integration
The plattform integration is a new application hosted in the existing infrastructure. It exposes REST-APIs
for Profile, Register, Authorization, Intermediary.

### API Proxy
API Proxy is needed for controlling credentials and outbound firewall rules from the plattform. 
This might be handled by the API Managment software

### API Management
The plattform requires API managament software to handle SLA ++



