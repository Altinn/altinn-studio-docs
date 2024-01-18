---
title: Notifications email
linktitle: Notifications email
tags: [architecture, solution, notifications, email]
weight: 2
toc: true
---

## Integrations
### Kafka

The Notifications email microservice has an integration towards a Kafka broker, and this integration is used
both to publish and consume messages from topics relevant to the microservice. 

**Consumers:**

The following Kafka consumers are defined: 
- [SendEmailQueueConsumer](https://github.com/Altinn/altinn-notifications-email/blob/main/src/Altinn.Notifications.Email.Integrations/Consumers/SendEmailQueueConsumer.cs):
  Consumes email objects with recipient data that are ready to be sent
- [EmailSendingAcceptedConsumer](https://github.com/Altinn/altinn-notifications-email/blob/main/src/Altinn.Notifications.Email.Integrations/Consumers/EmailSendingAcceptedConsumer.cs):
  Consumes pairs of notification and communications services operation ids

  
**Producers:**

A single producer [_KafkaProducer_](https://github.com/Altinn/altinn-notifications-email/blob/main/src/Altinn.Notifications.Email.Integrations/Producers/CommonProducer.cs) 
is implemented and used by all services that publish to Kafka. 

[Please reference the Kafka architecture section for a closer description of the Kafka setup.](../kafka/)

### Azure Communication Services 

Azure's email service Communication Services Email is used to send the email to the end users. 
A client, [EmailServiceClient](https://github.com/Altinn/altinn-notifications-email/blob/main/src/Altinn.Notifications.Email.Integrations/Clients/EmailServiceClient.cs)
has been implemented based on the SDK made available by Microsoft to interact with their API. 

## Dependencies

The microservice takes use of a range of external and Altinn services as well as .NET libraries to support the porivded
functionality. 
Find descriptions of key dependencies below. 

### External Services

| Service | Purpose | Resources |
|-|-|-|
| Apache Kafka on Confluent Cloud | Hosts the Kafka broker | [Documentation](https://www.confluent.io/confluent-cloud/)|
| Azure Communication services | Sends out emails to recipients and reports back | [Documentation](https://azure.microsoft.com/en-us/products/communication-services)|
| Azure Monitor | Telemetry from the application is sent to Application Insights | [Documentation](https://azure.microsoft.com/en-us/products/monitor) |
| Azure Key Vault | Safeguards secrets used by the microservice | [Documentation](https://azure.microsoft.com/en-us/products/key-vault) |
| Azure Kubernetes Services (AKS)| Hosts the microservice and cron jobs | [Documentation](https://azure.microsoft.com/en-us/products/kubernetes-service/) |


### Altinn Services
| Service | Purpose | Resources |
|-|-|-|
| Altinn Notifications* | Service that orchestrates the sending of notifications.| [Repository](https://github.com/altinn/altinn-notifications-email) |


\*Functional dependency to enable the full functionality of Altinn Notifications. Altinn Notifications generates the 
emails that are to be sent through this email service.



### .NET Libraries
Notifications microservice takes use of a range of libraries to support the provided functionality. 

| Library   | Purpose                                     | Resources                            |
| --------  | ------------------------------------------- | ---------------------------------------- |
| Azure.Communication.Email | Interact with Communication services API | [Repository](https://github.com/Azure/azure-sdk-for-net), [Documentation](https://github.com/Azure/azure-sdk-for-net/blob/Azure.Communication.Email_1.0.1/sdk/communication/Azure.Communication.Email/README.md) |
| Confluent.Kafka | Integrate with kafka broker | [Repository](https://github.com/confluentinc/confluent-kafka-dotnet), [Documentation](https://developer.confluent.io/get-started/dotnet/) |

[A full list of NuGet dependencies is available on GitHub](https://github.com/Altinn/altinn-notifications-email/network/dependencies).

## Testing
Quality gates implemented for a project require an 80 % code coverage for the unit and integration tests combined.
[xUnit](https://xunit.net/) is the framework used and the [Moq library](https://github.com/moq) supports mocking
parts of the solution.

### Unit tests
[The unit test project is available on GitHub](https://github.com/Altinn/altinn-notifications-email/tree/main/test/Altinn.Notifications.Email.Tests).

### Integration tests
[The integration test project is available on GitHub](https://github.com/Altinn/altinn-notifications-email/tree/main/test/Altinn.Notifications.Email.IntegrationTests).

There is a single dependency for the integration tests. Remaining dependencies such as Azure Communication Services have been mocked. 

- Kafka server. 
  
    A [_YAML file_](https://github.com/Altinn/altinn-notifications/blob/main/setup-kafka.yml) has been created to easily 
start all Kafka-related dependencies in a Docker containers.



### Automated tests 
No automated tests are set up for this component as it is considered that the integrations and availability are implicitly tested
through automated tests on the orchestrating service, Altinn Notifications.

### Use case tests
No use case tests are set up for this component as it is considered that the integrations and availability are implicitly tested
through use case tests on the orchestrating service, Altinn Notifications.

## Hosting

### Web API 
The microservice runs in a Docker container hosted in AKS, 
and it is deployed as a Kubernetes deployment with autoscaling capabilities.

The notifications email application runs on port 5091. 

See [DockerFile](https://github.com/Altinn/altinn-notifications-email/blob/main/Dockerfile) for details.

## Build & deploy

### Web API 
  - Build and Code analysis runs in a [Github workflow](https://github.com/Altinn/altinn-notifications-email/actions)
  - Build of the image is done in an [Azure Devops Pipeline](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=423)
  - Deploy of the image is enabled with Helm and implemented in an [Azure Devops Release pipeline](https://dev.azure.com/brreg/altinn-studio/_release?_a=releases&view=all&definitionId=48)

## Run on local machine
Instructions on how to set up the service on local machine for development or testing is covered by 
[the README in the repository](https://github.com/Altinn/altinn-notifications-email). 