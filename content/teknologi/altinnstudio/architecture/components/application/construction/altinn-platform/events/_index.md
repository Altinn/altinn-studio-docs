---
title: Application construction components - Altinn Platform Events
linktitle: Events
description: The Events component in Altinn platform is constructed as an asp.net core web API application deployed as a docker container to a Kubernetes cluster.
tags: [architecture, solution]
---

The Events components expose REST-APIs for publishing and subscribing to events.

When a publish request is received it will push the event document to the event storage.
When a request is received it will query the events stored in the event storage.

## Api controllers

The following API controllers are defined

- [EventsController](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Events/Events/Controllers/EventsController.cs)


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