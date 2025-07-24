---
title: Maskinporten client
linktitle: Maskinporten client
description: How to set up a Maskinporten client in the self-service portal
tags: [Correspondence, guide, maskinporten]
toc: true
weight: 100
---

{{<children />}}

{{% insert "content/shared/maskinporten/maskinporten-client-create.en.md" %}}

You can now use your client with your key to retrieve Maskinporten tokens. A detailed description on how to authenticate your client with a JWT Grant is described [here](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument).

This Maskinporten token can be exchanged for an Altinn token, which is [described here](/authentication/what-do-you-get/).

An Altinn token is required to authenticate against Altinn APIs (such as the Correspondence API), provided that your client has the required scopes and that you have a resource where your organisation has been given the permission to those scopes.

{{% insert "content/shared/maskinporten/maskinporten-authentication-methods.en.md" %}}