---
title: Writer access to the API
linktitle: API access
weight: 10
description: Event production/publishing can only be done by service owners
---

## Publishing app events
App events have to come from an app, and cannot be created directly through the API.

## Publishing generic - non-app events
Any system wanting to publish events through the event API will require the scopes: **altinn:serviceowner** and **altinn:events.publish**

These scopes are available to all service owners. Contact tjenesteeier@altinn.no if you have problems finding necessary scopes in Maskinporten.
