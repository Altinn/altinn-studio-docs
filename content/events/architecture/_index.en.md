---
title: Application construction components - Altinn Events
linktitle: Architecture
tags: [architecture, solution]
weight: 20
toc: true
description: "The Altinn Events component is an a ASP.NET MVC Application exposing a REST API to Altinn Apps
and other Altinn services. The application is deployed as a Docker container to a Kubernetes cluster and a set
of functions in an Azure Function App."
aliases:
 - /technology/solutions/altinn-platform/events/
---

## System architecture illustration

When a publish request is posted to the `/app` endpoint, the event will first be saved in the `events-registration` queue for operational resilience and flexibility. 

When an event retrieval request is received, it will respond with results from the internal relational database used for events persistence.

![Event architecture diagram](altinn-events.drawio.svg "Altinn Event Architecture")

## Flow for processing a single incoming event

![Sequence diagram - POST event](sequence-diagram-post-events.drawio.svg "Sequence diagram - POST event")


## System and service dependencies 
### Internal
- **Altinn Authorization**: used to authorize access to endpoints

### External
- [**Azure Kubernetes Services**](https://azure.microsoft.com/en-us/products/kubernetes-service): hosts the docker containers for microservices and cron jobs 
  in a fully managed Kubernetes cluster
- [**PostgreSQL**](https://www.postgresql.org/): used for storage
- [**Azure Functions**](https://docs.microsoft.com/en-us/azure/azure-functions/): used internally to process and forward incoming cloud events to subscriber webhooks. 

