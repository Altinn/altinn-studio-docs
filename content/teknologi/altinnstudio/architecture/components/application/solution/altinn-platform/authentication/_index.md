---
title: Application arhicture authentication component - Altinn Platform
linktitle: Authentication
description: Description of authentication component
tags: [architecture, solution]
weight: 100
---

The Authentication component is an a ASP.Net Core MVC Application exposing REST-API to Altinn Apps.

The solution is currently available at http://platform.altinn.cloud/authentication/api/v1. 

Resources: authentication

## /authentication

### Authenticate user
The authentication resource enables authenticating a user and redirecting it to another Altinn-url. 
If the user is not authenticated already it will be sent to the login page before redirecting the user to its final destination {url}.

```http
GET /authentication?goto={url}
```

### Refresh a valid JwtToken:

```http
GET /refresh
```

### Exchange a JWT token from an external token provider.

Accepted providers include: `maskinporten` and `id-porten`.
Request must include a bearer token in the authorization header.
Set test equal to true if retrieving a token for Testdepartementet.
(This ony works with maskinporten as the token provider.)
```http
GET /exchange/{tokenProvider}?test={bool}
```
