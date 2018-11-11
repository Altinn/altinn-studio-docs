---
title: Altinn Studio - Runtime solution - Deployment Architecture
linktitle: Runtime
description: Description of the deployment architecture for runtime application
tags: ["tjenester 3.0"]
weight: 100
---
{{% notice warning %}}
NOTE: Work in progress. Stuff will change
{{% /notice %}}

The runtime application is deployed both as part of Altinn Studio Service Development 
solution and part of the Altinn Studio Runtime solution. The deployment architecture
 is different for these two scenarios.

The following diagram shows the deploy architecture for runtime and its related components
 in Altinn Studio Runtime solution configuration.

{{%excerpt%}}
<object data="/architecture/deployment/runtime/RunTime_deployment_Architecture.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}

### Service Containers
In the Runtime solution each end user service will have a uniqe docker container managed 
by Kubernetes. Each set of service containers will be scaled based on the use of the service.

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
everyone planning to run Altinn Studio would need to 

### API Proxy
API Proxy is needed for controlling credentials and outbound firewall rules from the platform. 
This might be handled by the API Managment software. 

### API Management
The platform requires API management software to handle SLA ++



