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

[Leverandører av sluttbrukersystemer](https://samarbeid.digdir.no/altinn/kom-i-gang/2868)

### Access to scopes {#get-access-to-scopes}
To authenticate and ensure that you can perform operations via the Correspondence API, Altinn must grant you access to the necessary scopes. This ensures that only authorized clients can send and receive files, thereby maintaining the security of the service. The following scopes are used to receive messages:
- `altinn:correspondence.read`

To obtain an Altinn API key and access to scopes, you must submit a request to: [servicedesk@altinn.no](mailto:servicedesk@altinn.no).
Please include all necessary scopes in your request. For example, beyond `altinn:correspondence.read`, your integration may require additional scopes. 
You can find the complete list of available scopes here: [Complete list of scopes](https://docs.altinn.studio/api/authentication/digdirscopes/)