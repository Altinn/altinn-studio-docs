---
title: Altinn Studio - Deployment Architecture
linktitle: Altinn Studio
description: Description of the deployment architecture for runtime application
weight: 100
---
{{% notice warning %}}
NOTE: Work in progress. Stuff will change
{{% /notice %}}

The Altinn Studio App Development solution is deployed to a Kubernetes Cluster. The 
diagram below show the different applications that is part this.

{{%excerpt%}}
<object data="/architecture/infrastructure/deployment/altinn-studio/altinnstudio_deployment_architecture.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}

### Repository
GITEA is used as Repository in Altinn Studio App Development solution. There is one 
instance of GITEA running in a docker container in the solution. 
It uses cloud service database and cloud file share for configuration and remote repos.
The Repository is accessed both from the designer application and from code IDE's from
app developers computers. 

### Designer
Designer is the web based editor for anything related to the app development.
 (UI, workflow, rules ++)
It runs in Docker Containers. (Linux) (how many needed will be analyzed at a later stage).

### Runtime
Runtime is used for integration testing of apps as part of Altinn Studio App 
Development solution. The same runtime application is shared between
all app developers. The app code/configuration is copied from local repo of the
app developers testing the app. 

### Routing
NGINX is used for routing between the different applications.

### Local Developer
App Developers can use locally installed IDE and other tools and communicate directly 
with the repository. This is targeted for the more experienced developers.

### Local Developer with Altinn Studio
For developers that is required to develop custom widgets (REACT) they can install 
Altinn Studio App Development solution locally on their computer. (Altinn studio
support both Windows, Linxu and MacOS)




