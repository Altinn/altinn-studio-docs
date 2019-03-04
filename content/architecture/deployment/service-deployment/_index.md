---
title: Altinn Studio - App Deployment
linktitle: App Deployment
description: Description of how services are deployet from the Altinn Studio Service Development solution to Altinn Studio
tags: ["tjenester 3.0"]
weight: 100
---
{{% notice warning %}}
NOTE: Work in progress. Stuff will change
{{% /notice %}}

When a service developer need to deploy a app (service) to
Altinn Studio Apps solution test/production environement there is created
a Docker Image with the configured version of AltinnCore.Runtime and the 
compiled service code and configuration inside the container.

This container is added to the Docker Registry. 

From Docker Registry Kubernetes will download the container in to the Kubernetes 
Cluster and make it available for the end users.

Details of build process can be found under build architecture.






