---
title: Scaling compute resources
linktitle: Scaling Altinn 3
description: Traffic to Altinn varies widely during a year and scaling the compute resources correctly is important for stability and cost
tags: [architecture, infrastructure]
---


The below diagram shows how the number of unique users logged in to Altinn 2 varied through 2019.

![Scalability aa ](scalable.png "Unique users 2019 per day Altinn 2 platform")

Altinn 2 is a monolith where all digital services run on the same servers. This means that for days like the tax day when there is this enormous spike in traffic will require
that all servers are scaled up. It is also a on-prem solution where scaling needs to be planned weeks ahead.

For Altinn 3 the story is completly different. Every organization have their separate Kubernetes cluster. Each of theese cluster can be scaled independently.
