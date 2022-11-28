
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
{{% /notice %}}


## What are the main benefits of using Altinn Events?

For event publishers
1. Simple HTTP interface to send events to, when they occur.
2. Let us worry about scaling, retries, security policy evaluation and auditing of event transmission to subscribers.

For event subscribers:
1. ...work in progress

### Design goals for Altinn Events

Altinn Events was developed to make it easier for digital service developers to deliver seamless experiences based on data from multiple systems of record. Traditionally, this would require either continual checking for changes in each source system or a significant investment in streaming or batch data replication across service boundaries -- sometimes both!

Altinn Events allows developers to add event-driven architecture to their existing service-oriented applications by providing a simple, secure and scaleable Publish/Subscribe infrastructure.

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



### What problem does Altinn Events solve?






{{<children>}}
