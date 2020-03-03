---
title: Event capabilites
description: Description of the event driven architecture
tags: [architecture]
weight: 100
linktitle: Publish & Subscribe
alwaysopen: false
---

{{%notice warning%}}
This is work-in-progress. The event driven architecture is still in analysis.
{{% /notice%}}


The new generation Altinn is moving to an event driven architecture. This means that Altinn Platform and Altinn Apps will publish events that 
organizations and parties(citiezens and businesses) can subscribe to. 

## Overall Concept

### Events
Example events can be
- A instance is created
- A instance changes state
- A instance is completed
- A custom event happens in app. (can be anything a developer defines)

Events would have some attributes

[org] - The organization the event is created for
[app] - The app the event is created for
[instanceid] - The instanceid 
[eventtype] - The type of event. created, completed ++++ Probably something we want as free text.

Example
skd/skattemelding/234234/GSFDSG3gesgsrgsdr Created
skd/skattemelding/234234/GSFDSG3gesgsrgsdr Completed

### Event Producers
Applications hosted in Altinn Apps would be able to create events. We probably need to add some way that app developers with little effort can create custom event that is logged to "event feed"

Platform components would create events. Storage is probably the one that would create most event. This could be events for creation of instances and so on. 

The assumption is that all process change event logged to instance events in storage would be published to the event architecture. 

### Event subscribers

#### Orgs (Application owners)
Application will need to know about events happening for their applications running in Altinn Apps. 

For some orgs there is a need for subscribing to events for a specific apps, other might want to subsribe to all events, ore maybe a specific type of event. 

#### Parties
Parties submitting and receiving data in Altinn would benefit from knowing about events. This could be a feedback has been added to a form, or a new message has been received. 

In many cases parties uses professionals to handle their data in Altinn. Those professionals typical have many hundred or thousands of clients. 


## Other event concepts in the platform
Events are used in different scenarios in the platform.

- Instance Events - Events that happen on a given instance. It could be created, saved, ++ This is stored to cosmos DB. This could be relevant to push to the event feed.
- Application logic events - This is events where app developers could implement logic to get a specific behavoiour. Calculation, validation ++ This types of event is probably not relevant to push to the event feed. 


## Possible solutions

### REST API & Cosmos DB
Currently there exist no API where orgs or end user can query events without knowing the instanceid where the event happened. For orgs this is impossbile to use directlyt since instanceid is not known

There is create a issue for analyze and implement the needed API's  #3783 

### Azure Event Hub
Azure Event Hub is a Event ingestion service.  It can receive and process millions of events per second. 

Each Subscription can have 100 Event Hub Namespaces
Each Namespace can have 10 Event Hubs

Meaning for each Subscription we can have 1000 Event Hubs,

![image](https://user-images.githubusercontent.com/13309071/75520779-a43d3600-5a06-11ea-94d7-c2b0fe856e8a.png)

Subscribers to Hubs use [AMQP 1.0](https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol)  protocol to read the event feed. 

#### Event format data
The events can be any JSON format or text

#### Event filtering
There is no way to filter events before they are read at the subscriber. 

#### Subscribers
Subscribers need to have a SAS key for accessing the event hub. 

The client needs to use AMQB 1.0 standard. 

#### To be Analyzed
- Is it a problem that one org knows about other orgs events? (Probably)
- How many hubs is needed?
  - One Hub for the whole solution
  - One Hub per Org?
  -  One Hub per App/Org?
- Which subscription should be used? (probably one hub per org and put under the orgs subscription)
- What time of time retention is needed?
- Should we capture the events to storage? (org storage)
- Is event hub a solution to give parties their own feed? Probably not the number of event hubs would be limited, and we would not be able to share feeds between parties. 


### Azure Event Grid
Event Grid is an eventing backplane that enables event-driven, reactive programming. It uses a publish-subscribe model. Publishers emit events but have no expectation about which events are handled. Subscribers decide which events they want to handle.

Azure Event Grid can listen to an event for Azure Services, but in our scenario, Altinn Apps and Altinn Platform would create custom events that they post to topics. 

Systems can subscribe to different topics. 

![image](https://user-images.githubusercontent.com/13309071/75542052-5254da00-5a1f-11ea-8685-47e4b51d683a.png)

Event Grid supports dead-lettering for events that aren't delivered to an endpoint.

#### Quotas

| Resource | Limit |
| --- | --- |
| Custom topics per Azure subscription | 100 |
| Event subscriptions per topic | 500 |
| Publish rate for a custom topic (ingress) | 5,000 events per second per topic |
| Publish requests | 250 per second |
| Event size | 1 MB (charged in as multiple 64-KB events) |

#### Event format data
The events needs to follo the [Azure Event Grid](https://docs.microsoft.com/en-us/azure/event-grid/event-schema) event schema

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


```json
[{
  "id": "1807",
  "eventType": "recordInserted",
  "subject": "myapp/vehicles/motorcycles",
  "eventTime": "2017-08-10T21:03:07+00:00",
  "data": {
    "make": "Ducati",
    "model": "Monster"
  },
  "dataVersion": "1.0"
}]
```
#### Event Filtering
A subscription can have a filter on subject or event type. Or Even the data. Meaning that subscribers could have on system handling just some specific events. 

#### Subscribers
The subscribers need to have a web hook endpoint.  Event Grid will then post the event to the given URL. If not available it will [try up to 1400 minutes](https://docs.microsoft.com/en-us/azure/event-grid/manage-event-delivery).  (24 hours) 

#### To Be analyzed
- Is it a problem that one org can subscribe to topics that contains events for other orgs
- Do we need to handle dead letters or should we ask org to check against db?


### Pro & Cons
+ High t

### Custom 
To support scenarios where parties subscribe to events related to own or client parties we would need to build a custom solution. 

The reason for this is
- Events can contain information that is sensitive. (Events needs to be isolated between parties, and also inside same party there might be different access rights to events)
- Event Hub or Event Grid does not have the capacity to the amount of isolated feeds or topic to support the millions of parties

#### Proposes Concept
As part of platform we would need to introduce an "event component" that does the following.
The component could be Azure functions. 

- Subscribe to Event Hub or topic in Event Grid
- Analyze events and store events with partyID as a partition key to Cosmos DB collection. org/app/instanceid need to be part of the event.
  - TODO: Why cant we just reuse the already existing instance events? 
- Expose event API 
- Filter API based on created profiles. 
  - org or key role person have access to all events
  - REGN or LEDE has a profile where the API filter on som predefined events. 


{{%excerpt%}}
<object data="/teknologi/altinnstudio/architecture/capabilities/runtime/integration/event_architecture_full.svg" type="image/svg+xml" style="width: 200%;  max-width: 700px;"></object>
{{% /excerpt%}}

[Full size](/teknologi/altinnstudio/architecture/capabilities/runtime/integration/event_architecture_full.svg)