---
title: Event capabilites
description: Description of the event driven architecture
tags: [architecture]
weight: 100
linktitle: Publish & Subscribe
alwaysopen: false
---

{{%notice warning%}}
This is work-in-progress.
{{% /notice%}}


The new generation Altinn is moving to an event driven architecture. This means that Altinn Platform and Altinn Apps will publish events that 
organizations and parties can subscribe to. 

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




