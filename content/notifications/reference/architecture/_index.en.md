---
title: Architecture
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

{{% expandlarge id="notifications-topic-process-order" header="Flow chart for order processing" %}}
![Topics](flowchart-order-process.drawio.svg "Flow chart including Kafka topics for order processing")
{{% /expandlarge %}}

{{% expandlarge id="notifications-topic-process-email" header="Flow chart for email notification processing" %}}
![Topics](flowchart-email-notifications-process.drawio.svg "Flow chart including Kafka topics for email notification processing")
{{% /expandlarge %}}

{{% expandlarge id="notifications-topic-process-sms" header="Flow chart for sms notification processing" %}}
![Topics](flowchart-sms-notifications-process.drawio.svg "Flow chart including Kafka topics for sms notification processing")
{{% /expandlarge %}}

## System and service dependencies 
### Internal

- **Altinn Authorization**: used to authorize access to endpoints
- **Altinn Profile**: used to retrieve recipient information 
- **Altinn Register**: used to retrieve recipient information


{{% notice info %}}
The number of internal dependencies for Notifications is currently quite limited, 
but during 2024 we expect the services below to be utilized by Notifications. 
- **Altinn Storage**: used to retrieve status for Altinn app instances to evaluate send conditions
{{% /notice %}}


### External
- [**Azure Kubernetes Services**](https://azure.microsoft.com/en-us/products/kubernetes-service): hosts the docker containers for microservices and cron jobs 
  in a fully managed Kubernetes cluster
- [**Kafka on Confluent cloud**](https://www.confluent.io/): hosts the kafka cluster the microservices consumes and produces messages to. Say something about why we use kafka vs something else. E.g. storage queues
- [**PostgreSQL**](https://www.postgresql.org/): used for storage
- [**Azure Communication Services**](https://azure.microsoft.com/en-us/products/communication-services): used to send emails
- [**Azure Event Grid**](https://azure.microsoft.com/en-us/products/event-grid): used to subscribe to status updates for sent emails
- [**LINK Mobility**](https://www.linkmobility.com/) used to send sms
- [**Maskinporten**](https://www.digdir.no/felleslosninger/maskinporten/869) used to generate tokens for external REST API requests
