---
title: Authentication
description: The authentication component provides functionality to authenticate users and systems accessing Altinn Apps and Altinn platform.
tags: [platform, authentication]
toc: true
weight: 1
---

The authentication component is not an ID-provider and only create authentication sessions based on external ID-providers.

The authentication component creates JWT tokens with claims about user and system.
The claims are based on the authentication information coming from the ID-providers.

## Token exchange for Altinn Portal
When a user logs in to the Altinn Portal (Legacy Solution) it gets a Cookie containing information about the logged-in user. This cookie is
a [propiaritary format for ASP.NET](https://support.microsoft.com/en-us/help/301240/how-to-implement-forms-based-authentication-in-your-asp-net-applicatio) (Full Framework)
and can only be understood with application based on .NET Framework having access to the symmetric encryption key.

The Altinn Platform is based on .ASP.NET Core and can`t understand the cookie.

To allow for a user accessing an App in Altinn Apps or a component in Altinn Platform the current platform will
expose an API that can decrypt an ASP.NET cookie and return user information to the Authentication component in Altinn Platform.

## Token exchange for maskinporten
Organizations authenticated in maskinporten can exchange their JWT token for a valid Altinn Platform JWT token to be used against Altinn Apps and Altinn Platform.

## Token exchange for ID-porten
End users authenticated through ID-porten can exchange their JWT token for a valid Altinn Platform JWT token to be used agains Altinn Apps and Altinn Platform.


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

{{%notice info%}}
A token from id-porten contains both an id-token and and access-token. 
Only the access token it to be exhanged using this endpoint.
{{% /notice%}}

```http
GET /exchange/{tokenProvider}?test={bool}
```


## System Authentication




## Architecture

The [application construction components](/authentication/architecture/)
for details how this component is constructued.
