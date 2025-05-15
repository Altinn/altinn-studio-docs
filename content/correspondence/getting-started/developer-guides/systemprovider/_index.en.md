---
title: Getting Started system provider
linktitle: Getting started system provider
description: "System provider: provides an end-user-system that receives and stores Altinn messages via machine-to-machine integration."
tags: []
toc: false
weight: 20
---

{{<children />}}

To get started as a system provider, follow this guide:

https://docs.altinn.studio/authentication/guides/systemvendor/systemauthentication-for-systemproviders/

### Altinn API key and access to scopes {#get-an-altinn-api-key}
To use Altinn Correspondence, you need a subscription key. Technically, this is an API key that must be included in the header of the request `Ocp-Apim-Subscription-Key`, to verify that you have the right to use the Correspondence API. Without this key, your request will be denied.
To authenticate and ensure that you can perform operations via the Correspondence API, Altinn must grant you access to the necessary scopes. This ensures that only authorized clients can send and receive files, thereby maintaining the security of the service. The following scopes are used to send and/or receive messages:
- `altinn:correspondence.read`