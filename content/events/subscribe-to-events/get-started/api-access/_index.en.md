---
title: Reader access to the API
linktitle: API access
weight: 10
description: Access to the events API as a consumer of events.
---

## Fetching and subscribing to events
When fetching (searching for) events or registering an event subscription, the client must include the
scope: **altinn:events.subscribe**.

This scope is available for all clients defined in Maskinporten or ID-porten.

{{% notice info %}}
Technically there is an exception for events produced by an Altinn Studio App. We still recommend that all clients 
wishing to consume events use the scope. The scope may become a requirement regardless of the event source.
{{% /notice %}}

