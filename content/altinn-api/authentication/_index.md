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

```json
POST /scopes
{
    "prefix": "altinn",
    "subscope": "apps.read",
    "description": "Clients can read data from apps apis for the organisation"
}
```

 1. As Api-provider Altinn has to provide access to its scope for a given organisation:

```json
PUT /scopes/access/889640782?scope=altinn:apps.read
```

Here we have given organisation 889640782 access to the scope ```altinn:apps.read```
The organisation must then create a client that uses the scope.

#### Api-consumer

To access the Altinn api an organisation must create a client

 1. As Api-consumer the organisation must create a client in *Maskinporten* with scopes provided by Altinn.

```json
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

```cs
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

## Exchange of JWT token

Application owners register clients in Maskinporten and selects the scope they need.

A client is authenticated by *Maskinporten* and are given a *Maskinporten JWT access token*.

This token has to be validated and replaced with an *Altinn JWT access token*.

Maksinporten provides the legal consumer of the token:

```json
{
    "consumer": {
        "Identifier": {
        "Authority": "iso6523-actorid-upis",
        "ID": "9908:910075918"
    },
    "consumer_org": "910075918",
    "client_org": "910075918"
}
```

> Which one to select, which one comes from Maskinporten?

The exchange calls:

Client provides a self-contained access-token.

```http
Autorization: Bearer eyJraWQiOiJIdFlaMU1UbFZXUGNCV0JQVWV3TmxZd1RCRklicU1Hb081OFJ4bmN6TWJNIiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJ0ZXN0X3JwIiwic2NvcGUiOiJnbG9iYWxcL2tvbnRha3RpbmZvcm1hc2pvbi5yZWFkIGdsb2JhbFwvcG9zdGFkcmVzc2UucmVhZCBnbG9iYWxcL3NlcnRpZmlrYXQucmVhZCBnbG9iYWxcL3ZhcnNsaW5nc3N0YXR1cy5yZWFkIGdsb2JhbFwvbmF2bi5yZWFkIiwiaXNzIjoiaHR0cHM6XC9cL29pZGMtdGVzdDEuZGlmaS5lb24ubm9cL2lkcG9ydGVuLW9pZGMtcHJvdmlkZXJcLyIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJleHAiO ...
GET /authentication/api/v1/convert
```

 The token looks something like this (after decoding):

```json
{
  "kid": "HtYZ1MTlVWPcBWBPUewNlYwTBFIbqMGoO58RxnczMbM",
  "alg": "RS256"
}
.
{
  "aud": "test_rp",
  "scope": "altinn:apps.read altinn.apps/difi/testapp.write altinn:platform/storage.read",
  "iss": "https://oidc-test1.difi.eon.no/idporten-oidc-provider/",
  "token_type": "Bearer",
  "exp": 1520590409,
  "iat": 1520589809,
  "client_orgno": "991825827",
  "jti": "wTBYC7E2zF6vmflhQm8OYF9WQyYRAi2EuJenQsIo9kk="
}
.
<<signature>>
```

The convert operation validates the incomming token and generates a new JWT token with the same scope as the token.

```json
{
  "alg": "RS256",
  "kid": "00A12D92E4C4C1A29DFB956A03340460D6059C09",
  "x5t": "AKEtkuTEwaKd-5VqAzQEYNYFnAk",
  "typ": "JWT"
}
.
{
  "consumer": "{\"Identifier\":{\"Authority\":\"iso6523-actorid-upis\",\"ID\":\"9908:974760223\"}}",
  "client_orgno": "974760223",
  "scopes": "altinn:apps altinn:apps/dibk/testapp.write altinn:platform/storage.read",
  "iss": "https://platform.at21.altinn.cloud/altinn-oidc-provider/",
  "nbf": 1571739892,
  "exp": 1571741692,
  "iat": 1571739892,
  "organsiationNumber": "974760223",
  "org": "dibk",
  "name": "Direktoratet for byggkvalitet"
}
.
<<signature>>
```

## End user systems

Area under construction!

```uri
altinn:apps.read
altinn:apps.write
```