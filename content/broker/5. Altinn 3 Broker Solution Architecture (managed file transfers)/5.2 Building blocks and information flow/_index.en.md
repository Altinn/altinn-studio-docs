---
title: High Level Solution Overview for Altinn 3 Broker Solution Architecture (managed file transfers)
linktitle: High Level Solution Overview
description: High Level Solution Overview for Altinn 3 Broker Solution Architecture (managed file transfers)
tags: [architecture, solution]
toc: true
weight: 20
---

{{<notice warning>}} <!-- info -->
This is work in progress
{{</notice>}}


## High Level Solution Overview – main building blocks

The following figure gives an overview of the main building blocks.

[{{< figure src="./image6.png" title="Figure 6: Altinn Broker main building blocks" alt="Alt-text">}}](https://www.vg.no)

This diagram expands on the context diagram of the intrudction by indicating the involved building blocks.
<!--
[context diagram](../../1.%20Introduction/image2.png) of 
the [introduction](../../1.%20Introduction/_index.en.md) by indicating the involved building blocks. 
-->

The Altinn application components (right side) realize the functionality as indicated by the 
high level application services (bottom). The exact mapping between services and conponents is not shown in this, high level diagram.

In addition to general descriptions of each of the application components given elsewhere, 
here's a summary of how these components relates to and serves Altinn 3 Broker:

* ID-porten: Auhentication of human end users.
* Maskin-porten: Authentication and authorization of machines (End User Systems). 
  Authorization features are realized in cooperation with the Altinn Authorization component.
* And so on...






