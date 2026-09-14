---
title: Scopes for the system user API
linktitle: Scopes
description: Overview of which Maskinporten scopes each endpoint in the system user API requires
toc: true
weight: 1
---

## Scopes you need

As an end user system vendor you need three scopes to use the system user API.
They are granted to your Maskinporten client when you fill in the
[registration form for end user system vendors](/en/authorization/getting-started/systemuser/)
and tick the box for system user.

| Scope | What you use it for |
| ----- | ------------------- |
| `altinn:authentication/systemregister.write` | Managing your systems in the system register, and listing the system users attached to one of your systems |
| `altinn:authentication/systemuser.request.write` | Creating, changing and deleting system user requests, and looking up a system user |
| `altinn:authentication/systemuser.request.read` | Retrieving the status of the requests you have sent |

If your system also performs client delegation through the API, you additionally need
`altinn:clientdelegations.read` and `altinn:clientdelegations.write`.
See [Client delegation](/en/api/authentication/systemuserapi/clientdelegation/).

The scopes above apply to the system user API only. Service owners decide which scopes their own
services require, and those scopes must be granted to you separately by the service owner.

## altinn:authentication/systemregister.write

| Method | Endpoint |
| ------ | -------- |
| POST | `authentication/api/v1/systemregister/vendor` |
| GET | `authentication/api/v1/systemregister/vendor` |
| GET | `authentication/api/v1/systemregister/vendor/{systemId}` |
| PUT | `authentication/api/v1/systemregister/vendor/{systemId}` |
| PUT | `authentication/api/v1/systemregister/vendor/{systemId}/rights` |
| PUT | `authentication/api/v1/systemregister/vendor/{systemId}/accesspackages` |
| DELETE | `authentication/api/v1/systemregister/vendor/{systemId}` |
| GET | `authentication/api/v1/systemregister/vendor/{systemId}/changelog` |
| GET | `authentication/api/v1/systemuser/vendor/bysystem/{systemId}` |

Note the last endpoint: listing the system users belonging to one of your systems requires
`systemregister.write`, not one of the systemuser scopes.

## altinn:authentication/systemuser.request.write

| Method | Endpoint |
| ------ | -------- |
| POST | `authentication/api/v1/systemuser/request/vendor` |
| POST | `authentication/api/v1/systemuser/request/vendor/agent` |
| DELETE | `authentication/api/v1/systemuser/request/vendor/{requestId}` |
| POST | `authentication/api/v1/systemuser/changerequest/vendor` |
| DELETE | `authentication/api/v1/systemuser/changerequest/vendor/{requestId}` |
| GET | `authentication/api/v1/systemuser/vendor/byquery` |

The `vendor/byquery` lookup is a GET call, but still requires the write scope.

## altinn:authentication/systemuser.request.read

| Method | Endpoint |
| ------ | -------- |
| GET | `authentication/api/v1/systemuser/request/vendor/{requestId}` |
| GET | `authentication/api/v1/systemuser/request/vendor/agent/{requestId}` |
| GET | `authentication/api/v1/systemuser/request/vendor/byexternalref/{systemId}/{orgNo}/{externalRef}` |
| GET | `authentication/api/v1/systemuser/request/vendor/agent/byexternalref/{systemId}/{orgNo}/{externalRef}` |
| GET | `authentication/api/v1/systemuser/request/vendor/bysystem/{systemId}` |
| GET | `authentication/api/v1/systemuser/request/vendor/agent/bysystem/{systemId}` |
| GET | `authentication/api/v1/systemuser/changerequest/vendor/{requestId}` |
| GET | `authentication/api/v1/systemuser/changerequest/vendor/byexternalref/{systemId}/{orgNo}/{externalRef}` |
| GET | `authentication/api/v1/systemuser/changerequest/vendor/bysystem/{systemId}` |

## Setting up the client

All the endpoints above require a Maskinporten token, sent as a Bearer token.
See [Setting up Maskinporten client](/en/authorization/getting-started/maskinportenclient/) for
how to create the client and add the scopes.

If the token lacks the correct scope, the API returns `403 Forbidden`.
