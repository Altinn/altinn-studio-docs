---
title: Altinn API - Authentication
description: How to access the apis
toc: true
tags: [api]
weight: 100
alwaysopen: false
---

## Application owners

Should be authenticated with [maskinporten](https://difi.github.io/felleslosninger/oidc_guide_maskinporten.html).

### Scopes

#### Apps scope

```uri
altinn:apps.read
altinn:apps.write
```

This is the most general scope which can be given to an organisation by Altinn. 
It means that the application owner can create a client that can access all apps issued by that application owner.
Clients with *write* scope will be able to instantiate applications through direct
access to the app's api, update metadata,  upload data, validate data, and change process of an instance. Clients with *read* token
will only be allowed to read from the *platform* api.

#### Single app scope

```cs
altinn:apps/skd/mva.read
altinn:apps/skd/mva.write
```

This is a more specific scope which gives clients access to data for a specific application.
Clients can read/write data for a specific app.

#### Platform scope

```cs
altinn:platform/storage.read
altinn:platform/storage/instances.read
altinn:platform/storage/instances/data.read
altinn:platform/storage/instances/events.read
altinn:platform/storage/applications.read
altinn:platform/storage/applications/events.read
altinn:platform/profile.read
altinn:platform/authentication.read
altinn:platform/authorisation.read
altinn:platform/register.read
```

Gives a client access to a specific api-endpoint restricted to the data for the organisation. 

## Exchange JWT token

Application owners register clients in 