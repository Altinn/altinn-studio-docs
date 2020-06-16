---
title: Event capabilites
description: Description of the event driven architecture for Altinn Apps and Altinn Platform
tags: [architecture]
weight: 100
linktitle: Publish & Subscribe
alwaysopen: false
---

{{%notice warning%}}
This is work-in-progress. The event driven architecture is still in analysis.
{{% /notice%}}

The new generation of Altinn is moving to an event-driven architecture. This means that Altinn Platform and Altinn Apps
will publish events that organizations and parties(citizens and businesses) can subscribe to.

## Overall Concept

### Events

Events in the new platform would be a combination of standard events defined by the platform and 
custom events added in an application by application developers. 

Standard events could be

- An instance is created
- An instance changes state (moving from one task to another, example: data -> signing)
- An instance is completed

Customs event could be

- A user have asked for a deduction in a form
- A specific validation of data failed

Events would typical have some attributes

- [org] - The organization the event is created for
- [app] - The app the event is created for
- [instanceid] - The instanceid
- [eventtype] - The type of event. created, completed ++++ Probably something we want as free text.

The event would contain limited set of information. To get the full details the subscriber would need to get all details from instance / instance event api. 

#### Event Schema

The event would be a JSON object. The event schema would need to be defined. One option is to use [Azure Event Grid](https://docs.microsoft.com/en-us/azure/event-grid/event-schema) event schema

```json
[
  {
    "topic": string,
    "subject": string,
    "id": string,
    "eventType": string,
    "eventTime": string,
    "data":{
      object-unique-to-each-publisher
    },
    "dataVersion": string,
    "metadataVersion": string
  }
]
```

- Topic: This describes what the event is related to. Will be used to filter event types. For an app it would typical be /{org}/{app}/{partyId}/{instanceGuid}. This would be used for the subscribers to look up a given instance.
- Subject: The party the event is related to. PartyID is used
- id: unique Id for a given event
- eventType: This is the event type. Examples: Instance:Instansiated, Instance:PaymentCompleted, Instance:ProcessCompleted
- eventTime: The time of the event. Set by the publisher
- data can contain a structure of data
- dataVersion
- metdataversion

##### To be discussed

- Is partyID ok for the subscribers ok to be returned?
- Should eventTime be set by event component or publisher

##### Example 1

A form has been created for a given party. It is not possible from the event itself to know who did it

```json
[{
  "id": "91f2388f-bd8c-4647-8684-fd9f68af5b14",
  "eventType": "Instance:Created",
  "topic":  "skd/skattemelding/234234422/2acb1253-07b3-4463-9ff5-60dc82fd59f8",
  "subject": "party:234234422",
  "eventTime": "2017-08-10T21:03:07+00:00",
  "data": {
     },
  "dataVersion": "1.0"
}]
```

##### Example 2

A user has completed the confirmation task in the process.

```json
[{
  "id": "91f2388f-bd8c-4647-8684-fd9f68af5b14",
  "eventType": "Instance:ConfirmationCompleted",
  "topic":  "skd/skattemelding/234234422/2acb1253-07b3-4463-9ff5-60dc82fd59f8",
  "subject": "party:234234422",
  "eventTime": "2020-09-14T32:03:07+00:00",
  "data": {
     },
  "dataVersion": "1.0"
}]
```

##### Example 3

A user/system has completed the process for an instance

```json
[{
  "id": "91f2388f-bd8c-4647-8684-fd9f68af5b14",
  "eventType": "Instance:ProcessCompleted",
  "topic":  "skd/skattemelding/234234422/2acb1253-07b3-4463-9ff5-60dc82fd59f8",
  "subject": "party:234234422",
  "eventTime": "2020-03-19T55:03:07+00:00",
  "data": {
     },
  "dataVersion": "1.0"
}]
```

### Event Producers

#### Altinn Platform

Storage is probably the one component that would create the most standard events. 

This could be events for the creation of instances when instances state is updated and so on. We would need to define what kind of standard events storage should create. 

The assumption is that all process change events logged to instance events in storage would be published to the event architecture with limited information.

#### Altinn Apps

Applications hosted in Altinn Apps would be able to create events.

The application template will contain API so logic in event can publish events based on rules defined by the application developer. 

This events could be anything.

### Event subscribers

#### Orgs (Application owners)

Orgs will need to know about events happening for their applications running in Altinn Apps.

For some orgs there is a need for subscribing to events for a specific app, others might want to subscribe to all events, or maybe a specific type of event.

#### Parties (Persons and organizations)

Parties submitting and receiving data in Altinn would benefit from knowing about events. This could be feedback has been added to a form, or a new message has been received.

In many cases, parties use professionals to handle their data in Altinn. These professionals typically have many hundred or thousands of clients.

## Proposed Event Architecture

To reduce complexity for clients and reduce lock in to a specific product the proposed solutions is to build
a event component in Altinn Platform.

The Event Component will expose REST-APIS.

### API Structure

The API's will be structured so the URLs are filtered quieries in to the events

#### Instances events for Org

##### Endpoint

```http
get {platformurl}/events/instanceevents/{org}/{app}?storedfrom={lastchange}
```

##### Usage

This will be used by applications owners to identify changes on instances for their applications.

##### Authorization

We will use scopes from Maskinporten to authorize access. In this way it should also be possbile for a org to delegate access to events for a given org/app.

TODO: Is it possible?

#### Party events

#### Endpoint

```http
post {platformurl}/events/instanceeventsforparty/
```

This returns the events for a given party identified with a personnumber or organizationnumber.

```json
{
    "appId" : "org/app",
    "party": {
        "personNumber": "12247918309",
        "organisationNumber": null
    },
    "storedAfter": "2019-06-01T12:00:00Z",
  
```

##### Usage

This is used by end user to see events for a given party.
This will list all changes for a given party.

##### Authorization

Events needs to be authorized. To be able to read events, you need to have the read right for the given app for the given party.

The topic and subject would be used to identify the correct XACML Policy to use. 

Operation would be read and process task will be set to null.
This way there would be no need to verify the current state of a element.

### Event components

The below diagram shows the different components.


{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/capabilities/runtime/integration/event_architecture_custom.svg" type="image/svg+xml" style="width: 100%;"></object>
{{% /excerpt%}}

[Full screen](/teknologi/altinnstudio/architecture/capabilities/runtime/integration/event_architecture_custom.svg) 


#### Publishers

Both different applications and components will publish events to the Event component in Altinn Platform.

They will use a REST API call to post a new event to the add event API.

#### Event Component

The event components exposes REST-APIS for publishing and subscribing to events.

When a publish request is received it will push the event document to the event storage.

When a request is received it will query the documents.

### Event Storage

Using cosmos DB gives the possiblity to have "endless" number of topics/feeds based on queriries.

Based on filters on the db query you could get a endles amount of feeds containg events with specific criteria.

#### To be clarified

#### Ordering

When a document is stored to Cosmos DB it has a _ts property created. This contains information about when it was last changed.

This is stored as a epoch time. (Seconds since January 1. 1970)

##### Order by Cosmos DB Timestamp

If we decide to order the feed based on TS we will not know inside a second which event that comes first.

We would also need to prevent that the feed is not complete for the latest second when retrieved.

As example lets say that at time a 1582113506 subscriber request the feeds. At that time the following is stored and can be returned.

- 1582113500 - Event A
- 1582113500 - Event B
- 1582113500 - Event C
- 1582113501 - Event D
- 1582113503 - Event E
- 1582113504 - Event F
- 1582113504 - Event G
- 1582113505 - Event H
- 1582113505 - Event I
- 1582113506 - Event J
- 1582113506 - Event K
- 1582113506 - Event L

If we returns this elements the subscribers could think that all ements inside 1582113506 is included. But the truth may be that just milliseconds later the

- 1582113506 - Event M  
- 1582113506 - Event N  

Was added.  Requesting events with _ts > 1582113506 would cause loosing M and N

To prevent this we could always remove events connected to the newest second stored. The problem is when filtering is used and all events are old. How to decide if filtering is set so that all events can be included

##### Order by CreatedDateTime set by event component

If we assume that pods in the same cluster have the same time, we could have a strategy that set at createdData time for the event when the 
event component is storing the event to cosmos db.

As example lets say that at time a 2020-02-19T13:59:27.8453654 subscriber request the feeds. At that time the following is stored and can be returned.

- 2020-02-19T13:59:21.9777054Z - Event A
- 2020-02-19T13:59:21.5777054Z - Event B
- 2020-02-19T13:59:21.3757054Z - Event C
- 2020-02-19T13:59:22.9777054Z - Event D
- 2020-02-19T13:59:24.9777054Z - Event E
- 2020-02-19T13:59:25.9777054Z - Event F
- 2020-02-19T13:59:25.9777054Z - Event G
- 2020-02-19T13:59:26.9777054Z - Event H
- 2020-02-19T13:59:27.2345054Z - Event I
- 2020-02-19T13:59:27.4563454Z - Event K
- 2020-02-19T13:59:27.8453554Z - Event K

But because of a theoretical delay the following event could been inserted after.

- 2020-02-19T13:59:27.8353554Z - Event L


##### Order by a event counter in document

In this option we need to be able to add a global counter to the documents in the order they are inserted. 

This could theoretical be done in a function reading the change log.

This will cause scalability issues.


### Tasks
The following task are identified (depending on choosen solution )

- Infrastructure: Create scripts for event hub configuration
- Infrastructure: Create scripts for event grid
- Infrastructure: Create a way for org so get SAS keys
- Platform: Build event component with needed api.
- Storage: Create event collection in cosmos


## Other event concepts in the platform

Events are used in different scenarios in the platform.

- Instance Events - Events that happen on a given instance. It could be created, saved, ++ This is stored to cosmos DB. The number of details in these events is higher than we would put on an event feed. 
- Application logic events - This is events where app developers could implement logic to get a specific behavior. Calculation, validation ++ This type of event is probably not relevant to push to the event feed.  
