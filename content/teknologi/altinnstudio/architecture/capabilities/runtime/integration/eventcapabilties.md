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

Events would have some attributes

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

##### Example 1

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

## Other event concepts in the platform

Events are used in different scenarios in the platform.

- Instance Events - Events that happen on a given instance. It could be created, saved, ++ This is stored to cosmos DB. The number of details in these events is higher than we would put on an event feed. 
- Application logic events - This is events where app developers could implement logic to get a specific behavior. Calculation, validation ++ This type of event is probably not relevant to push to the event feed.  

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

This is used by end user to see events for a given party.
This will list all changes for a given party.

##### Endpoint

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



##### Authorization




```http
{platformurl}/events/instanceevents/{org}/{app}?from={lastchange}
```




### Querying



###TODO How to get the correct order?






As part of platform we would need to introduce an "event component" that does the following.
The component could be Azure functions. This seems to be [supported](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs-trigger?tabs=csharp). 

- Subscribe to Event Hub or topic in Event Grid
- Analyze events and store events with partyID as a partition key to Cosmos DB collection. org/app/instanceid need to be part of the event.
- Expose event API 
- Filter API based on created profiles. 
  - org or key role person have access to all events
  - REGN or LEDE has a profile where the API filter on som predefined events. 


{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/capabilities/runtime/integration/event_architecture_full.svg" type="image/svg+xml" style="width: 200%;  max-width: 700px;"></object>
{{% /excerpt%}}

[Full size](/teknologi/altinnstudio/architecture/capabilities/runtime/integration/event_architecture_full.svg)


## To be analyzed and clarified
Before the final solution can be defined the following needs to be clarified

### Functional 

- Do org want to pull or push events
- Is 7 days retention time enough if they are given the ability to search on older events (with low throughput)
- Define data model for events. The assumption is to follow [Azure Event Grid](https://docs.microsoft.com/en-us/azure/event-grid/event-schema) event schema
- How to we filter events for party. Should we support events that should not be sent to end user, only org. Like "fraud detection". 
- Do we need to support pushing events to event grid
- Is it a problem that one org knows about other orgs events? (Probably)


### Technical

- Event Hub: How many hubs are needed?
  - One Hub for the whole solution
  - One Hub per Org?
  -  One Hub per App/Org?
- Do we need one Azure function for each Event Hub?
- What kind of automatic filtering can we do based on roles for a requester to event API.
- Is there a standard for REST API to expose events we should follow.  
-  Event Hub:  Which subscription should be used? (probably one hub per org and put under the orgs subscription)
- Event Hub: Should we capture the events to storage? (org storage)
- Event Grid: Do we need to handle dead letters or should we ask org to check against db?


### Tasks
The following task are identified (depending on choosen solution )

- Infrastructure: Create scripts for event hub configuration
- Infrastructure: Create scripts for event grid
- Infrastructure: Create a way for org so get SAS keys
- Platform: Build event component with needed api.
- Storage: Create event collection in cosmos
