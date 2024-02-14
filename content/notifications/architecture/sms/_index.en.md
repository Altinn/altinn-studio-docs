---
title: Notifications sms
linktitle: Notifications sms
tags: [architecture, solution, notifications, sms]
weight: 2
toc: false
---
## API

### Public API
### Altinn Notifications Sms API
The Altinn Sms Notifications API is an HTTP-based RESTful API that provides an endpoint for receiving delivery reports. 
Link Mobility push deliveryreports for every sms sent through their gateway.
- [DeliveryReportController](https://github.com/Altinn/altinn-notifications-sms/blob/main/src/Altinn.Notifications.Sms/Controllers/DeliveryReportController.cs)
  Endpoint receiving deliveryreports in XML-format.
  The controller is protected with [basic authentication](https://github.com/Altinn/altinn-notifications-sms/blob/main/src/Altinn.Notifications.Sms/Configuration/BasicAuthenticationHandler.cs).

## Integrations
### Kafka
The Notifications sms microservice has an integration towards a Kafka broker, and this integration is used
both to publish and consume messages from topics relevant to the microservice. 

**Consumers:**
The following Kafka consumers are defined: 
- [SendSmsQueueConsumer](https://github.com/Altinn/altinn-notifications-sms/blob/main/src/Altinn.Notifications.Sms.Integrations/Consumers/SendSmsQueueConsumer.cs):
  Consumes sms objects with recipient data that are ready to be sent

**Producers:**
A single producer [_KafkaProducer_](https://github.com/Altinn/altinn-notifications-sms/blob/main/src/Altinn.Notifications.Sms.Integrations/Producers/CommonProducer.cs) 
is implemented and used by all services that publish to Kafka. 

[Please reference the Kafka architecture section for a closer description of the Kafka setup.](../kafka/)

### Link Mobility
Link Mobility is used as service provider for sending sms to the end users.
A client, [SmsClient](https://github.com/Altinn/altinn-notifications-sms/blob/main/src/Altinn.Notifications.Sms.Integrations/LinkMobility/SmsClient.cs)
has been implemented based on the SDK made available by Link to interact with their API. 

## Dependencies
The microservice takes use of a range of external and Altinn services as well as .NET libraries to support the provided
functionality. 
Find descriptions of key dependencies below. 

### External Services
| Service | Purpose | Resources |
|-|-|-|
| Apache Kafka on Confluent Cloud | Hosts the Kafka broker | [Documentation](https://www.confluent.io/confluent-cloud/)|
| Link Mobility | Sends out sms to recipients and reports back | [Documentation](https://www.linkmobility.com/no/produkter/kanaler/mobil/sms)|
| Azure Monitor | Telemetry from the application is sent to Application Insights | [Documentation](https://azure.microsoft.com/en-us/products/monitor) |
| Azure Key Vault | Safeguards secrets used by the microservice | [Documentation](https://azure.microsoft.com/en-us/products/key-vault) |
| Azure Kubernetes Services (AKS)| Hosts the microservice and cron jobs | [Documentation](https://azure.microsoft.com/en-us/products/kubernetes-service/) |

### Altinn Services
| Service | Purpose | Resources |
|-|-|-|
| Altinn Notifications* | Service that orchestrates the sending of notifications.| [Repository](https://github.com/Altinn/altinn-notifications-sms) |

\*Functional dependency to enable the full functionality of Altinn Notifications. Altinn Notifications generates the 
sms messages that are to be sent through this sms service.

### .NET Libraries
Notifications microservice takes use of a range of libraries to support the provided functionality. 

| Library   | Purpose                                     | Resources                            |
| --------  | ------------------------------------------- | ---------------------------------------- |
| Link Mobility | Interact with Link Mobility XML Gateway | [Repository](https://github.com/PSWinCom/LinkMobility.PSWin.Client), [Documentation](https://github.com/PSWinCom/LinkMobility.PSWin.Client/blob/main/README.md) |
| Confluent.Kafka | Integrate with kafka broker | [Repository](https://github.com/confluentinc/confluent-kafka-dotnet), [Documentation](https://developer.confluent.io/get-started/dotnet/) |

## Testing

Quality gates implemented for a project require an 80 % code coverage for the unit and integration tests combined.
[xUnit](https://xunit.net/) is the framework used and the [Moq library](https://github.com/moq) supports mocking
parts of the solution.

### Unit tests
[The unit test project is available on GitHub](https://github.com/Altinn/altinn-notifications-sms/tree/main/test/Altinn.Notifications.Sms.Tests).

### Integration tests
[The integration test project is available on GitHub](https://github.com/Altinn/altinn-notifications-sms/tree/main/test/Altinn.Notifications.Sms.IntegrationTests).

There is a single dependency for the integration tests. Remaining dependencies such as Link Mobility have been mocked. 

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

The notifications sms application runs on port 5092. 

See [DockerFile](https://github.com/Altinn/altinn-notifications-sms/blob/main/Dockerfile) for details.

## Build & deploy

### Web API 
  - Build and Code analysis runs in a [Github workflow](https://github.com/Altinn/altinn-notifications-sms/actions)
  - Build of the image is done in an [Azure Devops Pipeline](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=476)
  - Deploy of the image is enabled with Helm and implemented in an [Azure Devops Release pipeline](https://dev.azure.com/brreg/altinn-studio/_release?_a=releases&view=all&definitionId=52)

## Run on local machine
Instructions on how to set up the service on local machine for development or testing is covered by 
[the README in the repository](https://github.com/Altinn/altinn-notifications-email). 