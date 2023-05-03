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
  
{{<children />}}