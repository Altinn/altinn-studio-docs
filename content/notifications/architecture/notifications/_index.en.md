---
title: Notifications
linktitle: Notifications
tags: [architecture, solution, notifications]
weight: 1
toc: true
---

{{% notice info %}}
TODO: Agree on structure for section.

Could we split it in two children pages: Functional and Non-functional?
{{% /notice %}}

## API

### Public API
The following API controllers are defined: 
- [EmailNotificationsOrdersController](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Controllers/EmailNotificationOrdersController.cs):
  API for placing new email notification order requests  
- [EmailNotificationsController](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Controllers/EmailNotificationsController.cs):
  API for retrieving email notifications related to a single order
- [OrdersController](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Controllers/OrdersController.cs):
  API for retrieving one or more orders with or without processing details and notification summaries

### Notifications internal API
The API controllers listed below are exclusively for use within the Notification solution:

- [Trigger controller](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Controllers/TriggerController.cs):
   Functionality to trigger the start of order and notifications processing flows.


## Database

Data related to notification orders, notifications and receipients is persisted in a PostgreSQL database. 

Find below a short description of each table within the notifications schema:

|Table | Description|
|-|-|
| orders | Table containing metadata for each notification order |
| emailtexts | Table persisting the static common texts related to a notification |
| emailnotifications | Table persisting metadata for each notfication along with recipient contact details |
| resourcelimitlog | Table used to keep track of resource limits outages for dependent systems e.g. Azure Communication services | 


![Diagram of Notifications Database](dbmodel.drawio.svg "Diagram of Notifications Database")


## Integrations 
 
### Kafka Consumers
The following Kafka consumers are defined: 
- [AltinnServiceUpdateConsumer](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Integrations/Kafka/Consumers/AltinnServiceUpdateConsumer.cs):
  Consumes service updates from other Altinn services
- [EmailStatusConsumer](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Integrations/Kafka/Consumers/EmailStatusConsumer.cs):
  Consumes updates on the send state of an email notification
- [PastDueOrdersConsumer](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Integrations/Kafka/Consumers/PastDueOrdersConsumer.cs):
  Consumes notification orders that are ready to be processed for sending
- [PastDueOrdersRetryConsumer](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Integrations/Kafka/Consumers/PastDueOrdersRetryConsumer.cs):
  Consumes snotification orders where the first attempt of processing has failed

### Kafka Producer

A single producer [_KafkaProducer_](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Integrations/Kafka/Producers/KafkaProducer.cs) 
is implemented and used by all services that publish to Kafka. 

## Cron jobs

Multiple cron jobs have been set up to enable the triggering of certain actions on the application on 
a given schedule. 

The following cron jobs are defined: 

| Job name | Schedule | Description|
|-|-| -|
|pending-orders-trigger |  */1 * * * *| Sends request to endpoint to start processing of past due orders |
|send-email-trigger | */1 * * * * | Sends request to endpoint to start the process of sending all new email notifications |

Each cron job runs in a Docker container [based of the official docker image for curl](https://hub.docker.com/r/curlimages/curl)
and sends a request to an endpoints in the [Trigger controller](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Controllers/TriggerController.cs).


## Dependencies 

### Services
- Kafka
- Azure Database for PostgreSQL
- APIM 
- AI (logging)


### Altinn components
- Altinn Notifications Email
- Altinn Authorization 


### Software
Notifications microservice takes use of a range of libraries to support the provided functionality. 

|Software | Purpose | Documentation|
|-|-|-|
|Npgsql |Used to access the database server from the | [Documentation](https://www.npgsql.org/)|


[See full list of dependencies on GitHub](https://github.com/Altinn/altinn-notifications/network/dependencies).

## Testing 
Quality gates implemented for a project require an 80 % code coverage for the unit and integration tests combined.

### Unit tests
[The unit test project is available on Github](https://github.com/Altinn/altinn-notifications/tree/main/test/Altinn.Notifications.Tests).

[xUnit](https://xunit.net/) is the framework used and the [Moq library](https://github.com/moq) supports mocking
parts of the solution.

### Integration tests
[The integration test project is available on Github](https://github.com/Altinn/altinn-notifications/tree/main/test/Altinn.Notifications.IntegrationTests).

[xUnit](https://xunit.net/) is the framework used.

There are two dependencies for the integration tests: 
- A Kafka server
- A PostgreSQL database

A _docker-compose_ script is available to start all Kafka-related dependencies in a Docker containers.

A PostgreSQL database need to be installed wherever the tests are running, either in a Docker container or installed 
on the machine and exposed on port 5432. (krever og at database og roller er på plass).
[Laget et bash script for å enkelt få til dette også](https://github.com/Altinn/altinn-notifications/blob/main/dbsetup.sh)

### Use case tests
Use case tests are ru every 15 minutss through GitHub Actions. 
The tests themselves are implemented in k6. 
The aim of the tests is to run through central functionality of the solution to ensure that it is running and available to our end users.

## Hosting

### Web API 
- The microservice runs in a Docker container hosted in AKS (Azure Kubernetes Service), 
  and it is deployed as a Kubernetes deployment with autoscaling capabilities

Notifications listen on port 5090. 

See [DockerFile](https://github.com/Altinn/altinn-notifications/blob/main/Dockerfile) for details.

### Cron jobs
- The cron jobs run in a docker containers hosted in AKS (Azure Kubernetes Service), 
  and is started on a schedule configured in the helm chart.
  There is a policy in place to ensure that there are no concurrent pods of a singular job.

### Database
{{% notice info %}}
TODO: Any config that would be useful to share from a functional perspective 
{{% /notice %}}

- The PostgreSQL database runs on a flexible server in Azure.

## Build & deploy

### Web API 
  - Build and Code analysis are done by an [Github action](https://github.com/Altinn/altinn-notifications/actions)
  - Build of the image is done in an [Azure Devops Pipeline](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=383)
  - Deploy of the image is enabled with Helm and implemented in an [Azure Devops Release pipeline](https://dev.azure.com/brreg/altinn-studio/_release?_a=releases&view=all&definitionId=49)

### Cron jobs
   - Deploy of the cron jobs is enabled with Helm and implemented in the same pipeline that deploys the web API.

### Database
  - Migration scripts are copied into the Docker image of the web API when this is build
  - Execution of the scripts is on startup of the application and enabled by [YUNIQL](https://yuniql.io/)