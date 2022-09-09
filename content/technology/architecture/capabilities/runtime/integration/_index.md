---
title: Integration & Data Transport Capabilties
linktitle: Integration
description: The most important capability for a platform like Altinn 3 is the integration capabilites. 
tags: [architecture]
---

In many ways you can say that Altinn is a integration hub for communication between the citizens, the businesses and the public
entities in Norway. 

![Integration parties](integration_capabilities.svg "integration actors")

Data flows between the different actors using Altinns. 

- Citizens receives data from the public agencies and sends data to the public agencies
- Business receives data from the public agencies and sends data to the public agencies
- Public agencies can share data with other public agencies
- ++

### End-point enablement

Applications created in Altinn Studio has build in API for communication with the different actors. In addition
application developers can add their custom APIS. 

The different platform components exposes API to applications and external parties.

All this is possible because the backend framework let developers create and expose APIS. 
This also include app developers that create applications in Altinn Studio. 

In the same way the different applications and components consumes APIS from other sources both inside the Altinn 3 platform solutions
and external sources. 

The APIS exposed as standard from Apps and platform is described [here](/api)

### Publish & Subscribe

A important change for Altinn moving to the new platform is we change to an event driven architecture. 

As part of the Altinn 3 platform it is created a Events component that apps and other can publish their events and other can
subscribe to. 

This is in detailed explained under [Events capabilities](events)

### Transport & Delivery

The different solutions of the platform support transport & delivery of the data.

By default the clients are the active parts for transporting data. Agencies needs to push data to Altinn when it need to send data to other actors, and need to pull data when receiving data.

The only active push from Altinn is when Altinn Platform Events component send events to subscribers. 

{{<children>}}
