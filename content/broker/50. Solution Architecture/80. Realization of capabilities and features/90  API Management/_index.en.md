---
title: Altinn 3 Broker API Management
linktitle: API Management
description: Altinn 3 Broker API Management
tags: [architecture, solution]
toc: true
weight: 90
---

{{<notice warning>}} <!-- info -->
This is work in progress.
{{</notice>}}


## Introduction

Azure API Management (APIM) plays a vital role in enhancing the security, management, and operational insights of Altinn API's. By placing APIM in front of the broker service, we can leverage a range of capabilities to ensure secure, efficient, and scalable file transfer operations. We run on an APIM instance that is shared with other platform services in Altinn.

TBD: How should Ocp-APIM-Subscription-Key be distributed to clients, and should subscription keys be possible to use across different Altinn API's.
