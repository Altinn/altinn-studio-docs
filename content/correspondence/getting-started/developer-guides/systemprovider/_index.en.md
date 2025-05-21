---
title: Getting Started system provider
linktitle: System provider
description: "System provider: provides an end-user-system that receives and stores Altinn messages via machine-to-machine integration."
tags: []
toc: false
weight: 20
---

{{<children />}}

To get started as a system provider, follow this guide:

[Autentisering for systemleverandører](https://docs.altinn.studio/authentication/guides/systemvendor/)

### Altinn API key and access to scopes {#get-an-altinn-api-key}
To use Altinn Correspondence, you need a subscription key. Technically, this is an API key that must be included in the header of the request `Ocp-Apim-Subscription-Key`, to verify that you have the right to use the Correspondence API. Without this key, your request will be denied.
To authenticate and ensure that you can perform operations via the Correspondence API, Altinn must grant you access to the necessary scopes. This ensures that only authorized clients can send and receive files, thereby maintaining the security of the service. The following scopes are used to receive messages:
- `altinn:correspondence.read`

To obtain an Altinn API key and access to scopes, you must submit a request to: [servicedesk@altinn.no](mailto:servicedesk@altinn.no).
Please include all necessary scopes in your request. For example, beyond `altinn:correspondence.read`, your integration may require additional scopes. 
You can find the complete list of available scopes here: [Complete list of scopes](https://docs.altinn.studio/api/authentication/digdirscopes/)