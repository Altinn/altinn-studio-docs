---
title: Events
linktitle: Events
description: The Altinn Events component is an a ASP.NET Core MVC Application exposing REST-API to Altinn Apps and other Altinn Platform components.
tags: [architecture, solution]
weight: 3
---

In addition it contains serveral [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview) to support push of events. 

See [events](/events/) for functional description of the platforms event capabilities.

![Event architecture diagram](/technology/architecture/components/application/construction/altinn-platform/events/altinn-events.drawio.export.svg "Altinn Event Architecture")

The solution is available at https://platform.altinn.no/events/api/v1.

### API 

The full detail for this API is described [here](/events/api). 


## Push Functions

An important part of the Events component is the four different Azure Functions that are responsible for the following:

- Registration function: Pulls incomming events from queue for further processing
- Inbound Function: Sends every event to subscription matching and authorization
- Outbound Function: Pushes events to subscription endpoints
- Subscription Validation Function

See more details in the [construction components for Events](/technology/architecture/components/application/construction/altinn-platform/events/)
