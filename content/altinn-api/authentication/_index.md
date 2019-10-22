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

> As Api-provider Altinn registres a scope in *Maskinporten*:

```json
POST /scopes
{
    "prefix": "altinn",
    "subscope": "instances/metadata.read",
    "description": "Clients can access metadata for all instances for all apps of the organisation"
}
```

> As Api-provider Altinn has to give access to its scope for a given organisation:

```json
PUT /scopes/access/889640782?scope=altinn:apps.read
```

Here we have given organisation 889640782 access to the scope `altinn:instances/metadata.read`
The organisation must then create a client that uses the scope.

#### Api-consumer

To access the Altinn api an organisation must create a client

> As Api-consumer the organisation must create a client in *Maskinporten* with scopes provided by Altinn:

```json
POST /clients/
{
    "client_name": "altinnOrgRead",
    "client_type": "CONFIDENTIAL",
    "description": "Client for accessing the my orgs app data",
    "scopes": [ "altinn:instances/metadata.read" ],
    "token_reference": "SELF_CONTAINED"
}
```

### Scopes

#### All instances scope

```cs
altinn:instances.read
altinn:instances.write
```

This is the most general scope which can be given to an organisation by Altinn. It means that the application owner can create a client that can access all instances of apps issued by that application owner. Clients with *write* scope will be able to instantiate applications through direct access to the app's api, update metadata, update process state, upload data, validate data, and change process of an instance. Clients with *read* token will only be allowed to read metadata, data and events information.

#### Single app scope

```cs
altinn:instances/{appId}/metadata.read
altinn:instances/{appId}/metadata.write

altinn:instances/{appId}/data.read
altinn:instances/{appId}/data.write

altinn:instances/{appId}/events.read
```

> appId = {org}/{app}

This is a more specific scope which gives clients access to data for a specific app, identified by `appId` restricted to specific data types:  metadata, data and events.

* metadata - allow clients to read/write instance metadata for instances of a specific app. Clients with write access can update process state and some selected attributes of the instance metadata. Clients can use the following apis:
  * `{appPath}/org/app/instances` (read/write)
  * `{storagePath}/instances` (read)
* data - allow clients to read/write the data elements (formdata or attachement) associated with the instance metadata for a given app. Both app-backen and storage apis are awailable:
  * `{appPath}/org/app/instances/{instanceOwnerId}/{instanceGuid}/data` (read/write)
  * `{storagePath}/instances/{instanceOwnerId}/{instanceGuid}/data` (read)
* events - allow clients to read events for a specific app. Events are found at the platform api:
  * `{storagePath}/instances/{instanceOwnerId}/{instanceGuid}/events` (read)
  * `{storagePath}/applications/{org}/{app}/events` (read)

Clients with read scope are allowed to query for data using GET. Clients with write scope are allowed to update data: POST, PUT and DELETE.

## Exchange of JWT token

Application owners register clients in Maskinporten and selects the scope they need.

A client is authenticated by *Maskinporten* and are given a *Maskinporten JWT access token*.

This token has to be validated and replaced with an *Altinn JWT access token* which should be used to access the apis.

### Maskinporten JWT access token (input)

Client provides a self-contained access-token.

```http
Autorization: Bearer eyJraWQiOiJIdFlaMU1UbFZXUGNCV0JQVWV3TmxZd1RCRklicU1Hb081OFJ4bmN6TWJNIiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJ0ZXN0X3JwIiwic2NvcGUiOiJ ...
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
  "consumer": {
    "Identifier": {
      "Authority": "iso6523-actorid-upis",
      "ID": "9908:910075918"
    }
  },
  "jti": "wTBYC7E2zF6vmflhQm8OYF9WQyYRAi2EuJenQsIo9kk="
}
.
<<signature>>
```

Maksinporten provides the legal `consumer` (the client) in ISO 6523 format.

### The Altinn JWT Access token (output)

The convert operation validates the incomming token and generates a new JWT token with the same scope as the token. The scopes is copied. The organisationNumber, org and orgName is added by the token converter.

```json
{
  "alg": "RS256",
  "kid": "00A12D92E4C4C1A29DFB956A03340460D6059C09",
  "x5t": "AKEtkuTEwaKd-5VqAzQEYNYFnAk",
  "typ": "JWT"
}
.
{
  "nbf": 1571739892,
  "exp": 1571741692,
  "iat": 1571739892,
  "org": "dibk",
  "orgNumber": "974760223",
  "orgName": "Direktoratet for byggkvalitet",
  "scope": "altinn:instances.read",  
}
.
<<signature>>
```
