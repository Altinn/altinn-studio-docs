---
title: Application construction components - Altinn Platform Authentication
linktitle: Authentication
description: The authentication component in Altinn platform is constructed as an asp.net core web API application deployed as a docker container to a Kubernetes cluster.
tags: [architecture, solution]
---

The application runs on port 5040.
See full details in [dockerfile](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authentication/Authentication/Dockerfile)

## Api Controllers

- [Authentication](https://github.com/Altinn/altinn-studio/tree/master/src/Altinn.Platform/Altinn.Platform.Authentication/Authentication/Controllers) : Functionality to convert the different ID-tokens from ID providers
- [OpenID](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authentication/Authentication/Controllers/OpenIdController.cs) :  Contains well known endpoint
- [Organization](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authentication/Authentication/Controllers/OrganisationController.cs) : TODO. is this needed

## Dependencies
Authentication component take use of libraries for OpenID connect to create and validate JWT tokens.

See full list of dependencies in
[csproj](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Authentication/Authentication/Altinn.Platform.Authentication.csproj).