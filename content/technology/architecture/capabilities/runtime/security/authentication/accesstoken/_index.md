---
title: Access Token
linktitle: Access Token
description: A additional access token are used in the scenarious where we need to authenticate the application or component callin a component in Altinn Platform.
tags: [architecture, security]
toc: true
---


## Altinn Studio
The designer application creates a JWT based Access Token based on a certificate that designer has available when running
in the Altinn Studio Kubernetes Cluster. The different Altinn Studio environments have their own certificate.

This makes it possible for each Altinn Platform environment to configure which Altinn Studio environment that is allowed to deploy
and modify applications in that specific environment. 


The token is generated with help of the [Access Token generator](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessTokenClient/Services/AccessTokenGenerator.cs) 
and this is generated for each call designer are doing aginst the platform solution for Storage and Authorization.

## Apps 
To be able to limit the clients that can access some of the functionality in Altinn Platform, some components/functionality requires 
that a AccessToken is added to the request header in addition to the JWT that identifes the user triggering the request. 

The applications generes a token based on a org certificate available in the Kubernetes Cluster for the given org.

The token is generated with help of the [Access Token generator](https://github.com/Altinn/altinn-accesstoken/blob/main/src/Altinn.Common.AccessTokenClient/Services/AccessTokenGenerator.cs) 
and is used when calling [Register as an example](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Core/Infrastructure/Clients/Register/RegisterClient.cs).

The required check is enabled in the platform components with enabling a AuthorizationRequirement on the controller. 
Example on Party controller [here](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Platform/Altinn.Platform.Register/Register/Controllers/PartiesController.cs).




