---
title: Application construction components - Altinn Platform Authentication
linktitle: Arkitektur
description: The authentication component in Altinn platform is constructed as an asp.net core web API application deployed as a docker container to a Kubernetes cluster.
tags: [architecture, solution]
aliases:
  - /authentication/architecture/
---

The application runs on port 5040.
See full details in [dockerfile](https://github.com/Altinn/altinn-authentication/blob/main/Dockerfile)

## Api Controllers

- [Authentication](https://github.com/Altinn/altinn-authentication/blob/main/src/Authentication/Controllers/AuthenticationController.cs) : Functionality to convert the different ID-tokens from ID providers
- [OpenID](https://github.com/Altinn/altinn-authentication/blob/main/src/Authentication/Controllers/OpenIdController.cs) :  Contains well known endpoint
- [Logout](https://github.com/Altinn/altinn-authentication/blob/main/src/Authentication/Controllers/LogoutController.cs) : Logout
- [Introspection](https://github.com/Altinn/altinn-authentication/blob/main/src/Authentication/Controllers/IntrospectionController.cs)

## Dependencies
Authentication component take use of libraries for OpenID connect to create and validate JWT tokens.

See full list of dependencies in
[csproj](https://github.com/Altinn/altinn-authentication/blob/main/src/Authentication/Altinn.Platform.Authentication.csproj).