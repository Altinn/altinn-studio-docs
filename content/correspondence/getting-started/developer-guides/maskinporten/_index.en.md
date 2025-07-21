---
title: Maskinporten Client
linktitle: Maskinporten Client
description: How to set up a Maskinporten client in selvbetjeningsportalen
tags: [Correspondence, guide, maskinporten]
toc: true
weight: 100
---

{{<children />}}

{{% insert "content/shared/maskinporten/maskinporten-client-create.en.md" %}}

You can now use your client with your key to retrieve Maskinporten tokens. 
A detailed description on how to authenticate your client with JWT Grant is described [here](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument).

This Maskinporten token can be exchanged into an altinn token. [This is described here](https://docs.altinn.studio/authentication/what-do-you-get/).

An altinn token is needed to authenticate against Altinn API (Such as the Correspondence API). This is given that your client has the required scopes and that you have a resource where your organisation has been given the permission to those scopes.

In the context of an [Altinn Studio](/altinn-studio) app, Maskinporten integration is available using the built-in authentication client. Simply follow along with the [user guide](/altinn-studio/guides/integration/maskinporten) to get started.

For other _.Net_ apps, you can use this [standalone library](https://github.com/Altinn/altinn-apiclient-maskinporten) to handle authentication. The library provides extension methods to configure HttpClients to authenticate with Maskinporten based on your provided configuration.