---
title: Altinn Studio - Deployment Architecture
linktitle: Altinn Studio
description: Description of the deployment architecture for runtime application
tags: ["tjenester 3.0"]
weight: 100
---
{{% notice warning %}}
NOTE: Work in progress. Stuff will change
{{% /notice %}}

The Altinn Studio Service Development solution is deployed to a Kubernetes Cluster. The 
diagram below show the different applications that is part this.

{{%excerpt%}}
<object data="/architecture/deployment/altinn-studio/AltinnStudio_Deployment_Architecture.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}

### Repository
GITEA is used as Repository in Altinn Studio Service Development solution. There is one 
instance of GITEA running in a docker container in the solution. 
It uses cloud service database and cloud file share for configuration and remote repos.
The Repository is accessed both from the designer application and from code IDE's from
service developers computers. 

### Designer
Designer is the web based editor for anything related to the service development.
 (UI, workflow, rules ++)
It runs in Docker Containers. (Linux) (how many needed will be analyzed at a later stage).

### Runtime
Runtime is used for integration testing of services as part of Altinn Studio Service 
Development solution. The same runtime application is shared between
all service developers. The service code/configuration is copied from local repo of the
service developers testing the service. 

### Routing
NGINX is used for routing between the different applications.

### Local Developer
Service Developers can use locally installed IDE and other tools and communicate directly 
with the repository. This is targeted for the more experienced developers.

### Local Developer with Altinn Studio
For developers that is required to develop custom widgets (REACT) they can install 
Altinn Studio Service Development solution locally on their computer. (Altinn studio
support both Windows, Linxu and MacOS)




