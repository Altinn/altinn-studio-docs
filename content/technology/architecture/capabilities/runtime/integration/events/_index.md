---
title: Event capabilities
description: Description of the event capabilities for Altinn Apps and Altinn Platform.
toc: false
tags: [architecture, events]
toc: true
aliases:
  - /teknologi/altinnstudio/architecture/capabilities/runtime/integration/eventcapabilties
---

The new generation of Altinn is moving to an [event-driven architecture](https://en.wikipedia.org/wiki/Event-driven_architecture). 
In this context, this means that applications (digital services) running in Altinn Apps will publish events that
application owners (agencies) and parties(citizens and businesses) can subscribe to and react to.

This page is focused on capabilities. If you are interested in more details about the components and construction
see [Event Solution Components](../../../../components/application/solution/altinn-platform/events/) and [Event Construction Components](../../../../components/application/construction/altinn-platform/).

## Overall Concept

In Altinn there will over time be thousands of different digital services deployed to Altinn Apps.
Those digital services will be accessed by the citizens and businesses in Norway. 

They will receive and submit data to/from the entity that is responsible for the digital service and others using the platform. 
![Event concept](concept.svg "Event concept")

The event architecture would make it possible to get notified when there are events in the platform related to data that the different actors have an interest in.
It could be anything from the digital service (app) owner being notified that a citizen has completed a form, to that the citizen is informed that there is a new form he needs to fill out.

### Events

Events would be a combination of standard events defined by the platform and
custom events added in an application by application developers.

The events will typically only contain information about that an event has happened with a reference
to some data that was changed because of that event. 

**Standard app events**

- An instance is created
- An instance changes state (from one process task to another, example: data -> signing)
- An instance is completed

**Custom events could be**

- A user has asked for a deduction in a form
- A specific validation of data failed

**Event attributes**

Events would typically have some attributes used for filtering. 

- [source] - This is the application that created the event. Currently, there are apps deployed to Altinn Apps
- [type] - The type of event. Created, completed
- [subject] - Who is the owner of the data related to the event.
- ++. Free text not locked to a schema.

An event will contain a limited set of information. To get the full details for an event the consumer would need to get all details using APIs.

### Event Producers

#### Applications running in Altinn Apps

Applications hosted in the Altinn Apps infrastructure would be the most common producer of events in the beginning.

The standard App template contains code for publishing standard events to the events component.
The following standard events published by an app is

- app.instance.created : [When a instance is created](https://github.com/Altinn/altinn-studio/blob/cc9e569450d2528902ce402c8557440720368a12/src/Altinn.Apps/AppTemplates/AspNet/Altinn.App.Api/Controllers/InstancesController.cs#L617).
- app.instance.process.movedTo.{TaskId}  : [When a process is moved to a specific task](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/Altinn.App.Api/Controllers/ProcessController.cs#L605)
- app.instance.process.completed : [When a process is complete](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/Altinn.App.Api/Controllers/ProcessController.cs#L605) 

The application template will contain API so logic in applications can publish events based on rules defined by the developer.

These app events could be anything, and could also be triggered by other external systems through custom APIs in the app.

[See code example](https://altinn.github.io/docs/altinn-studio/app-creation/configuration/events/#pushe-egendefinerte-events-i-applikasjonen-din)

#### Other producers

Altinn Events together with Altinn Authorization has the potential to be the national event hub for Norway.

The possibility to have Altinn Authorization to authorize access to events gives great possibilities not
available from other event platforms.

In the future, several other Event producers could be added. Examples could be

- Altinn 2 ServiceEngine: Reducing the need for polling to the current platform
- Altinn 2 Authorization: Information about changes on rights
- National Register: Informing- Other agency specific applications
- Private sector applications
 about register changes
- Other national components

Only the imagination limits whats is possible in the future. This is followed up in [this issue](https://github.com/Altinn/altinn-studio/issues/4727).

### Event consumers

#### Orgs (application owners)

Orgs will need to know about events happening in their apps in Altinn.

For some orgs there is a need for subscribing to events for a specific app, others might want to subscribe to all events, or maybe a specific type of event.

#### Parties (persons and organizations)

Parties submitting and receiving data in Altinn would benefit from knowing about events. This could be feedback has been added to a form, or that a new message has been received.

In many cases, parties use professionals to handle their data in Altinn. These professionals typically have many hundred or thousands of clients.

Currently we only support persons and consumers. They need to be authenticated through ID-porten to set up a subscription for themself.

Before any event is pushed, the consumers access to the source of the event is authorized.

## Requirments

The following requirements were identified for the new event architecture in Altinn 3.

- It should be possible to subscribe to a specific type of event. (Example all `app.instance.process.completed` events for a given app)
- It should be possible to go at least 3 months back in history when searching for events through API.
- The consumer will keep track of which events the consumer has processed.
- The architecture should support more than 10 000 publishers.
- The architecture should support more than 1 000 000 consumers.
- The architecture should support more than 500 000 000 events a year.
- Access to events should be authorized. Accessing an event for a party requires that the consumer has the correct role 
- Before pushing events to a subscriber endpoint the push functionality need to authorize the subscriber for the event

See also [Referansearkitektur for datautveksling](https://nasjonal-arkitektur.github.io/architecture-repository/data-exchange-ra/book-data-exchange-ra.html)

## Event Principles and pattern

During the analysis, the following principles and pattern has been applied

### Small events
- The events will only contain a small amount of data. If more information is needed this is available from the resource itself
- Every event links to the resource affected by the event. 
- We use CloudEvent as the format. 

### Prefer push of events to consumers

The preferred consumption of events is through subscription and subscriber endpoints where Altinn Events pushes
the events to a subscriber webhook.

### Support retry of push

The push functionality needs to support retry of pushing events if the subscriber endpoint is unavailable.

### Expose events through REST-API

- The use of REST-API ensures low complexity for consuming events
- REST-API URLs and parameters are uses for filtering

### Consumers keep track of their status
- Consumers will keep track of their status when using events API for consumption of events.

### Events do not change

- Events for a resource are never changed. A new event can revert the effect of an earlier event
  
 ### Events are stored for a limited time

 - Events will be available for 3 months through API.

## Event Architecture

As part of the Altinn 3 solutions there is defined a event architecture to support the above requirements and capabilities. 

### Event Schema

The Altinn 3 will use the defined [CloudEvents](https://cloudevents.io/) specification to describe events in Altinn Apps and Altinn Platform.

The reason for choosing cloud events are

- It is a standardized and open format as preferred by our architecture principles
- It backed by many and The specification is now under the [Cloud Native Computing Foundation](https://www.cncf.io/)
- It is flexible so it would support scenarios in the future


Below you find a offical example. [See full JSON Schema](https://raw.githubusercontent.com/cloudevents/spec/master/spec.json)

```json
{
    "specversion" : "1.x-wip",
    "type" : "com.github.pull.create",
    "source" : "https://github.com/cloudevents/spec/pull",
    "subject" : "123",
    "id" : "A234-1234-1234",
    "time" : "2018-04-05T17:31:00Z",
    "comexampleextension1" : "value",
    "comexampleothervalue" : 5,
    "datacontenttype" : "text/xml",
    "data" : "<much wow=\"xml\"/>"
}
```

- `specversion`: The version of the CloudEvents specification which the event uses. This enables the interpretation of the context.
  Compliant event producers MUST use a value of 1.x-wip when referring to this version of the specification.
- `type`: This is the event type. Examples: instance.created, instance.process.paymentcompleted, instance.process.completed
- `source`: Describes what the event is related to. Will be used to filter event types. For an app it would typical be /{org}/{app}/{partyId}/{instanceGuid}.
  This would be used for consumers to look up a given instance.
- `subject`: The party the event is related to. PartyID is used.
- `id`: Unique id for a given event.
- `time`: The time the event was triggered. Set by the publisher.
- `datacontenttype`: Optional. Content type of data value.
  This attribute enables data to carry any type of content, whereby format and encoding might differ from that of the chosen event format
- `data`: Optional. Can contain a structure of data specific for an event type.


In addition to the spec there is added alternativesubject as an [extension](https://github.com/cloudevents/spec/blob/master/primer.md#cloudevent-attribute-extensions) to the event model.
This will be used for socical secuirty number, organization number or other identifier in addition to the partyId found in subject property.

Currently this can be

- fnr : social security number (11 digits)
- org: organization number (9 digits)

The value will be prefixed

#### Example 1

A instance has been created for a given party. It is not possible from the event itself to know who did it.

```json {hl_lines=[3]}
[{
  "source":  "https://skd.apps.altinn.no/skd/skattemelding/instances/1234324/6fb3f738-6800-4f29-9f3e-1c66862656cd",
  "subject": "party/1234324",
  "type": "app.instance.created",
  "time": "2020-02-20T08:00:06.4014168Z",
  "id": "91f2388f-bd8c-4647-8684-fd9f68af5b14",
  "alternativesubject": "/person/01038712345"
}]
```


##### Example 2

A user has completed the confirmation1 task in the process.

```json {hl_lines=[4]}
[{
  "source":  "https://skd.apps.altinn.no/skd/skattemelding/instances/234234422/2acb1253-07b3-4463-9ff5-60dc82fd59f8",
  "subject": "party/234234422",
  "type": "app.instance.process.movedTo.confirmation1",
  "time": "2020-03-16T10:23:46.6443563Z",
  "id": "91f2388f-bd8c-4647-8684-fd9f68af5b14",
  "alternativesubject": "/org/974760673"
}]
```

##### Example 3

A user/system has completed the process for an instance.

```json {hl_lines=[4]}
[{
  "source":  "https://skd.apps.altinn.no/skd/skattemelding/instances/234234422/2acb1253-07b3-4463-9ff5-60dc82fd59f8",
  "subject": "party/234234422",
  "type": "app.instance.process.completed",
  "time":  "2020-02-20T09:06:50.3736712Z",
  "id": "91f2388f-bd8c-4647-8684-fd9f68af5b14",
  "alternativesubject": "/org/974760673"
}]
```

### Event components

The below diagram shows the different components in the proposed Event Architecture for Altinn 3.

![Event architecture diagram](event_architecture_custom.svg "Altinn Event Architecture")

More details can be in [solutions components](../../../../components/application/solution/altinn-platform/events/) with detailed API info of event component 
and in [construction components](../../../../components/application/construction/altinn-platform/events/) you find the technical details how the components are constructed.


## Delegating access to events

There are serveral user scenarios when there is a need to delegate access to the events for a given party to another user/organisation.

### Delegating Org access

For orgs (application owners) there might be some scenarios where they want to give access to events for a given application.
This delegation is done through Maskinporten.

### Delegating party event access

In general, access to events for a given party will be authorized based on roles the requesting organization/user
have for the subject of the event.


## Event Analytics

With a new event architecture it is possible imagine that we can run analytics on the events to give
important insight in to the data in the platform. 

Example
- How many instances is created for the different applications
- How long time does each task take to complete
- Is there any relationship between apps. 

![image](https://user-images.githubusercontent.com/13309071/119110077-0c1fd800-ba22-11eb-8ba9-c26b03c734ba.png)

This is analyzed in the following [issue](https://github.com/Altinn/altinn-studio/issues/4555)

## Altinn Platform Events as a national event hub

The event capabilities in Altinn Platform is possible to use outside Altinn Apps and Altinn Platform similar to
how Altinn Authorization is used by external wihout deploying any digital services to the platform.

How this should work is not analyzed and specified yet. The issue is found [here](https://github.com/Altinn/altinn-studio/issues/4727)

## Other event concepts in the platform

Events are used in different scenarios in the platform.

- **Instance Events** - Events that happen on a given instance.
  It could be created, saved, ++ This is stored to cosmos DB. The number of details in these events is higher than we would put on an event feed.
  See [Instance Events](/technology/architecture/components/application/solution/altinn-platform/storage/#instanceevent) in Storage
- **Application logic events** - These are events where app developers could implement logic to get a specific behavior.
  Calculation, validation ++ This type of event is probably not relevant to push to the event feed.  
