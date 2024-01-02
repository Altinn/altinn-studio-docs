---
title: Altinn 3 Broker Interface Specifications
linktitle: Interface Specifications
description: Altinn 3 Broker Interface Specifications
tags: [architecture, solution]
toc: true
weight: 60
---

{{<notice warning>}} <!-- info -->
This is work in progress
{{</notice>}}

## Specification of system interfaces

### API specifications

The Altinn 3 Broker Open API specification is available at
[altinn-broker/altinn-broker-v1.json at main · Altinn/altinn-broker
(github.com)](https://github.com/Altinn/altinn-broker/blob/main/altinn-broker-v1.json).

### Event specifications

Cloudevent specifications TBD.

## Usage scenarios and information flow

### End-to-end typical sequence (happy path)

The follow sequence diagram shows…

[{{< figure src="./image9.png" title="Figure 9: ..." alt="Alt-text">}}](https://www.vg.no)

<span style="color: red;">Explanation: TBD, Erik: Explain each arrow (should match the online,
clickable Archi version).</span>


<span class="mark">Note: Details regarding authentication and
authorization not shown here.</span>

### Exception sequence – failing upload

TBD.

### Exception sequence – failing download

TBD.

### Exception sequence – resuming a failed upload

TBD.

### Exception sequence – resuming a failed download

TBD.

### Reporting sequence – service owner fetching statistics

TBD.

### Reporting sequence –provider fetching statistics

TBD.

### Reporting sequence –consumer fetching statistics

TBD.

### File storage purging 

TBD.

