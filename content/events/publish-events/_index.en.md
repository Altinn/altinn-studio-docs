---
title: Publish events
linktitle: Publish events
description: Documentation for event publishers
weight: 20
---

Events published to Altinn are pushed to all authorized subscribers and persisted for on-demand retrieval for 90 days. 

Cloud event spec is followed, but additional Altinn extension properties are defined that you should know 
and use where you see fit.

- resource (required)
- resourceinstance
- alternativesubject
  
{{<children />}}