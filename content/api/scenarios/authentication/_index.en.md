---
title: Authentication
description: How to authenticate using the APIs.
toc: true
tags: [api]
weight: 100
aliases:
- /teknologi/altinnstudio/altinn-api/scenarios/authentication/
---

## Authentication for application owners

Application owners should be authenticated with [Maskinporten](https://www.digdir.no/felleslosninger/maskinporten/869).

### API provisioning in Maskinporten

#### API-provider

To provide an API in maskinporten Altinn has to do two operations.

1. As API-provider Altinn registers a scope in *Maskinporten*
    ```json
    POST /scopes
    {
        "prefix": "altinn",
        "subscope": "instances/metadata.read",
        "description": "Clients can access metadata for all instances for all apps of the organisation"
    }
    ```
2. As API-provider Altinn has to give access to its scope for a given organisation
    ```http
    PUT /scopes/access/889640782?scope=altinn:apps.read
    ```
    Here we have given organisation 889640782 access to the scope `altinn:instances/metadata.read`.
    The organisation must then create a client that uses the scope.

#### API-consumer

To access the Altinn API an organisation must create a client.

1. As API-consumer the organisation must create a client in *Maskinporten* with scopes provided by Altinn:
    ```json {linenos=false,hl_lines=[6]}
    POST /clients
    {
        "client_name": "altinnOrgRead",
        "client_type": "CONFIDENTIAL",
        "description": "Client for accessing the my orgs app data",
        "scopes": [ "altinn:instances/metadata.read" ],
        "token_reference": "SELF_CONTAINED"
    }
    ```

### Scopes

scope names must follow the following regexp:

```perl
^([a-z0-9]+\/?)+[a-z0-9]+(\.[a-z0-9]+)?$?
```

It means that we cannot have `-` or `_` in scope names.

#### All instances scope

```js
altinn:serviceowner/instances.read
altinn:serviceowner/instances.write
```

This is the most general scope which can be given to an organisation by Altinn.
It means that the application owner can create a client that can access all instances of apps issued by that application owner.

Clients with *write* scope will be able to instantiate applications through direct access to the app's api, update metadata,
update process state, upload data, validate data, and change process of an instance.

Clients with *read* token will only be allowed to read metadata, data and events information.

### Exchange of JWT token

Application owners register clients in Maskinporten and selects the scope they need.

A client is authenticated by *Maskinporten* and are given a *Maskinporten JWT access token*.

This token has to be validated and replaced with an *Altinn JWT access token* which should be used to access the apis.

#### Maskinporten JWT access token (input)

Client provides a self-contained access-token.

```http
Autorization: Bearer eyJraWQiOiJIdFlaMU1UbFZXUGNCV0JQVWV3TmxZd1RCRklicU1Hb081OFJ4bmN6TWJNIiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJ0ZXN0X3JwIiwic2NvcGUiOiJ ...
GET /authentication/api/v1/exchange/maskinporten
```

The token looks something like this (after base64-decoding):

```json {linenos=false,hl_lines=[15,"17-20"]}
{
  "kid": "HtYZ1MTlVWPcBWBPUewNlYwTBFIbqMGoO58RxnczMbM",
  "alg": "RS256"
}
.
{
  "aud": "https://tt02.altinn.no/maskinporten-api/",
  "scope": "altinn:instances.write",
  "iss": "https://oidc-ver2.difi.no/idporten-oidc-provider/",
  "client_amr": "virksomhetssertifikat",
  "token_type": "Bearer",
  "exp": 1571935870,
  "iat": 1571923870,
  "client_id": "0de19f7a-f5fa-45d1-874c-3d2e88ce97d9",
  "client_orgno": "974760673",
  "jti": "U3HMLIY8b_X454CADQzfttSuWpCADPQhc57iZXVF_Ac",
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:974760673"
  }
}
.
<<signature>>
```

Maksinporten provides the legal `consumer` (the client) in ISO 6523 format. The `client_orgno` claim is deprecated.

#### The Altinn JWT Access token (output)

The convert operation validates the incoming token and generates a new JWT token with the same scope as the token.
The scopes is copied. The `orgNumber` and `org` is added by the token converter.

```json {linenos=false,hl_lines=[13,14]}
{
  "scope": "altinn:instances.read altinn:instances.write",
  "token_type": "Bearer",
  "exp": 1571996946,
  "iat": 1571995146,
  "client_id": "0de19f7a-f5fa-45d1-874c-3d2e88ce97d9",
  "client_orgno": "974760673",
  "jti": "BcNIAuZKXdjpECmmwalAm-pcBp0iNc56T6eXhlxNBZE",
  "consumer": {
    "authority": "iso6523-actorid-upis",
    "ID": "0192:974760673"
  },
  "org": "brg",
  "orgNumber": 974760673,
  "iss": "https://platform.altinn.cloud/",
  "AuthenticateMethod": "maskinporten",
  "AuthenticationLevel": 3,
  "nbf": 1571995146
}
.
<<signature>>
```

## Authentication for end user system

End user systems should be authentication with [ID-porten](https://difi.github.io/felleslosninger/idporten_overordnet.html).
When authenticated the system may exchange an access token provided by ID-porten with an Altinn token by instructions below.

#### Exchange of JWT token

This token has to be validated and replaced with an *Altinn JWT access token* which should be used to access the apis.

##### ID-porten JWT access token (input)

```http
Autorization: Bearer eyJraWQiOiJjWmswME1rbTVIQzRnN3Z0NmNwUDVGSFpMS0pzdzhmQkFJdUZiUzRSVEQ0IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9 ...
GET /authentication/api/v1/exchange/id-porten
```

The token looks something like this (after decoding):

```json
{
  "kid": "cZk00Mkm5HC4g7vt6cpP5FHZLKJsw8fBAIuFbS4RTD4",
  "alg": "RS256"
}
.
{
  "at_hash": "IF-jpSLtMjzoHdEhLq9pnw",
  "sub": "PZcxQYOR_ylbrlj69pXn_HdTmrpDRpA3X0rTyOEyN5I=",
  "amr": [
    "Minid-PIN"
  ],
  "iss": "https://oidc-ver2.difi.no/idporten-oidc-provider/",
  "pid": "191080XXXXX",
  "locale": "nb",
  "nonce": "1584978003167642",
  "sid": "bQDBkJmjrX3bx2agu4q7BS5QW6TPf9CHnJX11vEthZg",
  "aud": "38e634d9-5682-44ae-9b60-db636efe3156",
  "acr": "Level3",
  "auth_time": 1584978021,
  "exp": 1584978141,
  "iat": 1584978021,
  "jti": "_Og8JT1zMKzzHFB4WoVCdvqzmEpoY1hPhLa47bieJ94"
}
.
<<signature>>
```

##### The Altinn JWT Access token (output)

The exchange operation validates the incoming token and generates a new JWT token that contains user data
retrieved from the database using the provided pid (person identification number) and pre-existing data from the ID-porten token.

`pid` is referred to as ssn (social security number) i Altinn Platform.

```json {linenos=false,hl_lines=[9]}
{
  "nameid": "20000011",
  "urn:altinn:userid": "20000011",
  "urn:altinn:username": "",
  "urn:altinn:partyid": 50002119,
  "urn:altinn:authenticatemethod": "Minid-PIN",
  "urn:altinn:authlevel": 3,
  "amr": "Minid-PIN",
  "pid": "191080XXXXX",
  "locale": "nb",
  "nonce": "1585045781364132",
  "sid": "BYSqEpVGRrh6rElmnzzTjcU0roC95rxNCC2kAsB2hmY",
  "acr": "Level3",
  "auth_time": 1585045793,
  "exp": 1585047785,
  "iat": 1585045985,
  "nbf": 1585045985
}
.
<<signature>>
```

## Open ID Connect configuration

{{%notice warning%}}
This is work-in-progress. The response is still missing required information and might be inconsistent with actual authentication mechanisms.
{{% /notice%}}

Metadata about Altinn as an Open ID provider is exposed as a .well-known endpoint as defined
by [OpenID Connect Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig).

The primary purpose of this endpoint is to make available the Altinn signing certificate for the JSON Web Tokens being generated.
It is recommended that clients of Altinn use this discovery endpoint to automatically have their systems updated when Altinn changes their signing certificate.

| Environment | URL                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------- |
| AT2x        | <https://platform.at2x.altinn.cloud/authentication/api/v1/openid/.well-known/openid-configuration> |
| YT01        | <https://platform.yt01.altinn.cloud/authentication/api/v1/openid/.well-known/openid-configuration> |
| TT02        | <https://platform.tt02.altinn.no/authentication/api/v1/openid/.well-known/openid-configuration>    |
