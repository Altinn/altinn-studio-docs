---
title: Publish events
linktitle: Publish events
description: Documentation for event publishers
weight: 20
---

Events published to Altinn are pushed to all authorized subscribers and persisted for on-demand retrieval for 90 days. 

The CloudEvent specification is followed, but there are additional Altinn specific properties that you should know about
and use where you see fit.

- resource (always required)
- resourceinstance
- alternativesubject

Events published on the Altinn Events platform are persisted for 90 days and available to both publisher and
subscribers through an active subscription at the time the event is published or through our API at any point during
the 90 days.
{{<children />}}
