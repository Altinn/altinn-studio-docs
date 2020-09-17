---
title: Application architecture authentication component - Altinn Platform
linktitle: Authentication
description: The Authentication component is an a ASP.NET Core MVC Application exposing REST-API to Altinn Apps.
tags: [architecture, solution]
weight: 101
---

The solution is available at https://platform.altinn.cloud/authentication/api/v1. 

## Authenticate user
The authentication resource enables authenticating a user and redirecting it to another Altinn-url. 
If the user is not authenticated already it will be sent to the login page before redirecting the user to its final destination {url}.

```http
GET /authentication?goto={url}
```

## Refresh a valid JwtToken

```http
GET /refresh
```

## Exchange a JWT token from an external token provider

Accepted providers include: `maskinporten` and `id-porten`.
Request must include a bearer token in the authorization header.
Set test equal to true if retrieving a token for Testdepartementet.
(This ony works with maskinporten as the token provider.)

```http
GET /exchange/{tokenProvider}?test={bool}
```