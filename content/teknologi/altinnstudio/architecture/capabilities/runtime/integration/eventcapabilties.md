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
Events in the new platform would be a combination of standard events defined by the platform and custom events added in an application by application developers. 

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

**Example events**

```bash
2020-08-10T21:03:07+00:00 nav/kontonr/84356677/2c1c5395-0f98-4054-8cbf-bbb1ece09a25 ProcessCompleted

2020-08-10T22:03:07+00:00 skd/skattemelding/234234422/2acb1253-07b3-4463-9ff5-60dc82fd59f8 InstanceCreated

2020-08-10T28:03:07+00:00 nav/sykemelding/56234234/2c1c5395-0f98-4054-8cbf-bbb1ece09a25 ProcessCompleted

2020-08-10T45:03:07+00:00 ssb/lakselus/63463336/9add6388-647e-434c-94d9-00d272e2a1e3 DataTaskCompleted

2020-08-11T21:03:07+00:00 skd/skattemelding/234234422/2acb1253-07b3-4463-9ff5-60dc82fd59f8 DataTaskCompleted

2020-08-12T23:03:07+00:00 hdir/corona/1523456/9add6388-647e-434c-94d9-00d272e2a1e3 InstanceDeleted

2020-08-12T23:03:07+00:00 skd/skattemelding/234234422/2acb1253-07b3-4463-9ff5-60dc82fd59f8 ProcessCompleted

2020-08-12T24:02:07+00:00 skd/skattemelding/234234422/2acb1253-07b3-4463-9ff5-60dc82fd59f8 FeedbackAdded

2020-08-12T25:03:07+00:00 skd/amelding/234234422/2acb1253-07b3-4463-9ff5-60dc82fd59f8 FraudDetected
```

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
Example

```json
[{
  "id": "91f2388f-bd8c-4647-8684-fd9f68af5b14",
  "eventType": "InstanceCreated",
  "topic":  "skd/skattemelding/234234422/2acb1253-07b3-4463-9ff5-60dc82fd59f8",
  "subject": "234234422",
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


## Possible solutions

### Custom REST API & Cosmos DB
Currently, there exists no API where orgs or end users can query events without knowing the instanceid where the event happened. 
For orgs this is impossible to use directly since instanceid is not known

There is create a issue for analyze and implement the needed API's  [#3783](https://github.com/Altinn/altinn-studio/issues/3783) 

### Azure Event Hub
Azure Event Hub is an Event ingestion service.  It can receive and process millions of events per second. 

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
There exist client library for [Java](https://github.com/Azure/azure-event-hubs-java) and [.Net](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/eventhub/Microsoft.Azure.EventHubs)

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


#### Event Filtering
A subscription can have a filter on subject or event type. Or Even the data. Meaning that subscribers could have on system handling just some specific events. 

#### Subscribers
The subscribers need to have a web hook endpoint.  Event Grid will then post the event to the given URL. If not available it will [try up to 1400 minutes](https://docs.microsoft.com/en-us/azure/event-grid/manage-event-delivery).  (24 hours) 

#### Pro
- Subscribers can filter on topics
- Dead letter possiblities

#### Cons
- Need to have a active endpoint where events could be sent
- Not able to support topic per party.

### Apache Kafka in Azure HDInsight
Apache Kafka is an open-source distributed streaming platform that can be used to build real-time streaming data pipelines and applications. Kafka also provides message broker 
functionality similar to a message queue, where you can publish and subscribe to named data streams. 

Apache Kafka kan be deployed in to a HDInsight cluster. [See details](https://docs.microsoft.com/en-us/azure/hdinsight/kafka/apache-kafka-introduction)

Producers would send events to Kafka Brokers. In a HD-insight cluster each worker nod is a Kafka broker.

![image](../kafka.png)


#### Quotas

| Resource | Limit |
| --- | --- |
| Topics per kafka cluster  | 2000-3000 |
| Retention time  | up to unlimited|


#### Pro
- Most popular event streaming platform.
- Can store events indefently 

#### Cons
- Cost of HDInsight cluster
- Requires more admin compared to other platforms in Azure
- Not able to support topic per party.

### Custom + Event Hub / Grid
To support scenarios where parties subscribe to events related to own or client parties we would need to build a custom solution. 

The reason for this is
- Events can contain information that is sensitive. (Events needs to be isolated between parties, and also inside same party there might be different access rights to events)
- Event Hub or Event Grid does not have the capacity to the amount of isolated feeds or topic to support the millions of parties

#### Proposed Concept
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
- 



### Tasks
The following task are identified (depending on choosen solution)

- Infrastructure: Create scripts for event hub configuration
- Infrastructure: Create scripts for event grid
- Infrastructure: Create a way for org so get SAS keys
- Platform: Build event component with needed api.
- Storage: Create event collection in cosmos
