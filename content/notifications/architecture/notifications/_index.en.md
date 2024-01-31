---
title: Notifications
linktitle: Notifications
tags: [architecture, solution, notifications]
weight: 1
toc: true
---

## API

### Public API
The following API controllers are defined: 
- [EmailNotificationsOrdersController](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Controllers/EmailNotificationOrdersController.cs):
  API for placing new email notification order requests  
- [SmsNotificationsOrdersController](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Controllers/SmsNotificationOrdersController.cs):
  API for placing new sms notification order requests  
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

Each table in the _notifications_ schema is described in the table below, 
followed by a diagram showing the relation between the tables.

| Table              | Description                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| orders             | Contains metadata for each notification order                                                    |
| emailtexts         | Holds the static common texts related to an email notification                                   |
| emailnotifications | Holds metadata for each email notfication along with recipient contact details                   |
| smstexts           | Holds the static common texts related to an sms notification                                     |
| smsnotifications   | Holds metadata for each sms notification along with recipient contact details                    |
| resourcelimitlog   | Keeps track of resource limits outages for dependent systems e.g. Azure Communication services   |

![Diagram of Notifications Database](dbmodel.drawio.svg "Diagram of Notifications Database")


## Integrations 

### Kafka
The Notifications microservice has an integration towards a Kafka broker, and this integration is used
both to publish and consume messages from topics relevant to the microservice. 

**Consumers:**

The following Kafka consumers are defined: 
- [AltinnServiceUpdateConsumer](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Integrations/Kafka/Consumers/AltinnServiceUpdateConsumer.cs):
  Consumes service updates from other Altinn services
- [EmailStatusConsumer](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Integrations/Kafka/Consumers/EmailStatusConsumer.cs):
  Consumes updates on the send state of an email notification
- [PastDueOrdersConsumer](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Integrations/Kafka/Consumers/PastDueOrdersConsumer.cs):
  Consumes notification orders that are ready to be processed for sending
- [PastDueOrdersRetryConsumer](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Integrations/Kafka/Consumers/PastDueOrdersRetryConsumer.cs):
  Consumes notification orders where the first attempt of processing has failed

**Producers:**

A single producer [_KafkaProducer_](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications.Integrations/Kafka/Producers/KafkaProducer.cs) 
is implemented and used by all services that publish to Kafka. 

[Please reference the Kafka architecture section for a closer description of the Kafka setup.](../kafka/)


## Cron jobs

Multiple cron jobs have been set up to enable triggering of of actions in the application on 
a schedule. 

The following cron jobs are defined: 

| Job name               | Schedule    | Description                                                                           |
| ---------------------- | ----------- | ------------------------------------------------------------------------------------- |
| pending-orders-trigger | */1 * * * * | Sends request to endpoint to start processing of past due orders                      |
| send-email-trigger     | */1 * * * * | Sends request to endpoint to start the process of sending all new email notifications |

