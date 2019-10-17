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

### API provisioning in Maskinporten

#### Api-provider

To provide an API in maskinporten Altinn has to do two operations.

 1. As Api-provider Altinn registres scopes in *Maskinporten*:

```uri
POST /scopes
{
    "prefix": "altinn",
    "subscope": "apps.read",
    "description": "Clients can read data from apps apis for the organisation"
}
```

 2. As Api-provider Altinn has to provide access to its scope for a given organisation:

```uri
PUT /scopes/access/889640782?scope=altinn:apps.read
```

Here we have given organisation 889640782 access to the scope ```altinn:apps.read```
The organisation must then create a client that uses the scope.

#### Api-consumer

To access the Altinn api an organisation must create a client

 1. As Api-consumer the organisation must create a client in *Maskinporten* with scopes provided by Altinn.

```uri
POST /clients/
{
    "client_name": "altinnRead",
    "client_type": "CONFIDENTIAL",
    "description": "Client for accessing the my orgs app data"
    "scopes": [ "altinn:apps.read" ],
    "token_reference": "SELF_CONTAINED"
}
```

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

Gives a client access to a specific platform api-endpoint that is restricted to only return data for a given organisation. 
If client has single app scope this will restrict the data returned further.

## End user systems

```uri
altinn:apps.read
altinn:apps.write
```

## Exchange of JWT token

Application owners register clients in Maskinporten and selects the scope they need.

A client is authenticated by *Maskinporten* and are given a *Maskinporten JWT access token*.

This token has to be validated and replaced with an *Altinn JWT access token*.
The scope 