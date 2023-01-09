---
title: Access Token
linktitle: Access Token
description: A additional access token are used in the scenarious where we need to authenticate the application or component callin a component in Altinn Platform.
tags: [architecture, security]
toc: true
---

## AccessToken Client

AccessToken client is used by .Net applications needing to call protected APIs in the Altinn Platform infrastructure.

The AccessToken Client has a [Access Token generator](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessTokenClient/Services/AccessTokenGenerator.cs)  that
generates a jwt token based on a certifcate [made available](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessTokenClient/Services/SigningCredentialsResolver.cs) in in the different Kubernetes clusters.

### Example usage

- [App template calling register](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Infrastructure/Clients/Register/RegisterClient.cs).
- [App template calling Altinn Events](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Infrastructure/Clients/Events/EventsClient.cs).
- [Altinn Events function calling Altinn Events](https://github.com/Altinn/altinn-events/blob/main/src/Events.Functions/Clients/EventsClient.cs)
- [Altinn Resource Registry calling Altinn Access Management]() 


## AccessToken

AccessTToken is uisedd by platform comaponents that need to protect API from externala usage. 



