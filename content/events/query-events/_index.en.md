---
title: Query events
linktitle: Query events
description: Documentation for querying events from API
weight: 20
---

## Query vs Subscribe

The difference between subscribing to events and querying for events is quite important. Subscribing to events implies 
that the recipient doesn't have to actively check for new data at a given interval. Instead, the recipient, as a subscriber,
will register an endpoint where events will be posted by the service.

Querying for events, on the other hand, implies that the recipient will have to actively poll for new data using our 
REST API. This is **not the recommended pattern**, although it is supported.

{{<children />}}