Each cron job runs in a Docker container [based of the official docker image for curl](https://hub.docker.com/r/curlimages/curl)
and sends a request to an endpoints in the [Trigger controller](https://github.com/Altinn/altinn-notifications/blob/main/src/Altinn.Notifications/Controllers/TriggerController.cs).

The specifications of the cron jobs are hosted in a [private repository in Azure DevOps](https://dev.azure.com/brreg/_git/altinn-studio-ops?path=/deploy/altinn-platform/altinn-notifications/templates/jobs)
(requires login).



## Dependencies 

The microservice takes use of a range of external and Altinn services as well as .NET libraries to support the porivded
functionality. 
Find descriptions of key dependencies below. 

### External Services
| Service | Purpose | Resources |
|-|-|-|
| Apache Kafka on Confluent Cloud | Hosts the Kafka broker | [Documentation](https://www.confluent.io/confluent-cloud/)|
| Azure Database for PostgreSQL | Hosts the database| [Documentation](https://azure.microsoft.com/en-us/products/postgresql) |
| Azure API Management | Manages access to public API | [Documentation](https://azure.microsoft.com/en-us/products/api-management) |
| Azure Monitor | Telemetry from the application is sent to Application Insights | [Documentation](https://azure.microsoft.com/en-us/products/monitor) |
| Azure Key Vault | Safeguards secrets used by the microservice | [Documentation](https://azure.microsoft.com/en-us/products/key-vault) |
| Azure Kubernetes Services (AKS)| Hosts the microservice and cron jobs | [Documentation](https://azure.microsoft.com/en-us/products/kubernetes-service/) |


### Altinn Services
| Service | Purpose | Resources |
|-|-|-|
| Altinn Authorization | Authorizes access to the API  | [Repository](https://github.com/altinn/altinn-authorization)| 
| Altinn Notifications Email* | Service for sending emails related to a notification | [Repository](https://github.com/altinn/altinn-notifications-email) |



\*Functional dependency to enable the full functionality of Altinn Notifications.



### .NET Libraries
Notifications microservice takes use of a range of libraries to support the provided functionality. 

| Library   | Purpose                                     | Resources                            |
| --------  | ------------------------------------------- | ---------------------------------------- |
| AccessToken | Used to validate tokens in requests | [Repository](https://github.com/altinn/altinn-accesstoken), [Documentation](../../../authentication/architecture/accesstoken/)|
| Confluent.Kafka | Integrate with kafka broker | [Repository](https://github.com/confluentinc/confluent-kafka-dotnet), [Documentation](https://developer.confluent.io/get-started/dotnet/) |
| FluentValidation | Used to validate content of API request | [Repository](https://github.com/FluentValidation/FluentValidation), [Documentation](https://docs.fluentvalidation.net/en/latest/)|
| JWTCookieAuthentication| Used to validate Altinn token (JWT) | [Repository](https://github.com/Altinn/altinn-authentication),  [Documentation](../../../authentication/architecture/jwtcookie/)| 
| Npgsql    | Used to access the database server          |  [Repository]( https://github.com/rdagumampan/yuniql ), [Documentation](https://www.npgsql.org/)|
| Yuniql | DB migration | [Repository](https://github.com/rdagumampan/yuniql), [Documentation](https://yuniql.io/)|

[A full list of NuGet dependencies is available on GitHub](https://github.com/Altinn/altinn-notifications/network/dependencies).

## Testing 
Quality gates implemented for a project require an 80 % code coverage for the unit and integration tests combined.
[xUnit](https://xunit.net/) is the framework used and the [Moq library](https://github.com/moq) supports mocking
parts of the solution.

### Unit tests
[The unit test project is available on GitHub](https://github.com/Altinn/altinn-notifications/tree/main/test/Altinn.Notifications.Tests).

### Integration tests
[The integration test project is available on GitHub](https://github.com/Altinn/altinn-notifications/tree/main/test/Altinn.Notifications.IntegrationTests).

There are two dependencies for the integration tests: 
- Kafka server. 
  
    A [_YAML file_](https://github.com/Altinn/altinn-notifications/blob/main/setup-kafka.yml) has been created to easily 
start all Kafka-related dependencies in a Docker containers.

- PostgreSQL database

    A PostgreSQL database needs to be installed wherever the tests are running, either in a Docker container or installed 
    on the machine and exposed on port 5432.

    A [bash script](https://github.com/Altinn/altinn-notifications/blob/main/dbsetup.sh) has been set up to easily 
    generate all required roles and rights in the database. 

    [See section on running the application locally](#run-on-local-machine) if futher assistance is required in 
    running the integration tests.

### Automated tests 
[The automated test project is available on GitHub](https://github.com/Altinn/altinn-notifications/tree/main/test/k6)

The automated tests for this micro service are implemented through [Grafana's k6](https://k6.io/). 
The tool is specialized for load tests, but we do use it for automated API tests as well. 

### Use case tests
[All use case workflows are available on GitHub](https://github.com/Altinn/altinn-notifications/tree/main/.github/workflows)

Use case tests are run every 15 minuts through GitHub Actions. 
The tests run during the use case tests are defined in the k6 test project. 
The aim of the tests is to run through central functionality of the solution to ensure that it is running and available to our end users.

## Hosting

### Web API 
The microservice runs in a Docker container hosted in AKS, 
and it is deployed as a Kubernetes deployment with autoscaling capabilities

The notifications application runs on port 5090. 

See [DockerFile](https://github.com/Altinn/altinn-notifications/blob/main/Dockerfile) for details.

### Cron jobs
The cron jobs run in a docker containers hosted in AKS, and is started on a schedule configured in the helm chart.
There is a policy in place to ensure that there are no concurrent pods of a singular job.

### Database
The database is hosted on a PostgreSQL flexible server in Azure. 

## Build & deploy

### Web API 
  - Build and Code analysis runs in a [Github workflow](https://github.com/Altinn/altinn-notifications/actions)
  - Build of the image is done in an [Azure Devops Pipeline](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=383)
  - Deploy of the image is enabled with Helm and implemented in an [Azure Devops Release pipeline](https://dev.azure.com/brreg/altinn-studio/_release?_a=releases&view=all&definitionId=49)

### Cron jobs
   - Deploy of the cron jobs is enabled with Helm and implemented in the same pipeline that deploys the web API.


### Database
  - Migration scripts are copied into the Docker image of the web API when this is build
  - Execution of the scripts is on startup of the application and enabled by [YUNIQL](https://yuniql.io/)


## Run on local machine
Instructions on how to set up the service on local machine for development or testing is covered by 
[the README in the repository](https://github.com/Altinn/altinn-notifications). 