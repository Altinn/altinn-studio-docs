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
- EmailNotificationsOrdersController
- EmailNotificationsController
- OrdersController
  

### Altinn internal API
The following API controllers are reserved for use internally in Altinn solutions only

### Notifications internal API
The following API controllers are reserved for use internally in the Notification solution only. 

- [Trigger controller](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Controllers/TriggerController.cs): Functionality to trigger the start of order and notifications processing flows.


## Database
Add an overview of the various tables and a general descriptions. 
Diagram that shows relationships e.g. foreign keys. 


## Integrations 
 
### Kafka Consumers

### Kafka Producer


## Cron jobs

[Based of the official docker image for curl](https://hub.docker.com/r/curlimages/curl)

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