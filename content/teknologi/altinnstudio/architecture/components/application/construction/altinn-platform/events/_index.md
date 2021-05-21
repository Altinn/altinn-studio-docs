---
title: Application construction components - Altinn Platform Events
linktitle: Events
description: The Events component in Altinn platform is constructed as an asp.net core web API application deployed as a docker container to a Kubernetes cluster.
tags: [architecture, solution]
---


The Events components expose REST-APIs for publishing and subscribing to events. The Azure function are responsible for pushing events
to subscriber webhooks. The below diagram shows the components

![Event architecture diagram](/teknologi/altinnstudio/architecture/capabilities/runtime/integration/events/event_architecture_custom.svg "Altinn Event Architecture")

When a publish request is received it will push the event document to the event storage.
When a request is received it will query the events stored in the event storage.

## Api controllers

The following API controllers are defined

- [EventsController](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Events/Events/Controllers/EventsController.cs) : responsible for registrating events and pull of events for consumers.
- [PushController](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Events/Events/Controllers/PushController.cs) : responsible to validate if there is any subscriptions matching the event and if so authorize the subscriper before it pushes the event to the outbound queue
- [SubscriptionController](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Events/Events/Controllers/SubscriptionController.cs) : responsible for managing subscriptions for consumers.

### Eventscontroller

The eventscontroller in the Events component is the one receiving events from Apps and other sources. 

It verifies if the app is authorized to creates events for the given source and then store in to event storage


### Push Events controller

Push Events controller is called by the InboundEventsController. Based on details from the Event it will identify
matching subscriptions. For each match it will authorize the consumer using the Policy Authorization Point.

The [AuthorizationHelper]() is responsible for creating and performing the request.

## Event storage

To be able to get the search capability needed for the Events component we have choosen to use PostgreSQL.

Using PostgreSQL makes is possible to sort the events based on a primary key and also makes it possible to search
over all events based on subject or source. 

The suggested table structure 


```sql
CREATE TABLE events(
   sequenceno BIGSERIAL PRIMARY KEY,
   id VARCHAR NOT NULL,
   source VARCHAR NOT NULL,
   subject VARCHAR NOT NULL,
   type VARCHAR NOT NULL,
   time timestamptz NOT NULL,
   cloudevent TEXT NOT NULL
);
```


#### Event sequencing

Events will be sequnced by sequence number that is the primary key of the Events table. 

### Indexing

We would need to have index on 


## Functions

As part of the Event Component there is 3 [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/) used for pushing events to the consumers. Click on name for code.

 - [EventsInbound](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Events/Functions/EventsInbound.cs) : responsible for pushing new events to the push controller
 - [EventsOutbound](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Events/Functions/EventsOutbound.cs) : responsible for pushing event to consumer webhook
 - [ValidateSubscription](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Events/Functions/ValidateSubscription.cs) : responsible for validating the endpoint given in a subscription. 

### EventsInbound

The EventsInbound function is triggered by QueueStorage changes in the "events-inbound" queue.

It just forward the event to the PushController through the [pushEventService](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Events/Functions/Services/PushEventsService.cs).

The Function uses Platform Access token to authenticate itself for the PushController

It uses standard mechanismen for retry, if the call for pushcontroller fails.

### EventsOutbound

The EventsOutbound function is triggered byQueueStorage changes in the "events-outbound" queue.

It will try to push the event to given subscription endpoint given in the [CloudEventEnvelope](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Events/Functions/Models/CloudEventEnvelope.cs)
that is put on the queue and containing the event.

This function is configured with [CustomQueueProcessorFactory](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Events/Functions/Factories/CustomQueueProcessorFactory.cs) to handle retry if it is not possible to push event to the endpoint.

It will try send the event right away, but if the request to webhook fails it will put the cloudevent back on the queue with a
defined wait time.
1. retries after 10 seconds
2. retries after 30 seconds
3. retries after 1 minute
4. retries after 5 minutes
5. retries after 10 minutes
6. retries after 30 minutes
7. retries after 1 hour
8. retries after 3 hours
9. retries after 6 hours
10. retries after 12 hours
11. retries after 12 hours

If it fails the 12. time it will put the event in the dead letter queue and will not try again.

### SubscriptionValidation

The SubscriptionValidation function is triggered byQueueStorage changes in the "subscription-validation" queue.

It will try to validate the endpoing given in the [Subscription](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Events/Functions/Models/Subscription.cs)
that is put on the queue.

This function is configured with [CustomQueueProcessorFactory](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Events/Functions/Factories/CustomQueueProcessorFactory.cs) to handle retry if it is not possible to push event to the endpoint.

It will try send the event right away, but if the request to webhook fails it will put the cloudevent back on the queue with a
defined wait time.
1. retries after 10 seconds
2. retries after 30 seconds
3. retries after 1 minute
4. retries after 5 minutes
5. retries after 10 minutes
6. retries after 30 minutes
7. retries after 1 hour
8. retries after 3 hours
9. retries after 6 hours
10. retries after 12 hours
11. retries after 12 hours

If it fails the 12. time it will put the event in the dead letter queue and will not try again.

If endpoint responds with 200OK it will then set the subscription status to valid with calling the [validate](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Events/Events/Controllers/SubscriptionController.cs#L111) endpoint in the Subscription API.
