---
title: Application construction components - Altinn Platform Event
linktitle: Event
description: The event component in Altinn platform is constructed as an asp.net core web API application deployed as a docker container to a Kubernetes cluster.
tags: [architecture, solution]
---

The event components expose REST-APIs for publishing and subscribing to events.

When a publish request is received it will push the event document to the event storage.
When a request is received it will query the events stored in the event storage.

## Api controllers

The following API controllers are defined

- [InstanceEvents]()
- [PartyEvents]()

## Event storage

Using CosmosDB gives the possibility to have "endless" number of topics/feeds based on queries.

Based on filters on the db query you could get an endless amount of feeds containg events with specific criteria.

#### Partition key

Currently, the limitations on Cosmos DB are that one logical partition can [maximum be 20GB](https://docs.microsoft.com/en-us/azure/cosmos-db/concepts-limits).

If we assume events in average on 350 Bytes (the examples above are around 300 Bytes).
This would hold approx 57 million events inside a logiical partition.

If we assume 5 events on average on each instance that would be around 11 million instances per partition key.
Looking at the biggest digital services in the current platform (Altinn 2) this indicates that using a partition key 
based on {org}/{app} is not possible because many of them have many more elements.  

The suggestion is to use the subject as partition key. 57 million on a given subject should be more than enough.
And if that limit is reached the limitations probably have increased (it was raised from 10GB to 20GB in may 2020).

#### Event sequencing

Events will be sequnced by eventTime. This is a datetime where precision is 7 digits, with an accuracy of 100 nanoseconds.
The eventTime would be set by a [stored procedure](https://docs.microsoft.com/en-us/azure/cosmos-db/how-to-write-stored-procedures-triggers-udfs) when inserting document.

It will overwrite any eventTime set by the publisher.

### Indexing

The default indexing policy for newly created containers indexes every property of every item, 
enforcing range indexes for any string or number, and spatial indexes for any GeoJSON object of type Point. 
This allows you to get high query performance without having to think about indexing and index management upfront.

For the topic and eventTime a composite index should be investigated to see if that performs better.

[See Cosmos DB indexing for details](https://docs.microsoft.com/en-us/azure/cosmos-db/index-overview).
