---
title: Application Construction components - Storage
linktitle: Storage
description: The storage component is a asp.net core application hosted in Kubernetes as a docker container.
tags: [architecture, solution]
weight: 100
---



## API Controllers
Storage exposes functionality throug API controllers. 

The following controllers exist

[Applications](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage/Controllers/ApplicationsController.cs)
[Data](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage/Controllers/DataController.cs)
[InstanceEvents](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage/Controllers/InstanceEventsController.cs)
[Instances](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage/Controllers/InstancesController.cs)
[MessageboxInstances](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage/Controllers/MessageboxInstancesController.cs)
[Process](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage/Controllers/ProcessController.cs)


## Dependencie
Storage components 

See complete list of dependencies in [csproj](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage/Altinn.Platform.Storage.csproj) file for storage. 


## Docker configuration
Storage listen on port 5010. 

See [DockerFile](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Storage/Storage/Dockerfile) for details.
