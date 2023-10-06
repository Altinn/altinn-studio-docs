---
title: Application construction components - Altinn Notifications
linktitle: Architecture
tags: [architecture, solution]
weight: 20
toc: true
description: "The Notifications solution in Altinn is made up of multiple ASP.NET Web API applications 
deployed as Docker containers to a Kubernetes cluster."
---


## System architecture illustration
The solution is supported by multiple cron jobs running in the same Kubernetes cluster, a Kafka server and an instance of 
[Azure Communication services](https://learn.microsoft.com/en-us/azure/communication-services/overview).

The following diagram illustrates the overall data flow.

![Solution diagram](solution.drawio.svg "Solution diagram Altinn Notifications")


## Process flow between microservices and Kafka topics

![Topics](notifications-topic.drawio.svg "Illustration of the data flow including Kafka Topics")

## System and service dependencies 
### Internal
- **Altinn Authorization**: used to authorize access to endpoints
- **Altinn Storage**: used to retrieve status for Altinn app instances to evaluate send conditions
- **Altinn Profile**: used to retrieve recipient information 
- **Altinn Register**: used to retrieve recipient information

### External
- **Azure Kubernetes Services**: hosts the docker containers for microservices and cron jobs 
  in a fully managed Kubernetes cluster
- **Kafka on Confluent cloud**: hosts the kafka cluster the microservices consumes and produces messages to
- **PostgreSQL**: used for storage
- **Communication Services**: used to send emails
- **Event Grid**: used to subscribe to status updates for sent emails
