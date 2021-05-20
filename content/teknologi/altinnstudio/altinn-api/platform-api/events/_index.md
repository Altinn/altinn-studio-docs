---
title: Events
description: The Platform API to work with events
toc: true
tags: [api]
weight: 100
---

## Overview

Events is events created by Applications or other sources. The event itself is based on the CloudEvent standard and is
a small JSON structure containing the most important aspects of an event. Details are found [here](/teknologi/altinnstudio/architecture/capabilities/runtime/integration/events/#event-schema).

The events APIs are used to access events created by applications in Altinn Apps and other event sources that uses Altinn Platform as
event hub. 

### Subscription

The highly prefered way to use events, is to set up a subscription that enable push of events to a webhook-endpoint.
This is done through the Subcription API. This API supports the following consumers

- Persons, authenticated through ID-porten
- Orgs, authenticated through Maskinporten

The subscription API is described [here](/teknologi/altinnstudio/altinn-api/platform-api/swagger/events/#/Subscription) as Swagger.

The webhook endpoint needs to be able to accept cloud event that is posted throug http to the endpoint url.

The push functionality also support pushing events to slack. Other platform might be adder at a later point.

### Search API

The search allows to search for events. The storage of events is limited to 90 days.

This is available to be used by the following consumers.

- Persons, authenticated through ID-porten
- Orgs, authenticated through Maskinporten

The API is described in swagger [here](/teknologi/altinnstudio/altinn-api/platform-api/swagger/events/#/Events).





