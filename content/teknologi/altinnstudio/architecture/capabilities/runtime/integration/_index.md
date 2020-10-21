---
title: Integration & Data Transport Capabilties
linktitle: Integration
description: The most important capability for a platform like Altinn 3 is the integration capabilites. 
tags: [architecture]
---

In many ways you can say that Altinn is a integration hub for communication between the citizens, the businesses and the public
entities in Norway. 

![Integration parties](integration_capabilites.svg "Altinn integration")

Data flows between the different actors using Altinns. 

- Citizens receives data from the public agencies and sends data to the public agencies
- Business receives data from the public agencies and sends data to the public agencies
- Pulic agencies can share data with other public agencies
- ++


### End-point enablement

Applications created in Altinn Studio has build in API for communication with the different actors. In addition
application developers can add their custom APIS. 

The different platform components exposes API to applications and external parties.

All this is possible because the backend framework easy let developers build APIS.

In the same way the different applications and components consumes APIS from other sources both inside the Altinn 3 platform solutions
and external sources. 

### Publish & Subscribe

A important change for Altinn moving to the new platform is we change to an event driven architecture. 

As part of the Altinn 3 platform it is created a Events component that apps and other can publish their events and other can
subscribe to. 

This is in detailed explained under [Events capabilities](events)

### Transport & Delivery

The different solutions of the platform support transport & delivery of the data.


