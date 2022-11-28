
---
title: Events
description: Description of the Events capabilities in Altinn 3.
toc: true
weight: 20
aliases:
 - /altinn-events/
---

{{% notice info %}}
In this section we want to communicate  </br> </br>
- what our goal is  </br> </br>
- what does events enable </br> </br>
- who can use events </br> </br>
- share the cloud event spec (and why we are using it (?))
{{% / %}}

## Design goals

Altinn Events was developed to make it easier for digital service developers to deliver dynamic and seamless user experiences, based on data from multiple systems of record. 

Altinn Events provides developers a simple route to adding event-driven architecture to their existing service-oriented applications.
Secure and scaleable, Altinn Events uses Publish/Subscribe concepts to loosely couple disparate systems without relying on polling or database replication.


## Main benefits

Reasons to consider using Altinn Events

_For event publishers_
1. Simple HTTP interface to publish events to, as they occur. 
2. Security, scalability, reliability and auditing built-in.

_For event subscribers_
1. No need to continuously poll for updates.
2. Simple API for creating and managing event subscriptions, including support for attribute-based filtering.
3. Reliable delivery with automatic retry logic means events will be buffered for you in case your webhook is unavailable for a period of time.
4. Built-in authorization policy execution ensures that your app won't receive irrelevant notifications. 


{{% notice info %}}

#### _Pub/Sub vs Event streaming_

There are two main event driven architecture models: [Pub/Sub and Event streaming](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven)

Altinn Events is based on the Pub/Sub model which has simpler delivery constraints than event streaming. In particular, Altinn Events does not guarantee in-order delivery, nor exactly once delivery.

Consequentially, developers should make every effort to process events idempotently and anticipate the possibility of out-of-order message delivery. 
 
{{% / %}}

## Terminology
#### What is an event?

An event is a lightweight notification message containing information about a single operation or state change for a specified entity. Each event is published by a single originator, referred to as the *event publisher* or *source*, on behalf of a single person, organization or asset, known as the *subject*. The operation or state change is referred to as the *event type*.

Technically, events are JSON documents conforming to the [Cloud Event v1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md) specification. This specification defines a standard set of property names, accepted value formats and a mechanism for encapsulating additional message payload, such as XML or binary encoded data.

Here is an example of a typical event:

```
{
    "id":"eae8d8a7-4659-43c0-83cd-42f673eff8cf",
    "source":"https://someservice.com/rest/path/object-id-1234",
    "specversion":"1.0",
    "type":"app.instance.created",
    "subject":"/party/50019855",
    "time": "2022-05-12T00:02:07.541482Z"
}
```

## A note about standards

#### Why Cloud Events?

Basing our API on the Cloud Event standard ensures consistent support across [programming languages](https://github.com/cloudevents/spec#sdks), operating systems and network stacks. 
This same standard has been adopted by many cloud providers and a growing number of independent solution providers. 

The official specification defines a scaleable approach to versioning and extensions, opening possibilities for future capabilities in a backwards compatible fashion.

#### XACML for Authorization Policy definition ??

## Who can use Altinn Events?

_~ WIP ~_





{{<children>}}
