---
title: Events
linktitle: Events
tags: [architecture, solution, events]
weight: 1
toc: true
---

## API

### Public API

The following API controllers are defined: 
- [AppController](https://github.com/Altinn/altinn-events/blob/main/src/Events/Controllers/AppController.cs) : publish (store and forward) and retrieve app events
- [EventsController](https://github.com/Altinn/altinn-events/blob/main/src/Events/Controllers/EventsController.cs) : publish (store and forward) and retrieve generic events
- [SubscriptionController](https://github.com/Altinn/altinn-events/blob/main/src/Events/Controllers/SubscriptionController.cs) : create, retrieve, validate and delete event subscriptions

## Controllers

### AppController

The [AppController](https://github.com/Altinn/altinn-events/blob/main/src/Events/Controllers/AppController.cs) in the Events component is the one receiving events from Apps and other sources. 

It verifies that the app is authorized to publish events for the given source before saving the event in a database for at least 90 days.

It also exposes API to search for events and to get events. 

The access is controlled by the XACML Policy for the given App that is the source for an given event.

The [AuthorizationHelper](https://github.com/Altinn/altinn-events/blob/main/src/Events/Authorization/AuthorizationHelper.cs)
is responsible for creating and performing the request to the [Policy Decision Point](/authorization/modules/pdp/).


### OutboundController (previously PushController)

[OutboundController](https://github.com/Altinn/altinn-events/blob/main/src/Events/Controllers/OutboundController.cs) is called by the  [EventsInbound](https://github.com/Altinn/altinn-events/blob/main/src/Events.Functions/EventsInbound.cs) function. 

Based on details from the Event it will identify matching subscriptions. 

For each match it will authorize the subscriber using the Policy Authorization Point.

The [AuthorizationHelper](https://github.com/Altinn/altinn-events/blob/main/src/Events/Authorization/AuthorizationHelper.cs)
is responsible for creating and performing the request to the [Policy Decision Point](/authorization/modules/pdp/).

The access is controlled by the XACML Policy for the given App that is the source for an given event.

If the subscriber is Authorized, the event will be added to the "events-outbound" queue and picked up by the EventsOutbound function. (see below)


Functions and procedurees are used to add, delete and query data from the above tables. 


### Internal API

The API controllers listed below are exclusively for use within in the Altinn organization: 

### Private API
The API controllers listed below are exclusively for use within the Notification solution:
- [StorageController](https://github.com/Altinn/altinn-events/blob/main/src/Events/Controllers/StorageController.cs) : save incoming events to persistent storage (database)  
- [InboundController](https://github.com/Altinn/altinn-events/blob/main/src/Events/Controllers/InboundController.cs) : store events in _events-inbound_ queue, minimal processing logic.
- [OutboundController](https://github.com/Altinn/altinn-events/blob/main/src/Events/Controllers/OutboundController.cs) : forward events to authorized subscriber webhook endpoints, via _events-outbound_ queue

## Database

See all functions and stored procedures [here](https://github.com/Altinn/altinn-events/tree/main/src/Events/Migration).

### Indexes

The events table has indexes on the columns _cloudevent_ (gin index) and  _registeredtime_ (btree index).

## Azure Storage Queues

## Azure Functions

Multiple Azure Functions have been set up to decouple the processing and pushing of events as well as subscription validation.
All functions run based on Storage Queue triggers.
[Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/) are used internally to process and forward incoming cloud events to subscriber webhooks. 

Unless specified all functions use the standard Azure Function mechanism for retry.

 - [EventsRegistration](https://github.com/Altinn/altinn-events/blob/main/src/Events.Functions/EventsRegistration.cs)
   - dequeue from `events-registration`
   - store to database
   - forward to `events-inbound` queue
 - [EventsInbound](https://github.com/Altinn/altinn-events/blob/main/src/Events.Functions/EventsInbound.cs)
   - dequeue from `events-inbound`
   - find valid subscriptions with filters that match event
   - forward a copy of event to `events-outbound` queue for each matching subscription
 - [EventsOutbound](https://github.com/Altinn/altinn-events/blob/main/src/Events.Functions/EventsOutbound.cs) 
   - dequeue from `events-outbound`
   - POST cloud event to target webhook endpoint, retry as necessary
   - This function is configured with [CustomQueueProcessorFactory](https://github.com/Altinn/altinn-events/blob/main/src/Events.Functions/Factories/CustomQueueProcessorFactory.cs) to handle retry if it is not possible to push event to the endpoint.
 - [SubscriptionValidation](https://github.com/Altinn/altinn-events/blob/main/src/Events.Functions/SubscriptionValidation.cs) 
   - check that the user-defined webhook endpoint is ready to receive data

## Dependencies 

The microservice takes use of a range of external and Altinn services as well as .NET libraries to support the provided
functionality. 
Find descriptions of key dependencies below. 

### External Services
| Service                         | Purpose                                                        | Resources                                                                       |
| ------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Azure Database for PostgreSQL   | Hosts the database                                             | [Documentation](https://azure.microsoft.com/en-us/products/postgresql)          |
| Azure API Management            | Manages access to public API                                   | [Documentation](https://azure.microsoft.com/en-us/products/api-management)      |
| Azure Monitor                   | Telemetry from the application is sent to Application Insights | [Documentation](https://azure.microsoft.com/en-us/products/monitor)             |
| Azure Key Vault                 | Safeguards secrets used by the microservice                    | [Documentation](https://azure.microsoft.com/en-us/products/key-vault)           |
| Azure Kubernetes Services (AKS) | Hosts the microservice and cron jobs                           | [Documentation](https://azure.microsoft.com/en-us/products/kubernetes-service/) |


### Altinn Services
| Service                     | Purpose                                              | Resources                                                          |
| --------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------ |
| Altinn Authorization        | Authorizes access to the API                         | [Repository](https://github.com/altinn/altinn-authorization)       |



### .NET Libraries
Notifications microservice takes use of a range of libraries to support the provided functionality. 

| Library                 | Purpose                                 | Resources                                                                                                                                 |
| ----------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| AccessToken             | Used to validate tokens in requests     | [Repository](https://github.com/altinn/altinn-accesstoken), [Documentation](../../../authentication/architecture/accesstoken/)            |
| JWTCookieAuthentication | Used to validate Altinn token (JWT)     | [Repository](https://github.com/Altinn/altinn-authentication),  [Documentation](../../../authentication/architecture/jwtcookie/)          |
| Npgsql                  | Used to access the database server      | [Repository]( https://github.com/rdagumampan/yuniql ), [Documentation](https://www.npgsql.org/)                                           |
| Yuniql                  | DB migration                            | [Repository](https://github.com/rdagumampan/yuniql), [Documentation](https://yuniql.io/)                                                  |

[A full list of NuGet dependencies is available on GitHub](https://github.com/Altinn/altinn-events/network/dependencies).

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

    [See section on running the application locally](#run-on-local-machine) if further assistance is required in 
    running the integration tests.

### Automated tests 
[The automated test project is available on GitHub](https://github.com/Altinn/altinn-notifications/tree/main/test/k6)

The automated tests for this micro service are implemented through [Grafana's k6](https://k6.io/). 
The tool is specialized for load tests, but we do use it for automated API tests as well. 
The test set is used for both use case and regression tests. 

#### Use case tests
[All use case workflows are available on GitHub](https://github.com/Altinn/altinn-notifications/tree/main/.github/workflows)

Use case tests are run every 15 minutes through GitHub Actions. 
The tests run during the use case tests are defined in the k6 test project. 
The aim of the tests is to run through central functionality of the solution to ensure that it is running and available to our end users.

#### Regression tests 
[All regression test workflows are available on GitHub](https://github.com/Altinn/altinn-notifications/tree/main/.github/workflows)

The regression tests are run once a week and 5 minutes after deploy to a given environment.
The tests run during the regression tests are defined in the k6 test project. 
The aim of the regression tests is to cover as much of our functionality as possible, 
to ensure that a new release does not break any existing functionality. 

## Hosting

### Web API 
The microservice runs in a Docker container hosted in AKS, 
and it is deployed as a Kubernetes deployment with autoscaling capabilities

The notifications application runs on port 5090. 

See [DockerFile](https://github.com/Altinn/altinn-notifications/blob/main/Dockerfile) for details.

### Azure Functions

### Database
The database is hosted on a PostgreSQL flexible server in Azure. 

## Build & deploy

### Web API 
  - Build and Code analysis runs in a [Github workflow](https://github.com/Altinn/altinn-notifications/actions)
  - Build of the image is done in an [Azure Devops Pipeline](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=383)
  - Deploy of the image is enabled with Helm and implemented in an [Azure Devops Release pipeline](https://dev.azure.com/brreg/altinn-studio/_release?_a=releases&view=all&definitionId=49)

### Azure Functions
   - Deploy of the cron jobs is enabled with Helm and implemented in the same pipeline that deploys the web API.


### Database
  - Migration scripts are copied into the Docker image of the web API when this is build
  - Execution of the scripts is on startup of the application and enabled by [YUNIQL](https://yuniql.io/)


## Run on local machine
Instructions on how to set up the service on local machine for development or testing is covered by 
[the README in the repository](https://github.com/Altinn/altinn-events). 